# Staged Prune & Redirect Rollout Plan

This document outlines the two-wave execution plan for pruning low-quality and programmatic content, establishing authoritative 301 redirects, and monitoring Google Search Console between waves.

---

## 1. Architectural Strategy & Compliance

### The Core Objective
Rankur's previous architecture contained over 900 programmatic blog entries sharing repetitive FAQ structures and unverified metrics. This scaled footprint represents an existential risk under Google's Helpful Content and Scaled Content Abuse policies.

### Updated Redirect Policy (Phase 3B)
- **HTTP 301 (Permanent Redirect)**: Deployed **strictly** for posts with verified search traffic (GSC impressions or clicks) **and** a direct, undeniable topical match to an authoritative master pillar.
- **HTTP 410 (Gone)**: Deployed for all posts with 0 search footprint, as well as off-topic legacy topics (nutraceuticals, supplements, physical contract manufacturing). 
- **The Soft 404 Prevention Invariant**: Mass-redirecting thin, off-topic, or duplicate-FAQ posts to loosely related pillars triggers Google soft 404 classifications, dilutes pillar link equity, and squanders crawl budget. HTTP 410 explicitly instructs search crawlers to permanently purge the URL from the index without passing negative quality signals.

---

## 2. Wave 1: The Zero-Footprint Cleanout

### Scope
- **Total Posts**: 759 posts
- **Criteria**: Exactly 0 GSC impressions, 0 GSC clicks, and 0 external backlinks.
- **Risk Level**: Zero. These URLs have never driven organic discovery or business pipeline.

### Execution Steps (Pending Approval)
1. **Routing Configuration**:
   - Update Next.js edge routing / middleware to intercept the 759 Wave 1 slugs and return an explicit **HTTP 410 (Gone)** status code.
2. **Sitemap De-listing**:
   - Verify that none of these 759 URLs exist in `public/sitemap/blogs.xml` or any child sitemap.
3. **Internal Link Elimination**:
   - Run automated verification to ensure zero internal links from navigation, footer, related guides, or core pages reference any Wave 1 URL.

### Expected Immediate Impact
- Removes over 84% of low-quality URLs from Google's scheduled crawl queue.
- Reallocates Googlebot crawl budget directly toward the 45 curated master pillars.
- Cleanly initiates Google's de-indexing protocol without generating redirect hops or 404 crawl errors.

---

## 3. Interim Search Console Monitoring Protocol (Between Waves)

A recommended observation window of **2 to 3 weeks** must occur between Wave 1 and Wave 2 to monitor Google's indexing response.

### Exact GSC Reports & Metrics to Track

#### 1. Page Indexing (Coverage) Report
- **What to look for**: Navigate to *Indexing > Pages*. Monitor the progression of URLs in the "Not indexed" table.
- **Key Metric**: A steady increase in URLs categorized under **"Not found (404/410)"** or **"Excluded by 'noindex' tag"**, accompanied by a decrease in total indexed URLs toward the target 45 master pillars.
- **Red Flag**: Any spike in **"Soft 404"**. If Google classifies a 410 as a soft 404, verify that the server header is sending a strict status code 410 with a minimal, non-confusing HTML response.

#### 2. Crawl Stats Report
- **What to look for**: Navigate to *Settings > Crawl stats*.
- **Key Metric**: The breakdown of crawl requests by response code. Status 410 responses will initially spike as Googlebot checks previously discovered URLs, then rapidly drop off as URLs are purged from Google's index.
- **Verification Target**: Ensure that >80% of Googlebot's daily requests shift to the 45 master pillars, country silos, and core commercial routes.

#### 3. Search Performance Report
- **What to look for**: Navigate to *Performance > Search results*.
- **Key Metric**: Total clicks and total impressions.
- **Verification Target**: Ensure absolute stability in top-performing queries. The flagship pillars (e.g., `geo-optimization-saas-ai-search-2026`, `why-saas-website-not-converting`, `b2b-demo-requests-fail-attended-meetings-599`) should experience neutral-to-positive impression velocity as site-wide content quality improves.

---

## 4. Wave 2: Content Consolidation & 301 Deployments

