import CaseStudies from '../../src/views/CaseStudies';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B Inbound Platforms & Case Studies | Rankur',
  description:
    'Inspect verified B2B web systems engineered for sub-second speed, zero buyer bounce, and verified search authority. Full code ownership delivered.',
  canonical: '/case-studies',
});

export default function Page() {
  return <CaseStudies />;
}
