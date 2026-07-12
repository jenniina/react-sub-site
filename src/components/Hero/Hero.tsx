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
import styles from './hero.module.css'
import useWindowSize from '../../hooks/useWindowSize'
import {
  calculateLuminance,
  getContrastRatio,
  getRandomMinMax,
  hslToHex,
  hexToRGB,
} from '../../utils'
import * as Draggable from '../../hooks/useDraggable'
import { useTheme } from '../../hooks/useTheme'
import useEnterDirection from '../../hooks/useEnterDirection'
import { RefObject } from '../../types'
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
  label?: string
  group?: 'primary' | 'secondary'
  xPercent?: number
  yPercent?: number
}

export default function Hero({
  heading,
  address,
  text,
  reset,
  instructions,
  pathname,
}: {
  heading: string
  address: string
  text: string
  reset?: string
  instructions?: string
  pathname: string
}) {
  const { calculateDirection } = useEnterDirection()
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t } = useLanguageContext()

  const [values, setValues] = useState<itemProps[]>([])
  const [itemsVisible, setItemsVisible] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [resetVersion, setResetVersion] = useState(0)
  const initialPage = pathname?.replace(/\/$/, '').split('/').pop() ?? ''
  const [currentPage, setCurrentPage] = useState(initialPage)
  const isAnimatingRef = useRef(false)
  const itemsVisibleRef = useRef(itemsVisible)
  const [theHeading, setTheHeading] = useState(heading)
  const [theText, setTheText] = useState(text)

  // remove the last trailing / then get the last part of the pathname:
  const page = useMemo(() => {
    return pathname?.replace(/\/$/, '').split('/').pop() ?? ''
  }, [pathname])

  // Handle page transition for hero items
  useEffect(() => {
    if (page !== currentPage) {
      // Fade out items when page changes
      setItemsVisible(false)
      setHeaderVisible(false)

      // Wait for fade out to complete, then atomically swap page + copy,
      // and only then fade the new ones in.
      const timer = setTimeout(() => {
        setCurrentPage(page)
        setTheHeading(heading)
        setTheText(text)

        // Ensure the DOM has applied the new location/copy before we fade in.
        requestAnimationFrame(() => {
          setItemsVisible(true)
          setHeaderVisible(true)
        })
      }, 400)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [page, currentPage, heading, text])

  // Update heading and text when language changes (on same page)
  useEffect(() => {
    if (page === currentPage) {
      setTheHeading(heading)
      setTheText(text)
    }
  }, [heading, text, page, currentPage])

  const resetButton = useRef() as RefObject<HTMLButtonElement>
  const ulRef = useRef<HTMLUListElement>(null)
  const heroItemRefs = useRef(new Map<number, HTMLLIElement>())
  const stackedDocumentIdsRef = useRef(new Set<number>())
  const eyeInnerRefs = useRef(new Map<number, HTMLDivElement>())
  const [eyeRotations, setEyeRotations] = useState<Record<number, number>>({})
  const [movementOffsets, setMovementOffsets] = useState<
    Record<number, { dx: number; dy: number }>
  >({})
  const [exitingItemIds, setExitingItemIds] = useState<Record<number, boolean>>(
    {}
  )
  const [activeTouchItemIds, setActiveTouchItemIds] = useState<
    Record<number, boolean>
  >({})
  const movementOffsetsRef = useRef<Record<number, { dx: number; dy: number }>>(
    {}
  )
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useLocalStorage<boolean>('prefersReducedMotion-Hero', false)
  const isMovingRef = useRef(false)
  const movementTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animatingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const movementCycleStartedRef = useRef(false)
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const revealAfterResetRef = useRef(false)

  const registerHeroItem = useCallback(
    (itemId: number, node: HTMLLIElement | null, isStackedDocument = false) => {
      if (node) {
        heroItemRefs.current.set(itemId, node)
      } else {
        heroItemRefs.current.delete(itemId)
      }

      if (isStackedDocument) {
        stackedDocumentIdsRef.current.add(itemId)
      } else {
        stackedDocumentIdsRef.current.delete(itemId)
      }
    },
    []
  )

  const registerEyeInner = useCallback(
    (itemId: number, node: HTMLDivElement | null) => {
      if (node) {
        eyeInnerRefs.current.set(itemId, node)
      } else {
        eyeInnerRefs.current.delete(itemId)
      }
    },
    []
  )

  const escapeFunction = () => {
    if (resetButton.current) resetButton.current.focus()
  }

  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }
    if (movementTimeoutRef.current) {
      clearTimeout(movementTimeoutRef.current)
      movementTimeoutRef.current = null
    }
    if (animatingTimeoutRef.current) {
      clearTimeout(animatingTimeoutRef.current)
      animatingTimeoutRef.current = null
    }
    isAnimatingRef.current = false
    isMovingRef.current = false
    movementCycleStartedRef.current = false
    setItemsVisible(false)
    setValues([])
    setMovementOffsets({})
    setEyeRotations({})
    setExitingItemIds({})
    setActiveTouchItemIds({})

    resetTimeoutRef.current = setTimeout(() => {
      revealAfterResetRef.current = true
      setReinitialize((prev) => !prev)
      setResetVersion((prev) => prev + 1)
      resetTimeoutRef.current = null
    }, 160)
  }

  useEffect(() => {
    itemsVisibleRef.current = itemsVisible
  }, [itemsVisible])

  useEffect(() => {
    // Timers and callbacks read this ref to avoid stale movement offsets.
    movementOffsetsRef.current = movementOffsets
  }, [movementOffsets])

  useEffect(() => {
    if (!revealAfterResetRef.current) return
    if (values.length === 0) return

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setItemsVisible(true)
        revealAfterResetRef.current = false
      })
    })
  }, [values])

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

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

  const getDirectionDelta = (direction: number, step: number, jump: number) => {
    // Convert a random direction index into x/y movement amounts.
    switch (direction) {
      case 0:
        return { dx: 0, dy: jump }
      case 1:
        return { dx: 0, dy: -jump }
      case 2:
        return { dx: jump, dy: 0 }
      case 3:
        return { dx: -jump, dy: 0 }
      case 4:
        return { dx: step, dy: step }
      case 5:
        return { dx: -step, dy: step }
      case 6:
        return { dx: step, dy: -step }
      case 7:
        return { dx: -step, dy: -step }
      default:
        return { dx: 0, dy: 0 }
    }
  }

  // Move an item randomly
  useEffect(() => {
    if (!isClient || !windowObj) return

    if (prefersReducedMotion) return // Don't move items if user prefers reduced motion

    const MOVE_TRANSITION_MS = 900 // allow CSS transition to finish (approx 800ms), buffer a bit

    const scheduleNext = (delayMs: number) => {
      if (movementTimeoutRef.current) {
        clearTimeout(movementTimeoutRef.current)
      }
      movementTimeoutRef.current = setTimeout(moveItem, delayMs)
    }

    const moveItem = () => {
      // Clear the timeout ref since we're executing now
      movementTimeoutRef.current = null

      // don't move items if they are hidden or already animating
      if (!itemsVisibleRef.current) {
        scheduleNext(Math.round(getRandomMinMax(1000, 2000)))
        return
      }

      if (isAnimatingRef.current) {
        scheduleNext(Math.round(getRandomMinMax(1000, 2000)))
        return
      }
      const allItems = Array.from(heroItemRefs.current.entries())
      const items =
        page === 'draganddrop'
          ? allItems.filter(
              ([itemId]) => !stackedDocumentIdsRef.current.has(itemId)
            )
          : allItems

      if (items.length === 0) {
        // Re-try shortly; refs/eligibility can be transient during rerenders.
        scheduleNext(Math.round(getRandomMinMax(1000, 2000)))
        return
      }

      const randomIndex = Math.floor(Math.random() * items.length)
      const [itemId, item] = items[randomIndex]

      if (item) {
        const computedTopPx = Number.parseFloat(
          windowObj.getComputedStyle(item).getPropertyValue('top')
        )
        const computedLeftPx = Number.parseFloat(
          windowObj.getComputedStyle(item).getPropertyValue('left')
        )
        const currentTopPx = Number.isFinite(computedTopPx) ? computedTopPx : 0
        const currentLeftPx = Number.isFinite(computedLeftPx)
          ? computedLeftPx
          : 0
        const itemWidth = item.offsetWidth
        const itemHeight = item.offsetHeight
        const windowWidth = windowObj.innerWidth
        const windowHeight = windowObj.innerHeight

        // Choose a random direction
        const direction = Math.floor(Math.random() * 8)
        const composerHalfStepPx = Math.round(
          page === 'composer' ? cssVarToPx('--staff-half-step', item) : 0
        )
        const change = page === 'composer' ? composerHalfStepPx : 10
        const changeBigger = page === 'composer' ? composerHalfStepPx * 2 : 16
        const delta = getDirectionDelta(direction, change, changeBigger)
        const deltaDy = delta.dy
        const deltaDx = delta.dx

        let didMove = false
        const newTopPx = currentTopPx + deltaDy
        const newLeftPx = currentLeftPx + deltaDx
        // Check if the page is composer and limit movement to how high the highest item is placed and the lowest the items can be placed
        if (page === 'composer') {
          // The CSS variables are set on the item elements in the composer layout
          // (see ItemComponent), so resolve them against the moved `item`.
          const highestAllowedPx = cssVarToPx('--highest-allowed', item)
          const lowestAllowedPx = cssVarToPx('--lowest-allowed', item)

          if (
            newTopPx >= highestAllowedPx &&
            newTopPx + itemHeight <= lowestAllowedPx &&
            newLeftPx >= 0 &&
            newLeftPx + itemWidth <= windowWidth
          ) {
            setMovementOffsets((previousOffsets) => {
              const previous = previousOffsets[itemId] ?? { dx: 0, dy: 0 }
              return {
                ...previousOffsets,
                [itemId]: {
                  dx: previous.dx + deltaDx,
                  dy: previous.dy + deltaDy,
                },
              }
            })
            didMove = true
          }
        }

        // Check if the new position is within the allowed boundaries
        else if (
          newTopPx >= 100 &&
          newTopPx + itemHeight <= windowHeight * 0.6 &&
          newLeftPx >= 0 &&
          newLeftPx + itemWidth <= windowWidth
        ) {
          setMovementOffsets((previousOffsets) => {
            const previous = previousOffsets[itemId] ?? { dx: 0, dy: 0 }
            return {
              ...previousOffsets,
              [itemId]: {
                dx: previous.dx + deltaDx,
                dy: previous.dy + deltaDy,
              },
            }
          })
          didMove = true
        }

        // Only mark as animating when we actually applied a move.
        if (didMove) {
          isAnimatingRef.current = true
          if (animatingTimeoutRef.current) {
            clearTimeout(animatingTimeoutRef.current)
          }
          animatingTimeoutRef.current = setTimeout(() => {
            isAnimatingRef.current = false
            animatingTimeoutRef.current = null
          }, MOVE_TRANSITION_MS)
        }
      }

      // Schedule next movement with random delay
      // schedule next move after transition + random delay
      scheduleNext(Math.round(getRandomMinMax(3000, 6000)) + MOVE_TRANSITION_MS)
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

      if (animatingTimeoutRef.current) {
        clearTimeout(animatingTimeoutRef.current)
        animatingTimeoutRef.current = null
      }

      isMovingRef.current = false
      movementCycleStartedRef.current = false
    }
  }, [prefersReducedMotion, isClient, page, windowObj]) // eslint-disable-line react-hooks/exhaustive-deps

  //Move items up, down, left or left, depending on the direction they're approached from:
  const movingItem = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!isClient || !windowObj) return

      const target = (e.target as HTMLElement).closest(
        'li'
      ) as HTMLElement | null
      if (!target) return
      const itemId = Number.parseInt(target.id.replace('shape', ''), 10)
      if (!Number.isFinite(itemId)) return

      const amount =
        page === 'composer'
          ? Math.round(cssVarToPx('--staff-half-step', target))
          : 10

      const from = calculateDirection(e)
      let delta = { dx: 0, dy: 0 }
      switch (from) {
        case 'top':
          delta = { dx: 0, dy: amount }
          break
        case 'right':
          delta = { dx: -amount, dy: 0 }
          break
        case 'bottom':
          delta = { dx: 0, dy: -amount }
          break
        case 'left':
          delta = { dx: amount, dy: 0 }
          break
        default:
          break
      }

      const computedTopPx = Number.parseFloat(
        windowObj.getComputedStyle(target).getPropertyValue('top')
      )
      const computedLeftPx = Number.parseFloat(
        windowObj.getComputedStyle(target).getPropertyValue('left')
      )
      const currentTopPx = Number.isFinite(computedTopPx) ? computedTopPx : 0
      const currentLeftPx = Number.isFinite(computedLeftPx) ? computedLeftPx : 0

      const newTopPx = currentTopPx + delta.dy
      const newLeftPx = currentLeftPx + delta.dx
      const itemWidth = target.offsetWidth
      const itemHeight = target.offsetHeight
      const windowWidth = windowObj.innerWidth
      const windowHeight = windowObj.innerHeight

      let canMove = false
      if (page === 'composer') {
        const highestAllowedPx = cssVarToPx('--highest-allowed', target)
        const lowestAllowedPx = cssVarToPx('--lowest-allowed', target)
        canMove =
          newTopPx >= highestAllowedPx &&
          newTopPx + itemHeight <= lowestAllowedPx &&
          newLeftPx >= 0 &&
          newLeftPx + itemWidth <= windowWidth
      } else {
        canMove =
          newTopPx >= 100 &&
          newTopPx + itemHeight <= windowHeight * 0.6 &&
          newLeftPx >= 0 &&
          newLeftPx + itemWidth <= windowWidth
      }

      if (canMove) {
        setMovementOffsets((previousOffsets) => {
          const previous = previousOffsets[itemId] ?? { dx: 0, dy: 0 }
          return {
            ...previousOffsets,
            [itemId]: {
              dx: previous.dx + delta.dx,
              dy: previous.dy + delta.dy,
            },
          }
        })
      }
    },
    [calculateDirection, isClient, page, windowObj]
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
      if (page !== 'contact' && page !== 'form') {
        setEyeRotations({})
        return
      }

      const eyes = Array.from(eyeInnerRefs.current.values())
      if (eyes.length > 0) {
        const nextRotations: Record<number, number> = {}
        eyes.forEach((eye) => {
          const itemId = Number.parseInt(eye.dataset.itemId ?? '', 10)
          if (!Number.isFinite(itemId)) return
          const rect = eye.getBoundingClientRect()
          const x = rect.left + rect.width / 2
          const y = rect.top + rect.height / 2
          const rotation = radianToAngle(
            (e as PointerEvent).clientX,
            (e as PointerEvent).clientY,
            x,
            y
          )
          nextRotations[itemId] = rotation
        })

        setEyeRotations(nextRotations)
      } else {
        setEyeRotations({})
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
    const id = element.id
    const itemId = Number.parseInt(id.replace('shape', ''), 10)
    if (!Number.isFinite(itemId)) return

    const removeAfterExit = () => {
      // Mark item as exiting, then remove it after CSS exit animation time.
      setExitingItemIds((previous) => ({
        ...previous,
        [itemId]: true,
      }))

      setTimeout(() => {
        setValues((previousValues) =>
          previousValues.filter((item) => item.i !== itemId)
        )
        setExitingItemIds((previous) => {
          const next = { ...previous }
          delete next[itemId]
          return next
        })
        setActiveTouchItemIds((previous) => {
          const next = { ...previous }
          delete next[itemId]
          return next
        })
      }, 400)
    }

    if (!touchDevice) {
      removeAfterExit()
    } else {
      // On touch devices: first tap arms the item, second tap removes it.
      if (activeTouchItemIds[itemId]) {
        removeAfterExit()
      } else {
        setActiveTouchItemIds((previous) => ({
          ...previous,
          [itemId]: true,
        }))
        setTimeout(() => {
          setActiveTouchItemIds((previous) => {
            if (!previous[itemId]) return previous
            const next = { ...previous }
            delete next[itemId]
            return next
          })
        }, 1200)
      }
    }
  }

  useEffect(() => {
    // Drop flags for items that no longer exist in values.
    const currentIds = new Set(values.map((item) => item.i))
    setExitingItemIds((previous) => {
      const next = Object.fromEntries(
        Object.entries(previous).filter(([key]) => currentIds.has(Number(key)))
      ) as Record<number, boolean>
      return next
    })
    setActiveTouchItemIds((previous) => {
      const next = Object.fromEntries(
        Object.entries(previous).filter(([key]) => currentIds.has(Number(key)))
      ) as Record<number, boolean>
      return next
    })
  }, [values])

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

  const siteHues = useMemo(
    () => ({
      primary: 216,
      secondary: 36,
    }),
    []
  )

  const colorConstellationItems = useMemo<itemProps[]>(() => {
    type RandomRecipe = {
      hue: number
      saturation: [number, number]
      lightness: [number, number]
    }

    type FixedRecipe = {
      hue: number
      saturation: number
      lightness: number
    }

    const shuffleArray = <T,>(items: T[]) => {
      const next = [...items]
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[next[i], next[j]] = [next[j], next[i]]
      }
      return next
    }

    const positions = [
      { xPercent: getRandomMinMax(7, 14), yPercent: getRandomMinMax(18, 28) },
      { xPercent: getRandomMinMax(19, 39), yPercent: getRandomMinMax(37, 50) },
      { xPercent: getRandomMinMax(40, 52), yPercent: getRandomMinMax(20, 32) },
      { xPercent: getRandomMinMax(56, 66), yPercent: getRandomMinMax(40, 55) },
      { xPercent: getRandomMinMax(80, 92), yPercent: getRandomMinMax(30, 44) },
      { xPercent: getRandomMinMax(16, 26), yPercent: getRandomMinMax(65, 79) },
      { xPercent: getRandomMinMax(74, 82), yPercent: getRandomMinMax(74, 86) },
    ]

    const recipes: RandomRecipe[] = [
      { hue: siteHues.primary, saturation: [72, 88], lightness: [9, 14] },
      { hue: siteHues.primary, saturation: [28, 70], lightness: [78, 80] },
      { hue: siteHues.primary, saturation: [34, 84], lightness: [22, 28] },
      { hue: siteHues.primary, saturation: [38, 88], lightness: [36, 43] },
      { hue: siteHues.secondary, saturation: [68, 90], lightness: [55, 61] },
      { hue: siteHues.secondary, saturation: [76, 94], lightness: [67, 73] },
      { hue: siteHues.secondary, saturation: [72, 98], lightness: [80, 90] },
    ]

    const fallbackRecipeValues: FixedRecipe[] = [
      { hue: siteHues.primary, saturation: 50, lightness: 14 },
      { hue: siteHues.primary, saturation: 38, lightness: 27 },
      { hue: siteHues.primary, saturation: 34, lightness: 40 },
      { hue: siteHues.secondary, saturation: 85, lightness: 58 },
      { hue: siteHues.primary, saturation: 34, lightness: 90 },
      { hue: siteHues.secondary, saturation: 90, lightness: 70 },
      { hue: siteHues.secondary, saturation: 50, lightness: 88 },
    ]

    const hasAllContrastTiers = (items: itemProps[]) => {
      let hasUI = false
      let hasAA = false
      let hasAAA = false

      const luminances = items.map((item) => {
        const rgb = hexToRGB(item.label ?? item.color)
        return calculateLuminance(rgb.r, rgb.g, rgb.b)
      })

      for (let i = 0; i < luminances.length; i++) {
        for (let j = i + 1; j < luminances.length; j++) {
          const ratio = getContrastRatio(luminances[i], luminances[j])
          if (ratio >= 7) hasAAA = true
          else if (ratio >= 4.5) hasAA = true
          else if (ratio >= 3) hasUI = true
        }
      }

      return hasUI && hasAA && hasAAA
    }

    const buildItem = (
      recipe: RandomRecipe | FixedRecipe,
      index: number
    ): itemProps => {
      const saturation = Array.isArray(recipe.saturation)
        ? Math.round(
            getRandomMinMax(recipe.saturation[0], recipe.saturation[1])
          )
        : recipe.saturation
      const lightness = Array.isArray(recipe.lightness)
        ? Math.round(getRandomMinMax(recipe.lightness[0], recipe.lightness[1]))
        : recipe.lightness

      const color = `hsl(${recipe.hue}, ${saturation}%, ${lightness}%)`

      return {
        i: index + 1,
        e: Math.round(getRandomMinMax(6, 9)),
        size: Math.round(getRandomMinMax(1, 6)),
        color,
        label: hslToHex(recipe.hue, saturation, lightness),
        xPercent: positions[index].xPercent,
        yPercent: positions[index].yPercent,
      }
    }

    for (let attempt = 0; attempt < 40; attempt++) {
      const randomizedRecipes = shuffleArray(recipes)
      const candidateItems = randomizedRecipes.map((recipe, index) =>
        buildItem(recipe, index)
      )
      if (hasAllContrastTiers(candidateItems)) {
        return candidateItems
      }
    }

    return shuffleArray(fallbackRecipeValues).map((recipe, index) =>
      buildItem(recipe, index)
    )
  }, [reinitialize, siteHues, thresholdCrossed])

  useEffect(() => {
    if (page === 'colors') {
      setValues(colorConstellationItems)
      return
    }

    if (page === 'draganddrop') {
      const dndGroups = [
        { group: 'primary' as const, shadeMin: 8, shadeMax: 12 },
        { group: 'secondary' as const, shadeMin: 9, shadeMax: 12 },
      ]

      let nextId = 1
      const dndItems = dndGroups.flatMap(({ group, shadeMin, shadeMax }) => {
        const documentCount = Math.max(3, Math.round(getRandomMinMax(3, 7)))

        return Array.from({ length: documentCount }, () => {
          const item = {
            i: nextId,
            e: Math.round(getRandomMinMax(4, 9)),
            size: 10,
            color: `var(--color-${group}-${Math.round(
              getRandomMinMax(shadeMin, shadeMax)
            )})`,
            group,
          }

          nextId += 1
          return item
        })
      })

      setValues(dndItems)
      return
    }

    const items: itemProps[] = []
    const specialSizesCount = Math.ceil(getRandomMinMax(1.1, 3))
    const specialIndices = new Set<number>()

    // Generate unique random indices for special sizes
    while (specialIndices.size < specialSizesCount) {
      specialIndices.add(Math.floor(getRandomMinMax(0, amount)))
    }

    for (let i = 0; i <= amount; i++) {
      const number = Math.ceil(getRandomMinMax(0.4, 2))
      let colorSwitch: string
      switch (number) {
        case 1:
          colorSwitch = `var(--color-secondary-${Math.round(
            getRandomMinMax(9, 12)
          )})`
          break
        case 2:
          colorSwitch = `var(--color-primary-${Math.round(
            getRandomMinMax(10, 13)
          )})`
          break
        default:
          colorSwitch = `var(--color-primary-${Math.round(
            getRandomMinMax(10, 13)
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
  }, [amount, colorConstellationItems, page, reinitialize, thresholdCrossed]) // eslint-disable-line react-hooks/exhaustive-deps

  // Convert a CSS variable (including calc, vh, vw, etc.) to pixels in a
  // client-only, SSR-safe way. Returns 0 during server-side rendering.
  function cssVarToPx(varName: string, contextEl?: Element | null) {
    // Guard for SSR: window/document are not available on the server
    if (typeof window === 'undefined' || typeof document === 'undefined')
      return 0

    const el = contextEl ?? document.documentElement
    const val = window.getComputedStyle(el).getPropertyValue(varName).trim()
    if (!val) return 0
    if (val.endsWith('px')) return parseFloat(val)

    const tmp = document.createElement('div')
    tmp.style.position = 'absolute'
    tmp.style.visibility = 'hidden'
    tmp.style.top = val // could be 'calc(...)' or 'var(--...)'
    document.body.appendChild(tmp)
    const px = parseFloat(window.getComputedStyle(tmp).top) || 0
    document.body.removeChild(tmp)
    return px
  }

  return (
    <div
      className={`
        ${lightTheme ? styles.light : ''} 
        ${touchDevice ? styles.touch : ''} 
        hero fullwidth ${styles.hero} ${styles[address]} ${headerVisible ? styles['header-visible'] : styles['header-hidden']}`}
    >
      {/* Always render heading and text for SSR, then on client */}
      <h1>
        <span data-text={theHeading}>{theHeading}</span>
      </h1>
      <p>{theText}</p>
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

      <ItemComponent
        ref={ulRef}
        array={values}
        movementOffsets={movementOffsets}
        eyeRotations={eyeRotations}
        exitingItemIds={exitingItemIds}
        activeTouchItemIds={activeTouchItemIds}
        location={currentPage}
        resetVersion={resetVersion}
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
        prefersReducedMotion={prefersReducedMotion}
        lightTheme={lightTheme}
        registerHeroItem={registerHeroItem}
        registerEyeInner={registerEyeInner}
      />

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
