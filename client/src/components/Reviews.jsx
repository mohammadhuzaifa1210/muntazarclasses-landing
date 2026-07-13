import React, { useState, useRef, useCallback } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { FaStar, FaQuoteRight } from 'react-icons/fa'

const reviews = [
  {
    quote: "Amazing classes!! The teachers and staff are so sweet 🤍 Come if you want to study and laugh at the same time. It is no less than a Comedy show (knowledgeable) Highly recommended!",
    name: "Falak Sayyed",
    role: "Google Local Guide",
    rating: 5
  },
  {
    quote: "Muntazar Classes is the one stop solution for all the students who quest for the good quality learning and professional faculty. You just need to take the admission and they will guide you towards the right path.",
    name: "Sayyed Saim Mehdi",
    role: "Student",
    rating: 5
  },
  {
    quote: "I took coaching for my 10th board exam from muntazar classes...and scored 86% in my board exam...and now continuing my study from the 'muntazar classes'. I trust muntazar classes and you too can 👍",
    name: "Mahi Shaikh",
    role: "SSC Board - 86%",
    rating: 5
  },
  {
    quote: "Best coaching institute in govandi slum . You will not get any better classes then this . I don't want to tell about this, their record will itself tell you about their success .",
    name: "Sahil Abbas Sayyed",
    role: "Student",
    rating: 5
  },
  {
    quote: "Hello everyone! I'd like to share my amazing experience at Muntazar Classes. The teachers here are incredibly supportive and make learning enjoyable. They explain concepts clearly and always encourage us to ask questions.",
    name: "Batco Roadlines",
    role: "Student",
    rating: 5
  },
  {
    quote: "My name is khan sidra i had joined muntazar classes in 10th and i got 81%👍, now i am in 11th and i am still studying into muntazar classes🤲",
    name: "Sadiqa Anam Khan",
    role: "Student",
    rating: 5
  },
  {
    quote: "I learn lots of thing and lots of knowledge about 10th class this is the best classes for everyone and I approve you want successfully life so joined the muntazar classes best for science/commerce.",
    name: "Khan Anas",
    role: "Student",
    rating: 5
  }
]

