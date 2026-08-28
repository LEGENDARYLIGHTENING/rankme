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

          {/* Internal Linking / Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="related-posts" style={{ marginTop: '4rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text)' }}>Related Posts</h3>
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
        </div>
      </section>
    </>
  );
}
