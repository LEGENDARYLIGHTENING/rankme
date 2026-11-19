"use client";

import React from 'react';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import HeroVisualDashboard from '../components/HeroVisualDashboard';
import TrustEcosystemRibbon from '../components/TrustEcosystemRibbon';
import MasterBentoArchitecture from '../components/MasterBentoArchitecture';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import Guarantee from '../components/Guarantee';
import './Home.css';
import './Blog.css';

const portfolioShowcases = [
  {
    id: 'wafa-trust',
    ownership: 'Client Project',
    tag: 'Philanthropic Healthcare & Education',
    title: 'Wafa Educational & Charitable Trust',
    domain: 'https://www.wafatrustindia.org/',
    badge: 'Client Project · High-Speed Digital Architecture',
    image: '/showcase/hero-section-with-mousemove.webp',
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

const featuredInsights = [
  {
    slug: 'getting-found-google-chatgpt-perplexity-b2b',
    tag: 'Website Strategy',
    readTime: '7 min read',
    title: 'GEO: Getting Found in Google, ChatGPT, and Perplexity',
    excerpt: 'How generative search engines discover, parse, and cite B2B sources: and how to structure your platform architecture for AI answer citations and organic visibility.',
    image: '/blog-images/prompt-115.webp',
    imageAlt: 'GEO Generative Engine Optimization for B2B search discovery',
    date: 'August 28, 2026',
  },
  {
    slug: 'how-much-custom-b2b-website-costs-2026',
    tag: 'Cost & ROI',
    readTime: '8 min read',
    title: 'How Much Does a Custom B2B Website Cost in 2026?',
    excerpt: 'An honest breakdown of agency pricing, custom high-performance architecture, and the hidden total cost of ownership of fragile template builds.',
    image: '/blog-images/prompt-116.webp',
    imageAlt: 'B2B website development cost breakdown and pricing guide',
    date: 'August 28, 2026',
  },
  {
    slug: 'signs-website-losing-deals',
    tag: 'Conversions & Leads',
    readTime: '6 min read',
    title: '5 Signs Your B2B Website is Quietly Losing You Deals',
    excerpt: 'Slow load speeds, generic positioning copy, and high-friction forms quietly drain executive pipeline before sales discovery calls ever happen.',
    image: '/blog-images/prompt-118.webp',
    imageAlt: 'Signs a B2B website is losing deals and pipeline revenue',
    date: 'August 28, 2026',
  },
];

export default function Home() {
  return (
    <>
      {/* 1. Master Hero Section with 3D Glassmorphic Telemetry Dashboard */}
      <HeroSection
        label="✦ Enterprise B2B Web Engineering &amp; Deterministic Search"
        title={
          <>
            Custom B2B Platforms Engineered to{' '}
            <span className="text-gold">Dominate Search &amp; Accelerate Pipeline</span>
          </>
        }
        subtitle="We engineer sub-second Next.js digital infrastructure, deterministic Google & AI search authority, and high-ticket buyer qualification flows: with 100% intellectual property ownership."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
        secondaryCTA={{ to: '/case-studies', label: 'View Platforms Built' }}
        center
      >
        <HeroVisualDashboard />
      </HeroSection>

      {/* 2. Unified Social Proof & Enterprise Standards Ribbon */}
      <TrustEcosystemRibbon />

      {/* 3. Master Aceternity Bento Architecture (Unified 5-Cell Grid with Real UI Previews) */}
      <MasterBentoArchitecture />

      {/* 4. The Architectural Breakdown / Comparison Table */}
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
                  <div className="case-showcase-card__image-wrap" style={{ minHeight: '260px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src="/showcase/hero-section-with-mousemove.webp"
                      alt="Wafa Educational And Charitable Trust platform architecture"
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '260px',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        filter: 'brightness(0.7) contrast(1.15)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(14, 18, 24, 0.45) 0%, rgba(14, 18, 24, 0.96) 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        padding: '1.75rem',
                        textAlign: 'center',
                      }}
                    >
                      <img
                        src="/wafa-trust-logo.jpeg"
                        alt="Wafa Educational And Charitable Trust logo"
                        style={{ width: '68px', height: '68px', objectFit: 'contain', borderRadius: '10px', marginBottom: '0.65rem', boxShadow: '0 6px 16px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                      <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.01em' }}>
                        Wafa Educational &amp; Charitable Trust
                      </span>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
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

      {/* Featured Insights & Tactical Guides (Probiota Innovations Design Pattern) */}
      <section className="home-blog-section" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span className="tagline">Tactical Insights</span>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0.5rem 0 0' }}>
                Latest from the Knowledge Base
              </h2>
            </div>
            <Link href="/blog" className="btn btn--outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Explore All 900+ Guides &rarr;
            </Link>
          </div>

          <div className="blog-grid">
            {featuredInsights.map((post) => {
              const cleanTitle = post.title.replace(/\s*\|\s*Rankur\s*$/i, '');
              return (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="blog-card"
                >
                  <div className="blog-card-image">
                    <span className="blog-card-floating-tag">
                      {post.tag}
                    </span>
                    {post.readTime && (
                      <span className="blog-card-floating-read">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        {post.readTime}
                      </span>
                    )}
                    <img
                      src={post.image}
                      alt={post.imageAlt || cleanTitle}
                      width={1200}
                      height={630}
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card-content">
                    <h3 className="blog-card-title">{cleanTitle}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-card-date">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '5px', verticalAlign: '-1px' }}>
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {post.date}
                      </span>
                      <span className="read-more">
                        Read Article
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
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
