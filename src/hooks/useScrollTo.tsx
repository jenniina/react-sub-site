import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToHashOrTop(displayLocationPathname: string) {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (location.pathname !== displayLocationPathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location, displayLocationPathname])
}
