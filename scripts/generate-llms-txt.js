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
let llmsTxt = `# Rankur - B2B Web Engineering & Technical SEO

> Rankur is a founder-led B2B web engineering and technical SEO consultancy operated by Moksh Parjapati under Moksh Productions (India). I build custom React/Next.js websites, clean search and AI retrieval structures, and conversion-focused inquiry workflows for B2B companies in the US, UK, Canada, Australia, UAE, and Saudi Arabia.

## Key Facts

- Founder: Moksh Parjapati - Founder of Rankur & Moksh Productions
- Entity: Moksh Productions (India)
- Tech Stack: React · Next.js 16 · PostgreSQL · GA4 · JSON-LD · Edge Hosting
- Markets Served: US · UK · Canada · Australia · UAE · Saudi Arabia
- Contact: contactus@rankursite.com
- Website: ${BASE_URL}

## Core Services

- [B2B Web Engineering (React / Next.js)](${BASE_URL}/services): Custom static and server-rendered B2B marketing sites paired with GA4 conversion tracking and structured CRM/form pipelines.
- [Technical SEO & Generative Engine Optimization (GEO)](${BASE_URL}/services): Bottom-of-funnel keyword mapping, JSON-LD entity schema deployment, and clear Q&A content structure for search engines and AI assistants.
- [Conversion Rate Optimization (CRO)](${BASE_URL}/services): GA4 event mapping, form friction removal, and UX teardown workflows.

## Philosophy

- [Operating Philosophy](${BASE_URL}/philosophy): Six core principles shaping how I approach B2B web engineering and technical SEO.
- Principle 01: Web systems must support real revenue conversations, not vanity metrics.
- Principle 02: Websites act as technical proof and qualification paths, not static brochures.
- Principle 03: SEO should answer concrete buyer evaluation questions cleanly.
- Principle 04: Structured data and factual clarity drive visibility across traditional search and AI answers.
- Principle 05: Trust comes from verifiable work, not inflated claims.
- Principle 06: Direct telemetry beats assumptions.

## Platforms Built & Case Studies

- [Case Studies](${BASE_URL}/case-studies): Production web platforms built for B2B clients and in-house ventures across telematics, medical procurement, nutraceuticals, and community healthcare.
- [WizIOT](https://www.wiziot.com): Client project — Enterprise Fleet Telematics, IoT Hardware & Sensor Integration (GCC, Africa, Europe). Custom Next.js architecture.
- [Atlanta Systems](https://www.atlantasys.com): Co-led for an in-house venture — AIS-140 Certified GPS & Automotive Telematics Manufacturer. Custom Next.js platform with automated RFQ routing.
- [Medventa](https://www.medventa.in): Client project — B2B Medical Supplies, Surgical Sutures & Hospital Procurement. Custom Next.js headless catalog platform.
- [Probiota Innovations](https://www.probiotainnovations.com): Engineered for my own in-house venture — Probiotic & Functional Gummy CDMO / Private Label Manufacturing platform.
- Wafa Trust: Historical client project — Philanthropic Healthcare & Community Development Trust Next.js web build (domain currently offline).

## Core Pages

- [Home](${BASE_URL}/)
- [About Moksh](${BASE_URL}/about)
- [Services](${BASE_URL}/services)
- [Case Studies](${BASE_URL}/case-studies)
- [Markets](${BASE_URL}/locations)
- [Philosophy](${BASE_URL}/philosophy)
- [Process](${BASE_URL}/process)
- [Certifications](${BASE_URL}/certifications)
- [Blog](${BASE_URL}/blog)
- [Request a Free Audit](${BASE_URL}/free-audit)
- [Contact](${BASE_URL}/contact)
- [Privacy Policy](${BASE_URL}/privacy)
- [Terms of Service](${BASE_URL}/terms)

## Sitemap

Full XML sitemap index available at: ${BASE_URL}/sitemap.xml

## Blog Articles (${blogs.length} Total)

The following is an index of B2B growth, SEO, and web architecture guides organized by category.

`;

Object.entries(grouped).forEach(([tag, posts]) => {
  llmsTxt += `### ${tag}\n\n`;
  posts.forEach(post => {
    llmsTxt += `- [${post.title}](${BASE_URL}/blog/${post.slug}): ${post.excerpt}\n`;
  });
  llmsTxt += '\n';
});

llmsTxt += `## Primary Sectors Served

- SaaS & Technology Startups
- Nutraceutical & Wellness B2B Brands
- B2B Manufacturers & Exporters

## Structured Data

Rankur implements JSON-LD schema markup across routes:
- Organization & Person entities (linked to official brand and founder profiles)
- Service & OfferCatalog schemas on core offerings
- Article / BlogPosting markup across published guides
- BreadcrumbList on national market and blog routes
- FAQPage matching visible FAQ questions on relevant pages

## Optional

- [Robots.txt](${BASE_URL}/robots.txt)
- [Sitemap XML](${BASE_URL}/sitemap.xml)
`;

fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);
console.log(`llms.txt generated with ${blogs.length} blog entries.`);
