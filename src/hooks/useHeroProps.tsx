import { useMemo } from 'react'
import { ELanguages } from '../types'
import { getHeroProps, HeroProps } from '../utils/heroConfig'

export function useHeroProps(
  pathname: string,
  displayPath: string,
  language: ELanguages
): HeroProps {
  const heroProps = useMemo(
    () => getHeroProps(pathname, displayPath, language),
    [displayPath, language, pathname]
  )

  return heroProps
}
