import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import ProcessSteps from '../components/ProcessSteps';
import CTABlock from '../components/CTABlock';
import Testimonials from '../components/Testimonials';
import LeadMagnet from '../components/LeadMagnet';
import './Home.css';

const proofItems = [
  { value: '1,000+', label: 'Qualified B2B Leads across Gut & Beyond and Probiota Innovations campaigns' },
  { value: '50K+', label: 'Followers Built for Gut & Beyond' },
  { value: '20M+', label: 'Cumulative Reach for Gut & Beyond campaigns' },
  { value: 'GA4', label: 'Google Certified' },
  { value: 'US · UK · AU', label: 'Gulf Markets' },
];

const services = [
  {
    icon: '⟨/⟩',
    title: 'Website Build',
    price: 'From $900',
    description: 'High-converting React JS websites with GA4 tracking, quote forms, and fully responsive design.',
  },
  {
    icon: '◎',
    title: 'SEO + GEO System',
    price: 'From $600/mo',
    description: 'Blog strategy, keyword targeting, and GEO phrases optimized for ChatGPT, Perplexity, and Google SGE.',
  },
  {
    icon: 'in',
    title: 'LinkedIn Content',
    price: 'From $400/mo',
    description: 'Founder story posts, thought leadership content, and lead-generation hooks for B2B authority.',
  },
  {
    icon: '▶',
    title: 'Meta & Google Ads',
    price: 'From $500/mo',
    description: 'Campaign setup, ad copy, audience targeting, and CTR/CPL optimization across Meta and Google.',
  },
  {
    icon: '☎',
    title: 'Free Growth Audit',
    price: 'Free · 30 min',
    description: 'Full teardown of your website, SEO gaps, ads performance, and LinkedIn presence. No pitch.',
  },
];

const niches = [
  { label: 'SaaS', to: '/saas-websites' },
  { label: 'Cosmetic Clinics', to: '/cosmetic-clinic-websites' },
  { label: 'Immigration Consultants', to: '/immigration-consultant-websites' },
  { label: 'Luxury Real Estate', to: '/luxury-real-estate-websites' },
  { label: 'Cybersecurity & IT', to: '/cybersecurity-it-websites' },
  { label: 'B2B Manufacturers', to: '/case-studies' },
  { label: 'Legal Firms', to: '/services' },
  { label: 'EdTech', to: '/services' },
];

const processSteps = [
  {
    title: 'Free Audit',
    description: 'A 30-minute call where I review your website, SEO, ads, and LinkedIn, and you walk away with a clear priority list.',
  },
  {
    title: 'Build & Launch',
    description: 'React JS website built with SEO-optimized pages, GA4 tracking, contact forms, and mobile responsiveness in 7–14 days.',
  },
  {
    title: 'Growth Retainer',
    description: 'Ongoing SEO, GEO, LinkedIn posts, ads management, CRO experiments, and monthly analytics reviews.',
  },
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>B2B Website Design & Performance Marketing | Moksh</title>
        <meta
          name="description"
          content="I build high-converting B2B websites and run proven SEO, GEO, LinkedIn, and paid ads systems for businesses in the US, UK, Australia, Canada, and Gulf regions."
        />
      </Helmet>

      {/* Hero */}
      <HeroSection
        label="B2B Growth Consultant & Performance Marketer"
        title={
          <>
            Transform Your B2B Website Into a{' '}
            <span className="text-gold">High-Converting Lead Engine</span>
          </>
        }
        subtitle="Stop losing international buyers to outdated design and poor search visibility. A complete growth system engineered for high-ticket B2B brands in the US, UK, Australia, Canada, and Gulf."
        primaryCTA={{ to: '/free-audit', label: 'Book Free Audit Call' }}
        secondaryCTA={{ to: '/case-studies', label: 'See My Work' }}
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

      {/* Services Overview */}
      <section className="services-overview" id="services-overview">
        <div className="container">
          <p className="section-label">What I Do</p>
          <h2 className="section-title">Services Built for B2B Growth</h2>
          <p className="section-subtitle">
            Every service is designed to generate qualified leads and build authority for B2B brands targeting international markets.
          </p>
          <div className="services-overview__grid">
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Teaser */}
      <section className="case-teaser" id="case-teaser">
        <div className="container">
          <p className="section-label">Featured Case Study</p>
          <h2 className="section-title">Probiota Innovations</h2>
          <div className="case-teaser__content">
            <div className="img-placeholder">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Client Work Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            </div>
            <div className="case-teaser__info">
              <h3>Full B2B Website Built in React JS</h3>
              <p>
                Probiota Innovations is the B2B contract manufacturing arm of Atlanta Systems,
                where I work as Brand Manager. I personally designed and built this website from scratch
                in React JS, complete with SEO-optimized pages, GEO blog content, a quote capture funnel, and GA4 tracking.
              </p>
              <div className="case-teaser__stats">
                <div>
                  <span className="case-teaser__stat-value">10+</span>
                  <span className="case-teaser__stat-label">B2B Leads</span>
                </div>
                <div>
                  <span className="case-teaser__stat-value">1.5 hrs</span>
                  <span className="case-teaser__stat-label">Build Time</span>
                </div>
                <div>
                  <span className="case-teaser__stat-value">Live</span>
                  <span className="case-teaser__stat-label">SEO & GEO</span>
                </div>
              </div>
              <Link to="/case-studies" className="btn btn--secondary">
                View Full Case Study →
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
          <p className="section-label">Industries I Serve</p>
          <h2 className="section-title">Niche-Specific B2B Growth</h2>
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
      <section className="home-process" id="home-process">
        <div className="container">
          <p className="section-label">How It Works</p>
          <h2 className="section-title">Three Steps to Growth</h2>
          <div className="home-process__steps">
            <ProcessSteps steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <LeadMagnet />

      {/* CTA */}
      <CTABlock showCalendly={true} />
    </>
  );
}
