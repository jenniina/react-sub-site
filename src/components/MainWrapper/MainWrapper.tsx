import { Routes, Route, Location as RouterLocation, useLocation } from 'react-router-dom'
import { options } from '../../utils'
import { Suspense, lazy, useEffect, useState } from 'react'
import Portfolio from '../../pages/Portfolio'
import About from '../../pages/About'
import CartPage from '../../pages/CartPage'
import Contact from '../../pages/Contact'
import Disclaimer from '../../pages/Disclaimer'
import OrderPage from '../../pages/OrderPage'
import BlobPage from '../../pages/pages-portfolio/BlobPage'
import ColorsPage from '../../pages/pages-portfolio/ColorsPage'
import ComposerPage from '../../pages/pages-portfolio/ComposerPage'
import CustomSelectPage from '../../pages/pages-portfolio/CustomSelectPage'
import DragAndDropPage from '../../pages/pages-portfolio/DragAndDropPage'
import FormPage from '../../pages/pages-portfolio/FormPage'
import GraphQLPage from '../../pages/pages-portfolio/GraphQLPage'
import HairSalonPage from '../../pages/pages-portfolio/HairSalonPage'
import ImagesPage from '../../pages/pages-portfolio/ImagesPage'
import JokesPage from '../../pages/pages-portfolio/JokesPage'
import MemoryPage from '../../pages/pages-portfolio/MemoryPage'
import QuizPage from '../../pages/pages-portfolio/QuizPage'
import TodoPage from '../../pages/pages-portfolio/TodoPage'
import StorePage from '../../pages/StorePage'
import TermsOfService from '../../pages/TermsOfService'
import UserEditPage from '../../pages/UserEditPage'
import Welcome from '../../pages/Welcome'
import {
  EWelcome,
  EToTheReactSiteOfJenniinaFi,
  EAbout,
  EThisSite,
  EUserEdit,
  ELoading,
  EPortfolio,
  EGraphQLSite,
  EBlobs,
  EBlobAppSlogan,
  EDragAndDrop,
  ECustomSelect,
  EMultistepForm,
  EQuizApp,
  ETestYourKnowledge,
  EHairSalonWebsite,
  EContact,
  ELetsCollaborate,
  EStore,
  EWebpagesAndGraphicDesign,
  EPrivacyAndSecurityDisclaimer,
  ELastUpdated,
  ETermsOfService,
  ELanguages,
} from '../../types'
import { EColorAccessibility, ETestColorCombinations } from '../../types/colors'
import { EComposerOlliSanta } from '../../types/composer'
import { EMedia, EMediaWithQuotesOrPoems } from '../../types/images'
import { EMemoryGame, EMemoryGameIntro } from '../../types/memory'
import { EShoppingCart, EOrders } from '../../types/store'
import {
  ETheComediansCompanion,
  EAJokeGeneratorForTheComicallyInclined,
} from '../Jokes/types'
import { ETodoApp, EGetOrganizedOneTaskAtATime } from '../Todo/types'
import { EEditUserSettings } from '../UserEdit/types'
import { useHeroProps } from '../../hooks/useHeroProps'
import { useDocumentTitleAndLanguage } from '../../hooks/useDocumentTitleAndLanguage'
import Hero from '../Hero/Hero'
import useCart from '../../hooks/useCart'

const QuizStart = lazy(() => import('../Quiz/QuizStart'))
const QuizQuestion = lazy(() => import('../Quiz/QuizQuestion'))
const QuizFinished = lazy(() => import('../Quiz/QuizFinished'))
const NavPortfolio = lazy(() => import('../NavPortfolio/NavPortfolio'))

interface Props {
  language: ELanguages
  setLanguage: (lang: ELanguages) => void
}

const MainWrapper = ({ language, setLanguage }: Props) => {
  const { cart, addToCart, removeFromCart, editDetails, clearCart } = useCart()

  const location = useLocation()

  const [displayLocation, setDisplayLocation] = useState<RouterLocation>(location)

  const heroProps = useHeroProps(location.pathname, displayLocation.pathname, language)

  const [transitionPage, setTransitionPage] = useState('fadeIn')

  // Update document language and title
  useDocumentTitleAndLanguage({ language })

  // Change language with ?lang=fi etc:
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get('lang')
    if (langParam && Object.values(ELanguages).includes(langParam as any)) {
      setLanguage(langParam as ELanguages)
    }
  }, [setLanguage])

  useEffect(() => {
    const hash = location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (location.pathname !== displayLocation.pathname) {
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

  return (
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
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              removeCart={clearCart}
              editDetails={editDetails}
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
              setCart={clearCart}
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
  )
}

export default MainWrapper
