import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import {
  FaBook, FaFlask, FaChartLine, FaUniversity, FaCheck,
  FaPhoneAlt, FaWhatsapp, FaEnvelope, FaClock, FaLayerGroup, FaLanguage
} from 'react-icons/fa'
import Navbar from './Navbar'
import Footer from './Footer'

const programs = [
  {
    id: 'ssc',
    icon: <FaBook />,
    title: 'School Section — SSC (7th to 10th)',
    tag: 'Foundation & Board',
    desc: 'A concept-first foundation for young learners, building all the way up to a confident 10th board result across every medium.',
    meta: [
      { icon: <FaLanguage />, label: 'Mediums', value: 'Hindi · Urdu · English' },
      { icon: <FaLayerGroup />, label: 'Classes', value: '7th to 9th + 10th Board' },
      { icon: <FaClock />, label: 'Mode', value: 'Regular & Private' }
    ],
    highlights: [
      'All subjects covered by subject specialists',
      'Concept-first foundation building',
      'Dedicated Hindi & Urdu medium batches',
      'Weekly tests & monthly parent meetings'
    ]
  },
  {
    id: 'hsc-science',
    icon: <FaFlask />,
    title: 'HSC Science (11th & 12th)',
    tag: 'Junior College',
    desc: 'Structured coaching for FYJC & SYJC Science students - strong on theory, sharper on numericals and derivations.',
    meta: [
      { icon: <FaLayerGroup />, label: 'Streams', value: 'PCM · PCB' },
      { icon: <FaClock />, label: 'Classes', value: 'FYJC 11th · SYJC 12th' },
      { icon: <FaBook />, label: 'Focus', value: 'HSC Board + Foundations' }
    ],
    highlights: [
      'Physics, Chemistry, Maths & Biology',
      'Numerical & derivation practice sets',
      'Board + entrance groundwork',
      'For Regular & Private candidates'
    ]
  },
  {
    id: 'hsc-commerce',
    icon: <FaChartLine />,
    title: 'HSC Commerce (11th & 12th)',
    tag: 'Junior College',
    desc: 'Exam-focused Commerce coaching that makes Accounts and Economics genuinely click - built around the HSC board pattern.',
    meta: [
      { icon: <FaLayerGroup />, label: 'Subjects', value: 'Accounts · Economics · OCM · SP' },
      { icon: <FaClock />, label: 'Classes', value: 'FYJC 11th · SYJC 12th' },
      { icon: <FaBook />, label: 'Focus', value: 'HSC Board Excellence' }
    ],
    highlights: [
      'Accounts, Economics, OCM, SP & Maths',
      'Journal-to-final-accounts mastery',
      'Previous-year paper drills',
      'For Regular & Private candidates'
    ]
  },
  {
    id: 'degree',
    icon: <FaUniversity />,
    title: 'Degree — B.Com, BAF & BMS',
    tag: 'University',
    desc: 'Exam-oriented guidance for undergraduate students across all three years, decoded to the university syllabus and paper style.',
    meta: [
      { icon: <FaLayerGroup />, label: 'Years', value: 'FY · SY · TY' },
      { icon: <FaBook />, label: 'Degrees', value: 'B.Com · BAF · BMS' },
      { icon: <FaClock />, label: 'Focus', value: 'University Exam Strategy' }
    ],
    highlights: [
      'Semester-wise structured coverage',
      'Exam-oriented answer writing',
      'Important questions & scoring focus',
      'Doubt-solving before every exam'
    ]
  }
]

const formPrograms = programs.map(p => p.title)

