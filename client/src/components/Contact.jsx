import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'

const info = [
  { icon: <FaMapMarkerAlt />, label: 'Visit Us', value: '1st & 2nd Floor, Rikshaw stand, Plot no 33/K/1,2, Near Baiganwadi, Above City Bakery, Govandi West, Mumbai – 400043' },
  { icon: <FaPhoneAlt />, label: 'Call', value: '+91 92211 05658', href: 'tel:+919221105658' },
  { icon: <FaWhatsapp />, label: 'WhatsApp', value: '+91 92211 05658 · Instant Reply', href: 'https://wa.me/919221105658', color: '#25D366' },
  { icon: <FaEnvelope />, label: 'Email', value: 'admissions@muntazarclasses.com', href: 'mailto:admissions@muntazarclasses.com' },
  { icon: <FaClock />, label: 'Hours', value: 'Mon–Sat: 10 AM – 8:30 PM\nSunday: 10 AM – 2 PM' }
]

export default function Contact({ onEnquirySubmit }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: 'School Section (5th to 10th)', message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try { await onEnquirySubmit(form); setDone(true); setForm({ name: '', phone: '', email: '', course: 'School Section (5th to 10th)', message: '' }) }
    catch (err) { console.error(err) }
    setLoading(false)
  }

  return (
    <section id="contact" className="contact-sec">
      <div className="wrap">

        <div className="contact-header">
          <div className="contact-header__left">
            <span className="eyebrow">Get in Touch</span>
            <h2 className="contact-header__title">
              Start Your <em className="accent-serif">Journey</em>
            </h2>
          </div>
        </div>

        <div className="contact-grid">

          {/* Info Column */}
          <div className="contact-info">
            {info.map((item, i) => {
              const Inner = (
                <div className="ci-item" key={i}>
                  <span className="ci-icon" style={item.color ? { color: item.color } : {}}>{item.icon}</span>
                  <div>
                    <span className="ci-label">{item.label}</span>
                    <span className="ci-value">{item.value}</span>
                  </div>
                </div>
              )
              return item.href ? (
                <a key={i} href={item.href} target={item.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="ci-link">
                  {Inner}
                </a>
              ) : Inner
            })}

            <a
              href="https://maps.google.com/?q=Mulund+West+Station+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-map-btn"
            >
              <FaMapMarkerAlt />
              <span>View on Google Maps</span>
              <FiArrowUpRight />
            </a>
          </div>

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
                    <option>School Section (5th to 10th)</option>
                    <option>College Section (11th & 12th)</option>
                    <option>Degree Section (B.Com, BAF, BMS)</option>
                  </select>
                </div>

                <div className="field">
                  <label className="field__label">Message (optional)</label>
                  <textarea name="message" rows="3" value={form.message} onChange={handleChange} placeholder="Any specific questions or goals..." className="field__textarea" />
                </div>

                <button type="submit" className="btn btn--blue btn--lg" disabled={loading} style={{ width: '100%' }}>
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
          padding: var(--gap-5xl) 0;
        }
        .contact-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: var(--gap-3xl);
        }
        .contact-header__title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          margin-bottom: 0.5rem;
        }
        .contact-header__title em { color: var(--blue); }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: var(--gap-3xl);
          align-items: start;
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .ci-link { text-decoration: none; }
        .ci-item {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
          padding: 1rem 1.25rem;
          background: var(--gray-50);
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          transition: all 0.3s var(--ease);
        }
        .ci-link:hover .ci-item { border-color: var(--blue); }
        .ci-icon {
          color: var(--blue);
          font-size: 1rem;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .ci-label {
          display: block;
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-faint);
          margin-bottom: 2px;
        }
        .ci-value {
          display: block;
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--text-dark);
          white-space: pre-line;
          line-height: 1.5;
        }
        .contact-map-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 1.1rem;
          background: var(--blue-deep);
          color: var(--text-white);
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s var(--ease);
          margin-top: 0.5rem;
        }
        .contact-map-btn svg:first-child { color: rgba(255,255,255,0.7); }
        .contact-map-btn:hover { background: var(--blue-dark); }
        .contact-form-wrap {
          background: var(--gray-50);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 2.5rem;
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
          grid-template-columns: 1fr 1fr;
          gap: var(--gap-lg);
        }
        .cf-success {
          text-align: center;
          padding: 3rem 1.5rem;
          background: var(--blue-soft);
          border-radius: var(--radius-sm);
          border: 1px solid rgba(26,86,219,0.15);
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
        @media (max-width: 768px) {
          .contact-header { flex-direction: column; align-items: flex-start; }
          .contact-grid { grid-template-columns: 1fr; }
          .cf-row { grid-template-columns: 1fr; }
          .contact-form-wrap { padding: 1.75rem; }
        }
      `}</style>
    </section>
  )
}
