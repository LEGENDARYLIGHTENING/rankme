import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import './About.css';

const certifications = [
  { name: 'Google Analytics 4 (GA4) Certification', issuer: 'Google' },
  { name: 'Advanced Conversion Optimization & Tracking Masterclass', issuer: 'ConversionXL Institute' },
  { name: 'B2B Digital Sourcing & Channel Integration', issuer: 'Alibaba Channel Operations Partner' },
];

const corporateCredentials = [
  { label: 'Parent Corporation', value: 'Moksh Productions' },
  { label: 'Registration Status', value: 'MSME-Registered Enterprise (India)' },
  { label: 'Contract Integrity', value: 'Mutual NDA Protected Audits & Agreements' },
  { label: 'Operating Markets', value: 'US, UK, Australia, Canada, UAE, Saudi Arabia, Qatar' },
];

const credentialsLedger = [
  {
    title: 'Nutraceutical Platform (Probiota Innovations)',
    evidence: 'Designed, wrote, and deployed custom React web application. Built lead database pipelines and SEO frameworks that generated 10+ high-value global inquiries in the first 10 days post-launch.',
  },
  {
    title: 'Brand Positioning & Strategy (Gut & Beyond)',
    evidence: 'Structured digital messaging architecture, UX alignment, and organic search campaigns for leading wellness brands.',
  },
  {
    title: 'Global Export Channels (Competence Consulting E-Commerce LLP)',
    evidence: 'Managed channel partnerships, digital workflows, and global B2B buyer sourcing structures via official Alibaba channels.',
  },
  {
    title: 'Acquisition Funnels & Campaigns (Glitchy)',
    evidence: 'Developed custom landing pages, GA4 custom conversion tracking, and high-performing lead generation campaigns.',
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>Meet Moksh | Founder & B2B Growth Consultant | Rankur</title>
        <meta
          name="description"
          content="Moksh, Founder of Rankur and Moksh Productions. Discover how we build custom B2B web infrastructure, organic SEO, and AI search presence."
        />
      </Helmet>

      <HeroSection
        label="Meet the Founder"
        title={
          <>
            Founder-Led <span className="text-gold">Growth Engineering</span>
          </>
        }
        subtitle="I build custom web infrastructure, search dominance strategies, and conversion systems based on the exact principles we use to scale our own ventures."
        primaryCTA={{ to: '/free-audit', label: 'Apply for B2B Audit' }}
      />

      {/* Story */}
      <section className="about-story" id="my-story">
        <div className="container">
          <p className="section-label">My Philosophy</p>
          <h2 className="section-title">Bridging Code and Commercial Strategy</h2>
          <div className="about-story__content">
            <p>
              I started Moksh Productions with a clear vision: to build a portfolio of high-value ventures, from software platforms to technical services. 
              Along the journey, I discovered that most B2B companies suffer from a massive disconnect: they hire developers who do not understand marketing, 
              or copywriters who cannot deploy code.
            </p>
            <p>
              To solve this, I built <strong>Rankur</strong>. I mastered custom software engineering, technical SEO, and conversion path design. 
              By aligning positioning, custom React/Next.js web builds, and search visibility (SEO + GEO), we build the digital infrastructure 
              needed to capture enterprise contracts and overseas inquiries.
            </p>
            <p>
              I do not believe in theoretical marketing. The positioning systems and technical architectures we deploy for Rankur\'s clients 
              are the exact same growth engines we use to scale our own internal software, SaaS, and product ventures. 
              This is not an agency built on sales pitches; it is a founder-led growth consultancy built on execution.
            </p>
            
            {/* Founder Photo Block */}
            <div className="img-placeholder" style={{ margin: 'var(--space-2xl) 0', borderRadius: 'var(--border-radius-lg)', height: '400px' }}>
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80" 
                alt="Founder Moksh at Work" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Compliance */}
      <section className="corporate-credentials-section" style={{ padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <p className="section-label">Corporate Security</p>
          <h2 className="section-title">Compliance & Backing</h2>
          <div className="about-story__content" style={{ marginBottom: 'var(--space-3xl)' }}>
            <p>
              Rankur operates as an official division of <strong>Moksh Productions</strong>, an MSME-registered enterprise in India. This backing guarantees contract compliance, operational security, and institutional accountability.
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
          
          {/* MSME Badge Block */}
          <div className="img-placeholder" style={{ margin: 'var(--space-2xl) auto 0 auto', borderRadius: 'var(--border-radius-lg)', height: '200px', maxWidth: '400px' }}>
            <img 
              src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80" 
              alt="MSME Registration and Compliance Backing Certificate" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} 
            />
          </div>
        </div>
      </section>

      {/* Verified Experience Ledger */}
      <section className="credentials-ledger-section" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <p className="section-label">Experience Ledger</p>
          <h2 className="section-title">Evidence That Backs Our Work</h2>
          <div className="about-story__content" style={{ marginBottom: 'var(--space-3xl)' }}>
            <p>
              We back our strategic growth assertions with real operational outcomes across manufacturing, wellness, technology, and e-commerce channel partnerships.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', marginTop: 'var(--space-xl)' }}>
            {credentialsLedger.map((ledger, i) => (
              <div key={i} style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', padding: 'var(--space-xl)' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-gold)', marginBottom: 'var(--space-sm)', fontWeight: 'var(--font-weight-bold)' }}>{ledger.title}</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7', margin: 0 }}>{ledger.evidence}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)', marginTop: 'var(--space-3xl)' }}>
            {/* Experience Letter Placeholder */}
            <div className="img-placeholder" style={{ borderRadius: 'var(--border-radius-lg)', height: '220px' }}>
              <img 
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80" 
                alt="Client Experience and Recommendation Letter Reference" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} 
              />
            </div>
            {/* GA4 Certificate Placeholder */}
            <div className="img-placeholder" style={{ borderRadius: 'var(--border-radius-lg)', height: '220px' }}>
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80" 
                alt="Google Analytics GA4 Custom Certification Dashboard" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications (Google etc) */}
      <section className="about-certs" id="about-certifications">
        <div className="container">
          <p className="section-label">Certifications</p>
          <h2 className="section-title">Credentials That Back Results</h2>
          <div className="about-certs__grid">
            {certifications.map((cert, i) => (
              <div key={i} className="about-cert-card">
                <p className="about-cert-card__name">{cert.name}</p>
                <p className="about-cert-card__issuer">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
