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
    title: 'Strategic Positioning & Messaging',
    description:
      'I translate complex manufacturing, software, and clinical workflows into straightforward commercial web copy aligned to executive buying evaluation.',
    deliverables: [
      'Competitor messaging teardown',
      'Above-the-fold positioning clarity pass',
      'Commercial capability & spec sheet structure',
      'Lead qualification pathways & objection-handling FAQs',
    ],
    timeline: 'Scoped during discovery milestone',
  },
  {
    icon: '⟨/⟩',
    title: 'Custom Next.js Web Engineering',
    description:
      'I design and build clean React and Next.js websites deployed on edge networks without bloated visual builders or fragile plugin stacks.',
    deliverables: [
      'Custom React & Next.js App Router frontend',
      'Consent-clean GA4 conversion event tracking',
      'Accessible semantic markup & responsive layouts',
      'Full GitHub repository ownership transferred to you',
    ],
    timeline: 'Milestone-based sign-off, terms in proposal',
  },
  {
    icon: '🔍',
    title: 'Technical SEO & GEO Architecture',
    description:
      'I audit and fix crawl bloat, canonical conflicts, thin doorway routes, schema hygiene, and clear factual structure for Google and AI search engines.',
    deliverables: [
      '301 redirect preservation for legacy URLs',
      'Prebuild SEO checks enforcing canonical & meta limits',
      'Cleaned sitemaps matching real indexable routes',
      'Structured JSON-LD entity and FAQ schema markup',
    ],
    timeline: 'Integrated into every website build or audit',
  },
  {
    icon: '✍',
    title: 'B2B Content & Comparison Architecture',
    description:
      'I replace repetitive filler posts with focused commercial comparison pages, technical guides, and clear internal linking across core topic hubs.',
    deliverables: [
      'Editorial content pruning & noindex/triage workflows',
      'Category hub and contextual internal link architecture',
      'Solution and technical buyer evaluation guides',
      'Zero unsourced stats or placeholder copy',
    ],
    timeline: 'Scoped per content roadmap',
  },
  {
    icon: '📊',
    title: 'Conversion Flow & Form Optimization',
    description:
      'I remove form friction, fix dead or confusing CTAs, add anti-spam protections, and make inquiry handoffs measurable without inflating traffic spend.',
    deliverables: [
      'Lead & RFQ form friction teardowns',
      'Consent & privacy notice integration',
      'Honeypot spam protection & confirmation routing',
      'Consent-gated GA4 lead event measurement',
    ],
    timeline: 'Included in builds and CRO scopes',
  },
];

const technicalStack = [
  { category: 'Frontend Architecture', tools: 'React, Next.js (App Router), HTML5, Modular CSS' },
  { category: 'Backend & Integrations', tools: 'Node.js, PostgreSQL, REST APIs, Supabase, Web3Forms' },
  { category: 'Hosting & Security', tools: 'Vercel Edge, HTTPS/HSTS, Security Headers, 301 Redirect Maps' },
  { category: 'Analytics & Verification', tools: 'GA4 (consent-gated), Google Search Console, Automated SEO CI Checks' },
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
      'Custom Next.js gives full control over bundle size, clean semantic HTML, explicit metadata inheritance, prebuild validation, and zero plugin vulnerability bloat.',
  },
  {
    question: 'What does Generative Engine Optimization (GEO) mean in practice?',
    answer:
      'In practice, GEO means clear entity schema markup, factual non-hyped service copy, clean Q&A structure matching visible page content, and crawlable static HTML so both search engines and AI systems parse your capabilities accurately.',
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
          <div className="services-page__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
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
            Combining structured commercial messaging with clean React/Next.js code, explicit redirects, and consent-clean telemetry.
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
