import fs from 'fs';
import path from 'path';

const blogIndexFile = path.join(process.cwd(), 'src/data/blogs-index.json');
const blogsIndex = JSON.parse(fs.readFileSync(blogIndexFile, 'utf-8'));

// The promotional files to update
const all120Path = path.join(process.cwd(), 'promotions', 'ALL_120_LINKEDIN_POSTS.md');
const linkedinPostsPath = path.join(process.cwd(), 'promotions', 'linkedin_posts_for_all_blogs.md');
const allStoryTeachPath = path.join(process.cwd(), 'promotions', 'ALL_120_STORY_TEACH_SELL_POSTS.md');

// Extract the 120 titles to maintain exact existing order
const existingRaw = fs.readFileSync(all120Path, 'utf-8');
const existingMatches = [...existingRaw.matchAll(/POST (\d+):\s*(.+)/g)];
const targetTitles = existingMatches.map(m => ({ index: parseInt(m[1]), title: m[2].trim() }));

function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/\[Internal link:\s*([^-\]]+)\s*-\s*(?:anchor text:\s*)?([^\]]+)\]/gi, '$2')
    .replace(/\[External link:\s*([^-\]]+)\s*-\s*([^\]]+)\]/gi, '$2')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/\*\*/g, '')
    .replace(/\*   \[ \]/g, '')
    .trim();
}

function getFirstSentences(text, maxChars = 220) {
  const clean = cleanText(text).replace(/\n/g, ' ').trim();
  const sentences = clean.split(/(?<=[.?!])\s+/);
  let result = sentences[0] || clean;
  if (result.length < 80 && sentences.length > 1) {
    result += ' ' + sentences[1];
  }
  return result.slice(0, maxChars);
}

