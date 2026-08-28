import fs from 'fs';
import path from 'path';

const blogIndexFile = path.join(process.cwd(), 'src/data/blogs-index.json');
const blogs = JSON.parse(fs.readFileSync(blogIndexFile, 'utf-8'));
const outputPath = path.join(process.cwd(), 'promotions', 'ALL_120_STORY_TEACH_SELL_POSTS.md');

// Deep, highly specific hooks categorized by actual tags
const stories = {
  'SaaS & Tech Startups': [
    "An enterprise SaaS company in Austin had the perfect product. They spent $30,000 on a visually stunning website redesign. Six months later, they hadn't generated a single organic lead. Why? Because when procurement teams asked ChatGPT and Perplexity for recommendations, their brand was mathematically invisible.",
    "The 7-figure SaaS contract was 90% closed. Then the client's procurement team ran a technical audit on the vendor's website. It took 6 seconds to load and lacked basic JSON-LD schema markup. The deal was quietly handed to a competitor with a faster, verifiable digital infrastructure.",
    "A Series A tech startup published 50 blog posts in three months. Their Google traffic barely moved. The problem wasn't their writing; it was their architecture. Their monolithic CMS was so slow and bloated that search engine crawlers were abandoning the site before indexing the content."
  ],
  'B2B Manufacturers & Exporters': [
    "A B2B manufacturer spent eight months migrating to a new e-commerce platform. They launched on a Tuesday. By Friday, their inbound RFQs had dropped by 80%. The agency had failed to implement a 301 redirect map, instantly destroying four years of accumulated search authority.",
    "The factory owner was frustrated. Their website had 10,000 monthly visitors but only three form fills. When we ran a friction analysis, the problem was obvious: the site was a passive digital brochure. It forced buyers to read walls of corporate fluff instead of providing immediate, structured answers about tolerances and certifications.",
    "An industrial engineering firm couldn't figure out why their 'Request a Quote' form was empty. We tore down their UX and found they were asking for 12 fields of information before establishing any technical authority. They were demanding marriage before the first date."
  ],
  'Lead Generation': [
    "The marketing team celebrated a 200% increase in website traffic. The sales team complained about a 0% increase in qualified pipeline. The disconnect? The website was capturing top-of-funnel vanity traffic but lacked the programmatic conversion architecture required to qualify and capture enterprise buyers.",
    "A B2B service provider was spending $10,000 a month on LinkedIn ads. The click-through rate was excellent, but the bounce rate on their landing page was 92%. The culprit was a 4.5-second load time. In B2B procurement, a slow website is a signal of operational incompetence."
  ],
  'Organic Lead Generation': [
    "The marketing team celebrated a 200% increase in website traffic. The sales team complained about a 0% increase in qualified pipeline. The disconnect? The website was capturing top-of-funnel vanity traffic but lacked the programmatic conversion architecture required to qualify and capture enterprise buyers.",
    "A B2B service provider was spending $10,000 a month on LinkedIn ads. The click-through rate was excellent, but the bounce rate on their landing page was 92%. The culprit was a 4.5-second load time. In B2B procurement, a slow website is a signal of operational incompetence."
  ],
  'SEO+GEO': [
    "A tech firm was losing market share to a competitor half their size. The difference wasn't the product. The competitor had deployed a decoupled React architecture with hyper-localized landing pages, capturing high-intent regional traffic while the tech firm relied on a single, generic homepage.",
    "An enterprise client is looking for logistics software. They don't open Google. They open ChatGPT or Perplexity and type: 'Compare the top 3 logistics software providers in the US.' Your competitor is listed as the number one recommendation. Your company isn't mentioned at all."
  ],
  'Website Strategy': [
    "A tech startup spent six months and $30,000 redesigning their website. They launched on a Tuesday. By Friday, their organic traffic had dropped by 80%, and their inbound leads stopped entirely. The agency had deleted old URLs without setting up 301 redirects, wiping out four years of accumulated SEO authority overnight.",
    "A mid-sized manufacturing firm was struggling to rank their localized service pages. Their agency kept telling them to write more blogs. But when we audited their infrastructure, the problem wasn't content. It was their CMS."
  ],
  'Nutraceuticals and Wellness Brands': [
    "A wellness brand sourced a fantastic gummy formulation from an overseas manufacturer. The first shipment cleared customs. The second was seized by the FDA. The manufacturer had let their facility registration lapse, costing the brand their launch window and thousands in destroyed inventory.",
    "An international distributor wanted to bring a high-dose supplement into the GCC market. The product was vegan and clean-label, but it lacked accredited Halal certification for the specific gelling agent. The entire shipment was rejected at the port."
  ],
  'nutraceuticals and wellness brands': [
    "A wellness brand sourced a fantastic gummy formulation from an overseas manufacturer. The first shipment cleared customs. The second was seized by the FDA. The manufacturer had let their facility registration lapse, costing the brand their launch window and thousands in destroyed inventory."
  ],
  'default': [
    "A founder recently showed me two quotes for their digital infrastructure. One was $3,000, the other was $40,000. They asked who was lying. Neither were. One was selling a passive brochure; the other was selling a programmatic lead generation engine.",
    "The company spent a year building their brand identity. But when enterprise buyers searched for their core capabilities, they didn't show up. Their digital presence was built on legacy technology that modern search algorithms actively penalize."
  ]
};

