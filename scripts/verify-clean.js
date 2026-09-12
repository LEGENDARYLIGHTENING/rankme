import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToCheck = [
  path.resolve(__dirname, '../../founder_medium_publisher.html'),
  path.resolve(__dirname, '../founder_medium_publisher.html'),
  path.resolve(__dirname, '../../brand_medium_publisher.html'),
  path.resolve(__dirname, '../brand_medium_publisher.html'),
  path.resolve(__dirname, '../../RANKUR_MEDIUM_POSTS.md'),
  path.resolve(__dirname, '../RANKUR_MEDIUM_POSTS.md')
];

let allPassed = true;

for (const f of filesToCheck) {
  if (!fs.existsSync(f)) {
    console.error(`Missing file: ${f}`);
    allPassed = false;
    continue;
  }
  const content = fs.readFileSync(f, 'utf-8');
  const basename = path.basename(f);
  const isHtml = f.endsWith('.html');
  const isFounder = f.includes('founder');

  // 1. Literal em-dash and en-dash
  const emMatches = (content.match(/[\u2014\u2013]/g) || []).length;

  // 2. Double hyphens used as dashes (exclude HTML comments <!-- --> or CSS vars --primary)
  let contentNoCommentsOrCss = content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/--[a-zA-Z0-9_-]+:/g, '') // css variables
    .replace(/var\(--[a-zA-Z0-9_-]+\)/g, ''); // css var usage
  
  const doubleHyphenMatches = (contentNoCommentsOrCss.match(/([^\-\n])\s*--\s*([^\-\n])/g) || []).length;

  // 3. Spaced hyphens in prose / text:
  // Split by line and check lines that are not bullet list items, HTML tags, or frontmatter
  const lines = content.split(/\r?\n/);
  let spacedHyphensInProse = 0;
  let sampleSpaced = [];

  for (const line of lines) {
    // skip frontmatter or divider
    if (/^---+\s*$/.test(line) || /^\*\*\*+\s*$/.test(line)) continue;
    // skip markdown list items
    if (/^[ \t]*[-*•]\s+/.test(line)) {
      // check if rest of line after bullet has spaced hyphen
      const rest = line.replace(/^[ \t]*[-*•]\s+/, '');
      if (rest.includes(' - ')) {
        spacedHyphensInProse++;
        sampleSpaced.push(line);
      }
      continue;
    }
    // skip CSS lines or JS code lines in HTML
    if (isHtml && (line.includes('var(') || line.includes('margin:') || line.includes('padding:') || line.includes('border:') || line.includes('font-') || line.includes('function ') || line.includes('const ') || line.includes('let '))) {
      continue;
    }

    if (line.includes(' - ')) {
      spacedHyphensInProse++;
      sampleSpaced.push(line);
    }
  }

  // 4. Check for 3rd person "Moksh" in founder publisher
  let thirdPersonMoksh = 0;
  if (isFounder) {
    const tpRegex = /(?:How Moksh Can Help|Moksh is a|Moksh works|Moksh combines|Moksh builds|Moksh delivers|Moksh provides|where he reviews|where he assesses)/gi;
    const tpMatches = content.match(tpRegex) || [];
    thirdPersonMoksh = tpMatches.length;
  }

  console.log(`\nResults for ${basename} (${f.includes('prototype') ? 'prototype' : 'root'}):`);
  console.log(`  Em/En Dashes: ${emMatches}`);
  console.log(`  Double Hyphens: ${doubleHyphenMatches}`);
  console.log(`  Spaced Hyphens in Prose: ${spacedHyphensInProse}`);
  if (isFounder) console.log(`  3rd-person 'Moksh' remnants: ${thirdPersonMoksh}`);

  if (emMatches > 0 || doubleHyphenMatches > 0 || spacedHyphensInProse > 0 || thirdPersonMoksh > 0) {
    allPassed = false;
    if (sampleSpaced.length > 0) {
      console.log('  Samples of spaced hyphens:');
      sampleSpaced.slice(0, 3).forEach(s => console.log('    ' + s.trim()));
    }
  }
}

if (allPassed) {
  console.log('\n===========================================');
  console.log('ALL FILES VERIFIED: 0 EM DASHES, 0 AI DASHES!');
  console.log('===========================================');
} else {
  console.error('\nFAIL: Some files still have dash remnants.');
  process.exit(1);
}
