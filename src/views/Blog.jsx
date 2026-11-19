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
  'Website Strategy': 'Architecting B2B websites that convert. Custom Next.js builds, UX flow, and positioning alignment.',
  'SEO & AI Search': 'Technical SEO and Generative Engine Optimization (GEO) for traditional search and AI answer engines.',
  'SaaS & Tech Startups': 'Conversion architecture, speed optimization, and demo pipeline engineering for SaaS teams.',
  'B2B Manufacturers & Exporters': 'Digital credibility, technical documentation, and RFQ funnels for manufacturing and export.',
  'Nutraceuticals & Wellness Brands': 'Compliance-first digital positioning for contract manufacturers and supplement brands.',
  'Organic Lead Generation': 'Bottom-of-funnel organic content and demand capture for B2B service businesses.',
  'Conversions & Leads': 'Removing buyer friction, clarifying messaging, and optimizing B2B lead conversion.',
  'Tech & Speed': 'Core Web Vitals, static edge rendering, and eliminating legacy CMS performance overhead.',
  'Cost & ROI': 'Evaluating B2B website architecture investments against long-term pipeline efficiency.',
  'Hiring & Agency': 'Practical vetting criteria for B2B founders selecting engineering and growth partners.',
  'Founder-Led Marketing': 'Authority-driven LinkedIn and editorial distribution systems for B2B founders.',
  'Case Studies': 'Architectural breakdowns from production web builds.',
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
    <>
      <HeroSection
        label={activeCategoryObj ? activeCategoryObj.tag : 'B2B Engineering & Search Blog'}
        title={
          activeCategoryObj ? (
            <>
              Guides on <span className="text-gold">{activeCategoryObj.tag}</span>
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
              'Tactical B2B guides on custom Next.js engineering, technical SEO, and lead conversion.'
            : 'Tactical guides on custom Next.js web engineering, conversion architecture, Core Web Vitals, and AI search optimization.'
        }
        primaryCTA={{ to: '/free-audit', label: 'Request Free Audit' }}
      />

      <section className="section" id="blog-index">
        <div className="container">
          {/* Engagement Terms Banner */}
          <div
            style={{
              backgroundColor: 'var(--color-surface, #161920)',
              border: '1px solid var(--color-gold)',
              borderRadius: '8px',
              padding: '1.25rem 1.75rem',
              marginBottom: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <strong style={{ color: 'var(--color-gold)', fontSize: '1rem', display: 'block' }}>
                Direct Founder-Led Engineering
              </strong>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                <Guarantee />
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/free-audit" className="btn btn--primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                Request Free Audit &rarr;
              </Link>
              <Link href="/services" className="btn btn--secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                View Services &rarr;
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto 2.5rem', display: 'flex', gap: '0.5rem' }}>
            <label htmlFor="blog-search-input" className="sr-only">
              Search B2B guides
            </label>
            <input
              id="blog-search-input"
              type="text"
              placeholder="Search B2B guides (e.g. Next.js, Technical SEO, GEO, SaaS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                backgroundColor: 'var(--color-surface, #161920)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                color: 'var(--color-white)',
                fontSize: '1rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Crawlable Category Hub Links */}
          <nav className="blog-filters" id="blog-filters" aria-label="Blog Categories">
            <Link
              href="/blog"
              className={`blog-filter ${activeFilter === 'All' ? 'blog-filter--active' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              All
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className={`blog-filter ${activeFilter === cat.tag ? 'blog-filter--active' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {cat.tag}
              </Link>
            ))}
          </nav>

          {/* Active Hub Description */}
          {activeFilter !== 'All' && hubDescriptions[activeFilter] && (
            <div className="blog-hub-description" style={{ margin: '0 auto var(--space-2xl)', textAlign: 'center', maxWidth: '800px' }}>
              <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: 'var(--space-md)' }}>
                {activeFilter}
              </h2>
              <p style={{ color: 'var(--color-text-muted)' }}>{hubDescriptions[activeFilter]}</p>
            </div>
          )}

          {/* Result Count Status */}
          <div style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Showing {filtered.length > 0 ? indexOfFirstPost + 1 : 0}:{Math.min(indexOfLastPost, filtered.length)} of {filtered.length} guides
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            {currentPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="blog-card__image img-placeholder" style={{ minHeight: '200px' }}>
                  <img
                    src={post.image || '/blog-images/hub-website-strategy.webp'}
                    alt={post.imageAlt || post.title}
                    width={1200}
                    height={630}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                  />
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__tag">{post.tag}</span>
                    <span className="blog-card__date">{post.datePublished || post.date}</span>
                    <span className="blog-card__read-time">{post.readTime}</span>
                  </div>
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Crawlable SSR Pagination */}
          {!q && !isCategoryArchive && totalPages > 1 && (
            <nav aria-label="Blog pagination" style={{ marginTop: '3.5rem', textAlign: 'center' }}>
              <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <Link
                  href="/blog"
                  aria-disabled={safePage === 1}
                  className="btn btn--secondary"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', pointerEvents: safePage === 1 ? 'none' : 'auto', opacity: safePage === 1 ? 0.4 : 1 }}
                >
                  First
                </Link>
                <Link
                  href={pageHref(safePage - 1)}
                  aria-disabled={safePage === 1}
                  className="btn btn--secondary"
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', pointerEvents: safePage === 1 ? 'none' : 'auto', opacity: safePage === 1 ? 0.4 : 1 }}
                >
                  &larr; Prev
                </Link>

                {getPageNumbers().map((num) => (
                  <Link
                    key={num}
                    href={pageHref(num)}
                    aria-current={safePage === num ? 'page' : undefined}
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '6px',
                      border: safePage === num ? '1px solid var(--color-gold)' : '1px solid var(--color-border)',
                      backgroundColor: safePage === num ? 'var(--color-gold)' : 'var(--color-surface, #161920)',
                      color: safePage === num ? 'var(--color-black)' : 'var(--color-white)',
                      fontWeight: safePage === num ? 'bold' : 'normal',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                    }}
                  >
                    {num}
                  </Link>
                ))}

                <Link
                  href={pageHref(safePage + 1)}
                  aria-disabled={safePage === totalPages}
                  className="btn btn--secondary"
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', pointerEvents: safePage === totalPages ? 'none' : 'auto', opacity: safePage === totalPages ? 0.4 : 1 }}
                >
                  Next &rarr;
                </Link>
                <Link
                  href={pageHref(totalPages)}
                  aria-disabled={safePage === totalPages}
                  className="btn btn--secondary"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', pointerEvents: safePage === totalPages ? 'none' : 'auto', opacity: safePage === totalPages ? 0.4 : 1 }}
                >
                  Last ({totalPages})
                </Link>
              </div>

              <details style={{ marginTop: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
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
            </nav>
          )}

          {/* Core Services & Markets Footer */}
          <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'var(--color-surface, #161920)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>
              Core Services &amp; Markets
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              I build custom Next.js websites and technical SEO architecture for B2B companies across key markets.
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

          {/* Sidebar CTA */}
          <div className="blog-cta-sidebar" id="blog-cta" style={{ marginTop: '3rem' }}>
            <h3>Want These Growth Results for Your Business?</h3>
            <p>
              Request an audit to diagnose your B2B website speed, technical SEO, and lead conversion bottlenecks.
            </p>
            <Link href="/free-audit" className="btn btn--primary">
              Request Free Audit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
