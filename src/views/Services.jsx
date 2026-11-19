"use client";
import { useState } from 'react';

import HeroSection from '../components/HeroSection';
import ClientTrustBar from '../components/ClientTrustBar';
import ServiceCard from '../components/ServiceCard';
import Testimonials from '../components/Testimonials';
import CTABlock from '../components/CTABlock';
import { SeoJsonLd } from '../components/Seo';
import './Services.css';

const servicesData = [
  {
    icon: '◎',
    title: 'Strategic Positioning & Market Authority',
    description:
      'We translate technical workflows and complex product capabilities into high-trust commercial messaging that commands authority and accelerates executive buying cycles.',
    deliverables: [
      'Executive Positioning & Competitive Moat Analysis',
      'Above-the-Fold Value Proposition Engineering',
      'Commercial Capability Architecture & Specification Maps',
      'Frictionless Qualification & Objection-Resolution Systems',
    ],
    timeline: 'Scoped during discovery milestone',
  },
  {
    icon: '⟨/⟩',
    title: 'Proprietary Next.js Web Infrastructure',
    description:
      'We architect bespoke React and Next.js digital platforms engineered on global edge networks — delivering sub-second response times, zero CMS dependencies, and full source code ownership.',
    deliverables: [
      'High-Performance Next.js Edge Architecture',
      'Zero-Loss Telemetry & Event Tracking',
      'Accessible, High-Conversion Semantic Interfaces',
      '100% Repository Transfer & Asset Ownership',
    ],
    timeline: 'Milestone-based sign-off, terms in proposal',
  },
  {
    icon: '🔍',
    title: 'Search Authority & Generative AI Discovery',
    description:
      'Deterministic search infrastructure engineered for sustainable dominance across Google, ChatGPT, and Perplexity — safeguarding authority and ensuring verified answer recommendations.',
    deliverables: [
      'Proprietary Search Equity & Domain Protection',
      'Zero-Defect Deterministic Indexation Architecture',
      'Enterprise Knowledge Graph & Semantic Entity Integration',
      'AI Engine Citation Optimization & Brand Authority Guardrails',
    ],
    timeline: 'Integrated into every website build or audit',
  },
  {
    icon: '✍',
    title: 'Commercial Demand & Category Authority',
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
    icon: '📊',
    title: 'Conversion Flow & Pipeline Velocity',
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

const technicalStack = [
  { category: 'Core Platform Engineering', tools: 'Modern React & Next.js Ecosystem, Component Modularization, Edge Runtimes' },
  { category: 'Enterprise Integration', tools: 'High-Throughput APIs, Distributed Data Layers, Secure Lead Routing Protocols' },
  { category: 'Infrastructure & Security', tools: 'Global Edge Delivery, Automated Zero-Downtime Deployments, Hardened Security Headers' },
  { category: 'Commercial Intelligence', tools: 'High-Resolution Funnel Telemetry, Search Engine Indexation Monitoring, Pipeline Attribution' },
];

const faqs = [
  {
    question: 'How do you price B2B web engineering and SEO engagements?',
    answer:
      'Projects are scoped per deliverable after a technical audit, using written proposals and milestone-based sign-off terms rather than generic bundled templates.',
  },
  {
    question: 'Why build on custom React and Next.js instead of template themes?',
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
        subtitle="I build fast Next.js platforms, fix technical SEO debt, and structure clear B2B conversion flows."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
        secondaryCTA={{ to: '/case-studies', label: 'View Case Studies' }}
      />

      <ClientTrustBar />

      <section className="section" id="services-full">
        <div className="container">
          <p className="section-label">Core Offerings</p>
          <h2 className="section-title">How I Build &amp; Optimize B2B Sites</h2>
          <div className="services-page__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
            {servicesData.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="tech-stack-section" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}>
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
