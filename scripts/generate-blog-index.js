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
  
  // Normalize line endings to LF
  const normalizedContent = fileContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  let data = {};
  
  // Split into lines to identify garbage lines at the start
  const lines = normalizedContent.split('\n');
  let startIndex = 0;
  
  while (startIndex < lines.length) {
    const line = lines[startIndex].trim();
    if (
      line === '' ||
      /^#?\s*Blog\s*\d+(\s*of\s*\d+)?/i.test(line) ||
      /^═+$/.test(line) ||
      (line.startsWith('---') && line.length > 5) || // filter line divider like '--------'
      /^[═\-*\s]+$/.test(line) // any lines containing only dashes, equal signs, asterisks, spaces
    ) {
      startIndex++;
    } else {
      break;
    }
  }

  let contentLines = [];
  const hasStrictFencing = lines[startIndex]?.trim() === '---';
  
  if (hasStrictFencing) {
    let closingIndex = -1;
    for (let i = startIndex + 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        closingIndex = i;
        break;
      }
    }
    
    if (closingIndex !== -1) {
      // Mode A: Parse strict frontmatter
      const fmLines = lines.slice(startIndex + 1, closingIndex);
      fmLines.forEach(line => {
        const idx = line.indexOf(':');
        if (idx > 0) {
          const rawKey = line.substring(0, idx).trim();
          const rawValue = line.substring(idx + 1).trim();
          const key = rawKey.replace(/\*/g, '').trim();
          const value = rawValue.replace(/\*/g, '').trim();
          data[key] = value;
          const lowerKey = key.toLowerCase();
          if (lowerKey === 'seo title') data['SEO Title'] = value;
          if (lowerKey === 'meta description') data['Meta Description'] = value;
          if (lowerKey === 'slug') data['Slug'] = value;
          if (lowerKey === 'niche tag') data['Niche Tag'] = value;
        }
      });
      contentLines = lines.slice(closingIndex + 1);
    } else {
      // Opening '---' but no closing '---'. Fallback to Mode B line-by-line parsing
      parseLineByLine(startIndex + 1);
    }
  } else {
    // Mode B: Parse line-by-line starting at startIndex
    parseLineByLine(startIndex);
  }

  function parseLineByLine(startIdx) {
    let i = startIdx;
    const knownKeys = [
      'seo title', 'meta description', 'slug', 'primary keyword', 
      'secondary keywords', 'geo phrase', 'target market', 'niche tag', 'date'
    ];
    
    while (i < lines.length) {
      const line = lines[i].trim();
      if (line === '') {
        i++;
        continue;
      }
      
      // Check if this line is a key: value pair
      const idx = line.indexOf(':');
      if (idx > 0) {
        const rawKey = line.substring(0, idx).trim();
        const rawValue = line.substring(idx + 1).trim();
        const key = rawKey.replace(/\*/g, '').trim();
        const value = rawValue.replace(/\*/g, '').trim();
        const lowerKey = key.toLowerCase();
        
        // If it matches a known key, or it's within the first few lines of Mode B parsing
        if (knownKeys.includes(lowerKey) || (i - startIdx < 15 && /^[A-Za-z][a-zA-Z\s]+$/.test(key))) {
          data[key] = value;
          // Normalized keys
          if (lowerKey === 'seo title') data['SEO Title'] = value;
          if (lowerKey === 'meta description') data['Meta Description'] = value;
          if (lowerKey === 'slug') data['Slug'] = value;
          if (lowerKey === 'niche tag') data['Niche Tag'] = value;
          i++;
          continue;
        }
      }
      
      // If it is not a key: value pair, or it's a heading/prose, we stop the frontmatter block
      break;
    }
    contentLines = lines.slice(i);
  }

  let content = contentLines.join('\n').trim();

  // Search harder for SEO Title in the first 20 lines if not found
  if (!data['SEO Title'] && !data.title) {
    for (let i = 0; i < Math.min(20, lines.length); i++) {
      const line = lines[i].trim();
      const matchTitle = line.match(/^(?:SEO\s+Title|Title)\s*:\s*(.+)$/i);
      if (matchTitle) {
        data['SEO Title'] = matchTitle[1].trim();
        break;
      }
    }
  }

  // Search harder for Meta Description in the first 20 lines if not found
  if (!data['Meta Description'] && !data.excerpt) {
    for (let i = 0; i < Math.min(20, lines.length); i++) {
      const line = lines[i].trim();
      const matchDesc = line.match(/^(?:Meta\s+Description|Description|Excerpt)\s*:\s*(.+)$/i);
      if (matchDesc) {
        data['Meta Description'] = matchDesc[1].trim();
        break;
      }
    }
  }

  // Clean fallback excerpt by stripping leaked generation lines
  let cleanExcerpt = data['Meta Description'] || data.excerpt;
  if (!cleanExcerpt) {
    const cleanContentText = content
      .split('\n')
      .filter(line => {
        const l = line.trim();
        return l !== '' &&
               !/^#?\s*Blog\s*\d+/i.test(l) &&
               !/^[═\-*\s]+$/.test(l) &&
               !/^(SEO Title|Meta Description|Slug|Primary Keyword|Secondary Keywords|GEO Phrase|Target Market|Niche Tag|Date)/i.test(l);
      })
      .join(' ');
    cleanExcerpt = cleanContentText.substring(0, 150).trim();
    if (cleanExcerpt.length > 0) {
      cleanExcerpt += '...';
    } else {
      cleanExcerpt = 'Click to read full post...';
    }
  }

  // Clean title from fallback filename
  const rawTitle = data['SEO Title'] || data.title;
  const isTitleParsed = rawTitle && !/^blog_\d+$/i.test(rawTitle);
  const title = isTitleParsed ? rawTitle : filename.replace('.md', '');

  // Estimate read time (assuming ~200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) + ' min read';

  const rawTag = data['Niche Tag'] || 'More Niches';
  const tagGroup = normalizeTag(rawTag);
  const pool = nicheImagePools[tagGroup] || nicheImagePools.default;
  const image = pool[index % pool.length];

  // Dynamic alt text filled with metadata and primary keywords
  const primaryKeyword = data['Primary Keyword'] || title;
  const targetMarket = data['Target Market'] || 'US / UK / Australia';
  const imageAlt = `${primaryKeyword} - High-converting growth marketing and web systems targeting ${targetMarket}`;

  return {
    filename,
    title,
    tag: rawTag,
    date: data.Date || 'Published recently',
    readTime,
    excerpt: cleanExcerpt,
    slug: data.Slug || data.slug || filename.replace('.md', ''),
    image,
    imageAlt,
    primaryKeyword,
    targetMarket
  };
});

fs.writeFileSync(outputFilePath, JSON.stringify(blogIndex, null, 2));
console.log(`Successfully generated blog index for ${blogIndex.length} posts.`);
