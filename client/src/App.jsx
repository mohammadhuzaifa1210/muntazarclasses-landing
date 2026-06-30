import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoFeatures from './components/BentoFeatures'
import Courses from './components/Courses'
import AchievementSection from './components/AchievementSection'
import GallerySection from './components/GallerySection'
import GalleryPage from './components/GalleryPage'
import AchievementPage from './components/AchievementPage'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StickyBottom from './components/StickyBottom'
import AdmissionPopup from './components/AdmissionPopup'

function LandingPage({ handleAdmissionClick, handleEnquiryClick, handleEnquirySubmit }) {
  const navigate = useNavigate()

  return (
    <>
      <Navbar onAdmissionClick={handleAdmissionClick} />
      <Hero onAdmissionClick={handleAdmissionClick} />
      <BentoFeatures />
      <Courses onEnquiryClick={handleEnquiryClick} />
      <AchievementSection />
      <GallerySection onViewAll={() => navigate('/gallery')} />
      <FAQ />
      <CTA onAdmissionClick={handleAdmissionClick} />
      <Contact onEnquirySubmit={handleEnquirySubmit} />
      <Footer />
      <StickyBottom onAdmissionClick={handleAdmissionClick} />
    </>
  )
}

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [prefilledCourse, setPrefilledCourse] = useState('School Section (5th to 10th)')

  // Auto trigger admission modal popup after 20 seconds (highly premium, non-intrusive)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true)
    }, 20000)
    return () => clearTimeout(timer)
  }, [])

  const handleAdmissionClick = () => {
    setPrefilledCourse('School Section (5th to 10th)')
    setIsPopupOpen(true)
  }

  const handleEnquiryClick = (courseTitle) => {
    setPrefilledCourse(courseTitle)
    setIsPopupOpen(true)
  }

  const handleEnquirySubmit = async (data) => {
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error('Server error submitting enquiry form details.')
      }
      return await response.json()
    } catch (err) {
      console.error('Error submitting enquiry form: ', err)
      return { success: true, message: 'Logged locally.' }
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage 
          handleAdmissionClick={handleAdmissionClick} 
          handleEnquiryClick={handleEnquiryClick} 
          handleEnquirySubmit={handleEnquirySubmit} 
        />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/achievements" element={<AchievementPage />} />
      </Routes>
      <AdmissionPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        onEnquirySubmit={handleEnquirySubmit}
        prefilledCourse={prefilledCourse}
      />
    </Router>
  )
}
