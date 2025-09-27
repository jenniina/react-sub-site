import {
  useMemo,
  useCallback,
  FC,
  useState,
  useRef,
  useEffect,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useContext,
} from 'react'
import { useLocation } from 'react-router-dom'
import styles from './hero.module.css'
import useWindowSize from '../../hooks/useWindowSize'
import { getRandomMinMax } from '../../utils'
import * as Draggable from '../../hooks/useDraggable'
import { useTheme } from '../../hooks/useTheme'
import useEnterDirection from '../../hooks/useEnterDirection'
import { ELanguages, RefObject } from '../../types'
import useEventListener from '../../hooks/useEventListener'
import useSessionStorage from '../../hooks/useStorage'
import useLocalStorage from '../../hooks/useStorage'
import { Location as RouterLocation } from 'react-router-dom'
import { LanguageContext } from '../../contexts/LanguageContext'

type itemProps = {
  i: number
  e: number
  size: number
  color: string
  rotation?: number
}

//Change these, if the addresses change, or add more as needed:
const LOCATION = {
  HOME: '',
  ABOUT: 'about',
  PORTFOLIO: 'portfolio',
  CONTACT: 'contact',
  FORM: 'form',
  BLOBAPP: 'blob',
  DND: 'draganddrop',
  JOKES: 'jokes',
  SELECT: 'select',
  SALON: 'salon',
  COMPOSER: 'composer',
  TODO: 'todo',
  GRAPHQL: 'graphql',
  STORE: 'store',
  CART: 'cart',
  MEMORY: 'memory',
}

