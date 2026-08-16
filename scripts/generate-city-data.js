import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const citiesPath = path.join(__dirname, '../cities.json');
const outPath = path.join(__dirname, '../src/data/cityData.jsx');

const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));

let out = `export const cityData = {\n`;

cities.forEach((city, index) => {
  out += `  "${city.slug}": {
    path: '/${city.slug}',
    props: {
      seoTitle: "${city.primaryKeyword} | Rankur",
      seoDesc: ${JSON.stringify(city.localEcosystemIntro + " Rankur builds B2B digital infrastructure to solve exactly this.")},
      niche: "${city.city} B2B",
      heroTitle: <>B2B Web Design & Growth Consultant in <span className="text-gold">${city.city}</span></>,
      heroSubtitle: ${JSON.stringify(city.localEcosystemIntro)},
      problemText: [
        ${JSON.stringify(city.localPainPoint)},
        "Many local companies list features instead of solving pain points. They lack proper SEO architecture to capture high-intent search traffic.",
        "The result? High bounce rates, expensive CPLs, and an empty sales pipeline."
      ],
      solutions: [
        {
          icon: '⟨/⟩',
          title: 'Conversion-Focused Architecture',
          desc: 'Clear pathways from feature pages to demo requests, optimized for reducing friction and increasing MQLs for ${city.city} enterprises.'
        },
        {
          icon: '◎',
          title: 'High-Intent SEO',
          desc: 'Targeting bottom-of-funnel keywords to capture local and national enterprise buyers ready to switch.'
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
          question: "Why do ${city.city} B2B companies need specialized web architecture?",
          answer: ${JSON.stringify(city.localEcosystemIntro + " This makes enterprise-grade performance non-negotiable.")}
        },
        {
          question: "How quickly can you have a new B2B marketing site live in ${city.city}?",
          answer: "The core build sprint is 7–14 days. That includes architecture, copy integration, SEO/GEO technical setup, GA4 custom event tracking, and Cloudflare deployment. You're not waiting 6 weeks for a basic handoff."
        },
        {
          question: "Will this help us rank locally in ${city.city} and nationally?",
          answer: "Yes. We build programmatic SEO structures and Generative Engine Optimization (GEO) that help you capture high-intent buyers searching in ${city.city}, as well as across broader national and international queries."
        }
      ]
    }
  }${index < cities.length - 1 ? ',' : ''}\n`;
});

out += `};\n`;

fs.writeFileSync(outPath, out, 'utf8');
console.log('Successfully generated src/data/cityData.jsx');
