import { cityData } from '../../src/data/cityData.jsx';
import { countryData } from '../../src/data/countryData.jsx';

const allRegions = { ...cityData, ...countryData };

export async function generateStaticParams() {
  return Object.keys(allRegions).map(slug => ({ region: slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const regionData = allRegions[resolvedParams.region];
  if (!regionData) return {};

  const title = regionData.props.seoTitle || regionData.props.title || `B2B Growth Consultant in ${regionData.props.niche}`;
  const rawDesc = regionData.props.seoDesc || regionData.props.metaDescription || '';
  const description = rawDesc.length > 155 ? rawDesc.substring(0, 152) + '...' : rawDesc;
  const canonicalUrl = `https://rankursite.com/${resolvedParams.region}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `https://rankursite.com/${resolvedParams.region}`,
        'en-GB': 'https://rankursite.com/uk',
        'en-CA': 'https://rankursite.com/canada',
        'en-AU': 'https://rankursite.com/australia',
        'en-AE': 'https://rankursite.com/uae',
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Rankur',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://rankursite.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `Rankur B2B Growth - ${regionData.props.niche || ''}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@moksh_rankur',
      images: ['https://rankursite.com/twitter-image.jpg'],
    },
  };
}

export default async function RegionLayout({ children }) {
  return <>{children}</>;
}
