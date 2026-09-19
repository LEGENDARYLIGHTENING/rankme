"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeroSection from '../components/HeroSection';
import ClientTrustBar from '../components/ClientTrustBar';
import ServiceCard from '../components/ServiceCard';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import './Home.css';

const proofItems = [
  { value: '2,280+', label: 'Static Pages in Active Production' },
  { value: '5 Platforms', label: 'Verified Live Client Deployments' },
  { value: 'Next.js 16', label: 'Cutting-Edge Web Architecture' },
  { value: '< 1.2s', label: 'Sub-Second Global Page Load' },
  { value: '50+ Leads', label: 'Captured in Month 1 Post-Launch' },
];

const verifiedShowcases = [
  {
    tag: 'IoT Telematics & Hardware',
    title: 'WizIOT: Enterprise Fleet Telematics Platform',
    domain: 'https://www.wiziot.com',
    badge: '1,040+ Static Pages · Next.js 16',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered a monolithic-scale Next.js 16 web platform with 1,040+ static pages, optimized for enterprise fleet telematics and IoT sensor hardware across Africa, GCC, and Europe with zero crawl debt.',
    stats: [
      { value: '1,040+', label: 'Static Pages' },
      { value: '< 0.9s', label: 'Global LCP' },
      { value: '100%', label: 'Crawl Indexation' },
    ],
  },
  {
    tag: 'Automotive Manufacturing',
    title: 'Atlanta Systems: AIS-140 Certified GPS Infrastructure',
    domain: 'https://www.atlantasys.com',
    badge: '460+ Static Pages · Next.js 16',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    description: 'Designed and deployed 460+ static pages on Next.js 16 for an AIS-140 certified GPS telematics manufacturer, capturing high-intent procurement searches and automated RFQ pipeline.',
    stats: [
      { value: '460+', label: 'Static Pages' },
      { value: 'AIS-140', label: 'Compliance SEO' },
      { value: 'Direct RFQs', label: 'B2B Procurement' },
    ],
  },
  {
    tag: 'B2B Healthcare Commerce',
    title: 'Medventa: Surgical Supplies & Hospital Procurement',
    domain: 'https://www.medventa.in',
    badge: '440+ Static Pages · Next.js 14',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    description: 'Built a custom Next.js 14 headless commerce catalog covering 440+ surgical suture and hospital supply SKUs with sub-second catalog search and bulk inquiry routing.',
    stats: [
      { value: '440+', label: 'Static Pages' },
      { value: 'Headless', label: 'Next.js 14 Stack' },
      { value: 'Sub-second', label: 'Catalog Search' },
    ],
  },
  {
    tag: 'Nutraceutical CDMO',
    title: 'Probiota Innovations: FDA Probiotic Platform',
    domain: 'https://www.probiotainnovations.com',
    badge: '340+ Static Pages · Next.js 16',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
    description: 'Engineered a custom B2B web platform optimized for speed, US-FDA regulatory compliance, and overseas wholesale inquiries. Generated 10+ leads in 10 days and 50+ in month one.',
    stats: [
      { value: '340+', label: 'Static Pages' },
      { value: '10 Days', label: 'To First Lead' },
      { value: '50+ Leads', label: 'Month 1 Inflow' },
    ],
  },
];

const capabilities = [
  {
    icon: '◎',
    title: 'Clear Positioning & Messaging',
    description: 'Most B2B sites list features and compete on price. I help you say what you actually do, for whom, and why it matters - so buyers see you as the obvious choice, not just another vendor.',
    deliverables: ['A look at what competitors say', 'A sharp value proposition', 'Copy that speaks to real buyers'],
    timeline: 'Done in week 1',
  },
  {
    icon: '⟨/⟩',
    title: 'Fast, Custom Websites',
    description: 'I design and build your site from scratch in React and Next.js - fast, secure, and easy to update. No slow templates, no bloated page builders. It loads in under 1.2 seconds anywhere in the world.',
    deliverables: ['Custom Next.js & React build', 'Lead capture that flows to your inbox', 'Analytics wired up from day one'],
    timeline: 'Live in 7-14 days',
  },
  {
    icon: '🔍',
    title: 'Getting Found on Google & AI Search',
    description: 'I set your site up to rank when buyers search for what you sell - on Google, and now inside ChatGPT, Claude, and Perplexity too. The focus is high-intent buyer searches, not vanity traffic.',
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
    description: 'Traffic is worthless if nobody gets in touch. I find where people drop off - confusing pages, clunky forms, dead ends - and fix it, so more of the visitors you already have turn into leads.',
    deliverables: ['A teardown of where visitors leave', 'Simpler, higher-converting forms', 'Clear tracking of what works'],
    timeline: 'Ongoing',
  },
];

