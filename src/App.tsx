import { useState, FC, useRef, useEffect, Suspense, lazy } from 'react'
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
import FormPage from './pages/pages-portfolio/FormPage'
import GraphQLPage from './pages/pages-portfolio/GraphQLPage'
import UserEditPage from './pages/UserEditPage'
import JokesPage from './pages/pages-portfolio/JokesPage'
import QuizPage from './pages/pages-portfolio/QuizPage'
import HairSalonPage from './pages/pages-portfolio/HairSalonPage'
import ComposerPage from './pages/pages-portfolio/ComposerPage'
import Disclaimer from './pages/Disclaimer'
import CartPage from './pages/CartPage'
import StorePage from './pages/StorePage'
import OrderPage from './pages/OrderPage'
import TermsOfService from './pages/TermsOfService'
import ColorsPage from './pages/pages-portfolio/ColorsPage'
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
  EPrivacyAndSecurityDisclaimer,
  ELastUpdated,
  ELoading,
  EStore,
  EWebpagesAndGraphicDesign,
  EReset,
  ETryTappingTheShapes,
} from './interfaces'
import { options } from './utils'
import { isTouchDevice } from './hooks/useDraggable'
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
import { EOrders, EShoppingCart, ICartItem } from './interfaces/store'
import { ETermsOfService } from './interfaces'
import { EComposerOlliSanta } from './interfaces/composer'
import { EColorAccessibility, ETestColorCombinations } from './interfaces/colors'
import { EMemoryGame, EMemoryGameIntro } from './interfaces/memory'
import MemoryPage from './pages/pages-portfolio/MemoryPage'
import Modal from './components/Modal/Modal'
import ImagesPage from './pages/pages-portfolio/ImagesPage'
import { EMedia, EMediaWithQuotesOrPoems } from './interfaces/images'
import Hero from './components/Hero/Hero'
import { ETryDraggingTheBlobs } from './interfaces/blobs'

