import Services from '../../src/views/Services';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B Web Engineering & Technical SEO Services | Rankur',
  description:
    'Custom Next.js websites, technical SEO audits, Generative Engine Optimization (GEO), and conversion optimization built for B2B founders.',
  canonical: '/services',
});

export default function Page() {
  return <Services />;
}
