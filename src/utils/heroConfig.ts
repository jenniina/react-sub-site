import { ELanguages } from '../types'
import { translations as t } from '../i18n/translations'

export interface HeroProps {
  heading: string
  text: string
  address: string
  reset?: string
  instructions?: string
  language: ELanguages
}

const heroConfig: Record<string, (language: ELanguages) => HeroProps> = {
  '/': language => ({
    heading: t.Welcome[language],
    text: t.ToTheReactSiteOfJenniinaFi[language],
    address: '',
    language,
  }),
  '/portfolio': language => ({
    heading: t.Portfolio[language],
    text: 'ReactJS',
    address: 'portfolio',
    language,
    instructions: t.TryDraggingTheBlobs[language],
  }),
  '/portfolio/salon': language => ({
    heading: t.HairSalonWebsite[language],
    text: 'React, Node.js, Express, MySQL, Sequelize',
    address: 'salon',
    language,
  }),
  '/portfolio/composer': language => ({
    heading: t.ComposerOlliSanta[language],
    text: 'React, Node.js, Express, MongoDB',
    address: 'composer',
    language,
  }),
  '/portfolio/graphql': language => ({
    heading: 'GraphQL',
    text: t.GraphQLSite[language],
    address: 'graphql',
    language,
  }),
  '/portfolio/blob': language => ({
    heading: t.Blobs[language],
    text: t.BlobAppSlogan[language],
    address: 'blob',
    language,
    instructions: t.TryDraggingTheBlobs[language],
  }),
  '/portfolio/draganddrop': language => ({
    heading: t.DragAndDrop[language],
    text: '',
    address: 'draganddrop',
    language,
    instructions: t.TryDraggingTheBlobs[language],
  }),
  '/portfolio/todo': language => ({
    heading: t.TodoApp[language],
    text: t.GetOrganizedOneTaskAtATime[language],
    address: 'todo',
    language,
  }),
  '/portfolio/select': language => ({
    heading: t.CustomSelect[language],
    text: '',
    address: 'select',
    language,
  }),
  '/portfolio/form': language => ({
    heading: t.MultistepForm[language],
    text: '',
    address: 'form',
    language,
  }),
  '/portfolio/jokes': language => ({
    heading: t.TheComediansCompanion[language],
    text: t.AJokeGeneratorForTheComicallyInclined[language],
    address: 'jokes',
    language,
    reset: t.Reset[language],
    instructions: t.TryTappingTheShapes[language],
  }),
  '/portfolio/quiz': language => ({
    heading: t.QuizApp[language],
    text: t.TestYourKnowledge[language],
    address: 'quiz',
    language,
    instructions: t.TryTappingTheShapes[language],
  }),
  '/portfolio/colors': language => ({
    heading: t.ColorAccessibility[language],
    text: t.WCAGTool[language],
    address: 'colors',
    language,
  }),
  '/portfolio/memory': language => ({
    heading: t.MemoryGame[language],
    text: t.MemoryGameIntro[language],
    address: 'memory',
    language,
  }),
  '/portfolio/media': language => ({
    heading: t.Media[language],
    text: t.MediaWithQuotesOrPoems[language],
    address: 'media',
    language,
  }),
  '/contact': language => ({
    heading: t.Contact[language],
    text: t.LetsCollaborate[language],
    address: 'contact',
    language,
  }),
  '/cart': language => ({
    heading: t.ShoppingCart[language],
    text: '',
    address: 'cart',
    language,
  }),
  '/store': language => ({
    heading: t.Store[language],
    text: t.WebpagesAndGraphicDesign[language],
    address: 'store',
    language,
  }),
  '/disclaimer': language => ({
    heading: t.PrivacyAndSecurityDisclaimer[language],
    text: `${t.LastUpdated[language]}: 2024/10/20`,
    address: 'disclaimer',
    language,
  }),
  '/terms': language => ({
    heading: t.TermsOfService[language],
    text: `${t.LastUpdated[language]}: 2024/10/20`,
    address: 'terms',
    language,
  }),
  '/orders': language => ({
    heading: t.Orders[language],
    text: '',
    address: 'orders',
    language,
  }),
  '/edit': language => ({
    heading: t.UserEdit[language],
    text: t.EditUserSettings[language],
    address: 'edit',
    language,
  }),
  '/test': language => ({
    heading: 'Test Page',
    text: '',
    address: 'test',
    language,
  }),
}

export function getHeroProps(
  pathname: string,
  displayPath: string,
  language: ELanguages
): HeroProps {
  const normalize = (p: string) => {
    if (!p) return '/'
    if (p === '/') return '/'
    return p.replace(/\/+$/g, '').replace(/\/$/, '') || '/'
  }

  const normPath = normalize(pathname)
  const normDisplay = normalize(displayPath)

  const tryExact = (p: string) => heroConfig[p]

  let configFn = tryExact(normDisplay) ?? tryExact(normPath)

  if (!configFn) {
    const keys = Object.keys(heroConfig).sort((a, b) => b.length - a.length)
    const match = keys.find(k => {
      if (k === '/') return false
      return (
        normPath === k ||
        normPath.startsWith(k + '/') ||
        normDisplay === k ||
        normDisplay.startsWith(k + '/')
      )
    })
    configFn = match ? heroConfig[match] : heroConfig['/']
  }

  return configFn(language)
}

export default heroConfig
