import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const webpDir = path.join(rootDir, 'public', 'blog-images');
const sourceDir = path.join(rootDir, 'images for blogs');
const blogsDir = path.join(rootDir, 'blogs');

// Pillar mapping for blogs 115-120
const PILLAR_NUM_MAP = {
  115: 'pillar-getting-found-google-chatgpt-perplexity-b2b.md',
  116: 'pillar-how-much-b2b-website-costs-2026.md',
  117: 'pillar-react-vs-wordpress-b2b.md',
  118: 'pillar-signs-website-losing-deals.md',
  119: 'pillar-website-redesign-checklist-founders.md',
  120: 'pillar-why-business-websites-get-zero-leads.md',
};

// Map each blog number 1..120 to its file
const allFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
const blogNumToFile = {};

for (let num = 1; num <= 114; num++) {
  const match = allFiles.find(f => {
    const m = f.match(/^blog_0*(\d+)(?:_new)?\.md$/);
    return m && parseInt(m[1], 10) === num;
  });
  if (match) blogNumToFile[num] = match;
}
for (const [num, file] of Object.entries(PILLAR_NUM_MAP)) {
  blogNumToFile[parseInt(num, 10)] = file;
}

// Parse POMELLI prompts map
const pomelliContent = fs.readFileSync(path.join(rootDir, 'POMELLI_IMAGE_PROMPTS_FOR_ALL_BLOGS.md'), 'utf8');
const sections = pomelliContent.split(/### Blog (\d+):/);
const promptsMap = {};

for (let i = 1; i < sections.length; i += 2) {
  const num = parseInt(sections[i], 10);
  const block = sections[i + 1];
  const title = block.trim().split('\n')[0].trim();
  const sceneMatch = block.match(/\* \*\*Photoshoot Scene:\*\*\s*([^\n]+)/);
  const scene = sceneMatch ? sceneMatch[1].trim() : 'B2B Growth Platform Photography';
  const promptMatch = block.match(/```text\s*([\s\S]*?)```/);
  const prompt = promptMatch ? promptMatch[1].trim() : '';
  promptsMap[num] = { title, scene, prompt };
}

// Parse frontmatter of a markdown file
function parseBlogFrontmatter(filename) {
  const fullPath = path.join(blogsDir, filename);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const data = {};

  let inFm = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '---') {
      if (!inFm) {
        inFm = true;
        continue;
      } else {
        break;
      }
    }
    if (inFm) {
      const idx = line.indexOf(':');
      if (idx > 0) {
        const key = line.substring(0, idx).replace(/\*/g, '').trim();
        const val = line.substring(idx + 1).replace(/\*/g, '').trim();
        data[key] = val;
      }
    }
  }

  const primaryKeyword = data['Primary Keyword'] || data['SEO Title'] || filename.replace('.md', '');
  const secondaryKeywords = data['Secondary Keywords'] || '';
  const geoPhrase = data['GEO Phrase'] || '';
  const title = data['SEO Title'] || data.title || filename.replace('.md', '');
  const nicheTag = data['Niche Tag'] || 'B2B Strategy';
  const targetMarket = data['Target Market'] || 'US / UK / Global';

  return {
    primaryKeyword,
    secondaryKeywords,
    geoPhrase,
    title,
    nicheTag,
    targetMarket,
  };
}

// Pre-load all 120 blog metadata
const blogMetaMap = {};
for (let num = 1; num <= 120; num++) {
  const file = blogNumToFile[num];
  if (file) {
    const fm = parseBlogFrontmatter(file);
    const pInfo = promptsMap[num] || { title: `Blog ${num}`, scene: 'B2B Growth Architecture', prompt: '' };
    blogMetaMap[num] = {
      ...fm,
      scene: pInfo.scene,
      pomelliTitle: pInfo.title,
      prompt: pInfo.prompt,
    };
  }
}

