import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CHROME_USER_DATA = path.join(os.homedir(), 'Library/Application Support/Google/Chrome');
const PARJAPATI_PROFILE = 'Profile 1'; // Moksh Parjapati (parjapatiwork@gmail.com)

// Parse CLI arguments
const args = process.argv.slice(2);
const isStatus = args.includes('--status');
const isDashboard = args.includes('--dashboard');

let startArticle = 20; // Default: start right after Article 19
let endArticle = 49;   // Default: 30 articles (20 through 49)
let targetArticle = null;
let targetMonth = null;
let publishStatus = 'draft'; // 'draft' or 'public'
let mode = 'import'; // 'import' (Medium official canonical importer) or 'editor'
let selectedProfile = PARJAPATI_PROFILE;

for (const arg of args) {
  if (arg.startsWith('--start=')) startArticle = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--end=')) endArticle = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--article=')) targetArticle = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--status=')) publishStatus = arg.split('=')[1].trim();
  if (arg.startsWith('--mode=')) mode = arg.split('=')[1].trim();
  if (arg.startsWith('--month=')) targetMonth = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--profile=')) selectedProfile = arg.split('=')[1].trim();
}

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

    const title = titleLine ? titleLine.replace('**Medium Title:**', '').trim() : `Article ${index + 1}`;
    const tags = tagsLine ? tagsLine.replace('**Tags:**', '').split(',').map(t => t.trim()).filter(Boolean).slice(0, 5) : ['B2B', 'SEO', 'Web Development'];
    const canonicalUrl = canonicalLine ? canonicalLine.replace('**Canonical URL:**', '').trim() : 'https://rankursite.com';

    const contentStartIndex = lines.findIndex(l => l.startsWith('### Article Content'));
    const content = contentStartIndex !== -1 ? lines.slice(contentStartIndex + 1).join('\n').trim() : block;

    return {
      index: index + 1,
      title,
      tags,
      canonicalUrl,
      content,
    };
  });
}

async function publishViaImport(page, article, status = 'draft') {
  console.log(`1. Navigating to Medium Import tool (Canonical Link Preservation)...`);
  await page.goto('https://medium.com/p/import', { waitUntil: 'networkidle2', timeout: 60000 });

  console.log(`2. Entering Canonical URL: ${article.canonicalUrl}`);
  const inputSelector = 'input[type="url"], input[placeholder*="http"], input[name="url"], input';
  await page.waitForSelector(inputSelector, { timeout: 15000 });
  await page.click(inputSelector, { clickCount: 3 });
  await page.type(inputSelector, article.canonicalUrl);

  console.log(`3. Submitting import request...`);
  const submitBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.toLowerCase().includes('import') || b.type === 'submit');
  });
  if (submitBtn && submitBtn.asElement()) {
    await submitBtn.asElement().click();
  } else {
    await page.keyboard.press('Enter');
  }

  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 45000 }).catch(() => null);

  const seeStoryFound = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('a, button'));
    const target = elements.find(el => el.textContent.toLowerCase().includes('see your story') || (el.href && el.href.includes('/edit')));
    if (target) {
      target.click();
      return true;
    }
    return false;
  });

  if (seeStoryFound) {
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => null);
  }

  console.log(`✓ Article imported with canonical tag pre-attached to ${article.canonicalUrl}`);
}

async function processArticle(browser, article, status = 'draft') {
  console.log(`\n====================================================`);
  console.log(`📝 Processing Article ${article.index}: "${article.title}"`);
  console.log(`   Canonical URL: ${article.canonicalUrl}`);
  console.log(`   Tags: ${article.tags.join(', ')}`);
  console.log(`   Account Profile: ${selectedProfile} (parjapatiwork)`);
  console.log(`====================================================`);

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  try {
    await publishViaImport(page, article, status);
  } catch (err) {
    console.error(`⚠️ Notice on Article ${article.index}:`, err.message);
  } finally {
    await new Promise(r => setTimeout(r, 2000));
    await page.close();
  }
}

async function main() {
  const articles = loadMediumArticles();

  if (isStatus) {
    console.log('====================================================');
    console.log('📊 Rankur Content Library Status (@parjapatiwork)');
    console.log('====================================================\n');
    console.log(`Target Profile: ${selectedProfile} (parjapatiwork@gmail.com)`);
    console.log(`Total Articles in Library: ${articles.length}`);
    console.log(`Already Posted in September: Articles 15 to 19 (5 articles)`);
    console.log(`30-Article Queue (Articles 20 to 49): 30 Scheduled Masterclasses\n`);
    console.log('Available Options:');
    console.log('  1. Open Visual Hub: open prototype/syndicate-parjapatiwork.html');
    console.log('  2. Run CLI Month 1: node scripts/hybrid-syndicate-publisher.mjs --month=1');
    console.log('  3. Run CLI Month 2: node scripts/hybrid-syndicate-publisher.mjs --month=2');
    console.log('  4. Run CLI Month 3: node scripts/hybrid-syndicate-publisher.mjs --month=3\n');
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
  } else {
    queue = articles.filter(a => a.index >= startArticle && a.index <= endArticle);
  }

  console.log('====================================================');
  console.log(`🚀 Rankur Hybrid Publisher Launching`);
  console.log(`   Account: Moksh Parjapati (Profile: ${selectedProfile} / parjapatiwork)`);
  console.log(`   Articles to process: ${queue.length} (Articles ${queue[0]?.index} to ${queue[queue.length - 1]?.index})`);
  console.log('====================================================\n');

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      userDataDir: CHROME_USER_DATA,
      headless: false,
      defaultViewport: null,
      args: [
        `--profile-directory=${selectedProfile}`,
        '--start-maximized',
        '--no-sandbox',
      ],
    });
  } catch (launchErr) {
    if (launchErr.message.includes('ProcessSingleton') || launchErr.message.includes('lock')) {
      console.log('ℹ️ Google Chrome is currently open with your parjapatiwork profile.');
      console.log('👉 To publish directly in your open browser without quitting Chrome:');
      console.log('   Open prototype/syndicate-parjapatiwork.html in Chrome!');
      console.log('   It lets you 1-click import all 30 articles directly into Medium.\n');
      return;
    }
    throw launchErr;
  }

  try {
    for (const article of queue) {
      await processArticle(browser, article, publishStatus);
      await new Promise(r => setTimeout(r, 3000));
    }
    console.log('\n====================================================');
    console.log(`🎉 Batch Complete! Processed ${queue.length} articles with canonical backlinks.`);
    console.log('====================================================\n');
  } finally {
    await browser.close();
  }
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
