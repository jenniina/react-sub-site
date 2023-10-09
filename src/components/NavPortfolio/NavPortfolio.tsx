import { useRef } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { BiChevronsUp } from 'react-icons/bi'
import { RefObject } from '../../interfaces'
import useIsOnScreen from '../../hooks/useIsOnScreen'
import useWindowSize from '../../hooks/useWindowSize'
import { breakpointSmall } from '../../interfaces'
import useSideScroll from '../../hooks/useSideScroll'

function NavPortfolio() {
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
    else if (scrollHorizontal.current) scrollHorizontal.current.scrollLeft -= 30
  }
  function rightScroll() {
    if (scrollHorizontal.current && windowWidth > breakpointSmall)
      scrollHorizontal.current.scrollLeft += 100
    else if (scrollHorizontal.current) scrollHorizontal.current.scrollLeft += 30
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
          <span className='scr'>scroll left</span>
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
            <NavLink to='/portfolio/'>« Portfolio</NavLink>
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
            <NavLink to='/portfolio/blob'>Blob</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/draganddrop'>Drag and Drop</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/todo'>Todo</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/select'>Custom Select</NavLink>
          </li>
          <li>
            <NavLink to='/portfolio/form'>Multistep Form</NavLink>
          </li>
          <li ref={lastportfolioitem} id='lastportfolioitem'>
            <NavLink to='/portfolio/jokes'>Jokes App</NavLink>
          </li>
        </ul>

        <button
          onClick={rightScroll}
          className={`horizonal-scroll goright 
                ${lastVisible ? 'disable' : ''}`}
        >
          {' '}
          <BiChevronsUp />
          <span className='scr'>scroll right</span>
        </button>
      </nav>
      <Outlet />
    </>
  )
}

export default NavPortfolio
