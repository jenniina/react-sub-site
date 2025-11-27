import {
  useMemo,
  useCallback,
  useState,
  useRef,
  useEffect,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from 'react'
import { useLocation } from 'react-router-dom'
import styles from './hero.module.css'
import useWindowSize from '../../hooks/useWindowSize'
import { getRandomMinMax } from '../../utils'
import * as Draggable from '../../hooks/useDraggable'
import { useTheme } from '../../hooks/useTheme'
import useEnterDirection from '../../hooks/useEnterDirection'
import { RefObject } from '../../types'
import useSessionStorage from '../../hooks/useStorage'
import useLocalStorage from '../../hooks/useStorage'
import { useLanguageContext } from '../../contexts/LanguageContext'
import { useIsClient, useWindow } from '../../hooks/useSSR'
import ItemComponent from './components/ItemComponent'

export interface itemProps {
  i: number
  e: number
  size: number
  color: string
  rotation?: number
}

export default function Hero({
  heading,
  address,
  text,
  reset,
  instructions,
}: {
  heading: string
  address: string
  text: string
  reset?: string
  instructions?: string
}) {
  const { calculateDirection } = useEnterDirection()
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t } = useLanguageContext()

  const location = useLocation()

  const [values, setValues] = useSessionStorage<itemProps[]>('Hero', [])
  const [itemsVisible, setItemsVisible] = useState(true)
  const [currentPage, setCurrentPage] = useState('')
  const isAnimatingRef = useRef(false)
  const itemsVisibleRef = useRef(itemsVisible)
  const [theHeading, setTheHeading] = useState(heading)
  const [theText, setTheText] = useState(text)

  // remove the last trailing / then get the last part of the pathname:
  const page = useMemo(() => {
    return location.pathname?.replace(/\/$/, '').split('/').pop() ?? ''
  }, [location])

  // Handle page transition for hero items
  useEffect(() => {
    if (page !== currentPage && currentPage !== '') {
      // Fade out items when page changes
      setItemsVisible(false)

      // Wait for fade out to complete, then update page and fade in
      const timer = setTimeout(() => {
        setCurrentPage(page)
        setItemsVisible(true)
      }, 500)

      const timer2 = setTimeout(() => {
        setTheHeading(heading)
        setTheText(text)
      }, 800)

      return () => {
        clearTimeout(timer)
        clearTimeout(timer2)
      }
    } else if (currentPage === '') {
      // Initial load
      setCurrentPage(page)
      setItemsVisible(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, currentPage])

  // Clear eye transforms when navigating away from contact/form pages
  useEffect(() => {
    if (isClient && page !== 'contact' && page !== 'form') {
      const eyes = document.querySelectorAll<HTMLSpanElement>('.eye .inner')
      eyes.forEach(eye => {
        eye.style.transform = ''
      })
    }
  }, [page, isClient])

  const resetButton = useRef() as RefObject<HTMLButtonElement>
  const ulRef = useRef<HTMLUListElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useLocalStorage<boolean>('prefersReducedMotion-Hero', false)
  const isMovingRef = useRef(false)
  const movementTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const movementCycleStartedRef = useRef(false)

  const escapeFunction = () => {
    if (resetButton.current) resetButton.current.focus()
  }

  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setReinitialize(!reinitialize)
  }

  useEffect(() => {
    itemsVisibleRef.current = itemsVisible
  }, [itemsVisible])

  useEffect(() => {
    if (!isClient || !windowObj) return
    const mediaQuery = windowObj.matchMedia('(prefers-reduced-motion: reduce)')

    // Only set the state from the media query if there is no value in localStorage
    if (localStorage.getItem('prefersReducedMotion-Hero') === null) {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [isClient, setPrefersReducedMotion, windowObj])

  //Move items up, down, left or left, depending on the direction they're approached from:
  const movingItem = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!isClient || !windowObj) return

      const target = e.target as HTMLElement
      const targetLeft = windowObj
        .getComputedStyle(target)
        .getPropertyValue('left')
      const targetTop = windowObj
        .getComputedStyle(target)
        .getPropertyValue('top')
      const from = calculateDirection(e)
      switch (from) {
        case 'top':
          target.style.top = `${parseFloat(targetTop) + 10}px`
          break
        case 'right':
          target.style.left = `${parseFloat(targetLeft) - 10}px`
          break
        case 'bottom':
          target.style.top = `${parseFloat(targetTop) - 10}px`
          break
        case 'left':
          target.style.left = `${parseFloat(targetLeft) + 10}px`
          break
        default:
          break
      }
    },
    [isClient, calculateDirection, windowObj]
  )

  function radianToAngle(cx: number, cy: number, ex: number, ey: number) {
    const dy = ey - cy,
      dx = ex - cx,
      rad = Math.atan2(dy, dx),
      deg = (rad * 180) / Math.PI
    return deg
  }

  //Make eyes follow the mouse:
  const follow = useCallback(
    (e: Event) => {
      const eyes = [
        ...document?.querySelectorAll<HTMLSpanElement>('.eye .inner'),
      ]
      if (eyes.length > 0) {
        eyes.forEach(eye => {
          if (page === 'contact' || page === 'form') {
            const rect = eye.getBoundingClientRect()
            const x = rect.left + rect.width / 2
            const y = rect.top + rect.height / 2
            const rotation = radianToAngle(
              (e as PointerEvent).clientX,
              (e as PointerEvent).clientY,
              x,
              y
            )
            eye.style.transform = `rotate(${rotation}deg)`
          } else {
            eye.style.transform = ''
          }
        })
      }
    },
    [page]
  )

  useEffect(() => {
    if (isClient) {
      window?.addEventListener('mousemove', follow)
    }
    return () => {
      if (isClient) {
        window?.removeEventListener('mousemove', follow)
      }
    }
  }, [isClient, follow])

  const lightTheme = useTheme()

  Draggable.isTouchDevice()

  const touchDevice = Draggable.isTouchDevice()

  const { windowHeight, windowWidth } = useWindowSize()

  const removeItem = (
    e:
      | ReactPointerEvent<HTMLElement>
      | ReactKeyboardEvent<HTMLElement>
      | ReactMouseEvent<HTMLLIElement, MouseEvent>
      | ReactTouchEvent<HTMLLIElement>
  ) => {
    const element = (e.target as HTMLElement).closest('li')
    if (!element) return
    //get element id
    const id = element.id

    if (!touchDevice) {
      // if not a touch device, add exit animation then remove from state
      element.classList.add(styles.exitItem)
      setTimeout(() => {
        setValues(prevValues =>
          prevValues.filter(item => `shape${item.i}` !== id)
        )
      }, 400)
    } else {
      // if a touch device, activate animation on tap; then on second tap remove
      element.classList.add(styles.active)
      const handleBlur = () => {
        element.classList.remove(styles.active)
        element.removeEventListener('blur', handleBlur)
      }
      element.addEventListener('blur', handleBlur)
      setTimeout(() => {
        element.addEventListener('touchend', removeWithTouch)
      }, 100)
    }
  }

  const removeWithTouch = (e: TouchEvent) => {
    e.preventDefault()
    const el = (e.target as HTMLElement).closest('li')
    if (!el) return
    const id = el.id
    el.classList.add(styles.exitItem)

    setTimeout(() => {
      setValues(prevValues =>
        prevValues.filter(item => `shape${item.i}` !== id)
      )
    }, 400)
  }

  const spanArray: itemProps[] = useMemo(() => {
    const array: itemProps[] = []
    for (let i = 1; i <= 4; i++) {
      const span: itemProps = {
        i: i + 1,
        e: Math.round(getRandomMinMax(5, 9)),
        size: i,
        color: 'hsla(0, 0%, 100%, 0.7)',
      }
      array.push(span)
    }
    return array
  }, [values]) // eslint-disable-line react-hooks/exhaustive-deps

  const divArrayJewel1: itemProps[] = useMemo(() => {
    const array: itemProps[] = []
    for (let i = 1; i <= 11; i++) {
      const div: itemProps = {
        i: i + 1,
        e: Math.round(getRandomMinMax(5, 9)),
        size: i >= 9 ? 82 : 100,
        color: 'white',
      }
      array.push(div)
    }
    return array
  }, [values]) // eslint-disable-line react-hooks/exhaustive-deps

  const divArrayJewel2: itemProps[] = useMemo(() => {
    const array: itemProps[] = []
    for (let i = 1; i <= 11; i++) {
      const div: itemProps = {
        i: i + 1,
        e: Math.round(getRandomMinMax(5, 9)),
        size: i >= 9 ? 77 : 100,
        color: 'white',
      }
      array.push(div)
    }
    return array
  }, [values]) // eslint-disable-line react-hooks/exhaustive-deps

  const [reinitialize, setReinitialize] = useState<boolean>(false)

  const thresholdCrossed = useMemo(() => windowWidth < 400, [windowWidth])

  const amount = useMemo(() => {
    if (windowWidth < 400) return 6
    else return 9
  }, [windowWidth])

  useEffect(() => {
    const items: itemProps[] = []
    const specialSizesCount = Math.ceil(getRandomMinMax(1.1, 3))
    const specialIndices = new Set<number>()

    // Generate unique random indices for special sizes
    while (specialIndices.size < specialSizesCount) {
      specialIndices.add(Math.floor(getRandomMinMax(0, amount)))
    }

    for (let i = 0; i <= amount; i++) {
      const number = Math.ceil(getRandomMinMax(0.3, 2))
      let colorSwitch: string
      switch (number) {
        case 1:
          colorSwitch = `var(--color-secondary-${Math.round(
            getRandomMinMax(10, 13)
          )})`
          break
        case 2:
          colorSwitch = `var(--color-primary-${Math.round(
            getRandomMinMax(9, 12)
          )})`
          break
        default:
          colorSwitch = `var(--color-primary-${Math.round(
            getRandomMinMax(9, 12)
          )})`
      }

      const size = specialIndices.has(i)
        ? Math.round(getRandomMinMax(12, 15))
        : Math.round(getRandomMinMax(8, 15))

      const e = specialIndices.has(i)
        ? Math.round(getRandomMinMax(7, 9))
        : Math.round(getRandomMinMax(4, 9))

      const item: itemProps = {
        i: i + 1,
        e: e,
        size: size,
        rotation: Math.round(getRandomMinMax(165, 195)),
        color: colorSwitch,
      }
      items.push(item)
    }
    setValues(items)
  }, [amount, reinitialize, thresholdCrossed]) // eslint-disable-line react-hooks/exhaustive-deps

  // Move an item randomly
  useEffect(() => {
    if (!isClient || !windowObj) return

    if (prefersReducedMotion) return // Don't move items if user prefers reduced motion

    const MOVE_TRANSITION_MS = 900 // allow CSS transition to finish (approx 800ms), buffer a bit

    const moveItem = () => {
      // Clear the timeout ref since we're executing now
      movementTimeoutRef.current = null

      // don't move items if they are hidden or already animating
      if (!itemsVisibleRef.current) {
        movementTimeoutRef.current ??= setTimeout(
          moveItem,
          Math.round(getRandomMinMax(1000, 2000))
        )
        return
      }

      if (isAnimatingRef.current) {
        movementTimeoutRef.current ??= setTimeout(
          moveItem,
          Math.round(getRandomMinMax(1000, 2000))
        )
        return
      }
      // Get current items from DOM instead of relying on state
      const items = document?.querySelectorAll<HTMLElement>('[id^="shape"]')
      if (!items || items.length === 0) {
        isMovingRef.current = false
        return
      }

      const randomIndex = Math.floor(Math.random() * items.length)
      const item = items[randomIndex]

      if (item) {
        // mark as animating so no other move happens until transition ends
        isAnimatingRef.current = true
        const currentTop = parseFloat(
          windowObj.getComputedStyle(item).getPropertyValue('top')
        )
        const currentLeft = parseFloat(
          windowObj.getComputedStyle(item).getPropertyValue('left')
        )
        const itemWidth = item.offsetWidth
        const itemHeight = item.offsetHeight
        const windowWidth = windowObj.innerWidth
        const windowHeight = windowObj.innerHeight

        // Choose a random direction
        const direction = Math.floor(Math.random() * 8)
        const change = 10
        const changeBigger = 16

        let newTop = currentTop
        let newLeft = currentLeft

        switch (direction) {
          case 0: // up
            newTop = currentTop + changeBigger
            break
          case 1: // down
            newTop = currentTop - changeBigger
            break
          case 2: // left
            newLeft = currentLeft + changeBigger
            break
          case 3: // right
            newLeft = currentLeft - changeBigger
            break
          case 4: // top-left
            newTop = currentTop + change
            newLeft = currentLeft + change
            break
          case 5: // top-right
            newTop = currentTop + change
            newLeft = currentLeft - change
            break
          case 6: // bottom-left
            newTop = currentTop - change
            newLeft = currentLeft + change
            break
          case 7: // bottom-right
            newTop = currentTop - change
            newLeft = currentLeft - change
            break
        }

        // Check if the new position is within the allowed boundaries
        if (
          newTop >= 100 &&
          newTop + itemHeight <= windowHeight * 0.6 &&
          newLeft >= 0 &&
          newLeft + itemWidth <= windowWidth
        ) {
          item.style.top = `${newTop}px`
          item.style.left = `${newLeft}px`
          // Clear animating flag roughly when CSS transition completes
          setTimeout(() => {
            isAnimatingRef.current = false
          }, MOVE_TRANSITION_MS)
        }
      }

      // Schedule next movement with random delay, but only if no timeout is already scheduled
      // schedule next move after transition + random delay
      movementTimeoutRef.current ??= setTimeout(
        moveItem,
        Math.round(getRandomMinMax(3000, 6000)) + MOVE_TRANSITION_MS
      )
    }

    // Only start the movement cycle if it's not already running
    if (
      !movementCycleStartedRef.current &&
      !isMovingRef.current &&
      !movementTimeoutRef.current
    ) {
      movementCycleStartedRef.current = true
      isMovingRef.current = true
      movementTimeoutRef.current = setTimeout(
        moveItem,
        Math.round(getRandomMinMax(3000, 6000))
      )
    }

    return () => {
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current)
        movementTimeoutRef.current = null
      }
      isMovingRef.current = false
      movementCycleStartedRef.current = false
    }
  }, [prefersReducedMotion, isClient, windowObj])

  return (
    <div
      className={`
        ${lightTheme ? styles.light : ''} 
        ${touchDevice ? styles.touch : ''} 
        hero fullwidth ${styles.hero} ${styles[address]} ${itemsVisible ? styles['header-visible'] : styles['header-hidden']}`}
    >
      {/* Always render during SSR, conditionally render on client */}
      {isClient && (
        <h1>
          <span data-text={theHeading}>{theHeading}</span>
        </h1>
      )}
      {isClient && <p>{theText}</p>}
      <span id="description" className="scr">
        {t('HeroSection')}: {t('InteractiveElements')}
      </span>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <clipPath
            id="clipHole1"
            clipPathUnits="objectBoundingBox"
            clipRule="evenodd"
          >
            {/* Outer polygon: your original polygon */}
            <polygon points="0.85,1 1,0.85 1,0.15 0.85,0 0.15,0 0,0.15 0,0.85 0.15,1" />
            {/* Inner polygon: 10% smaller */}
            <polygon points="0.765,0.9 0.9,0.765 0.9,0.135 0.765,0 0.135,0 0,0.135 0,0.765 0.135,0.9" />
          </clipPath>
          <clipPath
            id="clipHole2"
            clipPathUnits="objectBoundingBox"
            clipRule="evenodd"
          >
            {/* Outer polygon for second shape */}
            <polygon points="0.7071,1 1,0.7071 1,0.2929 0.7071,0 0.2929,0 0,0.2929 0,0.7071 0.2929,1" />
            {/* Inner polygon: 10% smaller */}
            <polygon points="0.6364,0.9 0.9,0.6364 0.9,0.2616 0.6364,0 0.2616,0 0,0.2616 0,0.6364 0.2616,0.9" />
          </clipPath>
        </defs>
      </svg>

      {isClient && (
        <ItemComponent
          ref={ulRef}
          array={values}
          location={currentPage}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          spanArray={spanArray}
          divArrayJewel1={divArrayJewel1}
          divArrayJewel2={divArrayJewel2}
          movingItem={movingItem}
          removeItem={removeItem}
          escapeFunction={escapeFunction}
          windowObj={windowObj}
          itemsVisible={itemsVisible}
        />
      )}

      <div className={styles.bottom}>
        <button
          ref={resetButton}
          className={`${styles.resetText}`}
          type="button"
          onClick={handleReset}
        >
          <span data-instructions={instructions ?? t('TryTappingTheShapes')}>
            {reset ?? t('Reset')}
          </span>
          <span> </span>
        </button>
        <button
          onClick={() => {
            setPrefersReducedMotion(!prefersReducedMotion)
          }}
          type="button"
          className={`${styles.rand}`}
        >
          <span
            data-instructions={
              prefersReducedMotion
                ? t('TurnRandomMovementOn')
                : t('TurnRandomMovementOff')
            }
          >
            {prefersReducedMotion ? t('Off') : t('On')}
          </span>
          <span> </span>
        </button>
      </div>
    </div>
  )
}
