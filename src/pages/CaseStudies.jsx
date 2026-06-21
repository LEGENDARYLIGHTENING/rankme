import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import CaseStudyCard from '../components/CaseStudyCard';
import CTABlock from '../components/CTABlock';
import Testimonials from '../components/Testimonials';
import './CaseStudies.css';

const otherCases = [
  {
    title: 'EdTech Startup Lead Gen',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    metrics: ['20% increase in MQLs', 'GA4 conversion tracking setup'],
    industry: 'EdTech',
  },
  {
    title: 'Local B2B Service Provider',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    metrics: ['#1 ranking for local service keyword', '30+ qualified leads/mo'],
    industry: 'Business Services',
  },
];

const impactItems = [
  { value: '1,000+', label: 'Leads Generated' },
  { value: '50K+', label: 'Instagram Followers' },
  { value: '200+', label: 'Affiliate Customers' },
  { value: '$1,000+', label: 'Affiliate Revenue' },
  { value: '800+', label: 'Cold Leads Generated' },
];

export default function CaseStudies() {
  return (
    <>
      <Helmet>
        <title>B2B Lead Generation & Website Case Studies | Moksh</title>
        <meta
          name="description"
          content="See exactly how I built Probiota Innovations in React JS and generated 10+ B2B leads - and learn how this exact system works to scale your B2B business online."
        />
      </Helmet>

      <HeroSection
        label="Case Studies"
        title={
          <>
            Real Results. <span className="text-gold">Real Growth.</span>
          </>
        }
        subtitle="See how I build B2B websites and growth systems that generate qualified leads - starting with Probiota Innovations."
        primaryCTA={{ to: '/free-audit', label: 'Book Free Audit' }}
      />

      {/* Full Probiota Case Study */}
      <section className="case-full" id="probiota-case-study">
        <div className="container">
          <p className="section-label">Featured Case Study</p>
          <h2 className="section-title">Probiota Innovations</h2>
          <div className="case-full__layout">
            <div className="case-full__image img-placeholder">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Client Work Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            </div>
            <div className="case-full__content">
              <h3>Client Background</h3>
              <p>
                Probiota Innovations is a B2B nutraceutical manufacturer and exporter
                based in India, producing supplements and health products for international buyers.
              </p>

              <h3>The Problem</h3>
              <p>
                Zero digital presence. No website. No overseas buyer inquiries. The business
                was entirely dependent on offline channels and word-of-mouth referrals, missing
                out on global B2B opportunities.
              </p>

              <h3>The Solution</h3>
              <ul>
                <li>Full React JS website built from scratch</li>
                <li>SEO-optimized page structure for international search visibility</li>
                <li>GEO blog content optimized for ChatGPT and Perplexity</li>
                <li>Quote capture funnel for international buyers</li>
                <li>GA4 event tracking on all conversion touchpoints</li>
                <li>Mobile responsive design across all devices</li>
              </ul>

              <h3>Results</h3>
              <ul>
                <li>10+ qualified B2B leads generated</li>
                <li>Full export-focused B2B website built in 1.5 hours</li>
                <li>SEO and GEO content live and indexed</li>
                <li>GA4 tracking capturing all form submissions and events</li>
              </ul>

              <a
                href="https://probiotainnovations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="case-full__link"
              >
                Visit probiotainnovations.com →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="impact-section" id="quantified-impact">
        <div className="container">
          <p className="section-label">Quantified Impact</p>
          <h2 className="section-title">Numbers That Matter</h2>
          <div className="impact-grid">
            {impactItems.map((item, i) => (
              <div key={i} className="impact-item">
                <span className="impact-value">{item.value}</span>
                <span className="impact-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="coming-soon-section" id="upcoming-cases">
        <div className="container">
          <p className="section-label">View All Projects</p>
          <h2 className="section-title">Upcoming Case Studies</h2>
          <div className="case-studies-grid">
            <CaseStudyCard
              comingSoon
              tag="SaaS"
              title="B2B SaaS Platform - Website & Lead Gen"
            />
            <CaseStudyCard
              comingSoon
              tag="Cybersecurity"
              title="Cybersecurity MSP - Website & SEO System"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      <CTABlock />
    </>
  );
}
