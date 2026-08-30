import { notFound } from 'next/navigation';
import { cityData } from '../../src/data/cityData.jsx';
import { countryData } from '../../src/data/countryData.jsx';
import NichePage from '../../src/views/NichePage';

const allRegions = { ...cityData, ...countryData };

// Only the slugs returned by generateStaticParams are valid routes.
// Any other slug (pruned city, typo, stale backlink) returns a real 404
// instead of a 200 "soft 404" empty shell.
export const dynamicParams = false;

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
  if (!regionData) notFound();

  const props = { ...regionData.props };

  // Programmatic Injection of Local Intent Data
  try {
    const fs = require('fs');
    const path = require('path');
    const intentPath = path.join(process.cwd(), 'src/data/local-intent.json');
    const intentData = JSON.parse(fs.readFileSync(intentPath, 'utf8'));
    
    // Extract city name (e.g. "atlanta-us" -> "Atlanta", "san-jose-us" -> "San Jose")
    const parts = resolvedParams.region.split('-');
    parts.pop(); // remove 'us' or 'uk'
    const cityName = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    
    const localContext = intentData[cityName];

    if (localContext) {
      props.problemText = [
        `If your website looks outdated, doesn't show up on Google, or just isn't bringing in leads, you're not alone. I talk to founders in ${cityName} every week who tell me: "${localContext.buyer_language[0]}" or "${localContext.buyer_language[1]}."`,
        `The B2B market here is competitive, especially in ${localContext.top_sectors.join(', ')}. Many mid-market service providers still present digital experiences that feel regional rather than enterprise-ready.`,
        `One of the biggest concerns I hear is: "${localContext.objections[0]}". But the reality is, a passive website is costing you way more in lost pipeline. So visitors leave, ads cost more than they should, and the sales pipeline stays empty. It doesn't have to be that way.`
      ];

      props.faqs = [
        { question: localContext.real_questions[0] || `How much does a B2B website cost in ${cityName}?`, answer: `Every project is quoted on scope, and you get one fixed price up front - no hourly billing and no surprise invoices. Book a free audit and I'll send a clear quote for your ${cityName} site within a day.` },
        { question: localContext.real_questions[1] || "How long does it take to build and launch?", answer: `Most ${cityName} B2B sites go live in about 7 days, with larger builds taking 7-14. You see progress the whole way through.` },
        { question: localContext.real_questions[2] || "Will the new site actually rank on Google?", answer: `That's the point of it. I build on a fast, clean technical foundation and target the exact searches your ${cityName} buyers use.` },
        { question: localContext.real_questions[3] || "Do you handle SEO and lead generation?", answer: `Both. The design, the search setup, and the lead capture are one job.` },
        { question: `Have you worked with ${localContext.top_sectors[0] || 'B2B'} companies?`, answer: `Yes. ${localContext.top_sectors[0] || 'B2B'} is one of the strongest sectors in ${cityName}, and I build sites that speak to how those buyers actually evaluate vendors.` },
        { question: localContext.real_questions[4] || "What if I'm not happy with the result?", answer: `Every build is backed by a 100% money-back guarantee. If it isn't right, you don't pay.` }
      ];
    }
  } catch (e) {
    console.error("Error injecting local intent:", e);
  }

  return <NichePage {...props} />;
}

