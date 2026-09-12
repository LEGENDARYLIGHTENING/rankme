import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsIndex = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/blogs-index.json'), 'utf-8'));
const blogsDir = path.resolve(__dirname, '../blogs');
const publicImagesDir = path.resolve(__dirname, '../public/blog-images');
const mediumPostsDir = path.resolve(__dirname, '../medium posts');
const outputFile = path.resolve(__dirname, '../RANKUR_MEDIUM_POSTS.md');
const imageCatalogFile = path.resolve(mediumPostsDir, 'IMAGE_CATALOG.md');

if (!fs.existsSync(mediumPostsDir)) {
  fs.mkdirSync(mediumPostsDir, { recursive: true });
}

const selectedSlugs = [
  { slug: 'saas-website-development-agency-us', tags: ['SaaS', 'Web Development', 'Startup', 'Conversion Optimization', 'B2B Marketing'] },
  { slug: 'hire-saas-seo-expert', tags: ['SEO', 'SaaS Growth', 'Marketing Strategy', 'B2B', 'Startups'] },
  { slug: 'custom-react-website-saas-startup', tags: ['React', 'Nextjs', 'Web Development', 'SaaS', 'Tech Startups'] },
  { slug: 'geo-optimization-saas-ai-search-2026', tags: ['Artificial Intelligence', 'SEO', 'SaaS', 'Search Engine', 'Tech Trends'] },
  { slug: 'linkedin-lead-generation-saas-2026', tags: ['Lead Generation', 'LinkedIn', 'B2B Sales', 'SaaS Marketing', 'Founders'] },
  { slug: 'b2b-saas-website-redesign-cost-2026', tags: ['Web Design', 'SaaS', 'Startup Advice', 'B2B Business', 'Cost Analysis'] },
  { slug: 'saas-organic-growth-strategies-2026', tags: ['Growth Hacking', 'SaaS', 'Organic Traffic', 'Product Marketing', 'Startups'] },
  { slug: 'why-saas-website-not-converting', tags: ['CRO', 'User Experience', 'Conversion Optimization', 'SaaS', 'Web Design'] },
  { slug: 'increase-saas-demo-requests-seo', tags: ['SEO Strategy', 'B2B Sales', 'Demo Requests', 'SaaS Pipeline', 'Lead Gen'] },
  { slug: 'saas-churn-reduction-content-marketing', tags: ['Customer Retention', 'Content Marketing', 'SaaS Metrics', 'Customer Success', 'B2B'] },
  { slug: 'content-clusters-rank-b2b-buyer-journeys', tags: ['Content Strategy', 'SEO', 'B2B Marketing', 'Inbound Marketing', 'Buyer Journey'] },
  { slug: 'international-seo-for-b2b-hreflang-market-targeting', tags: ['International Business', 'SEO', 'Global Expansion', 'B2B Sales', 'Web Architecture'] },
  { slug: 'seo-mistakes-kill-b2b-lead-quality', tags: ['SEO Tips', 'Lead Generation', 'B2B Pipeline', 'Marketing Mistakes', 'Sales Strategy'] },
  { slug: 'competitor-gap-analysis-b2b-seo-domination', tags: ['Competitive Intelligence', 'SEO Strategy', 'B2B Growth', 'Market Research', 'SaaS'] },
  { slug: 'schema-markup-b2b-product-service-pages', tags: ['Technical SEO', 'Structured Data', 'Web Development', 'Semantic Web', 'Google Search'] },
  { slug: 'seo-for-b2b-service-businesses-targeting-us-uk-markets', tags: ['B2B Services', 'Cross Border', 'SEO', 'US Market', 'Export Growth'] },
  { slug: 'algorithm-update-resilience-b2b-websites', tags: ['Google Algorithm', 'SEO Strategy', 'Search Ranking', 'Risk Management', 'Tech News'] },
  { slug: 'pillar-page-strategy-b2b-topical-authority', tags: ['Topical Authority', 'Pillar Pages', 'Content Marketing', 'SEO', 'B2B'] },
  { slug: 'seo-audits-uncover-hidden-lead-opportunities', tags: ['Website Audit', 'Technical SEO', 'Lead Generation', 'CRO', 'Growth Strategy'] },
  { slug: 'voice-search-optimization-b2b-decision-makers', tags: ['Voice Search', 'AI Search', 'Executive Strategy', 'Future Of Search', 'B2B'] },
  { slug: 'ai-search-optimization-manufacturers-exporters', tags: ['Manufacturing', 'Export Business', 'AI Search', 'Industrial B2B', 'Global Trade'] },
  { slug: 'scaling-b2b-seo-with-ai-tools-without-losing-quality', tags: ['AI Tools', 'Content Automation', 'SEO Scaling', 'Editorial Quality', 'Productivity'] },
  { slug: 'geo-optimization-rank-chatgpt-perplexity-gemini-b2b', tags: ['ChatGPT', 'Perplexity AI', 'Gemini AI', 'GEO Optimization', 'AI Search'] },
  { slug: 'structured-data-strategies-ai-search-visibility', tags: ['Knowledge Graph', 'Structured Data', 'AI Search', 'Schema', 'Semantic Web'] },
  { slug: 'creating-content-ai-answers-cite-b2b-topics', tags: ['AI Citations', 'Perplexity', 'Content Strategy', 'Thought Leadership', 'B2B Writing'] },
  { slug: 'difference-between-traditional-seo-geo-b2b', tags: ['SEO', 'Generative Engine', 'Tech Innovation', 'Marketing Strategy', 'AI Disruption'] },
  { slug: 'prompt-engineering-testing-b2b-geo-performance', tags: ['Prompt Engineering', 'AI Testing', 'B2B Intelligence', 'LLMs', 'Benchmarking'] },
  { slug: 'why-b2b-website-traffic-not-converting-to-sales-calls', tags: ['B2B Sales', 'Sales Qualified Leads', 'Conversion Rate', 'Web Analytics', 'Founders'] },
  { slug: 'custom-build-vs-agency-retainer-cost-roi', tags: ['Agency Retainer', 'Software Engineering', 'ROI Analysis', 'Budgeting', 'CTO Insights'] },
  { slug: 'website-traffic-up-qualified-pipeline-down', tags: ['Pipeline Velocity', 'B2B Marketing', 'Lead Qualification', 'Revenue Operations', 'Analytics'] }
];

