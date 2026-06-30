import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaUserGraduate, FaPercent } from 'react-icons/fa'

export default function AdmissionPopup({ isOpen, onClose, onEnquirySubmit, prefilledCourse }) {
  const [form, setForm] = useState({ name: '', phone: '', course: prefilledCourse || 'JEE/NEET Intensive' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (prefilledCourse) setForm(f => ({ ...f, course: prefilledCourse }))
  }, [prefilledCourse])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onEnquirySubmit({ ...form, message: 'Submitted via Admission Popup' })
      setDone(true)
      setTimeout(() => { onClose(); setDone(false); setForm({ name: '', phone: '', course: 'JEE/NEET Intensive' }) }, 2500)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div
            className="modal"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="modal__head">
              <button className="modal__close" onClick={onClose}><FaTimes /></button>
              <div className="modal__head-row">
                <div className="modal__icon"><FaUserGraduate /></div>
                <div>
                  <h3 className="modal__title">Admissions & Scholarship</h3>
                  <p className="modal__subtitle">Session 2026 – 2027</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="modal__body">
              {done ? (
                <div className="modal__success">
                  <h4>Registration Received ✓</h4>
                  <p>We're scheduling your consultation now.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="modal__form">
                  <div className="modal__info">
                    <FaPercent />
                    <span>Up to 50% scholarship for students scoring 90%+ in boards.</span>
                  </div>

                  <div className="field">
                    <label className="field__label">Student Name</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Full name" className="field__input" />
                  </div>

                  <div className="field">
                    <label className="field__label">Phone Number</label>
                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="field__input" />
                  </div>

                  <div className="field">
                    <label className="field__label">Program</label>
                    <select name="course" value={form.course} onChange={handleChange} className="field__select">
                      <option>JEE/NEET Intensive</option>
                      <option>Board Exam Mastery</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn--blue btn--lg" disabled={loading} style={{ width: '100%' }}>
                    {loading ? 'Processing...' : 'Request Free Consultation'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(15,23,42,0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1.5rem;
        }
        .modal {
          background: var(--white);
          border-radius: var(--radius);
          width: 100%;
          max-width: 440px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.2);
        }
        .modal__head {
          background: var(--blue-deep);
          padding: 2rem 2.25rem;
          position: relative;
        }
        .modal__close {
          position: absolute;
          top: 1rem; right: 1rem;
          background: rgba(255,255,255,0.08);
          border: none;
          color: rgba(255,255,255,0.7);
          width: 30px; height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          transition: all 0.2s ease;
        }
        .modal__close:hover { background: rgba(255,255,255,0.15); color: #fff; }
        .modal__head-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .modal__icon {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: var(--blue-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--blue-light);
          font-size: 1.1rem;
        }
        .modal__title { color: #fff; font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; }
        .modal__subtitle { color: rgba(255,255,255,0.6); font-size: 0.75rem; margin-top: 2px; }
        .modal__body { padding: 2rem 2.25rem; }
        .modal__form { display: flex; flex-direction: column; }
        .modal__info {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--blue-soft);
          padding: 0.7rem 0.9rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(26,86,219,0.12);
          margin-bottom: var(--gap-lg);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--blue-dark);
        }
        .modal__info svg { color: var(--blue); flex-shrink: 0; }
        .modal__success {
          text-align: center;
          padding: 2.5rem 1rem;
          background: var(--blue-soft);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(26,86,219,0.12);
        }
        .modal__success h4 { font-size: 1.1rem; margin-bottom: 0.3rem; }
        .modal__success p { font-size: 0.88rem; color: var(--text-muted); }
        @media (max-width: 480px) {
          .modal__head, .modal__body { padding: 1.5rem; }
        }
      `}</style>
    </AnimatePresence>
  )
}
