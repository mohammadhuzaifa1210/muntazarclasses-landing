import React from 'react'
import { FaInstagram, FaYoutube } from 'react-icons/fa'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#why-choose-us' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' }
]

const courses = [
  'School Section (7th to 10th)',
  'College Section (11th & 12th)',
  'Degree Section (FY, SY, TY, B.Com, BMS, BAF)',
  'Hindi, Urdu & English Medium'
]

const socials = [
  { icon: <FaInstagram />, href: 'https://www.instagram.com/muntazarclasses' },
  { icon: <FaYoutube />, href: 'https://youtube.com/@muntazar_classes?si=FWLZAPsRrBwyerNE' }
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          
          <div className="footer-brand-col">
            <a href="#home" className="footer-logo">
              <img src="/final-logo.svg" alt="Muntazar Classes Logo" className="footer-logo__img" />
              <div className="footer-logo-text">
                <span className="footer-logo-name">MUNTAZAR</span>
                <span className="footer-logo-sub">Classes</span>
              </div>
            </a>
            <p className="footer-tagline">
              Govandi's premier coaching institute. Excellence since 2008.
            </p>
            <div className="footer-socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social">{s.icon}</a>
              ))}
            </div>
          </div>


          <div className="footer-contact-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links footer-links--info">
              <li><a href="tel:+919221105658">+91 92211 05658</a></li>
              <li><a href="mailto:manage.muntazarclasses@gmail.com">manage.muntazarclasses@gmail.com</a></li>
              <li style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.25rem' }}>
                <span style={{ lineHeight: '1.6' }}>1st & 2nd Floor, Rikshaw stand, Plot no 33/K/1,2, Near Baiganwadi, Above City Bakery, Govandi West, Mumbai – 400043</span>
                <a 
                  href="https://maps.google.com/?q=Muntazar+Classes+Govandi+West+Mumbai" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn--sm" 
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-white)', width: 'fit-content', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  View on Map
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="footer-service-area">
            <span className="footer-service-label">Serving students from:</span> Govandi West, Govandi East, Baiganwadi, Deonar, Chembur, Mankhurd, Trombay, Shivaji Nagar & surrounding areas in Mumbai.
          </div>
          <div className="footer-bottom-row">
            <p>&copy; {year} Muntazar Classes. All rights reserved.</p>
            <div className="footer-developed">
              Developed by <a href="https://www.chdigitalsolutions.in/" target="_blank" rel="noopener noreferrer" className="developed-link">CH Digital Solutions</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--primary-deep);
          color: rgba(255,255,255,0.6);
          padding: var(--gap-3xl) 0 var(--gap-xl);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: var(--gap-2xl);
        }

        .footer-brand-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0;
          text-decoration: none;
          margin-bottom: 1rem;
        }
        .footer-logo__img {
          height: 48px;
          width: auto;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }
        .footer-logo-text { 
          display: flex; 
          flex-direction: column; 
          margin-left: -0.5rem;
        }
        .footer-logo-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.9rem;
          color: var(--text-white);
          letter-spacing: 0.05em;
          line-height: 1;
        }
        .footer-logo-sub {
          font-family: var(--font-display);
          font-size: 0.5rem;
          font-weight: 600;
          color: var(--primary-light);
          letter-spacing: 0.22em;
          line-height: 1;
          margin-top: 3px;
        }
        .footer-tagline {
          font-size: 0.85rem;
          line-height: 1.6;
          max-width: 320px;
          margin-bottom: 1.5rem;
        }
        
        .footer-socials { display: flex; gap: 0.5rem; }
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
          background: var(--primary);
          color: var(--text-white);
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        .footer-heading {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.8);
          margin-bottom: 1.25rem;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .footer-links a, .footer-links span {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          transition: color 0.2s ease;
          line-height: 1.5;
        }
        .footer-links a:hover { color: var(--text-white); }
        .footer-links--info { gap: 1rem; }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: var(--gap-xl);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          font-size: 0.8rem;
        }
        .footer-service-area {
          font-size: 0.78rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.4);
        }
        .footer-service-label {
          font-weight: 600;
          color: rgba(255,255,255,0.6);
        }
        .footer-bottom-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .footer-developed {
          color: rgba(255,255,255,0.4);
        }
        .developed-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }
        .developed-link:hover { color: var(--text-white); text-decoration: underline; }

        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 1.5fr 1fr; gap: 3rem; }
          .footer-bottom-row { flex-direction: row; justify-content: space-between; align-items: center; }
        }
        @media (min-width: 992px) {
          .footer { padding: var(--gap-4xl) 0 var(--gap-xl); }
          .footer-grid { margin-bottom: var(--gap-3xl); }
        }
      `}</style>
    </footer>
  )
}
