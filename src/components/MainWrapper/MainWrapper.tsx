import { Routes, Route, Location as RouterLocation, useLocation } from 'react-router-dom'
import { options } from '../../utils'
import { Suspense, lazy, useContext, useEffect, useState } from 'react'
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
import { ELanguages } from '../../types'
import { useHeroProps } from '../../hooks/useHeroProps'
import { useDocumentTitleAndLanguage } from '../../hooks/useDocumentTitleAndLanguage'
import Hero from '../Hero/Hero'
import useCart from '../../hooks/useCart'
import { LanguageContext } from '../../contexts/LanguageContext'

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

  const { t } = useContext(LanguageContext)!

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
              heading={t('EWelcome')}
              text={t('EToTheReactSiteOfJenniinaFi')}
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
              heading={t('EAbout')}
              text={t('EThisSite')}
              type='page'
            />
          }
        />

        <Route
          path='/edit'
          element={
            <UserEditPage
              heading={t('EUserEdit')}
              text={t('EEditUserSettings')}
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
                  {t('ELoading')}...
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
                heading={t('EPortfolio')}
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
                text={t('EGraphQLSite')}
                type='page subpage'
              />
            }
          />
          <Route
            path='/portfolio/blob'
            element={
              <BlobPage
                language={language}
                heading={t('EBlobs')}
                text={t('EBlobAppSlogan')}
                type='page subpage'
              />
            }
          />
          <Route
            path='/portfolio/draganddrop'
            element={
              <DragAndDropPage
                language={language}
                heading={t('EDragAndDrop')}
                text=''
                type='page subpage'
              />
            }
          />
          <Route
            path='/portfolio/todo'
            element={
              <TodoPage
                heading={t('ETodoApp')}
                text={t('EGetOrganizedOneTaskAtATime')}
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
                heading={t('ECustomSelect')}
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
                heading={t('EMultistepForm')}
                text=''
                type='page subpage'
              />
            }
          />
          <Route
            path='/portfolio/jokes/*'
            element={
              <JokesPage
                heading={t('ETheComediansCompanion')}
                text={t('EAJokeGeneratorForTheComicallyInclined')}
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
                      {t('ELoading')}...
                    </div>
                  }
                >
                  <QuizStart
                    heading={t('EQuizApp')}
                    text={t('ETestYourKnowledge')}
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
                      {t('ELoading')}...
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
                      {t('ELoading')}...
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
                heading={t('EHairSalonWebsite')}
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
                heading={t('EComposerOlliSanta')}
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
                heading={t('EColorAccessibility')}
                text={t('ETestColorCombinations')}
                type='page subpage'
              />
            }
          />
          <Route
            path='/portfolio/memory'
            element={
              <MemoryPage
                language={language}
                heading={t('EMemoryGame')}
                text={t('EMemoryGameIntro')}
                type='page subpage'
              />
            }
          />
          <Route
            path='/portfolio/media'
            element={
              <ImagesPage
                heading={t('EMedia')}
                text={t('EMediaWithQuotesOrPoems')}
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
              heading={t('EContact')}
              text={t('ELetsCollaborate')}
              type='page'
            />
          }
        />
        <Route
          path='/cart'
          element={
            <CartPage
              language={language}
              heading={t('EShoppingCart')}
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
              heading={t('EStore')}
              text={t('EWebpagesAndGraphicDesign')}
              type='page'
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path='/orders'
          element={
            <OrderPage language={language} heading={t('EOrders')} text='' type='page' />
          }
        />
        <Route
          path='/disclaimer'
          element={
            <Disclaimer
              language={language}
              heading={t('EPrivacyAndSecurityDisclaimer')}
              text={`${t('ELastUpdated')}: 2024/10/20`}
              type='page'
            />
          }
        />
        <Route
          path='/terms'
          element={
            <TermsOfService
              language={language}
              heading={t('ETermsOfService')}
              text={`${t('ELastUpdated')}: 2024/10/20`}
              type='page'
            />
          }
        />
      </Routes>
    </main>
  )
}

export default MainWrapper
