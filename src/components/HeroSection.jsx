import { Link } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection({
  label,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  center = false,
}) {
  return (
    <section className={`hero ${center ? 'hero--center' : ''}`} id="hero-section">
      <div className="container">
        {label && <span className="hero__label animate-in">{label}</span>}
        <h1 className="hero__title animate-in animate-delay-1">{title}</h1>
        {subtitle && (
          <p className="hero__subtitle animate-in animate-delay-2">{subtitle}</p>
        )}
        <div className="hero__actions animate-in animate-delay-3">
          {primaryCTA && (
            <Link to={primaryCTA.to} className="btn btn--primary">
              {primaryCTA.label}
            </Link>
          )}
          {secondaryCTA && (
            <Link to={secondaryCTA.to} className="btn btn--secondary">
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
      <div className="hero__decoration" aria-hidden="true"></div>
      <div className="hero__decoration hero__decoration--2" aria-hidden="true"></div>
    </section>
  );
}