function extractInsightsFromBlog(body) {
  const insights = [];

  // Check H3s first if the blog uses H3s for actionable points (like checklists/playbooks)
  const h3Parts = body.split(/^###\s+/m).slice(1);
  if (h3Parts.length >= 3) {
    for (const part of h3Parts) {
      if (insights.length >= 3) break;
      const lines = part.split('\n');
      const h3Title = lines[0].trim();
      if (/Ready to Turn|Regional Impact|FAQ|How Moksh Can Help|Conclusion/i.test(h3Title)) continue;

      const pList = lines.slice(1).join('\n').split('\n\n').map(p => p.trim()).filter(Boolean);
      let desc = pList.length > 0 ? getFirstSentences(pList[0]) : '';
      if (desc.length > 20) {
        let cleanTitle = h3Title.replace(/^\d+\.\s*/, '').trim();
        insights.push({ title: cleanTitle, desc });
      }
    }
  }

  // If H3s didn't yield 3 insights, check H2 sections
  if (insights.length < 3) {
    const h2Parts = body.split(/^##\s+/m).slice(1);

    for (const part of h2Parts) {
      if (insights.length >= 3) break;
      const lines = part.split('\n');
      const h2Title = lines[0].trim();
      if (/FAQ|How Moksh Can Help|Conclusion|Ready to Turn|Regional Impact|Summary|Why This Matters Right Now/i.test(h2Title)) continue;

      const pList = lines.slice(1).join('\n').split('\n\n').map(p => p.trim()).filter(Boolean);

      // 1. Check for bold headers or bullet points (e.g. **The onboarding window** is...)
      for (const p of pList) {
        if (insights.length >= 3) break;
        const boldMatch = p.match(/^\*\*([^*]+)\*\*\s*(?:-|:)?\s*(.+)/s) || p.match(/^[-*]\s+\*\*([^*]+)\*\*\s*(?:-|:)?\s*(.+)/s);
        if (boldMatch) {
          let title = boldMatch[1].replace(/[-:]$/, '').trim();
          let desc = getFirstSentences(boldMatch[2]);
          if (desc.length > 25 && !insights.some(i => i.title.toLowerCase() === title.toLowerCase())) {
            insights.push({ title, desc });
          }
        }
      }

      // 2. Check for numbered lists (e.g. 1. The "Loading..." Spinner)
      if (insights.length < 3) {
        for (const p of pList) {
          if (insights.length >= 3) break;
          const numMatch = p.match(/^\d+\.\s+\*\*([^*]+)\*\*\s*(?:-|:)?\s*(.+)/s) || p.match(/^##\s*\d+\.\s*(.+)/s);
          if (numMatch) {
            let title = numMatch[1].replace(/[-:]$/, '').trim();
            let desc = getFirstSentences(p.replace(/^\d+\.\s+\*\*[^*]+\*\*\s*(?:-|:)?\s*/s, ''));
            if (desc.length > 25 && !insights.some(i => i.title.toLowerCase() === title.toLowerCase())) {
              insights.push({ title, desc });
            }
          }
        }
      }

      // 3. Check individual paragraphs in this H2
      if (insights.length < 3 && pList.length > 1) {
        for (let i = 0; i < pList.length; i++) {
          if (insights.length >= 3) break;
          const p = pList[i];
          if (p.length < 50 || p.startsWith('---') || p.startsWith('#') || p.startsWith('Here')) continue;
          
          let firstFewWords = p.split(/[:.-]/)[0].trim();
          let desc = getFirstSentences(p);
          let title = (firstFewWords.length > 5 && firstFewWords.length < 35) ? firstFewWords : h2Title.replace(/^\d+\.\s*/, '');
          
          if (desc.length > 30 && !insights.some(i => i.desc === desc || i.title.toLowerCase() === title.toLowerCase())) {
            insights.push({ title, desc });
          }
        }
      }

      // 4. Fallback to clean H2 itself
      if (insights.length < 3 && pList.length > 0) {
        let cleanH2 = h2Title.replace(/^\d+\.\s*/, '').trim();
        let desc = getFirstSentences(pList[0]);
        if (desc.length > 25 && !insights.some(i => i.title.toLowerCase() === cleanH2.toLowerCase())) {
          insights.push({ title: cleanH2, desc });
        }
      }
    }
  }

  // Final fallback to any H2s
  if (insights.length < 3) {
    const h2Parts = body.split(/^##\s+/m).slice(1);
    for (const part of h2Parts) {
      if (insights.length >= 3) break;
      const lines = part.split('\n');
      const h2Title = lines[0].trim();
      if (/FAQ|Conclusion|Ready to Turn|How Moksh Can Help/i.test(h2Title)) continue;
      const cleanH2 = h2Title.replace(/^\d+\.\s*/, '').trim();
      const pList = lines.slice(1).join('\n').split('\n\n').map(p => p.trim()).filter(Boolean);
      if (pList.length > 0 && !insights.some(i => i.title.toLowerCase() === cleanH2.toLowerCase())) {
        let desc = getFirstSentences(pList[0]);
        if (desc.length > 25) {
          insights.push({ title: cleanH2, desc });
        }
      }
    }
  }

  return insights.slice(0, 3);
}

function getHashtags(tag) {
  const t = (tag || '').toLowerCase();
  if (t.includes('saas') || t.includes('tech')) {
    return '#B2BGrowth #SaaS #SaaSFounders #CustomerRetention #WebDevelopment #CRO';
  } else if (t.includes('manufactur') || t.includes('export') || t.includes('industrial')) {
    return '#B2BGrowth #Manufacturing #B2BExport #IndustrialB2B #LeadGeneration #Operations';
  } else if (t.includes('wellness') || t.includes('nutra')) {
    return '#B2BGrowth #Nutraceuticals #WellnessBrands #HealthTech #ProductStrategy';
  } else if (t.includes('seo') || t.includes('geo')) {
    return '#B2BGrowth #SEO #GEO #TechnicalSEO #OrganicGrowth #SearchStrategy';
  } else {
    return '#B2BGrowth #WebDevelopment #LeadGeneration #B2BStrategy #NextJS';
  }
}

let content = `# Rankur Official LinkedIn Content Library (120 Posts)
> **Author:** Moksh Parjapati, Founder & B2B Web Engineer at Rankur
> **Purpose:** Executive thought leadership posts promoting each Rankur technical guide. Every post is strictly tailored to its specific blog topic with zero generic placeholder text.

`;

console.log(`Generating clean, topic-accurate LinkedIn posts for ${targetTitles.length} blogs...`);

targetTitles.forEach(item => {
  const postNum = item.index;
  const targetTitle = item.title;
  const cleanT = targetTitle.replace(/\s*\|\s*Rankur$/i, '');

  const blog = blogsIndex.find(b => b.title === targetTitle || b.title === cleanT || b.title.includes(cleanT) || cleanT.includes(b.title));
  if (!blog) {
    console.error(`Blog not found for: ${targetTitle}`);
    return;
  }

  const filePath = path.join(process.cwd(), 'blogs', blog.filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');

  // Parse frontmatter
  const fmMatch = raw.match(/---\n([\s\S]*?)\n---/);
  const fm = {};
  if (fmMatch) {
    fmMatch[1].split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx > -1) fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    });
  }

  const title = (fm['SEO Title'] || blog.title).replace(/\s*\|\s*Rankur$/i, '').trim();
  const slug = fm['Slug'] || blog.slug;
  const nicheTag = fm['Niche Tag'] || blog.tag || 'B2B Growth';
  const url = `https://rankursite.com/blog/${slug}?utm_source=linkedin&utm_medium=social`;

  // Parse body
  let body = raw.replace(/^(?:#\s*Blog\s*\d+\s*of\s*\d+\s*)?---\n[\s\S]*?\n---\s*/i, '');
  body = body.replace(/^#\s+[^\n]+\n+/, '');

  // Extract hook
  const rawParagraphs = body.split('\n\n').map(p => p.trim()).filter(p => p && !p.startsWith('#') && !p.startsWith('---'));
  let hook = '';
  if (rawParagraphs.length >= 2) {
    hook = cleanText(rawParagraphs[0]) + '\n\n' + cleanText(rawParagraphs[1]);
  } else if (rawParagraphs.length === 1) {
    hook = cleanText(rawParagraphs[0]);
  } else {
    hook = fm['Meta Description'] || blog.excerpt || '';
  }

  // Extract 3 real insights
  const insights = extractInsightsFromBlog(body);
  const hashtags = getHashtags(nicheTag);

  content += `=================================================\n`;
  content += `POST ${postNum}: ${title}\n`;
  content += `=================================================\n\n`;

  content += `${title}\n\n`;
  content += `${hook}\n\n`;
  content += `Here is the technical reality B2B founders need to know:\n\n`;

  insights.forEach((item, i) => {
    content += `💡 ${i + 1}. ${item.title}\n${item.desc}\n\n`;
  });

  content += `A high-converting B2B website is an engineering project, not an art project. By aligning exact buyer intent with high-performance architecture, bounce rates plummet and qualified pipeline surges.\n\n`;
  content += `👇 Read our complete technical breakdown on "${title}" here:\n`;
  content += `${url}\n\n`;
  content += `${hashtags}\n\n\n`;
});

fs.writeFileSync(all120Path, content, 'utf-8');
fs.writeFileSync(linkedinPostsPath, content, 'utf-8');
fs.writeFileSync(allStoryTeachPath, content, 'utf-8');

console.log('✅ Successfully wrote clean, accurate LinkedIn posts to:');
console.log(`- ${all120Path}`);
console.log(`- ${linkedinPostsPath}`);
