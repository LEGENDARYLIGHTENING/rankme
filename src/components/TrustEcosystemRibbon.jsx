"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { VERIFIED_CREDENTIALS } from '../data/credentials';
import './TrustEcosystemRibbon.css';

const TECH_BADGES = [
  { name: 'Next.js', category: 'Edge SSR' },
  { name: 'React 19', category: 'Component Engine' },
  { name: 'TypeScript', category: 'Type Safety' },
  { name: 'Google Analytics 4', category: 'Verified Telemetry' },
  { name: 'HubSpot', category: 'Inbound Partner' },
  { name: 'Search Console', category: 'Deterministic Indexing' },
  { name: 'Tailwind CSS', category: 'Design Systems' },
  { name: 'Vercel Edge', category: '<0.8s Global LCP' },
  { name: 'SOC 2 Type II', category: 'Security Alignment' },
  { name: 'ISO 27001', category: 'Information Security' },
];

export default function TrustEcosystemRibbon() {
  const verifiedCreds = VERIFIED_CREDENTIALS.filter((c) => c.verifyUrl);

  return (
    <section className="trust-ribbon" id="trust-ribbon">
      <div className="container">
        {/* Top Tier: Verified Client Platform + Direct Credential Verifications */}
        <div className="trust-ribbon__top">
          {/* Featured Live Client Platform */}
          <a
            href="https://www.wafatrustindia.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="trust-ribbon__client"
            title="Visit live production platform: Wafa Educational & Charitable Trust"
          >
            <img
              src="/wafa-trust-logo.jpeg"
              alt="Wafa Educational And Charitable Trust"
              className="trust-ribbon__client-logo"
            />
            <div className="trust-ribbon__client-meta">
              <span className="trust-ribbon__client-name">
                Wafa Educational &amp; Charitable Trust
                <ArrowUpRight size={13} style={{ color: 'var(--color-gold)' }} />
              </span>
              <span className="trust-ribbon__client-status">
                ● Live Production Platform · wafatrustindia.org
              </span>
              <span className="trust-ribbon__client-sub">
                Philanthropic Healthcare, Education &amp; Community Trust · Sub-Second Architecture
              </span>
            </div>
          </a>

          {/* Third-Party Verified Credentials */}
          <div className="trust-ribbon__creds">
            {verifiedCreds.map((cred) => (
              <a
                key={cred.id}
                href={cred.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="trust-ribbon__cred-pill"
                title={`Verify ${cred.name} on ${cred.issuer}`}
              >
                <CheckCircle2 size={13} style={{ color: 'var(--color-gold)' }} />
                <span>
                  <strong style={{ color: 'var(--color-gold)' }}>{cred.issuer}:</strong> {cred.name}
                </span>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Tier: Enterprise Standards & Technology Marquee */}
        <div className="trust-ribbon__bottom">
          <div className="trust-ribbon__label">
            <ShieldCheck size={14} />
            <span>Enterprise Standards &amp; Architecture:</span>
          </div>

          <div className="trust-ribbon__ecosystem">
            {TECH_BADGES.map((tech, idx) => (
              <div key={idx} className="trust-ribbon__item">
                <span style={{ color: 'var(--color-gold)', fontSize: '0.7rem' }}>✦</span>
                <span>{tech.name}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                  ({tech.category})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
