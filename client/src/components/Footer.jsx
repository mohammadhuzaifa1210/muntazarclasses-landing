import React from 'react'
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#why-choose-us' },
  { name: 'Programs', href: '#courses' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' }
]

const courses = [
  'JEE/NEET Intensive',
  'Board Exam Mastery (HSC)',
  'CBSE & ICSE Foundation',
  'MHT-CET Excellence',
  'Repeater / Drop Year'
]

const socials = [
  { icon: <FaInstagram />, href: '#' },
  { icon: <FaYoutube />, href: '#' },
  { icon: <FaFacebookF />, href: '#' },
  { icon: <FaLinkedinIn />, href: '#' },
  { icon: <FaWhatsapp />, href: 'https://wa.me/919876543210' }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap">

        {/* Top: Brand + newsletter */}
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <div className="footer-logo__icon">M</div>
              <div>
                <span className="footer-logo__name">MUNTAZAR</span>
                <span className="footer-logo__sub">CLASSES</span>
              </div>
            </a>
            <p className="footer-tagline">
              Mumbai's premier coaching institute for JEE, NEET, and Board exam preparation. Building top rankers since 2016.
            </p>
          </div>

          <div className="footer-social-wrap">
            <span className="footer-social-label">Follow Us</span>
            <div className="footer-socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social">{s.icon}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Links Grid */}
        <div className="footer-grid">
          <div>
            <h4 className="footer-heading">Navigate</h4>
            <ul className="footer-links">
              {navLinks.map((l, i) => <li key={i}><a href={l.href}>{l.name}</a></li>)}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Programs</h4>
            <ul className="footer-links">
              {courses.map((c, i) => <li key={i}><a href="#courses">{c}</a></li>)}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links footer-links--info">
              <li>
                <span className="footer-info-label">Address</span>
                <span>101/102, Premium Landmark, Opp. Mulund Station, Mumbai – 400080</span>
              </li>
              <li>
                <span className="footer-info-label">Phone</span>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </li>
              <li>
                <span className="footer-info-label">Email</span>
                <a href="mailto:admissions@muntazarclasses.com">admissions@muntazarclasses.com</a>
              </li>
              <li>
                <span className="footer-info-label">Hours</span>
                <span>Mon–Sat: 10 AM – 8:30 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Latest Updates</h4>
            <div className="footer-notices">
              <div className="footer-notice">
                <span className="footer-notice__tag">Urgent</span>
                <p>Final crash course batch enrollments closing 10th July. Apply for scholarship now.</p>
              </div>
              <div className="footer-notice">
                <span className="footer-notice__tag">New</span>
                <p>Free NEET Biology booster series starting next Monday for all enrolled students.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {year} Muntazar Classes. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Refunds</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--blue-deep);
          color: rgba(255,255,255,0.6);
          padding: var(--gap-4xl) 0 var(--gap-xl);
        }

        /* Top */
        .footer-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: var(--gap-2xl);
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          text-decoration: none;
          margin-bottom: 1rem;
        }
        .footer-logo__icon {
          width: 36px; height: 36px;
          background: var(--blue);
          color: var(--text-white);
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
        .footer-logo__name {
          display: block;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1rem;
          color: var(--text-white);
          letter-spacing: 0.06em;
          line-height: 1;
        }
        .footer-logo__sub {
          display: block;
          font-size: 0.5rem;
          font-weight: 600;
          color: var(--blue-light);
          letter-spacing: 0.3em;
          margin-top: 2px;
        }
        .footer-tagline {
          font-size: 0.85rem;
          line-height: 1.6;
          max-width: 360px;
        }
        .footer-social-wrap { text-align: right; }
        .footer-social-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.75rem;
        }
        .footer-socials { display: flex; gap: 0.5rem; justify-content: flex-end; }
        .footer-social {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.3s var(--ease);
        }
        .footer-social:hover {
          background: var(--blue);
          color: var(--text-white);
          border-color: var(--blue);
          transform: translateY(-2px);
        }

        /* Divider */
        .footer-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin-bottom: var(--gap-2xl);
        }

        /* Grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 0.9fr 0.9fr 1.1fr 1.1fr;
          gap: var(--gap-2xl);
          margin-bottom: var(--gap-3xl);
        }
        .footer-heading {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.8);
          margin-bottom: 1.25rem;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .footer-links a {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          transition: color 0.2s ease;
        }
        .footer-links a:hover { color: var(--text-white); }
        .footer-links--info { gap: 1rem; }
        .footer-links--info li { display: flex; flex-direction: column; }
        .footer-info-label {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 1px;
        }
        .footer-links--info span {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.5;
        }

        /* Notices */
        .footer-notices { display: flex; flex-direction: column; gap: 0.75rem; }
        .footer-notice {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-sm);
          padding: 0.85rem;
        }
        .footer-notice__tag {
          display: inline-block;
          font-size: 0.55rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--blue-light);
          margin-bottom: 0.3rem;
        }
        .footer-notice p {
          font-size: 0.78rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.4);
        }

        /* Bottom */
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: var(--gap-xl);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.78rem;
        }
        .footer-legal { display: flex; gap: 1.5rem; }
        .footer-legal a {
          color: rgba(255,255,255,0.4);
          transition: color 0.2s ease;
        }
        .footer-legal a:hover { color: var(--text-white); }

        @media (max-width: 991px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-top { flex-direction: column; }
          .footer-social-wrap { text-align: left; }
          .footer-socials { justify-content: flex-start; }
        }
        @media (max-width: 576px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  )
}
