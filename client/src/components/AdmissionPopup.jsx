import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaUserGraduate, FaCheck, FaRegClock } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'

export default function AdmissionPopup({ isOpen, onClose, onEnquirySubmit, prefilledCourse }) {
  const [form, setForm] = useState({ name: '', phone: '', course: prefilledCourse || 'School Section (5th to 10th)' })
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
      setTimeout(() => { onClose(); setDone(false); setForm({ name: '', phone: '', course: 'School Section (5th to 10th)' }) }, 2500)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="modal__head">
              <div className="grid-pattern modal__grid" />
              <button className="modal__close" onClick={onClose} aria-label="Close"><FaTimes /></button>
              <div className="modal__head-row">
                <div>
                  <span className="modal__eyebrow">Admissions 2026–27</span>
                  <h3 className="modal__title">Book Your Free Demo</h3>
                </div>
              </div>
              <p className="modal__lead">Fill in your details - a counsellor will call you back to schedule a free demo class.</p>
            </div>

            {/* Body */}
            <div className="modal__body">
              {done ? (
                <div className="modal__success">
                  <div className="modal__success-tick"><FaCheck /></div>
                  <h4>Registration Received</h4>
                  <p>We're scheduling your free consultation now.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="modal__form">
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
                      <option>School Section (5th to 10th)</option>
                      <option>College Section (11th &amp; 12th)</option>
                      <option>Degree Section (B.Com, BAF, BMS)</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn--blue btn--lg" disabled={loading} style={{ width: '100%' }}>
                    {loading ? 'Processing...' : <>Request Free Consultation <FiArrowUpRight /></>}
                  </button>

                  <p className="modal__reassure">
                    <FaRegClock /> No obligation · We reply within 24 hours
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(15,23,42,0.6);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1.5rem;
        }
        .modal {
          background: var(--white);
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 450px;
          max-height: calc(100dvh - 3rem);
          overflow-y: auto;
          box-shadow: var(--shadow-lg);
        }
        .modal .field__input,
        .modal .field__select,
        .modal .field__textarea { font-size: 16px; }
        .modal__head {
          position: relative;
          overflow: hidden;
          background: var(--blue-deep);
          padding: 2rem 2.25rem 1.75rem;
        }
        .modal__grid {
          opacity: 0.55;
          -webkit-mask-image: radial-gradient(ellipse 80% 90% at 90% 0%, #000 20%, transparent 70%);
          mask-image: radial-gradient(ellipse 80% 90% at 90% 0%, #000 20%, transparent 70%);
        }
        .modal__close {
          position: absolute;
          top: 1.1rem; right: 1.1rem;
          background: rgba(255,255,255,0.1);
          border: none;
          color: rgba(255,255,255,0.75);
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          transition: all 0.2s ease;
          z-index: 2;
        }
        .modal__close:hover { background: rgba(255,255,255,0.2); color: #fff; }
        .modal__head-row {
          position: relative; z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          margin-bottom: 1rem;
        }
        .modal__icon {
          flex-shrink: 0;
          width: 46px; height: 46px;
          border-radius: 12px;
          background: var(--blue-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--blue-light);
          font-size: 1.2rem;
        }
        .modal__eyebrow {
          display: block;
          font-family: var(--font-display);
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--blue-light);
          margin-bottom: 0.3rem;
        }
        .modal__title {
          color: #fff;
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }
        .modal__lead {
          position: relative; z-index: 1;
          font-size: 0.85rem;
          color: var(--text-white-70);
          line-height: 1.6;
        }
        .modal__body { padding: 1.75rem 2.25rem 2rem; }
        .modal__form { display: flex; flex-direction: column; }
        .modal__reassure {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .modal__reassure svg { color: var(--blue); font-size: 0.75rem; }
        .modal__success {
          text-align: center;
          padding: 1.5rem 1rem 1rem;
        }
        .modal__success-tick {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: var(--blue-soft);
          color: var(--blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          margin: 0 auto 1.1rem;
        }
        .modal__success h4 { font-size: 1.25rem; margin-bottom: 0.35rem; }
        .modal__success p { font-size: 0.9rem; color: var(--text-muted); }

        /* Phone-first: bottom sheet style */
        .modal-overlay { align-items: flex-end; padding: 0; }
        .modal {
          max-width: 100%;
          border-radius: 1.5rem 1.5rem 0 0;
          box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
        }
        .modal__head { padding: 1.75rem 1.5rem 1.5rem; }
        .modal__body { padding: 1.5rem 1.5rem 1.75rem; }

        /* ≥480px: centered floating modal */
        @media (min-width: 480px) {
          .modal-overlay { align-items: center; padding: 1.5rem; }
          .modal {
            max-width: 560px;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
          }
          .modal__head { padding: 2rem 2.25rem 1.75rem; }
          .modal__body { padding: 1.75rem 2.25rem 2rem; }
        }
      `}</style>
    </AnimatePresence>
  )
}
