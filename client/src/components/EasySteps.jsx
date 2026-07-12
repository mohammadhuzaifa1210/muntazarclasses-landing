import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaPhoneAlt } from 'react-icons/fa'

const steps = [
  { num: '01', title: 'Choose Your Program', desc: 'School, College or Degree.', tint: 'warm' },
  { num: '02', title: 'Book a Free Demo', desc: 'Sit in a live lecture.', tint: 'mint' },
  { num: '03', title: 'Enrol & Get Materials', desc: 'Modules, tests and a mentor.', tint: 'amber' },
  { num: '04', title: 'Start Learning', desc: 'Daily doubts and tracking.', tint: 'sage' }
]

export default function EasySteps({ onAdmissionClick }) {
  return (
    <section className="steps-sec">
      <div className="wrap steps-grid">
        {/* Left */}
        <motion.div
          className="steps-intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">Simple Enrolment</span>
          <h2 className="steps-intro__title">
            Get Started in 4 <em className="accent-serif">Easy Steps</em>
          </h2>
          <p className="steps-intro__desc">
            From first demo to exam day - a clear, structured path.
          </p>
          <div className="steps-intro__btns">
            <button onClick={onAdmissionClick} className="btn btn--primary btn--lg">
              Book Free Demo <FiArrowUpRight />
            </button>
            <a href="tel:+919221105658" className="btn btn--outline btn--lg">
              <FaPhoneAlt /> Call Us
            </a>
          </div>
        </motion.div>

        {/* Right */}
        <div className="steps-cards">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              className={`step-card step-card--${s.tint}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="step-card__num">{s.num}</span>
              <h3 className="step-card__title">{s.title}</h3>
              <p className="step-card__desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .steps-sec {
          background: var(--grad-soft);
          padding: var(--gap-3xl) 0;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--gap-2xl);
          align-items: center;
        }
        .steps-intro__title {
          font-size: var(--fs-h2);
          margin-bottom: 1.25rem;
        }
        .steps-intro__title em { color: var(--accent); }
        .steps-intro__desc {
          font-size: var(--fs-body);
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 2rem;
          max-width: 420px;
        }
        .steps-intro__btns { display: flex; flex-direction: column; gap: 1rem; }
        .steps-intro__btns .btn { width: 100%; }
        .steps-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .step-card {
          position: relative;
          padding: 2rem 1.75rem;
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform 0.4s var(--ease);
        }
        .step-card:hover { transform: translateY(-4px); }
        .step-card--warm   { background: var(--tint-warm); }
        .step-card--mint   { background: var(--tint-mint); }
        .step-card--amber  { background: var(--tint-amber); }
        .step-card--sage   { background: var(--tint-sage); }
        .step-card__num {
          display: block;
          font-family: var(--font-display);
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 0.9rem;
        }
        .step-card--warm   .step-card__num { color: var(--tint-warm-ink); }
        .step-card--mint   .step-card__num { color: var(--tint-mint-ink); }
        .step-card--amber  .step-card__num { color: var(--tint-amber-ink); }
        .step-card--sage   .step-card__num { color: var(--tint-sage-ink); }
        .step-card__title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }
        .step-card__desc {
          font-size: 0.88rem;
          color: var(--text-body);
          line-height: 1.6;
        }
        /* ── ≥480: roomier intro buttons ── */
        @media (min-width: 480px) {
          .steps-intro__btns { flex-direction: row; flex-wrap: wrap; }
          .steps-intro__btns .btn { width: auto; }
        }
        /* ── ≥768: two-column staggered cards ── */
        @media (min-width: 768px) {
          .steps-cards { grid-template-columns: repeat(2, 1fr); }
          .steps-cards .step-card:nth-child(2),
          .steps-cards .step-card:nth-child(4) { margin-top: 2rem; }
        }
        /* ── ≥992: side-by-side intro + cards ── */
        @media (min-width: 992px) {
          .steps-sec { padding: var(--gap-5xl) 0; }
          .steps-grid { grid-template-columns: 0.85fr 1.15fr; gap: var(--gap-3xl); }
        }
      `}</style>
    </section>
  )
}
