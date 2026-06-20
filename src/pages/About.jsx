import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import './About.css';

const skills = [
  'React JS', 'WordPress', 'SEO', 'GEO', 'GA4',
  'Meta Ads Manager', 'Google Ads', 'LinkedIn Strategy',
  'Copywriting', 'CRO', 'Content Marketing', 'Canva', 'Adobe Suite',
];

const tools = [
  'Meta Ads Manager', 'Google Ads', 'Google Search Console',
  'Keywords Everywhere', 'SEO Gets', 'WordPress', 'GA4',
  'Canva', 'Adobe Photoshop & Illustrator', 'MS Office (Advanced Excel)',
  'Python (Foundational)',
];

const certifications = [
  { name: 'GA4 Certification', issuer: 'Google' },
  { name: 'Digital Marketing Mastery', issuer: 'Digital Deepak Internship Program' },
  { name: 'SEO Fundamentals', issuer: 'Industry Certification' },
  { name: 'GEO Practitioner', issuer: 'Placeholder Issuer' },
  { name: 'LinkedIn Marketing', issuer: 'Placeholder Issuer' },
];

const impactItems = [
  { value: '1,000+', label: 'Leads' },
  { value: '50K+', label: 'Followers' },
  { value: '20M+', label: 'Reach' },
  { value: '$1,000+', label: 'Affiliate Revenue' },
  { value: '200+', label: 'Paying Customers' },
];

const markets = [
  'United States', 'United Kingdom', 'Australia',
  'Canada', 'UAE', 'Saudi Arabia', 'Qatar',
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Moksh | B2B Growth Consultant & React Developer</title>
        <meta
          name="description"
          content="Performance marketer and B2B growth consultant. 1,000+ leads generated. GA4 certified. React JS developer. Serving US, UK, Australia, Canada, and Gulf clients."
        />
      </Helmet>

      <HeroSection
        label="About"
        title={
          <>
            Performance Marketer.{' '}
            <span className="text-gold">B2B Growth Consultant.</span>
          </>
        }
        subtitle="A proven growth system that generates qualified leads for B2B brands across international markets through high-converting websites."
        primaryCTA={{ to: '/free-audit', label: 'Book Free Audit' }}
        secondaryCTA={{ to: '/case-studies', label: 'See My Work' }}
      />

      {/* Story */}
      <section className="about-story" id="my-story">
        <div className="container">
          <p className="section-label">My Story</p>
          <h2 className="section-title">From Intern to Growth Consultant</h2>
          <div className="about-story__content">
            <p>
              I started as a digital marketing intern, learning the ropes of SEO, paid ads,
              and content creation from scratch. But I was not content with just theory — I
              wanted real results.
            </p>
            <p>
              I generated over 1,000 leads across multiple campaigns, scaled Instagram pages to
              50K+ followers with 20M+ cumulative reach, and converted 200+ paying affiliate
              customers generating over $1,000 in commissions. Every number is real, every
              result is documented.
            </p>
            <p>
              Then I built Probiota Innovations — a full B2B manufacturing and export website
              in React JS from scratch. It generated 10+ qualified B2B leads. That was the
              moment I knew this growth system works.
            </p>
            <p>
              This same system is now deployed for B2B brands in the US, UK, Australia, Canada, and
              Gulf countries: a conversion-focused website, SEO & GEO content, LinkedIn
              authority, and paid ads — everything a business needs to turn online presence
              into qualified leads.
            </p>
            <p>
              The foundation of this system comes from the Digital Deepak Internship Program — one of India&#39;s most rigorous
              digital marketing training programs — and hands-on experience as a Sales and Digital
              Marketing professional at Competence Consulting.
            </p>
            <a
              href="https://moksh-portfolio-smoky.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-link"
            >
              View Full Portfolio →
            </a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="skills-section" id="skills">
        <div className="container">
          <p className="section-label">Skills</p>
          <h2 className="section-title">The Technical Stack Behind Your Pipeline.</h2>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <div key={i} className="skill-tag">{skill}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="tools-section" id="tools">
        <div className="container">
          <p className="section-label">Tools & Platforms</p>
          <h2 className="section-title">My Tech Stack</h2>
          <div className="tools-grid">
            {tools.map((tool, i) => (
              <div key={i} className="tool-item">{tool}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
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

      {/* Impact Strip */}
      <section className="section" id="about-impact">
        <div className="container">
          <p className="section-label">Quantified Impact</p>
          <h2 className="section-title">Numbers That Speak</h2>
          <div className="proof-strip__grid" style={{ marginTop: 'var(--space-2xl)' }}>
            {impactItems.map((item, i) => (
              <div key={i} className="proof-strip__item">
                <span className="proof-strip__value">{item.value}</span>
                <span className="proof-strip__label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Markets */}
      <section className="markets-section" id="target-markets">
        <div className="container">
          <p className="section-label">Target Markets</p>
          <h2 className="section-title">Where I Serve Clients</h2>
          <div className="markets-grid">
            {markets.map((market, i) => (
              <div key={i} className="market-tag">{market}</div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
