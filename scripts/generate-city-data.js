import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const citiesPath = path.join(__dirname, '../cities.json');
const outPath = path.join(__dirname, '../src/data/cityData.jsx');

const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));

const solutionPacks = [
  [
    { icon: '⟨/⟩', title: 'Enterprise React & Next.js Builds', desc: 'Custom high-speed React web infrastructure engineered for top-tier conversion rates and sub-second load times.' },
    { icon: '◎', title: 'High-Intent B2B SEO & GEO', desc: 'Capturing commercial problem-based searches across traditional Google ranking and Generative Engine Optimization (ChatGPT & Perplexity).' },
    { icon: '▶', title: 'Conversion Rate Engineering', desc: 'Removing user friction and form drop-offs to maximize qualified sales discovery pipeline volume.' }
  ],
  [
    { icon: '📊', title: 'Pipeline Funnel Analytics (GA4)', desc: 'Custom GA4 telemetry and multi-touch attribution setup to track high-value enterprise lead conversions.' },
    { icon: '✍', title: 'Executive Thought Leadership', desc: 'Technical B2B authority content and publication pipelines to establish immediate market dominance.' },
    { icon: '⚡', title: 'Edge Performance & Cloudflare Security', desc: 'Global CDN distribution and DDoS defense ensuring 99.99% uptime and sub-1.2s response times globally.' }
  ],
  [
    { icon: '🎯', title: 'Commercial Positioning Alignment', desc: 'Crafting persuasive enterprise messaging frameworks that position your platform as the obvious choice in high-stakes deals.' },
    { icon: '🔍', title: 'LLM & Search Visibility Systems', desc: 'Structured schema architecture designed for AI search engine indexing and commercial keyword dominance.' },
    { icon: '⚙', title: 'PostgreSQL Lead Pipeline Integration', desc: 'Secure database pipelines capturing and routing inbound buyer inquiries directly to your CRM.' }
  ]
];

let out = `export const cityData = {\n`;

cities.forEach((city, index) => {
  const packIndex = index % solutionPacks.length;
  const solutions = solutionPacks[packIndex].map(item => ({
    ...item,
    desc: item.desc.replace('B2B', `${city.city} B2B`)
  }));

  out += `  "${city.slug}": {
    path: '/${city.slug}',
    props: {
      seoTitle: "${city.primaryKeyword} | Rankur",
      seoDesc: ${JSON.stringify(city.localEcosystemIntro + " Rankur builds B2B digital infrastructure to solve exactly this in " + city.city + ".")},
      niche: "${city.city} B2B",
      heroTitle: <>B2B Web Design & Growth Consultant in <span className="text-gold">${city.city}</span></>,
      heroSubtitle: ${JSON.stringify(city.localEcosystemIntro)},
      problemText: [
        ${JSON.stringify(city.localPainPoint)},
        "Many local ${city.city} companies list product features instead of solving core commercial pain points. They lack proper SEO architecture to capture high-intent search traffic.",
        "The result? High bounce rates, expensive CPLs, and an empty sales pipeline in competitive markets."
      ],
      solutions: ${city.localSolutions ? JSON.stringify(city.localSolutions) : JSON.stringify(solutions)},
      marketOpportunity: ${city.marketOpportunity ? JSON.stringify(city.marketOpportunity) : "null"},
      competitiveLandscape: ${city.competitiveLandscape ? JSON.stringify(city.competitiveLandscape) : "null"},
      proofText: 'Built the exact React JS infrastructure used to scale our B2B manufacturing client to 50+ international B2B leads in the first 30 days.',
      faqs: ${city.localFaqs ? JSON.stringify(city.localFaqs) : `[
        {
          question: "Why do ${city.city} B2B companies need specialized web architecture?",
          answer: ${JSON.stringify(city.localEcosystemIntro + " This makes enterprise-grade performance and positioning non-negotiable for " + city.city + " brands.")}
        },
        {
          question: "How quickly can you have a new B2B marketing site live in ${city.city}?",
          answer: "Our core sprint is 7–14 days. That includes architecture, messaging alignment, SEO/GEO technical setup, GA4 custom event tracking, and Cloudflare deployment."
        },
        {
          question: "Will this help us rank locally in ${city.city} and internationally?",
          answer: "Yes. We build programmatic SEO structures and Generative Engine Optimization (GEO) that help you capture high-intent buyers searching in ${city.city}, as well as across broader national and international queries."
        }
      ]`}
    }
  }${index < cities.length - 1 ? ',' : ''}\n`;
});

out += `};\n`;

fs.writeFileSync(outPath, out, 'utf8');
console.log('Successfully updated src/data/cityData.jsx with enhanced content uniqueness');
