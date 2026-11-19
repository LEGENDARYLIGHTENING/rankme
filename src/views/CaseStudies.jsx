"use client";

import HeroSection from '../components/HeroSection';
import ClientTrustBar from '../components/ClientTrustBar';
import CTABlock from '../components/CTABlock';
import Testimonials from '../components/Testimonials';
import Guarantee from '../components/Guarantee';
import { APPROVED_TESTIMONIALS } from '../data/testimonials';
import './CaseStudies.css';

const architecturalHighlights = [
  { value: '<1s Load', label: 'Sub-Second Global Edge Performance' },
  { value: 'Verified Build', label: 'Live Client Platform' },
  { value: 'Accessible', label: 'Mobile-First Design' },
  { value: 'Clean Code', label: 'Full Repository Ownership' },
  { value: 'Sub-Second', label: 'Core Web Vitals Speed' },
];

function getApprovedQuote(id) {
  return APPROVED_TESTIMONIALS.find((t) => t.id === id) || null;
}

export default function CaseStudies() {
  const wafaQuote = getApprovedQuote('wafa-trust');

  return (
    <>
      <HeroSection
        label="Evidence & Client Builds"
        title={
          <>
            Production <span className="text-gold">Web Architecture</span>
          </>
        }
        subtitle="A factual breakdown of custom web platforms, technical SEO structures, and conversion engines engineered for real organizations."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
        secondaryCTA={{ to: '#wafa-case-study', label: 'Explore Build' }}
      />

      <ClientTrustBar
        title="Featured Client Platform"
        subtitle="Live production platform engineered with sub-second responsiveness, mobile accessibility, and clean search architecture."
      />

      {/* Case Study: Wafa Educational & Charitable Trust */}
      <section
        className="case-full"
        id="wafa-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Verified Client Platform · Live Production
          </div>
          <p className="section-label">Case Study · Healthcare, Education &amp; Philanthropic NGO</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            Wafa Educational &amp; Charitable Trust: Accessible Digital Platform
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image" style={{ flexDirection: 'column', gap: '1.25rem', padding: '2.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #0e1218 0%, #1a2230 100%)', borderRadius: '12px' }}>
              <img
                src="/wafa-trust-logo.jpeg"
                alt="Wafa Educational And Charitable Trust logo"
                style={{ width: '110px', height: '110px', objectFit: 'contain', borderRadius: '8px' }}
              />
              <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.15rem' }}>
                Wafa Educational &amp; Charitable Trust
              </span>
              <a
                href="https://www.wafatrustindia.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary"
                style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem', marginTop: '0.5rem' }}
              >
                Visit Live Site &rarr;
              </a>
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Client Project</span>
                <span className="case-full__tech-pill">High-Performance Frontend</span>
                <span className="case-full__tech-pill">Mobile-First Accessibility</span>
                <span className="case-full__tech-pill">Structured Data Schema</span>
              </div>

              <h3>Context &amp; Mission</h3>
              <p>
                Wafa Educational and Charitable Trust manages vital community healthcare, charitable dispensaries, and educational scholarship initiatives. They required a modern, highly accessible web presence capable of conveying their mission to donors, volunteers, and beneficiaries worldwide.
              </p>

              <h3>Engineering &amp; Architecture Approach</h3>
              <ul>
                <li><strong>Accessible Modern Web Architecture:</strong> Built a lightweight, mobile-first frontend ensuring instant load times across varying network speeds and devices.</li>
                <li><strong>Clear Program Hierarchy:</strong> Structured community outreach, medical dispensaries, and education programs into clear, easy-to-navigate modules.</li>
                <li><strong>Transparent Engagement Pathways:</strong> Implemented frictionless donor contact and inquiry pathways to facilitate support and community engagement.</li>
              </ul>

              <div className="case-full__live-box">
                <span className="case-full__live-box-title">Verified Live Platform</span>
                <p>Digital platform live and accessible at:</p>
                <a
                  href="https://www.wafatrustindia.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-full__live-link"
                >
                  https://www.wafatrustindia.org/ &rarr;
                </a>
              </div>

              {wafaQuote && (
                <div className="case-full__quote-block">
                  <p className="case-full__quote-text">&ldquo;{wafaQuote.quote}&rdquo;</p>
                  <p className="case-full__quote-author">&mdash; {wafaQuote.name}, {wafaQuote.role}, {wafaQuote.company}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* B2B Engineering Standards */}
      <section className="impact-section" id="delivery-standards">
        <div className="container">
          <p className="section-label">Engineering Standards</p>
          <h2 className="section-title">How Every Platform Is Built</h2>
          <div className="impact-grid">
            {architecturalHighlights.map((item, i) => (
              <div key={i} className="impact-item">
                <span className="impact-value">{item.value}</span>
                <span className="impact-label">{item.label}</span>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: 'var(--space-2xl)' }}>
            <Guarantee />
          </p>
        </div>
      </section>

      <Testimonials />

      <CTABlock />
    </>
  );
}
