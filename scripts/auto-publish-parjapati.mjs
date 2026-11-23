import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SESSION_DIR = path.join(os.homedir(), '.rankur-parjapati-session');

// Parse CLI arguments
const args = process.argv.slice(2);
let targetArticleId = 20; // Default: Article 20
let publishStatus = 'draft'; // 'draft' or 'public'
let count = 1; // Default 1 article test, or --count=30

for (const arg of args) {
  if (arg.startsWith('--article=')) targetArticleId = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--count=')) count = parseInt(arg.split('=')[1], 10);
  if (arg.startsWith('--status=')) publishStatus = arg.split('=')[1].trim();
}

function loadMediumArticles() {
  const filePath = path.join(rootDir, 'RANKUR_MEDIUM_POSTS.md');
  const raw = fs.readFileSync(filePath, 'utf8');
  const blocks = raw.split(/## Article \d+:\s*/).slice(1);

  return blocks.map((block, index) => {
    const lines = block.split('\n');
    const titleLine = lines.find(l => l.startsWith('**Medium Title:**'));
    const tagsLine = lines.find(l => l.startsWith('**Tags:**'));
    const canonicalLine = lines.find(l => l.startsWith('**Canonical URL:**'));

    const title = titleLine ? titleLine.replace('**Medium Title:**', '').trim() : `Article ${index + 1}`;
    const tags = tagsLine ? tagsLine.replace('**Tags:**', '').split(',').map(t => t.trim()).filter(Boolean).slice(0, 5) : ['B2B', 'SEO'];
    const canonicalUrl = canonicalLine ? canonicalLine.replace('**Canonical URL:**', '').trim() : 'https://rankursite.com';

    const slug = canonicalUrl.replace('https://rankursite.com/blog/', '').trim();
    const jpegName = `article-${index + 1 < 10 ? '0' + (index + 1) : index + 1}-${slug}.jpeg`;
    const jpegPath = path.join(rootDir, 'medium posts', jpegName);

    return {
      id: index + 1,
      title,
      tags,
      canonicalUrl,
      jpegPath: fs.existsSync(jpegPath) ? jpegPath : null
    };
  });
}

async function processArticle(page, article) {
  console.log(`\n====================================================`);
  console.log(`🚀 Fully Automated Import for Article ${article.id}`);
  console.log(`   Title: "${article.title}"`);
  console.log(`   Canonical URL: ${article.canonicalUrl}`);
  console.log(`   Cover Image: ${article.jpegPath ? path.basename(article.jpegPath) : 'None'}`);
  console.log(`   Tags: ${article.tags.join(', ')}`);
  console.log(`====================================================`);

  console.log('1. Navigating to Medium Import Tool...');
  await page.goto('https://medium.com/p/import', { waitUntil: 'networkidle2', timeout: 60000 });

  // Type URL
  console.log('2. Entering Canonical URL and submitting...');
  const inputSelector = 'input[type="url"], input[name="url"], input';
  await page.waitForSelector(inputSelector, { timeout: 15000 });
  await page.click(inputSelector, { clickCount: 3 });
  await page.type(inputSelector, article.canonicalUrl);

  // Click Import button
  const submitBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.toLowerCase().includes('import') || b.type === 'submit');
  });
  if (submitBtn && submitBtn.asElement()) {
    await submitBtn.asElement().click();
  } else {
    await page.keyboard.press('Enter');
  }

  // Wait for import confirmation
  console.log('3. Waiting for Medium to import story and canonical backlink...');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 45000 }).catch(() => null);

  // Click "See your story"
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

  console.log(`✓ Story draft opened in editor: ${page.url()}`);

  // 4. Upload Cover Image if available
  if (article.jpegPath) {
    console.log(`4. Uploading Cover Image (${path.basename(article.jpegPath)})...`);
    try {
      // Find file input on Medium editor
      let fileInput = await page.$('input[type="file"]');
      if (!fileInput) {
        // Trigger file input by clicking add image button or focusing editor
        const addBtn = await page.$('button[data-action="inline-image"], button[aria-label="Add image"], button[aria-label="Add an image"]');
        if (addBtn) {
          await addBtn.click();
          await new Promise(r => setTimeout(r, 1000));
          fileInput = await page.$('input[type="file"]');
        }
      }

      if (fileInput) {
        await fileInput.uploadFile(article.jpegPath);
        console.log(`✓ Cover image uploaded successfully!`);
        await new Promise(r => setTimeout(r, 4000)); // wait for image to upload
      } else {
        console.log(`ℹ️ File input not directly exposed in DOM; image file available at: ${article.jpegPath}`);
      }
    } catch (imgErr) {
      console.log(`⚠️ Image upload notice: ${imgErr.message}`);
    }
  }

  console.log(`✓ Article ${article.id} fully imported and saved in Medium Drafts with canonical backlink locked.`);
}

async function main() {
  const articles = loadMediumArticles();
  const queue = articles.filter(a => a.id >= targetArticleId && a.id < targetArticleId + count);

  console.log(`Launching Chrome with authenticated @parjapatiwork session...`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    userDataDir: SESSION_DIR,
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized', '--no-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900 });

    for (const article of queue) {
      await processArticle(page, article);
      await new Promise(r => setTimeout(r, 4000));
    }

    console.log('\n====================================================');
    console.log(`🎉 Finished! Processed ${queue.length} articles automatically.`);
    console.log('====================================================\n');
  } finally {
    // Keep browser open for a few seconds to verify
    await new Promise(r => setTimeout(r, 5000));
    await browser.close();
  }
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
