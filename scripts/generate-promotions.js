import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogIndexPath = path.join(__dirname, '../src/data/blogs-index.json');
const promotionsDir = path.join(__dirname, '../promotions');

// Ensure promotions directory exists
if (!fs.existsSync(promotionsDir)) {
  fs.mkdirSync(promotionsDir, { recursive: true });
}

// Read blog index
if (!fs.existsSync(blogIndexPath)) {
  console.error(`[Error] Blog index not found at ${blogIndexPath}. Please run generate-blog-index.js first.`);
  process.exit(1);
}

const blogs = JSON.parse(fs.readFileSync(blogIndexPath, 'utf-8'));

// Spin-tax parser helper
function parseSpintax(text) {
  let matches;
  while ((matches = text.match(/\{([^{}]+)\}/))) {
    const options = matches[1].split('|');
    const selected = options[Math.floor(Math.random() * options.length)];
    text = text.replace(matches[0], selected);
  }
  return text;
}

// Helpers to match niches
function getNicheCategory(tag) {
  const t = (tag || 'default').toLowerCase();
  if (t.includes('saas') || t.includes('tech')) return 'saas';
  if (t.includes('manufactur') || t.includes('export') || t.includes('industrial')) return 'manufacturing';
  if (t.includes('nutraceutical') || t.includes('wellness') || t.includes('supplement')) return 'wellness';
  if (t.includes('seo') || t.includes('geo')) return 'seogeo';
  if (t.includes('linkedin') || t.includes('thought')) return 'linkedin';
  return 'general';
}

