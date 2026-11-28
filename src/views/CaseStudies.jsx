"use client";

import HeroSection from '../components/HeroSection';
import ClientTrustBar from '../components/ClientTrustBar';
import CTABlock from '../components/CTABlock';
import Guarantee from '../components/Guarantee';
import { APPROVED_TESTIMONIALS } from '../data/testimonials';
import './CaseStudies.css';

const architecturalHighlights = [
  { value: 'Next.js 16', label: 'React 19 App Router' },
  { value: 'Vercel', label: 'Prerendered Hosting' },
  { value: 'GitHub', label: 'Full Repository Ownership' },
  { value: 'Live Site', label: 'wafatrustindia.org' },
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
        subtitle="Rebuilt from WordPress to Next.js 16 with React 19 (App Router) and hosted on Vercel."
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
            Client Platform · Live Production
          </div>
          <p className="section-label">Case Study · Client Build</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            Wafa Educational &amp; Charitable Trust: Next.js Web Platform
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
                <span className="case-full__tech-pill">Next.js 16 + React 19</span>
                <span className="case-full__tech-pill">Vercel Edge Cache</span>
                <span className="case-full__tech-pill">Zero Third-Party JS on Homepage</span>
              </div>

              <h3>What Was Built</h3>
              <ul>
                <li><strong>WordPress to Next.js Migration:</strong> Rebuilt the Wafa Trust website from WordPress to Next.js 16 with React 19 (App Router).</li>
                <li><strong>Page Modules:</strong> Implemented a hero slider, impact counters, a project showcase, a campaign grid, and a donation section with a QR code.</li>
                <li><strong>On-Page Technical Baseline:</strong> Configured the homepage with one H1, a language attribute, a canonical tag, a robots.txt, and alt text on all 17 images.</li>
              </ul>

              <h3>Approach</h3>
              <p>
                Hosted on Vercel, pages are prerendered and served from Vercel&apos;s edge cache (verified via <code>x-nextjs-prerender</code> and <code>x-vercel-cache: HIT</code> response headers), with zero third-party JavaScript loading on the homepage.
              </p>

              <h3>Result</h3>
              <p>
                Built to the client&apos;s brief and approved by the client.
              </p>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
                <strong>Desktop measurement (Lighthouse lab test, desktop, median of 5 runs, Nov 2026):</strong> Performance 97, LCP 1.17s, CLS 0, TBT 13ms.
              </p>

              <div className="case-full__live-box">
                <span className="case-full__live-box-title">Live Platform</span>
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
                  <p className="case-full__quote-author">- {wafaQuote.name}</p>
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

      <CTABlock />
    </>
  );
}
