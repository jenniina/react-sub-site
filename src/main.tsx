import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { ModalProvider } from './hooks/useModal'
import { LanguageProvider } from './contexts/LanguageContext'
import { BlobProvider } from './components/Blob/components/BlobProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </StrictMode>
)