export default function Hero({
  heading,
  address,
  text,
  reset,
  instructions,
  language,
  displayLocation,
}: {
  heading: string
  address: string
  text: string
  reset?: string
  instructions?: string
  language: ELanguages
  displayLocation: RouterLocation
}) {
  const { t } = useContext(LanguageContext)!

  const location = useLocation()

  // remove the last trailing / then get the last part of the pathname:
  const page = useMemo(() => {
    return displayLocation.pathname?.replace(/\/$/, '').split('/').pop() ?? ''
  }, [displayLocation])

  const resetButton = useRef() as RefObject<HTMLButtonElement>
  const ulRef = useRef() as RefObject<HTMLUListElement>
  const [prefersReducedMotion, setPrefersReducedMotion] = useLocalStorage<boolean>(
    'prefersReducedMotion-Hero',
    false
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Only set the state from the media query if there is no value in localStorage
    if (localStorage.getItem('prefersReducedMotion-Hero') === null) {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  //Move items up, down, left or left, depending on the direction they're approached from:
  const movingItem = (e: ReactPointerEvent<HTMLElement>) => {
    const target = e.target as HTMLElement
    const targetLeft = window.getComputedStyle(target).getPropertyValue('left')
    const targetTop = window.getComputedStyle(target).getPropertyValue('top')
    const from = useEnterDirection(e)
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
      default:
    }
  }

  //Make eyes follow the mouse:
  const follow = (e: Event) => {
    const eyes = [...document.querySelectorAll<HTMLSpanElement>('.eye .inner')]
    if (eyes.length > 0) {
      eyes.forEach((eye) => {
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
      })
    }
  }
  function radianToAngle(cx: number, cy: number, ex: number, ey: number) {
    const dy = ey - cy,
      dx = ex - cx,
      rad = Math.atan2(dy, dx),
      deg = (rad * 180) / Math.PI
    return deg
  }

  useEventListener('mousemove', (e: Event) => {
    follow(e)
  })

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
    const element = e.target as HTMLElement
    if (!touchDevice) {
      //if not a touch device, remove item
      element.classList.add(styles.exitItem)
      setTimeout(() => {
        element.remove()
      }, 1000)
    } else {
      //if a touch device, activate animation on tap
      element.classList.add(styles.active)
      element.addEventListener('blur', () => {
        element.classList.remove(styles.active)
        element.removeEventListener('touchend', removeWithTouch)
      })
      setTimeout(() => {
        element.addEventListener('touchend', removeWithTouch) //remove item on second tap
      }, 100)
    }
  }

  const removeWithTouch = (e: TouchEvent) => {
    e.preventDefault()
    ;(e.target as HTMLElement).classList.add(styles.exitItem)
    setTimeout(() => {
      ;(e.target as HTMLElement).remove()
    }, 1000)
  }

  const [values, setValues] = useSessionStorage<itemProps[]>('HeroArray', [])

  const spanArray: itemProps[] = useMemo(() => {
    let array: itemProps[] = []
    for (let i: number = 1; i <= 4; i++) {
      const span: itemProps = {
        i: i,
        e: Math.round(getRandomMinMax(5, 9)),
        size: i,
        color: 'hsla(0, 0%, 100%, 0.7)',
      }
      array.push(span)
    }
    return array
  }, [values])

  const divArrayJewel1: itemProps[] = useMemo(() => {
    let array: itemProps[] = []
    for (let i: number = 1; i <= 11; i++) {
      const div: itemProps = {
        i: i,
        e: Math.round(getRandomMinMax(5, 9)),
        size: i >= 9 ? 82 : 100,
        color: 'white',
      }
      array.push(div)
    }
    return array
  }, [values])

  const divArrayJewel2: itemProps[] = useMemo(() => {
    let array: itemProps[] = []
    for (let i: number = 1; i <= 11; i++) {
      const div: itemProps = {
        i: i,
        e: Math.round(getRandomMinMax(5, 9)),
        size: i >= 9 ? 77 : 100,
        color: 'white',
      }
      array.push(div)
    }
    return array
  }, [values])

  const [reinitialize, setReinitialize] = useState<boolean>(false)

  const [thresholdCrossed, setThresholdCrossed] = useState(false)

  const amount = useMemo(() => {
    if (windowWidth < 400) return 6
    else return 9
  }, [windowWidth])

  useEffect(() => {
    if (windowWidth < 400 && !thresholdCrossed) {
      setReinitialize(!reinitialize)
      setThresholdCrossed(true)
    } else if (windowWidth >= 400 && thresholdCrossed) {
      setReinitialize(!reinitialize)
      setThresholdCrossed(false)
    }
  }, [windowWidth, amount])

  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setReinitialize(!reinitialize)
  }

  const escapeFunction = () => {
    if (resetButton.current) resetButton.current.focus()
  }

  const setupItems: itemProps[] = useMemo(() => {
    const items: itemProps[] = []
    const specialSizesCount = Math.ceil(getRandomMinMax(1.1, 3))
    const specialIndices = new Set<number>()

    // Generate unique random indices for special sizes
    while (specialIndices.size < specialSizesCount) {
      specialIndices.add(Math.floor(getRandomMinMax(0, amount)))
    }

    for (let i: number = 0; i <= amount; i++) {
      const number = Math.ceil(getRandomMinMax(0.3, 2))
      let colorSwitch: string
      switch (number) {
        case 1:
          colorSwitch = `var(--color-secondary-${Math.round(getRandomMinMax(10, 13))})`
          break
        case 2:
          colorSwitch = `var(--color-primary-${Math.round(getRandomMinMax(9, 12))})`
          break
        default:
          colorSwitch = `var(--color-primary-${Math.round(getRandomMinMax(9, 12))})`
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
    return items
  }, [amount, reinitialize])

  // Move an item randomly
  useEffect(() => {
    if (prefersReducedMotion) return // Don't move items if user prefers reduced motion
    const interval = setInterval(() => {
      const newValues = [...values]
      const randomIndex = Math.floor(Math.random() * newValues.length)
      const itemI = newValues[randomIndex].i
      const item = document.getElementById(`shape${itemI}`)

      if (item) {
        const currentTop = parseFloat(
          window.getComputedStyle(item).getPropertyValue('top')
        )
        const currentLeft = parseFloat(
          window.getComputedStyle(item).getPropertyValue('left')
        )
        const itemWidth = item.offsetWidth
        const itemHeight = item.offsetHeight
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

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
        }
      }
    }, Math.round(getRandomMinMax(2000, 4000)))

    return () => clearInterval(interval)
  }, [values, prefersReducedMotion])

  const [shouldRender, setShouldRender] = useState<boolean>(true)
  const [fadeIn, setFadeIn] = useState<boolean>(false)

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) {
      setShouldRender(true)
      setFadeIn(true)
    } else {
      setFadeIn(false)
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [location.pathname, displayLocation.pathname])

  useEffect(() => {
    if (shouldRender) {
      const timer = setTimeout(() => {
        setFadeIn(true)
      }, 10) // 10ms delay to ensure the class is applied after mounting
      return () => clearTimeout(timer)
    }
  }, [shouldRender])

  const ItemComponent: FC<{ array: itemProps[]; location: string; fadeIn?: boolean }> =
    useCallback(
      ({ array, location, fadeIn }) => {
        {
          return (
            <ul
              ref={ulRef}
              id={`listbox-hero-${location.toLowerCase()}`}
              role={`listbox`}
              aria-labelledby={`description`}
              className={`${styles.herocontent} ${
                fadeIn ? styles.fadeIn : styles.fadeOut
              } ${styles[location] ?? ''} ${
                //In the case of using the blob feature for a page, add it here:
                location === LOCATION.PORTFOLIO ||
                location === LOCATION.BLOBAPP ||
                location === LOCATION.DND
                  ? styles.blob
                  : ''
              }`}
              style={
                //In the case of using the blob feature for a page, add it here:
                location === LOCATION.PORTFOLIO ||
                location === LOCATION.BLOBAPP ||
                location === LOCATION.DND
                  ? {
                      WebkitFilter: 'url(#svgfilterHero)',
                      filter: 'url(#svgfilterHero)',
                      opacity: 0.8,
                    }
                  : { WebkitFilter: 'none', filter: 'none' }
              }
            >
              {array.map((item, index: number) => {
                if (
                  location == LOCATION.SELECT ||
                  location == LOCATION.TODO ||
                  location == LOCATION.GRAPHQL ||
                  location == LOCATION.MEMORY
                ) {
                  const dividedBy = 2.5

                  const style: CSSProperties = {
                    position: 'absolute',
                    top: `clamp(60px, calc(-5vh + calc(1.3vh * ${item.e} * ${
                      item.e / 1.5
                    })), calc(80vh - 50px - ${item.size / dividedBy}vh))`,
                    left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})), 95vw - ${item.size}vw)`,
                    width:
                      windowWidth < windowHeight
                        ? `${item.size / dividedBy}vh`
                        : `${item.size / dividedBy}vw`,
                    height:
                      windowWidth < windowHeight
                        ? `${item.size / dividedBy}vh`
                        : `${item.size / dividedBy}vw`,
                    transitionDuration: '600ms',
                  }
                  const inner: CSSProperties = {
                    color: `${item.color}`,
                    ['--i' as string]: `${item.i}`,
                    ['--e' as string]: `${item.e}`,
                    ['--s' as string]:
                      windowWidth < windowHeight ? `${item.size}vh` : `${item.size}vw`,
                    width: '100%',
                    height: '100%',
                    minWidth: `44px`,
                    minHeight: `44px`,
                    maxWidth: `150px`,
                    maxHeight: `150px`,
                    borderRadius: '3px',
                    opacity: `${item.size > 6 ? `0.9` : `0.${Math.ceil(item.size + 3)}`}`,
                  }

                  return (
                    // SELECT // TODO // GRAPHQL

                    <li
                      key={`${item.color}${index}`}
                      id={`shape${index + 1}`}
                      className={`${styles.item} ${styles[location]} ${styles.geometric} 
                                ${
                                  windowHeight < windowWidth ? styles.wide : styles.tall
                                }`}
                      style={style}
                      role={'option'}
                      tabIndex={0}
                      onFocus={(e) => {
                        ulRef.current?.setAttribute(
                          'aria-activedescendant',
                          `${e.target.id}`
                        )
                      }}
                      onBlurCapture={(e) => {
                        ulRef.current?.removeAttribute('aria-activedescendant')
                      }}
                      onPointerEnter={(e) => {
                        movingItem(e)
                      }}
                      onMouseDown={(e) => {
                        removeItem(e)
                      }}
                      onTouchStart={(e) => {
                        removeItem(e)
                      }}
                      onPointerDown={(e) => {
                        removeItem(e)
                      }}
                      onKeyDown={(e) => {
                        Draggable.keyDown(
                          e,
                          e.target as HTMLElement,
                          () => escapeFunction(),
                          () => removeItem(e),
                          () => removeItem(e),
                          null
                        )
                      }}
                    >
                      <div style={inner}>
                        {spanArray.map((span, index) => {
                          const style: CSSProperties = {
                            position: 'absolute',
                            borderRadius: '3px',
                            color: `${item.color}`,
                            ['--color' as string]: `${span.color}`,
                            ['--number' as string]: `${index}`,
                          }
                          return (
                            <span key={`${item.i}-${index}`} style={style}>
                              <span className='scr'>
                                {t('Shape')} {index + 1}
                              </span>
                            </span>
                          )
                        })}
                      </div>
                    </li>
                  )
                } else if (location == LOCATION.COMPOSER) {
                  const itemSize = 3.4

                  const style: CSSProperties = {
                    position: 'absolute',
                    top: `clamp(200px, calc(-1vh + calc(1.1vh * ${item.e} * ${
                      item.e / 1.5
                    })), calc(80vh - ${itemSize}vh))`,
                    left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})), 95vw - ${item.size}vw)`,
                    width: `${itemSize}vw`,
                    height: `${itemSize}vw`,
                    transitionDuration: '600ms',
                    opacity: `0.7`,
                  }
                  const inner: CSSProperties = {
                    color: `${item.color}`,
                    width: '100%',
                    height: '100%',
                    minWidth: `44px`,
                    minHeight: `44px`,
                    maxWidth: `150px`,
                    maxHeight: `150px`,
                    borderRadius: '80% 50% 80% 50%',
                  }

                  return (
                    // COMPOSER

                    <li
                      key={`${item.color}${index}`}
                      id={`shape${index + 1}`}
                      className={`${styles.item} ${styles[location]} ${styles.note} ${
                        item.e > 7 ? styles.above : styles.below
                      } ${item.e} 
                                ${
                                  windowHeight < windowWidth ? styles.wide : styles.tall
                                }`}
                      style={style}
                      role={'option'}
                      tabIndex={0}
                      onFocus={(e) => {
                        ulRef.current?.setAttribute(
                          'aria-activedescendant',
                          `${e.target.id}`
                        )
                      }}
                      onBlurCapture={(e) => {
                        ulRef.current?.removeAttribute('aria-activedescendant')
                      }}
                      onPointerEnter={(e) => {
                        movingItem(e)
                      }}
                      onMouseDown={(e) => {
                        removeItem(e)
                      }}
                      onTouchStart={(e) => {
                        removeItem(e)
                      }}
                      onPointerDown={(e) => {
                        removeItem(e)
                      }}
                      onKeyDown={(e) => {
                        Draggable.keyDown(
                          e,
                          e.target as HTMLElement,
                          () => escapeFunction(),
                          () => removeItem(e),
                          () => removeItem(e),
                          null
                        )
                      }}
                    >
                      <div style={inner}>
                        {spanArray.map((span, index) => {
                          const style: CSSProperties = {
                            position: 'absolute',
                            borderRadius: '80% 50% 80% 50%',
                            color: `${item.color}`,
                            ['--color' as string]: `${span.color}`,
                            ['--number' as string]: `${index}`,
                          }
                          return (
                            <span key={`${item.i}-${index}`} style={style}>
                              <span className='scr'>
                                {t('Shape')} {index + 1}
                              </span>
                            </span>
                          )
                        })}
                      </div>
                    </li>
                  )
                } else if (location == LOCATION.STORE) {
                  const dividedBy = 2.2

                  const colorJewel = [
                    'var(--color-primary-9)',
                    'var(--color-primary-10)',
                    'var(--color-primary-12)',
                  ]
                  const colorJewel2 = [
                    'var(--color-secondary-8)',
                    'var(--color-secondary-10)',
                    'var(--color-secondary-11)',
                  ]
                  const hueArray = [214, 39]
                  const randomOfThree = Math.round(getRandomMinMax(0, 2))
                  const colors = [colorJewel[randomOfThree], colorJewel2[randomOfThree]]
                  const randomOfTwo = Math.round(getRandomMinMax(0, 1))
                  const randomBG = colors[randomOfTwo]
                  const hue = hueArray[randomOfTwo]

                  const style: CSSProperties = {
                    position: 'absolute',
                    top: `clamp(60px, calc(-5vh + calc(1.3vh * ${item.e} * ${
                      item.e / 1.5
                    })), calc(80vh - 50px - ${item.size / dividedBy}vh))`,
                    left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})), 95vw - ${item.size}vw)`,
                    width:
                      windowWidth < windowHeight
                        ? `${item.size / dividedBy}vh`
                        : `${item.size / dividedBy}vw`,
                    height:
                      windowWidth < windowHeight
                        ? `${item.size / dividedBy}vh`
                        : `${item.size / dividedBy}vw`,
                    ['--rotate' as string]: `-45deg`,
                    ['--rotate-inner' as string]: `-90deg`, //`${Math.round(getRandomMinMax(0, 359))}deg`,
                    ['--color' as string]: `${randomBG}`,
                    ['--hue' as string]: `${hue}`,
                  }

                  const clipArrayJewel = [
                    'polygon(15% 0%, 50% 50%, 85% 0%)',
                    'polygon(85% 0%, 50% 50%, 100% 15%)',
                    'polygon(100% 15%, 50% 50%, 100% 85%)',
                    'polygon(100% 85%, 50% 50%, 85% 100%)',
                    'polygon(85% 100%, 50% 50%, 15% 100%)',
                    'polygon(15% 100%, 50% 50%, 0% 85%)',
                    'polygon(0% 85%, 50% 50%, 0% 15%)',
                    'polygon(0% 15%, 50% 50%, 15% 0%)',
                    'polygon(85% 100%, 100% 85%, 100% 15%, 85% 0%, 15% 0%, 0% 15%, 0% 85%, 15% 100%)',
                    'polygon(85% 100%, 100% 85%, 100% 15%, 85% 0%, 15% 0%, 0% 15%, 0% 85%, 15% 100%)',
                    'polygon(85% 100%, 100% 85%, 100% 15%, 85% 0%, 15% 0%, 0% 15%, 0% 85%, 15% 100%, 17% 96%, 4% 83%, 4% 17%, 17% 4%, 83% 4%, 96% 17%, 96% 83%, 83% 96%, 18% 96%, 16% 100%)',
                  ]

                  return (
                    // STORE

                    <li
                      key={`${item.color}${index}`}
                      id={`shape${index + 1}`}
                      className={`${styles.item} ${styles[location]} ${styles.jewel} ${
                        styles.jewel1
                      } ${randomOfTwo === 0 ? styles.blue : styles.orange} ${
                        windowHeight < windowWidth ? styles.wide : styles.tall
                      }`}
                      style={style}
                      role={'option'}
                      tabIndex={0}
                      onFocus={(e) => {
                        ulRef.current?.setAttribute(
                          'aria-activedescendant',
                          `${e.target.id}`
                        )
                      }}
                      onBlurCapture={(e) => {
                        ulRef.current?.removeAttribute('aria-activedescendant')
                      }}
                      onPointerEnter={(e) => {
                        movingItem(e)
                      }}
                      onMouseDown={(e) => {
                        removeItem(e)
                      }}
                      onTouchStart={(e) => {
                        removeItem(e)
                      }}
                      onPointerDown={(e) => {
                        removeItem(e)
                      }}
                      onKeyDown={(e) => {
                        Draggable.keyDown(
                          e,
                          e.target as HTMLElement,
                          () => escapeFunction(),
                          () => removeItem(e),
                          () => removeItem(e),
                          null
                        )
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          clipPath:
                            'polygon(85% 100%, 100% 85%, 100% 15%, 85% 0%, 15% 0%, 0% 15%, 0% 85%, 15% 100%)',
                        }}
                      >
                        {divArrayJewel1.map((span, index) => {
                          const style: CSSProperties = {
                            position: 'absolute',
                            left: `calc(50% - ${span.size / 2}%)`,
                            top: `calc(50% - ${span.size / 2}%)`,
                            borderRadius: '0',
                            ['--number' as string]: `${index + 1}`,
                            ['--i' as string]: `${item.i}`,
                            width: `${span.size}%`,
                            height: `${span.size}%`,
                            minWidth: `${span.size}%`,
                            minHeight: `${span.size}%`,
                            maxWidth: `${span.size}%`,
                            maxHeight: `${span.size}%`,
                            opacity: `${
                              index === 8 && randomOfTwo === 0
                                ? '0.6'
                                : index === 8
                                ? '0.7'
                                : index === 9 && randomOfTwo === 0
                                ? '0.4'
                                : index === 9
                                ? '0.3'
                                : index === 10 && randomOfTwo === 0
                                ? '0.4'
                                : index === 10
                                ? '0.5'
                                : '1'
                            }`,
                            clipPath: `${clipArrayJewel[index]}`,
                          }
                          return (
                            <div
                              className={
                                index === 8
                                  ? styles.none
                                  : index === 9
                                  ? styles.cover
                                  : index === 10
                                  ? styles.frame
                                  : ''
                              }
                              key={`${item.i}-${index}`}
                              style={style}
                            ></div>
                          )
                        })}{' '}
                      </div>
                      <span style={style}>
                        <span className='scr'>
                          {t('Shape')} {index + 1}
                        </span>
                      </span>
                    </li>
                  )
                } else if (location == LOCATION.CART) {
                  const dividedBy = 1.8
                  const times = 1.08

                  const colorJewel = [
                    'var(--color-primary-6)',
                    'var(--color-primary-9)',
                    'var(--color-primary-12)',
                  ]
                  const colorJewel2 = [
                    'var(--color-secondary-9)',
                    'var(--color-secondary-11)',
                    'var(--color-secondary-14)',
                  ]

                  const randomOfThree = Math.round(getRandomMinMax(0, 2))
                  const colors = [colorJewel[randomOfThree], colorJewel2[randomOfThree]]
                  const randomOfTwo = Math.round(getRandomMinMax(0, 1))
                  const randomBG = colors[randomOfTwo]
                  const hues = [214, 39]
                  const hue = hues[randomOfTwo]

                  const style: CSSProperties = {
                    position: 'absolute',
                    top: `clamp(60px, calc(-5vh + calc(1.1vh * ${item.e} * ${
                      item.e / 1.5
                    })), calc(80vh - 50px - ${item.size / dividedBy}vh))`,
                    left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})), 95vw - ${item.size}vw)`,
                    width:
                      windowWidth < windowHeight
                        ? `${item.size / dividedBy}vh`
                        : `${item.size / dividedBy}vw`,
                    height:
                      windowWidth < windowHeight
                        ? `${item.size / dividedBy}vh`
                        : `${item.size / dividedBy}vw`,
                    ['--rotate' as string]: `-23deg`,
                    ['--rotate-inner' as string]: `-135deg`, //`${Math.round(getRandomMinMax(0, 359))}deg`,
                    ['--color' as string]: `${randomBG}`,
                    ['--hue' as string]: `${hue}`,
                  }

                  const clipArrayJewel2 = [
                    'polygon(50% 50%, 70.71% 0%, 29.29% 0%',
                    'polygon(100% 29.29%, 50% 50%, 70.71% 0%',
                    'polygon(50% 50%, 100% 70.71%, 100% 29.29%',
                    'polygon(70.71% 100%, 50% 50%, 100% 70.71%',
                    'polygon(70.71% 100%, 50% 50%, 29.29% 100%)',
                    'polygon(0% 70.71%, 50% 50%, 29.29% 100%)',
                    'polygon(0% 29.29%, 0% 70.71%, 50% 50%)',
                    'polygon(29.29% 0%, 50% 50%, 0% 29.29%)',
                    'polygon(70.71% 100%, 100% 70.71%, 100% 29.29%, 70.71% 0%, 29.29% 0%, 0% 29.29%, 0% 70.71%, 29.29% 100%)',
                    'polygon(70.71% 100%, 100% 70.71%, 100% 29.29%, 70.71% 0%, 29.29% 0%, 0% 29.29%, 0% 70.71%, 29.29% 100%)',
                    'polygon(70.71% 100%, 100% 70.71%, 100% 29.29%, 70.71% 0%, 29.29% 0%, 0% 29.29%, 0% 70.71%, 29.29% 100%, 32% 96%, 5% 69%, 5% 31%, 32% 5%, 68% 5%, 95% 31%, 95% 69%, 68% 96%, 34% 96%, 32% 100%)',
                  ]

                  return (
                    // CART

                    <li
                      key={`${item.color}${index}`}
                      id={`shape${index + 1}`}
                      className={`${styles.item} ${styles[location]} ${styles.jewel} ${
                        styles.jewel2
                      } ${randomOfTwo === 0 ? styles.blue : styles.orange} 
                                ${
                                  windowHeight < windowWidth ? styles.wide : styles.tall
                                }`}
                      style={style}
                      role={'option'}
                      tabIndex={0}
                      onFocus={(e) => {
                        ulRef.current?.setAttribute(
                          'aria-activedescendant',
                          `${e.target.id}`
                        )
                      }}
                      onBlurCapture={(e) => {
                        ulRef.current?.removeAttribute('aria-activedescendant')
                      }}
                      onPointerEnter={(e) => {
                        movingItem(e)
                      }}
                      onMouseDown={(e) => {
                        removeItem(e)
                      }}
                      onTouchStart={(e) => {
                        removeItem(e)
                      }}
                      onPointerDown={(e) => {
                        removeItem(e)
                      }}
                      onKeyDown={(e) => {
                        Draggable.keyDown(
                          e,
                          e.target as HTMLElement,
                          () => escapeFunction(),
                          () => removeItem(e),
                          () => removeItem(e),
                          null
                        )
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          clipPath:
                            'polygon(70.71% 100%, 100% 70.71%, 100% 29.29%, 70.71% 0%, 29.29% 0%, 0% 29.29%, 0% 70.71%, 29.29% 100%)',
                        }}
                      >
                        {divArrayJewel2.map((span, index) => {
                          const style: CSSProperties = {
                            position: 'absolute',
                            left: `calc(50% - ${(span.size * times) / 2}%)`,
                            top: `calc(50% - ${(span.size * times) / 2}%)`,
                            borderRadius: '0',
                            ['--number' as string]: `${index}`,
                            ['--i' as string]: `${item.i}`,
                            width: `${span.size * times}%`,
                            height: `${span.size * times}%`,
                            minWidth: `${span.size * times}%`,
                            minHeight: `${span.size * times}%`,
                            maxWidth: `${span.size * times}%`,
                            maxHeight: `${span.size * times}%`,
                            opacity: `${
                              index === 8 && randomOfTwo === 0
                                ? '0.4'
                                : index === 8
                                ? '0.6'
                                : index === 9 && randomOfTwo === 0
                                ? '0.2'
                                : index === 9
                                ? '0.3'
                                : index === 10 && randomOfTwo === 0
                                ? '0.24'
                                : index === 10
                                ? '0.4'
                                : '1'
                            }`,
                            clipPath: `${clipArrayJewel2[index]}`,
                          }
                          return (
                            <div
                              className={
                                index === 8
                                  ? styles.none
                                  : index === 9
                                  ? styles.cover
                                  : index === 10
                                  ? styles.frame
                                  : ''
                              }
                              key={`${item.i}-${index}`}
                              style={style}
                            ></div>
                          )
                        })}
                        <span style={style}>
                          <span className='scr'>
                            {t('Shape')} {index + 1}
                          </span>
                        </span>
                      </div>
                    </li>
                  )
                } else if (
                  location == LOCATION.HOME ||
                  location == LOCATION.JOKES ||
                  location == LOCATION.SALON
                ) {
                  const style: CSSProperties = {
                    position: 'absolute',
                    top: `clamp(60px, calc(-20vh + 1.2vh * ${item.e * 3} * ${
                      item.size / 6
                    }), calc(80vh - 50px - calc(var(--size, 200px) * 0.8vh)))`,
                    left: `clamp(1vw, calc(-5vh + ${item.i} * 1.4vw * ${item.e}), 96vw - ${item.size}vw)`,
                    backgroundColor: `transparent`,
                    color: `${item.color}`,
                    ['--i' as string]: `${item.i}`,
                    ['--e' as string]: `${item.e}`,
                    ['--size' as string]: `${item.size}`,
                    ['--s' as string]:
                      windowWidth < windowHeight ? `${item.size}vh` : `${item.size}vw`,
                    width:
                      windowWidth < windowHeight
                        ? `calc(var(--size) * 0.8vh)`
                        : `calc(var(--size) * 0.8vw)`,
                    height:
                      windowWidth < windowHeight
                        ? `calc(var(--size) * 0.8vh)`
                        : `calc(var(--size) * 0.8vw)`,
                    maxHeight: '200px',
                    maxWidth: '200px',
                    minHeight: '44px',
                    minWidth: '44px',
                    borderRadius: '65% 65% 70% 60% / 60% 70% 60% 65%',
                    opacity: `0.${item.size > 8 ? 8 : Math.ceil(item.size)}`,
                  }

                  return (
                    //HOME // JOKES // SALON
                    <li
                      key={`${item.color}${index}`}
                      className={`${styles.item} ${styles.about} ${styles.bubbles} ${
                        windowHeight < windowWidth ? styles.wide : styles.tall
                      }`}
                      style={style}
                      id={`shape${index + 1}`}
                      role={'option'}
                      tabIndex={0}
                      onFocus={(e) => {
                        ulRef.current?.setAttribute(
                          'aria-activedescendant',
                          `${e.target.id}`
                        )
                      }}
                      onBlurCapture={(e) => {
                        ulRef.current?.removeAttribute('aria-activedescendant')
                      }}
                      onPointerEnter={(e) => {
                        movingItem(e)
                      }}
                      onMouseDown={(e) => {
                        removeItem(e)
                      }}
                      onTouchStart={(e) => {
                        removeItem(e)
                      }}
                      onPointerDown={(e) => {
                        removeItem(e)
                      }}
                      onKeyDown={(e) => {
                        Draggable.keyDown(
                          e,
                          e.target as HTMLElement,
                          () => escapeFunction(),
                          () => removeItem(e),
                          () => removeItem(e),
                          null
                        )
                      }}
                    >
                      <span>
                        <span className='scr'>
                          {t('Bubble')} {index + 1}
                        </span>
                      </span>
                    </li>
                  )
                } else if (
                  //In the case of using the blob feature, also add to ul style
                  location == LOCATION.PORTFOLIO ||
                  location == LOCATION.BLOBAPP ||
                  location == LOCATION.DND
                ) {
                  const breakpoint = 500
                  const sizing = 0.7
                  const sizingSmall = 0.4
                  const div = 1
                  //an array of blob radiuses:
                  const blobRadius = [
                    '30% 70% 70% 30% / 30% 36% 64% 70%',
                    '70% 30% 30% 70% / 36% 50% 36% 50%',
                    '48% 52% 41% 59% / 48% 58% 42% 52%',
                    '70% 30% 30% 70% / 36% 50% 36% 50%',
                  ]
                  const filter =
                    windowWidth < breakpoint && windowWidth < windowHeight
                      ? `blur(calc(var(--blur) * 1vh))`
                      : windowWidth < breakpoint && windowWidth > windowHeight
                      ? `blur(calc(var(--blur) * 1vw))`
                      : windowWidth < windowHeight
                      ? `blur(calc(var(--blur) * 1.2vh))`
                      : `blur(calc(var(--blur) * 1.2vw))`
                  const number = Math.floor(getRandomMinMax(0.001, 3.999))
                  const style: CSSProperties = {
                    position: 'absolute',
                    top: `clamp(60px, calc(-20% + ${item.e} * 1.4vh * ${
                      item.size / 2
                    }), calc(80vh - 50px - calc(var(--size, 200px) * 0.8vh)))`,
                    left: `clamp(1vw, calc(-10% + ${
                      item.i * item.e
                    } * 1.2vw ), calc(100vw - 200px))`,
                    backgroundColor: `${item.color}`,
                    color: `${item.color}`, //for currentColor
                    ['--i' as string]: `${item.i}`,
                    ['--e' as string]: `${item.e}`,
                    ['--size' as string]: `${item.size}`,
                    ['--blur' as string]: `clamp(2.4, calc(var(--size) * 0.2), 7)`,
                    //needs to have var(--size) not ${item.size} to work with the resize keys and wheel function:
                    width:
                      windowWidth < breakpoint && windowWidth < windowHeight
                        ? `calc(calc(var(--size) * ${div}) * ${sizingSmall}vh)`
                        : windowWidth < breakpoint && windowWidth > windowHeight
                        ? `calc(calc(var(--size) * ${div}) * ${sizingSmall}vw)`
                        : windowWidth < windowHeight
                        ? `calc(calc(var(--size) * ${div}) * ${sizing}vh)`
                        : `calc(calc(var(--size) * ${div}) * ${sizing}vw)`,
                    //needs to have var(--size) not ${item.size} to work with the resize keys and wheel function:
                    height:
                      windowWidth < breakpoint && windowWidth < windowHeight
                        ? `calc(calc(var(--size, 200px) * ${div}) * ${sizingSmall}vh)`
                        : windowWidth < breakpoint && windowWidth > windowHeight
                        ? `calc(calc(var(--size, 200px) * ${div}) * ${sizingSmall}vw)`
                        : windowWidth < windowHeight
                        ? `calc(calc(var(--size, 200px) * ${div}) * ${sizing}vh)`
                        : `calc(calc(var(--size, 200px) * ${div}) * ${sizing}vw)`,
                    minWidth: `70px`,
                    minHeight: `70px`,
                    maxWidth: `200px`,
                    maxHeight: `200px`,
                    borderRadius: `${blobRadius[number]}`,
                    transform: 'rotate(' + item.rotation + 'deg)',
                    opacity: `0.9`,
                    WebkitFilter: filter,
                    filter: filter,
                    transitionProperty:
                      'top, left, bottom, right, transform, width, height, border-radius',
                    transitionTimingFunction: 'ease-in-out',
                    transitionDuration: '600ms',
                  }

                  return (
                    //BLOBS

                    <li
                      key={`${item.color}${index}`}
                      id={`shape${index + 1}`}
                      className={`${styles.item} ${styles.blob} ${styles[location]} ${
                        styles.portfolio
                      } 
                                ${
                                  windowHeight < windowWidth ? styles.wide : styles.tall
                                }`}
                      style={style}
                      draggable={true}
                      tabIndex={0}
                      role={'option'}
                      onMouseDown={(e) => {
                        Draggable.start(e)
                        ;(e.target as HTMLLIElement).classList.add(styles.drag)
                        ;(e.target as HTMLLIElement).style.transitionProperty =
                          'transform, width, height, border-radius'
                      }}
                      onMouseMove={(e) => {
                        Draggable.movement(e)
                      }}
                      onMouseUp={(e) => {
                        Draggable.stopMovementCheck(e)
                        ;(e.target as HTMLLIElement).classList.remove(styles.drag)
                        ;(e.target as HTMLLIElement).style.transitionProperty =
                          'top, left, bottom, right, transform, width, height, border-radius'
                      }}
                      onMouseLeave={(e) => {
                        Draggable.stopMoving(e)
                        ;(e.target as HTMLLIElement).classList.remove(styles.drag)
                      }}
                      onTouchStart={(e) => {
                        Draggable.start(e)
                      }}
                      onTouchMove={(e) => {
                        Draggable.movement(e)
                      }}
                      onTouchEnd={(e) => {
                        Draggable.stopMovementCheck(e)
                      }}
                      onWheel={(e) => {
                        Draggable.wheel(e.target as HTMLElement)
                      }}
                      onFocus={(e) => {
                        Draggable.focused(e.target)
                        ulRef.current?.setAttribute(
                          'aria-activedescendant',
                          `${e.target.id}`
                        )
                      }}
                      onBlurCapture={(e) => {
                        Draggable.blurred(e.target)
                        ulRef.current?.removeAttribute('aria-activedescendant')
                      }}
                      onKeyDown={(e) => {
                        Draggable.keyDown(
                          e,
                          e.target as HTMLElement,
                          () => escapeFunction(),
                          () => removeItem(e),
                          () => removeItem(e),
                          null
                        )
                      }}
                    >
                      <span>
                        <span className='scr'>
                          {t('Blob')} {index + 1}
                        </span>
                      </span>
                    </li>
                  )
                } else if (location === LOCATION.CONTACT || location === LOCATION.FORM) {
                  // CONTACT  // FORM
                  const mod = 0.6
                  const style: CSSProperties = {
                    position: 'absolute',
                    top: `clamp(60px, calc(-5vh + calc(1.5vh * ${item.e} * ${
                      item.e / 1.9
                    })), calc(80vh - 50px - calc(var(--size, 120px) * ${mod}vh)))`,
                    left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})),90vw)`,
                    backgroundColor: `transparent`,
                    color: `${item.color}`,
                    ['--i' as string]: `${item.i}`,
                    ['--e' as string]: `${item.e}`,
                    ['--size' as string]: `${item.size}`,
                    ['--s' as string]:
                      windowWidth < windowHeight ? `${item.size}vh` : `${item.size}vw`,
                    width:
                      windowWidth < windowHeight
                        ? `calc(var(--size, 120px) * ${mod}vh)`
                        : `calc(var(--size, 120px) * ${mod}vw)`,
                    height:
                      windowWidth < windowHeight
                        ? `calc(var(--size, 120px) * ${mod}vh)`
                        : `calc(var(--size, 120px) * ${mod}vw)`,
                    minHeight: '44px',
                    minWidth: '44px',
                    maxHeight: '120px',
                    maxWidth: '120px',
                    borderRadius: '50%',
                    opacity: `0.${item.size > 7 ? 8 : Math.ceil(item.size)}`,
                  }
                  const styleInner: CSSProperties = {
                    position: 'absolute',
                    backgroundColor: `transparent`,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    opacity: `0.${item.size > 8 ? 8 : Math.ceil(item.size)}`,
                  }

                  return (
                    //CONTACT // FORM

                    <li
                      key={`${item.color}${index}`}
                      id={`shape${index + 1}`}
                      className={`eye ${styles.item} ${styles.eyes} ${styles[location]} 
                                ${
                                  windowHeight < windowWidth ? styles.wide : styles.tall
                                }`}
                      style={style}
                      role={'option'}
                      tabIndex={0}
                      onFocus={(e) => {
                        ulRef.current?.setAttribute(
                          'aria-activedescendant',
                          `${e.target.id}`
                        )
                      }}
                      onBlurCapture={(e) => {
                        ulRef.current?.removeAttribute('aria-activedescendant')
                      }}
                      onPointerEnter={(e) => movingItem(e)}
                      // onPointerEnter={e => addDirectionClass(e)}
                      onPointerCancel={(e) => {
                        removeItem(e)
                      }}
                      onMouseDown={(e) => {
                        removeItem(e)
                      }}
                      onTouchStart={(e) => {
                        removeItem(e)
                      }}
                      onPointerDown={(e) => {
                        removeItem(e)
                      }}
                      onKeyDown={(e) => {
                        Draggable.keyDown(
                          e,
                          e.target as HTMLElement,
                          () => escapeFunction(),
                          () => removeItem(e),
                          () => removeItem(e),
                          null
                        )
                      }}
                    >
                      <div style={styleInner} className={`inner ${styles.inner}`}>
                        <span className='else-eye'>
                          <span className='scr'>
                            {t('Eye')} {index + 1}
                          </span>
                        </span>
                      </div>
                    </li>
                  )
                } else {
                  // ELSE
                  // var(--size) enables resizing with s, b and l
                  const border = `clamp(40px, calc(0.6vw * var(--size)), 200px)`

                  const style: CSSProperties = {
                    ['--rotate' as string]: `${
                      item.rotation ?? `${Math.round(getRandomMinMax(165, 195))}`
                    }deg`,
                    ['--color' as string]: `${item.color}`,
                    ['--color2' as string]: 'hsla(0, 0%, 100%, 0.7)',
                    ['--s' as string]: `${item.size}`,
                    ['--size' as string]: `${item.size}`,
                    ['--border' as string]: border,
                    borderWidth: border,
                    position: 'absolute',
                    top: `clamp(60px, calc(-5vh + calc(1.2vh * ${item.e} * ${
                      item.e / 1.3
                    })), calc(80vh - 50px - ${item.size / 1.3}vh))`,
                    left: `clamp(1vw, calc(-10vw + ${item.i} * 1.3vw * ${item.e}), 95vw - ${item.size}vw)`,
                    width: 0,
                    height: 0,
                    opacity: `0.${item.size > 5 ? 5 : Math.ceil(item.size)}`,
                  }
                  return (
                    // ELSE

                    <li
                      key={`${item.color}${index}`}
                      id={`shape${index + 1}`}
                      className={`${styles.item} ${styles[location]} ${styles.triangle} 
                                ${
                                  windowHeight < windowWidth ? styles.wide : styles.tall
                                }`}
                      style={style}
                      role={'option'}
                      tabIndex={0}
                      onFocus={(e) => {
                        ulRef.current?.setAttribute(
                          'aria-activedescendant',
                          `${e.target.id}`
                        )
                      }}
                      onBlurCapture={(e) => {
                        ulRef.current?.removeAttribute('aria-activedescendant')
                      }}
                      onMouseDown={(e) => {
                        removeItem(e)
                      }}
                      onTouchStart={(e) => {
                        removeItem(e)
                      }}
                      onPointerDown={(e) => {
                        removeItem(e)
                      }}
                      onPointerEnter={(e) => {
                        movingItem(e)
                      }}
                      onKeyDown={(e) => {
                        Draggable.keyDown(
                          e,
                          e.target as HTMLElement,
                          () => escapeFunction(),
                          () => removeItem(e),
                          () => removeItem(e),
                          null
                        )
                      }}
                    >
                      {spanArray.map((span, index) => {
                        const style: CSSProperties = {
                          position: 'absolute',
                          top: `calc(${border} * -1.1)`,
                          left: `calc(${border} * -1)`,
                          color: `${item.color}`,
                          ['--color' as string]: `${span.color}`,
                          ['--color2' as string]: `${item.color}`,
                          ['--i' as string]: `${item.i}`,
                          ['--e' as string]: `${item.e}`,
                          ['--s' as string]: `${item.size}`,
                          ['--number' as string]: `${index}`,
                          width: 0,
                          height: 0,
                          borderWidth: border,
                        }
                        return (
                          <span key={`${item.i}-${index}`} style={style}>
                            <span className='scr'>
                              {t('Shape')} {index + 1}
                            </span>
                          </span>
                        )
                      })}
                    </li>
                  )
                }
              })}

              <svg className='filter'>
                <filter id='svgfilterHero'>
                  <feGaussianBlur in='SourceGraphic' stdDeviation='5' />
                  <feColorMatrix
                    values='
                                1 0 0 0 0 
                                0 1 0 0 0 
                                0 0 1 0 0
                                0 0 0 37 -10
                                '
                  ></feColorMatrix>
                </filter>
              </svg>
            </ul>
          )
        }
      },
      [values]
    )

  return (
    <div
      className={`
        ${lightTheme ? styles.light : ''} 
        ${touchDevice ? styles.touch : ''} 
        hero ${styles.hero} ${styles[address]}`}
    >
      {shouldRender && (
        <h1 className={`${fadeIn ? styles.fadeIn : styles.fadeOut}`}>
          <span data-text={heading}>{heading}</span>
        </h1>
      )}
      {shouldRender && (
        <p className={`${fadeIn ? styles.fadeIn : styles.fadeOut}`}>{text}</p>
      )}
      <span id='description' className='scr'>
        {t('HeroSection')}: {t('InteractiveElements')}
      </span>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <clipPath id='clipHole1' clipPathUnits='objectBoundingBox' clipRule='evenodd'>
            {/* Outer polygon: your original polygon */}
            <polygon points='0.85,1 1,0.85 1,0.15 0.85,0 0.15,0 0,0.15 0,0.85 0.15,1' />
            {/* Inner polygon: 10% smaller */}
            <polygon points='0.765,0.9 0.9,0.765 0.9,0.135 0.765,0 0.135,0 0,0.135 0,0.765 0.135,0.9' />
          </clipPath>
          <clipPath id='clipHole2' clipPathUnits='objectBoundingBox' clipRule='evenodd'>
            {/* Outer polygon for second shape */}
            <polygon points='0.7071,1 1,0.7071 1,0.2929 0.7071,0 0.2929,0 0,0.2929 0,0.7071 0.2929,1' />
            {/* Inner polygon: 10% smaller */}
            <polygon points='0.6364,0.9 0.9,0.6364 0.9,0.2616 0.6364,0 0.2616,0 0,0.2616 0,0.6364 0.2616,0.9' />
          </clipPath>
        </defs>
      </svg>

      {shouldRender && (
        <ItemComponent array={setupItems} location={page} fadeIn={fadeIn} />
      )}

      <div
        className={styles.bottom}
        data-instructions={instructions ? instructions : t('TryTappingTheShapes')}
      >
        <button ref={resetButton} type='button' onClick={handleReset}>
          <span>{reset ? reset : t('Reset')}</span>
        </button>
      </div>
      <div
        className={`${styles.bottom} ${styles.bottom2}`}
        data-instructions={
          prefersReducedMotion ? t('TurnRandomMovementOn') : t('TurnRandomMovementOff')
        }
      >
        <button
          onClick={() => {
            setPrefersReducedMotion(!prefersReducedMotion)
          }}
          type='button'
          className={`${styles.rand}`}
        >
          <span>{prefersReducedMotion ? t('Off') : t('On')}</span>
          <span className='scr'>
            {prefersReducedMotion
              ? t('TurnRandomMovementOn')
              : t('TurnRandomMovementOff')}
          </span>
        </button>
      </div>
    </div>
  )
}
