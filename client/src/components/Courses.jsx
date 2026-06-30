import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaClock, FaBook, FaCalendarCheck } from 'react-icons/fa'

const programs = [
  {
    num: '01',
    title: 'School Section (5th to 10th)',
    tag: 'Regular & Private',
    desc: 'Foundational education and comprehensive board preparation for 5th to 10th standard across all mediums.',
    details: [
      { icon: <FaClock />, label: 'Batches', value: 'Hindi · Urdu · English Medium' },
      { icon: <FaCalendarCheck />, label: 'Classes', value: '5th to 9th · 10th Board' },
      { icon: <FaBook />, label: 'Syllabus', value: 'All Subjects Covered' }
    ]
  },
  {
    num: '02',
    title: 'College Section (11th & 12th)',
    tag: 'Commerce & Science',
    desc: 'Specialised coaching for junior college students in Commerce and Science streams, focusing on HSC excellence.',
    details: [
      { icon: <FaClock />, label: 'Streams', value: 'Science & Commerce' },
      { icon: <FaCalendarCheck />, label: 'Classes', value: '11th FYJC · 12th SYJC' },
      { icon: <FaBook />, label: 'Focus', value: 'HSC Board Exams (Regular & Private)' }
    ]
  },
  {
    num: '03',
    title: 'Degree Section',
    tag: 'University Exams',
    desc: 'Advanced coaching for undergraduate students pursuing university degrees across multiple disciplines.',
    details: [
      { icon: <FaClock />, label: 'Years', value: 'First (FY) · Second (SY) · Third (TY)' },
      { icon: <FaCalendarCheck />, label: 'Degrees', value: 'B.Com · BAF · BMS' },
      { icon: <FaBook />, label: 'Guidance', value: 'Exam-Oriented Strategy' }
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
              <div className="prog-card__main">
                <div className="prog-card__top">
                  <span className="prog-card__num">{prog.num}</span>
                  <span className="prog-card__tag">{prog.tag}</span>
                </div>
                <h3 className="prog-card__title">{prog.title}</h3>
                <p className="prog-card__desc">{prog.desc}</p>
              </div>

              <div className="prog-card__footer">
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

                <div className="prog-card__actions">
                  <button onClick={() => onEnquiryClick(prog.title)} className="btn btn--blue" style={{ width: '100%' }}>
                    Enquire Now <FiArrowUpRight />
                  </button>
                </div>
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
        .courses-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--gap-xl);
        }
        .prog-card {
          display: flex;
          flex-direction: column;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 2.25rem;
          transition: all 0.4s var(--ease);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .prog-card:hover {
          border-color: var(--blue);
        }
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
        .prog-card__main {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .prog-card__desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .prog-card__footer {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border);
          padding-top: 2rem;
          gap: 2rem;
          margin-top: auto;
        }
        .prog-card__details {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
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
          margin-top: auto;
        }
        @media (max-width: 1024px) {
          .courses-list { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .courses-header { flex-direction: column; align-items: flex-start; }
          .courses-list { grid-template-columns: 1fr; }
          .prog-card { padding: 2rem; }
        }
      `}</style>
    </section>
  )
}
