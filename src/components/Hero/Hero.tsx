import React, { useMemo, useCallback, FC, useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './hero.module.css'
import useWindowSize from '../../hooks/useWindowSize'
import useRandomMinMax from '../../hooks/useRandomMinMax'
import * as Draggable from '../../hooks/useDraggable'
import { useTheme } from '../../hooks/useTheme'
import useEnterDirection from '../../hooks/useEnterDirection'
import {
  EBlob,
  EBubble,
  EEye,
  EHeroSection,
  EInteractiveElements,
  ELanguages,
  EOff,
  EOn,
  EReset,
  EShape,
  ETryTappingTheShapes,
  ETurnRandomMovementOff,
  ETurnRandomMovementOn,
  RefObject,
} from '../../interfaces'
import useEventListener from '../../hooks/useEventListener'
import useSessionStorage from '../../hooks/useStorage'

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
  TODO: 'todo',
}

export default function Hero({
  heading,
  address,
  text,
  reset,
  instructions,
  language,
}: {
  heading: string
  address: string
  text: string
  reset?: string
  instructions?: string
  language: ELanguages
}) {
  const location = useLocation()

  //remove the last trailing / then get the last part of the pathname:
  const page = useMemo(() => {
    return location.pathname?.replace(/\/$/, '').split('/').pop() ?? ''
  }, [location])

  const resetButton = useRef() as RefObject<HTMLButtonElement>
  const ulRef = useRef() as RefObject<HTMLUListElement>
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)

  //Move items up, down, left or left, depending on the direction they're approached from:
  const movingItem = (e: React.PointerEvent<HTMLElement>) => {
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
      | React.PointerEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>
      | React.MouseEvent<HTMLLIElement, MouseEvent>
      | React.TouchEvent<HTMLLIElement>
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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const [values, setValues] = useSessionStorage<itemProps[]>('HeroArray', [])

  const spanArray: itemProps[] = useMemo(() => {
    let array: itemProps[] = []
    for (let i: number = 1; i <= 4; i++) {
      const span: itemProps = {
        i: i,
        e: useRandomMinMax(5, 9),
        size: i,
        color: 'hsla(0, 0%, 100%, 0.7)',
      }
      array.push(span)
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
    const specialSizesCount = Math.ceil(useRandomMinMax(1.1, 3))
    const specialIndices = new Set<number>()

    // Generate unique random indices for special sizes
    while (specialIndices.size < specialSizesCount) {
      specialIndices.add(Math.floor(useRandomMinMax(0, amount)))
    }

    for (let i: number = 0; i <= amount; i++) {
      const number = Math.ceil(useRandomMinMax(0.3, 2))
      let colorSwitch: string
      switch (number) {
        case 1:
          colorSwitch = `var(--color-secondary-${Math.round(useRandomMinMax(10, 13))})`
          break
        case 2:
          colorSwitch = `var(--color-primary-${Math.round(useRandomMinMax(9, 14))})`
          break
        default:
          colorSwitch = `var(--color-primary-${Math.round(useRandomMinMax(9, 14))})`
      }

      const size = specialIndices.has(i)
        ? Math.round(useRandomMinMax(12, 15))
        : Math.round(useRandomMinMax(8, 15))

      const e = specialIndices.has(i) ? useRandomMinMax(7, 9) : useRandomMinMax(4, 9)

      const item: itemProps = {
        i: i + 1,
        e: e,
        size: size,
        rotation: useRandomMinMax(165, 195),
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

        const direction = Math.random() < 0.5 ? 'top' : 'left'
        const change = Math.random() < 0.5 ? -15 : 15

        if (direction === 'top') {
          const newTop = currentTop + change
          // Check if the new position is within the top 60px-60% of the window
          if (newTop >= 60 && newTop + itemHeight <= windowHeight * 0.6) {
            item.style.top = `${newTop}px`
          }
        } else {
          const newLeft = currentLeft + change
          // Check if the new position is within the window
          if (newLeft >= 0 && newLeft + itemWidth <= windowWidth) {
            item.style.left = `${newLeft}px`
          }
        }
      }
    }, useRandomMinMax(2000, 5000))

    return () => clearInterval(interval)
  }, [values, prefersReducedMotion])

  const ItemComponent: FC<{ array: itemProps[]; location: string }> = useCallback(
    ({ array, location }) => {
      {
        return (
          <ul
            ref={ulRef}
            id={`listbox-hero-${location.toLowerCase()}`}
            role={`listbox`}
            aria-labelledby={`description`}
            className={`${styles.herocontent} ${styles[location] ?? ''} ${
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
              if (location == LOCATION.SELECT || location == LOCATION.TODO) {
                const dividedBy = 2.5

                const style: React.CSSProperties = {
                  position: 'absolute',
                  top: `clamp(60px, calc(-5vh + calc(1.1vh * ${item.e} * ${
                    item.e / 1.5
                  })), 50vh)`,
                  left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})), 95vw - ${item.size}vw)`,
                  width:
                    windowWidth < windowHeight
                      ? `${item.size / dividedBy}vh`
                      : `${item.size / dividedBy}vw`,
                  height:
                    windowWidth < windowHeight
                      ? `${item.size / dividedBy}vh`
                      : `${item.size / dividedBy}vw`,
                  transitionProperty:
                    'top, left, bottom, right, transform, width, height',
                  transitionTimingFunction: 'ease-in-out',
                  transitionDuration: '600ms',
                }
                const inner: React.CSSProperties = {
                  color: `${item.color}`,
                  ['--i' as string]: `${item.i}`,
                  ['--e' as string]: `${item.e}`,
                  ['--s' as string]:
                    windowWidth < windowHeight ? `${item.size}vh` : `${item.size}vw`,
                  width: '100%',
                  height: '100%',
                  minWidth: `20px`,
                  minHeight: `20px`,
                  maxWidth: `150px`,
                  maxHeight: `150px`,
                  borderRadius: '3px',
                  opacity: `${item.size > 6 ? `0.8` : `0.${Math.ceil(item.size + 2)}`}`,
                }

                return (
                  // SELECT // TODO

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
                        const style: React.CSSProperties = {
                          position: 'absolute',
                          borderRadius: '3px',
                          color: `${item.color}`,
                          ['--color' as string]: `${span.color}`,
                          ['--i' as string]: `${item.i}`,
                          ['--e' as string]: `${item.e}`,
                          ['--s' as string]: `${item.size}`,
                          ['--number' as string]: `${index}`,
                        }
                        return (
                          <span key={`${item.i}-${index}`} style={style}>
                            <span className='scr'>
                              {EShape[language]} {index + 1}
                            </span>
                          </span>
                        )
                      })}
                    </div>
                  </li>
                )
              } else if (
                location == LOCATION.ABOUT ||
                location == LOCATION.JOKES ||
                location == LOCATION.SALON
              ) {
                const style: React.CSSProperties = {
                  position: 'absolute',
                  top: `clamp(60px, calc(-20vh + 1.2vh * ${item.e * 3} * ${
                    item.size / 6
                  }), 55vh)`,
                  left: `clamp(1vw, calc(-5% + ${item.i} * 1.2vw * ${item.e}), 96vw - ${item.size}vw)`,
                  backgroundColor: `transparent`,
                  color: `${item.color}`,
                  ['--i' as string]: `${item.i}`,
                  ['--e' as string]: `${item.e}`,
                  ['--size' as string]: `${item.size}`,
                  ['--s' as string]:
                    windowWidth < windowHeight ? `${item.size}vh` : `${item.size}vw`,
                  width:
                    windowWidth < windowHeight
                      ? `calc(var(--size) * 1vh)`
                      : `calc(var(--size) * 1vw)`,
                  height:
                    windowWidth < windowHeight
                      ? `calc(var(--size) * 1vh)`
                      : `calc(var(--size) * 1vw)`,
                  maxHeight: '200px',
                  maxWidth: '200px',
                  minHeight: '40px',
                  minWidth: '40px',
                  borderRadius: '65% 65% 70% 60% / 60% 70% 60% 65%',
                  opacity: `0.${item.size > 8 ? 8 : Math.ceil(item.size)}`,
                }

                return (
                  //ABOUT // JOKES // SALON
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
                        {EBubble[language]} {index + 1}
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
                const number = Math.floor(useRandomMinMax(0.001, 3.999))
                const style: React.CSSProperties = {
                  position: 'absolute',
                  top: `clamp(60px, calc(-20% + ${item.e} * 1.2vh * ${
                    item.size / 2
                  }),50vh)`,
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
                      ? `calc(calc(var(--size) * ${div}) * ${sizingSmall}vh)`
                      : windowWidth < breakpoint && windowWidth > windowHeight
                      ? `calc(calc(var(--size) * ${div}) * ${sizingSmall}vw)`
                      : windowWidth < windowHeight
                      ? `calc(calc(var(--size) * ${div}) * ${sizing}vh)`
                      : `calc(calc(var(--size) * ${div}) * ${sizing}vw)`,
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
                    className={`${styles.item} ${styles[location]} ${styles.portfolio} 
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
                        {EBlob[language]} {index + 1}
                      </span>
                    </span>
                  </li>
                )
              } else if (location === LOCATION.CONTACT || location === LOCATION.FORM) {
                // CONTACT  // FORM
                const mod = useRandomMinMax(0.4, 0.7)
                const style: React.CSSProperties = {
                  position: 'absolute',
                  top: `clamp(60px, calc(-5vh + calc(1.5vh * ${item.e} * ${
                    item.e / 1.9
                  })),55vh)`,
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
                      ? `calc(var(--size) * ${mod}vh)`
                      : `calc(var(--size) * ${mod}vw)`,
                  height:
                    windowWidth < windowHeight
                      ? `calc(var(--size) * ${mod}vh)`
                      : `calc(var(--size) * ${mod}vw)`,
                  minHeight: '40px',
                  minWidth: '40px',
                  maxHeight: '100px',
                  maxWidth: '100px',
                  borderRadius: '50%',
                  opacity: `0.${item.size > 7 ? 8 : Math.ceil(item.size)}`,
                }
                const styleInner: React.CSSProperties = {
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
                          {EEye[language]} {index + 1}
                        </span>
                      </span>
                    </div>
                  </li>
                )
              } else {
                // ELSE
                // var(--size) enables resizing with s, b and l
                const border = `clamp(40px, calc(0.6vw * var(--size)), 200px)`

                const style: React.CSSProperties = {
                  ['--rotate' as string]: `${
                    item.rotation ?? `${useRandomMinMax(165, 195)}`
                  }deg`,
                  ['--color' as string]: `${item.color}`,
                  ['--color2' as string]: 'hsla(0, 0%, 100%, 0.7)',
                  ['--s' as string]: `${item.size}`,
                  ['--size' as string]: `${item.size}`,
                  ['--border' as string]: border,
                  borderWidth: border,
                  position: 'absolute',
                  top: `clamp(60px, calc(-5vh + calc(1vh * ${item.e} * ${
                    item.e / 1.3
                  })), 55vh)`,
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
                      const style: React.CSSProperties = {
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
                            {EShape[language]} {index + 1}
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
      <h1>
        <span data-text={heading}>{heading}</span>
      </h1>
      <p>{text}</p>
      <span id='description' className='scr'>
        {EHeroSection[language]}: {EInteractiveElements[language]}
      </span>
      <ItemComponent array={setupItems} location={page} />
      <div
        className={styles.bottom}
        data-instructions={instructions ? instructions : ETryTappingTheShapes[language]}
      >
        <button ref={resetButton} type='button' onClick={handleReset}>
          <span>{reset ? reset : EReset[language]}</span>
        </button>
      </div>
      <div
        className={`${styles.bottom} ${styles.bottom2}`}
        data-instructions={
          prefersReducedMotion
            ? ETurnRandomMovementOn[language]
            : ETurnRandomMovementOff[language]
        }
      >
        <button
          onClick={() => {
            setPrefersReducedMotion(!prefersReducedMotion)
          }}
          type='button'
          className={`${styles.rand}`}
        >
          <span>{prefersReducedMotion ? EOff[language] : EOn[language]}</span>
          <span className='scr'>
            {prefersReducedMotion
              ? ETurnRandomMovementOn[language]
              : ETurnRandomMovementOff[language]}
          </span>
        </button>
      </div>
    </div>
  )
}
