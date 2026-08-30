import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const IMAGES_DIR = path.join(PROJECT_ROOT, 'Images - Copy');
const PUBLIC_BLOG_IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'blog-images');
const KEYWORDS_FILE = path.join(PROJECT_ROOT, 'rankur-blog-topics-keywords.md');

// Ensure output directory in public/blog-images exists
if (!fs.existsSync(PUBLIC_BLOG_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_BLOG_IMAGES_DIR, { recursive: true });
}

// 1. Parse rankur-blog-topics-keywords.md for Prompts 1..120
function parseKeywords() {
  const content = fs.readFileSync(KEYWORDS_FILE, 'utf-8');
  const lines = content.split('\n');
  const metadataMap = new Map(); // promptNum -> { title, keywords }

  let currentNum = null;
  let currentTitle = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Match line like: 1. **How to Build a High-Converting B2B Website That Generates Qualified Leads in 2026**
    const titleMatch = line.match(/^(\d+)\.\s*\*\*(.*?)\*\*/);
    if (titleMatch) {
      currentNum = parseInt(titleMatch[1], 10);
      currentTitle = titleMatch[2].trim();
      continue;
    }

    // Match keywords line like: Keywords: high-converting B2B website, B2B website lead generation...
    if (currentNum !== null && line.startsWith('Keywords:')) {
      const keywords = line.replace('Keywords:', '').trim();
      metadataMap.set(currentNum, {
        title: currentTitle,
        keywords: keywords,
      });
      currentNum = null;
      currentTitle = '';
    }
  }

  return metadataMap;
}

async function processImages() {
  console.log('--- Rankur 120 Images SEO & WebP Optimization Pipeline ---');
  const metadataMap = parseKeywords();
  console.log(`Parsed keywords for ${metadataMap.size} topics.`);

  const files = fs.readdirSync(IMAGES_DIR);
  let totalOriginalBytes = 0;
  let totalWebpBytes = 0;
  let processedCount = 0;

  for (let num = 1; num <= 120; num++) {
    // Find matching png file (e.g. "Prompt 1 Image.png", "Prompt 01 Image.png", etc.)
    const regex = new RegExp(`^Prompt\\s*0*${num}\\s*Image\\.png$`, 'i');
    const pngFileName = files.find((f) => regex.test(f));

    if (!pngFileName) {
      console.warn(`[WARN] Prompt ${num} PNG image not found in ${IMAGES_DIR}`);
      continue;
    }

    const pngPath = path.join(IMAGES_DIR, pngFileName);
    const origStat = fs.statSync(pngPath);
    totalOriginalBytes += origStat.size;

    const meta = metadataMap.get(num) || {
      title: `Rankur B2B SEO & Growth Blog Image ${num}`,
      keywords: `B2B growth, SEO, lead generation, rankur, prompt ${num}`,
    };

    const webpFileName = `prompt-${num}.webp`;
    const destInImagesCopy = path.join(IMAGES_DIR, webpFileName);
    const destInPublic = path.join(PUBLIC_BLOG_IMAGES_DIR, webpFileName);

    try {
      // Process image: Strip original EXIF metadata, add keyword metadata, convert to WebP
      const webpBuffer = await sharp(pngPath)
        .withMetadata({
          exif: {
            IFD0: {
              ImageDescription: meta.keywords,
              Software: 'Rankur Image Optimizer',
              Copyright: 'Rankur Copyright 2026',
            },
          },
        })
        .webp({
          quality: 80,
          effort: 6,
          lossless: false,
        })
        .toBuffer();

      // Write to both Images - Copy and public/blog-images
      fs.writeFileSync(destInImagesCopy, webpBuffer);
      fs.writeFileSync(destInPublic, webpBuffer);

      totalWebpBytes += webpBuffer.length;
      processedCount++;

      // Delete original heavy PNG
      fs.unlinkSync(pngPath);

      console.log(
        `[✓] Prompt ${num}: ${(origStat.size / 1024 / 1024).toFixed(2)} MB PNG → ${(
          webpBuffer.length / 1024
        ).toFixed(1)} KB WebP | Keywords: "${meta.keywords.slice(0, 40)}..."`
      );
    } catch (err) {
      console.error(`[ERR] Failed to process Prompt ${num} (${pngFileName}):`, err.message);
    }
  }

  const origMB = (totalOriginalBytes / 1024 / 1024).toFixed(2);
  const webpMB = (totalWebpBytes / 1024 / 1024).toFixed(2);
  const savingsPct = (((totalOriginalBytes - totalWebpBytes) / totalOriginalBytes) * 100).toFixed(1);

  console.log('\n==================================================');
  console.log(`Pipeline Complete! Processed ${processedCount} / 120 images.`);
  console.log(`Original PNG Total Size: ${origMB} MB`);
  console.log(`Optimized WebP Total Size: ${webpMB} MB`);
  console.log(`Space Saved: ${savingsPct}% reduction!`);
  console.log('==================================================\n');
}

processImages();
