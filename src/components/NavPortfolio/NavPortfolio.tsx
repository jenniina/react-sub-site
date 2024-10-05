import { useEffect, useRef, useState } from 'react'
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

interface NavItem {
  url: string
  name: string
  special?: 'first' | 'last'
}

function NavPortfolio({ language }: { language: ELanguages }) {
  const { windowWidth } = useWindowSize()

  const location = useLocation()

  const firstportfolioitem = useRef() as RefObject<HTMLLIElement>
  const lastportfolioitem = useRef() as RefObject<HTMLLIElement>
  const placeholderRef = useRef() as RefObject<HTMLLIElement>

  const [firstVisibleRef, setFirstVisibleRef] = useState(firstportfolioitem)

  const firstVisible = useIsOnScreen(firstVisibleRef, '-20px', 1)
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

  const navItems: NavItem[] = [
    { url: '/portfolio', name: `« ${EPortfolio[language]}`, special: 'first' },
    { url: '/portfolio/blob', name: EBlob[language] },
    { url: '/portfolio/jokes', name: EJokes[language] },
    { url: '/portfolio/quiz', name: EQuiz[language] },
    { url: '/portfolio/select', name: ECustomSelect[language] },
    { url: '/portfolio/graphql', name: 'GraphQL' },
    { url: '/portfolio/salon', name: EHairSalon[language] },
    { url: '/portfolio/draganddrop', name: EDragAndDrop[language] },
    { url: '/portfolio/form', name: EMultistepForm[language] },
    { url: '/portfolio/todo', name: EToDo[language], special: 'last' },
  ]

  const itemRefs = navItems.map(() => useRef<HTMLLIElement>(null))

  useEffect(() => {
    if (location.pathname === '/portfolio/' || location.pathname === '/portfolio') {
      setFirstVisibleRef(itemRefs[1])
    } else {
      const firstVisibleIndex = navItems.findIndex(
        (item) => location.pathname === item.url
      )
      setFirstVisibleRef(itemRefs[firstVisibleIndex] || firstportfolioitem)
    }
  }, [location.pathname, itemRefs, navItems])

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item, index) => {
      const isFirst = item.special === 'first'
      const isLast = item.special === 'last'
      const isCurrentPath = location.pathname === item.url

      return (
        <li
          key={index}
          ref={itemRefs[index]}
          id={
            isFirst
              ? isCurrentPath
                ? `portfolio-${index}`
                : 'firstportfolioitem'
              : isLast
              ? 'lastportfolioitem'
              : `portfolio-${index}`
          }
          className={isFirst && isCurrentPath ? 'hide' : isFirst ? 'return' : ''}
        >
          <NavLink to={item.url}>{item.name}</NavLink>
        </li>
      )
    })
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

        <ul ref={scrollHorizontal}>{renderNavItems(navItems)}</ul>

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
