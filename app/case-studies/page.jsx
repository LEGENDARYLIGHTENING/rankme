import CaseStudies from '../../src/views/CaseStudies';
import { constructMetadata } from '../../src/components/Seo';
import JsonLd, { buildBreadcrumbSchema } from '../../src/components/JsonLd';

export const metadata = constructMetadata({
  title: 'B2B Web Architecture & Client Case Studies | Rankur',
  description:
    'Case study of the Wafa Educational & Charitable Trust website rebuild from WordPress to Next.js 16 with React 19 (App Router), hosted on Vercel.',
  canonical: '/case-studies',
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Case Studies', path: '/case-studies' },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CaseStudies />
    </>
  );
}
