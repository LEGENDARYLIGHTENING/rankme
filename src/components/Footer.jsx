import Link from 'next/link';
import './Footer.css';

const footerNav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/locations', label: 'Markets' },
  { to: '/about', label: 'About' },
  { to: '/process', label: 'Process' },
  { to: '/certifications', label: 'Certifications' },
];

const footerMarkets = [
  { to: '/usa', label: 'United States' },
  { to: '/uk', label: 'United Kingdom' },
  { to: '/canada', label: 'Canada' },
  { to: '/australia', label: 'Australia' },
  { to: '/uae', label: 'United Arab Emirates' },
  { to: '/saudi-arabia', label: 'Saudi Arabia' },
  { to: '/locations', label: 'All Markets' },
];

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="footer__brand">
            <div className="footer__brand-name">
              <Link href="/" aria-label="Rankur home">
                <img src="/rankur-logo.png" alt="Rankur" width={105} height={70} style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
              </Link>
            </div>
            <p className="footer__brand-desc">
              B2B Growth Consultant &amp; Web Engineer. I build high-converting Next.js websites
              and search systems for businesses across the US, UK, Australia, Canada, and Gulf.
            </p>
            <div className="footer__socials">
              <a
                href="https://linkedin.com/in/moksh-parjapati"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Moksh Parjapati on LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/moksh_rankur"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Rankur on X (Twitter)"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="mailto:contactus@rankursite.com"
                className="footer__social-link"
                aria-label="Email Rankur"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="footer__col-title">Navigate</p>
            {footerNav.map((link) => (
              <Link key={link.label} href={link.to} className="footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="footer__col-title">Target Markets</p>
            {footerMarkets.map((link) => (
              <Link key={link.label} href={link.to} className="footer__link" style={link.to === '/locations' ? { color: 'var(--color-gold)', fontWeight: 'bold' } : {}}>
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="footer__col-title">Contact</p>
            <p className="footer__contact-item">
              <a href="mailto:contactus@rankursite.com">contactus@rankursite.com</a>
            </p>
            <p className="footer__contact-item">
              <a href="tel:+919560076090">+91 95600 76090</a>
            </p>
            <p className="footer__contact-item">
              <Link href="/case-studies" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
                Case Studies
              </Link>
            </p>
            <p className="footer__contact-item">
              US · UK · AU · Canada · Gulf
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Rankur (Moksh Productions). All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link href="/free-audit" className="footer__bottom-link">
              Free Audit
            </Link>
            <Link href="/contact" className="footer__bottom-link">
              Contact
            </Link>
            <Link href="/blog" className="footer__bottom-link">
              Blog
            </Link>
            <Link href="/privacy" className="footer__bottom-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer__bottom-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
