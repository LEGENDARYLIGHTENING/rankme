import fs from 'fs';
import path from 'path';

const blogIndexFile = path.join(process.cwd(), 'src/data/blogs-index.json');
const blogs = JSON.parse(fs.readFileSync(blogIndexFile, 'utf-8'));

const linkedinPath = '/Users/mokshparjapati/.gemini/antigravity-ide/brain/d5db4300-454f-4867-b891-98dbf654e540/linkedin_backlinks.md';
const mediumPath = '/Users/mokshparjapati/.gemini/antigravity-ide/brain/d5db4300-454f-4867-b891-98dbf654e540/medium_backlinks.md';

let linkedinContent = '# Complete LinkedIn Backlinks for All 120 Blogs\n\n';
linkedinContent += '*Note: All em dashes have been completely removed from this file.*\n\n';

let mediumContent = '# Complete Medium Syndication Links for All 120 Blogs\n\n';
mediumContent += '*Note: All em dashes have been completely removed from this file.*\n\n';
mediumContent += 'To safely syndicate these posts without triggering duplicate content penalties, use Medium\'s "Import a story" feature and paste the URL. Medium will automatically add the canonical tag.\n\n';

blogs.forEach((blog, index) => {
  const url = `https://rankursite.com/blog/${blog.slug}`;
  let title = blog.title.replace(/-/g, ', ').replace(/-/g, ' ');
  let excerpt = blog.excerpt.replace(/-/g, ', ').replace(/-/g, ' ');
  let niche = blog.tag.replace(/-/g, ', ').replace(/-/g, ' ');

  linkedinContent += `## Post ${index + 1}: ${title}\n\n`;
  linkedinContent += `**The Hook:** Are you struggling with growth in the ${niche} space?\n\n`;
  linkedinContent += `**The Body:**\nMost B2B companies are bleeding pipeline because their digital architecture is outdated. Procurement teams do their research in the shadows, and if your website is slow or lacks programmatic SEO, you are losing deals to competitors who are optimized for both Google and ChatGPT.\n\n`;
  linkedinContent += `We just published a deep dive on this exact topic: ${title}. ${excerpt}\n\n`;
  linkedinContent += `If you want to stop treating your website like a digital brochure and start treating it like a high speed conversion engine, this is mandatory reading.\n\n`;
  linkedinContent += `**The CTA:**\nRead the full technical teardown here: ${url}\n\n`;
  linkedinContent += `**Hashtags:** #B2BGrowth #SEO #Nextjs #${niche.replace(/\s+/g, '')}\n\n---\n\n`;

  mediumContent += `## ${index + 1}. ${title}\n`;
  mediumContent += `**URL to Import:** ${url}\n\n`;
});

fs.writeFileSync(linkedinPath, linkedinContent);
fs.writeFileSync(mediumPath, mediumContent);

console.log('Successfully generated LinkedIn and Medium content for ' + blogs.length + ' blogs.');
