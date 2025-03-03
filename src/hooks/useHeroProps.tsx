import { useEffect, useState } from 'react'
import {
  EAbout,
  EBlobAppSlogan,
  EBlobs,
  EContact,
  ECustomSelect,
  EDragAndDrop,
  EGraphQLSite,
  EHairSalonWebsite,
  ELanguages,
  ELastUpdated,
  ELetsCollaborate,
  EMultistepForm,
  EPortfolio,
  EPrivacyAndSecurityDisclaimer,
  EQuizApp,
  EReset,
  EStore,
  ETermsOfService,
  ETestYourKnowledge,
  EThisSite,
  EToTheReactSiteOfJenniinaFi,
  ETryTappingTheShapes,
  EUserEdit,
  EWebpagesAndGraphicDesign,
  EWelcome,
} from '../types'
import {
  ETheComediansCompanion,
  EAJokeGeneratorForTheComicallyInclined,
} from '../components/Jokes/types'
import { ETodoApp, EGetOrganizedOneTaskAtATime } from '../components/Todo/types'
import { EEditUserSettings } from '../components/UserEdit/types'
import { ETryDraggingTheBlobs } from '../types/blobs'
import { EColorAccessibility, ETestColorCombinations } from '../types/colors'
import { EComposerOlliSanta } from '../types/composer'
import { EMedia, EMediaWithQuotesOrPoems } from '../types/images'
import { EMemoryGame, EMemoryGameIntro } from '../types/memory'
import { EShoppingCart, EOrders } from '../types/store'

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
    heading: EWelcome[language],
    text: EToTheReactSiteOfJenniinaFi[language],
    address: '',
    language,
  }),
  '/portfolio': (language) => ({
    heading: EPortfolio[language],
    text: 'ReactJS',
    address: 'portfolio',
    language,
    instructions: ETryDraggingTheBlobs[language],
  }),
  '/portfolio/salon': (language) => ({
    heading: EHairSalonWebsite[language],
    text: 'React, Node.js, Express, MySQL, Sequelize',
    address: 'salon',
    language,
  }),
  '/portfolio/composer': (language) => ({
    heading: EComposerOlliSanta[language],
    text: 'React, Node.js, Express, MongoDB',
    address: 'composer',
    language,
  }),
  '/portfolio/graphql': (language) => ({
    heading: 'GraphQL',
    text: EGraphQLSite[language],
    address: 'graphql',
    language,
  }),
  '/portfolio/blob': (language) => ({
    heading: EBlobs[language],
    text: EBlobAppSlogan[language],
    address: 'blob',
    language,
    instructions: ETryDraggingTheBlobs[language],
  }),
  '/portfolio/draganddrop': (language) => ({
    heading: EDragAndDrop[language],
    text: '',
    address: 'draganddrop',
    language,
    instructions: ETryDraggingTheBlobs[language],
  }),
  '/portfolio/todo': (language) => ({
    heading: ETodoApp[language],
    text: EGetOrganizedOneTaskAtATime[language],
    address: 'todo',
    language,
  }),
  '/portfolio/select': (language) => ({
    heading: ECustomSelect[language],
    text: '',
    address: 'select',
    language,
  }),
  '/portfolio/form': (language) => ({
    heading: EMultistepForm[language],
    text: '',
    address: 'form',
    language,
  }),
  '/portfolio/jokes': (language) => ({
    heading: ETheComediansCompanion[language],
    text: EAJokeGeneratorForTheComicallyInclined[language],
    address: 'jokes',
    language,
    reset: EReset[language],
    instructions: ETryTappingTheShapes[language],
  }),
  '/portfolio/quiz': (language) => ({
    heading: EQuizApp[language],
    text: ETestYourKnowledge[language],
    address: 'quiz',
    language,
    instructions: ETryTappingTheShapes[language],
  }),
  '/portfolio/colors': (language) => ({
    heading: EColorAccessibility[language],
    text: ETestColorCombinations[language],
    address: 'colors',
    language,
  }),
  '/portfolio/memory': (language) => ({
    heading: EMemoryGame[language],
    text: EMemoryGameIntro[language],
    address: 'memory',
    language,
  }),
  '/portfolio/media': (language) => ({
    heading: EMedia[language],
    text: EMediaWithQuotesOrPoems[language],
    address: 'media',
    language,
  }),
  '/about': (language) => ({
    heading: EAbout[language],
    text: EThisSite[language],
    address: 'about',
    language,
  }),
  '/contact': (language) => ({
    heading: EContact[language],
    text: ELetsCollaborate[language],
    address: 'contact',
    language,
  }),
  '/cart': (language) => ({
    heading: EShoppingCart[language],
    text: '',
    address: 'cart',
    language,
  }),
  '/store': (language) => ({
    heading: EStore[language],
    text: EWebpagesAndGraphicDesign[language],
    address: 'store',
    language,
  }),
  '/disclaimer': (language) => ({
    heading: EPrivacyAndSecurityDisclaimer[language],
    text: `${ELastUpdated[language]}: 2024/10/20`,
    address: 'disclaimer',
    language,
  }),
  '/terms': (language) => ({
    heading: ETermsOfService[language],
    text: `${ELastUpdated[language]}: 2024/10/20`,
    address: 'terms',
    language,
  }),
  '/orders': (language) => ({
    heading: EOrders[language],
    text: '',
    address: 'orders',
    language,
  }),
  '/edit': (language) => ({
    heading: EUserEdit[language],
    text: EEditUserSettings[language],
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

export function useHeroProps(displayPath: string, language: ELanguages): HeroProps {
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
    language: ELanguages.English,
  })

  useEffect(() => {
    const config = heroConfig[displayPath] || heroConfig['/']
    setHeroProps(config(language))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, language, displayPath])

  return heroProps
}
