import { constructMetadata } from '../../src/utils/seo';
import Breadcrumbs from '../../src/components/Breadcrumbs';

export const metadata = constructMetadata({
  title: 'Privacy Policy | Rankur',
  description:
    'Draft privacy notice detailing how Rankur handles inquiry submissions via Web3Forms and consent-gated Google Analytics 4 telemetry.',
  canonical: '/privacy',
  imageAlt: 'Rankur Privacy Policy',
});

export default function PrivacyPage() {
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
          { label: 'Privacy Policy' },
        ]}
      />

      <div className="container" style={{ maxWidth: '820px', paddingTop: 'var(--space-3xl)' }}>
        <div
          role="note"
          style={{
            backgroundColor: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid var(--color-gold)',
            borderRadius: '8px',
            padding: 'var(--space-md) var(--space-lg)',
            marginBottom: 'var(--space-2xl)',
            color: 'var(--color-gold)',
            fontWeight: 600,
            fontSize: '0.95rem',
          }}
        >
          Draft — legal review required before publishing
        </div>

        <p className="section-label">Legal Notice</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: 'var(--space-lg)', color: 'var(--color-white)' }}>
          Privacy <span className="text-gold">Policy</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-2xl)' }}>
          Last updated: November 10, 2026
        </p>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)', color: 'var(--color-text-muted)', lineHeight: '1.75' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              1. Who Operates This Site
            </h2>
            <p>
              Rankur is operated by Moksh Parjapati under Moksh Productions (India). You can reach me directly at{' '}
              <a href="mailto:contactus@rankursite.com" style={{ color: 'var(--color-gold)' }}>
                contactus@rankursite.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              2. Information Submitted Through Forms
            </h2>
            <p>
              When you submit the Contact form or Free Audit form, your name, corporate email, website URL, industry selection, and project notes are transmitted via Web3Forms solely to respond to your inquiry and prepare your requested site review. I do not sell or rent submitted contact records to third parties.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              3. Cookies &amp; Google Analytics 4
            </h2>
            <p>
              Google Analytics 4 (`G-L49CTLKWYS`) scripts are gated behind the analytics consent prompt and do not load unless you click Accept Analytics. If accepted, IP anonymization is enabled and data is used strictly to understand aggregated traffic and form completion events. Your choice is saved locally in browser storage (`rankur_cookie_consent_v1`) and can be cleared at any time in your browser settings.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              4. Data Retention &amp; Deletion Requests
            </h2>
            <p>
              To request access, correction, or deletion of inquiry details you submitted, email{' '}
              <a href="mailto:contactus@rankursite.com" style={{ color: 'var(--color-gold)' }}>
                contactus@rankursite.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