export default function Reviews() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  // Track which card is centered in the scroll-snap viewport (phone/tablet carousel).
  const handleScroll = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const cards = track.children
    const center = track.scrollLeft + track.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    for (let i = 0; i < cards.length; i++) {
      const c = cards[i]
      const cCenter = c.offsetLeft + c.offsetWidth / 2
      const d = Math.abs(cCenter - center)
      if (d < bestDist) { bestDist = d; best = i }
    }
    setActive(best)
  }, [])

  const scrollToCard = useCallback((i) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[i]
    if (!card) return
    const left = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
    track.scrollTo({ left, behavior: 'smooth' })
  }, [])

  const prev = () => scrollToCard(Math.max(0, active - 1))
  const next = () => scrollToCard(Math.min(reviews.length - 1, active + 1))

  return (
    <section id="reviews" className="rev-sec">
      <div className="wrap">
        <div className="rev-head">
          <div>
            <span className="eyebrow">Testimonials</span>
            <h2 className="rev-title">
              What Parents &amp; Students <em className="accent-serif">Say</em>
            </h2>
            <div className="rev-summary">
              <span className="rev-summary__score">4.9</span>
              <div className="rev-summary__stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <span className="rev-summary__count">Based on 71 Google Reviews</span>
            </div>
          </div>
          <div className="rev-nav">
            <button className="rev-arrow" onClick={prev} disabled={active === 0} aria-label="Previous reviews">
              <FiArrowLeft />
            </button>
            <button className="rev-arrow rev-arrow--primary" onClick={next} disabled={active === reviews.length - 1} aria-label="Next reviews">
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="rev-track" ref={trackRef} onScroll={handleScroll}>
          {reviews.map((r, i) => (
            <div key={i} className="rev-card">
              <FaQuoteRight className="rev-card__quote-mark" />
              <div className="rev-card__stars">
                {Array.from({ length: r.rating }).map((_, s) => <FaStar key={s} />)}
              </div>
              <p className="rev-card__text">{r.quote}</p>
              <div className="rev-card__author">
                <span className="rev-card__avatar">{r.name.charAt(0)}</span>
                <div>
                  <span className="rev-card__name">{r.name}</span>
                  <span className="rev-card__role">{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rev-dots">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`rev-dot ${i === active ? 'active' : ''}`}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* ─── Mobile-first: base = phone (≤479px) ─── */
        .rev-sec {
          background: var(--white);
          padding: var(--gap-3xl) 0;
        }
        .rev-head {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: var(--gap-lg);
          margin-bottom: var(--gap-xl);
        }
        .rev-title {
          font-size: var(--fs-h2);
          line-height: 1.15;
          margin-bottom: var(--gap-md);
        }
        .rev-title em { color: var(--accent); }
        
        /* ─── Rating Summary ─── */
        .rev-summary {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        .rev-summary__score {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-dark);
        }
        .rev-summary__stars {
          display: flex;
          gap: 0.15rem;
          color: var(--amber);
          font-size: 1.1rem;
        }
        .rev-summary__count {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* Nav arrows are hidden on phone — swipe is the primary affordance. */
        .rev-nav { display: none; gap: var(--gap-sm); }
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
        .rev-arrow:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
        .rev-arrow:disabled { opacity: 0.35; cursor: not-allowed; }
        .rev-arrow--primary {
          background: var(--primary);
          border-color: var(--primary);
          color: var(--text-white);
        }
        .rev-arrow--primary:hover:not(:disabled) {
          background: var(--primary-dark);
          border-color: var(--primary-dark);
          color: var(--text-white);
        }

        /* ─── Carousel track: native touch swipe via scroll-snap ─── */
        .rev-track {
          display: flex;
          gap: var(--gap-md);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          /* Peek padding so a centred card shows a sliver of its neighbours. */
          padding: 0.5rem 7vw;
          margin: 0 -1.25rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .rev-track::-webkit-scrollbar { display: none; }

        .rev-card {
          position: relative;
          flex: 0 0 86vw;
          scroll-snap-align: center;
          background: var(--gray-50);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: var(--gap-lg);
          overflow: hidden;
          transition: border-color 0.35s var(--ease), box-shadow 0.35s var(--ease);
        }
        .rev-card__quote-mark {
          position: absolute;
          top: 1.5rem; right: 1.5rem;
          font-size: 2rem;
          color: var(--primary);
          opacity: 0.1;
        }
        .rev-card__stars {
          display: flex;
          gap: 0.2rem;
          color: var(--amber);
          font-size: 0.85rem;
          margin-bottom: var(--gap-md);
        }
        .rev-card__text {
          font-size: var(--fs-body);
          color: var(--text-body);
          line-height: 1.7;
          margin-bottom: var(--gap-lg);
          overflow-wrap: break-word;
        }
        .rev-card__author {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding-top: var(--gap-md);
          border-top: 1px solid var(--border);
        }
        .rev-card__avatar {
          width: 46px; height: 46px;
          border-radius: 50%;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary);
          color: var(--text-white);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          text-transform: uppercase;
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
          margin-top: var(--gap-lg);
        }
        .rev-dot {
          /* ≥44px tap target via transparent padding, small visible pill. */
          width: 44px; height: 44px;
          border: none;
          background: transparent;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rev-dot::before {
          content: '';
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--border-strong);
          transition: all 0.3s var(--ease);
        }
        .rev-dot.active::before { background: var(--primary); width: 24px; border-radius: 99px; }

        /* ─── ≥480px: roomier cards ─── */
        @media (min-width: 480px) {
          .rev-track { padding: 0.5rem 8vw; }
          .rev-card { flex: 0 0 78vw; padding: 1.75rem; }
        }

        /* ─── ≥768px: two cards in view ─── */
        @media (min-width: 768px) {
          .rev-sec { padding: var(--gap-4xl) 0; }
          .rev-head {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            gap: 2rem;
            margin-bottom: var(--gap-2xl);
          }
          .rev-nav { display: flex; }
          .rev-track {
            padding: 0.5rem 0;
            margin: 0;
          }
          .rev-card {
            flex: 0 0 calc((100% - var(--gap-md)) / 2);
            padding: 2rem;
          }
        }

        /* ─── ≥992px: 3-card carousel ─── */
        @media (min-width: 992px) {
          .rev-track {
            gap: var(--gap-lg);
            overflow-x: auto;
          }
          .rev-card {
            flex: 0 0 calc((100% - (2 * var(--gap-lg))) / 3);
            scroll-snap-align: start;
          }
          .rev-card:hover {
            border-color: var(--primary-light);
            box-shadow: none;
            transform: translateY(-3px);
          }
        }
      `}</style>
    </section>
  )
}
