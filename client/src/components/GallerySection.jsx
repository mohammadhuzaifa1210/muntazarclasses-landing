import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiX } from 'react-icons/fi'

const previewImages = [
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80'
]

export default function GallerySection({ onViewAll }) {
  const [selectedImg, setSelectedImg] = useState(null)

  return (
    <section id="gallery" className="gallery-sec">
      <div className="wrap">
        <div className="gallery-head">
          <div>
            <span className="eyebrow">Campus Life</span>
            <h2 className="gallery-title">Our <em className="accent-serif">Gallery</em></h2>
          </div>
          <button onClick={onViewAll} className="btn btn--blue btn--sm show-desktop">
            View All Photos <FiArrowRight />
          </button>
        </div>

        <div className="gallery-grid">
          {previewImages.map((src, i) => (
            <motion.div
              key={i}
              className="gallery-item"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onClick={() => setSelectedImg(src)}
              style={{ cursor: 'pointer' }}
            >
              <img src={src} alt={`Muntazar Classes Gallery ${i + 1}`} loading="lazy" />
            </motion.div>
          ))}
        </div>

        <div className="show-mobile" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button onClick={onViewAll} className="btn btn--blue btn--sm" style={{ width: '100%' }}>
            View All Photos <FiArrowRight />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <div className="lightbox-overlay" onClick={() => setSelectedImg(null)}>
            <button className="lightbox-close" onClick={() => setSelectedImg(null)}><FiX /></button>
            <motion.img 
              src={selectedImg} 
              alt="Expanded Gallery" 
              className="lightbox-img"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </AnimatePresence>

      <style>{`
        /* ── Base: phone (≤479px) ── */
        .gallery-sec {
          background: var(--gray-50);
          padding: var(--gap-3xl) 0;
          border-top: 1px solid var(--border);
        }
        .gallery-head {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--gap-sm);
          margin-bottom: var(--gap-xl);
        }
        .gallery-title { font-size: var(--fs-h2); }
        .gallery-title em { color: var(--blue); }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--gap-sm);
        }
        .gallery-item {
          aspect-ratio: 1;
          border-radius: var(--radius);
          overflow: hidden;
          background: var(--border);
          box-shadow: var(--shadow-sm);
        }
        .gallery-item img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease);
        }
        .gallery-item:hover img {
          transform: scale(1.05);
        }

        /* ── ≥480px: large phones — 2 columns, roomier gap ── */
        @media (min-width: 480px) {
          .gallery-grid { gap: var(--gap-md); }
        }

        /* ── ≥768px: tablet — head goes horizontal ── */
        @media (min-width: 768px) {
          .gallery-sec { padding: var(--gap-4xl) 0; }
          .gallery-head {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            margin-bottom: var(--gap-2xl);
          }
        }

        /* ── ≥992px: full grid — 4 columns ── */
        @media (min-width: 992px) {
          .gallery-grid { grid-template-columns: repeat(4, 1fr); }
          .gallery-item { aspect-ratio: 4/5; }
        }

        /* ── Full-screen lightbox ── */
        .lightbox-overlay {
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
          padding: 1rem;
        }
        .lightbox-close {
          position: absolute; top: 1rem; right: 1rem;
          background: rgba(255, 255, 255, 0.14);
          border: none;
          color: white;
          width: 48px; height: 48px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
          cursor: pointer;
          transition: background 0.2s ease;
          z-index: 3001;
          -webkit-tap-highlight-color: transparent;
        }
        .lightbox-close:hover,
        .lightbox-close:active { background: rgba(255, 255, 255, 0.28); }
        .lightbox-img {
          max-width: 100%;
          max-height: calc(100vh - 5rem);
          object-fit: contain;
          border-radius: var(--radius-sm);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }

        @media (min-width: 768px) {
          .lightbox-overlay { padding: 2rem; }
          .lightbox-close { top: 1.5rem; right: 1.5rem; width: 44px; height: 44px; font-size: 1.5rem; }
          .lightbox-img { max-height: 90vh; }
        }
      `}</style>
    </section>
  )
}
