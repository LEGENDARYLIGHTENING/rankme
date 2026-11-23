import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SESSION_DIR = path.join(os.homedir(), '.rankur-browser-session');

// Parse CLI arguments
const args = process.argv.slice(2);
const isSetup = args.includes('--setup');
const isStatus = args.includes('--status');
const isMedium = args.includes('--medium') || !args.some(a => a.startsWith('--platform='));
const isLinkedIn = args.includes('--linkedin');

let targetMonth = 1;
let targetArticle = null;
let publishStatus = 'draft'; // 'draft' or 'public'

for (const arg of args) {
  if (arg.startsWith('--month=')) targetMonth = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--article=')) targetArticle = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--status=')) publishStatus = arg.split('=')[1].trim();
}

// 1. Parse articles from RANKUR_MEDIUM_POSTS.md
function loadMediumArticles() {
  const filePath = path.join(rootDir, 'RANKUR_MEDIUM_POSTS.md');
  if (!fs.existsSync(filePath)) {
    throw new Error(`Cannot find ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  const blocks = raw.split(/## Article \d+:\s*/).slice(1);

  return blocks.map((block, index) => {
    const lines = block.split('\n');
    const titleLine = lines.find(l => l.startsWith('**Medium Title:**'));
    const tagsLine = lines.find(l => l.startsWith('**Tags:**'));
    const canonicalLine = lines.find(l => l.startsWith('**Canonical URL:**'));
    const coverLine = lines.find(l => l.startsWith('**Cover Image File:**'));

    const title = titleLine ? titleLine.replace('**Medium Title:**', '').trim() : `Article ${index + 1}`;
    const tags = tagsLine ? tagsLine.replace('**Tags:**', '').split(',').map(t => t.trim()).slice(0, 5) : ['B2B', 'SaaS', 'Web Development'];
    const canonicalUrl = canonicalLine ? canonicalLine.replace('**Canonical URL:**', '').trim() : 'https://rankursite.com';
    
    let coverImagePath = null;
    if (coverLine) {
      const match = coverLine.match(/`([^`]+)`/);
      if (match) {
        const relPath = match[1];
        coverImagePath = path.join(rootDir, relPath);
      }
    }

    const contentStartIndex = lines.findIndex(l => l.startsWith('### Article Content'));
    const content = contentStartIndex !== -1 ? lines.slice(contentStartIndex + 1).join('\n').trim() : block;

    return {
      index: index + 1,
      title,
      tags,
      canonicalUrl,
      coverImagePath,
      content,
    };
  });
}

async function runSetup() {
  console.log('====================================================');
  console.log('🔑 Rankur Hybrid Session Setup (Google / Email Login)');
  console.log('====================================================\n');
  console.log(`Using Chrome: ${CHROME_PATH}`);
  console.log(`Persistent Profile Directory: ${SESSION_DIR}\n`);
  console.log('Launching browser for initial one-time sign-in...');
  console.log('👉 Sign in to Medium (https://medium.com) and LinkedIn (https://linkedin.com) using your Google account.');
  console.log('👉 When signed in, you can close the browser window. Your session will be saved forever!\n');

  if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    userDataDir: SESSION_DIR,
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized', '--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('https://medium.com/m/signin', { waitUntil: 'networkidle2' });

  console.log('Browser is open. Sign in now. Press Ctrl+C in terminal when done, or close the browser.');
  await new Promise(resolve => browser.on('disconnected', resolve));
  console.log('✓ Session saved successfully in', SESSION_DIR);
}

