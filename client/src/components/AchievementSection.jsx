import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiAward, FiStar, FiArrowRight } from 'react-icons/fi'
import { LuGraduationCap } from 'react-icons/lu'
import { PiMedalBold } from 'react-icons/pi'

/* ── Top achievers for the landing-page carousel ── */
const toppers = [
  {
    name: 'Anam Patni',
    score: '88.40%',
    board: 'SSC',
    medium: 'English Medium',
    year: '2025-26',
    image: '/SSC EM Results 2025-26/Anam Patni 88.40.jpeg',
    rank: 1
  },
  {
    name: 'Sayyed Mohd Mehdi',
    score: '83.20%',
    board: 'SSC',
    medium: 'English Medium',
    year: '2025-26',
    image: '/SSC EM Results 2025-26/Sayyed Mohd Mehdi 83.20.jpeg',
    rank: 2
  }
]

/* ── Animated counter hook ── */
function useCounter(end, duration = 2000, startCounting) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!startCounting) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, startCounting])
  return count
}

function StatCounter({ icon, value, suffix = '', label, delay, isInView }) {
  const count = useCounter(value, 2000, isInView)
  return (
    <motion.div
      className="rs-stat"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
    >
      <div className="rs-stat__icon">{icon}</div>
      <div className="rs-stat__value">{count}{suffix}</div>
      <div className="rs-stat__label">{label}</div>
    </motion.div>
  )
}

