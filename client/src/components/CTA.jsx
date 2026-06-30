import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

export default function CTA({ onAdmissionClick }) {
  return (
    <section className="cta-sec">
      <div className="cta-bg-pattern" />
      <div className="wrap cta-inner">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow cta-eyebrow" style={{ color: 'var(--blue-light)' }}>Admissions Open · 2026–27</span>
          <h2 className="cta-title">
            Your Child's Academic <em className="accent-serif">Future</em> Starts Here
          </h2>
          <p className="cta-desc">
            Join the coaching institute that Mumbai's top-scoring families trust.
            Limited seats. Scholarships available for meritorious students.
          </p>
          <div className="cta-btns">
            <button onClick={onAdmissionClick} className="btn btn--blue btn--lg">
              Book a Free Demo <FiArrowUpRight />
            </button>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline-light btn--lg"
            >
              <FaWhatsapp /> Chat With Us
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        .cta-sec {
          background: var(--blue-deep);
          position: relative;
          overflow: hidden;
          padding: var(--gap-5xl) 0;
        }
        .cta-bg-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(59,130,246,0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        .cta-inner { position: relative; z-index: 1; }
        .cta-content {
          max-width: 650px;
          margin: 0 auto;
          text-align: center;
        }
        .cta-eyebrow {
          justify-content: center;
        }
        .cta-eyebrow::before { display: none; }
        .cta-title {
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          color: var(--text-white);
          margin-bottom: 1.25rem;
        }
        .cta-title em { color: rgba(255,255,255,0.7); }
        .cta-desc {
          font-size: 1.05rem;
          color: var(--text-white-70);
          line-height: 1.75;
          margin-bottom: 2.5rem;
        }
        .cta-btns {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .cta-btns { flex-direction: column; }
          .cta-btns .btn { width: 100%; }
        }
      `}</style>
    </section>
  )
}
