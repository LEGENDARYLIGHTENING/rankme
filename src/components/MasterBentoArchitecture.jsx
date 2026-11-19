"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, Cpu, BarChart3, ShieldCheck, UserCheck, ArrowUpRight } from 'lucide-react';
import './MasterBentoArchitecture.css';

export default function MasterBentoArchitecture() {
  return (
    <section className="master-bento" id="capabilities-architecture">
      <div className="container">
        <div className="master-bento__header">
          <div className="aceternity-badge" style={{ margin: '0 auto var(--space-md)' }}>
            <span className="aceternity-badge__dot"></span>
            Proprietary B2B Web Systems
          </div>
          <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
            Engineered for Pipeline Velocity &amp; Market Dominance
          </h2>
          <p className="section-subtitle">
            We eliminate generic agency templates and architect bespoke digital platforms engineered for sub-second speed, search engine dominance, and high-ticket B2B buyer conversion.
          </p>
        </div>

        <div className="master-bento__grid">
          {/* Cell 1: (8 cols) Generative Engine Optimization & Entity Discovery */}
          <div className="bento-cell bento-cell--hero">
            <div className="bento-cell__media">
              <span className="bento-cell__badge">
                <Sparkles size={13} strokeWidth={2.2} />
                Generative Engine Optimization (GEO)
              </span>
              <img
                src="/showcase/ai-visibility-landing-page.webp"
                alt="Generative AI Answer Citations and Enterprise Knowledge Graph Interface"
                loading="lazy"
                className="bento-cell__img"
              />
              <div className="bento-cell__media-overlay" />
            </div>

            <div className="bento-cell__body">
              <div>
                <h3 className="bento-cell__title">
                  Enterprise AI Answer Citations &amp; Knowledge Graph Integration
                </h3>
                <p className="bento-cell__desc">
                  Deterministic search positioning engineered for Google, ChatGPT, and Perplexity. We structure your digital footprint so your brand is surfaced as the definitive, verified answer across conversational AI and traditional search.
                </p>

                <div className="bento-cell__deliverables">
                  <span className="bento-cell__deliverable">Knowledge Graph Schemas</span>
                  <span className="bento-cell__deliverable">ChatGPT &amp; Perplexity Citations</span>
                  <span className="bento-cell__deliverable">Zero-Defect Technical Indexation</span>
                </div>
              </div>

              <div className="bento-cell__footer">
                <span className="bento-cell__stat">Top Citation Readiness</span>
                <Link
                  href="/services"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '0.82rem' }}
                >
                  <span>Explore GEO Architecture</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Cell 2: (4 cols) Sub-Second Global Edge Infrastructure */}
          <div className="bento-cell bento-cell--col4">
            <div className="bento-cell__media">
              <span className="bento-cell__badge">
                <Cpu size={13} strokeWidth={2.2} />
                Performance &amp; Speed
              </span>
              <img
                src="/showcase/product-landing-page.webp"
                alt="Sub-second Next.js edge infrastructure and Core Web Vitals performance"
                loading="lazy"
                className="bento-cell__img"
              />
              <div className="bento-cell__media-overlay" />
            </div>

            <div className="bento-cell__body">
              <div>
                <h3 className="bento-cell__title">Sub-Second Edge Infrastructure</h3>
                <p className="bento-cell__desc">
                  Custom Next.js platforms deployed on global edge networks. 98 to 100 Core Web Vitals eliminate buyer bounce rates and keep high-ticket buyers engaged.
                </p>

                <div className="bento-cell__deliverables">
                  <span className="bento-cell__deliverable">&lt;0.8s Global LCP</span>
                  <span className="bento-cell__deliverable">100/100 Core Web Vitals</span>
                  <span className="bento-cell__deliverable">0 Bloated Plugins</span>
                </div>
              </div>

              <div className="bento-cell__footer">
                <span className="bento-cell__stat">&lt;0.8s Global Speed</span>
                <Link
                  href="/services"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '0.82rem' }}
                >
                  <span>Speed Specs</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Cell 3: (4 cols) Conversion Architecture & GA4 Telemetry */}
          <div className="bento-cell bento-cell--col4">
            <div className="bento-cell__media">
              <span className="bento-cell__badge">
                <BarChart3 size={13} strokeWidth={2.2} />
                Analytics &amp; CRO
              </span>
              <img
                src="/showcase/simplistic-saas-template-1.webp"
                alt="Frictionless buyer qualification flow and GA4 pipeline telemetry"
                loading="lazy"
                className="bento-cell__img"
              />
              <div className="bento-cell__media-overlay" />
            </div>

            <div className="bento-cell__body">
              <div>
                <h3 className="bento-cell__title">Frictionless Pipeline Telemetry</h3>
                <p className="bento-cell__desc">
                  Transforming passive visitors into qualified sales inquiries. Through precision UX engineering and privacy-compliant analytics, every touchpoint maps to pipeline velocity.
                </p>

                <div className="bento-cell__deliverables">
                  <span className="bento-cell__deliverable">GA4 Telemetry Verified</span>
                  <span className="bento-cell__deliverable">Frictionless Inbound Flow</span>
                  <span className="bento-cell__deliverable">CRM Webhook Routing</span>
                </div>
              </div>

              <div className="bento-cell__footer">
                <span className="bento-cell__stat">GA4 Verified Tracking</span>
                <Link
                  href="/certifications"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '0.82rem' }}
                >
                  <span>Verify Credentials</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Cell 4: (4 cols) 100% Client Codebase Ownership */}
          <div className="bento-cell bento-cell--col4">
            <div className="bento-cell__media">
              <span className="bento-cell__badge">
                <ShieldCheck size={13} strokeWidth={2.2} />
                Intellectual Property
              </span>
              <img
                src="/showcase/design-development-studio-1.webp"
                alt="Full Git repository ownership and zero vendor lock-in architecture"
                loading="lazy"
                className="bento-cell__img"
              />
              <div className="bento-cell__media-overlay" />
            </div>

            <div className="bento-cell__body">
              <div>
                <h3 className="bento-cell__title">100% Client Code Ownership</h3>
                <p className="bento-cell__desc">
                  We never hold code hostage or trap clients in proprietary CMS themes. You receive 100% ownership of your git repository, custom components, schemas, and analytics properties.
                </p>

                <div className="bento-cell__deliverables">
                  <span className="bento-cell__deliverable">Complete GitHub Transfer</span>
                  <span className="bento-cell__deliverable">Zero Vendor Lock-In</span>
                  <span className="bento-cell__deliverable">Zero Recurring License Rent</span>
                </div>
              </div>

              <div className="bento-cell__footer">
                <span className="bento-cell__stat">100% IP Transfer</span>
                <Link
                  href="/about"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '0.82rem' }}
                >
                  <span>Engagement Terms</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Cell 5: (4 cols) Direct Execution by Moksh Parjapati */}
          <div className="bento-cell bento-cell--founder">
            <div className="bento-cell__body" style={{ height: '100%' }}>
              <div>
                <span className="bento-cell__badge" style={{ position: 'static', marginBottom: 'var(--space-md)' }}>
                  <UserCheck size={13} strokeWidth={2.2} />
                  Founder-Led Execution
                </span>

                <div className="bento-cell__founder-header">
                  <img
                    src="/founder-b2b-growth-infrastructure.webp"
                    alt="Moksh Parjapati, Founder of Rankur"
                    className="bento-cell__founder-avatar"
                  />
                  <div>
                    <h4 style={{ color: 'var(--color-white)', fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                      Moksh Parjapati
                    </h4>
                    <span style={{ color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 600 }}>
                      Founder &amp; Principal Web Engineer
                    </span>
                  </div>
                </div>

                <p className="bento-cell__desc">
                  No junior account managers or outsourced contractor assembly lines. Every commercial positioning framework, Next.js architecture, and SEO system is engineered directly by me with milestone sign-offs.
                </p>

                <div className="bento-cell__deliverables">
                  <span className="bento-cell__deliverable">Direct Engineering Velocity</span>
                  <span className="bento-cell__deliverable">Milestone Proposals</span>
                  <span className="bento-cell__deliverable">Mutual NDA Option</span>
                </div>
              </div>

              <div className="bento-cell__footer">
                <span className="bento-cell__stat">Direct Operator Access</span>
                <Link
                  href="/about"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold)', fontWeight: 600, textDecoration: 'none', fontSize: '0.82rem' }}
                >
                  <span>About Moksh</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
