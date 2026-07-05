import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiAward, FiChevronDown, FiChevronUp, FiArrowUp, FiX } from 'react-icons/fi'
import { LuGraduationCap } from 'react-icons/lu'
import { PiMedalBold } from 'react-icons/pi'
import Navbar from './Navbar'

/* ═══════════════════════════════════════════
   RESULTS DATA — Organized by Year > Board > Medium
   ═══════════════════════════════════════════ */
const resultsData = [
  {
    year: '2025-26', board: 'SSC', label: 'SSC 2025-26 Results',
    mediums: [
      {
        medium: 'English Medium',
        students: [
          { name: 'Anam Patni', score: '88.40%', image: '/SSC EM Results 2025-26/Anam Patni 88.40.jpeg' },
          { name: 'Sayyed Mohd Mehdi', score: '83.20%', image: '/SSC EM Results 2025-26/Sayyed Mohd Mehdi 83.20.jpeg' },
        ]
      },
      { medium: 'Urdu Medium', students: [] }
    ]
  },
  {
    year: '2025-26', board: 'HSC', label: 'HSC 2025-26 Results',
    mediums: [
      { medium: 'English Medium', students: [] },
      { medium: 'Urdu Medium', students: [] }
    ]
  },
  {
    year: '2025-26', board: 'University', label: 'University 2025-26 Results',
    mediums: [{ medium: 'All Programs', students: [] }]
  },
  {
    year: '2024-25', board: 'SSC', label: 'SSC 2024-25 Results',
    mediums: [
      { medium: 'English Medium', students: [] },
      { medium: 'Urdu Medium', students: [] }
    ]
  },
  {
    year: '2024-25', board: 'HSC', label: 'HSC 2024-25 Results',
    mediums: [
      { medium: 'English Medium', students: [] },
      { medium: 'Urdu Medium', students: [] }
    ]
  },
  {
    year: '2023-24', board: 'SSC', label: 'SSC 2023-24 Results',
    mediums: [
      { medium: 'English Medium', students: [] },
      { medium: 'Urdu Medium', students: [] }
    ]
  },
  {
    year: '2023-24', board: 'HSC', label: 'HSC 2023-24 Results',
    mediums: [
      { medium: 'English Medium', students: [] },
      { medium: 'Urdu Medium', students: [] }
    ]
  },
]

const filters = ['All', 'SSC', 'HSC', 'University']