function TopperCard({ topper, index }) {
  const rankColors = {
    1: { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', label: '1st' },
    2: { bg: 'linear-gradient(135deg, #94a3b8, #64748b)', label: '2nd' },
    3: { bg: 'linear-gradient(135deg, #cd7f32, #a0522d)', label: '3rd' }
  }
  const rank = rankColors[topper.rank] || null

  return (
    <motion.div
      className="rs-topper"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <div className="rs-topper__img-wrap">
        <img src={topper.image} alt={topper.name} className="rs-topper__img" loading="lazy" />
        <div className="rs-topper__overlay" />

        {rank && (
          <div className="rs-topper__rank" style={{ background: rank.bg }}>
            <PiMedalBold /> {rank.label}
          </div>
        )}

        <div className="rs-topper__score-badge">
          <FiAward className="rs-topper__score-icon" />
          <span>{topper.score}</span>
        </div>
      </div>

      <div className="rs-topper__info">
        <h3 className="rs-topper__name">{topper.name}</h3>
        <div className="rs-topper__meta">
          <span className="rs-topper__board">{topper.board} Board</span>
          <span className="rs-topper__dot">•</span>
          <span className="rs-topper__year">{topper.year}</span>
        </div>
        <div className="rs-topper__medium">{topper.medium}</div>
      </div>
    </motion.div>
  )
}

export default function AchievementSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="achievements" className="rs-sec" ref={sectionRef}>
      {/* Floating particles */}
      <div className="rs-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="rs-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`
            }}
          />
        ))}
      </div>

      {/* Decorative glow blobs */}
      <div className="rs-glow rs-glow--1" />
      <div className="rs-glow rs-glow--2" />

      <div className="wrap">
        {/* ── Header Row ── */}
        <div className="rs-header-row">
          <div className="rs-header-text">
            <motion.span
              className="rs-eyebrow"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              <FiAward /> Results & Achievements
            </motion.span>
            <motion.h2
              className="rs-title"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.7 }}
            >
              Our Students, <em>Our Pride.</em>
            </motion.h2>
            <motion.p
              className="rs-desc"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Year after year, our students set new benchmarks in SSC, HSC and University examinations across all mediums.
            </motion.p>
          </div>

          {/* ── Stat counters ── */}
          <div className="rs-stats">
            <StatCounter icon={<LuGraduationCap />} value={500} suffix="+" label="Students Taught" delay={0.2} isInView={isInView} />
            <StatCounter icon={<FiStar />} value={95} suffix="%" label="Pass Rate" delay={0.35} isInView={isInView} />
            <StatCounter icon={<PiMedalBold />} value={50} suffix="+" label="Board Toppers" delay={0.5} isInView={isInView} />
          </div>
        </div>

        {/* ── Toppers Carousel ── */}
        <motion.div
          className="rs-toppers-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="rs-toppers-label">
            <PiMedalBold className="rs-toppers-label__icon" />
            <span>2025-26 Toppers</span>
          </div>
          <div className="rs-toppers-grid">
            {toppers.map((t, i) => (
              <TopperCard key={i} topper={t} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          className="rs-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/achievements" className="rs-cta__btn">
            View All Results
            <FiArrowRight className="rs-cta__btn-arrow" />
          </Link>
        </motion.div>
      </div>

      <style>{`
        /* ═══════════════════════════════════════
           RESULTS SECTION — Dark Premium Theme
           ═══════════════════════════════════════ */

        .rs-sec {
          position: relative;
          background: linear-gradient(165deg, #0f172a 0%, #1e293b 40%, #172554 100%);
          padding: var(--gap-5xl) 0;
          overflow: hidden;
        }

        /* ── Particles ── */
        .rs-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .rs-particle {
          position: absolute;
          background: var(--gold);
          border-radius: 50%;
          opacity: 0;
          animation: rs-float linear infinite;
        }
        @keyframes rs-float {
          0%   { opacity: 0; transform: translateY(0) scale(0.5); }
          20%  { opacity: 0.6; }
          80%  { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-80px) scale(1); }
        }

        /* ── Glow Blobs ── */
        .rs-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .rs-glow--1 {
          width: 400px; height: 400px;
          background: rgba(26, 86, 219, 0.15);
          top: -100px; right: -100px;
        }
        .rs-glow--2 {
          width: 300px; height: 300px;
          background: rgba(245, 158, 11, 0.08);
          bottom: -50px; left: -50px;
        }

        .rs-sec .wrap { position: relative; z-index: 1; }

        /* ── Header Row ── */
        .rs-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 3rem;
          margin-bottom: var(--gap-3xl);
        }
        .rs-header-text { max-width: 520px; }

        .rs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: var(--gold);
          margin-bottom: 1.5rem;
        }
        .rs-eyebrow svg { font-size: 0.85rem; }

        .rs-title {
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          color: #fff;
          margin-bottom: 1.25rem;
          line-height: 1.12;
        }
        .rs-title em {
          color: var(--gold);
          font-style: normal;
          font-weight: inherit;
        }
        .rs-desc {
          color: rgba(255,255,255,0.6);
          font-size: 1rem;
          line-height: 1.7;
          max-width: 440px;
        }

        /* ── Stat Counters ── */
        .rs-stats {
          display: flex;
          gap: 1.5rem;
          flex-shrink: 0;
          padding-top: 1rem;
        }
        .rs-stat {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius);
          padding: 1.5rem 1.75rem;
          text-align: center;
          min-width: 130px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: all 0.4s var(--ease);
        }
        .rs-stat:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(245, 158, 11, 0.3);
          transform: translateY(-3px);
        }
        .rs-stat__icon {
          font-size: 1.5rem;
          color: var(--gold);
          margin-bottom: 0.75rem;
        }
        .rs-stat__value {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .rs-stat__label {
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── Toppers Section ── */
        .rs-toppers-wrap {
          margin-bottom: var(--gap-2xl);
        }
        .rs-toppers-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.5);
          margin-bottom: 1.5rem;
          padding-left: 0.25rem;
        }
        .rs-toppers-label__icon { color: var(--gold); font-size: 0.9rem; }

        .rs-toppers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }

        /* ── Topper Card ── */
        .rs-topper {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-lg);
          overflow: hidden;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.45s var(--ease);
          cursor: default;
        }
        .rs-topper:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .rs-topper__img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
        }
        .rs-topper__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 0.7s var(--ease);
        }
        .rs-topper:hover .rs-topper__img {
          transform: scale(1.06);
        }
        .rs-topper__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.85) 100%);
          pointer-events: none;
        }

        /* Rank badge */
        .rs-topper__rank {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .rs-topper__rank svg { font-size: 0.7rem; }

        /* Score badge */
        .rs-topper__score-badge {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(15,23,42,0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(245, 158, 11, 0.4);
          color: var(--gold-light);
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 800;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
        }
        .rs-topper__score-icon {
          font-size: 0.8rem;
          color: var(--gold);
        }

        /* Info area */
        .rs-topper__info {
          padding: 1.25rem 1.25rem 1.5rem;
        }
        .rs-topper__name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.4rem;
        }
        .rs-topper__meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.45);
          margin-bottom: 0.6rem;
        }
        .rs-topper__dot { font-size: 0.5rem; }
        .rs-topper__board, .rs-topper__year {
          font-weight: 600;
        }
        .rs-topper__medium {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gold);
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 0.25rem 0.55rem;
          border-radius: 4px;
        }

        /* ── CTA ── */
        .rs-cta {
          display: flex;
          justify-content: center;
          padding-top: var(--gap-lg);
        }
        .rs-cta__btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--white);
          background: var(--blue);
          padding: 1rem 2.5rem;
          border-radius: var(--radius-pill);
          text-decoration: none;
          transition: all 0.3s var(--ease);
          letter-spacing: 0.02em;
        }
        .rs-cta__btn:hover {
          background: var(--blue-dark);
          transform: translateY(-2px);
        }
        .rs-cta__btn-icon { font-size: 0.9rem; }
        .rs-cta__btn-arrow {
          font-size: 0.75rem;
          transition: transform 0.3s var(--ease);
        }
        .rs-cta__btn:hover .rs-cta__btn-arrow {
          transform: translateX(4px);
        }

        /* ── Responsive ── */
        @media (max-width: 991px) {
          .rs-header-row {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .rs-header-text { max-width: 100%; }
          .rs-desc { margin: 0 auto; }
          .rs-stats { justify-content: center; flex-wrap: wrap; }
          .rs-toppers-label { justify-content: center; width: 100%; }
          .rs-toppers-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 576px) {
          .rs-sec { padding: var(--gap-4xl) 0; }
          .rs-stats { gap: 0.75rem; }
          .rs-stat { padding: 1.1rem 1rem; min-width: 95px; }
          .rs-stat__value { font-size: 1.5rem; }
          .rs-toppers-grid { grid-template-columns: 1fr; max-width: 340px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
