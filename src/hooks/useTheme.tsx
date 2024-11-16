import { useContext, createContext, useEffect, EffectCallback, ReactPortal } from 'react'
import useMediaQuery from './useMediaQuery'
import useLocalStorage from './useStorage'

const ThemeContext = createContext(true)
const ThemeUpdateContext = createContext<EffectCallback | undefined>(undefined)

export function useTheme() {
  return useContext(ThemeContext)
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }: ReactPortal) {
  const prefersLight = useMediaQuery('(prefers-color-scheme: light)')

  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  const [lightTheme, setLightTheme] = useLocalStorage(
    `${isLocalhost ? 'local-' : ''}useLightMode`,
    prefersLight ? true : false
  )

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
