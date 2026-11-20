import { notFound } from 'next/navigation';
import Blog from '../../../../src/views/Blog';
import { POSTS_PER_PAGE } from '../../../../src/utils/blogConfig';
import rawBlogPosts from '../../../../src/data/blogs-index.json';
import blogTriage from '../../../../src/data/blog-triage.json';
import { constructMetadata } from '../../../../src/utils/seo';

export const dynamicParams = false;

const keepSet = new Set(blogTriage.keepSlugs);
const curatedPosts = rawBlogPosts.filter((p) => keepSet.has(p.slug));
const totalPages = Math.max(1, Math.ceil(curatedPosts.length / POSTS_PER_PAGE));

export function generateStaticParams() {
  const params = [];
  for (let p = 2; p <= totalPages; p++) {
    params.push({ page: String(p) });
  }
  return params;
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const pageNum = parseInt(resolved.page, 10);
  if (!pageNum || pageNum < 2 || pageNum > totalPages) return {};

  return constructMetadata({
    title: `B2B SEO & Web Engineering Blog - Page ${pageNum} | Rankur`,
    description: `Browse page ${pageNum} of B2B technical SEO, Next.js engineering, and Generative Engine Optimization guides by Moksh Parjapati.`,
    canonical: `/blog/page/${pageNum}`,
    noIndex: true,
    robotsFollow: true,
  });
}

export default async function BlogArchivePage({ params }) {
  const resolved = await params;
  const pageNum = parseInt(resolved.page, 10);
  if (!pageNum || pageNum < 2 || pageNum > totalPages) {
    notFound();
  }
  return <Blog initialPage={pageNum} />;
}
