import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiX } from 'react-icons/fi'
import Navbar from './Navbar'
import Footer from './Footer'

const allImages = [
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'
]

export default function GalleryPage() {
  const [selectedImg, setSelectedImg] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />

      <main className="gallery-page">
        <section className="gallery-page__content wrap">
          <Link to="/" className="back-link" style={{ color: 'var(--blue)', marginBottom: '2rem' }}>
            <FiArrowLeft /> Back to Home
          </Link>
          <div className="masonry-grid">
            {allImages.map((src, i) => (
              <motion.div
                key={i}
                className="masonry-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                onClick={() => setSelectedImg(src)}
                style={{ cursor: 'pointer' }}
              >
                <img src={src} alt={`Gallery ${i + 1}`} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

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
        .gallery-page {
          min-height: 100vh;
          background: var(--white);
          padding-top: 80px; /* offset navbar */
        }
        .gallery-page__content {
          padding: var(--gap-4xl) 0;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }
        .back-link:hover { color: var(--blue-dark); }
        .masonry-grid {
          columns: 3 300px;
          column-gap: 1.5rem;
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background: var(--gray-50);
        }
        .masonry-item img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s var(--ease);
        }
        .masonry-item:hover img {
          transform: scale(1.03);
        }

        @media (max-width: 768px) {
          .masonry-grid { columns: 2 150px; column-gap: 1rem; }
          .masonry-item { margin-bottom: 1rem; }
          .gallery-page__hero { padding: var(--gap-3xl) 0; }
        }

        .lightbox-overlay {
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
          padding: 2rem;
        }
        .lightbox-close {
          position: absolute; top: 1.5rem; right: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          width: 44px; height: 44px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          transition: background 0.2s ease;
          z-index: 3001;
        }
        .lightbox-close:hover { background: rgba(255, 255, 255, 0.25); }
        .lightbox-img {
          max-width: 100%; max-height: 90vh;
          object-fit: contain;
          border-radius: var(--radius-sm);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
      `}</style>
    </>
  )
}
