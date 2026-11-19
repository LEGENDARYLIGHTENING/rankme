"use client";
import { useState } from 'react';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import Guarantee from '../components/Guarantee';
import { POSTS_PER_PAGE } from '../utils/blogConfig';
import './Blog.css';

import rawBlogPosts from '../data/blogs-index.json';

const blogPosts = rawBlogPosts;

const categoryListMap = new Map();
for (const p of blogPosts) {
  if (p.tag && p.categorySlug && !categoryListMap.has(p.categorySlug)) {
    categoryListMap.set(p.categorySlug, { tag: p.tag, slug: p.categorySlug });
  }
}
const allCategories = [...categoryListMap.values()];

const hubDescriptions = {
  'Website Strategy': 'Architecting B2B web systems that convert. Custom high-performance engineering, buyer UX flow, and positioning alignment.',
  'SEO & AI Search': 'Technical SEO and Generative Engine Optimization (GEO) for traditional search engines and AI answer engines.',
  'SaaS & Tech Startups': 'Conversion architecture, speed optimization, and demo pipeline engineering for high-growth tech platforms.',
  'B2B Manufacturers & Exporters': 'Digital credibility, technical documentation, and RFQ funnels for manufacturing and global export.',
  'Nutraceuticals & Wellness Brands': 'Compliance-first digital positioning for contract manufacturers and supplement brands.',
  'Organic Lead Generation': 'Bottom-of-funnel organic content and demand capture for B2B service businesses.',
  'Conversions & Leads': 'Removing buyer friction, clarifying messaging, and optimizing B2B qualified lead conversion.',
  'Tech & Speed': 'Sub-second Core Web Vitals, static edge rendering, and eliminating legacy CMS performance overhead.',
  'Cost & ROI': 'Evaluating B2B website architecture investments against long-term pipeline efficiency and customer acquisition cost.',
  'Hiring & Agency': 'Practical vetting criteria for B2B founders selecting engineering and growth partners.',
  'Founder-Led Marketing': 'Authority-driven LinkedIn and editorial distribution systems for B2B founders.',
  'Case Studies': 'Architectural breakdowns from production web builds and verified commercial transformations.',
};

