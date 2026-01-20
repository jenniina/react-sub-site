import { useRef, useEffect, useLayoutEffect, useCallback } from "react"
import { RefObject } from "../types"

export default function useSideScroll(scrollKey = "sideScroll") {
  const ref = useRef() as RefObject<HTMLElement>
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

  useLayoutEffect(() => {
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
        if (e.deltaY == 0) return
        e.preventDefault()
        element.scrollTo({
          left: element.scrollLeft + e.deltaY * 2,
          behavior: "smooth",
        })
        // Save position after smooth scroll completes
        setTimeout(() => saveScrollPosition(element.scrollLeft), 300)
      }

      const onScroll = () => {
        saveScrollPosition(element.scrollLeft)
      }

      element.addEventListener("wheel", onWheel)
      element.addEventListener("scroll", onScroll)
      return () => {
        element.removeEventListener("wheel", onWheel)
        element.removeEventListener("scroll", onScroll)
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

  const setRef = useCallback((node: HTMLElement | null) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(ref.current as any) = node
  }, [])

  return { ref, scrollLeft, scrollRight, setScrollLeft, setRef }
}
