import FreeAudit from '../../src/views/FreeAudit';
import { constructMetadata, SeoJsonLd } from '../../src/components/Seo';
import { AUDIT_FAQS } from '../../src/data/auditFaqs';

export const metadata = constructMetadata({
  title: 'Free B2B Technical Website & SEO Audit | Rankur',
  description:
    'Request a manual review of your website page speed, technical SEO metadata, mobile UX friction, and AI search citation readiness.',
  canonical: '/free-audit',
});

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: AUDIT_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function Page() {
  return (
    <>
      <SeoJsonLd data={faqSchema} />
      <FreeAudit />
    </>
  );
}
