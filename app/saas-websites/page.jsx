import NichePage from '../../src/views/NichePage';
import { nicheData } from '../../src/data/nicheData';
import { constructMetadata } from '../../src/components/Seo';
import JsonLd, { buildBreadcrumbSchema } from '../../src/components/JsonLd';

export const metadata = constructMetadata({
  title: 'B2B SaaS Website Engineering & SEO | Rankur',
  description:
    'High-converting B2B SaaS marketing platforms engineered for clear market positioning, qualified demo conversions, and dominant search authority.',
  canonical: '/saas-websites',
});

const saasServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'B2B SaaS Website Engineering & Technical SEO',
  provider: { '@id': 'https://rankursite.com/#organization' },
  url: 'https://rankursite.com/saas-websites',
  serviceType: 'Custom Next.js SaaS Website Development and Technical SEO',
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'SaaS Websites', path: '/saas-websites' },
]);

export default function Page() {
  return (
    <>
      <JsonLd data={saasServiceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <NichePage {...nicheData.saas.props} />
    </>
  );
}
