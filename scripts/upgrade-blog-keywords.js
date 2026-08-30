import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsDir = path.resolve(__dirname, '../blogs');
const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

console.log(`Starting Keyword Upgradation for ${files.length} existing blogs ("ADD, NOT SUBTRACT")...`);

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(blogsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  // 1. Ensure GEO Phrase exists in frontmatter
  if (!content.includes('GEO Phrase:')) {
    const titleMatch = content.match(/SEO Title:\s*(.+)/i) || content.match(/#\s*(.+)/);
    const titleText = titleMatch ? titleMatch[1].trim() : 'B2B Growth & Web Design';
    const geoLine = `GEO Phrase: How to optimize ${titleText} for B2B lead generation?\n`;
    content = content.replace(/(---[\s\S]*?)(---)/, `$1${geoLine}$2`);
    modified = true;
  }

  // 2. Ensure Target Market and Niche Tag exist
  if (!content.includes('Target Market:')) {
    content = content.replace(/(---[\s\S]*?)(---)/, `$1Target Market: US / UK / Global\n$2`);
    modified = true;
  }

  if (!content.includes('Niche Tag:')) {
    content = content.replace(/(---[\s\S]*?)(---)/, `$1Niche Tag: Website Strategy & CRO\n$2`);
    modified = true;
  }

  // 3. Ensure internal links to /services or /free-audit exist at the bottom
  if (!content.includes('/services') && !content.includes('/free-audit')) {
    const ctaBlock = `\n\n---
\n### Ready to Turn Your Website Into a High-Converting B2B Lead Machine?
If your website gets traffic but isn't producing booked sales calls, review our [B2B Growth Services](/services) or claim a [Free B2B Audit](/free-audit) to eliminate friction and scale qualified pipeline.
`;
    content = content.trim() + ctaBlock;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
  }
});

console.log(`Successfully upgraded ${updatedCount} blog files while preserving 100% of existing content.`);
