import React from 'react';
import './ClientTrustBar.css';

const platformsBuilt = [
  {
    id: 'wafa-trust',
    name: 'Wafa Educational & Charitable Trust',
    url: 'https://www.wafatrustindia.org/',
    niche: 'Philanthropic Healthcare, Education & Community Trust',
    badge: 'Client Platform · Custom Next.js Architecture',
    external: true,
    renderLogo: () => (
      <img
        src="/wafa-trust-logo.jpeg"
        alt="Wafa Educational And Charitable Trust"
        className="client-trust-card__logo-img"
        style={{ borderRadius: '6px', height: '42px', width: 'auto' }}
      />
    ),
  },
];

export default function ClientTrustBar({
  title = "Featured Client Platform",
  subtitle = "Custom digital infrastructure engineered with Next.js and structured search architecture.",
}) {
  return (
    <section className="client-trust-bar" id="client-trust-bar">
      <div className="container">
        <div className="client-trust-bar__header">
          <span className="client-trust-bar__meta-tag">
            <span className="client-trust-bar__live-dot"></span>
            Client Build · Live Platform
          </span>
          <h2 className="client-trust-bar__title">{title}</h2>
          <p className="client-trust-bar__subtitle">{subtitle}</p>
        </div>

        <div className="client-trust-bar__grid" style={{ gridTemplateColumns: 'minmax(320px, 720px)', justifyContent: 'center' }}>
          {platformsBuilt.map((item) => (
            <a
              key={item.id}
              href={item.url}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="client-trust-card"
              title={`Visit ${item.name}`}
              style={{ maxWidth: '720px', margin: '0 auto', width: '100%' }}
            >
              <div className="client-trust-card__logo-wrapper" style={{ padding: '0.75rem' }}>
                {item.renderLogo()}
              </div>
              <div className="client-trust-card__info">
                <span className="client-trust-card__name" style={{ fontSize: '1.15rem' }}>{item.name}</span>
                <span className="client-trust-card__niche">{item.niche}</span>
                <span className="client-trust-card__badge">{item.badge}</span>
                <span className="client-trust-card__verify-link">
                  Visit live site &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
