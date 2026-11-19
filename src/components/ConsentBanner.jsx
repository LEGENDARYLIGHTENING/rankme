'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

const CONSENT_KEY = 'rankur_cookie_consent_v1';
const GA_MEASUREMENT_ID = 'G-L49CTLKWYS';

export default function ConsentBanner() {
  const [consent, setConsent] = useState(null); // null = undecided/loading
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      if (saved === 'accepted' || saved === 'declined') {
        setConsent(saved);
      }
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, []);

  useEffect(() => {
    if (consent !== 'accepted') return undefined;
    const handleAuditClick = (e) => {
      const link = e.target?.closest?.('a[href="/free-audit"]');
      if (link && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'audit_cta_click', {
          link_text: (link.textContent || '').trim(),
          source_path: window.location.pathname,
        });
      }
    };
    document.addEventListener('click', handleAuditClick);
    return () => document.removeEventListener('click', handleAuditClick);
  }, [consent]);

  const handleChoice = (choice) => {
    setConsent(choice);
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Ignore storage errors
    }
    if (choice === 'accepted' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  };

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="rankur-ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {mounted && consent === null && (
        <aside
          className="consent-banner"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent notice"
        >
          <div className="consent-banner__inner">
            <p className="consent-banner__text">
              We use privacy-preserving, consent-gated measurement to evaluate website performance. No personal data is ever sold or shared. Review our{' '}
              <Link href="/privacy" className="consent-banner__link">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="consent-banner__actions">
              <button
                type="button"
                className="btn btn--secondary consent-banner__btn"
                onClick={() => handleChoice('declined')}
              >
                Essential Only
              </button>
              <button
                type="button"
                className="btn btn--primary consent-banner__btn"
                onClick={() => handleChoice('accepted')}
              >
                Accept Analytics
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

