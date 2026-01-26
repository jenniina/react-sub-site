import {
  forwardRef,
  RefObject,
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useState,
  useEffect,
} from 'react'
import { useLanguageContext } from '../../../contexts/LanguageContext'

import { getRandomMinMax } from '../../../utils'
import * as Draggable from '../../../hooks/useDraggable'
import styles from '../hero.module.css'
import { itemProps } from '../Hero'

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
  MEDIA: 'media',
  QUIZ: 'quiz',
}

interface ItemComponentProps {
  array: itemProps[]
  location: string
  windowWidth: number
  windowHeight: number
  divArrayJewel1: itemProps[]
  divArrayJewel2: itemProps[]
  spanArray: itemProps[]
  movingItem: (e: ReactPointerEvent<HTMLElement>) => void
  removeItem: (
    e:
      | ReactPointerEvent<HTMLElement>
      | ReactKeyboardEvent<HTMLElement>
      | ReactMouseEvent<HTMLLIElement, MouseEvent>
      | ReactTouchEvent<HTMLLIElement>
  ) => void
  escapeFunction: () => void
  windowObj: Window | null
  itemsVisible: boolean
}

const ItemComponent = forwardRef<
  HTMLUListElement,
  Omit<ItemComponentProps, 'ulRef'>
>(
  (
    {
      array,
      location,
      windowWidth,
      windowHeight,
      spanArray,
      divArrayJewel1,
      divArrayJewel2,
      movingItem,
      removeItem,
      escapeFunction,
      windowObj,
      itemsVisible,
    },
    ref
  ) => {
    const { t } = useLanguageContext()
    const ulRef = ref as RefObject<HTMLUListElement>

    const [activeDescendant, setActiveDescendant] = useState<string | null>(
      null
    )

    const isComposer = location === LOCATION.COMPOSER
    const composerStaffWidth = 200
    // Use the same numeric value everywhere (CSS + JS) to avoid disagreement
    // when evaluating clamp()/calc() expressions.
    const composerStaffMidYPx = Math.min(
      1000,
      Math.max(100, windowHeight * 0.44)
    )
    const composerStaffMidY = `${composerStaffMidYPx}px`
    // Keep this as a concrete px value so JS/CSS parsing stays consistent.
    // (Some browsers are picky about multiplication inside CSS calc() when we
    // try to evaluate it via a temporary element.)
    const composerStaffHalfStepPx = (60 * composerStaffWidth) / 640
    const composerStaffHalfStep = `${composerStaffHalfStepPx}px`

    // 1) Capture each item's original responsive positioning formula exactly once.
    // 2) Re-apply stored pixel offsets after rerenders/resizes (React may re-set
    //    inline styles back to the base formula).
    // 3) For composer, toggle above/below classes based on the staff midline.
    useEffect(() => {
      const root = ulRef?.current
      if (!root || !windowObj) return

      const stripOuterCalc = (expr: string) => {
        const trimmed = expr.trim()
        if (trimmed.startsWith('calc(') && trimmed.endsWith(')')) {
          return trimmed.slice(5, -1).trim()
        }
        return trimmed
      }

      const resolveCssVarToPx = (varName: string, contextEl: Element) => {
        const val = windowObj
          .getComputedStyle(contextEl)
          .getPropertyValue(varName)
          .trim()
        if (!val) return 0
        if (val.endsWith('px')) return Number.parseFloat(val) || 0

        const tmp = document.createElement('div')
        tmp.style.position = 'absolute'
        tmp.style.visibility = 'hidden'
        tmp.style.top = val
        document.body.appendChild(tmp)
        const px = Number.parseFloat(windowObj.getComputedStyle(tmp).top) || 0
        document.body.removeChild(tmp)
        return px
      }

      const resolveExprToPx = (expr: string) => {
        if (!expr) return 0
        if (expr.endsWith('px')) return Number.parseFloat(expr) || 0

        const tmp = document.createElement('div')
        tmp.style.position = 'absolute'
        tmp.style.visibility = 'hidden'
        tmp.style.top = expr
        document.body.appendChild(tmp)
        const px = Number.parseFloat(windowObj.getComputedStyle(tmp).top) || 0
        document.body.removeChild(tmp)
        return px
      }

      const staffBaseYPx = isComposer
        ? resolveCssVarToPx('--staff-mid-y', root)
        : null
      const staffHalfStepPx = isComposer
        ? resolveCssVarToPx('--staff-half-step', root)
        : null
      const midMarkPx =
        isComposer && staffBaseYPx !== null && staffHalfStepPx !== null
          ? staffBaseYPx + 5.5 * staffHalfStepPx
          : null

      const items = root.querySelectorAll<HTMLElement>('li[id^="shape"]')
      items.forEach((el) => {
        if (el.style.top) el.dataset.baseTop ??= stripOuterCalc(el.style.top)
        if (el.style.left) el.dataset.baseLeft ??= stripOuterCalc(el.style.left)
        el.dataset.moveDy ??= '0'
        el.dataset.moveDx ??= '0'

        const baseTop = el.dataset.baseTop
        const baseLeft = el.dataset.baseLeft
        const dy = Number.parseFloat(el.dataset.moveDy ?? '0') || 0
        const dx = Number.parseFloat(el.dataset.moveDx ?? '0') || 0

        if (baseTop && dy !== 0) el.style.top = `calc(${baseTop} + ${dy}px)`
        if (baseLeft && dx !== 0) el.style.left = `calc(${baseLeft} + ${dx}px)`

        if (isComposer && midMarkPx !== null) {
          const dyForTop = Number.parseFloat(el.dataset.moveDy ?? '0') || 0
          const topPx = baseTop
            ? resolveExprToPx(`calc(${baseTop})`) + dyForTop
            : Number.parseFloat(
                windowObj.getComputedStyle(el).getPropertyValue('top')
              )
          if (Number.isFinite(topPx)) {
            // Notes are positioned with `top = staffBaseY + step*halfStep - noteHead`.
            // So the staff anchor is the bottom of the note head.
            const noteHeadPx = resolveCssVarToPx('--note-head', el) || 0
            const anchorYPx = topPx + noteHeadPx
            // Cut line is slightly above the true midpoint to compensate for the
            // lower note visually overflowing upward.
            const isAbove = anchorYPx <= midMarkPx - 5
            el.classList.toggle(styles.above, isAbove)
            el.classList.toggle(styles.below, !isAbove)
          }
        }
      })
    }, [
      ulRef,
      array,
      location,
      windowWidth,
      windowHeight,
      itemsVisible,
      isComposer,
      windowObj,
    ])

    return (
      <>
        <ul
          ref={ulRef}
          id={`listbox-hero-${location.toLowerCase()}`}
          role="listbox"
          aria-labelledby={`description`}
          aria-activedescendant={activeDescendant ?? undefined}
          tabIndex={0}
          className={`${styles.herocontent} ${styles[location] ?? ''} ${
            //In the case of using the blob feature for a page, add it here:
            location === LOCATION.PORTFOLIO ||
            location === LOCATION.BLOBAPP ||
            location === LOCATION.DND
              ? styles.blob
              : ''
          } ${itemsVisible ? styles['items-visible'] : styles['items-hidden']} `}
          style={(() => {
            const baseStyle: CSSProperties =
              location === LOCATION.PORTFOLIO ||
              location === LOCATION.BLOBAPP ||
              location === LOCATION.DND
                ? {
                    WebkitFilter: 'url(#svgfilterHero)',
                    filter: 'url(#svgfilterHero)',
                    opacity: 0.7,
                  }
                : { WebkitFilter: 'none', filter: 'none' }

            if (!isComposer) return baseStyle

            return {
              ...baseStyle,
              ['--staff-width' as string]: `${composerStaffWidth}px`,
              ['--staff-mid-y' as string]: composerStaffMidY,
              ['--staff-half-step' as string]: composerStaffHalfStep,
            }
          })()}
        >
          {array.map((item, index) => {
            if (
              location == LOCATION.SELECT ||
              location == LOCATION.TODO ||
              location == LOCATION.GRAPHQL ||
              location == LOCATION.MEMORY
            ) {
              const dividedBy = 2.5

              const style: CSSProperties = {
                position: 'absolute',
                top: `clamp(100px, calc(-5vh + calc(1.3vh * ${item.e} * ${
                  item.e / 1.5
                })), calc(80vh - 50px - ${item.size / dividedBy}vh))`,
                left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})), calc(95vw - ${item.size}vw))`,
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
                  windowWidth < windowHeight
                    ? `${item.size}vh`
                    : `${item.size}vw`,
                width: '100%',
                height: '100%',
                minWidth: `44px`,
                minHeight: `44px`,
                maxWidth: `150px`,
                maxHeight: `150px`,
                borderRadius: '3px',
                opacity: `${
                  item.size > 6 ? `0.7` : `0.${Math.ceil(item.size + 2)}`
                }`,
              }

              return (
                // SELECT // TODO // GRAPHQL // MEMORY

                <li
                  key={`${item.color}${item.size}${item.e}${index}`}
                  id={`shape${item.i}`}
                  className={`${styles.item} ${styles[location]} ${
                    styles.geometric
                  } 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`}
                  style={style}
                  role={'option'}
                  tabIndex={0}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  onFocus={(e) => {
                    setActiveDescendant(e.target.id)
                  }}
                  onBlurCapture={() => {
                    setActiveDescendant(null)
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
                      windowObj,
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
                          <span className="scr">
                            {t('Shape')} {index + 1}
                          </span>
                        </span>
                      )
                    })}
                  </div>
                </li>
              )
            } else if (location == LOCATION.MEDIA) {
              const dividedBy = 2

              const style: CSSProperties = {
                position: 'absolute',
                top: `clamp(100px, calc(-5vh + calc(1.3vh * ${item.e} * ${
                  item.e / 1.5
                })), calc(80vh - 50px - ${item.size / dividedBy}vh))`,
                left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})), calc(95vw - ${item.size}vw))`,
                ['--width' as string]:
                  windowWidth < windowHeight
                    ? `${item.size / dividedBy}vh`
                    : `${item.size / dividedBy}vw`,
                ['--height' as string]:
                  windowWidth < windowHeight
                    ? `${item.size / dividedBy}vh`
                    : `${item.size / dividedBy}vw`,
                transitionDuration: '600ms',
                ['--idx' as string]: `${item.i}`,
              }
              const inner: CSSProperties = {
                color: `${item.color}`,
                ['--i' as string]: `${item.i}`,
                ['--e' as string]: `${item.e}`,
                ['--size-number' as string]: item.size,
                ['--s' as string]:
                  windowWidth < windowHeight
                    ? `${item.size}vh`
                    : `${item.size}vw`,
                width: '100%',
                height: '100%',
                minWidth: `44px`,
                minHeight: `44px`,
                maxWidth: `150px`,
                maxHeight: `150px`,
                opacity: `${
                  item.size > 6 ? `0.7` : `0.${Math.ceil(item.size + 2)}`
                }`,
              }

              return (
                // MEDIA

                <li
                  key={`${item.color}${item.size}${item.e}${index}`}
                  id={`shape${item.i}`}
                  className={`${styles.item} ${styles[location]} ${
                    styles.circles
                  } 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`}
                  style={style}
                  role={'option'}
                  tabIndex={0}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  onFocus={(e) => {
                    setActiveDescendant(e.target.id)
                  }}
                  onBlurCapture={() => {
                    setActiveDescendant(null)
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
                      windowObj,
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
                        color: `${item.color}`,
                        ['--color' as string]: `${span.color}`,
                        ['--number' as string]: `${index}`,
                      }
                      return (
                        <span key={`${item.i}-${index}`} style={style}>
                          <span className="scr">
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
              const noteStep = (item.i + item.e) % 11
              const colStep = `clamp(50px, calc((99vw - 50px) / 10), 99999px)`
              const noteHead = `40px`
              const noteOffsetPx = noteStep * composerStaffHalfStepPx
              const style: CSSProperties = {
                position: 'absolute',
                ['--size' as string]: `${itemSize}`,
                ['--note-head' as string]: `${noteHead}`,
                top: `calc(${composerStaffMidYPx}px + ${noteOffsetPx}px - ${noteHead})`,
                left: `calc(${item.i} * ${colStep} - ${noteHead})`,
                ['--highest-allowed' as string]: `calc(${composerStaffMidYPx}px + ${composerStaffHalfStepPx}px - 70px)`,
                ['--lowest-allowed' as string]: `calc(${composerStaffMidYPx}px + ${11 * composerStaffHalfStepPx}px - 50px)`,
                transitionDuration: '600ms',
                opacity: `0.7`,
              }
              const inner: CSSProperties = {
                color: `${item.color}`,
                width: '100%',
                height: '100%',
                minWidth: `40px`,
                minHeight: `40px`,
                maxWidth: `150px`,
                maxHeight: `150px`,
                borderRadius: '80% 50% 80% 50%',
              }

              return (
                // COMPOSER

                <li
                  key={`${item.color}${item.size}${item.e}${index}`}
                  id={`shape${item.i}`}
                  className={`${
                    noteStep <= 6 ? styles.above : styles.below
                  } ${styles.item} ${styles[location]} ${styles.note} 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`}
                  style={style}
                  role={'option'}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  tabIndex={0}
                  onFocus={(e) => {
                    setActiveDescendant(e.target.id)
                  }}
                  onBlurCapture={() => {
                    setActiveDescendant(null)
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
                      windowObj,
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
                          <span className="scr">
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
              const colors = [
                colorJewel[randomOfThree],
                colorJewel2[randomOfThree],
              ]
              const randomOfTwo = index % 2
              const randomBG = colors[randomOfTwo]
              const hue = hueArray[randomOfTwo]

              const style: CSSProperties = {
                position: 'absolute',
                top: `clamp(100px, calc(-5vh + calc(1.3vh * ${item.e} * ${
                  item.e / 1.5
                })), calc(80vh - 50px - ${item.size / dividedBy}vh))`,
                left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})), calc(95vw - ${item.size}vw))`,
                width:
                  windowWidth < windowHeight
                    ? `${item.size / dividedBy}vh`
                    : `${item.size / dividedBy}vw`,
                height:
                  windowWidth < windowHeight
                    ? `${item.size / dividedBy}vh`
                    : `${item.size / dividedBy}vw`,
                ['--rotate2' as string]: `-45deg`, //  `${Math.round(getRandomMinMax(-65, -25))}deg`,
                ['--color' as string]: `${randomBG}`,
                ['--hue' as string]: `${hue}`,
                transform: `rotate(-45deg)`,
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
                  key={`${item.color}${item.size}${item.e}${index}`}
                  id={`shape${item.i}`}
                  className={`${styles.item} ${styles[location]} ${
                    styles.jewel
                  } ${styles.jewel1} ${
                    randomOfTwo === 0 ? styles.blue : styles.orange
                  } ${windowHeight < windowWidth ? styles.wide : styles.tall}`}
                  style={style}
                  role={'option'}
                  tabIndex={0}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  onFocus={(e) => {
                    setActiveDescendant(e.target.id)
                  }}
                  onBlurCapture={() => {
                    setActiveDescendant(null)
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
                      windowObj,
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
                    <span className="scr">
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
              const colors = [
                colorJewel[randomOfThree],
                colorJewel2[randomOfThree],
              ]
              const randomOfTwo = index % 2
              const randomBG = colors[randomOfTwo]
              const hues = [214, 39]
              const hue = hues[randomOfTwo]

              const style: CSSProperties = {
                position: 'absolute',
                top: `clamp(100px, calc(-5vh + calc(1.1vh * ${item.e} * ${
                  item.e / 1.5
                })), calc(80vh - 50px - ${item.size / dividedBy}vh))`,
                left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})), calc(95vw - ${item.size}vw))`,
                width:
                  windowWidth < windowHeight
                    ? `${item.size / dividedBy}vh`
                    : `${item.size / dividedBy}vw`,
                height:
                  windowWidth < windowHeight
                    ? `${item.size / dividedBy}vh`
                    : `${item.size / dividedBy}vw`,
                ['--rotate2' as string]: `-23deg`,
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
                  key={`${item.color}${item.size}${item.e}${index}`}
                  id={`shape${item.i}`}
                  className={`${styles.item} ${styles[location]} ${
                    styles.jewel
                  } ${styles.jewel2} ${
                    randomOfTwo === 0 ? styles.blue : styles.orange
                  } 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`}
                  style={style}
                  role={'option'}
                  tabIndex={0}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  onFocus={(e) => {
                    setActiveDescendant(e.target.id)
                  }}
                  onBlurCapture={() => {
                    setActiveDescendant(null)
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
                      windowObj,
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
                      <span className="scr">
                        {t('Shape')} {index + 1}
                      </span>
                    </span>
                  </div>
                </li>
              )
            } else if (
              location == LOCATION.HOME ||
              location == LOCATION.JOKES ||
              location == LOCATION.SALON ||
              location == LOCATION.QUIZ ||
              location == LOCATION.ABOUT
            ) {
              const style: CSSProperties = {
                position: 'absolute',
                top: `clamp(100px, calc(-20vh + 1.2vh * ${item.e * 3} * ${
                  item.size / 6
                }), calc(80vh - 50px - calc(var(--size, 200px) * 0.8vh)))`,
                left: `clamp(1vw, calc(-5vh + ${item.i} * 1.4vw * ${item.e}), 96vw - ${item.size}vw)`,
                backgroundColor: `transparent`,
                color: `${item.color}`,
                ['--i' as string]: `${item.i}`,
                ['--e' as string]: `${item.e}`,
                ['--size' as string]: `${item.size}`,
                ['--s' as string]:
                  windowWidth < windowHeight
                    ? `${item.size}vh`
                    : `${item.size}vw`,
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
                opacity: `0.${item.size > 7 ? 7 : Math.ceil(item.size)}`,
              }

              return (
                //HOME // JOKES // SALON // QUIZ // ABOUT
                <li
                  key={`${item.color}${item.size}${item.e}${index}`}
                  className={`${styles.item} ${styles.about} ${styles.bubbles} ${
                    windowHeight < windowWidth ? styles.wide : styles.tall
                  }`}
                  style={style}
                  id={`shape${item.i}`}
                  role={'option'}
                  tabIndex={0}
                  onFocus={(e) => {
                    setActiveDescendant(e.target.id)
                  }}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  onBlurCapture={() => {
                    setActiveDescendant(null)
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
                      windowObj,
                      () => escapeFunction(),
                      () => removeItem(e),
                      () => removeItem(e),
                      null
                    )
                  }}
                >
                  <span>
                    <span className="scr">
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
                top: `clamp(100px, calc(-20% + ${item.e} * 1.4vh * ${
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
                opacity: `0.7`,
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
                  key={`${item.color}${item.size}${item.e}${index}`}
                  id={`shape${item.i}`}
                  className={`${styles.item} ${styles.blob} ${
                    styles[location]
                  } ${styles.portfolio} 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
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
                    setActiveDescendant(e.target.id)
                  }}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  onBlurCapture={(e) => {
                    Draggable.blurred(e.target)
                    setActiveDescendant(null)
                  }}
                  onKeyDown={(e) => {
                    Draggable.keyDown(
                      e,
                      e.target as HTMLElement,
                      windowObj,
                      () => escapeFunction(),
                      () => removeItem(e),
                      () => removeItem(e),
                      null
                    )
                  }}
                >
                  <span>
                    <span className="scr">
                      {t('Blob')} {index + 1}
                    </span>
                  </span>
                </li>
              )
            } else if (
              location === LOCATION.CONTACT ||
              location === LOCATION.FORM
            ) {
              // CONTACT  // FORM
              const mod = 0.6
              const style: CSSProperties = {
                position: 'absolute',
                top: `clamp(100px, calc(-5vh + calc(1.5vh * ${item.e} * ${
                  item.e / 1.9
                })), calc(80vh - 50px - calc(var(--size, 120px) * ${mod}vh)))`,
                left: `clamp(1vw, calc(-10% + calc(${item.i} * 1.4vw * ${item.e})),90vw)`,
                backgroundColor: `transparent`,
                color: `${item.color}`,
                ['--i' as string]: `${item.i}`,
                ['--e' as string]: `${item.e}`,
                ['--size' as string]: `${item.size}`,
                ['--s' as string]:
                  windowWidth < windowHeight
                    ? `${item.size}vh`
                    : `${item.size}vw`,
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
                opacity: `0.${item.size > 7 ? 7 : Math.ceil(item.size)}`,
              }
              const styleInner: CSSProperties = {
                position: 'absolute',
                backgroundColor: `transparent`,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                opacity: `0.${item.size > 7 ? 7 : Math.ceil(item.size)}`,
              }

              return (
                //CONTACT // FORM

                <li
                  key={`${item.color}${item.size}${item.e}${index}`}
                  id={`shape${item.i}`}
                  className={`eye ${styles.item} ${styles.eyes} ${styles[location]} 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`}
                  style={style}
                  role={'option'}
                  tabIndex={0}
                  onFocus={(e) => {
                    setActiveDescendant(e.target.id)
                  }}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  onBlurCapture={() => {
                    setActiveDescendant(null)
                  }}
                  // onPointerEnter={e => movingItem(e)}
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
                      windowObj,
                      () => escapeFunction(),
                      () => removeItem(e),
                      () => removeItem(e),
                      null
                    )
                  }}
                >
                  <div style={styleInner} className={`inner ${styles.inner}`}>
                    <span className="else-eye">
                      <span className="scr">
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
                top: `clamp(100px, calc(-5vh + calc(1.2vh * ${item.e} * ${
                  item.e / 1.3
                })), calc(80vh - 50px - ${item.size / 1.3}vh))`,
                left: `clamp(1vw, calc(-10vw + ${item.i} * 1.3vw * ${item.e}), calc(95vw - ${item.size}vw))`,
                width: 0,
                height: 0,
                opacity: `0.${item.size > 5 ? 5 : Math.ceil(item.size)}`,
              }
              return (
                // ELSE

                <li
                  key={`${item.color}${item.size}${item.e}${index}`}
                  id={`shape${item.i}`}
                  className={`${styles.item} ${styles[location]} ${styles.triangle} 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`}
                  style={style}
                  role={'option'}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  tabIndex={0}
                  onFocus={(e) => {
                    setActiveDescendant(e.target.id)
                  }}
                  onBlurCapture={() => {
                    setActiveDescendant(null)
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
                      windowObj,
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
                        <span className="scr">
                          {t('Shape')} {index + 1}
                        </span>
                      </span>
                    )
                  })}
                </li>
              )
            }
          })}

          <svg className="filter">
            <filter id="svgfilterHero">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
              <feColorMatrix
                values="
                                1 0 0 0 0 
                                0 1 0 0 0 
                                0 0 1 0 0
                                0 0 0 37 -10
                                "
              ></feColorMatrix>
            </filter>
          </svg>
        </ul>
      </>
    )
  }
)

ItemComponent.displayName = 'ItemComponent'

export default ItemComponent
