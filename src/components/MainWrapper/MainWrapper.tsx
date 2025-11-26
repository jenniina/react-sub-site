import {
  Routes,
  Route,
  Location as RouterLocation,
  useLocation,
} from 'react-router-dom'
import { options } from '../../utils'
import { useEffect, useState } from 'react'
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
import { useIsClient, useWindow } from '../../hooks/useSSR'
import QuizStart from '../Quiz/QuizStart'
import QuizQuestion from '../Quiz/QuizQuestion'
import QuizFinished from '../Quiz/QuizFinished'
import NavPortfolio from '../NavPortfolio/NavPortfolio'
import { useLanguageContext } from '../../contexts/LanguageContext'

const MainWrapper = () => {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { language, setLanguage } = useLanguageContext()

  const { cart, addToCart, removeFromCart, editDetails, clearCart } = useCart()

  const location = useLocation()

  const [displayLocation, setDisplayLocation] =
    useState<RouterLocation>(location)

  const heroFromHook = useHeroProps(
    location.pathname ?? '/',
    location.pathname ?? '/',
    language ?? ELanguages.en
  )

  const heroProps = heroFromHook

  const [transitionPage, setTransitionPage] = useState('fadeIn')

  // Update document language and title
  useDocumentTitleAndLanguage({ appName: 'React JS by Jenniina' })

  // Change language with ?lang=fi etc:
  useEffect(() => {
    if (!isClient || !windowObj) return
    const urlParams = new URLSearchParams(windowObj.location.search)
    const langParam = urlParams.get('lang')
    if (
      langParam &&
      Object.values(ELanguages).includes(langParam as ELanguages)
    ) {
      setLanguage(langParam as ELanguages)
    }
  }, [isClient, windowObj, setLanguage])

  useEffect(() => {
    if (!isClient || !windowObj) return

    const hash = location.hash
    if (hash) {
      const element = document?.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (location.pathname !== displayLocation.pathname) {
      if (!isClient || !windowObj) return
      windowObj.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }, [
    location.pathname,
    location.hash,
    displayLocation.pathname,
    isClient,
    windowObj,
  ])

  // Trigger fade transition when location changes
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // Start fade out; defer to next frame to avoid synchronous state update inside effect
      requestAnimationFrame(() => setTransitionPage('fadeOut'))

      // Always update after a timeout, regardless of animation
      const timer = setTimeout(() => {
        setDisplayLocation(location)
        setTransitionPage('fadeIn')
      }, 350) // Slightly longer than CSS animation to let it complete

      return () => clearTimeout(timer)
    }
  }, [location.pathname, displayLocation.pathname, location])

  return (
    <main id={`main-content`} className={`${transitionPage} main-content z`}>
      <Hero
        address={heroProps.address ?? ''}
        heading={heroProps.heading ?? ''}
        text={heroProps.text ?? ''}
      />

      <Routes location={displayLocation}>
        <Route path="*" element={<Welcome type="page" options={options} />} />
        <Route path="/about" element={<About type="page" />} />

        <Route
          path="/edit"
          element={<UserEditPage type="page" options={options} />}
        />

        <Route path="/portfolio" element={<NavPortfolio />}>
          <Route index element={<Portfolio type="page" />} />
          <Route
            path="/portfolio/graphql"
            element={<GraphQLPage type="page subpage" />}
          />
          <Route
            path="/portfolio/blob"
            element={<BlobPage type="page subpage" />}
          />
          <Route
            path="/portfolio/draganddrop"
            element={<DragAndDropPage type="page subpage" />}
          />
          <Route
            path="/portfolio/todo"
            element={<TodoPage type="page subpage" />}
          />
          <Route
            path="/portfolio/select"
            element={<CustomSelectPage type="page subpage" />}
          />
          <Route
            path="/portfolio/form"
            element={<FormPage type="page subpage" />}
          />
          <Route
            path="/portfolio/jokes/*"
            element={<JokesPage type="page subpage" />}
          />
          <Route path="/portfolio/quiz/" element={<QuizPage />}>
            <Route index element={<QuizStart />} />
            <Route
              path="/portfolio/quiz/difficulty/:difficulty"
              element={<QuizQuestion />}
            />
            <Route path="/portfolio/quiz/results" element={<QuizFinished />} />
          </Route>
          <Route
            path="/portfolio/salon"
            element={<HairSalonPage type="page subpage" />}
          />
          <Route
            path="/portfolio/composer"
            element={<ComposerPage type="page subpage" />}
          />
          <Route
            path="/portfolio/colors"
            element={<ColorsPage type="page subpage" />}
          />
          <Route
            path="/portfolio/memory"
            element={<MemoryPage type="page subpage" />}
          />
          <Route
            path="/portfolio/media"
            element={<ImagesPage type="page subpage" />}
          />
        </Route>

        <Route path="/contact" element={<Contact type="page" />} />
        <Route
          path="/cart"
          element={
            <CartPage
              type="page"
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              removeCart={clearCart}
              editDetails={editDetails}
            />
          }
        />
        <Route
          path="/store"
          element={
            <StorePage
              type="page"
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route path="/orders" element={<OrderPage type="page" />} />
        <Route path="/disclaimer" element={<Disclaimer type="page" />} />
        <Route path="/terms" element={<TermsOfService type="page" />} />
      </Routes>
    </main>
  )
}

export default MainWrapper
