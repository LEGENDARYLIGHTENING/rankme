import { constructMetadata } from '../../src/utils/seo';
import Breadcrumbs from '../../src/components/Breadcrumbs';

export const metadata = constructMetadata({
  title: 'Terms of Service | Rankur',
  description:
    'Terms of service governing website use, intellectual property transfer, free site diagnostic audits, and milestone-based consulting agreements.',
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

      <div className="container" style={{ maxWidth: '860px', paddingTop: 'var(--space-3xl)' }}>
        <p className="section-label">Commercial Agreement</p>
        <h1 style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)', marginBottom: 'var(--space-md)', color: 'var(--color-white)', letterSpacing: '-0.02em' }}>
          Terms of <span className="text-gold">Service</span>
        </h1>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-3xl)', fontSize: '0.95rem' }}>
          Effective Date: January 1, 2026 · Last Updated: November 19, 2026
        </p>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              1. Agreement to Terms
            </h2>
            <p>
              By accessing and using this website (<span style={{ color: 'var(--color-gold)' }}>rankursite.com</span>), you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, please discontinue use of this site immediately.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              2. Informational Purpose &amp; Complimentary Site Audits
            </h2>
            <p>
              The research, articles, case study analyses, and technical guides published on rankursite.com are provided solely for general informational and educational purposes. Complimentary website audits and diagnostic tear-downs provided upon request represent independent professional evaluations based on observable public metrics (Core Web Vitals, indexation signals, and UX heuristics). A complimentary audit does not constitute a binding operational warranty or create a formal client relationship until a formal engagement agreement is executed.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              3. Milestone-Based Client Engagements
            </h2>
            <p>
              All professional web engineering, technical SEO transformation, and conversion optimization projects undertaken by Rankur are governed by explicit, written proposals and Master Services Agreements (MSAs). Our engagements strictly feature:
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Milestone-Based Acceptance:</strong> Fees are tied to verifiable engineering deliverables, prototype stages, and final deployment sign-off rather than arbitrary hourly retainers.</li>
              <li><strong>Mutual Non-Disclosure (NDA):</strong> Mutual confidentiality terms protect internal architecture, proprietary data, and roadmap plans prior to code audits or repository access.</li>
              <li><strong>Clean Scope Boundaries:</strong> Explicit acceptance criteria agreed upon up front prevent scope creep and ensure transparent project velocity.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              4. 100% Intellectual Property &amp; Codebase Transfer
            </h2>
            <p>
              Unlike legacy agencies that trap clients inside proprietary CMS platforms, recurring license lock-ins, or hostage hosting environments, Rankur guarantees that <strong>100% of client source code, design assets, structured data schemas, and analytics properties belong entirely to the client</strong>. Full git repository transfer and administrative handoff are completed upon final milestone settlement.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              5. Intellectual Property of Rankur
            </h2>
            <p>
              The original brand identity, trademarks, proprietary benchmark models, editorial publications, and design system of rankursite.com are the exclusive intellectual property of Moksh Parjapati and Moksh Productions. Reproduction, scraping, or commercial imitation of these proprietary materials without prior written consent is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Rankur shall not be liable for indirect, incidental, special, or consequential damages resulting from website downtime, third-party search engine algorithmic updates, or hosting provider interruptions outside our direct engineering control.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              7. Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              These terms are governed by and construed in accordance with applicable commercial laws. In the event of any question or dispute regarding our terms or engagement agreements, parties commit to good-faith mutual consultation and amicable resolution.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)' }}>
              8. Contact
            </h2>
            <p>
              For legal notices, contract inquiries, or milestone agreement requests, please contact:
            </p>
            <div style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: 'var(--space-xl)', marginTop: 'var(--space-md)' }}>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-white)' }}>Rankur / Moksh Productions</p>
              <p style={{ margin: '0.25rem 0', color: 'var(--color-text-muted)' }}>Attn: Commercial Contracts</p>
              <p style={{ margin: '0.25rem 0' }}>
                Email:{' '}
                <a href="mailto:contactus@rankursite.com" style={{ color: 'var(--color-gold)' }}>
                  contactus@rankursite.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
