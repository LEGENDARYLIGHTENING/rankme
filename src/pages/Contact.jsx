import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    country: '',
    niche: '',
    budget: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.budget) newErrors.budget = 'Please select a budget range';
    if (!formData.description.trim()) newErrors.description = 'Please describe your project';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...formData,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setSubmitted(true);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Moksh | Book a Growth Call or Send a Brief</title>
        <meta
          name="description"
          content="Get in touch today to discuss your B2B website, SEO, GEO, LinkedIn, or ads project. Serving international clients in the US, UK, Australia, Canada, and Gulf."
        />
      </Helmet>

      {/* Main Contact Section */}
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-5xl))' }}>
        <div className="container">
          <div className="contact-layout">
            
            {/* Contact Info */}
            <div className="contact-info">
              <p className="section-label">Get in Touch</p>
              <h2>Let's Discuss Your Growth Goals</h2>
              <p>
                Whether you need a full React JS website build, an ongoing SEO & GEO system, 
                or a complete digital teardown, I am ready to help. I reply to all inquiries 
                within 24 hours.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method__icon">@</div>
                  <div className="contact-method__details">
                    <span>Email Me</span>
                    <a href="mailto:parjapatiwork@gmail.com">parjapatiwork@gmail.com</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method__icon">in</div>
                  <div className="contact-method__details">
                    <span>Connect</span>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method__icon">P</div>
                  <div className="contact-method__details">
                    <span>See My Work</span>
                    <a href="https://moksh-portfolio-smoky.vercel.app/" target="_blank" rel="noopener noreferrer">
                      moksh-portfolio-smoky.vercel.app
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {submitted && submitStatus === 'success' ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                    <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>Message Received</h3>
                    <p style={{ color: 'var(--color-gold)' }}>
                      Your brief has been received. Moksh will respond within 24 hours.
                    </p>
                  </div>
                ) : submitStatus === 'error' ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                    <h3 style={{ color: 'var(--color-red)', marginBottom: 'var(--space-md)' }}>Submission Failed</h3>
                    <p style={{ color: 'var(--color-red)' }}>
                      Something went wrong. Please email directly at parjapatiwork@gmail.com.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="company">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="form-input"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                      />
                      {errors.company && <span className="form-error">{errors.company}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="country">Country</label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          className="form-input"
                          value={formData.country}
                          onChange={handleChange}
                          placeholder="USA, UK, etc."
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="niche">Niche / Industry</label>
                        <input
                          type="text"
                          id="niche"
                          name="niche"
                          className="form-input"
                          value={formData.niche}
                          onChange={handleChange}
                          placeholder="SaaS, Real Estate..."
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="budget">Monthly Budget Range (USD)</label>
                      <select
                        id="budget"
                        name="budget"
                        className="form-select"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="">Select a range...</option>
                        <option value="under500">Under $500</option>
                        <option value="500to1000">$500 – $1,000</option>
                        <option value="1000to3000">$1,000 – $3,000</option>
                        <option value="over3000">$3,000+</option>
                      </select>
                      {errors.budget && <span className="form-error">{errors.budget}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="description">Project Description</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-textarea"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell me about your current situation and what you're looking to achieve..."
                      ></textarea>
                      {errors.description && <span className="form-error">{errors.description}</span>}
                    </div>

                    <button type="submit" className="btn btn--primary form-submit">
                      Request Your Custom Growth Plan
                    </button>
                  </>
                )}
              </form>
            </div>
            
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section className="contact-calendly" id="contact-calendly">
        <div className="container">
          <p className="section-label">Prefer to talk?</p>
          <h2 className="section-title">Book a Call Directly</h2>
          {/* TODO: replace with real Calendly embed once link is created. */}
          <div className="calendly-placeholder">
            <div className="calendly-inline-widget" data-url="https://calendly.com/your-link" style={{ minWidth: "320px", height: "700px" }}></div>
            Calendly Scheduling Widget Will Appear Here
          </div>
        </div>
      </section>
    </>
  );
}
