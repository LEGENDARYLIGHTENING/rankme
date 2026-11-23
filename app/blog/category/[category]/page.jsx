import { notFound } from 'next/navigation';
import Blog from '../../../../src/views/Blog';
import rawBlogPosts from '../../../../src/data/blogs-index.json';
import blogTriage from '../../../../src/data/blog-triage.json';
import { constructMetadata } from '../../../../src/utils/seo';

export const dynamicParams = false;

const keepSet = new Set(blogTriage?.keepSlugs || []);
const curatedPosts = rawBlogPosts.filter((p) => keepSet.has(p.slug));

const categoryMap = new Map();
for (const p of curatedPosts) {
  if (p.categorySlug && p.tag && !categoryMap.has(p.categorySlug)) {
    categoryMap.set(p.categorySlug, { tag: p.tag, slug: p.categorySlug, image: p.image });
  }
}

export function generateStaticParams() {
  return [...categoryMap.keys()].map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const cat = categoryMap.get(resolved.category);
  if (!cat) return {};

  return constructMetadata({
    title: `${cat.tag} - B2B Guides | Rankur`,
    description: `Browse B2B technical SEO, Next.js web engineering, and growth guides under ${cat.tag} by Moksh Parjapati.`,
    canonical: `/blog/category/${cat.slug}`,
    image: cat.image || '/og-image.jpg',
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: `${cat.tag} Guides | Rankur`,
  });
}

export default async function BlogCategoryPage({ params }) {
  const resolved = await params;
  const cat = categoryMap.get(resolved.category);
  if (!cat) {
    notFound();
  }
  return <Blog activeCategorySlug={cat.slug} />;
}
