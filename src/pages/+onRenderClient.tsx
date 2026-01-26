export { onRenderClient }

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store.client'
import { ThemeProvider } from '../contexts/ThemeContext'
import { ModalProvider } from '../hooks/useModal'
import { LanguageProvider } from '../contexts/LanguageContext'
import { BlobProvider } from '../components/Blob/components/BlobProvider'
import { HelmetProvider } from 'react-helmet-async'
import App from '../App'

function onRenderClient() {
  const container = document.getElementById('root')
  if (!container) throw new Error('DOM element #root not found')

  // Ensure a portal root exists for modals
  if (typeof document !== 'undefined') {
    const modalRoot = document.getElementById('modal-root')
    if (!modalRoot) {
      const mr = document.createElement('div')
      mr.id = 'modal-root'
      document.body.appendChild(mr)
    }
  }

  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <LanguageProvider>
          <BlobProvider>
            <ThemeProvider>
              <Provider store={store}>
                <HelmetProvider>
                  <ModalProvider>
                    <App />
                  </ModalProvider>
                </HelmetProvider>
              </Provider>
            </ThemeProvider>
          </BlobProvider>
        </LanguageProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}
