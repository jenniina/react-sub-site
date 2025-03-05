import { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { BiChevronsUp } from 'react-icons/bi'
import { ELanguages, RefObject } from '../../types'
import useIsOnScreen from '../../hooks/useIsOnScreen'
import useWindowSize from '../../hooks/useWindowSize'
import { breakpointSmall } from '../../types'
import useSideScroll from '../../hooks/useSideScroll'
import { LanguageContext } from '../../contexts/LanguageContext'

interface NavItem {
  url: string
  name: string
  special?: 'first' | 'last'
}

function NavPortfolio({ language }: { language: ELanguages }) {
  const { t } = useContext(LanguageContext)!

  const { windowWidth } = useWindowSize()

  const location = useLocation()

  const scrollHorizontal = useSideScroll() as RefObject<HTMLUListElement>

  const scrollAmount = 60

  function leftScroll() {
    if (scrollHorizontal.current && windowWidth > breakpointSmall)
      scrollHorizontal.current.scrollLeft -= 200
    else if (scrollHorizontal.current) scrollHorizontal.current.scrollLeft -= scrollAmount
  }
  function rightScroll() {
    if (scrollHorizontal.current && windowWidth > breakpointSmall)
      scrollHorizontal.current.scrollLeft += 200
    else if (scrollHorizontal.current) scrollHorizontal.current.scrollLeft += scrollAmount
  }

  const navItems: NavItem[] = [
    { url: '/portfolio', name: `${t('EPortfolio')}`, special: 'first' },
    { url: '/portfolio/media', name: t('EMedia') },
    { url: '/portfolio/memory', name: t('EMemoryGame') },
    { url: '/portfolio/colors', name: t('EColorAccessibility') },
    { url: '/portfolio/composer', name: t('EComposerOlliSanta') },
    { url: '/portfolio/blob', name: t('EBlob') },
    { url: '/portfolio/jokes', name: t('EJokes') },
    { url: '/portfolio/quiz', name: t('EQuiz') },
    { url: '/portfolio/select', name: t('ECustomSelect') },
    { url: '/portfolio/salon', name: t('EHairSalon') },
    { url: '/portfolio/draganddrop', name: t('EDragAndDrop') },
    { url: '/portfolio/graphql', name: 'GraphQL' },
    { url: '/portfolio/form', name: t('EMultistepForm') },
    { url: '/portfolio/todo', name: t('EToDo'), special: 'last' },
  ]

  const itemRefs = navItems.map(() => useRef<HTMLLIElement>(null))

  const [firstVisibleRef, setFirstVisibleRef] = useState(itemRefs[0])

  const firstVisible = useIsOnScreen(firstVisibleRef, '-20px', 1)
  const lastVisible = useIsOnScreen(itemRefs[itemRefs.length - 1], '-40px', 1)

  useEffect(() => {
    if (firstVisible && scrollHorizontal.current) scrollHorizontal.current.scrollLeft = 0
  }, [firstVisible, scrollHorizontal])

  useEffect(() => {
    if (location.pathname === '/portfolio') {
      setFirstVisibleRef(itemRefs[1])
    } else {
      setFirstVisibleRef(itemRefs[0])
    }
  }, [location.pathname, itemRefs, navItems])

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.url === location.pathname)
    if (activeIndex !== -1 && itemRefs[activeIndex].current) {
      itemRefs?.[activeIndex]?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [location.pathname])

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
          onFocus={() => {
            if (itemRefs[index] && itemRefs[index].current && scrollHorizontal.current) {
              const itemLeft = itemRefs[index].current?.offsetLeft ?? 0
              const itemRight = itemLeft + (itemRefs[index].current?.offsetWidth ?? 0)
              const scrollLeft = scrollHorizontal.current.scrollLeft
              const scrollRight = scrollLeft + scrollHorizontal.current.clientWidth
              const amount = 100

              // Scroll into view with an additional offset of 40px
              if (itemLeft < scrollLeft + amount) {
                scrollHorizontal.current.scrollLeft = itemLeft - amount
              } else if (itemRight > scrollRight - amount) {
                scrollHorizontal.current.scrollLeft =
                  itemRight - scrollHorizontal.current.clientWidth + amount
              }
            }
          }}
        >
          <NavLink to={item.url}>
            {isFirst ? <span aria-hidden='true'>&laquo;&nbsp;</span> : ''}
            {item.name}
          </NavLink>
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
          <span className='scr'>{t('EScrollToTheLeft')}</span>
        </button>

        <ul ref={scrollHorizontal}>{renderNavItems(navItems)}</ul>

        <button
          onClick={rightScroll}
          className={`horizonal-scroll goright 
                ${lastVisible ? 'disable' : ''}`}
        >
          {' '}
          <BiChevronsUp />
          <span className='scr'>{t('EScrollToTheRight')}</span>
        </button>
      </nav>
      <Outlet />
    </>
  )
}

export default NavPortfolio
