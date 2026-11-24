import fs from 'fs';
import path from 'path';

const blogsIndexPath = 'prototype/src/data/blogs-index.json';
const blogs = JSON.parse(fs.readFileSync(blogsIndexPath, 'utf8'));
const blogImagesDir = 'prototype/public/blog-images';

// 1. Map each prompt-X.webp to a descriptive filename based on its primary post slug
const promptToSlug = {};
for (const b of blogs) {
  if (b.image && b.image.includes('prompt-')) {
    const filename = b.image.split('/').pop();
    if (!promptToSlug[filename]) {
      promptToSlug[filename] = b.slug;
    }
  }
}

console.log(`Found ${Object.keys(promptToSlug).length} distinct prompt-*.webp files referenced.`);

// 2. Rename each prompt-X.webp file on disk to ${slug}.webp (and keep prompt-X.webp as alias or copy)
const imageRenameMap = {};
for (const [oldName, slug] of Object.entries(promptToSlug)) {
  const newName = `${slug}.webp`;
  imageRenameMap[oldName] = newName;

  const oldPath = path.join(blogImagesDir, oldName);
  const newPath = path.join(blogImagesDir, newName);

  if (fs.existsSync(oldPath)) {
    // Copy to new descriptive name if not already exists
    fs.copyFileSync(oldPath, newPath);
  }
}

console.log('Copied all prompt images to descriptive semantic filenames.');

// 3. Update blogs-index.json:
// - update image path to descriptive filename
// - generate clean, accurate alt text from post title (no stuffed unrelated strings, no duplicate "| Rankur")
// - clean up dateModified: remove bulk dates, set dateModified = datePublished unless specified
let updatedBlogsCount = 0;

for (const b of blogs) {
  // Image path update
  if (b.image) {
    const imgFile = b.image.split('/').pop();
    if (imageRenameMap[imgFile]) {
      b.image = `/blog-images/${imageRenameMap[imgFile]}`;
    }
  }

  // Alt text update: Clean, accurate, topic-based alt text
  const cleanTitle = (b.title || '').replace(/\s*\|\s*Rankur\s*$/i, '').trim();
  b.imageAlt = `${cleanTitle} architectural guide`;

  // Dates update: remove bulk fake dateModified
  // Set dateModified equal to datePublished so visible page and JSON-LD stay strictly in sync without fake updates
  const pubDate = b.datePublished || b.date;
  b.dateModified = pubDate;

  updatedBlogsCount++;
}

fs.writeFileSync(blogsIndexPath, JSON.stringify(blogs, null, 2), 'utf8');
console.log(`Updated ${updatedBlogsCount} blog entries in blogs-index.json with semantic image names, clean topic alt texts, and honest dates.`);
