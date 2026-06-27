import fs from 'fs';
import path from 'path';

const blogsDir = path.join(process.cwd(), 'blogs');
const files = fs.readdirSync(blogsDir).filter(f => f.includes('_new.md'));

files.forEach(file => {
  const filePath = path.join(blogsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.startsWith('---')) {
    // It's the standard YAML format we generated. We need to convert it to the old format.
    const parts = content.split('---');
    if (parts.length >= 3) {
      const frontmatter = parts[1];
      const body = parts.slice(2).join('---');
      
      let title = '';
      let excerpt = '';
      let slug = '';
      let tag = '';
      
      frontmatter.split('\n').forEach(line => {
        if (line.startsWith('title:')) title = line.replace('title:', '').replace(/"/g, '').trim();
        if (line.startsWith('excerpt:')) excerpt = line.replace('excerpt:', '').replace(/"/g, '').trim();
        if (line.startsWith('slug:')) slug = line.replace('slug:', '').replace(/"/g, '').trim();
        if (line.startsWith('tag:')) tag = line.replace('tag:', '').replace(/"/g, '').trim();
      });
      
      const newFrontmatter = `---
SEO Title: ${title}
Meta Description: ${excerpt}
Slug: ${slug}
Primary Keyword: ${title}
Secondary Keywords: B2B Growth, Enterprise SEO, Lead Generation
GEO Phrase: How to optimize ${title}?
Target Market: US / UK / Global
Niche Tag: ${tag}
---`;
      
      fs.writeFileSync(filePath, newFrontmatter + body);
    }
  }
});
console.log('Frontmatter format aligned for ' + files.length + ' new blogs.');
