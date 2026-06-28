import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  // Push custom conversion event if Google Tag Manager/gtag or Meta Pixel is present
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/LABEL', // Replace with your actual Google conversion ID and label
      });
    }
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead');
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Thank You | Rankur</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section style={{ minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'calc(var(--nav-height) + var(--space-5xl))' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '650px' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>Brief Received</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-3xl)' }}>
            Thank you for reaching out. Moksh has received your application and will personally review your growth parameters. 
            We will contact you via email within 24-48 hours.
          </p>
          <Link to="/" className="btn btn--primary">
            Return to Home
          </Link>
        </div>
      </section>
    </>
  );
}
