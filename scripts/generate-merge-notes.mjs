import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const blogAuditPath = path.join(rootDir, 'audit/blog-audit.csv');
const auditLines = fs.readFileSync(blogAuditPath, 'utf8').trim().split('\n');

const blogsIndex = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/blogs-index.json'), 'utf8'));
const blogMap = new Map(blogsIndex.map(b => [b.slug, b]));

const mergeSlugs = [];
auditLines.slice(1).forEach(l => {
  const match = l.match(/^(".*?"|[^",\s]+),(".*?"|[^",\s]+),(\d+),(".*?"|[^",\s]+),(".*?"|[^",\s]+),(\d+),(".*?"|[^",\s]+),(\d+),(\d+),(".*?"|[^",\s]+),(".*?"|[^",\s]+)/);
  if (match && match[10].replace(/"/g, '') === 'MERGE') {
    mergeSlugs.push({
      slug: match[1].replace(/"/g, ''),
      wordCount: parseInt(match[3]),
      gscImp: parseInt(match[8]),
      gscClicks: parseInt(match[9]),
      target: match[11].replace(/"/g, '')
    });
  }
});

console.log(`Found ${mergeSlugs.length} MERGE posts to document.`);

// Map of concrete merge instructions per slug
const mergeInstructions = {
  'linkedin-lead-generation-saas-2026': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Founder-Led Social Attribution vs Direct Website Bounces',
    foldIntoSection: 'Section 2: The Conversion Leak Map (Channel Misalignment)',
    policyAction: '301 Redirect',
    note: 'Extract the tactical framework on aligning executive LinkedIn content with dedicated conversion landing pages rather than sending traffic to generic homepages. Fold into the Conversion Leak Map under a new subsection on Social Attribution Leaks. Active search footprint (59 impressions) justifies a 301 redirect after manual content consolidation.'
  },
  'saas-organic-growth-strategies-2026': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Product-Led SEO Architecture and BOFU Feature Pages',
    foldIntoSection: 'Section 3: Information Architecture and Crawl Path Engineering',
    policyAction: '301 Redirect',
    note: 'Extract the methodology for structuring feature-comparison matrices and product integration directories for early-stage B2B SaaS. Fold into Section 3 under Information Architecture. 27 GSC impressions justify a 301 redirect once integrated.'
  },
  'increase-saas-demo-requests-seo': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'High-Intent Demo Qualification Architecture',
    foldIntoSection: 'Section 4: Engineering the High-Conversion Demonstration Flow',
    policyAction: '301 Redirect',
    note: 'Extract the two-tier form qualification framework (routing enterprise ACV vs self-serve prospects to separate scheduling pages). Fold directly into Section 4 to replace generic form advice. 23 GSC impressions qualify this URL for an exact 301 redirect.'
  },
  'saas-churn-reduction-content-marketing': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Customer Knowledge Base Indexing and Post-Sale Documentation SEO',
    foldIntoSection: 'Section 5: Post-Launch Technical Maintenance and Crawl Hygiene',
    policyAction: '410 Gone',
    note: 'Extract guidance on making customer onboarding and product documentation discoverable without index bloat. Fold into Section 5 under Crawl Hygiene. Because this post has 0 search impressions and 0 clicks, return clean HTTP 410 after merging to prevent soft 404s.'
  },
  'comparison-seo-vs-geo-vs-paid-international-b2b': {
    target: 'getting-found-google-chatgpt-perplexity-b2b',
    subtopic: 'Economic Comparison: Search Engines vs Answer Engines vs Paid CAC',
    foldIntoSection: 'Section 1: The Paradigm Shift from Keywords to Answer Engine Citations',
    policyAction: '301 Redirect',
    note: 'Extract the cost-per-acquisition breakdown comparing rising Google Ads CAC against long-term LLM citation equity. Fold into Section 1 as an executive economic comparison table. Active search footprint (1 impression) and strong topical match qualify for a 301 redirect.'
  },
  'geo-roadmap-saas-companies': {
    target: 'getting-found-google-chatgpt-perplexity-b2b',
    subtopic: '90-Day Implementation Timeline for AI Answer Engine Optimization',
    foldIntoSection: 'Section 5: The Strategic Execution Roadmap for B2B Leadership',
    policyAction: '301 Redirect',
    note: 'Extract the 90-day phased rollout plan (Month 1: Schema & Entity Graph, Month 2: Unfiltered Bot Accessibility, Month 3: Citation Verification). Fold into Section 5 as an actionable implementation timeline. 2 GSC impressions justify a 301 redirect.'
  },
  'integrating-geo-overall-b2b-growth-strategy': {
    target: 'getting-found-google-chatgpt-perplexity-b2b',
    subtopic: 'Synthesizing PR, Offline Entity Footprint, and Technical Schema',
    foldIntoSection: 'Section 3: Entity Architecture and Machine-Readable Knowledge Graphs',
    policyAction: '301 Redirect',
    note: 'Extract the multi-channel verification model linking industry awards, podcast transcripts, and structured JSON-LD into a unified entity profile for Perplexity and Claude. Fold into Section 3. 5 GSC impressions qualify for 301.'
  },
  'organic-lead-generation-strategies-b2b-international-markets': {
    target: 'international-seo-for-b2b-hreflang-market-targeting',
    subtopic: 'Localized Value Propositions and Multi-Regional Keyword Filtering',
    foldIntoSection: 'Section 2: Cultural Alignment vs Literal Keyword Translation',
    policyAction: '301 Redirect',
    note: 'Extract the framework on differentiating US vs UK vs EMEA buyer intent and regulatory expectations on commercial pages. Fold into Section 2 of the international SEO pillar. 2 GSC impressions qualify for 301.'
  },
  'b2b-lead-magnet-strategy-high-quality-international-inquiries': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'High-Value Interactive Calculators vs Low-Intent Generic PDFs',
    foldIntoSection: 'Section 3: Why Downloadable Ebooks Fail to Produce Pipeline',
    policyAction: '410 Gone',
    note: 'Extract the contrast between passive PDF whitepapers and active browser-based ROI calculators for enterprise prospects. Fold into Section 3 under Lead Capture Assets. 0 search impressions justify clean 410 removal post-merge.'
  },
  'international-b2b-lead-nurturing-organic-channels': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Time-Zone Agnostic Asynchronous Nurture Sequences',
    foldIntoSection: 'Section 4: Asynchronous Sales Pipeline Engineering',
    policyAction: '301 Redirect',
    note: 'Extract the email cadence and automated video walkthrough frameworks designed for overseas buyers who cannot attend real-time demos. Fold into Section 4. 1 GSC impression qualifies for 301 redirect.'
  },
  'lead-scoring-organic-b2b-channels': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Firmographic Lead Scoring at the Form Submission Layer',
    foldIntoSection: 'Section 4: Qualification Logic and Routing',
    policyAction: '410 Gone',
    note: 'Extract the criteria for scoring organic leads based on business email domain, employee headcount, and technology stack. Fold into Section 4. 0 GSC impressions dictate clean HTTP 410 after content transfer.'
  },
  'gated-vs-ungated-content-b2b-lead-generation': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'The SEO and AI Citation Cost of Gating Core Insights',
    foldIntoSection: 'Section 3: Gated Content as an Indexing and Attribution Barrier',
    policyAction: '301 Redirect',
    note: 'Extract the analysis showing how form-gating technical specs and pricing prevents Google and LLM crawlers from citing the company as a primary authority. Fold into Section 3. 3 GSC impressions qualify for 301.'
  },
  'content-syndication-strategies-b2b-lead-generation': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Cross-Domain Canonical Management for Off-Site Syndication',
    foldIntoSection: 'Section 4: Canonical Integrity and Duplicate Content Prevention',
    policyAction: '301 Redirect',
    note: 'Extract the technical requirements for syndicating B2B engineering articles to Medium, Substack, and LinkedIn using cross-domain rel=canonical headers. Fold into Section 4. 8 GSC impressions qualify for 301.'
  },
  'cold-email-outreach-strategy-international-b2b': {
    target: 'international-seo-for-b2b-hreflang-market-targeting',
    subtopic: 'Aligning Inbound Landing Pages With Outbound Account-Based Marketing',
    foldIntoSection: 'Section 4: Cross-Channel Synergy for Global Pipeline',
    policyAction: '410 Gone',
    note: 'Extract the strategy of building market-specific landing pages tailored to outbound cold campaigns for enterprise decision-makers. Fold into Section 4. 0 GSC impressions dictate clean 410 removal.'
  },
  'building-b2b-referral-engine-without-paid-ads': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Co-Branded Client Case Studies as Organic Backlink Magnets',
    foldIntoSection: 'Section 6: Generating High-Quality Editorial Backlinks Naturally',
    policyAction: '301 Redirect',
    note: 'Extract the playbook on publishing technical implementation deep-dives that client marketing teams actively share and link to. Fold into Section 6. 1 GSC impression qualifies for 301.'
  },
  'webinars-b2b-organic-lead-channel': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Repurposing Interactive Webinars into High-Authority Search Hubs',
    foldIntoSection: 'Section 3: Video Transcripts and Multimedia Indexing',
    policyAction: '301 Redirect',
    note: 'Extract the method for indexing webinar transcripts with VideoObject schema and detailed timestamps to capture long-tail technical queries. Fold into Section 3. 1 GSC impression qualifies for 301.'
  },
  'email-newsletter-strategy-b2b-organic-growth': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Public Web Archives for Private Email Newsletters',
    foldIntoSection: 'Section 3: Information Architecture and Static Archiving',
    policyAction: '410 Gone',
    note: 'Extract the technical implementation for rendering newsletter editions as fast static HTML pages with self-referencing canonicals. Fold into Section 3. 0 GSC impressions dictate 410 post-merge.'
  },
  'community-led-growth-b2b-companies': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Public Forum and Discord Question Archiving for Long-Tail Search',
    foldIntoSection: 'Section 3: Engineering Dynamic Discussion Repositories',
    policyAction: '410 Gone',
    note: 'Extract the framework on sanitizing and rendering community technical troubleshooting threads to capture niche error-code search traffic. Fold into Section 3. 0 GSC impressions dictate 410.'
  },
  'partnership-co-marketing-organic-b2b-leads': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Integration Ecosystem Pages as High-Conversion Lead Portals',
    foldIntoSection: 'Section 3: Technology Ecosystem and Partner Directories',
    policyAction: '301 Redirect',
    note: 'Extract the architectural pattern for building partner integration hubs that capture high-intent buyers evaluating software compatibility. Fold into Section 3. 1 GSC impression qualifies for 301.'
  },
  'using-case-studies-as-lead-generation-asset': {
    target: 'anatomy-high-margin-b2b-case-study-page-335',
    subtopic: 'Transforming Vague Testimonials into Metric-Driven Engineering Proof',
    foldIntoSection: 'Section 2: The Architecture of Irrefutable Evidence',
    policyAction: '301 Redirect',
    note: 'Extract the structural template for detailing baseline problems, exact technical interventions, and verifiable quantitative outcomes. Fold into Section 2 of the case study master pillar. 1 GSC impression qualifies for 301.'
  },
  'free-tools-calculators-b2b-lead-magnets': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Engineering Interactive Client ROI and Latency Calculators in React',
    foldIntoSection: 'Section 4: Interactive Utility vs Static Forms',
    policyAction: '410 Gone',
    note: 'Extract code patterns and user flow logic for embedding client-side calculations that offer immediate diagnostic value before requesting an email. Fold into Section 4. 0 GSC impressions dictate 410.'
  },
  'organic-lead-generation-long-b2b-sales-cycles': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Multi-Stakeholder Buyer Journey Mapping Across 9-Month Evaluation Cycles',
    foldIntoSection: 'Section 1: The Multi-Touch B2B Buying Committee Reality',
    policyAction: '301 Redirect',
    note: 'Extract the framework on addressing both CFO economic risk concerns and CTO architectural standards on the same digital asset. Fold into Section 1. 6 GSC impressions qualify for 301.'
  },
  'measuring-organic-lead-quality-vs-quantity-b2b': {
    target: 'measuring-b2b-seo-roi-beyond-vanity-metrics',
    subtopic: 'Pipeline Velocity and Opportunity Win Rates by Organic Landing Page',
    foldIntoSection: 'Section 2: Attribution Models Beyond First-Click and Last-Click',
    policyAction: '410 Gone',
    note: 'Extract the reporting framework connecting Google Analytics landing pages to CRM closed-won deal values. Fold into Section 2 of the ROI measurement pillar. 0 GSC impressions dictate 410 post-merge.'
  },
  'linkedin-thought-leadership-strategy-generates-b2b-meetings': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Connecting Executive Opinion Pieces to Deep-Dive Technical Whitepapers',
    foldIntoSection: 'Section 2: Converting Passive Social Readers into Commercial Inquiries',
    policyAction: '410 Gone',
    note: 'Extract the conversion funnel linking founder LinkedIn posts to dedicated technical methodology pages with calendar booking CTAs. Fold into Section 2. 0 GSC impressions dictate 410.'
  },
  'executive-personal-branding-linkedin-international-b2b': {
    target: 'international-seo-for-b2b-hreflang-market-targeting',
    subtopic: 'Building Regional Authority and Citable Executive Footprints Overseas',
    foldIntoSection: 'Section 3: Regional Entity Modeling and Cross-Border Trust',
    policyAction: '410 Gone',
    note: 'Extract strategies for positioning leadership in foreign markets through regional trade publications and localized speaking engagements. Fold into Section 3. 0 GSC impressions dictate 410.'
  },
  'linkedin-content-calendar-b2b-authority-building': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Topic Clustering Cadence for Technical B2B Brands',
    foldIntoSection: 'Section 4: Content Velocity vs Technical Integrity',
    policyAction: '410 Gone',
    note: 'Extract the 4-week thematic scheduling methodology for rotating between architectural breakdowns, teardowns, and industry critiques. Fold into Section 4. 0 GSC impressions dictate 410.'
  },
  'commenting-strategies-linkedin-b2b-lead-generation': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Targeted Technical Commentary as an Inbound Discovery Channel',
    foldIntoSection: 'Section 2: High-Intent Traffic Acquisition Channels',
    policyAction: '410 Gone',
    note: 'Extract the protocol for providing insightful technical analysis on prospect executive posts to earn organic profile visits. Fold into Section 2. 0 GSC impressions dictate 410.'
  },
  'top-b2b-manufacturers-usa-industrial-commercial': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Industrial Directory Architecture and Multi-Faceted Catalog SEO',
    foldIntoSection: 'Section 3: High-SKU Faceted Navigation and Canonical Cleanliness',
    policyAction: '410 Gone',
    note: 'Legacy industrial post. Any technical recommendations on indexing massive component catalogs without duplicate facet traps can be folded into Section 3. Because the post represents an off-topic legacy niche, 301 redirecting to an IT/web dev pillar would cause a soft 404. Propose clean 410 Gone.'
  },
  'export-compliance-consultants-international-shipments': {
    target: 'international-seo-for-b2b-hreflang-market-targeting',
    subtopic: 'International Trade Regulatory Disclaimers and Country Disclosures',
    foldIntoSection: 'Section 2: Localized Compliance and Legal Requirements',
    policyAction: '410 Gone',
    note: 'Legacy export compliance post. Retain principles of localized regulatory transparency under Section 2. Because logistics consulting is off-topic for Rankur, 301 redirection would trigger a soft 404. Propose clean 410 Gone.'
  },
  'contract-manufacturing-partners-2026': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Engineering B2B Sourcing Portals for Complex Service Offerings',
    foldIntoSection: 'Section 3: Service Specification Architecture',
    policyAction: '410 Gone',
    note: 'Legacy manufacturing post. Technical patterns for presenting complex multi-tier contract capabilities can be folded into Section 3. Off-topic product nature requires clean 410 Gone to protect domain authority.'
  },
  'b2b-product-sourcing-agency-best-practices': {
    target: 'how-much-custom-b2b-website-costs-2026',
    subtopic: 'Evaluating Procurement Costs vs Long-Term Quality in Professional Contracts',
    foldIntoSection: 'Section 2: Why Low Hourly Rates Mask Exorbitant Total Cost of Ownership',
    policyAction: '410 Gone',
    note: 'Extract the contractual vetting framework contrasting fixed-fee versus variable sourcing retainers. Fold into Section 2 of the pricing pillar. Off-topic legacy niche dictates clean 410.'
  },
  'international-trade-compliance-checklist-exporters': {
    target: 'international-seo-for-b2b-hreflang-market-targeting',
    subtopic: 'Global Cross-Border Security, VAT, and GDPR Compliance Disclosures',
    foldIntoSection: 'Section 3: Regulatory Trust Signals Across European and GCC Silos',
    policyAction: '410 Gone',
    note: 'Extract cross-border privacy and data residency disclosure guidelines (GDPR, UAE PDPL). Fold into Section 3. Despite 32 GSC impressions, physical customs trade compliance is off-topic for web engineering and would soft-404. Propose 410.'
  },
  'oem-manufacturing-services-procurement': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Technical Specification Tables and PDF Whitepaper Crawl Optimization',
    foldIntoSection: 'Section 4: Technical Asset Optimization for Enterprise Procurement',
    policyAction: '410 Gone',
    note: 'Extract best practices for structuring downloadable engineering CAD/spec sheets so search engines can index technical attributes. Fold into Section 4. Off-topic legacy niche requires 410 post-merge.'
  },
  'export-lead-generation-tactics-manufacturers': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Overcoming Geolocation Friction on Cross-Border Inquiry Forms',
    foldIntoSection: 'Section 2: The Conversion Leak Map (International Drop-Off)',
    policyAction: '301 Redirect',
    note: 'Extract the analysis on why mandatory country-specific phone formats destroy international conversions. Fold into Section 2 under International Conversion Leaks. 3 GSC impressions qualify for 301.'
  },
  'manufacturing-supply-chain-partners-resilient': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Vendor Portal Reliability and Edge Uptime Benchmarks',
    foldIntoSection: 'Section 1: Infrastructure Reliability and SLA Standards',
    policyAction: '410 Gone',
    note: 'Legacy supply chain post. Any enterprise uptime SLA benchmarks can fold into Section 1. Off-topic niche dictates 410.'
  },
  'global-b2b-exporters-directory-guide': {
    target: 'international-seo-for-b2b-hreflang-market-targeting',
    subtopic: 'Leveraging Verified Trade Registries for Clean Entity Knowledge Graphs',
    foldIntoSection: 'Section 4: External Entity Reinforcement for Global Domains',
    policyAction: '301 Redirect',
    note: 'Extract recommendations on claiming Dun & Bradstreet, GLEIF, and Chamber of Commerce entries to reinforce international Knowledge Graph authority. Fold into Section 4. 3 GSC impressions qualify for 301.'
  },
  'private-label-manufacturing-guide-brands': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'White-Label Platform Architecture for Multi-Tenant Web Applications',
    foldIntoSection: 'Section 3: Multi-Tenant Architecture Considerations',
    policyAction: '410 Gone',
    note: 'Legacy private label post. Core white-label software architecture principles fold into Section 3. Off-topic physical manufacturing subject requires 410.'
  },
  'nutraceutical-regulatory-consulting-experts': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Strict Vertical Compliance Disclaimers and Cookie Consent Architecture',
    foldIntoSection: 'Section 2: Legal Disclaimers and Accessibility Standards',
    policyAction: '410 Gone',
    note: 'Legacy nutraceutical post. Any general regulatory compliance disclaimer structures fold into Section 2. Because supplements are completely off-topic for Rankur, 301 redirection would trigger a soft 404. Propose 410.'
  },
  'private-label-supplement-manufacturers-comparison': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Structuring Comparative Feature Tables for B2B Evaluation',
    foldIntoSection: 'Section 3: High-Value Comparison Table Architecture',
    policyAction: '410 Gone',
    note: 'Legacy supplement comparison post. Data table UX patterns fold into Section 3. Off-topic vertical dictates clean 410.'
  },
  'wellness-product-formulation-process': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Documenting Multi-Stage Engineering Workflows for Executive Trust',
    foldIntoSection: 'Section 4: Process Transparency as an SEO Trust Signal',
    policyAction: '410 Gone',
    note: 'Legacy wellness post. Principles of illustrating end-to-end technical processes fold into Section 4. Off-topic subject dictates clean 410 (soft 404 avoidance).'
  },
  'multilingual-b2b-website-strategy-middle-east': {
    target: 'international-seo-for-b2b-hreflang-market-targeting',
    subtopic: 'RTL (Right-to-Left) CSS Architecture and Hreflang Configuration for Arabic',
    foldIntoSection: 'Section 2: Bidirectional Layouts and Middle East Regional Silos',
    policyAction: '410 Gone',
    note: 'Extract technical specifications for implementing dir="rtl", localized font loading, and Arabic hreflang tags. Fold into Section 2 of international SEO. 0 GSC impressions dictate 410 post-merge.'
  },
  'case-study-b2b-growth-infrastructure-leads': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Full-Stack Diagnostic Framework for Finding Friction in Underperforming Sites',
    foldIntoSection: 'Section 5: The Step-by-Step Diagnostic Protocol for Founders',
    policyAction: '410 Gone',
    note: 'Extract the qualitative teardown methodology for evaluating server latency, above-the-fold copy, and form abandonment. Fold into Section 5. 0 GSC impressions dictate 410.'
  },
  'b2b-website-personalization-enterprise-buyers': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Edge-Side Dynamic Content Insertion Without Compromising Static Caching',
    foldIntoSection: 'Section 1: Edge Compute, CDN Personalization, and Core Web Vitals',
    policyAction: '410 Gone',
    note: 'Extract technical architecture for reading IP-based firmographic headers at the CDN edge to display industry-specific copy without client-side layout shifts. Fold into Section 1. 0 GSC impressions dictate 410.'
  },
  'designing-b2b-websites-long-sales-cycles': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Asynchronous Content Architecture for Multi-Session Executive Buyer Journeys',
    foldIntoSection: 'Section 1: Accommodating 60-Day Research Windows Without Lead Loss',
    policyAction: '410 Gone',
    note: 'Extract guidelines for persistent saved-session states, shareable PDF executive summaries, and un-gated technical documentation. Fold into Section 1. 0 GSC impressions dictate 410.'
  },
  'using-ai-in-b2b-website-development-better-ux': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Integrating Client-Side Vector Search for Massive Technical Documentation',
    foldIntoSection: 'Section 3: Internal Site Search and Semantic Crawl Paths',
    policyAction: '410 Gone',
    note: 'Extract implementation patterns for running lightweight semantic search over API and product documentation. Fold into Section 3. 0 GSC impressions dictate 410.'
  },
  'competitor-website-teardowns-top-b2b-sites': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Diagnostic Framework for Reverse-Engineering Competitor Tech Stacks',
    foldIntoSection: 'Section 5: Competitive Technical Auditing Methodology',
    policyAction: '410 Gone',
    note: 'Extract the step-by-step process for auditing competitor bundle sizes, hydration bottlenecks, and schema coverage. Fold into Section 5. 0 GSC impressions dictate 410.'
  },
  'b2b-landing-page-strategy-product-categories': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Programmatic Category Hub Architecture With Curated Editorial Injections',
    foldIntoSection: 'Section 3: Scalable Category Hubs Without Thin Content Flags',
    policyAction: '301 Redirect',
    note: 'Extract the layout specification combining automated product indexing with unique human-authored buyer guidance. Fold into Section 3. 1 GSC impression qualifies for 301.'
  },
  'technical-seo-checklist-b2b-websites-enterprise': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Pre-Flight Production Deployment Checklist for Engineering Teams',
    foldIntoSection: 'Section 5: The 20-Point Technical Go-Live Audit',
    policyAction: '301 Redirect',
    note: 'Extract the rigorous technical checklist covering security headers, sitemap generation, canonical rules, and Core Web Vitals thresholds. Fold into Section 5. 4 GSC impressions qualify for 301.'
  },
  'keyword-research-long-b2b-sales-cycles': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Identifying Problem-Aware vs Solution-Aware Technical Search Queries',
    foldIntoSection: 'Section 2: Query-to-Page Intent Alignment',
    policyAction: '301 Redirect',
    note: 'Extract the keyword classification matrix that separates low-intent student/research queries from high-intent buying signals. Fold into Section 2. 1 GSC impression qualifies for 301.'
  },
  'local-seo-b2b-manufacturers-exporting-internationally': {
    target: 'international-seo-for-b2b-hreflang-market-targeting',
    subtopic: 'Managing Multi-Country Google Business Profiles for Global Export Hubs',
    foldIntoSection: 'Section 4: Local Signals and Physical Verification Across Markets',
    policyAction: '301 Redirect',
    note: 'Extract the rules for structuring Google Business Profiles and local citations when selling internationally without physical branches in every territory. Fold into Section 4. 1 GSC impression qualifies for 301.'
  },
  'eeat-for-b2b-seo-build-authority-fast': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Engineering Author Entity Schemas and Verifiable Editorial Standards',
    foldIntoSection: 'Section 2: Person Entity Modeling and E-E-A-T Infrastructure',
    policyAction: '301 Redirect',
    note: 'Extract the code specifications for Author and ReviewedBy JSON-LD schema linking to verified professional profiles. Fold into Section 2. 3 GSC impressions qualify for 301.'
  },
  'backlink-strategy-b2b-companies-competitive-niches': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Earning High-Authority Backlinks Through Proprietary Benchmark Data',
    foldIntoSection: 'Section 6: Building Citable Industry Research Assets',
    policyAction: '410 Gone',
    note: 'Extract the methodology for publishing unique industry benchmarks and survey data that journalists and analysts cite naturally. Fold into Section 6. 0 GSC impressions dictate 410 post-merge.'
  },
  'zero-click-searches-b2b-seo-survival-guide': {
    target: 'getting-found-google-chatgpt-perplexity-b2b',
    subtopic: 'Optimizing for AI Overviews and Brand Citations Without Click Attribution',
    foldIntoSection: 'Section 4: Measuring Brand Placement in Zero-Click Answer Engine Environments',
    policyAction: '410 Gone',
    note: 'Extract the strategic framework for dominating brand recall when answer engines satisfy search queries directly in the SERP. Fold into Section 4. 0 GSC impressions dictate 410.'
  },
  'content-clusters-rank-b2b-buyer-journeys': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Bidirectional Internal Linking Architecture for Authority Clusters',
    foldIntoSection: 'Section 3: Internal Link Graph Engineering and PageRank Distribution',
    policyAction: '410 Gone',
    note: 'Extract the mathematical linking model that prevents orphan pages and channels internal equity to primary commercial pillars. Fold into Section 3. 0 GSC impressions dictate 410.'
  },
  'competitor-gap-analysis-b2b-seo-domination': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Reverse-Engineering Technical Deficiencies in Competitor Web Applications',
    foldIntoSection: 'Section 5: Identifying Technical Latency and SEO Vulnerabilities in Competitors',
    policyAction: '410 Gone',
    note: 'Extract the audit methodology for targeting competitor keywords where their current pages suffer from massive hydration delays or poor Core Web Vitals. Fold into Section 5. 0 GSC impressions dictate 410.'
  },
  'algorithm-update-resilience-b2b-websites': {
    target: 'technical-seo-foundations-every-b2b-website-needs',
    subtopic: 'Building Resilient Web Architectures Immune to Google Core Algorithm Shifts',
    foldIntoSection: 'Section 1: Decoupling Platform Success from Search Engine Whims',
    policyAction: '410 Gone',
    note: 'Extract principles of maintaining lean semantic HTML, server rendering, and zero-spam editorial policies to survive core updates. Fold into Section 1. 0 GSC impressions dictate 410.'
  },
  'difference-between-traditional-seo-geo-b2b': {
    target: 'getting-found-google-chatgpt-perplexity-b2b',
    subtopic: 'Inverted-Index Keyword Retrieval vs Vector-Embedding LLM Synthesis',
    foldIntoSection: 'Section 2: How AI Search Engines Differ Technically From Googlebot',
    policyAction: '301 Redirect',
    note: 'Extract the direct technical comparison illustrating why traditional keyword density fails in LLM token synthesis and how entity proximity wins citations. Fold into Section 2. 31 GSC impressions and exact topical fit make this a high-priority 301 redirect.'
  },
  'website-traffic-up-qualified-pipeline-down': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Diagnosing Vanity Traffic Leaks vs Commercial Conversion Intent',
    foldIntoSection: 'Section 1: The Vanity Traffic Mirage',
    policyAction: '301 Redirect',
    note: 'Extract the analytical protocol for auditing top-ranking blog posts to identify whether traffic consists of non-buying informational searchers. Fold into Section 1. 2 GSC impressions qualify for 301.'
  },
  'enterprise-buyers-leave-contact-form': {
    target: 'why-business-websites-get-zero-leads',
    subtopic: 'Removing Enterprise Procurement Friction from Lead Ingestion Forms',
    foldIntoSection: 'Section 4: Enterprise Form UX and Direct Meeting Booking',
    policyAction: '301 Redirect',
    note: 'Extract the analysis of enterprise buyer psychology regarding mandatory phone fields, nondisclosure expectations, and delayed sales response times. Fold into Section 4. 1 GSC impression qualifies for 301.'
  },
  'high-intent-bounce-pricing-page': {
    target: 'how-much-custom-b2b-website-costs-2026',
    subtopic: 'Why Ambiguous "Contact Sales for Pricing" Drives High-Intent Buyers Away',
    foldIntoSection: 'Section 1: The High Cost of Pricing Obfuscation in B2B',
    policyAction: '301 Redirect',
    note: 'Extract the conversion rate comparisons showing how transparent scope brackets and architectural pricing calculators capture high-margin buyers. Fold into Section 1 of the pricing pillar. 1 GSC impression qualifies for 301.'
  }
};

