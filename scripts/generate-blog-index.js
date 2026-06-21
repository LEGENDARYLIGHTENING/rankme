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

const nicheImagePools = {
  saas: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80'
  ],
  realestate: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  ],
  cybersecurity: [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
  ],
  cosmetic: [
    'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80'
  ],
  immigration: [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=800&q=80'
  ],
  manufacturing: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=800&q=80'
  ],
  default: [
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
  ]
};

function normalizeTag(tag) {
  if (!tag) return 'default';
  const lower = tag.toLowerCase();
  if (lower.includes('saas') || lower.includes('tech')) return 'saas';
  if (lower.includes('estate') || lower.includes('real')) return 'realestate';
  if (lower.includes('cyber') || lower.includes('security') || lower.includes('it')) return 'cybersecurity';
  if (lower.includes('clinic') || lower.includes('aesthetic') || lower.includes('cosmetic')) return 'cosmetic';
  if (lower.includes('immigration') || lower.includes('consultant')) return 'immigration';
  if (lower.includes('manufactur') || lower.includes('industrial')) return 'manufacturing';
  return 'default';
}

const blogIndex = files.map((filename, index) => {
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

  const rawTag = data['Niche Tag'] || 'More Niches';
  const tagGroup = normalizeTag(rawTag);
  const pool = nicheImagePools[tagGroup] || nicheImagePools.default;
  const image = pool[index % pool.length];

  // Dynamic alt text filled with metadata and primary keywords
  const primaryKeyword = data['Primary Keyword'] || data.title || 'B2B growth';
  const targetMarket = data['Target Market'] || 'US / UK / Australia';
  const imageAlt = `${primaryKeyword} - High-converting growth marketing and web systems targeting ${targetMarket}`;

  // Extract frontmatter keys mapping to the original Blog.jsx object structure
  return {
    filename,
    title: data['SEO Title'] || data.title || filename.replace('.md', ''),
    tag: rawTag,
    date: data.Date || 'Published recently',
    readTime,
    excerpt: data['Meta Description'] || data.excerpt || content.substring(0, 150).replace(/#/g, '').trim() + '...',
    slug: data.Slug || filename.replace('.md', ''),
    image,
    imageAlt,
    primaryKeyword,
    targetMarket
  };
});

fs.writeFileSync(outputFilePath, JSON.stringify(blogIndex, null, 2));
console.log(`Successfully generated blog index for ${blogIndex.length} posts.`);
