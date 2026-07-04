import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa'

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#why-choose-us' },
  { name: 'Programs', href: '#courses' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' }
]

export default function Navbar({ onAdmissionClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--solid' : ''}`}>
        <div className="wrap nav__row">
          <a href="/" className="nav__brand">
            <img src="/final-logo.svg" alt="Muntazar Classes Logo" className="nav__logo-img" />
            <div className="nav__logo-text">
              <span className="nav__logo-name">MUNTAZAR</span>
              <span className="nav__logo-sub">Classes</span>
            </div>
          </a>

          <ul className="nav__links show-desktop">
            {links.map(l => (
              <li key={l.name}>
                <a href={l.href} className="nav__link">{l.name}</a>
              </li>
            ))}
          </ul>

          <div className="nav__right show-desktop">
            <a href="tel:+919221105658" className="nav__phone">
              <FaPhoneAlt /> <span>+91 92211 05658</span>
            </a>
            <button onClick={() => onAdmissionClick ? onAdmissionClick() : (window.location.href = '/#contact')} className="btn btn--blue btn--sm">
              Enrol Now
            </button>
          </div>

          <button className="nav__hamburger show-mobile" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="nav__mobile">
          <div className="nav__mobile-header">
            <a href="/" className="nav__brand" onClick={() => setOpen(false)}>
              <img src="/final-logo.svg" alt="Muntazar Classes Logo" className="nav__logo-img" />
              <div className="nav__logo-text">
                <span className="nav__logo-name">MUNTAZAR</span>
                <span className="nav__logo-sub">Classes</span>
              </div>
            </a>
            <button className="nav__hamburger" onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <ul className="nav__mobile-links">
            {links.map(l => (
              <li key={l.name}>
                <a href={l.href} onClick={() => setOpen(false)} className="nav__mobile-link">{l.name}</a>
              </li>
            ))}
          </ul>
          <div className="nav__mobile-actions">
            <a href="tel:+919221105658" className="btn btn--outline" style={{ width: '100%' }}>
              <FaPhoneAlt /> Call Us
            </a>
            <button onClick={() => { setOpen(false); onAdmissionClick ? onAdmissionClick() : (window.location.href = '/#contact') }} className="btn btn--blue" style={{ width: '100%' }}>
              Enrol Now
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.4s var(--ease);
          padding: 1rem 0;
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        .nav--solid {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 0.65rem 0;
          border-bottom-color: var(--border);
        }
        .nav__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav__brand {
          display: flex;
          align-items: center;
          gap: 0;
          text-decoration: none;
          z-index: 1001;
          transform: scale(1.35);
          transform-origin: left center;
        }
        .nav__logo-img {
          height: 56px;
          width: auto;
          object-fit: contain;
        }
        .nav__logo-text { 
          display: flex; 
          flex-direction: column; 
          margin-left: -0.5rem;
        }
        .nav__logo-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.9rem;
          color: var(--text-dark);
          letter-spacing: 0.05em;
          line-height: 1;
        }
        .nav__logo-sub {
          font-family: var(--font-display);
          font-size: 0.5rem;
          font-weight: 600;
          color: var(--blue);
          letter-spacing: 0.22em;
          line-height: 1;
          margin-top: 3px;
        }
        .nav__links {
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }
        .nav__link {
          color: var(--text-muted);
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
          position: relative;
        }
        .nav__link:hover { color: var(--blue); }
        .nav__link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 2px;
          background: var(--blue);
          transition: width 0.3s var(--ease);
          border-radius: 1px;
        }
        .nav__link:hover::after { width: 100%; }
        .nav__right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav__phone {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-body);
          font-size: 0.8rem;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .nav__phone svg { color: var(--blue); font-size: 0.7rem; }
        .nav__phone:hover { color: var(--blue); }
        .nav__hamburger {
          background: none;
          border: none;
          color: var(--text-dark);
          font-size: 1.4rem;
          z-index: 1001;
          align-items: center;
          justify-content: center;
        }
        .nav__mobile {
          position: fixed; inset: 0;
          background: var(--white);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 1rem 1.25rem 2rem;
          animation: mobileIn 0.35s var(--ease);
        }
        @keyframes mobileIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav__mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
          margin-bottom: 1.5rem;
        }
        .nav__mobile-links {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .nav__mobile-link {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--text-dark);
          padding: 0.65rem 0;
          display: block;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s ease;
        }
        .nav__mobile-link:hover { color: var(--blue); }
        .nav__mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 1.5rem;
        }
      `}</style>
    </>
  )
}