// ----------------------------------------------------
// SPIN-TAX TEMPLATES BY NICHE
// ----------------------------------------------------
const templates = {
  saas: {
    linkedin_post: 
      `🔥 {SaaS Founders|SaaS Product Leaders|SaaS Marketing Executives}: Is your website {actively converting demo requests|doing the work of an active salesperson, or is it just a digital brochure}? 

{Most B2B SaaS sites lose conversions before the prospect even scrolls.|If you're targeting enterprise buyers in {targetMarket}, your website copy is likely too vague to win trust.}

Let's discuss {title}.

**{Attention|The Reality}:** Buyers in 2026 evaluate SaaS platforms autonomously. They don't want a generic sales pitch.
**{Interest|The Fix}:** You must optimize for {primaryKeyword} to map value to commercial intent.
**{Desire|The Proof}:** Decoupling into custom React/Next.js frameworks and refining value alignment has repeatedly unlocked double-digit pipeline increases for SaaS startups.
**{Action|The Link}:** Avoid generic advice. Read the full conversion playbook:
👉 https://rankursite.com/blog/{slug}

#SaaSGrowth #ReactJS #B2BMarketing #CRO`,

    linkedin_article:
      `# How to Architect a High-Converting SaaS Website in 2026
**By Moksh, Founder of Rankur**

### The Hidden Bottleneck in SaaS Demo Funnels
Most B2B SaaS companies spend thousands of dollars driving high-intent traffic to their website, only to watch prospects bounce. The standard explanation? "Our pricing is too high" or "The market is too crowded." 

The real reason is simpler: Your website is built like a technical spec sheet, not an active salesperson.

To win enterprise contracts in {targetMarket}, you must build a custom digital acquisition engine. Here is the operational framework for optimizing **{primaryKeyword}** to capture and qualify enterprise demand:

1. **Strategic Intent Alignment:** Stop hiding your core value behind generic copywriting. Your homepage hero section must address the buyer's immediate operational bottleneck.
2. **Speed as a Conversion Metric:** If your platform takes more than 1.5 seconds to load, your buyer has already left. Custom headless architecture (React/Next.js) is a prerequisite for B2B pipeline growth.
3. **Structured Qualifying Funnels:** Replace long, friction-heavy forms with interactive React components that capture industry verticals and compliance parameters dynamically.

By treating your website as a high-performance software application rather than a static brochure, you build a compound growth engine.

👉 Read the complete B2B engineering guide: [SaaS growth infrastructure playbook](https://rankursite.com/blog/{slug})
👉 Ready for a manual teardown of your page speed and positioning? [Request a free custom B2B audit](https://rankursite.com/free-audit)`,

    medium_article:
      `# Beyond the Spec Sheet: Why Your B2B SaaS Website Isn’t Converting Demos

If you are scaling a B2B SaaS startup targeting {targetMarket}, your website is likely bleeding demo requests. 

Every day, high-value prospects land on your homepage, scroll for 15 seconds, and close the tab. You are not losing them because your product lacks features. You are losing them because your digital interface fails to qualify their intent and prove your technical authority.

In this guide, we break down why **{primaryKeyword}** is the key to locking in enterprise pipelines and how modern B2B tech stacks solve the conversion problem.

### 1. The Death of the Generic SaaS Brochure
Enterprise procurement teams do not purchase software based on vague taglines like *"next-generation collaborative platforms."* They look for concrete capabilities, integrations, and regulatory compliance. 

If your website behaves like a static PDF catalog, you are forcing the buyer to do the heavy lifting of figuring out if your software fits their system. Your site must adapt. Modern headless frameworks allow us to serve dynamic, behavioral-based layouts that adjust based on user interaction in real-time.

### 2. Why WordPress and Webflow Limit Enterprise Scale
While no-code page builders are excellent for early-stage MVPs, they introduce massive security, loading speed, and structural code limitations at scale. 

Decoupled React and Next.js structures allow for sub-second page loads, tight API integrations, and robust schema deployments that allow search crawlers (and AI models) to mathematically index your features.

### 3. Creating Strategic Lead Friction
Counter-intuitively, maximizing conversion rate doesn't mean removing all forms. High-ticket B2B sales require qualifying leads. By introducing structured, multi-step React qualification forms, you eliminate unqualified tire-kickers and route enterprise-level buyers directly to your sales team.

---
👉 Read the full deep dive on our blog: [SaaS Growth Strategy Blueprint](https://rankursite.com/blog/{slug})
👉 Want to audit your current organic conversion rate and page speed? [Get your manual B2B growth audit here](https://rankursite.com/free-audit)`
  },
  manufacturing: {
    linkedin_post:
      `⚙️ {B2B Exporters|Industrial Manufacturers|Contract Manufacturers}: How does your business rank when international buyers search for suppliers in {targetMarket}?

If you are still relying on generic directories or legacy websites, you are losing 7-figure deals to competitors with superior digital infrastructure.

Let's discuss {title}.

**{Attention|The Hook}:** Global procurement teams do not source suppliers based on gut feeling. They audit your digital maturity.
**{Interest|The Blueprint}:** Optimizing your site for {primaryKeyword} ensures you appear in the exact commercial searches buyers use when ready to source.
**{Desire|The Outcome}:** Upgrading to a fast React frontend and implementing AS9100/MSME structured data schema ensures you are verified by global procurement systems.
**{Action|Next Steps}:** Read the technical guide:
👉 https://rankursite.com/blog/{slug}

#Manufacturing #B2BExport #IndustrialSEO #LeadGeneration`,

    linkedin_article:
      `# How B2B Manufacturers Capture 7-Figure International Contracts Online
**By Moksh, Founder of Rankur**

### The Digital Maturity Gap in Manufacturing
For decades, B2B exporters and contract manufacturers relied strictly on trade shows, cold outreach, and agent networks to source contracts in markets like {targetMarket}. 

But the buyer journey has shifted. Today, 70% of the research is completed before a procurement officer ever contacts your sales team. If your digital footprint looks like a legacy 2012 HTML site, you are immediately disqualified during their compliance audit.

To win in the modern industrial landscape, you must implement a robust strategy for **{primaryKeyword}**. Here are the three pillars:

1. **Entity Verification:** You must explicitly display your MSME registrations, quality ISO standards, and manufacturing capacities in machine-readable JSON-LD schema so search engines can verify your legitimacy.
2. **Dynamic RFQ Funnels:** Remove the standard "Contact Us" email address and replace it with a structured React RFQ form that captures CAD file requirements, volume targets, and technical tolerance requirements.
3. **Frictional Filtering:** Structure your lead intake to qualify buyers instantly, ensuring your sales engineers spend time pricing 7-figure contracts instead of chasing low-budget inquiries.

👉 Read the full engineering breakdown: [B2B Industrial Growth Architecture](https://rankursite.com/blog/{slug})
👉 Get a custom, manual analysis of your current website capability schema: [Request a free custom B2B audit](https://rankursite.com/free-audit)`,

    medium_article:
      `# Sourcing in the Digital Era: Why Industrial Exporters Need High-Performance Growth Infrastructure

If you run a B2B manufacturing or export business looking to secure contracts in {targetMarket}, your legacy website is likely your biggest commercial liability.

When enterprise procurement agents evaluate international suppliers, they conduct a rigorous digital audit. If your site takes 4 seconds to load, lacks secure SSL/TLS protocols, or buries capability specs in unindexed PDFs, the agent will move on.

In this article, we outline why **{primaryKeyword}** is the key to scaling your international B2B pipeline.

### 1. The Compliance Audit Starts on Your Homepage
Procurement officers do not have time to call you to check if you hold specific certifications. They expect your website to serve as an authoritative compliance ledger. By utilizing clean React structures, we can display machine-readable ISO and registration badges directly to search crawlers, ensuring your business shows up during their initial screening phases.

### 2. Transitioning to Headless React Architecture
Industrial websites are notorious for being slow and bloated. Moving to a headless Next.js or React setup Decoupled from legacy database systems guarantees page speeds under 1.2 seconds globally. This is critical for overseas buyers accessing your site on slow mobile connections.

### 3. Capturing High-Intent RFQs
A simple contact form will not capture a procurement director's attention. Your site must feature an interactive RFQ portal that allows buyers to securely upload drawings, specify alloy types, and outline compliance protocols. This builds immediate operational trust.

---
👉 Read the full industrial blueprint on our blog: [B2B Manufacturing Growth Strategy](https://rankursite.com/blog/{slug})
👉 Request a manual audit of your search authority and technical speed parameters: [B2B Infrastructure Teardown](https://rankursite.com/free-audit)`
  },
  wellness: {
    linkedin_post:
      `🌿 {Nutraceutical Brands|Wellness Manufacturers|Supplement Exporters}: Is your brand visible to distributors in {targetMarket}?

In a highly regulated, high-trust market, generic copywriting gets you ignored. You need technical authority.

Let's discuss {title}.

**{Attention|The Reality}:** Wellness distributors evaluate regulatory readiness and supply chain stability before they ever email you.
**{Interest|The Strategy}:** Optimizing your platform for {primaryKeyword} establishes immediate scientific and legal credibility.
**{Desire|The Proof}:** Implementing clean product schemas and dynamic ingredient disclosure funnels has helped supplement brands generate B2B wholesale inquiries within weeks of launch.
**{Action|Link}:** Read our specialized B2B compliance marketing guide:
👉 https://rankursite.com/blog/{slug}

#Nutraceuticals #B2BWellness #SupplementExport #GEO`,

    linkedin_article:
      `# Scaling Your B2B Wellness & Supplement Brand Globally
**By Moksh, Founder of Rankur**

### The Scientific Trust Hurdle in B2B Nutraceuticals
The global supplement market is booming, but entering high-trust markets like {targetMarket} requires more than beautiful retail branding. You are selling to distributors, pharmacy chains, and regulatory compliance teams who audit your ingredient sourcing, stability data, and certification records.

If your website looks like a simple D2C e-commerce shop, distributors will skip you. You must structure your platform for **{primaryKeyword}**.

Here is how to optimize your digital footprint for B2B wellness expansion:
1. **Machine-Readable Ingredient Sourcing:** Use structured JSON-LD schema to list raw materials, stability certifications, and lab reports, allowing search engines (and AI engines) to verify your product claims.
2. **Distributor Onboarding Funnels:** Implement multi-step onboarding portals that collect distributor license details and target volumes before revealing pricing.
3. **E-E-A-T Signal Reinforcement:** Authorship matters. Link your technical articles to the verified profiles of your lead formulation scientists.

👉 Read our full nutraceutical marketing guide: [Nutraceutical B2B Growth Playbook](https://rankursite.com/blog/{slug})
👉 Audit your supplement brand's current search and AI visibility: [Free B2B Growth Audit](https://rankursite.com/free-audit)`,

    medium_article:
      `# Trust, Science, and Code: How B2B Nutraceutical Brands Win Global Distributors

If you are running a wellness or dietary supplement manufacturing business targeting wholesale distributors in {targetMarket}, your website copy cannot read like a retail brochure.

Distributors, compliance managers, and pharmacy buyers are highly risk-averse. They need to verify your manufacturing certifications (GMP, ISO, FDA) and raw material pathways.

In this guide, we break down why **{primaryKeyword}** is the key to building international B2B wellness authority online.

### 1. Scientific Verification Over Marketing Fluff
AI search models and professional buyers look for empirical data. Your product pages must clearly display stability testing results, certifications of analysis (COA), and packaging parameters. Decoupling this data into organized, search-crawled tables ensures that when a buyer prompts an AI for compliant suppliers, your brand is cited.

### 2. High-Performance React Infrastructure
A slow website implies a slow, unorganized supply chain. By building on custom React and Next.js frontends, you showcase operational sophistication and provide a sub-second page speed that keeps busy B2B buyers engaged.

### 3. Structuring the Wholesale Inquiry Flow
Do not let generic lead capture ruin your sales pipeline. A dedicated distributor qualifying portal allows you to collect volume demands, shipping destinations, and regulatory needs, immediately classifying high-value accounts.

---
👉 Read the complete wellness framework on our blog: [Nutraceutical B2B Growth Strategies](https://rankursite.com/blog/{slug})
👉 Get a free manual teardown of your site's SEO, speed, and regulatory data structuring: [B2B Audit Request](https://rankursite.com/free-audit)`
  },
  seogeo: {
    linkedin_post:
      `🤖 {B2B Marketers|Growth Operators|Enterprise CMOs}: Are you still optimizing strictly for Google's blue links?

In 2026, search has evolved. If you aren't optimizing for AI Search engines like ChatGPT, Gemini, and Perplexity, you're becoming invisible.

Let's discuss {title}.

**{Attention|The Hook}:** Enterprise buyers are asking AI to recommend vendors, bypassing traditional search results entirely.
**{Interest|The Engine}:** Mastering {primaryKeyword} is the only way to ensure your brand is cited in LLM retrieval graphs.
**{Desire|The Proof}:** Incorporating JSON-LD entity schema and inverted-pyramid semantic content has proven to drive triple-digit organic referral growth in target markets like {targetMarket}.
**{Action|Next Steps}:** Read our technical optimization playbook:
👉 https://rankursite.com/blog/{slug}

#GEO #SEO #AIOverview #B2BGrowth`,

    linkedin_article:
      `# The Shift from SEO to GEO: How to Rank in ChatGPT and Perplexity
**By Moksh, Founder of Rankur**

### The Death of the Traditional Blue Link
For two decades, B2B search marketing had a simple playbook: write a keyword-optimized blog, build backlinks, and rank on Google's first page. But in 2026, enterprise buyers are typing complex prompts into conversational AI engines instead of scrolling through ads.

If your site is not optimized for **{primaryKeyword}**, you do not exist in their retrieval window.

Here is the operational blueprint to build authority in the generative era:
1. **Entity Graph Integration:** AI engines do not read paragraphs; they map entities. You must explicitly define your company's relationships, certifications, and target markets inside JSON-LD structured data.
2. **Factual Density (The Inverted Pyramid):** LLMs prioritize factual, hyper-dense source materials. Stop writing filler introductions; answer the core commercial query in the first 150 words.
3. **Structured Q&A Formats:** Structure your services and articles around questions and wrap them in FAQPage schema. The AI will pull these answers directly into its overview answers.

👉 Read the technical guide: [B2B Generative Engine Optimization Blueprint](https://rankursite.com/blog/{slug})
👉 Audit your brand's current visibility in Perplexity and ChatGPT: [Free B2B Audit](https://rankursite.com/free-audit)`,

    medium_article:
      `# AI Models Don't Have Eyes: Why Your B2B Website Needs Generative Engine Optimization (GEO)

If you are running a B2B enterprise targeting decision makers in {targetMarket}, your traditional SEO strategy is likely failing to capture new leads.

AI engines like ChatGPT, Claude, and Perplexity are actively replacing Google search for B2B discovery. When a buyer prompts: *"Who is the most reliable contract manufacturer for custom React apps?"* the AI scans the web, synthesizes an answer, and cites 2-3 brands.

If you want to be one of those citations, you need to master **{primaryKeyword}**.

### 1. Understanding the LLM Retrieval Pipeline
Unlike Google's index algorithms, which rank pages based on backlink counts and keyword frequency, generative AI engines prioritize information accuracy, speed, and entity structure. If your site takes 4 seconds to load and uses vague marketing taglines, the LLM cannot confirm your capabilities with mathematical certainty.

### 2. The Power of JSON-LD Entity Schema
You must translate your business capabilities into code. Implementing detailed \`Organization\`, \`Service\`, and \`Product\` schemas allows AI scrapers to immediately index your target regions, compliance standards, and pricing systems. 

### 3. Factual Content Clustering
Stop publishing high-volume, low-quality blog posts. AI models prioritize authoritative, highly referenced source materials. Group your content into deep topical clusters that prove your industry expertise.

---
👉 Read the full GEO optimization framework: [B2B SEO & GEO Survival Playbook](https://rankursite.com/blog/{slug})
👉 Get a custom manual audit of your current AI search engine visibility: [B2B Growth Audit Portal](https://rankursite.com/free-audit)`
  },
  linkedin: {
    linkedin_post:
      `💬 {B2B Executives|Founders|Consultants}: Are you leveraging organic content to build enterprise pipeline?

If your LinkedIn strategy is just posting corporate announcements, you are missing out on high-intent lead generation in {targetMarket}.

Let's discuss {title}.

**{Attention|The Hook}:** Enterprise buyers buy from recognized industry experts, not faceless corporations.
**{Interest|The Playbook}:** Executing a structured framework for {primaryKeyword} positions you as the definitive authority in your niche.
**{Desire|The Proof}:** Sharing technical breakdowns and operational insights directly online builds trust, booking discovery calls before you ever send a pitch.
**{Action|Read}:** Get our organic content playbook:
👉 https://rankursite.com/blog/{slug}

#LinkedInThoughtLeadership #B2BMarketing #OrganicGrowth #Pipeline`,

    linkedin_article:
      `# Building C-Suite Trust: The Organic LinkedIn Thought Leadership Framework
**By Moksh, Founder of Rankur**

### The Shift in B2B Sourcing
Enterprise executives in {targetMarket} do not make buying decisions based on cold emails or glossy ads. They buy from operators who have repeatedly proven their expertise in public. 

If you are not active on LinkedIn, you are giving away your market authority. But basic posting won't cut it. You need a systematic approach to **{primaryKeyword}**.

Here is our C-suite authority framework:
1. **Share Proprietary Data:** Stop summarizing other people's articles. Share your own case studies, operational failures, and database architectures. Factual proof builds immediate trust.
2. **Write in the Inverted Pyramid:** Place your most valuable takeaway at the absolute top of your post. If the first sentence doesn't hook the reader, they won't click "see more."
3. **Maintain a Regular Cadence:** Consistency compounds. Establish a structured publishing calendar that targets commercial objections, customer case studies, and industry trends weekly.

👉 Read the full strategy guide: [LinkedIn B2B Lead Gen Playbook](https://rankursite.com/blog/{slug})
👉 Request a manual audit of your current website conversion infrastructure: [Free B2B Audit](https://rankursite.com/free-audit)`,

    medium_article:
      `# The C-Suite Playbook: Leveraging LinkedIn Organic Authority for B2B Enterprise Growth

If you are a B2B founder or consultant looking to acquire enterprise clients in {targetMarket}, your personal brand is your most powerful sales channel.

Traditional outbound sales are facing declining response rates. Decision-makers are inundated with automated emails and LinkedIn spam. To stand out, you must establish technical authority before the first conversation.

In this guide, we explore how **{primaryKeyword}** drives B2B pipeline growth and how to implement a consistent content engine.

### 1. Establishing Empirical E-E-A-T
Enterprise buyers are highly risk-averse. They need to know that you understand their exact operational challenges. By writing deep, technical breakdowns of your projects, workflows, and compliance strategies on LinkedIn, you provide immediate evidence of your expertise.

### 2. Structuring Your Content Funnel
Do not post random thoughts. Your content must follow a strategic funnel:
- **Top-of-Funnel:** High-level industry critiques and contrarian positions.
- **Middle-of-Funnel:** Deep-dive case studies and architectural breakdowns.
- **Bottom-of-Funnel:** Explicit conversion hooks pointing to your qualification forms.

### 3. Integrating Social Authority with Web Infrastructure
Your personal brand must link back to a high-converting web platform. When a prospect clicks from your LinkedIn profile to your site, they must land on a lightning-fast React page that validates your authority and guides them directly into an RFQ or audit funnel.

---
👉 Read the full organic content blueprint: [B2B LinkedIn Strategy Playbook](https://rankursite.com/blog/{slug})
👉 Let us audit your website speed, copy positioning, and conversion bottlenecks: [Free B2B Audit Request](https://rankursite.com/free-audit)`
  },
  general: {
    linkedin_post:
      `📈 B2B decision makers in {targetMarket}: Are you optimizing your digital presence to capture global demand?

If your site is slow, unoptimized, and built on legacy tech, you are losing conversions daily.

Let's discuss {title}.

**{Attention|The Hook}:** Modern buyers demand speed, authority, and clear value mapping.
**{Interest|The Engine}:** Implementing a robust strategy for {primaryKeyword} secures your place as the obvious market partner.
**{Desire|The Proof}:** Moving to decoupled headless stacks and optimizing for organic search has helped brands capture B2B pipeline within weeks of launch.
**{Action|Next Steps}:** Read our B2B growth guide:
👉 https://rankursite.com/blog/{slug}

#B2BGrowth #SEO #DigitalInfrastructure #CRO`,

    linkedin_article:
      `# Future-Proofing Your B2B Growth: Technical SEO and Custom Web Infrastructure
**By Moksh, Founder of Rankur**

### The Cost of Digital Friction
In the competitive B2B landscape of {targetMarket}, technical friction on your website acts as an active barrier to pipeline growth. Slow loading speeds, weak schema markup, and confusing conversion paths frustrate buyers and force them to look elsewhere.

To build a sustainable digital pipeline, you must optimize for **{primaryKeyword}**.

Here are the three structural pillars:
1. **Technical Performance:** Migrating to modern decoupled React/Next.js frontends hosted at the Edge reduces page load times, directly boosting SEO and buyer retention.
2. **Topical Authority:** Develop deep content clusters that address the exact commercial questions your prospects search for.
3. **Dynamic Conversion Paths:** Replace long, rigid forms with intuitive, multi-step portals that capture qualifying lead data seamlessly.

👉 Read the full optimization guide: [B2B Growth Infrastructure Playbook](https://rankursite.com/blog/{slug})
👉 Get a custom, manual audit of your current website speed and search authority: [Free B2B Growth Audit](https://rankursite.com/free-audit)`,

    medium_article:
      `# Building an Enterprise-Grade Acquisition Engine: Why B2B Sites Need Technical Rigor

To capture enterprise pipeline in {targetMarket}, you cannot rely on basic web templates and outdated marketing tactics.

B2B buying journeys are long, complex, and involve multiple decision makers who audit your operational capabilities. If your website fails to communicate professional authority and technical sophistication, you are losing high-value deals.

In this guide, we explore why **{primaryKeyword}** is critical to modern B2B growth.

### 1. Engineering a Sub-Second User Experience
Page load speed is a ranking signal and a primary UX bottleneck. Upgrading to a custom React architecture decoupled from slow databases guarantees your site loads instantly globally, ensuring you capture every visitor.

### 2. Schema-Level Authority
Search engines and AI crawlers do not read marketing copy. They parse structured JSON-LD schemas. Hardcoding organizational, capability, and FAQ schemas directly into your website is critical to ranking in both Google and AI search models.

### 3. Modern Lead Capture Funnels
Simplify the path to conversation. Implement interactive qualifying forms that dynamically capture distributor criteria, tolerances, or volume requirements, making it easy for the right buyers to get in touch.

---
👉 Read our full deep dive guide: [B2B Growth Infrastructure Strategy](https://rankursite.com/blog/{slug})
👉 Request a free manual audit of your website's performance and conversion pathing: [Custom B2B Growth Audit](https://rankursite.com/free-audit)`
  }
};

