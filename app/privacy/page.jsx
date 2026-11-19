import { constructMetadata } from '../../src/utils/seo';
import Breadcrumbs from '../../src/components/Breadcrumbs';

export const metadata = constructMetadata({
  title: 'Privacy Policy | Rankur',
  description:
    'Comprehensive privacy policy detailing how Rankur protects visitor data, handles inquiry submissions via Web3Forms, and maintains consent-gated telemetry.',
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

      <div className="container" style={{ maxWidth: '860px', paddingTop: 'var(--space-3xl)' }}>
        <p className="section-label">Enterprise Data Governance</p>
        <h1 style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: 'var(--space-md)', color: 'var(--color-white)', letterSpacing: '-0.02em' }}>
          Privacy <span className="text-gold">Policy</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-3xl)', fontSize: '0.95rem' }}>
          Effective Date: January 1, 2026 · Last Updated: November 19, 2026
        </p>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              1. Operating Entity &amp; Data Controller
            </h2>
            <p>
              This website (<span style={{ color: 'var(--color-gold)' }}>rankursite.com</span>) is operated by <strong>Rankur</strong>, an independent B2B web engineering and growth consultancy founded by <strong>Moksh Parjapati</strong> under the operating entity <strong>Moksh Productions</strong> (India). For any data protection inquiries, audit trail requests, or privacy clarifications, you may contact the data controller directly at{' '}
              <a href="mailto:contactus@rankursite.com" style={{ color: 'var(--color-gold)', textDecoration: 'underline' }}>
                contactus@rankursite.com
              </a>.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              2. Data Protection &amp; Privacy-First Philosophy
            </h2>
            <p>
              Rankur operates on a strict principle of <strong>data minimization</strong>. We believe enterprise web systems should be fast, transparent, and completely free of invasive surveillance tech. We do not sell, rent, monetize, or broker personal data under any circumstances. We do not utilize third-party remarketing pixels (e.g., Meta Pixel, TikTok, or LinkedIn Insight tags), nor do we engage in cross-site behavioural profiling.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              3. Information Collected via Contact &amp; Audit Forms
            </h2>
            <p>
              When you voluntarily submit an inquiry through our Contact Form or Free Audit Request form, we collect the following business information:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Contact Information:</strong> Your full name and corporate business email address.</li>
              <li><strong>Company &amp; Domain Details:</strong> Your website URL, industry sector, and estimated project scope.</li>
              <li><strong>Technical Context:</strong> Information you choose to provide regarding your current SEO challenges, CMS migration needs, or pipeline objectives.</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>
              <strong>Purpose of Processing:</strong> This information is utilized strictly to evaluate your technical architecture, prepare your complimentary site diagnostic, respond directly to your commercial inquiry, and provide milestone-based proposals if requested.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              4. Transmission &amp; Form Infrastructure (Web3Forms)
            </h2>
            <p>
              Form submissions are processed via <strong>Web3Forms</strong> over end-to-end TLS 1.3 encrypted connections. Web3Forms acts solely as a secure transmission relay to deliver your inquiry directly to our corporate email inbox (<span style={{ color: 'var(--color-gold)' }}>contactus@rankursite.com</span>). Web3Forms does not store form submissions in public databases, does not track form submitters across the web, and does not set tracking cookies.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              5. Consent-Gated Analytics (Google Analytics 4)
            </h2>
            <p>
              We believe in voluntary, transparent measurement. Google Analytics 4 (<code>G-L49CTLKWYS</code>) tracking scripts are <strong>strictly gated</strong> behind our consent verification banner.
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Zero Initial Tracking:</strong> By default, prior to your explicit selection, all analytics storage, ad storage, and personalization cookies are denied (<code>analytics_storage: 'denied'</code>).</li>
              <li><strong>Explicit Opt-In:</strong> Measurement scripts load if and only if you click "Accept Analytics".</li>
              <li><strong>IP Anonymization:</strong> IP masking is permanently enabled for all analytics sessions. Data collected is aggregated to measure core web vitals, aggregate page engagement, and form completion conversion rates.</li>
              <li><strong>Consent Storage &amp; Revocation:</strong> Your preference is recorded in your browser&apos;s local storage under the key <code>rankur_cookie_consent_v1</code>. You may clear your browser cookies and site storage at any time to reset your consent state.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              6. Global Compliance (GDPR, UK DPA, CCPA/CPRA)
            </h2>
            <p>
              Regardless of your jurisdiction (United States, United Kingdom, European Union, Australia, Canada, or Gulf region), Rankur accords all visitors the following universal data rights:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Right of Access &amp; Portability:</strong> You may request a complete copy of any business contact information submitted through our site.</li>
              <li><strong>Right to Rectification:</strong> You may request corrections to any outdated or inaccurate records.</li>
              <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Upon email request, we will permanently purge your contact submissions and communication history from our active correspondence records.</li>
              <li><strong>Non-Discrimination:</strong> Exercising your privacy rights will never result in degraded website functionality or denial of services.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              7. Retention Schedule &amp; Security Architecture
            </h2>
            <p>
              Inquiry submissions are retained for a maximum of 12 months for commercial correspondence and historical diagnostic reference, after which inactive contact threads are securely deleted. Our production infrastructure employs hardened HTTP security headers, including <code>Strict-Transport-Security</code> (HSTS with preloading), <code>X-Frame-Options: SAMEORIGIN</code>, <code>X-Content-Type-Options: nosniff</code>, and an uncompromising <code>Content-Security-Policy</code> (CSP).
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              8. Contact &amp; Verification Requests
            </h2>
            <p>
              To exercise any privacy rights, request an NDA prior to architectural discussions, or inquire about our data security practices, please contact:
            </p>
            <div style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: 'var(--space-xl)', marginTop: 'var(--space-md)' }}>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-white)' }}>Rankur / Moksh Productions</p>
              <p style={{ margin: '0.25rem 0', color: 'var(--color-text-muted)' }}>Attn: Moksh Parjapati, Data Controller</p>
              <p style={{ margin: '0.25rem 0' }}>
                Email:{' '}
                <a href="mailto:contactus@rankursite.com" style={{ color: 'var(--color-gold)' }}>
                  contactus@rankursite.com
                </a>
              </p>
              <p style={{ margin: '0.25rem 0', color: 'var(--color-text-muted)' }}>Response SLA: Within 1 business day</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
