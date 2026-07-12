import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaWhatsapp, FaGraduationCap } from 'react-icons/fa'

export default function AdmissionsBanner({ onAdmissionClick }) {
  return (
    <section className="ab-sec">
      <div className="wrap">
        <motion.div
          className="ab-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ab-blob ab-blob--a" />
          <div className="ab-blob ab-blob--b" />

          <div className="ab-content">
            <span className="ab-tag"><FaGraduationCap /> Admissions Open · 2026–27</span>
            <h2 className="ab-title">
              Limited Seats per Batch - Reserve Your Child's Spot Today
            </h2>
            <p className="ab-desc">
              Small batch sizes mean personal attention. Book a free demo class and see the
              Muntazar difference before you decide.
            </p>
            <div className="ab-btns">
              <button onClick={onAdmissionClick} className="btn btn--primary btn--lg">
                Book Free Demo <FiArrowUpRight />
              </button>
              <a
                href="https://wa.me/919221105658"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--wa btn--lg"
              >
                <FaWhatsapp /> WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .ab-sec {
          background: var(--white);
          padding: var(--gap-2xl) 0 var(--gap-3xl);
        }
        .ab-card {
          position: relative;
          overflow: hidden;
          background: #fef8f4;
          border: 1px solid rgba(0,132,108,0.12);
          border-radius: var(--radius-lg);
          padding: 2.25rem 1.25rem;
          box-shadow: none;
          text-align: center;
        }
        .ab-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
        .ab-blob--a {
          width: 260px; height: 260px;
          background: rgba(0,132,108,0.18);
          top: -80px; left: -60px;
        }
        .ab-blob--b {
          width: 240px; height: 240px;
          background: rgba(243,112,33,0.12);
          bottom: -90px; right: -50px;
        }
        .ab-content { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
        .ab-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--primary);
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,132,108,0.15);
          padding: 0.45rem 0.95rem;
          border-radius: var(--radius-pill);
          margin-bottom: 1.25rem;
        }
        .ab-title {
          font-size: var(--fs-h2);
          color: var(--text-dark);
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .ab-desc {
          font-size: var(--fs-body);
          color: var(--text-body);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .ab-btns {
          display: flex;
          flex-direction: column;
          gap: var(--gap-sm);
          justify-content: center;
          align-items: stretch;
        }
        .ab-btns .btn {
          width: 100%;
          min-height: 48px;
        }
        @media (min-width: 480px) {
          .ab-card { padding: 2.75rem 2rem; }
        }
        @media (min-width: 768px) {
          .ab-sec { padding: var(--gap-2xl) 0 var(--gap-4xl); }
          .ab-card { padding: 3.5rem 3rem; }
          .ab-btns {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            gap: 1rem;
          }
          .ab-btns .btn { width: auto; }
        }
      `}</style>
    </section>
  )
}
