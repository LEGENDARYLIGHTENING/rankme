import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const blogsDir = path.join(rootDir, 'blogs');
const outputFilePath = path.join(rootDir, 'src/data/blogs-index.json');

const dataDir = path.join(rootDir, 'src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let files = [];
try {
  files = fs.readdirSync(blogsDir).filter(file => file.endsWith('.md')).sort();
} catch (err) {
  console.warn(`[Warning] Could not read blogs directory at ${blogsDir}`, err);
}

// Single git log pass for real first-commit & last-modified timestamps (B2)
const gitAddedMap = new Map();
const gitModifiedMap = new Map();
try {
  const revOut = execSync('git log --reverse --diff-filter=A --follow --name-only --format=COMMIT_DATE:%aI -- blogs', {
    cwd: rootDir,
    maxBuffer: 50 * 1024 * 1024,
  }).toString();
  let curDate = null;
  for (const line of revOut.split(/\r?\n/)) {
    if (line.startsWith('COMMIT_DATE:')) curDate = line.slice(12).trim();
    else if (line.startsWith('blogs/') && line.endsWith('.md')) {
      const f = line.slice(6);
      if (!gitAddedMap.has(f)) gitAddedMap.set(f, curDate);
    }
  }

  const modOut = execSync('git log --name-only --format=COMMIT_DATE:%aI -- blogs', {
    cwd: rootDir,
    maxBuffer: 50 * 1024 * 1024,
  }).toString();
  curDate = null;
  for (const line of modOut.split(/\r?\n/)) {
    if (line.startsWith('COMMIT_DATE:')) curDate = line.slice(12).trim();
    else if (line.startsWith('blogs/') && line.endsWith('.md')) {
      const f = line.slice(6);
      if (!gitModifiedMap.has(f)) gitModifiedMap.set(f, curDate);
    }
  }
} catch (e) {
  console.warn('[Warning] Git history lookup partial/unavailable; falling back to frontmatter Date.', e.message);
}

// Canonical taxonomy normalization (B6) + local 1200x630 category images (B5)
const TAXONOMY_MAP = {
  'saas & tech startups': { tag: 'SaaS & Tech Startups', slug: 'saas-tech-startups', image: '/blog-images/hub-saas-tech.webp' },
  'seo+geo': { tag: 'SEO & AI Search', slug: 'seo-ai-search', image: '/blog-images/hub-seo-geo.webp' },
  'seo & ai search': { tag: 'SEO & AI Search', slug: 'seo-ai-search', image: '/blog-images/hub-seo-geo.webp' },
  'b2b manufacturers & exporters': { tag: 'B2B Manufacturers & Exporters', slug: 'b2b-manufacturers-exporters', image: '/blog-images/hub-manufacturing.webp' },
  'nutraceuticals and wellness brands': { tag: 'Nutraceuticals & Wellness Brands', slug: 'nutraceuticals-wellness-brands', image: '/blog-images/hub-nutraceuticals.webp' },
  'nutraceuticals & wellness brands': { tag: 'Nutraceuticals & Wellness Brands', slug: 'nutraceuticals-wellness-brands', image: '/blog-images/hub-nutraceuticals.webp' },
  'conversions & leads': { tag: 'Conversions & Leads', slug: 'conversions-leads', image: '/blog-images/hub-conversions.webp' },
  'organic lead generation': { tag: 'Organic Lead Generation', slug: 'organic-lead-generation', image: '/blog-images/hub-organic-lead-gen.webp' },
  'lead generation': { tag: 'Organic Lead Generation', slug: 'organic-lead-generation', image: '/blog-images/hub-organic-lead-gen.webp' },
  'tech & speed': { tag: 'Tech & Speed', slug: 'tech-speed', image: '/blog-images/hub-tech-speed.webp' },
  'website strategy': { tag: 'Website Strategy', slug: 'website-strategy', image: '/blog-images/hub-website-strategy.webp' },
  'b2b strategy': { tag: 'Website Strategy', slug: 'website-strategy', image: '/blog-images/hub-website-strategy.webp' },
  'cost & roi': { tag: 'Cost & ROI', slug: 'cost-roi', image: '/blog-images/hub-cost-roi.webp' },
  'hiring & agency': { tag: 'Hiring & Agency', slug: 'hiring-agency', image: '/blog-images/hub-hiring-agency.webp' },
  'founder-led marketing': { tag: 'Founder-Led Marketing', slug: 'founder-led-marketing', image: '/blog-images/hub-founder-linkedin.webp' },
  'linkedin thought leadership': { tag: 'Founder-Led Marketing', slug: 'founder-led-marketing', image: '/blog-images/hub-founder-linkedin.webp' },
  'case studies': { tag: 'Case Studies', slug: 'case-studies', image: '/blog-images/hub-case-studies.webp' },
};

const PILLAR_NUM_MAP = {
  'pillar-getting-found-google-chatgpt-perplexity-b2b.md': 115,
  'pillar-how-much-b2b-website-costs-2026.md': 116,
  'pillar-react-vs-wordpress-b2b.md': 117,
  'pillar-signs-website-losing-deals.md': 118,
  'pillar-website-redesign-checklist-founders.md': 119,
  'pillar-why-business-websites-get-zero-leads.md': 120,
};

// Parse prompts map for dedicated blog hero images and rich descriptive alt text
const promptsMap = {};
try {
  const promptsPath = path.join(rootDir, 'POMELLI_IMAGE_PROMPTS_FOR_ALL_BLOGS.md');
  if (fs.existsSync(promptsPath)) {
    const pContent = fs.readFileSync(promptsPath, 'utf8');
    const sections = pContent.split(/### Blog (\d+):/);
    for (let i = 1; i < sections.length; i += 2) {
      const num = parseInt(sections[i], 10);
      const block = sections[i + 1];
      const title = block.trim().split('\n')[0].trim();
      const sceneMatch = block.match(/\* \*\*Photoshoot Scene:\*\*\s*([^\n]+)/);
      const scene = sceneMatch ? sceneMatch[1].trim() : 'B2B Growth Platform Photography';
      promptsMap[num] = { title, scene };
    }
  }
} catch (e) {
  console.warn('[Warning] Could not parse POMELLI prompts map:', e.message);
}

function classifyLane(normalizedTag, title, pk, body) {
  const hay = `${normalizedTag} ${title} ${pk}`.toLowerCase();
  if (/nutraceutical|supplement|probiotic|wellness|gummy|cdmo|white label supplement/.test(hay)) {
    return 'nutraceuticals/B2B export';
  }
  if (/manufactur|exporter|export compliance|oem|industrial|factory|sourcing|supplier|iso 13485|as9100|tariffs|ais-140/.test(hay)) {
    return 'B2B manufacturers/exporters';
  }
  if (/saas|react|next\.js|nextjs|software|tech startup|web engineering|website speed|core web vitals|seo|geo|ai search|ai overview|conversion|demo request|b2b website/.test(hay) && normalizedTag !== 'Hiring & Agency' && normalizedTag !== 'Cost & ROI') {
    return 'SaaS/tech';
  }
  return 'off-lane';
}

const blogIndex = files.map((filename) => {
  const filePath = path.join(blogsDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const normalizedContent = fileContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  let data = {};
  const lines = normalizedContent.split('\n');
  let startIndex = 0;

  while (startIndex < lines.length) {
    const line = lines[startIndex].trim();
    if (
      line === '' ||
      /^#?\s*Blog\s*\d+(\s*of\s*\d+)?/i.test(line) ||
      /^═+$/.test(line) ||
      (line.startsWith('---') && line.length > 5) ||
      /^[═\-*\s]+$/.test(line)
    ) {
      startIndex++;
    } else {
      break;
    }
  }

  let contentLines = [];
  const hasStrictFencing = lines[startIndex]?.trim() === '---';

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
      const idx = line.indexOf(':');
      if (idx > 0) {
        const rawKey = line.substring(0, idx).trim();
        const rawValue = line.substring(idx + 1).trim();
        const key = rawKey.replace(/\*/g, '').trim();
        const value = rawValue.replace(/\*/g, '').trim();
        const lowerKey = key.toLowerCase();
        if (knownKeys.includes(lowerKey) || (i - startIdx < 15 && /^[A-Za-z][a-zA-Z\s]+$/.test(key))) {
          data[key] = value;
          if (lowerKey === 'seo title') data['SEO Title'] = value;
          if (lowerKey === 'meta description') data['Meta Description'] = value;
          if (lowerKey === 'slug') data['Slug'] = value;
          if (lowerKey === 'niche tag') data['Niche Tag'] = value;
          if (lowerKey === 'date') data['Date'] = value;
          i++;
          continue;
        }
      }
      break;
    }
    contentLines = lines.slice(i);
  }

  if (hasStrictFencing) {
    let closingIndex = -1;
    for (let i = startIndex + 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        closingIndex = i;
        break;
      }
    }
    if (closingIndex !== -1) {
      const fmLines = lines.slice(startIndex + 1, closingIndex);
      fmLines.forEach(line => {
        const idx = line.indexOf(':');
        if (idx > 0) {
          const key = line.substring(0, idx).replace(/\*/g, '').trim();
          const value = line.substring(idx + 1).replace(/\*/g, '').trim();
          data[key] = value;
          const lowerKey = key.toLowerCase();
          if (lowerKey === 'seo title') data['SEO Title'] = value;
          if (lowerKey === 'meta description') data['Meta Description'] = value;
          if (lowerKey === 'slug') data['Slug'] = value;
          if (lowerKey === 'niche tag') data['Niche Tag'] = value;
          if (lowerKey === 'date') data['Date'] = value;
        }
      });
      contentLines = lines.slice(closingIndex + 1);
    } else {
      parseLineByLine(startIndex + 1);
    }
  } else {
    parseLineByLine(startIndex);
  }

  const content = contentLines.join('\n').trim();
  const rawTitle = data['SEO Title'] || data.title;
  const isTitleParsed = rawTitle && !/^blog_\d+$/i.test(rawTitle);
  const title = isTitleParsed ? rawTitle : filename.replace('.md', '');

  let cleanExcerpt = data['Meta Description'] || data.excerpt;
  if (!cleanExcerpt) {
    const cleanContentText = content
      .split('\n')
      .filter(line => {
        const l = line.trim();
        return l !== '' && !/^#/.test(l) && !/^[═\-*\s]+$/.test(l);
      })
      .join(' ');
    cleanExcerpt = cleanContentText.substring(0, 150).trim();
    if (cleanExcerpt.length > 0) cleanExcerpt += '...';
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200)) + ' min read';

  const rawTag = (data['Niche Tag'] || 'Website Strategy').trim();
  const taxInfo = TAXONOMY_MAP[rawTag.toLowerCase()] || {
    tag: rawTag,
    slug: rawTag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    image: '/blog-images/hub-website-strategy.webp',
  };

  // Real dates from frontmatter / git history (B2: never invent dates)
  const gitPub = gitAddedMap.get(filename);
  const gitMod = gitModifiedMap.get(filename);
  const fmDate = data['Date'] && /^\d{4}-\d{2}-\d{2}/.test(data['Date']) ? data['Date'].slice(0, 10) : null;
  const datePublished = fmDate || (gitPub ? gitPub.slice(0, 10) : null);
  const dateModified = gitMod ? gitMod.slice(0, 10) : datePublished;

  const primaryKeyword = (data['Primary Keyword'] || title).trim();
  const lane = classifyLane(taxInfo.tag, title, primaryKeyword, content);

  let blogImage = taxInfo.image;
  let blogAlt = `${primaryKeyword}: ${title} | Rankur`;
  let num = PILLAR_NUM_MAP[filename] || null;
  if (!num) {
    const numMatch = filename.match(/^blog_0*(\d+)(?:_new)?\.md$/);
    if (numMatch) {
      num = parseInt(numMatch[1], 10);
    }
  }

  if (num && num >= 1 && num <= 120) {
    const candidate = `/blog-images/prompt-${num}.webp`;
    if (fs.existsSync(path.join(rootDir, 'public', candidate))) {
      blogImage = candidate;
      const pInfo = promptsMap[num];
      if (pInfo && pInfo.scene) {
        blogAlt = `${primaryKeyword}: ${pInfo.scene} (${title}) | Rankur`;
      }
    }
  }

  return {
    filename,
    title,
    tag: taxInfo.tag,
    categorySlug: taxInfo.slug,
    lane,
    date: datePublished,
    datePublished,
    dateModified,
    author: 'Moksh Parjapati',
    authorRole: 'Founder & B2B Growth Strategist',
    readTime,
    wordCount,
    excerpt: cleanExcerpt,
    slug: data.Slug || data.slug || filename.replace('.md', ''),
    image: blogImage,
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: blogAlt,
    primaryKeyword,
    secondaryKeywords: data['Secondary Keywords'] || '',
    geoPhrase: data['GEO Phrase'] || '',
    targetMarket: data['Target Market'] || 'US / UK / Australia',
  };
});

// Sort: non-_new authored pillars & original posts first (by numeric or date), preserving clear browse order
blogIndex.sort((a, b) => {
  const aNew = a.filename.includes('_new') ? 1 : 0;
  const bNew = b.filename.includes('_new') ? 1 : 0;
  if (aNew !== bNew) return aNew - bNew;
  const aPillar = a.filename.startsWith('pillar-') ? 0 : 1;
  const bPillar = b.filename.startsWith('pillar-') ? 0 : 1;
  if (aPillar !== bPillar && aNew === 0) return aPillar - bPillar;
  const numA = parseInt(a.filename.match(/\d+/)?.[0] || '9999', 10);
  const numB = parseInt(b.filename.match(/\d+/)?.[0] || '9999', 10);
  if (numA !== numB) return numA - numB;
  return a.filename.localeCompare(b.filename);
});

fs.writeFileSync(outputFilePath, JSON.stringify(blogIndex, null, 2));
console.log(`Successfully generated blog index for ${blogIndex.length} posts.`);
