import { useRef } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { BiChevronsUp } from 'react-icons/bi'
import {
  EBlob,
  ECustomSelect,
  EDragAndDrop,
  EGraphQLSite,
  EHairSalon,
  EJokes,
  ELanguages,
  EMultistepForm,
  EPortfolio,
  EQuiz,
  EScrollToTheLeft,
  EScrollToTheRight,
  EToDo,
  RefObject,
} from '../../interfaces'
import useIsOnScreen from '../../hooks/useIsOnScreen'
import useWindowSize from '../../hooks/useWindowSize'
import { breakpointSmall } from '../../interfaces'
import useSideScroll from '../../hooks/useSideScroll'

function NavPortfolio({ language }: { language: ELanguages }) {
  const { windowHeight, windowWidth } = useWindowSize()

  const location = useLocation()

  const firstportfolioitem = useRef() as RefObject<HTMLLIElement>
  const lastportfolioitem = useRef() as RefObject<HTMLLIElement>
  const placeholderRef = useRef() as RefObject<HTMLLIElement>

  const firstVisible = useIsOnScreen(firstportfolioitem, '-20px', 1)
  const lastVisible = useIsOnScreen(lastportfolioitem, '-20px', 1)

  const scrollHorizontal = useSideScroll() as RefObject<HTMLUListElement>

  function leftScroll() {
    if (scrollHorizontal.current && windowWidth > breakpointSmall)
      scrollHorizontal.current.scrollLeft -= 100
    else if (scrollHorizontal.current) scrollHorizontal.current.scrollLeft -= 40
  }
  function rightScroll() {
    if (scrollHorizontal.current && windowWidth > breakpointSmall)
      scrollHorizontal.current.scrollLeft += 100
    else if (scrollHorizontal.current) scrollHorizontal.current.scrollLeft += 40
  }

  return (
    <>
      <nav className={`nav-sub`}>
        <button
          className={`horizonal-scroll goleft 
                ${firstVisible ? 'disable' : ''}`}
          onClick={leftScroll}
        >
          {' '}
          <BiChevronsUp />
          <span className='scr'>{EScrollToTheLeft[language]}</span>
        </button>

        <ul ref={scrollHorizontal}>
          <li
            ref={
              location.pathname == '/portfolio/' || location.pathname == '/portfolio'
                ? placeholderRef
                : firstportfolioitem
            }
            id={
              location.pathname == '/portfolio/' || location.pathname == '/portfolio'
                ? ''
                : 'firstportfolioitem'
            }
            className={
              location.pathname == '/portfolio/' || location.pathname == '/portfolio'
                ? 'hide'
                : 'return'
            }
          >
            <NavLink to='/portfolio/'>« {EPortfolio[language]}</NavLink>
          </li>
          <li
            ref={
              location.pathname == '/portfolio/' || location.pathname == '/portfolio'
                ? firstportfolioitem
                : placeholderRef
            }
            id={
              location.pathname == '/portfolio/' || location.pathname == '/portfolio'
                ? 'firstportfolioitem'
                : ''
            }
          >
            <NavLink to='/portfolio/blob'>{EBlob[language]}</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/jokes'>{EJokes[language]}</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/quiz'>{EQuiz[language]}</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/select'>{ECustomSelect[language]}</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/graphql'>GraphQL</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/salon'>{EHairSalon[language]}</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/form'>{EMultistepForm[language]}</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/draganddrop'>{EDragAndDrop[language]}</NavLink>
          </li>
          <li ref={lastportfolioitem} id='lastportfolioitem'>
            <NavLink to='/portfolio/todo'>{EToDo[language]}</NavLink>
          </li>
        </ul>

        <button
          onClick={rightScroll}
          className={`horizonal-scroll goright 
                ${lastVisible ? 'disable' : ''}`}
        >
          {' '}
          <BiChevronsUp />
          <span className='scr'>{EScrollToTheRight[language]}</span>
        </button>
      </nav>
      <Outlet />
    </>
  )
}

export default NavPortfolio
