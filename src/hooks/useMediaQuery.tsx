import { useState, useEffect } from 'react'
import useEventListener from './useEventListener'
import { useIsClient, useWindow } from './useSSR'

export default function useMediaQuery(mediaQuery: string) {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const [isMatch, setIsMatch] = useState(false)
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>()

  useEffect(() => {
    if (!isClient || !windowObj) return
    const list = windowObj.matchMedia(mediaQuery)
    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery, isClient])

  useEventListener(
    'change' as keyof WindowEventMap,
    (e: Event) => setIsMatch((e as MediaQueryListEvent).matches),
    mediaQueryList
  )

  return isMatch
}
