import { useState } from 'react';
import './LeadMagnet.css';

export default function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    // TODO: Connect to email marketing platform (Mailchimp / ConvertKit)
    console.log('Lead magnet email:', email);
    setSubmitted(true);
  };

  return (
    <section className="lead-magnet" id="lead-magnet">
      <div className="container container--narrow">
        <div className="lead-magnet__content">
          <h2 className="section-title">Free Download: The B2B Website Conversion Checklist</h2>
          <p className="lead-magnet__subtitle">
            The exact checklist used to build Probiota Innovations - the B2B site that generated 10+ overseas leads.
          </p>
          
          {submitted ? (
            <div className="lead-magnet__success">
              <span className="lead-magnet__check">✓</span>
              <p>Check your inbox - your checklist is on the way.</p>
            </div>
          ) : (
            <form className="lead-magnet__form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="lead-magnet__input"
              />
              <button type="submit" className="btn lead-magnet__btn">
                Send Me the Checklist
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
