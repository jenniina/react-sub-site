import { ELanguages } from '../types'

export interface HeroProps {
  heading: string
  text: string
  address: string
  reset?: string
  instructions?: string
  language: ELanguages
}

// Server-side minimal hero config that doesn't import translations
// This prevents bundling the 10k-line translations object into server chunks
// Actual translated text will be hydrated client-side

const serverHeroConfig: Record<string, (language: ELanguages) => HeroProps> = {
  '/': language => ({
    heading: 'Welcome',
    text: 'React Site',
    address: '',
    language,
  }),
  '/portfolio': language => ({
    heading: 'Portfolio',
    text: 'ReactJS',
    address: 'portfolio',
    language,
    instructions: 'Try dragging the blobs',
  }),
  '/portfolio/salon': language => ({
    heading: 'Hair Salon Website',
    text: 'React, Node.js, Express, MySQL, Sequelize',
    address: 'salon',
    language,
  }),
  '/portfolio/composer': language => ({
    heading: 'Composer Olli Santa',
    text: 'React, Node.js, Express, MongoDB',
    address: 'composer',
    language,
  }),
  '/portfolio/graphql': language => ({
    heading: 'GraphQL',
    text: 'GraphQL Site',
    address: 'graphql',
    language,
  }),
  '/portfolio/blob': language => ({
    heading: 'Blobs',
    text: 'Blob App',
    address: 'blob',
    language,
    instructions: 'Try dragging the blobs',
  }),
  '/portfolio/draganddrop': language => ({
    heading: 'Drag and Drop',
    text: '',
    address: 'draganddrop',
    language,
    instructions: 'Try dragging the blobs',
  }),
  '/portfolio/todo': language => ({
    heading: 'Todo App',
    text: 'Get organized, one task at a time',
    address: 'todo',
    language,
  }),
  '/portfolio/select': language => ({
    heading: 'Custom Select',
    text: '',
    address: 'select',
    language,
  }),
  '/portfolio/form': language => ({
    heading: 'Multistep Form',
    text: '',
    address: 'form',
    language,
  }),
  '/portfolio/jokes': language => ({
    heading: "The Comedian's Companion",
    text: 'A joke generator for the comically inclined',
    address: 'jokes',
    language,
    reset: 'Reset',
    instructions: 'Try tapping the shapes',
  }),
  '/portfolio/quiz': language => ({
    heading: 'Quiz App',
    text: 'Test your knowledge',
    address: 'quiz',
    language,
    instructions: 'Try tapping the shapes',
  }),
  '/portfolio/colors': language => ({
    heading: 'Color Accessibility',
    text: 'WCAG Contrast Checker Tool',
    address: 'colors',
    language,
  }),
  '/portfolio/memory': language => ({
    heading: 'Memory Game',
    text: 'Memory game intro',
    address: 'memory',
    language,
  }),
  '/portfolio/media': language => ({
    heading: 'Media',
    text: 'Media with quotes or poems',
    address: 'media',
    language,
  }),
  '/about': language => ({
    heading: 'About',
    text: 'This site',
    address: 'about',
    language,
  }),
  '/contact': language => ({
    heading: 'Contact',
    text: "Let's collaborate",
    address: 'contact',
    language,
  }),
  '/cart': language => ({
    heading: 'Shopping Cart',
    text: '',
    address: 'cart',
    language,
  }),
  '/store': language => ({
    heading: 'Store',
    text: 'Webpages and graphic design',
    address: 'store',
    language,
  }),
  '/disclaimer': language => ({
    heading: 'Privacy and Security Disclaimer',
    text: 'Last updated: 2024/10/20',
    address: 'disclaimer',
    language,
  }),
  '/terms': language => ({
    heading: 'Terms of Service',
    text: 'Last updated: 2024/10/20',
    address: 'terms',
    language,
  }),
  '/orders': language => ({
    heading: 'Orders',
    text: '',
    address: 'orders',
    language,
  }),
  '/edit': language => ({
    heading: 'User Edit',
    text: 'Edit user settings',
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

  const tryExact = (p: string) => serverHeroConfig[p]

  let configFn = tryExact(normDisplay) ?? tryExact(normPath)

  if (!configFn) {
    const keys = Object.keys(serverHeroConfig).sort((a, b) => b.length - a.length)
    const match = keys.find(k => {
      if (k === '/') return false
      return (
        normPath === k ||
        normPath.startsWith(k + '/') ||
        normDisplay === k ||
        normDisplay.startsWith(k + '/')
      )
    })
    configFn = match ? serverHeroConfig[match] : serverHeroConfig['/']
  }

  return configFn(language)
}
