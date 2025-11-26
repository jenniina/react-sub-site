export { onRenderHtml }

import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import store from '../store'
import { ThemeProvider } from '../contexts/ThemeContext'
import { ModalProvider } from '../hooks/useModal'
import { LanguageProvider } from '../contexts/LanguageContext'
import { BlobProvider } from '../components/Blob/components/BlobProvider'
import App from '../App'

function onRenderHtml(pageContext: { urlPathname?: string }) {
  const pageHtml = renderToString(
    <React.StrictMode>
      <StaticRouter location={pageContext.urlPathname ?? '/'}>
        <LanguageProvider>
          <BlobProvider>
            <ThemeProvider>
              <Provider store={store}>
                <ModalProvider>
                  <App />
                </ModalProvider>
              </Provider>
            </ThemeProvider>
          </BlobProvider>
        </LanguageProvider>
      </StaticRouter>
    </React.StrictMode>
  )

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Sub Site | Jenniina Laine</title>
        <meta name="description" content="Portfolio and projects by Jenniina Laine" />
        <meta name="author" content="Jenniina Laine" />
        <meta property="og:type" content="website" />
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
         <div id="modal-root"></div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {},
  }
}
