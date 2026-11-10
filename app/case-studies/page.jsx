import CaseStudies from '../../src/views/CaseStudies';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B Case Studies & Engineering Portfolio | Rankur',
  description:
    'Explore live B2B Next.js web platforms built for client and in-house ventures across fleet telematics, medical commerce, and nutraceuticals.',
  canonical: '/case-studies',
});

export default function Page() {
  return <CaseStudies />;
}
