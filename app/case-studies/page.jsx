import CaseStudies from '../../src/views/CaseStudies';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B Web Architecture & Client Case Studies | Rankur',
  description:
    'Inspect verified web platform architecture, technical SEO structure, and digital accessibility delivered for Wafa Educational & Charitable Trust. Full code ownership delivered.',
  canonical: '/case-studies',
});

export default function Page() {
  return <CaseStudies />;
}
