import { useState, FC, useRef, Suspense, lazy, useContext } from 'react'
import './css/App.css'
import './css/form.css'
import Nav from './components/Nav/Nav'
import Modal from './components/Modal/Modal'
import Notification from './components/Notification/Notification'
import MainWrapper from './components/MainWrapper/MainWrapper'
import { RefObject } from './types'
import { UIProvider } from './contexts/UIContext'
import { LanguageContext } from './contexts/LanguageContext'
import useLocalStorage from './hooks/useStorage'

const Footer = lazy(() => import('./components/Footer/Footer'))
const ScrollToTop = lazy(() => import('./components/ScrollToTop/ScrollToTop'))

const App: FC = () => {
  const { language, setLanguage, t } = useContext(LanguageContext)!

  const [styleMenu, setStyleMenu] = useLocalStorage<boolean>('styleOfMenu', false)
  const menuStyleRef = useRef() as RefObject<{ getStyle: () => boolean }>

  return (
    <UIProvider language={language} menuStyle={menuStyleRef}>
      <Nav
        setStyleMenu={setStyleMenu}
        ref={menuStyleRef}
        language={language}
        setLanguage={setLanguage}
      />
      <MainWrapper language={language} setLanguage={setLanguage} />
      <Suspense
        fallback={
          <div className='flex center margin0auto textcenter'>{t('Loading')}...</div>
        }
      >
        <Footer language={language} styleMenu={styleMenu} />
      </Suspense>
      <Suspense
        fallback={
          <div className='flex center margin0auto textcenter'>{t('Loading')}...</div>
        }
      >
        <ScrollToTop language={language} styleMenu={styleMenu} />
      </Suspense>
      <Modal language={language} />
      <Notification language={language} />
    </UIProvider>
  )
}

export default App
