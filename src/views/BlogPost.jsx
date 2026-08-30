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
    datePublished: '2026-08-25',
    dateModified: '2026-08-25',
    url: `https://rankursite.com/blog/${postMeta.slug}`,
    author: {
      '@type': 'Person',
      name: 'Moksh Parjapati',
      jobTitle: 'Founder & B2B Growth Strategist',
      url: 'https://linkedin.com/in/moksh-parjapati',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rankur',
      url: 'https://rankursite.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rankursite.com/Copilot_20260621_183745.png',
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
        subtitle={`By Moksh Parjapati · ${postMeta.readTime}`}
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

          {/* 100% Money-Back Guarantee & Money Page Conversion Funnel Box */}
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
                100% Risk-Free Money-Back Guarantee
              </h3>
            </div>
            
            <p style={{ fontSize: '1.05rem', color: 'var(--color-white)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              Every custom Next.js website build and B2B growth engine created by Rankur is backed by our <strong>100% Money-Back Guarantee</strong>. If your new platform does not go live in ~7 days or fails to meet your performance and conversion benchmarks, you don't pay a single dollar. Zero risk, zero hourly surprises.
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

          {/* Regional Hubs & Core Service Interlinking Mesh */}
          <div className="location-mesh" style={{ marginTop: '3.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem', backgroundColor: 'var(--color-surface, #161920)', padding: '2rem', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--color-gold)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Regional Growth Infrastructure
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
              Rankur architects custom Next.js websites, SEO, and lead engines for B2B founders across major global technology hubs:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              <Link href="/austin-us" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Austin B2B Web Design</Link> •
              <Link href="/new-york-us" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>New York B2B SEO</Link> •
              <Link href="/san-francisco-us" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>San Francisco Web Design</Link> •
              <Link href="/london-uk" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>London Growth Studio</Link> •
              <Link href="/toronto-canada" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Toronto B2B Web Design</Link> •
              <Link href="/sydney-australia" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Sydney B2B SEO</Link> •
              <Link href="/chicago-us" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Chicago Growth Agency</Link> •
              <Link href="/dubai-uae" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Dubai Enterprise Web</Link> •
              <Link href="/locations" style={{ color: 'var(--color-gold)', fontWeight: 'bold', textDecoration: 'none' }}>View All 85+ City Hubs &rarr;</Link>
            </div>
            
            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px border-dashed var(--color-border)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/services" style={{ color: 'var(--color-gold)', fontWeight: '600', textDecoration: 'none' }}>Our B2B Growth Services &rarr;</Link>
              <Link href="/free-audit" style={{ color: 'var(--color-gold)', fontWeight: '600', textDecoration: 'none' }}>Book Free Technical Audit &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
