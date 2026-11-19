import { notFound } from 'next/navigation';
import { countryData, INDEXABLE_COUNTRIES } from '../../src/data/countryData.jsx';
import { constructMetadata } from '../../src/utils/seo';
import NichePage from '../../src/views/NichePage';

export const dynamicParams = false;

const countryKeys = Object.keys(countryData);

const INDEXABLE_HREFLANG = {
  'en-US': 'https://rankursite.com/usa',
  'en-GB': 'https://rankursite.com/uk',
  'en-CA': 'https://rankursite.com/canada',
  'en-AU': 'https://rankursite.com/australia',
  'en-AE': 'https://rankursite.com/uae',
  'en-SA': 'https://rankursite.com/saudi-arabia',
  'x-default': 'https://rankursite.com/usa',
};

export async function generateStaticParams() {
  return countryKeys.map((key) => ({ region: key }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.region;

  if (!countryData[slug]) {
    return {};
  }

  const { props } = countryData[slug];
  const isIndexable = INDEXABLE_COUNTRIES.has(slug);

  return constructMetadata({
    title: props.seoTitle || `B2B Web Design & SEO in ${props.niche} | Rankur`,
    description: props.seoDesc,
    canonical: `/${slug}`,
    imageAlt: `${props.niche}: Rankur`,
    noIndex: !isIndexable,
    robotsFollow: true,
    alternatesLanguages: isIndexable ? INDEXABLE_HREFLANG : undefined,
  });
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.region;

  if (!countryData[slug]) {
    notFound();
  }

  const regionData = countryData[slug];
  return <NichePage {...regionData.props} />;
}
