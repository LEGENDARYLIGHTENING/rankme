"use client";
import React, { useState } from 'react';
import { Compass, Code2, Search, FileText, BarChart3 } from 'lucide-react';

import HeroSection from '../components/HeroSection';
import ClientTrustBar from '../components/ClientTrustBar';
import TechStackBar from '../components/TechStackBar';
import BentoVisualShowcase from '../components/BentoVisualShowcase';
import SpotlightCard from '../components/SpotlightCard';
import Testimonials from '../components/Testimonials';
import CTABlock from '../components/CTABlock';
import { SeoJsonLd } from '../components/Seo';
import './Services.css';

const servicesData = [
  {
    icon: Compass,
    title: 'Strategic Positioning & Market Authority',
    badge: 'Discovery & Copy',
    description:
      'We translate complex technical capabilities into high-trust commercial messaging that commands authority and accelerates executive buying cycles.',
    deliverables: [
      'Executive Positioning & Competitive Moat Analysis',
      'Above-the-Fold Value Proposition Engineering',
      'Commercial Capability Architecture & Specification Maps',
      'Frictionless Qualification & Objection-Resolution Systems',
    ],
    timeline: 'Scoped during discovery milestone',
  },
  {
    icon: Code2,
    title: 'High-Converting Web Infrastructure & Pipeline Engineering',
    badge: 'Performance & Revenue',
    description:
      'We build custom digital platforms engineered to capture enterprise pipeline: delivering sub-second load times that keep buyers engaged, frictionless inquiry flows, and 100% intellectual property ownership.',
    deliverables: [
      'Sub-Second Global Architecture That Stops Buyer Bounces',
      'High-Intent Demo & RFQ Inbound Pathways',
      'Clean Conversion & Pipeline Attribution Tracking',
      '100% Codebase Transfer With Zero Vendor Lock-in',
    ],
    timeline: 'Milestone-based sign-off, terms in proposal',
  },
  {
    icon: Search,
    title: 'Search Authority & Generative AI Discovery',
    badge: 'Technical SEO & GEO',
    description:
      'Deterministic search infrastructure engineered for sustainable dominance across Google, ChatGPT, and Perplexity: safeguarding authority and ensuring verified answer recommendations.',
    deliverables: [
      'Proprietary Search Equity & Domain Protection',
      'Zero-Defect Deterministic Indexation Architecture',
      'Enterprise Knowledge Graph & Semantic Entity Integration',
      'AI Engine Citation Optimization & Brand Authority Guardrails',
    ],
    timeline: 'Integrated into every website build or audit',
  },
  {
    icon: FileText,
    title: 'Commercial Demand & Category Authority',
    badge: 'Content Strategy',
    description:
      'We construct authoritative commercial ecosystems and executive decision frameworks that systematically capture and convert high-ticket enterprise buyers actively evaluating vendors.',
    deliverables: [
      'High-Value Solution Architecture & Intent Mapping',
      'Authoritative Commercial Decision Frameworks',
      'Defensible Search Equity Distribution',
      'High-Trust Thought Leadership Standards',
    ],
    timeline: 'Scoped per content roadmap',
  },
  {
    icon: BarChart3,
    title: 'Conversion Flow & Pipeline Velocity',
    badge: 'Analytics & CRO',
    description:
      'We eliminate friction at critical decision points, ensuring high-intent visitors transition seamlessly into qualified sales conversations and booked calls.',
    deliverables: [
      'Frictionless Inbound Flow Engineering',
      'Enterprise Inquiry Qualification Protocols',
      'Full-Funnel Pipeline Telemetry',
      'Sub-Second Conversion Pathway Testing',
    ],
    timeline: 'Integrated into every engagement',
  },
];

const methodologyStages = [
  {
    step: '01',
    title: 'Forensic Diagnostic Audit',
    subtitle: '48-Hour Technical & Commercial Teardown',
    desc: 'We inspect every layer of your existing digital presence: Core Web Vitals across international device cohorts, crawl budget efficiency, cannibalized search queries, index bloat, and buyer qualification friction. You receive a prioritized, factual roadmap with zero fluff.',
  },
  {
    step: '02',
    title: 'Precision Architecture & Wireframing',
    subtitle: 'Bespoke Engineering Sprint',
    desc: 'We discard generic CMS templates and author clean, modular semantic components engineered on modern edge frameworks. We design user journeys specifically tailored to multi-stakeholder enterprise buying committees.',
  },
  {
    step: '03',
    title: 'Generative Engine & Semantic Search Readiness',
    subtitle: 'Structured Data Graph Construction',
    desc: 'We structure your complete service catalog, case proof, and founder authority into verified Schema.org entity graphs. This ensures Large Language Models (ChatGPT, Claude, Perplexity) parse and cite your brand as the definitive recommendation.',
  },
  {
    step: '04',
    title: 'Conversion Telemetry & Repository Transfer',
    subtitle: 'Verified Handoff & Milestone Completion',
    desc: 'We implement consent-clean GA4 and CRM event pipelines to monitor every qualified demo request. Upon final milestone sign-off, 100% of the production git repository and intellectual property are transferred directly to your organization.',
  },
];

const technicalStack = [
  { category: 'Conversion Infrastructure', tools: 'Bespoke Modern Web Architecture, Sub-Second Global Edge Runtimes, Zero CMS Vulnerabilities' },
  { category: 'Enterprise Integration', tools: 'High-Throughput CRM APIs, Secure Inbound Lead Routing, Automated Inbound Qualification' },
  { category: 'Infrastructure & Security', tools: 'Global Edge Delivery, Automated Zero-Downtime Deployments, Hardened Enterprise Security' },
  { category: 'Commercial Intelligence', tools: 'Full-Funnel Pipeline Telemetry, Search Engine Indexation Monitoring, Revenue Attribution' },
];

