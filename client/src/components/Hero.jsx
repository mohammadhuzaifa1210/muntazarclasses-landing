import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaCalendarAlt, FaGraduationCap, FaChalkboardTeacher, FaUsers } from 'react-icons/fa'

// Right-side photos cross-fade while the headline stays fixed
const photos = [
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
]

const stats = [
  { value: '18+', label: 'Years of Excellence', icon: <FaCalendarAlt /> },
  { value: '3', label: 'Language Mediums', icon: <FaGraduationCap /> },
  { value: '200+', label: 'Top Board Scorers', icon: <FaChalkboardTeacher /> },
  { value: '25', label: 'Students / Batch', icon: <FaUsers /> }
]

export default function Hero({ onAdmissionClick }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % photos.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="hero">
      <div className="grid-pattern" />
      <div className="hero__glow hero__glow--a" />
      <div className="hero__glow hero__glow--b" />

      <div className="wrap hero__wrap">
        <div className="hero__grid">
          {/* Left */}
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="hero__title">
              Educating the <span className="hero__accent">Next Generation</span> of Thinkers
            </h1>

            <p className="hero__desc">
              Trusted coaching in Hindi, Urdu &amp; English - from 5th standard to degree.
            </p>

            <div className="hero__btns">
              <button onClick={onAdmissionClick} className="btn btn--blue btn--lg">
                Book Free Demo <FiArrowUpRight />
              </button>
              <a href="#courses" className="btn btn--outline btn--lg">
                View Programs
              </a>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="hero__media"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__photo">
              <AnimatePresence mode="wait">
                <motion.img
                  key={idx}
                  src={photos[idx]}
                  alt="Muntazar Classes students learning"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  loading="eager"
                />
              </AnimatePresence>
            </div>

            <div className="hero__float">
              <div className="hero__float-icon"><FaGraduationCap /></div>
              <div>
                <span className="hero__float-val">18+ Years</span>
                <span className="hero__float-lbl">of Board Excellence</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Docked dark stat bar */}
      <div className="wrap">
        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {stats.map((s, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-icon">{s.icon}</span>
              <div className="hero__stat-text">
                <span className="hero__stat-val">{s.value}</span>
                <span className="hero__stat-lbl">{s.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .hero {
          position: relative;
          background: var(--grad-hero);
          padding: calc(62px + 4.5rem) 0 0;
          overflow: hidden;
        }
        .hero__glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .hero__glow--a {
          width: 480px; height: 480px;
          background: rgba(59,130,246,0.18);
          top: -140px; right: -120px;
        }
        .hero__glow--b {
          width: 420px; height: 420px;
          background: rgba(26,86,219,0.10);
          bottom: 40px; left: -160px;
        }
        .hero__wrap { position: relative; z-index: 2; }
        .hero__grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 3.5rem;
          align-items: center;
          padding-bottom: 4.5rem;
        }
        .hero__content { max-width: 580px; }
        .hero__title {
          font-size: clamp(2.1rem, 3.8vw, 3.1rem);
          font-weight: 700;
          line-height: 1.14;
          letter-spacing: -0.02em;
          color: var(--text-dark);
          margin-bottom: 1.35rem;
        }
        .hero__accent { color: var(--blue); }
        .hero__desc {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 440px;
          margin-bottom: 2.25rem;
        }
        .hero__btns { display: flex; gap: 1rem; flex-wrap: wrap; }

        /* Media */
        .hero__media { position: relative; }
        .hero__photo {
          position: relative;
          aspect-ratio: 4 / 3.4;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          background: var(--gray-100);
        }
        .hero__photo img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .hero__float {
          position: absolute;
          bottom: -22px; left: -22px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--white);
          padding: 0.9rem 1.15rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border);
        }
        .hero__float-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: var(--blue-soft);
          color: var(--blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }
        .hero__float-val {
          display: block;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--text-dark);
          line-height: 1.1;
        }
        .hero__float-lbl { font-size: 0.72rem; color: var(--text-muted); }

        /* Docked stat bar */
        .hero__stats {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: var(--blue-deep);
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }
        .hero__stat {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1.85rem 1.75rem;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .hero__stat:last-child { border-right: none; }
        .hero__stat-icon {
          color: var(--blue-light);
          font-size: 1.35rem;
          flex-shrink: 0;
        }
        .hero__stat-text { display: flex; flex-direction: column; line-height: 1.15; }
        .hero__stat-val {
          font-family: var(--font-display);
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text-white);
          letter-spacing: -0.02em;
        }
        .hero__stat-lbl {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-white-50);
        }

        @media (max-width: 991px) {
          .hero__grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
            padding-bottom: 3.5rem;
          }
          .hero__content { max-width: 640px; margin: 0 auto; }
          .hero__desc { margin-left: auto; margin-right: auto; }
          .hero__btns { justify-content: center; }
          .hero__media { max-width: 520px; margin: 0 auto; width: 100%; }
          .hero__stats { grid-template-columns: repeat(2, 1fr); }
          .hero__stat:nth-child(2) { border-right: none; }
          .hero__stat:nth-child(1), .hero__stat:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
        }
        @media (max-width: 768px) {
          .hero { padding-top: calc(56px + 3.25rem); }
          .hero__btns { flex-direction: column; }
          .hero__btns .btn { width: 100%; }
        }
        @media (max-width: 520px) {
          .hero__stats { grid-template-columns: 1fr; }
          .hero__stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .hero__stat:last-child { border-bottom: none; }
          .hero__float { left: 50%; transform: translateX(-50%); bottom: -20px; }
        }
      `}</style>
    </section>
  )
}
