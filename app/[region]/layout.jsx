import { cityData } from '../../src/data/cityData.jsx';
import { countryData } from '../../src/data/countryData.jsx';

const allRegions = { ...cityData, ...countryData };

export async function generateStaticParams() {
  return Object.keys(allRegions).map(slug => ({ region: slug }));
}



export default async function RegionLayout({ children }) {
  return <>{children}</>;
}
