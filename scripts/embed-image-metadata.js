import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const webpDir = path.join(rootDir, 'public', 'blog-images');
const sourceDir = path.join(rootDir, 'images for blogs');

// Parse prompts map
const content = fs.readFileSync(path.join(rootDir, 'POMELLI_IMAGE_PROMPTS_FOR_ALL_BLOGS.md'), 'utf8');
const sections = content.split(/### Blog (\d+):/);
const promptsMap = {};

for (let i = 1; i < sections.length; i += 2) {
  const num = parseInt(sections[i], 10);
  const block = sections[i + 1];
  const title = block.trim().split('\n')[0].trim();
  const sceneMatch = block.match(/\* \*\*Photoshoot Scene:\*\*\s*([^\n]+)/);
  const scene = sceneMatch ? sceneMatch[1].trim() : 'B2B Digital Platform Architecture';
  promptsMap[num] = { title, scene };
}

async function embedMetadata() {
  console.log('Embedding relevant EXIF/IPTC metadata into 120 public/blog-images/prompt-*.webp assets...');

  for (let num = 1; num <= 120; num++) {
    const webpFile = path.join(webpDir, `prompt-${num}.webp`);
    if (!fs.existsSync(webpFile)) continue;

    const info = promptsMap[num] || { title: `Blog ${num}`, scene: 'B2B Growth Infrastructure' };
    const desc = `${info.scene} — ${info.title} | Rankur`;

    const inputBuf = fs.readFileSync(webpFile);
    const outputBuf = await sharp(inputBuf)
      .withMetadata({
        exif: {
          IFD0: {
            ImageDescription: desc,
            Artist: 'Moksh Parjapati',
            Copyright: '© 2026 Moksh Productions / Rankur. All rights reserved.',
            Software: 'Rankur Media Pipeline',
          },
        },
      })
      .webp({ quality: 90 })
      .toBuffer();

    fs.writeFileSync(webpFile, outputBuf);
  }
  console.log('✓ Embedded EXIF metadata into all 120 public/blog-images/prompt-*.webp files.');

  // Also embed into images for blogs/*.jpg
  if (fs.existsSync(sourceDir)) {
    console.log('Embedding relevant EXIF/IPTC metadata into images for blogs/*.jpg...');
    const jpgFiles = fs.readdirSync(sourceDir).filter(f => f.endsWith('.jpg'));
    let count = 0;
    for (const f of jpgFiles) {
      const filePath = path.join(sourceDir, f);
      const cleanTitle = f.replace(/_[a-f0-9]{8}\.jpg$/i, '').replace(/_/g, ' ');
      const desc = `${cleanTitle} | B2B Growth Platform Photography | Rankur`;

      const inputBuf = fs.readFileSync(filePath);
      const outputBuf = await sharp(inputBuf)
        .withMetadata({
          exif: {
            IFD0: {
              ImageDescription: desc,
              Artist: 'Moksh Parjapati',
              Copyright: '© 2026 Moksh Productions / Rankur. All rights reserved.',
              Software: 'Rankur Media Pipeline',
            },
          },
        })
        .jpeg({ quality: 95, mozjpeg: true })
        .toBuffer();

      fs.writeFileSync(filePath, outputBuf);
      count++;
    }
    console.log(`✓ Embedded EXIF metadata into ${count} source JPG images.`);
  }
}

embedMetadata().catch(err => {
  console.error('Error embedding metadata:', err);
  process.exit(1);
});
