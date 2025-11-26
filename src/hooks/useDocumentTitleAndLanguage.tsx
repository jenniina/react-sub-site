import { useEffect } from 'react'
import { useLanguageContext } from '../contexts/LanguageContext'

interface UseDocTitleAndLangProps {
  appName?: string
}

export function useDocumentTitleAndLanguage({
  appName,
}: UseDocTitleAndLangProps) {
  const { t, language } = useLanguageContext()

  useEffect(() => {
    // Set document language attribute
    if (!document) return
    document.documentElement.lang = language

    // Update document title based on language and optional app name
    const h1Element = document?.querySelector('h1')
    const h1Text = h1Element ? h1Element.textContent : ''

    document.title = `${appName ?? t('ReactApps')} (Jenniina.fi) ${h1Text}`
  }, [language, appName, t])
}
