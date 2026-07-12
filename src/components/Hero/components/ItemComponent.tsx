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
  useCallback,
  useRef,
} from 'react'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import ContrastConstellation from './ContrastConstellation'

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
  COLORS: 'colors',
}

function getHeroItemKey(
  location: string,
  itemId: number,
  resetVersion: number
) {
  return `${location || 'home'}-${resetVersion}-${itemId}`
}

interface ItemComponentProps {
  array: itemProps[]
  movementOffsets: Record<number, { dx: number; dy: number }>
  eyeRotations: Record<number, number>
  exitingItemIds: Record<number, boolean>
  activeTouchItemIds: Record<number, boolean>
  location: string
  resetVersion: number
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
  prefersReducedMotion: boolean
  lightTheme: boolean
  registerHeroItem: (
    itemId: number,
    node: HTMLLIElement | null,
    isStackedDocument?: boolean
  ) => void
  registerEyeInner: (itemId: number, node: HTMLDivElement | null) => void
}

type DndDocumentGroup = 'primary' | 'secondary'

interface DndDocumentState {
  left: number
  top: number
  leftRatio: number
  topRatio: number
  zOrder: number
  group: DndDocumentGroup
  stackId: string
  stackIndex: number
}

interface DndDragState {
  pointerId: number
  anchorId: number
  anchorLeft: number
  anchorTop: number
  startPointerX: number
  startPointerY: number
  memberIds: number[]
  memberOffsets: Record<number, { left: number; top: number }>
}

interface DndRect {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
}

const ItemComponent = forwardRef<
  HTMLUListElement,
  Omit<ItemComponentProps, 'ulRef'>
