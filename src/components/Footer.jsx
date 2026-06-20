import { Link } from 'react-router-dom';
import './Footer.css';

const footerNav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/case-studies', label: 'Case Studies' },
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

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__brand-name">
              <img src="/Copilot_20260620_230305.png" alt="Prototype Logo" className="footer__logo-img" />
            </div>
            <p className="footer__brand-desc">
              B2B Growth Consultant &amp; Performance Marketer. I build high-converting websites
              and growth systems for businesses in the US, UK, Australia, Canada, and Gulf.
            </p>
            <div className="footer__socials">
              <a
                href="https://linkedin.com"
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
                href="mailto:parjapatiwork@gmail.com"
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
              <Link key={link.label} to={link.to} className="footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Services</h4>
            {footerServices.map((link) => (
              <Link key={link.label} to={link.to} className="footer__link">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="footer__col-title">Contact</h4>
            <p className="footer__contact-item">
              <a href="mailto:parjapatiwork@gmail.com">parjapatiwork@gmail.com</a>
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
            <Link to="/free-audit" className="footer__bottom-link">
              Book Free Audit
            </Link>
            <Link to="/contact" className="footer__bottom-link">
              Contact
            </Link>
            <Link to="/blog" className="footer__bottom-link">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
