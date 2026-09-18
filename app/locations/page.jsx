import Link from 'next/link';
import countries from '../../countries.json';

export const metadata = {
  title: 'Global B2B Target Markets & Regional Infrastructure | Rankur',
  description: 'Explore Rankur’s global B2B growth consultancy hubs across Tier-1 markets in the USA, UK, Canada, Australia, Europe, UAE, and Asia-Pacific.',
  alternates: {
    canonical: 'https://rankursite.com/locations',
  },
};

export default function LocationsPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-3xl))', paddingBottom: 'var(--space-5xl)', backgroundColor: 'var(--color-black)', minHeight: '100vh' }}>
      <div className="container">
        <p className="section-label">Global Delivery Infrastructure</p>
        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: 'var(--space-md)' }}>
          Target Markets & <span className="text-gold">Regional Silos</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '800px', marginBottom: 'var(--space-4xl)', lineHeight: '1.8' }}>
          Rankur engineers custom Next.js B2B web infrastructure, Generative Engine Optimization (GEO), and high-converting acquisition funnels for founders across primary Tier-1 commercial markets.
        </p>

        {/* Priority Country Silos */}
        <section style={{ marginBottom: 'var(--space-4xl)' }}>
          <h2 style={{ color: 'var(--color-white)', fontSize: '1.6rem', marginBottom: 'var(--space-xl)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)' }}>
            Tier-1 Commercial Hubs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-xl)' }}>
            {countries.map((c) => (
              <div key={c.slug} style={{ backgroundColor: 'var(--color-dark-surface)', padding: 'var(--space-xl)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: 'var(--space-xs)' }}>
                    <Link href={`/${c.slug}`} style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>
                      {c.country} B2B Growth
                    </Link>
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 'var(--space-md)', lineHeight: '1.6' }}>
                    {c.localEcosystemIntro}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', fontSize: '0.85rem', paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <Link href={`/${c.slug}`} style={{ color: 'var(--color-gold)', fontWeight: 600, textDecoration: 'none' }}>
                    Market Silo →
                  </Link>
                  <Link href="/free-audit" style={{ color: 'var(--color-white)', opacity: 0.8, textDecoration: 'none' }}>
                    Claim Audit
                  </Link>
                  <Link href="/case-studies" style={{ color: 'var(--color-white)', opacity: 0.8, textDecoration: 'none' }}>
                    Case Studies
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Strategy Callout */}
        <section style={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', padding: 'var(--space-2xl)', borderRadius: 'var(--border-radius-lg)' }}>
          <h3 style={{ color: 'var(--color-gold)', fontSize: '1.3rem', marginBottom: 'var(--space-sm)' }}>
            Global Remote Engineering & Deployment
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '850px', marginBottom: 'var(--space-md)' }}>
            Whether your B2B enterprise is headquartered in Silicon Valley, London, Toronto, or Singapore, Rankur delivers fixed-price 7-to-14 day Next.js build sprints backed by a 100% money-back guarantee. All code is owned 100% by you with zero platform lock-in.
          </p>
          <Link href="/free-audit" className="btn btn-primary" style={{ display: 'inline-block' }}>
            Book a Free 30-Minute Growth Audit
          </Link>
        </section>
      </div>
    </div>
  );
}
