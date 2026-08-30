import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import BlogPost from '../../../../../src/views/BlogPost';
import rawBlogIndex from '../../../../../src/data/blogs-index.json';
import { cityData } from '../../../../../src/data/cityData.jsx';

const blogIndex = rawBlogIndex.filter((b) => b.slug);

// Enable ISR / Dynamic On-Demand rendering for deep city-blog combinations
export const dynamicParams = true;

export async function generateStaticParams() {
  const topCities = Object.keys(cityData).slice(0, 15); // Top 15 cities statically pre-rendered
  const topBlogs = blogIndex.slice(0, 20); // Top 20 blogs statically pre-rendered
  const params = [];

  for (const b of topBlogs) {
    for (const c of topCities) {
      params.push({
        slug: b.slug,
        region: c,
      });
    }
  }

  return params;
}

function processLocalizedMarkdown(text, cityName) {
  // Replace generic intros with localized founder intent
  text = text.replace(
    /In enterprise B2B sales, your website is either/gi,
    `For B2B founders in **${cityName}**, your website is either`
  );

  text = text.replace(
    /When B2B founders and executives evaluate digital growth/gi,
    `When executive teams and B2B founders in **${cityName}** evaluate digital growth`
  );

  return text;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { slug, region } = resolvedParams;

  const postMeta = blogIndex.find(b => b.slug === slug);
  const regionInfo = cityData[region];

  if (!postMeta || !regionInfo) return {};

  const cityName = regionInfo.props.niche.replace(' B2B', '');
  const url = `https://rankursite.com/blog/${slug}/in/${region}`;
  const localizedTitle = `${postMeta.title} in ${cityName} | Rankur`;
  const localizedDesc = `${postMeta.excerpt} B2B growth insights tailored for enterprise founders in ${cityName}. Backed by our 100% money-back guarantee.`;

  return {
    title: localizedTitle,
    description: localizedDesc,
    alternates: { canonical: url },
    openGraph: {
      title: localizedTitle,
      description: localizedDesc,
      url,
      type: 'article',
      images: postMeta.image ? [postMeta.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedTitle,
      description: localizedDesc,
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const { slug, region } = resolvedParams;

  const postMeta = blogIndex.find((b) => b.slug === slug);
  const regionInfo = cityData[region];

  if (!postMeta || !regionInfo) {
    notFound();
  }

  const cityName = regionInfo.props.niche.replace(' B2B', '');
  const filePath = path.join(process.cwd(), 'blogs', postMeta.filename);
  let content = '';

  try {
    const rawContent = fs.readFileSync(filePath, 'utf-8');
    content = processLocalizedMarkdown(rawContent, cityName);
  } catch (error) {
    console.error(`Failed to read markdown file at ${filePath}`, error);
    notFound();
  }

  // Create hyper-localized post metadata
  const localizedPostMeta = {
    ...postMeta,
    title: `${postMeta.title} (${cityName} B2B Edition)`,
    tag: `${cityName} B2B · ${postMeta.tag}`,
    excerpt: `Tailored for B2B founders and executives in ${cityName}. ${postMeta.excerpt}`
  };

  const relatedPosts = blogIndex
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  return (
    <BlogPost
      postMeta={localizedPostMeta}
      content={content}
      relatedPosts={relatedPosts}
    />
  );
}
