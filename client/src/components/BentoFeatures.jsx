import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaTrophy, FaLanguage, FaChalkboardTeacher } from 'react-icons/fa'

const checklist = [
  'Dedicated Hindi & Urdu Batches',
  'M.Sc. & Ph.D. Expert Faculty',
  'AC Study Halls & Archives',
  'Daily One-on-One Doubt Sessions',
  'Smart Classrooms with Projectors',
  'Weekly Tests & Progress Analytics'
]

const banner = [
  { icon: <FaTrophy />, title: 'Board Excellence', desc: 'Proven SSC & HSC scoring record.' },
  { icon: <FaLanguage />, title: '3-Medium Coaching', desc: 'Hindi, Urdu & English batches.' },
  { icon: <FaChalkboardTeacher />, title: 'Expert Faculty', desc: 'Experienced professors, not assistants.' }
]

export default function BentoFeatures() {
  return (
    <section id="why-choose-us" className="why-sec">
      <div className="wrap">

        {/* Split: collage + content */}
        <div className="why-split">
          {/* Collage */}
          <motion.div
            className="why-media"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              className="why-media__main"
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80"
              alt="Muntazar Classes teaching session"
              loading="lazy"
            />
            <img
              className="why-media__sub"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80"
              alt="Students studying together"
              loading="lazy"
            />
            <div className="why-media__badge">
              <span className="why-media__badge-val">200+</span>
              <span className="why-media__badge-lbl">Top Board Scorers</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="why-content"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">Why Muntazar Classes</span>
            <h2 className="why-content__title">
              Where Discipline Meets <em className="accent-serif">Excellence</em>
            </h2>
            <p className="why-content__desc">
              We build exam-ready scholars through structure, strong infrastructure and relentless support.
            </p>
            <ul className="why-checklist">
              {checklist.map((item, i) => (
                <motion.li
                  key={item}
                  className="why-check"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                >
                  <span className="why-check__icon"><FaCheck /></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Dark 3-column banner */}
        <motion.div
          className="why-banner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {banner.map((b, i) => (
            <div key={i} className="why-banner__col">
              <div className="why-banner__icon">{b.icon}</div>
              <div>
                <h3 className="why-banner__title">{b.title}</h3>
                <p className="why-banner__desc">{b.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .why-sec {
          background: var(--white);
          padding: var(--gap-5xl) 0 var(--gap-4xl);
        }
        .why-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--gap-3xl);
          align-items: center;
          margin-bottom: var(--gap-3xl);
        }

        /* Collage */
        .why-media { position: relative; padding-bottom: 2rem; }
        .why-media__main {
          width: 100%;
          aspect-ratio: 4 / 3.2;
          object-fit: cover;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
        }
        .why-media__sub {
          position: absolute;
          bottom: 0; right: -12px;
          width: 44%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: var(--radius);
          border: 5px solid var(--white);
          box-shadow: var(--shadow-md);
        }
        .why-media__badge {
          position: absolute;
          top: 1.25rem; left: -14px;
          background: var(--blue);
          color: var(--text-white);
          padding: 0.85rem 1.15rem;
          border-radius: var(--radius);
          box-shadow: var(--shadow-md);
          text-align: center;
        }
        .why-media__badge-val {
          display: block;
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1;
        }
        .why-media__badge-lbl {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-white-70);
        }

        /* Content */
        .why-content__title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          margin-bottom: 1rem;
        }
        .why-content__title em { color: var(--blue); }
        .why-content__desc {
          font-size: 1.02rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 1.75rem;
        }
        .why-checklist {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem 1.5rem;
        }
        .why-check {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.4;
        }
        .why-check__icon {
          flex-shrink: 0;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: var(--blue-soft);
          color: var(--blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.6rem;
          margin-top: 1px;
        }

        /* Dark banner */
        .why-banner {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          background: var(--blue-deep);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .why-banner__col {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 2rem 2rem;
          border-right: 1px solid rgba(255,255,255,0.1);
        }
        .why-banner__col:last-child { border-right: none; }
        .why-banner__icon {
          flex-shrink: 0;
          width: 44px; height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.08);
          color: var(--blue-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
        }
        .why-banner__title {
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 0.3rem;
        }
        .why-banner__desc {
          font-size: 0.82rem;
          color: var(--text-white-70);
          line-height: 1.55;
        }

        @media (max-width: 991px) {
          .why-split { grid-template-columns: 1fr; gap: var(--gap-2xl); }
          .why-media { max-width: 520px; margin: 0 auto; }
          .why-banner { grid-template-columns: 1fr; }
          .why-banner__col { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .why-banner__col:last-child { border-bottom: none; }
        }
        @media (max-width: 520px) {
          .why-checklist { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