function cleanLineContent(content) {
  let s = content;

  // 1. Literal em dashes (—) and en dashes (–)
  s = s.replace(/\s*[\u2014\u2013]\s*(and|but|or|so|yet|while|whereas|although|because)\b/gi, ', $1');
  s = s.replace(/\s*[\u2014\u2013]\s*(it\'s|its|they|this|that|there|here|these|those)\b/gi, ': $1');
  s = s.replace(/\s*[\u2014\u2013]\s*(which|where|when|who|whose|whom)\b/gi, ', $1');
  s = s.replace(/\s*[\u2014\u2013]\s*(including|especially|specifically|namely)\b/gi, ', $1');
  s = s.replace(/\s*[\u2014\u2013]\s*/g, ', ');

  // 2. Double hyphens used as dashes: e.g. "word--word" or "word -- word"
  s = s.replace(/([^\-\s])\s*--\s*(and|but|or|so|yet|while|whereas|although|because)\b/gi, '$1, $2');
  s = s.replace(/([^\-\s])\s*--\s*(it\'s|its|they|this|that|there|here|these|those)\b/gi, '$1: $2');
  s = s.replace(/([^\-\s])\s*--\s*(which|where|when|who|whose|whom)\b/gi, '$1, $2');
  s = s.replace(/([^\-\s])\s*--\s*(including|especially|specifically|namely)\b/gi, '$1, $2');
  s = s.replace(/([^\-\s])\s*--\s*([^\-\s])/g, '$1, $2');

  // 3. Spaced hyphens: "word - word"
  s = s.replace(/[ \t]+-[ \t]+(and|but|or|so|yet|while|whereas|although|because)\b/gi, ', $1');
  s = s.replace(/[ \t]+-[ \t]+(it\'s|its|they|this|that|there|here|these|those)\b/gi, ': $1');
  s = s.replace(/[ \t]+-[ \t]+(which|where|when|who|whose|whom)\b/gi, ', $1');
  s = s.replace(/[ \t]+-[ \t]+(including|especially|specifically|namely)\b/gi, ', $1');
  s = s.replace(/([^\s\-])[ \t]+-[ \t]+([^\s\-])/g, '$1, $2');

  // 4. Clean up spaces before punctuation
  s = s.replace(/\s+([,;:])/g, '$1');

  // 5. Clean up duplicate punctuation
  s = s.replace(/,\s*,/g, ',');
  s = s.replace(/,\s*;/g, ';');
  s = s.replace(/;\s*,/g, ';');
  s = s.replace(/,\s*:/g, ':');
  s = s.replace(/:\s*,/g, ':');
  s = s.replace(/\s*,\s*\./g, '.');
  s = s.replace(/\s*:\s*\./g, '.');
  s = s.replace(/,\s*\?/g, '?');
  s = s.replace(/,\s*!/g, '!');

  return s;
}

function removeEmDashes(text) {
  if (!text) return '';

  const lines = text.split(/\r?\n/);
  const cleanedLines = lines.map(line => {
    // Preserve frontmatter and horizontal rules
    if (/^---+\s*$/.test(line) || /^\*\*\*+\s*$/.test(line) || /^___+\s*$/.test(line)) {
      return line;
    }

    // Unordered lists (- item, * item, • item)
    const listMatch = line.match(/^([ \t]*[-*•]\s+)(.*)$/);
    if (listMatch) {
      return listMatch[1] + cleanLineContent(listMatch[2]);
    }

    // Numbered lists (1. item)
    const numMatch = line.match(/^([ \t]*\d+\.\s+)(.*)$/);
    if (numMatch) {
      return numMatch[1] + cleanLineContent(numMatch[2]);
    }

    // Headers (# Header)
    const headerMatch = line.match(/^([ \t]*#{1,6}\s+)(.*)$/);
    if (headerMatch) {
      return headerMatch[1] + cleanLineContent(headerMatch[2]);
    }

    return cleanLineContent(line);
  });

  return cleanedLines.join('\n');
}

function cleanMarkdownFounder(rawText) {
  let text = rawText;
  const headerMatch = text.match(/^(?:#\s*Blog\s*\d+\s*of\s*\d+\s*)?---\n[\s\S]*?\n---\s*/i);
  if (headerMatch) {
    text = text.substring(headerMatch[0].length);
  } else {
    const standardMatch = text.match(/^---\n[\s\S]*?\n---\s*/);
    if (standardMatch) text = text.substring(standardMatch[0].length);
  }

  text = text.replace(/^\s*#\s+[^\n]+\n+/, '');

  // 1. Resolve all [Internal link: ...] placeholders
  text = text.replace(/\[Internal link:\s*([^\]]+)\]/gi, (match, inner) => {
    const parts = inner.split(/\s*-\s*/);
    const desc = (parts[0] || '').toLowerCase();
    const anchor = (parts[1] || parts[0]).trim();
    let url = 'https://rankursite.com/services?utm_source=medium&utm_medium=article&utm_campaign=internal_link';
    if (desc.includes('audit') || desc.includes('consultation')) {
      url = 'https://rankursite.com/free-audit?utm_source=medium&utm_medium=article&utm_campaign=internal_audit';
    } else if (desc.includes('react') || desc.includes('saas') || desc.includes('redesign')) {
      url = 'https://rankursite.com/saas-websites?utm_source=medium&utm_medium=article&utm_campaign=internal_saas';
    } else if (desc.includes('case')) {
      url = 'https://rankursite.com/case-studies?utm_source=medium&utm_medium=article&utm_campaign=internal_cases';
    } else if (desc.includes('contact')) {
      url = 'https://rankursite.com/contact?utm_source=medium&utm_medium=article&utm_campaign=internal_contact';
    } else if (desc.includes('about')) {
      url = 'https://rankursite.com/about?utm_source=medium&utm_medium=article&utm_campaign=internal_about';
    }
    return `[${anchor}](${url})`;
  });

  // 2. Resolve all [External link: ...] placeholders
  text = text.replace(/\[External link:\s*([^\]]+)\]/gi, (match, inner) => {
    const parts = inner.split(/\s*-\s*/);
    const source = parts[1] || parts[0];
    return `**${source.trim()}**`;
  });

  // 3. 1st-person Founder Voice
  text = text.replace(/##\s*How Moksh Can Help/gi, '## How I Help B2B Founders (Rankur Engineering)');
  text = text.replace(/Moksh is a freelance B2B growth consultant who specializes in/gi, 'As the founder of Rankur, I specialize in');
  text = text.replace(/Moksh is a freelance B2B growth consultant/gi, 'I am a B2B web engineer and founder of Rankur');
  text = text.replace(/Moksh works with/gi, 'I work directly with');
  text = text.replace(/Moksh combines/gi, 'I combine');
  text = text.replace(/Moksh builds/gi, 'I engineer');
  text = text.replace(/Moksh delivers/gi, 'I deliver');
  text = text.replace(/Moksh provides/gi, 'I provide');
  text = text.replace(/Moksh conducts/gi, 'I conduct');
  text = text.replace(/Moksh offers/gi, 'I offer');
  text = text.replace(/where he reviews/gi, 'where I personally review');
  text = text.replace(/where he assesses/gi, 'where I assess');
  text = text.replace(/where he'll assess/gi, 'where I will assess');
  text = text.replace(/whether you work together or not/gi, 'whether we end up working together or not');
  text = text.replace(/book a free 30-minute growth audit with Moksh/gi, 'book a free 30-minute growth audit with me at [Rankur Free Audit](https://rankursite.com/free-audit)');
  text = text.replace(/a free 30-minute growth audit with Moksh/gi, 'a free 30-minute growth audit with me at [Rankur](https://rankursite.com/free-audit)');
  text = text.replace(/booking a free 30-minute growth audit with Moksh/gi, 'booking a free 30-minute growth audit with me at [Rankur](https://rankursite.com/free-audit)');
  text = text.replace(/with Moksh/gi, 'with me at [Rankur](https://rankursite.com)');
  text = text.replace(/at freelance rates, not agency overhead/gi, 'with direct founder accountability, zero agency overhead, and a 100% money-back guarantee');

  // Fix legacy metrics and references
  text = text.replace(/The\s+Probiota\s*Innovations\s*case\s*study/gi, 'Our enterprise B2B case study');
  text = text.replace(/The\s+Probiota\s*Innovations/gi, 'Our B2B enterprise client');
  text = text.replace(/Probiota\s*Innovations/gi, 'our B2B enterprise client');
  text = text.replace(/The\s+our\s+B2B/gi, 'Our B2B');
  text = text.replace(/1\.5\s*hours?/gi, '7 days');

  // 4. Remove all em dashes and mid-sentence hyphens
  text = removeEmDashes(text);

  return text.trim();
}

async function run() {
  console.log('Building Medium articles library (em-dash-free human voice)...');
  
  let masterMdContent = `# Rankur B2B Web Engineering & Growth: Medium Content Library
**30 Ready-to-Publish Authoritative Articles with Canonical Tags & Contextual Backlinks**

> **Author Byline:** Written by **Moksh Parjapati**, Founder & B2B Growth Engineer at [Rankur](https://rankursite.com)
> **Canonical Target Domain:** \`https://rankursite.com/blog/[slug]\`
> **Tone:** Authentic, technical first-person founder perspective. Zero em dashes. Zero 3rd-person phrasing.

---
`;

  let catalogRows = [];

  for (let i = 0; i < selectedSlugs.length; i++) {
    const item = selectedSlugs[i];
    const postIndex = blogsIndex.find(b => b.slug === item.slug);
    if (!postIndex) continue;

    const mdFile = path.join(blogsDir, postIndex.filename);
    if (!fs.existsSync(mdFile)) continue;

    const rawContent = fs.readFileSync(mdFile, 'utf-8');
    const cleanedBody = cleanMarkdownFounder(rawContent);

    const articleNumber = String(i + 1).padStart(2, '0');
    const imageNameBase = `article-${articleNumber}-${item.slug}`;
    const webpImageName = `${imageNameBase}.webp`;
    const jpegImageName = `${imageNameBase}.jpeg`;
    
    const sourceWebp = path.join(publicImagesDir, `prompt-${i + 1}.webp`);
    const targetWebp = path.join(mediumPostsDir, webpImageName);
    const targetJpeg = path.join(mediumPostsDir, jpegImageName);

    if (fs.existsSync(sourceWebp)) {
      fs.copyFileSync(sourceWebp, targetWebp);
      try {
        await sharp(sourceWebp).jpeg({ quality: 90 }).toFile(targetJpeg);
      } catch (err) {
        console.warn(`Could not convert ${webpImageName} to jpeg:`, err.message);
      }
    }

    const canonicalUrl = `https://rankursite.com/blog/${item.slug}`;
    const tagsString = item.tags.join(', ');

    catalogRows.push(`| **Article ${i + 1}** | ${postIndex.title} | [\`.webp\`](${webpImageName}) • [\`.jpeg\`](${jpegImageName}) | [\`${item.slug}\`](${canonicalUrl}) |`);

    masterMdContent += `\n## Article ${i + 1}: ${postIndex.title}\n\n`;
    masterMdContent += `**Medium Title:** ${postIndex.title}\n\n`;
    masterMdContent += `**Cover Image File:** \`medium posts/${webpImageName}\` (or \`${jpegImageName}\`)\n\n`;
    masterMdContent += `**Tags:** ${tagsString}\n\n`;
    masterMdContent += `**Canonical URL:** ${canonicalUrl}\n\n`;
    masterMdContent += `**Author Byline:** Written by **Moksh Parjapati**, Founder & B2B Web Engineer at [Rankur](https://rankursite.com?utm_source=medium&utm_medium=author_bio&utm_campaign=article_${articleNumber})\n\n`;
    masterMdContent += `### Article Content\n\n`;
    masterMdContent += cleanedBody;
    masterMdContent += `\n\n---\n\n`;
    masterMdContent += `### Executive Key Takeaways & Action Steps\n`;
    masterMdContent += `1. **Audit Technical Friction:** Test your website with [Rankur Free B2B Website Audit](https://rankursite.com/free-audit?utm_source=medium&utm_medium=article&utm_campaign=article_${articleNumber}_takeaway) to identify sub-second performance drops and demo leaks.\n`;
    masterMdContent += `2. **Shift to High-Converting Architecture:** Replace bloated templates with a custom React/Next.js foundation engineered for commercial pipeline. Learn more at [Rankur SaaS Web Systems](https://rankursite.com/saas-websites?utm_source=medium&utm_medium=article&utm_campaign=article_${articleNumber}_saas).\n`;
    masterMdContent += `3. **Align Pipeline with Search Intent:** Ensure your technical SEO, schema architecture, and value proposition speak directly to enterprise buyers.\n\n`;
    masterMdContent += `👉 **Read the original technical analysis and book a founder consultation with me:**\n`;
    masterMdContent += `[https://rankursite.com/blog/${item.slug}](${canonicalUrl}?utm_source=medium&utm_medium=syndication&utm_campaign=article_${articleNumber})\n\n`;
    masterMdContent += `---\n\n`;
  }

  fs.writeFileSync(outputFile, masterMdContent, 'utf-8');
  console.log(`Saved master library to: ${outputFile}`);

  // Mirror to root
  fs.writeFileSync(path.resolve(__dirname, '../../RANKUR_MEDIUM_POSTS.md'), masterMdContent, 'utf-8');
  console.log('Mirrored master library to workspace root.');

  let catalogContent = `# 📸 Rankur Medium Post Image Catalog & Publishing Assets
**30 High-Resolution SEO-Optimized Cover Assets for Medium & Cross-Platform Syndication**

| Article # | Title | Media Assets | Original Blog Canonical URL |
| :--- | :--- | :--- | :--- |
${catalogRows.join('\n')}

---

## 🚀 How to Publish on Medium:
1. Open your **Medium Story Editor** (logged in as **Moksh Parjapati**).
2. Paste the **Medium Title** at the very top.
3. Press \`Enter\` directly under the title.
4. Click the \`+\` button $\\rightarrow$ Click the **Camera/Upload** icon.
5. Select either the \`.webp\` or \`.jpeg\` for that article from this \`medium posts/\` folder.
6. Paste the article body content.
7. Click the three dots (\`...\`) in the top right $\\rightarrow$ **More settings** $\\rightarrow$ **Advanced Settings**:
   * Check **"This story was originally published elsewhere"**.
   * Paste the **Canonical URL** for that article from the table above.
8. Click **Publish**:
   * Add the 5 designated **Tags** from the article specification.
   * Click **Publish now**.
`;

  fs.writeFileSync(imageCatalogFile, catalogContent, 'utf-8');
  console.log(`Saved image catalog to: ${imageCatalogFile}`);
}

run().catch(console.error);
