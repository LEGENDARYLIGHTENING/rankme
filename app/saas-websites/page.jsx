import NichePage from '../../src/views/NichePage';
import { nicheData } from '../../src/data/nicheData';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B SaaS Website Engineering & SEO | Rankur',
  description:
    'Custom React and Next.js marketing websites built for B2B SaaS startups targeting clear positioning, demo conversions, and clean search indexing.',
  canonical: '/saas-websites',
});

export default function Page() {
  return <NichePage {...nicheData.saas.props} />;
}