export default function Blog({ initialPage = 1, activeCategorySlug = null }) {
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategoryObj = activeCategorySlug
    ? allCategories.find((c) => c.slug === activeCategorySlug) || null
    : null;
  const activeFilter = activeCategoryObj ? activeCategoryObj.tag : 'All';

  const baseList = activeCategoryObj
    ? blogPosts.filter((p) => p.categorySlug === activeCategoryObj.slug)
    : blogPosts;

  const q = searchQuery.toLowerCase().trim();
  const filtered = q
    ? baseList.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.primaryKeyword && p.primaryKeyword.toLowerCase().includes(q)) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q))
      )
    : baseList;

  const isCategoryArchive = Boolean(activeCategoryObj) && !q;
  const totalPages = isCategoryArchive ? 1 : Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, initialPage), totalPages);

  const indexOfFirstPost = q || isCategoryArchive ? 0 : (safePage - 1) * POSTS_PER_PAGE;
  const indexOfLastPost = q || isCategoryArchive ? filtered.length : safePage * POSTS_PER_PAGE;
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, safePage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageHref = (p) => (p <= 1 ? '/blog' : `/blog/page/${p}`);

  return (
    <div className="blog-listing">
      <HeroSection
        label={activeCategoryObj ? activeCategoryObj.tag : 'B2B Engineering & Search Knowledge Base'}
        title={
          activeCategoryObj ? (
            <>
              Tactical Guides on <span className="text-gold">{activeCategoryObj.tag}</span>
            </>
          ) : (
            <>
              Insights on <span className="text-gold">B2B Pipeline Growth</span>
              {safePage > 1 ? ` (Page ${safePage})` : ''}
            </>
          )
        }
        subtitle={
          activeCategoryObj
            ? hubDescriptions[activeCategoryObj.tag] ||
              'Tactical B2B guides on custom high-performance web engineering, technical SEO, and conversion architecture.'
            : 'Tactical guides on custom high-speed web systems, conversion architecture, Core Web Vitals, and generative AI search optimization.'
        }
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
      />

      <section className="section" id="blog-index" style={{ paddingTop: 'var(--space-2xl)' }}>
        <div className="container">
          {/* Probiota-Style Search Bar */}
          <div className="blog-search-container">
            <div className="blog-search-wrapper">
              <div className="blog-search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                id="blog-search-input"
                type="text"
                className="blog-search-input"
                placeholder="Search tactical B2B guides by topic, keyword, or problem..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Probiota-Style Pill Category Filter Tabs */}
          <nav className="category-filters" id="blog-filters" aria-label="Blog Categories">
            <Link
              href="/blog"
              className={`category-btn ${activeFilter === 'All' ? 'active' : ''}`}
            >
              All Categories
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className={`category-btn ${activeFilter === cat.tag ? 'active' : ''}`}
              >
                {cat.tag}
              </Link>
            ))}
          </nav>

          {/* Active Hub Description */}
          {activeFilter !== 'All' && hubDescriptions[activeFilter] && (
            <div className="blog-hub-description">
              <h2>{activeFilter}</h2>
              <p>{hubDescriptions[activeFilter]}</p>
            </div>
          )}

          {/* Result Count Status */}
          <div className="blog-status-count">
            <span>
              Showing {filtered.length > 0 ? indexOfFirstPost + 1 : 0}:{Math.min(indexOfLastPost, filtered.length)} of {filtered.length} tactical guides
            </span>
            {activeFilter !== 'All' && (
              <Link href="/blog" style={{ color: 'var(--color-gold)', textDecoration: 'underline', fontSize: '0.85rem' }}>
                Reset filter
              </Link>
            )}
          </div>

          {/* Blog Grid: 3-Column Layout */}
          <div className="blog-grid">
            {currentPosts.map((post) => {
              const cleanTitle = (post.title || '').replace(/\s*\|\s*Rankur\s*$/i, '');
              const dateStr = post.datePublished || post.date;
              return (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="blog-card"
                >
                  <div className="blog-card-image">
                    <img
                      src={post.image || '/blog-images/prompt-115.webp'}
                      alt={post.imageAlt || cleanTitle}
                      width={1200}
                      height={630}
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta-header">
                      <span className="blog-card-category">{post.tag || 'Strategy'}</span>
                      {post.readTime && <span className="blog-card-read-time">{post.readTime}</span>}
                    </div>
                    <h3 className="blog-card-title">{cleanTitle}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-card-date">{dateStr}</span>
                      <span className="read-more">
                        Read Article
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Crawlable SSR Pagination */}
          {!q && !isCategoryArchive && totalPages > 1 && (
            <nav aria-label="Blog pagination" className="blog-pagination">
              <Link
                href="/blog"
                aria-disabled={safePage === 1}
                className="blog-pagination__btn"
                style={{ pointerEvents: safePage === 1 ? 'none' : 'auto', opacity: safePage === 1 ? 0.35 : 1 }}
              >
                First
              </Link>
              <Link
                href={pageHref(safePage - 1)}
                aria-disabled={safePage === 1}
                className="blog-pagination__btn"
                style={{ pointerEvents: safePage === 1 ? 'none' : 'auto', opacity: safePage === 1 ? 0.35 : 1 }}
              >
                &larr; Prev
              </Link>

              {getPageNumbers().map((num) => (
                <Link
                  key={num}
                  href={pageHref(num)}
                  aria-current={safePage === num ? 'page' : undefined}
                  className={`blog-pagination__btn ${safePage === num ? 'blog-pagination__btn--active' : ''}`}
                >
                  {num}
                </Link>
              ))}

              <Link
                href={pageHref(safePage + 1)}
                aria-disabled={safePage === totalPages}
                className="blog-pagination__btn"
                style={{ pointerEvents: safePage === totalPages ? 'none' : 'auto', opacity: safePage === totalPages ? 0.35 : 1 }}
              >
                Next &rarr;
              </Link>
              <Link
                href={pageHref(totalPages)}
                aria-disabled={safePage === totalPages}
                className="blog-pagination__btn"
                style={{ pointerEvents: safePage === totalPages ? 'none' : 'auto', opacity: safePage === totalPages ? 0.35 : 1 }}
              >
                Last ({totalPages})
              </Link>
            </nav>
          )}

          {!q && !isCategoryArchive && totalPages > 1 && (
            <details style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              <summary style={{ cursor: 'pointer', color: 'var(--color-gold)' }}>
                All Archive Pages (1:{totalPages})
              </summary>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', maxWidth: '800px', marginInline: 'auto' }}>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                  <Link
                    key={p}
                    href={pageHref(p)}
                    style={{
                      padding: '0.25rem 0.55rem',
                      borderRadius: '4px',
                      border: '1px solid var(--color-border)',
                      color: p === safePage ? 'var(--color-gold)' : 'var(--color-text-muted)',
                      textDecoration: 'none',
                    }}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            </details>
          )}

          {/* Probiota-Style Founder & Editorial Trust Banner */}
          <div className="blog-editorial-trust">
            <div>
              <span className="tagline" style={{ marginBottom: '0.25rem' }}>Direct Execution</span>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-white)', margin: '0.25rem 0 0.5rem 0', fontWeight: 700 }}>
                Founder-Led Engineering &amp; Search Dominance
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', margin: 0, maxWidth: '640px', lineHeight: '1.6' }}>
                Every architecture, technical audit, and growth system is directly engineered by Moksh Parjapati with verified milestone deliverables.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/free-audit" className="btn btn--primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                Request Free Audit &rarr;
              </Link>
              <Link href="/case-studies" className="btn btn--secondary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                View Case Studies &rarr;
              </Link>
            </div>
          </div>

          {/* Core Services & Key Markets */}
          <div style={{ marginTop: '3.5rem', padding: '2rem', backgroundColor: 'var(--color-card-bg)', borderRadius: '1rem', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--color-gold)', marginBottom: '0.75rem', fontWeight: 700 }}>
              Core Services &amp; Markets
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              We build custom high-performance web platforms and technical SEO architecture for B2B enterprises across key commercial regions.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.25rem', fontSize: '0.9rem' }}>
              <Link href="/services" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>View Services</Link> ·
              <Link href="/case-studies" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>Case Studies</Link> ·
              <Link href="/usa" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>United States</Link> ·
              <Link href="/uk" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>United Kingdom</Link> ·
              <Link href="/canada" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>Canada</Link> ·
              <Link href="/australia" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>Australia</Link> ·
              <Link href="/uae" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>UAE</Link> ·
              <Link href="/saudi-arabia" style={{ color: 'var(--color-white)', textDecoration: 'none' }}>Saudi Arabia</Link> ·
              <Link href="/locations" style={{ color: 'var(--color-gold)', fontWeight: 'bold', textDecoration: 'none' }}>All Markets &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
