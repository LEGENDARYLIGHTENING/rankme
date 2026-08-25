import Link from 'next/link';
import './Footer.css';

const footerNav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/locations', label: 'Global Markets' },
  { to: '/about', label: 'About' },
  { to: '/process', label: 'Process' },
  { to: '/certifications', label: 'Certifications' },
];

const footerServices = [
  { to: '/services', label: 'Website Build' },
  { to: '/services', label: 'SEO & GEO' },
  { to: '/services', label: 'LinkedIn Content' },
  { to: '/services', label: 'Meta & Google Ads' },
  { to: '/free-audit', label: 'Free Growth Audit' },
];

const footerMarkets = [
  { to: '/usa', label: 'United States' },
  { to: '/uk', label: 'United Kingdom' },
  { to: '/canada', label: 'Canada' },
  { to: '/australia', label: 'Australia' },
  { to: '/uae', label: 'United Arab Emirates' },
  { to: '/saudi-arabia', label: 'Saudi Arabia' },
  { to: '/locations', label: 'All 260+ Cities →' },
];

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer__grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="footer__brand">
            <div className="footer__brand-name">
              <Link href="/">
                <img src="/Copilot_20260621_183745.png" alt="Moksh Logo" style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
              </Link>
            </div>
            <p className="footer__brand-desc">
              B2B Growth Consultant &amp; Performance Marketer. I build high-converting websites
              and growth systems for businesses in the US, UK, Australia, Canada, and Gulf.
            </p>
            <div className="footer__socials">
              <a
                href="https://linkedin.com/in/moksh-parjapati"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://medium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Medium"
              >
                M
              </a>
              <a
                href="mailto:contactus@rankursite.com"
                className="footer__social-link"
                aria-label="Email"
              >
                @
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer__col-title">Navigate</h4>
            {footerNav.map((link) => (
              <Link key={link.label} href={link.to} className="footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Target Markets</h4>
            {footerMarkets.map((link) => (
              <Link key={link.label} href={link.to} className="footer__link" style={link.to === '/locations' ? { color: 'var(--color-gold)', fontWeight: 'bold' } : {}}>
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Contact</h4>
            <p className="footer__contact-item">
              <a href="mailto:contactus@rankursite.com">contactus@rankursite.com</a>
            </p>
            <p className="footer__contact-item">
              <a href="tel:+919560076090">+91 95600 76090</a>
            </p>
            <p className="footer__contact-item">
              <a href="https://moksh-portfolio-smoky.vercel.app/" target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </p>
            <p className="footer__contact-item">
              US · UK · AU · Canada · Gulf
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Moksh. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link href="/locations" className="footer__bottom-link" style={{ color: 'var(--color-gold)' }}>
              Locations Directory
            </Link>
            <Link href="/free-audit" className="footer__bottom-link">
              Book Free Audit
            </Link>
            <Link href="/contact" className="footer__bottom-link">
              Contact
            </Link>
            <Link href="/blog" className="footer__bottom-link">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
