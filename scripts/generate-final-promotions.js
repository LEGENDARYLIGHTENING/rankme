import fs from 'fs';
import path from 'path';

const blogIndexFile = path.join(process.cwd(), 'src/data/blogs-index.json');
const blogs = JSON.parse(fs.readFileSync(blogIndexFile, 'utf-8'));

const linkedinPath = path.join(process.cwd(), 'promotions', 'linkedin_posts_for_all_blogs.md');
const mediumPath = path.join(process.cwd(), 'promotions', 'medium_posts_for_all_blogs.md');
const imagePath = path.join(process.cwd(), 'promotions', 'image_generation_prompts_for_all_blogs.md');

// Hand-crafted "Nightmare Stories" based on the specific tags
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
    "The marketing team celebrated a 200% increase in website traffic. The sales team complained about a 0% increase in qualified pipeline. The disconnect? The website was capturing top-of-funnel vanity traffic but lacked the programmatic conversion architecture required to qualify and capture enterprise buyers."
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

const teachings = [
  "💡 The Liability of Legacy Tech\nMonolithic platforms like WordPress were revolutionary ten years ago. Today, relying on a heavy PHP architecture with bolted-on plugins actively destroys your pipeline by failing Core Web Vitals.",
  "💡 Generative Engine Optimization (GEO)\nLLMs do not care about keyword density. They care about factual density and structural clarity. If your site lacks JSON-LD Entity Graph schemas, you are mathematically invisible to AI search.",
  "💡 Programmatic Scalability\nHigh-growth companies don't write landing pages one by one. They use Next.js to programmatically generate hundreds of hyper-targeted, localized pages that load in milliseconds, capturing long-tail commercial intent at scale.",
  "💡 The 3-Second Procurement Filter\nCorporate buyers evaluate your operational maturity based on your digital infrastructure. If your site takes more than 3 seconds to render, the cognitive dissonance destroys trust before they even read your headline.",
  "💡 Frictionless Conversion Architecture\nA high-converting B2B website is an engineering project, not an art project. By aligning the exact search intent with a blazingly fast front-end, bounce rates plummet and qualified RFQs surge.",
  "💡 Headless vs Monolithic CMS\nBy migrating to a decoupled React architecture, the HTML is pre-rendered at build time and served via global Edge networks. The database is detached from the front end, reducing the security risk to zero."
];