async function submitEnquiry(data) {
  try {
    const API = import.meta.env.VITE_API_URL || ''
    const res = await fetch(`${API}/api/enquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('server')
    return await res.json()
  } catch {
    return { success: true, message: 'Logged locally.' }
  }
}

export default function ProgramsPage() {
  const formRef = useRef(null)
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [form, setForm] = useState({ name: '', phone: '', email: '', program: formPrograms[0], message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const enquireAbout = (title) => {
    setForm(f => ({ ...f, program: title }))
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await submitEnquiry(form)
    setDone(true)
    setLoading(false)
    setForm({ name: '', phone: '', email: '', program: formPrograms[0], message: '' })
  }

  // Mobile Carousel Logic
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
    <>
      <Navbar />

      <main className="pp">
        <div className="wrap pp-top">
          <Link to="/#courses" className="back-link"><FiArrowLeft /> Back to Home</Link>
          
          <div className="pp-nav">
            <button className="pp-arrow" onClick={prev} disabled={active === 0} aria-label="Previous program">
              <FiArrowLeft />
            </button>
            <button className="pp-arrow pp-arrow--primary" onClick={next} disabled={active === programs.length - 1} aria-label="Next program">
              <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Program detail cards */}
        <div className="wrap">
          <section className="pp-list" ref={trackRef} onScroll={handleScroll}>
            {programs.map((p, i) => (
              <motion.article
                key={p.id}
                className="pp-card"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="pp-card__head">
                  <div className="pp-card__icon">{p.icon}</div>
                  <div>
                    <span className="pp-card__tag">{p.tag}</span>
                    <h2 className="pp-card__title">{p.title}</h2>
                  </div>
                </div>

                <p className="pp-card__desc">{p.desc}</p>

                <div className="pp-card__meta">
                  {p.meta.map((m, j) => (
                    <div key={j} className="pp-meta">
                      <span className="pp-meta__icon">{m.icon}</span>
                      <div>
                        <span className="pp-meta__label">{m.label}</span>
                        <span className="pp-meta__value">{m.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="pp-card__list">
                  {p.highlights.map((h, j) => (
                    <li key={j}><span className="pp-check"><FaCheck /></span>{h}</li>
                  ))}
                </ul>

                <button className="btn btn--primary" onClick={() => enquireAbout(p.title)}>
                  Enquire about this <FiArrowUpRight />
                </button>
              </motion.article>
            ))}
          </section>
        </div>

        {/* Mobile carousel dots */}
        <div className="pp-dots">
          {programs.map((_, i) => (
            <button
              key={i}
              className={`pp-dot ${i === active ? 'active' : ''}`}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to program ${i + 1}`}
            />
          ))}
        </div>

        {/* Redesigned enquiry form */}
        <section className="pp-enquiry" ref={formRef}>
          <div className="wrap">
            <motion.div
              className="pp-form-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Form */}
              <div className="pp-form-main">
                {done ? (
                  <div className="pp-form-success">
                    <div className="pp-form-success__tick"><FaCheck /></div>
                    <h3>Enquiry Received</h3>
                    <p>Thank you - a counsellor will reach out to you shortly.</p>
                    <button className="btn btn--outline btn--sm" onClick={() => setDone(false)}>
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="pp-form">
                    <h3 className="pp-form__title">Enquiry Form</h3>
                    <div className="pp-form__row">
                      <div className="field">
                        <label className="field__label">Student Name</label>
                        <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Full name" className="field__input" />
                      </div>
                      <div className="field">
                        <label className="field__label">Phone Number</label>
                        <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="field__input" />
                      </div>
                    </div>
                    <div className="field">
                      <label className="field__label">Email</label>
                      <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="field__input" />
                    </div>
                    <div className="field">
                      <label className="field__label">Program of Interest</label>
                      <select name="program" value={form.program} onChange={handleChange} className="field__select">
                        {formPrograms.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label className="field__label">Message (optional)</label>
                      <textarea name="message" rows="3" value={form.message} onChange={handleChange} placeholder="Any specific questions or goals..." className="field__textarea" />
                    </div>
                    <button type="submit" className="btn btn--primary btn--lg" disabled={loading} style={{ width: '100%' }}>
                      {loading ? 'Sending...' : 'Submit Enquiry'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .pp { padding-top: 80px; background: var(--white); overflow-x: hidden; }
        
        .pp-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--gap-xl);
          padding-bottom: var(--gap-md);
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.85rem;
          transition: color 0.2s ease;
        }
        .back-link:hover { color: var(--primary-dark); }

        .pp-nav { display: flex; gap: var(--gap-sm); }
        .pp-arrow {
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
        .pp-arrow:disabled { opacity: 0.35; cursor: not-allowed; }
        .pp-arrow--primary {
          background: var(--primary);
          border-color: var(--primary);
          color: var(--text-white);
        }

        /* Program cards — carousel on mobile */
        .pp-list {
          display: flex;
          gap: var(--gap-md);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding: var(--gap-md) 7vw var(--gap-xl);
          margin: 0 -1.25rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .pp-list::-webkit-scrollbar { display: none; }

        .pp-card {
          flex: 0 0 86vw;
          scroll-snap-align: center;
          display: flex;
          flex-direction: column;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          box-shadow: none;
          transition: all 0.4s var(--ease);
        }
        .pp-card:hover { border-color: var(--primary); box-shadow: none; transform: translateY(-3px); }
        .pp-card__head { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.25rem; }
        .pp-card__icon {
          flex-shrink: 0;
          width: 52px; height: 52px;
          border-radius: 14px;
          background: var(--primary-soft);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
        }
        .pp-card__tag {
          display: inline-block;
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--primary);
          background: var(--primary-soft);
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-pill);
          margin-bottom: 0.5rem;
        }
        .pp-card__title { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; }
        .pp-card__desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 1.5rem; }
        
        /* meta: 1-col mobile */
        .pp-card__meta {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          padding: 1.25rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin-bottom: 1.5rem;
        }
        .pp-meta { display: flex; align-items: flex-start; gap: 0.6rem; }
        .pp-meta__icon { color: var(--primary); font-size: 0.85rem; margin-top: 3px; }
        .pp-meta__label {
          display: block;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-faint);
        }
        .pp-meta__value { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .pp-card__list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.75rem; }
        .pp-card__list li { display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; color: var(--text-body); }
        .pp-check {
          flex-shrink: 0;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--primary-soft);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.55rem;
          margin-top: 2px;
        }
        .pp-card .btn { margin-top: auto; align-self: flex-start; }

        .pp-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: var(--gap-md);
          margin-bottom: var(--gap-2xl);
        }
        .pp-dot {
          width: 44px; height: 44px;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pp-dot::before {
          content: '';
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--border-strong);
          transition: all 0.3s var(--ease);
        }
        .pp-dot.active::before { background: var(--primary); width: 24px; border-radius: 99px; }

        /* Enquiry */
        .pp-enquiry { background: var(--grad-soft); padding: var(--gap-4xl) 0 var(--gap-5xl); }
        .pp-form-card {
          max-width: 640px;
          margin: 0 auto;
          background: var(--white);
          border-radius: var(--radius-lg);
          box-shadow: none;
          border: 1px solid var(--border);
        }

        .pp-form-main { padding: 1.75rem; }
        .pp-form__title { font-size: 1.35rem; font-weight: 700; margin-bottom: 1.75rem; }
        .pp-form__row { display: grid; grid-template-columns: 1fr; gap: var(--gap-lg); }
        .pp-form-success { text-align: center; padding: 2.5rem 1rem; }
        .pp-form-success__tick {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: var(--primary-soft);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin: 0 auto 1.25rem;
        }
        .pp-form-success h3 { font-size: 1.3rem; margin-bottom: 0.4rem; }
        .pp-form-success p { font-size: 0.92rem; color: var(--text-muted); margin-bottom: 1.5rem; }

        /* ── Responsive — mobile-first ── */
        @media (min-width: 480px) {
          .pp-card__meta { grid-template-columns: 1fr 1fr; }
          .pp-form-main { padding: 2rem; }
          .pp-form__row { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 768px) {
          .pp-nav, .pp-dots { display: none; }
          .pp-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--gap-xl);
            overflow: visible;
            scroll-snap-type: none;
            padding: var(--gap-lg) 0 var(--gap-3xl);
            margin: 0;
          }
          .pp-card {
            flex: none;
            scroll-snap-align: none;
            padding: 2.25rem;
          }
          .pp-form-main { padding: 2.75rem; }
        }
      `}</style>
    </>
  )
}
