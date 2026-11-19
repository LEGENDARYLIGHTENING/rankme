import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function cleanDashes(text) {
  let res = text;
  // 1. Number / currency ranges: 30k–75k, $3,000 – $7,000, 98–100, 2024 – Present, 1–10
  res = res.replace(/(\$?\d[\d,]*[a-zA-Z%]?)\s*[\u2014\u2013]\s*(\$?\d[\d,]*[a-zA-Z%]?|Present)/gi, '$1 to $2');
  res = res.replace(/(\b[A-Za-z]+)\s*[\u2014\u2013]\s*(Present)\b/gi, '$1 to $2');

  // 2. Connector em dash: "word—and", "word—but", "word—or"
  res = res.replace(/(\w)[\u2014\u2013]\s*(and|or|but|which|where|when|while|because|then)\b/gi, '$1, $2');

  // 3. Parenthetical / clause em dashes: "word—including...", "word—not..."
  res = res.replace(/(\w)[\u2014\u2013]\s*(including|especially|namely|such as|not)\b/gi, '$1, $2');

  // 4. End-of-clause em dashes before capital letters: "liability—Here is" -> "liability. Here is"
  res = res.replace(/(\w)[\u2014\u2013]\s*([A-Z])/g, '$1. $2');

  // 5. Title / label separator: "Rankur — B2B Web", "Contact Inquiry — Rankur"
  res = res.replace(/\s*[\u2014\u2013]\s*(Rankur|Client Platform|High-Performance|B2B|Moksh)\b/g, ': $1');

  // 6. Remaining spaced em dashes: "something — something" -> "something: something" or "something, something"
  res = res.replace(/\s+[\u2014\u2013]\s+/g, ': ');

  // 7. Any remaining unspaced em dashes between words
  res = res.replace(/(\w)[\u2014\u2013](\w)/g, '$1: $2');

  // 8. Catch any remaining literal em/en dashes
  res = res.replace(/[\u2014\u2013]/g, ':');

  // 9. Catch HTML entities
  res = res.replace(/&mdash;/g, ': ').replace(/&ndash;/g, ' to ');

  return res;
}

const targetDirs = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'app'),
  path.join(rootDir, 'blogs'),
];

let filesModified = 0;
let totalReplaced = 0;

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name !== 'node_modules' && ent.name !== '.next' && ent.name !== '.git') {
        walk(full);
      }
    } else if (ent.isFile() && (ent.name.endsWith('.jsx') || ent.name.endsWith('.js') || ent.name.endsWith('.md') || ent.name.endsWith('.json'))) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = (content.match(/[\u2014\u2013]|&mdash;|&ndash;/g) || []).length;
      if (matches > 0) {
        const cleaned = cleanDashes(content);
        fs.writeFileSync(full, cleaned, 'utf8');
        filesModified++;
        totalReplaced += matches;
      }
    }
  }
}

for (const d of targetDirs) {
  if (fs.existsSync(d)) walk(d);
}

// Also clean generator scripts
for (const s of ['generate-blog-index.js', 'embed-image-keywords.js', 'embed-image-metadata.js']) {
  const p = path.join(rootDir, 'scripts', s);
  if (fs.existsSync(p)) {
    const c = fs.readFileSync(p, 'utf8');
    if (/[\u2014\u2013]|&mdash;|&ndash;/.test(c)) {
      fs.writeFileSync(p, cleanDashes(c), 'utf8');
      filesModified++;
    }
  }
}

console.log(`=======================================================`);
console.log(`EM DASH REMOVAL COMPLETE:`);
console.log(`Replaced ${totalReplaced} em/en dashes across ${filesModified} files.`);
console.log(`=======================================================`);
