"use client";
import { useState } from 'react';

import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import { SeoJsonLd } from '../components/Seo';
import './Process.css';

const processFaqs = [
  {
    question: 'How do we collaborate across different time zones?',
    answer:
      'I schedule overlapping review windows for US, UK, Canada, Australia, UAE, and Saudi Arabia clients, combining asynchronous GitHub/written updates with scheduled video check-ins.',
  },
  {
    question: 'What tools are used for communication and handoff?',
    answer:
      'GitHub for codebase delivery, Loom or Google Docs for technical briefs, and Slack, email, or Zoom for sprint feedback and reviews.',
  },
  {
    question: 'How are deliverables and revisions structured?',
    answer:
      'Every project starts with a written proposal specifying deliverables, revision rounds, and milestone-based sign-off criteria before coding begins.',
  },
  {
    question: 'Can I request the free audit before deciding on a build?',
    answer:
      'Yes. The free site and SEO audit has zero obligation. You receive the prioritized findings even if your internal team implements them without hiring me.',
  },
];

const processFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: processFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function Process() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SeoJsonLd data={processFaqSchema} />

      <HeroSection
        label="Process"
        title={
          <>
            Audit. Build. <span className="text-gold">Measure.</span>
          </>
        }
        subtitle="From an initial manual site teardown to a custom Next.js build and clean search measurement — here is how engagements run."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
      />

      <section className="process-detail" id="step-1-audit">
        <div className="container">
          <div className="process-detail__layout">
            <div className="process-detail__step-num">1</div>
            <div className="process-detail__content">
              <h3>Diagnostic Audit &amp; Scope Discovery</h3>
              <p>
                Every project starts with a written review identifying technical bottlenecks, index bloat, metadata conflicts, and positioning gaps across your existing site.
              </p>
              <div className="process-detail__items">
                <div className="process-detail__item">Core Web Vitals &amp; mobile layout review</div>
                <div className="process-detail__item">Index hygiene, canonicals &amp; sitemap audit</div>
                <div className="process-detail__item">Commercial positioning &amp; copy clarity review</div>
                <div className="process-detail__item">Consent-clean GA4 event tracking check</div>
                <div className="process-detail__item">301 redirect risk map prior to any migration</div>
                <div className="process-detail__item">Written priority roadmap before proposal sign-off</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-detail" id="step-2-build">
        <div className="container">
          <div className="process-detail__layout">
            <div className="process-detail__step-num" style={{ color: 'var(--color-red)' }}>2</div>
            <div className="process-detail__content">
              <h3>Custom Next.js Engineering &amp; SEO Hygiene</h3>
              <p>
                I build the approved pages in clean React and Next.js with prebuild SEO verification checks, milestone sign-off, and full repository ownership transferred to you.
              </p>
              <div className="process-detail__items">
                <div className="process-detail__item">Custom Next.js App Router frontend</div>
                <div className="process-detail__item">Consistent metadata, OpenGraph &amp; JSON-LD schema</div>
                <div className="process-detail__item">Explicit HTTP 301 rules for legacy URLs</div>
                <div className="process-detail__item">Validated contact &amp; RFQ forms with spam protection</div>
                <div className="process-detail__item">Automated prebuild checks preventing thin-page regressions</div>
                <div className="process-detail__item">Full source code handoff in your GitHub repository</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-detail" id="step-3-growth">
        <div className="container">
          <div className="process-detail__layout">
            <div className="process-detail__step-num">3</div>
            <div className="process-detail__content">
              <h3>Search Refinement &amp; Ongoing Optimization</h3>
              <p>
                Post-launch, Search Console indexing and GA4 telemetry guide targeted landing page improvements, content quality cleanups, and conversion iteration.
              </p>
              <div className="process-detail__items">
                <div className="process-detail__item">Bottom-of-funnel solution &amp; comparison pages</div>
                <div className="process-detail__item">Structured Q&amp;A blocks aligned to visible copy</div>
                <div className="process-detail__item">Search Console index &amp; sitemap monitoring</div>
                <div className="process-detail__item">Form drop-off and CTA clarity improvements</div>
                <div className="process-detail__item">Iterative Core Web Vitals optimization</div>
                <div className="process-detail__item">Transparent monthly change log and review</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="process-faq" id="process-faq">
        <div className="container">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Common Process Questions</h2>
          <div className="faq-list" style={{ marginTop: 'var(--space-2xl)', maxWidth: '800px' }}>
            {processFaqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`process-faq-answer-${i}`}
                  id={`process-faq-question-${i}`}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-item__toggle ${openFaq === i ? 'faq-item__toggle--open' : ''}`}>
                    +
                  </span>
                </button>
                <p
                  id={`process-faq-answer-${i}`}
                  className={`faq-item__answer ${openFaq === i ? 'faq-item__answer--visible' : ''}`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
