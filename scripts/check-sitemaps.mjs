import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const sitemapDir = path.join(rootDir, 'public/sitemap');
const serverAppDir = path.join(rootDir, '.next/server/app');

// 1. Gather all XML child sitemaps
const childSitemaps = ['core.xml', 'countries.xml', 'blogs.xml'];
const sitemapUrls = [];

for (const sm of childSitemaps) {
  const filePath = path.join(sitemapDir, sm);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing sitemap file: ${filePath}`);
    process.exit(1);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/<loc>(.*?)<\/loc>/g) || [];
  for (const m of matches) {
    const url = m.replace(/<\/?loc>/g, '').trim();
    if (url) {
      sitemapUrls.push({ url, sitemap: sm });
    }
  }
}

console.log(`Found ${sitemapUrls.length} total URLs across child sitemaps (${childSitemaps.join(', ')}).`);

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { pathToRegexp } = require('next/dist/compiled/path-to-regexp');

const redirectsPath = path.join(rootDir, 'src/data/legacyRedirects.json');
let redirects = [];
if (fs.existsSync(redirectsPath)) {
  redirects = JSON.parse(fs.readFileSync(redirectsPath, 'utf8'));
}

const compiledRedirects = redirects.map(r => ({
  ...r,
  regex: pathToRegexp(r.source)
}));

function matchRedirect(urlPath) {
  for (const r of compiledRedirects) {
    if (r.regex.test(urlPath)) {
      return r.destination;
    }
  }
  return null;
}

// 3. Helper to locate built HTML file for a URL
function getBuiltHtmlPath(urlStr) {
  const u = new URL(urlStr);
  let p = u.pathname;
  if (p === '/' || p === '') {
    return path.join(serverAppDir, 'index.html');
  }
  if (p.endsWith('/')) p = p.slice(0, -1);

  // Check direct file: e.g. /services -> services.html
  const directPath = path.join(serverAppDir, `${p}.html`);
  if (fs.existsSync(directPath)) return directPath;

  // Check nested: e.g. /blog/xyz -> blog/xyz.html
  const nestedPath = path.join(serverAppDir, `${p.slice(1)}.html`);
  if (fs.existsSync(nestedPath)) return nestedPath;

  // Check category: /blog/category/xyz -> blog/category/xyz.html
  const catPath = path.join(serverAppDir, `${p.slice(1)}.html`);
  if (fs.existsSync(catPath)) return catPath;

  return null;
}

// 4. Crawl and inspect every URL
const rows = [];
let violations = 0;

for (const item of sitemapUrls) {
  const url = item.url;
  const u = new URL(url);
  const pathname = u.pathname;

  // Check redirect
  const redirectTarget = matchRedirect(pathname);

  // Locate built HTML
  const htmlPath = getBuiltHtmlPath(url);

  let status = 200;
  let canonical = '';
  let robotsMeta = '';

  if (redirectTarget) {
    status = 301;
  } else if (!htmlPath || !fs.existsSync(htmlPath)) {
    status = 404;
  } else {
    const html = fs.readFileSync(htmlPath, 'utf8');
    
    // Extract canonical
    const canMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                     html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
    canonical = canMatch ? canMatch[1] : '';

    // Extract robots
    const robMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i) ||
                     html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']robots["']/i);
    robotsMeta = robMatch ? robMatch[1] : '';
  }

  // Canonical normalization: allow trailing slash match if same origin and path
  const cleanUrl = url.replace(/\/$/, '');
  const cleanCanonical = canonical.replace(/\/$/, '');
  const isCanonicalMatch = cleanUrl === cleanCanonical;
  const isNoindex = robotsMeta.toLowerCase().includes('noindex');

  // Verify invariant rules
  let failed = false;
  let failureReason = [];

  if (status !== 200) {
    failed = true;
    failureReason.push(`HTTP status ${status} (expected 200)`);
  }
  if (redirectTarget) {
    failed = true;
    failureReason.push(`Redirects to ${redirectTarget}`);
  }
  if (!isCanonicalMatch) {
    failed = true;
    failureReason.push(`Canonical mismatch: '${canonical}' vs '${url}'`);
  }
  if (isNoindex) {
    failed = true;
    failureReason.push(`Robots meta is noindex in sitemap: '${robotsMeta}'`);
  }

  if (failed) {
    violations++;
    console.error(`FAIL: ${url} -> ${failureReason.join(', ')}`);
  }

  rows.push({
    url,
    status,
    redirectTarget: redirectTarget || '',
    canonical,
    robotsMeta,
    inSitemap: 'y'
  });
}

// 5. Write sitemap-check.csv
function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

const csvHeader = ['url', 'status', 'redirect_target', 'canonical', 'robots_meta', 'in_sitemap'].join(',');
const csvLines = rows.map(r => [
  escapeCsv(r.url),
  r.status,
  escapeCsv(r.redirectTarget),
  escapeCsv(r.canonical),
  escapeCsv(r.robotsMeta),
  escapeCsv(r.inSitemap)
].join(','));

const csvContent = [csvHeader, ...csvLines].join('\n');
fs.writeFileSync(path.join(rootDir, 'sitemap-check.csv'), csvContent, 'utf8');

console.log(`\nWrote sitemap-check.csv with ${rows.length} verified URLs.`);

if (violations > 0) {
  console.error(`\nFAILED: Found ${violations} sitemap invariant violations!`);
  process.exit(1);
} else {
  console.log(`\nPASSED: 100% of sitemap URLs return 200, zero redirects, zero canonical mismatches, zero noindex.`);
}
