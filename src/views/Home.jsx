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
  { value: '5 Platforms', label: 'Client Work & In-House Ventures' },
  { value: 'GA4 Certified', label: 'Consent-Clean Event Telemetry' },
  { value: '100%', label: 'Client Codebase Ownership' },
  { value: 'Direct', label: 'Founder-Led Execution' },
];

const portfolioShowcases = [
  {
    id: 'wiziot',
    ownership: 'Client Project',
    tag: 'IoT Telematics & Hardware',
    title: 'WizIOT: Enterprise Fleet Telematics Platform',
    domain: 'https://www.wiziot.com',
    badge: 'Client Project · Next.js 16',
    image: '/case-studies/wiziot.webp',
    alt: 'WizIOT website desktop homepage screenshot',
    description:
      'Custom Next.js App Router platform structured for enterprise fleet telematics and IoT hardware buyers across GCC, Africa, and Europe.',
    architecturalNotes: [
      { value: 'Next.js 16', label: 'App Router' },
      { value: 'Static HTML', label: 'Edge Delivery' },
      { value: 'RFQ Flows', label: 'Buyer Capture' },
    ],
  },
  {
    id: 'atlanta-systems',
    ownership: 'Co-led for an in-house venture',
    tag: 'Automotive Manufacturing',
    title: 'Atlanta Systems: AIS-140 GPS Hardware Infrastructure',
    domain: 'https://www.atlantasys.com',
    badge: 'Co-led for an in-house venture · Next.js 16',
    image: null, // NEEDS-MOKSH (C4): Domain behind Cloudflare bot verification; add real approved desktop screenshot.
    alt: 'Atlanta Systems platform preview placeholder',
    description:
      'Co-led and architected for an in-house automotive telematics venture covering AIS-140 hardware specifications and commercial RFQ workflows.',
    architecturalNotes: [
      { value: 'Next.js 16', label: 'Custom Build' },
      { value: 'AIS-140', label: 'Product Specs' },
      { value: 'RFQ Pipeline', label: 'Procurement Forms' },
    ],
  },
  {
    id: 'medventa',
    ownership: 'Client Project',
    tag: 'B2B Healthcare Commerce',
    title: 'Medventa: Surgical Supplies & Hospital Catalog',
    domain: 'https://www.medventa.in',
    badge: 'Client Project · Next.js 14',
    image: '/case-studies/medventa.webp',
    alt: 'Medventa surgical supplies website homepage screenshot',
    description:
      'Custom Next.js headless medical procurement catalog presenting surgical sutures and hospital consumables with direct institutional quote requests.',
    architecturalNotes: [
      { value: 'Next.js 14', label: 'Headless Stack' },
      { value: 'SKU Catalog', label: 'Structured Specs' },
      { value: 'Bulk RFQ', label: 'Hospital Inquiry' },
    ],
  },
  {
    id: 'probiota',
    ownership: 'Built in-house',
    tag: 'Nutraceutical CDMO',
    title: 'Probiota Innovations: Probiotic & Gummy CDMO',
    domain: 'https://www.probiotainnovations.com',
    badge: 'Built in-house · Next.js 16',
    image: '/case-studies/probiota.webp',
    alt: 'Probiota Innovations CDMO website homepage screenshot',
    description:
      'Engineered for my own in-house nutraceutical venture to present dosage capabilities, regulatory documentation, and wholesale manufacturing inquiries.',
    architecturalNotes: [
      { value: 'Next.js 16', label: 'Static Architecture' },
      { value: 'CDMO Docs', label: 'MOQ & Compliance' },
      { value: 'Wholesale', label: 'Buyer Capture' },
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
  { label: 'Fleet Telematics & IoT Hardware', to: '/case-studies#wiziot-case-study' },
  { label: 'Automotive & AIS-140 Hardware', to: '/case-studies#atlanta-case-study' },
  { label: 'B2B Medical Supplies & Hospitals', to: '/case-studies#medventa-case-study' },
  { label: 'Nutraceutical & Wellness CDMO', to: '/case-studies#probiota-case-study' },
  { label: 'B2B SaaS & Software Teams', to: '/saas-websites' },
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-3xl)', alignItems: 'center' }}>
            <div className="img-placeholder" style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
              <img
                src="/founder-b2b-growth-infrastructure.png"
                alt="Moksh Parjapati, Founder of Rankur"
                width={800}
                height={800}
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
          <div className="services-overview__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {capabilities.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="case-teaser" id="case-teaser">
        <div className="container">
          <div className="case-teaser__header">
            <p className="section-label">Platforms I&apos;ve Built</p>
            <h2 className="section-title">Client Builds &amp; In-House Ventures</h2>
            <p className="section-subtitle">
              Production websites built with Next.js, clearly labeled by client vs. in-house venture relationship.
            </p>
          </div>

          <div className="case-teaser__showcase-grid">
            {portfolioShowcases.map((cs) => {
              const psi = psiMetrics[cs.id];
              return (
                <div key={cs.id} className="case-showcase-card">
                  <div className="case-showcase-card__image-wrap">
                    {cs.image ? (
                      <img src={cs.image} alt={cs.alt} width={1200} height={750} loading="lazy" />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(135deg, #12151c 0%, #1c222e 100%)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '1.5rem',
                          textAlign: 'center',
                        }}
                      >
                        <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.15rem' }}>
                          Atlanta Systems
                        </span>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', marginTop: '0.35rem' }}>
                          Screenshot pending (Cloudflare check on automated capture)
                        </span>
                      </div>
                    )}
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

                    {psi?.ok && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                        Mobile Score: {psi.performanceScore}/100 · LCP {psi.lcp} · ({psi.caption})
                      </p>
                    )}

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
