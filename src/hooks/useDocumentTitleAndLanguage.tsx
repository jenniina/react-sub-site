import { useEffect } from 'react'
import { ELanguages } from '../types'
import { EReactApps } from '../types/about'

interface UseDocTitleAndLangProps {
  language: ELanguages
  appName?: string
}

export function useDocumentTitleAndLanguage({
  language,
  appName,
}: UseDocTitleAndLangProps) {
  useEffect(() => {
    // Set document language attribute
    document.documentElement.lang = language

    // Update document title based on language and optional app name
    const h1Element = document.querySelector('h1')
    const h1Text = h1Element ? h1Element.textContent : ''
    document.title = `${appName ? appName : EReactApps[language]} (Jenniina.fi) ${h1Text}`
  }, [language, appName])
}