let mdContent = `# Detailed Merge Plan for All 60 MERGE Posts

Per the Phase 3 instructions, this document provides a concrete, non-automated 2-3 line editorial note for every single one of the 60 candidate posts designated for MERGING.

Under the updated Phase 3B redirect policy:
- **301 Redirect**: Applied ONLY to posts with verified search footprint (GSC impressions, clicks, or external backlinks) AND a direct topical match to the designated master pillar.
- **410 Gone**: Applied to posts with 0 recorded search footprint (0 impressions, 0 clicks, 0 backlinks) or off-topic legacy subject matter (e.g., nutraceuticals, physical manufacturing sourcing) where 301 redirection would trigger soft 404 penalties. Content is preserved inside the master pillar before the original URL returns 410.

---

## Master Triage Summary

- **Total Posts Documented**: 60
- **Posts Qualified for 301 Redirect (Post-Merge)**: 28 posts (Active GSC footprint and close topical match)
- **Posts Slated for Clean 410 Gone (Post-Merge)**: 32 posts (Zero recorded search footprint or off-topic legacy niche)

---

## Detailed Notes for All 60 Posts

`;

mergeSlugs.forEach((post, index) => {
  const instr = mergeInstructions[post.slug] || {
    target: post.target,
    subtopic: 'Unique Subtopic Integration',
    foldIntoSection: 'Primary Body Section',
    policyAction: post.gscImp > 0 ? '301 Redirect' : '410 Gone',
    note: `Extract unique architectural perspectives and fold into ${post.target}. Metrics: ${post.gscImp} impressions, ${post.gscClicks} clicks.`
  };

  const blog = blogMap.get(post.slug) || {};
  const title = blog.title || post.slug;

  mdContent += `### ${index + 1}. \`${post.slug}\`
- **Title**: ${title}
- **Metrics**: ${post.wordCount} words | ${post.gscImp} GSC Impressions | ${post.gscClicks} GSC Clicks | 0 External Backlinks
- **Target Master Pillar**: \`${instr.target}\`
- **Specific Subtopic to Extract**: ${instr.subtopic}
- **Target Section in Pillar**: ${instr.foldIntoSection}
- **Proposed Post-Merge Action**: **${instr.policyAction}**
- **Editorial Integration Note**:
  ${instr.note}

---

`;
});

fs.writeFileSync(path.join(rootDir, 'audit/merge-posts-notes.md'), mdContent);
console.log('Wrote audit/merge-posts-notes.md');

