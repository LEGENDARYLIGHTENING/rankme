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
              <h3>Diagnostic Audit &amp; Strategic Discovery</h3>
              <p>
                Every engagement begins with an executive diagnostic evaluating commercial bottlenecks, conversion friction, and organic discoverability across your digital footprint.
              </p>
              <div className="process-detail__items">
                <div className="process-detail__item">High-intent buyer experience &amp; conversion friction evaluation</div>
                <div className="process-detail__item">Search equity preservation &amp; discoverability assessment</div>
                <div className="process-detail__item">Commercial positioning &amp; value proposition clarity review</div>
                <div className="process-detail__item">Inbound pipeline &amp; lead tracking verification</div>
                <div className="process-detail__item">Domain authority &amp; traffic retention mapping</div>
                <div className="process-detail__item">Actionable executive roadmap with defined milestones</div>
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
              <h3>Proprietary Web Engineering &amp; Platform Deployment</h3>
              <p>
                We architect custom digital platforms engineered for speed, conversion, and market authority, transferring complete codebase and asset ownership to your organization.
              </p>
              <div className="process-detail__items">
                <div className="process-detail__item">Bespoke high-performance Next.js web infrastructure</div>
                <div className="process-detail__item">Multi-platform search &amp; generative AI answer readiness</div>
                <div className="process-detail__item">Zero-loss domain equity preservation &amp; traffic retention</div>
                <div className="process-detail__item">Enterprise inquiry capture &amp; verified lead routing</div>
                <div className="process-detail__item">Rigorous quality benchmarks &amp; sub-second performance</div>
                <div className="process-detail__item">Complete repository handoff with zero platform lock-in</div>
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
              <h3>Market Authority &amp; Pipeline Acceleration</h3>
              <p>
                Post-launch, our ongoing refinement focuses on inbound pipeline velocity, buyer engagement, and long-term commercial search authority.
              </p>
              <div className="process-detail__items">
                <div className="process-detail__item">High-intent commercial solution ecosystems</div>
                <div className="process-detail__item">Executive decision &amp; buyer evaluation assets</div>
                <div className="process-detail__item">Continuous search authority &amp; indexation intelligence</div>
                <div className="process-detail__item">Inquiry qualification &amp; conversion pathway refinement</div>
                <div className="process-detail__item">Sub-second global speed &amp; Core Web Vitals maintenance</div>
                <div className="process-detail__item">Transparent executive milestone reviews &amp; progress logs</div>
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
