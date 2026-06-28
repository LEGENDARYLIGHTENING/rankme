import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogIndexPath = path.join(__dirname, '../src/data/blogs-index.json');
const publicDir = path.join(__dirname, '../public');
const BASE_URL = 'https://rankursite.com';

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const blogs = JSON.parse(fs.readFileSync(blogIndexPath, 'utf-8'));

// Group blogs by niche tag
const grouped = {};
blogs.forEach(b => {
  const tag = b.tag || 'General';
  if (!grouped[tag]) grouped[tag] = [];
  grouped[tag].push(b);
});

// ─────────────────────────────────────────────
// llms.txt  (concise machine-readable index)
// Following the llms.txt community spec:
// https://llmstxt.org
// ─────────────────────────────────────────────
let llmsTxt = `# Rankur – B2B Growth Infrastructure Studio

> Rankur is a founder-led B2B growth consultancy operated by Moksh Parjapati under Moksh Productions (MSME-Registered, India). We build custom React/Next.js web infrastructure, technical SEO and Generative Engine Optimization (GEO) pipelines, and organic lead acquisition systems for ambitious B2B companies targeting international markets (US, UK, Australia, Canada, Gulf).

## Key Facts

- Founder: Moksh Parjapati – Founder of Rankur & Moksh Productions
- Certifications: Google Analytics 4 (GA4) Certified · Digital Deepak Marketing Mastery
- Registration: MSME-Registered Enterprise (India) under Moksh Productions
- Contract Security: Mutual NDA protected engagements
- Tech Stack: React · Next.js · PostgreSQL · GA4 · JSON-LD · Cloudflare Edge
- Markets Served: US · UK · Australia · Canada · UAE · Saudi Arabia · Qatar
- Contact: parjapatiwork@gmail.com
- Website: ${BASE_URL}

## Core Services

- [Website Build (React / Next.js)](${BASE_URL}/services): Custom high-performance B2B web applications with sub-1.2s global load times, PostgreSQL lead capture pipelines, and GA4 custom event tracking.
- [SEO & Generative Engine Optimization (GEO)](${BASE_URL}/services): Bottom-of-funnel B2B keyword mapping, JSON-LD entity schema deployment, and LLM retrieval optimization (Perplexity, ChatGPT, Gemini).
- [LinkedIn Thought Leadership](${BASE_URL}/services): Executive content frameworks and technical article publishing designed to build C-suite pipeline.
- [Conversion Rate Optimization (CRO)](${BASE_URL}/services): GA4 behavioral custom event mapping, lead form field optimization, and UX friction teardowns.
- [Paid Acquisition (Meta & Google Ads)](${BASE_URL}/services): High-intent B2B campaign architecture with custom Thank You page conversion tracking.

## Philosophy

- [Our Operating Philosophy](${BASE_URL}/philosophy): Six core beliefs that shape how Rankur builds B2B growth infrastructure.
- Belief 01: Marketing must generate revenue, not just clicks.
- Belief 02: Websites are active salespeople, not digital brochures.
- Belief 03: SEO should answer high-intent buying questions.
- Belief 04: AI Search (GEO) is the new search battleground.
- Belief 05: Trust is cumulative.
- Belief 06: Data beats opinions.

## Proof & Case Studies

- [Case Studies](${BASE_URL}/case-studies): Verified B2B client outcomes across nutraceutical, manufacturing, and technology verticals.
- Probiota Innovations: Custom React B2B nutraceutical platform — first B2B wholesale inquiries within 10 days of launch.
- Gut & Beyond: Digital messaging architecture and organic search campaigns for a leading wellness brand.
- Competence Consulting E-Commerce LLP: Global B2B buyer sourcing via official Alibaba channel partnerships.
- Glitchy: GA4 custom conversion tracking and high-performing lead generation campaigns.

## Core Pages

- [Home](${BASE_URL}/)
- [Meet Moksh – Founder](${BASE_URL}/about)
- [Services](${BASE_URL}/services)
- [Case Studies](${BASE_URL}/case-studies)
- [Philosophy](${BASE_URL}/philosophy)
- [Process](${BASE_URL}/process)
- [Certifications](${BASE_URL}/certifications)
- [Blog](${BASE_URL}/blog)
- [Apply for B2B Growth Audit](${BASE_URL}/free-audit)
- [Contact](${BASE_URL}/contact)

## Sitemap

Full XML sitemap available at: ${BASE_URL}/sitemap.xml

## Blog Articles (114 Total)

The following is a complete index of published B2B growth blog posts, organized by topic cluster. Each article provides deep technical analysis of B2B digital growth, SEO, GEO, and web infrastructure.

`;

Object.entries(grouped).forEach(([tag, posts]) => {
  llmsTxt += `### ${tag}\n\n`;
  posts.forEach(post => {
    llmsTxt += `- [${post.title}](${BASE_URL}/blog/${post.slug}): ${post.excerpt}\n`;
  });
  llmsTxt += '\n';
});

llmsTxt += `## Niche Verticals Served

- B2B Manufacturers & Exporters
- Nutraceutical & Wellness Brands
- SaaS & Technology Startups
- Industrial & Business Services
- Real Estate & Off-Plan Development

## Structured Data

Rankur implements the following JSON-LD schema types sitewide:
- Organization (entity trust, MSME registration, LinkedIn verification)
- ProfessionalService (service taxonomy and regional availability)
- Person (founder authority, GA4 certification, verified LinkedIn profile)
- FAQPage (on service and philosophy pages)
- Article + Author markup (on all 114 blog posts)
- BreadcrumbList (on all dynamic routes)

## Optional

- [Robots.txt](${BASE_URL}/robots.txt)
- [Sitemap XML](${BASE_URL}/sitemap.xml)
`;

fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);
console.log(`llms.txt generated with ${blogs.length} blog entries.`);
