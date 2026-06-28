import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Contact.css';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    industry: '',
    mainGoal: '',
    additional: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'A valid corporate email is required';
    if (!formData.website.trim() || !formData.website.includes('.')) newErrors.website = 'A valid company website URL is required';
    if (!formData.industry) newErrors.industry = 'Please select your industry';
    if (!formData.mainGoal) newErrors.mainGoal = 'Please select your main goal';
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
        navigate('/thank-you');
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
        <title>Contact Rankur | B2B Growth Infrastructure Consulting</title>
        <meta
          name="description"
          content="Initiate a consultation with Moksh. Discuss brand positioning, custom React builds, international SEO, and GEO search presence."
        />
      </Helmet>

      {/* Main Contact Section */}
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-5xl))' }}>
        <div className="container">
          <div className="contact-layout">
            
            {/* Contact Info */}
            <div className="contact-info">
              <p className="section-label">Initiate Consultation</p>
              <h2>Let's Discuss Your Pipeline Objectives</h2>
              <p style={{ marginBottom: 'var(--space-xl)' }}>
                We build growth platforms for ambitious B2B manufacturers, exporters, nutraceutical brands, and technology providers looking to win international market share.
              </p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: 'var(--space-2xl)' }}>
                Please fill out our qualification brief. Every inquiry is personally reviewed by founder Moksh, and we reply via email within 24 hours. Standard mutual NDAs are signed before sharing proprietary operational files or CRM dashboards.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-method__icon">@</div>
                  <div className="contact-method__details">
                    <span>Direct Inquiries</span>
                    <a href="mailto:contact@rankursite.com">contact@rankursite.com</a>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-method__icon">in</div>
                  <div className="contact-method__details">
                    <span>Executive Connection</span>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-method__icon">M</div>
                  <div className="contact-method__details">
                    <span>Parent Corporation</span>
                    <span style={{ fontSize: '1rem', color: 'var(--color-white)', fontWeight: 'var(--font-weight-medium)', textTransform: 'none', letterSpacing: 'normal' }}>
                      Moksh Productions (MSME-Registered)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {submitted && submitStatus === 'success' ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                    <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>Brief Received</h3>
                    <p style={{ color: 'var(--color-white)', lineHeight: '1.8' }}>
                      Thank you. Moksh has received your brief and will contact you via email within 24 hours to schedule a Zoom consultation.
                    </p>
                  </div>
                ) : submitStatus === 'error' ? (
                  <div style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                    <h3 style={{ color: 'var(--color-red)', marginBottom: 'var(--space-md)' }}>Submission Failed</h3>
                    <p style={{ color: 'var(--color-white)' }}>
                      Something went wrong. Please email directly at <a href="mailto:contact@rankursite.com" style={{ color: 'var(--color-gold)' }}>contact@rankursite.com</a>.
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
                        placeholder="Moksh"
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Corporate Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="moksh@productions.com"
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="website">Website URL</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        className="form-input"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="rankursite.com"
                      />
                      {errors.website && <span className="form-error">{errors.website}</span>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="industry">Industry Vertical</label>
                        <select
                          id="industry"
                          name="industry"
                          className="form-select"
                          value={formData.industry}
                          onChange={handleChange}
                        >
                          <option value="">Select...</option>
                          <option value="Nutraceutical">Nutraceutical</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="TechSaaS">SaaS & Tech</option>
                          <option value="Industrial">Industrial Services</option>
                          <option value="Other">Other B2B</option>
                        </select>
                        {errors.industry && <span className="form-error">{errors.industry}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="mainGoal">Main Goal</label>
                        <select
                          id="mainGoal"
                          name="mainGoal"
                          className="form-select"
                          value={formData.mainGoal}
                          onChange={handleChange}
                        >
                          <option value="">Select...</option>
                          <option value="Custom Web Build">Custom Web Build (React/Next.js)</option>
                          <option value="SEO/GEO Visibility">SEO & GEO Visibility</option>
                          <option value="Brand Positioning">Brand Positioning</option>
                          <option value="Conversion Optimization">Conversion Optimization</option>
                        </select>
                        {errors.mainGoal && <span className="form-error">{errors.mainGoal}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="additional">Additional Details (Optional)</label>
                      <textarea
                        id="additional"
                        name="additional"
                        className="form-textarea"
                        value={formData.additional}
                        onChange={handleChange}
                        placeholder="Provide any details about your positioning, search presence gaps, or website redevelopment needs..."
                      ></textarea>
                      {errors.additional && <span className="form-error">{errors.additional}</span>}
                    </div>

                    <button type="submit" className="btn btn--primary form-submit">
                      Submit Qualification Brief
                    </button>
                  </>
                )}
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
