"use client";

import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import { VERIFIED_CREDENTIALS } from '../data/credentials';
import './Certifications.css';

export default function Certifications() {
  return (
    <>
      <HeroSection
        label="Certifications"
        title={
          <>
            Verified <span className="text-gold">Credentials &amp; Training</span>
          </>
        }
        subtitle="Documented analytics certification and foundational marketing training that guide how I implement tracking and site architecture."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
      />

      <section className="section" id="certifications-list">
        <div className="container">
          <p className="section-label">My Credentials</p>
          <h2 className="section-title">Certifications &amp; Training</h2>
          <div className="certs-grid">
            {VERIFIED_CREDENTIALS.map((cert) => (
              <div key={cert.id} className="cert-card">
                <div className="cert-card__badge">{cert.badge}</div>
                <h3 className="cert-card__name">{cert.name}</h3>
                <p className="cert-card__issuer">{cert.issuer}</p>
                {cert.year && <p className="cert-card__year">{cert.year}</p>}
                <p className="cert-card__impact">{cert.impact}</p>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-card__link"
                  >
                    View Credential &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-section" id="why-certs-matter">
        <div className="container">
          <p className="section-label">Why This Matters</p>
          <h2 className="section-title">Clean Measurement Over Guesswork</h2>
          <div className="trust-section__content">
            <p>
              GA4 certification means form submissions, key events, and traffic channels are instrumented properly rather than left unmeasured. Foundational digital marketing training pairs that technical measurement with practical search and conversion structure.
            </p>
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
