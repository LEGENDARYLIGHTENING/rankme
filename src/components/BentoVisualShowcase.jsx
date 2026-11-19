"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Cpu, BarChart3, ShieldCheck, ArrowUpRight } from 'lucide-react';
import './BentoVisualShowcase.css';

const SHOWCASE_ITEMS = [
  {
    id: 'ai-search-geo',
    type: 'featured',
    badge: 'Generative Engine Optimization (GEO)',
    badgeIcon: Sparkles,
    title: 'Enterprise AI Answer Citations & Knowledge Graph Integration',
    desc: 'We architect structured JSON-LD entity networks and authoritative digital footprints so your brand is surfaced and cited as the definitive answer across ChatGPT, Perplexity, and Google AI Overviews.',
    image: '/showcase/ai-visibility-landing-page.webp',
    alt: 'Enterprise AI Search Visibility and Generative Engine Optimization Interface',
    tags: ['Knowledge Graph Schemas', 'ChatGPT & Perplexity Citations', 'Zero Hallucination Equity'],
    stat: 'Top Citation Readiness',
    ctaLink: '/services',
    ctaText: 'Explore GEO Architecture',
  },
  {
    id: 'subsecond-edge',
    type: 'large',
    badge: 'Performance & Velocity',
    badgeIcon: Cpu,
    title: 'Sub-Second Edge Infrastructure & Core Web Vitals',
    desc: 'Static edge-rendered Next.js architecture scoring 98 to 100 on Core Web Vitals. Eliminating slow database calls and bloated agency plugins so enterprise buyers never experience latency.',
    image: '/showcase/product-landing-page.webp',
    alt: 'High-Performance Next.js Sub-Second B2B Architecture',
    tags: ['<0.8s Global LCP', '100% Core Web Vitals', '0 Bloated Plugins'],
    stat: '<0.8s Global Speed',
    ctaLink: '/services',
    ctaText: 'View Speed Systems',
  },
  {
    id: 'pipeline-telemetry',
    type: 'medium',
    badge: 'Attribution & Conversion',
    badgeIcon: BarChart3,
    title: 'Frictionless Inbound Flow & GA4 Pipeline Telemetry',
    desc: 'Converting passive executive traffic into qualified pipeline. Consent-gated Google Analytics 4 event streams, CRM webhook routing, and frictionless multi-step demo booking pathways.',
    image: '/showcase/simplistic-saas-template-1.webp',
    alt: 'High-Converting B2B SaaS Demo Booking and Attribution Dashboard',
    tags: ['GA4 Attribution Telemetry', 'HubSpot Form Integration', 'Qualified RFQ Routing'],
    stat: 'Verified Telemetry',
    ctaLink: '/certifications',
    ctaText: 'Verify Credentials',
  },
  {
    id: 'code-ownership',
    type: 'medium',
    badge: 'Intellectual Property',
    badgeIcon: ShieldCheck,
    title: '100% Client Codebase Transfer & Zero Vendor Lock-In',
    desc: 'Complete intellectual property ownership with full GitHub repository transfer upon completion. No hostage agency page builders, no locked databases, and no recurring license rent.',
    image: '/showcase/design-development-studio-1.webp',
    alt: 'Clean Modular B2B Frontend Architecture and Git Repository',
    tags: ['100% Git Ownership', 'Zero Vendor Lock-In', 'Milestone Sign-Offs'],
    stat: '100% IP Transfer',
    ctaLink: '/about',
    ctaText: 'About Engagement Terms',
  },
];

export default function BentoVisualShowcase() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="bento-showcase" id="visual-architecture">
      <div className="container">
        <div className="bento-showcase__header">
          <div className="aceternity-badge" style={{ margin: '0 auto var(--space-md)' }}>
            <span className="aceternity-badge__dot"></span>
            Production Visual Architecture
          </div>
          <h2 className="section-title" style={{ marginBottom: 'var(--space-md)' }}>
            Bespoke Engineering Built for Enterprise Evaluation
          </h2>
          <p className="section-subtitle">
            Inspect the high-speed architectural patterns, generative AI discovery interfaces, and conversion telemetry we build for high-growth B2B organizations.
          </p>
        </div>

        <div className="bento-showcase__grid">
          {SHOWCASE_ITEMS.map((item) => {
            const isFeatured = item.type === 'featured';
            const IconComp = item.badgeIcon;

            return (
              <div
                key={item.id}
                className={`bento-card bento-card--${item.type}`}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="bento-card__img-box">
                  <span className="bento-card__badge">
                    <IconComp size={13} strokeWidth={2.2} />
                    {item.badge}
                  </span>
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="bento-card__img"
                  />
                  <div className="bento-card__img-overlay" />
                </div>

                <div className="bento-card__content">
                  <div>
                    <h3 className="bento-card__title">{item.title}</h3>
                    <p className="bento-card__desc">{item.desc}</p>

                    <div className="bento-card__tags">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="bento-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bento-card__footer">
                    <span className="bento-card__stat">{item.stat}</span>
                    <Link
                      href={item.ctaLink}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: 'var(--color-gold)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        fontSize: '0.82rem',
                      }}
                    >
                      <span>{item.ctaText}</span>
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
