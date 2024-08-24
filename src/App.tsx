import { useState, FC, useRef, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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
import GraphQLPage from './pages/pages-portfolio/GraphQLPage'
import { Footer } from './components/Footer/Footer'
import { useTheme } from './hooks/useTheme'
import { useScrollbarWidth } from './hooks/useScrollbarWidth'
import {
  RefObject,
  ELanguages,
  EWelcome,
  EToTheReactSiteOfJenniinaFi,
  EAbout,
  EThisSite,
  EUserEdit,
  EPortfolio,
  EDragAndDrop,
  ECustomSelect,
  EMultistepForm,
  ETestYourKnowledge,
  EContact,
  ELetsCollaborate,
  EQuizApp,
  EBlobs,
  EBlobAppSlogan,
  EHairSalonWebsite,
  EGraphQLSite,
} from './interfaces'
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
import {
  EAJokeGeneratorForTheComicallyInclined,
  ECategories,
  EJokeType,
  ESafemode,
  ETheComediansCompanion,
  TCategoryByLanguages,
} from './components/Jokes/interfaces'
import { EGetOrganizedOneTaskAtATime, ETodoApp } from './components/Todo/interfaces'
import { SelectOption } from './components/Select/Select'
import Notification from './components/Notification/Notification'
import { EEditUserSettings } from './components/UserEdit/interfaces'
import { EReactApps } from './interfaces/about'
import HairSalonPage from './pages/pages-portfolio/HairSalonPage'

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

  const [transitionPage, setTransitionPage] = useState('fadeIn')

  const [language, setLanguage] = useLocalStorage<ELanguages>(
    'JokeAppLanguage',
    ELanguages.English
  )

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    if (location.pathname !== displayLocation.pathname) setTransitionPage('fadeOut')
  }, [location])

  function getKeyByValue(
    enumObj:
      | TCategoryByLanguages
      | typeof EJokeType
      | typeof ESafemode
      | typeof ELanguages,
    value: ECategories | EJokeType | ESafemode | ELanguages
  ) {
    for (const key in enumObj) {
      if (enumObj[key as keyof typeof enumObj] === value) {
        return key as SelectOption['label']
      }
    }
    // Handle the case where the value is not found in the enum
    return undefined
  }

  const options = (
    enumObj: typeof ECategories | typeof EJokeType | typeof ESafemode | typeof ELanguages
  ) => {
    return Object.keys(enumObj).map((key) => ({
      value: enumObj[key as keyof typeof enumObj],
      label: key,
    })) as SelectOption[]
  }

  // Scroll to item if 'to' param is in url
  // ?to=form
  // scrolls to #form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const toParam = urlParams.get('to')
    if (toParam) {
      const toAnchor = document.querySelector(`#${toParam}`)
      if (toAnchor) {
        toAnchor.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  //change language with ?lang=fi etc:
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get('lang')
    if (langParam && Object.values(ELanguages).includes(langParam as any)) {
      setLanguage(langParam as ELanguages)
    }
  }, [])

  // Set the document language and title
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `document.documentElement.lang = '${language}';`
    document.head.appendChild(script)
    const h1Element = document.querySelector('h1')
    const h1Text = h1Element ? h1Element.textContent : ''
    document.title = `${EReactApps[language]} (Jenniina.fi) ${h1Text}`

    return () => {
      document.head.removeChild(script)
    }
  }, [language])

  const setTooltips = () => {
    const tooltips = document.querySelectorAll('.tooltip-wrap .tooltip')

    tooltips.forEach((tooltip) => {
      const tooltipElement = tooltip as HTMLElement
      const tooltipAfter = window.getComputedStyle(tooltipElement, '::after')
      const width = tooltipAfter.getPropertyValue('width')
      const height = tooltipAfter.getPropertyValue('height')

      if (width && height) {
        tooltipElement.style.width = width
        tooltipElement.style.height = height
        tooltipElement.style.setProperty('--tooltip-width', width)
        tooltipElement.style.setProperty('--tooltip-height', height)
      }
    })
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTooltips()
    }, 1000) //Page has time to load

    return () => clearTimeout(timeoutId)
  }, [location])

  return (
    <BlobProvider>
      <div
        className={`App ${lightTheme ? 'light' : ''} ${touchDevice ? 'touch' : ''}  ${
          menuStyleAltTransform ? `transformations` : ''
        } ${language}`}
      >
        <div className='App-inner-wrap' style={styleInnerWrap}>
          <Nav
            setStyleMenu={setStyleMenu}
            ref={menuStyle}
            language={language}
            setLanguage={setLanguage}
            options={options}
            getKeyByValue={getKeyByValue}
          />

          <main
            id={`main-content`}
            className={`${transitionPage} main-content z`}
            onAnimationEnd={() => {
              if (transitionPage === 'fadeOut') {
                setTransitionPage('fadeIn')
                setDisplayLocation(location)
              }
            }}
          >
            <Routes location={displayLocation}>
              <Route
                path='*'
                element={
                  <Welcome
                    language={language}
                    setLanguage={setLanguage}
                    heading={EWelcome[language]}
                    text={EToTheReactSiteOfJenniinaFi[language]}
                    type='page'
                    options={options}
                    getKeyByValue={getKeyByValue}
                  />
                }
              />
              <Route
                path='/about'
                element={
                  <About
                    language={language}
                    heading={EAbout[language]}
                    text={EThisSite[language]}
                    type='page'
                  />
                }
              />

              <Route
                path='/test'
                element={<Test heading='Test Page' text='' type='page' />}
              />

              <Route
                path='/edit'
                element={
                  <UserEditPage
                    heading={EUserEdit[language]}
                    text={EEditUserSettings[language]}
                    type='page'
                    language={language}
                    setLanguage={setLanguage}
                    options={options}
                    getKeyByValue={getKeyByValue}
                  />
                }
              />

              <Route path='/portfolio' element={<NavPortfolio language={language} />}>
                <Route
                  index
                  element={
                    <Portfolio
                      heading={EPortfolio[language]}
                      type='page'
                      text='ReactJS'
                      language={language}
                    />
                  }
                />
                <Route
                  path='/portfolio/graphql'
                  element={
                    <GraphQLPage
                      language={language}
                      heading='GraphQL'
                      text={EGraphQLSite[language]}
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/blob'
                  element={
                    <BlobPage
                      language={language}
                      heading={EBlobs[language]}
                      text={EBlobAppSlogan[language]}
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/draganddrop'
                  element={
                    <DragAndDropPage
                      language={language}
                      heading={EDragAndDrop[language]}
                      text=''
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/todo'
                  element={
                    <TodoPage
                      heading={ETodoApp[language]}
                      text={EGetOrganizedOneTaskAtATime[language]}
                      type='page subpage'
                      language={language}
                    />
                  }
                />
                <Route
                  path='/portfolio/select'
                  element={
                    <CustomSelectPage
                      language={language}
                      heading={ECustomSelect[language]}
                      text=''
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/form'
                  element={
                    <FormPage
                      language={language}
                      heading={EMultistepForm[language]}
                      text=''
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/jokes/*'
                  element={
                    <JokesPage
                      heading={ETheComediansCompanion[language]}
                      text={EAJokeGeneratorForTheComicallyInclined[language]}
                      type='page subpage'
                      language={language}
                      setLanguage={setLanguage}
                    />
                  }
                />
                <Route path='/portfolio/quiz/' element={<QuizPage />}>
                  <Route
                    index
                    element={
                      <QuizStart
                        heading={EQuizApp[language]}
                        text={ETestYourKnowledge[language]}
                        type='page subpage'
                        language={language}
                      />
                    }
                  />
                  <Route
                    path='/portfolio/quiz/:difficulty'
                    element={<QuizQuestion language={language} />}
                  />
                  <Route
                    path='/portfolio/quiz/results'
                    element={<QuizFinished language={language} />}
                  />
                </Route>
                <Route
                  path='/portfolio/salon'
                  element={
                    <HairSalonPage
                      language={language}
                      heading={EHairSalonWebsite[language]}
                      text='Hannastiina'
                      type='page subpage'
                    />
                  }
                />
              </Route>

              <Route
                path='/contact'
                element={
                  <Contact
                    language={language}
                    heading={EContact[language]}
                    text={ELetsCollaborate[language]}
                    type='page'
                  />
                }
              />
            </Routes>
          </main>

          <Footer language={language} styleMenu={styleMenu} />
          <ScrollToTop language={language} styleMenu={styleMenu} />
          <Notification language={language} />
        </div>
      </div>
    </BlobProvider>
  )
}

export default App
