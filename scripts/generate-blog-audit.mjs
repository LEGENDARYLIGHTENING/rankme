import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 1. Load blog index and triage
const blogIndexPath = path.join(rootDir, 'src/data/blogs-index.json');
const blogs = JSON.parse(fs.readFileSync(blogIndexPath, 'utf8'));

const triagePath = path.join(rootDir, 'src/data/blog-triage.json');
let currentKeepSlugs = new Set();
if (fs.existsSync(triagePath)) {
  const triageData = JSON.parse(fs.readFileSync(triagePath, 'utf8'));
  currentKeepSlugs = new Set(triageData.keepSlugs || []);
}

// 2. Load sitemap to check in_sitemap
const sitemapBlogsPath = path.join(rootDir, 'public/sitemap/blogs.xml');
let sitemapContent = '';
if (fs.existsSync(sitemapBlogsPath)) {
  sitemapContent = fs.readFileSync(sitemapBlogsPath, 'utf8');
}

// 3. Load GSC page metrics
const gscMetricsPath = path.join(rootDir, 'audit/gsc-page-metrics.json');
let gscData = {};
if (fs.existsSync(gscMetricsPath)) {
  gscData = JSON.parse(fs.readFileSync(gscMetricsPath, 'utf8'));
}

// 4. Define the 40 Curated Pillars to KEEP
const TARGET_KEEP_PILLARS = [
  // GEO & AI Search
  { slug: 'getting-found-google-chatgpt-perplexity-b2b', pillar: 'getting-found-google-chatgpt-perplexity-b2b', reason: 'Flagship foundational guide for B2B AI answer engine optimization.' },
  { slug: 'geo-optimization-saas-ai-search-2026', pillar: 'geo-optimization-saas-ai-search-2026', reason: 'High-performing commercial GEO guide with 160 historical GSC impressions.' },
  { slug: 'key-metrics-measuring-geo-success', pillar: 'key-metrics-measuring-geo-success', reason: 'Comprehensive executive metric framework for AI citation tracking (41 GSC impressions).' },
  { slug: 'prompt-engineering-testing-b2b-geo-performance', pillar: 'prompt-engineering-testing-b2b-geo-performance', reason: 'Technical testing methodology for verifying brand placement across LLMs.' },
  { slug: 'building-entity-authority-ai-search-engines', pillar: 'building-entity-authority-ai-search-engines', reason: 'Core architecture guide for schema entity modeling and knowledge graphs.' },
  { slug: 'future-proofing-b2b-websites-generative-engine-optimization', pillar: 'future-proofing-b2b-websites-generative-engine-optimization', reason: 'Strategic playbook on decoupling from fragile keyword-only SEO.' },
  { slug: 'ai-overviews-b2b-click-through-rate-strategies', pillar: 'ai-overviews-b2b-click-through-rate-strategies', reason: 'Defensive CTR optimization under Google SGE and AI Overviews.' },
  { slug: 'technical-requirements-strong-geo-performance', pillar: 'technical-requirements-strong-geo-performance', reason: 'Detailed infrastructure requirements for edge speed, semantic HTML, and bot access.' },
  { slug: 'creating-source-authoritative-content-ai-systems', pillar: 'creating-source-authoritative-content-ai-systems', reason: 'Editorial standards for producing citable primary data for LLM training.' },
  { slug: 'geo-case-study-b2b-brand-dominated-perplexity-results', pillar: 'geo-case-study-b2b-brand-dominated-perplexity-results', reason: 'Real-world teardown demonstrating LLM citation capture.' },
  { slug: 'how-buyers-use-ai-search-before-contacting-b2b-vendors', pillar: 'how-buyers-use-ai-search-before-contacting-b2b-vendors', reason: 'Analysis of enterprise buyer search behavior shifts in 2026.' },
  { slug: 'monitoring-ai-search-mentions-b2b-brand', pillar: 'monitoring-ai-search-mentions-b2b-brand', reason: 'Practical tooling and audit cadence for tracking AI search market share.' },
  { slug: 'optimizing-linkedin-content-ai-scraping-citation', pillar: 'optimizing-linkedin-content-ai-scraping-citation', reason: 'Off-site entity reinforcement strategy for executive thought leadership.' },

  // B2B Web Engineering & Architecture
  { slug: 'react-vs-wordpress-b2b', pillar: 'react-vs-wordpress-b2b', reason: 'High-conversion technical comparison for enterprise replatforming decisions.' },
  { slug: 'headless-cms-vs-traditional-for-b2b-websites', pillar: 'headless-cms-vs-traditional-for-b2b-websites', reason: 'Architecture teardown comparing decoupled CMS against monoliths (28 GSC impressions).' },
  { slug: 'custom-react-website-saas-startup', pillar: 'custom-react-website-saas-startup', reason: 'Targeted guide for seed-to-Series B technical founders building bespoke sites.' },
  { slug: 'technical-seo-foundations-every-b2b-website-needs', pillar: 'technical-seo-foundations-every-b2b-website-needs', reason: 'Core technical checklist covering indexing, crawl paths, and schema.' },
  { slug: 'fast-loading-b2b-websites-performance-benchmarks', pillar: 'fast-loading-b2b-websites-performance-benchmarks', reason: 'Core Web Vitals and edge latency benchmarks for high-margin B2B sites.' },
  { slug: 'b2b-website-security-compliance-regulated', pillar: 'b2b-website-security-compliance-regulated', reason: 'Security header hardening, CSP, and compliance architecture for regulated verticals.' },
  { slug: 'scaling-b2b-website-global-traffic-performance', pillar: 'scaling-b2b-website-global-traffic-performance', reason: 'CDN caching, multi-region routing, and international asset delivery.' },
  { slug: 'schema-markup-b2b-product-service-pages', pillar: 'schema-markup-b2b-product-service-pages', reason: 'JSON-LD implementation specifications for B2B product and service entities.' },
  { slug: 'integrating-crm-and-website-b2b-lead-flow', pillar: 'integrating-crm-and-website-b2b-lead-flow', reason: 'Webhook architecture and attribution pipeline into HubSpot and Salesforce.' },

  // Website Redesign, Costs & Economics
  { slug: 'how-much-custom-b2b-website-costs-2026', pillar: 'how-much-custom-b2b-website-costs-2026', reason: 'Top-of-funnel commercial pricing transparency guide with high buyer intent.' },
  { slug: 'b2b-saas-website-redesign-cost-2026', pillar: 'b2b-saas-website-redesign-cost-2026', reason: 'Specialized SaaS scope and investment breakdown for leadership teams.' },
  { slug: 'website-redesign-checklist-founders', pillar: 'website-redesign-checklist-founders', reason: 'Step-by-step risk management and migration checklist for founders.' },
  { slug: 'custom-vs-template-b2b-websites-cost-outcome', pillar: 'custom-vs-template-b2b-websites-cost-outcome', reason: 'Direct ROI and maintenance comparison between themes and custom builds.' },
  { slug: 'b2b-website-roi-calculator-framework', pillar: 'b2b-website-roi-calculator-framework', reason: 'Financial modeling framework tying conversion gains to pipeline value.' },
  { slug: 'custom-build-vs-agency-retainer-cost-roi', pillar: 'custom-build-vs-agency-retainer-cost-roi', reason: 'Economic comparison between dedicated build contracts and endless agency retainers.' },
  { slug: 'cheap-web-agencies-cost-100k-lost-pipeline-328', pillar: 'cheap-web-agencies-cost-100k-lost-pipeline-328', reason: 'Hard-hitting analysis of hidden opportunity costs from amateur site builds.' },

  // Organic Lead Generation & Conversion
  { slug: 'why-business-websites-get-zero-leads', pillar: 'why-business-websites-get-zero-leads', reason: 'Flagship diagnostic guide analyzing common conversion leaks and friction.' },
  { slug: 'why-saas-website-not-converting', pillar: 'why-saas-website-not-converting', reason: 'Proven SaaS pipeline diagnostic guide with 76 historical GSC impressions.' },
  { slug: 'signs-website-losing-deals', pillar: 'signs-website-losing-deals', reason: 'Executive warning signs highlighting silent deal loss and poor buyer UX.' },
  { slug: 'b2b-demo-requests-fail-attended-meetings-599', pillar: 'b2b-demo-requests-fail-attended-meetings-599', reason: 'High-intent qualification flow guide with 109 historical GSC impressions.' },
  { slug: 'b2b-pricing-page-bounces-high-intent-buyers-332', pillar: 'b2b-pricing-page-bounces-high-intent-buyers-332', reason: 'Conversion architecture teardown on transparent B2B pricing design.' },
  { slug: 'why-contact-sales-for-pricing-destroys-conversions-336', pillar: 'why-contact-sales-for-pricing-destroys-conversions-336', reason: 'Critical analysis of sales friction and modern self-serve buyer demands.' },
  { slug: 'high-converting-b2b-hero-section-2026-334', pillar: 'high-converting-b2b-hero-section-2026-334', reason: 'Copywriting and UX framework for crafting high-converting above-the-fold messaging.' },
  { slug: 'anatomy-high-margin-b2b-case-study-page-335', pillar: 'anatomy-high-margin-b2b-case-study-page-335', reason: 'Proof architecture blueprint for engineering high-trust B2B case studies.' },
  { slug: 'full-funnel-organic-lead-generation-system-b2b', pillar: 'full-funnel-organic-lead-generation-system-b2b', reason: 'End-to-end framework linking top-of-funnel discovery to closed revenue.' },
  { slug: 'high-intent-keyword-targeting-b2b-organic-leads', pillar: 'high-intent-keyword-targeting-b2b-organic-leads', reason: 'Filtering out vanity traffic to prioritize high-margin commercial intent.' },

  // B2B Technical SEO Strategy & Hiring
  { slug: 'hire-saas-seo-expert', pillar: 'hire-saas-seo-expert', reason: 'Direct-intent vetting guide for founders seeking specialized SEO talent (34 GSC impressions).' },
  { slug: 'saas-website-development-agency-us', pillar: 'saas-website-development-agency-us', reason: 'Targeted agency evaluation guide with 24 historical GSC impressions.' },
  { slug: 'b2b-seo-strategy-rank-high-intent-buyer-keywords', pillar: 'b2b-seo-strategy-rank-high-intent-buyer-keywords', reason: 'Systematic approach to capturing BOFU commercial search queries.' },
  { slug: 'international-seo-for-b2b-hreflang-market-targeting', pillar: 'international-seo-for-b2b-hreflang-market-targeting', reason: 'Technical hreflang and multi-regional architecture guide for global B2B exporters.' },
  { slug: 'seo-mistakes-kill-b2b-lead-quality', pillar: 'seo-mistakes-kill-b2b-lead-quality', reason: 'Actionable teardown of vanity traffic tactics that attract unqualified leads.' },
  { slug: 'measuring-b2b-seo-roi-beyond-vanity-metrics', pillar: 'measuring-b2b-seo-roi-beyond-vanity-metrics', reason: 'Executive reporting framework tying search rankings to pipeline and ARR.' }
];

