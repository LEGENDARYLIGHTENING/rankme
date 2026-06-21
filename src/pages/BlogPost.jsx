import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
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
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
