import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import './Blog.css';

import rawBlogPosts from '../data/blogs-index.json';

// Filter out anything not in our approved taxonomy
const approvedTags = ['Website Strategy', 'SEO+GEO', 'Lead Gen', 'Industry Notes'];
const blogPosts = rawBlogPosts.filter(p => approvedTags.includes(p.tag) || p.tag === 'nutraceuticals and wellness brands'); // temporarily keeping old tags if they exist for safety, but we'll enforce taxonomy in UI

const allTags = ['All', ...approvedTags];

const hubDescriptions = {
  'Website Strategy': 'Architecting B2B websites that convert. Covering custom React builds, UX flow, and positioning alignment.',
  'SEO+GEO': 'Dominating both traditional Google search and AI engines (ChatGPT, Perplexity) for high-intent B2B commercial queries.',
  'Lead Gen': 'Tactics and pipelines to capture and qualify enterprise leads, including form optimization and analytics tracking.',
  'Industry Notes': 'Insights and observations across specific B2B verticals including manufacturing, SaaS, and wellness.'
};

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const filtered = activeFilter === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.tag === activeFilter);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filtered.length / postsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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
                  <img src={post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"} alt={post.imageAlt || post.title} title={post.imageAlt || post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
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
