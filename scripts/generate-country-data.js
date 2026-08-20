import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const countriesPath = path.join(__dirname, '../countries.json');
const outPath = path.join(__dirname, '../src/data/countryData.jsx');

const countries = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));

let out = `export const countryData = {\n`;

countries.forEach((country, index) => {
  out += `  "${country.slug}": {
    path: '/${country.slug}',
    props: {
      seoTitle: "${country.primaryKeyword} | Rankur",
      seoDesc: ${JSON.stringify(country.localEcosystemIntro + " Rankur builds B2B digital infrastructure to solve exactly this.")},
      niche: "${country.country} B2B",
      heroTitle: <>B2B Web Design & Growth Consultant in <span className="text-gold">${country.country}</span></>,
      heroSubtitle: ${JSON.stringify(country.localEcosystemIntro)},
      problemText: [
        ${JSON.stringify(country.localPainPoint)},
        "Many national companies list features instead of solving pain points. They lack proper SEO architecture to capture high-intent search traffic.",
        "The result? High bounce rates, expensive CPLs, and an empty sales pipeline."
      ],
      solutions: [
        {
          icon: '⟨/⟩',
          title: 'Conversion-Focused Architecture',
          desc: 'Clear pathways from feature pages to demo requests, optimized for reducing friction and increasing MQLs for ${country.country} enterprises.'
        },
        {
          icon: '◎',
          title: 'High-Intent SEO',
          desc: 'Targeting bottom-of-funnel keywords to capture national and international enterprise buyers ready to switch.'
        },
        {
          icon: '▶',
          title: 'Retargeting Ecosystem',
          desc: 'Meta and LinkedIn ads designed specifically to nurture unconverted website visitors back into the pipeline.'
        }
      ],
      proofText: 'Built the exact React JS architecture used to scale our B2B manufacturing client to 50+ international B2B leads in the first 30 days.',
      faqs: [
        {
          question: "Why do ${country.country} B2B companies need specialized web architecture?",
          answer: ${JSON.stringify(country.localEcosystemIntro + " This makes enterprise-grade performance non-negotiable.")}
        },
        {
          question: "How quickly can you have a new B2B marketing site live in ${country.country}?",
          answer: "The core build sprint is 7–14 days. That includes architecture, copy integration, SEO/GEO technical setup, GA4 custom event tracking, and Cloudflare deployment. You're not waiting 6 weeks for a basic handoff."
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
console.log('Successfully generated src/data/countryData.jsx');
