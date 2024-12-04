import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'
import { ModalProvider } from './hooks/useModal'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider key={null} type={''} props={undefined}>
        <Provider store={store}>
          <ModalProvider>
            <App />
          </ModalProvider>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
