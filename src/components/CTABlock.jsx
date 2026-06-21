import { Link } from 'react-router-dom';
import './CTABlock.css';

export default function CTABlock({
  label = 'Ready to Grow?',
  title = 'Book Your Free 30-Minute Growth Audit',
  subtitle = 'Get a complete teardown of your website, SEO, ads, and lead generation - no pitch, just a clear action plan.',
  primaryCTA = { to: '/free-audit', label: 'Book Free Audit' },
  secondaryCTA,
  showCalendly = false,
}) {
  return (
    <section className="cta-block" id="cta-section">
      <div className="container">
        <div className="cta-block__inner">
          <p className="cta-block__label">{label}</p>
          <h2 className="cta-block__title">{title}</h2>
          <p className="cta-block__subtitle">{subtitle}</p>
          <div className="cta-block__actions">
            <Link to={primaryCTA.to} className="btn btn--primary">
              {primaryCTA.label}
            </Link>
            {secondaryCTA && (
              <Link to={secondaryCTA.to} className="btn btn--secondary">
                {secondaryCTA.label}
              </Link>
            )}
          </div>
          {/* TODO: replace with real Calendly embed once link is created. */}
          {showCalendly && (
            <div className="calendly-placeholder">
              <div className="calendly-inline-widget" data-url="https://calendly.com/your-link" style={{ minWidth: "320px", height: "700px" }}></div>
              Calendly Scheduling Widget Will Appear Here
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
