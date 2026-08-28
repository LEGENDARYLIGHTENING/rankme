import fs from 'fs';
import path from 'path';

const blogIndexFile = path.join(process.cwd(), 'src/data/blogs-index.json');
const blogs = JSON.parse(fs.readFileSync(blogIndexFile, 'utf-8'));

const linkedinPath = path.join(process.cwd(), 'promotions', 'linkedin_articles.md');
const mediumPath = path.join(process.cwd(), 'promotions', 'medium_stories.md');

function clean(text) {
  if (!text) return '';
  return text.replace(/—/g, '-').replace(/–/g, '-');
}

let linkedinContent = '# LinkedIn Articles (Full Posts)\n\n';
let mediumContent = '# Medium Stories (Full Posts)\n\n';

blogs.forEach((blog, index) => {
  const url = `https://rankursite.com/blog/${blog.slug}`;
  const title = clean(blog.title);
  const excerpt = clean(blog.excerpt);
  const niche = clean(blog.tag);
  
  // Try to read the actual blog content
  const blogFilePath = path.join(process.cwd(), 'blogs', blog.filename);
  let content = '';
  try {
    const rawContent = fs.readFileSync(blogFilePath, 'utf-8');
    // Strip frontmatter
    let processed = rawContent;
    const headerMatch = processed.match(/^(?:#\s*Blog\s*\d+\s*of\s*\d+\s*)?---\n[\s\S]*?\n---\s*/i);
    if (headerMatch) {
      processed = processed.substring(headerMatch[0].length);
    } else {
       const standardMatch = processed.match(/^---\n[\s\S]*?\n---\s*/);
       if (standardMatch) processed = processed.substring(standardMatch[0].length);
    }
    // Clean H1
    processed = processed.replace(/^\s*#\s+[^\n]+\n+/, '');
    
    // Convert internal/external links to standard markdown links
    processed = processed.replace(/\[Internal link:\s*([^-\]]+)\s*-\s*(?:anchor text:\s*)?([^\]]+)\]/gi, '[$2](https://rankursite.com/services)');
    processed = processed.replace(/\[External link:\s*([^-\]]+)\s*-\s*([^\]]+)\]/gi, '[$2](https://rankursite.com/blog)');
    
    // Clean em dashes
    content = clean(processed);
  } catch (e) {
    content = excerpt;
  }

  linkedinContent += `=================================================\n`;
  linkedinContent += `LINKEDIN ARTICLE ${index + 1}: ${title}\n`;
  linkedinContent += `=================================================\n\n`;
  linkedinContent += `# ${title}\n\n`;
  linkedinContent += `${content}\n\n`;
  linkedinContent += `*Originally published at [Rankur](${url}).*\n\n\n\n`;

  mediumContent += `=================================================\n`;
  mediumContent += `MEDIUM STORY ${index + 1}: ${title}\n`;
  mediumContent += `=================================================\n\n`;
  mediumContent += `# ${title}\n\n`;
  mediumContent += `${content}\n\n`;
  mediumContent += `*Originally published at [Rankur](${url}).*\n\n\n\n`;
});

fs.writeFileSync(linkedinPath, linkedinContent);
fs.writeFileSync(mediumPath, mediumContent);

console.log('Full articles generated successfully.');
