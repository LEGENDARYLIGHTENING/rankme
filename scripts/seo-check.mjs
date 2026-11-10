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
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'");
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
    if (csvLines.length < 900) {
      fail(`[B3] audit/blog-triage.csv expected >=900 rows, got ${csvLines.length}`);
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
}

function checkBuiltHtmlFile(filePath, relLabel) {
  const html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('&amp;amp;')) {
    fail(`[T2] Double-encoded &amp;amp; in ${relLabel}`);
  }
  if (/\[Internal link:|\[External link:/i.test(html)) {
    fail(`[B1] Template placeholder in built HTML: ${relLabel}`);
  }
  if (/View Money Services|85\+ City Hubs|B2B Manufacturing Client|unsplash\.com/i.test(html)) {
    fail(`[B4/B5/B7] Forbidden string in built HTML: ${relLabel}`);
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

  // Body checks: single H1 (skip internal Next.js hidden template h1 if any — check <main> or visible h1s)
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
}

if (isPostbuild) {
  await runPostbuildChecks();
} else {
  await runPrebuildChecks();
}

if (errors.length > 0) {
  console.error(`\n❌ seo-check FAILED with ${errors.length} error(s):`);
  errors.slice(0, 30).forEach(e => console.error('  -', e));
  if (errors.length > 30) console.error(`  ... and ${errors.length - 30} more.`);
  process.exit(1);
} else {
  console.log('✅ seo-check PASSED (0 violations).');
}
