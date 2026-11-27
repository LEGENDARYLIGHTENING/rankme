import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import BlogPost from '../../../src/views/BlogPost';
import rawBlogIndex from '../../../src/data/blogs-index.json';
import blogTriage from '../../../src/data/blog-triage.json';
import { constructMetadata } from '../../../src/utils/seo';

const blogIndex = rawBlogIndex.filter((b) => b.slug);
const keepSlugsSet = new Set(blogTriage?.keepSlugs || []);
const curatedBlogIndex = blogIndex.filter((b) => keepSlugsSet.has(b.slug));

export const dynamicParams = false;

export function generateStaticParams() {
  return blogIndex.map((b) => ({ slug: b.slug }));
}

function stripFrontmatterAndDuplicateH1(text) {
  const normalized = text.replace(/\r\n/g, '\n');
  let stripped = normalized;
  const headerMatch = normalized.match(/^(?:#\s*Blog\s*\d+\s*of\s*\d+\s*\n+)?---\n[\s\S]*?\n---\s*/i);
  if (headerMatch) {
    stripped = normalized.substring(headerMatch[0].length);
  }
  // Remove leading H1 since HeroSection renders the single authoritative H1 on the page
  stripped = stripped.replace(/^\s*#\s+[^\n]+\n+/, '');
  return stripped.trim();
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = blogIndex.find((b) => b.slug === slug);
  if (!post) return {};

  const isKeep = keepSlugsSet.has(slug);
  const cleanTitle = (post.title || '').replace(/\s*\|\s*Rankur\s*$/i, '').trim();

  return constructMetadata({
    title: cleanTitle,
    description: post.excerpt,
    canonical: `/blog/${post.slug}`,
    image: post.image || '/og-image.jpg',
    imageWidth: post.imageWidth || 1200,
    imageHeight: post.imageHeight || 630,
    imageAlt: post.imageAlt || cleanTitle,
    type: 'article',
    noIndex: !isKeep,
    robotsFollow: true,
  });
}

function getDeterministicRelatedPosts(slug, postMeta) {
  const pool = keepSlugsSet.has(slug) ? curatedBlogIndex : blogIndex;
  const picked = [];
  const seen = new Set([slug]);

  // 1. First pick from same category, strictly excluding self and duplicates
  const sameCategory = pool.filter((b) => b.categorySlug === postMeta.categorySlug && b.slug !== slug);
  for (const candidate of sameCategory) {
    if (picked.length >= 4) break;
    if (candidate?.slug && !seen.has(candidate.slug)) {
      seen.add(candidate.slug);
      picked.push(candidate);
    }
  }

  // 2. Top-up from global pool if category has fewer than 4 posts
  if (picked.length < 4) {
    for (const candidate of pool) {
      if (picked.length >= 4) break;
      if (candidate?.slug && !seen.has(candidate.slug)) {
        seen.add(candidate.slug);
        picked.push(candidate);
      }
    }
  }

  return picked;
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
    content = stripFrontmatterAndDuplicateH1(rawContent);
  } catch (error) {
    console.error(`Failed to read markdown file at ${filePath}`, error);
    notFound();
  }

  const relatedPosts = getDeterministicRelatedPosts(slug, postMeta);

  const datePublished = postMeta.datePublished || postMeta.date;
  const dateModified = postMeta.dateModified || datePublished;
  const imageUrl = postMeta.image?.startsWith('http')
    ? postMeta.image
    : `https://rankursite.com${postMeta.image || '/og-image.jpg'}`;

  const keywordsList = [
    postMeta.primaryKeyword,
    ...(postMeta.secondaryKeywords ? postMeta.secondaryKeywords.split(',').map((s) => s.trim()) : []),
  ].filter(Boolean);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postMeta.title,
    description: postMeta.excerpt,
    ...(keywordsList.length > 0 ? { keywords: keywordsList.join(', ') } : {}),
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
      name: postMeta.primaryKeyword || postMeta.title,
      caption: postMeta.imageAlt || postMeta.title,
      description: postMeta.imageAlt || postMeta.title,
      ...(postMeta.primaryKeyword ? { keywords: postMeta.primaryKeyword } : {}),
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: {
      '@type': 'Person',
      name: postMeta.author || 'Moksh Parjapati',
      jobTitle: postMeta.authorRole || 'Founder & B2B Growth Strategist',
      url: 'https://rankursite.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rankur',
      url: 'https://rankursite.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rankursite.com/rankur-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rankursite.com/blog/${slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://rankursite.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://rankursite.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: postMeta.tag,
        item: `https://rankursite.com/blog/category/${postMeta.categorySlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: postMeta.title,
        item: `https://rankursite.com/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPost postMeta={postMeta} content={content} relatedPosts={relatedPosts} />
    </>
  );
}