const niches = [
  { label: 'Fleet Telematics & IoT Hardware', to: '/case-studies#wiziot-case-study' },
  { label: 'Automotive & AIS-140 Manufacturing', to: '/case-studies#atlanta-case-study' },
  { label: 'B2B Medical Supplies & Hospitals', to: '/case-studies#medventa-case-study' },
  { label: 'Nutraceutical & Wellness CDMO', to: '/case-studies#probiota-case-study' },
  { label: 'SaaS & Enterprise Startups', to: '/saas-websites' },
];

const processSteps = [
  {
    title: '1. Free Audit',
    description: 'Tell me about your business and goals. I review your current site - speed, search visibility, and where you\'re losing leads - and send back a short video walking through what I\'d fix first.',
  },
  {
    title: '2. Build Sprint',
    description: 'I design, write, and build your new site and set up lead tracking. The core build is done in 7-14 days, and you\'re involved at every step - no black box.',
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
        subtitle="I design fast, modern websites for B2B founders and set them up to rank on Google - so the right buyers find you and get in touch. Most sites go live in about 7 days, backed by a 100% money-back guarantee."
        primaryCTA={{ to: '/free-audit', label: 'Get a Free Website Audit' }}
        secondaryCTA={{ to: '/philosophy', label: 'How I Work' }}
      />

      {/* Client Logo Cloud & Verified Trust Bar */}
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
                Most agencies win your business, then hand it to a junior account manager. I don't work that way. Your positioning, your copy, your site, and your search setup are all done by me - the person you actually talked to.
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

      {/* Verified Case Study Showcase */}
      <section className="case-teaser" id="case-teaser">
        <div className="container">
          <div className="case-teaser__header">
            <p className="section-label">Verified Deployments</p>
            <h2 className="section-title">Evidence-Backed Client Infrastructure</h2>
            <p className="section-subtitle">
              Real production platforms built and scaled by Rankur. Every site features a verified footer link back to rankursite.com.
            </p>
          </div>

          <div className="case-teaser__showcase-grid">
            {verifiedShowcases.map((cs, i) => (
              <div key={i} className="case-showcase-card">
                <div className="case-showcase-card__image-wrap">
                  <img src={cs.image} alt={cs.title} />
                  <span className="case-showcase-card__badge-pill">{cs.badge}</span>
                </div>
                <div className="case-showcase-card__body">
                  <span className="case-showcase-card__tag">{cs.tag}</span>
                  <h3 className="case-showcase-card__title">{cs.title}</h3>
                  <p className="case-showcase-card__desc">{cs.description}</p>
                  
                  <div className="case-showcase-card__stats">
                    {cs.stats.map((s, idx) => (
                      <div key={idx} className="case-showcase-card__stat-item">
                        <span className="case-showcase-card__stat-val">{s.value}</span>
                        <span className="case-showcase-card__stat-lbl">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="case-showcase-card__actions">
                    <Link href="/case-studies" className="btn btn--secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}>
                      View Case Study →
                    </Link>
                    <a
                      href={cs.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="case-showcase-card__verify-link"
                      title={`Verify backlink in footer of ${cs.domain}`}
                    >
                      Verify Footer Link ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}>
            <Link href="/case-studies" className="btn btn--primary" style={{ padding: 'var(--space-md) var(--space-2xl)' }}>
              Explore All Verified Case Studies →
            </Link>
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
      <section className="home-process" id="home-process">
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
            Send me your site and I'll record a short video walking through what's holding it back - your speed, how you show up on Google and AI search, and where visitors are slipping away. No cost, no pitch.
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
