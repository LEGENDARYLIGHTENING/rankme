import NichePage from '../../src/views/NichePage';
import { nicheData } from '../../src/data/nicheData';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B SaaS Website Engineering & SEO | Rankur',
  description:
    'High-converting B2B SaaS marketing platforms engineered for clear market positioning, qualified demo conversions, and dominant search authority.',
  canonical: '/saas-websites',
});

export default function Page() {
  return <NichePage {...nicheData.saas.props} />;
}
