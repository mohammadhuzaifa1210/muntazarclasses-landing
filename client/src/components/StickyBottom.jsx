import React from 'react'
import { FaPhoneAlt, FaWhatsapp, FaCalendarCheck } from 'react-icons/fa'

export default function StickyBottom({ onAdmissionClick }) {
  return (
    <>
      {/* Desktop: Floating action buttons */}
      <div className="fab-wrap">
        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="fab fab--wa" aria-label="WhatsApp">
          <FaWhatsapp />
        </a>
        <a href="tel:+919876543210" className="fab fab--phone" aria-label="Call">
          <FaPhoneAlt />
        </a>
      </div>

      {/* Mobile: Bottom action bar */}
      <div className="mobile-bottom">
        <div className="mobile-bottom__row">
          <a href="tel:+919876543210" className="btn btn--outline btn--sm" style={{ flex: 1, borderColor: 'var(--border-strong)' }}>
            <FaPhoneAlt /> Call
          </a>
          <button onClick={onAdmissionClick} className="btn btn--blue btn--sm" style={{ flex: 1.4 }}>
            <FaCalendarCheck /> Book Demo
          </button>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn--sm" style={{ flex: 1, background: '#25D366', color: '#fff', border: 'none' }}>
            <FaWhatsapp /> Chat
          </a>
        </div>
      </div>

      <style>{`
        .fab-wrap {
          position: fixed;
          right: 24px;
          bottom: 28px;
          z-index: 998;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .fab {
          width: 52px; height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.35s var(--ease);
          border: none;
        }
        .fab:hover { transform: translateY(-3px) scale(1.05); }
        .fab--wa {
          background: #25D366;
          color: #fff;
          font-size: 1.5rem;
          box-shadow: 0 6px 20px rgba(37,211,102,0.35);
        }
        .fab--phone {
          background: var(--blue);
          color: var(--text-white);
          font-size: 1.15rem;
          box-shadow: 0 6px 20px rgba(26,86,219,0.3);
          border: 1px solid var(--blue-dark);
        }
        .mobile-bottom {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: var(--white);
          border-top: 1px solid var(--border-strong);
          z-index: 999;
          padding: 0.6rem 0.75rem;
        }
        .mobile-bottom__row {
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </>
  )
}
