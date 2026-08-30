import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlsTxtPath = path.resolve(__dirname, '../public/urls.txt');
const unindexedTxtPath = path.resolve(__dirname, '../public/unindexed_urls.txt');

if (!fs.existsSync(urlsTxtPath)) {
  console.error('urls.txt not found!');
  process.exit(1);
}

const allUrls = fs.readFileSync(urlsTxtPath, 'utf8').split('\n').filter(Boolean);

// Already indexed URL patterns from user's GSC report
const legacyIndexed = new Set([
  'https://rankursite.com/',
  'https://rankursite.com/about',
  'https://rankursite.com/contact',
  'https://rankursite.com/process',
  'https://rankursite.com/philosophy',
  'https://rankursite.com/certifications',
  'https://rankursite.com/case-studies',
  'https://rankursite.com/saas-websites',
  'https://rankursite.com/blog',
  'https://rankursite.com/usa/contact',
  'https://rankursite.com/canada/philosophy',
  'https://rankursite.com/canada',
  'https://rankursite.com/canada/free-audit',
  'https://rankursite.com/uk/process',
  'https://rankursite.com/blog/hire-saas-seo-expert'
]);

// Filter to get all newly created, unindexed URLs
const unindexedUrls = allUrls.filter(url => !legacyIndexed.has(url));

fs.writeFileSync(unindexedTxtPath, unindexedUrls.join('\n') + '\n');
console.log(`Extracted ${unindexedUrls.length} newly created unindexed URLs to public/unindexed_urls.txt`);
