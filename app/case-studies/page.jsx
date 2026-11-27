import CaseStudies from '../../src/views/CaseStudies';
import { constructMetadata } from '../../src/components/Seo';

export const metadata = constructMetadata({
  title: 'B2B Web Architecture & Client Case Studies | Rankur',
  description:
    'Case study of the Wafa Educational & Charitable Trust website rebuild from WordPress to Next.js 16 with React 19 (App Router), hosted on Vercel.',
  canonical: '/case-studies',
});

export default function Page() {
  return <CaseStudies />;
}
