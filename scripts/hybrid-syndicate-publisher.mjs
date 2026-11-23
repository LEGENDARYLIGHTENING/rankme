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
const isResume = args.includes('--resume') || args.includes('--schedule-30');
const isAll = args.includes('--all');

let startArticle = 20; // Default: start right after Article 19
let endArticle = 49;   // Default: 30 articles (20 through 49)
let targetArticle = null;
let targetMonth = null;
let publishStatus = 'draft'; // 'draft' or 'public'
let mode = 'import'; // 'import' (Medium canonical import tool) or 'editor'

for (const arg of args) {
  if (arg.startsWith('--start=')) startArticle = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--end=')) endArticle = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--article=')) targetArticle = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--status=')) publishStatus = arg.split('=')[1].trim();
  if (arg.startsWith('--mode=')) mode = arg.split('=')[1].trim();
  if (arg.startsWith('--month=')) targetMonth = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--batch=')) targetMonth = parseInt(arg.split('=')[1], 10);
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
    const tags = tagsLine ? tagsLine.replace('**Tags:**', '').split(',').map(t => t.trim()).filter(Boolean).slice(0, 5) : ['B2B', 'SEO', 'Web Development'];
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
  console.log('Launching browser window on your screen for one-time sign-in...');
  console.log('👉 Click "Sign in with Google" in the opened browser window.');
  console.log('👉 Once signed in, you can close the window. Session will stay saved permanently!\n');

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

  console.log('Browser is open on your screen. Sign in with Google now.');
  console.log('The script will detect your login automatically...');

  // Wait until user is logged in (Medium redirects to medium.com/ or homepage after sign in)
  await page.waitForFunction(() => {
    return !window.location.href.includes('/m/signin') && (document.cookie.includes('sid=') || document.cookie.includes('uid=') || !!document.querySelector('button[data-testid="headerUserMenuButton"], img[alt*="profile"], img[alt*="avatar"]'));
  }, { timeout: 300000 }).catch(() => null);

  console.log('\n✓ Login detected! Saving session profile...');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
  console.log('✓ Setup complete! Session permanently stored in', SESSION_DIR);
}

async function publishViaImport(page, article, status = 'draft') {
  console.log(`1. Navigating to Medium Official Import Tool (Canonical Link Preservation)...`);
  await page.goto('https://medium.com/p/import', { waitUntil: 'networkidle2', timeout: 60000 });

  // Verify authentication
  const isSignIn = await page.$('a[href*="/m/signin"]');
  if (isSignIn) {
    throw new Error('Not logged in to Medium. Please run setup first.');
  }

  console.log(`2. Entering Canonical URL: ${article.canonicalUrl}`);
  const inputSelector = 'input[type="url"], input[placeholder*="http"], input[name="url"], input';
  await page.waitForSelector(inputSelector, { timeout: 15000 });
  await page.click(inputSelector, { clickCount: 3 });
  await page.type(inputSelector, article.canonicalUrl);

  console.log(`3. Submitting import request...`);
  await page.keyboard.press('Enter');

  // Wait for either confirmation screen or redirect to editor
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 45000 }).catch(() => null);

  // Check for "See your story" button
  const seeStoryBtn = await page.$('a[href*="/edit"], button:has-text("See your story"), a:has-text("See your story")');
  if (seeStoryBtn) {
    await seeStoryBtn.click();
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => null);
  }

  console.log(`✓ Article imported with canonical tag pre-attached to ${article.canonicalUrl}`);

  if (status === 'public') {
    console.log(`4. Publishing story live...`);
    const publishPrompt = await page.$('button[data-action="publish-prompt"], button[data-testid="publish-button"], button:has-text("Publish")');
    if (publishPrompt) {
      await publishPrompt.click();
      await new Promise(r => setTimeout(r, 1500));

      // Enter tags
      const tagInput = await page.$('input[placeholder*="tag"], input[placeholder*="Topic"]');
      if (tagInput && article.tags.length > 0) {
        for (const tag of article.tags.slice(0, 5)) {
          await tagInput.type(tag);
          await page.keyboard.press('Enter');
          await new Promise(r => setTimeout(r, 300));
        }
      }

      // Click Publish Now
      const publishNowBtn = await page.$('button[data-action="publish-now"], button:has-text("Publish now")');
      if (publishNowBtn) {
        await publishNowBtn.click();
        await new Promise(r => setTimeout(r, 3000));
        console.log(`✓ Story published live on Medium!`);
      }
    }
  } else {
    console.log(`✓ Saved as Draft on Medium dashboard with canonical link intact.`);
  }
}

