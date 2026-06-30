import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaAward } from 'react-icons/fa'
import { FiArrowLeft } from 'react-icons/fi'
import Navbar from './Navbar'

const allAchievements = [
  { name: 'Ayesha Khan', exam: 'HSC Science', subject: 'Physics: 99/100', score: '96.4%', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600' },
  { name: 'Rahul Sharma', exam: 'SSC Board', subject: 'Maths: 100/100', score: '95.2%', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Sana Shaikh', exam: 'HSC Commerce', subject: 'Accounts: 98/100', score: '94.8%', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600' },
  { name: 'Faizan Ansari', exam: 'TY B.Com', subject: 'University Topper', score: '9.2 CGPA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Zoya Patel', exam: 'HSC Science', subject: 'Chemistry: 98/100', score: '94.1%', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600' },
  { name: 'Aman Khan', exam: 'SSC Board', subject: 'Science: 99/100', score: '93.8%', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600' },
  { name: 'Neha Gupta', exam: 'HSC Commerce', subject: 'Economics: 95/100', score: '92.5%', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600' },
  { name: 'Omar Sayed', exam: 'SYJC Arts', subject: 'History: 97/100', score: '91.2%', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600' },
  { name: 'Riya Desai', exam: 'SSC Board', subject: 'English: 98/100', score: '91.0%', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600' },
  { name: 'Kabir Singh', exam: 'HSC Science', subject: 'Biology: 97/100', score: '90.5%', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600' },
  { name: 'Simran Kaur', exam: 'HSC Commerce', subject: 'SP: 96/100', score: '90.1%', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600' },
  { name: 'Ayaan Malik', exam: 'TY BMS', subject: 'Finance Topper', score: '9.0 CGPA', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600' },
]

export default function AchievementPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <main className="ach-page">
        <section className="ach-page__content wrap">
          <Link to="/" className="back-link" style={{ color: 'var(--blue)', marginBottom: '2rem' }}>
            <FiArrowLeft /> Back to Home
          </Link>
          
          <div className="ach-page__header">
            <h1 className="ach-page__title">Our Hall of Fame</h1>
          </div>

          <div className="ach-grid">
            {allAchievements.map((ach, i) => (
              <motion.div
                key={i}
                className="ach-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.6 }}
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
        </section>
      </main>

      <style>{`
        .ach-page {
          background: var(--white);
          padding-top: 80px; /* offset navbar */
          min-height: 100vh;
        }
        .ach-page__content {
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
        
        .ach-page__header {
          margin-bottom: 4rem;
          text-align: center;
        }
        .ach-page__title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          color: var(--blue-deep);
          margin-bottom: 1rem;
        }
        .ach-page__subtitle {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .ach-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .ach-card {
          background: var(--gray-50);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1rem;
          text-align: center;
          transition: all 0.4s var(--ease);
        }
        .ach-card:hover {
          border-color: var(--blue-light);
          transform: translateY(-4px);
          box-shadow: 0 10px 30px -10px rgba(26,86,219,0.15);
        }
        .ach-card__img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1/1;
          border-radius: var(--radius-sm);
          overflow: hidden;
          margin-bottom: 1.25rem;
          background: var(--border);
        }
        .ach-card__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease);
        }
        .ach-card:hover .ach-card__img { transform: scale(1.05); }
        .ach-card__badge {
          position: absolute;
          bottom: 0.5rem; right: 0.5rem;
          background: var(--blue);
          color: var(--white);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.35rem 0.65rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .ach-card__name {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
          color: var(--text-dark);
        }
        .ach-card__exam {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 1rem;
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

        @media (max-width: 991px) {
          .ach-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 576px) {
          .ach-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}
