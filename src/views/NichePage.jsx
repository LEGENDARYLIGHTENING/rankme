"use client";
import { useState } from 'react';

import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import Breadcrumbs from '../components/Breadcrumbs';
import './NichePage.css';

export default function NichePage({
  seoTitle,
  seoDesc,
  niche,
  heroTitle,
  heroSubtitle,
  marketContext,
  problemText,
  marketOpportunity,
  competitiveLandscape,
  solutions,
  proofText,
  faqs
}) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Rankur | B2B Growth Infrastructure - ${niche}`,
    description: seoDesc,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: niche,
    },
    provider: {
      '@type': 'Organization',
      name: 'Rankur (Moksh Productions)',
      url: 'https://rankursite.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'B2B Growth Services',
      itemListElement: (solutions || []).map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.desc,
        },
      })),
    },
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: niche },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Breadcrumbs items={breadcrumbItems} />

      <div className="niche-hero">
        <HeroSection
          label={`${niche} Growth Specialist`}
          title={heroTitle}
          subtitle={heroSubtitle}
          primaryCTA={{ to: '/free-audit', label: 'Book Free Audit' }}
        />
      </div>

      {/* Problem Section */}
      <section className="niche-problem">
        <div className="container">
          <p className="section-label">The Problem</p>
          <h2 className="section-title">Why Most {niche} Websites Fail</h2>
          <div className="niche-problem__content">
            {problemText.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Market Section */}
      {(marketContext || marketOpportunity) && (
        <section className="niche-market">
          <div className="container">
             <h2 className="section-title">The {niche} Market</h2>
             <div className="niche-market__content" style={{ marginTop: '1.5rem', lineHeight: '1.8' }}>
                {marketContext && <p>{marketContext}</p>}
                {marketOpportunity && <p style={{ marginTop: marketContext ? '1.25rem' : 0 }}>{marketOpportunity}</p>}
             </div>
          </div>
        </section>
      )}

      {/* Competitive Landscape Section */}
      {competitiveLandscape && (
        <section className="niche-competition" style={{ backgroundColor: 'var(--color-black)', padding: '4rem 0' }}>
          <div className="container">
             <h2 className="section-title">Who You're Up Against Locally</h2>
             <div className="niche-competition__content" style={{ marginTop: '1.5rem', lineHeight: '1.8' }}>
                <p>{competitiveLandscape}</p>
             </div>
          </div>
        </section>
      )}

      {/* Solution Section */}
      <section className="niche-solution">
        <div className="container">
          <p className="section-label">The Solution</p>
          <h2 className="section-title">What I Deliver for {niche}</h2>
          <div className="niche-solution__grid">
            {solutions.map((item, i) => (
              <div key={i} className="niche-feature">
                <div className="niche-feature__icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Banner */}
      <section className="niche-proof">
        <div className="container">
          <h2>Websites built to turn visitors into real sales conversations</h2>
          <p>{proofText}</p>
          <p style={{ marginTop: '0.75rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-gold)' }}>
            Every build is backed by a 100% money-back guarantee.
          </p>
        </div>
      </section>

      {/* FAQ */}
      {faqs && faqs.length > 0 && (
        <section className="faq-section" style={{ backgroundColor: 'var(--color-black)' }}>
          <div className="container">
            <p className="section-label">{niche} FAQ</p>
            <h2 className="section-title">Common Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item" style={{ borderColor: 'var(--color-border)' }}>
                  <button
                    className="faq-item__question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-niche-${i}`}
                    id={`faq-question-niche-${i}`}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--color-gold)' }}
                  >
                    <span style={{ color: 'var(--color-gold)', fontWeight: 'var(--font-weight-medium)', fontSize: '1.1rem', textAlign: 'left' }}>{faq.question}</span>
                    <span className={`faq-item__toggle ${openFaq === i ? 'faq-item__toggle--open' : ''}`}>
                      +
                    </span>
                  </button>
                  <p
                    id={`faq-answer-niche-${i}`}
                    className={`faq-item__answer ${openFaq === i ? 'faq-item__answer--visible' : ''}`}
                    style={{ color: 'var(--color-white)' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABlock />
    </>
  );
}
