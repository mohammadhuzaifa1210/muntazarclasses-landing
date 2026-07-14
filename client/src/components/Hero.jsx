import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaCalendarAlt, FaGraduationCap, FaChalkboardTeacher, FaUsers } from 'react-icons/fa'
import galleryData from '../data/galleryData.generated'

// Folders to EXCLUDE from hero carousel (picnics, trips, outings)
const excludedFolders = [
  'girls-picnic-monteria-2026',
  'boys-trip-murud-alibaug-2026',
  'girls-trip-matheran-2026',
  'movie-time-with-students',
  'nehru-science-centre-2024',
  'Some more'
]

// Dynamically load felicitation + academic/event photos (no picnic/trip)
const felicitationPhotos = galleryData.find(s => s.folder === 'felicitation')?.images || []
const eventPhotos = galleryData
  .filter(s => s.folder !== 'felicitation' && !excludedFolders.includes(s.folder))
  .flatMap(s => s.images)

// Right-side photos cross-fade while the headline stays fixed
const photos = [...felicitationPhotos, ...eventPhotos]

const stats = [
  { value: '18+', label: 'Years of Excellence', icon: <FaCalendarAlt /> },
  { value: '3', label: 'Language Mediums', icon: <FaGraduationCap /> },
  { value: '200+', label: 'Top Board Scorers', icon: <FaChalkboardTeacher /> },
  { value: '35', label: 'Students / Batch', icon: <FaUsers /> }
]