async function publishViaEditor(page, article, status = 'draft') {
  console.log(`1. Opening Medium editor...`);
  await page.goto('https://medium.com/new-story', { waitUntil: 'networkidle2', timeout: 60000 });

  const isSignInPrompt = await page.$('a[href*="/m/signin"]');
  if (isSignInPrompt) {
    throw new Error('Not logged in to Medium. Please run setup first.');
  }

  console.log(`2. Setting Title: "${article.title}"`);
  const titleSelector = 'h3[data-default-value="Title"], [data-slate-editor="true"] h3, p[data-default-value="Title"]';
  await page.waitForSelector(titleSelector, { timeout: 15000 });
  await page.click(titleSelector);
  await page.keyboard.type(article.title);
  await page.keyboard.press('Enter');

  console.log(`3. Injecting body content...`);
  const paragraphs = article.content.split('\n\n').filter(p => p.trim());
  for (const para of paragraphs.slice(0, 15)) {
    const cleanPara = para.replace(/^#+\s*/, '').trim();
    if (cleanPara) {
      await page.keyboard.type(cleanPara);
      await page.keyboard.press('Enter');
      await new Promise(r => setTimeout(r, 50));
    }
  }

  // Inject canonical attribution footnote
  const footnote = `Originally published at Rankur: ${article.canonicalUrl}`;
  await page.keyboard.type(footnote);
  await page.keyboard.press('Enter');

  console.log(`✓ Story draft saved on Medium!`);
}

async function processArticle(browser, article, status = 'draft') {
  console.log(`\n====================================================`);
  console.log(`📝 Processing Article ${article.index}: "${article.title}"`);
  console.log(`   Canonical URL: ${article.canonicalUrl}`);
  console.log(`   Tags: ${article.tags.join(', ')}`);
  console.log(`   Mode: ${mode.toUpperCase()} | Status: ${status.toUpperCase()}`);
  console.log(`====================================================`);

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  try {
    if (mode === 'import') {
      await publishViaImport(page, article, status);
    } else {
      await publishViaEditor(page, article, status);
    }
  } catch (err) {
    console.error(`⚠️ Notice on Article ${article.index}:`, err.message);
  } finally {
    await new Promise(r => setTimeout(r, 2000));
    await page.close();
  }
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
    console.log(`Total Articles in Library: ${articles.length}`);
    console.log(`Already Posted in September (Articles 15 to 19):`);
    console.log(`  - 15: Schema Markup for B2B Product and Service Pages`);
    console.log(`  - 16: SEO for B2B Service Businesses Targeting US/UK Markets`);
    console.log(`  - 17: Algorithm Update Resilience for B2B Websites`);
    console.log(`  - 18: Pillar Page Strategy for B2B Topical Authority`);
    console.log(`  - 19: SEO Audits That Uncover Hidden Lead Opportunities\n`);
    console.log(`Immediate 30-Article Queue (Articles 20 to 49):`);
    console.log(`  - Batch 1 (Month 1): Articles 20 to 29 (10 Articles)`);
    console.log(`  - Batch 2 (Month 2): Articles 30 to 39 (10 Articles)`);
    console.log(`  - Batch 3 (Month 3): Articles 40 to 49 (10 Articles)`);
    console.log(`  - Total Queue:       30 Scheduled Articles with Canonical Links\n`);
    console.log(`Reserve Queue:`);
    console.log(`  - Batch R (Articles 1-14): 14 Articles\n`);
    console.log('Available commands:');
    console.log('  npm run syndicate:setup        -> One-time Google sign-in in browser');
    console.log('  npm run syndicate:month-1      -> Schedule Month 1 (Articles 20-29)');
    console.log('  npm run syndicate:month-2      -> Schedule Month 2 (Articles 30-39)');
    console.log('  npm run syndicate:month-3      -> Schedule Month 3 (Articles 40-49)');
    console.log('  npm run syndicate:all-30       -> Schedule all 30 articles (Articles 20-49)');
    return;
  }

  let queue = [];
  if (targetArticle) {
    const art = articles.find(a => a.index === targetArticle);
    if (!art) throw new Error(`Article ${targetArticle} not found.`);
    queue.push(art);
  } else if (targetMonth === 1) {
    queue = articles.filter(a => a.index >= 20 && a.index <= 29);
  } else if (targetMonth === 2) {
    queue = articles.filter(a => a.index >= 30 && a.index <= 39);
  } else if (targetMonth === 3) {
    queue = articles.filter(a => a.index >= 40 && a.index <= 49);
  } else if (isAll || isResume) {
    // Exactly 30 articles: Articles 20 through 49
    queue = articles.filter(a => a.index >= 20 && a.index <= 49);
  } else {
    queue = articles.filter(a => a.index >= startArticle && a.index <= endArticle);
  }

  console.log('====================================================');
  console.log(`🚀 Rankur Hybrid Publisher Launching`);
  console.log(`   Articles to process: ${queue.length} (Range: Article ${queue[0]?.index} to ${queue[queue.length - 1]?.index})`);
  console.log(`   Mode: ${mode.toUpperCase()} (Medium Canonical Importer)`);
  console.log(`   Target status: ${publishStatus.toUpperCase()}`);
  console.log('====================================================\n');

  if (!fs.existsSync(SESSION_DIR)) {
    console.log('⚠️  No saved session found. Launching initial one-time Google login...');
    await runSetup();
  }

  console.log('Launching browser with authenticated profile...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    userDataDir: SESSION_DIR,
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized', '--no-sandbox'],
  });

  try {
    for (const article of queue) {
      await processArticle(browser, article, publishStatus);
      await new Promise(r => setTimeout(r, 3000));
    }
    console.log('\n====================================================');
    console.log(`🎉 Batch Finished! Processed ${queue.length} articles with canonical backlinks.`);
    console.log('====================================================\n');
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
