"use client";

import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import ClientTrustBar from '../components/ClientTrustBar';
import ServiceCard from '../components/ServiceCard';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import Guarantee from '../components/Guarantee';
import psiMetrics from '../data/psiMetrics.json';
import './Home.css';

const proofItems = [
  { value: 'Next.js 16', label: 'Static & App Router Architecture' },
  { value: 'Live Platform', label: 'Wafa Educational Trust' },
  { value: 'GA4 Certified', label: 'Consent-Clean Event Telemetry' },
  { value: '100%', label: 'Client Codebase Ownership' },
  { value: 'Direct', label: 'Founder-Led Execution' },
];

const portfolioShowcases = [
  {
    id: 'wafa-trust',
    ownership: 'Client Project',
    tag: 'Philanthropic Healthcare & Education',
    title: 'Wafa Educational & Charitable Trust',
    domain: 'https://www.wafatrustindia.org/',
    badge: 'Client Project · Next.js Web Architecture',
    image: null,
    alt: 'Wafa Educational And Charitable Trust platform',
    description:
      'Engineered a clean, accessible Next.js web platform for a philanthropic healthcare and education trust, organizing community initiatives, health aid documentation, and donor contact pathways.',
    architecturalNotes: [
      { value: 'Next.js 16', label: 'App Router' },
      { value: 'Accessible', label: 'Mobile-First UI' },
      { value: 'Live Platform', label: 'wafatrustindia.org' },
    ],
  },
];

const capabilities = [
  {
    icon: '◎',
    title: 'Clear Positioning & Messaging',
    description:
      'Most B2B sites list vague slogans instead of buyer answers. I clarify what you build, who it serves, and how evaluation buyers take the next step.',
    deliverables: ['Competitor messaging teardown', 'Focused value proposition', 'Straightforward buyer copy'],
    timeline: 'Discovery milestone',
  },
  {
    icon: '⟨/⟩',
    title: 'Fast, Custom Next.js Websites',
    description:
      'I build maintainable sites from scratch in React and Next.js — lean bundles, semantic markup, and full GitHub source code ownership with zero CMS bloat.',
    deliverables: ['Custom Next.js & React build', 'Validated, bot-protected forms', 'Consent-clean analytics setup'],
    timeline: 'Milestone-based sign-off',
  },
  {
    icon: '🔍',
    title: 'Technical SEO & AI Citation Readiness',
    description:
      'I clean up canonical conflicts, thin doorway sprawl, and bloated sitemaps while structuring entity schema and factual Q&As for search engines and AI answers.',
    deliverables: ['301 migration protection', 'Schema & metadata hygiene', 'Prebuild SEO validation checks'],
    timeline: 'Integrated per scope',
  },
  {
    icon: '✍',
    title: 'Focused Editorial & Topic Hubs',
    description:
      'Instead of publishing scaled filler posts, I organize helpful comparison guides and technical articles inside clear category hubs that earn buyer trust.',
    deliverables: ['Category hub structure', 'High-intent buyer guides', 'Internal linking cleanup'],
    timeline: 'Ongoing or per batch',
  },
  {
    icon: '📊',
    title: 'Conversion Flow Optimization',
    description:
      'I spot where visitors hit friction — buried CTAs, broken mobile layouts, unclear promises, unmeasured forms — and simplify the path to real conversations.',
    deliverables: ['UX & form friction audit', 'Clear inquiry qualification', 'Consent-gated GA4 telemetry'],
    timeline: 'Included in builds',
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
    title: '1. Manual Site Audit',
    description:
      'Submit your URL and goals. I review page speed, crawl/index bloat, metadata hygiene, and conversion friction — returning written priority findings within 2 business days.',
  },
  {
    title: '2. Milestone Build',
    description:
      'Approved scope is engineered cleanly in React and Next.js with automated SEO checks, written deliverable sign-off, and full code ownership transferred to your GitHub.',
  },
  {
    title: '3. Measurement & Iteration',
    description:
      'Post-launch, Google Search Console indexing and consent-clean GA4 conversion telemetry guide targeted copy, technical, and conversion refinements.',
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
        subtitle="I build maintainable React and Next.js websites for B2B founders and structure them for Google search, AI answer visibility, and qualified sales inquiries — with full source code ownership."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
        secondaryCTA={{ to: '/case-studies', label: 'View Platforms Built' }}
      />

      <ClientTrustBar />

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
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: 'var(--space-md)' }}>
                Many agencies win a contract and hand the work to junior account managers or bloated page-builder themes. Everything on a Rankur engagement — positioning, technical SEO hygiene, Next.js frontend engineering, and analytics setup — runs directly through me.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: 'var(--space-lg)' }}>
                You get direct communication, realistic claims, clean maintainable code in your own repository, and transparent terms agreed up front.
              </p>
              <Link href="/about" className="btn btn--secondary">
                About Moksh &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="services-overview" id="services-overview">
        <div className="container">
          <p className="section-label">What I Do</p>
          <h2 className="section-title">How I Help B2B Teams</h2>
          <p className="section-subtitle">
            Five focused areas that turn a slow, disorganized brochure site into a clean, search-ready B2B platform.
          </p>
          <div className="services-overview__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
            {capabilities.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="case-teaser" id="case-teaser">
        <div className="container">
          <div className="case-teaser__header">
            <p className="section-label">Featured Client Build</p>
            <h2 className="section-title">Production Web Architecture</h2>
            <p className="section-subtitle">
              Accessible digital infrastructure engineered with Next.js and high-performance frontend architecture.
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

                    <div className="case-showcase-card__actions">
                      <Link href="/case-studies" className="btn btn--secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}>
                        View Case Study &rarr;
                      </Link>
                      <a
                        href={cs.domain}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="case-showcase-card__verify-link"
                        title={`Visit ${cs.domain}`}
                      >
                        Visit site &#8599;
                      </a>
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
            Submit your URL for a manual review of your Core Web Vitals, technical SEO hygiene, messaging clarity, and form friction — delivered as a prioritized written brief within 2 business days.
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
