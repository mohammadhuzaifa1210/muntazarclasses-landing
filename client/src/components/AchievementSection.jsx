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
  },
  {
    name: 'Khan Nasreen',
    score: '83.00%',
    board: 'SSC',
    medium: 'English Medium',
    year: '2025-26',
    image: '/SSC EM Results 2025-26/Khan Nasreen 83.00.jpeg',
    rank: 3
  },
  {
    name: 'Shaikh Arshin',
    score: '81.00%',
    board: 'SSC',
    medium: 'English Medium',
    year: '2025-26',
    image: '/SSC EM Results 2025-26/Shaikh Arshin 81.00.jpeg'
  },
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

function StatCounter({ value, suffix = '', label, delay, isInView }) {
  const count = useCounter(value, 2000, isInView)
  return (
    <motion.div
      className="rs-stat"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
    >
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
      <div className="rs-topper__avatar-wrap">
        <img src={topper.image} alt={topper.name} className="rs-topper__avatar" loading="lazy" />
        
        {rank && (
          <div className="rs-topper__medallion" style={{ background: rank.bg }}>
            <PiMedalBold />
            <span>{rank.label}</span>
          </div>
        )}
      </div>

      <div className="rs-topper__info-center">
        <h3 className="rs-topper__name">{topper.name}</h3>
        
        <div className="rs-topper__score">
          <FiAward className="rs-topper__score-icon" />
          {topper.score}
        </div>
        
        <div className="rs-topper__meta">
          <span>{topper.board}</span>
          <span className="rs-topper__dot">•</span>
          <span>{topper.year}</span>
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
      {/* Soft decorative glow */}
      <div className="rs-glow rs-glow--1" />

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

          </div>

          {/* ── Stat counters ── */}
          <div className="rs-stats">
            <StatCounter value={500} suffix="+" label="Students Taught" delay={0.2} isInView={isInView} />
            <StatCounter value={95} suffix="%" label="Pass Rate" delay={0.35} isInView={isInView} />
            <StatCounter value={50} suffix="+" label="Board Toppers" delay={0.5} isInView={isInView} />
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
           RESULTS SECTION — Light Blue Theme
           ═══════════════════════════════════════ */

        .rs-sec {
          position: relative;
          background: var(--gray-50);
          padding: var(--gap-5xl) 0;
          overflow: hidden;
        }

        /* ── Soft glow ── */
        .rs-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(110px);
          pointer-events: none;
          z-index: 0;
        }
        .rs-glow--1 {
          width: 420px; height: 420px;
          background: var(--blue-glow);
          top: -120px; right: -120px;
        }

        .rs-sec .wrap { position: relative; z-index: 1; }

        /* ── Header Row — mobile-first: stacked on phone ── */
        .rs-header-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--gap-xl);
          margin-bottom: var(--gap-2xl);
        }
        .rs-header-text { max-width: 100%; }

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
          font-size: clamp(1.2rem, 6vw, 3.2rem);
          color: var(--text-dark);
          margin-bottom: 1.25rem;
          line-height: 1.12;
          white-space: nowrap;
        }
        .rs-title em {
          color: var(--gold-dark);
          font-style: normal;
          font-weight: inherit;
        }
        .rs-desc {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.7;
          max-width: 440px;
          margin: 0 auto;
        }

        /* ── Stat Counters — mobile: all three in one row ── */
        .rs-stats {
          display: flex;
          gap: 0.5rem;
          width: 100%;
          justify-content: center;
          flex-shrink: 0;
          padding-top: 0;
        }
         .rs-stat {
          flex: 1 1 0;
          min-width: 0;
          background: transparent;
          border: none;
          padding: 0.5rem 0.25rem;
          text-align: center;
          transition: all 0.4s var(--ease);
        }
        .rs-stat:hover {
          transform: translateY(-2px);
        }
        .rs-stat__value {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-dark);
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .rs-stat__label {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
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
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          padding-left: 0.25rem;
        }
        .rs-toppers-label__icon { color: var(--gold); font-size: 0.9rem; }

        /* Toppers: horizontal swipeable on phone by default */
        .rs-toppers-grid {
          display: flex;
          flex-wrap: nowrap;
          justify-content: flex-start;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 1rem;
          margin: 0 -1.25rem;
          padding: 0.25rem 1.25rem 0.5rem;
          scrollbar-width: none;
        }
        .rs-toppers-grid::-webkit-scrollbar { display: none; }

        /* ── Topper Card — phone: snap-scrollable card ── */
        .rs-topper {
          flex: 0 0 72vw;
          max-width: 260px;
          scroll-snap-align: center;
          background: var(--white);
          border-radius: var(--radius-xl);
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 1px solid var(--border);
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: all 0.4s var(--ease);
          cursor: default;
        }
        .rs-topper:hover {
          transform: translateY(-6px);
          border-color: rgba(26,86,219,0.3); /* Brand blue border on hover */
          box-shadow: 0 15px 40px rgba(26,86,219,0.08);
        }

        .rs-topper__avatar-wrap {
          position: relative;
          width: 150px;
          height: 150px;
          flex-shrink: 0;
          margin-bottom: 1.5rem;
          border-radius: 50%;
          border: 4px solid var(--white);
          box-shadow: 0 0 0 2px var(--gold), 0 15px 30px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.5s var(--ease), box-shadow 0.3s var(--ease);
        }
        .rs-topper:hover .rs-topper__avatar-wrap {
          transform: scale(1.05);
          box-shadow: 0 0 0 2px var(--blue), 0 15px 30px rgba(26,86,219,0.15);
        }
        .rs-topper__avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          aspect-ratio: 1 / 1;
          display: block;
        }

        /* ── Rank Medallion (Circular badge on edge of photo) ── */
        .rs-topper__medallion {
          position: absolute;
          bottom: 5px;
          right: 0;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 800;
          line-height: 1.1;
          border: 3px solid var(--white);
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          z-index: 2;
        }
        .rs-topper__medallion svg { font-size: 0.8rem; margin-bottom: -2px; }

        .rs-topper__info-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .rs-topper__name {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.5rem;
        }

        .rs-topper__score {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--gold-dark);
          margin-bottom: 1.2rem;
          line-height: 1;
        }
        .rs-topper__score-icon { font-size: 1.6rem; color: var(--gold); }

        .rs-topper__meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .rs-topper__dot { font-size: 0.4rem; }

        .rs-topper__medium {
          padding: 0.4rem 0.85rem;
          background: var(--blue-soft);
          color: var(--blue-dark);
          border-radius: var(--radius-pill);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
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

        /* ── Responsive — mobile-first, scale up ── */
        .rs-toppers-label { justify-content: center; width: 100%; }

         @media (min-width: 480px) {
          .rs-sec { padding: var(--gap-4xl) 0; }
          .rs-stat { padding: 0.75rem 0.5rem; }
          .rs-stat__value { font-size: 2rem; }
          .rs-stat__label { font-size: 0.65rem; }
          .rs-topper { flex: 0 0 62vw; }
        }

        @media (min-width: 768px) {
          .rs-sec { padding: var(--gap-5xl) 0; }
          /* Stats: grid layout with 3 equal fractional columns */
          .rs-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.25rem;
            width: 100%;
            max-width: 480px;
            margin: 0 auto;
          }
          .rs-stat {
            flex: none;
            width: 100%;
            padding: 1rem 0.5rem;
          }
          .rs-stat__value { font-size: 2.5rem; }
          .rs-stat__label { font-size: 0.72rem; }
          /* Toppers: multi-card wrap on tablet */
          .rs-toppers-grid {
            flex-wrap: wrap;
            overflow-x: visible;
            scroll-snap-type: none;
            gap: 1.5rem;
            margin: 0;
            padding: 0;
            justify-content: center;
          }
          .rs-topper {
            flex: none;
            width: 240px;
            scroll-snap-align: none;
          }
        }

        @media (min-width: 992px) {
          /* Header row back to side-by-side */
          .rs-header-row {
            flex-direction: row;
            align-items: flex-start;
            text-align: left;
            gap: 3rem;
            margin-bottom: var(--gap-3xl);
          }
          .rs-header-text { max-width: 640px; }
          .rs-desc { margin: 0; }
          .rs-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            width: 100%;
            max-width: 520px;
            flex-shrink: 0;
            padding-top: 1rem;
            margin: 0;
          }
          .rs-stat { width: 100%; padding: 1.25rem 0.5rem; }
          /* Topper card back to fixed width */
          .rs-topper { width: 270px; }
          .rs-title { white-space: nowrap; }
          .rs-toppers-label { justify-content: flex-start; width: auto; }
          .rs-topper:hover {
            border-color: rgba(26,86,219,0.3);
            box-shadow: 0 15px 40px rgba(26,86,219,0.08);
          }
        }
      `}</style>
    </section>
  )
}
