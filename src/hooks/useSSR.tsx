import { useEffect, useState } from 'react'

export function useIsClient() {
  const [isClient, setIsClient] = useState(() => {
    return typeof window !== 'undefined'
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

export function useWindow() {
  const [windowObj, setWindowObj] = useState<Window | null>(() => {
    return typeof window !== 'undefined' ? window : null
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowObj(window)
    }
  }, [])

  return windowObj
}
