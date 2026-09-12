import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogsIndex = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/blogs-index.json'), 'utf-8'));
const blogsDir = path.resolve(__dirname, '../blogs');
const mediumPostsDir = path.resolve(__dirname, '../medium posts');
const prototypeDir = path.resolve(__dirname, '..');
const rootDir = path.resolve(__dirname, '../..');

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

function formatInline(text) {
  let s = text;
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  return s;
}

function mdToHtml(md) {
  if (!md) return '';
  const lines = md.split(/\r?\n/);
  let html = [];
  let inUl = false;
  let inOl = false;

  for (let rawLine of lines) {
    let line = rawLine.trim();

    if (!line) {
      if (inUl) { html.push('</ul>'); inUl = false; }
      if (inOl) { html.push('</ol>'); inOl = false; }
      continue;
    }

    if (line === '---' || line === '***') {
      if (inUl) { html.push('</ul>'); inUl = false; }
      if (inOl) { html.push('</ol>'); inOl = false; }
      html.push('<hr style="border:0; border-top:1px solid #334155; margin:24px 0;" />');
      continue;
    }

    if (line.startsWith('#### ')) {
      if (inUl) { html.push('</ul>'); inUl = false; }
      if (inOl) { html.push('</ol>'); inOl = false; }
      html.push(`<h4>${formatInline(line.slice(5))}</h4>`);
      continue;
    }
    if (line.startsWith('### ')) {
      if (inUl) { html.push('</ul>'); inUl = false; }
      if (inOl) { html.push('</ol>'); inOl = false; }
      html.push(`<h3>${formatInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      if (inUl) { html.push('</ul>'); inUl = false; }
      if (inOl) { html.push('</ol>'); inOl = false; }
      html.push(`<h2>${formatInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      if (inUl) { html.push('</ul>'); inUl = false; }
      if (inOl) { html.push('</ol>'); inOl = false; }
      html.push(`<h1>${formatInline(line.slice(2))}</h1>`);
      continue;
    }

    const olMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      if (inUl) { html.push('</ul>'); inUl = false; }
      if (!inOl) { html.push('<ol style="margin-left:24px; margin-bottom:16px;">'); inOl = true; }
      html.push(`<li style="margin-bottom:8px;">${formatInline(olMatch[2])}</li>`);
      continue;
    }

    const ulMatch = line.match(/^[-*•]\s+(.+)$/);
    if (ulMatch) {
      if (inOl) { html.push('</ol>'); inOl = false; }
      if (!inUl) { html.push('<ul style="margin-left:24px; margin-bottom:16px;">'); inUl = true; }
      html.push(`<li style="margin-bottom:8px;">${formatInline(ulMatch[1])}</li>`);
      continue;
    }

    if (inUl) { html.push('</ul>'); inUl = false; }
    if (inOl) { html.push('</ol>'); inOl = false; }

    html.push(`<p style="margin-bottom:16px; line-height:1.7;">${formatInline(line)}</p>`);
  }

  if (inUl) html.push('</ul>');
  if (inOl) html.push('</ol>');

  return html.join('\n');
}

function resolveLinks(text) {
  let s = text;
  // Resolve [Internal link: ...]
  s = s.replace(/\[Internal link:\s*([^\]]+)\]/gi, (match, inner) => {
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

  // Resolve [External link: ...]
  s = s.replace(/\[External link:\s*([^\]]+)\]/gi, (match, inner) => {
    const parts = inner.split(/\s*-\s*/);
    const source = parts[1] || parts[0];
    return `**${source.trim()}**`;
  });

  return s;
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
  text = resolveLinks(text);

  // 1st-person Founder Voice
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

  text = text.replace(/The\s+Probiota\s*Innovations\s*case\s*study/gi, 'Our enterprise B2B case study');
  text = text.replace(/The\s+Probiota\s*Innovations/gi, 'Our B2B enterprise client');
  text = text.replace(/Probiota\s*Innovations/gi, 'our B2B enterprise client');
  text = text.replace(/The\s+our\s+B2B/gi, 'Our B2B');
  text = text.replace(/1\.5\s*hours?/gi, '7 days');

  // Remove em dashes and spaced hyphens
  text = removeEmDashes(text);

  return text.trim();
}

function cleanMarkdownBrand(rawText) {
  let text = rawText;
  const headerMatch = text.match(/^(?:#\s*Blog\s*\d+\s*of\s*\d+\s*)?---\n[\s\S]*?\n---\s*/i);
  if (headerMatch) {
    text = text.substring(headerMatch[0].length);
  } else {
    const standardMatch = text.match(/^---\n[\s\S]*?\n---\s*/);
    if (standardMatch) text = text.substring(standardMatch[0].length);
  }

  text = text.replace(/^\s*#\s+[^\n]+\n+/, '');
  text = resolveLinks(text);

  // Authoritative Agency Voice
  text = text.replace(/##\s*How Moksh Can Help/gi, '## How Rankur Helps B2B & SaaS Teams');
  text = text.replace(/Moksh is a freelance B2B growth consultant who specializes in/gi, 'Rankur is an engineering-first B2B web development studio specializing in');
  text = text.replace(/Moksh is a freelance B2B growth consultant/gi, 'Rankur is an enterprise B2B web engineering agency');
  text = text.replace(/Moksh works with/gi, 'Our engineering team works directly with');
  text = text.replace(/Moksh combines/gi, 'We combine');
  text = text.replace(/Moksh builds/gi, 'We build');
  text = text.replace(/Moksh delivers/gi, 'Rankur delivers');
  text = text.replace(/Moksh provides/gi, 'We provide');
  text = text.replace(/Moksh conducts/gi, 'We conduct');
  text = text.replace(/Moksh offers/gi, 'We offer');
  text = text.replace(/where he reviews/gi, 'where our engineering team reviews');
  text = text.replace(/where he assesses/gi, 'where we assess');
  text = text.replace(/where he'll assess/gi, 'where we assess');
  text = text.replace(/whether you work together or not/gi, 'whether you choose to partner with us or not');
  text = text.replace(/book a free 30-minute growth audit with Moksh/gi, 'request a free B2B website audit at [Rankur Free Audit](https://rankursite.com/free-audit)');
  text = text.replace(/a free 30-minute growth audit with Moksh/gi, 'a free B2B website audit with our team at [Rankur](https://rankursite.com/free-audit)');
  text = text.replace(/booking a free 30-minute growth audit with Moksh/gi, 'requesting a free growth audit with [Rankur](https://rankursite.com/free-audit)');
  text = text.replace(/with Moksh/gi, 'with our engineering team at [Rankur](https://rankursite.com)');
  text = text.replace(/at freelance rates, not agency overhead/gi, 'with transparent sprint pricing, zero agency bloat, and a 100% money-back guarantee');

  text = text.replace(/The\s+Probiota\s*Innovations\s*case\s*study/gi, 'Our enterprise B2B case study');
  text = text.replace(/The\s+Probiota\s*Innovations/gi, 'Our B2B enterprise client');
  text = text.replace(/Probiota\s*Innovations/gi, 'our B2B enterprise client');
  text = text.replace(/The\s+our\s+B2B/gi, 'Our B2B');
  text = text.replace(/1\.5\s*hours?/gi, '7 days');

  // Remove em dashes and spaced hyphens
  text = removeEmDashes(text);

  return text.trim();
}

function getArticlesData(isFounder) {
  const list = [];
  for (let i = 0; i < selectedSlugs.length; i++) {
    const item = selectedSlugs[i];
    const postIndex = blogsIndex.find(b => b.slug === item.slug);
    if (!postIndex) continue;

    const mdFile = path.join(blogsDir, postIndex.filename);
    if (!fs.existsSync(mdFile)) continue;

    const raw = fs.readFileSync(mdFile, 'utf-8');
    const cleanMd = isFounder ? cleanMarkdownFounder(raw) : cleanMarkdownBrand(raw);
    const richHtml = mdToHtml(cleanMd);

    const articleNumber = String(i + 1).padStart(2, '0');
    const imageNameBase = `article-${articleNumber}-${item.slug}`;
    const webpFile = `${imageNameBase}.webp`;
    const jpegFile = `${imageNameBase}.jpeg`;
    
    const webpAbsPath = path.join(mediumPostsDir, webpFile);
    const jpegAbsPath = path.join(mediumPostsDir, jpegFile);

    list.push({
      id: i + 1,
      title: postIndex.title,
      slug: item.slug,
      tags: item.tags,
      tagList: item.tags,
      canonicalUrl: `https://rankursite.com/blog/${item.slug}`,
      webpFile,
      jpegFile,
      webpAbsPath,
      jpegAbsPath,
      cleanMarkdown: cleanMd,
      richHtml,
      wordCount: cleanMd.split(/\s+/).length
    });
  }
  return list;
}

function buildDashboardHtml(mode) {
  const isFounder = mode === 'founder';
  const pageTitle = isFounder 
    ? 'Moksh Parjapati: Founder Medium Publisher & Pipeline Hub'
    : 'Rankur Official: Brand Medium Publisher & SEO Authority Hub';
  const profileName = isFounder ? 'Moksh Parjapati' : 'Rankur';
  const profileHandle = isFounder ? '@mokshparjapati' : '@rankursite';
  const profileRole = isFounder ? 'Founder & B2B Growth Engineer' : 'Official Enterprise Agency';
  const otherHtml = isFounder ? 'brand_medium_publisher.html' : 'founder_medium_publisher.html';
  const otherLabel = isFounder ? 'Switch to Brand Publisher (Rankur)' : 'Switch to Founder Publisher (Moksh)';
  
  const bioText = isFounder 
    ? 'Founder at @rankursite (rankursite.com). Engineering high-converting React engines & B2B growth systems for founders scaling inbound pipeline.'
    : 'Official Medium hub for Rankur (rankursite.com). Custom React web engineering, technical SEO architecture, and conversion engines for B2B enterprises.';

  const hookIntroHtml = isFounder
    ? `<p><em>In enterprise B2B sales and SaaS growth, your website is either generating qualified pipeline or quietly bleeding revenue. Below is my engineering breakdown of what actually converts.</em></p><hr style="border:0; border-top:1px solid #334155; margin:24px 0;" />`
    : `<p><em>Published by Rankur Web Systems (rankursite.com). A technical analysis of conversion rate optimization, Core Web Vitals dominance, and B2B organic lead generation.</em></p><hr style="border:0; border-top:1px solid #334155; margin:24px 0;" />`;

  const footerSignatureHtml = isFounder
    ? `<hr style="border:0; border-top:1px solid #334155; margin:28px 0;" /><p><strong>Written by Moksh Parjapati</strong>, Founder &amp; B2B Growth Engineer at <a href="https://rankursite.com?utm_source=medium&utm_medium=author_bio" target="_blank" rel="noopener">Rankur</a>. Get a free engineering audit of your website speed and demo conversion leaks with me at <a href="https://rankursite.com/free-audit?utm_source=medium&utm_medium=author_audit" target="_blank" rel="noopener">rankursite.com/free-audit</a>.</p>`
    : `<hr style="border:0; border-top:1px solid #334155; margin:28px 0;" /><p><strong>About Rankur</strong>: We build custom React &amp; Next.js digital platforms engineered for sub-second speeds and commercial conversion. Explore our B2B SaaS web systems at <a href="https://rankursite.com/saas-websites?utm_source=medium&utm_medium=brand_bio" target="_blank" rel="noopener">rankursite.com/saas-websites</a>.</p>`;

  const articlesData = getArticlesData(isFounder);
  const serializedArticles = JSON.stringify(articlesData).replace(/<\/script>/gi, '<\\/script>');
  const serializedFolder = JSON.stringify(mediumPostsDir);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0A0A0A;
      --card-bg: #121214;
      --card-border: #222226;
      --primary: #C9A84C;
      --primary-hover: #dfbc55;
      --primary-glow: rgba(201, 168, 76, 0.35);
      --accent: #10B981;
      --accent-glow: rgba(16, 185, 129, 0.25);
      --amber: #F59E0B;
      --medium-green: #00AB6C;
      --text-main: #FFFFFF;
      --text-muted: #A1A1AA;
      --text-sub: #71717A;
      --border-subtle: #27272A;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
    body { background-color: var(--bg); color: var(--text-main); padding: 24px; min-height: 100vh; line-height: 1.5; }
    .container { max-width: 1400px; margin: 0 auto; }

    /* HEADER */
    header {
      background: linear-gradient(135deg, #121214 0%, #1A1A1E 100%);
      border: 1px solid var(--card-border);
      border-radius: 20px;
      padding: 24px 30px;
      margin-bottom: 24px;
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .header-left { display: flex; align-items: center; gap: 16px; }
    .profile-avatar {
      width: 58px; height: 58px; border-radius: 14px;
      border: 2px solid var(--primary);
      box-shadow: 0 0 16px var(--primary-glow);
      object-fit: cover;
      background: #18181B;
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 24px; color: var(--primary);
    }
    .header-info h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.5px; display: flex; align-items: center; gap: 10px; }
    .badge {
      background: linear-gradient(135deg, #C9A84C, #A78428);
      color: #000; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .badge.green { background: linear-gradient(135deg, #00AB6C, #059669); color: #fff; }
    .header-info p { font-size: 13px; color: var(--text-muted); margin-top: 4px; }

    .header-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .btn-top {
      background: #1E1E24; border: 1px solid #333338; color: var(--text-main);
      padding: 9px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer;
      transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;
    }
    .btn-top:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-1px); }
    .btn-top.btn-switch { background: rgba(201, 168, 76, 0.12); border-color: var(--primary); color: var(--primary); }
    .btn-top.btn-editor { background: linear-gradient(135deg, #00AB6C, #047857); color: white; border: none; }
    .btn-top.btn-editor:hover { filter: brightness(1.1); transform: translateY(-1px); }

    /* CONTROLS BAR */
    .controls-bar {
      background: var(--card-bg); border: 1px solid var(--card-border);
      border-radius: 16px; padding: 18px 24px; margin-bottom: 24px;
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;
    }
    .search-box { position: relative; flex: 1; max-width: 380px; }
    .search-box input {
      width: 100%; background: #0A0A0C; border: 1px solid #27272A;
      color: #fff; padding: 10px 14px 10px 36px; border-radius: 10px; font-size: 13px; outline: none;
    }
    .search-box input:focus { border-color: var(--primary); }
    .search-box svg { position: absolute; left: 12px; top: 12px; width: 14px; height: 14px; fill: var(--text-sub); }

    .filters-group { display: flex; gap: 8px; flex-wrap: wrap; }
    .filter-btn {
      background: #18181B; border: 1px solid #27272A; color: var(--text-muted);
      padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s;
    }
    .filter-btn:hover { color: #fff; border-color: #3F3F46; }
    .filter-btn.active { background: var(--primary); color: #000; border-color: var(--primary); font-weight: 700; }

    .options-group { display: flex; align-items: center; gap: 18px; }
    .toggle-label { font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 6px; cursor: pointer; font-weight: 600; }

    /* STATS ROW */
    .stats-row {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;
    }
    .stat-card {
      background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 14px; padding: 16px 20px;
    }
    .stat-label { font-size: 11px; text-transform: uppercase; color: var(--text-sub); font-weight: 700; letter-spacing: 0.5px; }
    .stat-value { font-size: 24px; font-weight: 800; color: var(--text-main); margin-top: 4px; }
    .stat-value.gold { color: var(--primary); }
    .stat-value.green { color: var(--accent); }
    .stat-value.amber { color: var(--amber); }

    /* ARTICLE CARDS */
    .article-card {
      background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 16px;
      padding: 24px; margin-bottom: 20px; transition: all 0.2s ease;
    }
    .article-card:hover { border-color: #383842; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); }
    .article-card.status-published { border-left: 4px solid var(--accent); }
    .article-card.status-scheduled { border-left: 4px solid var(--amber); }
    .article-card.status-pending { border-left: 4px solid var(--primary); }

    .card-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 12px; }
    .card-id-badge {
      display: inline-block; font-size: 11px; font-weight: 700; color: var(--primary);
      background: rgba(201, 168, 76, 0.12); padding: 3px 8px; border-radius: 6px; margin-bottom: 6px;
    }
    .article-title { font-size: 18px; font-weight: 700; color: #fff; line-height: 1.4; }

    .status-badge {
      font-size: 11px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; letter-spacing: 0.5px;
    }
    .status-badge.pending { background: rgba(201, 168, 76, 0.15); color: var(--primary); border: 1px solid rgba(201, 168, 76, 0.3); }
    .status-badge.scheduled { background: rgba(245, 158, 11, 0.15); color: var(--amber); border: 1px solid rgba(245, 158, 11, 0.3); }
    .status-badge.published { background: rgba(16, 185, 129, 0.15); color: var(--accent); border: 1px solid rgba(16, 185, 129, 0.3); }

    .meta-row {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 18px;
      font-size: 12px; color: var(--text-muted); border-bottom: 1px solid #1C1C20; padding-bottom: 14px;
    }
    .tag-chip {
      background: #18181B; border: 1px solid #27272A; color: #D4D4D8;
      padding: 3px 9px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 600;
      transition: all 0.15s;
    }
    .tag-chip:hover { border-color: var(--primary); color: var(--primary); }

    /* ACTION BUTTONS */
    .card-actions {
      display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 18px;
    }
    .btn-act {
      background: #18181B; border: 1px solid #2C2C32; color: #fff;
      padding: 9px 14px; border-radius: 9px; font-size: 12px; font-weight: 600; cursor: pointer;
      display: inline-flex; align-items: center; gap: 7px; transition: all 0.15s;
    }
    .btn-act:hover { background: #222228; border-color: var(--primary); color: var(--primary); transform: translateY(-1px); }
    .btn-act.btn-story {
      background: linear-gradient(135deg, #C9A84C, #A78428); color: #000; border: none; font-weight: 700;
      box-shadow: 0 4px 14px rgba(201, 168, 76, 0.3);
    }
    .btn-act.btn-story:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .btn-act.btn-canonical { border-color: #3B82F6; color: #93C5FD; background: rgba(59, 130, 246, 0.1); }
    .btn-act.btn-canonical:hover { background: rgba(59, 130, 246, 0.2); }
    .btn-act.btn-img { border-color: #10B981; color: #6EE7B7; background: rgba(16, 185, 129, 0.1); }
    .btn-act.btn-img:hover { background: rgba(16, 185, 129, 0.2); }
    .btn-act.btn-med { border-color: #00AB6C; color: #6EE7B7; background: rgba(0, 171, 108, 0.1); }

    /* CARD FOOTER */
    .card-bottom {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
      padding-top: 14px; border-top: 1px solid #1C1C20;
    }
    .status-select {
      background: #0A0A0C; border: 1px solid #27272A; color: #fff;
      padding: 6px 12px; border-radius: 8px; font-size: 12px; outline: none; cursor: pointer;
    }
    .date-input {
      background: #0A0A0C; border: 1px solid #27272A; color: #fff;
      padding: 5px 10px; border-radius: 8px; font-size: 12px; outline: none; margin-left: 8px;
    }
    .btn-toggle-prev {
      background: none; border: none; color: var(--text-sub); font-size: 12px; font-weight: 600; cursor: pointer;
    }
    .btn-toggle-prev:hover { color: var(--text-main); text-decoration: underline; }

    /* PREVIEW DRAWER */
    .preview-box {
      display: none; background: #0A0A0C; border: 1px solid #27272A; border-radius: 12px;
      padding: 24px; margin-top: 16px; font-size: 14px; line-height: 1.7; color: #D4D4D8;
      max-height: 500px; overflow-y: auto;
    }
    .preview-box h1, .preview-box h2, .preview-box h3 { color: #fff; margin: 18px 0 10px; }
    .preview-box a { color: var(--primary); }

    /* TOAST NOTIFICATION */
    #toast {
      position: fixed; bottom: 30px; right: 30px; background: linear-gradient(135deg, #18181B, #27272A);
      border: 1px solid var(--primary); color: #fff; padding: 14px 22px; border-radius: 12px;
      font-size: 13px; font-weight: 600; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
      display: none; z-index: 9999; animation: slideIn 0.25s ease;
    }
    @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  </style>
</head>
<body>

<div class="container">
  <!-- HEADER -->
  <header>
    <div class="header-left">
      ${isFounder 
        ? `<div class="profile-avatar">M</div>`
        : `<img src="/public/logo-square-dark.png" class="profile-avatar" onerror="this.src='/Copilot_20260621_183745.png'" alt="Rankur Logo" />`
      }
      <div class="header-info">
        <h1>${profileName} <span class="badge ${isFounder ? '' : 'green'}">${profileRole}</span></h1>
        <p>Active Profile: <strong>${profileHandle}</strong> • Direct 1-Click Publishing Hub for Medium (DA 95)</p>
      </div>
    </div>
    <div class="header-actions">
      <button class="btn-top" onclick="copyBio()">📋 Copy Bio Text</button>
      <button class="btn-top" onclick="copyFolder()">📁 Copy Images Folder</button>
      <a href="${otherHtml}" class="btn-top btn-switch">🔄 ${otherLabel}</a>
      <a href="https://medium.com/new-story" target="_blank" rel="noopener" class="btn-top btn-editor">✍️ Open Medium Editor</a>
    </div>
  </header>

  <!-- CONTROLS BAR -->
  <div class="controls-bar">
    <div class="search-box">
      <svg viewBox="0 0 24 24"><path d="M21.71 20.29l-5.4-5.4a8 8 0 10-1.42 1.42l5.4 5.4a1 1 0 001.42-1.42zM4 10a6 6 0 116 6 6 6 0 01-6-6z"/></svg>
      <input type="text" id="search-input" placeholder="Search 30 articles by title, keyword, or tag..." oninput="filterArticles()" />
    </div>

    <div class="filters-group">
      <button class="filter-btn active" onclick="setFilter('all', this)">All (30)</button>
      <button class="filter-btn" onclick="setFilter('pending', this)">Pending (<span id="count-pending">30</span>)</button>
      <button class="filter-btn" onclick="setFilter('scheduled', this)">Scheduled (<span id="count-sched">0</span>)</button>
      <button class="filter-btn" onclick="setFilter('published', this)">Published (<span id="count-pub">0</span>)</button>
    </div>

    <div class="options-group">
      <label class="toggle-label">
        <input type="checkbox" id="toggle-hook" checked> Include ${isFounder ? 'Founder' : 'Brand'} Intro Hook
      </label>
      <label class="toggle-label">
        <input type="checkbox" id="toggle-signature" checked> Include Signature CTA
      </label>
    </div>
  </div>

  <!-- STATS ROW -->
  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-label">Total Articles</div>
      <div class="stat-value">30</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Pending Posting</div>
      <div class="stat-value gold" id="stat-pending">30</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Scheduled</div>
      <div class="stat-value amber" id="stat-sched">0</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Live on Medium</div>
      <div class="stat-value green" id="stat-pub">0</div>
    </div>
  </div>

  <!-- ARTICLES CONTAINER -->
  <div id="articles-container"></div>
</div>

<div id="toast"></div>

<script>
  const ARTICLES = ${serializedArticles};
  const IS_FOUNDER = ${isFounder};
  const BIO_TEXT = \`${bioText}\`;
  const IMAGES_FOLDER = ${serializedFolder};
  const HOOK_HTML = \`${hookIntroHtml}\`;
  const FOOTER_HTML = \`${footerSignatureHtml}\`;

  const STORAGE_KEY = IS_FOUNDER ? 'rankur_medium_founder_state' : 'rankur_medium_brand_state';
  let articleState = {};
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) articleState = JSON.parse(saved);
  } catch(e) {}

  let currentFilter = 'all';

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 3000);
  }

  function copyText(str, label) {
    navigator.clipboard.writeText(str).then(() => {
      showToast('✓ ' + label + ' copied to clipboard!');
    }).catch(() => {
      prompt('Copy manually:', str);
    });
  }

  function copyBio() {
    copyText(BIO_TEXT, 'Profile Bio');
  }

  function copyFolder() {
    copyText(IMAGES_FOLDER, 'Images Folder Path');
  }

  function copyArticleTitle(id) {
    const a = ARTICLES.find(x => x.id === id);
    if (a) copyText(a.title, 'Article Title');
  }

  function copyArticleTags(id) {
    const a = ARTICLES.find(x => x.id === id);
    if (a) copyText(a.tags.join(', '), 'Tags');
  }

  function copyArticleCanonical(id) {
    const a = ARTICLES.find(x => x.id === id);
    if (a) copyText(a.canonicalUrl, 'Canonical URL');
  }

  function copyArticleWebpPath(id) {
    const a = ARTICLES.find(x => x.id === id);
    if (a) copyText(a.webpAbsPath, 'WebP File Path');
  }

  function copyArticleJpegPath(id) {
    const a = ARTICLES.find(x => x.id === id);
    if (a) copyText(a.jpegAbsPath, 'JPEG File Path');
  }

  function copyRichStory(id) {
    const a = ARTICLES.find(x => x.id === id);
    if (!a) return;

    const includeHook = document.getElementById('toggle-hook').checked;
    const includeSig = document.getElementById('toggle-signature').checked;

    let fullHtml = '';
    let fullText = '';

    if (includeHook) {
      fullHtml += HOOK_HTML;
      fullText += (IS_FOUNDER 
        ? "In enterprise B2B sales and SaaS growth, your website is either generating qualified pipeline or quietly bleeding revenue. Below is my engineering breakdown of what actually converts.\\n\\n"
        : "Published by Rankur Web Systems (rankursite.com). A technical analysis of conversion rate optimization, Core Web Vitals dominance, and B2B organic lead generation.\\n\\n");
    }

    fullHtml += a.richHtml;
    fullText += a.cleanMarkdown;

    if (includeSig) {
      fullHtml += FOOTER_HTML;
      fullText += "\\n\\n" + (IS_FOUNDER 
        ? "Written by Moksh Parjapati, Founder at Rankur (https://rankursite.com). Book a free engineering audit with me at https://rankursite.com/free-audit"
        : "About Rankur: High-converting React engines and B2B SaaS web systems. Visit https://rankursite.com/saas-websites");
    }

    if (navigator.clipboard && window.ClipboardItem) {
      const blobHtml = new Blob([fullHtml], { type: 'text/html' });
      const blobText = new Blob([fullText], { type: 'text/plain' });
      navigator.clipboard.write([
        new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })
      ]).then(() => {
        showToast('✓ Rich Story Formatted! Paste with Ctrl+V into Medium.');
      }).catch(() => {
        copyText(fullText, 'Story Text');
      });
    } else {
      copyText(fullText, 'Story Text');
    }
  }

  function openMediumEditor() {
    window.open('https://medium.com/new-story', '_blank');
  }

  function togglePreview(id) {
    const p = document.getElementById('preview-' + id);
    if (p) p.style.display = (p.style.display === 'block') ? 'none' : 'block';
  }

  function updateStatus(id, newStatus) {
    if (!articleState[id]) articleState[id] = {};
    articleState[id].status = newStatus;
    saveState();
    filterArticles();
  }

  function updateDate(id, newDate) {
    if (!articleState[id]) articleState[id] = {};
    articleState[id].scheduledDate = newDate;
    if (newDate && articleState[id].status === 'pending') {
      articleState[id].status = 'scheduled';
    }
    saveState();
    filterArticles();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(articleState));
      updateCounts();
    } catch(e) {}
  }

  function setFilter(filt, btn) {
    currentFilter = filt;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterArticles();
  }

  function updateCounts() {
    let pending = 0, sched = 0, pub = 0;
    ARTICLES.forEach(a => {
      const s = (articleState[a.id] && articleState[a.id].status) || 'pending';
      if (s === 'published') pub++;
      else if (s === 'scheduled') sched++;
      else pending++;
    });

    document.getElementById('stat-pending').innerText = pending;
    document.getElementById('stat-sched').innerText = sched;
    document.getElementById('stat-pub').innerText = pub;

    document.getElementById('count-pending').innerText = pending;
    document.getElementById('count-sched').innerText = sched;
    document.getElementById('count-pub').innerText = pub;
  }

  function filterArticles() {
    const q = (document.getElementById('search-input').value || '').toLowerCase().trim();
    const container = document.getElementById('articles-container');

    const filtered = ARTICLES.filter(a => {
      const s = (articleState[a.id] && articleState[a.id].status) || 'pending';
      if (currentFilter !== 'all' && s !== currentFilter) return false;
      if (q) {
        const full = (a.id + ' ' + a.title + ' ' + a.tags.join(' ') + ' ' + a.cleanMarkdown).toLowerCase();
        if (!full.includes(q)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:48px 20px; color:var(--text-sub);"><h3>No articles found matching filters</h3></div>';
      return;
    }

    let html = '';
    filtered.forEach(a => {
      const s = (articleState[a.id] && articleState[a.id].status) || 'pending';
      const d = (articleState[a.id] && articleState[a.id].scheduledDate) || '';

      const tagsHtml = a.tags.map(t => '<span class="tag-chip" onclick="copyText(\\'' + t + '\\', \\'Tag\\')">' + t + '</span>').join(' ');

      html += \`
        <div class="article-card status-\${s}" id="card-\${a.id}">
          <div class="card-top">
            <div>
              <span class="card-id-badge">Article #\${a.id} • \${IS_FOUNDER ? 'Founder Perspective (Moksh)' : 'Rankur Web Systems'}</span>
              <h2 class="article-title">\${a.title}</h2>
            </div>
            <span class="status-badge \${s}">\${s}</span>
          </div>

          <div class="meta-row">
            <div>
              <strong style="color:#fff; margin-right:6px;">Tags:</strong>
              \${tagsHtml}
            </div>
            <div style="margin-left:auto;">
              <span>Target: <strong>\${d ? d.replace('T', ' ') : 'Not Scheduled'}</strong></span>
              <span style="margin-left:14px;">Words: <strong>\${a.wordCount}</strong></span>
            </div>
          </div>

          <div class="card-actions">
            <button class="btn-act" onclick="copyArticleTitle(\${a.id})">📋 Copy Title</button>
            <button class="btn-act btn-story" onclick="copyRichStory(\${a.id})">⚡ Copy Formatted Story (Rich HTML)</button>
            <button class="btn-act" onclick="copyArticleTags(\${a.id})">🏷️ Copy Tags</button>
            <button class="btn-act btn-canonical" title="Paste in Medium: Settings > Advanced Settings > Canonical Link" onclick="copyArticleCanonical(\${a.id})">🔗 Copy Canonical URL</button>
            <button class="btn-act btn-img" title="Copy clean path for File Upload dialog" onclick="copyArticleWebpPath(\${a.id})">🖼️ Copy WebP Path</button>
            <button class="btn-act btn-img" style="border-color:#F59E0B; color:#FCD34D; background:rgba(245,158,11,0.1);" title="Copy JPEG alternate path" onclick="copyArticleJpegPath(\${a.id})">🖼️ Copy JPEG Path</button>
            <button class="btn-act btn-med" onclick="openMediumEditor()">🚀 Open Medium Editor</button>
          </div>

          <div class="card-bottom">
            <div style="display:flex; align-items:center;">
              <label style="font-size:12px; color:var(--text-sub); margin-right:8px; font-weight:600;">Status:</label>
              <select class="status-select" onchange="updateStatus(\${a.id}, this.value)">
                <option value="pending" \${s === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="scheduled" \${s === 'scheduled' ? 'selected' : ''}>Scheduled</option>
                <option value="published" \${s === 'published' ? 'selected' : ''}>Published</option>
              </select>

              <label style="font-size:12px; color:var(--text-sub); margin-left:14px; margin-right:6px; font-weight:600;">Schedule:</label>
              <input type="datetime-local" class="date-input" value="\${d}" onchange="updateDate(\${a.id}, this.value)" />
            </div>

            <button class="btn-toggle-prev" onclick="togglePreview(\${a.id})">👁️ Toggle Content Preview</button>
          </div>

          <div class="preview-box" id="preview-\${a.id}">
            \${a.richHtml}
          </div>
        </div>
      \`;
    });

    container.innerHTML = html;
  }

  // Initial render
  updateCounts();
  filterArticles();
</script>

</body>
</html>`;
}

// Build both HTML files
const founderHtml = buildDashboardHtml('founder');
const brandHtml = buildDashboardHtml('brand');

const founderProtoFile = path.join(prototypeDir, 'founder_medium_publisher.html');
const brandProtoFile = path.join(prototypeDir, 'brand_medium_publisher.html');

const founderRootFile = path.join(rootDir, 'founder_medium_publisher.html');
const brandRootFile = path.join(rootDir, 'brand_medium_publisher.html');

fs.writeFileSync(founderProtoFile, founderHtml, 'utf-8');
fs.writeFileSync(brandProtoFile, brandHtml, 'utf-8');

fs.writeFileSync(founderRootFile, founderHtml, 'utf-8');
fs.writeFileSync(brandRootFile, brandHtml, 'utf-8');

console.log('✓ Successfully rebuilt HTML files without em dashes!');
