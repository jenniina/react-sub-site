import { useState, FC, useRef, useEffect, createContext, useReducer } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './css/App.css'
import './css/form.css'
import Nav from './components/Nav/Nav'
import Welcome from './pages/Welcome'
import Test from './pages/testpage'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import BlobPage from './pages/pages-portfolio/BlobPage'
import DragAndDropPage from './pages/pages-portfolio/DragAndDropPage'
import TodoPage from './pages/pages-portfolio/TodoPage'
import CustomSelectPage from './pages/pages-portfolio/CustomSelectPage'
import NavPortfolio from './components/NavPortfolio/NavPortfolio'
import FormPage from './pages/pages-portfolio/FormPage'
import { Footer } from './components/Footer/Footer'
import { useTheme } from './hooks/useTheme'
import { useScrollbarWidth } from './hooks/useScrollbarWidth'
import { ReducerProps, RefObject } from './interfaces'
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop'
import { isTouchDevice } from './hooks/useDraggable'
import UserEditPage from './pages/UserEditPage'
import JokesPage from './pages/pages-portfolio/JokesPage'
import QuizPage from './pages/pages-portfolio/QuizPage'
import QuizStart from './components/Quiz/QuizStart'
import QuizQuestion from './components/Quiz/QuizQuestion'
import QuizFinished from './components/Quiz/QuizFinished'
import { BlobProvider } from './components/Blob/components/BlobProvider'
import useLocalStorage from './hooks/useStorage'
import { ELanguages } from './components/Jokes/interfaces'
import { useAppDispatch } from './hooks/useAppDispatch'
import { initializeUser } from './reducers/authReducer'

const App: FC = () => {
  const touchDevice = isTouchDevice()

  const scrollbarWidth = useScrollbarWidth()

  const styleInnerWrap: React.CSSProperties = {
    ['--scrollbar_width' as string]: `${scrollbarWidth}px`,
  }

  //To get menualt type from Nav and set Footer padding accordingly:
  const [styleMenu, setStyleMenu] = useState<boolean>()
  const menuStyle = useRef() as RefObject<{ getStyle: () => boolean }>

  const [menuStyleAltTransform, setMenuStyleAltTransform] = useState(false)

  const lightTheme = useTheme()

  //So transformations don't take place when changing menu style or toggling light/dark mode:
  useEffect(() => {
    setMenuStyleAltTransform(false)
    setTimeout(() => {
      setMenuStyleAltTransform(true)
    }, 300)
  }, [lightTheme, menuStyle.current])

  const location = useLocation()

  const [displayLocation, setDisplayLocation] = useState(location)

  const [transitionPage, setTransistionPage] = useState('fadeIn')

  const [language, setLanguage] = useLocalStorage<ELanguages>(
    'language',
    ELanguages.English
  )

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    if (location.pathname !== displayLocation.pathname) setTransistionPage('fadeOut')
  }, [location])

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  return (
    <BlobProvider>
      <div
        className={`App ${lightTheme ? 'light' : ''} ${touchDevice ? 'touch' : ''}  ${
          menuStyleAltTransform ? `transformations` : ''
        }`}
      >
        <div className='App-inner-wrap' style={styleInnerWrap}>
          <Nav setStyleMenu={setStyleMenu} ref={menuStyle} language={language} />

          <main
            id={`main-content`}
            className={`${transitionPage} main-content z`}
            onAnimationEnd={() => {
              if (transitionPage === 'fadeOut') {
                setTransistionPage('fadeIn')
                setDisplayLocation(location)
              }
            }}
          >
            <Routes location={displayLocation}>
              <Route
                path='*'
                element={
                  <Welcome
                    heading='Welcome'
                    text='to the React sub-page of Jenniina.fi'
                    type='page'
                  />
                }
              />
              <Route
                path='/about'
                element={<About heading='About' text='This Site' type='page' />}
              />

              <Route
                path='/test'
                element={<Test heading='Test Page' text='' type='page' />}
              />

              <Route
                path='/edit'
                element={
                  <UserEditPage
                    heading='User Edit'
                    text=''
                    type='page'
                    language={language}
                    setLanguage={setLanguage}
                  />
                }
              />

              <Route path='/portfolio' element={<NavPortfolio />}>
                <Route
                  index
                  element={<Portfolio heading='Portfolio' type='page' text='ReactJS' />}
                />
                <Route
                  path='/portfolio/blob'
                  element={<BlobPage heading='Blob App' text='' type='page subpage' />}
                />
                <Route
                  path='/portfolio/draganddrop'
                  element={
                    <DragAndDropPage
                      heading='Drag and Drop'
                      text=''
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/todo'
                  element={<TodoPage heading='Todo App' text='' type='page subpage' />}
                />
                <Route
                  path='/portfolio/select'
                  element={
                    <CustomSelectPage
                      heading='Custom Select'
                      text=''
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/form'
                  element={
                    <FormPage heading='Multistep Form' text='' type='page subpage' />
                  }
                />
                <Route
                  path='/portfolio/jokes/*'
                  element={
                    <JokesPage
                      heading="The Comedian's Companion"
                      text=''
                      type='page subpage'
                      language={language}
                      setLanguage={setLanguage}
                    />
                  }
                />
                <Route path='/portfolio/quiz/' element={<QuizPage />}>
                  <Route
                    index
                    element={<QuizStart heading='Quiz App' text='' type='page subpage' />}
                  />
                  <Route path='/portfolio/quiz/:difficulty' element={<QuizQuestion />} />
                  <Route path='/portfolio/quiz/results' element={<QuizFinished />} />
                </Route>
              </Route>

              <Route
                path='/contact'
                element={
                  <Contact heading='Contact' text="Let's collaborate" type='page' />
                }
              />
            </Routes>
          </main>

          <Footer styleMenu={styleMenu} />
          <ScrollToTop styleMenu={styleMenu} />
        </div>
      </div>
    </BlobProvider>
  )
}

export default App