const faqs = [
  {
    question: 'How do you price B2B web engineering and SEO engagements?',
    answer:
      'Projects are scoped per deliverable after a technical audit, using written proposals and milestone-based sign-off terms rather than generic bundled templates.',
  },
  {
    question: 'Why build on custom high-performance architecture instead of template themes?',
    answer:
      'A custom high-performance architecture ensures sub-second global performance, total technical control, immune security posture with zero third-party plugin vulnerabilities, and complete intellectual property ownership.',
  },
  {
    question: 'What does Generative Engine Optimization (GEO) mean in practice?',
    answer:
      'Generative Engine Optimization (GEO) establishes your brand as the definitive authority cited by AI search models like ChatGPT, Perplexity, and Google. We engineer proprietary semantic graphs and factual capability positioning so AI systems accurately recommend your solutions to enterprise buyers.',
  },
  {
    question: 'Do you sign mutual NDAs before reviewing internal specs?',
    answer:
      'Yes. I operate under Moksh Productions (India) and sign mutual non-disclosure agreements before inspecting proprietary documentation or Search Console metrics.',
  },
  {
    question: 'Which international markets do you support?',
    answer:
      'I work remotely with B2B teams across the United States, United Kingdom, Canada, Australia, UAE, and Saudi Arabia.',
  },
  {
    question: 'How long does it take to see search movement after technical cleanup?',
    answer:
      'Technical crawl and index cleanup reflects in Search Console over the weeks following deployment, while competitive commercial keyword gains compound over subsequent months depending on domain authority and market competition.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function Services() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SeoJsonLd data={faqSchema} />

      <HeroSection
        label="Services"
        title={
          <>
            Engineering-Led <span className="text-gold">Web &amp; SEO Systems</span>
          </>
        }
        subtitle="I engineer fast B2B web systems, fix technical SEO debt, and structure clear buyer qualification flows."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
        secondaryCTA={{ to: '/case-studies', label: 'View Case Studies' }}
      />

      <ClientTrustBar />

      {/* Core Services Section with Aceternity Spotlight Cards */}
      <section className="section" id="services-full" style={{ padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-4xl)' }}>
            <div className="aceternity-badge" style={{ margin: '0 auto var(--space-md)' }}>
              <span className="aceternity-badge__dot"></span>
              Full-Lifecycle B2B Capabilities
            </div>
            <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
              Comprehensive Web Engineering &amp; Search Authority
            </h2>
            <p className="section-subtitle">
              Every deliverable is engineered to remove buyer friction, defend search equity, and systematically convert enterprise demand.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'var(--space-xl)' }}>
            {servicesData.map((service, i) => (
              <SpotlightCard key={i} style={{ padding: 'var(--space-2xl)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
                      <div style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(201, 168, 76, 0.08)',
                        border: '1px solid rgba(201, 168, 76, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-gold)',
                      }}>
                        {React.createElement(service.icon, { size: 24, strokeWidth: 1.8 })}
                      </div>
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
                        Deliverables:
                      </p>
                      <ul style={{ paddingLeft: '1.2rem', margin: 0, color: 'var(--color-text-muted)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {service.deliverables.map((del, dIdx) => (
                          <li key={dIdx}>{del}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div style={{ paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                      {service.timeline}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Production Tech Stack & Standards */}
      <TechStackBar />

      {/* Aceternity Visual Architecture Bento Showcase */}
      <BentoVisualShowcase />

      {/* Methodology Section */}
      <section style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto var(--space-4xl)' }}>
            <p className="section-label">Our Protocol</p>
            <h2 className="section-title">The 4-Stage Engagement Methodology</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              How we take B2B companies from fragmented, sluggish digital brochures to enterprise-grade web platforms with verified pipeline attribution.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
            {methodologyStages.map((stage, idx) => (
              <SpotlightCard key={idx} style={{ padding: 'var(--space-2xl)' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: 'rgba(201, 168, 76, 0.25)', fontFamily: 'monospace', display: 'block', marginBottom: 'var(--space-sm)' }}>
                  {stage.step}
                </span>
                <h4 style={{ fontSize: '1.18rem', color: 'var(--color-white)', fontWeight: 700, marginBottom: 'var(--space-xs)' }}>
                  {stage.title}
                </h4>
                <p style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
                  {stage.subtitle}
                </p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
                  {stage.desc}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Execution Stack */}
      <section className="tech-stack-section" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-black)' }}>
        <div className="container">
          <p className="section-label">Execution Stack</p>
          <h2 className="section-title">Core Technologies Used</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-3xl)' }}>
            Unifying high-impact commercial positioning with enterprise-grade web engineering, domain equity preservation, and high-resolution pipeline telemetry.
          </p>
          <div className="tools-grid">
            {technicalStack.map((tech, i) => (
              <div key={i} className="tool-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-xs)', padding: 'var(--space-xl)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-gold)', fontWeight: 'var(--font-weight-bold)' }}>{tech.category}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{tech.tools}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="faq-section" id="services-faq">
        <div className="container">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Common Consulting Questions</h2>
          <div className="faq-list" style={{ marginTop: 'var(--space-2xl)' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-item__toggle ${openFaq === i ? 'faq-item__toggle--open' : ''}`}>
                    +
                  </span>
                </button>
                <p
                  id={`faq-answer-${i}`}
                  className={`faq-item__answer ${openFaq === i ? 'faq-item__answer--visible' : ''}`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
