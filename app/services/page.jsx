import Services from '../../src/views/Services';
import { constructMetadata } from '../../src/components/Seo';
import JsonLd, { buildBreadcrumbSchema } from '../../src/components/JsonLd';

export const metadata = constructMetadata({
  title: 'B2B Lead Generation & Inbound Pipeline Services | Rankur',
  description:
    'Custom B2B web systems engineered to turn organic traffic into discovery calls and RFQs. Zero monthly retainers with 100% code ownership.',
  canonical: '/services',
});

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'B2B Web Engineering, Technical SEO & GEO Services',
  provider: { '@id': 'https://rankursite.com/#organization' },
  url: 'https://rankursite.com/services',
  serviceType: 'B2B Web Development, Technical SEO, and Generative Engine Optimization',
  areaServed: ['US', 'GB', 'CA', 'AU', 'AE', 'SA'],
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Services />
    </>
  );
}
