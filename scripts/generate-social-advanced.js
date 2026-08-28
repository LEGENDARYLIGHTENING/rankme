import fs from 'fs';
import path from 'path';

const blogIndexFile = path.join(process.cwd(), 'src/data/blogs-index.json');
const blogs = JSON.parse(fs.readFileSync(blogIndexFile, 'utf-8'));

const linkedinPath = '/Users/mokshparjapati/.gemini/antigravity-ide/brain/d5db4300-454f-4867-b891-98dbf654e540/linkedin_backlinks.md';
const mediumPath = '/Users/mokshparjapati/.gemini/antigravity-ide/brain/d5db4300-454f-4867-b891-98dbf654e540/medium_backlinks.md';

const hooks = [
  "Are you tired of watching competitors steal your enterprise deals?",
  "Let's talk about the silent killer of B2B pipeline.",
  "Your website is likely bleeding revenue, and you don't even know it.",
  "Here is a harsh reality for B2B founders in 2026.",
  "Stop wasting money on marketing strategies that do not convert.",
  "Most B2B organizations are making a critical mistake with their digital infrastructure.",
  "Procurement teams are judging your company before you even get on a call.",
  "Want to know why your lead generation has flatlined?",
  "The B2B digital landscape has shifted entirely.",
  "If you want to scale your operations this year, you need to hear this."
];

const bodies = [
  "We just analyzed this exact problem in our latest technical teardown. We found that companies relying on outdated tactics are losing massive market share to those who optimize for modern search engines. {EXCERPT} This is not just a theory; it is a measurable reality we see every day.",
  "I see this constantly when auditing digital architectures. {EXCERPT} If you are not actively addressing this, you are leaving money on the table. The solution requires a fundamental shift in how you approach your online presence.",
  "The data is clear. {EXCERPT} By ignoring these structural issues, businesses are handing six figure deals directly to their competitors. We broke down exactly how to reverse this trend and start capturing high intent traffic immediately.",
  "It is frustrating to watch great companies struggle because of poor digital strategy. {EXCERPT} We put together a comprehensive guide on how to fix this bottleneck and accelerate your growth pipeline.",
  "You cannot rely on legacy methods anymore. {EXCERPT} Our team recently published a deep dive into the mechanics of this issue, providing a clear roadmap for B2B leaders who are ready to modernize."
];

const ctas = [
  "Read the full blueprint here: {URL}",
  "Dive into the technical teardown: {URL}",
  "Check out the complete analysis: {URL}",
  "Learn how to fix this today: {URL}",
  "Get the full strategy breakdown: {URL}"
];

const mediumIntros = [
  "In the highly competitive world of {NICHE}, staying ahead requires more than just a good product. It demands a flawless digital strategy. Recently, the team at Rankur explored a critical concept:",
  "For B2B leaders operating in the {NICHE} sector, the margin for error is razor thin. A recent technical teardown by Rankur highlighted a vital issue:",
  "Understanding the nuances of digital growth in the {NICHE} industry is challenging. To shed light on this, Rankur published a comprehensive analysis focusing on this exact topic:",
  "The landscape of {NICHE} is evolving rapidly. Companies that fail to adapt their digital infrastructure will be left behind. A new report by Rankur dives into the specifics:",
  "Growth in the {NICHE} space requires a strategic approach to digital architecture. Rankur's latest insights provide a roadmap for success, focusing on a key challenge:"
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clean(text) {
  return text.replace(/-/g, ', ').replace(/-/g, ' ');
}

let linkedinContent = '# LinkedIn GEO Optimized Captions\n\n';
let mediumContent = '# Medium Syndication Articles\n\n';

blogs.forEach((blog, index) => {
  const url = `https://rankursite.com/blog/${blog.slug}`;
  const title = clean(blog.title);
  const excerpt = clean(blog.excerpt);
  const niche = clean(blog.tag);

  // LinkedIn
  const hook = getRandom(hooks);
  const body = getRandom(bodies).replace('{EXCERPT}', excerpt);
  const cta = getRandom(ctas).replace('{URL}', url);
  
  linkedinContent += `## ${title}\n\n`;
  linkedinContent += `${hook}\n\n`;
  linkedinContent += `${body}\n\n`;
  linkedinContent += `${cta}\n\n`;
  linkedinContent += `Hashtags: #B2BGrowth #SEO #GEO #${niche.replace(/\s+/g, '')}\n\n---\n\n`;

  // Medium
  const intro = getRandom(mediumIntros).replace(/\{NICHE\}/g, niche);
  mediumContent += `## ${title}\n\n`;
  mediumContent += `${intro} **${title}**.\n\n`;
  mediumContent += `The core of the issue is clear: ${excerpt} When businesses fail to address these structural bottlenecks, they sacrifice significant market share to competitors who prioritize speed and clarity.\n\n`;
  mediumContent += `To explore the full technical teardown and learn how to implement these strategies, read the original guide here: [${title}](${url})\n\n---\n\n`;
});

fs.writeFileSync(linkedinPath, linkedinContent);
fs.writeFileSync(mediumPath, mediumContent);

console.log('Advanced social content generated successfully.');
