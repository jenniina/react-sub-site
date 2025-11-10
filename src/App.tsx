import { FC, useRef, useContext } from 'react'
import './css/App.css'
import './css/form.css'
import Nav from './components/Nav/Nav'
import Modal from './components/Modal/Modal'
import Notification from './components/Notification/Notification'
import MainWrapper from './components/MainWrapper/MainWrapper'
import { RefObject } from './types'
import { UIProvider } from './contexts/UIContext'
import { useLanguageContext } from './contexts/LanguageContext'
import useLocalStorage from './hooks/useStorage'

import { ConfirmProvider } from './contexts/ConfirmContext'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

const App: FC = () => {
  const { language, setLanguage, t } = useLanguageContext()

  const [styleMenu, setStyleMenu] = useLocalStorage<boolean>(
    'styleOfMenu',
    false
  )
  const menuStyleRef = useRef() as RefObject<{ getStyle: () => boolean }>

  return (
    <>
      <UIProvider language={language} menuStyle={menuStyleRef}>
        <ConfirmProvider>
          <Nav
            setStyleMenu={setStyleMenu}
            ref={menuStyleRef}
            language={language}
            setLanguage={setLanguage}
          />
          <MainWrapper language={language} setLanguage={setLanguage} />
          <Footer language={language} styleMenu={styleMenu} />
          <ScrollToTop language={language} styleMenu={styleMenu} />
          <Modal language={language} />
          <Notification language={language} />{' '}
        </ConfirmProvider>
      </UIProvider>
    </>
  )
}

export default App
