import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiX, FiChevronDown, FiChevronUp, FiSun, FiAward, FiBookOpen, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaCamera } from 'react-icons/fa'
import { LuGraduationCap } from 'react-icons/lu'
import Navbar from './Navbar'
import Footer from './Footer'

/* ═══════════════════════════════════════
   GALLERY DATA — Organized by Event / Category
   ═══════════════════════════════════════ */
const galleryData = [
  {
    title: 'Picnic 2025-26',
    icon: <FiSun />,
    images: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    title: 'Felicitation 2025-26',
    icon: <FiAward />,
    images: [
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    title: 'Classroom Sessions',
    icon: <FiBookOpen />,
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    title: 'Campus Life',
    icon: <LuGraduationCap />,
    images: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    ]
  }
]

/* ── Section Accordion ── */
function GalleryAccordion({ section, defaultOpen, onImageClick }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`gp-section ${open ? 'gp-section--open' : ''}`}>
      <button className="gp-section__header" onClick={() => setOpen(!open)}>
        <div className="gp-section__header-left">
          <span className="gp-section__icon">{section.icon}</span>
          <h2 className="gp-section__title">{section.title}</h2>
          <span className="gp-section__count">{section.images.length} photos</span>
        </div>
        <span className="gp-section__toggle">{open ? <FiChevronUp /> : <FiChevronDown />}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="gp-section__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="gp-section__body-inner">
              <div className="gp-grid">
                {section.images.map((src, i) => (
                  <motion.div
                    key={i}
                    className="gp-item"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    onClick={() => onImageClick(src)}
                  >
                    <img src={src} alt={`${section.title} ${i + 1}`} loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState(null)

  // Flatten all images across all sections
  const allImages = galleryData.flatMap(section => section.images)

  const handlePrev = (e) => {
    if (e) e.stopPropagation()
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))
  }

  const handleNext = (e) => {
    if (e) e.stopPropagation()
    setActiveIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))
  }

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e) => {
      if (activeIndex === null) return
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowLeft') handlePrev(e)
      if (e.key === 'ArrowRight') handleNext(e)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex])

  const handleImageClick = (src) => {
    const index = allImages.findIndex(img => img === src)
    if (index !== -1) {
      setActiveIndex(index)
    }
  }

  return (
    <>
      <Navbar />

      <main className="gp-page">
        <section className="gp-header wrap">
          <Link to="/#gallery" className="gp-back"><FiArrowLeft /> Back to Home</Link>

          <div className="gp-header__title-row">
            <FaCamera className="gp-header__icon" />
            <h1 className="gp-header__title">Photo Gallery</h1>
          </div>
        </section>

        <section className="gp-content wrap">
          {galleryData.map((section, i) => (
            <GalleryAccordion
              key={section.title}
              section={section}
              defaultOpen={i === 0}
              onImageClick={handleImageClick}
            />
          ))}
        </section>
      </main>

      <Footer />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {activeIndex !== null && (
          <div className="lightbox-overlay" onClick={() => setActiveIndex(null)}>
            <button className="lightbox-close" onClick={() => setActiveIndex(null)}><FiX /></button>

            <div className="lightbox-wrapper" onClick={(e) => e.stopPropagation()}>
              {/* Left Nav */}
              <button className="lightbox-nav lightbox-nav--prev" onClick={handlePrev}>
                <FiChevronLeft />
              </button>
              
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={allImages[activeIndex]}
                  alt="Expanded Gallery"
                  className="lightbox-img"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>

              {/* Right Nav */}
              <button className="lightbox-nav lightbox-nav--next" onClick={handleNext}>
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .gp-page { background: var(--gray-50); min-height: 100vh; }

        /* ── Header ── */
        .gp-header { padding-top: 100px; padding-bottom: 1rem; }
        .gp-back {
          display: inline-flex; align-items: center; gap: 0.4rem; color: var(--text-muted);
          text-decoration: none; font-weight: 600; font-size: 0.88rem; margin-bottom: 1.5rem;
          transition: color 0.2s;
        }
        .gp-back:hover { color: var(--blue); }

        .gp-header__title-row {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .gp-header__icon { color: var(--blue); font-size: 1.3rem; }
        .gp-header__title {
          font-size: var(--fs-h2); font-weight: 700; color: var(--text-dark);
        }

        /* ── Content ── */
        .gp-content { padding-top: 1.5rem; padding-bottom: 5rem; display: flex; flex-direction: column; gap: 1.25rem; }

        /* ── Section Accordion ── */
        .gp-section {
          background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg);
          overflow: hidden; transition: border-color 0.3s;
        }
        .gp-section--open { border-color: rgba(26,86,219,0.2); }
        .gp-section__header {
          display: flex; align-items: center; justify-content: space-between; width: 100%;
          padding: 1.15rem 1.25rem; border: none; background: none; cursor: pointer;
          transition: background 0.2s;
        }
        .gp-section__header:hover { background: var(--gray-50); }
        .gp-section__header-left { display: flex; align-items: center; gap: 0.65rem; }
        .gp-section__icon {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--gold-soft); color: var(--gold-dark); font-size: 1.1rem;
          flex-shrink: 0;
        }
        .gp-section__title {
          font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--text-dark);
        }
        .gp-section__count {
          font-size: 0.68rem; font-weight: 600; color: var(--blue); background: var(--blue-soft);
          padding: 0.18rem 0.55rem; border-radius: var(--radius-pill);
        }
        .gp-section__toggle { color: var(--text-muted); font-size: 0.8rem; }
        .gp-section__body { overflow: hidden; }
        .gp-section__body-inner { padding: 0 1.25rem 1.25rem; }

        /* ── Photo Grid — 2x2 on mobile ── */
        .gp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem;
        }
        .gp-item {
          aspect-ratio: 1;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: var(--gray-100);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }
        .gp-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(26,86,219,0.1);
        }
        .gp-item img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s var(--ease);
        }
        .gp-item:hover img { transform: scale(1.05); }

        /* ── Lightbox ── */
        .lightbox-overlay {
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex; align-items: center; justify-content: center;
          z-index: 3000; padding: 1rem;
        }
        .lightbox-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 100%;
          max-height: 100%;
        }
        .lightbox-nav {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 3002;
          width: 48px; height: 48px; border-radius: 50%; border: none;
          background: rgba(255, 255, 255, 0.12); color: white; font-size: 1.5rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .lightbox-nav:hover { background: rgba(255, 255, 255, 0.25); }
        .lightbox-nav--prev { left: 0.5rem; }
        .lightbox-nav--next { right: 0.5rem; }

        @media (min-width: 768px) {
          .lightbox-nav--prev { left: -68px; }
          .lightbox-nav--next { right: -68px; }
        }

        .lightbox-close {
          position: absolute; top: 1rem; right: 1rem;
          background: rgba(255, 255, 255, 0.12); border: none; color: white;
          width: 48px; height: 48px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; cursor: pointer;
          transition: background 0.2s ease; z-index: 3001;
        }
        .lightbox-close:hover { background: rgba(255, 255, 255, 0.25); }
        .lightbox-img {
          max-width: 100%; max-height: calc(100vh - 4rem);
          object-fit: contain; border-radius: var(--radius-sm);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }

        /* ── Responsive ── */
        @media (min-width: 480px) {
          .gp-grid { gap: 0.75rem; }
          .gp-section__header { padding: 1.25rem 1.5rem; }
          .gp-section__body-inner { padding: 0 1.5rem 1.5rem; }
          .gp-section__title { font-size: 1.1rem; }
        }
        @media (min-width: 768px) {
          .gp-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
          .gp-item { aspect-ratio: 4/3; }
          .gp-section__header { padding: 1.25rem 1.75rem; }
          .gp-section__body-inner { padding: 0 1.75rem 1.75rem; }
          .gp-section__title { font-size: 1.15rem; }
          .lightbox-overlay { padding: 2rem; }
          .lightbox-close { top: 1.5rem; right: 1.5rem; }
          .lightbox-img { max-height: 90vh; }
        }
        @media (min-width: 992px) {
          .gp-grid { grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
          .gp-item { aspect-ratio: 1; }
        }
      `}</style>
    </>
  )
}
