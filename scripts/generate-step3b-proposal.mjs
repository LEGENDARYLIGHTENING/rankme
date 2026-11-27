import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// 1. Load blog audit and GSC metrics
const blogAuditPath = path.join(rootDir, 'audit/blog-audit.csv');
const auditContent = fs.readFileSync(blogAuditPath, 'utf8').trim().split('\n');

const blogsIndexPath = path.join(rootDir, 'src/data/blogs-index.json');
const blogsIndex = JSON.parse(fs.readFileSync(blogsIndexPath, 'utf8'));
const blogMap = new Map(blogsIndex.map(b => [b.slug, b]));

const gscMetricsPath = path.join(rootDir, 'audit/gsc-page-metrics.json');
const gscData = JSON.parse(fs.readFileSync(gscMetricsPath, 'utf8'));

// Parse blog audit rows
const auditRows = [];
auditContent.slice(1).forEach(l => {
  const match = l.match(/^(".*?"|[^",\s]+),(".*?"|[^",\s]+),(\d+),(".*?"|[^",\s]+),(".*?"|[^",\s]+),(\d+),(".*?"|[^",\s]+),(\d+),(\d+),(".*?"|[^",\s]+),(".*?"|[^",\s]+)/);
  if (match) {
    const slug = match[1].replace(/"/g, '');
    const wordCount = parseInt(match[3]);
    const currentRobots = match[4].replace(/"/g, '');
    const inSitemap = match[5].replace(/"/g, '');
    const duplicateFaq = match[7].replace(/"/g, '') === 'true';
    const gscImp = parseInt(match[8]);
    const gscClicks = parseInt(match[9]);
    const phase2Action = match[10].replace(/"/g, '');
    const phase2Target = match[11].replace(/"/g, '');
    auditRows.push({
      slug,
      wordCount,
      currentRobots,
      inSitemap,
      duplicateFaq,
      gscImp,
      gscClicks,
      phase2Action,
      phase2Target
    });
  }
});

console.log(`Loaded ${auditRows.length} posts from blog-audit.csv`);

// Define off-topic keywords that should NEVER be 301 redirected to B2B web dev pillars (avoids soft 404s)
const offTopicTerms = [
  'supplement', 'wellness', 'nutraceutical', 'gmp',
  'contract-manufacturing', 'oem-manufacturing', 'procurement',
  'supply-chain', 'product-sourcing', 'clean-label',
  'white-label-strategies-wellness'
];

function isOffTopic(slug) {
  return offTopicTerms.some(term => slug.includes(term));
}

// Build Redirects Proposal under new Phase 3B policy:
// 301 ONLY for REMOVE or MERGE posts with real GSC impressions/clicks or backlinks AND a close topical match to a KEEP pillar.
// Everything else gets 410 (Gone).
// Never 301 thin or duplicate-FAQ posts to a vaguely related pillar.
const redirectsProposal = [];
const removePostsWithClicks = [];
const mergePostsNotes = [];

auditRows.forEach(row => {
  const slug = row.slug;
  const blog = blogMap.get(slug) || {};
  const title = blog.title || slug;
  const gscClicks = row.gscClicks;
  const gscImp = row.gscImp;
  const backlinks = 0; // No external backlinks recorded for programmatic posts

  let action = '410';
  let target = '';
  let reason = '';

  if (row.phase2Action === 'KEEP') {
    action = 'KEEP';
    target = '';
    reason = 'Flagship master pillar retained as high-authority indexable asset.';
  } else if (row.phase2Action === 'MERGE') {
    // Check if MERGE post qualifies for 301 under new policy
    const hasSearchFootprint = (gscClicks > 0 || gscImp > 0 || backlinks > 0);
    const offTopic = isOffTopic(slug);

    if (hasSearchFootprint && !offTopic && row.phase2Target) {
      action = '301';
      target = row.phase2Target;
      reason = `Valuable topic depth (${row.wordCount} words) and verified search footprint (${gscImp} imp, ${gscClicks} clicks). 301 redirect to ${target} after unique insights are folded in.`;
    } else if (offTopic) {
      action = '410';
      target = '';
      reason = `Off-topic legacy topic (${slug.split('-')[0]}). 301 redirect to B2B web dev pillar would trigger a soft 404 penalty. 410 Gone after review.`;
    } else {
      action = '410';
      target = '';
      reason = `Zero recorded search footprint (0 imp, 0 clicks, 0 backlinks). Unique angles folded into pillar ${row.phase2Target}, followed by clean 410 removal to eliminate crawl waste.`;
    }
  } else {
    // REMOVE post
    if (gscClicks > 0) {
      removePostsWithClicks.push({
        slug,
        title,
        clicks: gscClicks,
        impressions: gscImp,
        target: row.phase2Target || 'why-business-websites-get-zero-leads',
        duplicateFaq: row.duplicateFaq
      });
      // For clicked post: propose 301 with explicit justification and require manual signoff
      action = '301';
      target = row.phase2Target || 'why-business-websites-get-zero-leads';
      reason = `Historical click traffic (${gscClicks} click, ${gscImp} imp). Close topical match to conversion friction pillar ${target}. 301 preserves inbound search path.`;
    } else if (gscImp > 0 && !row.duplicateFaq && !isOffTopic(slug) && row.phase2Target) {
      action = '301';
      target = row.phase2Target;
      reason = `Active search impressions (${gscImp} imp) and close topical match to pillar ${target}. 301 preserves topical query signals without soft 404 risk.`;
    } else if (isOffTopic(slug)) {
      action = '410';
      target = '';
      reason = `Off-topic legacy post (${slug.split('-')[0]}); no close topical match to B2B web dev or SEO pillars. 301 redirect would be treated as soft 404.`;
    } else if (row.duplicateFaq) {
      action = '410';
      target = '';
      reason = `Programmatic template containing boilerplate duplicate FAQ block. Clean 410 response eliminates scaled spam footprint without diluting pillar authority.`;
    } else {
      action = '410';
      target = '';
      reason = `Zero search footprint (0 impressions, 0 clicks, 0 backlinks). Clean 410 removal prevents crawl budget dilution and avoids soft 404s.`;
    }
  }

  redirectsProposal.push({
    slug,
    action,
    target,
    gsc_clicks: gscClicks,
    gsc_impressions: gscImp,
    backlinks,
    reason
  });
});

console.log('Redirects proposal calculated.');

// 2. Write redirects-proposal.csv
const csvHeader = 'slug,action,target,gsc_clicks,gsc_impressions,backlinks,reason\n';
const csvLines = redirectsProposal.map(r => {
  return `"${r.slug}","${r.action}","${r.target}",${r.gsc_clicks},${r.gsc_impressions},${r.backlinks},"${r.reason.replace(/"/g, '""')}"`;
}).join('\n');

fs.writeFileSync(path.join(rootDir, 'redirects-proposal.csv'), csvHeader + csvLines);
fs.writeFileSync(path.join(rootDir, 'audit/redirects-proposal.csv'), csvHeader + csvLines);
console.log('Wrote redirects-proposal.csv (root & audit/)');

// Tally counts
const actionCounts = {};
redirectsProposal.forEach(r => {
  actionCounts[r.action] = (actionCounts[r.action] || 0) + 1;
});
console.log('Proposal Action Counts:', actionCounts);