export default function Hero({ onAdmissionClick }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % photos.length), 5000)
    return () => clearInterval(t)
  }, [])

  const nextSlide = () => setIdx(p => (p + 1) % photos.length)
  const prevSlide = () => setIdx(p => (p - 1 + photos.length) % photos.length)

  return (
    <section id="home" className="hero">
      <div className="grid-pattern" />
      <div className="hero__glow hero__glow--a" />
      <div className="hero__glow hero__glow--b" />

      <div className="wrap hero__wrap">
        <div className="hero__grid">
          {/* Left */}
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="hero__title">
              Educating the <span className="hero__accent">New Generation Thinkers</span>
            </h1>

            <p className="hero__desc">
              Nurturing curious minds since 2008 — Hindi, Urdu &amp; English medium coaching for SSC, HSC &amp; Degree in the heart of Govandi, Mumbai.
            </p>

            <div className="hero__btns">
              <button onClick={onAdmissionClick} className="btn btn--primary btn--lg">
                Book Free Demo <FiArrowUpRight />
              </button>
              <a href="#achievements" className="btn btn--outline btn--lg">
                View Results
              </a>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            className="hero__media"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__photo">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  className="hero__photo-wrapper"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <img src={photos[idx]} alt="" className="hero__photo-bg" />
                  <div className="hero__photo-overlay" />
                  <img src={photos[idx]} alt="Students learning at Muntazar Classes - Hindi medium coaching institute in Govandi Mumbai" className="hero__photo-fg" loading="eager" />
                </motion.div>
              </AnimatePresence>
              
              <div className="hero__nav">
                <button className="hero__nav-btn" onClick={prevSlide} aria-label="Previous image">
                  <FiChevronLeft />
                </button>
                <button className="hero__nav-btn" onClick={nextSlide} aria-label="Next image">
                  <FiChevronRight />
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* Docked dark stat bar */}
      <div className="wrap">
        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {stats.map((s, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-icon">{s.icon}</span>
              <div className="hero__stat-text">
                <span className="hero__stat-val">{s.value}</span>
                <span className="hero__stat-lbl">{s.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        /* ===== Base: mobile (≤479px), single-column stack ===== */
        .hero {
          position: relative;
          background: var(--grad-hero);
          padding: calc(56px + 2.25rem) 0 0;
          overflow: hidden;
        }
        .hero__glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .hero__glow--a {
          width: 300px; height: 300px;
          background: rgba(0,132,108,0.15);
          top: -110px; right: -90px;
        }
        .hero__glow--b {
          width: 280px; height: 280px;
          background: rgba(243,112,33,0.08);
          bottom: 40px; left: -120px;
        }
        .hero__wrap { position: relative; z-index: 2; }
        .hero__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--gap-2xl);
          align-items: center;
          text-align: center;
          padding-bottom: var(--gap-2xl);
        }
        .hero__content { max-width: 640px; margin: 0 auto; }
        .hero__title {
          font-size: var(--fs-h1);
          font-weight: 700;
          line-height: 1.14;
          letter-spacing: -0.02em;
          color: var(--text-dark);
          margin-bottom: var(--gap-lg);
        }
        .hero__accent { color: var(--primary); }
        .hero__desc {
          font-size: var(--fs-lead);
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 440px;
          margin: 0 auto var(--gap-xl);
        }
        .hero__btns {
          display: flex;
          flex-direction: column;
          gap: var(--gap-md);
          width: 100%;
        }
        .hero__btns .btn { width: 100%; }

        /* Media */
        .hero__media {
          position: relative;
          max-width: 520px;
          margin: 0 auto;
          width: 100%;
        }
        .hero__photo {
          position: relative;
          aspect-ratio: 4 / 3.2;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: none;
          background: #000;
        }
        .hero__photo-wrapper {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
        }
        .hero__photo-bg {
          position: absolute;
          inset: -10%;
          width: 120%; height: 120%;
          object-fit: cover;
          filter: blur(25px);
          z-index: 1;
        }
        .hero__photo-overlay {
          position: absolute; inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 2;
        }
        .hero__photo-fg {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: contain;
          z-index: 3;
        }
        
        .hero__nav {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          gap: 0.5rem;
          z-index: 10;
        }
        
        .hero__nav-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: var(--text-dark);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.25rem;
          cursor: pointer;
          transition: all 0.2s var(--ease);
        }
        .hero__nav-btn:hover {
          background: var(--white);
          color: var(--primary);
        }
        /* Docked stat bar - 2x2 grid on phone */
        .hero__stats {
          position: relative;
          z-index: 3;
          margin-top: var(--gap-lg);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          background: var(--primary-deep);
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
          box-shadow: none;
          overflow: hidden;
        }
        .hero__stat {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.25rem 1.1rem;
          border-right: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .hero__stat:nth-child(2n) { border-right: none; }
        .hero__stat:nth-child(n+3) { border-bottom: none; }
        .hero__stat-icon {
          color: var(--primary-light);
          font-size: 1.35rem;
          flex-shrink: 0;
        }
        .hero__stat-text { display: flex; flex-direction: column; line-height: 1.15; }
        .hero__stat-val {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-white);
          letter-spacing: -0.02em;
        }
        .hero__stat-lbl {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-white-50);
        }

        /* ===== ≥480px ===== */
        @media (min-width: 480px) {
          .hero__stat { padding: 1.5rem 1.35rem; }
          .hero__stat-val { font-size: 1.6rem; }
        }

        /* ===== ≥768px: inline CTAs, roomier ===== */
        @media (min-width: 768px) {
          .hero { padding-top: calc(56px + 3.25rem); }
          .hero__glow--a { width: 420px; height: 420px; top: -130px; right: -110px; }
          .hero__glow--b { width: 380px; height: 380px; }
          .hero__grid { gap: 3rem; padding-bottom: 3.5rem; }
          .hero__btns {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            width: auto;
          }
          .hero__btns .btn { width: auto; }
        }

        /* ===== ≥992px: two-column layout returns ===== */
        @media (min-width: 992px) {
          .hero { padding-top: calc(62px + 4.5rem); }
          .hero__glow--a { width: 480px; height: 480px; top: -140px; right: -120px; }
          .hero__glow--b { width: 420px; height: 420px; bottom: 40px; left: -160px; }
          .hero__grid {
            grid-template-columns: 1.05fr 0.95fr;
            gap: 3.5rem;
            text-align: left;
            padding-bottom: var(--gap-3xl);
          }
          .hero__content { max-width: 580px; margin: 0; }
          .hero__desc { margin: 0 0 2.25rem; }
          .hero__btns { justify-content: flex-start; }
          .hero__media { max-width: none; margin: 0; }
          .hero__photo { aspect-ratio: 4 / 3.4; }

          .hero__stats { margin-top: 0; grid-template-columns: repeat(4, 1fr); }
          .hero__stat {
            padding: 1.85rem 1.75rem;
            border-right: 1px solid rgba(255,255,255,0.1);
            border-bottom: none;
          }
          .hero__stat:nth-child(2n) { border-right: 1px solid rgba(255,255,255,0.1); }
          .hero__stat:last-child { border-right: none; }
          .hero__stat-val { font-size: 1.65rem; }
        }

        /* ===== ≥1240px: extra breathing room ===== */
        @media (min-width: 1240px) {
          .hero__grid { gap: 4rem; }
        }
      `}</style>
    </section>
  )
}
