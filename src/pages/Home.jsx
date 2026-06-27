import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import ProcessSteps from '../components/ProcessSteps';
import Testimonials from '../components/Testimonials';
import './Home.css';

const proofItems = [
  { value: 'React / Next.js', label: 'B2B Growth Infrastructure' },
  { value: 'GA4 Custom', label: 'Conversion Funnel Analytics' },
  { value: 'SEO + GEO', label: 'AI & Google Search Visibility' },
  { value: '10 Days', label: 'Fastest Lead Inflow Post-Launch' },
  { value: '50+ Leads', label: 'First-Month Verified B2B Results' },
];

const capabilities = [
  {
    icon: '◎',
    title: 'Strategic Positioning & Messaging',
    description: 'We translate complex technical, industrial, and clinical capabilities into highly persuasive commercial messaging. We position your brand so you cease competing on price and become the obvious partner for enterprise buyers.',
    deliverables: ['Competitor positioning audits', 'Value proposition design', 'B2B copy & sales frameworks'],
    timeline: 'Completed in Week 1',
  },
  {
    icon: '⟨/⟩',
    title: 'Custom Growth Infrastructure',
    description: 'We design and code bespoke, high-performance web applications using React and Next.js, with secure PostgreSQL database integrations and Cloudflare enterprise security to ensure loading speeds under 1.2s globally.',
    deliverables: ['Custom Next.js & React builds', 'PostgreSQL lead capture pipelines', 'GA4 conversion event setup'],
    timeline: 'Delivered in 7–14 days',
  },
  {
    icon: '🔍',
    title: 'SEO + GEO Visibility (Search Dominance)',
    description: 'We optimize your digital footprint for both traditional Google search rankings and AI-driven engines like ChatGPT, Claude, and Perplexity (GEO). We target commercial, high-intent buyer problems, not vanity metrics.',
    deliverables: ['Bottom-of-funnel keyword mapping', 'LLM retrieval optimization', 'Technical SEO architecture'],
    timeline: 'Ongoing validation retentions',
  },
  {
    icon: '✍',
    title: 'Organic Demand & Executive Authority',
    description: 'We construct authority networks through specialized executive thought leadership. By writing and publishing highly technical B2B articles and LinkedIn content, we establish trust before the first discovery call.',
    deliverables: ['LinkedIn content frameworks', 'Quarterly industry research reports', 'B2B content publishing pipelines'],
    timeline: 'Ongoing retainer support',
  },
  {
    icon: '📊',
    title: 'Conversion Rate Systems & CRO',
    description: 'We audit user interactions, form layout structures, and navigation paths to remove lead capture bottlenecks. We optimize existing traffic pathways to maximize pipeline volume without increasing ad spend.',
    deliverables: ['UX friction teardowns', 'Lead form field optimization', 'GA4 behavioral custom mapping'],
    timeline: 'Continuous performance optimization',
  },
];

const niches = [
  { label: 'B2B Manufacturers & Exporters', to: '/case-studies' },
  { label: 'Nutraceutical & Wellness Brands', to: '/case-studies' },
  { label: 'SaaS & Technology Startups', to: '/saas-websites' },
  { label: 'Industrial & Business Services', to: '/case-studies' },
];

