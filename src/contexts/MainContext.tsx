import {
  createContext,
  useState,
  useEffect,
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'
import { ELanguages } from '../types'
import useLocalStorage from '../hooks/useStorage'
import { HeroProps, useHeroProps } from '../hooks/useHeroProps'
import { useScrollToHashOrTop } from '../hooks/useScrollTo'
import { useDocumentTitleAndLanguage } from '../hooks/useDocumentTitleAndLanguage'
import { useLocation, Location as RouterLocation } from 'react-router-dom'
import Hero from '../components/Hero/Hero'

interface MainContextProps {
  language: ELanguages
  setLanguage: (lang: ELanguages) => void
  displayLocation: RouterLocation
  transitionPage: string
  setTransitionPage: (transition: string) => void
  heroProps: {
    heading: string
    text: string
    address: string
  }
}

export const MainContext = createContext<MainContextProps | undefined>(undefined)

export const MainProvider: FC<{
  language: ELanguages
  setLanguage: (lang: ELanguages) => void
  location: RouterLocation
  displayLocation: RouterLocation
  setDisplayLocation: Dispatch<SetStateAction<RouterLocation>>
  heroProps: HeroProps
  children: ReactNode
}> = ({
  language,
  setLanguage,
  location,
  displayLocation,
  setDisplayLocation,
  heroProps,
  children,
}) => {
  const [transitionPage, setTransitionPage] = useState('fadeIn')

  // Replace inline scroll effect with our hook:
  useScrollToHashOrTop(displayLocation.pathname)

  // Update document language and title
  useDocumentTitleAndLanguage({ language })

  // Change language with ?lang=fi etc:
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get('lang')
    if (langParam && Object.values(ELanguages).includes(langParam as any)) {
      setLanguage(langParam as ELanguages)
    }
  }, [setLanguage])

  useEffect(() => {
    if (transitionPage === 'fadeOut') {
      const timer = setTimeout(() => {
        setTransitionPage('fadeIn')
        setDisplayLocation(location)
      }, 500) // Match this duration with the CSS animation duration
      return () => clearTimeout(timer)
    }
  }, [transitionPage, location])

  return (
    <MainContext.Provider
      value={{
        language,
        setLanguage,
        displayLocation,
        transitionPage,
        setTransitionPage,
        heroProps,
      }}
    >
      <main
        id={`main-content`}
        className={`${transitionPage} main-content z`}
        onAnimationEnd={() => {
          if (transitionPage === 'fadeOut') {
            setTransitionPage('fadeIn')
            setDisplayLocation(location)
          }
        }}
      >
        {heroProps.heading && (
          <Hero
            displayLocation={displayLocation}
            language={language}
            address={heroProps.address}
            heading={heroProps.heading}
            text={heroProps.text}
          />
        )}
        {children}
      </main>
    </MainContext.Provider>
  )
}
