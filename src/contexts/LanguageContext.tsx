import { createContext, FC, ReactNode } from 'react'
import useLocalStorage from '../hooks/useStorage'
import { ELanguages, translations } from '../types'

interface LanguageContextProps {
  language: ELanguages
  setLanguage: (lang: ELanguages) => void
  t: (key: string) => string
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<ELanguages>(
    'AppLanguage',
    ELanguages.en
  )

  const t = (key: string) => {
    if (!translations[key]) {
      console.error(`Translation value "${key}" not found`)
      //Remove first letter of key and return the rest of the key
      return key.slice(1)
    } else if (!translations[key][language]) {
      console.error(`Translation value "${key}" not found in language "${language}"`)
      if (translations[key]['en']) {
        return translations[key]['en']
      } //Remove first letter of key and return the rest of the key
      else return key.slice(1)
    } else {
      return translations[key][language]
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
