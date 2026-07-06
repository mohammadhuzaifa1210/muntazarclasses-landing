import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What are the fees, and can I pay in instalments?',
    a: 'Fees vary by program - our counsellors will share the complete fee card during consultation. We offer flexible monthly instalment plans.'
  },
  {
    q: 'Can we attend a free trial class first?',
    a: 'Yes - we offer a complimentary 2-day trial experience. Your child can sit in actual lectures, interact with faculty, and get a real feel for our teaching methodology before making any commitment.'
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
    a: 'Complete study material is provided - topic-wise modules, formula sheets, practice sets, and previous year papers. Our in-house content is constantly updated and sufficient for board + competitive prep.'
  }
]

export default function FAQ() {
  const [active, setActive] = useState(0)

  return (
    <section id="faq" className="faq-sec">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Questions & Answers</span>
          <h2 className="section-head__title">
            Frequently Asked <em className="accent-serif">Questions</em>
          </h2>
          <p className="section-head__desc">
            Honest answers to the questions parents ask us most.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => {
            const isOpen = active === i
            return (
              <div key={i} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                <button className="faq-q" onClick={() => setActive(isOpen ? -1 : i)}>
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

        <div className="faq-foot">
          <span>Still have questions?</span>
          <a href="#contact" className="btn btn--blue btn--sm">Contact Us</a>
        </div>
      </div>

      <style>{`
        /* ── Base: phone (≤479px) ── */
        .faq-sec {
          background: var(--gray-50);
          padding: var(--gap-3xl) 0;
        }
        .faq-list {
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .faq-item {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          transition: background 0.35s var(--ease), border-color 0.35s var(--ease), box-shadow 0.35s var(--ease);
        }
        .faq-item--open {
          background: var(--blue-deep);
          border-color: var(--blue-deep);
          box-shadow: var(--shadow-md);
        }
        .faq-q {
          width: 100%;
          min-height: 56px;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 1.1rem 1.25rem;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: var(--fs-body);
          color: var(--text-dark);
          line-height: 1.4;
          transition: color 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }
        .faq-item--open .faq-q { color: var(--text-white); }
        .faq-q:hover { color: var(--blue); }
        .faq-item--open .faq-q:hover { color: var(--text-white); }
        .faq-q__text { flex: 1; }
        .faq-q__icon {
          color: var(--blue);
          flex-shrink: 0;
          transition: transform 0.35s var(--ease);
          display: flex;
        }
        .faq-item--open .faq-q__icon { color: var(--blue-light); }
        .faq-q__icon--open { transform: rotate(45deg); }
        .faq-a {
          padding: 0 1.25rem 1.25rem;
          font-size: var(--fs-body);
          color: var(--text-white-70);
          line-height: 1.75;
        }
        .faq-foot {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--gap-md);
          margin-top: var(--gap-2xl);
          font-size: 0.9rem;
          color: var(--text-muted);
          text-align: center;
        }

        /* ── ≥480px: footer goes inline ── */
        @media (min-width: 480px) {
          .faq-foot { flex-direction: row; flex-wrap: wrap; }
        }

        /* ── ≥768px: roomier padding ── */
        @media (min-width: 768px) {
          .faq-q { gap: 1rem; padding: 1.35rem 1.6rem; }
          .faq-a { padding: 0 1.6rem 1.5rem; }
        }

        /* ── ≥992px: full section rhythm ── */
        @media (min-width: 992px) {
          .faq-sec { padding: var(--gap-5xl) 0; }
        }
      `}</style>
    </section>
  )
}
