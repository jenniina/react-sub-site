import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './hooks/useTheme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider key={null} type={''} props={undefined}>

        <App />

      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
