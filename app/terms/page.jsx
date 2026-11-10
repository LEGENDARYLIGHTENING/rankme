import { constructMetadata } from '../../src/utils/seo';
import Breadcrumbs from '../../src/components/Breadcrumbs';

export const metadata = constructMetadata({
  title: 'Terms of Service | Rankur',
  description:
    'Draft terms of service outlining website use, intellectual property ownership, free audit scope, and milestone-based engagement terms.',
  canonical: '/terms',
  imageAlt: 'Rankur Terms of Service',
});

export default function TermsPage() {
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
          { label: 'Terms of Service' },
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
          Terms of <span className="text-gold">Service</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-2xl)' }}>
          Last updated: November 10, 2026
        </p>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)', color: 'var(--color-text-muted)', lineHeight: '1.75' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              1. Informational Content &amp; Free Audits
            </h2>
            <p>
              Materials published on rankursite.com and findings shared in complimentary site audits are provided for informational and technical evaluation purposes. Free audit submissions do not establish a formal client relationship unless a written proposal and agreement are executed by both parties.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              2. Project Scope &amp; Milestone Sign-Off
            </h2>
            <p>
              All paid web engineering, technical SEO, and consulting engagements are governed strictly by the deliverables, acceptance criteria, and milestone-based sign-off terms set out in the signed written proposal and mutual non-disclosure agreement.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              3. Intellectual Property
            </h2>
            <p>
              Site copy, brand assets, and original guides on rankursite.com belong to Moksh Productions unless stated otherwise. Client source code and deliverable ownership are transferred per the written engagement agreement upon final milestone completion.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              4. Contact
            </h2>
            <p>
              Questions about these draft terms may be sent to{' '}
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

