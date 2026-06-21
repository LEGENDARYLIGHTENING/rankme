import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import './Blog.css';

import blogPosts from '../data/blogs-index.json';

// Dynamically generate all tags from the imported JSON
const uniqueTags = [...new Set(blogPosts.map(p => p.tag))].filter(Boolean);
const allTags = ['All', ...uniqueTags];

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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const filtered = activeFilter === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.tag === activeFilter || (activeFilter === 'More Niches' && !allTags.includes(p.tag)));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filtered.length / postsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

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
        subtitle="SEO, GEO, LinkedIn, React JS websites, and paid ads. Tactical insights for B2B brands looking to generate qualified leads."
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
            {currentPosts.map((post, i) => (
              <Link to={`/blog/${post.slug}`} key={i} className="blog-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="blog-card__image img-placeholder" style={{ minHeight: '200px' }}>
                  <img src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80" alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
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
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn--secondary"
                style={{ padding: '0.5rem 1rem', opacity: currentPage === 1 ? 0.5 : 1 }}
              >
                Previous
              </button>
              <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', color: 'var(--color-text-muted)' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn btn--secondary"
                style={{ padding: '0.5rem 1rem', opacity: currentPage === totalPages ? 0.5 : 1 }}
              >
                Next
              </button>
            </div>
          )}

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
