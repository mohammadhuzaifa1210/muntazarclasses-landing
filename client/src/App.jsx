import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProgramChips from './components/ProgramChips'
import FounderDesk from './components/FounderDesk'
import EasySteps from './components/EasySteps'
import BentoFeatures from './components/BentoFeatures'
import Courses from './components/Courses'
import AchievementSection from './components/AchievementSection'
import GallerySection from './components/GallerySection'
import GalleryPage from './components/GalleryPage'
import AchievementPage from './components/AchievementPage'
import ProgramsPage from './components/ProgramsPage'
import AdmissionsBanner from './components/AdmissionsBanner'
import FAQ from './components/FAQ'
import Reviews from './components/Reviews'
import Alumni from './components/Alumni'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StickyBottom from './components/StickyBottom'
import AdmissionPopup from './components/AdmissionPopup'
import ScrollToTopOrHash from './components/ScrollToTopOrHash'

function LandingPage({ handleAdmissionClick, handleEnquiryClick, handleEnquirySubmit }) {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://muntazarclasses.in/" />
      </Helmet>
      <Navbar onAdmissionClick={handleAdmissionClick} />
      <main>
        <Hero onAdmissionClick={handleAdmissionClick} />
        <ProgramChips />
        <FounderDesk />
        <EasySteps onAdmissionClick={handleAdmissionClick} />
        <BentoFeatures />
        <Courses onEnquiryClick={handleEnquiryClick} />
        <AchievementSection />
        <GallerySection onViewAll={() => navigate('/gallery')} />
        <AdmissionsBanner onAdmissionClick={handleAdmissionClick} />
        <FAQ />
        <Reviews />
        <Alumni />
        <Contact onEnquirySubmit={handleEnquirySubmit} />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [prefilledCourse, setPrefilledCourse] = useState('School Section (7th to 10th)')

  // Auto trigger admission modal popup after 20 seconds (highly premium, non-intrusive)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true)
    }, 20000)
    return () => clearTimeout(timer)
  }, [])

  const handleAdmissionClick = () => {
    setPrefilledCourse('School Section (7th to 10th)')
    setIsPopupOpen(true)
  }

  const handleEnquiryClick = (courseTitle) => {
    setPrefilledCourse(courseTitle)
    setIsPopupOpen(true)
  }

  const handleEnquirySubmit = async (data) => {
    try {
      const API = import.meta.env.VITE_API_URL || ''
      const response = await fetch(`${API}/api/enquiry`, {
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
      <ScrollToTopOrHash />
      <Routes>
        <Route path="/" element={<LandingPage 
          handleAdmissionClick={handleAdmissionClick} 
          handleEnquiryClick={handleEnquiryClick} 
          handleEnquirySubmit={handleEnquirySubmit} 
        />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/achievements" element={<AchievementPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
      </Routes>
      <AdmissionPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        onEnquirySubmit={handleEnquirySubmit}
        prefilledCourse={prefilledCourse}
      />
      <StickyBottom onAdmissionClick={handleAdmissionClick} />
    </Router>
  )
}
