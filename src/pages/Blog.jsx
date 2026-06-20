import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import './Blog.css';

const blogPosts = [
  {
    title: 'Why Your SaaS Website Is Losing Leads — and How to Fix It',
    tag: 'SaaS Growth',
    date: 'Coming Soon',
    readTime: '6 min read',
    excerpt: 'Most SaaS websites are built for features, not conversions. Here is how to restructure your site to turn visitors into demo requests.',
  },
  {
    title: 'SEO vs GEO: What B2B Cosmetic Clinics Need to Know in 2025',
    tag: 'Cosmetic Clinics',
    date: 'Coming Soon',
    readTime: '5 min read',
    excerpt: 'Google is no longer the only search engine. ChatGPT and Perplexity are sending traffic too. Here is how to optimize for both.',
  },
  {
    title: 'How Immigration Consultants Can Generate Leads Through Content',
    tag: 'Immigration',
    date: 'Coming Soon',
    readTime: '7 min read',
    excerpt: 'Visa seekers are Googling their questions. If your website does not answer them, you are leaving leads on the table.',
  },
  {
    title: 'The Cybersecurity MSP Website Playbook: From Brochure to Lead Gen Machine',
    tag: 'Cybersecurity and IT',
    date: 'Coming Soon',
    readTime: '8 min read',
    excerpt: 'Why most IT and cybersecurity websites fail at generating leads, and the exact pages and structure that fix it.',
  },
  {
    title: 'Luxury Real Estate Websites That Actually Sell: A Developer\'s Perspective',
    tag: 'Luxury Real Estate',
    date: 'Coming Soon',
    readTime: '6 min read',
    excerpt: 'Premium properties need premium digital presence. Here is how to build a website that matches the quality of your listings.',
  },
  {
    title: 'How Probiota Innovations Generated 10+ B2B Leads with a React JS Website',
    tag: 'B2B Manufacturing',
    date: 'Coming Soon',
    readTime: '5 min read',
    excerpt: 'A behind-the-scenes look at how I built a B2B export website that generated qualified international leads.',
  },
];

const allTags = ['All', 'SaaS Growth', 'Luxury Real Estate', 'Cybersecurity and IT', 'Cosmetic Clinics', 'Immigration', 'B2B Manufacturing', 'More Niches'];

const hubDescriptions = {
  'SaaS Growth': 'Everything you need to grow a SaaS business through SEO, GEO, LinkedIn, and conversion-focused website strategy. These posts are written for SaaS founders and growth teams in the US, UK, Australia, Canada, and Gulf.',
  'Luxury Real Estate': 'Digital presence strategies for premium property developers and high-end brokers. Insights on targeting high-net-worth individuals, off-plan SEO, and high-ticket lead generation.',
  'Cybersecurity and IT': 'B2B marketing playbooks for MSPs and cybersecurity firms. Learn how to turn complex technical services into business value that enterprise decision-makers actually search for.',
  'Cosmetic Clinics': 'Growth systems for high-ticket medical aesthetics clinics. Proven tactics to dominate local SEO, capture AI search traffic, and convert website visitors into booked consultations.',
  'Immigration': 'Digital trust and lead generation for immigration consultants. Strategies to rank globally for visa queries, pre-qualify applicants, and build a premium international brand.',
  'B2B Manufacturing': 'Modernizing digital presence for B2B manufacturers and exporters. Learn how to build conversion-focused websites that capture international leads and quote requests.',
  'More Niches': 'Actionable growth strategies, case studies, and insights applicable across various B2B niches and professional services.'
};

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.tag === activeFilter || (activeFilter === 'More Niches' && !allTags.includes(p.tag)));

  return (
    <>
      <Helmet>
        <title>B2B Growth Blog | SEO, GEO & Lead Generation | Moksh</title>
        <meta
          name="description"
          content="Insights on B2B lead generation, SEO, GEO, React JS websites, LinkedIn content, and Meta Ads for businesses in the US, UK, Australia, Canada, and Gulf markets."
        />
      </Helmet>

      <HeroSection
        label="Blog"
        title={
          <>
            Insights on <span className="text-gold">B2B Growth</span>
          </>
        }
        subtitle="SEO, GEO, LinkedIn, React JS websites, and paid ads — tactical insights for B2B brands looking to generate qualified leads."
        primaryCTA={{ to: '/free-audit', label: 'Book Free Audit' }}
      />

      <section className="section" id="blog-index">
        <div className="container">
          {/* Filter Bar */}
          <div className="blog-filters" id="blog-filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`blog-filter ${activeFilter === tag ? 'blog-filter--active' : ''}`}
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Active Hub Description */}
          {activeFilter !== 'All' && hubDescriptions[activeFilter] && (
            <div className="blog-hub-description" style={{ marginBottom: 'var(--space-2xl)', textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--space-2xl)' }}>
              <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: 'var(--space-md)' }}>{activeFilter}</h2>
              <p style={{ color: 'var(--color-text-muted)' }}>{hubDescriptions[activeFilter]}</p>
            </div>
          )}

          {/* Blog Grid */}
          <div className="blog-grid">
            {filtered.map((post, i) => (
              <div key={i} className="blog-card">
                <div className="blog-card__image img-placeholder" style={{ minHeight: '200px' }}>
                  [ Client Work Preview — Coming Soon ]
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__tag">{post.tag}</span>
                    <span className="blog-card__date">{post.date}</span>
                    <span className="blog-card__read-time">{post.readTime}</span>
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar CTA */}
          <div className="blog-cta-sidebar" id="blog-cta">
            <h3>Want These Results for Your Business?</h3>
            <p>
              Book a free 30-minute growth audit and get a custom action plan
              for your B2B website, SEO, and lead generation.
            </p>
            <Link to="/free-audit" className="btn btn--primary">
              Book Free Audit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
