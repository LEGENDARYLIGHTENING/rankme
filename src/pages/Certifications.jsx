import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import './Certifications.css';

const certs = [
  {
    badge: '✓',
    name: 'GA4 Certification',
    issuer: 'Google',
    year: '2024',
    impact: 'Tracks every lead, form fill, and conversion event on your site — ensuring no opportunity is missed and every dollar spent is accounted for.',
  },
  {
    badge: '★',
    name: 'Digital Marketing Mastery',
    issuer: 'Digital Deepak Internship Program',
    year: '2024',
    impact: 'Full-stack digital marketing training covering SEO, ads, funnels, and content — the foundation of every growth system I build for clients.',
  },
];

export default function Certifications() {
  return (
    <>
      <Helmet>
        <title>Certifications | Moksh — B2B Growth Consultant</title>
        <meta
          name="description"
          content="GA4 certified and Digital Deepak trained. Verified SEO, GEO, and performance marketing credentials to ensure your B2B growth consulting delivers massive ROI."
        />
      </Helmet>

      <HeroSection
        label="Certifications"
        title={
          <>
            Credentials That{' '}
            <span className="text-gold">Drive Results</span>
          </>
        }
        subtitle="Every certification directly impacts client outcomes — these are not just badges, they are the systems behind the results."
        primaryCTA={{ to: '/free-audit', label: 'Book Free Audit' }}
      />

      <section className="section" id="certifications-list">
        <div className="container">
          <p className="section-label">My Credentials</p>
          <h2 className="section-title">Certifications & Training</h2>
          <div className="certs-grid">
            {certs.map((cert, i) => (
              <div key={i} className="cert-card">
                <div className="cert-card__badge">{cert.badge}</div>
                <h3 className="cert-card__name">{cert.name}</h3>
                <p className="cert-card__issuer">{cert.issuer}</p>
                <p className="cert-card__year">{cert.year}</p>
                <p className="cert-card__impact">{cert.impact}</p>
              </div>
            ))}

            {/* In Progress Card */}
            <div className="cert-card" style={{ borderColor: 'var(--color-border)' }}>
              <div className="cert-card__badge" style={{ color: 'var(--color-gold)' }}>…</div>
              <p className="cert-card__progress-badge" style={{ color: 'var(--color-gold)', backgroundColor: 'transparent', border: '1px solid var(--color-gold)' }}>Coming Soon</p>
              <h3 className="cert-card__name" style={{ color: 'var(--color-text-muted)' }}>More Certifications In Progress — check back soon.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section" id="why-certs-matter">
        <div className="container">
          <p className="section-label">Why This Matters</p>
          <h2 className="section-title">Certified Frameworks, Applied for Real ROI</h2>
          <div className="trust-section__content">
            <p>
              Every certification here directly informs how your project is built, tracked, and optimized. GA4 certification means every lead on your site is measured. Digital marketing training means the strategy is grounded in what actually works across paid, organic, and content channels.
            </p>
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
