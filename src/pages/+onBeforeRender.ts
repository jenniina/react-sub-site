import { getHeroProps } from '../utils/heroConfig.server'
import { ELanguages } from '../types'

export { onBeforeRender }

function onBeforeRender(pageContext: { urlPathname: string }) {
  const urlPathname = pageContext.urlPathname

  const heroProps = getHeroProps(
    urlPathname ?? '/',
    urlPathname ?? '/',
    ELanguages.en
  )

  return {
    pageContext: {
      pageProps: {
        route: urlPathname,
        heroProps,
      },
    },
  }
}
