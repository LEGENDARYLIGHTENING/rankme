"use client";

import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import './Philosophy.css';

const beliefs = [
  {
    num: '01',
    title: 'Websites must support pipeline, not vanity metrics.',
    desc: 'Impressions without buyer clarity pay zero bills. I design technical structures and commercial copy focused on real product evaluation and inquiries.',
  },
  {
    num: '02',
    title: 'Websites qualify buyers before the first call.',
    desc: 'B2B buyers research quietly before contacting sales. Your site should explain technical specifications, proof, and engagement terms clearly without marketing fluff.',
  },
  {
    num: '03',
    title: 'SEO should target commercial buyer questions cleanly.',
    desc: 'Publishing scaled filler content dilutes authority. High-intent search architecture, authoritative buyer positioning, and commercial decision frameworks build defensible category dominance.',
  },
  {
    num: '04',
    title: 'Structured clarity helps both search engines and AI answers.',
    desc: 'Enterprise search algorithms and generative AI engines reward unambiguous capability and brand authority. Proprietary search-readiness frameworks ensure your solutions are cited as authoritative answers for high-value buyer queries.',
  },
  {
    num: '05',
    title: 'Verifiable trust comes from honest documentation.',
    desc: 'Every inflated badge, unconsented testimonial initial, or fabricated number damages buyer trust. I prefer conservative claims, live sites you can inspect, and clear venture disclosure.',
  },
  {
    num: '06',
    title: 'High-resolution telemetry beats assumptions.',
    desc: 'Privacy-first commercial telemetry and pipeline attribution ground iterative optimizations in verified buyer journeys rather than vanity pageviews.',
  },
];

export default function Philosophy() {
  return (
    <>
      <HeroSection
        label="Philosophy"
        title={
          <>
            Six Principles Shaping My <br />
            <span className="text-gold">Web &amp; SEO Work</span>
          </>
        }
        subtitle="I build client web systems using the same transparent, engineering-led approach I apply to my own platforms."
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
        center
      />

      <section className="philosophy-section">
        <div className="container">
          <p className="section-label">How I Think</p>
          <h2 className="section-title">Engineering Principles</h2>
          <div className="philosophy-grid">
            {beliefs.map((belief, i) => (
              <div key={i} className="philosophy-card">
                <div className="philosophy-card__header">
                  <span className="philosophy-card__num">{belief.num}</span>
                  <h3 className="philosophy-card__title">{belief.title}</h3>
                </div>
                <p className="philosophy-card__desc">{belief.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ecosystem-philosophies" style={{ backgroundColor: 'var(--color-dark-surface)', padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <div className="about-story__content" style={{ maxWidth: '850px' }}>
            <p className="section-label">Operator Mindset</p>
            <h2 className="section-title">Built on Real Shipping Discipline</h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1rem', marginBottom: 'var(--space-lg)' }}>
              Rankur operates under <strong>Moksh Productions</strong>. The proprietary web engineering systems, search authority architectures, and executive qualification funnels I deploy for clients are proven across high-stakes commercial platforms and enterprise environments.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
              Milestone-based sign-off and full GitHub source code ownership keep engagements transparent from kickoff to handoff.
            </p>
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
