'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Meet Moksh' },
  { to: '/philosophy', label: 'Philosophy' },
  { to: '/services', label: 'Capabilities' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
        <div className="navbar__inner">
          <Link href="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
            <img src="/Copilot_20260621_183745.png" alt="Moksh Logo" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
          </Link>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className={`navbar__link ${(link.to === '/' ? pathname === '/' : pathname?.startsWith(link.to)) ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/free-audit" className="btn btn--primary navbar__cta navbar__cta-desktop">
            Growth Audit
          </Link>

          <button
            className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="nav-toggle"
          >
            <span className="navbar__toggle-bar"></span>
            <span className="navbar__toggle-bar"></span>
            <span className="navbar__toggle-bar"></span>
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            href={link.to}
            className={`navbar__mobile-link ${(link.to === '/' ? pathname === '/' : pathname?.startsWith(link.to)) ? 'navbar__mobile-link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="navbar__mobile-cta">
          <Link href="/free-audit" className="btn btn--primary" style={{ width: '100%' }} onClick={() => setMenuOpen(false)}>
            Growth Audit
          </Link>
        </div>
      </div>
    </>
  );
}
