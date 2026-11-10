import React from 'react';
import { APPROVED_TESTIMONIALS } from '../data/testimonials';
import './Testimonials.css';

export default function Testimonials({
  title = 'Partner & Client Feedback',
  subtitle = 'Named, permission-verified feedback from leaders whose platforms I helped engineer.',
}) {
  if (!APPROVED_TESTIMONIALS || APPROVED_TESTIMONIALS.length === 0) {
    return null;
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <p className="section-label">Verified Feedback</p>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        <div className="testimonials__grid">
          {APPROVED_TESTIMONIALS.map((item) => (
            <div key={item.id} className="testimonial-card">
              <p className="testimonial-card__quote">{item.quote}</p>

              <div className="testimonial-card__footer">
                <div className="testimonial-card__author">
                  <div className="testimonial-card__info">
                    <span className="testimonial-card__name">{item.name}</span>
                    <span className="testimonial-card__title">
                      {item.role}, {item.company}
                      {item.relationship === 'in-house venture' ? ' (In-house venture)' : ''}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {item.linkedin && (
                    <a
                      href={item.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="testimonial-card__verified-link"
                    >
                      LinkedIn Profile &rarr;
                    </a>
                  )}
                  {item.domain && (
                    <a
                      href={item.domain}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="testimonial-card__verified-link"
                    >
                      Visit site &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
