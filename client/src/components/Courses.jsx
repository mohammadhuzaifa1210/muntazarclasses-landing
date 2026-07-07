import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { FaClock, FaBook, FaCalendarCheck } from 'react-icons/fa'

const programs = [
  {
    num: '01',
    title: 'School Section (5th to 10th)',
    tag: 'Regular & Private',
    desc: 'Board preparation for 5th to 10th, across all mediums.',
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
    desc: 'HSC coaching for Science and Commerce streams.',
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
    desc: 'University exam coaching across major degree disciplines.',
    details: [
      { icon: <FaClock />, label: 'Years', value: 'First (FY) · Second (SY) · Third (TY)' },
      { icon: <FaCalendarCheck />, label: 'Degrees', value: 'B.Com · BAF · BMS' },
      { icon: <FaBook />, label: 'Guidance', value: 'Exam-Oriented Strategy' }
    ]
  }
]

export default function Courses({ onEnquiryClick }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // Track the centered card in the mobile scroll-snap carousel.
  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const cards = track.children
    const center = track.scrollLeft + track.clientWidth / 2
    let best = 0, bestDist = Infinity
    for (let i = 0; i < cards.length; i++) {
      const cCenter = cards[i].offsetLeft + cards[i].offsetWidth / 2
      const d = Math.abs(cCenter - center)
      if (d < bestDist) { bestDist = d; best = i }
    }
    setActive(best)
  }, [])

  const scrollToCard = useCallback((i) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[i]
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' })
  }, [])

  const prev = () => scrollToCard(Math.max(0, active - 1))
  const next = () => scrollToCard(Math.min(programs.length - 1, active + 1))

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

          {/* Mobile carousel arrows (hidden on desktop grid) */}
          <div className="courses-nav">
            <button className="courses-arrow" onClick={prev} disabled={active === 0} aria-label="Previous program">
              <FiArrowLeft />
            </button>
            <button className="courses-arrow courses-arrow--primary" onClick={next} disabled={active === programs.length - 1} aria-label="Next program">
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="courses-list" ref={trackRef} onScroll={handleScroll}>
          {programs.map((prog, i) => (
            <motion.div
              key={i}
              className="prog-card"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
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

        {/* Mobile carousel dots (hidden on desktop grid) */}
        <div className="courses-dots">
          {programs.map((_, i) => (
            <button
              key={i}
              className={`courses-dot ${i === active ? 'active' : ''}`}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to program ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .courses-sec {
          background: var(--gray-50);
          padding: var(--gap-3xl) 0;
        }
        .courses-header {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: var(--gap-md);
          margin-bottom: var(--gap-2xl);
        }
        .courses-header__left { min-width: 0; }
        .courses-nav { flex-shrink: 0; }
        .courses-header__title {
          font-size: var(--fs-h2);
        }
        .courses-header__title em { color: var(--blue); }

        /* Mobile carousel arrows */
        .courses-nav { display: flex; gap: var(--gap-sm); }
        .courses-arrow {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid var(--border-strong);
          background: var(--white);
          color: var(--text-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .courses-arrow:disabled { opacity: 0.35; cursor: not-allowed; }
        .courses-arrow--primary {
          background: var(--blue);
          border-color: var(--blue);
          color: var(--text-white);
        }

        /* Base = phone carousel: horizontal scroll-snap track */
        .courses-list {
          display: flex;
          gap: var(--gap-md);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding: 0.5rem 7vw;
          margin: 0 -1.25rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .courses-list::-webkit-scrollbar { display: none; }

        .courses-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: var(--gap-lg);
        }
        .courses-dot {
          width: 44px; height: 44px;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .courses-dot::before {
          content: '';
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--border-strong);
          transition: all 0.3s var(--ease);
        }
        .courses-dot.active::before { background: var(--blue); width: 24px; border-radius: 99px; }

        .prog-card {
          display: flex;
          flex-direction: column;
          flex: 0 0 86vw;
          scroll-snap-align: center;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          transition: all 0.4s var(--ease);
          box-shadow: var(--shadow-sm);
        }
        .prog-card:hover {
          border-color: var(--blue);
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
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
        .prog-card__actions .btn {
          min-height: 44px;
        }

        @media (min-width: 768px) {
          /* Restore desktop grid; hide carousel affordances */
          .courses-nav, .courses-dots { display: none; }
          .courses-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            gap: var(--gap-xl);
          }
          .courses-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--gap-xl);
            overflow: visible;
            scroll-snap-type: none;
            padding: 0;
            margin: 0;
          }
          .prog-card { flex: none; scroll-snap-align: none; padding: 2rem; }
          .prog-card:hover {
            border-color: var(--blue);
            box-shadow: var(--shadow-md);
            transform: translateY(-3px);
          }
        }
        @media (min-width: 992px) {
          .courses-list { grid-template-columns: repeat(3, 1fr); }
          .prog-card { padding: 2.25rem; }
        }
        @media (min-width: 1240px) {
          .courses-sec { padding: var(--gap-5xl) 0; }
          .courses-header { margin-bottom: var(--gap-3xl); }
        }
      `}</style>
    </section>
  )
}
