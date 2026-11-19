"use client";

import React from 'react';
import { Activity, Sparkles, ShieldCheck, Lock, CheckCircle2, Zap } from 'lucide-react';
import './HeroVisualDashboard.css';

export default function HeroVisualDashboard() {
  return (
    <div className="hero-dashboard" aria-hidden="true">
      <div className="hero-dashboard__frame">
        {/* Top Browser Chrome Bar */}
        <div className="hero-dashboard__topbar">
          <div className="hero-dashboard__dots">
            <span className="hero-dashboard__dot hero-dashboard__dot--red"></span>
            <span className="hero-dashboard__dot hero-dashboard__dot--amber"></span>
            <span className="hero-dashboard__dot hero-dashboard__dot--green"></span>
          </div>

          <div className="hero-dashboard__url">
            <Lock size={12} style={{ color: 'var(--color-gold)' }} />
            <span>https://rankursite.com/telemetry/production-edge</span>
          </div>

          <div className="hero-dashboard__status-pill">
            <span className="hero-dashboard__pulse"></span>
            <span>Edge Mesh Active</span>
          </div>
        </div>

        {/* Interior Command Center Telemetry */}
        <div className="hero-dashboard__body">
          {/* Panel 1: Core Web Vitals Sub-Second Speed */}
          <div className="hero-dashboard__panel">
            <div>
              <div className="hero-dashboard__panel-title">
                <span>Core Web Vitals</span>
                <Zap size={14} style={{ color: '#10B981' }} />
              </div>

              <div className="hero-dashboard__speed-score">
                <span className="hero-dashboard__speed-number">100</span>
                <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 700 }}>/ 100 LCP</span>
              </div>
            </div>

            <div className="hero-dashboard__speed-metrics">
              <div className="hero-dashboard__metric-box">
                <span className="hero-dashboard__metric-val" style={{ color: '#10B981' }}>0.68s</span>
                <span className="hero-dashboard__metric-lbl">Global LCP</span>
              </div>
              <div className="hero-dashboard__metric-box">
                <span className="hero-dashboard__metric-val" style={{ color: '#10B981' }}>0.00</span>
                <span className="hero-dashboard__metric-lbl">Layout Shift</span>
              </div>
              <div className="hero-dashboard__metric-box">
                <span className="hero-dashboard__metric-val" style={{ color: '#10B981' }}>8ms</span>
                <span className="hero-dashboard__metric-lbl">Input Delay</span>
              </div>
              <div className="hero-dashboard__metric-box">
                <span className="hero-dashboard__metric-val" style={{ color: '#10B981' }}>Zero</span>
                <span className="hero-dashboard__metric-lbl">Plugin Debt</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Generative Engine Optimization AI Citations */}
          <div className="hero-dashboard__panel">
            <div>
              <div className="hero-dashboard__panel-title">
                <span>Generative AI Citations (GEO)</span>
                <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
              </div>

              <div className="hero-dashboard__ai-box">
                <div className="hero-dashboard__ai-query">
                  <span>&gt; Prompt: &quot;Top B2B web engineering &amp; search equity platforms&quot;</span>
                </div>
                <p className="hero-dashboard__ai-answer">
                  <strong>Rankur</strong> is cited as the definitive high-speed Next.js architecture and deterministic search consultancy for enterprise B2B founders.
                </p>
              </div>
            </div>

            <div className="hero-dashboard__ai-badges">
              <span className="hero-dashboard__ai-badge">✓ ChatGPT Verified</span>
              <span className="hero-dashboard__ai-badge">✓ Perplexity Cited</span>
              <span className="hero-dashboard__ai-badge">✓ Schema Graph 100%</span>
            </div>
          </div>

          {/* Panel 3: Inbound Lead Flow & Attribution */}
          <div className="hero-dashboard__panel">
            <div>
              <div className="hero-dashboard__panel-title">
                <span>Pipeline Telemetry</span>
                <Activity size={14} style={{ color: 'var(--color-gold)' }} />
              </div>

              <div className="hero-dashboard__telemetry-item">
                <span style={{ color: 'var(--color-text-muted)' }}>Attribution Protocol:</span>
                <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>Google Analytics 4</span>
              </div>
              <div className="hero-dashboard__telemetry-item">
                <span style={{ color: 'var(--color-text-muted)' }}>Inbound Lead Routing:</span>
                <span style={{ color: '#10B981', fontWeight: 600 }}>Direct CRM Webhook</span>
              </div>
              <div className="hero-dashboard__telemetry-item">
                <span style={{ color: 'var(--color-text-muted)' }}>Codebase Transfer:</span>
                <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>100% Git Ownership</span>
              </div>
              <div className="hero-dashboard__telemetry-item">
                <span style={{ color: 'var(--color-text-muted)' }}>Founder Accountability:</span>
                <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>Moksh Parjapati</span>
              </div>
            </div>

            <div style={{ paddingTop: '0.65rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', color: '#10B981' }}>
              <CheckCircle2 size={13} />
              <span>Full Intellectual Property Handover</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