// ----------------------------------------------------
// GENERATION LOOP FOR ALL 114 BLOGS
// ----------------------------------------------------
let linkedinPostsContent = `# LinkedIn Posts - All 114 Blogs (AIDA Style & SEO/GEO Optimized)

This file contains copy-paste ready LinkedIn posts for all 114 blogs. Each post is optimized using the AIDA framework, story-driven, and includes the actual backlink.

***\n\n`;

let linkedinArticlesContent = `# LinkedIn Articles - All 114 Blogs (Story-Driven & Rewritten)

This file contains copy-paste ready LinkedIn articles for all 114 blogs. They are rewritten to provide direct value and avoid Google duplicate content filters.

***\n\n`;

let mediumArticlesContent = `# Medium Articles - All 114 Blogs (GEO & Authority Optimized)

This file contains copy-paste ready Medium articles for all 114 blogs. They are structured as deep-dive guides targeting decision-makers.

***\n\n`;

blogs.forEach((blog, index) => {
  const num = String(index + 1).padStart(2, '0');
  const niche = getNicheCategory(blog.tag);
  
  // Variables for template replacement
  const vars = {
    title: blog.title,
    excerpt: blog.excerpt,
    slug: blog.slug,
    primaryKeyword: blog.primaryKeyword || blog.title,
    targetMarket: blog.targetMarket || 'US / UK / Global',
    nicheTag: (blog.tag || 'B2BGrowth').replace(/\s+/g, '').replace(/&/g, 'And').replace(/\+/g, 'And')
  };

  // Get templates for this niche
  const nicheTemplates = templates[niche] || templates.general;

  // Generate individual post content
  let liPost = parseSpintax(nicheTemplates.linkedin_post);
  let liArticle = parseSpintax(nicheTemplates.linkedin_article);
  let medArticle = parseSpintax(nicheTemplates.medium_article);

  // Perform variable substitution
  Object.keys(vars).forEach(key => {
    const regex = new RegExp(`{${key}}`, 'g');
    liPost = liPost.replace(regex, vars[key]);
    liArticle = liArticle.replace(regex, vars[key]);
    medArticle = medArticle.replace(regex, vars[key]);
  });

  // Append to the consolidated files
  linkedinPostsContent += `## [${num}] Blog: ${blog.title}\n\n${liPost}\n\n***\n\n`;
  linkedinArticlesContent += `## [${num}] Blog: ${blog.title}\n\n${liArticle}\n\n***\n\n`;
  mediumArticlesContent += `## [${num}] Blog: ${blog.title}\n\n${medArticle}\n\n***\n\n`;
});

// Write to files
fs.writeFileSync(path.join(promotionsDir, 'linkedin_posts.md'), linkedinPostsContent);
fs.writeFileSync(path.join(promotionsDir, 'linkedin_articles.md'), linkedinArticlesContent);
fs.writeFileSync(path.join(promotionsDir, 'medium_articles.md'), mediumArticlesContent);

console.log(`Successfully generated promotions for all ${blogs.length} blogs!`);
