import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact({ onEnquirySubmit }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: 'School Section (7th to 10th)', message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try { await onEnquirySubmit(form); setDone(true); setForm({ name: '', phone: '', email: '', course: 'School Section (7th to 10th)', message: '' }) }
    catch (err) { console.error(err) }
    setLoading(false)
  }

  return (
    <section id="contact" className="contact-sec">
      <div className="wrap">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="ch-label">GET IN TOUCH</span>
          <h2 className="ch-title">Ready to Start Your Journey?</h2>
        </motion.div>

        <div className="contact-grid">

          {/* Form */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="cf-title">Send an Inquiry</h3>
            <p className="cf-sub">Our counsellors will get back within 24 hours.</p>

            {done ? (
              <div className="cf-success">
                <h4>Inquiry Received ✓</h4>
                <p>Thank you - an academic counselor will reach out to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="cf-form">
                <div className="cf-row">
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
                  <label className="field__label">Program</label>
                  <select name="course" value={form.course} onChange={handleChange} className="field__select">
                    <option>School Section (7th to 10th)</option>
                    <option>College Section (11th & 12th)</option>
                    <option>Degree Section (B.Com, BAF, BMS)</option>
                  </select>
                </div>

                <div className="field">
                  <label className="field__label">Message (optional)</label>
                  <textarea name="message" rows="3" value={form.message} onChange={handleChange} placeholder="Any specific questions or goals..." className="field__textarea" />
                </div>

                <button type="submit" className="btn btn--primary btn--lg" disabled={loading} style={{ width: '100%' }}>
                  {loading ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-sec {
          background: var(--white);
          padding: var(--gap-4xl) 0;
        }
        .contact-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 1rem;
        }
        .contact-header {
          text-align: center;
          margin-bottom: 3.5rem;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 1rem;
        }
        .ch-label {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }
        .ch-title {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 6vw, 2.75rem);
          white-space: nowrap;
          font-weight: 800;
          color: var(--text-dark);
          line-height: 1.1;
          margin-bottom: 1rem;
        }
        .ch-sub {
          font-size: 1.05rem;
          color: var(--text-body);
          line-height: 1.6;
        }
        .contact-form-wrap {
          width: 100%;
          max-width: 640px;
          background: var(--gray-50);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          box-shadow: none;
        }
        .cf-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }
        .cf-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }
        .cf-form { display: flex; flex-direction: column; }
        .cf-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--gap-lg);
        }
        /* Prevent iOS zoom-on-focus: inputs must be >=16px */
        .contact-form-wrap .field__input,
        .contact-form-wrap .field__select,
        .contact-form-wrap .field__textarea { font-size: 16px; }
        .cf-success {
          text-align: center;
          padding: 3rem 1.5rem;
          background: var(--primary-soft);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(0,132,108,0.15);
        }
        .cf-success h4 {
          font-size: 1.15rem;
          margin-bottom: 0.35rem;
          color: var(--text-dark);
        }
        .cf-success p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        /* ── ≥480: name + phone side by side ── */
        @media (min-width: 480px) {
          .cf-row { grid-template-columns: 1fr 1fr; }
        }
        /* ── ≥768: roomier form ── */
        @media (min-width: 768px) {
          .contact-form-wrap { padding: 1.75rem; }
        }
        /* ── ≥992: full section rhythm ── */
        @media (min-width: 992px) {
          .contact-sec { padding: var(--gap-5xl) 0; }
          .contact-form-wrap { padding: 2.75rem; }
        }
      `}</style>
    </section>
  )
}
