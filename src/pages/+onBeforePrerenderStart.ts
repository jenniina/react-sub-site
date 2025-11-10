export { onBeforePrerenderStart }

async function onBeforePrerenderStart() {
  // Return all the URLs you want to prerender
  const urls = [
    '/',
    '/about',
    '/portfolio',
    '/portfolio/memory',
    '/portfolio/graphql',
    '/portfolio/blob',
    '/portfolio/draganddrop',
    '/portfolio/todo',
    '/portfolio/select',
    '/portfolio/form',
    '/portfolio/jokes',
    '/portfolio/quiz',
    '/portfolio/salon',
    '/portfolio/composer',
    '/portfolio/colors',
    '/portfolio/media',
    '/contact',
    '/cart',
    '/store',
    '/orders',
    '/disclaimer',
    '/terms',
    '/edit',
  ]

  return urls
}
