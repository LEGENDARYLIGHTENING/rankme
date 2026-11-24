"use client";

import HeroSection from '../components/HeroSection';
import ClientTrustBar from '../components/ClientTrustBar';
import CTABlock from '../components/CTABlock';
import Testimonials from '../components/Testimonials';
import Guarantee from '../components/Guarantee';
import { APPROVED_TESTIMONIALS } from '../data/testimonials';
import './CaseStudies.css';

const architecturalHighlights = [
  { value: 'Verified Build', label: 'Live Client Platform' },
  { value: 'Accessible', label: 'Mobile-First Design' },
  { value: 'Clean Code', label: 'Full Repository Ownership' },
  { value: 'Performance', label: 'Edge Architecture (TODO: Add measured number)' },
  { value: 'Structured', label: 'Schema Knowledge Graph' },
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
            <div className="case-full__image" style={{ position: 'relative', overflow: 'hidden', minHeight: '380px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <img
                src="/showcase/hero-section-with-mousemove.webp"
                alt="Wafa Educational And Charitable Trust platform live architecture"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '380px',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  filter: 'brightness(0.65) contrast(1.15)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(14, 18, 24, 0.3) 0%, rgba(14, 18, 24, 0.95) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '2.5rem',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/wafa-trust-logo.jpeg"
                  alt="Wafa Educational And Charitable Trust logo"
                  style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '12px', marginBottom: '0.85rem', boxShadow: '0 8px 24px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.01em' }}>
                  Wafa Educational &amp; Charitable Trust
                </span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.35rem', marginBottom: '1rem' }}>
                  Live Web Platform · https://www.wafatrustindia.org/
                </span>
                <a
                  href="https://www.wafatrustindia.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
                >
                  Visit Live Site &rarr;
                </a>
              </div>
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
                Wafa Educational and Charitable Trust manages community healthcare, charitable dispensaries, and educational scholarship initiatives. They required a modern, accessible web platform to convey their humanitarian mission and facilitate direct donor inquiries.
              </p>

              <h3>What Was Built (Architecture &amp; Features)</h3>
              <ul>
                <li><strong>Accessible Modern Web Architecture:</strong> Built a lightweight, mobile-first frontend ensuring fast load times across devices.</li>
                <li><strong>Clear Program Hierarchy:</strong> Structured community outreach, medical dispensaries, and educational programs into clear modules.</li>
                <li><strong>Inquiry &amp; Contact Pathways:</strong> Implemented direct contact pathways to facilitate donor communication and support.</li>
                <li><em>TODO: Detail exact pages and features built</em></li>
              </ul>

              <h3>Verified Metrics &amp; Performance Telemetry</h3>
              <ul>
                <li><strong>Performance:</strong> <em>TODO: Measured PageSpeed/Lighthouse numbers, with test date and device</em></li>
                <li><strong>Search &amp; Visibility:</strong> <em>TODO: Indexed-page count, and any before/after traffic from GSC/GA4</em></li>
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
                  <p className="case-full__quote-author">- {wafaQuote.name} <em>(TODO: Named person name and title, as approved by Wafa)</em></p>
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
