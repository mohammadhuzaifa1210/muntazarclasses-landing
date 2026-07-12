import React from 'react'
import { motion } from 'framer-motion'

export default function FounderDesk() {
  return (
    <section className="founder-sec">
      <div className="wrap">
        <div className="founder-grid">
          {/* Left Side */}
          <motion.div 
            className="founder-media"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="founder-img-wrapper">
              {/* Arbitrary background shape */}
              <div className="founder-bg-shape"></div>
              {/* Founder Photo */}
              <img 
                src="/founder.png" 
                alt="Professor Farman Raza Syed" 
                className="founder-img" 
                loading="lazy" 
              />
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div 
            className="founder-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">From the desk of Founder</span>
            <h2 className="section-head__title" style={{ textAlign: 'left', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
              Professor <span className="accent-serif">Farman Raza Syed</span>
            </h2>
            
            <div className="founder-text">
              <p>
                It&apos;s <strong>MUNTAZAR CLASSES</strong> founded in the year 2008 in the slums of Govandi.
              </p>
              <p>
                Our Mission is to serve the pure knowledge and the proper understanding of each topics. We always believe in to simplify the complex topics. We created many toppers in these years who knew the value of education and got successful in their life. We not only teach the syllabus but also give the moral of life through education.
              </p>
              <p>
                Here we are like family. We want to connect with our students throughout the life so that we can make a chain which can help our students in every field. Many doctors, engineers, businessman and good human beings.
              </p>
              <p>
                We committed to create more successful person from this slum area and to bring the change in society and change in mindset of students.
              </p>
              <p>
                And we are sure that in future this mindset will bring a big change in the society.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .founder-sec {
          padding: var(--gap-4xl) 0;
          background: var(--white);
          overflow: hidden;
          position: relative;
        }

        .founder-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        .founder-media {
          display: flex;
          justify-content: center;
          position: relative;
        }

        .founder-img-wrapper {
          position: relative;
          max-width: 360px;
          width: 100%;
          aspect-ratio: 3 / 4;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .founder-bg-shape {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 75%;
          background: linear-gradient(135deg, rgba(0, 132, 108, 0.15), rgba(0, 132, 108, 0.4));
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          z-index: 1;
          transition: all 0.5s ease;
        }
        
        .founder-media:hover .founder-bg-shape {
          border-radius: 60% 40% 30% 70% / 50% 40% 60% 50%;
          transform: scale(1.02);
        }

        .founder-img {
          position: relative;
          z-index: 2;
          width: 90%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 15px 25px rgba(0,0,0,0.1));
        }

        .founder-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .founder-text {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-body);
        }

        .founder-text p strong {
          color: var(--text-dark);
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .founder-img-wrapper {
            max-width: 420px;
          }
        }

        @media (min-width: 992px) {
          .founder-grid {
            grid-template-columns: 0.8fr 1.2fr;
            gap: 5rem;
          }
          .founder-content {
            margin: 0;
          }
          .founder-text {
            font-size: 1.125rem;
            gap: 1.25rem;
          }
        }
      `}</style>
    </section>
  )
}
