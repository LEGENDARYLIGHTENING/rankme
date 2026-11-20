import CaseStudies from '../../src/views/CaseStudies';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B Case Studies & Engineering Portfolio | Rankur',
  description:
    'Inspect verified B2B web engineering case studies, Core Web Vitals telemetry, and global platform architectures engineered by Rankur.',
  canonical: '/case-studies',
});

export default function Page() {
  return <CaseStudies />;
}
