import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiX } from 'react-icons/fi'
import galleryData from '../data/galleryData.generated'

const SHUFFLE_INTERVAL = 5.5 * 60 * 60 * 1000
const allGalleryImages = galleryData
  .flatMap((album) => album.images.map((src) => ({ src, album: album.title })))

function getPreviewImages() {
  const images = [...allGalleryImages]
  let seed = Math.floor(Date.now() / SHUFFLE_INTERVAL) + 1

  const random = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  for (let index = images.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1))
    ;[images[index], images[randomIndex]] = [images[randomIndex], images[index]]
  }

  return images.slice(0, 4)
}

export default function GallerySection({ onViewAll }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [previewImages, setPreviewImages] = useState(getPreviewImages)

  useEffect(() => {
    let shuffleTimer
    const scheduleNextShuffle = () => {
      const timeUntilNextShuffle = SHUFFLE_INTERVAL - (Date.now() % SHUFFLE_INTERVAL)
      shuffleTimer = window.setTimeout(() => {
        setPreviewImages(getPreviewImages())
        scheduleNextShuffle()
      }, timeUntilNextShuffle)
    }
    scheduleNextShuffle()
    return () => window.clearTimeout(shuffleTimer)
  }, [])

  return (
    <section id="gallery" className="gallery-sec">
      <div className="wrap">
        <div className="gallery-head">
          <div>
            <span className="eyebrow">Campus Life</span>
            <h2 className="gallery-title">Our <em className="accent-serif">Gallery</em></h2>
          </div>
          <button onClick={onViewAll} className="btn btn--primary btn--sm show-desktop">
            View All Photos <FiArrowRight />
          </button>
        </div>

        <div className="gallery-grid">
          {previewImages.map(({ src, album }, index) => (
            <motion.div
              key={src}
              className="gallery-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedPhoto({ src, album })}
              style={{ cursor: 'pointer' }}
            >
              <img src={src} alt={`${album} ${index + 1}`} loading="lazy" />
            </motion.div>
          ))}
        </div>

        <div className="show-mobile" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button onClick={onViewAll} className="btn btn--primary btn--sm" style={{ width: '100%' }}>
            View All Photos <FiArrowRight />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <div className="lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
            <button className="lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Close photo"><FiX /></button>
            <motion.img
              src={selectedPhoto.src}
              alt={selectedPhoto.album}
              className="lightbox-img"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
            />
            <p className="gallery-lightbox-caption">{selectedPhoto.album}</p>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-sec { background: var(--gray-50); padding: var(--gap-3xl) 0; border-top: 1px solid var(--border); }
        .gallery-head { display: flex; flex-direction: column; align-items: flex-start; gap: var(--gap-sm); margin-bottom: var(--gap-xl); }
        .gallery-title { font-size: var(--fs-h2); }
        .gallery-title em { color: var(--accent); }
        .gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--gap-sm); }
        .gallery-item { aspect-ratio: 1; overflow: hidden; border-radius: var(--radius); background: var(--border); box-shadow: none; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s var(--ease); }
        .gallery-item:hover img { transform: scale(1.05); }
        .lightbox-overlay { position: fixed; inset: 0; z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 1rem; background: rgba(0,0,0,.9); }
        .lightbox-close { position: absolute; top: 1rem; right: 1rem; z-index: 3001; display: flex; width: 48px; height: 48px; align-items: center; justify-content: center; border: 0; border-radius: 50%; background: rgba(15,23,42,.6); color: white; font-size: 1.6rem; cursor: pointer; transition: background .2s; }
        .lightbox-close:hover { background: rgba(15,23,42,.85); }
        .lightbox-img { max-width: 100%; max-height: calc(100vh - 5rem); object-fit: contain; border-radius: var(--radius-sm); box-shadow: none; }
        .gallery-lightbox-caption { position: fixed; z-index: 3002; bottom: 1.25rem; left: 50%; max-width: calc(100% - 2rem); margin: 0; transform: translateX(-50%); border-radius: var(--radius-pill); background: rgba(0,0,0,.6); color: var(--white); padding: .5rem 1rem; font-size: .85rem; font-weight: 600; text-align: center; }
        @media (min-width: 480px) { .gallery-grid { gap: var(--gap-md); } }
        @media (min-width: 768px) { .gallery-sec { padding: var(--gap-4xl) 0; } .gallery-head { flex-direction: row; align-items: flex-end; justify-content: space-between; margin-bottom: var(--gap-2xl); } .lightbox-overlay { padding: 2rem; } .lightbox-close { top: 1.5rem; right: 1.5rem; width: 44px; height: 44px; font-size: 1.5rem; } .lightbox-img { max-height: 90vh; } }
        @media (min-width: 992px) { .gallery-grid { grid-template-columns: repeat(4, 1fr); } .gallery-item { aspect-ratio: 4 / 5; } }
      `}</style>
    </section>
  )
}
