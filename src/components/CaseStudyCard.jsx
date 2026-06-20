import './CaseStudyCard.css';

export default function CaseStudyCard({
  image,
  tag,
  title,
  description,
  results,
  linkText,
  linkUrl,
  comingSoon = false,
}) {
  if (comingSoon) {
    return (
      <div className="case-study-card case-study-card--coming-soon">
        <div className="case-study-card__image">Case Study Coming Soon</div>
        <div className="case-study-card__body">
          <p className="case-study-card__tag">{tag || 'Upcoming'}</p>
          <h3 className="case-study-card__title">{title}</h3>
          <p className="case-study-card__coming-soon-badge">Details coming soon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="case-study-card">
      <div className="case-study-card__image img-placeholder" style={{ minHeight: '200px' }}>
        {image}
      </div>
      <div className="case-study-card__body">
        {tag && <p className="case-study-card__tag">{tag}</p>}
        <h3 className="case-study-card__title">{title}</h3>
        <p className="case-study-card__desc">{description}</p>
        {results && results.length > 0 && (
          <div className="case-study-card__results">
            {results.map((stat, i) => (
              <div key={i} className="case-study-card__stat">
                <span className="case-study-card__stat-value">{stat.value}</span>
                <span className="case-study-card__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        {linkText && linkUrl && (
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="case-study-card__link"
          >
            {linkText} →
          </a>
        )}
      </div>
    </div>
  );
}
