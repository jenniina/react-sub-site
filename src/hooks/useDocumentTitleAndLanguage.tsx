import { useContext, useEffect } from 'react'
import { ELanguages } from '../types'
import { useLanguageContext } from '../contexts/LanguageContext'

interface UseDocTitleAndLangProps {
  language: ELanguages
  appName?: string
}

export function useDocumentTitleAndLanguage({
  language,
  appName,
}: UseDocTitleAndLangProps) {
  const { t } = useLanguageContext()

  useEffect(() => {
    // Set document language attribute
    document ? (document.documentElement.lang = language) : null

    // Update document title based on language and optional app name
    const h1Element = document?.querySelector('h1')
    const h1Text = h1Element ? h1Element.textContent : ''
    document
      ? (document.title = `${
          appName ? appName : t('ReactApps')
        } (Jenniina.fi) ${h1Text}`)
      : null
  }, [language, appName])
}
