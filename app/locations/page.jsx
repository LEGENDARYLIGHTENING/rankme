import Link from 'next/link';
import cities from '../../cities.json';
import countries from '../../countries.json';

export const metadata = {
  title: 'Global B2B Locations & Target Markets Directory | Rankur',
  description: 'Explore Rankur’s global B2B growth consultancy locations across Tier-1 markets in the USA, UK, Canada, Australia, UAE, Saudi Arabia, Europe, and Asia.',
};

export default function LocationsPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-3xl))', paddingBottom: 'var(--space-5xl)', backgroundColor: 'var(--color-black)', minHeight: '100vh' }}>
      <div className="container">
        <p className="section-label">Global Infrastructure Network</p>
        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: 'var(--space-md)' }}>
          Target Markets & <span className="text-gold">Regional Silos</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '800px', marginBottom: 'var(--space-4xl)', lineHeight: '1.8' }}>
          Rankur operates a high-performance B2B growth infrastructure network across 260+ global commercial hubs, offering localized B2B positioning, technical SEO, Generative Engine Optimization (GEO), and conversion architecture.
        </p>

        {/* Priority Country Silos */}
        <section style={{ marginBottom: 'var(--space-4xl)' }}>
          <h2 style={{ color: 'var(--color-white)', fontSize: '1.6rem', marginBottom: 'var(--space-xl)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)' }}>
            Tier-1 Country Silos
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
            {countries.map((c) => (
              <div key={c.slug} style={{ backgroundColor: 'var(--color-dark-surface)', padding: 'var(--space-xl)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-xs)' }}>
                  <Link href={`/${c.slug}`} style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>
                    {c.country} B2B Growth
                  </Link>
                </h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-md)', lineHeight: '1.5' }}>
                  {c.primaryKeyword}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', fontSize: '0.8rem' }}>
                  <Link href={`/${c.slug}`} style={{ color: 'var(--color-white)', opacity: 0.8 }}>Overview</Link> • 
                  <Link href={`/${c.slug}/services`} style={{ color: 'var(--color-white)', opacity: 0.8 }}>Services</Link> • 
                  <Link href={`/${c.slug}/case-studies`} style={{ color: 'var(--color-white)', opacity: 0.8 }}>Case Studies</Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Cities Directory */}
        <section>
          <h2 style={{ color: 'var(--color-white)', fontSize: '1.6rem', marginBottom: 'var(--space-xl)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--space-sm)' }}>
            City Commercial Hubs ({cities.length} Cities)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
            {cities.map((city) => (
              <div key={city.slug} style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: 'var(--space-md)', borderRadius: 'var(--border-radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Link href={`/${city.slug}`} style={{ color: 'var(--color-white)', fontWeight: 'var(--font-weight-medium)', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                  📍 {city.city} ({city.country})
                </Link>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  <Link href={`/${city.slug}/services`} style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Services</Link> | <Link href={`/${city.slug}/contact`} style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}>Contact</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
