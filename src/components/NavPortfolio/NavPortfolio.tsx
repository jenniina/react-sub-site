import { useEffect, useRef, useCallback, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import Icon from '../Icon/Icon'
import ButtonUnavailableAction from '../ButtonUnavailableAction/ButtonUnavailableAction'
import useIsOnScreen from '../../hooks/useIsOnScreen'
import useWindowSize from '../../hooks/useWindowSize'
import { breakpointSmall } from '../../types'
import useSideScroll from '../../hooks/useSideScroll'
import { useLanguageContext } from '../../contexts/LanguageContext'
import { getPortfolioNavLabel, portfolioItems } from '../../data/portfolioItems'

interface NavItem {
  url: string
  name: string
  special?: 'first' | 'last'
}

function NavPortfolio() {
  const { t } = useLanguageContext()

  const { windowWidth } = useWindowSize()

  const location = useLocation()

  const {
    ref: scrollHorizontal,
    scrollLeft,
    scrollRight,
    setScrollLeft,
    setRef,
  } = useSideScroll('portfolio-nav-scroll')

  const scrollAmount = 60

  function leftScroll() {
    if (windowWidth > breakpointSmall) {
      scrollLeft(200)
    } else {
      scrollLeft(scrollAmount)
    }
  }
  function rightScroll() {
    if (windowWidth > breakpointSmall) {
      scrollRight(200)
    } else {
      scrollRight(scrollAmount)
    }
  }

  const navItems: NavItem[] = [
    { url: '/portfolio', name: `${t('Portfolio')}`, special: 'first' },
    ...portfolioItems.map(
      (item, index): NavItem => ({
        url: item.url,
        name: getPortfolioNavLabel(item, t),
        special: index === portfolioItems.length - 1 ? 'last' : undefined,
      })
    ),
  ]

  const firstVisibleUrl =
    location.pathname === '/portfolio'
      ? (portfolioItems[0]?.url ?? '/portfolio')
      : '/portfolio'

  const firstRef = useRef<HTMLLIElement | null>(null)
  const lastRef = useRef<HTMLLIElement | null>(null)
  const [firstElement, setFirstElement] = useState<HTMLLIElement | null>(null)
  const [lastElement, setLastElement] = useState<HTMLLIElement | null>(null)

  const firstVisible = useIsOnScreen(firstElement, '-20px', 1)
  const lastVisible = useIsOnScreen(lastElement, '-40px', 1)

  const setFirstItemRef = useCallback((node: HTMLLIElement | null) => {
    firstRef.current = node
    setFirstElement(node)
  }, [])

  const setLastItemRef = useCallback((node: HTMLLIElement | null) => {
    lastRef.current = node
    setLastElement(node)
  }, [])

  const setScrollerRef = useCallback(
    (node: HTMLUListElement | null) => {
      setRef(node)
    },
    [setRef]
  )

  const suppressFocusScroll = useRef(false)

  const rememberScroll = () => {
    // Scroll position is now automatically saved by useSideScroll hook

    // prevent focus-triggered auto scroll on the next page
    const active = document?.activeElement as HTMLElement | null
    if (active?.blur) active.blur()

    // also suppress our own onFocus handler briefly
    suppressFocusScroll.current = true
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        suppressFocusScroll.current = false
      })
    })
  }

  const slug = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  useEffect(() => {
    const scroller = scrollHorizontal.current
    if (!scroller) return

    // Check if we have a meaningful saved scroll position
    const savedScroll = localStorage.getItem('portfolio-nav-scroll')
    const hasSavedScroll = savedScroll && parseInt(savedScroll, 10) > 10 // Only consider saved if > 10px

    // If we have a saved scroll position, don't nudge - respect user's scroll position
    if (hasSavedScroll) return

    // Ensure active item is visible after new route renders
    const nudge = () => {
      const activeLi = scroller
        .querySelector('a.active')
        ?.closest('li') as HTMLElement | null
      if (!activeLi) return

      const margin = 100
      const left = activeLi.offsetLeft
      const right = left + activeLi.offsetWidth
      const viewLeft = scroller.scrollLeft + margin
      const viewRight = scroller.scrollLeft + scroller.clientWidth - margin

      // Only scroll if the active item is not already visible
      if (left < viewLeft || right > viewRight) {
        if (left < viewLeft) scroller.scrollLeft = left - margin
        else if (right > viewRight)
          scroller.scrollLeft = right - scroller.clientWidth + margin
      }
    }

    // run after styles & sizes are applied
    requestAnimationFrame(() => {
      requestAnimationFrame(nudge)
    })
  }, [location.pathname, scrollHorizontal])

  const renderNavItems = (items: NavItem[]) => {
    return items.map((item) => {
      const isFirst = item.special === 'first'
      const isLast = item.special === 'last'
      const isCurrentPath = location.pathname === item.url
      const isTrackedFirst = item.url === firstVisibleUrl

      const key = slug(item.url)

      const id = isTrackedFirst
        ? 'firstportfolioitem'
        : isLast
          ? 'lastportfolioitem'
          : `portfolio-${key}`

      const ref = isTrackedFirst
        ? setFirstItemRef
        : isLast
          ? setLastItemRef
          : undefined

      return (
        <li
          key={key}
          ref={ref}
          id={id}
          className={
            isFirst && isCurrentPath ? 'hide' : isFirst ? 'return' : ''
          }
          onFocus={(e) => {
            if (suppressFocusScroll.current) return
            const li = e.currentTarget
            const scroller = scrollHorizontal.current
            if (!li || !scroller) return

            // Ensure the focused item is inside the viewport with a margin
            const margin = 100
            const itemLeft = li.offsetLeft
            const itemRight = itemLeft + li.offsetWidth

            const viewLeft = scroller.scrollLeft + margin
            const viewRight =
              scroller.scrollLeft + scroller.clientWidth - margin

            if (itemLeft < viewLeft) {
              setScrollLeft(itemLeft - margin)
            } else if (itemRight > viewRight) {
              setScrollLeft(itemRight - scroller.clientWidth + margin)
            }
          }}
        >
          <NavLink to={item.url} onClick={rememberScroll}>
            {isFirst ? <span aria-hidden="true">&laquo;&nbsp;</span> : ''}
            {item.name}
          </NavLink>
        </li>
      )
    })
  }

  return (
    <>
      <nav className={`nav-sub`}>
        <ButtonUnavailableAction
          type="button"
          className={`horizontal-scroll goleft ${firstVisible ? 'disabled' : ''}`}
          aria-label={t('ScrollToTheLeft')}
          title={t('ScrollToTheLeft')}
          onClick={leftScroll}
          unavailable={firstVisible}
          unavailableReason={firstVisible ? t('AlreadyOnFirstPage') : ''}
          tooltipClassName="tooltip right middle narrow2"
        >
          {' '}
          <Icon lib="bi" name="BiChevronsUp" />
          <span className="scr">{t('ScrollToTheLeft')}</span>
        </ButtonUnavailableAction>

        <ul ref={setScrollerRef}>{renderNavItems(navItems)}</ul>

        <ButtonUnavailableAction
          type="button"
          onClick={rightScroll}
          className={`horizontal-scroll goright ${lastVisible ? 'disabled' : ''}`}
          aria-label={t('ScrollToTheRight')}
          title={t('ScrollToTheRight')}
          unavailable={lastVisible}
          unavailableReason={lastVisible ? t('AlreadyOnLastPage') : ''}
          tooltipClassName="tooltip left middle narrow2"
        >
          {' '}
          <Icon lib="bi" name="BiChevronsUp" />
          <span className="scr">{t('ScrollToTheRight')}</span>
        </ButtonUnavailableAction>
      </nav>
      <Outlet />
    </>
  )
}

export default NavPortfolio