### Scope
- **Total Posts**: 97 posts (60 MERGE posts + 37 active REMOVE posts with search impressions or clicks).
- **Proposed Breakdown**:
  - **301 Redirects**: 49 URLs (Posts with verified GSC impressions/clicks and strict topical match).
  - **410 Gone**: 48 URLs (Off-topic vertical posts or duplicate-FAQ templates where redirection would risk soft 404s).

### Execution Steps (Staged in Batches)
1. **Batch Content Consolidation**:
   - Take approved notes from `audit/merge-posts-notes.md` in batches of 10-15 posts.
   - Manually fold the unique subtopics, frameworks, and data points into the designated master pillars.
2. **Pillar Quality & Schema Audit**:
   - Re-verify word counts, semantic headings, and JSON-LD structured data for every updated master pillar.
3. **Deploy Exact 301 Redirects**:
   - Add the 49 approved 301 redirects to `src/data/legacyRedirects.json` and `vercel.json`.
   - Verify that every redirect executes in exactly **1 hop** with no redirect chains or loops.
4. **Deploy Remaining 410s**:
   - Route the remaining 48 off-topic/duplicate-FAQ posts to HTTP 410.
5. **Final Post-Launch Sitemap & Edge Verification**:
   - Run `node scripts/check-sitemaps.mjs` and `node scripts/seo-check.mjs --postbuild` to certify 100% crawl compliance.

---

## 5. Summary Rollout Timeline

| Phase | Milestone | Actions | Success Metric |
| :--- | :--- | :--- | :--- |
| **Pre-Launch** | Approval Signoff | Moksh reviews proposals & approves Wave 1. | Formal approval granted. |
| **Wave 1** | Zero-Footprint Cleanout | Deploy 410s for 759 zero-traffic programmatic posts. | 0 traffic impact; 84% crawl bloat cut. |
| **Interim** | GSC Monitoring (2-3 wks) | Track Crawl Stats, Page Indexing, and Soft 404s in GSC. | 0 Soft 404 warnings; crawl shift to pillars. |
| **Wave 2A** | Content Consolidation | Fold 60 MERGE posts into master pillars in approved batches. | Pillars enriched with verified technical depth. |
| **Wave 2B** | 301 Deployments | Deploy 49 exact 301 redirects and remaining 48 410s. | 100% single-hop 301s; traffic preserved. |

---

## 6. Before / After GSC Counts & Scheduled Check-In Dates (Step 4D)

### Baseline GSC Counts (Before Wave 1)
*(Pending paste-in from Google Search Console -> Indexing -> Pages; no numbers invented)*

| GSC Page Indexing Bucket | Before Wave 1 (Baseline) | Day 7 | Day 14 | Day 21 |
| :--- | :--- | :--- | :--- | :--- |
| **Indexed pages** | `[Awaiting GSC count]` | | | |
| **Crawled - currently not indexed** | `[Awaiting GSC count]` | | | |
| **Discovered - currently not indexed** | `[Awaiting GSC count]` | | | |
| **Excluded by 'noindex' tag** | `[Awaiting GSC count]` | | | |
| **Not found (404 / 410)** | `[Awaiting GSC count]` | | | |
| **Soft 404** | `[Awaiting GSC count]` | | | |

### Exact Post-Deployment Check-In Schedule
Assuming Wave 1 deploys on **Day 0 (2026-11-25)** (shift by the actual deploy date if deployed later):

1. **Day 7 (2026-12-02)**
   - **Reports to open**: *Settings > Crawl stats* (By response code) and *Indexing > Pages*.
   - **What to check**: Confirm Googlebot is receiving `410 Gone` responses on Wave 1 URLs and that *Soft 404* remains at 0.
2. **Day 14 (2026-12-09)**
   - **Reports to open**: *Indexing > Pages* and *Indexing > Sitemaps*.
   - **What to check**: Verify *Excluded by 'noindex' tag* is declining as URLs move to *Not found (404/410)*, and confirm `sitemap.xml` child sitemaps show clean discovery without errors.
3. **Day 21 (2026-12-16)**
   - **Reports to open**: *Performance > Search results* and *Indexing > Pages*.
   - **What to check**: Confirm impressions and clicks on the 45 KEEP pillars remain stable or improved, and confirm crawl allocation has shifted to kept URLs before approving Wave 2.

