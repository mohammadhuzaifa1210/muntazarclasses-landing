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
              <div className="founder-bg-shape"></div>
              <img 
                src="/Farman Sir.png" 
                alt="Professor Farman Raza Syed" 
                className="founder-img" 
                loading="lazy" 
              />
              
              {/* Empty Decorative Circle */}
              <div className="founder-circle founder-circle--left"></div>

              {/* Experience Circle */}
              <div className="founder-circle founder-circle--right">
                <span className="founder-circle-number">35+</span>
                <span className="founder-circle-text">Years of<br/>Experience</span>
              </div>
            </div>
            
            {/* Additional Details Below Photo */}
            <div className="founder-details">
              <h4 className="founder-details-name">Prof. Farman Raza Syed</h4>
              <p className="founder-details-degrees">M.Sc. (Mathematics)</p>
              <div className="founder-details-divider"></div>
              <p className="founder-details-role">Founder & Director, Muntazar Classes</p>
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
          /* Removed 'overflow: hidden' which was forcefully clipping the left and bottom edges 
             of the organic blob (.founder-bg-shape) and its wrapper when near viewport bounds. */
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .founder-img-wrapper {
          position: relative;
          max-width: 420px;
          width: 100%;
          aspect-ratio: 3 / 4;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          margin-top: -2rem;
          overflow: visible; /* Ensure the blob renders completely on all sides */
        }

        .founder-bg-shape {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 75%;
          background: linear-gradient(135deg, rgba(0, 132, 108, 0.15), rgba(0, 132, 108, 0.4));
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          z-index: 1;
        }

        .founder-img {
          position: relative;
          z-index: 2;
          width: 90%;
          height: auto;
          object-fit: contain;
          -webkit-mask-image: 
            linear-gradient(to top, transparent 5%, black 25%),
            linear-gradient(to right, transparent 5%, black 20%),
            linear-gradient(to left, transparent 5%, black 20%);
          -webkit-mask-composite: source-in;
          mask-image: 
            linear-gradient(to top, transparent 5%, black 25%),
            linear-gradient(to right, transparent 5%, black 20%),
            linear-gradient(to left, transparent 5%, black 20%);
          mask-composite: intersect;
        }

        .founder-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .founder-details {
          margin-top: 1.5rem;
          text-align: center;
          width: 100%;
          max-width: 360px;
          z-index: 5;
        }
        
        .founder-details-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text-dark);
          margin-bottom: 0.25rem;
        }

        .founder-details-degrees {
          font-size: 0.95rem;
          color: var(--primary);
          font-weight: 600;
        }

        .founder-details-divider {
          width: 40px;
          height: 3px;
          border-radius: 2px;
          background: var(--primary-light);
          margin: 0.75rem auto;
          opacity: 0.5;
        }

        .founder-details-role {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
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

        .founder-circle {
          position: absolute;
          border-radius: 50%;
          background: var(--primary);
          color: var(--white);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 10px 25px rgba(0, 132, 108, 0.4);
          z-index: 4;
        }

        .founder-circle--left {
          width: 45px;
          height: 45px;
          bottom: 30px;
          left: 10px;
        }

        .founder-circle--right {
          width: 120px;
          height: 120px;
          bottom: 10px;
          right: 5px;
        }

        .founder-circle-number {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 2rem;
          line-height: 1;
        }

        .founder-circle-text {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.35rem;
        }

        @media (min-width: 768px) {
          .founder-img-wrapper {
            max-width: 460px;
          }
        }

        @media (min-width: 992px) {
          .founder-grid {
            grid-template-columns: 0.8fr 1.2fr;
            gap: 5rem;
            align-items: flex-start;
          }
          .founder-img-wrapper {
            max-width: 600px;
            margin-top: -4rem; /* Shift even higher */
          }
          .founder-content {
            margin: 0;
            padding-top: 2rem; /* Push text down a bit */
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
