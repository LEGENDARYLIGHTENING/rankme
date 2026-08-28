import { cityData } from '../../src/data/cityData.jsx';
import { countryData } from '../../src/data/countryData.jsx';
import NichePage from '../../src/views/NichePage';

const allRegions = { ...cityData, ...countryData };

export async function generateStaticParams() {
  return Object.keys(allRegions).map((slug) => ({
    region: slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const regionData = allRegions[resolvedParams.region];
  if (!regionData) return {};

  const { props } = regionData;
  const canonicalUrl = `https://rankursite.com/${resolvedParams.region}`;
  const trimmedDesc = props.seoDesc ? (props.seoDesc.length > 155 ? props.seoDesc.substring(0, 152) + '...' : props.seoDesc) : '';

  const countrySilos = ['usa', 'uk', 'canada', 'australia', 'uae', 'saudi-arabia'];
  const isCountrySilo = countrySilos.includes(resolvedParams.region);

  const languages = isCountrySilo
    ? {
        'en-US': 'https://rankursite.com/usa',
        'en-GB': 'https://rankursite.com/uk',
        'en-CA': 'https://rankursite.com/canada',
        'en-AU': 'https://rankursite.com/australia',
        'en-AE': 'https://rankursite.com/uae',
        'en-SA': 'https://rankursite.com/saudi-arabia',
        'x-default': 'https://rankursite.com/usa',
      }
    : undefined;

  return {
    title: props.seoTitle || `B2B Web Design & Growth Consultant in ${props.niche}`,
    description: trimmedDesc,
    alternates: {
      canonical: canonicalUrl,
      ...(languages ? { languages } : {}),
    },
    openGraph: {
      title: props.seoTitle || `B2B Web Design & Growth Consultant in ${props.niche}`,
      description: trimmedDesc,
      url: canonicalUrl,
      siteName: 'Rankur',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://rankursite.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Rankur B2B Growth - ${props.niche}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: props.seoTitle,
      description: trimmedDesc,
      creator: '@moksh_rankur',
      images: ['https://rankursite.com/twitter-image.jpg'],
    },
  };
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const regionData = allRegions[resolvedParams.region];
  if (!regionData) return null;
  return <NichePage {...regionData.props} />;
}

