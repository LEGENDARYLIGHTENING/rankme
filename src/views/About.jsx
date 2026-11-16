"use client";

import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import { VERIFIED_CREDENTIALS } from '../data/credentials';
import './About.css';

const corporateCredentials = [
  { label: 'Operating Entity', value: 'Moksh Productions' },
  { label: 'Registration Status', value: 'MSME-Registered Enterprise (India)' },
  { label: 'Contract Security', value: 'Mutual NDA Available Before Audit & Scoping' },
  { label: 'Operating Markets', value: 'US, UK, Canada, Australia, UAE, Saudi Arabia' },
];

// NEEDS-MOKSH (T4): Add real scans of MSME registration, signed recommendation letter, and GA4 certificate when supplied.
const platformsLedger = [
  {
    title: 'Wafa Educational & Charitable Trust — Client Platform',
    evidence:
      'Accessible, high-performance Next.js digital platform built for a philanthropic healthcare and education trust, organizing community medical aid and donor contact pathways cleanly at wafatrustindia.org.',
  },
];

export default function About() {
  return (
    <>
      <HeroSection
        label="About Moksh"
        title={
          <>
            Founder-Led <span className="text-gold">Web &amp; SEO Engineering</span>
          </>
        }
        subtitle="I engineer high-performance digital platforms and search authority systems engineered to capture high-value buyer demand and accelerate B2B pipeline."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
      />

      <section className="about-story" id="my-story">
        <div className="container">
          <p className="section-label">Background</p>
          <h2 className="section-title">Bridging Engineering and Commercial Search Strategy</h2>
          <div className="about-story__content">
            <p>
              I started Moksh Productions to build software platforms and technical web products. Along the way, I repeatedly saw B2B teams stuck between agencies: developers who treat SEO and messaging as afterthoughts, or marketers who ship bloated templates held back by slow code and duplicate URLs.
            </p>
            <p>
              I founded <strong>Rankur</strong> to unify commercial market positioning, high-performance web engineering, and enterprise search authority under a single, accountable partner.
            </p>
            <p>
              Every client platform is deployed using battle-tested proprietary standards — prioritizing defensible commercial growth and verifiable pipeline over inflated agency slogans.
            </p>

            <div className="img-placeholder" style={{ margin: 'var(--space-2xl) 0', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
              <img
                src="/moksh-parjapati-b2b-growth-consultant.jpeg"
                alt="Moksh Parjapati, Founder of Rankur"
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'inherit' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="corporate-credentials-section" style={{ padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <p className="section-label">Operating Structure</p>
          <h2 className="section-title">Business Entity &amp; Terms</h2>
          <div className="about-story__content" style={{ marginBottom: 'var(--space-3xl)' }}>
            <p>
              Rankur operates as an engineering and SEO consultancy under <strong>Moksh Productions</strong> in India, with written milestone proposals and mutual NDA options available upon request.
            </p>
          </div>
          <div className="tools-grid" style={{ marginTop: 'var(--space-xl)' }}>
            {corporateCredentials.map((cred, i) => (
              <div key={i} className="tool-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-xs)', padding: 'var(--space-xl)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: 'var(--font-weight-bold)' }}>{cred.label}</span>
                <span style={{ fontSize: '0.95rem', color: 'var(--color-white)', fontWeight: 'var(--font-weight-medium)' }}>{cred.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="credentials-ledger-section" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <p className="section-label">Platforms Built</p>
          <h2 className="section-title">Production Work &amp; Venture Disclosure</h2>
          <div className="about-story__content" style={{ marginBottom: 'var(--space-3xl)' }}>
            <p>
              Below is the production ledger of client builds and in-house ventures developed using the same Next.js architecture, clearly distinguishing third-party clients from ventures I co-led or founded.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-xl)' }}>
            {platformsLedger.map((ledger, i) => (
              <div key={i} style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', padding: 'var(--space-xl)' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-gold)', marginBottom: 'var(--space-sm)', fontWeight: 'var(--font-weight-bold)' }}>{ledger.title}</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7', margin: 0 }}>{ledger.evidence}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-certs" id="about-certifications">
        <div className="container">
          <p className="section-label">Credentials</p>
          <h2 className="section-title">Verified Certifications &amp; Training</h2>
          <div className="about-certs__grid">
            {VERIFIED_CREDENTIALS.map((cert) => (
              <div key={cert.id} className="about-cert-card">
                <p className="about-cert-card__name">{cert.name}</p>
                <p className="about-cert-card__issuer">{cert.issuer}</p>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-gold)', fontSize: '0.85rem', display: 'inline-block', marginTop: 'var(--space-sm)' }}
                  >
                    Verify Credential &rarr;
                  </a>
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
