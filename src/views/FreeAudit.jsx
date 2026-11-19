"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import HeroSection from '../components/HeroSection';
import { AUDIT_FAQS } from '../data/auditFaqs';
import './FreeAudit.css';
import './Contact.css';

const auditSteps = [
  {
    icon: '📋',
    title: '1. Submit Site Details',
    desc: 'Share your URL, vertical, and main conversion or search bottlenecks so I know what to inspect.',
  },
  {
    icon: '🔍',
    title: '2. Diagnostic Evaluation',
    desc: 'I evaluate search engine discovery barriers, buyer qualification drop-offs, platform performance bottlenecks, and positioning clarity.',
  },
  {
    icon: '📄',
    title: '3. Written Priority Teardown',
    desc: 'Receive a concise prioritized brief covering what is broken and which fixes matter most — within 2 business days.',
  },
  {
    icon: '📞',
    title: '4. Optional Discussion',
    desc: 'If helpful, we can review the findings together by email or call. Zero sales pressure.',
  },
];

const trustMetrics = [
  { value: '<1s Load', label: 'Sub-Second Global Edge Performance' },
  { value: 'Moksh Productions', label: 'Operating Entity (India)' },
  { value: 'Mutual NDA', label: 'Available Prior to Sharing Files' },
  { value: 'GA4 Certified', label: 'Clean Event Measurement' },
];

export default function FreeAudit() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    industry: '',
    budget: '',
    challenges: '',
    consent: false,
    botcheck: false,
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'A valid work email is required';
    if (!formData.website.trim() || !formData.website.includes('.')) newErrors.website = 'A valid website URL is required';
    if (!formData.industry) newErrors.industry = 'Please select your industry';
    if (!formData.budget) newErrors.budget = 'Please select an approximate scope range';
    if (!formData.challenges.trim()) newErrors.challenges = 'Please describe your primary site or SEO challenge';
    if (!formData.consent) newErrors.consent = 'Please accept the Privacy Policy and Terms to submit';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.botcheck) return;

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
          access_key: '5517f453-049b-41fc-900d-e8254b555a53',
          subject: 'New Free Audit Request — Rankur',
          name: formData.name,
          email: formData.email,
          website: formData.website,
          industry: formData.industry,
          budget: formData.budget,
          challenges: formData.challenges,
          botcheck: '',
        }),
      });
      const result = await response.json();
      if (result.success) {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'audit_form_submit', { industry: formData.industry });
        }
        router.push('/thank-you');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <HeroSection
        label="Free Audit"
        title={
          <>
            Request a Free <br />
            <span className="text-gold">B2B Site &amp; SEO Audit</span>
          </>
        }
        subtitle="A comprehensive diagnostic uncovering search authority gaps, enterprise buyer drop-offs, platform speed bottlenecks, and conversion friction — delivered within 2 business days."
        center
      />

      <section className="audit-what" id="audit-process">
        <div className="container">
          <p className="section-label">How It Works</p>
          <h2 className="section-title">Manual Technical Inspection</h2>
          <p className="section-subtitle" style={{ marginBottom: 'var(--space-3xl)' }}>
            No generic automated scraper reports. Every site is reviewed personally for architectural and commercial gaps.
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

      <section className="audit-form-section" style={{ padding: 'var(--space-5xl) 0', backgroundColor: 'var(--color-dark-surface)' }}>
        <div className="container" style={{ maxWidth: '750px' }}>
          <div className="contact-form">
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-white)', marginBottom: 'var(--space-sm)', textAlign: 'center' }}>
              Audit Request Form
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center', marginBottom: 'var(--space-2xl)', lineHeight: '1.6' }}>
              Mutual NDA options are available prior to sharing internal files. Written findings are sent within 2 business days.
            </p>

            {submitStatus === 'error' ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                <h3 style={{ color: 'var(--color-red)', marginBottom: 'var(--space-md)' }}>Submission Failed</h3>
                <p style={{ color: 'var(--color-white)' }}>
                  Something went wrong. Please email your details directly to{' '}
                  <a href="mailto:contactus@rankursite.com" style={{ color: 'var(--color-gold)' }}>
                    contactus@rankursite.com
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={formData.botcheck}
                  onChange={handleChange}
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

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
                      placeholder="Full name"
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
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
                      placeholder="https://yourcompany.com"
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
                      <option value="Nutraceutical">Nutraceutical &amp; Wellness</option>
                      <option value="Manufacturing">B2B Manufacturing &amp; Export</option>
                      <option value="TechSaaS">SaaS &amp; Technology</option>
                      <option value="Industrial">Industrial Services</option>
                      <option value="Other">Other B2B</option>
                    </select>
                    {errors.industry && <span className="form-error">{errors.industry}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="budget">Estimated Project Budget Range (USD)</label>
                  <select
                    id="budget"
                    name="budget"
                    className="form-select"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select range...</option>
                    <option value="audit-only">Audit Only (Evaluating Next Steps)</option>
                    <option value="under-3k">Under $3,000 Project Scope</option>
                    <option value="3k-to-7k">$3,000 – $7,000 Project Scope</option>
                    <option value="over-7k">$7,000+ Full Rebuild &amp; SEO Scope</option>
                  </select>
                  {errors.budget && <span className="form-error">{errors.budget}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="challenges">Primary Website &amp; SEO Obstacles</label>
                  <textarea
                    id="challenges"
                    name="challenges"
                    className="form-textarea"
                    value={formData.challenges}
                    onChange={handleChange}
                    placeholder="E.g., high traffic with low inquiry conversion, legacy platform re-platforming risks, or lost organic visibility against competitors..."
                  ></textarea>
                  {errors.challenges && <span className="form-error">{errors.challenges}</span>}
                </div>

                <div className="form-group">
                  <label className="form-consent" htmlFor="audit-consent">
                    <input
                      type="checkbox"
                      id="audit-consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                    />
                    <span>
                      I agree to the <Link href="/privacy">Privacy Policy</Link> and{' '}
                      <Link href="/terms">Terms of Service</Link>.
                    </span>
                  </label>
                  {errors.consent && <span className="form-error">{errors.consent}</span>}
                </div>

                <button type="submit" className="btn btn--primary form-submit" style={{ marginTop: 'var(--space-md)' }}>
                  Request Free Audit
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="faq-section" id="audit-faq" style={{ padding: 'var(--space-5xl) 0' }}>
        <div className="container">
          <p className="section-label">FAQ</p>
          <h2 className="section-title">Free Audit Questions</h2>
          <div className="faq-list" style={{ marginTop: 'var(--space-2xl)', maxWidth: '800px' }}>
            {AUDIT_FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <button
                  type="button"
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`audit-faq-answer-${i}`}
                  id={`audit-faq-question-${i}`}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-item__toggle ${openFaq === i ? 'faq-item__toggle--open' : ''}`}>
                    +
                  </span>
                </button>
                <p
                  id={`audit-faq-answer-${i}`}
                  className={`faq-item__answer ${openFaq === i ? 'faq-item__answer--visible' : ''}`}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="audit-trust" id="audit-trust">
        <div className="container">
          <p className="section-label">Operating Basis</p>
          <h2 className="section-title">Operated by Moksh Productions</h2>
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
