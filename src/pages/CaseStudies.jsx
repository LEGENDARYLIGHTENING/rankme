import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import CTABlock from '../components/CTABlock';
import Testimonials from '../components/Testimonials';
import './CaseStudies.css';

const impactItems = [
  { value: '10 Days', label: 'Probiota Innovations First Lead' },
  { value: 'MSME', label: 'Registered Moksh Productions Backing' },
  { value: 'Alibaba', label: 'Channel Partner B2B Sourcing' },
  { value: '1,000+', label: 'Qualified Leads Captured' },
  { value: '50K+', label: 'Organic Audience Growth Scaled' },
];

export default function CaseStudies() {
  return (
    <>
      <Helmet>
        <title>B2B Growth & Web Infrastructure Case Studies | Rankur</title>
        <meta
          name="description"
          content="Explore case studies on custom React website builds, international SEO, GEO search optimization, and channel partnerships for high-trust sectors."
        />
      </Helmet>

      <HeroSection
        label="Evidence & Case Studies"
        title={
          <>
            Outcome-First <span className="text-gold">B2B Performance</span>
          </>
        }
        subtitle="We build, position, and scale B2B digital infrastructure. Here is the evidence of our work across nutraceuticals, branding, international trade channels, and software growth."
        primaryCTA={{ to: '/free-audit', label: 'Request custom Audit' }}
      />

      {/* Case Study 1: Probiota Innovations */}
      <section className="case-full" id="probiota-case-study" style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <p className="section-label">Case Study 01 · Custom React JS Platform & Global SEO</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-xl) 0' }}>Probiota Innovations: Digital Pipeline for Nutraceuticals</h2>
          <div className="case-full__layout">
            <div className="case-full__image img-placeholder" style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80" alt="Nutraceutical Lab & Products Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="case-full__content">
              <h3>Background</h3>
              <p>
                Probiota Innovations is a specialized B2B nutraceutical and health brand. They required a fast, compliant, and highly structured digital presence to capture international wholesale buyer inquiries and trade distributor leads.
              </p>

              <h3>The Opportunity & Obstacles</h3>
              <p>
                Nutraceutical buyers operate in a high-trust, heavily regulated environment. A generic, slow, or template-based website fails to build immediate credibility with distributors. The client needed a secure digital platform with clean product specifications and international search discoverability.
              </p>

              <h3>Our Solution</h3>
              <ul>
                <li>Designed and coded a custom, ultra-fast React JS website from scratch, ensuring page loads under 1.2s globally.</li>
                <li>Implemented clear, structured product specification pages and lead databases for request tracking.</li>
                <li>Developed technical SEO schemas and semantic content formats optimized for both Google and generative AI queries (GEO).</li>
                <li>Deployed GA4 custom analytics to track precise form engagement and download events.</li>
              </ul>

              <h3>Verified Results</h3>
              <ul>
                <li>Generated **10+ qualified international wholesale inquiries** within the first 10 days of launching the platform.</li>
                <li>Scaled lead inflow to **50+ verified B2B opportunities** in the first month post-launch.</li>
                <li>Delivered and deployed the complete custom code repository within a rapid 7-day development cycle.</li>
              </ul>

              <div style={{ marginTop: 'var(--space-md)', padding: 'var(--space-md)', borderLeft: '3px solid var(--color-gold)', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                  "Rankur built an incredible digital infrastructure for us. Within days, we were capturing international trade inquiries that previously slipped through the cracks."
                </p>
                <p style={{ margin: 'var(--space-xs) 0 0 0', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-white)', fontSize: '0.9rem' }}>
                  — Anshika Narula, Founder, Probiota Innovations
                </p>
              </div>

              {/* Case Study Screenshot Placeholder */}
              <div className="img-placeholder" style={{ height: '150px', marginTop: 'var(--space-md)', borderRadius: 'var(--border-radius)' }}>
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="Probiota Innovations Website Interface Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 2: Gut & Beyond */}
      <section className="case-full" id="gut-beyond-case-study" style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <p className="section-label">Case Study 02 · Brand Strategy & UX Alignment</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-xl) 0' }}>Gut & Beyond: Positioning and Digital Experience Workflows</h2>
          <div className="case-full__layout">
            <div className="case-full__image img-placeholder" style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80" alt="Wellness and Diagnostic Equipment Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="case-full__content">
              <h3>Background</h3>
              <p>
                Gut & Beyond is an emerging brand in the wellness and digestive health space. They required a refined messaging architecture and user experience (UX) layout to establish authoritative positioning.
              </p>

              <h3>Our Solution</h3>
              <ul>
                <li>Audited the existing digital branding structure to eliminate positioning friction and align copy with B2B buyer expectations.</li>
                <li>Restructured the website navigation mapping and copy layout to guide users cleanly through scientific evidence blocks.</li>
                <li>Created targeted content formats and SEO technical indexing rules to optimize organic search visibility in target regions.</li>
              </ul>

              <h3>The Outcome</h3>
              <p>
                By positioning scientific trust markers at the core of the digital experience, we established Gut & Beyond as an authoritative reference brand. This messaging structure shortened buyer hesitation, resulting in a cleaner user acquisition path and stronger corporate alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 3: Competence Consulting */}
      <section className="case-full" id="competence-consulting-case-study" style={{ borderBottom: '1px solid var(--color-border)', padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <p className="section-label">Case Study 03 · B2B Sourcing & Export Channel Operations</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-xl) 0' }}>Competence Consulting: Alibaba Partner Sourcing & Workflows</h2>
          <div className="case-full__layout">
            <div className="case-full__image img-placeholder" style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" alt="Logistics and Freight Cargo Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="case-full__content">
              <h3>Background</h3>
              <p>
                Competence Consulting E-Commerce LLP operates as a key B2B sourcing partner, leveraging official Alibaba channel integrations to coordinate international export transactions.
              </p>

              <h3>Our Strategy & Support</h3>
              <ul>
                <li>Configured operational sourcing workflows and digital verification pipelines for cross-border transactions.</li>
                <li>Managed trade compliance requirements, export keywords, and listing optimization templates to drive international buyer clicks.</li>
                <li>Structured secure data capture systems to manage incoming manufacturer RFQs (Requests for Quote) and wholesale agreements.</li>
              </ul>

              <h3>The Outcome</h3>
              <p>
                This transactional infrastructure allowed mid-market manufacturing clients to scale their global footprint, establishing digital sourcing lanes that reliably funnel enterprise quote opportunities.
              </p>

              {/* Recommendation Letter Placeholder */}
              <div className="img-placeholder" style={{ height: '150px', marginTop: 'var(--space-md)', borderRadius: 'var(--border-radius)' }}>
                <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" alt="Competence Consulting Recommendation Reference Letter" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study 4: Glitchy */}
      <section className="case-full" id="glitchy-case-study" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container">
          <p className="section-label">Case Study 04 · Conversion Systems & Performance Funnels</p>
          <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 var(--space-xl) 0' }}>Glitchy: Lead Generation & Monetization Engines</h2>
          <div className="case-full__layout">
            <div className="case-full__image img-placeholder" style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Software Engineering Analytics Dashboard Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="case-full__content">
              <h3>Background</h3>
              <p>
                Glitchy is a tech-centric partner platform. We designed and managed organic scaling campaigns, conversion redirects, and data-backed landing pages to drive international user acquisition.
              </p>

              <h3>Our Strategy & Execution</h3>
              <ul>
                <li>Researched viral search intent trends and audience hooks to write technical script briefs.</li>
                <li>Created custom, responsive bridge landing pages with optimized redirection logic to maximize user click-throughs.</li>
                <li>Setup GA4 analytics tracking to measure funnel conversion ratios at each stage of the user journey.</li>
              </ul>

              <h3>Verified Results</h3>
              <ul>
                <li>Successfully converted **200+ qualified paying customers** through custom redirect engines.</li>
                <li>Captured **800+ cold leads** and **100+ warm leads** for down-funnel email campaigns.</li>
                <li>Generated consistent affiliate commission revenue, validating our copy and UX hypotheses.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quantified Impact Strip */}
      <section className="impact-section" id="quantified-impact">
        <div className="container">
          <p className="section-label">Quantified Impact</p>
          <h2 className="section-title">Numbers That Matter</h2>
          <div className="impact-grid">
            {impactItems.map((item, i) => (
              <div key={i} className="impact-item">
                <span className="impact-value">{item.value}</span>
                <span className="impact-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      <CTABlock />
    </>
  );
}
