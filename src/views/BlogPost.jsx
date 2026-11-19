import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import HeroSection from '../components/HeroSection';
import Guarantee from '../components/Guarantee';
import './BlogPost.css';
import './Blog.css';

export default function BlogPost({ postMeta, content, relatedPosts }) {
  const pubDate = postMeta.datePublished || postMeta.date;
  const modDate = postMeta.dateModified;
  const showUpdated = modDate && pubDate && modDate !== pubDate;

  return (
    <>
      <HeroSection
        label={
          <Link
            href={`/blog/category/${postMeta.categorySlug}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {postMeta.tag}
          </Link>
        }
        title={postMeta.title}
        subtitle={
          <span>
            By{' '}
            <Link
              href="/about"
              style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}
            >
              Moksh Parjapati
            </Link>
            {pubDate ? ` · Published ${pubDate}` : ''}
            {showUpdated ? ` · Updated ${modDate}` : ''}
            {postMeta.readTime ? ` · ${postMeta.readTime}` : ''}
          </span>
        }
      />

      <section className="section" id="blog-content">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="markdown-prose">
            {postMeta.image && (
              <figure
                className="blog-post__featured-image img-placeholder"
                style={{ marginBottom: '2.5rem', width: '100%', overflow: 'hidden', borderRadius: '8px' }}
              >
                <img
                  src={postMeta.image}
                  alt={postMeta.imageAlt || postMeta.title}
                  width={1200}
                  height={630}
                  loading="eager"
                  fetchPriority="high"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', borderRadius: 'inherit' }}
                />
                {postMeta.imageAlt && (
                  <figcaption style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginTop: '0.65rem', textAlign: 'center', lineHeight: '1.4' }}>
                    {postMeta.imageAlt}
                  </figcaption>
                )}
              </figure>
            )}
            <ReactMarkdown>{content}</ReactMarkdown>
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
                I engineer custom high-converting web systems and technical SEO architecture personally for B2B founders: stopping buyer bounces with sub-second speeds, zero bloated plugins, and 100% intellectual property ownership.
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
                  const cleanTitle = (post.title || '').replace(/\s*\|\s*Rankur\s*$/i, '');
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
                      <div className="blog-card-content" style={{ padding: '1.5rem' }}>
                        <div className="blog-card-meta-header">
                          <span className="blog-card-category">{post.tag || 'Strategy'}</span>
                          {post.readTime && <span className="blog-card-read-time">{post.readTime}</span>}
                        </div>
                        <h4 className="blog-card-title" style={{ fontSize: '1.1rem' }}>{cleanTitle}</h4>
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
    </>
  );
}
