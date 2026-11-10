import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import HeroSection from '../components/HeroSection';
import Guarantee from '../components/Guarantee';
import './BlogPost.css';

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
              <div
                className="blog-post__featured-image img-placeholder"
                style={{ marginBottom: '2.5rem', width: '100%', overflow: 'hidden', borderRadius: '8px' }}
              >
                <img
                  src={postMeta.image}
                  alt={postMeta.title}
                  width={1200}
                  height={630}
                  loading="eager"
                  fetchPriority="high"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', borderRadius: 'inherit' }}
                />
              </div>
            )}
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {/* Delivery Terms Box */}
          <div
            className="money-back-guarantee-box"
            style={{
              marginTop: '3.5rem',
              padding: '2.25rem',
              backgroundColor: 'var(--color-surface, #161920)',
              border: '1px solid var(--color-gold, #c9a84c)',
              borderRadius: '12px',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-gold)', margin: '0 0 0.75rem 0', fontWeight: '700' }}>
              Work With Me on Your B2B Site
            </h3>

            <p style={{ fontSize: '1rem', color: 'var(--color-white)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              I build custom Next.js websites and technical SEO architecture personally for B2B founders.{' '}
              <Guarantee />
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              <Link href="/free-audit" className="btn btn--primary">
                Request Free Audit &rarr;
              </Link>
              <Link href="/services" className="btn btn--secondary">
                View Services &rarr;
              </Link>
            </div>
          </div>

          {/* Internal Linking / Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="related-posts" style={{ marginTop: '4rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text)' }}>Related B2B Guides</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {relatedPosts.map((post) => (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                  >
                    <div className="img-placeholder" style={{ borderRadius: '4px', overflow: 'hidden' }}>
                      <img
                        src={post.image || '/blog-images/hub-website-strategy.webp'}
                        alt={post.title}
                        width={1200}
                        height={630}
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', borderRadius: 'inherit' }}
                      />
                    </div>
                    <h4 style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text)' }}>{post.title}</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                      {post.datePublished || post.date} · {post.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Core Services & Categories Navigation */}
          <div
            className="location-mesh"
            style={{
              marginTop: '3.5rem',
              borderTop: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface, #161920)',
              padding: '2rem',
              borderRadius: '8px',
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
