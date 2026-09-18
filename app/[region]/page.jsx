import { notFound, redirect } from 'next/navigation';
import { countryData } from '../../src/data/countryData.jsx';
import NichePage from '../../src/views/NichePage';

export const dynamicParams = true;

const countryKeys = Object.keys(countryData);

function resolveCountryTarget(slug) {
  if (countryData[slug]) return slug;

  // Map country aliases
  if (slug === 'united-states' || slug === 'us') return 'usa';
  if (slug === 'united-kingdom' || slug === 'great-britain') return 'uk';

  // Map legacy city suffixes directly to their authoritative national silos
  if (slug.endsWith('-us')) return 'usa';
  if (slug.endsWith('-uk')) return 'uk';
  if (slug.endsWith('-canada')) return 'canada';
  if (slug.endsWith('-australia')) return 'australia';
  if (slug.endsWith('-uae')) return 'uae';
  if (slug.endsWith('-saudi-arabia')) return 'saudi-arabia';
  if (slug.endsWith('-germany')) return 'germany';
  if (slug.endsWith('-singapore')) return 'singapore';

  // European / German cities
  if (['hamburg', 'frankfurt', 'berlin', 'munich'].includes(slug)) return 'germany';
  if (['brussels', 'amsterdam', 'dublin', 'london', 'belfast', 'manchester', 'bristol'].includes(slug)) return 'uk';
  if (['toronto', 'montreal', 'calgary', 'vancouver'].includes(slug)) return 'canada';
  if (['sydney', 'melbourne', 'brisbane', 'perth', 'canberra', 'adelaide'].includes(slug)) return 'australia';
  if (['dubai', 'abu-dhabi'].includes(slug)) return 'uae';
  if (['riyadh', 'jeddah'].includes(slug)) return 'saudi-arabia';

  return null;
}

export async function generateStaticParams() {
  // Statically pre-render only the authoritative, high-value country hubs
  return countryKeys.map(key => ({ region: key }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.region;

  if (!countryData[slug]) {
    // If not a direct country hub, don't index; canonicalize to parent or let redirect handle it
    const target = resolveCountryTarget(slug);
    if (target) {
      return {
        alternates: {
          canonical: `https://rankursite.com/${target}`,
        },
      };
    }
    return {};
  }

  const regionData = countryData[slug];
  const { props } = regionData;
  const canonicalUrl = `https://rankursite.com/${slug}`;
  const trimmedDesc = props.seoDesc ? (props.seoDesc.length > 155 ? props.seoDesc.substring(0, 152) + '...' : props.seoDesc) : '';

  const languages = {
    'en-US': 'https://rankursite.com/usa',
    'en-GB': 'https://rankursite.com/uk',
    'en-CA': 'https://rankursite.com/canada',
    'en-AU': 'https://rankursite.com/australia',
    'en-AE': 'https://rankursite.com/uae',
    'en-SA': 'https://rankursite.com/saudi-arabia',
    'x-default': 'https://rankursite.com/usa',
  };

  return {
    title: props.seoTitle || `B2B Web Design & Growth Consultant in ${props.niche}`,
    description: trimmedDesc,
    alternates: {
      canonical: canonicalUrl,
      languages,
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
  const slug = resolvedParams.region;

  // If this is not a direct country silo, permanently redirect to consolidated country hub or directory
  if (!countryData[slug]) {
    const targetCountry = resolveCountryTarget(slug);
    if (targetCountry) {
      redirect(`/${targetCountry}`);
    }
    redirect('/locations');
  }

  const regionData = countryData[slug];
  const props = { ...regionData.props };

  const countryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Rankur B2B Growth Consultancy - ${props.niche}`,
    url: `https://rankursite.com/${slug}`,
    description: props.seoDesc,
    founder: {
      '@type': 'Person',
      name: 'Moksh Parjapati',
      jobTitle: 'Founder & B2B Growth Consultant',
    },
    areaServed: {
      '@type': 'Country',
      name: props.niche.replace(' B2B', ''),
    },
    serviceType: [
      'B2B Web Design',
      'Next.js Growth Systems',
      'Technical SEO',
      'Generative Engine Optimization (GEO)',
      'Conversion Rate Optimization',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(countryJsonLd) }}
      />
      <NichePage {...props} />
    </>
  );
}
