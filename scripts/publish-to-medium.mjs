import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Load environment variables from .env
const envPath = path.join(rootDir, '.env');
let mediumToken = process.env.MEDIUM_TOKEN || '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*MEDIUM_TOKEN\s*=\s*(.+)$/);
    if (match) {
      mediumToken = match[1].trim();
    }
  }
}

async function main() {
  console.log('====================================================');
  console.log('🚀 Rankur Medium Automated Publishing Engine');
  console.log('====================================================\n');

  if (!mediumToken) {
    console.error('❌ Error: MEDIUM_TOKEN is not set in .env');
    console.log('\nTo get your Medium Integration Token:');
    console.log('1. Go to https://medium.com/me/settings/security');
    console.log('2. Scroll to "Integration tokens"');
    console.log('3. Generate a token named "Rankur Publisher"');
    console.log('4. Add to .env: MEDIUM_TOKEN=your_token_here\n');
    process.exit(1);
  }

  // 1. Authenticate with Medium API
  console.log('1. Authenticating with Medium API...');
  const userRes = await fetch('https://api.medium.com/v1/me', {
    headers: {
      Authorization: `Bearer ${mediumToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!userRes.ok) {
    const errText = await userRes.text();
    console.error(`❌ Authentication failed (${userRes.status}):`, errText);
    process.exit(1);
  }

  const userData = await userRes.json();
  const author = userData.data;
  console.log(`✓ Authenticated as: ${author.name} (@${author.username}) [ID: ${author.id}]\n`);

  // 2. Parse RANKUR_MEDIUM_POSTS.md to extract prepared articles
  const mediumPostsFile = path.join(rootDir, 'RANKUR_MEDIUM_POSTS.md');
  if (!fs.existsSync(mediumPostsFile)) {
    console.error(`❌ Cannot find ${mediumPostsFile}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(mediumPostsFile, 'utf8');
  const articleBlocks = raw.split(/## Article \d+:\s*/).slice(1);

  console.log(`✓ Found ${articleBlocks.length} prepared Medium articles in RANKUR_MEDIUM_POSTS.md\n`);

  // Parse command-line args: e.g. "node scripts/publish-to-medium.mjs --article=1 --status=draft"
  const args = process.argv.slice(2);
  let targetIndex = 0; // default to first article
  let publishStatus = 'draft'; // default to draft for safety

  for (const arg of args) {
    if (arg.startsWith('--article=')) {
      targetIndex = parseInt(arg.split('=')[1], 10) - 1;
    }
    if (arg.startsWith('--status=')) {
      publishStatus = arg.split('=')[1].trim(); // 'public', 'draft', 'unlisted'
    }
  }

  const block = articleBlocks[targetIndex];
  if (!block) {
    console.error(`❌ Article ${targetIndex + 1} not found (range: 1-${articleBlocks.length})`);
    process.exit(1);
  }

  const lines = block.split('\n');
  const titleLine = lines.find(l => l.startsWith('**Medium Title:**'));
  const tagsLine = lines.find(l => l.startsWith('**Tags:**'));
  const canonicalLine = lines.find(l => l.startsWith('**Canonical URL:**'));

  const title = titleLine ? titleLine.replace('**Medium Title:**', '').trim() : lines[0].trim();
  const tags = tagsLine ? tagsLine.replace('**Tags:**', '').split(',').map(t => t.trim()).slice(0, 5) : ['B2B', 'SEO', 'Web Development'];
  const canonicalUrl = canonicalLine ? canonicalLine.replace('**Canonical URL:**', '').trim() : 'https://rankursite.com';

  const contentStartIndex = lines.findIndex(l => l.startsWith('### Article Content'));
  const content = contentStartIndex !== -1 ? lines.slice(contentStartIndex + 1).join('\n').trim() : block;

  console.log('----------------------------------------------------');
  console.log(`Target Article [${targetIndex + 1}]: "${title}"`);
  console.log(`Tags: [${tags.join(', ')}]`);
  console.log(`Canonical URL: ${canonicalUrl}`);
  console.log(`Publish Status: ${publishStatus.toUpperCase()}`);
  console.log('----------------------------------------------------\n');

  // 3. Post to Medium
  console.log(`Publishing to Medium as ${publishStatus}...`);
  const postPayload = {
    title,
    contentFormat: 'markdown',
    content: `# ${title}\n\n${content}`,
    canonicalUrl,
    tags,
    publishStatus,
  };

  const postRes = await fetch(`https://api.medium.com/v1/users/${author.id}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${mediumToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postPayload),
  });

  if (!postRes.ok) {
    const errText = await postRes.text();
    console.error(`❌ Publishing failed (${postRes.status}):`, errText);
    process.exit(1);
  }

  const postData = await postRes.json();
  const published = postData.data;

  console.log('🎉 SUCCESS! Article published to Medium:');
  console.log(`🔗 URL: ${published.url}`);
  console.log(`📄 ID: ${published.id}`);
  console.log(`🏷️ Canonical Backlink: ${published.canonicalUrl}`);
  console.log('====================================================\n');
}

main().catch(err => {
  console.error('Fatal error in Medium publisher:', err);
  process.exit(1);
});
