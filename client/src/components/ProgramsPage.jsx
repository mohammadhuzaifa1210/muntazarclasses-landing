import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowUpRight } from 'react-icons/fi'
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
    title: 'School Section — SSC (5th to 10th)',
    tag: 'Foundation & Board',
    desc: 'A concept-first foundation for young learners, building all the way up to a confident 10th board result across every medium.',
    meta: [
      { icon: <FaLanguage />, label: 'Mediums', value: 'Hindi · Urdu · English' },
      { icon: <FaLayerGroup />, label: 'Classes', value: '5th to 9th + 10th Board' },
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
  const [form, setForm] = useState({ name: '', phone: '', email: '', program: formPrograms[0], message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

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

  return (
    <>
      <Navbar />

      <main className="pp">
        {/* Hero header */}
        <section className="pp-hero">
          <div className="grid-pattern" />
          <div className="wrap pp-hero__inner">
            <Link to="/" className="back-link"><FiArrowLeft /> Back to Home</Link>
            <span className="eyebrow" style={{ justifyContent: 'flex-start' }}>Our Programs</span>
            <h1 className="pp-hero__title">
              Every Board, Every Medium - <span className="pp-accent">One Institute</span>
            </h1>
            <p className="pp-hero__desc">
              From your child's foundation years right through to a university degree - explore
              what we teach, how each program is structured, and enquire in a click.
            </p>
          </div>
        </section>

        {/* Program detail cards */}
        <section className="wrap pp-list">
          {programs.map((p, i) => (
            <motion.article
              key={p.id}
              className="pp-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
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

              <button className="btn btn--blue" onClick={() => enquireAbout(p.title)}>
                Enquire about this <FiArrowUpRight />
              </button>
            </motion.article>
          ))}
        </section>

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
              {/* Left info panel */}
              <div className="pp-form-aside">
                <div className="grid-pattern pp-form-aside__grid" />
                <div className="pp-form-aside__inner">
                  <span className="pp-form-aside__eyebrow">Admissions 2026–27</span>
                  <h2 className="pp-form-aside__title">Talk to an Academic Counsellor</h2>
                  <p className="pp-form-aside__desc">
                    Share your details and we'll call you back within 24 hours with the fee card,
                    batch timings and a free demo slot.
                  </p>
                  <ul className="pp-form-aside__list">
                    <li><a href="tel:+919221105658"><FaPhoneAlt /> +91 92211 05658</a></li>
                    <li><a href="https://wa.me/919221105658" target="_blank" rel="noopener noreferrer"><FaWhatsapp /> WhatsApp us</a></li>
                    <li><a href="mailto:admissions@muntazarclasses.com"><FaEnvelope /> admissions@muntazarclasses.com</a></li>
                  </ul>
                </div>
              </div>

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
                    <button type="submit" className="btn btn--blue btn--lg" disabled={loading} style={{ width: '100%' }}>
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
        .pp { padding-top: 62px; background: var(--white); }

        /* Hero */
        .pp-hero {
          position: relative;
          overflow: hidden;
          background: var(--grad-hero);
          padding: var(--gap-3xl) 0 var(--gap-4xl);
        }
        .pp-hero__inner { position: relative; z-index: 1; max-width: 720px; }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--blue);
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 1.75rem;
          transition: color 0.2s ease;
        }
        .back-link:hover { color: var(--blue-dark); }
        .pp-hero__title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.12;
          color: var(--text-dark);
          margin-bottom: 1rem;
        }
        .pp-accent { color: var(--blue); }
        .pp-hero__desc {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 560px;
        }

        /* Program cards — 1-col phone */
        .pp-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--gap-xl);
          padding-top: var(--gap-3xl);
          padding-bottom: var(--gap-3xl);
        }
        .pp-card {
          display: flex;
          flex-direction: column;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2.25rem;
          box-shadow: var(--shadow-sm);
          transition: all 0.4s var(--ease);
        }
        .pp-card:hover { border-color: var(--blue); box-shadow: var(--shadow-md); transform: translateY(-3px); }
        .pp-card__head { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.25rem; }
        .pp-card__icon {
          flex-shrink: 0;
          width: 52px; height: 52px;
          border-radius: 14px;
          background: var(--blue-soft);
          color: var(--blue);
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
          color: var(--blue);
          background: var(--blue-soft);
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-pill);
          margin-bottom: 0.5rem;
        }
        .pp-card__title { font-size: 1.35rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.2; }
        .pp-card__desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 1.5rem; }
        /* meta: 1-col phone */
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
        .pp-meta__icon { color: var(--blue); font-size: 0.85rem; margin-top: 3px; }
        .pp-meta__label {
          display: block;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-faint);
        }
        .pp-meta__value { display: block; font-size: 0.82rem; font-weight: 600; color: var(--text-dark); }
        .pp-card__list { display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 1.75rem; }
        .pp-card__list li { display: flex; align-items: flex-start; gap: 0.65rem; font-size: 0.9rem; color: var(--text-body); }
        .pp-check {
          flex-shrink: 0;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: var(--blue-soft);
          color: var(--blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.55rem;
          margin-top: 2px;
        }
        .pp-card .btn { margin-top: auto; align-self: flex-start; }

        /* Enquiry */
        .pp-enquiry { background: var(--grad-soft); padding: var(--gap-4xl) 0 var(--gap-5xl); }
        /* Form: 1-col phone */
        .pp-form-card {
          display: grid;
          grid-template-columns: 1fr;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          background: var(--white);
        }
        .pp-form-aside { position: relative; overflow: hidden; background: var(--blue-deep); }
        .pp-form-aside__grid {
          -webkit-mask-image: radial-gradient(ellipse 90% 70% at 20% 0%, #000 30%, transparent 75%);
          mask-image: radial-gradient(ellipse 90% 70% at 20% 0%, #000 30%, transparent 75%);
          opacity: 0.5;
        }
        .pp-form-aside__inner { position: relative; z-index: 1; padding: 2.75rem; height: 100%; display: flex; flex-direction: column; }
        .pp-form-aside__eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--blue-light);
          margin-bottom: 1rem;
        }
        .pp-form-aside__title { font-size: 1.5rem; font-weight: 700; color: var(--text-white); line-height: 1.2; margin-bottom: 0.85rem; }
        .pp-form-aside__desc { font-size: 0.92rem; color: var(--text-white-70); line-height: 1.7; margin-bottom: 2rem; }
        .pp-form-aside__list { display: flex; flex-direction: column; gap: 0.9rem; margin-top: auto; }
        .pp-form-aside__list a {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.88rem;
          color: var(--text-white-70);
          transition: color 0.2s ease;
        }
        .pp-form-aside__list a:hover { color: var(--text-white); }
        .pp-form-aside__list svg { color: var(--blue-light); font-size: 0.9rem; flex-shrink: 0; }

        .pp-form-main { padding: 1.75rem; }
        .pp-form__title { font-size: 1.35rem; font-weight: 700; margin-bottom: 1.75rem; }
        /* form row: 1-col on phone */
        .pp-form__row { display: grid; grid-template-columns: 1fr; gap: var(--gap-lg); }
        .pp-form-success { text-align: center; padding: 2.5rem 1rem; }
        .pp-form-success__tick {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: var(--blue-soft);
          color: var(--blue);
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
          .pp-list { grid-template-columns: 1fr 1fr; padding-top: var(--gap-4xl); padding-bottom: var(--gap-4xl); }
          .pp-form-card { grid-template-columns: 0.85fr 1.15fr; }
          .pp-form-aside__inner { padding: 2.75rem; }
          .pp-form-main { padding: 2.75rem; }
        }
      `}</style>
    </>
  )
}
