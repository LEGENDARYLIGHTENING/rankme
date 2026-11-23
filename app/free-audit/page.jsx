import FreeAudit from '../../src/views/FreeAudit';
import { constructMetadata, SeoJsonLd } from '../../src/components/Seo';
import { AUDIT_FAQS } from '../../src/data/auditFaqs';

export const metadata = constructMetadata({
  title: 'Free B2B Website & Inbound Pipeline Audit | Rankur',
  description:
    'Find out why your website gets traffic but zero discovery calls. Uncover lead drop-offs, speed bottlenecks, and AI search visibility gaps.',
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
