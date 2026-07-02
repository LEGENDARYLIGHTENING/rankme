import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import './FreeAudit.css';
import './Contact.css'; // Leverage standard form styling

const auditSteps = [
  {
    icon: '📋',
    title: '1. Apply & Qualify',
    desc: 'Submit your website parameters and commercial goals via our qualification form. We manually filter requests to ensure we only review aligned B2B brands.',
  },
  {
    icon: '🔍',
    title: '2. Custom Review',
    desc: 'Moksh reviews your digital presence: page speed, positioning copy, technical SEO metadata, and AI search engine visibility across Perplexity and ChatGPT.',
  },
  {
    icon: '📄',
    title: '3. PDF Audit Delivery',
    desc: 'You receive a personalized PDF strategy brief detailing your conversion bottlenecks, search authority gaps, and high-priority optimization tasks.',
  },
  {
    icon: '📞',
    title: '4. Strategy Call',
    desc: 'If the opportunities are significant, you receive a direct invite link to schedule a 30-minute strategic Zoom call with Moksh to map out the pipeline roadmap.',
  },
];

const trustMetrics = [
  { value: 'React / Next.js', label: 'B2B Growth Infrastructure' },
  { value: 'MSME-Registered', label: 'Moksh Productions Division' },
  { value: 'NDA Guaranteed', label: 'Confidential Audits & Code' },
  { value: 'GA4 Certified', label: 'Advanced Funnel Tracking' },
];

export default function FreeAudit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    industry: '',
    budget: '',
    challenges: '',
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
    if (!formData.budget) newErrors.budget = 'Please select your monthly budget range';
    if (!formData.challenges.trim()) newErrors.challenges = 'Please describe your main growth challenge';
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
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || '5517f453-049b-41fc-900d-e8254b555a53',
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
        <title>Apply for a B2B Growth Infrastructure Audit | Rankur</title>
        <meta
          name="description"
          content="Get a comprehensive manual teardown of your website speed, positioning copy, organic SEO gaps, and ChatGPT/Perplexity AI search visibility."
        />
      </Helmet>

      <HeroSection
        label="Strategic Diagnostic"
        title={
          <>
            Request a B2B Growth <br />
            <span className="text-gold">Infrastructure Audit</span>
          </>
        }
        subtitle="We manually review your technical SEO, load performance, brand positioning, and visibility in generative AI searches on ChatGPT and Perplexity. Aligned submissions receive a custom PDF teardown and direct invite."
        center
      />

      {/* Audit Process explanation */}
      <section className="audit-what" id="audit-process">
        <div className="container">
          <p className="section-label">How It Works</p>
          <h2 className="section-title">A Premium, Hand-Crafted Diagnostic Process</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-3xl)' }}>
            We do not use automated, generic SEO scanners. We evaluate your digital footprint manually to identify real commercial bottlenecks.
          </p>
          <div className="audit-what__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {auditSteps.map((step, i) => (
              <div key={i} className="audit-what__item">
                <div className="audit-what__icon" style={{ fontSize: '2rem', marginBottom: 'var(--space-md)' }}>{step.icon}</div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-sm)' }}>{step.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead qualification Form */}
      <section className="audit-form-section" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <div className="contact-form">
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)', textAlign: 'center' }}>B2B Infrastructure Qualification Form</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center', marginBottom: 'var(--space-2xl)', lineHeight: '1.6' }}>
              All applications are protected under our standard mutual NDA. Aligned submissions will receive their PDF teardown in 2 business days.
            </p>

            {submitted && submitStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                <h3 style={{ color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>Application Submitted</h3>
                <p style={{ color: 'var(--color-white)', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}>
                  Thank you. Moksh will personally review your positioning strategy, core web speed parameters, and AI search visibility. Your custom diagnostic PDF will be delivered to your email within 48 hours. Direct Zoom scheduling is unlocked after manual review.
                </p>
              </div>
            ) : submitStatus === 'error' ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                <h3 style={{ color: 'var(--color-red)', marginBottom: 'var(--space-md)' }}>Submission Failed</h3>
                <p style={{ color: 'var(--color-white)' }}>
                  Something went wrong. Please email your details directly to <a href="mailto:contactus@rankursite.com" style={{ color: 'var(--color-gold)' }}>contactus@rankursite.com</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
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
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="website">Company Website URL</label>
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

                  <div className="form-group">
                    <label className="form-label" htmlFor="industry">Industry Vertical</label>
                    <select
                      id="industry"
                      name="industry"
                      className="form-select"
                      value={formData.industry}
                      onChange={handleChange}
                    >
                      <option value="">Select industry...</option>
                      <option value="Nutraceutical">Nutraceutical & Wellness</option>
                      <option value="Manufacturing">B2B Manufacturing & Export</option>
                      <option value="TechSaaS">SaaS & Technology Startup</option>
                      <option value="Industrial">Industrial Services</option>
                      <option value="Other">Other B2B / High-Trust Vertical</option>
                    </select>
                    {errors.industry && <span className="form-error">{errors.industry}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="budget">Monthly Growth Infrastructure Budget (USD)</label>
                  <select
                    id="budget"
                    name="budget"
                    className="form-select"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget range...</option>
                    <option value="under1k">Under $1,000 / month (Self-funded)</option>
                    <option value="1kto3k">$1,000 – $3,000 / month</option>
                    <option value="3kto5k">$3,000 – $5,000 / month</option>
                    <option value="over5k">$5,000+ / month (Mid-market & Enterprise)</option>
                  </select>
                  {errors.budget && <span className="form-error">{errors.budget}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="challenges">Primary Search & Pipeline Obstacles</label>
                  <textarea
                    id="challenges"
                    name="challenges"
                    className="form-textarea"
                    value={formData.challenges}
                    onChange={handleChange}
                    placeholder="E.g., We have traffic but no inquiries; we are launching an off-plan development and need high-trust international SEO; we want to rank on Perplexity AI queries..."
                  ></textarea>
                  {errors.challenges && <span className="form-error">{errors.challenges}</span>}
                </div>

                <button type="submit" className="btn btn--primary form-submit" style={{ marginTop: 'var(--space-md)' }}>
                  Request B2B Growth Infrastructure Audit
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trust Grid */}
      <section className="audit-trust" id="audit-trust">
        <div className="container">
          <p className="section-label">Trust Markers</p>
          <h2 className="section-title">Engineered and Backed by Moksh Productions</h2>
          <div className="audit-trust__grid">
            {trustMetrics.map((item, i) => (
              <div key={i} className="audit-trust__item" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-lg)', backgroundColor: 'var(--color-card-bg)' }}>
                <span className="audit-trust__value">{item.value}</span>
                <span className="audit-trust__label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