// Hand-crafted Technical Value Drops
const teachings = [
  "💡 The Liability of Legacy Tech\nMonolithic platforms like WordPress were revolutionary ten years ago. Today, relying on a heavy PHP architecture with bolted-on plugins actively destroys your pipeline by failing Core Web Vitals.",
  "💡 Generative Engine Optimization (GEO)\nLLMs do not care about keyword density. They care about factual density and structural clarity. If your site lacks JSON-LD Entity Graph schemas, you are mathematically invisible to AI search.",
  "💡 Programmatic Scalability\nHigh-growth companies don't write landing pages one by one. They use Next.js to programmatically generate hundreds of hyper-targeted, localized pages that load in milliseconds, capturing long-tail commercial intent at scale.",
  "💡 The 3-Second Procurement Filter\nCorporate buyers evaluate your operational maturity based on your digital infrastructure. If your site takes more than 3 seconds to render, the cognitive dissonance destroys trust before they even read your headline.",
  "💡 Frictionless Conversion Architecture\nA high-converting B2B website is an engineering project, not an art project. By aligning the exact search intent with a blazingly fast front-end, bounce rates plummet and qualified RFQs surge.",
  "💡 Headless vs Monolithic CMS\nBy migrating to a decoupled React architecture, the HTML is pre-rendered at build time and served via global Edge networks. The database is detached from the front end, reducing the security risk to zero."
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clean(text) {
  if (!text) return '';
  return text.replace(/—/g, '-').replace(/–/g, '-');
}

let content = `# Complete Story-Teach-Sell Campaign (120 Posts)\n`;
content += `> This file uses the exact "Story-Teach-Sell" framework requested, strictly adhering to the Probiota standard. Zero em dashes used.\n\n`;

blogs.forEach((blog, index) => {
  const title = clean(blog.title);
  const excerpt = clean(blog.excerpt);
  const rawTag = blog.tag || 'default';
  
  // Find matching array or fallback
  let storyArray = stories[rawTag];
  if (!storyArray) storyArray = stories['default'];
  
  const story = getRandom(storyArray);
  
  const teach1 = getRandom(teachings);
  let teach2 = getRandom(teachings);
  while (teach2 === teach1) teach2 = getRandom(teachings);

  content += `=================================================\n`;
  content += `POST ${index + 1}: ${title}\n`;
  content += `=================================================\n\n`;
  
  // 1. The Story Hook
  content += `${story}\n\n`;
  
  // 2. The Context Pivot (Using the exact blog excerpt)
  content += `If you are building a B2B growth engine and relying on outdated strategies, this is the conversation worth having. The reality is stark: ${excerpt}\n\n`;
  
  // 3. The Transition Phrase (Exact Probiota match)
  content += `Here is the technical reality B2B founders need to know:\n\n`;
  
  // 4. The Technical Reality (Value Drops)
  content += `${teach1}\n\n`;
  content += `${teach2}\n\n`;
  
  // 5. The Sell / CTA (Exact Probiota match)
  content += `👇 Read our complete technical breakdown on "${title}" here:\n`;
  content += `https://rankursite.com/blog/${blog.slug}?utm_source=linkedin&utm_medium=social\n\n`;
  
  // 6. Hashtags
  const safeTag = rawTag.replace(/[^a-zA-Z0-9]/g, '');
  content += `#B2BGrowth #LeadGeneration #TechnicalSEO #SaaSFounders #${safeTag}\n\n\n`;
});

fs.writeFileSync(outputPath, content);
console.log('Successfully generated 120 Story-Teach-Sell posts.');
