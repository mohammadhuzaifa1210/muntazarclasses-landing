import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaUserMd, FaLaptopCode, FaBriefcase, FaGraduationCap, FaBalanceScale, FaBuilding } from 'react-icons/fa'

const alumniData = [
  {
    name: 'Dr. Sameer Khan',
    profession: 'MBBS, General Physician',
    batch: 'Batch 2012',
    icon: <FaUserMd />,
    company: 'City Hospital',
  },
  {
    name: 'Ayesha Shaikh',
    profession: 'Software Engineer',
    batch: 'Batch 2015',
    icon: <FaLaptopCode />,
    company: 'TechCorp',
  },
  {
    name: 'Zaid Ansari',
    profession: 'Chartered Accountant',
    batch: 'Batch 2014',
    icon: <FaBriefcase />,
    company: 'Deloitte',
  },
  {
    name: 'Sana Sayyed',
    profession: 'Corporate Lawyer',
    batch: 'Batch 2013',
    icon: <FaBalanceScale />,
    company: 'High Court',
  },
  {
    name: 'Mohammed Ali',
    profession: 'Civil Engineer',
    batch: 'Batch 2016',
    icon: <FaBuilding />,
    company: 'L&T Construction',
  },
  {
    name: 'Fatima Qureshi',
    profession: 'Professor',
    batch: 'Batch 2015',
    icon: <FaGraduationCap />,
    company: 'Mumbai University',
  }
]

export default function Alumni() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section className="alumni-sec" ref={sectionRef}>
      <div className="alumni-bg-pattern"></div>
      
      <div className="wrap relative-z">
        <div className="section-head">
          <span className="eyebrow">Our Pride</span>
          <h2 className="section-head__title">
            Meet Our <em className="accent-serif">Successful Alumni</em>
          </h2>
          <p className="section-head__desc" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Students who started their journey in our classrooms are now leading professionals across top industries.
          </p>
        </div>

        <div className="alumni-grid">
          {alumniData.map((alumni, i) => (
            <motion.div
              key={i}
              className="alumni-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="alumni-icon-wrap">
                {alumni.icon}
              </div>
              <div className="alumni-info">
                <h3 className="alumni-name">{alumni.name}</h3>
                <div className="alumni-profession">{alumni.profession}</div>
                <div className="alumni-meta">
                  <span className="alumni-company">{alumni.company}</span>
                  <span className="alumni-dot">•</span>
                  <span className="alumni-batch">{alumni.batch}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .alumni-sec {
          position: relative;
          padding: var(--gap-4xl) 0;
          background: var(--gray-50);
          overflow: hidden;
        }

        .alumni-bg-pattern {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(0, 132, 108, 0.04) 2px, transparent 2px);
          background-size: 30px 30px;
          z-index: 0;
        }
        
        .relative-z {
          position: relative;
          z-index: 1;
        }

        .alumni-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .alumni-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: var(--white);
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          box-shadow: none;
          transition: all 0.4s var(--ease);
          position: relative;
          overflow: hidden;
        }

        .alumni-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--primary);
          transform: scaleY(0);
          transition: transform 0.4s var(--ease);
          transform-origin: bottom;
        }

        .alumni-card:hover {
          transform: translateY(-4px);
          box-shadow: none;
          border-color: transparent;
        }

        .alumni-card:hover::before {
          transform: scaleY(1);
        }

        .alumni-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--primary-soft);
          color: var(--primary);
          font-size: 1.4rem;
          flex-shrink: 0;
          transition: all 0.4s var(--ease);
        }

        .alumni-card:hover .alumni-icon-wrap {
          background: var(--primary);
          color: var(--white);
          transform: scale(1.1) rotate(-5deg);
        }

        .alumni-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .alumni-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 0.15rem;
        }

        .alumni-profession {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .alumni-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        
        .alumni-dot {
          font-size: 0.4rem;
          opacity: 0.5;
        }

        @media (min-width: 640px) {
          .alumni-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (min-width: 992px) {
          .alumni-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .alumni-card {
            padding: 1.75rem 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
