import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import HeroSection from '../components/HeroSection';
import './BlogPost.css';

export default function BlogPost({ postMeta, content, relatedPosts }) {
  // Article / BlogPosting Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postMeta.title,
    description: postMeta.excerpt,
    image: postMeta.image,
    datePublished: postMeta.date || '2026-01-01',
    dateModified: postMeta.date || '2026-01-01',
    url: `https://rankursite.com/blog/${postMeta.slug}`,
    author: {
      '@type': 'Person',
      name: 'Moksh Parjapati',
      jobTitle: 'Founder & B2B Growth Strategist',
      url: 'https://rankursite.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rankur',
      url: 'https://rankursite.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rankursite.com/rankur-logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <HeroSection
        label={postMeta.tag}
        title={postMeta.title}
        subtitle={`By Moksh Parjapati · ${postMeta.date ? `${postMeta.date} · ` : ''}${postMeta.readTime}`}
      />

      <section className="section" id="blog-content">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="markdown-prose">
            {postMeta.image && (
              <div className="blog-post__featured-image img-placeholder" style={{ marginBottom: '2.5rem', height: '380px', width: '100%', overflow: 'hidden' }}>
                <img src={postMeta.image} alt={postMeta.imageAlt} title={postMeta.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
              </div>
            )}
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {/* Performance & Quality SLA Commitment Box */}
          <div
            className="money-back-guarantee-box"
            style={{
              marginTop: '3.5rem',
              padding: '2.5rem',
              backgroundColor: 'var(--color-surface, #161920)',
              border: '2px solid var(--color-gold, #d4af37)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.12)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>🛡️</span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-gold)', margin: 0, fontWeight: '700' }}>
                100% Engineering & Performance Guarantee
              </h3>
            </div>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--color-white)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Every custom Next.js web application and B2B growth system engineered by Rankur is built to strict technical standards: guaranteed sub-second LCP, 90+ Core Web Vitals, and turnkey milestone completion. If our deliverable fails to satisfy agreed technical milestones, you receive a full refund.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Link
                href="/free-audit"
                className="btn btn--primary"
                style={{
                  padding: '0.85rem 1.75rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-black)'
                }}
              >
                Claim Free Technical Audit & Quote &rarr;
              </Link>
              <Link
                href="/services"
                className="btn btn--secondary"
                style={{
                  padding: '0.85rem 1.75rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  border: '1px solid var(--color-gold)',
                  color: 'var(--color-gold)'
                }}
              >
                Explore B2B Growth Services &rarr;
              </Link>
            </div>
          </div>

          {/* Internal Linking / Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="related-posts" style={{ marginTop: '4rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text)' }}>Related Founder Guides</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {relatedPosts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="img-placeholder" style={{ height: '120px', borderRadius: '4px' }}>
                      <img src={post.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"} alt={post.imageAlt || post.title} title={post.imageAlt || post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                    </div>
                    <h4 style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text)' }}>{post.title}</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{post.readTime}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Strategic Interlinking Hub */}
          <div className="location-mesh" style={{ marginTop: '3.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem', backgroundColor: 'var(--color-surface, #161920)', padding: '2rem', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-gold)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              B2B Growth & Technical Infrastructure
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Explore how Rankur builds and scales high-performance Next.js web applications, Generative AI search visibility, and conversion pipelines:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              <Link href="/services" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Custom Web Engineering</Link> •
              <Link href="/case-studies" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Verified Case Studies</Link> •
              <Link href="/saas-websites" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>SaaS Conversion Architecture</Link> •
              <Link href="/locations" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Tier-1 Commercial Hubs</Link> •
              <Link href="/process" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>7-14 Day Build Process</Link> •
              <Link href="/about" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>About Moksh Parjapati</Link>
            </div>
            
            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px dashed var(--color-border)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/services" style={{ color: 'var(--color-gold)', fontWeight: '600', textDecoration: 'none' }}>Our B2B Growth Services &rarr;</Link>
              <Link href="/free-audit" style={{ color: 'var(--color-gold)', fontWeight: '600', textDecoration: 'none' }}>Book Free Technical Audit &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
