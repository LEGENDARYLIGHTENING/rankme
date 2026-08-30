"use client";
import { useState, useEffect } from 'react';

import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import './Blog.css';

import rawBlogPosts from '../data/blogs-index.json';

const approvedTags = [...new Set(rawBlogPosts.map(p => p.tag))];
const blogPosts = rawBlogPosts;

const allTags = ['All', ...approvedTags.filter(Boolean)];

const hubDescriptions = {
  'Website Strategy': 'Architecting B2B websites that convert. Covering custom React builds, UX flow, and positioning alignment.',
  'SEO+GEO': 'Dominating both traditional Google search and AI engines (ChatGPT, Perplexity) for high-intent B2B commercial queries.',
  'Lead Gen': 'Tactics and pipelines to capture and qualify enterprise leads, including form optimization and analytics tracking.',
  'Industry Notes': 'Insights and observations across specific B2B verticals including manufacturing, SaaS, and wellness.'
};

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const filtered = blogPosts.filter((p) => {
    const matchesFilter = activeFilter === 'All' || p.tag === activeFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.primaryKeyword && p.primaryKeyword.toLowerCase().includes(q)) ||
      (p.excerpt && p.excerpt.toLowerCase().includes(q))
    );
    return matchesFilter && matchesSearch;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.max(1, Math.ceil(filtered.length / postsPerPage));

  // Scroll to top of grid when page changes
  useEffect(() => {
    const elem = document.getElementById('blog-index');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  }, [currentPage, activeFilter, searchQuery]);

  // Generate numbered page buttons (e.g. 1 2 3 ... totalPages)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <HeroSection
        label="B2B Founder Knowledge Base"
        title={
          <>
            Insights on <span className="text-gold">B2B Pipeline Growth</span>
          </>
        }
        subtitle="Explore 900+ tactical guides on custom Next.js web design, conversion rate optimization, Core Web Vitals, and Generative AI Search."
        primaryCTA={{ to: '/free-audit', label: 'Book Free Audit' }}
      />

      <section className="section" id="blog-index">
        <div className="container">
          {/* 100% Money-Back Guarantee Trust Banner */}
          <div
            style={{
              backgroundColor: 'var(--color-surface, #161920)',
              border: '1px solid var(--color-gold)',
              borderRadius: '8px',
              padding: '1.25rem 1.75rem',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🛡️</span>
              <div>
                <strong style={{ color: 'var(--color-gold)', fontSize: '1rem', display: 'block' }}>
                  100% Risk-Free Money-Back Guarantee
                </strong>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  Every Next.js build goes live in ~7 days or you don't pay a single dollar.
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link href="/free-audit" className="btn btn--primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                Book Free Audit &rarr;
              </Link>
              <Link href="/services" className="btn btn--secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                View Money Services &rarr;
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto 2.5rem', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Search 900+ B2B growth guides (e.g. Next.js, CAC, Pricing, Speed)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                backgroundColor: 'var(--color-surface, #161920)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-white)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Filter Bar */}
          <div className="blog-filters" id="blog-filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`blog-filter ${activeFilter === tag ? 'blog-filter--active' : ''}`}
                onClick={() => {
                  setActiveFilter(tag);
                  setCurrentPage(1);
                }}
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

          {/* Result Count Status */}
          <div style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Showing {filtered.length > 0 ? indexOfFirstPost + 1 : 0}–{Math.min(indexOfLastPost, filtered.length)} of {filtered.length} B2B growth guides
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            {currentPosts.map((post, i) => (
              <Link href={`/blog/${post.slug}`} key={i} className="blog-card" style={{ textDecoration: 'none', color: 'inherit' }}>
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

          {/* Enhanced Pagination Controls with Numbered Buttons */}
          {totalPages > 1 && (
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="btn btn--secondary"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', opacity: currentPage === 1 ? 0.4 : 1 }}
              >
                First
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn btn--secondary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', opacity: currentPage === 1 ? 0.4 : 1 }}
              >
                &larr; Prev
              </button>

              {getPageNumbers().map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: currentPage === num ? 'var(--color-gold)' : 'var(--color-surface, #161920)',
                    color: currentPage === num ? 'var(--color-black)' : 'var(--color-white)',
                    fontWeight: currentPage === num ? 'bold' : 'normal',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {num}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn btn--secondary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', opacity: currentPage === totalPages ? 0.4 : 1 }}
              >
                Next &rarr;
              </button>
              <button 
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="btn btn--secondary"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', opacity: currentPage === totalPages ? 0.4 : 1 }}
              >
                Last
              </button>
            </div>
          )}

          {/* Regional Hub Interlinking Footer */}
          <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'var(--color-surface, #161920)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>
              Explore Regional B2B Growth Hubs
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              Looking for local web design and growth expertise in your city? Explore our localized market hubs across North America, Europe, Asia, and Australia:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.25rem', fontSize: '0.9rem' }}>
              <Link href="/austin-us" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>Austin B2B Web Design</Link> •
              <Link href="/new-york-us" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>New York B2B SEO</Link> •
              <Link href="/san-francisco-us" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>San Francisco Growth</Link> •
              <Link href="/london-uk" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>London Web Studio</Link> •
              <Link href="/toronto-canada" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>Toronto B2B Web</Link> •
              <Link href="/sydney-australia" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>Sydney Web Design</Link> •
              <Link href="/locations" style={{ color: 'var(--color-gold)', fontWeight: 'bold', textDecoration: 'none' }}>View All 85+ City Hubs &rarr;</Link>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="blog-cta-sidebar" id="blog-cta" style={{ marginTop: '3rem' }}>
            <h3>Want These Growth Results for Your Business?</h3>
            <p>
              Book a free 30-minute growth audit and get a custom action plan
              for your B2B website, technical SEO, and pipeline engine.
            </p>
            <Link href="/free-audit" className="btn btn--primary">
              Book Free Audit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
