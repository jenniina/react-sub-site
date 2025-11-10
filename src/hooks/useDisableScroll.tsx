import { useState, useEffect } from 'react'

const preventDefault = (e: Event) => {
  e.preventDefault()
}

function useDisableScroll() {
  const [scrollDisabled, setScrollDisabled] = useState(false)

  useEffect(() => {
    if (scrollDisabled) {
      document?.addEventListener('touchmove', preventDefault, {
        passive: false,
      })
      document ? (document.body.style.overflow = 'hidden') : null
    } else {
      document ? (document.body.style.overflowY = 'auto') : null
      document ? (document.body.style.overflowX = 'hidden') : null
      document?.removeEventListener('touchmove', preventDefault)
    }

    return () => {
      document ? (document.body.style.overflowY = 'auto') : null
      document ? (document.body.style.overflowX = 'hidden') : null
      document?.removeEventListener('touchmove', preventDefault)
    }
  }, [scrollDisabled])

  function disableScroll() {
    setScrollDisabled(!scrollDisabled)
  }

  return disableScroll
}

export default useDisableScroll
