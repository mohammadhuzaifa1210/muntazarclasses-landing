import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What are the fees, and can I pay in instalments?',
    a: 'Fees vary by program — our counsellors will share the complete fee card during consultation. We offer flexible monthly instalment plans.'
  },
  {
    q: 'Can we attend a free trial class first?',
    a: 'Yes — we offer a complimentary 2-day trial experience. Your child can sit in actual lectures, interact with faculty, and get a real feel for our teaching methodology before making any commitment.'
  },
  {
    q: 'What are the daily batch timings?',
    a: 'Our regular weekday batches run 4:00 PM to 8:30 PM, perfect for students attending junior college in the morning. We also run dedicated morning batches for drop-year/repeater students.'
  },
  {
    q: 'How do you track individual student progress?',
    a: 'Every student gets a personal academic mentor. We conduct weekly tests, share detailed performance analytics, and hold monthly parent-teacher meetings to ensure no student falls behind.'
  },
  {
    q: 'Do you provide study material, or do we need external books?',
    a: 'Complete study material is provided — topic-wise modules, formula sheets, practice sets, and previous year papers. Our in-house content is constantly updated and sufficient for board + competitive prep.'
  }
]

export default function FAQ() {
  const [active, setActive] = useState(null)

  return (
    <section id="faq" className="faq-sec">
      <div className="wrap">
        <div className="faq-layout">

          {/* Left: Sticky header */}
          <div className="faq-left">
            <span className="eyebrow">Questions & Answers</span>
            <h2 className="faq-left__title">
              Everything You Need <em className="accent-serif">to Know</em>
            </h2>
            <p className="faq-left__desc">
              We know choosing the right coaching matters. Here are honest answers to the questions parents ask us most.
            </p>
            <div className="faq-left__cta">
              <span className="faq-left__cta-text">Still have questions?</span>
              <a href="#contact" className="btn btn--outline btn--sm">Contact Us</a>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="faq-right">
            {faqs.map((faq, i) => {
              const isOpen = active === i
              return (
                <div key={i} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                  <button className="faq-q" onClick={() => setActive(isOpen ? null : i)}>
                    <span className="faq-q__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq-q__text">{faq.q}</span>
                    <span className={`faq-q__icon ${isOpen ? 'faq-q__icon--open' : ''}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" className="faq-icon-v" />
                        <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="faq-a">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .faq-sec {
          background: var(--gray-50);
          padding: var(--gap-5xl) 0;
        }
        .faq-layout {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: var(--gap-4xl);
          align-items: start;
        }
        .faq-left { position: sticky; top: 120px; }
        .faq-left__title {
          font-size: clamp(1.75rem, 3.5vw, 2.25rem);
          margin-bottom: 1rem;
        }
        .faq-left__title em { color: var(--blue); }
        .faq-left__desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .faq-left__cta {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }
        .faq-left__cta-text {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .faq-right { display: flex; flex-direction: column; }
        .faq-item {
          border-bottom: 1px solid var(--border-strong);
        }
        .faq-item--open { border-bottom-color: var(--blue); }
        .faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.4rem 0;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-dark);
          line-height: 1.4;
          transition: color 0.2s ease;
        }
        .faq-q:hover { color: var(--blue); }
        .faq-q__num {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--blue);
          opacity: 0.7;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          width: 24px;
        }
        .faq-q__text { flex: 1; }
        .faq-q__icon {
          color: var(--blue);
          flex-shrink: 0;
          transition: transform 0.35s var(--ease);
          display: flex;
        }
        .faq-q__icon--open { transform: rotate(45deg); }
        .faq-icon-v {
          transition: opacity 0.2s ease;
        }
        .faq-a {
          padding: 0 0 1.4rem 2.5rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.75;
          max-width: 540px;
        }
        @media (max-width: 768px) {
          .faq-layout { grid-template-columns: 1fr; gap: var(--gap-2xl); }
          .faq-left { position: static; }
          .faq-a { padding-left: 2.25rem; }
        }
      `}</style>
    </section>
  )
}
