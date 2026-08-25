import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const countriesPath = path.join(__dirname, '../countries.json');
const outPath = path.join(__dirname, '../src/data/countryData.jsx');

const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

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
  ]
];

let out = `export const countryData = {\n`;

countries.forEach((country, index) => {
  const packIndex = index % solutionPacks.length;
  const solutions = solutionPacks[packIndex].map(item => ({
    ...item,
    desc: item.desc.replace('B2B', `${country.country} B2B`)
  }));

  out += `  "${country.slug}": {
    path: '/${country.slug}',
    props: {
      seoTitle: "${country.primaryKeyword} | Rankur",
      seoDesc: ${JSON.stringify(country.localEcosystemIntro + " Rankur builds B2B digital infrastructure to solve exactly this across " + country.country + ".")},
      niche: "${country.country} B2B",
      heroTitle: <>B2B Web Design & Growth Consultant in <span className="text-gold">${country.country}</span></>,
      heroSubtitle: ${JSON.stringify(country.localEcosystemIntro)},
      problemText: [
        ${JSON.stringify(country.localPainPoint)},
        "Many national companies across ${country.country} list features instead of solving pain points. They lack proper SEO architecture to capture high-intent search traffic.",
        "The result? High bounce rates, expensive CPLs, and an empty sales pipeline in competitive markets."
      ],
      solutions: ${JSON.stringify(solutions)},
      proofText: 'Built the exact React JS architecture used to scale our B2B manufacturing client to 50+ international B2B leads in the first 30 days.',
      faqs: [
        {
          question: "Why do ${country.country} B2B companies need specialized web architecture?",
          answer: ${JSON.stringify(country.localEcosystemIntro + " This makes enterprise-grade performance non-negotiable for " + country.country + " brands.")}
        },
        {
          question: "How quickly can you have a new B2B marketing site live in ${country.country}?",
          answer: "The core build sprint is 7–14 days. That includes architecture, copy integration, SEO/GEO technical setup, GA4 custom event tracking, and Cloudflare deployment."
        },
        {
          question: "Will this help us rank nationally in ${country.country} and internationally?",
          answer: "Yes. We build programmatic SEO structures and Generative Engine Optimization (GEO) that help you capture high-intent buyers searching in ${country.country}, as well as across broader international queries."
        }
      ]
    }
  }${index < countries.length - 1 ? ',' : ''}\n`;
});

out += `};\n`;

fs.writeFileSync(outPath, out, 'utf8');
console.log('Successfully updated src/data/countryData.jsx');
