import { createContext, useEffect, EffectCallback, ReactPortal } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'
import useLocalStorage from '../hooks/useStorage'

export const ThemeContext = createContext(true)
export const ThemeUpdateContext = createContext<EffectCallback | undefined>(undefined)

export function ThemeProvider({ children }: ReactPortal) {
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)')

  const [lightTheme, setLightTheme] = useLocalStorage(
    `useLightMode`,
    prefersLight ? true : false
  )

  // Read the ?light query parameter and update theme
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const lightParam = params.get('light')
    if (lightParam !== null) {
      setLightTheme(lightParam === 'true')
    }
  }, [setLightTheme])

  const lightEnabled = lightTheme ?? prefersLight

  function toggleTheme() {
    setLightTheme((prevTheme) => !prevTheme)
  }

  useEffect(() => {
    /*add 'light' class to body when lightEnabled is true*/
    document.body.classList.toggle('light', lightEnabled)
  }, [lightEnabled])

  return (
    <ThemeContext.Provider value={lightTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}
