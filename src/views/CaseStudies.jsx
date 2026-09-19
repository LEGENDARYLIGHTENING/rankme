"use client";

import HeroSection from '../components/HeroSection';
import ClientTrustBar from '../components/ClientTrustBar';
import CTABlock from '../components/CTABlock';
import Testimonials from '../components/Testimonials';
import './CaseStudies.css';

const impactItems = [
  { value: '2,280+', label: 'Static Pages in Production' },
  { value: '5 Platforms', label: 'Verified Client Deployments' },
  { value: '< 0.9s', label: 'Sub-Second Global LCP' },
  { value: '100%', label: 'Crawl Indexation Ratio' },
  { value: '50+ Leads', label: 'First Month Inbound Pipeline' },
];

export default function CaseStudies() {
  return (
    <>
      <HeroSection
        label="Evidence & Case Studies"
        title={
          <>
            Outcome-First <span className="text-gold">B2B Performance</span>
          </>
        }
        subtitle="We design, engineer, and scale high-performance digital infrastructure for high-trust B2B enterprises. Every platform listed below is live in production with verified site-wide footer backlinks to Rankur."
        primaryCTA={{ to: '/free-audit', label: 'Request custom Audit' }}
        secondaryCTA={{ to: '#wiziot-case-study', label: 'Explore Case Studies' }}
      />

      {/* Client Trust Bar */}
      <ClientTrustBar
        title="Live Production Client Ecosystem"
        subtitle="Click any verified client platform below to inspect live infrastructure and verify Rankur's site-wide footer backlink in the wild."
      />

      {/* Quick Navigation Sticky Strip */}
      <nav className="case-studies-nav" aria-label="Case Studies Quick Navigation">
        <div className="container">
          <div className="case-studies-nav__pills">
            <a href="#wiziot-case-study" className="case-studies-nav__pill">
              01. WizIOT (1,040+ Pages)
            </a>
            <a href="#atlanta-case-study" className="case-studies-nav__pill">
              02. Atlanta Systems (460+ Pages)
            </a>
            <a href="#medventa-case-study" className="case-studies-nav__pill">
              03. Medventa (440+ Pages)
            </a>
            <a href="#probiota-case-study" className="case-studies-nav__pill">
              04. Probiota Innovations (340+ Pages)
            </a>
            <a href="#wafa-case-study" className="case-studies-nav__pill">
              05. Wafa Trust (Healthcare NGO)
            </a>
            <a href="#channel-growth-systems" className="case-studies-nav__pill">
              06. Growth & Channel Systems
            </a>
          </div>
        </div>
      </nav>

      {/* =========================================================
          Case Study 01: WizIOT
          ========================================================= */}
      <section
        className="case-full"
        id="wiziot-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Verified Deployment · Live Production Infrastructure
          </div>
          <p className="section-label">Case Study 01 · Enterprise IoT & Fleet Telematics Architecture</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            WizIOT: Monolithic Next.js 16 Platform Across EMEA & GCC
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
                alt="WizIOT Enterprise IoT Fleet Telematics Platform Preview"
              />
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Next.js 16 + Turbopack</span>
                <span className="case-full__tech-pill">1,040+ Static Pages</span>
                <span className="case-full__tech-pill">Cloudflare Edge</span>
                <span className="case-full__tech-pill">Fleet Telematics Schema</span>
              </div>

              <h3>The Challenge & Context</h3>
              <p>
                WizIOT is an enterprise fleet telematics and IoT sensor hardware provider operating across Africa, the GCC, and Europe. They required an expansive, high-authority digital footprint capable of presenting complex IoT hardware protocols, fuel monitoring integrations, and cold-chain telematics without sacrificing page speed or indexing speed.
              </p>

              <h3>Our Architecture & Solution</h3>
              <ul>
                <li>Architected a custom Next.js 16 static infrastructure with Turbopack, pre-rendering over 1,040+ static pages with zero runtime overhead.</li>
                <li>Engineered hierarchical hardware specification templates and interactive sensor feature matrices for enterprise procurement teams.</li>
                <li>Configured custom Cloudflare edge caching rules and international geo-routing to deliver sub-0.9s load times across UAE, Saudi Arabia, Kenya, and Europe.</li>
                <li>Implemented comprehensive IoT Hardware and Fleet Telematics JSON-LD schema models to secure rich search results and generative AI retrieval.</li>
              </ul>

              <h3>Verified Results & Impact</h3>
              <ul>
                <li><strong>1,040+ static pages deployed</strong> and indexed in Google Search Console with zero crawl budget waste or pagination debt.</li>
                <li>Achieved a global Largest Contentful Paint (LCP) under <strong>0.9 seconds</strong> across international corporate networks.</li>
                <li>Established direct inbound inquiry routing for commercial fleet operators and regional telematics distributors.</li>
              </ul>

              {/* Live Verification Box */}
              <div className="case-full__live-box">
                <div className="case-full__live-box-text">
                  <span className="case-full__live-box-title">Inspect WizIOT in Production</span>
                  <span className="case-full__live-box-subtitle">Permanent footer backlink: "This site was designed and built by Rankur"</span>
                </div>
                <a
                  href="https://www.wiziot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-full__verify-btn"
                >
                  Visit WizIOT.com ↗
                </a>
              </div>

              <div className="case-full__quote-block">
                <p className="case-full__quote-text">
                  "Rankur engineered our Next.js 16 platform to handle 1,040+ static pages with sub-second speeds across Africa, GCC, and Europe. Our global fleet enterprise buyers and channel partners immediately noticed the difference in performance and technical clarity."
                </p>
                <p className="case-full__quote-author">
                  - Engineering & Technical Leadership, WizIOT Telematics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Case Study 02: Atlanta Systems
          ========================================================= */}
      <section
        className="case-full"
        id="atlanta-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Verified Deployment · Live Production Infrastructure
          </div>
          <p className="section-label">Case Study 02 · Automotive Telematics & AIS-140 GPS Manufacturing</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            Atlanta Systems: AIS-140 Telematics Manufacturing Platform
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image">
              <img
                src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
                alt="Atlanta Systems AIS-140 Certified GPS Telematics Platform Preview"
              />
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Next.js 16 + Webpack</span>
                <span className="case-full__tech-pill">460+ Static Pages</span>
                <span className="case-full__tech-pill">AIS-140 Compliance SEO</span>
                <span className="case-full__tech-pill">B2B RFQ Automation</span>
              </div>

              <h3>The Challenge & Context</h3>
              <p>
                Atlanta Systems is a premier manufacturer of AIS-140 certified GPS trackers and automotive telematics hardware. In India and international export markets, commercial vehicle compliance requires rigorous governmental certification. They needed a high-performance web platform that establishes undeniable regulatory authority and funnels high-volume institutional RFQs.
              </p>

              <h3>Our Architecture & Solution</h3>
              <ul>
                <li>Engineered 460+ high-performance static pages on custom Next.js 16, optimized for technical specification downloads and device compliance records.</li>
                <li>Mapped out and built dedicated keyword silos targeting AIS-140 certification, emergency response support (IRNSS/NavIC), and state transport regulatory requirements.</li>
                <li>Created frictionless digital RFQ submission pathways with instant lead qualification and CRM webhooks.</li>
                <li>Standardized device schema markup across automotive OBD trackers, dashcam telematics, and heavy-equipment asset trackers.</li>
              </ul>

              <h3>Verified Results & Impact</h3>
              <ul>
                <li><strong>460+ static pages indexed with 100% crawl accuracy</strong> across competitive government and commercial transport queries.</li>
                <li>Eliminated page latency down to <strong>sub-1.1s</strong> globally, reducing bounce rates among mobile fleet managers.</li>
                <li>Generated consistent institutional requests for quotations (RFQs) for bulk hardware deployments.</li>
              </ul>

              {/* Live Verification Box */}
              <div className="case-full__live-box">
                <div className="case-full__live-box-text">
                  <span className="case-full__live-box-title">Inspect Atlanta Systems in Production</span>
                  <span className="case-full__live-box-subtitle">Permanent footer backlink: "This site was designed and built by Rankur"</span>
                </div>
                <a
                  href="https://www.atlantasys.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-full__verify-btn"
                >
                  Visit AtlantaSys.com ↗
                </a>
              </div>

              <div className="case-full__quote-block">
                <p className="case-full__quote-text">
                  "Building 460+ high-performance static pages with Next.js gave us instant 100% crawl indexation on AIS-140 certified GPS hardware terms. Rankur's technical SEO and conversion architecture streamlined our incoming enterprise RFQ pipeline."
                </p>
                <p className="case-full__quote-author">
                  - Commercial & Operations Leadership, Atlanta Systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Case Study 03: Medventa
          ========================================================= */}
      <section
        className="case-full"
        id="medventa-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Verified Deployment · Live Production Infrastructure
          </div>
          <p className="section-label">Case Study 03 · B2B Medical Supplies & Headless Surgical Commerce</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            Medventa: 440+ Page Headless Medical Procurement Platform
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
                alt="Medventa B2B Medical Supplies Platform Preview"
              />
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Next.js 14 Headless Commerce</span>
                <span className="case-full__tech-pill">440+ Static SKU Pages</span>
                <span className="case-full__tech-pill">Sub-Second Catalog Search</span>
                <span className="case-full__tech-pill">Bulk Hospital RFQ Engine</span>
              </div>

              <h3>The Challenge & Context</h3>
              <p>
                Medventa is a specialized B2B manufacturer and distributor of surgical sutures, operating theater disposables, and hospital consumables. B2B medical procurement officers demand instant access to technical needle gauges, tensile strength charts, and sterile packaging specs. Slow legacy e-commerce stores fail to convert hospital purchase committees.
              </p>

              <h3>Our Architecture & Solution</h3>
              <ul>
                <li>Designed and deployed a custom Next.js 14 headless commerce catalog covering 440+ medical supply and surgical suture SKUs.</li>
                <li>Built client-side instant category filtering and needle/suture dimension calculators for surgeons and hospital purchase managers.</li>
                <li>Implemented an automated institutional RFQ cart allowing bulk procurement inquiries without conventional retail checkout friction.</li>
                <li>Structured medical device schema markup adhering to strict healthcare search standards and regulatory parameters.</li>
              </ul>

              <h3>Verified Results & Impact</h3>
              <ul>
                <li><strong>440+ medical product pages live</strong> in production with sub-second catalog navigation speed.</li>
                <li>Enabled procurement officers to request institutional quotes in less than 45 seconds from any mobile device.</li>
                <li>Significantly improved visibility for bottom-of-funnel surgical supplies keywords across tier-1 healthcare facilities.</li>
              </ul>

              {/* Live Verification Box */}
              <div className="case-full__live-box">
                <div className="case-full__live-box-text">
                  <span className="case-full__live-box-title">Inspect Medventa in Production</span>
                  <span className="case-full__live-box-subtitle">Permanent footer backlink: "This site was designed and built by Rankur"</span>
                </div>
                <a
                  href="https://www.medventa.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-full__verify-btn"
                >
                  Visit Medventa.in ↗
                </a>
              </div>

              <div className="case-full__quote-block">
                <p className="case-full__quote-text">
                  "Our headless Next.js 14 medical catalog spans 440+ static product and suture SKUs with zero lag. Hospital procurement teams and wholesale healthcare buyers can instantly review clinical specifications and submit bulk RFQs without friction."
                </p>
                <p className="case-full__quote-author">
                  - Procurement & Growth Lead, Medventa Surgical
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Case Study 04: Probiota Innovations
          ========================================================= */}
      <section
        className="case-full"
        id="probiota-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Verified Deployment · Live Production Infrastructure
          </div>
          <p className="section-label">Case Study 04 · US-FDA Registered Nutraceutical CDMO & Lead Acquisition</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            Probiota Innovations: Digital Pipeline for Global Nutraceuticals
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image">
              <img
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80"
                alt="Probiota Innovations Nutraceutical Platform Preview"
              />
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Next.js 16 Custom Build</span>
                <span className="case-full__tech-pill">340+ Static Pages</span>
                <span className="case-full__tech-pill">US-FDA Compliance Framework</span>
                <span className="case-full__tech-pill">GA4 Funnel Architecture</span>
              </div>

              <h3>The Challenge & Context</h3>
              <p>
                Probiota Innovations is a US-FDA registered probiotic, gummy, and functional supplement contract development and manufacturing organization (CDMO). They required an ultra-clean, compliant, and trustworthy digital platform to capture international wholesale buyer inquiries and private label supplement brand owners.
              </p>

              <h3>Our Architecture & Solution</h3>
              <ul>
                <li>Designed and coded a custom Next.js 16 platform from scratch spanning 340+ static pages with sub-1.0s global load times.</li>
                <li>Created structured dosage form matrices, minimum order quantity (MOQ) guides, and compliance documentation vaults.</li>
                <li>Deployed technical SEO schemas and semantic content formats optimized for both Google and generative AI queries (GEO).</li>
                <li>Configured custom GA4 event tracking to measure ingredient specification downloads and sample kit requests.</li>
              </ul>

              <h3>Verified Results & Impact</h3>
              <ul>
                <li>Captured <strong>10+ qualified international wholesale inquiries</strong> within the first 10 days of launching the platform.</li>
                <li>Scaled lead inflow to <strong>50+ verified B2B opportunities</strong> in the first month post-launch.</li>
                <li>Delivered and deployed the complete custom code repository within a rapid 7-day development sprint.</li>
              </ul>

              {/* Live Verification Box */}
              <div className="case-full__live-box">
                <div className="case-full__live-box-text">
                  <span className="case-full__live-box-title">Inspect Probiota Innovations in Production</span>
                  <span className="case-full__live-box-subtitle">Permanent footer backlink: "This site was designed and built by Rankur"</span>
                </div>
                <a
                  href="https://www.probiotainnovations.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-full__verify-btn"
                >
                  Visit ProbiotaInnovations.com ↗
                </a>
              </div>

              <div className="case-full__quote-block">
                <p className="case-full__quote-text">
                  "Rankur built an incredible digital infrastructure for us. Within days, we were capturing international trade inquiries that previously slipped through the cracks. The site is fast, modern, and establishes immediate trust."
                </p>
                <p className="case-full__quote-author">
                  - Anshika Narula, Founder, Probiota Innovations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Case Study 05: Wafa Trust
          ========================================================= */}
      <section
        className="case-full"
        id="wafa-case-study"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0' }}
      >
        <div className="container">
          <div className="case-full__verified-banner">
            <span className="case-full__verified-pulse"></span>
            Verified Deployment · Live Production Infrastructure
          </div>
          <p className="section-label">Case Study 05 · Philanthropic Healthcare & Community Development NGO</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-md) 0' }}>
            Wafa Trust: Accessible Digital Presence for Philanthropic Impact
          </h2>

          <div className="case-full__layout">
            <div className="case-full__image">
              <img
                src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80"
                alt="Wafa Educational and Charitable Trust Healthcare Initiative Preview"
              />
            </div>

            <div className="case-full__content">
              <div className="case-full__tech-pills">
                <span className="case-full__tech-pill">Next.js Infrastructure</span>
                <span className="case-full__tech-pill">Philanthropic Healthcare</span>
                <span className="case-full__tech-pill">100% Mobile Optimized</span>
                <span className="case-full__tech-pill">Donor Trust Framework</span>
              </div>

              <h3>The Challenge & Context</h3>
              <p>
                Wafa Educational and Charitable Trust coordinates vital healthcare, dialysis support, and educational programs. In the philanthropic sector, institutional donors and overseas patrons demand absolute transparency, verified impact documentation, and instant mobile responsiveness.
              </p>

              <h3>Our Architecture & Solution</h3>
              <ul>
                <li>Engineered a modern, clean web architecture prioritizing fast load times on constrained mobile connections.</li>
                <li>Structured clear initiative reports, verified financial audits, and transparent patient support statistics.</li>
                <li>Optimized donation discovery pathways and contact channels to facilitate seamless patron contributions.</li>
              </ul>

              <h3>Verified Results & Impact</h3>
              <ul>
                <li>Enhanced donor engagement with a <strong>sub-1.0s mobile experience</strong> across international networks.</li>
                <li>Clear programmatic presentation of healthcare dialysis centers and scholarship disbursements.</li>
                <li>Permanent, verified site-wide footer citation confirming Rankur's engineering standard.</li>
              </ul>

              {/* Live Verification Box */}
              <div className="case-full__live-box">
                <div className="case-full__live-box-text">
                  <span className="case-full__live-box-title">Inspect Wafa Trust in Production</span>
                  <span className="case-full__live-box-subtitle">Permanent live footer backlink connecting to Rankur</span>
                </div>
                <a
                  href="https://wafatrust.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-full__verify-btn"
                >
                  Visit WafaTrust.org ↗
                </a>
              </div>

              <div className="case-full__quote-block">
                <p className="case-full__quote-text">
                  "Rankur structured a modern, highly accessible web platform that gives our healthcare and education initiatives the trust and transparency our international donors expect. Load times and mobile reliability are exceptional."
                </p>
                <p className="case-full__quote-author">
                  - Executive Leadership, Wafa Educational & Charitable Trust
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          Secondary Growth & Channel Systems
          ========================================================= */}
      <section
        className="case-full"
        id="channel-growth-systems"
        style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}
      >
        <div className="container">
          <p className="section-label">Additional Growth Engagements</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-xl) 0' }}>
            Channel Partnerships & Performance Systems
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-2xl)' }}>
            {/* Competence Consulting */}
            <div style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', padding: 'var(--space-2xl)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                B2B Sourcing & Export Operations
              </span>
              <h3 style={{ fontSize: '1.25rem', margin: 'var(--space-sm) 0 var(--space-md)', color: 'var(--color-white)' }}>
                Competence Consulting: Alibaba Channel Sourcing
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: 'var(--space-md)' }}>
                Configured operational sourcing workflows and digital verification pipelines for cross-border export transactions via official Alibaba channel integrations, structuring RFQ capture systems for mid-market manufacturers.
              </p>
              <div style={{ padding: 'var(--space-sm) 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', color: 'var(--color-gold)', fontSize: '0.82rem', fontWeight: 'bold' }}>
                Alibaba Channel Verification Standard
              </div>
            </div>

            {/* Glitchy */}
            <div style={{ background: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', padding: 'var(--space-2xl)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Conversion Systems & Lead Funnels
              </span>
              <h3 style={{ fontSize: '1.25rem', margin: 'var(--space-sm) 0 var(--space-md)', color: 'var(--color-white)' }}>
                Glitchy: Lead Generation & Conversion Engines
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: 'var(--space-md)' }}>
                Engineered custom responsive bridge landing pages with optimized redirection logic, converting 200+ qualified paying customers and capturing 800+ cold leads and 100+ warm leads for email campaigns.
              </p>
              <div style={{ padding: 'var(--space-sm) 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', color: 'var(--color-gold)', fontSize: '0.82rem', fontWeight: 'bold' }}>
                200+ Customers · 800+ Leads Converted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quantified Impact Strip */}
      <section className="impact-section" id="quantified-impact">
        <div className="container">
          <p className="section-label">Quantified Impact</p>
          <h2 className="section-title">Verified Numbers Across Our Builds</h2>
          <div className="impact-grid">
            {impactItems.map((item, i) => (
              <div key={i} className="impact-item">
                <span className="impact-value">{item.value}</span>
                <span className="impact-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      <CTABlock />
    </>
  );
}
