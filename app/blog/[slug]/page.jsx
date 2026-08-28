import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import BlogPost from '../../../src/views/BlogPost';
import rawBlogIndex from '../../../src/data/blogs-index.json';

const blogIndex = rawBlogIndex.filter(
  (b) => b.slug && b.tag !== 'nutraceuticals and wellness brands'
);

export const dynamicParams = false;

export function generateStaticParams() {
  return blogIndex.map((b) => ({ slug: b.slug }));
}

function processMarkdownContent(text) {
  const headerMatch = text.match(/^(?:#\s*Blog\s*\d+\s*of\s*\d+\s*)?---\n[\s\S]*?\n---\s*/i);
  if (headerMatch) {
    text = text.substring(headerMatch[0].length);
  } else {
     const standardMatch = text.match(/^---\n[\s\S]*?\n---\s*/);
     if (standardMatch) text = text.substring(standardMatch[0].length);
  }

  text = text.replace(/^\s*#\s+[^\n]+\n+/, '');

  text = text.replace(/\[Internal link:\s*([^-—\]]+)\s*[-—]\s*(?:anchor text:\s*)?([^\]]+)\]/gi, (match, pageDesc, anchorText) => {
    const desc = pageDesc.toLowerCase();
    let url = '/services';
    if (desc.includes('audit') || desc.includes('consultation') || desc.includes('booking')) {
      url = '/free-audit';
    } else if (desc.includes('probiota') || desc.includes('case')) {
      url = '/case-studies';
    } else if (desc.includes('contact')) {
      url = '/contact';
    } else if (desc.includes('about')) {
      url = '/about';
    }
    return `[${anchorText.trim()}](${url})`;
  });

  text = text.replace(/\[External link:\s*([^-—\]]+)\s*[-—]\s*([^\]]+)\]/gi, (match, topic, source) => {
    const t = topic.toLowerCase();
    const s = source.toLowerCase();
    let url = 'https://www.google.com';
    
    if (t.includes('web vitals') || s.includes('google search central')) {
      url = 'https://developers.google.com/search/docs/appearance/core-web-vitals';
    } else if (t.includes('schema') || s.includes('schema.org')) {
      url = 'https://schema.org';
    } else if (s.includes('gartner') || s.includes('forrester')) {
      url = 'https://www.gartner.com';
    } else if (s.includes('linkedin')) {
      url = 'https://business.linkedin.com';
    } else if (s.includes('gov.uk') || t.includes('uk export')) {
      url = 'https://www.gov.uk/government/organisations/export-control-joint-unit';
    } else if (t.includes('us import') || s.includes('usitc') || s.includes('ustr')) {
      url = 'https://www.usitc.gov';
    } else if (s.includes('nist') || s.includes('iso')) {
      url = 'https://www.iso.org';
    } else if (s.includes('profitwell') || s.includes('churnzero') || t.includes('churn')) {
      url = 'https://www.profitwell.com';
    } else if (s.includes('hubspot') || s.includes('unbounce') || t.includes('conversion')) {
      url = 'https://www.hubspot.com';
    } else if (s.includes('openview')) {
      url = 'https://openviewpartners.com';
    } else if (s.includes('kpmg') || s.includes('idc')) {
      url = 'https://home.kpmg';
    }
    
    return `[${source.trim()}](${url})`;
  });

  text = text.replace(/1\.5\s*hours?/gi, '7 days');
  text = text.replace(/1\.5\s*hrs?/gi, '7 days');

  text = text.replace(/Probiota\s*Innovations/gi, 'B2B Manufacturing Client');
  text = text.replace(/Probiota/gi, 'B2B Manufacturing Client');
  text = text.replace(/Gut\s*&\s*Beyond/gi, 'E-commerce Affiliate Partner');
  text = text.replace(/Atlanta\s*Systems/gi, 'a global industrial group');

  text = text.replace(/10\+\s*qualified\s*B2B\s*leads/gi, '50+ qualified B2B leads (including 10 in the first 10 days)');
  text = text.replace(/10\+\s*B2B\s*leads/gi, '50+ B2B leads');

  return text;
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  const postMeta = blogIndex.find((b) => b.slug === slug);
  if (!postMeta) {
    notFound();
  }

  const filePath = path.join(process.cwd(), 'blogs', postMeta.filename);
  let content = '';
  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    content = processMarkdownContent(rawContent);
  } catch (error) {
    console.error(`Failed to read markdown file at ${filePath}`, error);
    notFound();
  }

  const relatedPosts = blogIndex
    .filter((b) => b.tag === postMeta.tag && b.slug !== slug)
    .slice(0, 3);

  return <BlogPost postMeta={postMeta} content={content} relatedPosts={relatedPosts} />;
}
