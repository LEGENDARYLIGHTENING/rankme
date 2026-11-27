import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import HeroSection from '../components/HeroSection';
import './BlogPost.css';
import './Blog.css';

function extractHeadings(markdown) {
  if (!markdown) return [];
  const headings = [];
  const lines = markdown.split('\n');
  for (const line of lines) {
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const rawText = match[1].replace(/[*_`]/g, '').trim();
      const id = rawText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      headings.push({ text: rawText, id });
    }
  }
  return headings;
}

export default function BlogPost({ postMeta, content, relatedPosts }) {
  const pubDate = postMeta.datePublished || postMeta.date;
  const modDate = postMeta.dateModified;
  const showUpdated = modDate && pubDate && modDate !== pubDate;
  const headings = extractHeadings(content);
  const cleanTitle = (postMeta.title || '').replace(/\s*\|\s*Rankur\s*$/i, '');

  return (
    <article className="blog-post-page">
      <HeroSection
        label={
          <Link
            href={`/blog/category/${postMeta.categorySlug}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {postMeta.tag}
          </Link>
        }
        title={cleanTitle}
        subtitle={
          <span>
            B2B Architectural Breakdown &amp; Strategic Execution Guide
          </span>
        }
      />

      <section className="section" id="blog-content" style={{ paddingTop: '2.5rem' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          {/* Author & Editorial Trust Header */}
          <div className="author-editorial-bar">
            <div className="author-info">
              <img
                src="/founder-b2b-growth-infrastructure.webp"
                alt="Moksh Parjapati, Founder of Rankur"
                className="author-avatar"
                width={48}
                height={48}
              />
              <div>
                <div className="author-name-line">
                  <Link href="/about" className="author-name" style={{ textDecoration: 'none' }}>
                    Moksh Parjapati
                  </Link>
                  <span className="author-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Verified B2B Practitioner
                  </span>
                </div>
                <div className="author-meta-line">
                  <span className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {pubDate}
                  </span>
                  {showUpdated && (
                    <span className="meta-item">
                      (Updated {modDate})
                    </span>
                  )}
                  {postMeta.readTime && (
                    <span className="meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {postMeta.readTime}
                    </span>
                  )}
                  <span className="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                      <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                    {postMeta.tag}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Big, Properly Formatted Featured Image (Probiota Innovations Style) */}
          {postMeta.image && (
            <figure className="blog-post__featured-image">
              <img
                src={postMeta.image.startsWith('http') ? postMeta.image : `https://rankursite.com${postMeta.image}`}
                alt={postMeta.imageAlt || cleanTitle}
                width={1200}
                height={630}
                loading="eager"
                fetchPriority="high"
              />
              {postMeta.imageAlt && (
                <figcaption className="featured-image-caption">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  {postMeta.imageAlt}
                </figcaption>
              )}
            </figure>
          )}

          {/* Executive Key Takeaways / TL;DR Box */}
          <div className="executive-takeaways-card">
            <div className="takeaways-header">
              <div className="takeaways-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <span className="takeaways-title">Executive Brief · Strategic Takeaways</span>
            </div>
            <ul className="takeaways-list">
              <li>
                <span className="takeaway-bullet-icon">✓</span>
                <span><strong>Core Commercial Focus:</strong> Practical strategic analysis on {postMeta.tag} engineered for high-intent B2B search and buyer conversion.</span>
              </li>
              <li>
                <span className="takeaway-bullet-icon">✓</span>
                <span><strong>Architecture Standard:</strong> Eliminating bloated plugins, fragile templates, and delivering rapid load times that prevent executive buyer drop-offs.</span>
              </li>
              <li>
                <span className="takeaway-bullet-icon">✓</span>
                <span><strong>Pipeline Impact:</strong> Structuring technical search signals and entity authority to capture qualified inquiries and generative AI answer citations.</span>
              </li>
            </ul>
          </div>

          {/* Table of Contents (TOC) */}
          {headings.length > 1 && (
            <nav className="blog-toc-card" aria-label="Table of contents">
              <div className="toc-header">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <circle cx="4" cy="6" r="1.5" fill="currentColor"></circle>
                  <circle cx="4" cy="12" r="1.5" fill="currentColor"></circle>
                  <circle cx="4" cy="18" r="1.5" fill="currentColor"></circle>
                </svg>
                <span>In This Guide: Architecture &amp; Key Sections</span>
              </div>
              <ol className="toc-list">
                {headings.map((h, i) => (
                  <li key={i}>
                    <a href={`#${h.id}`}>
                      <span className="toc-number">{i + 1}.</span>
                      <span className="toc-text">{h.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Main Article Prose */}
          <div className="markdown-prose">
            <ReactMarkdown
              components={{
                h2: ({ node, children, ...props }) => {
                  const text = String(children);
                  const id = text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                  return (
                    <h2 id={id} className="blog-heading-h2" {...props}>
                      <a href={`#${id}`} className="heading-anchor" aria-hidden="true">#</a>
                      {children}
                    </h2>
                  );
                },
                blockquote: ({ node, children, ...props }) => (
                  <blockquote className="probiota-blockquote" {...props}>
                    <div className="blockquote-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                    </div>
                    <div>{children}</div>
                  </blockquote>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Direct Execution Brief */}
          <div
            className="blog-editorial-trust"
            style={{
              marginTop: '4rem',
              borderRadius: '1rem',
            }}
          >
            <div>
              <span className="tagline" style={{ marginBottom: '0.25rem' }}>Direct Execution</span>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-white)', margin: '0.25rem 0 0.5rem 0', fontWeight: '700' }}>
                Work Directly With Moksh Parjapati
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6', margin: 0, maxWidth: '600px' }}>
                I engineer custom high-converting web systems and technical SEO architecture personally for B2B founders: stopping buyer bounces with rapid edge speed, zero bloated plugins, and 100% intellectual property ownership.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/free-audit" className="btn btn--primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                Request Free Audit &rarr;
              </Link>
              <Link href="/services" className="btn btn--secondary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}>
                View Services &rarr;
              </Link>
            </div>
          </div>

          {/* Internal Linking / Related Posts (Probiota Cards) */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="related-posts" style={{ marginTop: '4.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '2.5rem' }}>
              <span className="tagline">Curated Knowledge</span>
              <h3 style={{ marginBottom: '2rem', color: 'var(--color-white)', fontSize: '1.5rem', fontWeight: '700' }}>
                Related B2B Guides
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
                {relatedPosts.map((post) => {
                  const cleanRelatedTitle = (post.title || '').replace(/\s*\|\s*Rankur\s*$/i, '');
                  return (
                    <Link
                      href={`/blog/${post.slug}`}
                      key={post.slug}
                      className="blog-card"
                    >
                      <div className="blog-card-image">
                        <img
                          src={post.image || '/og-image.jpg'}
                          alt=""
                          aria-hidden="true"
                          width={1200}
                          height={630}
                          loading="lazy"
                        />
                      </div>
                      <div className="blog-card-content" style={{ padding: '1.5rem' }}>
                        <div className="blog-card-meta-header">
                          <span className="blog-card-category">{post.tag || 'Strategy'}</span>
                          {post.readTime && <span className="blog-card-read-time">{post.readTime}</span>}
                        </div>
                        <h4 className="blog-card-title" style={{ fontSize: '1.1rem' }}>{cleanRelatedTitle}</h4>
                        <div className="blog-card-footer" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                          <span className="blog-card-date">{post.datePublished || post.date}</span>
                          <span className="read-more" style={{ fontSize: '0.82rem' }}>
                            Read Article &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Core Services & Categories Navigation */}
          <div
            className="location-mesh"
            style={{
              marginTop: '4rem',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-card-bg)',
              padding: '2rem',
              borderRadius: '1rem',
            }}
          >
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-gold)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Explore Core Pages
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              <Link href="/services" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Services</Link> ·
              <Link href="/case-studies" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Case Studies</Link> ·
              <Link href="/saas-websites" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>SaaS Websites</Link> ·
              <Link href="/locations" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Markets</Link> ·
              <Link href="/about" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>About Moksh Parjapati</Link> ·
              <Link href={`/blog/category/${postMeta.categorySlug}`} style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>
                More in {postMeta.tag} &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