const imagePrompts = {
  'SaaS & Tech Startups': "A sleek, futuristic dashboard on a glass screen, modern B2B SaaS interface, glowing data visualizations, dark mode, cinematic lighting, 8k resolution, --ar 16:9",
  'B2B Manufacturers & Exporters': "A highly cinematic, photorealistic image of a modern, high-tech industrial manufacturing facility, clean aesthetic, neon blue lighting, robotic arms, 8k resolution, hyper-detailed --ar 16:9",
  'Lead Generation': "A conceptual image of a glowing digital funnel capturing data points, cybernetic aesthetic, modern B2B marketing, neon blue and purple, 8k resolution, cinematic lighting --ar 16:9",
  'Organic Lead Generation': "A conceptual image of a glowing digital funnel capturing data points, cybernetic aesthetic, modern B2B marketing, neon blue and purple, 8k resolution, cinematic lighting --ar 16:9",
  'SEO+GEO': "A futuristic glowing artificial intelligence brain connected to a global network of servers, representing generative engine optimization, cyberpunk aesthetic, high detail --ar 16:9",
  'Website Strategy': "An architectural blueprint of a modern website interface transforming into a physical high-tech building, conceptual B2B web design, hyper-realistic, 8k --ar 16:9",
  'Nutraceuticals and Wellness Brands': "A macro shot of glowing, translucent vitamin capsules inside a high-tech cleanroom laboratory, clinical aesthetic, bright lighting, photorealistic --ar 16:9",
  'nutraceuticals and wellness brands': "A macro shot of glowing, translucent vitamin capsules inside a high-tech cleanroom laboratory, clinical aesthetic, bright lighting, photorealistic --ar 16:9",
  'default': "A cinematic shot of a modern, minimalist corporate boardroom with holographic data screens, high-tech B2B environment, dark mode aesthetic, 8k resolution --ar 16:9"
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clean(text) {
  if (!text) return '';
  return text.replace(/—/g, '-').replace(/–/g, '-');
}

let linkedinContent = `# LinkedIn Posts (All 120 Blogs)\n\n`;
let mediumContent = `# Medium Posts (All 120 Blogs)\n\n`;
let imageContent = `# Image Generation Prompts (Midjourney / DALL-E) for All 120 Blogs\n\n`;

blogs.forEach((blog, index) => {
  const title = clean(blog.title);
  const excerpt = clean(blog.excerpt);
  const rawTag = blog.tag || 'default';
  const url = `https://rankursite.com/blog/${blog.slug}`;
  
  // ==========================================
  // LINKEDIN GENERATION
  // ==========================================
  let storyArray = stories[rawTag] || stories['default'];
  const story = getRandom(storyArray);
  const teach1 = getRandom(teachings);
  let teach2 = getRandom(teachings);
  while (teach2 === teach1) teach2 = getRandom(teachings);

  linkedinContent += `=================================================\n`;
  linkedinContent += `POST ${index + 1}: ${title}\n`;
  linkedinContent += `=================================================\n\n`;
  linkedinContent += `${story}\n\n`;
  linkedinContent += `If you are building a B2B growth engine and relying on outdated strategies, this is the conversation worth having. The reality is stark: ${excerpt}\n\n`;
  linkedinContent += `Here is the technical reality B2B founders need to know:\n\n`;
  linkedinContent += `${teach1}\n\n`;
  linkedinContent += `${teach2}\n\n`;
  linkedinContent += `👇 Read our complete technical breakdown on "${title}" here:\n`;
  linkedinContent += `${url}?utm_source=linkedin&utm_medium=social\n\n`;
  const safeTag = rawTag.replace(/[^a-zA-Z0-9]/g, '');
  linkedinContent += `#B2BGrowth #LeadGeneration #TechnicalSEO #SaaSFounders #${safeTag}\n\n\n`;

  // ==========================================
  // MEDIUM GENERATION
  // ==========================================
  const blogFilePath = path.join(process.cwd(), 'blogs', blog.filename);
  let blogBody = excerpt;
  try {
    const rawContent = fs.readFileSync(blogFilePath, 'utf-8');
    let processed = rawContent;
    const headerMatch = processed.match(/^(?:#\s*Blog\s*\d+\s*of\s*\d+\s*)?---\n[\s\S]*?\n---\s*/i) || processed.match(/^---\n[\s\S]*?\n---\s*/);
    if (headerMatch) processed = processed.substring(headerMatch[0].length);
    processed = processed.replace(/^\s*#\s+[^\n]+\n+/, '');
    processed = processed.replace(/\[Internal link:\s*([^-\]]+)\s*-\s*(?:anchor text:\s*)?([^\]]+)\]/gi, '[$2](https://rankursite.com/services)');
    processed = processed.replace(/\[External link:\s*([^-\]]+)\s*-\s*([^\]]+)\]/gi, '[$2](https://rankursite.com/blog)');
    blogBody = clean(processed);
  } catch (e) {}

  mediumContent += `=================================================\n`;
  mediumContent += `MEDIUM POST ${index + 1}: ${title}\n`;
  mediumContent += `=================================================\n\n`;
  mediumContent += `# ${title}\n\n`;
  mediumContent += `${blogBody}\n\n`;
  mediumContent += `*Originally published at [Rankur](${url}).*\n\n\n\n`;

  // ==========================================
  // IMAGE PROMPT GENERATION
  // ==========================================
  let imgPrompt = imagePrompts[rawTag] || imagePrompts['default'];
  imageContent += `### Blog ${index + 1}: ${title}\n`;
  imageContent += `**Tag/Category:** ${rawTag}\n`;
  imageContent += `**Prompt:**\n\`\`\`\n${imgPrompt}\n\`\`\`\n\n`;
});

fs.writeFileSync(linkedinPath, linkedinContent);
fs.writeFileSync(mediumPath, mediumContent);
fs.writeFileSync(imagePath, imageContent);

console.log('Successfully generated the 3 requested files.');
