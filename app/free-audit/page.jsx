import FreeAudit from '../../src/views/FreeAudit';

export const metadata = {
  title: 'Free B2B Website & SEO Audit | Rankur',
  description: 'Request a free, comprehensive analysis of your website speed, technical SEO issues, mobile UX friction, and missed lead generation opportunities.',
  alternates: { canonical: 'https://rankursite.com/free-audit' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is included in the free B2B website audit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The free audit reviews your page speed performance, technical SEO metadata, mobile conversion friction, messaging clarity, and your AI search engine visibility across Perplexity and ChatGPT.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to receive the audit results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most audits are manually reviewed and delivered within 24 to 48 hours as a clear, actionable PDF brief with high-priority optimization tasks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the audit really 100% free with no obligation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, 100% free. There is no automated sales harassment and no high-pressure pitch. If you want Rankur to implement the fixes in a 7-to-14 day sprint, we discuss it on a strategy call. If not, the PDF is yours to keep and execute.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who conducts the website analysis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every audit is manually conducted by Moksh Parjapati, founder and B2B growth strategist at Rankur, ensuring enterprise-grade diligence rather than generic automated scraper outputs.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FreeAudit />
    </>
  );
}
