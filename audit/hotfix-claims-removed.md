# Hotfix Claims Removed — audit/hotfix-claims-removed.md

All surgical edits applied during blog-hotfix Step 2.  
Pre-rewrite restored from commit `15a647b`. Surgical fixes applied on top.

---

## A. Speed Guarantee Claims (Rankur's own service guarantees)

| File | Line | Original | New | Reason |
|---|---|---|---|---|
| `blogs/pillar-how-much-b2b-website-costs-2026.md` | 80 | "optimizes server response times to sub-50 milliseconds, and guarantees Google Core Web Vitals scores above 95" | "optimizes server response times and targets strong Google Core Web Vitals scores" | Rankur cannot guarantee a specific CWV score number |
| `blogs/blog_737_new.md` | 34 | "guaranteeing TTFB under 100ms anywhere on Earth" | "targeting fast TTFB from global Edge locations" | Specific ms guarantee is unverifiable; "targeting" is accurate |
| `blogs/blog_341_new.md` | 35 | "guaranteeing TTFB under 100ms anywhere in the world" | "targeting fast TTFB from global Edge locations" | Same as above |
| `blogs/blog_707_new.md` | 34 | "guaranteeing TTFB under 100ms anywhere on Earth" | "targeting fast TTFB from global Edge locations" | Same as above |
| `blogs/blog_560_new.md` | 34 | "guaranteeing TTFB under 100ms anywhere on Earth" | "targeting fast TTFB from global Edge locations" | Same as above |
| `blogs/blog_803_new.md` | 34 | "guaranteeing TTFB under 100ms anywhere on Earth" | "targeting fast TTFB from global Edge locations" | Same as above |
| `blogs/blog_425_new.md` | 35 | "guaranteeing TTFB under 100ms anywhere in the world" | "targeting fast TTFB from global Edge locations" | Same as above |
| `blogs/blog_726_new.md` | 34 | "guaranteeing TTFB under 100ms anywhere on Earth" | "targeting fast TTFB from global Edge locations" | Same as above |
| `blogs/blog_95_new.md` | 201 | "guaranteeing sub-500ms global render speeds" | "targeting fast global render speeds" | Specific ms guarantee is unverifiable |
| `blogs/blog_328_new.md` | 112 | "guaranteeing sub-50ms server response times and server-rendered mobile rendering" | "targeting fast server response times and server-rendered mobile rendering" | Specific ms guarantee is unverifiable |
| `blogs/blog_98_new.md` | 187 | "guarantee Server-Rendered Edge Deliverys" (also typo) | "enable fast server-rendered edge delivery" | Guarantee claim + typo fix ("Deliverys") |
| `blogs/blog_102_new.md` | 176 | "guarantee Server-Rendered Edge Deliverys" (also typo) | "enable fast server-rendered edge delivery" | Guarantee claim + typo fix ("Deliverys") |
| `blogs/blog_80_new.md` | 156 | "guaranteeing that every stakeholder can inspect verified institutional records with zero latency" | "so that stakeholders can inspect verified institutional records quickly" | Zero-latency guarantee is unverifiable |

---

## B. LaTeX `$$` Blocks Converted to Plain Text

All `$$` LaTeX blocks render as raw text in the Next.js MDX output because `remark-math`/`rehype-katex` are not configured. Converted to plain-text equivalents (simpler option, no dep changes required).