const KEEP_MAP = new Map(TARGET_KEEP_PILLARS.map(p => [p.slug, p]));

// 5. Inbound Internal Link Counter
console.log('Calculating internal inbound links across all markdown content...');
const linkCounts = new Map();
blogs.forEach(b => linkCounts.set(b.slug, 0));

const blogsDir = path.join(rootDir, 'blogs');
const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

blogFiles.forEach(file => {
  const filePath = path.join(blogsDir, file);
  const text = fs.readFileSync(filePath, 'utf8');
  for (const b of blogs) {
    // Check if file links to /blog/${b.slug}
    if (text.includes(`/blog/${b.slug}`)) {
      linkCounts.set(b.slug, (linkCounts.get(b.slug) || 0) + 1);
    }
  }
});

// Also count inbound links from relatedPosts in blogs-index.json
blogs.forEach(b => {
  if (Array.isArray(b.relatedPosts)) {
    b.relatedPosts.forEach(rel => {
      const targetSlug = typeof rel === 'string' ? rel : rel.slug;
      if (targetSlug && linkCounts.has(targetSlug)) {
        linkCounts.set(targetSlug, linkCounts.get(targetSlug) + 1);
      }
    });
  }
});

// 6. Mapping function to determine target pillar for non-keep posts
function findBestPillar(slug, title, category) {
  const text = `${slug} ${title} ${category}`.toLowerCase();
  if (text.includes('geo') || text.includes('ai-search') || text.includes('perplexity') || text.includes('chatgpt') || text.includes('llm') || text.includes('citation')) {
    return 'getting-found-google-chatgpt-perplexity-b2b';
  }
  if (text.includes('wordpress') || text.includes('react') || text.includes('headless') || text.includes('webflow') || text.includes('stack')) {
    return 'react-vs-wordpress-b2b';
  }
  if (text.includes('cost') || text.includes('pricing') || text.includes('price') || text.includes('redesign') || text.includes('roi') || text.includes('budget') || text.includes('agency')) {
    return 'how-much-custom-b2b-website-costs-2026';
  }
  if (text.includes('demo') || text.includes('convert') || text.includes('lead') || text.includes('friction') || text.includes('funnel') || text.includes('bounce') || text.includes('sales')) {
    return 'why-business-websites-get-zero-leads';
  }
  if (text.includes('speed') || text.includes('vitals') || text.includes('performance') || text.includes('latency') || text.includes('lcp')) {
    return 'fast-loading-b2b-websites-performance-benchmarks';
  }
  if (text.includes('schema') || text.includes('entity') || text.includes('json-ld') || text.includes('technical')) {
    return 'technical-seo-foundations-every-b2b-website-needs';
  }
  if (text.includes('international') || text.includes('export') || text.includes('hreflang') || text.includes('global')) {
    return 'international-seo-for-b2b-hreflang-market-targeting';
  }
  if (text.includes('hire') || text.includes('agency') || text.includes('consultant')) {
    return 'hire-saas-seo-expert';
  }
  return 'technical-seo-foundations-every-b2b-website-needs';
}

