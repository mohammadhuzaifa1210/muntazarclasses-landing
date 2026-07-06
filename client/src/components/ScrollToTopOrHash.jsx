import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTopOrHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Fallback for slower rendering times
        const timer = setTimeout(() => {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
        return () => clearTimeout(timer)
      }
    } else {
      // Defer scrollTo to ensure it fires after the route/DOM content has mounted and settled
      const timer = setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}
