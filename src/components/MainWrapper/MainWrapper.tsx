import {
  Routes,
  Route,
  Location as RouterLocation,
  useLocation,
} from 'react-router-dom'
import { options } from '../../utils'
import { useEffect, useState } from 'react'
import About from '../../pages/About'
import Contact from '../../pages/Contact'
import Disclaimer from '../../pages/Disclaimer'
import OrderPage from '../../pages/OrderPage'
import TermsOfService from '../../pages/TermsOfService'
import UserEditPage from '../../pages/UserEditPage'
import Welcome from '../../pages/Welcome'
import Portfolio from '../../pages/Portfolio'

// Import all components synchronously for better AI readability
import GraphQLPageSync from '../../pages/pages-portfolio/GraphQLPage'
import BlobPageSync from '../../pages/pages-portfolio/BlobPage'
import JokesPageSync from '../../pages/pages-portfolio/JokesPage'
import MemoryPageSync from '../../pages/pages-portfolio/MemoryPage'
import ImagesPageSync from '../../pages/pages-portfolio/ImagesPage'
import QuizPageSync from '../../pages/pages-portfolio/QuizPage'
import ColorsPageSync from '../../pages/pages-portfolio/ColorsPage'
import ComposerPageSync from '../../pages/pages-portfolio/ComposerPage'
import CustomSelectPageSync from '../../pages/pages-portfolio/CustomSelectPage'
import DragAndDropPageSync from '../../pages/pages-portfolio/DragAndDropPage'
import FormPageSync from '../../pages/pages-portfolio/FormPage'
import HairSalonPageSync from '../../pages/pages-portfolio/HairSalonPage'
import TodoPageSync from '../../pages/pages-portfolio/TodoPage'
import StorePageSync from '../../pages/StorePage'
import CartPageSync from '../../pages/CartPage'

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
        address={heroProps.address}
        heading={heroProps.heading}
        text={heroProps.text}
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
            element={<GraphQLPageSync type="page subpage" />}
          />
          <Route
            path="/portfolio/blob"
            element={<BlobPageSync type="page subpage" />}
          />
          <Route
            path="/portfolio/draganddrop"
            element={<DragAndDropPageSync type="page subpage" />}
          />
          <Route
            path="/portfolio/todo"
            element={<TodoPageSync type="page subpage" />}
          />
          <Route
            path="/portfolio/select"
            element={<CustomSelectPageSync type="page subpage" />}
          />
          <Route
            path="/portfolio/form"
            element={<FormPageSync type="page subpage" />}
          />
          <Route
            path="/portfolio/jokes/*"
            element={<JokesPageSync type="page subpage" />}
          />
          <Route path="/portfolio/quiz/" element={<QuizPageSync />}>
            <Route index element={<QuizStart />} />
            <Route
              path="/portfolio/quiz/difficulty/:difficulty"
              element={<QuizQuestion />}
            />
            <Route path="/portfolio/quiz/results" element={<QuizFinished />} />
          </Route>
          <Route
            path="/portfolio/salon"
            element={<HairSalonPageSync type="page subpage" />}
          />
          <Route
            path="/portfolio/composer"
            element={<ComposerPageSync type="page subpage" />}
          />
          <Route
            path="/portfolio/colors"
            element={<ColorsPageSync type="page subpage" />}
          />
          <Route
            path="/portfolio/memory"
            element={<MemoryPageSync type="page subpage" />}
          />
          <Route
            path="/portfolio/media"
            element={<ImagesPageSync type="page subpage" />}
          />
        </Route>

        <Route path="/contact" element={<Contact type="page" />} />
        <Route
          path="/cart"
          element={
            <CartPageSync
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
            <StorePageSync
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
