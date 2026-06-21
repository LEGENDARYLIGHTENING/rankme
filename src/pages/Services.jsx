import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import CTABlock from '../components/CTABlock';
import './Services.css';

const servicesData = [
  {
    icon: '⟨/⟩',
    title: 'Website Build',
    price: 'Custom Quote: Starting from $2,500',
    description: 'Conversion-focused React JS website with GA4 event tracking, contact or quote form, SEO-optimized pages, and fully mobile responsive design.',
    deliverables: [
      'Custom React JS website (5–8 pages)',
      'GA4 event tracking setup',
      'Contact or quote capture form',
      'Mobile responsive across all devices',
      'SEO-optimized page structure',
      'Deployed to live URL you control',
    ],
    timeline: 'Timeline: 4–6 weeks for strategy, build, QA, and launch.',
  },
  {
    icon: '◎',
    title: 'SEO + GEO System',
    price: 'Custom Quote: From $1,200/mo',
    description: 'Blog content strategy, keyword targeting, and GEO phrase optimization for ChatGPT, Perplexity, and Google SGE visibility.',
    deliverables: [
      'Monthly blog content strategy',
      'Keyword research & targeting',
      'GEO phrase optimization',
      'On-page SEO improvements',
      'Search console monitoring',
      'Monthly ranking reports',
    ],
    timeline: 'Monthly retainer',
  },
  {
    icon: 'in',
    title: 'LinkedIn Content',
    price: 'Custom Quote: From $800/mo',
    description: '4x high-impact LinkedIn posts per month plus daily outbound engagement and weekly performance review.',
    deliverables: [
      'Founder story & authority posts',
      'Thought leadership content',
      'Lead-generation hook posts',
      'Content calendar planning',
      'Engagement strategy',
      'Monthly performance review',
    ],
    timeline: 'Monthly retainer',
  },
  {
    icon: '▶',
    title: 'Meta & Google Ads',
    price: 'Custom Quote: From $1,000/mo',
    description: 'Campaign setup, ad copy, audience targeting, and CTR/CPL optimization across Meta Ads and Google Ads platforms.',
    deliverables: [
      'Campaign setup & structure',
      'Ad copy & creative direction',
      'Audience targeting & segmentation',
      'CTR & CPL optimization',
      'A/B testing strategy',
      'Monthly performance reports',
    ],
    timeline: 'Monthly retainer',
  },
  {
    icon: '☎',
    title: 'Free Growth Audit',
    price: 'Free: 30 minutes',
    description: 'Full teardown of your website UX, SEO gaps, ads performance, LinkedIn presence, and GA4 setup. No pitch, just a clear action plan.',
    deliverables: [
      'Website UX & conversion review',
      'SEO & GEO gap analysis',
      'Ads performance assessment',
      'LinkedIn presence review',
      'GA4 & analytics check',
      'Priority action list',
    ],
    timeline: '30-minute call',
  },
];

const comparisonData = [
  { type: 'Website Build', model: 'One-time', price: 'From $2,500', timeline: '4–6 weeks' },
  { type: 'SEO + GEO System', model: 'Monthly Retainer', price: 'From $1,200/mo', timeline: 'Ongoing' },
  { type: 'LinkedIn Content', model: 'Monthly Retainer', price: 'From $800/mo', timeline: 'Ongoing' },
  { type: 'Meta & Google Ads', model: 'Monthly Retainer', price: 'From $1,000/mo', timeline: 'Ongoing' },
  { type: 'Free Growth Audit', model: 'Free Audit', price: 'Free', timeline: '30 minutes' },
];

const faqs = [
  {
    question: 'What does your process look like from start to finish?',
    answer: 'It starts with a free 30-minute growth audit where I review your current digital presence. From there, I build your website in 7–14 days and optionally move into a monthly retainer covering SEO, GEO, LinkedIn, and ads management.',
  },
  {
    question: 'How do you price your services?',
    answer: 'Website builds start at $900 as a one-time project. SEO, GEO, LinkedIn, and ads services are monthly retainers starting from $400–$600/month depending on the scope. Every engagement begins with a free audit.',
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Website builds are delivered in 7–14 days. SEO and GEO typically show measurable results within 60–90 days. LinkedIn content builds authority over 4–8 weeks. Paid ads can generate leads within the first week of launch.',
  },
  {
    question: 'Do you work with clients remotely?',
    answer: 'Yes, 100%. I work with clients across the US, UK, Australia, Canada, and Gulf countries. All communication happens via Zoom, email, and Slack or WhatsApp.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'I specialize in B2B companies including SaaS, cybersecurity, IT managed services, cosmetic clinics, immigration consultants, luxury real estate, B2B manufacturing, legal firms, and EdTech.',
  },
  {
    question: 'What if I only need a website and not the retainer?',
    answer: 'That is completely fine. The website build is a standalone one-time project. You can always add retainer services later when you are ready to scale your lead generation.',
  },
];

export default function Services() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Helmet>
        <title>B2B Website Build, SEO, GEO & Ads Services | Moksh</title>
        <meta
          name="description"
          content="Conversion-focused React JS websites, SEO and GEO content systems, LinkedIn authority strategies, and targeted Ads for B2B brands in the US, UK, AU, and Gulf."
        />
      </Helmet>

      <HeroSection
        label="Services"
        title={
          <>
            Growth Systems for{' '}
            <span className="text-gold">B2B Brands</span>
          </>
        }
        subtitle="Conversion-focused React JS websites, SEO & GEO content systems, LinkedIn authority content, and Meta & Google Ads: everything a B2B brand needs to generate qualified leads."
        primaryCTA={{ to: '/free-audit', label: 'Book Free Audit' }}
        secondaryCTA={{ to: '/case-studies', label: 'See Results' }}
      />

      {/* Full Services */}
      <section className="section" id="services-full">
        <div className="container">
          <p className="section-label">Full Breakdown</p>
          <h2 className="section-title">What You Get</h2>
          <div className="services-page__grid">
            {servicesData.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-section" id="pricing-comparison">
        <div className="container">
          <p className="section-label">Pricing Overview</p>
          <h2 className="section-title">One-Time vs Retainer vs Audit</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Model</th>
                <th>Price</th>
                <th>Timeline</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i}>
                  <td className="comparison-table__type">{row.type}</td>
                  <td>{row.model}</td>
                  <td>{row.price}</td>
                  <td>{row.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="services-faq">
        <div className="container">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Common Questions</h2>
          <div className="faq-list">
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
