"use client";

import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import ClientTrustBar from '../components/ClientTrustBar';
import SpotlightCard from '../components/SpotlightCard';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import Guarantee from '../components/Guarantee';
import { VERIFIED_CREDENTIALS } from '../data/credentials';
import './Home.css';

const proofItems = [
  { value: '<0.8s Speed', label: 'Sub-Second Speed That Stops Buyer Bounces' },
  { value: 'Verified Proof', label: 'Wafa Educational & Charitable Trust' },
  { value: 'GA4 & HubSpot', label: 'Certified Pipeline & Conversion Attribution' },
  { value: '100% IP', label: 'Complete Intellectual Property Ownership' },
  { value: 'Direct Access', label: 'Founder-Led Strategic Execution' },
];

const portfolioShowcases = [
  {
    id: 'wafa-trust',
    ownership: 'Client Project',
    tag: 'Philanthropic Healthcare & Education',
    title: 'Wafa Educational & Charitable Trust',
    domain: 'https://www.wafatrustindia.org/',
    badge: 'Client Project · High-Speed Digital Architecture',
    image: null,
    alt: 'Wafa Educational And Charitable Trust platform',
    description:
      'Engineered a clean, accessible high-speed web platform for a philanthropic healthcare and education trust, organizing community initiatives, health aid documentation, and donor contact pathways.',
    architecturalNotes: [
      { value: 'Sub-Second', label: 'High-Availability Architecture' },
      { value: 'Accessible', label: 'Mobile-First UI' },
      { value: 'Live Platform', label: 'wafatrustindia.org' },
    ],
  },
];

const capabilities = [
  {
    icon: '◎',
    title: 'Strategic Positioning & Market Authority',
    badge: 'Discovery & Copy',
    description:
      'Most B2B platforms rely on generic corporate buzzwords that confuse serious buyers. We establish clear commercial positioning, high-intent value propositions, and unambiguous proof that commands executive trust.',
    deliverables: ['Executive Positioning Framework', 'Buyer Intent Alignment', 'High-Trust Commercial Copy'],
    stat: '100% ICP Clarity',
  },
  {
    icon: '⟨/⟩',
    title: 'High-Converting Web Infrastructure & Pipeline Architecture',
    badge: 'Performance & Revenue',
    description:
      'Custom-engineered from the ground up for high-growth B2B companies. Sub-second global load times that prevent drop-offs, frictionless demo booking pathways, and 100% intellectual property ownership with zero plugin bloat.',
    deliverables: ['Sub-Second Global Performance', 'Frictionless Inbound Capture', '100% Client Code & Asset Ownership'],
    stat: '<0.8s Global Speed',
  },
  {
    icon: '🔍',
    title: 'Search Authority & Generative AI Discovery',
    badge: 'SEO & GEO',
    description:
      'Deterministic search positioning engineered for Google, ChatGPT, and Perplexity. We structure your digital footprint so your brand is surfaced as the definitive, verified answer across traditional and generative search.',
    deliverables: ['Proprietary Search Equity Guardrails', 'Enterprise Knowledge Graph Integration', 'Zero-Defect Technical Indexation'],
    stat: 'Top Citation Readiness',
  },
  {
    icon: '✍',
    title: 'Commercial Demand & Category Authority',
    badge: 'Content Equity',
    description:
      'We eliminate low-quality content churn and architect authoritative digital ecosystems that systematically intercept and capture executive buyers actively evaluating enterprise solutions.',
    deliverables: ['High-Value Solution Architecture', 'Defensible Search Equity Framework', 'Executive Decision Frameworks'],
    stat: 'Zero Generic Fluff',
  },
  {
    icon: '📊',
    title: 'Conversion Architecture & Pipeline Telemetry',
    badge: 'Analytics & CRO',
    description:
      'We transform passive traffic into qualified sales inquiries. Through precision UX engineering and privacy-compliant analytics, every buyer touchpoint is optimized for pipeline velocity.',
    deliverables: ['Frictionless Inbound Flow Engineering', 'Qualified Lead Routing', 'Enterprise Conversion Telemetry'],
    stat: 'GA4 Verified Tracking',
  },
];