/* ── Lightbox Component ── */
function Lightbox({ student, onClose }) {
  if (!student) return null
  return (
    <AnimatePresence>
      <motion.div className="ap-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div className="ap-lightbox__card" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} onClick={e => e.stopPropagation()}>
          <button className="ap-lightbox__close" onClick={onClose}><FiX /></button>
          <img src={student.image} alt={student.name} className="ap-lightbox__img" />
          <div className="ap-lightbox__info">
            <h3>{student.name}</h3>
            <div className="ap-lightbox__score"><FiAward /> {student.score}</div>
            {student.subject && <p>{student.subject}</p>}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Year Section (Accordion) ── */
function YearSection({ section, defaultOpen, onStudentClick }) {
  const [open, setOpen] = useState(defaultOpen)
  const hasStudents = section.mediums.some(m => m.students.length > 0)
  const boardIcon = section.board === 'University' ? <LuGraduationCap /> : <PiMedalBold />

  return (
    <div className={`ap-year ${open ? 'ap-year--open' : ''}`}>
      <button className="ap-year__header" onClick={() => setOpen(!open)}>
        <div className="ap-year__header-left">
          <span className="ap-year__icon">{boardIcon}</span>
          <h2 className="ap-year__title">{section.label}</h2>
          {hasStudents && <span className="ap-year__count">{section.mediums.reduce((a, m) => a + m.students.length, 0)} students</span>}
        </div>
        <span className="ap-year__toggle">{open ? <FiChevronUp /> : <FiChevronDown />}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="ap-year__body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            {section.mediums.map((med, mi) => (
              <div key={mi} className="ap-medium">
                <div className="ap-medium__header">
                  <div className="ap-medium__bar" />
                  <h3 className="ap-medium__title">{med.medium}</h3>
                </div>
                {med.students.length > 0 ? (
                  <div className="ap-students-grid">
                    {med.students.map((s, si) => (
                      <motion.div key={si} className="ap-student" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (si % 4) * 0.08, duration: 0.5 }} whileHover={{ y: -4 }} onClick={() => onStudentClick(s)}>
                        <div className="ap-student__img-wrap">
                          <img src={s.image} alt={s.name} className="ap-student__img" loading="lazy" />
                          <div className="ap-student__overlay" />
                          <div className="ap-student__score"><FiAward /> {s.score}</div>
                        </div>
                        <div className="ap-student__info">
                          <h4 className="ap-student__name">{s.name}</h4>
                          {s.subject && <span className="ap-student__subject">{s.subject}</span>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="ap-empty">
                    <LuGraduationCap className="ap-empty__icon" />
                    <p>Results coming soon</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AchievementPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxStudent, setLightboxStudent] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filtered = activeFilter === 'All' ? resultsData : resultsData.filter(s => s.board === activeFilter)

  return (
    <>
      <Navbar />
      <main className="ap-page">
        {/* ── Header & Filters ── */}
        <section className="ap-header wrap">
          <Link to="/" className="ap-back"><FiArrowLeft /> Back to Home</Link>
          
          <div className="ap-filter-row">
            {filters.map(f => (
              <button key={f} className={`ap-filter-btn ${activeFilter === f ? 'ap-filter-btn--active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
            ))}
          </div>
        </section>

        {/* ── Results Sections ── */}
        <section className="ap-results wrap">
          {filtered.length === 0 ? (
            <div className="ap-empty ap-empty--full"><LuGraduationCap className="ap-empty__icon" /><p>No results found for this filter.</p></div>
          ) : (
            filtered.map((section, i) => (
              <YearSection key={`${section.board}-${section.year}`} section={section} defaultOpen={i === 0} onStudentClick={setLightboxStudent} />
            ))
          )}
        </section>

        {/* ── Scroll to top ── */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button className="ap-scroll-top" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FiArrowUp /></motion.button>
          )}
        </AnimatePresence>

        {/* ── Lightbox ── */}
        <Lightbox student={lightboxStudent} onClose={() => setLightboxStudent(null)} />
      </main>

      <style>{`
        .ap-page { background: var(--gray-50); min-height: 100vh; }

        /* ── Header ── */
        .ap-header { padding: 100px 0 2rem; }
        .ap-back {
          display: inline-flex; align-items: center; gap: 0.4rem; color: var(--text-muted);
          text-decoration: none; font-weight: 600; font-size: 0.88rem; margin-bottom: 2rem;
          transition: color 0.2s;
        }
        .ap-back:hover { color: var(--blue); }

        /* ── Filters ── */
        .ap-filter-row {
          display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;
          background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-pill);
          padding: 0.35rem; max-width: 500px; margin: 0 auto;
        }
        .ap-filter-btn {
          font-family: var(--font-display); font-size: 0.82rem; font-weight: 500;
          padding: 0.6rem 1.5rem; border-radius: var(--radius-pill); border: none;
          background: transparent; color: var(--text-muted); cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .ap-filter-btn:hover { color: var(--blue); }
        .ap-filter-btn--active {
          background: var(--blue); color: #fff; font-weight: 600;
        }

        /* ── Results Container ── */
        .ap-results { padding: 2.5rem 2rem 5rem; display: flex; flex-direction: column; gap: 1.5rem; }

        /* ── Year Accordion ── */
        .ap-year {
          background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg);
          overflow: hidden; transition: border-color 0.3s;
        }
        .ap-year--open { border-color: rgba(26,86,219,0.2); }
        .ap-year__header {
          display: flex; align-items: center; justify-content: space-between; width: 100%;
          padding: 1.25rem 1.75rem; border: none; background: none; cursor: pointer;
          transition: background 0.2s;
        }
        .ap-year__header:hover { background: var(--gray-50); }
        .ap-year__header-left { display: flex; align-items: center; gap: 0.75rem; }
        .ap-year__icon {
          display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;
          background: var(--gold-soft); color: var(--gold-dark); border-radius: 10px; font-size: 1.1rem;
        }
        .ap-year__title {
          font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--text-dark);
        }
        .ap-year__count {
          font-size: 0.72rem; font-weight: 600; color: var(--blue); background: var(--blue-soft);
          padding: 0.2rem 0.6rem; border-radius: var(--radius-pill);
        }
        .ap-year__toggle { color: var(--text-muted); font-size: 0.8rem; }
        .ap-year__body { padding: 0 1.75rem 1.75rem; overflow: hidden; }

        /* ── Medium Sub-section ── */
        .ap-medium { margin-bottom: 2rem; }
        .ap-medium:last-child { margin-bottom: 0; }
        .ap-medium__header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
        .ap-medium__bar { width: 4px; height: 22px; background: linear-gradient(180deg, var(--gold), var(--gold-dark)); border-radius: 4px; }
        .ap-medium__title {
          font-family: var(--font-display); font-size: 0.95rem; font-weight: 700;
          color: var(--text-dark); letter-spacing: 0.01em;
        }

        /* ── Student Cards Grid ── */
        .ap-students-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;
        }
        .ap-student {
          background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-sm);
          overflow: hidden; cursor: pointer; transition: all 0.3s var(--ease);
        }
        .ap-student:hover {
          border-color: var(--border-strong); transform: translateY(-2px);
        }
        .ap-student__img-wrap {
          position: relative; aspect-ratio: 3/4; overflow: hidden; background: var(--gray-200);
        }
        .ap-student__img {
          width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.6s var(--ease);
        }
        .ap-student:hover .ap-student__img { transform: scale(1.05); }
        .ap-student__overlay {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, transparent 55%, rgba(15,23,42,0.7) 100%);
        }
        .ap-student__score {
          position: absolute; bottom: 0.6rem; right: 0.6rem;
          display: flex; align-items: center; gap: 0.3rem;
          background: rgba(15,23,42,0.7); backdrop-filter: blur(8px);
          border: 1px solid rgba(245,158,11,0.4); color: var(--gold-light);
          font-family: var(--font-display); font-size: 0.82rem; font-weight: 800;
          padding: 0.3rem 0.6rem; border-radius: 6px;
        }
        .ap-student__score svg { font-size: 0.65rem; color: var(--gold); }
        .ap-student__info { padding: 1rem; text-align: center; border-top: 2px solid var(--gold); }
        .ap-student__name { font-size: 0.95rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.2rem; }
        .ap-student__subject {
          display: inline-block; font-size: 0.72rem; font-weight: 600; color: var(--blue-dark);
          background: var(--blue-soft); padding: 0.2rem 0.5rem; border-radius: 4px;
        }

        /* ── Empty State ── */
        .ap-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 2.5rem; color: var(--text-faint); gap: 0.5rem;
          border: 2px dashed var(--border); border-radius: var(--radius); background: var(--gray-50);
        }
        .ap-empty--full { padding: 5rem; }
        .ap-empty__icon { font-size: 2rem; opacity: 0.4; }
        .ap-empty p { font-size: 0.88rem; font-weight: 600; }

        /* ── Scroll to top ── */
        .ap-scroll-top {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 50;
          width: 44px; height: 44px; border-radius: 50%; border: none;
          background: var(--blue);
          color: var(--white); font-size: 1.1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s;
        }
        .ap-scroll-top:hover { background: var(--blue-dark); }

        /* ── Lightbox ── */
        .ap-lightbox {
          position: fixed; inset: 0; z-index: 100; background: rgba(15,23,42,0.85);
          backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center;
          padding: 2rem;
        }
        .ap-lightbox__card {
          position: relative; background: var(--white); border-radius: var(--radius-sm);
          overflow: hidden; max-width: 420px; width: 100%;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .ap-lightbox__close {
          position: absolute; top: 0.75rem; right: 0.75rem; z-index: 2;
          width: 36px; height: 36px; border-radius: 50%; border: none;
          background: rgba(15,23,42,0.6); color: #fff; font-size: 0.85rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .ap-lightbox__close:hover { background: rgba(15,23,42,0.85); }
        .ap-lightbox__img { width: 100%; aspect-ratio: 3/4; object-fit: cover; object-position: top; }
        .ap-lightbox__info { padding: 1.5rem; text-align: center; }
        .ap-lightbox__info h3 { font-size: 1.25rem; margin-bottom: 0.5rem; }
        .ap-lightbox__score {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: var(--font-display); font-size: 1.1rem; font-weight: 800;
          color: var(--gold-dark); background: var(--gold-soft);
          padding: 0.4rem 1rem; border-radius: var(--radius-pill);
        }
        .ap-lightbox__info p { margin-top: 0.5rem; color: var(--text-muted); font-size: 0.9rem; }

        /* ── Responsive ── */
        @media (max-width: 991px) {
          .ap-students-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .ap-students-grid { grid-template-columns: repeat(2, 1fr); }
          .ap-year__header { padding: 1rem 1.25rem; }
          .ap-year__body { padding: 0 1.25rem 1.25rem; }
          .ap-year__title { font-size: 1rem; }
        }
        @media (max-width: 576px) {
          .ap-students-grid { grid-template-columns: 1fr; max-width: 320px; margin: 0 auto; }
          .ap-hero { padding: 100px 0 50px; }
          .ap-filter-btn { padding: 0.5rem 1rem; font-size: 0.75rem; }
        }
      `}</style>
    </>
  )
}
