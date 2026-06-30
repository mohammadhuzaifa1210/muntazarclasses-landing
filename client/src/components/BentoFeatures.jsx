import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaUserTie, FaUsers, FaBookOpen, FaQuestionCircle,
  FaSnowflake, FaGraduationCap, FaCalendarAlt, FaChalkboardTeacher
} from 'react-icons/fa'

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
})

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const num = parseInt(target)
          const duration = 2000
          const step = Math.max(1, Math.floor(num / (duration / 16)))
          let current = 0
          const timer = setInterval(() => {
            current += step
            if (current >= num) { current = num; clearInterval(timer) }
            setCount(current)
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const stats = [
  { value: '18', suffix: '+', label: 'Years of Excellence', icon: <FaCalendarAlt /> },
  { value: '3', suffix: '', label: 'Language Mediums', icon: <FaGraduationCap /> },
  { value: '200', suffix: '+', label: 'Top Board Scorers', icon: <FaChalkboardTeacher /> },
  { value: '25', suffix: '', label: 'Students Per Batch', icon: <FaUsers /> }
]

const features = [
  {
    icon: <FaUsers />,
    title: 'Hindi & Urdu Batches',
    desc: 'The only institute in Govandi offering dedicated, specialized batches for Hindi and Urdu medium students ensuring no language barrier.'
  },
  {
    icon: <FaUserTie />,
    title: 'Expert Faculty',
    desc: 'Every subject taught by M.Sc. & Ph.D. professors with 18+ years of competitive coaching experience. No assistants, no compromise.'
  },
  {
    icon: <FaBookOpen />,
    title: 'Study Halls & Archives',
    desc: 'Air-conditioned, silent reading rooms stocked with reference modules, past papers, and comprehensive competitive exam worksheets.'
  },
  {
    icon: <FaQuestionCircle />,
    title: 'Daily Doubt Sessions',
    desc: 'Private one-on-one slots with faculty every day — no question goes unanswered, no concept left unclear.'
  },
  {
    icon: <FaSnowflake />,
    title: 'Smart Classrooms',
    desc: 'Climate-controlled lecture halls with HD projectors for visualising complex formulas, molecular structures, and derivations.'
  },
  {
    icon: <FaCalendarAlt />,
    title: 'Regular Testing',
    desc: 'Frequent tests simulating exact board and university exam conditions — with detailed performance analytics after each attempt.'
  }
]

export default function BentoFeatures() {
  return (
    <section id="why-choose-us" className="bento-section">
      <div className="wrap">

        {/* Stats Row */}
        <div className="stats-strip">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="stats-strip__item"
              variants={fadeIn(i * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="stats-strip__icon">{s.icon}</div>
              <div className="stats-strip__val">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="stats-strip__label">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Section Header */}
        <div className="bento-header">
          <span className="eyebrow">Why Muntazar Classes</span>
          <h2 className="bento-header__title">
            Where Discipline Meets <em className="accent-serif">Excellence</em>
          </h2>
          <p className="bento-header__desc">
            We don't just teach — we build exam-ready scholars through structured methodology, 
            world-class infrastructure, and relentless academic support.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="feat-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feat-card"
              variants={fadeIn(i * 0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="feat-card__icon">{f.icon}</div>
              <h3 className="feat-card__title">{f.title}</h3>
              <p className="feat-card__desc">{f.desc}</p>
              <div className="feat-card__line" />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .bento-section {
          background: var(--gray-50);
          padding: var(--gap-5xl) 0 var(--gap-4xl);
        }

        /* ── Stats Strip ── */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          background: var(--blue);
          border-radius: 18px;
          overflow: hidden;
          margin-bottom: var(--gap-4xl);
        }
        .stats-strip__item {
          text-align: center;
          padding: 2.75rem 1.5rem;
          border-right: 1px solid rgba(255,255,255,0.1);
          transition: background 0.4s var(--ease);
        }
        .stats-strip__item:last-child { border-right: none; }
        .stats-strip__item:hover { background: var(--blue-dark); }
        .stats-strip__icon {
          color: rgba(255,255,255,0.7);
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }
        .stats-strip__val {
          font-family: var(--font-display);
          font-size: 2.75rem;
          font-weight: 800;
          color: var(--text-white);
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 0.4rem;
        }
        .stats-strip__label {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--text-white-70);
        }

        /* ── Header ── */
        .bento-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto var(--gap-3xl);
        }
        .bento-header .eyebrow { justify-content: center; }
        .bento-header .eyebrow::before { display: none; }
        .bento-header__title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          margin-bottom: 1rem;
        }
        .bento-header__title em { color: var(--blue); }
        .bento-header__desc {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.7;
        }

        /* ── Feature Cards ── */
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--gap-lg);
        }
        .feat-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 2.25rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s var(--ease);
        }
        .feat-card:hover {
          transform: translateY(-2px);
          border-color: var(--blue);
        }
        .feat-card__icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: var(--blue-soft);
          color: var(--blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }
        .feat-card__title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          letter-spacing: -0.01em;
          color: var(--text-dark);
        }
        .feat-card__desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.65;
        }
        .feat-card__line {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--blue), var(--blue-light));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s var(--ease);
        }
        .feat-card:hover .feat-card__line { transform: scaleX(1); }

        @media (max-width: 991px) {
          .stats-strip { grid-template-columns: repeat(2, 1fr); }
          .stats-strip__item:nth-child(2) { border-right: none; }
          .feat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .stats-strip { grid-template-columns: 1fr; }
          .stats-strip__item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 2rem 1rem; }
          .stats-strip__item:last-child { border-bottom: none; }
          .stats-strip__val { font-size: 2.25rem; }
          .feat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
