import './ServiceCard.css';

export default function ServiceCard({
  icon,
  title,
  price,
  description,
  deliverables,
  timeline,
}) {
  return (
    <div className="service-card" id={`service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="service-card__icon">{icon}</div>
      <h3 className="service-card__title">{title}</h3>
      {price && <p className="service-card__price">{price}</p>}
      <p className="service-card__desc">{description}</p>
      {deliverables && deliverables.length > 0 && (
        <div className="service-card__deliverables">
          {deliverables.map((item, i) => (
            <p key={i} className="service-card__deliverable">{item}</p>
          ))}
        </div>
      )}
      {timeline && <p className="service-card__timeline">{timeline}</p>}
    </div>
  );
}
