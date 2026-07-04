import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { FaStar, FaQuoteRight } from 'react-icons/fa'

function usePerPage() {
  const [perPage, setPerPage] = useState(3)
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      setPerPage(w <= 640 ? 1 : w <= 991 ? 2 : 3)
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])
  return perPage
}

const reviews = [
  {
    quote: 'My daughter went from struggling in maths to scoring 96% in HSC. The daily doubt sessions and personal mentor made all the difference.',
    name: 'Rukhsana Shaikh',
    role: 'Parent of HSC Science Student',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=45'
  },
  {
    quote: 'The Hindi medium batch was a blessing. Finally a coaching class in Govandi that teaches in the language I actually understand.',
    name: 'Aman Gupta',
    role: 'SSC Board - 92%',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=12'
  },
  {
    quote: 'Professors here are genuinely experienced, not part-timers. Weekly tests kept me on track and the analytics showed exactly where to improve.',
    name: 'Faizan Ansari',
    role: 'TY B.Com - University Topper',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=33'
  },
  {
    quote: 'AC classrooms, silent study halls and monthly parent meetings - everything is organised. Worth every rupee for my son\'s 11th & 12th.',
    name: 'Nusrat Parveen',
    role: 'Parent of HSC Commerce Student',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=27'
  },
  {
    quote: 'I joined as a drop-year student and the morning batch schedule was perfect. Cleared my exams with a strong score. Highly recommend.',
    name: 'Sana Khan',
    role: 'HSC Repeater - 88%',
    rating: 5,
    avatar: 'https://i.pravatar.cc/120?img=24'
  }
]

export default function Reviews() {
  const [page, setPage] = useState(0)
  const perPage = usePerPage()
  const maxPage = Math.max(0, Math.ceil(reviews.length / perPage) - 1)
  const safePage = Math.min(page, maxPage)
  const start = safePage * perPage
  const visible = reviews.slice(start, start + perPage)

  useEffect(() => { if (page > maxPage) setPage(maxPage) }, [maxPage, page])

  const prev = () => setPage(p => Math.max(0, p - 1))
  const next = () => setPage(p => Math.min(maxPage, p + 1))

  return (
    <section id="reviews" className="rev-sec">
      <div className="wrap">
        <div className="rev-head">
          <div>
            <span className="eyebrow">Testimonials</span>
            <h2 className="rev-title">
              What Parents & Students <em className="accent-serif">Say</em>
            </h2>
          </div>
          <div className="rev-nav">
            <button className="rev-arrow" onClick={prev} disabled={safePage === 0} aria-label="Previous reviews">
              <FiArrowLeft />
            </button>
            <button className="rev-arrow rev-arrow--primary" onClick={next} disabled={safePage === maxPage} aria-label="Next reviews">
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="rev-track">
          <AnimatePresence mode="wait">
            <motion.div
              key={safePage}
              className="rev-grid"
              style={{ '--per-page': perPage }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {visible.map((r, i) => (
                <div key={start + i} className="rev-card">
                  <FaQuoteRight className="rev-card__quote-mark" />
                  <div className="rev-card__stars">
                    {Array.from({ length: r.rating }).map((_, s) => <FaStar key={s} />)}
                  </div>
                  <p className="rev-card__text">{r.quote}</p>
                  <div className="rev-card__author">
                    <img src={r.avatar} alt={r.name} className="rev-card__avatar" loading="lazy" />
                    <div>
                      <span className="rev-card__name">{r.name}</span>
                      <span className="rev-card__role">{r.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="rev-dots">
          {Array.from({ length: maxPage + 1 }).map((_, i) => (
            <button
              key={i}
              className={`rev-dot ${i === safePage ? 'active' : ''}`}
              onClick={() => setPage(i)}
              aria-label={`Go to review page ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .rev-sec {
          background: var(--white);
          padding: var(--gap-5xl) 0;
        }
        .rev-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: var(--gap-2xl);
        }
        .rev-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
        }
        .rev-title em { color: var(--blue); }
        .rev-nav { display: flex; gap: 0.6rem; }
        .rev-arrow {
          width: 46px; height: 46px;
          border-radius: 50%;
          border: 1.5px solid var(--border-strong);
          background: var(--white);
          color: var(--text-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          transition: all 0.3s var(--ease);
        }
        .rev-arrow:hover:not(:disabled) { border-color: var(--blue); color: var(--blue); }
        .rev-arrow:disabled { opacity: 0.35; cursor: not-allowed; }
        .rev-arrow--primary {
          background: var(--blue);
          border-color: var(--blue);
          color: var(--text-white);
        }
        .rev-arrow--primary:hover:not(:disabled) {
          background: var(--blue-dark);
          border-color: var(--blue-dark);
          color: var(--text-white);
        }
        .rev-grid {
          display: grid;
          grid-template-columns: repeat(var(--per-page, 3), 1fr);
          gap: 1.5rem;
        }
        .rev-card {
          position: relative;
          background: var(--gray-50);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 2rem;
          overflow: hidden;
          transition: all 0.35s var(--ease);
        }
        .rev-card:hover {
          border-color: var(--blue-light);
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .rev-card__quote-mark {
          position: absolute;
          top: 1.5rem; right: 1.5rem;
          font-size: 2rem;
          color: var(--blue);
          opacity: 0.1;
        }
        .rev-card__stars {
          display: flex;
          gap: 0.2rem;
          color: var(--amber);
          font-size: 0.85rem;
          margin-bottom: 1rem;
        }
        .rev-card__text {
          font-size: 0.95rem;
          color: var(--text-body);
          line-height: 1.7;
          margin-bottom: 1.75rem;
        }
        .rev-card__author {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
        }
        .rev-card__avatar {
          width: 46px; height: 46px;
          border-radius: 50%;
          object-fit: cover;
        }
        .rev-card__name {
          display: block;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--text-dark);
        }
        .rev-card__role {
          display: block;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .rev-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: var(--gap-xl);
        }
        .rev-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          border: none;
          background: var(--border-strong);
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .rev-dot.active { background: var(--blue); width: 24px; border-radius: 99px; }
      `}</style>
    </section>
  )
}
