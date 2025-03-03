import { useState, FC, useRef, useEffect, Suspense, lazy, useContext } from 'react'
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
} from './types'
import { options } from './utils'
import { BlobProvider } from './components/Blob/components/BlobProvider'
import useLocalStorage from './hooks/useStorage'
import {
  EAJokeGeneratorForTheComicallyInclined,
  ECategories,
  EJokeType,
  ESafemode,
  ETheComediansCompanion,
  TCategoryByLanguages,
} from './components/Jokes/types'
import { EGetOrganizedOneTaskAtATime, ETodoApp } from './components/Todo/types'
import { SelectOption } from './components/Select/Select'
import Notification from './components/Notification/Notification'
import { EEditUserSettings } from './components/UserEdit/types'
import { EOrders, EShoppingCart, ICartItem } from './types/store'
import { ETermsOfService } from './types'
import { EComposerOlliSanta } from './types/composer'
import { EColorAccessibility, ETestColorCombinations } from './types/colors'
import { EMemoryGame, EMemoryGameIntro } from './types/memory'
import MemoryPage from './pages/pages-portfolio/MemoryPage'
import Modal from './components/Modal/Modal'
import ImagesPage from './pages/pages-portfolio/ImagesPage'
import { EMedia, EMediaWithQuotesOrPoems } from './types/images'
import { UIProvider } from './contexts/UIContext'

const Footer = lazy(() => import('./components/Footer/Footer'))
const ScrollToTop = lazy(() => import('./components/ScrollToTop/ScrollToTop'))
const QuizStart = lazy(() => import('./components/Quiz/QuizStart'))
const QuizQuestion = lazy(() => import('./components/Quiz/QuizQuestion'))
const QuizFinished = lazy(() => import('./components/Quiz/QuizFinished'))
const NavPortfolio = lazy(() => import('./components/NavPortfolio/NavPortfolio'))
import { Location as RouterLocation } from 'react-router-dom'
import { useScrollToHashOrTop } from './hooks/useScrollTo'
import { useDocumentTitleAndLanguage } from './hooks/useDocumentTitleAndLanguage'
import { useHeroProps } from './hooks/useHeroProps'
import { MainProvider } from './contexts/MainContext'
import { LanguageContext } from './contexts/LanguageContext'

const App: FC = () => {
  const { language, setLanguage } = useContext(LanguageContext)!

  const location = useLocation()

  const [displayLocation, setDisplayLocation] = useState<RouterLocation>(location)

  const heroProps = useHeroProps(displayLocation.pathname, language)

  useScrollToHashOrTop(displayLocation.pathname)

  // Update document language and title
  useDocumentTitleAndLanguage({ language })

  const [styleMenu, setStyleMenu] = useState<boolean>()
  const menuStyle = useRef() as RefObject<{ getStyle: () => boolean }>

  const localStorageCart = 'JCart'
  const [cart, setCart, removeCart] = useLocalStorage<ICartItem[]>(localStorageCart, [])

  return (
    <BlobProvider>
      <UIProvider language={language} menuStyle={menuStyle}>
        <Nav
          setStyleMenu={setStyleMenu}
          ref={menuStyle}
          language={language}
          setLanguage={setLanguage}
          options={options}
          hasCartItems={cart.length > 0}
        />

        <MainProvider
          language={language}
          setLanguage={setLanguage}
          heroProps={heroProps}
          displayLocation={displayLocation}
          setDisplayLocation={setDisplayLocation}
          location={location}
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
        </MainProvider>
        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>
              {ELoading[language]}...
            </div>
          }
        >
          <Footer language={language} styleMenu={styleMenu} />
        </Suspense>
        <Suspense
          fallback={
            <div className='flex center margin0auto textcenter'>
              {ELoading[language]}...
            </div>
          }
        >
          <ScrollToTop language={language} styleMenu={styleMenu} />
        </Suspense>
        <Modal language={language} />
        <Notification language={language} />
      </UIProvider>
    </BlobProvider>
  )
}

export default App
