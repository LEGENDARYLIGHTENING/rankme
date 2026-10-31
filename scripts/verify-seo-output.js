import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appServerDir = path.resolve(__dirname, '../.next/server/app');

const pages = [
  { file: 'index.html', label: 'Home' },
  { file: 'services.html', label: 'Services' },
  { file: 'case-studies.html', label: 'Case Studies' },
  { file: 'blog.html', label: 'Blog Index' },
  { file: 'locations.html', label: 'Locations' },
  { file: 'about.html', label: 'About' },
  { file: 'contact.html', label: 'Contact' },
  { file: 'usa.html', label: 'USA Silo' },
  { file: 'blog/saas-website-development-agency-us.html', label: 'Sample Blog Post' },
];

console.log('=== VERIFYING RENDERED HTML METADATA & CANONICALS ===\n');

for (const p of pages) {
  const filePath = path.join(appServerDir, p.file);
  if (!fs.existsSync(filePath)) {
    console.log(`[FAIL] Missing file: ${p.file}`);
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  const title = (html.match(/<title>([^<]+)<\/title>/i) || [])[1];
  const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) || [])[1];
  const ogUrl = (html.match(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i) || [])[1];
  const ogTitle = (html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) || [])[1];

  console.log(`PAGE: ${p.label}`);
  console.log(`  Canonical: ${canonical}`);
  console.log(`  OG URL:    ${ogUrl}`);
  console.log(`  Match:     ${canonical === ogUrl ? '✓ MATCH' : '✗ MISMATCH'}`);
  console.log(`  Title:     ${title}`);
  console.log(`  OG Title:  ${ogTitle}\n`);
}
