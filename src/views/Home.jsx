"use client";

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import './Home.css';

const proofItems = [
  { value: 'Custom Built', label: 'Fast React & Next.js websites' },
  { value: 'GA4 Tracking', label: 'See exactly where leads come from' },
  { value: 'Google + AI', label: 'Found on Google, ChatGPT & Perplexity' },
  { value: '~10 Days', label: 'From kickoff to your first inbound lead' },
  { value: '50+ Leads', label: 'Generated for B2B clients' },
];

const capabilities = [
  {
    icon: '◎',
    title: 'Clear Positioning & Messaging',
    description: 'Most B2B sites list features and compete on price. I help you say what you actually do, for whom, and why it matters — so buyers see you as the obvious choice, not just another vendor.',
    deliverables: ['A look at what competitors say', 'A sharp value proposition', 'Copy that speaks to real buyers'],
    timeline: 'Done in week 1',
  },
  {
    icon: '⟨/⟩',
    title: 'Fast, Custom Websites',
    description: 'I design and build your site from scratch in React and Next.js — fast, secure, and easy to update. No slow templates, no bloated page builders. It loads in under 1.2 seconds anywhere in the world.',
    deliverables: ['Custom Next.js & React build', 'Lead capture that flows to your inbox', 'Analytics wired up from day one'],
    timeline: 'Live in 7–14 days',
  },
  {
    icon: '🔍',
    title: 'Getting Found on Google & AI Search',
    description: 'I set your site up to rank when buyers search for what you sell — on Google, and now inside ChatGPT, Claude, and Perplexity too. The focus is high-intent buyer searches, not vanity traffic.',
    deliverables: ['The searches your buyers actually make', 'Content built to be quoted by AI', 'Technical SEO done right'],
    timeline: 'Ongoing',
  },
  {
    icon: '✍',
    title: 'Content That Builds Trust',
    description: 'Buyers check you out long before they call. I write and publish clear, useful B2B articles and LinkedIn posts in your voice, so you build credibility before the first conversation.',
    deliverables: ['A simple LinkedIn content plan', 'Practical articles worth reading', 'A steady publishing rhythm'],
    timeline: 'Ongoing',
  },
  {
    icon: '📊',
    title: 'Turning Visitors Into Leads',
    description: 'Traffic is worthless if nobody gets in touch. I find where people drop off — confusing pages, clunky forms, dead ends — and fix it, so more of the visitors you already have turn into leads.',
    deliverables: ['A teardown of where visitors leave', 'Simpler, higher-converting forms', 'Clear tracking of what works'],
    timeline: 'Ongoing',
  },
];

const niches = [
  { label: 'B2B Manufacturers & Exporters', to: '/case-studies' },
  { label: 'Nutraceutical & Wellness Brands', to: '/case-studies' },
  { label: 'SaaS & Technology Startups', to: '/saas-websites' },
  { label: 'Industrial & Business Services', to: '/case-studies' },
];

const processSteps = [
  {
    title: '1. Free Audit',
    description: 'Tell me about your business and goals. I review your current site — speed, search visibility, and where you\'re losing leads — and send back a short video walking through what I\'d fix first.',
  },
  {
    title: '2. Build Sprint',
    description: 'I design, write, and build your new site and set up lead tracking. The core build is done in 7–14 days, and you\'re involved at every step — no black box.',
  },
  {
    title: '3. Ongoing Growth',
    description: 'Once you\'re live, I keep the leads coming: search and AI visibility, LinkedIn content, and steady improvements to turn more visitors into sales conversations.',
  },
];

