import { createContext, FC, ReactNode } from 'react'
import useLocalStorage from '../hooks/useStorage'
import { ELanguages, TranslationKey, TranslationLang, translations } from '../types'

interface LanguageContextProps {
  language: ELanguages
  setLanguage: (lang: ELanguages) => void
  t: (key: TranslationKey) => string
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [language, setLanguageRaw] = useLocalStorage<ELanguages>(
    'AppLanguage',
    ELanguages.en
  )

  // Remove only the 'lang' query param when present, keep others
  const setLanguage = (lang: ELanguages) => {
    setLanguageRaw(lang);
    const url = new URL(window.location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.delete('lang');
      const newSearch = url.searchParams.toString();
      const newUrl = url.pathname + (newSearch ? `?${newSearch}` : '') + url.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }  

  const t = (key: TranslationKey) => {
    if (!translations[key]) {
      console.error(`Translation value "${key}" not found`)
      return key
    } else if (!translations[key][language as TranslationLang]) {
      console.error(`Translation value "${key}" not found in language "${language}"`)
      if (translations[key]['en']) {
        return translations[key]['en']
      } else return key
    } else {
      return translations[key][language as TranslationLang]
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
