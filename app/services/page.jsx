import Services from '../../src/views/Services';
import { constructMetadata } from '../../src/utils/seo';

export const metadata = constructMetadata({
  title: 'B2B Web Engineering & SEO Services | Rankur',
  description: 'Full-stack Next.js website engineering, technical SEO architecture, Generative Engine Optimization (GEO), and conversion optimization built for high-growth B2B founders.',
  canonical: '/services',
});

export default function Page() {
  return <Services />;
}
