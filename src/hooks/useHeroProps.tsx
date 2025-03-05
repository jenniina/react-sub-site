import { useEffect, useState } from 'react'
import { ELanguages, translations as t } from '../types'

export interface HeroProps {
  heading: string
  text: string
  address: string
  reset?: string
  instructions?: string
  language: ELanguages
}

const heroConfig: { [key: string]: (language: ELanguages) => HeroProps } = {
  '/': (language) => ({
    heading: t['EWelcome'][language],
    text: t['EToTheReactSiteOfJenniinaFi'][language],
    address: '',
    language,
  }),
  '/portfolio': (language) => ({
    heading: t['EPortfolio'][language],
    text: 'ReactJS',
    address: 'portfolio',
    language,
    instructions: t['ETryDraggingTheBlobs'][language],
  }),
  '/portfolio/salon': (language) => ({
    heading: t['EHairSalonWebsite'][language],
    text: 'React, Node.js, Express, MySQL, Sequelize',
    address: 'salon',
    language,
  }),
  '/portfolio/composer': (language) => ({
    heading: t['EComposerOlliSanta'][language],
    text: 'React, Node.js, Express, MongoDB',
    address: 'composer',
    language,
  }),
  '/portfolio/graphql': (language) => ({
    heading: 'GraphQL',
    text: t['EGraphQLSite'][language],
    address: 'graphql',
    language,
  }),
  '/portfolio/blob': (language) => ({
    heading: t['EBlobs'][language],
    text: t['EBlobAppSlogan'][language],
    address: 'blob',
    language,
    instructions: t['ETryDraggingTheBlobs'][language],
  }),
  '/portfolio/draganddrop': (language) => ({
    heading: t['EDragAndDrop'][language],
    text: '',
    address: 'draganddrop',
    language,
    instructions: t['ETryDraggingTheBlobs'][language],
  }),
  '/portfolio/todo': (language) => ({
    heading: t['ETodoApp'][language],
    text: t['EGetOrganizedOneTaskAtATime'][language],
    address: 'todo',
    language,
  }),
  '/portfolio/select': (language) => ({
    heading: t['ECustomSelect'][language],
    text: '',
    address: 'select',
    language,
  }),
  '/portfolio/form': (language) => ({
    heading: t['EMultistepForm'][language],
    text: '',
    address: 'form',
    language,
  }),
  '/portfolio/jokes': (language) => ({
    heading: t['ETheComediansCompanion'][language],
    text: t['EAJokeGeneratorForTheComicallyInclined'][language],
    address: 'jokes',
    language,
    reset: t['EReset'][language],
    instructions: t['ETryTappingTheShapes'][language],
  }),
  '/portfolio/quiz': (language) => ({
    heading: t['EQuizApp'][language],
    text: t['ETestYourKnowledge'][language],
    address: 'quiz',
    language,
    instructions: t['ETryTappingTheShapes'][language],
  }),
  '/portfolio/colors': (language) => ({
    heading: t['EColorAccessibility'][language],
    text: t['ETestColorCombinations'][language],
    address: 'colors',
    language,
  }),
  '/portfolio/memory': (language) => ({
    heading: t['EMemoryGame'][language],
    text: t['EMemoryGameIntro'][language],
    address: 'memory',
    language,
  }),
  '/portfolio/media': (language) => ({
    heading: t['EMedia'][language],
    text: t['EMediaWithQuotesOrPoems'][language],
    address: 'media',
    language,
  }),
  '/about': (language) => ({
    heading: t['EAbout'][language],
    text: t['EThisSite'][language],
    address: 'about',
    language,
  }),
  '/contact': (language) => ({
    heading: t['EContact'][language],
    text: t['ELetsCollaborate'][language],
    address: 'contact',
    language,
  }),
  '/cart': (language) => ({
    heading: t['EShoppingCart'][language],
    text: '',
    address: 'cart',
    language,
  }),
  '/store': (language) => ({
    heading: t['EStore'][language],
    text: t['EWebpagesAndGraphicDesign'][language],
    address: 'store',
    language,
  }),
  '/disclaimer': (language) => ({
    heading: t['EPrivacyAndSecurityDisclaimer'][language],
    text: `${t['ELastUpdated'][language]}: 2024/10/20`,
    address: 'disclaimer',
    language,
  }),
  '/terms': (language) => ({
    heading: t['ETermsOfService'][language],
    text: `${t['ELastUpdated'][language]}: 2024/10/20`,
    address: 'terms',
    language,
  }),
  '/orders': (language) => ({
    heading: t['EOrders'][language],
    text: '',
    address: 'orders',
    language,
  }),
  '/edit': (language) => ({
    heading: t['EUserEdit'][language],
    text: t['EEditUserSettings'][language],
    address: 'edit',
    language,
  }),
  '/test': (language) => ({
    heading: 'Test Page',
    text: '',
    address: 'test',
    language,
  }),
}

export function useHeroProps(
  pathname: string,
  displayPath: string,
  language: ELanguages
): HeroProps {
  const [heroProps, setHeroProps] = useState<{
    heading: string
    text: string
    address: string
    reset?: string
    instructions?: string
    language: ELanguages
  }>({
    heading: '',
    text: '',
    address: '',
    language: ELanguages.en,
  })

  useEffect(() => {
    const config = heroConfig[displayPath] || heroConfig['/']
    setHeroProps(config(language))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, language, displayPath])

  return heroProps
}
