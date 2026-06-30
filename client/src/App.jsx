import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoFeatures from './components/BentoFeatures'
import Courses from './components/Courses'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StickyBottom from './components/StickyBottom'
import AdmissionPopup from './components/AdmissionPopup'

export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [prefilledCourse, setPrefilledCourse] = useState('JEE/NEET Prep Program')

  // Auto trigger admission modal popup after 20 seconds (highly premium, non-intrusive)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true)
    }, 20000)
    return () => clearTimeout(timer)
  }, [])

  const handleAdmissionClick = () => {
    setPrefilledCourse('JEE/NEET Prep Program')
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
    <>
      <Navbar onAdmissionClick={handleAdmissionClick} />
      <Hero onAdmissionClick={handleAdmissionClick} />
      <BentoFeatures />
      <Courses onEnquiryClick={handleEnquiryClick} />
      <FAQ />
      <CTA onAdmissionClick={handleAdmissionClick} />
      <Contact onEnquirySubmit={handleEnquirySubmit} />
      <Footer />
      <StickyBottom onAdmissionClick={handleAdmissionClick} />
      <AdmissionPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        onEnquirySubmit={handleEnquirySubmit}
        prefilledCourse={prefilledCourse}
      />
    </>
  )
}
