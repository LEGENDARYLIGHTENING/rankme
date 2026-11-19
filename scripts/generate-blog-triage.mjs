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

const dataDir = path.join(rootDir, 'src/data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// Explicit high-priority masterclass pillars that must always be kept indexed
const CURATED_PILLARS = new Set([
  'b2b-demo-requests-fail-attended-meetings-599',
  'geo-optimization-saas-ai-search-2026',
  'why-saas-website-not-converting',
  'react-vs-wordpress-b2b',
  'how-much-custom-b2b-website-costs-2026',
  'why-business-websites-get-zero-leads',
  'rfq-generation-content-strategies-b2b-manufacturers',
  'seo-industrial-product-pages-drive-rfqs',
  'b2b-website-roi-calculator-framework',
  'custom-vs-template-b2b-websites-cost-outcome',
  'headless-cms-vs-traditional-for-b2b-websites',
  'linkedin-lead-generation-saas-2026',
  'b2b-saas-website-redesign-cost-2026',
  'hire-saas-seo-expert',
  'saas-website-development-agency-us',
  'increase-saas-demo-requests-seo',
  'geo-case-study-b2b-brand-dominated-perplexity-results',
  'b2b-pricing-page-bounces-high-intent-buyers-332',
  'cost-per-sales-qualified-lead-website-calculator-327',
  'cheap-web-agencies-cost-100k-lost-pipeline-328',
  'high-converting-b2b-hero-section-2026-334',
  'anatomy-high-margin-b2b-case-study-page-335',
  'why-contact-sales-for-pricing-destroys-conversions-336',
  'custom-react-website-saas-startup',
  'saas-organic-growth-strategies-2026',
  'saas-churn-reduction-content-marketing',
  'b2b-saas-website-redesign-cost-2026',
  // Batch 4 Masterclass Additions
  'signs-website-losing-deals',
  'website-redesign-checklist-founders',
  'getting-found-google-chatgpt-perplexity-b2b',
  'ai-search-optimization-manufacturers-exporters',
  'prompt-engineering-testing-b2b-geo-performance',
  'building-entity-authority-ai-search-engines',
  'future-proofing-b2b-websites-generative-engine-optimization',
  'key-metrics-measuring-geo-success',
  'ai-overviews-b2b-click-through-rate-strategies',
  'comparison-seo-vs-geo-vs-paid-international-b2b',
  // Batch 5 Masterclass Additions
  'optimizing-linkedin-content-ai-scraping-citation',
  'technical-requirements-strong-geo-performance',
  'creating-source-authoritative-content-ai-systems',
  'geo-roadmap-saas-companies',
  'how-buyers-use-ai-search-before-contacting-b2b-vendors',
  'monitoring-ai-search-mentions-b2b-brand',
  'integrating-geo-overall-b2b-growth-strategy',
  'organic-lead-generation-strategies-b2b-international-markets',
  'b2b-lead-magnet-strategy-high-quality-international-inquiries',
  'international-b2b-lead-nurturing-organic-channels',
  // Batch 6 Masterclass Additions
  'lead-scoring-organic-b2b-channels',
  'gated-vs-ungated-content-b2b-lead-generation',
  'full-funnel-organic-lead-generation-system-b2b',
  'high-intent-keyword-targeting-b2b-organic-leads',
  'building-b2b-referral-engine-without-paid-ads',
  'partnership-co-marketing-organic-b2b-leads',
  'free-tools-calculators-b2b-lead-magnets',
  'organic-lead-generation-long-b2b-sales-cycles',
  'measuring-organic-lead-quality-vs-quantity-b2b',
  'linkedin-thought-leadership-strategy-generates-b2b-meetings',
  // Batch 7 Masterclass Additions
  'integrating-crm-and-website-b2b-lead-flow',
  'b2b-website-security-compliance-regulated',
  'fast-loading-b2b-websites-performance-benchmarks',
  'b2b-website-personalization-enterprise-buyers',
  'designing-b2b-websites-long-sales-cycles',
  'technical-seo-foundations-every-b2b-website-needs',
  'competitor-website-teardowns-top-b2b-sites',
  'scaling-b2b-website-global-traffic-performance',
  'measuring-b2b-seo-roi-beyond-vanity-metrics',
  'zero-click-searches-b2b-seo-survival-guide',
  // Batch 8 Masterclass Additions
  'b2b-landing-page-strategy-product-categories',
  'b2b-seo-strategy-rank-high-intent-buyer-keywords',
  'international-seo-for-b2b-hreflang-market-targeting',
  'seo-mistakes-kill-b2b-lead-quality',
  'schema-markup-b2b-product-service-pages',
  'algorithm-update-resilience-b2b-websites',
  'custom-build-vs-agency-retainer-cost-roi',
  'website-traffic-up-qualified-pipeline-down',
  'enterprise-buyers-leave-contact-form',
  'high-intent-bounce-pricing-page',
  // Batch 9 Masterclass Additions
  'content-syndication-strategies-b2b-lead-generation',
  'case-study-organic-b2b-lead-generation-action',
  'cold-email-outreach-strategy-international-b2b',
  'webinars-b2b-organic-lead-channel',
  'email-newsletter-strategy-b2b-organic-growth',
  'community-led-growth-b2b-companies',
  'using-case-studies-as-lead-generation-asset',
  'executive-personal-branding-linkedin-international-b2b',
  'linkedin-content-calendar-b2b-authority-building',
  'commenting-strategies-linkedin-b2b-lead-generation'
]);

// 1. Primary keyword uniqueness and clustering
const pkMap = new Map();
for (const b of blogs) {
  const norm = (b.primaryKeyword || b.title || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!pkMap.has(norm)) pkMap.set(norm, []);
  pkMap.get(norm).push(b);
}

// 2. Near-duplicate title clusters
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

// 3. Count actual internal inbound links per blog post
const inboundMap = new Map();
for (const b of blogs) inboundMap.set(b.slug, 2);

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

// 4. Compute Keep vs Noindex set
// Rules:
// - Always keep curated masterclasses
// - Exclude legacy nutra/wellness/formulations
// - Pick the best (highest word count >= 1000) in each keyword cluster to eliminate duplicate cannibalization
const keepSet = new Set();
for (const [key, list] of pkMap.entries()) {
  list.sort((a, b) => (b.wordCount || 0) - (a.wordCount || 0));
  const best = list[0];
  const isNutra = (best.tag && best.tag.toLowerCase().includes('nutra')) ||
                  (best.title && (best.title.toLowerCase().includes('supplement') || best.title.toLowerCase().includes('formulat')));
  if (CURATED_PILLARS.has(best.slug) || (best.wordCount >= 1000 && !isNutra)) {
    keepSet.add(best.slug);
  }
}

// Ensure all curated pillars are included
for (const slug of CURATED_PILLARS) {
  if (blogs.some(b => b.slug === slug)) {
    keepSet.add(slug);
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

const keepSlugs = [];
const noindexSlugs = [];

for (const b of blogs) {
  const isKeep = keepSet.has(b.slug);
  if (isKeep) {
    keepSlugs.push(b.slug);
  } else {
    noindexSlugs.push(b.slug);
  }

  rows.push(
    [
      csvCell(b.slug),
      csvCell(b.filename),
      csvCell(b.title),
      csvCell(b.tag),
      csvCell(b.lane),
      csvCell(b.wordCount),
      csvCell(b.primaryKeyword),
      csvCell(pkMap.get((b.primaryKeyword || b.title || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim())?.length === 1),
      csvCell(slugToCluster.get(b.slug)),
      csvCell(inboundMap.get(b.slug) || 0),
      csvCell(isKeep ? 'keep' : 'noindex_follow_remove_sitemap'),
      csvCell(b.datePublished || ''),
    ].join(',')
  );
}

const csvPath = path.join(auditDir, 'blog-triage.csv');
fs.writeFileSync(csvPath, rows.join('\n') + '\n', 'utf8');

const jsonPath = path.join(dataDir, 'blog-triage.json');
fs.writeFileSync(jsonPath, JSON.stringify({ keepSlugs, noindexSlugs }, null, 2), 'utf8');

console.log(`Generated ${csvPath} and ${jsonPath}`);
console.log(`Summary -> Total: ${blogs.length}, Authoritative Keep: ${keepSlugs.length}, Pruned Noindex: ${noindexSlugs.length}`);
