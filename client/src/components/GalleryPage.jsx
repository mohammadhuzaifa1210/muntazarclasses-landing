import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronUp, FiX } from 'react-icons/fi'
import galleryData from '../data/galleryData.generated'
import Navbar from './Navbar'
import Footer from './Footer'

function GalleryAccordion({ section, isOpen, onToggle, onImageClick }) {
  const accordionRef = React.useRef(null)

  React.useEffect(() => {
    if (isOpen && accordionRef.current) {
      setTimeout(() => {
        const yOffset = -100 // adjust for fixed navbar height
        const element = accordionRef.current
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }, 160) // reduced delay to match the faster animation
    }
  }, [isOpen])

  return (
    <article ref={accordionRef} className={`gp-section ${isOpen ? 'gp-section--open' : ''}`}>
      <button className="gp-section__header" onClick={onToggle} aria-expanded={isOpen}>
        <span className="gp-section__header-left">
          <span className="gp-section__title">{section.title}</span>
          <span className="gp-section__count">{section.images.length} {section.images.length === 1 ? 'photo' : 'photos'}</span>
        </span>
        <span className="gp-section__toggle">{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key="content" className="gp-section__body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.15 }}>
            <div className="gp-section__body-inner">
              {section.images.length ? (
                <div className="gp-grid">
                  {section.images.map((src, index) => (
                    <motion.button key={src} className="gp-item" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} onClick={() => onImageClick(src)}>
                      <img src={src} alt={`${section.title} ${index + 1}`} loading="lazy" />
                    </motion.button>
                  ))}
                </div>
              ) : <p className="gp-section__empty">Photos for this album will be added soon.</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState(null)
  const allPhotos = galleryData.flatMap((section) => section.images.map((src) => ({ src, album: section.title })))
  const firstAlbumWithPhotos = galleryData.findIndex((section) => section.images.length > 0)
  
  const [activeAccordion, setActiveAccordion] = useState(firstAlbumWithPhotos)

  const closeLightbox = () => setActiveIndex(null)
  const previousImage = () => setActiveIndex((index) => index > 0 ? index - 1 : allPhotos.length - 1)
  const nextImage = () => setActiveIndex((index) => index < allPhotos.length - 1 ? index + 1 : 0)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (activeIndex === null) return
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') previousImage()
      if (event.key === 'ArrowRight') nextImage()
    }
    document.body.style.overflow = activeIndex === null ? '' : 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, allPhotos.length])

  return (
    <>
      <Navbar />
      <main className="gp-page">
        <section className="gp-header wrap">
          <Link to="/#gallery" className="gp-back"><FiArrowLeft /> Back to Home</Link>
          <div className="gp-header__title-row"><h1>Photo Gallery</h1></div>
        </section>
        <section className="gp-content wrap">
          {galleryData.map((section, index) => (
            <GalleryAccordion 
              key={section.folder} 
              section={section} 
              isOpen={activeAccordion === index} 
              onToggle={() => setActiveAccordion(activeAccordion === index ? null : index)}
              onImageClick={(src) => setActiveIndex(allPhotos.findIndex((photo) => photo.src === src))} 
            />
          ))}
        </section>
      </main>
      <Footer />

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div key="lightbox" className="lightbox-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeLightbox}>
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close photo"><FiX /></button>
            <div className="lightbox-wrapper" onClick={(event) => event.stopPropagation()}>
              <button className="lightbox-nav lightbox-nav--prev" onClick={previousImage} aria-label="Previous photo"><FiChevronLeft /></button>
              <motion.img key={allPhotos[activeIndex].src} src={allPhotos[activeIndex].src} alt={allPhotos[activeIndex].album} className="lightbox-img" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} />
              <button className="lightbox-nav lightbox-nav--next" onClick={nextImage} aria-label="Next photo"><FiChevronRight /></button>
            </div>
            <p className="lightbox-caption">{allPhotos[activeIndex].album}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gp-page { background: var(--gray-50); min-height: 100vh; }
        .gp-header { padding-top: 100px; padding-bottom: 1rem; }
        .gp-back { display: inline-flex; align-items: center; gap: .4rem; color: var(--text-muted); text-decoration: none; font-weight: 600; font-size: .88rem; margin-bottom: 1.5rem; }
        .gp-back:hover { color: var(--primary); }
        .gp-header__title-row { display: flex; align-items: center; gap: .75rem; color: var(--text-dark); }
        .gp-header__title-row h1 { font-size: var(--fs-h2); font-weight: 700; }
        .gp-header__icon { color: var(--primary); font-size: 1.3rem; }
        .gp-content { padding: 1.5rem 0 5rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .gp-section { background: var(--white); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
        .gp-section--open { border-color: rgba(0,132,108,.2); }
        .gp-section__header { display: flex; width: 100%; align-items: center; justify-content: space-between; padding: 1.15rem 1.25rem; background: none; border: 0; cursor: pointer; text-align: left; }
        .gp-section__header:hover { background: var(--gray-50); }
        .gp-section__header-left { display: flex; min-width: 0; align-items: center; gap: .65rem; }
        .gp-section__title { color: var(--text-dark); font-family: var(--font-display); font-size: 1rem; font-weight: 700; }
        .gp-section__count { flex: none; border-radius: var(--radius-pill); background: var(--primary-soft); color: var(--primary); padding: .18rem .55rem; font-size: .68rem; font-weight: 600; }
        .gp-section__toggle { color: var(--text-muted); margin-left: .75rem; }
        .gp-section__body { overflow: hidden; }
        .gp-section__body-inner { padding: 0 1.25rem 1.25rem; }
        .gp-section__empty { margin: 0; color: var(--text-muted); font-size: .9rem; }
        .gp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: .6rem; }
        .gp-item { aspect-ratio: 1; overflow: hidden; padding: 0; border: 0; border-radius: var(--radius-sm); background: var(--gray-100); cursor: pointer; }
        .gp-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s var(--ease); }
        .gp-item:hover img { transform: scale(1.05); }
        .lightbox-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 1rem; background: rgba(0,0,0,.9); }
        .lightbox-wrapper { position: relative; display: flex; max-width: 100%; max-height: 100%; align-items: center; justify-content: center; }
        .lightbox-img { max-width: 100%; max-height: calc(100vh - 4rem); object-fit: contain; border-radius: var(--radius-sm); box-shadow: none; }
        .lightbox-caption { position: fixed; z-index: 3002; bottom: 1.25rem; left: 50%; max-width: calc(100% - 2rem); margin: 0; transform: translateX(-50%); border-radius: var(--radius-pill); background: rgba(0,0,0,.6); color: var(--white); padding: .5rem 1rem; font-size: .85rem; font-weight: 600; text-align: center; }
        .lightbox-close, .lightbox-nav { display: flex; align-items: center; justify-content: center; border: 0; border-radius: 50%; background: rgba(15,23,42,.6); color: white; cursor: pointer; transition: background .2s; }
        .lightbox-close:hover, .lightbox-nav:hover { background: rgba(15,23,42,.85); }
        .lightbox-close { position: absolute; top: 1rem; right: 1rem; z-index: 2; width: 48px; height: 48px; font-size: 1.5rem; }
        .lightbox-nav { position: fixed; top: 50%; z-index: 3001; width: 44px; height: 44px; transform: translateY(-50%); font-size: 1.5rem; }
        .lightbox-nav--prev { left: 0.5rem; } .lightbox-nav--next { right: 0.5rem; }
        @media (min-width: 768px) { .gp-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; } .gp-item { aspect-ratio: 4 / 3; } .gp-section__header { padding: 1.25rem 1.75rem; } .gp-section__body-inner { padding: 0 1.75rem 1.75rem; } .lightbox-nav--prev { left: 2rem; } .lightbox-nav--next { right: 2rem; } }
        @media (min-width: 992px) { .gp-grid { grid-template-columns: repeat(4, 1fr); gap: 1.25rem; } .gp-item { aspect-ratio: 1; } }
      `}</style>
    </>
  )
}
