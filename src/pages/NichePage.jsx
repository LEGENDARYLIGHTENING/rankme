import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import './NichePage.css';

export default function NichePage({
  seoTitle,
  seoDesc,
  niche,
  heroTitle,
  heroSubtitle,
  problemText,
  solutions,
  proofText,
  faqs
}) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        {seoDesc && <meta name="description" content={seoDesc} />}
      </Helmet>

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
          <h2>1,000+ Leads Generated</h2>
          <p>{proofText}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" style={{ backgroundColor: 'var(--color-black)' }}>
        <div className="container">
          <p className="section-label">{niche} FAQ</p>
          <h2 className="section-title">Common Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item" style={{ borderColor: 'var(--color-border)' }}>
                <div
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <h3 style={{ color: 'var(--color-gold)', margin: 0, fontSize: '1.2rem' }}>{faq.question}</h3>
                  <span className={`faq-item__toggle ${openFaq === i ? 'faq-item__toggle--open' : ''}`}>
                    +
                  </span>
                </div>
                {openFaq === i && (
                  <p className="faq-item__answer" style={{ color: 'var(--color-white)', marginTop: 'var(--space-md)' }}>{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