const comparisonData = [
  {
    metric: 'Core Web Vitals & Load Speed',
    legacy: '3.5s to 6.0s (Bloated WordPress themes, 35+ plugins)',
    rankur: '<0.8s Global LCP (Custom static edge architecture, 0 bloat)',
  },
  {
    metric: 'AI Search Readiness (ChatGPT, Perplexity)',
    legacy: 'Unstructured text, zero entity schema, ignored by AI engines',
    rankur: 'Structured JSON-LD entity graph, verified for AI answer citations',
  },
  {
    metric: 'Codebase & Intellectual Property',
    legacy: 'Trapped in proprietary agency page builder or hostage hosting',
    rankur: '100% complete GitHub repository transfer with zero vendor lock-in',
  },
  {
    metric: 'Lead Capture & Friction',
    legacy: 'Clunky 10-field forms, zero attribution, high bounce rate',
    rankur: 'Frictionless qualification pathways + GA4 event attribution',
  },
  {
    metric: 'Delivery & Communication',
    legacy: 'Passed around junior account managers and offshore contractors',
    rankur: 'Direct execution by Moksh Parjapati with milestone sign-offs',
  },
];

const niches = [
  { label: 'Healthcare & Philanthropic Web Platforms', to: '/case-studies#wafa-case-study' },
  { label: 'B2B SaaS & Tech Platforms', to: '/saas-websites' },
  { label: 'Enterprise Web & Technical SEO', to: '/services' },
  { label: 'High-Intent B2B Lead Funnels', to: '/free-audit' },
];

const processSteps = [
  {
    title: '1. Strategic Diagnostic Audit',
    description:
      'We perform an in-depth evaluation of your current search footprint, technical bottlenecks, and buyer conversion friction: delivering a prioritized roadmap for maximum commercial impact.',
  },
  {
    title: '2. Dedicated Architecture & Sprint Build',
    description:
      'Your platform is custom-engineered using our proprietary high-performance infrastructure and search standards, backed by milestone deliverables and 100% source code ownership.',
  },
  {
    title: '3. Pipeline Velocity & Ongoing Dominance',
    description:
      'Post-launch, our telemetry and indexation monitoring continuously optimize buyer engagement, search visibility, and inbound pipeline quality.',
  },
];

