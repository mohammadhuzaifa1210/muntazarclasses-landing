import React from 'react'
import { FaPhoneAlt, FaWhatsapp, FaCalendarCheck } from 'react-icons/fa'

export default function StickyBottom({ onAdmissionClick }) {
  return (
    <>
      {/* Desktop: Floating action buttons */}
      <div className="fab-wrap">
        <a href="https://wa.me/919221105658" target="_blank" rel="noopener noreferrer" className="fab fab--wa" aria-label="WhatsApp">
          <FaWhatsapp />
        </a>
        <a href="tel:+919221105658" className="fab fab--phone" aria-label="Call">
          <FaPhoneAlt />
        </a>
      </div>

      {/* Mobile: Bottom action bar */}
      <div className="mobile-bottom">
        <div className="mobile-bottom__row">
          <a href="tel:+919221105658" className="btn btn--outline btn--sm" style={{ flex: 1, borderColor: 'var(--border-strong)' }}>
            <FaPhoneAlt /> Call
          </a>
          <button onClick={onAdmissionClick} className="btn btn--blue btn--sm" style={{ flex: 1.4 }}>
            <FaCalendarCheck /> Book Demo
          </button>
          <a href="https://wa.me/919221105658" target="_blank" rel="noopener noreferrer" className="btn btn--wa btn--sm" style={{ flex: 1 }}>
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
        .fab:hover { transform: translateY(-3px); }
        .fab--wa {
          background: #25D366;
          color: #fff;
          font-size: 1.5rem;
        }
        .fab--phone {
          background: var(--blue);
          color: var(--text-white);
          font-size: 1.15rem;
          border: 1px solid var(--blue-dark);
        }
        .mobile-bottom {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: var(--white);
          border-top: 1px solid var(--border);
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.05);
          z-index: 999;
          padding: 0.6rem 0.6rem calc(0.6rem + env(safe-area-inset-bottom));
        }
        .mobile-bottom__row {
          display: flex;
          gap: 0.4rem;
        }
        .mobile-bottom__row .btn {
          min-height: 48px;
          padding: 0.65rem 0.5rem;
          min-width: 0;
          gap: 0.35rem;
          border-radius: 100px;
        }

        /* ─── sm large phones ─── */
        @media (min-width: 480px) {
          .mobile-bottom { padding: 0.6rem 0.75rem calc(0.6rem + env(safe-area-inset-bottom)); }
          .mobile-bottom__row { gap: 0.5rem; }
          .mobile-bottom__row .btn { padding: 0.65rem 0.9rem; }
        }
      `}</style>
    </>
  )
}
