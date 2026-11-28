import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const require = createRequire(path.join(rootDir, 'package.json'));
const sharp = require('sharp');

const isPostbuild = process.argv.includes('--postbuild');
const errors = [];

function fail(msg) {
  errors.push(msg);
}

function decodeHtmlEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&ndash;/g, '-')
    .replace(/&mdash;/g, '-');
}

function walkFiles(dir, exts, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (['node_modules', '.next', '.git', 'dist'].includes(ent.name)) continue;
      walkFiles(p, exts, out);
    } else if (exts.some(ext => ent.name.endsWith(ext))) {
      out.push(p);
    }
  }
  return out;
}

async function runPrebuildChecks() {
  console.log('--- Running seo-check (prebuild P0/P1 invariants) ---');

  // P0 Invariant: No "TODO" string in user-facing source code or data files
  const userFacingDirs = ['src/views', 'src/components', 'src/data', 'app'];
  for (const ufDir of userFacingDirs) {
    const fullDir = path.join(rootDir, ufDir);
    const files = walkFiles(fullDir, ['.jsx', '.js', '.json']);
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      if (/\bTODO\b/i.test(content)) {
        fail(`[P0] Unresolved "TODO" string found in user-facing file: ${path.relative(rootDir, file)}`);
      }
    }
  }

  // B1, B4, B5, B7 across blogs/*.md & blog views/routes
  const blogsDir = path.join(rootDir, 'blogs');
  const mdFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

  for (const f of mdFiles) {
    const c = fs.readFileSync(path.join(blogsDir, f), 'utf8');
    if (/\[Internal link:/i.test(c) || /\[External link:/i.test(c)) {
      fail(`[B1] Unresolved placeholder in blogs/${f}`);
    }
    if (/###\s*Regional Impact & Commercial Execution/i.test(c)) {
      fail(`[B7] Regional Impact doorway section still in blogs/${f}`);
    }
    if (/\]\(\/[a-z0-9-]+-(?:us|uk|canada|australia)\)/i.test(c)) {
      fail(`[B7/L2] City doorway link still in blogs/${f}`);
    }
    if (/\bGoogle SGE\b|\bGoogle's SGE\b/i.test(c)) {
      fail(`[B4] Outdated Google SGE reference in blogs/${f}`);
    }
    if (/Gartner-observed|Research from Forrester and Gartner/i.test(c)) {
      fail(`[B4] Unsourced Gartner/Forrester claim in blogs/${f}`);
    }
    if (/B2B\s+Manufacturing\s+Client/i.test(c)) {
      fail(`[B4] Anonymous B2B Manufacturing Client string in blogs/${f}`);
    }
    if (/money-back guarantee|Verify Footer Link|footer backlink/i.test(c)) {
      fail(`[C5/C6] Unverified guarantee or backlink phrasing in blogs/${f}`);
    }
    const fmDate = c.match(/^Date:\s*(\d{4}-\d{2}-\d{2})/m);
    if (!fmDate || fmDate[1] < '2026-01-01') {
      fail(`[B2] Invalid or backdated frontmatter Date in blogs/${f}: ${fmDate ? fmDate[1] : 'MISSING'}`);
    }
  }

  // Check blog code files
  for (const rel of ['src/views/Blog.jsx', 'src/views/BlogPost.jsx', 'app/blog/[slug]/page.jsx']) {
    const full = path.join(rootDir, rel);
    const c = fs.readFileSync(full, 'utf8');
    if (/View Money Services/i.test(c)) fail(`[B7] "View Money Services" still in ${rel}`);
    if (/85\+ City Hubs|Explore Regional B2B Growth Hubs/i.test(c)) fail(`[B7] Regional hubs block still in ${rel}`);
    if (/High-converting growth marketing and web systems targeting/i.test(c)) fail(`[B5] Alt boilerplate in ${rel}`);
    if (/B2B Manufacturing Client/i.test(c)) fail(`[B4] Anonymous B2B Manufacturing Client in ${rel}`);
    if (/unsplash\.com/i.test(c)) fail(`[B5] Unsplash hotlink still in ${rel}`);
  }

  // Check blogs-index.json
  const indexPath = path.join(rootDir, 'src/data/blogs-index.json');
  const blogIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const tags = [...new Set(blogIndex.map(b => b.tag))];
  const lowerTags = new Set(tags.map(t => t.toLowerCase()));
  if (tags.length !== lowerTags.size) {
    fail(`[B6] Duplicate case-insensitive blog taxonomy tags found: ${tags.join(', ')}`);
  }

  const verifiedLocalImages = new Set();
  for (const post of blogIndex) {
    if (!post.slug || /^blog_\d+$/i.test(post.slug)) {
      fail(`[B2/B6] Invalid parsed slug on ${post.filename}: ${post.slug}`);
    }
    if (!post.datePublished || post.datePublished < '2026-01-01') {
      fail(`[B2] Backdated or missing datePublished on ${post.slug}: ${post.datePublished}`);
    }
    if (!post.image || /unsplash\.com/i.test(post.image)) {
      fail(`[B5] Missing or Unsplash image on ${post.slug}: ${post.image}`);
    } else if (!verifiedLocalImages.has(post.image)) {
      const imgFile = path.join(rootDir, 'public', post.image.replace(/^\//, ''));
      if (!fs.existsSync(imgFile)) {
        fail(`[B5] Referenced local image does not exist: ${imgFile}`);
      } else {
        const meta = await sharp(imgFile).metadata();
        if (meta.width !== 1200 || meta.height !== 630) {
          fail(`[B5] Image ${post.image} must be 1200x630, got ${meta.width}x${meta.height}`);
        }
      }
      verifiedLocalImages.add(post.image);
    }
    if (/High-converting growth marketing/i.test(post.imageAlt || '')) {
      fail(`[B5] Boilerplate imageAlt on ${post.slug}`);
    }
  }

  // Verify default OG/Twitter images
  for (const ogRel of ['og-image.jpg', 'twitter-image.jpg']) {
    const ogFile = path.join(rootDir, 'public', ogRel);
    if (!fs.existsSync(ogFile)) {
      fail(`[B5] Missing public/${ogRel}`);
    } else {
      const meta = await sharp(ogFile).metadata();
      if (meta.width !== 1200 || meta.height !== 630) {
        fail(`[B5] public/${ogRel} must be 1200x630, got ${meta.width}x${meta.height}`);
      }
    }
  }

  // B3 triage CSV existence & >=3 inbound links on kept posts
  const triagePath = path.join(rootDir, 'audit/blog-triage.csv');
  if (!fs.existsSync(triagePath)) {
    fail('[B3] Missing audit/blog-triage.csv');
  } else {
    const csvLines = fs.readFileSync(triagePath, 'utf8').trim().split(/\r?\n/).slice(1);
    if (csvLines.length < 100) {
      fail(`[B3] audit/blog-triage.csv expected >=100 rows, got ${csvLines.length}`);
    }
    for (const line of csvLines) {
      if (line.includes(',keep,')) {
        const parts = line.split(',');
        const inbound = parseInt(parts[parts.length - 3], 10);
        if (isNaN(inbound) || inbound < 3) {
          fail(`[B6] Kept post in blog-triage.csv has < 3 inbound links: ${line.slice(0, 80)}`);
        }
      }
    }
  }

  // Wave 1 Invariant: Fail if any internal link anywhere points to a 410 or 301 URL
  const proposalV2Path = path.join(rootDir, 'redirects-proposal-v2.csv');
  if (fs.existsSync(proposalV2Path)) {
    const pLines = fs.readFileSync(proposalV2Path, 'utf8').trim().split(/\r?\n/).slice(1);
    const blockedSlugs = new Set();
    for (const pl of pLines) {
      const m = pl.match(/^"([^"]+)","([^"]+)"/);
      if (m && (m[2] === '410' || m[2] === '301')) {
        blockedSlugs.add(m[1]);
      }
    }
    const scanDirs = ['src', 'app', 'blogs'];
    for (const sd of scanDirs) {
      const fullSd = path.join(rootDir, sd);
      const files = walkFiles(fullSd, ['.js', '.jsx', '.json', '.md']);
      for (const file of files) {
        const rel = path.relative(rootDir, file);
        if (rel === 'src/data/goneSlugs.json') continue;
        const txt = fs.readFileSync(file, 'utf8');
        for (const m of txt.matchAll(/\/blog\/([a-z0-9-]+)/gi)) {
          if (blockedSlugs.has(m[1])) {
            fail(`[Wave1] Internal link points to 410/301 URL (/blog/${m[1]}) in ${rel}`);
          }
        }
      }
    }
  }

  // Phase 2 (L1-L3): Dead city artifacts removed, 301-only redirects, sitemap & country copy hygiene
  const deadPaths = [
    'src/data/cityData.jsx',
    'src/data/cityKeywords.json',
    'cities.json',
    'scripts/build-city-keywords.js',
    'scripts/build-region-dir.js',
    'scripts/generate-city-data.js',
    'scripts/expand-cities.js',
    'scripts/enrich-blog-internal-links.js',
    'public/sitemap/new-zealand.xml',
    'public/sitemap/ireland.xml',
    'public/sitemap/qatar.xml',
    'public/sitemap/singapore.xml',
    'public/sitemap/germany.xml',
  ];
  for (const rel of deadPaths) {
    if (fs.existsSync(path.join(rootDir, rel))) {
      fail(`[L1/L2] Deprecated city/noindex-sitemap file still exists: ${rel}`);
    }
  }

  const nextCfg = fs.readFileSync(path.join(rootDir, 'next.config.mjs'), 'utf8');
  if (/permanent\s*:\s*true/.test(nextCfg)) {
    fail('[L1] next.config.mjs still uses permanent: true (emits 308 instead of 301)');
  }

  const legacyRedirects = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/legacyRedirects.json'), 'utf8'));
  const vercelCfg = JSON.parse(fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf8'));
  if (!Array.isArray(vercelCfg.redirects) || vercelCfg.redirects.length !== legacyRedirects.length) {
    fail('[L1] vercel.json redirects out of sync with src/data/legacyRedirects.json');
  } else {
    for (const r of vercelCfg.redirects) {
      if (r.permanent !== undefined || r.statusCode !== 301) {
        fail(`[L1] Redirect must use statusCode: 301 (no permanent flag): ${r.source}`);
      }
    }
    const wildcardCatch = vercelCfg.redirects.find((r) => /\.\*\)\/:service/.test(r.source));
    if (wildcardCatch) {
      fail('[L1/S4] Wildcard /:region/:service catch-all still present in redirects');
    }
  }

  for (const rel of ['src/components/Footer.jsx', 'app/locations/page.jsx']) {
    const c = fs.readFileSync(path.join(rootDir, rel), 'utf8');
    if (/Tier-1 Market Silos|Global Hubs|Market Silo\s*→|guaranteed 90\+ Core Web Vitals/i.test(c)) {
      fail(`[L2] Deprecated location/market phrasing in ${rel}`);
    }
  }

  const countriesXml = fs.readFileSync(path.join(rootDir, 'public/sitemap/countries.xml'), 'utf8');
  const countryLocs = [...countriesXml.matchAll(/<loc>https:\/\/rankursite\.com\/([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expectedCountries = ['usa', 'uk', 'canada', 'australia', 'uae', 'saudi-arabia'];
  if (countryLocs.length !== expectedCountries.length || expectedCountries.some((c) => !countryLocs.includes(c))) {
    fail(`[L2] sitemap/countries.xml must contain only the 6 active hubs, got: ${countryLocs.join(', ')}`);
  }

  const countryDataSrc = fs.readFileSync(path.join(rootDir, 'src/data/countryData.jsx'), 'utf8');
  if (/across United States|across United Kingdom|across United Arab Emirates|Many national companies across|B2B manufacturing client|Fortune 500/i.test(countryDataSrc)) {
    fail('[L3] Grammar defect or templated/unverified claim found in src/data/countryData.jsx');
  }

  // Phase 3 (T1-T7): Layout, <Seo> hygiene, Nav/Links, Credentials, Crawlability FAQs, Legal & Consent
  const publicFiles = fs.readdirSync(path.join(rootDir, 'public'));
  for (const pf of publicFiles) {
    if (/^Copilot_/i.test(pf)) {
      fail(`[T1] Legacy Copilot template asset still in public/: ${pf}`);
    }
  }
  for (const deadVite of ['src/App.jsx', 'src/main.jsx', 'src/App.css']) {
    if (fs.existsSync(path.join(rootDir, deadVite))) {
      fail(`[T1] Legacy Vite entry file still exists: ${deadVite}`);
    }
  }

  const navSrc = fs.readFileSync(path.join(rootDir, 'src/components/Navbar.jsx'), 'utf8');
  if (/Meet Moksh|Capabilities|Growth Audit/.test(navSrc)) {
    fail('[T3] Deprecated nav labels still present in Navbar.jsx');
  }
  if ((navSrc.match(/navLinks\.map/g) || []).length !== 1) {
    fail('[T1] Navbar.jsx must render navLinks only once in the DOM');
  }

  // T3/T4/T5 across app/ & src/
  const codeFiles = [
    ...walkFiles(path.join(rootDir, 'app'), ['.js', '.jsx', '.ts', '.tsx']),
    ...walkFiles(path.join(rootDir, 'src'), ['.js', '.jsx', '.ts', '.tsx']),
  ];
  for (const cf of codeFiles) {
    const rel = path.relative(rootDir, cf);
    const c = fs.readFileSync(cf, 'utf8');
    if (/medium\.com/i.test(c) || /moksh-portfolio-smoky\.vercel\.app/i.test(c)) {
      fail(`[T3] Deprecated medium.com or vercel.app reference in ${rel}`);
    }
    if (/openFaq\s*===\s*i\s*&&/.test(c)) {
      fail(`[T6] Conditionally unmounted FAQ answer (openFaq === i &&) in ${rel}`);
    }
  }

  const contactSrc = fs.readFileSync(path.join(rootDir, 'src/views/Contact.jsx'), 'utf8');
  if (/href=["']https?:\/\/(?:www\.)?linkedin\.com["']/i.test(contactSrc)) {
    fail('[T3] Bare linkedin.com root URL still in Contact.jsx');
  }
  const freeAuditSrc = fs.readFileSync(path.join(rootDir, 'src/views/FreeAudit.jsx'), 'utf8');
  for (const [label, src] of [['Contact.jsx', contactSrc], ['FreeAudit.jsx', freeAuditSrc]]) {
    if (!/name=["']botcheck["']/.test(src)) fail(`[T7] Missing Web3Forms botcheck honeypot in ${label}`);
    if (!/href=["']\/privacy["']/.test(src) || !/href=["']\/terms["']/.test(src)) {
      fail(`[T7] Missing /privacy and /terms consent links in ${label}`);
    }
  }

  const aboutSrc = fs.readFileSync(path.join(rootDir, 'src/views/About.jsx'), 'utf8');
  if (/Rankur\\'s|ConversionXL|Alibaba|unsplash\.com/i.test(aboutSrc)) {
    fail('[T4/T5] Escaped apostrophe, unverified cert, or Unsplash stock photo still in About.jsx');
  }
  const certsSrc = fs.readFileSync(path.join(rootDir, 'src/views/Certifications.jsx'), 'utf8');
  if (!aboutSrc.includes('credentials') || !certsSrc.includes('credentials')) {
    fail('[T5] About.jsx and Certifications.jsx must share src/data/credentials.js');
  }
  const certsPageSrc = fs.readFileSync(path.join(rootDir, 'app/certifications/page.jsx'), 'utf8');
  if (/Next\.js development|technical SEO/i.test(certsPageSrc)) {
    fail('[T5] app/certifications/page.jsx still claims unverified Next.js/technical SEO certs');
  }

  for (const legal of ['app/privacy/page.jsx', 'app/terms/page.jsx']) {
    const lp = path.join(rootDir, legal);
    if (!fs.existsSync(lp)) {
      fail(`[T7] Missing legal route: ${legal}`);
    } else {
      const c = fs.readFileSync(lp, 'utf8');
      if (!c.includes('Moksh Productions') || !c.includes('contactus@rankursite.com')) {
        fail(`[T7] Missing operating entity or contact email on ${legal}`);
      }
    }
  }

  const layoutSrc = fs.readFileSync(path.join(rootDir, 'app/layout.jsx'), 'utf8');
  if (/googletagmanager\.com\/gtag\/js/.test(layoutSrc)) {
    fail('[T7] Unconditional GA4 script still embedded in app/layout.jsx (must be consent-gated)');
  }

  // Phase 4 (C1-C8): Trust, Disclosures, Screenshots, Guarantee, Backlinks, Voice & CTA
  for (const deadFile of ['src/data/local-intent.json', 'scripts/merge-intent.cjs']) {
    if (fs.existsSync(path.join(rootDir, deadFile))) {
      fail(`[C5/C7] Dead intent/template data file still exists: ${deadFile}`);
    }
  }

  const phase4Files = walkFiles(path.join(rootDir, 'src'), ['.js', '.jsx', '.json']);
  for (const pf of phase4Files) {
    const rel = path.relative(rootDir, pf);
    if (rel === 'src\\data\\blogs-index.json' || rel === 'src/data/blogs-index.json' || rel.endsWith('psiMetrics.json')) continue;
    const c = fs.readFileSync(pf, 'utf8');
    if (/unsplash\.com/i.test(c)) fail(`[C4] Unsplash stock photo still referenced in ${rel}`);
    if (/money-back guarantee|100% Risk-Free Guarantee/i.test(c)) fail(`[C5] Unverified money-back guarantee still in ${rel}`);
    if (/Verify Footer Link|site-wide backlink|Verify Backlink|Verify backlink in footer/i.test(c)) fail(`[C6] Link-scheme backlink phrasing still in ${rel}`);
    if (/B2B\s+Manufacturing\s+Client/i.test(c)) fail(`[C1/B4] Anonymous B2B Manufacturing Client string still in ${rel}`);
    if (/100% Crawl Indexation|< 0\.9s|< 1\.2s|50\+ Leads|10 Days To First Lead/i.test(c)) fail(`[C2] Unproven metric claim still in ${rel}`);
  }

  const testimonialsSrc = fs.readFileSync(path.join(rootDir, 'src/components/Testimonials.jsx'), 'utf8');
  if (!testimonialsSrc.includes('APPROVED_TESTIMONIALS') && !testimonialsSrc.includes('testimonials')) {
    fail('[C3] Testimonials.jsx must source data from src/data/testimonials.js');
  }
  const caseStudiesSrc = fs.readFileSync(path.join(rootDir, 'src/views/CaseStudies.jsx'), 'utf8');
  const trustBarSrc = fs.readFileSync(path.join(rootDir, 'src/components/ClientTrustBar.jsx'), 'utf8');
  const homeSrc = fs.readFileSync(path.join(rootDir, 'src/views/Home.jsx'), 'utf8');
  for (const [lbl, txt] of [['Home.jsx', homeSrc], ['CaseStudies.jsx', caseStudiesSrc], ['ClientTrustBar.jsx', trustBarSrc]]) {
    if (!/Wafa/i.test(txt)) fail(`[C1] Missing Wafa Trust featured platform in ${lbl}`);
  }
  for (const shot of ['wafa-trust-logo.jpeg']) {
    if (!fs.existsSync(path.join(rootDir, 'public', shot))) {
      fail(`[C4] Missing client asset: public/${shot}`);
    }
  }

  // Phase 5 (S1-S8): Robots, Schema, Asset Size, Favicon/Manifest, Security Headers
  const robotsTxt = fs.readFileSync(path.join(rootDir, 'public/robots.txt'), 'utf8');
  if (!/Allow:\s*\/_next\/static\//i.test(robotsTxt)) {
    fail('[S1] public/robots.txt must explicitly Allow: /_next/static/');
  }
  if (/^\s*Disallow:\s*\/_next\/\s*$/im.test(robotsTxt)) {
    fail('[S1] public/robots.txt must not block /_next/ globally');
  }

  const favSvg = fs.readFileSync(path.join(rootDir, 'public/favicon.svg'), 'utf8');
  if (!favSvg.includes('>R</text>') || favSvg.includes('>P</text>')) {
    fail('[S7] public/favicon.svg must render R (not P)');
  }
  const manifestPath = path.join(rootDir, 'public/manifest.webmanifest');
  if (!fs.existsSync(manifestPath)) {
    fail('[S7] Missing public/manifest.webmanifest');
  } else {
    JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  }

  const logoSize = fs.statSync(path.join(rootDir, 'public/rankur-logo.png')).size;
  if (logoSize > 102400) {
    fail(`[S6] public/rankur-logo.png is too heavy (${logoSize} bytes > 102400)`);
  }

  if (!layoutSrc.includes("legalName: 'Moksh Productions'") || layoutSrc.includes('wafatrust.org')) {
    fail('[S5] app/layout.jsx masterSchema missing Moksh Productions legalName or still cites offline wafatrust.org');
  }

  const nextCfgLatest = fs.readFileSync(path.join(rootDir, 'next.config.mjs'), 'utf8');
  const vercelLatest = JSON.parse(fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf8'));
  if (!nextCfgLatest.includes('skipTrailingSlashRedirect: true')) {
    fail('[S3/L1] next.config.mjs must enable skipTrailingSlashRedirect: true so middleware returns 301 instead of 308');
  }
  for (const hKey of ['Strict-Transport-Security', 'X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy', 'Content-Security-Policy']) {
    if (!nextCfgLatest.includes(hKey)) fail(`[S8] next.config.mjs missing header ${hKey}`);
    const vHas = (vercelLatest.headers?.[0]?.headers || []).some((h) => h.key === hKey);
    if (!vHas) fail(`[S8] vercel.json missing header ${hKey}`);
  }
}

function checkBuiltHtmlFile(filePath, relLabel) {
  const html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('&amp;amp;')) {
    fail(`[T2] Double-encoded &amp;amp; in ${relLabel}`);
  }
  if (/\[Internal link:|\[External link:/i.test(html)) {
    fail(`[B1] Template placeholder in built HTML: ${relLabel}`);
  }
  if (/View Money Services|85\+ City Hubs|B2B Manufacturing Client|unsplash\.com|money-back guarantee|Verify Footer Link|footer backlink/i.test(html)) {
    fail(`[B4/B5/B7/C4/C5/C6] Forbidden string in built HTML: ${relLabel}`);
  }

  // Head-only checks (canonical, og:url, title, og:title, desc, og:image)
  const head = (html.match(/<head>([\s\S]*?)<\/head>/i) || ['', html])[1];

  const canonicals = [...head.matchAll(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi)];
  const ogUrls = [...head.matchAll(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["'][^>]*>/gi)];
  const titles = [...head.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)];
  const ogTitles = [...head.matchAll(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/gi)];
  const descs = [...head.matchAll(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/gi)];
  const ogW = head.match(/<meta[^>]*property=["']og:image:width["'][^>]*content=["'](\d+)["']/i);
  const ogH = head.match(/<meta[^>]*property=["']og:image:height["'][^>]*content=["'](\d+)["']/i);
  const ogAlt = head.match(/<meta[^>]*property=["']og:image:alt["'][^>]*content=["']([^"']+)["']/i);

  if (canonicals.length !== 1) fail(`[T2] Expected 1 canonical in ${relLabel}, found ${canonicals.length}`);
  if (ogUrls.length !== 1) fail(`[T2] Expected 1 og:url in ${relLabel}, found ${ogUrls.length}`);
  if (canonicals[0] && ogUrls[0] && canonicals[0][1] !== ogUrls[0][1]) {
    fail(`[T2] canonical (${canonicals[0][1]}) !== og:url (${ogUrls[0][1]}) in ${relLabel}`);
  }

  if (titles.length !== 1 || ogTitles.length !== 1) {
    fail(`[T2] Missing title/og:title in ${relLabel}`);
  } else {
    const t = decodeHtmlEntities(titles[0][1]);
    const ogt = decodeHtmlEntities(ogTitles[0][1]);
    if (t !== ogt) fail(`[T2] title "${t}" !== og:title "${ogt}" in ${relLabel}`);
    if (t.length > 60) fail(`[T2] title length ${t.length} > 60 in ${relLabel}: "${t}"`);
  }

  if (descs.length !== 1) {
    fail(`[T2] Expected 1 meta description in ${relLabel}`);
  } else {
    const d = decodeHtmlEntities(descs[0][1]);
    if (d.length > 155) fail(`[T2] description length ${d.length} > 155 in ${relLabel}`);
  }

  if (!ogW || !ogH || !ogAlt) {
    fail(`[T2/B5] Missing og:image:width/height/alt in ${relLabel}`);
  }

  // Body checks: single H1 (skip internal Next.js hidden template h1 if any : check <main> or visible h1s)
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  const mainHtml = mainMatch ? mainMatch[0] : html;
  const h1Count = (mainHtml.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) {
    fail(`[T2] Expected 1 <h1> in <main> of ${relLabel}, found ${h1Count}`);
  }
}

async function runPostbuildChecks() {
  console.log('--- Running seo-check --postbuild (built HTML verification) ---');
  const nextAppDir = path.join(rootDir, '.next/server/app');
  if (!fs.existsSync(nextAppDir)) {
    fail('.next/server/app does not exist. Run next build first.');
    return;
  }

  // Check blog index, pagination, category hubs, and all blog post HTMLs
  const htmlFiles = walkFiles(path.join(nextAppDir, 'blog'), ['.html']);
  const blogMainHtml = path.join(nextAppDir, 'blog.html');
  if (fs.existsSync(blogMainHtml)) htmlFiles.push(blogMainHtml);

  console.log(`Checking ${htmlFiles.length} built blog HTML files...`);
  if (!fs.existsSync(path.join(nextAppDir, 'blog/page/2.html'))) {
    fail('[B6] Missing built pagination HTML: blog/page/2.html');
  }
  if (!fs.existsSync(path.join(nextAppDir, 'blog/category/saas-tech-startups.html'))) {
    fail('[B6] Missing built category hub HTML: blog/category/saas-tech-startups.html');
  }
  for (const f of htmlFiles) {
    checkBuiltHtmlFile(f, path.relative(nextAppDir, f));
  }

  // Phase 2 (L1-L3) postbuild HTML verification:
  for (const staleCity of ['el-paso-us', 'atlanta-us', 'london-uk', 'dubai-uae']) {
    if (fs.existsSync(path.join(nextAppDir, `${staleCity}.html`))) {
      fail(`[L1] City doorway HTML should not be built: ${staleCity}.html`);
    }
  }

  const locationsHtmlPath = path.join(nextAppDir, 'locations.html');
  if (!fs.existsSync(locationsHtmlPath)) {
    fail('[L2] Missing built locations.html');
  } else {
    checkBuiltHtmlFile(locationsHtmlPath, 'locations.html');
    const locHtml = fs.readFileSync(locationsHtmlPath, 'utf8');
    for (const heldBack of ['new-zealand', 'ireland', 'qatar', 'singapore', 'germany']) {
      if (locHtml.includes(`href="/${heldBack}"`)) {
        fail(`[L2] /locations still links to noindex country /${heldBack}`);
      }
    }
  }

  const activeCountries = ['usa', 'uk', 'canada', 'australia', 'uae', 'saudi-arabia'];
  const heldBackCountries = ['new-zealand', 'ireland', 'qatar', 'singapore', 'germany'];

  for (const c of [...activeCountries, ...heldBackCountries]) {
    const cPath = path.join(nextAppDir, `${c}.html`);
    if (!fs.existsSync(cPath)) {
      fail(`[L3] Missing built country HTML: ${c}.html`);
      continue;
    }
    checkBuiltHtmlFile(cPath, `${c}.html`);
    const cHtml = fs.readFileSync(cPath, 'utf8');
    const robotsMatch = cHtml.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
    const robotsVal = robotsMatch ? robotsMatch[1].toLowerCase() : '';
    if (heldBackCountries.includes(c)) {
      if (!robotsVal.includes('noindex') || !robotsVal.includes('follow')) {
        fail(`[L3] ${c}.html must have noindex, follow in meta robots, got: "${robotsVal}"`);
      }
    } else if (robotsVal.includes('noindex')) {
      fail(`[L3] Active country ${c}.html must be indexable, got: "${robotsVal}"`);
    }
  }

  // Phase 3 (T1-T7) postbuild verification across ALL core marketing pages
  const coreHtmlPages = [
    'index.html',
    'about.html',
    'services.html',
    'case-studies.html',
    'certifications.html',
    'process.html',
    'philosophy.html',
    'free-audit.html',
    'contact.html',
    'saas-websites.html',
    'privacy.html',
    'terms.html',
  ];
  for (const relHtml of coreHtmlPages) {
    const p = path.join(nextAppDir, relHtml);
    if (!fs.existsSync(p)) {
      fail(`[T2] Missing built core HTML page: ${relHtml}`);
      continue;
    }
    checkBuiltHtmlFile(p, relHtml);
    const html = fs.readFileSync(p, 'utf8');

    // T7: No unconditional GA4 script in SSR HTML
    if (/googletagmanager\.com\/gtag\/js/i.test(html)) {
      fail(`[T7] Unconditional gtag.js script found in SSR HTML of ${relHtml}`);
    }

    // T1: Single header nav (each link href appears only once inside <header>...</header>)
    const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
    if (!headerMatch) {
      fail(`[T1] Missing <header> element in ${relHtml}`);
    } else {
      const aboutLinks = (headerMatch[0].match(/href="\/about"/g) || []).length;
      if (aboutLinks !== 1) {
        fail(`[T1] Header nav rendered /about ${aboutLinks} times in ${relHtml} (expected 1)`);
      }
    }

    // T6: If FAQPage JSON-LD exists on page, every Q & A must appear in visible HTML
    const ldScripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    const bodyWithoutScripts = decodeHtmlEntities(html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
    for (const m of ldScripts) {
      try {
        const parsed = JSON.parse(m[1]);
        if (parsed['@type'] === 'FAQPage' && Array.isArray(parsed.mainEntity)) {
          for (const qa of parsed.mainEntity) {
            const q = String(qa.name || '').trim();
            const a = String(qa.acceptedAnswer?.text || '').trim();
            if (q && !bodyWithoutScripts.includes(q)) {
              fail(`[T6] FAQPage schema question missing in visible HTML on ${relHtml}: "${q}"`);
            }
            if (a && !bodyWithoutScripts.includes(a)) {
              fail(`[T6] FAQPage schema answer missing in visible HTML on ${relHtml}: "${a.slice(0, 50)}..."`);
            }
          }
        }
      } catch {
        fail(`[S5] Invalid JSON-LD syntax in ${relHtml}`);
      }
    }
  }

  // Verify thank-you.html has noindex,nofollow
  const tyPath = path.join(nextAppDir, 'thank-you.html');
  if (!fs.existsSync(tyPath)) {
    fail('[T2] Missing built thank-you.html');
  } else {
    const tyHtml = fs.readFileSync(tyPath, 'utf8');
    const tyRobots = (tyHtml.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i) || ['', ''])[1].toLowerCase();
    if (!tyRobots.includes('noindex') || !tyRobots.includes('nofollow')) {
      fail(`[T2] thank-you.html must have noindex, nofollow; got "${tyRobots}"`);
    }
  }

  // S4: _not-found.html must have noindex
  const nfPath = path.join(nextAppDir, '_not-found.html');
  if (!fs.existsSync(nfPath) || !/noindex/i.test(fs.readFileSync(nfPath, 'utf8'))) {
    fail('[S4] Missing _not-found.html or missing noindex meta');
  }

  // S2: Reconcile exact Sitemap XML count === Built indexable marketing page count
  const sitemapFiles = ['core.xml', 'countries.xml', 'blogs.xml'];
  const sitemapSet = new Set();
  for (const sm of sitemapFiles) {
    const smPath = path.join(rootDir, 'public/sitemap', sm);
    const smXml = fs.readFileSync(smPath, 'utf8');
    for (const m of smXml.matchAll(/<loc>(https:\/\/rankursite\.com[^<]*)<\/loc>/g)) {
      sitemapSet.add(m[1]);
    }
  }

  const allBuiltHtml = walkFiles(nextAppDir, ['.html']);
  const indexableBuiltSet = new Set();
  const excludedPrefixes = ['dashboard', 'onboarding', 'settings', 'report', '_not-found', '_global-error', 'thank-you', 'blog/page', 'blog\\page'];
  const noindexCountries = new Set(['new-zealand.html', 'ireland.html', 'qatar.html', 'singapore.html', 'germany.html']);

  for (const full of allBuiltHtml) {
    const rel = path.relative(nextAppDir, full).replace(/\\/g, '/');
    if (noindexCountries.has(rel)) continue;
    if (excludedPrefixes.some((p) => rel === p || rel.startsWith(`${p}/`) || rel === `${p}.html`)) continue;
    const html = fs.readFileSync(full, 'utf8');
    if (/\bTODO\b/i.test(html)) {
      fail(`[P0] Rendered page HTML contains "TODO": ${rel}`);
    }
    if (/#[^"]*object-object/i.test(html)) {
      fail(`[Phase9] Built HTML contains broken heading anchor ending in object-object: ${rel}`);
    }
    if (/<p>\s*\|[^<]*\|[^<]*<\/p>/i.test(html)) {
      fail(`[Phase9] Built HTML contains raw-pipe markdown table row: ${rel}`);
    }
    const htmlWithoutCode = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<pre[\s\S]*?<\/pre>/gi, '')
      .replace(/<code[\s\S]*?<\/code>/gi, '');
    if (/\$\$/.test(htmlWithoutCode)) {
      fail(`[Hotfix] Built HTML contains unrendered LaTeX "$$" block: ${rel}`);
    }
    const HOTFIX_BANNED_HTML = [
      'significant budget',
      'variable agency budgets',
      'a large share',
      '\\significant',
      'a substantial share',
      'a small portion',
      'a large budget',
      'a clear increase',
      'high monthly retainers',
      'one-time build investment including Edge hosting',
      'predictable 3-year total cost',
      'common budget overrun',
      'converts at a low baseline',
    ];
    for (const phrase of HOTFIX_BANNED_HTML) {
      if (htmlWithoutCode.toLowerCase().includes(phrase.toLowerCase())) {
        fail(`[Hotfix] Built HTML contains banned placeholder phrase "${phrase}": ${rel}`);
      }
    }
    const rMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
    if (rMatch && /noindex/i.test(rMatch[1])) continue;
    const route = rel === 'index.html' ? '' : '/' + rel.replace(/\.html$/, '');
    indexableBuiltSet.add(`https://rankursite.com${route}`);
  }

  console.log(`Reconciliation -> Sitemap XML URLs: ${sitemapSet.size} | Built indexable pages: ${indexableBuiltSet.size}`);
  for (const u of sitemapSet) {
    if (!indexableBuiltSet.has(u)) {
      fail(`[S2] Sitemap URL not built/indexable: ${u}`);
    }
  }
  for (const u of indexableBuiltSet) {
    if (!sitemapSet.has(u)) {
      fail(`[S2] Built indexable page missing from sitemaps: ${u}`);
    }
  }
}

if (isPostbuild) {
  await runPostbuildChecks();
} else {
  await runPrebuildChecks();
  // Phase 9 prebuild blog hygiene checks
  const blogDir = path.join(rootDir, 'blogs');
  if (fs.existsSync(blogDir)) {
    const dupRe = /\b(Next\.js|custom|b2b|the|and|for|to|of|in|a|with|your|website|seo|geo)\s+\1\b/i;
    const speedGuaranteeRe = /\bguarantee\w*\b[^.\n]{0,40}\b(?:ms|s\b|speed|LCP|TTFB|fast)/i;
    for (const f of fs.readdirSync(blogDir).filter((x) => x.endsWith('.md'))) {
      const txt = fs.readFileSync(path.join(blogDir, f), 'utf8');
      if (dupRe.test(txt)) {
        fail(`[Phase9] Adjacent duplicate word in blogs/${f}`);
      }
      if (speedGuaranteeRe.test(txt)) {
        fail(`[Phase9] Speed guarantee claim in blogs/${f}`);
      }
      if (/Verified B2B Practitioner/i.test(txt)) {
        fail(`[Phase9] "Verified B2B Practitioner" found in blogs/${f}`);
      }
      if (/\$\$/.test(txt)) {
        fail(`[Hotfix] Unrendered LaTeX "$$" block found in blogs/${f}`);
      }
      const HOTFIX_BANNED_MD = [
        'significant budget',
        'variable agency budgets',
        'a large share',
        '\\significant',
        'a substantial share',
        'a small portion',
        'a large budget',
        'a clear increase',
        'high monthly retainers',
        'enterprise ACV',
        'one-time build investment including Edge hosting',
        'predictable 3-year total cost',
        'common budget overrun',
        'converts at a low baseline',
        'supports fast load times',
      ];
      for (const phrase of HOTFIX_BANNED_MD) {
        if (txt.toLowerCase().includes(phrase.toLowerCase())) {
          fail(`[Hotfix] Banned placeholder phrase "${phrase}" found in blogs/${f}`);
        }
      }
    }
  }
  const srcCheckDirs = ['src/views', 'src/components', 'src/data', 'app'];
  for (const sDir of srcCheckDirs) {
    for (const sf of walkFiles(path.join(rootDir, sDir), ['.js', '.jsx', '.ts', '.tsx'])) {
      const sTxt = fs.readFileSync(sf, 'utf8');
      for (const phrase of ['significant budget', 'variable agency budgets', 'a large share', '\\significant']) {
        if (sTxt.toLowerCase().includes(phrase.toLowerCase())) {
          fail(`[Hotfix] Banned placeholder phrase "${phrase}" found in ${path.relative(rootDir, sf)}`);
        }
      }
    }
  }
  const blogPostJsx = path.join(rootDir, 'src/views/BlogPost.jsx');
  if (fs.existsSync(blogPostJsx) && /Verified B2B Practitioner/i.test(fs.readFileSync(blogPostJsx, 'utf8'))) {
    fail('[Phase9] "Verified B2B Practitioner" found in src/views/BlogPost.jsx');
  }
}

if (errors.length > 0) {
  console.error(`\n❌ seo-check FAILED with ${errors.length} error(s):`);
  errors.slice(0, 30).forEach(e => console.error('  -', e));
  if (errors.length > 30) console.error(`  ... and ${errors.length - 30} more.`);
  process.exit(1);
} else {
  console.log('✅ seo-check PASSED (0 violations).');
}