export default function Home() {
  const location = usePathname();
  return (
    <>
      

      {/* Hero */}
      <HeroSection
        label="B2B Web Design & Lead Generation"
        title={
          <>
            I Build B2B Websites That{' '}
            <span className="text-gold">Bring In Real Leads</span>
          </>
        }
        subtitle="I design fast, modern websites for B2B founders and set them up to rank on Google — so the right buyers find you and get in touch. Most sites go live in about 7 days, backed by a 100% money-back guarantee."
        primaryCTA={{ to: '/free-audit', label: 'Get a Free Website Audit' }}
        secondaryCTA={{ to: '/philosophy', label: 'How I Work' }}
      />

      {/* Trusted By Strip */}
      <section className="trusted-by-strip" style={{ padding: 'var(--space-2xl) 0', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-black)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="section-label" style={{ marginBottom: 'var(--space-lg)' }}>Trusted By Organizations Like</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-3xl)', flexWrap: 'wrap', opacity: 0.7 }}>
            <a href="https://www.wafatrustindia.org/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
              <img src="/wafa-trust-logo.jpeg" alt="Wafa Educational And Charitable Trust" style={{ height: '60px', width: 'auto', filter: 'grayscale(100%)', transition: 'filter 0.3s ease' }} onMouseOver={e => e.currentTarget.style.filter = 'none'} onMouseOut={e => e.currentTarget.style.filter = 'grayscale(100%)'} />
            </a>
          </div>
        </div>
      </section>

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

      {/* Meet the Founder (Home Intro) */}
      <section className="home-founder" style={{ padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-3xl)', alignItems: 'center' }}>
            <div className="img-placeholder" style={{ borderRadius: 'var(--border-radius-lg)', height: '400px' }}>
              <img 
                src="/founder-b2b-growth-infrastructure.png" 
                alt="Moksh Parjapati - B2B Growth Infrastructure Consultant" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} 
              />
            </div>
            <div className="founder-intro-content">
              <p className="section-label">Founder-Led Consultancy</p>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-lg) 0' }}>Every Engagement Personally Led by Moksh</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: 'var(--space-md)' }}>
                Most agencies win your business, then hand it to a junior account manager. I don't work that way. Your positioning, your copy, your site, and your search setup are all done by me — the person you actually talked to.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: 'var(--space-lg)' }}>
                It means fewer middlemen, faster decisions, and a website that's both well built and says the right thing to the right buyer.
              </p>
              <Link href="/about" className="btn btn--secondary">
                Read My Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview" id="services-overview">
        <div className="container">
          <p className="section-label">What I Do</p>
          <h2 className="section-title">How I Help You Get More Leads</h2>
          <p className="section-subtitle">
            Five things that take a B2B website from a brochure nobody visits to a steady source of sales conversations.
          </p>
          <div className="services-overview__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {capabilities.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section className="case-teaser" id="case-teaser" style={{ backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <p className="section-label">Featured Case Study</p>
          <h2 className="section-title">Probiota Innovations</h2>
          <div className="case-teaser__content">
            <div className="img-placeholder">
              <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80" alt="Probiota Innovations B2B Website" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            </div>
            <div className="case-teaser__info">
              <h3>B2B Nutraceutical Platform & Lead Acquisition</h3>
              <p>
                Engineered a custom B2B web platform optimized for speed, regulatory compliance, and overseas wholesale inquiries. Deployed clean data-capture pipelines and international search optimization (SEO + GEO).
              </p>
              <div className="case-teaser__stats">
                <div>
                  <span className="case-teaser__stat-value">10 Days</span>
                  <span className="case-teaser__stat-label">to First Inquiries</span>
                </div>
                <div>
                  <span className="case-teaser__stat-value">React / Postgres</span>
                  <span className="case-teaser__stat-label">Infrastructure Stack</span>
                </div>
                <div>
                  <span className="case-teaser__stat-value">GA4 Custom</span>
                  <span className="case-teaser__stat-label">Funnel Tracking</span>
                </div>
              </div>
              <Link href="/case-studies" className="btn btn--secondary">
                View Proof Details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Niche Strip */}
      <section className="niche-strip" id="niche-strip">
        <div className="container">
          <p className="section-label">Who I Work With</p>
          <h2 className="section-title">B2B Founders in High-Trust Industries</h2>
          <div className="niche-strip__grid">
            {niches.map((niche, i) => (
              <Link key={i} href={niche.to} className="niche-strip__item">
                {niche.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="home-process" id="home-process" style={{ backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <p className="section-label">How We Work Together</p>
          <h2 className="section-title">Three Simple Steps</h2>
          <div className="home-process__steps">
            <ProcessSteps steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Lead Qualification CTA / Lead Magnet */}
      <section className="home-cta-block" style={{ padding: 'var(--space-5xl) 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <p className="section-label">Free Audit</p>
          <h2 className="section-title">Want to know why your website isn't bringing in leads?</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: 'var(--space-2xl)' }}>
            Send me your site and I'll record a short video walking through what's holding it back — your speed, how you show up on Google and AI search, and where visitors are slipping away. No cost, no pitch.
          </p>
          <Link href="/free-audit" className="btn btn--primary" style={{ padding: 'var(--space-md) var(--space-3xl)' }}>
            Get My Free Audit
          </Link>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: 'var(--space-md)' }}>
            I read every submission personally and only take on a handful of B2B founders at a time. Every build is backed by a 100% money-back guarantee.
          </p>
        </div>
      </section>
    </>
  );
}
