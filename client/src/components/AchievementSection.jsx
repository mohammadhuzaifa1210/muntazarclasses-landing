import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaAward } from 'react-icons/fa'

const achievements = [
  {
    name: 'Ayesha Khan',
    exam: 'HSC Science',
    score: '96.4%',
    subject: 'Physics: 99/100',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Rahul Sharma',
    exam: 'SSC Board',
    score: '95.2%',
    subject: 'Maths: 100/100',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Sana Shaikh',
    exam: 'HSC Commerce',
    score: '94.8%',
    subject: 'Accounts: 98/100',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Faizan Ansari',
    exam: 'TY B.Com',
    score: '9.2 CGPA',
    subject: 'University Topper',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
  }
]

export default function AchievementSection() {
  return (
    <section id="achievements" className="ach-sec">
      <div className="wrap">
        <div className="ach-header">
          <span className="eyebrow">Hall of Fame</span>
          <h2 className="ach-title">Our <em className="accent-serif">Top Achievers</em></h2>
          <p className="ach-desc">
            The bright minds who made us proud in their board and university exams.
          </p>
        </div>

        <div className="ach-grid">
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              className="ach-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="ach-card__img-wrap">
                <img src={ach.image} alt={ach.name} className="ach-card__img" loading="lazy" />
                <div className="ach-card__badge">
                  <FaAward /> {ach.score}
                </div>
              </div>
              <div className="ach-card__info">
                <h3 className="ach-card__name">{ach.name}</h3>
                <p className="ach-card__exam">{ach.exam}</p>
                <div className="ach-card__subject">{ach.subject}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="ach-actions">
          <Link to="/achievements" className="btn btn--outline" style={{ borderRadius: 'var(--radius-pill)', fontWeight: '600' }}>
            View all results
          </Link>
        </div>
      </div>

      <style>{`
        .ach-sec {
          background: var(--white);
          padding: var(--gap-5xl) 0;
        }
        .ach-header {
          text-align: center;
          margin-bottom: var(--gap-3xl);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .ach-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          margin-bottom: 0.75rem;
        }
        .ach-title em { color: var(--blue); }
        .ach-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        .ach-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .ach-card {
          background: var(--gray-50);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all 0.35s var(--ease);
        }
        .ach-card:hover {
          border-color: var(--blue-light);
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .ach-card__img-wrap {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          background: var(--border);
        }
        .ach-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ach-card__badge {
          position: absolute;
          bottom: 0.75rem;
          right: 0.75rem;
          background: var(--blue);
          color: var(--white);
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 800;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .ach-card__badge svg { font-size: 0.8rem; }
        
        .ach-card__info {
          padding: 1.25rem;
          text-align: center;
          border-top: 2px solid var(--blue);
        }
        .ach-card__name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.2rem;
        }
        .ach-card__exam {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }
        .ach-card__subject {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--blue-dark);
          background: var(--blue-soft);
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
        }
        
        .ach-actions {
          display: flex;
          justify-content: center;
          margin-top: var(--gap-2xl);
        }

        @media (max-width: 991px) {
          .ach-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 576px) {
          .ach-grid { grid-template-columns: 1fr; max-width: 340px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
