import React from 'react';
import './ClientTrustBar.css';

const clientLogos = [
  {
    id: 'wiziot',
    name: 'WizIOT',
    url: 'https://www.wiziot.com',
    niche: 'Enterprise Fleet Telematics & IoT Hardware',
    badge: '1,040+ Static Pages · Next.js 16',
    renderLogo: () => (
      <img
        src="/wiziot-logo-white.png"
        alt="WizIOT Fleet Telematics"
        className="client-trust-card__logo-img"
      />
    ),
  },
  {
    id: 'atlanta-systems',
    name: 'Atlanta Systems',
    url: 'https://www.atlantasys.com',
    niche: 'AIS-140 Certified GPS & Automotive Telematics',
    badge: '460+ Static Pages · Next.js 16',
    renderLogo: () => (
      <svg
        viewBox="0 0 200 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="client-trust-card__logo-img"
        style={{ height: '34px', width: 'auto' }}
      >
        <path
          d="M16 6L6 28H14L18 18L22 28H30L20 6H16ZM18 12L20.5 20H15.5L18 12Z"
          fill="#C9A84C"
        />
        <circle cx="18" cy="38" r="3.5" fill="#C9A84C" />
        <path
          d="M26 34C28 36 29 38 29 40M7 40C7 38 8 36 10 34"
          stroke="#C9A84C"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text
          x="38"
          y="25"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="16"
          letterSpacing="0.08em"
        >
          ATLANTA
        </text>
        <text
          x="38"
          y="39"
          fill="#C9A84C"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="10"
          letterSpacing="0.22em"
        >
          SYSTEMS
        </text>
      </svg>
    ),
  },
  {
    id: 'medventa',
    name: 'Medventa',
    url: 'https://www.medventa.in',
    niche: 'B2B Medical Supplies & Surgical Sutures',
    badge: '440+ Static Pages · Next.js 14',
    renderLogo: () => (
      <svg
        viewBox="0 0 190 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="client-trust-card__logo-img"
        style={{ height: '34px', width: 'auto' }}
      >
        <rect x="6" y="16" width="20" height="7" rx="2" fill="#C9A84C" />
        <rect x="12.5" y="9.5" width="7" height="20" rx="2" fill="#C9A84C" />
        <circle cx="16" cy="20" r="14" stroke="#C9A84C" strokeWidth="2" strokeDasharray="3 3" />
        <text
          x="38"
          y="27"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="18"
          letterSpacing="0.04em"
        >
          MEDVENTA
        </text>
        <text
          x="38"
          y="40"
          fill="#999999"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="500"
          fontSize="9"
          letterSpacing="0.18em"
        >
          SURGICAL SOLUTIONS
        </text>
      </svg>
    ),
  },
  {
    id: 'probiota',
    name: 'Probiota Innovations',
    url: 'https://www.probiotainnovations.com',
    niche: 'US-FDA Registered Probiotic & Gummy CDMO',
    badge: '340+ Static Pages · Next.js 16',
    renderLogo: () => (
      <svg
        viewBox="0 0 200 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="client-trust-card__logo-img"
        style={{ height: '34px', width: 'auto' }}
      >
        <rect x="6" y="12" width="22" height="12" rx="6" stroke="#C9A84C" strokeWidth="2.2" />
        <path d="M17 12V24" stroke="#C9A84C" strokeWidth="2.2" />
        <circle cx="11.5" cy="18" r="2" fill="#C9A84C" />
        <text
          x="36"
          y="24"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="15"
          letterSpacing="0.04em"
        >
          PROBIOTA
        </text>
        <text
          x="36"
          y="37"
          fill="#C9A84C"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="9.5"
          letterSpacing="0.16em"
        >
          INNOVATIONS
        </text>
      </svg>
    ),
  },
  {
    id: 'wafa-trust',
    name: 'Wafa Trust',
    url: 'https://wafatrust.org',
    niche: 'Philanthropic Healthcare & Community NGO',
    badge: 'Verified NGO Platform · Live Site',
    renderLogo: () => (
      <img
        src="/wafa-trust-logo.jpeg"
        alt="Wafa Educational And Charitable Trust"
        className="client-trust-card__logo-img"
        style={{ borderRadius: '4px' }}
      />
    ),
  },
];

export default function ClientTrustBar({
  title = "Powering Web Infrastructure for Verified Industry Leaders",
  subtitle = "Directly verified live client platforms designed, engineered, and scaled by Rankur - featuring site-wide footer backlinks to rankursite.com."
}) {
  return (
    <section className="client-trust-bar" id="client-trust-bar">
      <div className="container">
        <div className="client-trust-bar__header">
          <span className="client-trust-bar__meta-tag">
            <span className="client-trust-bar__live-dot"></span>
            Verified Production Deployments · 2,280+ Live Pages
          </span>
          <h2 className="client-trust-bar__title">{title}</h2>
          <p className="client-trust-bar__subtitle">{subtitle}</p>
        </div>

        <div className="client-trust-bar__grid">
          {clientLogos.map((client) => (
            <a
              key={client.id}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="client-trust-card"
              title={`Visit ${client.name} - Check footer for 'Designed and built by Rankur'`}
            >
              <div className="client-trust-card__logo-wrapper">
                {client.renderLogo()}
              </div>
              <div className="client-trust-card__info">
                <span className="client-trust-card__name">{client.name}</span>
                <span className="client-trust-card__niche">{client.niche}</span>
                <span className="client-trust-card__badge">{client.badge}</span>
                <span className="client-trust-card__verify-link">
                  Verify Live Backlink ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
