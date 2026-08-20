import { cityData } from '../../src/data/cityData.jsx';
import { countryData } from '../../src/data/countryData.jsx';
import NichePage from '../../src/views/NichePage';

const allRegions = { ...cityData, ...countryData };

export default async function Page({ params }) {
  const resolvedParams = await params;
  const regionData = allRegions[resolvedParams.region];
  if (!regionData) return null;
  return <NichePage {...regionData.props} />;
}