| File | Line | Original | New |
|---|---|---|---|
| `blogs/pillar-how-much-b2b-website-costs-2026.md` | 101 | `$$\text{Break-Even Leads Needed} = \frac{...}$$` | `**Break-Even Leads Needed = Total Website Investment ÷ (Average Gross Margin per Closed Deal × Sales Close Rate)**` |
| `blogs/pillar-how-much-b2b-website-costs-2026.md` | 109 | `$$\text{Break-Even Threshold} = \frac{\$30,000}{\$5,000} = 6 \text{ Qualified Inquiries}$$` | `**Break-Even Threshold = $30,000 ÷ $5,000 = 6 Qualified Inquiries** _(Illustrative example)_` |
| `blogs/blog_328_new.md` | 99 | `$$4 \text{ Lost Deals} \times \$22,750 \text{ Net Margin} = \$91,000 \text{ Lost Net Profit}$$` | `**4 Lost Deals × $22,750 Net Margin = $91,000 Lost Net Profit** _(Illustrative example)_` |
| `blogs/blog_16.md` | 67 | `$$\text{Citation SOV} = \left( \frac{...} \right) \times 100$$` | `**Citation SOV (%) = (Total Prompts Citing Your Brand ÷ Total High-Intent Prompts Evaluated) × 100**` |
| `blogs/blog_98_new.md` | 87 | `$$\text{SEO Marketing ROI (\%)} = \left( \frac{...} \right) \times 100$$` | `**SEO Marketing ROI (%) = (Closed-Won Organic Revenue − Total SEO Investment) ÷ Total SEO Investment × 100**` |
| `blogs/blog_98_new.md` | 94 | `$$\text{Fully Loaded SQL CAC} = \frac{...}$$` | `**Fully Loaded SQL CAC = (Agency Fees + Infrastructure Costs + SDR Qualification Labor) ÷ Verified Enterprise SQLs**` |
| `blogs/blog_334_new.md` | 97 | `$$\text{Action Verb} + \text{Target Audience} + \text{Specific Commercial Outcome}$$` | `**[Action Verb] + [Target Audience] + [Specific Commercial Outcome]**` |
| `blogs/blog_87_new.md` | 36 | `$$\text{Annual Website Revenue} = \text{Monthly Traffic} \times ... \times 12$$` | `**Annual Website Revenue = Monthly Traffic × Visitor-to-Lead CR × Lead-to-Close Rate × ACV × 12**` |

**Decision:** Plain text conversion chosen over remark-math/rehype-katex because: (1) formulas are arithmetic, not complex notation; (2) no additional npm dependency or Next.js config required; (3) renders correctly in all browsers without KaTeX CSS.

---

## C. GEO Pillar Surgical Fixes (applied in previous session)

| File | Location | Claim removed/rewritten | Reason |
|---|---|---|---|
| `pillar-getting-found-google-chatgpt-perplexity-b2b.md` | Stats paragraph | "Over 85% of URLs cited by AI engines…", "only 14% of top-cited domains…", "cited four times more frequently…", "30% shorter cycles", "$150+ per click" | Unverified statistics; rewritten qualitatively |
| `pillar-getting-found-google-chatgpt-perplexity-b2b.md` | Layer 3 diagram | "Sub-50ms TTFB prevents RAG timeouts" | Specific ms guarantee label |
| `pillar-getting-found-google-chatgpt-perplexity-b2b.md` | Body section | "Blistering Edge Velocity (Sub-50ms TTFB)" + "guaranteeing your content is available instantly" | Speed guarantee claim |
| `pillar-getting-found-google-chatgpt-perplexity-b2b.md` | llms.txt sample | Phase 9 overclaiming sample | Replaced with actual /llms.txt content |
| `pillar-getting-found-google-chatgpt-perplexity-b2b.md` | Channel table | Superlatives: "Maximum", "Very Fast", "Very High" | Replaced with qualitative descriptors |
| `pillar-getting-found-google-chatgpt-perplexity-b2b.md` | Checklist | "sub-50ms TTFB via static edge delivery" | Rewritten as "edge-cached Next.js delivery" |

---

## D. What Was NOT Removed (intentionally kept)

- All author's own pricing tiers ($3k–$5k, $25k–$50k, $3,500/mo, etc.)
- All worked examples and hypothetical scenarios labelled as illustrative
- Buyer-advice checklist items ("Demand verifiable Core Web Vitals guarantees (sub-1.2s mobile LCP)" — this tells buyers what to ask vendors, not a Rankur claim)
- Comparison table entries listing "Sub-50ms (Global CDN Edge)" as a technology category capability
- blog_02.md "Guaranteed Rankings" warning (discussing what NOT to promise)
- blog_80_new.md "98+ Core Web Vitals score globally" — this is a reported outcome on a case study, not a forward guarantee

---

> **To restore any removed claim:** find the original text in `audit/hotfix-damage.csv` or in git diff `15a647b..blog-hotfix`, source it, and re-add with proper attribution.
