import { useRef, useEffect, useLayoutEffect, useCallback } from 'react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function useSideScroll<T extends HTMLElement = HTMLElement>(
  scrollKey = 'sideScroll'
) {
  const ref = useRef<T | null>(null)
  const hasInitialized = useRef(false)

  // Load initial scroll position from localStorage
  const getSavedScrollPosition = useCallback(() => {
    try {
      const saved = localStorage.getItem(scrollKey)
      return saved ? parseInt(saved, 10) : 0
    } catch {
      return 0
    }
  }, [scrollKey])

  // Save scroll position to localStorage
  const saveScrollPosition = useCallback(
    (position: number) => {
      try {
        localStorage.setItem(scrollKey, position.toString())
      } catch {
        // Ignore localStorage errors (e.g., private browsing)
      }
    },
    [scrollKey]
  )

  const scrollLeft = useCallback(
    (amount: number) => {
      if (ref.current) {
        ref.current.scrollLeft -= amount
        saveScrollPosition(ref.current.scrollLeft)
      }
    },
    [saveScrollPosition]
  )

  const scrollRight = useCallback(
    (amount: number) => {
      if (ref.current) {
        ref.current.scrollLeft += amount
        saveScrollPosition(ref.current.scrollLeft)
      }
    },
    [saveScrollPosition]
  )

  useIsomorphicLayoutEffect(() => {
    const element = ref.current
    if (element && !hasInitialized.current) {
      element.scrollLeft = getSavedScrollPosition()
      hasInitialized.current = true
    }
  }, [getSavedScrollPosition])

  useEffect(() => {
    const element = ref.current
    if (element) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return

        // Only convert wheel->horizontal scroll when the element actually overflows.
        const maxScrollLeft = element.scrollWidth - element.clientWidth
        if (maxScrollLeft <= 0) return

        // If we're already at an edge and the user is scrolling "past" it,
        // let the page scroll normally.
        const epsilonPx = 2
        const atLeftEdge = element.scrollLeft <= epsilonPx
        const atRightEdge = element.scrollLeft >= maxScrollLeft - epsilonPx
        if ((atLeftEdge && e.deltaY < 0) || (atRightEdge && e.deltaY > 0)) {
          return
        }

        const nextLeft = element.scrollLeft + e.deltaY * 1.2
        const clampedLeft = Math.max(0, Math.min(maxScrollLeft, nextLeft))

        // If we're at a boundary and this wheel would not move horizontally,
        // let the page scroll normally.
        if (Math.abs(clampedLeft - element.scrollLeft) <= epsilonPx) return

        e.preventDefault()
        element.scrollTo({
          left: clampedLeft,
          behavior: 'smooth',
        })
        // Save position after smooth scroll completes
        setTimeout(() => saveScrollPosition(element.scrollLeft), 300)
      }

      const onScroll = () => {
        saveScrollPosition(element.scrollLeft)
      }

      // `passive: false` is required for preventDefault() to work.
      element.addEventListener('wheel', onWheel, { passive: false })
      element.addEventListener('scroll', onScroll)
      return () => {
        element.removeEventListener('wheel', onWheel)
        element.removeEventListener('scroll', onScroll)
      }
    }
  }, [saveScrollPosition])

  const setScrollLeft = useCallback(
    (value: number) => {
      if (ref.current) {
        ref.current.scrollLeft = value
        saveScrollPosition(value)
      }
    },
    [saveScrollPosition]
  )

  const setRef = useCallback((node: T | null) => {
    ref.current = node
  }, [])

  return { ref, scrollLeft, scrollRight, setScrollLeft, setRef }
}