export default function Home() {
  return (
    <>
      <HeroSection
        label="B2B SEO Consultant & Web Engineering"
        title={
          <>
            I Build Custom B2B Websites Engineered to{' '}
            <span className="text-gold">Rank &amp; Convert</span>
          </>
        }
        subtitle="I engineer high-converting B2B web systems built to dominate Google search, earn generative AI citations, and accelerate executive pipeline: with 100% source code ownership."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
        secondaryCTA={{ to: '/case-studies', label: 'View Platforms Built' }}
      />

      <ClientTrustBar />

      {/* Proof Strip */}
      <section className="proof-strip" id="proof-strip">
        <div className="container">
          <div className="proof-strip__grid">
            {proofItems.map((item, i) => (
              <div key={i} className="proof-strip__item">
                <span className="proof-strip__value">{item.value}</span>
                <span className="proof-strip__label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aceternity Verified Credentials Trust Bar */}
      <section className="home-credentials-bar" style={{ padding: 'var(--space-2xl) 0', backgroundColor: '#080a0d', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="cert-status-dot" style={{ width: '8px', height: '8px' }}></span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Verified Platform Credentials:
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              {VERIFIED_CREDENTIALS.filter((c) => c.verifyUrl).map((c) => (
                <a
                  key={c.id}
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-cred-pill"
                >
                  <span style={{ color: 'var(--color-gold)', fontWeight: 700 }}>✓ {c.issuer}:</span>
                  <span style={{ color: 'var(--color-white)' }}>{c.name}</span>
                  <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="home-founder" style={{ padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'var(--space-3xl)', alignItems: 'center' }}>
            <div className="img-placeholder" style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
              <img
                src="/founder-b2b-growth-infrastructure.webp"
                alt="Moksh Parjapati, Founder of Rankur"
                width={720}
                height={720}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'inherit' }}
              />
            </div>
            <div className="founder-intro-content">
              <p className="section-label">Founder-Led Consultancy</p>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-lg) 0' }}>
                Direct Execution by Moksh Parjapati
              </h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: 'var(--space-md)', fontSize: '1.02rem' }}>
                Most B2B agencies operate on an assembly-line model: senior partners sell the contract, then pass your project down to junior account managers who paste your content into bloated page-builder themes. The result is predictable: slow load times, fragile plugin stacks, and zero pipeline impact.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: 'var(--space-md)', fontSize: '1.02rem' }}>
                At Rankur, every single engagement: commercial positioning, technical search equity, custom frontend architecture, and conversion telemetry: is executed directly by me. No junior intermediaries. No outsourced codebases.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: 'var(--space-xl)', fontSize: '1.02rem' }}>
                You get direct engineering velocity, honest diagnostic feedback, clean source code in your own repository, and milestone-based sign-offs agreed up front.
              </p>
              <Link href="/about" className="btn btn--secondary">
                About Moksh &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Aceternity Bento Capabilities Section */}
      <section className="services-overview" id="services-overview" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-4xl)' }}>
            <div className="aceternity-badge" style={{ margin: '0 auto var(--space-md)' }}>
              <span className="aceternity-badge__dot"></span>
              Proprietary Engineering Architecture
            </div>
            <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
              Engineered for Pipeline Velocity &amp; Market Dominance
            </h2>
            <p className="section-subtitle">
              We eliminate low-converting agency templates and architect bespoke digital platforms engineered for sub-second speed, search engine dominance, and high-ticket B2B conversion.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--space-xl)' }}>
            {capabilities.map((service, i) => (
              <SpotlightCard key={i} style={{ padding: 'var(--space-2xl)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
                      <span style={{ fontSize: '1.6rem', color: 'var(--color-gold)' }}>{service.icon}</span>
                      <span className="cert-skill-tag" style={{ color: 'var(--color-gold)', borderColor: 'rgba(201, 168, 76, 0.3)' }}>
                        {service.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-white)', fontWeight: 700, marginBottom: 'var(--space-sm)', lineHeight: '1.35' }}>
                      {service.title}
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: 'var(--space-xl)' }}>
                      {service.description}
                    </p>

                    <div style={{ marginBottom: 'var(--space-xl)' }}>
                      <p style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                        Key Deliverables:
                      </p>
                      <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--color-text-muted)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {service.deliverables.map((del, dIdx) => (
                          <li key={dIdx}>{del}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Benchmark:</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-gold)', fontWeight: 700 }}>{service.stat}</span>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* The Architectural Breakdown / Comparison Table */}
      <section style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-black)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto var(--space-4xl)' }}>
            <p className="section-label">Architectural Reality</p>
            <h2 className="section-title">Why Legacy Agency Websites Fail Enterprise Buyers</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              The traditional agency model is broken. When high-ticket buyers evaluate your company, their first impression is formed in sub-second increments. Here is how Rankur compares to standard web studios.
            </p>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', background: '#0c0e12' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '640px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Performance Factor</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: '#ef4444', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legacy Agency / WordPress Theme</th>
                  <th style={{ padding: '1.25rem 1.5rem', color: 'var(--color-gold)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rankur Custom Edge System</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < comparisonData.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none' }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: 'var(--color-white)', fontSize: '0.95rem' }}>
                      {row.metric}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                      <span style={{ color: '#ef4444', marginRight: '0.5rem' }}>✕</span> {row.legacy}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', color: 'var(--color-white)', fontSize: '0.9rem', lineHeight: '1.6', backgroundColor: 'rgba(201, 168, 76, 0.03)' }}>
                      <span style={{ color: 'var(--color-gold)', marginRight: '0.5rem' }}>✓</span> {row.rankur}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Featured Production Work */}
      <section className="case-teaser" id="case-teaser">
        <div className="container">
          <div className="case-teaser__header">
            <p className="section-label">Featured Client Build</p>
            <h2 className="section-title">Production Web Architecture</h2>
            <p className="section-subtitle">
              Accessible digital infrastructure engineered with sub-second responsiveness and modern frontend architecture.
            </p>
          </div>

          <div className="case-teaser__showcase-grid" style={{ gridTemplateColumns: 'minmax(320px, 780px)', justifyContent: 'center' }}>
            {portfolioShowcases.map((cs) => {
              return (
                <div key={cs.id} className="case-showcase-card" style={{ maxWidth: '780px', margin: '0 auto', width: '100%' }}>
                  <div className="case-showcase-card__image-wrap" style={{ minHeight: '200px' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '200px',
                        background: 'linear-gradient(135deg, #0e1218 0%, #1a2230 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        textAlign: 'center',
                      }}
                    >
                      <img
                        src="/wafa-trust-logo.jpeg"
                        alt="Wafa Educational And Charitable Trust logo"
                        style={{ width: '84px', height: '84px', objectFit: 'contain', borderRadius: '8px', marginBottom: '1rem' }}
                      />
                      <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.25rem' }}>
                        Wafa Educational &amp; Charitable Trust
                      </span>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
                        Live Web Platform · https://www.wafatrustindia.org/
                      </span>
                    </div>
                    <span className="case-showcase-card__badge-pill">{cs.badge}</span>
                  </div>
                  <div className="case-showcase-card__body">
                    <span className="case-showcase-card__tag">{cs.tag}</span>
                    <h3 className="case-showcase-card__title">{cs.title}</h3>
                    <p className="case-showcase-card__desc">{cs.description}</p>

                    <div className="case-showcase-card__stats">
                      {cs.architecturalNotes.map((s, idx) => (
                        <div key={idx} className="case-showcase-card__stat-item">
                          <span className="case-showcase-card__stat-val">{s.value}</span>
                          <span className="case-showcase-card__stat-lbl">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <a
                        href={cs.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--secondary"
                        style={{ fontSize: '0.88rem' }}
                      >
                        Visit Live Platform &rarr;
                      </a>
                      <Link
                        href="/case-studies#wafa-case-study"
                        className="btn btn--outline"
                        style={{ fontSize: '0.88rem' }}
                      >
                        Read Case Study &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}>
            <Link href="/case-studies" className="btn btn--primary" style={{ padding: 'var(--space-md) var(--space-2xl)' }}>
              Explore Case Studies &rarr;
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="niche-strip" id="niche-strip">
        <div className="container">
          <p className="section-label">Who I Work With</p>
          <h2 className="section-title">B2B Founders in Technical &amp; Commercial Sectors</h2>
          <div className="niche-strip__grid">
            {niches.map((niche, i) => (
              <Link key={i} href={niche.to} className="niche-strip__item">
                {niche.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-process" id="home-process">
        <div className="container">
          <p className="section-label">How I Work</p>
          <h2 className="section-title">Three Straightforward Steps</h2>
          <div className="home-process__steps">
            <ProcessSteps steps={processSteps} />
          </div>
        </div>
      </section>

      <section className="home-cta-block" style={{ padding: 'var(--space-5xl) 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <p className="section-label">Free Audit</p>
          <h2 className="section-title">Want to see what is holding your website back?</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: 'var(--space-2xl)' }}>
            Submit your URL for a manual review of your Core Web Vitals, technical SEO hygiene, messaging clarity, and form friction: delivered as a prioritized written brief within 2 business days.
          </p>
          <Link href="/free-audit" className="btn btn--primary" style={{ padding: 'var(--space-md) var(--space-3xl)' }}>
            Request Free Audit
          </Link>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: 'var(--space-md)' }}>
            <Guarantee />
          </p>
        </div>
      </section>
    </>
  );
}
