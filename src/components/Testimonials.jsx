import './Testimonials.css';

const testimonials = [
  {
    quote: "Moksh built our entire B2B presence from zero. Within 60 days we had inbound RFQs from three overseas buyers.",
    name: "Rohan S.",
    title: "Founder, Probiota Innovations",
    initials: "RS",
    isPending: false,
  },
  {
    quote: "The GEO content strategy put us in front of buyers we had never reached before. Our LinkedIn leads doubled in 6 weeks.",
    name: "Client Name",
    title: "CEO, [Company - Testimonial Pending]",
    initials: "CN",
    isPending: true,
  },
  {
    quote: "Finally a consultant who understands both the technical build and the marketing strategy. The audit alone was worth it.",
    name: "Client Name",
    title: "Director, [Company - Testimonial Pending]",
    initials: "CN",
    isPending: true,
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <p className="section-label">What Clients Say</p>
        <h2 className="section-title">Trusted by B2B Leaders</h2>
        <div className="testimonials__grid">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="testimonial-card">
              <p className="testimonial-card__quote">{testimonial.quote}</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{testimonial.initials}</div>
                <div className="testimonial-card__info">
                  <span className="testimonial-card__name">{testimonial.name}</span>
                  <span className="testimonial-card__title">{testimonial.title}</span>
                </div>
              </div>
              {testimonial.isPending && (
                <p className="testimonial-card__pending-note">Testimonial in progress - more case studies launching soon.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
