import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsDir = path.join(__dirname, '../blogs');
const outputFilePath = path.join(__dirname, '../src/data/blogs-index.json');

// Ensure data dir exists
const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let files = [];
try {
  files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.md'));
} catch (error) {
  console.warn(`[Warning] Could not read blogs directory at ${blogsDir}`);
}

const blogIndex = files.map(filename => {
  const filePath = path.join(blogsDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  let data = {};
  let content = fileContent;

  const match = fileContent.match(/^---\n([\s\S]*?)\n---/);
  if (match) {
    const frontmatter = match[1];
    content = fileContent.substring(match[0].length);
    frontmatter.split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx > 0) {
        const key = line.substring(0, idx).trim();
        const value = line.substring(idx + 1).trim();
        data[key] = value;
      }
    });
  }

  // Estimate read time (assuming ~200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) + ' min read';

  // Extract frontmatter keys mapping to the original Blog.jsx object structure
  return {
    filename,
    title: data['SEO Title'] || data.title || filename.replace('.md', ''),
    tag: data['Niche Tag'] || 'More Niches',
    date: data.Date || 'Published recently',
    readTime,
    excerpt: data['Meta Description'] || data.excerpt || content.substring(0, 150).replace(/#/g, '').trim() + '...',
    slug: data.Slug || filename.replace('.md', ''),
  };
});

fs.writeFileSync(outputFilePath, JSON.stringify(blogIndex, null, 2));
console.log(`Successfully generated blog index for ${blogIndex.length} posts.`);
