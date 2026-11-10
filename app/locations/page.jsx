import Link from 'next/link';
import countries from '../../countries.json';
import { INDEXABLE_COUNTRIES } from '../../src/data/countryData.jsx';
import { constructMetadata } from '../../src/utils/seo';
import Breadcrumbs from '../../src/components/Breadcrumbs';

export const metadata = constructMetadata({
  title: 'B2B Target Markets & National Hubs | Rankur',
  description:
    'Explore Rankur B2B Next.js web engineering and technical SEO coverage across the USA, UK, Canada, Australia, UAE, and Saudi Arabia.',
  canonical: '/locations',
  imageAlt: 'Rankur B2B Target Markets',
});

// Active indexed national hubs. Secondary markets (NZ, IE, QA, SG, DE) remain noindex until NEEDS-MOKSH (L3) copy is provided.
const ACTIVE_MARKETS = countries.filter((c) => INDEXABLE_COUNTRIES.has(c.slug));

export default function LocationsPage() {
  return (
    <div
      style={{
        paddingTop: 'var(--nav-height)',
        paddingBottom: 'var(--space-5xl)',
        backgroundColor: 'var(--color-black)',
        minHeight: '100vh',
      }}
    >
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Markets' },
        ]}
      />

      <div className="container" style={{ paddingTop: 'var(--space-3xl)' }}>
        <p className="section-label">Target Markets</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 'var(--space-md)', color: 'var(--color-white)' }}>
          National B2B <span className="text-gold">Markets</span>
        </h1>
        <p
          style={{
            color: 'var(--color-text-muted)',
            fontSize: '1.05rem',
            lineHeight: '1.7',
            maxWidth: '760px',
            marginBottom: 'var(--space-3xl)',
          }}
        >
          I work remotely from India with B2B SaaS, industrial manufacturing, and export teams across six core English-speaking and Gulf commercial markets. Explore how I structure Next.js web platforms and technical SEO for each region below.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-4xl)',
          }}
        >
          {ACTIVE_MARKETS.map((c) => (
            <div
              key={c.slug}
              style={{
                backgroundColor: 'var(--color-dark-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-md)',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
                  {c.country}
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {c.localEcosystemIntro}
                </p>
              </div>
              <Link
                href={`/${c.slug}`}
                style={{ color: 'var(--color-gold)', fontWeight: 600, textDecoration: 'none' }}
              >
                Explore {c.country} &rarr;
              </Link>
            </div>
          ))}
        </div>

        <section
          style={{
            backgroundColor: 'var(--color-dark-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: 'var(--space-2xl)',
          }}
        >
          <h2 style={{ color: 'var(--color-gold)', fontSize: '1.35rem', marginBottom: 'var(--space-sm)' }}>
            Remote Delivery &amp; Full Code Ownership
          </h2>
          <p
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.98rem',
              lineHeight: '1.7',
              maxWidth: '820px',
              marginBottom: 'var(--space-lg)',
            }}
          >
            All engagements run directly with me on scoped timelines with milestone-based sign-off and written terms in the proposal. You retain 100% ownership of the GitHub repository, Next.js codebase, analytics accounts, and content with zero agency lock-in.
          </p>
          <Link href="/free-audit" className="btn btn-primary" style={{ display: 'inline-block' }}>
            Request a Free Audit
          </Link>
        </section>
      </div>
    </div>
  );
}
