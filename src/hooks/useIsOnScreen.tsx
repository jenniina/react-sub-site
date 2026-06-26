import { useEffect, useState } from 'react'
import { useIsClient, useWindow } from '../hooks/useSSR'

export default function useIsOnScreen(
  element: HTMLElement | null,
  rootMargin = '0px',
  threshold = 0.0
) {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isClient || !windowObj || element == null) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin, threshold }
    )
    observer.observe(element)
    return () => {
      observer.unobserve(element)
    }
  }, [isClient, windowObj, element, rootMargin, threshold])

  return isVisible
}