// 7. Process every blog and build audit rows
const auditRows = [];

blogs.forEach(b => {
  const slug = b.slug;
  const publishDate = b.datePublished || b.date || '2026-06-20';
  
  // Word count and duplicate FAQ check from markdown
  let wordCount = b.wordCount || 0;
  let hasDuplicateFaq = false;
  let mdFound = false;

  const candidateFiles = [
    path.join(blogsDir, `${slug}.md`),
    path.join(blogsDir, `${b.filename || ''}`)
  ];

  for (const cf of candidateFiles) {
    if (cf && fs.existsSync(cf)) {
      mdFound = true;
      const content = fs.readFileSync(cf, 'utf8');
      
      // Calculate body word count
      const body = content.replace(/^---[\s\S]*?---/, '');
      const words = body.trim().split(/\s+/).filter(Boolean);
      wordCount = words.length;

      // Duplicate FAQ template flag detection
      if (
        content.includes('requires removing form friction') ||
        content.includes('directly reduces user drop-off, improves mobile page load speeds') ||
        content.includes('GEO FAQ: AI Search Citation Block') ||
        content.includes('How do B2B companies construct topical authority') ||
        content.includes('Engineering Deep Dive: GEO Citation Strategy')
      ) {
        hasDuplicateFaq = true;
      }
      break;
    }
  }

  // If no direct markdown found, check by slug in filenames
  if (!mdFound) {
    const matched = blogFiles.find(f => f.includes(slug));
    if (matched) {
      const content = fs.readFileSync(path.join(blogsDir, matched), 'utf8');
      const body = content.replace(/^---[\s\S]*?---/, '');
      wordCount = body.trim().split(/\s+/).filter(Boolean).length;
      if (
        content.includes('requires removing form friction') ||
        content.includes('directly reduces user drop-off, improves mobile page load speeds') ||
        content.includes('GEO FAQ: AI Search Citation Block')
      ) {
        hasDuplicateFaq = true;
      }
    }
  }

  // Current robots meta
  const isCurrentlyKept = currentKeepSlugs.has(slug);
  const currentRobotsMeta = isCurrentlyKept ? 'index, follow' : 'noindex, follow';

  // In sitemap
  const inSitemap = sitemapContent.includes(`/blog/${slug}`) ? 'y' : 'n';

  // Inbound links
  const inboundLinks = linkCounts.get(slug) || 0;

  // GSC Performance
  const url1 = `https://rankursite.com/blog/${slug}`;
  const url2 = `https://www.rankursite.com/blog/${slug}`;
  const gsc1 = gscData[url1] || { impressions: 0, clicks: 0 };
  const gsc2 = gscData[url2] || { impressions: 0, clicks: 0 };
  const gscImpressions = (gsc1.impressions || 0) + (gsc2.impressions || 0);
  const gscClicks = (gsc1.clicks || 0) + (gsc2.clicks || 0);

  // Proposed Action
  let proposedAction = 'REMOVE';
  let targetPillar = '';
  let reason = '';

  if (KEEP_MAP.has(slug)) {
    const keepDef = KEEP_MAP.get(slug);
    proposedAction = 'KEEP';
    targetPillar = '';
    reason = keepDef.reason;
  } else {
    targetPillar = findBestPillar(slug, b.title || '', b.category || '');
    if (hasDuplicateFaq) {
      proposedAction = 'REMOVE';
      reason = `Programmatic template containing boilerplate duplicate FAQ block. 301 redirect to pillar ${targetPillar}.`;
    } else if (gscImpressions > 20 || wordCount > 1400) {
      proposedAction = 'MERGE';
      reason = `Valuable topic nuances (${wordCount} words, ${gscImpressions} GSC impressions). Propose merging core insights into pillar ${targetPillar} then 301 redirect.`;
    } else {
      proposedAction = 'REMOVE';
      reason = `Thin or near-duplicate secondary guide. 301 redirect to primary pillar ${targetPillar}.`;
    }
  }

  auditRows.push({
    slug,
    publishDate,
    wordCount,
    currentRobotsMeta,
    inSitemap,
    inboundLinks,
    duplicateFaqTemplateFlag: hasDuplicateFaq ? 'true' : 'false',
    gscImpressions,
    gscClicks,
    proposedAction,
    targetPillar,
    reason
  });
});

