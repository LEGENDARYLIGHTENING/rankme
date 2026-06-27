import './Testimonials.css';

const testimonials = [
  {
    quote: "Moksh built our entire B2B presence from zero. Within 60 days we had inbound RFQs from three overseas buyers.",
    name: "Rohan S.",
    title: "Founder, B2B Manufacturing Brand",
    initials: "RS",
    isPending: false,
  },
  {
    quote: "Moksh's content marketing and funnel strategies scaled our affiliate program to 200+ customers and generated over $1,000 in commissions. He's a highly execution-focused growth partner.",
    name: "Affiliate Operations",
    title: "Glitchy Partner Program",
    initials: "GA",
    isPending: false,
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <p className="section-label">What Clients Say</p>
        <h2 className="section-title">Trusted by B2B Leaders</h2>
        <div className={`testimonials__grid ${testimonials.length === 1 ? 'testimonials__grid--single' : ''}`}>
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
