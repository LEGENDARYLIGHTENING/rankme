"use client";

import HeroSection from '../components/HeroSection';
import ClientTrustBar from '../components/ClientTrustBar';
import CTABlock from '../components/CTABlock';
import Testimonials from '../components/Testimonials';
import Guarantee from '../components/Guarantee';
import psiMetrics from '../data/psiMetrics.json';
import { APPROVED_TESTIMONIALS } from '../data/testimonials';
import './CaseStudies.css';

const architecturalHighlights = [
  { value: 'Next.js 16', label: 'Static & App Router Architecture' },
  { value: '5 Platforms', label: 'Client Work & In-House Ventures' },
  { value: 'Transparent', label: 'Venture Ownership Disclosed' },
  { value: 'Clean Code', label: 'Full Repository Ownership' },
  { value: 'Milestone', label: 'Scoped Proposal Sign-Off' },
];

function getApprovedQuote(id) {
  return APPROVED_TESTIMONIALS.find((t) => t.id === id) || null;
}

function PsiBlock({ id }) {
  const m = psiMetrics[id];
  if (!m || !m.ok) return null;
  return (
    <div style={{ margin: '1rem 0', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <strong style={{ color: 'var(--color-gold)', fontSize: '0.85rem' }}>
        Measured Lab Performance ({m.caption}):
      </strong>
      <p style={{ margin: '0.35rem 0 0', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
        Performance Score: {m.performanceScore}/100 · FCP: {m.fcp} · LCP: {m.lcp} · CLS: {m.cls} · TBT: {m.tbt}
      </p>
    </div>
  );
}

export default function CaseStudies() {
  const wiziotQuote = getApprovedQuote('wiziot');
  const atlantaQuote = getApprovedQuote('atlanta-systems');
  const medventaQuote = getApprovedQuote('medventa');
  const probiotaQuote = getApprovedQuote('probiota');
  const wafaQuote = getApprovedQuote('wafa-trust');

  return (
    <>
      <HeroSection
        label="Platforms I've Built"
        title={
          <>
            Client Projects &amp; <span className="text-gold">In-House Ventures</span>
          </>
        }
        subtitle="A factual breakdown of the Next.js architectures I engineered for B2B clients and my own in-house ventures."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
        secondaryCTA={{ to: '#wiziot-case-study', label: 'Explore Builds' }}
      />

      <ClientTrustBar
        title="Platforms I've Built"
        subtitle="Each platform below is clearly marked by whether it was a third-party client project or built/co-led for an in-house venture."
      />

      <nav className="case-studies-nav" aria-label="Case Studies Quick Navigation">
        <div className="container">
          <div className="case-studies-nav__pills">
            <a href="#wiziot-case-study" className="case-studies-nav__pill">
              01. WizIOT (Client)
            </a>
            <a href="#atlanta-case-study" className="case-studies-nav__pill">
              02. Atlanta Systems (In-House Venture)
            </a>
            <a href="#medventa-case-study" className="case-studies-nav__pill">
              03. Medventa (Client)
            </a>
            <a href="#probiota-case-study" className="case-studies-nav__pill">
              04. Probiota Innovations (In-House Venture)
            </a>
            <a href="#wafa-case-study" className="case-studies-nav__pill">
              05. Wafa Trust (Client Archive)
            </a>
          </div>
        </div>
      </nav>

      {/* Case Study 01: WizIOT */}
      <section
        className="case-full"
        id="wiziot-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Client Project · Live Website
          </div>
          <p className="section-label">Case Study 01 · Enterprise IoT &amp; Fleet Telematics</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            WizIOT: Fleet Telematics &amp; Hardware Platform
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image">
              <img
                src="/case-studies/wiziot.webp"
                alt="WizIOT enterprise fleet telematics homepage screenshot"
                width={1200}
                height={750}
                loading="lazy"
              />
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Client Project</span>
                <span className="case-full__tech-pill">Next.js 16 + App Router</span>
                <span className="case-full__tech-pill">Edge Delivery</span>
                <span className="case-full__tech-pill">Fleet Telematics Schema</span>
              </div>

              <h3>Context &amp; Scope</h3>
              <p>
                WizIOT provides enterprise fleet telematics and IoT hardware across GCC, African, and European markets. They needed a structured multi-vertical platform capable of presenting hardware protocols, fuel monitoring solutions, and cold-chain tracking clearly to procurement evaluators.
              </p>

              <h3>My Engineering Approach</h3>
              <ul>
                <li>Engineered a static-first Next.js 16 frontend organized by industry vertical and platform capability.</li>
                <li>Built structured hardware specification templates and demo request pathways for commercial fleet operators.</li>
                <li>Configured clean JSON-LD schema and technical metadata across solution routes.</li>
              </ul>

              <PsiBlock id="wiziot" />

              <div className="case-full__live-box">
                <div className="case-full__live-box-text">
                  <span className="case-full__live-box-title">WizIOT Live Website</span>
                  <span className="case-full__live-box-subtitle">External client site</span>
                </div>
                <a
                  href="https://www.wiziot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-full__verify-btn"
                >
                  Visit site &#8599;
                </a>
              </div>

              {wiziotQuote && (
                <div className="case-full__quote-block">
                  <p className="case-full__quote-text">&ldquo;{wiziotQuote.quote}&rdquo;</p>
                  <p className="case-full__quote-author">&mdash; {wiziotQuote.name}, {wiziotQuote.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 02: Atlanta Systems */}
      <section
        className="case-full"
        id="atlanta-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Co-led for an in-house venture
          </div>
          <p className="section-label">Case Study 02 · AIS-140 GPS &amp; Automotive Telematics</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            Atlanta Systems: AIS-140 Telematics Manufacturing Platform
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image" style={{ flexDirection: 'column', gap: '0.75rem', padding: '2rem', textAlign: 'center' }}>
              <span style={{ color: 'var(--color-gold)', fontSize: '1.35rem', fontWeight: 700 }}>
                Atlanta Systems
              </span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '340px' }}>
                Co-led for an in-house venture. Live domain uses Cloudflare bot verification; desktop screenshot pending manual capture.
              </span>
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Co-led In-House Venture</span>
                <span className="case-full__tech-pill">Next.js 16</span>
                <span className="case-full__tech-pill">AIS-140 Compliance Pages</span>
                <span className="case-full__tech-pill">B2B RFQ Routing</span>
              </div>

              <h3>Disclosure &amp; Context</h3>
              <p>
                Atlanta Systems manufactures AIS-140 certified GPS trackers and automotive telematics hardware. I co-led and built the digital infrastructure and SEO architecture for this in-house venture rather than as an arm&apos;s-length outside vendor.
              </p>

              <h3>My Engineering Approach</h3>
              <ul>
                <li>Engineered static Next.js hardware specification pages covering AIS-140 certification, IRNSS/NavIC support, and regulatory documentation.</li>
                <li>Structured direct institutional RFQ forms with clear hardware category selection.</li>
                <li>Applied product and organization schema markup across OBD trackers, dashcams, and fleet hardware SKUs.</li>
              </ul>

              <PsiBlock id="atlanta-systems" />

              <div className="case-full__live-box">
                <div className="case-full__live-box-text">
                  <span className="case-full__live-box-title">Atlanta Systems Website</span>
                  <span className="case-full__live-box-subtitle">Co-led for an in-house venture</span>
                </div>
                <a
                  href="https://www.atlantasys.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-full__verify-btn"
                >
                  Visit site &#8599;
                </a>
              </div>

              {atlantaQuote && (
                <div className="case-full__quote-block">
                  <p className="case-full__quote-text">&ldquo;{atlantaQuote.quote}&rdquo;</p>
                  <p className="case-full__quote-author">&mdash; {atlantaQuote.name}, {atlantaQuote.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 03: Medventa */}
      <section
        className="case-full"
        id="medventa-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Client Project · Live Website
          </div>
          <p className="section-label">Case Study 03 · B2B Medical Supplies &amp; Hospital Catalog</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            Medventa: Headless Medical Procurement Platform
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image">
              <img
                src="/case-studies/medventa.webp"
                alt="Medventa headless medical catalog homepage screenshot"
                width={1200}
                height={750}
                loading="lazy"
              />
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Client Project</span>
                <span className="case-full__tech-pill">Next.js 14 Headless Catalog</span>
                <span className="case-full__tech-pill">Structured SKU Filters</span>
                <span className="case-full__tech-pill">Hospital RFQ Workflow</span>
              </div>

              <h3>Context &amp; Scope</h3>
              <p>
                Medventa supplies surgical sutures and hospital consumables to medical procurement officers who need straightforward access to needle gauges, suture dimensions, packaging specs, and bulk quote requests without slow consumer checkout clutter.
              </p>

              <h3>My Engineering Approach</h3>
              <ul>
                <li>Built a headless Next.js 14 medical catalog organized cleanly by surgical category and product spec.</li>
                <li>Added client-side category search and institutional RFQ inquiry routing without retail cart friction.</li>
                <li>Applied structured schema markup cleanly across category and product pages.</li>
              </ul>

              <PsiBlock id="medventa" />

              <div className="case-full__live-box">
                <div className="case-full__live-box-text">
                  <span className="case-full__live-box-title">Medventa Live Website</span>
                  <span className="case-full__live-box-subtitle">External client site</span>
                </div>
                <a
                  href="https://www.medventa.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-full__verify-btn"
                >
                  Visit site &#8599;
                </a>
              </div>

              {medventaQuote && (
                <div className="case-full__quote-block">
                  <p className="case-full__quote-text">&ldquo;{medventaQuote.quote}&rdquo;</p>
                  <p className="case-full__quote-author">&mdash; {medventaQuote.name}, {medventaQuote.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 04: Probiota Innovations */}
      <section
        className="case-full"
        id="probiota-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Built in-house · In-House Venture
          </div>
          <p className="section-label">Case Study 04 · Nutraceutical CDMO Manufacturing</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            Probiota Innovations: CDMO Web Platform
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image">
              <img
                src="/case-studies/probiota.webp"
                alt="Probiota Innovations CDMO website homepage screenshot"
                width={1200}
                height={750}
                loading="lazy"
              />
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Built In-House</span>
                <span className="case-full__tech-pill">Next.js 16 Custom Build</span>
                <span className="case-full__tech-pill">CDMO Spec Pages</span>
                <span className="case-full__tech-pill">GA4 Event Tracking</span>
              </div>

              <h3>Disclosure &amp; Context</h3>
              <p>
                Probiota Innovations is a probiotic and functional gummy contract manufacturer (CDMO) built for my own in-house venture. I engineered the platform to organize formulation capabilities, regulatory documentation, and wholesale manufacturing inquiries.
              </p>

              <h3>My Engineering Approach</h3>
              <ul>
                <li>Built a custom static Next.js 16 codebase from scratch without bloated theme templates.</li>
                <li>Created structured dosage format pages, capability breakdowns, and private-label inquiry flows.</li>
                <li>Configured GA4 conversion event tracking on inquiry forms and key buyer documentation views.</li>
              </ul>

              <PsiBlock id="probiota" />

              <div className="case-full__live-box">
                <div className="case-full__live-box-text">
                  <span className="case-full__live-box-title">Probiota Innovations Website</span>
                  <span className="case-full__live-box-subtitle">Built in-house for my own venture</span>
                </div>
                <a
                  href="https://www.probiotainnovations.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-full__verify-btn"
                >
                  Visit site &#8599;
                </a>
              </div>

              {probiotaQuote && (
                <div className="case-full__quote-block">
                  <p className="case-full__quote-text">&ldquo;{probiotaQuote.quote}&rdquo;</p>
                  <p className="case-full__quote-author">
                    &mdash; {probiotaQuote.name}, {probiotaQuote.role} (In-house venture)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 05: Wafa Trust */}
      <section
        className="case-full"
        id="wafa-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Historical Client Project · Domain Offline
          </div>
          <p className="section-label">Case Study 05 · Healthcare &amp; Community NGO</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            Wafa Trust: Accessible NGO Web Build
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image" style={{ flexDirection: 'column', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
              <img
                src="/wafa-trust-logo.jpeg"
                alt="Wafa Educational And Charitable Trust logo"
                style={{ width: '96px', height: '96px', objectFit: 'contain', borderRadius: '8px' }}
              />
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', maxWidth: '340px' }}>
                Archive note: `wafatrust.org` does not currently resolve in DNS (`NXDOMAIN`). External live link disabled until domain is restored.
              </span>
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Client Project (Archive)</span>
                <span className="case-full__tech-pill">Next.js Frontend</span>
                <span className="case-full__tech-pill">Accessible Mobile Layout</span>
              </div>

              <h3>Context &amp; Scope</h3>
              <p>
                Wafa Educational and Charitable Trust manages community healthcare and scholarship programs. I built a lightweight Next.js web presence focused on clean mobile readability and clear program summaries for donors.
              </p>

              <h3>My Engineering Approach</h3>
              <ul>
                <li>Delivered a responsive mobile-first Next.js layout with lightweight assets.</li>
                <li>Organized philanthropic program documentation and transparent donation contact pathways.</li>
              </ul>

              {wafaQuote && (
                <div className="case-full__quote-block">
                  <p className="case-full__quote-text">&ldquo;{wafaQuote.quote}&rdquo;</p>
                  <p className="case-full__quote-author">&mdash; {wafaQuote.name}, {wafaQuote.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="impact-section" id="delivery-standards">
        <div className="container">
          <p className="section-label">Delivery Basis</p>
          <h2 className="section-title">How Builds Are Structured</h2>
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