// 8. Generate CSV output
function escapeCsv(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

const csvHeader = [
  'slug',
  'publish_date',
  'word_count',
  'current_robots_meta',
  'in_sitemap',
  'internal_inbound_link_count',
  'duplicate_faq_template_flag',
  'gsc_impressions',
  'gsc_clicks',
  'proposed_action',
  'target_pillar',
  'reason'
].join(',');

const csvLines = auditRows.map(r => [
  escapeCsv(r.slug),
  escapeCsv(r.publishDate),
  r.wordCount,
  escapeCsv(r.currentRobotsMeta),
  escapeCsv(r.inSitemap),
  r.inboundLinks,
  escapeCsv(r.duplicateFaqTemplateFlag),
  r.gscImpressions,
  r.gscClicks,
  escapeCsv(r.proposedAction),
  escapeCsv(r.targetPillar),
  escapeCsv(r.reason)
].join(','));

const csvContent = [csvHeader, ...csvLines].join('\n');

const outAuditPath = path.join(rootDir, 'audit/blog-audit.csv');
const outRootPath = path.join(rootDir, 'blog-audit.csv');

fs.writeFileSync(outAuditPath, csvContent, 'utf8');
fs.writeFileSync(outRootPath, csvContent, 'utf8');

console.log(`\nGenerated blog-audit.csv successfully with ${auditRows.length} audited posts!`);
const keepCount = auditRows.filter(r => r.proposedAction === 'KEEP').length;
const mergeCount = auditRows.filter(r => r.proposedAction === 'MERGE').length;
const removeCount = auditRows.filter(r => r.proposedAction === 'REMOVE').length;
const dupFaqCount = auditRows.filter(r => r.duplicateFaqTemplateFlag === 'true').length;

console.log(`Summary Statistics:`);
console.log(`- Total Posts Audited: ${auditRows.length}`);
console.log(`- KEEP Proposed: ${keepCount}`);
console.log(`- MERGE Proposed: ${mergeCount}`);
console.log(`- REMOVE Proposed: ${removeCount}`);
console.log(`- Duplicate FAQ Template Detected: ${dupFaqCount}`);

