import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import HeroSection from '../components/HeroSection';
import blogIndex from '../data/blogs-index.json';
import './BlogPost.css';

// Lazily map all markdown files in the blogs directory as raw text
const markdownFiles = import.meta.glob('../../blogs/*.md', { query: '?raw' });

export default function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Look up metadata from our generated JSON index
  const postMeta = blogIndex.find((b) => b.slug === slug);

  // Find related posts for internal linking
  const relatedPosts = postMeta 
    ? blogIndex.filter((b) => b.tag === postMeta.tag && b.slug !== slug).slice(0, 3)
    : [];

  useEffect(() => {
    if (!postMeta) return;

    const loadContent = async () => {
      const filePath = `../../blogs/${postMeta.filename}`;
      if (markdownFiles[filePath]) {
        try {
          const rawModule = await markdownFiles[filePath]();
          let text = rawModule.default || rawModule;

          // Strip the frontmatter and placeholder headers so they don't render on the page
          const headerMatch = text.match(/^(?:#\s*Blog\s*\d+\s*of\s*\d+\s*)?---\n[\s\S]*?\n---\s*/i);
          if (headerMatch) {
            text = text.substring(headerMatch[0].length);
          } else {
             // Fallback if no '# Blog X of Y' but standard frontmatter
             const standardMatch = text.match(/^---\n[\s\S]*?\n---\s*/);
             if (standardMatch) text = text.substring(standardMatch[0].length);
          }

          setContent(text);
        } catch (error) {
          console.error("Failed to load markdown content", error);
          setContent("Error loading blog content.");
        }
      } else {
        setContent("Content not found.");
      }
      setLoading(false);
    };

    loadContent();
  }, [postMeta]);

  // If URL slug is invalid, redirect to blog index
  if (!postMeta) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{postMeta.title} | Moksh B2B Growth Blog</title>
        <meta name="description" content={postMeta.excerpt} />
        
        {/* Dynamic GEO JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": postMeta.title,
            "description": postMeta.excerpt,
            "image": postMeta.image,
            "datePublished": "2026-06-21T12:00:00+05:30",
            "author": {
              "@type": "Person",
              "name": "Moksh",
              "jobTitle": "B2B Growth Consultant & Performance Marketer",
              "url": "https://rankme-seven.vercel.app/about"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Moksh Growth Consulting",
              "logo": {
                "@type": "ImageObject",
                "url": "https://rankme-seven.vercel.app/Copilot_20260621_183745.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://rankme-seven.vercel.app/blog/${postMeta.slug}`
            }
          })}
        </script>
      </Helmet>

      <HeroSection
        label={postMeta.tag}
        title={postMeta.title}
        subtitle={`${postMeta.date} · ${postMeta.readTime}`}
      />

      <section className="section" id="blog-content">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-4xl) 0', color: 'var(--color-text-muted)' }}>
              Loading article...
            </div>
          ) : (
            <div className="markdown-prose">
              {postMeta.image && (
                <div className="blog-post__featured-image img-placeholder" style={{ marginBottom: '2.5rem', height: '380px', width: '100%', overflow: 'hidden' }}>
                  <img src={postMeta.image} alt={postMeta.imageAlt} title={postMeta.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                </div>
              )}
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}

          {/* Internal Linking / Related Posts */}
          {!loading && relatedPosts.length > 0 && (
            <div className="related-posts" style={{ marginTop: '4rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text)' }}>Related Posts</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {relatedPosts.map((post) => (
                  <Link to={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
