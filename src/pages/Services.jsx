import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import CTABlock from '../components/CTABlock';
import './Services.css';

const servicesData = [
  {
    icon: '◎',
    title: 'Strategic Positioning & Messaging',
    description: 'We translate complex industrial, technical, and clinical processes into clear, high-converting B2B positioning copy. We map out your digital acquisition roadmap so you become the obvious partner for enterprise contracts.',
    deliverables: [
      'B2B competitive audits & positioning matrices',
      'Value proposition design & messaging frameworks',
      'Commercial copy & objection-handling structures',
      'Lead qualification pathways & script briefs',
    ],
    timeline: 'Completed in Week 1 of engagement',
  },
  {
    icon: '⟨/⟩',
    title: 'Custom Growth Infrastructure',
    description: 'We design and code bespoke, high-performance web platforms using React and Next.js, integrating secure PostgreSQL database layers and Cloudflare enterprise network rules to guarantee speeds under 1.2s globally.',
    deliverables: [
      'Custom React JS & Next.js web application architecture',
      'PostgreSQL data schemas & lead capture integrations',
      'GA4 analytics custom event tracking pipeline',
      'Cloudflare enterprise security & deployment rules',
    ],
    timeline: 'Completed in 7–14 days sprint',
  },
  {
    icon: '🔍',
    title: 'SEO + GEO Visibility (Search Dominance)',
    description: 'We optimize your digital footprint for traditional Google search and generative AI engines like ChatGPT, Claude, and Perplexity. We target bottom-of-funnel keyword problems that represent immediate buying intent.',
    deliverables: [
      'Bottom-of-funnel, high-intent keyword mapping',
      'Generative Engine Optimization (GEO) semantic structure',
      'Google Search Console setup, sitemaps & crawl audits',
      'High-authority, long-form content planning (4,000–8,000 words)',
    ],
    timeline: 'Ongoing retainer integration',
  },
  {
    icon: '✍',
    title: 'Organic Demand & Executive Authority',
    description: 'We shorten your sales cycle by building authority and trust before the first discovery call. By planning and scripting specialized executive LinkedIn posts and B2B articles, we drive high-intent organic inbound.',
    deliverables: [
      'LinkedIn executive thought leadership content mapping',
      'B2B research studies & quarterly report generation',
      'Authority internal linking structures & blog publishing',
      'PR & partner network citation development',
    ],
    timeline: 'Ongoing retainer integration',
  },
  {
    icon: '📊',
    title: 'Conversion Rate Systems & CRO',
    description: 'We perform deep user interaction audits and optimize lead-capture layouts. We run structural A/B tests and form field optimizations to maximize qualified pipelines without increasing ad budgets.',
    deliverables: [
      'Friction teardowns on lead entry & checkout paths',
      'Dynamic, qualified lead-form field restructuring',
      'GA4 custom behavioral tracking & logging checks',
      'Speed optimization audits & database latency tuning',
    ],
    timeline: 'Ongoing retainer optimization',
  },
];

const technicalStack = [
  { category: 'Frontend Architecture', tools: 'React, Next.js, Vite, HTML5, Vanilla CSS, TailwindCSS (optional)' },
  { category: 'Backend & Database', tools: 'PostgreSQL, Node.js, Express, REST APIs, Supabase, Vercel Serverless' },
  { category: 'Security & Deployment', tools: 'Vercel, Cloudflare, SSL/TLS, custom security headers, DDoS mitigation' },
  { category: 'Analytics & Optimization', tools: 'GA4 custom tracking, Google Search Console, Hotjar, SEO Gets, SEO/GEO schemas' },
];

const faqs = [
  {
    question: 'How do you price your engagements?',
    answer: 'We do not sell cheap, commodity-level freelancer services or flat-rate packages. Every B2B growth infrastructure project is priced custom based on scope, technical complexity, and your pipeline goals. Typically, engagements begin with a custom diagnostic audit, leading to a development sprint and transition into an ongoing growth retainer.',
  },
  {
    question: 'Why do you build custom React/Next.js platforms instead of basic template sites?',
    answer: 'Premium B2B enterprises and manufacturers require speed, custom database routing, secure lead data management, and strict technical SEO compliance. Template site-builders limit page performance and indexing controls. Our Next.js architectures ensure load times under 1.2s, which directly reduces bounce rates and optimizes lead capture.',
  },
  {
    question: 'What is Generative Engine Optimization (GEO) and why is it included?',
    answer: 'Generative Engine Optimization (GEO) is the process of structuring your website content and technical markup so your brand is recommended when procurement teams and executives ask AI tools (like ChatGPT, Claude, and Perplexity) for vendor recommendations. We optimize your code for LLM search parameters from day one.',
  },
  {
    question: 'Do we sign NDAs before discussing technical specifications?',
    answer: 'Absolutely. We operate as an MSME-registered enterprise (Moksh Productions) and sign mutual NDAs before reviewing proprietary formulas, design patents, supply chain channels, or internal CRM metrics.',
  },
  {
    question: 'How do we collaborate across international timezones?',
    answer: 'We manage B2B collaborations across the US, UK, Australia, Canada, UAE, Saudi Arabia, and Qatar. We align our workflows to ensure timely communication via weekly reports, Zoom strategy sessions, and Slack or WhatsApp updates.',
  },
];

export default function Services() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Helmet>
        <title>B2B Growth Infrastructure & Capabilities | Rankur</title>
        <meta
          name="description"
          content="Explore our five growth pillars: B2B positioning, custom React web infrastructure, SEO/GEO search visibility, organic thought leadership, and conversion optimization systems."
        />
      </Helmet>

      <HeroSection
        label="Capabilities"
        title={
          <>
            Outcomes-First <span className="text-gold">Growth Infrastructure</span>
          </>
        }
        subtitle="We build, write, and optimize the digital platforms required to establish search dominance, position your brand as a market leader, and drive enterprise pipeline."
        primaryCTA={{ to: '/free-audit', label: 'Request custom Audit' }}
        secondaryCTA={{ to: '/case-studies', label: 'See Proof Portfolio' }}
      />

      {/* Pillars breakdown */}
      <section className="section" id="services-full">
        <div className="container">
          <p className="section-label">Our Pillars</p>
          <h2 className="section-title">The B2B Growth Engine</h2>
          <div className="services-page__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {servicesData.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Execution Stack */}
      <section className="tech-stack-section" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <p className="section-label">Execution Stack</p>
          <h2 className="section-title">The Technology Powering Our Strategy</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-3xl)' }}>
            We combine commercial B2B positioning with professional coding, secure deployment, and custom analytics setup.
          </p>
          <div className="tools-grid">
            {technicalStack.map((tech, i) => (
              <div key={i} className="tool-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-xs)', padding: 'var(--space-xl)' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-gold)', fontWeight: 'var(--font-weight-bold)' }}>{tech.category}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{tech.tools}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="services-faq">
        <div className="container">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Common Consulting Questions</h2>
          <div className="faq-list" style={{ marginTop: 'var(--space-2xl)' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <div
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.question}
                  <span className={`faq-item__toggle ${openFaq === i ? 'faq-item__toggle--open' : ''}`}>
                    +
                  </span>
                </div>
                {openFaq === i && (
                  <p className="faq-item__answer">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
