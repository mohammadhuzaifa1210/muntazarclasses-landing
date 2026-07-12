import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiAward, FiChevronDown, FiChevronUp, FiArrowUp, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { LuGraduationCap } from 'react-icons/lu'
import Navbar from './Navbar'

/* ═══════════════════════════════════════════
   RESULTS DATA — Organized by Year > Board
   ═══════════════════════════════════════════ */
const resultsData = [
  {
    year: '2025-26', board: 'SSC', label: 'SSC 2025-26 Results',
    students: [
      { name: 'Anam Patni', score: '88.40%', school: '1st in Citizen English School', image: '/SSC EM Results 2025-26/Anam Patni 88.40.jpeg' },
      { name: 'Sayed Nuzail Abbas', score: '86.80%', school: 'Shri Gita Vidyalay', image: '/SSC EM Results 2025-26/Sayed Nuzail Abbas 86.80.jpeg', objectPosition: '50% 20%' },
      { name: 'Sayyed Mohd Mehdi', score: '83.20%', school: 'Jafri English School', image: '/SSC EM Results 2025-26/Sayyed Mohd Mehdi 83.20.jpeg' },
      { name: 'Khan Nasreen', score: '83.00%', school: 'VK English School', image: '/SSC EM Results 2025-26/Khan Nasreen 83.00.jpeg' },
      { name: 'Shaikh Arshin', score: '81.00%', school: 'Al Amaan English School', image: '/SSC EM Results 2025-26/Shaikh Arshin 81.00.jpeg' },
      { name: 'Ansari Muskan', score: '79.60%', school: '1st in Ruby English School', image: '/SSC EM Results 2025-26/Ansari Muskan 79.60.jpeg' },
      { name: 'Khan Merajuddin', score: '78.80%', school: '1st in All Sense English School', image: '/SSC EM Results 2025-26/Khan Merajuddin 78.80.jpeg' },
      { name: 'Qureshi Mahesaba', score: '75.60%', school: '4th in VK English School', image: '/SSC EM Results 2025-26/Qureshi Mahesaba 75.60.jpeg' },
      { name: 'Sayed Yasmeen', score: '74.60%', school: 'Ruby English School', image: '/SSC EM Results 2025-26/Sayed Yasmeen 74.60.jpeg' }
    ]
  },
  {
    year: '2025-26', board: 'HSC', label: 'HSC 2025-26 Results',
    students: []
  },
  {
    year: '2025-26', board: 'University', label: 'University 2025-26 Results',
    students: []
  },
  {
    year: '2024-25', board: 'SSC', label: 'SSC 2024-25 Results',
    students: []
  },
  {
    year: '2024-25', board: 'HSC', label: 'HSC 2024-25 Results',
    students: []
  },
  {
    year: '2023-24', board: 'SSC', label: 'SSC 2023-24 Results',
    students: []
  },
  {
    year: '2023-24', board: 'HSC', label: 'HSC 2023-24 Results',
    students: []
  }
]

const filters = ['All', 'SSC', 'HSC', 'University']

/* ── Lightbox Component ── */
function Lightbox({ activeIndex, allStudents, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e) => {
      if (activeIndex === null) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev(e)
      if (e.key === 'ArrowRight') onNext(e)
    }
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, onClose, onPrev, onNext])

  if (activeIndex === null || !allStudents[activeIndex]) return null
  const student = allStudents[activeIndex]

  return (
    <AnimatePresence>
      <motion.div className="ap-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        
        <div className="ap-lightbox__wrapper">
          {/* Left Arrow */}
          <button className="ap-lightbox__nav ap-lightbox__nav--prev" onClick={onPrev}>
            <FiChevronLeft />
          </button>

          <motion.div className="ap-lightbox__card" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} onClick={e => e.stopPropagation()}>
            <button className="ap-lightbox__close" onClick={onClose}><FiX /></button>
            
            {/* Use AnimatePresence for smooth slide transitions within the card */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <img src={student.image} alt={student.name} className="ap-lightbox__img" />
                <div className="ap-lightbox__info">
                  <h3>{student.name}</h3>
                  <div className="ap-lightbox__score"><FiAward /> {student.score}</div>
                  {student.school && <p>{student.school}</p>}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Arrow */}
          <button className="ap-lightbox__nav ap-lightbox__nav--next" onClick={onNext}>
            <FiChevronRight />
          </button>
        </div>

      </motion.div>
    </AnimatePresence>
  )
}

