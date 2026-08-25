import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://rankursite.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" style={{ padding: 'var(--space-md) 0', backgroundColor: 'var(--color-dark-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap', alignItems: 'center' }}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                {index > 0 && <span style={{ opacity: 0.5 }}>/</span>}
                {isLast || !item.href ? (
                  <span style={{ color: 'var(--color-gold)', fontWeight: 'var(--font-weight-medium)' }}>{item.label}</span>
                ) : (
                  <Link href={item.href} style={{ color: 'var(--color-white)', opacity: 0.8, textDecoration: 'none' }}>
                    {item.label}
                  </Link>
                )}
              </span>
            );
          })}
        </div>
      </nav>
    </>
  );
}
