"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Building2 } from 'lucide-react';

import './Contact.css';

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    industry: '',
    mainGoal: '',
    additional: '',
    consent: false,
    botcheck: false,
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

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
    if (!formData.mainGoal) newErrors.mainGoal = 'Please select your primary goal';
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
          subject: 'New Contact Inquiry: Rankur',
          name: formData.name,
          email: formData.email,
          website: formData.website,
          industry: formData.industry,
          mainGoal: formData.mainGoal,
          additional: formData.additional,
          botcheck: '',
        }),
      });
      const result = await response.json();
      if (result.success) {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'contact_form_submit', { main_goal: formData.mainGoal });
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
    <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-5xl))' }}>
      <div className="container">
        <div className="contact-layout">
          <div className="contact-info">
            <p className="section-label">Contact</p>
            <h1>Let&apos;s Discuss Your Site &amp; Search Goals</h1>
            <p style={{ marginBottom: 'var(--space-xl)' }}>
              We engineer high-performance Next.js web platforms, deterministic search architectures, and verified attribution pipelines for enterprise B2B operators.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: 'var(--space-2xl)' }}>
              Submit the project brief below. Every inquiry goes directly to founder Moksh Parjapati, and I reply by email within 2 business days. Mutual NDAs can be signed prior to sharing sensitive metrics.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <div className="contact-method__icon" aria-hidden="true">
                  <Mail size={18} strokeWidth={2} />
                </div>
                <div className="contact-method__details">
                  <span>Direct Email</span>
                  <a href="mailto:contactus@rankursite.com">contactus@rankursite.com</a>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-method__icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div className="contact-method__details">
                  <span>Founder Profile</span>
                  <a
                    href="https://linkedin.com/in/moksh-parjapati"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Moksh Parjapati on LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-method__icon" aria-hidden="true">
                  <Building2 size={18} strokeWidth={2} />
                </div>
                <div className="contact-method__details">
                  <span>Operating Entity</span>
                  <span style={{ fontSize: '1rem', color: 'var(--color-white)', fontWeight: 'var(--font-weight-medium)', textTransform: 'none', letterSpacing: 'normal' }}>
                    Moksh Productions (India)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
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

              {submitStatus === 'error' ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                  <h2 style={{ color: 'var(--color-red)', marginBottom: 'var(--space-md)' }}>Submission Failed</h2>
                  <p style={{ color: 'var(--color-white)' }}>
                    Something went wrong. Please email directly at{' '}
                    <a href="mailto:contactus@rankursite.com" style={{ color: 'var(--color-gold)' }}>
                      contactus@rankursite.com
                    </a>
                    .
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

                  <div className="form-group">
                    <label className="form-label" htmlFor="website">Website URL</label>
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
                        <option value="TechSaaS">SaaS &amp; Tech</option>
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
                        <option value="Custom Web Build">Custom High-Performance Web Platform</option>
                        <option value="SEO/GEO Visibility">Technical SEO &amp; GEO</option>
                        <option value="Brand Positioning">Positioning &amp; Copy</option>
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
                      placeholder="Describe your positioning gaps, crawl/index issues, or Next.js rebuild timeline..."
                    ></textarea>
                    {errors.additional && <span className="form-error">{errors.additional}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-consent" htmlFor="contact-consent">
                      <input
                        type="checkbox"
                        id="contact-consent"
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

                  <button type="submit" className="btn btn--primary form-submit">
                    Submit Inquiry
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