>(
  (
    {
      array,
      movementOffsets,
      eyeRotations,
      exitingItemIds,
      activeTouchItemIds,
      location,
      resetVersion,
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
      prefersReducedMotion,
      lightTheme,
      registerHeroItem,
      registerEyeInner,
    },
    ref
  ) => {
    const { t } = useLanguageContext()
    const ulRef = ref as RefObject<HTMLUListElement>

    const [activeDescendant, setActiveDescendant] = useState<string | null>(
      null
    )
    const [activeBlobDragIds, setActiveBlobDragIds] = useState<
      Record<number, boolean>
    >({})
    const isDnd = location === LOCATION.DND
    const dndDocumentWidth = Math.round(
      Math.max(46, Math.min(64, windowWidth * 0.13))
    )
    const dndDocumentHeight = Math.round(dndDocumentWidth * 1.414)
    const dndStackOffsetX = Math.round(dndDocumentWidth * 0.11)
    const dndStackOffsetY = Math.round(dndDocumentHeight * 0.08)
    const dndDocumentSnapWidth = Math.round(dndDocumentWidth * 0.5)
    const dndDocumentSnapHeight = Math.max(
      14,
      Math.round(dndDocumentHeight * 0.5)
    )
    const dndDocumentSnapInsetLeft = Math.max(
      10,
      Math.round(dndDocumentWidth * 0.1)
    )
    const [dndDocuments, setDndDocuments] = useState<
      Record<number, DndDocumentState>
    >({})
    const [activeDndStackId, setActiveDndStackId] = useState<string | null>(
      null
    )
    const dndDragRef = useRef<DndDragState | null>(null)
    const dndSeedKeyRef = useRef<string | null>(null)
    const dndSplitVersionRef = useRef(0)
    const dndZOrderRef = useRef(0)
    const dndItemEls = useRef(new Map<number, HTMLLIElement>())
    const dndKeyTapRef = useRef<{
      itemId: number | null
      key: 'Enter' | ' '
      timestamp: number
    }>({ itemId: null, key: 'Enter', timestamp: 0 })

    const isComposer = location === LOCATION.COMPOSER

    const withMovementOffset = useCallback(
      (itemId: number, baseStyle: CSSProperties): CSSProperties => {
        // Apply movement from Hero state by adjusting top/left (no DOM writes).
        const offset = movementOffsets[itemId]
        if (!offset) return baseStyle

        const existingTransitionProperty =
          typeof baseStyle.transitionProperty === 'string'
            ? baseStyle.transitionProperty
            : 'top, left'
        const transitionIncludesPosition =
          existingTransitionProperty.includes('top') ||
          existingTransitionProperty.includes('left') ||
          existingTransitionProperty.includes('all')
        const transitionProperty = transitionIncludesPosition
          ? existingTransitionProperty
          : existingTransitionProperty
            ? `${existingTransitionProperty}, top, left`
            : 'top, left'

        const currentTop = baseStyle.top
        const currentLeft = baseStyle.left

        const nextTop =
          currentTop == null
            ? `${offset.dy}px`
            : typeof currentTop === 'number'
              ? `${currentTop + offset.dy}px`
              : `calc(${currentTop} + ${offset.dy}px)`

        const nextLeft =
          currentLeft == null
            ? `${offset.dx}px`
            : typeof currentLeft === 'number'
              ? `${currentLeft + offset.dx}px`
              : `calc(${currentLeft} + ${offset.dx}px)`

        return {
          ...baseStyle,
          top: nextTop,
          left: nextLeft,
          transitionProperty,
          transitionDuration: baseStyle.transitionDuration ?? '420ms',
          transitionTimingFunction:
            baseStyle.transitionTimingFunction ?? 'ease-in-out',
        }
      },
      [movementOffsets]
    )

    const withInteractionClass = useCallback(
      (baseClassName: string, itemId: number) => {
        // Build className from state flags instead of classList add/remove.
        return `${baseClassName} ${exitingItemIds[itemId] ? styles.exitItem : ''} ${activeTouchItemIds[itemId] ? styles.active : ''}`.trim()
      },
      [activeTouchItemIds, exitingItemIds]
    )
    const composerStaffWidth = 200
    const composerStaffSvgWidth = 640
    const composerStaffFirstLineY = 3.9
    const composerStaffLineGap = 118.1
    const composerNoteSteps = 9
    // Use the same numeric value everywhere (CSS + JS) to avoid disagreement
    // when evaluating clamp()/calc() expressions.
    const composerStaffMidYPx = Math.min(
      1000,
      Math.max(100, windowHeight * 0.44)
    )
    const composerStaffMidY = `${composerStaffMidYPx}px`
    const composerStaffScale = composerStaffWidth / composerStaffSvgWidth
    const composerStaffAnchorYPx =
      composerStaffMidYPx + composerStaffFirstLineY * composerStaffScale
    // Keep these as concrete px values so JS/CSS parsing stays consistent.
    const composerStaffHalfStepPx =
      (composerStaffLineGap * composerStaffScale) / 2
    const composerStaffHalfStep = `${composerStaffHalfStepPx}px`

    const cloneDndDocuments = (state: Record<number, DndDocumentState>) => {
      return Object.fromEntries(
        Object.entries(state).map(([id, document]) => [
          Number(id),
          { ...document },
        ])
      ) as Record<number, DndDocumentState>
    }

    const getDndStackDocumentMembers = (
      state: Record<number, DndDocumentState>,
      stackId: string
    ) => {
      return Object.entries(state)
        .filter(([, document]) => document.stackId === stackId)
        .map(([id, document]) => ({ id: Number(id), document }))
        .sort(
          (a, b) => a.document.stackIndex - b.document.stackIndex || a.id - b.id
        )
        .map(({ id }) => id)
    }

    const getDndStackDocumentBounds = (
      state: Record<number, DndDocumentState>,
      stackId: string
    ): DndRect | null => {
      const memberIds = getDndStackDocumentMembers(state, stackId)
      if (memberIds.length === 0) return null

      const members = memberIds
        .map((memberId) => state[memberId])
        .filter((member): member is DndDocumentState => Boolean(member))

      const left = Math.min(...members.map((member) => member.left))
      const top = Math.min(...members.map((member) => member.top))
      const right = Math.max(
        ...members.map((member) => member.left + dndDocumentWidth)
      )
      const bottom = Math.max(
        ...members.map((member) => member.top + dndDocumentHeight)
      )

      return {
        left,
        top,
        right,
        bottom,
        width: right - left,
        height: bottom - top,
      }
    }

    const getDndDocumentSnapRect = useCallback(
      (left: number, top: number): DndRect => {
        const snapLeft = left + dndDocumentSnapInsetLeft
        const snapTop = top
        return {
          left: snapLeft,
          top: snapTop,
          right: snapLeft + dndDocumentSnapWidth,
          bottom: snapTop + dndDocumentSnapHeight,
          width: dndDocumentSnapWidth,
          height: dndDocumentSnapHeight,
        }
      },
      [dndDocumentSnapHeight, dndDocumentSnapInsetLeft, dndDocumentSnapWidth]
    )

    const getDndStackDocumentSnapBounds = (
      state: Record<number, DndDocumentState>,
      stackId: string
    ): DndRect | null => {
      const memberIds = getDndStackDocumentMembers(state, stackId)
      const latestId = memberIds[memberIds.length - 1]
      if (!latestId) return null
      const latestDocument = state[latestId]
      if (!latestDocument) return null
      return getDndDocumentSnapRect(latestDocument.left, latestDocument.top)
    }

    const getRectOverlap = (rectA: DndRect | null, rectB: DndRect | null) => {
      if (!rectA || !rectB) return 0

      const overlapWidth =
        Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left)
      const overlapHeight =
        Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top)

      if (overlapWidth <= 0 || overlapHeight <= 0) return 0
      return overlapWidth * overlapHeight
    }

    const getDndStackDocumentOverlap = (
      state: Record<number, DndDocumentState>,
      stackIdA: string,
      stackIdB: string
    ) => {
      return getRectOverlap(
        getDndStackDocumentBounds(state, stackIdA),
        getDndStackDocumentBounds(state, stackIdB)
      )
    }

    const getDndStackDocumentSnapOverlap = (
      state: Record<number, DndDocumentState>,
      stackIdA: string,
      stackIdB: string
    ) => {
      return getRectOverlap(
        getDndStackDocumentSnapBounds(state, stackIdA),
        getDndStackDocumentSnapBounds(state, stackIdB)
      )
    }

    const getNearestDndStackGap = (
      state: Record<number, DndDocumentState>,
      stackIdA: string,
      stackIdB: string
    ) => {
      const boundsA = getDndStackDocumentBounds(state, stackIdA)
      const boundsB = getDndStackDocumentBounds(state, stackIdB)
      if (!boundsA || !boundsB) return Number.POSITIVE_INFINITY

      const horizontalGap = Math.max(
        0,
        Math.max(boundsA.left - boundsB.right, boundsB.left - boundsA.right)
      )
      const verticalGap = Math.max(
        0,
        Math.max(boundsA.top - boundsB.bottom, boundsB.top - boundsA.bottom)
      )

      return Math.hypot(horizontalGap, verticalGap)
    }

    const getDndAnchorBounds = useCallback(
      (count: number) => {
        const root = ulRef?.current
        const width = root?.clientWidth ?? windowWidth
        const height = root?.clientHeight ?? Math.max(windowHeight * 0.8, 320)
        const minLeft = 12
        const minTop = Math.max(96, Math.round(height * 0.16))
        const maxLeft = Math.max(
          minLeft,
          width -
            dndDocumentWidth -
            12 -
            dndStackOffsetX * Math.max(0, count - 1)
        )
        const maxTop = Math.max(
          minTop,
          height -
            dndDocumentHeight -
            12 -
            dndStackOffsetY * Math.max(0, count - 1)
        )

        return {
          minLeft,
          minTop,
          maxLeft,
          maxTop,
        }
      },
      [
        dndDocumentHeight,
        dndDocumentWidth,
        dndStackOffsetX,
        dndStackOffsetY,
        ulRef,
        windowHeight,
        windowWidth,
      ]
    )

    const getRelativeValue = (value: number, min: number, max: number) => {
      if (max <= min) return 0
      return (value - min) / (max - min)
    }

    const getAbsoluteValue = (ratio: number, min: number, max: number) => {
      if (max <= min) return min
      return min + Math.min(1, Math.max(0, ratio)) * (max - min)
    }

    const clampDndStackAnchor = useCallback(
      (left: number, top: number, count: number) => {
        const { minLeft, minTop, maxLeft, maxTop } = getDndAnchorBounds(count)

        return {
          left: Math.min(maxLeft, Math.max(minLeft, left)),
          top: Math.min(maxTop, Math.max(minTop, top)),
        }
      },
      [getDndAnchorBounds]
    )

    const layoutDndStack = useCallback(
      (
        state: Record<number, DndDocumentState>,
        memberIds: number[],
        stackId: string,
        anchorLeft: number,
        anchorTop: number,
        group: DndDocumentGroup
      ) => {
        const anchor = clampDndStackAnchor(
          anchorLeft,
          anchorTop,
          memberIds.length
        )
        const { minLeft, minTop, maxLeft, maxTop } = getDndAnchorBounds(
          memberIds.length
        )

        memberIds.forEach((memberId, stackIndex) => {
          const left = anchor.left + stackIndex * dndStackOffsetX
          const top = anchor.top + stackIndex * dndStackOffsetY
          state[memberId] = {
            ...state[memberId],
            group,
            stackId,
            stackIndex,
            left,
            top,
            leftRatio: getRelativeValue(left, minLeft, maxLeft),
            topRatio: getRelativeValue(top, minTop, maxTop),
          }
        })
      },
      [
        clampDndStackAnchor,
        dndStackOffsetX,
        dndStackOffsetY,
        getDndAnchorBounds,
      ]
    )

    const promoteDndMembersToTop = (
      state: Record<number, DndDocumentState>,
      memberIds: number[]
    ) => {
      const maxZOrder = Math.max(
        dndZOrderRef.current,
        ...Object.values(state).map((document) => document.zOrder)
      )
      let nextZOrder = Math.max(0, maxZOrder)

      memberIds.forEach((memberId) => {
        if (!state[memberId]) return
        nextZOrder += 1
        state[memberId] = {
          ...state[memberId],
          zOrder: nextZOrder,
        }
      })

      dndZOrderRef.current = nextZOrder
    }

    const findNearestDndStack = (
      state: Record<number, DndDocumentState>,
      itemId: number,
      group: DndDocumentGroup,
      sameGroup: boolean
    ) => {
      const current = state[itemId]
      if (!current) return null

      const seen = new Set<string>()
      let closest: null | {
        stackId: string
        anchorId: number
        anchorLeft: number
        anchorTop: number
        distance: number
      } = null

      for (const [, document] of Object.entries(state)) {
        if ((document.group === group) !== sameGroup) continue
        if (sameGroup && document.stackId === current.stackId) continue
        if (seen.has(document.stackId)) continue
        seen.add(document.stackId)

        const memberIds = getDndStackDocumentMembers(state, document.stackId)
        const latestId = memberIds[memberIds.length - 1]
        const latestDocument = latestId ? state[latestId] : null
        if (!latestDocument) continue

        const distance = Math.hypot(
          latestDocument.left - current.left,
          latestDocument.top - current.top
        )

        if (!closest || distance < closest.distance) {
          closest = {
            stackId: document.stackId,
            anchorId: latestId,
            anchorLeft: latestDocument.left,
            anchorTop: latestDocument.top,
            distance,
          }
        }
      }

      return closest
    }

    const settleDndDocuments = (
      state: Record<number, DndDocumentState>,
      itemId: number
    ) => {
      const current = state[itemId]
      if (!current) return state

      const next = cloneDndDocuments(state)
      const currentStackId = current.stackId
      const sameGroupTarget = findNearestDndStack(
        next,
        itemId,
        current.group,
        true
      )

      const sameGroupOverlapTarget = sameGroupTarget
        ? getDndStackDocumentSnapOverlap(
            next,
            currentStackId,
            sameGroupTarget.stackId
          ) > 0
          ? sameGroupTarget
          : null
        : null

      if (sameGroupOverlapTarget) {
        const targetIds = getDndStackDocumentMembers(
          next,
          sameGroupOverlapTarget.stackId
        )
        const sourceIds = getDndStackDocumentMembers(next, currentStackId)
        const combinedIds = [
          ...targetIds,
          ...sourceIds.filter((sourceId) => !targetIds.includes(sourceId)),
        ]
        const anchor = next[targetIds[0]]

        if (anchor) {
          layoutDndStack(
            next,
            combinedIds,
            sameGroupOverlapTarget.stackId,
            anchor.left,
            anchor.top,
            current.group
          )
          promoteDndMembersToTop(next, combinedIds)
        }

        return next
      }

      const oppositeGroupTarget = findNearestDndStack(
        next,
        itemId,
        current.group,
        false
      )

      const currentBounds = getDndStackDocumentBounds(next, currentStackId)
      const oppositeGap = oppositeGroupTarget
        ? getNearestDndStackGap(
            next,
            currentStackId,
            oppositeGroupTarget.stackId
          )
        : Number.POSITIVE_INFINITY

      if (
        oppositeGroupTarget &&
        currentBounds &&
        (getDndStackDocumentOverlap(
          next,
          currentStackId,
          oppositeGroupTarget.stackId
        ) > 0 ||
          oppositeGap < dndDocumentWidth * 0.2)
      ) {
        const memberIds = getDndStackDocumentMembers(next, currentStackId)
        const anchor = next[memberIds[0]]

        if (!anchor) return next

        const dx = anchor.left - oppositeGroupTarget.anchorLeft
        const dy = anchor.top - oppositeGroupTarget.anchorTop
        const distance = Math.hypot(dx, dy) || 1
        const overlapArea = getDndStackDocumentOverlap(
          next,
          currentStackId,
          oppositeGroupTarget.stackId
        )
        const pushDistance = Math.max(
          28,
          overlapArea > 0
            ? Math.min(
                dndDocumentWidth * 0.6,
                28 + overlapArea / dndDocumentHeight
              )
            : dndDocumentWidth * 0.24
        )

        layoutDndStack(
          next,
          memberIds,
          currentStackId,
          anchor.left + (dx / distance) * pushDistance,
          anchor.top + (dy / distance) * pushDistance,
          current.group
        )
      }

      return next
    }

    // Sync actual DOM positions of solo (non-stacked) DND docs back into state.
    // Hero's idle animation mutates their inline styles directly, which drifts
    // from React state and causes snap-zone mismatches and jump-on-drag.
    const syncSoloDndPositionsFromDom = (
      state: Record<number, DndDocumentState>
    ): Record<number, DndDocumentState> => {
      const containerEl = ulRef?.current
      if (!containerEl) return state
      const containerRect = containerEl.getBoundingClientRect()
      let changed = false
      const next: Record<number, DndDocumentState> = {}

      for (const [idStr, doc] of Object.entries(state)) {
        const id = Number(idStr)
        const memberIds = getDndStackDocumentMembers(state, doc.stackId)
        // Stacked docs are excluded from Hero's idle movement; skip them.
        if (memberIds.length > 1) {
          next[id] = doc
          continue
        }
        const el = dndItemEls.current.get(id)
        if (!el) {
          next[id] = doc
          continue
        }
        const elRect = el.getBoundingClientRect()
        const actualLeft = elRect.left - containerRect.left
        const actualTop = elRect.top - containerRect.top
        const movementOffset = movementOffsets[id] ?? { dx: 0, dy: 0 }
        // Solo DND docs render with movementOffsets applied via top/left.
        // Convert measured visual position back to base DND coordinates.
        const baseLeft = actualLeft - movementOffset.dx
        const baseTop = actualTop - movementOffset.dy
        if (
          Math.abs(baseLeft - doc.left) > 0.5 ||
          Math.abs(baseTop - doc.top) > 0.5
        ) {
          const { minLeft, minTop, maxLeft, maxTop } = getDndAnchorBounds(1)
          next[id] = {
            ...doc,
            left: baseLeft,
            top: baseTop,
            leftRatio: getRelativeValue(baseLeft, minLeft, maxLeft),
            topRatio: getRelativeValue(baseTop, minTop, maxTop),
          }
          changed = true
        } else {
          next[id] = doc
        }
      }
      return changed ? next : state
    }

    const finalizeDndDrag = (itemId: number) => {
      setDndDocuments((previousDocuments) => {
        const synced = syncSoloDndPositionsFromDom(previousDocuments)
        return settleDndDocuments(synced, itemId)
      })
    }

    const beginDndDrag = (
      e: ReactPointerEvent<HTMLLIElement>,
      itemId: number
    ) => {
      if (e.pointerType !== 'touch' && e.button !== 0) return

      const current = dndDocuments[itemId]
      if (!current) return

      const memberIds = getDndStackDocumentMembers(
        dndDocuments,
        current.stackId
      )
      const anchorId = memberIds[0]
      const anchor = dndDocuments[anchorId]
      if (!anchor) return

      const memberOffsets = Object.fromEntries(
        memberIds.map((memberId) => [
          memberId,
          {
            left: dndDocuments[memberId].left - anchor.left,
            top: dndDocuments[memberId].top - anchor.top,
          },
        ])
      ) as Record<number, { left: number; top: number }>

      // For solo docs Hero's idle animation may have moved the DOM element
      // without updating React state. Read actual position so drag starts from
      // the visually correct location instead of snapping on first move.
      let resolvedAnchorLeft = anchor.left
      let resolvedAnchorTop = anchor.top
      if (memberIds.length === 1 && ulRef?.current) {
        const containerRect = ulRef.current.getBoundingClientRect()
        const elRect = e.currentTarget.getBoundingClientRect()
        resolvedAnchorLeft = elRect.left - containerRect.left
        resolvedAnchorTop = elRect.top - containerRect.top
      }

      dndDragRef.current = {
        pointerId: e.pointerId,
        anchorId,
        anchorLeft: resolvedAnchorLeft,
        anchorTop: resolvedAnchorTop,
        startPointerX: e.clientX,
        startPointerY: e.clientY,
        memberIds,
        memberOffsets,
      }

      setDndDocuments((previousDocuments) => {
        const next = cloneDndDocuments(previousDocuments)
        const maxZOrder = Math.max(
          0,
          ...Object.values(previousDocuments).map((document) => document.zOrder)
        )
        let nextZOrder = Math.max(dndZOrderRef.current, maxZOrder)

        memberIds.forEach((memberId) => {
          nextZOrder += 1
          next[memberId] = {
            ...next[memberId],
            zOrder: nextZOrder,
          }
        })

        dndZOrderRef.current = nextZOrder
        return next
      })

      setActiveDndStackId(current.stackId)
      e.preventDefault()
      e.currentTarget.setPointerCapture?.(e.pointerId)
    }

    const moveDndDrag = (e: ReactPointerEvent<HTMLLIElement>) => {
      const dragState = dndDragRef.current
      if (!dragState || dragState.pointerId !== e.pointerId) return

      const nextAnchor = clampDndStackAnchor(
        dragState.anchorLeft + (e.clientX - dragState.startPointerX),
        dragState.anchorTop + (e.clientY - dragState.startPointerY),
        dragState.memberIds.length
      )

      setDndDocuments((previousDocuments) => {
        const next = cloneDndDocuments(previousDocuments)
        const anchorDocument = previousDocuments[dragState.anchorId]
        if (!anchorDocument) return previousDocuments

        layoutDndStack(
          next,
          dragState.memberIds,
          anchorDocument.stackId,
          nextAnchor.left,
          nextAnchor.top,
          anchorDocument.group
        )

        return next
      })
    }

    const endDndDrag = (itemId: number, pointerId?: number) => {
      const dragState = dndDragRef.current
      if (!dragState) return
      if (pointerId !== undefined && dragState.pointerId !== pointerId) return

      dndDragRef.current = null
      setActiveDndStackId(null)
      finalizeDndDrag(itemId)
    }

    const nudgeDndStack = (itemId: number, dx: number, dy: number) => {
      setDndDocuments((previousDocuments) => {
        const current = previousDocuments[itemId]
        if (!current) return previousDocuments

        const memberIds = getDndStackDocumentMembers(
          previousDocuments,
          current.stackId
        )
        const anchor = previousDocuments[memberIds[0]]
        if (!anchor) return previousDocuments

        const next = cloneDndDocuments(previousDocuments)
        layoutDndStack(
          next,
          memberIds,
          current.stackId,
          anchor.left + dx,
          anchor.top + dy,
          current.group
        )
        return next
      })
    }

    const unravelDndStack = (itemId: number) => {
      setDndDocuments((previousDocuments) => {
        const current = previousDocuments[itemId]
        if (!current) return previousDocuments

        const memberIds = getDndStackDocumentMembers(
          previousDocuments,
          current.stackId
        )
        if (memberIds.length < 2) return previousDocuments

        const anchor = previousDocuments[memberIds[0]]
        if (!anchor) return previousDocuments

        dndSplitVersionRef.current += 1
        const next = cloneDndDocuments(previousDocuments)
        const spreadX = dndDocumentSnapWidth + 4
        const spreadY = dndDocumentSnapHeight + 4

        memberIds.forEach((memberId, index) => {
          const column = index % 2
          const row = Math.floor(index / 2)
          const direction = column === 0 ? -1 : 1
          const nextLeft = anchor.left + direction * spreadX * (row + 1)
          const nextTop = anchor.top + spreadY * (index + 1)
          const member = previousDocuments[memberId]
          if (!member) return

          layoutDndStack(
            next,
            [memberId],
            `${member.group}-${memberId}-split-${dndSplitVersionRef.current}`,
            nextLeft,
            nextTop,
            member.group
          )
        })

        setActiveDndStackId(null)
        dndDragRef.current = null
        return next
      })
    }

    const handleDndKeyDown = (
      e: ReactKeyboardEvent<HTMLLIElement>,
      itemId: number
    ) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          nudgeDndStack(itemId, -24, 0)
          break
        case 'ArrowRight':
          e.preventDefault()
          nudgeDndStack(itemId, 24, 0)
          break
        case 'ArrowUp':
          e.preventDefault()
          nudgeDndStack(itemId, 0, -24)
          break
        case 'ArrowDown':
          e.preventDefault()
          nudgeDndStack(itemId, 0, 24)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          const normalizedKey: 'Enter' | ' ' = e.key === 'Enter' ? 'Enter' : ' '
          const now = e.timeStamp
          const isDoubleTap =
            dndKeyTapRef.current.itemId === itemId &&
            dndKeyTapRef.current.key === normalizedKey &&
            now - dndKeyTapRef.current.timestamp <= 600

          dndKeyTapRef.current = {
            itemId,
            key: normalizedKey,
            timestamp: now,
          }

          const currentDocument = dndDocuments[itemId]
          if (!currentDocument) {
            finalizeDndDrag(itemId)
            break
          }

          const sameGroupTarget = findNearestDndStack(
            dndDocuments,
            itemId,
            currentDocument.group,
            true
          )
          const canIncorporateDocument = Boolean(
            sameGroupTarget &&
              getDndStackDocumentSnapOverlap(
                dndDocuments,
                currentDocument.stackId,
                sameGroupTarget.stackId
              ) > 0
          )
          const isInStack =
            getDndStackDocumentMembers(dndDocuments, currentDocument.stackId)
              .length > 1

          if (canIncorporateDocument) {
            finalizeDndDrag(itemId)
          } else if (isInStack && isDoubleTap) {
            unravelDndStack(itemId)
            dndKeyTapRef.current = {
              itemId: null,
              key: normalizedKey,
              timestamp: 0,
            }
          } else {
            finalizeDndDrag(itemId)
          }
          break
        case 'Escape':
          escapeFunction()
          break
        default:
          break
      }
    }

    useEffect(() => {
      if (!isDnd) return

      const root = ulRef?.current
      const width = root?.clientWidth ?? windowWidth
      const height = root?.clientHeight ?? Math.max(windowHeight * 0.8, 320)
      const seedKey = `${resetVersion}:${array
        .map((item) => `${item.i}-${item.group ?? 'primary'}`)
        .join('|')}`
      const groupCounts: Record<DndDocumentGroup, number> = {
        primary: 0,
        secondary: 0,
      }
      setDndDocuments((previousDocuments) => {
        const previousIds = Object.keys(previousDocuments)
          .map(Number)
          .sort((a, b) => a - b)
        const nextIds = array.map((item) => item.i).sort((a, b) => a - b)
        const canReuseLayout =
          dndSeedKeyRef.current === seedKey &&
          previousIds.length === nextIds.length &&
          previousIds.every((id, index) => id === nextIds[index])

        if (canReuseLayout) {
          const next = cloneDndDocuments(previousDocuments)
          const seenStackIds = new Set<string>()

          Object.values(previousDocuments).forEach((document) => {
            if (seenStackIds.has(document.stackId)) return
            seenStackIds.add(document.stackId)

            const memberIds = getDndStackDocumentMembers(
              previousDocuments,
              document.stackId
            )
            const anchor = previousDocuments[memberIds[0]]
            if (!anchor) return
            const { minLeft, minTop, maxLeft, maxTop } = getDndAnchorBounds(
              memberIds.length
            )
            const nextAnchorLeft = getAbsoluteValue(
              anchor.leftRatio,
              minLeft,
              maxLeft
            )
            const nextAnchorTop = getAbsoluteValue(
              anchor.topRatio,
              minTop,
              maxTop
            )

            layoutDndStack(
              next,
              memberIds,
              document.stackId,
              nextAnchorLeft,
              nextAnchorTop,
              document.group
            )
          })

          return next
        }

        const nextDocuments: Record<number, DndDocumentState> = {}

        array.forEach((item) => {
          const group: DndDocumentGroup =
            item.group === 'secondary' ? 'secondary' : 'primary'
          const stackIndex = groupCounts[group]
          groupCounts[group] += 1
          const { minLeft, minTop, maxLeft, maxTop } = getDndAnchorBounds(1)

          let rawLeft = minLeft
          let rawTop = minTop
          let foundSpot = false

          for (let attempt = 0; attempt < 80; attempt++) {
            const candidateLeft = Math.round(getRandomMinMax(minLeft, maxLeft))
            const candidateTop = Math.round(getRandomMinMax(minTop, maxTop))
            const candidateBodyRect: DndRect = {
              left: candidateLeft,
              top: candidateTop,
              right: candidateLeft + dndDocumentWidth,
              bottom: candidateTop + dndDocumentHeight,
              width: dndDocumentWidth,
              height: dndDocumentHeight,
            }
            const candidateSnapRect = getDndDocumentSnapRect(
              candidateLeft,
              candidateTop
            )

            const collides = Object.values(nextDocuments).some((document) => {
              const existingBodyRect: DndRect = {
                left: document.left,
                top: document.top,
                right: document.left + dndDocumentWidth,
                bottom: document.top + dndDocumentHeight,
                width: dndDocumentWidth,
                height: dndDocumentHeight,
              }
              const existingSnapRect = getDndDocumentSnapRect(
                document.left,
                document.top
              )

              return (
                getRectOverlap(candidateBodyRect, existingBodyRect) > 0 ||
                getRectOverlap(candidateSnapRect, existingSnapRect) > 0
              )
            })

            if (!collides) {
              rawLeft = candidateLeft
              rawTop = candidateTop
              foundSpot = true
              break
            }
          }

          if (!foundSpot) {
            const fallbackSpreadX = Math.max(
              dndDocumentWidth * 1.1,
              (maxLeft - minLeft) / Math.max(array.length, 1)
            )
            const fallbackSpreadY = Math.max(
              dndDocumentHeight * 0.9,
              height * 0.1
            )
            rawLeft =
              minLeft +
              ((stackIndex * fallbackSpreadX + resetVersion * dndStackOffsetX) %
                Math.max(maxLeft - minLeft, 1))
            rawTop =
              minTop +
              (((item.i + resetVersion) * fallbackSpreadY) %
                Math.max(maxTop - minTop, 1))
          }

          const anchor = {
            left: Math.min(
              Math.max(12, rawLeft),
              Math.max(12, width - dndDocumentWidth - 12)
            ),
            top: Math.min(
              Math.max(Math.max(96, Math.round(height * 0.16)), rawTop),
              Math.max(
                Math.max(96, Math.round(height * 0.16)),
                height - dndDocumentHeight - 12
              )
            ),
          }

          nextDocuments[item.i] = {
            left: anchor.left,
            top: anchor.top,
            leftRatio: getRelativeValue(anchor.left, minLeft, maxLeft),
            topRatio: getRelativeValue(anchor.top, minTop, maxTop),
            zOrder: stackIndex + 1,
            group,
            stackId: `${group}-${item.i}`,
            stackIndex,
          }
        })

        dndZOrderRef.current = Math.max(
          0,
          ...Object.values(nextDocuments).map((document) => document.zOrder)
        )

        setActiveDndStackId(null)
        dndDragRef.current = null
        return nextDocuments
      })

      dndSeedKeyRef.current = seedKey
    }, [
      array,
      dndDocumentHeight,
      dndDocumentWidth,
      dndStackOffsetX,
      dndStackOffsetY,
      getDndAnchorBounds,
      getDndDocumentSnapRect,
      isDnd,
      layoutDndStack,
      resetVersion,
      ulRef,
      windowHeight,
      windowWidth,
    ])

    if (location === LOCATION.COLORS) {
      return (
        <ContrastConstellation
          array={array}
          location={location}
          ulRef={ulRef}
          itemsVisible={itemsVisible}
          prefersReducedMotion={prefersReducedMotion}
          escapeFunction={escapeFunction}
        />
      )
    }

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
            location === LOCATION.PORTFOLIO || location === LOCATION.BLOBAPP
              ? styles.blob
              : ''
          } ${itemsVisible ? styles['items-visible'] : styles['items-hidden']} `}
          style={(() => {
            const baseStyle: CSSProperties =
              location === LOCATION.PORTFOLIO || location === LOCATION.BLOBAPP
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
              ['--staff-anchor-y' as string]: `${composerStaffAnchorYPx}px`,
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
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node)
                  }}
                  className={withInteractionClass(
                    `${styles.item} ${styles[location]} ${styles.geometric} 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`,
                    item.i
                  )}
                  style={withMovementOffset(item.i, style)}
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
                          <i className="scr">
                            {t('Shape')} {index + 1}
                          </i>
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
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node)
                  }}
                  className={withInteractionClass(
                    `${styles.item} ${styles[location]} ${styles.circles} 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`,
                    item.i
                  )}
                  style={withMovementOffset(item.i, style)}
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
                          <i className="scr">
                            {t('Shape')} {index + 1}
                          </i>
                        </span>
                      )
                    })}
                  </div>
                </li>
              )
            } else if (location == LOCATION.COMPOSER) {
              const itemSize = 3.4
              const noteStep = (item.i + item.e) % composerNoteSteps
              const colStep = `clamp(50px, calc((99vw - 50px) / 10), 99999px)`
              const noteHead = `40px`
              const noteOffsetPx = noteStep * composerStaffHalfStepPx
              const composerOffsetDy = movementOffsets[item.i]?.dy ?? 0
              const composerAnchorYPx =
                composerStaffAnchorYPx + noteOffsetPx + composerOffsetDy
              const isComposerAbove =
                composerAnchorYPx <=
                composerStaffAnchorYPx + 4 * composerStaffHalfStepPx
              const style: CSSProperties = {
                position: 'absolute',
                ['--size' as string]: `${itemSize}`,
                ['--note-head' as string]: `${noteHead}`,
                top: `calc(${composerStaffAnchorYPx}px + ${noteOffsetPx}px - ${noteHead})`,
                left: `calc(${item.i} * ${colStep} - ${noteHead})`,
                ['--highest-allowed' as string]: `calc(${composerStaffAnchorYPx}px - ${noteHead})`,
                ['--lowest-allowed' as string]: `calc(${composerStaffAnchorYPx}px + ${(composerNoteSteps - 1) * composerStaffHalfStepPx}px)`,
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
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node)
                  }}
                  className={withInteractionClass(
                    `${
                      isComposerAbove ? styles.above : styles.below
                    } ${styles.item} ${styles[location]} ${styles.note} 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`,
                    item.i
                  )}
                  style={withMovementOffset(item.i, style)}
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
                          <i className="scr">
                            {t('Shape')} {index + 1}
                          </i>
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
                ['--rotate2' as string]: `-45deg`,
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
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node)
                  }}
                  className={withInteractionClass(
                    `${styles.item} ${styles[location]} ${
                      styles.jewel
                    } ${styles.jewel1} ${
                      randomOfTwo === 0 ? styles.blue : styles.orange
                    } ${windowHeight < windowWidth ? styles.wide : styles.tall}`,
                    item.i
                  )}
                  style={withMovementOffset(item.i, style)}
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
                    <i className="scr">
                      {t('Shape')} {index + 1}
                    </i>
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
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node)
                  }}
                  className={withInteractionClass(
                    `${styles.item} ${styles[location]} ${
                      styles.jewel
                    } ${styles.jewel2} ${
                      randomOfTwo === 0 ? styles.blue : styles.orange
                    } 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`,
                    item.i
                  )}
                  style={withMovementOffset(item.i, style)}
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
                    <i className="scr">
                      {t('Shape')} {index + 1}
                    </i>
                  </div>
                </li>
              )
            } else if (location == LOCATION.JOKES) {
              const handleOnLeft = (item.i + Math.round(item.e)) % 2 === 0
              const style: CSSProperties = {
                position: 'absolute',
                top: `clamp(150px, calc(-10vh + 1.2vh * ${item.e * 3} * ${
                  item.size / 6
                }), calc(50vh - calc(var(--size, 200px) * 0.5vh)))`,
                left: `clamp(1vw, calc(-5vh + ${item.i} * 1.4vw * ${item.e}), 96vw - ${item.size}vw)`,
                backgroundColor: `transparent`,
                color: `${item.color}`,
                ['--i' as string]: `${item.i}`,
                ['--e' as string]: `${item.e}`,
                ['--size' as string]: `${item.size}`,
                ['--s' as string]:
                  windowWidth < windowHeight
                    ? `calc(${item.size} * 0.005vh)`
                    : `calc(${item.size} * 0.005vw)`,
                ['--handle-left' as string]: handleOnLeft ? '-11%' : 'auto',
                ['--handle-right' as string]: handleOnLeft ? 'auto' : '-11%',
                ['--handle-border-radius' as string]: handleOnLeft
                  ? '90% 0 0 90%'
                  : '0 90% 90% 0',
                ['--handle-left-stroke' as string]: handleOnLeft
                  ? `clamp(4px, calc(${item.size} * 0.6px), 10px)`
                  : '0px',
                ['--handle-right-stroke' as string]: handleOnLeft
                  ? '0px'
                  : `clamp(4px, calc(${item.size} * 0.6px), 10px)`,
                ['--steam-color' as string]: lightTheme
                  ? 'hsla(0, 0%, 100%, 0.9)'
                  : 'hsla(0, 0%, 100%, 0.7)',
                width:
                  windowWidth < windowHeight
                    ? `calc(${item.size} * 0.7 * 0.6vh)`
                    : `calc(${item.size} * 0.7 * 0.6vw)`,
                height:
                  windowWidth < windowHeight
                    ? `calc(${item.size} * 0.6vh)`
                    : `calc(${item.size} * 0.6vw)`,
                maxHeight: '140px',
                maxWidth: '98px',
                minHeight: '50px',
                minWidth: '35px',
                opacity: '0.8',
              }

              return (
                // JOKES
                <li
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  className={withInteractionClass(
                    `${styles.item} ${styles.jokes} ${styles.mug} ${
                      windowHeight < windowWidth ? styles.wide : styles.tall
                    }`,
                    item.i
                  )}
                  style={withMovementOffset(item.i, style)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node)
                  }}
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
                  <div className={styles['mug-cup']}>
                    <i className="scr">
                      {t('Shape')} {index + 1}
                    </i>
                  </div>
                  {spanArray.slice(0, 2).map((span) => {
                    const steamStyle: CSSProperties = {
                      ['--steam-index' as string]: `${span.i}`,
                    }

                    return (
                      <span
                        key={`${item.i}-steam-${span.i}`}
                        className={styles.steam}
                        style={steamStyle}
                      >
                        <i className="scr">
                          {t('Shape')} {index + 1}
                        </i>
                      </span>
                    )
                  })}
                </li>
              )
            } else if (
              location == LOCATION.HOME ||
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
                    ? `calc(${item.size} * 0.005vh)`
                    : `calc(${item.size} * 0.005vw)`,
                width:
                  windowWidth < windowHeight
                    ? `calc(var(--size) * 1.1 * 0.6vh)`
                    : `calc(var(--size) * 1.1 * 0.6vw)`,
                height:
                  windowWidth < windowHeight
                    ? `calc(var(--size) * 1.1 * 0.6vh)`
                    : `calc(var(--size) * 1.1 * 0.6vw)`,
                maxHeight: '220px',
                maxWidth: '220px',
                minHeight: '44px',
                minWidth: '44px',
                borderRadius: '65% 65% 70% 60% / 60% 70% 60% 65%',
                opacity: `0.${item.size > 7 ? 7 : Math.ceil(item.size)}`,
              }

              return (
                //HOME // SALON // QUIZ // ABOUT
                <li
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  className={withInteractionClass(
                    `${styles.item} ${styles.about} ${styles.bubbles} ${
                      windowHeight < windowWidth ? styles.wide : styles.tall
                    }`,
                    item.i
                  )}
                  style={withMovementOffset(item.i, style)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node)
                  }}
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
                  <span></span>
                  <i className="scr">
                    {t('Bubble')} {index + 1}
                  </i>
                </li>
              )
            } else if (location == LOCATION.DND) {
              const documentState = dndDocuments[item.i]
              const group: DndDocumentGroup =
                item.group === 'secondary' ? 'secondary' : 'primary'
              const stackMembers = documentState
                ? getDndStackDocumentMembers(
                    dndDocuments,
                    documentState.stackId
                  )
                : [item.i]
              const stackMemberIndex = stackMembers.indexOf(item.i)
              const isDragging =
                documentState?.stackId != null &&
                activeDndStackId === documentState.stackId
              const shouldApplyDndOffset = stackMembers.length === 1
              const style: CSSProperties = {
                position: 'absolute',
                left: `${documentState?.left ?? 12}px`,
                top: `${documentState?.top ?? 120}px`,
                width: `${dndDocumentWidth}px`,
                height: `${dndDocumentHeight}px`,
                zIndex: `${documentState?.zOrder ?? index + 1}`,
                ['--i' as string]: `${stackMemberIndex}`,
                ['--color' as string]: item.color,
                ['--document-accent' as string]: `color-mix(in srgb, white 20%, ${item.color} 80%)`,
                ['--document-accent-strong' as string]: lightTheme
                  ? `color-mix(in srgb, white 30%, ${item.color} 70%)`
                  : `color-mix(in srgb, black 20%, ${item.color} 80%)`,
                ['--document-shadow' as string]: lightTheme
                  ? 'hsla(var(--hue-primary), 100%, 8%, 0.4)'
                  : 'hsla(var(--hue-primary), 50%, 88%, 0.4)',
                transitionProperty: isDragging
                  ? 'transform, box-shadow, filter'
                  : 'top, left, transform, box-shadow, filter',
                transitionDuration: isDragging ? '120ms' : '260ms',
              }

              return (
                <li
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node, stackMembers.length > 1)
                    if (node) dndItemEls.current.set(item.i, node)
                    else dndItemEls.current.delete(item.i)
                  }}
                  className={withInteractionClass(
                    `${styles.item} ${styles['document-item']} ${
                      stackMembers.length > 1 ? styles['document-stacked'] : ''
                    } ${isDragging ? styles.drag : ''}`,
                    item.i
                  )}
                  style={
                    shouldApplyDndOffset
                      ? withMovementOffset(item.i, style)
                      : style
                  }
                  role={'option'}
                  tabIndex={0}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  onFocus={(e) => {
                    setActiveDescendant(e.currentTarget.id)
                  }}
                  onBlurCapture={() => {
                    setActiveDescendant(null)
                  }}
                  onPointerDown={(e) => {
                    beginDndDrag(e, item.i)
                  }}
                  onPointerMove={(e) => {
                    moveDndDrag(e)
                  }}
                  onPointerUp={(e) => {
                    endDndDrag(item.i, e.pointerId)
                  }}
                  onPointerCancel={(e) => {
                    endDndDrag(item.i, e.pointerId)
                  }}
                  onLostPointerCapture={(e) => {
                    endDndDrag(item.i, e.pointerId)
                  }}
                  onDoubleClick={() => {
                    unravelDndStack(item.i)
                  }}
                  onKeyDown={(e) => {
                    handleDndKeyDown(e, item.i)
                  }}
                >
                  <span className={styles.document} aria-hidden="true">
                    <span className={styles['document-line']}></span>
                    <span className={styles['document-line']}></span>
                    <span className={styles['document-line-short']}></span>
                  </span>
                  <i className="scr">
                    {group} {t('Document')} {index + 1}
                  </i>
                </li>
              )
            } else if (
              //In the case of using the blob feature, also add to ul style
              location == LOCATION.PORTFOLIO ||
              location == LOCATION.BLOBAPP
            ) {
              const breakpoint = 500
              const sizing = 0.7
              const sizingSmall = 0.4
              const div = 1.1
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
                      ? `blur(calc(var(--blur) * 1.1vh))`
                      : `blur(calc(var(--blur) * 1.1vw))`
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
                ['--blur' as string]: `clamp(1, calc(var(--size) * 0.5), 3)`,
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
                transitionProperty: activeBlobDragIds[item.i]
                  ? 'transform, width, height, border-radius'
                  : 'top, left, bottom, right, transform, width, height, border-radius',
                transitionTimingFunction: 'ease-in-out',
                transitionDuration: '600ms',
              }

              return (
                //BLOBS

                <li
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node)
                  }}
                  className={withInteractionClass(
                    `${styles.item} ${styles.blob} ${
                      styles[location]
                    } ${styles.portfolio} 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                } ${activeBlobDragIds[item.i] ? styles.drag : ''}`,
                    item.i
                  )}
                  style={withMovementOffset(item.i, style)}
                  draggable={true}
                  tabIndex={0}
                  role={'option'}
                  onMouseDown={(e) => {
                    Draggable.start(e)
                    setActiveBlobDragIds((previous) => ({
                      ...previous,
                      [item.i]: true,
                    }))
                  }}
                  onMouseMove={(e) => {
                    Draggable.movement(e)
                  }}
                  onMouseUp={(e) => {
                    Draggable.stopMovementCheck(e)
                    setActiveBlobDragIds((previous) => ({
                      ...previous,
                      [item.i]: false,
                    }))
                  }}
                  onMouseLeave={(e) => {
                    Draggable.stopMoving(e)
                    setActiveBlobDragIds((previous) => ({
                      ...previous,
                      [item.i]: false,
                    }))
                  }}
                  onTouchStart={(e) => {
                    Draggable.start(e)
                    setActiveBlobDragIds((previous) => ({
                      ...previous,
                      [item.i]: true,
                    }))
                  }}
                  onTouchMove={(e) => {
                    Draggable.movement(e)
                  }}
                  onTouchEnd={(e) => {
                    Draggable.stopMovementCheck(e)
                    setActiveBlobDragIds((previous) => ({
                      ...previous,
                      [item.i]: false,
                    }))
                  }}
                  onWheel={(e) => {
                    Draggable.wheel(e.currentTarget)
                  }}
                  onFocus={(e) => {
                    Draggable.focused(e.currentTarget)
                    setActiveDescendant(e.currentTarget.id)
                  }}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  onBlurCapture={(e) => {
                    Draggable.blurred(e.currentTarget)
                    setActiveDescendant(null)
                  }}
                  onKeyDown={(e) => {
                    Draggable.keyDown(
                      e,
                      e.currentTarget,
                      windowObj,
                      () => escapeFunction(),
                      () => removeItem(e),
                      () => removeItem(e),
                      null
                    )
                  }}
                >
                  <i className="scr">
                    {t('Blob')} {index + 1}
                  </i>
                </li>
              )
            } else if (
              location === LOCATION.CONTACT ||
              location === LOCATION.FORM
            ) {
              // CONTACT  // FORM
              const mod = 0.5
              const borderRadius = '57% 68% 66% 59% / 63% 65% 61% 62%'
              const style: CSSProperties = {
                ['--rotate' as string]: `${`${Math.round(getRandomMinMax(0, 100))}`}deg`,
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
                    ? `calc(${item.size}vh * 0.005)`
                    : `calc(${item.size}vw * 0.005)`,
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
                maxHeight: '150px',
                maxWidth: '150px',
                borderRadius,
                opacity: `0.${item.size > 7 ? 7 : Math.ceil(item.size)}`,
              }
              const styleInner: CSSProperties = {
                position: 'absolute',
                backgroundColor: `transparent`,
                width: '100%',
                height: '100%',
                borderRadius,
                opacity: `0.${item.size > 7 ? 7 : Math.ceil(item.size)}`,
                transform: `rotate(${eyeRotations[item.i] ?? 0}deg)`,
              }

              return (
                //CONTACT // FORM

                <li
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node)
                  }}
                  className={withInteractionClass(
                    `eye ${styles.item} ${styles.eyes} ${styles[location]} 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`,
                    item.i
                  )}
                  style={withMovementOffset(item.i, style)}
                  role={'option'}
                  tabIndex={0}
                  onFocus={(e) => {
                    setActiveDescendant(e.target.id)
                  }}
                  aria-selected={`shape${item.i}` === activeDescendant}
                  onBlurCapture={() => {
                    setActiveDescendant(null)
                  }}
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
                  <div
                    ref={(node) => {
                      if (node) {
                        node.dataset.itemId = `${item.i}`
                      }
                      registerEyeInner(item.i, node)
                    }}
                    style={styleInner}
                    className={`inner ${styles.inner}`}
                  >
                    <span className="else-eye">
                      <i className="scr">
                        {t('Eye')} {index + 1}
                      </i>
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
                  key={getHeroItemKey(location, item.i, resetVersion)}
                  id={`shape${item.i}`}
                  ref={(node) => {
                    registerHeroItem(item.i, node)
                  }}
                  className={withInteractionClass(
                    `${styles.item} ${styles[location]} ${styles.triangle} 
                                ${
                                  windowHeight < windowWidth
                                    ? styles.wide
                                    : styles.tall
                                }`,
                    item.i
                  )}
                  style={withMovementOffset(item.i, style)}
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
                      <span
                        aria-hidden="true"
                        key={`${item.i}-${index}`}
                        style={style}
                      ></span>
                    )
                  })}
                  <i className="scr">
                    {t('Shape')} {item.i}
                  </i>
                </li>
              )
            }
          })}

          <svg className="filter">
            <filter id="svgfilterHero">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
              <feColorMatrix
                values="
                  1 0 0 0 0 
                  0 1 0 0 0 
                  0 0 1 0 0
                  0 0 0 88 -18
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