const Footer = lazy(() => import('./components/Footer/Footer'))
const ScrollToTop = lazy(() => import('./components/ScrollToTop/ScrollToTop'))
const QuizStart = lazy(() => import('./components/Quiz/QuizStart'))
const QuizQuestion = lazy(() => import('./components/Quiz/QuizQuestion'))
const QuizFinished = lazy(() => import('./components/Quiz/QuizFinished'))
const NavPortfolio = lazy(() => import('./components/NavPortfolio/NavPortfolio'))
import { Location as RouterLocation } from 'react-router-dom'

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

  const [displayLocation, setDisplayLocation] = useState<RouterLocation>(location)

  const [transitionPage, setTransitionPage] = useState('fadeIn')

  const [language, setLanguage] = useLocalStorage<ELanguages>(
    'AppLanguage',
    ELanguages.English
  )

  useEffect(() => {
    const hash = location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
    if (location.pathname !== displayLocation.pathname) setTransitionPage('fadeOut')
  }, [location, displayLocation.pathname])

  useEffect(() => {
    if (transitionPage === 'fadeOut') {
      const timer = setTimeout(() => {
        setTransitionPage('fadeIn')
        setDisplayLocation(location)
      }, 500) // Match this duration with the CSS animation duration
      return () => clearTimeout(timer)
    }
  }, [transitionPage, location])

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

  // const options = (
  //   enumObj: typeof ECategories | typeof EJokeType | typeof ESafemode | typeof ELanguages
  // ) => {
  //   return Object.keys(enumObj).map((key) => ({
  //     value: enumObj[key as keyof typeof enumObj],
  //     label: key,
  //   })) as SelectOption[]
  // }

  const localStorageCart = 'JCart'
  const [cart, setCart, removeCart] = useLocalStorage<ICartItem[]>(localStorageCart, [])

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

  // hide #to-top-btn when on the /portfolio/colors page:

  const [toTopBtn, setToTopBtn] = useState(true)

  useEffect(() => {
    if (location.pathname === '/portfolio/colors') {
      setToTopBtn(false)
    } else {
      setToTopBtn(true)
    }
  }, [location.pathname])

  interface heroProps {
    heading: string
    text: string
    address: string
    reset?: string
    instructions?: string
    language: ELanguages
  }

  const heroConfig: { [key: string]: heroProps } = {
    '/': {
      heading: EWelcome[language],
      text: EToTheReactSiteOfJenniinaFi[language],
      address: '',
      language,
    },
    '/portfolio': {
      heading: EPortfolio[language],
      text: 'ReactJS',
      address: 'portfolio',
      language,
      instructions: ETryDraggingTheBlobs[language],
    },
    '/portfolio/salon': {
      heading: EHairSalonWebsite[language],
      text: 'React, Node.js, Express, MySQL, Sequelize',
      address: 'salon',
      language,
    },
    '/portfolio/composer': {
      heading: EComposerOlliSanta[language],
      text: 'React, Node.js, Express, MongoDB',
      address: 'composer',
      language,
    },
    '/portfolio/graphql': {
      heading: 'GraphQL',
      text: EGraphQLSite[language],
      address: 'graphql',
      language,
    },
    '/portfolio/blob': {
      heading: EBlobs[language],
      text: EBlobAppSlogan[language],
      address: 'blob',
      language,
      instructions: ETryDraggingTheBlobs[language],
    },
    '/portfolio/draganddrop': {
      heading: EDragAndDrop[language],
      text: '',
      address: 'draganddrop',
      language,
      instructions: ETryDraggingTheBlobs[language],
    },
    '/portfolio/todo': {
      heading: ETodoApp[language],
      text: EGetOrganizedOneTaskAtATime[language],
      address: 'todo',
      language,
    },
    '/portfolio/select': {
      heading: ECustomSelect[language],
      text: '',
      address: 'select',
      language,
    },
    '/portfolio/form': {
      heading: EMultistepForm[language],
      text: '',
      address: 'form',
      language,
    },
    '/portfolio/jokes': {
      heading: ETheComediansCompanion[language],
      text: EAJokeGeneratorForTheComicallyInclined[language],
      address: 'jokes',
      language,
      reset: EReset[language],
      instructions: ETryTappingTheShapes[language],
    },
    '/portfolio/quiz': {
      heading: EQuizApp[language],
      text: ETestYourKnowledge[language],
      address: 'quiz',
      language,
      instructions: ETryTappingTheShapes[language],
    },
    '/portfolio/colors': {
      heading: EColorAccessibility[language],
      text: ETestColorCombinations[language],
      address: 'colors',
      language,
    },
    '/portfolio/memory': {
      heading: EMemoryGame[language],
      text: EMemoryGameIntro[language],
      address: 'memory',
      language,
    },
    '/portfolio/media': {
      heading: EMedia[language],
      text: EMediaWithQuotesOrPoems[language],
      address: 'media',
      language,
    },
    '/about': {
      heading: EAbout[language],
      text: EThisSite[language],
      address: 'about',
      language,
    },
    '/contact': {
      heading: EContact[language],
      text: ELetsCollaborate[language],
      address: 'contact',
      language,
    },
    '/cart': {
      heading: EShoppingCart[language],
      text: '',
      address: 'cart',
      language,
    },
    '/store': {
      heading: EStore[language],
      text: EWebpagesAndGraphicDesign[language],
      address: 'store',
      language,
    },
    '/disclaimer': {
      heading: EPrivacyAndSecurityDisclaimer[language],
      text: `${ELastUpdated[language]}: 2024/10/20`,
      address: 'disclaimer',
      language,
    },
    '/terms': {
      heading: ETermsOfService[language],
      text: `${ELastUpdated[language]}: 2024/10/20`,
      address: 'terms',
      language,
    },
    '/orders': {
      heading: EOrders[language],
      text: '',
      address: 'orders',
      language,
    },
    '/edit': {
      heading: EUserEdit[language],
      text: EEditUserSettings[language],
      address: 'edit',
      language,
    },
    '/test': {
      heading: 'Test Page',
      text: '',
      address: 'test',
      language,
    },
  }

  const [heroProps, setHeroProps] = useState<{
    heading: string
    text: string
    address: string
    reset?: string
    instructions?: string
  }>({
    heading: '',
    text: '',
    address: '',
  })

  useEffect(() => {
    const path = displayLocation.pathname
    const config = heroConfig[path] || heroConfig['/']
    setHeroProps(config)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, language, displayLocation.pathname])

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
            hasCartItems={cart.length > 0}
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
            {heroProps.heading && (
              <Hero
                displayLocation={displayLocation}
                language={language}
                address={heroProps.address}
                heading={heroProps.heading}
                text={heroProps.text}
              />
            )}

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

              <Route
                path='/portfolio'
                element={
                  <Suspense
                    fallback={
                      <div className='flex center margin0auto textcenter'>
                        {ELoading[language]}...
                      </div>
                    }
                  >
                    <NavPortfolio language={language} />
                  </Suspense>
                }
              >
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
                      <Suspense
                        fallback={
                          <div className='flex center margin0auto textcenter'>
                            {ELoading[language]}...
                          </div>
                        }
                      >
                        <QuizStart
                          heading={EQuizApp[language]}
                          text={ETestYourKnowledge[language]}
                          type='page subpage'
                          language={language}
                        />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/portfolio/quiz/difficulty/:difficulty'
                    element={
                      <Suspense
                        fallback={
                          <div className='flex center margin0auto textcenter'>
                            {ELoading[language]}...
                          </div>
                        }
                      >
                        <QuizQuestion language={language} />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/portfolio/quiz/results'
                    element={
                      <Suspense
                        fallback={
                          <div className='flex center margin0auto textcenter'>
                            {ELoading[language]}...
                          </div>
                        }
                      >
                        <QuizFinished language={language} />
                      </Suspense>
                    }
                  />
                </Route>
                <Route
                  path='/portfolio/salon'
                  element={
                    <HairSalonPage
                      language={language}
                      heading={EHairSalonWebsite[language]}
                      text='React, Node.js, Express, MySQL, Sequelize'
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/composer'
                  element={
                    <ComposerPage
                      language={language}
                      heading={EComposerOlliSanta[language]}
                      text='React, Node.js, Express, MongoDB'
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/colors'
                  element={
                    <ColorsPage
                      language={language}
                      heading={EColorAccessibility[language]}
                      text={ETestColorCombinations[language]}
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/memory'
                  element={
                    <MemoryPage
                      language={language}
                      heading={EMemoryGame[language]}
                      text={EMemoryGameIntro[language]}
                      type='page subpage'
                    />
                  }
                />
                <Route
                  path='/portfolio/media'
                  element={
                    <ImagesPage
                      heading={EMedia[language]}
                      text={EMediaWithQuotesOrPoems[language]}
                      type='page subpage'
                      language={language}
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
              <Route
                path='/cart'
                element={
                  <CartPage
                    language={language}
                    heading={EShoppingCart[language]}
                    text=''
                    type='page'
                    cart={cart}
                    setCart={setCart}
                    removeCart={removeCart}
                  />
                }
              />
              <Route
                path='/store'
                element={
                  <StorePage
                    language={language}
                    heading={EStore[language]}
                    text={EWebpagesAndGraphicDesign[language]}
                    type='page'
                    cart={cart}
                    setCart={setCart}
                  />
                }
              />
              <Route
                path='/orders'
                element={
                  <OrderPage
                    language={language}
                    heading={EOrders[language]}
                    text=''
                    type='page'
                  />
                }
              />
              <Route
                path='/disclaimer'
                element={
                  <Disclaimer
                    language={language}
                    heading={EPrivacyAndSecurityDisclaimer[language]}
                    text={`${ELastUpdated[language]}: 2024/10/20`}
                    type='page'
                  />
                }
              />
              <Route
                path='/terms'
                element={
                  <TermsOfService
                    language={language}
                    heading={ETermsOfService[language]}
                    text={`${ELastUpdated[language]}: 2024/10/20`}
                    type='page'
                  />
                }
              />
            </Routes>
          </main>
          <Suspense
            fallback={
              <div className='flex center margin0auto textcenter'>
                {ELoading[language]}...
              </div>
            }
          >
            <Footer language={language} styleMenu={styleMenu} />
          </Suspense>
          {toTopBtn && (
            <Suspense
              fallback={
                <div className='flex center margin0auto textcenter'>
                  {ELoading[language]}...
                </div>
              }
            >
              <ScrollToTop language={language} styleMenu={styleMenu} />
            </Suspense>
          )}
          <Modal language={language} />
          <Notification language={language} />
        </div>
      </div>
    </BlobProvider>
  )
}

export default App