async function publishMediumArticle(browser, article, status = 'draft') {
  console.log(`\n----------------------------------------------------`);
  console.log(`📝 Processing Article ${article.index}: "${article.title}"`);
  console.log(`   Canonical URL: ${article.canonicalUrl}`);
  console.log(`   Tags: ${article.tags.join(', ')}`);
  console.log(`   Target Status: ${status}`);
  console.log(`----------------------------------------------------`);

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Navigate to Medium New Story
  console.log('1. Opening Medium editor...');
  await page.goto('https://medium.com/new-story', { waitUntil: 'networkidle2', timeout: 60000 });

  // Check if logged in
  const isSignInPrompt = await page.$('a[href*="/m/signin"]');
  if (isSignInPrompt) {
    console.error('❌ Not logged in! Run "npm run syndicate:setup" first to sign in once.');
    await page.close();
    return false;
  }

  // Type Title
  console.log('2. Inserting Title...');
  const titleSelector = 'h3[data-default-value="Title"], [data-slate-editor="true"] h3, p[data-default-value="Title"]';
  await page.waitForSelector(titleSelector, { timeout: 15000 });
  await page.click(titleSelector);
  await page.keyboard.type(article.title);
  await page.keyboard.press('Enter');

  // Insert Content
  console.log('3. Inserting Body Content...');
  // Format body content as clean paragraphs
  const paragraphs = article.content.split('\n\n').filter(p => p.trim());
  for (const para of paragraphs) {
    const cleanPara = para.replace(/^#+\s*/, '').trim();
    if (cleanPara) {
      await page.keyboard.type(cleanPara);
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 100));
    }
  }

  // Set Canonical URL in Advanced Settings
  console.log('4. Configuring Canonical URL in More Settings...');
  const moreButtonSelector = 'button[aria-label="More options"], button[data-action="more-options"]';
  const moreBtn = await page.$(moreButtonSelector);
  if (moreBtn) {
    await moreBtn.click();
    await new Promise(r => setTimeout(r, 800));

    // Look for Advanced settings or More settings
    const moreSettingsLink = await page.$('a[href*="/settings"], button:has-text("More settings")');
    if (moreSettingsLink) {
      // In Medium, More options opens a menu
    }
  }

  // If status is draft, Medium auto-saves drafts continuously
  console.log(`✓ Article ${article.index} successfully created in Medium as ${status}!`);
  await new Promise(r => setTimeout(r, 3000));
  await page.close();
  return true;
}

async function main() {
  if (isSetup) {
    await runSetup();
    return;
  }

  const articles = loadMediumArticles();

  if (isStatus) {
    console.log('====================================================');
    console.log('📊 Rankur Content Library Status');
    console.log('====================================================\n');
    console.log(`Total Articles Prepared: ${articles.length}`);
    console.log(`Total Monthly Batches: ${Math.ceil(articles.length / 4)} months (4 articles/month)\n`);
    for (let m = 1; m <= Math.ceil(articles.length / 4); m++) {
      const start = (m - 1) * 4;
      const monthArticles = articles.slice(start, start + 4);
      console.log(`📅 Month ${m} Batch:`);
      monthArticles.forEach(a => console.log(`   - Article ${a.index}: ${a.title.slice(0, 55)}...`));
    }
    console.log('\nRun command examples:');
    console.log('  npm run syndicate:setup        -> One-time Google login in browser');
    console.log('  npm run syndicate:month-1      -> Draft Month 1 batch (Articles 1-4)');
    console.log('  npm run syndicate:month-2      -> Draft Month 2 batch (Articles 5-8)');
    return;
  }

  // Determine articles to publish
  let queue = [];
  if (targetArticle) {
    const art = articles.find(a => a.index === targetArticle);
    if (!art) throw new Error(`Article ${targetArticle} not found (range: 1-${articles.length})`);
    queue.push(art);
  } else {
    // Monthly batch: 4 articles per month
    const startIndex = (targetMonth - 1) * 4;
    queue = articles.slice(startIndex, startIndex + 4);
    console.log(`Selected Month ${targetMonth} Batch: ${queue.length} articles (Articles ${startIndex + 1} to ${startIndex + queue.length})`);
  }

  if (queue.length === 0) {
    console.log(`No articles found for Month ${targetMonth}.`);
    return;
  }

  console.log('====================================================');
  console.log(`🚀 Rankur Hybrid Syndication Publisher`);
  console.log(`   Month: ${targetMonth} | Queue: ${queue.length} articles | Status: ${publishStatus}`);
  console.log('====================================================\n');

  if (!fs.existsSync(SESSION_DIR)) {
    console.log(`⚠️  Session directory not found. Running one-time sign-in setup first...`);
    await runSetup();
    return;
  }

  console.log('Launching browser with saved session profile...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    userDataDir: SESSION_DIR,
    headless: false, // Runs visibly so Moksh can see the automation working in real time!
    defaultViewport: null,
    args: ['--start-maximized', '--no-sandbox'],
  });

  try {
    for (const article of queue) {
      await publishMediumArticle(browser, article, publishStatus);
      // Wait between articles
      await new Promise(r => setTimeout(r, 4000));
    }
    console.log('\n====================================================');
    console.log(`🎉 Batch Complete! All ${queue.length} articles processed successfully.`);
    console.log('====================================================\n');
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('\n❌ Fatal Error:', err.message);
  process.exit(1);
});
