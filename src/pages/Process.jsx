import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import './Process.css';

const faqs = [
  {
    question: 'How do we collaborate if we are in different timezones?',
    answer: 'I am flexible with scheduling across US, UK, Australia, Canada, and Gulf timezones. We agree on a cadence that works: usually weekly async updates with a bi-weekly call.',
  },
  {
    question: 'What tools do you use for communication?',
    answer: 'Zoom for calls, Slack or WhatsApp for async messaging, Google Docs for shared briefs and content calendars, and Loom for screen recordings when needed.',
  },
  {
    question: 'How many revisions are included in the website build?',
    answer: 'Two rounds of revisions are included in every website build. Additional rounds can be arranged at a nominal hourly rate.',
  },
  {
    question: 'Can I start with just the audit and decide later?',
    answer: 'Absolutely. The free growth audit is zero-commitment. You walk away with a clear action plan regardless of whether you choose to work with me.',
  },
];

export default function Process() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Helmet>
        <title>How I Work | Audit to B2B Website & Retainer | Moksh</title>
        <meta
          name="description"
          content="From a free 30-minute audit to a live React JS website and a monthly SEO, GEO, LinkedIn, and ads retainer. Here is exactly how I partner with B2B businesses."
        />
      </Helmet>

      <HeroSection
        label="Process"
        title={
          <>
            Audit. Build. <span className="text-gold">Grow.</span>
          </>
        }
        subtitle="From a free 30-minute audit to a live React JS website to a monthly growth retainer. Here is exactly how I work with clients."
        primaryCTA={{ to: '/free-audit', label: 'Book Free Audit' }}
      />

      {/* Step 1 */}
      <section className="process-detail" id="step-1-audit">
        <div className="container">
          <div className="process-detail__layout">
            <div className="process-detail__step-num">1</div>
            <div className="process-detail__content">
              <h3>Free Growth Audit (30 min)</h3>
              <p>
                We start with a free 30-minute call where the audit uncovers exactly what is blocking your leads.
                You walk away with a clear priority list with no pitch, no pressure.
              </p>
              <div className="process-detail__items">
                <div className="process-detail__item">Website UX & conversion rate review</div>
                <div className="process-detail__item">SEO & GEO gap analysis</div>
                <div className="process-detail__item">LinkedIn presence & content audit</div>
                <div className="process-detail__item">Ads performance review (if running)</div>
                <div className="process-detail__item">GA4 & analytics setup check</div>
                <div className="process-detail__item">Clear priority list delivered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="process-detail" id="step-2-build">
        <div className="container">
          <div className="process-detail__layout">
            <div className="process-detail__step-num" style={{ color: 'var(--color-red)' }}>2</div>
            <div className="process-detail__content">
              <h3>Build Sprint (7–14 days)</h3>
              <p>
                The build phase delivers a live, GA4-tracked, conversion-ready website 
                with SEO-optimized pages and mobile responsive design, delivered as a live URL 
                you fully control.
              </p>
              <div className="process-detail__items">
                <div className="process-detail__item">Custom React JS website (5–8 pages)</div>
                <div className="process-detail__item">SEO-optimized page structure</div>
                <div className="process-detail__item">GA4 event tracking setup</div>
                <div className="process-detail__item">Contact or quote capture form</div>
                <div className="process-detail__item">Mobile responsive across all devices</div>
                <div className="process-detail__item">Handed over as a live URL you control</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="process-detail" id="step-3-growth">
        <div className="container">
          <div className="process-detail__layout">
            <div className="process-detail__step-num">3</div>
            <div className="process-detail__content">
              <h3>Growth Engine (Monthly)</h3>
              <p>
                Your customized content system runs SEO, GEO, and LinkedIn every month. 
                Monthly performance reports show exactly what moved and what to fix next, alongside ongoing ads management and CRO experiments.
              </p>
              <div className="process-detail__items">
                <div className="process-detail__item">SEO blog content strategy & creation</div>
                <div className="process-detail__item">GEO phrase optimization</div>
                <div className="process-detail__item">LinkedIn authority posts</div>
                <div className="process-detail__item">Meta & Google Ads management</div>
                <div className="process-detail__item">CRO experiments & testing</div>
                <div className="process-detail__item">Monthly analytics review & report</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="process-faq" id="process-faq">
        <div className="container">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Common Questions</h2>
          <div className="faq-list" style={{ marginTop: 'var(--space-2xl)', maxWidth: '800px' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <div
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.question}
                  <span className={`faq-item__toggle ${openFaq === i ? 'faq-item__toggle--open' : ''}`}>
                    +
                  </span>
                </div>
                {openFaq === i && (
                  <p className="faq-item__answer">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
