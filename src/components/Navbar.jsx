'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/philosophy', label: 'Philosophy' },
  { to: '/services', label: 'Services' },
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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
      <div className="navbar__inner">
        <Link href="/" className="navbar__logo" aria-label="Rankur home" onClick={() => setMenuOpen(false)}>
          <img
            src="/rankur-logo.png"
            alt="Rankur"
            width={160}
            height={44}
            className="navbar__logo-img"
          />
        </Link>

        <nav
          id="main-nav-menu"
          aria-label="Primary navigation"
          className={`navbar__menu ${menuOpen ? 'navbar__menu--open' : ''}`}
        >
          <div className="navbar__links">
            {navLinks.map((link) => {
              const isActive = link.to === '/' ? pathname === '/' : pathname?.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/free-audit"
            className="btn btn--primary navbar__cta"
            onClick={() => setMenuOpen(false)}
          >
            Free Audit
          </Link>
        </nav>

        <button
          type="button"
          className={`navbar__toggle ${menuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav-menu"
          id="nav-toggle"
        >
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
          <span className="navbar__toggle-bar"></span>
        </button>
      </div>
    </header>
  );
}
