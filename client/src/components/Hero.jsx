import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    tag: 'Est. 2016 · Mumbai',
    title: ['Educating the', 'Next Generation', 'of Thinkers'],
    desc: 'Mumbai\'s premier preparatory academy for IIT-JEE, NEET, and Higher Secondary Boards. Limited to 25 scholars per batch.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80'
  },
  {
    tag: 'Concept-First Methodology',
    title: ['Precision', 'Training, Proven', 'Results'],
    desc: 'Unlocking engineering and medical pathways through computational mock tests, silent archives, and personal doubt solving.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80'
  },
  {
    tag: 'Academic Mentoring',
    title: ['Elite IIT &', 'NEET Faculty', 'Panel'],
    desc: 'Learn directly from M.Sc. & Ph.D. professors with 10+ years of proven competitive coaching experience.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80'
  }
]

const stats = [
  { value: '10+', label: 'Years' },
  { value: '5K+', label: 'Students' },
  { value: '95%', label: 'Success' }
]

export default function Hero({ onAdmissionClick }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % slides.length), 7000)
    return () => clearInterval(t)
  }, [])

  const s = slides[idx]

  return (
    <section id="home" className="hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="hero__bg"
          style={{ backgroundImage: `url(${s.image})` }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>

      <div className="hero__overlay" />

      <div className="wrap hero__wrap">
        <div className="hero__content">
          <motion.span key={`t-${idx}`} className="hero__tag"
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            {s.tag}
          </motion.span>

          <motion.h1 key={`h-${idx}`} className="hero__title"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            {s.title.map((line, i) => (
              <span key={i} className="hero__title-line">
                {i === 1 ? <em className="accent-serif">{line}</em> : line}
              </span>
            ))}
          </motion.h1>

          <motion.p key={`d-${idx}`} className="hero__desc"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7 }}>
            {s.desc}
          </motion.p>

          <motion.div key={`a-${idx}`} className="hero__btns"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}>
            <button onClick={onAdmissionClick} className="btn btn--orange btn--lg">
              Book Free Demo Class
            </button>
            <a href="#courses" className="btn btn--outline-light btn--lg">
              View Programs
            </a>
          </motion.div>
        </div>

        <div className="hero__stats">
          {stats.map((st, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-val">{st.value}</span>
              <span className="hero__stat-lbl">{st.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__dots">
        {slides.map((_, i) => (
          <button key={i} className={`hero__dot ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)} />
        ))}
      </div>

      <style>{`
        .hero {
          position: relative;
          height: 100svh;
          min-height: 650px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--blue-deep);
          margin-top: 62px;
        }
        .hero__bg {
          position: absolute; inset: 0;
          background-size: cover;
          background-position: center;
        }
        .hero__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(23,37,84,0.88) 0%, rgba(30,58,138,0.7) 100%);
          z-index: 1;
        }
        .hero__wrap {
          position: relative; z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
          width: 100%;
        }
        .hero__content { max-width: 680px; }
        .hero__tag {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-display);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--orange);
          margin-bottom: 1.75rem;
        }
        .hero__tag::before {
          content: '';
          width: 24px; height: 2px;
          background: var(--orange);
          border-radius: 2px;
        }
        .hero__title {
          font-size: clamp(2.6rem, 5.5vw, 4.25rem);
          font-weight: 800;
          color: var(--text-white);
          line-height: 1.06;
          letter-spacing: -0.04em;
          margin-bottom: 1.75rem;
        }
        .hero__title-line { display: block; }
        .hero__title em { color: rgba(255,255,255,0.6); font-weight: 400; }
        .hero__desc {
          font-size: 1.08rem;
          color: var(--text-white-70);
          line-height: 1.7;
          max-width: 480px;
          margin-bottom: 2.5rem;
        }
        .hero__btns { display: flex; gap: 1rem; flex-wrap: wrap; }
        .hero__stats {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2.25rem 2rem;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius);
          backdrop-filter: blur(10px);
        }
        .hero__stat { text-align: center; }
        .hero__stat-val {
          display: block;
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-white);
          line-height: 1;
        }
        .hero__stat-lbl {
          display: block;
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-white-50);
          margin-top: 0.3rem;
        }
        .hero__dots {
          position: absolute;
          bottom: 2.5rem; left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 0.6rem;
        }
        .hero__dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: 1.5px solid var(--text-white-50);
          background: transparent;
          padding: 0; cursor: pointer;
          transition: all 0.4s var(--ease);
        }
        .hero__dot.active {
          background: var(--text-white);
          border-color: var(--text-white);
          transform: scale(1.3);
        }
        @media (max-width: 768px) {
          .hero { margin-top: 56px; }
          .hero__wrap { flex-direction: column; justify-content: center; text-align: center; }
          .hero__content { max-width: 100%; }
          .hero__desc { margin-left: auto; margin-right: auto; }
          .hero__btns { justify-content: center; flex-direction: column; }
          .hero__btns .btn { width: 100%; }
          .hero__stats {
            flex-direction: row; gap: 1.5rem; padding: 1.25rem; width: 100%;
            justify-content: space-around;
          }
          .hero__stat-val { font-size: 1.6rem; }
          .hero__tag { justify-content: center; }
        }
      `}</style>
    </section>
  )
}