const processSteps = [
  {
    title: 'Diagnostic Audit & Qualification',
    description: 'Submit your growth parameters. We manually audit your site speed, semantic schema structure, and search gaps, delivering a tailored video audit of immediate opportunities.',
  },
  {
    title: 'Infrastructure Sprint',
    description: 'We design, write, and engineer your custom React/Next.js infrastructure and setup conversion tracking, completing the core build inside 7–14 days.',
  },
  {
    title: 'Pipeline Retainer',
    description: 'We run ongoing authority programs: technical SEO, GEO semantic updates, LinkedIn content systems, CRO experiments, and quarterly research reports.',
  },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>B2B Growth Infrastructure Studio | Moksh Productions</title>
        <meta
          name="description"
          content="We build the positioning, custom React web infrastructure, SEO/GEO search visibility, and conversion systems to make B2B enterprises the obvious choice."
        />
      </Helmet>

      {/* Hero */}
      <HeroSection
        label="B2B Growth Infrastructure Studio"
        title={
          <>
            Helping Ambitious B2B Companies Become the{' '}
            <span className="text-gold">Obvious Choice</span> in Their Market
          </>
        }
        subtitle="Through strategic brand positioning, custom web engineering (React/Next.js), search dominance (SEO + GEO), and custom conversion systems, we build platforms that turn international search traffic into qualified pipeline."
        primaryCTA={{ to: '/free-audit', label: 'Request a Custom B2B Audit' }}
        secondaryCTA={{ to: '/philosophy', label: 'Our Philosophy' }}
      />

      {/* Proof Strip */}
      <section className="proof-strip" id="proof-strip">
        <div className="container">
          <div className="proof-strip__grid">
            {proofItems.map((item, i) => (
              <div key={i} className="proof-strip__item">
                <span className="proof-strip__value">{item.value}</span>
                <span className="proof-strip__label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Founder (Home Intro) */}
      <section className="home-founder" style={{ padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-3xl)', alignItems: 'center' }}>
            <div className="img-placeholder" style={{ borderRadius: 'var(--border-radius-lg)', height: '400px' }}>
              <img 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80" 
                alt="Moksh - Lead B2B Growth Consultant" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} 
              />
            </div>
            <div className="founder-intro-content">
              <p className="section-label">Founder-Led Consultancy</p>
              <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-lg) 0' }}>Every Engagement Personally Led by Moksh</h2>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: 'var(--space-md)' }}>
                Unlike agencies that win contracts and delegate them to junior account managers, Rankur operates on a founder-led consulting model. Every strategy, messaging framework, search pipeline, and database schema is personally shaped and executed by me.
              </p>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: 'var(--space-lg)' }}>
                This means you work directly with the founder on your brand alignment, technical architecture, and market positioning—ensuring your growth infrastructure is both technically bulletproof and commercially persuasive.
              </p>
              <Link to="/about" className="btn btn--secondary">
                Read My Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview" id="services-overview">
        <div className="container">
          <p className="section-label">Capabilities</p>
          <h2 className="section-title">Growth Infrastructure Pillars</h2>
          <p className="section-subtitle">
            Every pillar is engineered to address commercial bottlenecks, build digital authority, and generate predictable pipelines for complex B2B buying journeys.
          </p>
          <div className="services-overview__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {capabilities.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section className="case-teaser" id="case-teaser" style={{ backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <p className="section-label">Featured Case Study</p>
          <h2 className="section-title">Probiota Innovations</h2>
          <div className="case-teaser__content">
            <div className="img-placeholder">
              <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80" alt="Probiota Innovations B2B Website" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            </div>
            <div className="case-teaser__info">
              <h3>B2B Nutraceutical Platform & Lead Acquisition</h3>
              <p>
                Engineered a custom B2B web platform optimized for speed, regulatory compliance, and overseas wholesale inquiries. Deployed clean data-capture pipelines and international search optimization (SEO + GEO).
              </p>
              <div className="case-teaser__stats">
                <div>
                  <span className="case-teaser__stat-value">10 Days</span>
                  <span className="case-teaser__stat-label">to First Inquiries</span>
                </div>
                <div>
                  <span className="case-teaser__stat-value">React / Postgres</span>
                  <span className="case-teaser__stat-label">Infrastructure Stack</span>
                </div>
                <div>
                  <span className="case-teaser__stat-value">GA4 Custom</span>
                  <span className="case-teaser__stat-label">Funnel Tracking</span>
                </div>
              </div>
              <Link to="/case-studies" className="btn btn--secondary">
                View Proof Details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Niche Strip */}
      <section className="niche-strip" id="niche-strip">
        <div className="container">
          <p className="section-label">Who We Support</p>
          <h2 className="section-title">Industrial & High-Trust Verticals</h2>
          <div className="niche-strip__grid">
            {niches.map((niche, i) => (
              <Link key={i} to={niche.to} className="niche-strip__item">
                {niche.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="home-process" id="home-process" style={{ backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <p className="section-label">How We Partner</p>
          <h2 className="section-title">The Three-Step Integration Process</h2>
          <div className="home-process__steps">
            <ProcessSteps steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Lead Qualification CTA / Lead Magnet */}
      <section className="home-cta-block" style={{ padding: 'var(--space-5xl) 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <p className="section-label">Custom Assessment</p>
          <h2 className="section-title">Is Your B2B Brand structured to rank when buyers ask AI?</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: 'var(--space-2xl)' }}>
            We manually review your technical SEO schema, load performance, brand positioning, and visibility in AI search outputs on ChatGPT and Perplexity. Apply for your custom B2B audit below.
          </p>
          <Link to="/free-audit" className="btn btn--primary" style={{ padding: 'var(--space-md) var(--space-3xl)' }}>
            Request Growth Infrastructure Audit
          </Link>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: 'var(--space-md)' }}>
            Note: All submissions are manually evaluated. We only schedule calls with qualified mid-market businesses.
          </p>
        </div>
      </section>
    </>
  );
}
