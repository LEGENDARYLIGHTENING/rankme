import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const citiesPath = path.join(__dirname, '../cities.json');
const keywordsPath = path.join(__dirname, '../src/data/cityKeywords.json');
const blogsIndexPath = path.join(__dirname, '../src/data/blogs-index.json');
const outPath = path.join(__dirname, '../src/data/cityData.jsx');

const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
const cityKeywords = fs.existsSync(keywordsPath)
  ? JSON.parse(fs.readFileSync(keywordsPath, 'utf8'))
  : {};

const blogsIndex = fs.existsSync(blogsIndexPath)
  ? JSON.parse(fs.readFileSync(blogsIndexPath, 'utf8'))
  : [];

// Escape a plain string for safe embedding inside generated JSX text.
const esc = (s) => JSON.stringify(String(s));

function buildFaqs(cityName, sector) {
  const sectorLabel = sector || 'B2B';
  return [
    {
      question: `How much does a B2B website cost in ${cityName}?`,
      answer: `Every project is quoted on scope, and you get one fixed price up front - no hourly billing and no surprise invoices. Book a free audit and I'll send a clear quote for your ${cityName} site within a day.`
    },
    {
      question: `How long does it take to build and launch?`,
      answer: `Most ${cityName} B2B sites go live in about 7 days, with larger builds taking 7-14. You see progress the whole way through - it's not a black box.`
    },
    {
      question: `Will the new site actually rank on Google?`,
      answer: `That's the point of it. I build on a fast, clean technical foundation and target the exact searches your ${cityName} buyers use, so you show up when they're looking - not just look nice.`
    },
    {
      question: `Do you handle SEO and lead generation, or just design?`,
      answer: `Both. The design, the search setup, and the lead capture are one job. A site nobody finds and nobody contacts isn't worth building.`
    },
    {
      question: `Have you worked with ${sectorLabel} companies?`,
      answer: `Yes. ${sectorLabel.charAt(0).toUpperCase() + sectorLabel.slice(1)} is one of the strongest B2B sectors in ${cityName}, and I build sites that speak to how those buyers actually evaluate vendors - clear, credible, and fast.`
    },
    {
      question: `What if I'm not happy with the result?`,
      answer: `Every build is backed by a 100% money-back guarantee. If it isn't right, you don't pay - that's how confident I am in the work.`
    },
    {
      question: `Can the site help me get found in ChatGPT and Perplexity?`,
      answer: `Yes. I structure your content and data so AI search engines can read and cite it, which is fast becoming how B2B buyers research vendors before they ever click.`
    }
  ];
}

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

  const sector = (cityKeywords[city.slug] && cityKeywords[city.slug].primarySector) || 'B2B';

  const metaDesc = `B2B web design in ${city.city} that ranks on Google and turns visitors into leads. Custom-built, live in ~7 days, 100% money-back guarantee.`;
  const seoTitle = `B2B Web Design in ${city.city} | Rankur`;
  const heroSubtitle = `You run a B2B company in ${city.city}, and your website should be bringing in leads - not just sitting there. I build fast, modern sites that rank on Google and turn visitors into real sales conversations. Most go live in about 7 days.`;
  const problemOpener = `If your website looks outdated, doesn't show up on Google, or just isn't bringing in leads, you're not alone - most ${city.city} B2B sites have the same three problems.`;

  const faqs = buildFaqs(city.city, sector);

  // Allocate 4 distinct blogs to this city from blogsIndex
  let featuredBlogs = [];
  if (blogsIndex.length > 0) {
    const startIndex = (index * 4) % blogsIndex.length;
    for (let i = 0; i < 4; i++) {
      const b = blogsIndex[(startIndex + i) % blogsIndex.length];
      featuredBlogs.push({
        title: b.title,
        slug: b.slug,
        category: b.tag || 'B2B Growth',
        description: b.excerpt || ''
      });
    }
  }

  out += `  "${city.slug}": {
    path: '/${city.slug}',
    props: {
      seoTitle: ${esc(seoTitle)},
      seoDesc: ${esc(metaDesc)},
      niche: "${city.city} B2B",
      sector: ${esc(sector)},
      heroTitle: <>B2B Web Design &amp; Growth Consultant in <span className="text-gold">${city.city}</span></>,
      heroSubtitle: ${esc(heroSubtitle)},
      marketContext: ${esc(city.localEcosystemIntro)},
      problemText: [
        ${esc(problemOpener)},
        ${esc(city.localPainPoint)},
        "So visitors leave, ads cost more than they should, and the sales pipeline stays empty. It doesn't have to be that way."
      ],
      solutions: ${city.localSolutions ? JSON.stringify(city.localSolutions) : JSON.stringify(solutions)},
      marketOpportunity: ${city.marketOpportunity ? esc(city.marketOpportunity) : "null"},
      competitiveLandscape: ${city.competitiveLandscape ? esc(city.competitiveLandscape) : "null"},
      proofText: ${esc(`I build custom websites and lead systems for B2B founders in ${city.city} and beyond.`)},
      faqs: ${JSON.stringify(faqs)},
      featuredBlogs: ${JSON.stringify(featuredBlogs)}
    }
  }${index < cities.length - 1 ? ',' : ''}\n`;
});

out += `};\n`;

fs.writeFileSync(outPath, out, 'utf8');
console.log('Successfully updated src/data/cityData.jsx with allocated blog posts per city.');
