import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const MotionLink = motion.create(Link)
import {
  FaBook, FaFlask, FaChartLine, FaCalculator, FaBriefcase,
  FaLanguage, FaMosque, FaGlobe, FaUniversity
} from 'react-icons/fa'

const chips = [
  { label: 'SSC (10th Board)', icon: <FaBook /> },
  { label: 'HSC Science', icon: <FaFlask /> },
  { label: 'HSC Commerce', icon: <FaChartLine /> },
  { label: 'B.Com', icon: <FaCalculator /> },
  { label: 'BAF', icon: <FaBriefcase /> },
  { label: 'BMS', icon: <FaUniversity /> },
  { label: 'Hindi Medium', icon: <FaLanguage /> },
  { label: 'Urdu Medium', icon: <FaMosque /> },
  { label: 'English Medium', icon: <FaGlobe /> }
]

export default function ProgramChips() {
  return (
    <section className="chips-sec">
      <div className="grid-pattern chips-grid-bg" />
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Academics</span>
          <h2 className="section-head__title">
            Everything We <em className="accent-serif">Teach</em>
          </h2>
        </div>

        <div className="chips-grid">
          {chips.map((c, i) => (
            <motion.a
              key={c.label}
              href="#courses"
              className="chip"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="chip__icon">{c.icon}</span>
              {c.label}
            </motion.a>
          ))}

        </div>

        <div className="chips-cta-wrap">
          <MotionLink
            to="/programs"
            className="chip chip--cta"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Know More <FiArrowRight />
          </MotionLink>
        </div>
      </div>

      <style>{`
        .chips-sec {
          position: relative;
          background: linear-gradient(180deg, #fef8f4 0%, #f5faf8 60%, var(--white) 100%);
          padding: var(--gap-4xl) 0;
          overflow: hidden;
        }
        .chips-grid-bg {
          -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 30%, #000 30%, transparent 75%);
          mask-image: radial-gradient(ellipse 90% 80% at 50% 30%, #000 30%, transparent 75%);
        }
        .chips-sec .wrap { position: relative; z-index: 1; }
        
        .chips-cta-wrap {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
        }

        /* Base = phone (<=479): horizontal scroll-snap row, no overflow */
        .chips-grid {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.6rem;
          max-width: 880px;
          margin: 0 auto;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-padding: 0 var(--gap-md);
          -webkit-overflow-scrolling: touch;
          padding-bottom: 0.25rem;
          scrollbar-width: none;
        }
        .chips-grid::-webkit-scrollbar { display: none; }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          flex: 0 0 auto;
          scroll-snap-align: start;
          min-height: 44px;
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-body);
          background: var(--white);
          border: 1.5px solid var(--border-strong);
          padding: 0.65rem 1.2rem;
          border-radius: var(--radius-pill);
          transition: all 0.35s var(--ease);
        }
        .chip__icon { color: var(--primary); font-size: 0.85rem; display: flex; }
        .chip:hover {
          border-color: var(--primary);
          background: var(--primary-soft);
          color: var(--primary);
          transform: translateY(-2px);
        }
        .chip--cta {
          background: var(--primary);
          border-color: var(--primary);
          color: var(--text-white);
        }
        .chip--cta:hover {
          background: var(--primary-dark);
          border-color: var(--primary-dark);
          color: var(--text-white);
        }

        /* >=480: wrap into a clean centered cloud */
        @media (min-width: 480px) {
          .chips-grid {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.85rem;
            overflow: visible;
            scroll-snap-type: none;
            padding-bottom: 0;
          }
        }
        @media (min-width: 768px) {
          .chip { font-size: 0.88rem; padding: 0.75rem 1.35rem; }
        }
      `}</style>
    </section>
  )
}
