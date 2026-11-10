import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const indexPath = path.join(rootDir, 'src/data/blogs-index.json');
const blogs = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

const auditDir = path.join(rootDir, 'audit');
if (!fs.existsSync(auditDir)) fs.mkdirSync(auditDir, { recursive: true });

// 1. Primary keyword uniqueness count
const pkCount = new Map();
for (const b of blogs) {
  const normPk = (b.primaryKeyword || b.title || '').toLowerCase().replace(/\s+/g, ' ').trim();
  pkCount.set(normPk, (pkCount.get(normPk) || 0) + 1);
}

// 2. Near-duplicate-title clusters (strip trailing numbers, years, filler words -> token signature / stem)
function titleStem(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/\b20\d{2}\b/g, '')
    .replace(/\b\d+\b/g, '')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\b(the|a|an|for|in|of|to|and|or|your|how|what|why|when|with|that|actually|b2b|complete|guide|ultimate)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const stemGroups = new Map();
for (const b of blogs) {
  const stem = titleStem(b.title);
  if (!stemGroups.has(stem)) stemGroups.set(stem, []);
  stemGroups.get(stem).push(b.slug);
}

let clusterSeq = 1;
const slugToCluster = new Map();
for (const [stem, slugs] of stemGroups.entries()) {
  if (slugs.length > 1) {
    const cid = `cluster_${String(clusterSeq++).padStart(3, '0')}_n${slugs.length}`;
    for (const s of slugs) slugToCluster.set(s, `${cid}:${stem.slice(0, 40)}`);
  } else {
    slugToCluster.set(slugs[0], 'unique');
  }
}

// 3. Count actual internal inbound links per blog post:
// Sources:
// a) Paginated blog archive (/blog or /blog/page/N) -> 1 link per post
// b) Category hub (/blog/category/<slug>) -> 1 link per post
// c) Deterministic 4-neighbor relatedPosts across sibling posts (mirrors app/blog/[slug]/page.jsx)
const inboundMap = new Map();
for (const b of blogs) inboundMap.set(b.slug, 2); // 1 from paginated /blog(/page/N) + 1 from /blog/category/<slug>

for (const b of blogs) {
  const sameCategory = blogs.filter(x => x.categorySlug === b.categorySlug);
  const picked = [];
  const seen = new Set([b.slug]);
  if (sameCategory.length > 1) {
    const idx = sameCategory.findIndex(x => x.slug === b.slug);
    for (let offset = 1; offset <= 4 && picked.length < 4; offset++) {
      const cand = sameCategory[(idx + offset) % sameCategory.length];
      if (cand && !seen.has(cand.slug)) {
        seen.add(cand.slug);
        picked.push(cand.slug);
      }
    }
  }
  if (picked.length < 4) {
    const gIdx = blogs.findIndex(x => x.slug === b.slug);
    for (let offset = 1; offset <= blogs.length && picked.length < 4; offset++) {
      const cand = blogs[(gIdx + offset) % blogs.length];
      if (cand && !seen.has(cand.slug)) {
        seen.add(cand.slug);
        picked.push(cand.slug);
      }
    }
  }
  for (const target of picked) {
    inboundMap.set(target, (inboundMap.get(target) || 0) + 1);
  }
}

// d) Also count explicit /blog/<slug> links inside markdown bodies & country/niche data
const blogsDir = path.join(rootDir, 'blogs');
for (const b of blogs) {
  const md = fs.readFileSync(path.join(blogsDir, b.filename), 'utf8');
  const matches = md.match(/\]\(\/blog\/([a-z0-9-]+)(?:#[^)]*)?\)/gi) || [];
  for (const m of matches) {
    const target = m.replace(/^\]\(\/blog\//i, '').replace(/(?:#[^)]*)?\)$/, '');
    if (inboundMap.has(target) && target !== b.slug) {
      inboundMap.set(target, inboundMap.get(target) + 1);
    }
  }
}

function csvCell(val) {
  const s = String(val ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const rows = [
  [
    'slug',
    'filename',
    'title',
    'tag',
    'lane',
    'word_count',
    'primary_keyword',
    'unique_primary_keyword',
    'near_duplicate_cluster',
    'inbound_internal_links',
    'proposed_action',
    'git_created_date',
  ].join(','),
];

let keepCount = 0;
let noindexCount = 0;

for (const b of blogs) {
  const normPk = (b.primaryKeyword || b.title || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const isUniquePk = (pkCount.get(normPk) || 0) === 1;
  const inLane = b.lane && b.lane !== 'off-lane';
  const meetsLength = b.wordCount >= 1000;
  const keep = inLane && meetsLength && isUniquePk;
  if (keep) keepCount++;
  else noindexCount++;

  rows.push(
    [
      csvCell(b.slug),
      csvCell(b.filename),
      csvCell(b.title),
      csvCell(b.tag),
      csvCell(b.lane),
      csvCell(b.wordCount),
      csvCell(b.primaryKeyword),
      csvCell(isUniquePk),
      csvCell(slugToCluster.get(b.slug)),
      csvCell(inboundMap.get(b.slug) || 0),
      csvCell(keep ? 'keep' : 'noindex_follow_remove_sitemap'),
      csvCell(b.datePublished || ''),
    ].join(',')
  );
}

const csvPath = path.join(auditDir, 'blog-triage.csv');
fs.writeFileSync(csvPath, rows.join('\n') + '\n', 'utf8');
console.log(`Generated ${csvPath}`);
console.log(`Summary -> Total: ${blogs.length}, Proposed keep: ${keepCount}, Proposed noindex: ${noindexCount}`);
