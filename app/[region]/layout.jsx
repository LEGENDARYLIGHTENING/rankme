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
  return {
    title: regionData.props.seoTitle || regionData.props.title,
    description: regionData.props.seoDesc || regionData.props.metaDescription,
    alternates: { canonical: `https://rankursite.com/${resolvedParams.region}` }
  };
}

export default async function RegionLayout({ children }) {
  return <>{children}</>;
}
