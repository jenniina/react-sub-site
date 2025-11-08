export { onBeforeRender };

async function onBeforeRender(pageContext: any) {
  const { urlPathname } = pageContext;

  return {
    pageContext: {
      pageProps: {
        route: urlPathname,
      },
    },
  };
}
