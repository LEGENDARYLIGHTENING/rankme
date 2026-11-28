"use client";

import React from 'react';
import { Zap, ShieldCheck, SearchCheck, Handshake } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import SpotlightCard from '../components/SpotlightCard';
import { VERIFIED_CREDENTIALS } from '../data/credentials';
import './About.css';

const corporateCredentials = [
  { label: 'Operating Entity', value: 'Moksh Productions (India)' },
  { label: 'Primary Focus', value: 'B2B Web Engineering & Search Authority' },
  { label: 'Delivery Model', value: 'Direct Founder Execution & Milestone Sign-Offs' },
  { label: 'Confidentiality', value: 'Mutual Non-Disclosure Agreement (NDA) Prior to Review' },
];

const platformsLedger = [
  {
    title: 'Wafa Educational & Charitable Trust: Client Platform',
    evidence:
      "Rebuilt from WordPress to Next.js 16 with React 19 (App Router) and hosted on Vercel with prerendered pages at wafatrustindia.org. Built to the client's brief and approved by the client.",
  },
];

const principles = [
  {
    icon: Zap,
    title: 'Speed is a Direct Revenue Metric',
    desc: 'Website latency directly damages pipeline conversion. Excessive load delays cause high-intent buyers to abandon evaluations. Every platform we build is engineered on global edge networks with minimal payload weight to deliver fast, responsive interactions.',
  },
  {
    icon: ShieldCheck,
    title: '100% Client Ownership, Zero Lock-In',
    desc: 'We never hold code hostage or trap clients in proprietary CMS themes. You receive 100% ownership of your git repository, custom components, schemas, and analytics properties upon project completion.',
  },
  {
    icon: SearchCheck,
    title: 'Empirical Telemetry Over Vanity Signals',
    desc: 'Ranking for random keywords means nothing if your demo calendar stays empty. We instrument precise GA4 and CRM conversion milestones to measure actual buyer engagement and pipeline velocity.',
  },
  {
    icon: Handshake,
    title: 'Founder-to-Founder Accountability',
    desc: 'You work directly with Moksh Parjapati. Every strategic insight, line of code, and search architecture decision is owned by an experienced operator rather than delegated to junior agency staff.',
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
        subtitle="I engineer custom Next.js web platforms, technical SEO, and generative search systems for B2B and mission-driven organisations."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
        secondaryCTA={{ to: '#my-story', label: 'Read Story' }}
      />

      <section className="about-story" id="my-story">
        <div className="container">
          <p className="section-label">Background</p>
          <h2 className="section-title">Bridging Engineering and Commercial Search Strategy</h2>
          <div className="about-story__content">
            <p>
              I started Moksh Productions to build software platforms and technical web products. Along the way, I repeatedly saw B2B teams stuck between two broken agency archetypes: developers who treat SEO, messaging, and buyer conversion as afterthoughts, or marketing agencies who ship bloated, fragile CMS themes held back by slow code, broken schemas, and zero technical rigor.
            </p>
            <p>
              I founded <strong>Rankur</strong> to unify commercial market positioning, custom Next.js web engineering, and search architecture under a single, accountable partner.
            </p>
            <p>
              Every client platform is deployed using battle-tested proprietary standards: prioritizing defensible commercial growth and verifiable pipeline over inflated agency slogans.
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

      {/* Engineering Principles */}
      <section style={{ backgroundColor: 'var(--color-dark-surface)', padding: 'var(--space-5xl) 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
            <p className="section-label">Core Philosophy</p>
            <h2 className="section-title">Principles That Govern Every Engagement</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
              Clear rules of engagement that ensure transparency, technical excellence, and measurable commercial results.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
            {principles.map((p, idx) => (
              <SpotlightCard key={idx} style={{ padding: 'var(--space-2xl)' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(201, 168, 76, 0.08)',
                  border: '1px solid rgba(201, 168, 76, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  marginBottom: 'var(--space-md)',
                }}>
                  {React.createElement(p.icon, { size: 24, strokeWidth: 1.8 })}
                </div>
                <h4 style={{ fontSize: '1.18rem', color: 'var(--color-white)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                  {p.title}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7', margin: 0 }}>
                  {p.desc}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Structure */}
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

      {/* Production Work */}
      <section className="credentials-ledger-section" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <p className="section-label">Platforms Built</p>
          <h2 className="section-title">Production Work &amp; Venture Disclosure</h2>
          <div className="about-story__content" style={{ marginBottom: 'var(--space-3xl)' }}>
            <p>
              Below is the production ledger of client platforms developed using our Next.js web systems and search architecture, clearly distinguishing third-party clients from ventures I co-led or founded.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-xl)' }}>
            {platformsLedger.map((ledger, i) => (
              <SpotlightCard key={i} style={{ padding: 'var(--space-xl)' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-gold)', marginBottom: 'var(--space-sm)', fontWeight: 'var(--font-weight-bold)' }}>{ledger.title}</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7', margin: 0 }}>{ledger.evidence}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Certifications */}
      <section className="about-certs" id="about-certifications" style={{ padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-4xl)' }}>
            <p className="section-label">Verified Accreditation</p>
            <h2 className="section-title">Certifications &amp; Specialized Training</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: '1.7' }}>
              Documented credentials in analytics telemetry, full-funnel inbound marketing, and technical search architecture.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-xl)' }}>
            {VERIFIED_CREDENTIALS.map((cert) => (
              <SpotlightCard key={cert.id} style={{ padding: 'var(--space-2xl)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <span className="cert-status-pill" style={{ marginBottom: 'var(--space-md)' }}>
                      <span className="cert-status-dot"></span>
                      {cert.badge}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-white)', marginTop: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
                      {cert.name}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-gold)', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
                      {cert.issuer} {cert.year ? `· ${cert.year}` : ''}
                    </p>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: 'var(--space-lg)' }}>
                      {cert.impact}
                    </p>
                  </div>

                  {cert.verifyUrl ? (
                    <div style={{ paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aceternity-verify-btn"
                        style={{ width: 'fit-content' }}
                      >
                        <span>Verify Credential</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                        </svg>
                      </a>
                    </div>
                  ) : (
                    <div style={{ paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        Verified Practical Apprenticeship
                      </span>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
