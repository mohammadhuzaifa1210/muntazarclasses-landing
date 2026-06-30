import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaClock, FaBook, FaCalendarCheck } from 'react-icons/fa'

const programs = [
  {
    num: '01',
    title: 'JEE / NEET Intensive',
    tag: 'Competitive Entrance',
    desc: 'Our flagship 2-year program designed for students targeting India\'s top engineering and medical colleges. Covers every concept from fundamentals to advanced problem-solving with weekly mock tests.',
    details: [
      { icon: <FaClock />, label: 'Duration', value: '2 Years (Class 11 & 12)' },
      { icon: <FaCalendarCheck />, label: 'Schedule', value: 'Mon–Sat · 4:00 – 8:30 PM' },
      { icon: <FaBook />, label: 'Subjects', value: 'Physics · Chemistry · Maths · Biology' }
    ]
  },
  {
    num: '02',
    title: 'Board Exam Mastery',
    tag: 'HSC · CBSE · ISC',
    desc: 'Comprehensive board preparation with emphasis on answer-writing techniques, numerical practice, and strategic chapter-wise weightage analysis. Built for students who want 90%+ board scores.',
    details: [
      { icon: <FaClock />, label: 'Duration', value: '1 or 2 Year Options' },
      { icon: <FaCalendarCheck />, label: 'Schedule', value: 'Mon–Fri · 3:00 – 7:00 PM' },
      { icon: <FaBook />, label: 'Subjects', value: 'Physics · Chemistry · Maths · English' }
    ]
  }
]

export default function Courses({ onEnquiryClick }) {
  return (
    <section id="courses" className="courses-sec">
      <div className="wrap">

        <div className="courses-header">
          <div className="courses-header__left">
            <span className="eyebrow">Academic Programs</span>
            <h2 className="courses-header__title">
              Choose Your <em className="accent-serif">Path</em>
            </h2>
          </div>
          <p className="courses-header__desc">
            Two focused programs, each meticulously designed to transform dedicated students into top rankers and high scorers.
          </p>
        </div>

        <div className="courses-list">
          {programs.map((prog, i) => (
            <motion.div
              key={i}
              className="prog-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Left: number + info */}
              <div className="prog-card__body">
                <div className="prog-card__top">
                  <span className="prog-card__num">{prog.num}</span>
                  <span className="prog-card__tag">{prog.tag}</span>
                </div>

                <h3 className="prog-card__title">{prog.title}</h3>
                <p className="prog-card__desc">{prog.desc}</p>

                <div className="prog-card__details">
                  {prog.details.map((d, j) => (
                    <div key={j} className="prog-card__detail">
                      <span className="prog-card__detail-icon">{d.icon}</span>
                      <div>
                        <span className="prog-card__detail-label">{d.label}</span>
                        <span className="prog-card__detail-value">{d.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: CTA */}
              <div className="prog-card__actions">
                <button onClick={() => onEnquiryClick(prog.title)} className="btn btn--blue">
                  Enquire Now <FiArrowUpRight />
                </button>
                <button onClick={() => onEnquiryClick(prog.title)} className="btn btn--outline btn--sm">
                  Download Syllabus
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .courses-sec {
          background: var(--white);
          padding: var(--gap-5xl) 0;
        }
        .courses-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: var(--gap-3xl);
        }
        .courses-header__title {
          font-size: clamp(2rem, 4vw, 2.75rem);
        }
        .courses-header__title em { color: var(--blue); }
        .courses-header__desc {
          max-width: 400px;
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.65;
          text-align: right;
        }
        .courses-list {
          display: flex;
          flex-direction: column;
          gap: var(--gap-xl);
        }
        .prog-card {
          display: flex;
          align-items: stretch;
          gap: var(--gap-2xl);
          background: var(--gray-50);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 2.75rem;
          transition: all 0.4s var(--ease);
        }
        .prog-card:hover {
          border-color: var(--blue);
          box-shadow: 0 12px 48px rgba(26,86,219,0.06);
        }
        .prog-card__body { flex: 1; }
        .prog-card__top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .prog-card__num {
          font-family: var(--font-display);
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--blue);
          opacity: 0.15;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .prog-card__tag {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--blue);
          background: var(--blue-soft);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-pill);
        }
        .prog-card__title {
          font-size: 1.65rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }
        .prog-card__desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 1.75rem;
          max-width: 560px;
        }
        .prog-card__details {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .prog-card__detail {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
        }
        .prog-card__detail-icon {
          color: var(--blue);
          font-size: 0.85rem;
          margin-top: 2px;
        }
        .prog-card__detail-label {
          display: block;
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-faint);
        }
        .prog-card__detail-value {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        .prog-card__actions {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.75rem;
          min-width: 180px;
        }
        @media (max-width: 768px) {
          .courses-header { flex-direction: column; align-items: flex-start; }
          .courses-header__desc { text-align: left; max-width: 100%; }
          .prog-card { flex-direction: column; padding: 2rem; }
          .prog-card__actions { flex-direction: row; min-width: auto; flex-wrap: wrap; }
          .prog-card__actions .btn { flex: 1; }
          .prog-card__details { flex-direction: column; gap: 1rem; }
        }
      `}</style>
    </section>
  )
}
