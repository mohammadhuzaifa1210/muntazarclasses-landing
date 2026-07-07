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
                      <motion.div key={si} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (si % 4) * 0.08, duration: 0.5 }}>
                        <div className="ap-student" onClick={() => onStudentClick(s)}>
                          <div className="ap-student__avatar-wrap">
                            <img src={s.image} alt={s.name} className="ap-student__avatar" loading="lazy" />
                          </div>
                          
                          <div className="ap-student__info-center">
                            <h4 className="ap-student__name">{s.name}</h4>
                            <div className="ap-student__score">
                              <FiAward className="ap-student__score-icon" />
                              {s.score}
                            </div>
                            {s.subject && <div className="ap-student__subject">{s.subject}</div>}
                          </div>
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
          <Link to="/#achievements" className="ap-back"><FiArrowLeft /> Back to Home</Link>
          
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
        .ap-header { padding-top: 100px; padding-bottom: 2rem; }
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
          display: inline-flex; align-items: center; justify-content: center;
          flex: 1 1 auto; min-height: 44px; white-space: nowrap;
          font-family: var(--font-display); font-size: 0.82rem; font-weight: 500;
          padding: 0.6rem 1.25rem; border-radius: var(--radius-pill); border: none;
          background: transparent; color: var(--text-muted); cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .ap-filter-btn:hover { color: var(--blue); }
        .ap-filter-btn--active {
          background: var(--blue); color: #fff; font-weight: 600;
        }

        /* ── Results Container ── */
        .ap-results { padding-top: 1.5rem; padding-bottom: 5rem; display: flex; flex-direction: column; gap: 1.5rem; }

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

        /* ── Student Cards Grid — always 4 per row ── */
        .ap-students-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin: 0;
        }
        .ap-student {
          background: var(--white);
          border-radius: var(--radius);
          padding: 0.75rem 0.35rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 1px solid var(--border);
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .ap-student:hover {
          transform: translateY(-4px);
          border-color: rgba(26,86,219,0.3);
          box-shadow: 0 10px 25px rgba(26,86,219,0.08);
        }
        
        .ap-student__avatar-wrap {
          position: relative;
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          margin-bottom: 0.5rem;
        }
        
        .ap-student__avatar {
          width: 100%; height: 100%; object-fit: cover; object-position: top;
          border-radius: 50%; border: 2px solid var(--white);
          box-shadow: 0 0 0 1.5px rgba(26,86,219,0.2), 0 4px 10px rgba(0,0,0,0.08);
          transition: transform 0.5s;
        }
        .ap-student:hover .ap-student__avatar { transform: scale(1.05); box-shadow: 0 0 0 2px var(--blue), 0 8px 18px rgba(26,86,219,0.2); }

        .ap-student__info-center {
          display: flex; flex-direction: column; align-items: center; width: 100%;
        }
        .ap-student__name {
          font-size: 0.62rem; font-weight: 700; color: var(--text-dark); line-height: 1.2; margin-bottom: 0.2rem;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%;
        }
        
        .ap-student__score {
          display: flex; align-items: center; justify-content: center; gap: 0.15rem;
          font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; color: var(--gold-dark);
          line-height: 1; margin-bottom: 0.25rem;
        }
        .ap-student__score-icon { font-size: 0.65rem; color: var(--gold); }

        .ap-student__subject {
          font-size: 0.55rem; color: var(--text-muted); background: var(--gray-100);
          padding: 0.15rem 0.4rem; border-radius: var(--radius-pill); font-weight: 600;
        }

        /* ── Empty State ── */
        .ap-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 2.5rem; color: var(--text-faint); gap: 0.5rem;
          border: 2px dashed var(--border); border-radius: var(--radius); background: var(--gray-50);
          grid-column: 1 / -1;
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

        /* ── Responsive — scale up sizes on larger screens ── */
        @media (min-width: 480px) {
          .ap-students-grid { gap: 0.75rem; }
          .ap-student { padding: 1rem 0.5rem; }
          .ap-student__avatar-wrap { width: 72px; height: 72px; }
          .ap-student__name { font-size: 0.72rem; }
          .ap-student__score { font-size: 1rem; }
          .ap-student__score-icon { font-size: 0.75rem; }
          .ap-filter-btn { padding: 0.6rem 1.25rem; font-size: 0.82rem; }
          .ap-results { padding-top: 2rem; padding-bottom: 5rem; }
        }
        @media (min-width: 768px) {
          .ap-students-grid { gap: 1.25rem; }
          .ap-student { padding: 1.5rem 0.75rem; border-radius: var(--radius-xl); }
          .ap-student__avatar-wrap { width: 100px; height: 100px; margin-bottom: 0.75rem; }
          .ap-student__avatar { border-width: 3px; }
          .ap-student__name { font-size: 0.95rem; white-space: normal; }
          .ap-student__score { font-size: 1.4rem; gap: 0.25rem; margin-bottom: 0.5rem; }
          .ap-student__score-icon { font-size: 1rem; }
          .ap-student__subject { font-size: 0.7rem; }
          .ap-year__header { padding: 1.25rem 1.75rem; }
          .ap-year__body { padding: 0 1.75rem 1.75rem; }
          .ap-year__title { font-size: 1.15rem; }
          .ap-results { padding-top: 2.5rem; padding-bottom: 5rem; }
        }
        @media (min-width: 992px) {
          .ap-student { padding: 2rem 1rem; }
          .ap-student__avatar-wrap { width: 120px; height: 120px; margin-bottom: 1rem; }
          .ap-student__name { font-size: 1.1rem; }
          .ap-student__score { font-size: 1.75rem; gap: 0.3rem; margin-bottom: 0.75rem; }
          .ap-student__score-icon { font-size: 1.25rem; }
        }
      `}</style>
    </>
  )
}
