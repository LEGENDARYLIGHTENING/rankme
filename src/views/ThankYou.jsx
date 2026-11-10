"use client";
import Link from 'next/link';

export default function ThankYou() {
  return (
    <section
      style={{
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 'calc(var(--nav-height) + var(--space-5xl))',
      }}
    >
      <div className="container" style={{ textAlign: 'center', maxWidth: '650px' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--color-gold)', marginBottom: 'var(--space-md)' }}>
          Brief Received
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: 'var(--space-3xl)' }}>
          Thank you for reaching out. I have received your submission and will review it personally. Expect a direct email reply within 2 business days.
        </p>
        <Link href="/" className="btn btn--primary">
          Return to Home
        </Link>
      </div>
    </section>
  );
}
