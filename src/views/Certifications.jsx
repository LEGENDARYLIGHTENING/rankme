"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BarChart3, Target, Cpu } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import TechStackBar from '../components/TechStackBar';
import CTABlock from '../components/CTABlock';
import { VERIFIED_CREDENTIALS } from '../data/credentials';
import './Certifications.css';

function SpotlightCard({ children, className = '', style = {} }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`aceternity-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0c0e12',
        border: isHovered ? '1px solid rgba(201, 168, 76, 0.45)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        boxShadow: isHovered ? '0 12px 30px -10px rgba(201, 168, 76, 0.15)' : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        ...style,
      }}
    >
      <div
        className="aceternity-spotlight"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 168, 76, 0.12), transparent 45%)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

export default function Certifications() {
  return (
    <div className="certifications-page">
      <HeroSection
        label="Verified Credentials"
        title={
          <>
            Documented Authority &amp;{' '}
            <span className="text-gold">Analytics Certifications</span>
          </>
        }
        subtitle="Publicly verifiable certifications from Google Skillshop and HubSpot Academy that govern how I architect measurement, search signals, and buyer conversion pipelines."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
        secondaryCTA={{ to: '#credentials-grid', label: 'View Credentials' }}
      />

      <section className="section" id="credentials-grid" style={{ paddingTop: 'var(--space-4xl)', paddingBottom: 'var(--space-5xl)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto var(--space-4xl)' }}>
            <div className="aceternity-badge" style={{ margin: '0 auto var(--space-md)' }}>
              <span className="aceternity-badge__dot"></span>
              Official Digital Credentials · Third-Party Verified
            </div>
            <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
              Industry Accreditations &amp; Specializations
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Unlike generic agency claims, every technical and marketing framework I implement is backed by verifiable certifications from the world&apos;s leading platform authorities.
            </p>
          </div>

          <div className="aceternity-bento-grid">
            {VERIFIED_CREDENTIALS.map((cert) => (
              <SpotlightCard key={cert.id} className="aceternity-cert-card">
                <div style={{ padding: 'var(--space-2xl)', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span className="cert-status-pill">
                        <span className="cert-status-dot"></span>
                        {cert.badge}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                        {cert.year}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-white)', marginBottom: 'var(--space-xs)', lineHeight: '1.35' }}>
                      {cert.name}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-gold)', fontWeight: 600, marginBottom: 'var(--space-md)' }}>
                      {cert.issuer}
                    </p>

                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: 'var(--space-xl)' }}>
                      {cert.impact}
                    </p>

                    {cert.skills && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: 'var(--space-xl)' }}>
                        {cert.skills.map((skill, idx) => (
                          <span key={idx} className="cert-skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {cert.verifyUrl ? (
                    <div style={{ paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="aceternity-verify-btn"
                      >
                        <span>Verify Credential Record</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  ) : (
                    <div style={{ paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
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

      {/* Production Tech Stack & Enterprise Compliance Standards */}
      <TechStackBar
        title="Enterprise Tech Stack & Security Frameworks"
        subtitle="Verifiable production standards, type-safe Next.js architecture, and privacy-compliant telemetry protocols."
      />

      {/* Aceternity Bento Architecture Section */}
      <section style={{ backgroundColor: 'var(--color-dark-surface)', padding: 'var(--space-5xl) 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
            <p className="section-label">Engineering Discipline</p>
            <h2 className="section-title">How Verified Methodology Protects Your Pipeline</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
              Most websites fail because marketing and engineering operate in silos. A developer builds a template without understanding search indexing; an agency writes copy without technical measurement. Combining analytics certification with custom Next.js web engineering bridges that divide.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)', marginTop: 'var(--space-2xl)' }}>
            <SpotlightCard style={{ padding: 'var(--space-2xl)' }}>
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
                <BarChart3 size={24} strokeWidth={1.8} />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--color-white)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                Clean Attribution &amp; Zero Guesswork
              </h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                Google Analytics 4 certification ensures that enterprise conversion paths, form completions, and high-intent buyer actions are instrumented cleanly into data layers without cookie bloat or data loss.
              </p>
            </SpotlightCard>

            <SpotlightCard style={{ padding: 'var(--space-2xl)' }}>
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
                <Target size={24} strokeWidth={1.8} />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--color-white)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                Inbound Lead Velocity &amp; Nurturing
              </h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                HubSpot Inbound Marketing certification guarantees that every page layout, lead form, and call to action is built around buyer psychology, removing friction and converting executive search intent into held calls.
              </p>
            </SpotlightCard>

            <SpotlightCard style={{ padding: 'var(--space-2xl)' }}>
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
                <Cpu size={24} strokeWidth={1.8} />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--color-white)', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>
                Custom Next.js Architecture
              </h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                We translate strategic positioning into custom Next.js engineering built for Core Web Vitals, with server-rendered HTML and structured metadata.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <CTABlock />
    </div>
  );
}
