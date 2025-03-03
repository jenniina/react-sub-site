import { createContext, FC, ReactNode } from 'react'
import useLocalStorage from '../hooks/useStorage'
import { ELanguages } from '../types'

interface LanguageContextProps {
  language: ELanguages
  setLanguage: (lang: ELanguages) => void
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<ELanguages>(
    'AppLanguage',
    ELanguages.English
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