/* ── Year Section (Accordion) ── */
function YearSection({ section, defaultOpen, onStudentClick }) {
  const [open, setOpen] = useState(defaultOpen)
  const hasStudents = section.students && section.students.length > 0

  return (
    <div className={`ap-year ${open ? 'ap-year--open' : ''}`}>
      <button className="ap-year__header" onClick={() => setOpen(!open)}>
        <div className="ap-year__header-left">
          <h2 className="ap-year__title">{section.label}</h2>
          {hasStudents && <span className="ap-year__count">{section.students.length} students</span>}
        </div>
        <span className="ap-year__toggle">{open ? <FiChevronUp /> : <FiChevronDown />}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="ap-year__body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <div className="ap-year__body-inner">
              {hasStudents ? (
                <div className="ap-students-grid">
                  {section.students.map((s, si) => (
                    <motion.div key={si} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (si % 4) * 0.08, duration: 0.5 }}>
                      <div className="ap-student" onClick={() => onStudentClick(s)}>
                        <div className="ap-student__avatar-wrap">
                          <img src={s.image} alt={s.name} className="ap-student__avatar" style={{ objectPosition: s.objectPosition || 'top' }} loading="lazy" />
                        </div>
                        
                        <div className="ap-student__info-center">
                          <h4 className="ap-student__name">{s.name}</h4>
                          <div className="ap-student__score">
                            {s.score}
                          </div>
                          {s.school && <div className="ap-student__school">{s.school}</div>}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AchievementPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeIndex, setActiveIndex] = useState(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filtered = activeFilter === 'All' ? resultsData : resultsData.filter(s => s.board === activeFilter)

  // Flatten all currently visible students
  const allVisibleStudents = filtered.flatMap(section => section.students || [])

  const handleStudentClick = (student) => {
    const idx = allVisibleStudents.findIndex(s => s.name === student.name && s.score === student.score)
    if (idx !== -1) setActiveIndex(idx)
  }

  const handlePrev = (e) => {
    if (e) e.stopPropagation()
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : allVisibleStudents.length - 1))
  }

  const handleNext = (e) => {
    if (e) e.stopPropagation()
    setActiveIndex((prev) => (prev < allVisibleStudents.length - 1 ? prev + 1 : 0))
  }

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
              <YearSection key={`${section.board}-${section.year}`} section={section} defaultOpen={i === 0} onStudentClick={handleStudentClick} />
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
        <Lightbox 
          activeIndex={activeIndex} 
          allStudents={allVisibleStudents}
          onClose={() => setActiveIndex(null)} 
          onPrev={handlePrev}
          onNext={handleNext}
        />
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
        .ap-back:hover { color: var(--primary); }

        /* ── Filters ── */
        .ap-filter-row {
          display: flex; gap: 0.25rem; justify-content: center; flex-wrap: nowrap;
          background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-pill);
          padding: 0.35rem; max-width: 500px; margin: 0 auto;
          overflow-x: auto; scrollbar-width: none;
        }
        .ap-filter-row::-webkit-scrollbar { display: none; }
        
        .ap-filter-btn {
          display: inline-flex; align-items: center; justify-content: center;
          flex: 1 1 auto; min-height: 44px; white-space: nowrap;
          font-family: var(--font-display); font-size: 0.82rem; font-weight: 600;
          padding: 0.5rem 0.75rem; border-radius: var(--radius-pill); border: none;
          background: transparent; color: var(--text-muted); cursor: pointer;
          transition: background 0.3s var(--ease), color 0.3s var(--ease);
        }
        .ap-filter-btn:not(.ap-filter-btn--active):hover { color: var(--primary); background: var(--primary-soft); }
        .ap-filter-btn--active {
          background: var(--primary); color: #fff;
        }

        /* ── Results Container ── */
        .ap-results { padding-top: 1.5rem; padding-bottom: 5rem; display: flex; flex-direction: column; gap: 1.5rem; min-height: 100vh; }
        .ap-results__anim-wrapper { display: flex; flex-direction: column; gap: 1.5rem; width: 100%; }

        /* ── Year Accordion ── */
        .ap-year {
          background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg);
          overflow: hidden; transition: border-color 0.3s;
        }
        .ap-year--open { border-color: rgba(0,132,108,0.2); }
        .ap-year__header {
          display: flex; align-items: center; justify-content: space-between; width: 100%;
          padding: 1.25rem 1.75rem; border: none; background: none; cursor: pointer;
          transition: background 0.2s;
        }
        .ap-year__header:hover { background: var(--gray-50); }
        .ap-year__header-left { display: flex; align-items: center; gap: 0.75rem; }
        .ap-year__icon {
          display: flex; align-items: center; justify-content: center; width: 38px; height: 38px;
          background: var(--primary-soft); color: var(--primary); border-radius: 10px; font-size: 1.1rem;
        }
        .ap-year__title {
          font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--text-dark);
        }
        .ap-year__count {
          font-size: 0.72rem; font-weight: 600; color: var(--primary); background: var(--primary-soft);
          padding: 0.2rem 0.6rem; border-radius: var(--radius-pill);
        }
        .ap-year__toggle { color: var(--text-muted); font-size: 0.8rem; }
        .ap-year__body { overflow: hidden; }
        .ap-year__body-inner { padding: 0 1.25rem 1.25rem; }


        /* ── Student Cards Grid ── */
        .ap-students-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin: 0;
        }
        .ap-student {
          height: 100%;
          background: var(--white);
          border-radius: var(--radius);
          padding: 0.75rem 0.35rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 1px solid var(--border);
          box-shadow: none;
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .ap-student__avatar-wrap {
          position: relative;
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          margin-bottom: 0.5rem;
          border-radius: 50%;
          border: 2px solid var(--white);
          box-shadow: 0 0 0 1.5px var(--accent);
          overflow: hidden;
          transition: transform 0.5s, box-shadow 0.3s;
        }
        .ap-student:hover .ap-student__avatar-wrap {
          box-shadow: 0 0 0 1.5px var(--accent-light);
        }

        .ap-student__avatar {
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          object-position: top;
          aspect-ratio: 1 / 1;
          display: block;
        }

        .ap-student__info-center {
          display: flex; flex-direction: column; align-items: center; width: 100%;
        }
        .ap-student__name {
          font-size: 0.62rem; font-weight: 700; color: var(--text-dark); line-height: 1.2; margin-bottom: 0.2rem;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%;
        }
        
        .ap-student__score {
          display: flex; align-items: center; justify-content: center; gap: 0.15rem;
          font-family: var(--font-display); font-size: 0.85rem; font-weight: 800; color: var(--primary);
          line-height: 1; margin-bottom: 0.25rem;
        }
        .ap-student__score-icon { font-size: 0.65rem; color: var(--primary); }

        .ap-student__school {
          font-size: 0.58rem; color: var(--accent-dark); background: var(--accent-soft);
          padding: 0.15rem 0.4rem; border-radius: var(--radius-pill); font-weight: 600;
          margin-top: 0.25rem; text-align: center; white-space: nowrap;
          max-width: 100%; overflow: hidden; text-overflow: ellipsis;
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
          background: var(--primary);
          color: var(--white); font-size: 1.1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s;
        }
        .ap-scroll-top:hover { background: var(--primary-dark); }

        /* ── Lightbox ── */
        .ap-lightbox {
          position: fixed; inset: 0; z-index: 2000; background: rgba(15,23,42,0.85);
          backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center;
          padding: 2rem;
        }
        .ap-lightbox__wrapper {
          position: relative;
          width: 100%;
          max-width: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ap-lightbox__nav {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 2;
          width: 48px; height: 48px; border-radius: 50%; border: none;
          background: rgba(15,23,42,0.6); color: #fff; font-size: 1.5rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .ap-lightbox__nav:hover { background: rgba(15,23,42,0.85); }
        .ap-lightbox__nav--prev { left: 0.5rem; }
        .ap-lightbox__nav--next { right: 0.5rem; }

        .ap-lightbox__card {
          position: relative; background: var(--white); border-radius: var(--radius-sm);
          overflow: hidden; width: 100%;
          box-shadow: none;
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
          color: var(--primary); background: var(--primary-soft);
          padding: 0.4rem 1rem; border-radius: var(--radius-pill);
        }
        .ap-lightbox__info p { margin-top: 0.5rem; color: var(--text-muted); font-size: 0.9rem; }

        /* ── Responsive — scale up sizes on larger screens ── */
        @media (min-width: 480px) {
          .ap-students-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
          .ap-student { padding: 1rem 0.5rem; }
          .ap-student__avatar-wrap { width: 72px; height: 72px; }
          .ap-student__name { font-size: 0.72rem; }
          .ap-student__score { font-size: 1rem; }
          .ap-student__score-icon { font-size: 0.75rem; }
          .ap-filter-row { gap: 0.5rem; }
          .ap-filter-btn { padding: 0.6rem 1.25rem; }
          .ap-results { padding-top: 2rem; padding-bottom: 5rem; }
        }
        @media (min-width: 768px) {
          .ap-students-grid { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
          .ap-student { padding: 1.5rem 0.75rem; border-radius: var(--radius-xl); }
          .ap-student__avatar-wrap { width: 100px; height: 100px; margin-bottom: 0.75rem; border-width: 3px; }
          .ap-student__name { font-size: 0.95rem; white-space: normal; }
          .ap-student__score { font-size: 1.4rem; gap: 0.25rem; margin-bottom: 0.5rem; }
          .ap-student__score-icon { font-size: 1rem; }
          .ap-student__school { font-size: 0.72rem; }
          .ap-year__header { padding: 1.25rem 1.75rem; }
          .ap-year__body-inner { padding: 0 1.75rem 1.75rem; }
          .ap-year__title { font-size: 1.15rem; }
          .ap-results { padding-top: 2.5rem; padding-bottom: 5rem; }

          /* Lightbox nav moved outside the card */
          .ap-lightbox__nav--prev { left: -68px; }
          .ap-lightbox__nav--next { right: -68px; }
        }
        @media (min-width: 992px) {
          .ap-students-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
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
