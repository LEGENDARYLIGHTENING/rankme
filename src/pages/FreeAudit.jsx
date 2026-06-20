import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import './FreeAudit.css';

const reviewItems = [
  {
    icon: '◎',
    title: 'Website UX & Conversion Rate',
    desc: 'The audit uncovers exactly what is blocking your leads in the user experience, page structure, and conversion funnel.',
  },
  {
    icon: '◎',
    title: 'SEO & GEO Gaps',
    desc: 'The SEO and GEO gap analysis identifies every missed ranking opportunity across Google, ChatGPT, and Perplexity.',
  },
  {
    icon: 'in',
    title: 'LinkedIn Presence & Content',
    desc: 'The review of your LinkedIn profile and content strategy highlights quick wins for B2B authority building.',
  },
  {
    icon: '▶',
    title: 'Meta & Google Ads Performance',
    desc: 'For active campaigns, the assessment pinpoints optimization opportunities in structure, targeting, ad copy, and CTR/CPL.',
  },
  {
    icon: '✓',
    title: 'GA4 & Analytics Setup',
    desc: 'The analytics check reveals if leads, form fills, and conversion events are properly tracked — or if you are flying blind.',
  },
];

const trustSignals = [
  { value: '1,000+', label: 'Leads Generated' },
  { value: '10+', label: 'B2B Leads (Probiota)' },
  { value: 'GA4', label: 'Certified' },
  { value: 'Digital Deepak', label: 'Trained' },
  { value: 'US · UK · AU', label: 'Gulf · Canada' },
];

export default function FreeAudit() {
  return (
    <>
      <Helmet>
        <title>Book a Free B2B Website & Growth Audit | Moksh</title>
        <meta
          name="description"
          content="Get a free 30-minute teardown of your B2B website, SEO and GEO gaps, ads performance, and lead generation leaks — zero pitch, just a clear, actionable plan."
        />
      </Helmet>

      <HeroSection
        label="Free Growth Audit"
        title={
          <>
            Get a Free <span className="text-gold">30-Minute</span> Growth Teardown
          </>
        }
        subtitle="I will review your website, SEO, GEO, LinkedIn, and ads — and give you a clear priority action plan. No pitch. No commitment. Just value."
        center
      />

      {/* What I Review */}
      <section className="audit-what" id="what-i-review">
        <div className="container">
          <p className="section-label">What I Review</p>
          <h2 className="section-title">Your Complete Digital Presence</h2>
          <div className="audit-what__grid">
            {reviewItems.map((item, i) => (
              <div key={i} className="audit-what__item">
                <div className="audit-what__icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendly */}
      <section className="audit-calendly" id="book-audit">
        <div className="container">
          <p className="section-label">Book Your Audit</p>
          <h2 className="section-title">Pick a Time That Works</h2>
          <div style={{ color: 'var(--color-red)', fontSize: '13px', fontWeight: 500, marginBottom: 'var(--space-sm)' }}>
            Only 2 new client spots available this month — audit slots fill fast.
          </div>
          <div className="calendly-placeholder">
            {/* Calendly Embed Placeholder — Replace with Calendly inline widget script
                Example: <div class="calendly-inline-widget" data-url="https://calendly.com/YOUR_LINK" style="min-width:320px;height:630px;"></div>
                <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js"></script>
            */}
            Calendly Scheduling Widget Will Appear Here
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="audit-trust" id="audit-trust">
        <div className="container">
          <p className="section-label">Why Trust Me</p>
          <h2 className="section-title">Proven Results</h2>
          <div className="audit-trust__grid">
            {trustSignals.map((item, i) => (
              <div key={i} className="audit-trust__item">
                <span className="audit-trust__value">{item.value}</span>
                <span className="audit-trust__label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