async function run() {
  console.log('================================================================');
  console.log('EMBEDDING RELEVANT TARGET KEYWORDS INTO ALL 120 BLOG WEBP ASSETS');
  console.log('================================================================');

  let webpSuccess = 0;
  for (let num = 1; num <= 120; num++) {
    const webpFile = path.join(webpDir, `prompt-${num}.webp`);
    if (!fs.existsSync(webpFile)) {
      console.warn(`[Warning] Missing webp file: ${webpFile}`);
      continue;
    }

    const info = blogMetaMap[num] || {
      primaryKeyword: `B2B Web Development Blog ${num}`,
      secondaryKeywords: 'Next.js website, B2B SEO, conversion rate optimization',
      geoPhrase: 'How to optimize B2B web architecture for lead generation',
      title: `Blog ${num}`,
      scene: 'B2B Digital Platform Architecture',
      nicheTag: 'B2B Strategy',
    };

    const keywords = [
      info.primaryKeyword,
      info.secondaryKeywords,
      info.geoPhrase,
      'Rankur',
      'Moksh Parjapati',
      'B2B SEO',
      'Next.js Web Engineering',
      'Generative Engine Optimization',
    ]
      .filter(Boolean)
      .join('; ');

    const description = `${info.primaryKeyword} — ${info.title} | ${info.scene} | Rankur B2B Growth Platform`;
    const subject = `${info.primaryKeyword} | ${info.nicheTag}`;
    const comment = `Target Search Keyword: ${info.primaryKeyword}. Secondary: ${info.secondaryKeywords}. Optimized for Google & AI search engine visibility.`;

    const inputBuf = fs.readFileSync(webpFile);
    const outputBuf = await sharp(inputBuf)
      .withMetadata({
        exif: {
          IFD0: {
            ImageDescription: description,
            XPTitle: info.title,
            XPKeywords: keywords,
            XPSubject: subject,
            XPComment: comment,
            Artist: 'Moksh Parjapati',
            Copyright: '© 2026 Moksh Productions / Rankur. All rights reserved.',
            Software: 'Rankur Media Pipeline',
          },
        },
      })
      .webp({ quality: 90 })
      .toBuffer();

    fs.writeFileSync(webpFile, outputBuf);
    webpSuccess++;
  }
  console.log(`✓ Embedded target search keywords into all ${webpSuccess} WebP blog assets in public/blog-images/`);

  // Now process images for blogs/*.jpg
  if (fs.existsSync(sourceDir)) {
    console.log('\n================================================================');
    console.log('EMBEDDING TARGET KEYWORDS INTO ALL SOURCE JPG ASSETS IN images for blogs/');
    console.log('================================================================');

    const jpgFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.jpg'));
    let jpgSuccess = 0;

    for (const file of jpgFiles) {
      const filePath = path.join(sourceDir, file);
      const cleanBase = file
        .toLowerCase()
        .replace(/_[a-f0-9]{8}.*\.jpg$/i, '')
        .replace(/[^a-z0-9]/g, ' ');
      const words = cleanBase.split(/\s+/).filter(w => w.length > 3);

      // Best match against blog 1..120
      let bestNum = null;
      let bestScore = 0;

      for (let num = 1; num <= 120; num++) {
        const meta = blogMetaMap[num];
        if (!meta) continue;
        const target = `${meta.title} ${meta.scene} ${meta.prompt} ${meta.primaryKeyword}`.toLowerCase();
        let score = 0;
        for (const w of words) {
          if (target.includes(w)) score++;
        }
        if (score > bestScore) {
          bestScore = score;
          bestNum = num;
        }
      }

      let info;
      if (bestNum && bestScore >= 1) {
        info = blogMetaMap[bestNum];
      } else {
        const readableTitle = file.replace(/_[a-f0-9]{8}.*\.jpg$/i, '').replace(/_/g, ' ');
        info = {
          primaryKeyword: `${readableTitle} B2B Growth Platform`,
          secondaryKeywords: 'B2B web development, Next.js engineering, technical SEO, conversion optimization',
          geoPhrase: 'How B2B companies scale pipeline through modern web architecture',
          title: `${readableTitle} | Rankur`,
          scene: readableTitle,
          nicheTag: 'B2B Strategy',
        };
      }

      const keywords = [
        info.primaryKeyword,
        info.secondaryKeywords,
        info.geoPhrase,
        'Rankur',
        'Moksh Parjapati',
        'B2B SEO',
        'Next.js Web Engineering',
      ]
        .filter(Boolean)
        .join('; ');

      const description = `${info.primaryKeyword} — ${info.title} | ${info.scene} | Rankur Commercial Photography`;
      const subject = `${info.primaryKeyword} | ${info.nicheTag}`;
      const comment = `Target Search Keyword: ${info.primaryKeyword}. Secondary: ${info.secondaryKeywords}. Rankur Media Pipeline.`;

      const inputBuf = fs.readFileSync(filePath);
      const outputBuf = await sharp(inputBuf)
        .withMetadata({
          exif: {
            IFD0: {
              ImageDescription: description,
              XPTitle: info.title,
              XPKeywords: keywords,
              XPSubject: subject,
              XPComment: comment,
              Artist: 'Moksh Parjapati',
              Copyright: '© 2026 Moksh Productions / Rankur. All rights reserved.',
              Software: 'Rankur Media Pipeline',
            },
          },
        })
        .jpeg({ quality: 95, mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(filePath, outputBuf);
      jpgSuccess++;
    }
    console.log(`✓ Embedded target search keywords into all ${jpgSuccess} source JPG images in images for blogs/`);
  }
}

run().catch(err => {
  console.error('Fatal error embedding keywords:', err);
  process.exit(1);
});
