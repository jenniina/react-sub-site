import {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  MouseEvent as ReactMouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import {
  calculateLuminance,
  getContrastRatio,
  getHexFromColor,
  hexToRGB,
  sanitize,
} from '../../../utils'
import styles from '../hero.module.css'
import { itemProps } from '../Hero'
import CopyToClipboard from '../../CopyToClipboard/CopyToClipboard'

interface ConstellationNode extends itemProps {
  xPercent: number
  yPercent: number
  label: string
  luminance: number
  hexLabel: string
}

interface ConstellationEdge {
  from: number
  to: number
  ratio: number
  passes: boolean
  level: 'AAA' | 'AA' | 'UI' | null
}

interface LayoutPosition {
  x: number
  y: number
}

interface ContrastConstellationProps {
  array: itemProps[]
  location: string
  ulRef: RefObject<HTMLUListElement>
  itemsVisible: boolean
  prefersReducedMotion: boolean
  escapeFunction: () => void
}

const THRESHOLDS = [3, 4.5, 7] as const
const DRAG_THRESHOLD_PX = 4
const DRAGGING_TRANSITION = 'transform, width, height, border-radius'
const NODE_TRANSITION = 'left, top, transform, opacity, filter, box-shadow'

interface DragState {
  pointerId: number | null
  nodeId: number | null
  startX: number
  startY: number
  originLeft: number
  originTop: number
  moved: boolean
}

export default function ContrastConstellation({
  array,
  location,
  ulRef,
  itemsVisible,
  prefersReducedMotion,
  escapeFunction,
}: ContrastConstellationProps) {
  const { t } = useLanguageContext()
  const componentRef = useRef<HTMLDivElement | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Record<number, HTMLLIElement | null>>({})
  const dragStateRef = useRef<DragState>({
    pointerId: null,
    nodeId: null,
    startX: 0,
    startY: 0,
    originLeft: 0,
    originTop: 0,
    moved: false,
  })
  const suppressClickRef = useRef(false)
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null)
  const [focusedNodeId, setFocusedNodeId] = useState<number | null>(null)
  const [pinnedNodeId, setPinnedNodeId] = useState<number | null>(null)
  const [threshold, setThreshold] = useState<(typeof THRESHOLDS)[number]>(3)
  const [layout, setLayout] = useState<{
    width: number
    height: number
    centers: Record<number, LayoutPosition>
  }>({ width: 0, height: 0, centers: {} })

  const clearTransientNodeState = useCallback(() => {
    setFocusedNodeId(null)
    setHoveredNodeId(null)
  }, [])

  const clearActiveNodeState = useCallback(() => {
    setPinnedNodeId(null)
    clearTransientNodeState()
  }, [clearTransientNodeState])

  const nodes = useMemo<ConstellationNode[]>(() => {
    return array
      .filter(
        (item): item is ConstellationNode =>
          typeof item.xPercent === 'number' &&
          typeof item.yPercent === 'number' &&
          typeof item.label === 'string'
      )
      .map((node) => {
        let luminance = 0
        let hexLabel = node.label

        try {
          hexLabel =
            node.color.startsWith('hsl(') || node.color.startsWith('rgb(')
              ? getHexFromColor(
                  node.color,
                  node.color.startsWith('hsl(') ? 'hsl' : 'rgb'
                )
              : getHexFromColor(node.color, 'hex')

          const rgb = hexToRGB(hexLabel)
          luminance = calculateLuminance(rgb.r, rgb.g, rgb.b)
        } catch {
          luminance = 0
        }

        return {
          ...node,
          luminance,
          hexLabel,
        }
      })
  }, [array])

  const edges = useMemo<ConstellationEdge[]>(() => {
    const nextEdges: ConstellationEdge[] = []

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const ratio = getContrastRatio(nodes[i].luminance, nodes[j].luminance)
        const level =
          ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'UI' : null

        nextEdges.push({
          from: nodes[i].i,
          to: nodes[j].i,
          ratio,
          passes: ratio >= threshold,
          level,
        })
      }
    }

    return nextEdges
  }, [nodes, threshold])

  const activeNodeId = pinnedNodeId ?? hoveredNodeId ?? focusedNodeId ?? null
  const instructionsId = `constellation-instructions-${location.toLowerCase()}`
  const liveRegionId = `constellation-status-${location.toLowerCase()}`

  const updateLayout = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const wrapperRect = wrapper.getBoundingClientRect()
    const centers: Record<number, LayoutPosition> = {}

    nodes.forEach((node) => {
      const el = itemRefs.current[node.i]
      if (!el) return
      const rect = el.getBoundingClientRect()
      centers[node.i] = {
        x: rect.left - wrapperRect.left + rect.width / 2,
        y: rect.top - wrapperRect.top + rect.height / 2,
      }
    })

    setLayout({
      width: wrapperRect.width,
      height: wrapperRect.height,
      centers,
    })
  }, [nodes])

  useEffect(() => {
    updateLayout()

    if (typeof window === 'undefined') return

    const handleResize = () => {
      updateLayout()
    }

    window.addEventListener('resize', handleResize)

    const interval = window.setInterval(
      updateLayout,
      prefersReducedMotion ? 600 : 180
    )

    return () => {
      window.removeEventListener('resize', handleResize)
      window.clearInterval(interval)
    }
  }, [prefersReducedMotion, updateLayout])

  useEffect(() => {
    updateLayout()
  }, [itemsVisible, updateLayout])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const handlePointerDownOutside = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return

      if (componentRef.current?.contains(target)) {
        return
      }

      const activeElement = document.activeElement
      if (!(activeElement instanceof HTMLElement)) {
        clearActiveNodeState()
        return
      }

      const focusedNode = activeElement.closest('li')
      if (!focusedNode || !ulRef.current?.contains(focusedNode)) {
        clearActiveNodeState()
        return
      }

      if (focusedNode.contains(target)) return

      activeElement.blur()
      clearActiveNodeState()
    }

    document.addEventListener('pointerdown', handlePointerDownOutside)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside)
    }
  }, [clearActiveNodeState, ulRef])

  const requestLayoutRefresh = useCallback(() => {
    if (typeof window === 'undefined') return

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        updateLayout()
      })
    })
  }, [updateLayout])

  const persistNodePosition = useCallback((nodeEl: HTMLLIElement) => {
    const topPx = nodeEl.offsetTop
    const leftPx = nodeEl.offsetLeft

    nodeEl.style.top = `${topPx}px`
    nodeEl.style.left = `${leftPx}px`
    nodeEl.dataset.baseTop = `${topPx}px`
    nodeEl.dataset.baseLeft = `${leftPx}px`
    nodeEl.dataset.moveDy = '0'
    nodeEl.dataset.moveDx = '0'
  }, [])

  const finishDrag = useCallback(
    (nodeEl: HTMLLIElement, pointerId?: number) => {
      if (
        dragStateRef.current.pointerId === null &&
        !nodeEl.classList.contains(styles.drag)
      ) {
        return
      }

      if (
        pointerId !== undefined &&
        dragStateRef.current.pointerId !== null &&
        dragStateRef.current.pointerId !== pointerId
      ) {
        return
      }

      const moved = dragStateRef.current.moved
      const hadPointerCapture =
        pointerId !== undefined && nodeEl.hasPointerCapture?.(pointerId)

      dragStateRef.current = {
        pointerId: null,
        nodeId: null,
        startX: 0,
        startY: 0,
        originLeft: 0,
        originTop: 0,
        moved: false,
      }

      nodeEl.classList.remove(styles.drag)
      nodeEl.style.transitionProperty = NODE_TRANSITION
      if (moved) {
        persistNodePosition(nodeEl)
      }

      if (hadPointerCapture) {
        nodeEl.releasePointerCapture(pointerId)
      }

      suppressClickRef.current = moved
      requestLayoutRefresh()
    },
    [persistNodePosition, requestLayoutRefresh]
  )

  const nudgeNode = useCallback(
    (nodeEl: HTMLLIElement, deltaX: number, deltaY: number) => {
      nodeEl.style.left = `${nodeEl.offsetLeft + deltaX}px`
      nodeEl.style.top = `${nodeEl.offsetTop + deltaY}px`
      persistNodePosition(nodeEl)
      requestLayoutRefresh()
    },
    [persistNodePosition, requestLayoutRefresh]
  )

  const togglePinnedNode = useCallback((nodeId: number) => {
    setPinnedNodeId((current) => (current === nodeId ? null : nodeId))
  }, [])

  const handleNodeKeyDown = useCallback(
    (nodeId: number) => (e: ReactKeyboardEvent<HTMLLIElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        nudgeNode(e.currentTarget, -10, 0)
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        nudgeNode(e.currentTarget, 10, 0)
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        nudgeNode(e.currentTarget, 0, -10)
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        nudgeNode(e.currentTarget, 0, 10)
        return
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        togglePinnedNode(nodeId)
        return
      }

      if (e.key === 'Escape') {
        e.preventDefault()
        if (pinnedNodeId !== null || focusedNodeId !== null) {
          setPinnedNodeId(null)
          setFocusedNodeId(null)
          setHoveredNodeId(null)
          return
        }
        escapeFunction()
      }
    },
    [escapeFunction, focusedNodeId, nudgeNode, pinnedNodeId, togglePinnedNode]
  )

  const handlePointerDown = useCallback(
    (nodeId: number) => (e: ReactPointerEvent<HTMLLIElement>) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return

      const nodeEl = e.currentTarget
      const computedStyle = window.getComputedStyle(nodeEl)
      const left = Number.parseFloat(computedStyle.left)
      const top = Number.parseFloat(computedStyle.top)

      dragStateRef.current = {
        pointerId: e.pointerId,
        nodeId,
        startX: e.clientX,
        startY: e.clientY,
        originLeft: Number.isFinite(left) ? left : nodeEl.offsetLeft,
        originTop: Number.isFinite(top) ? top : nodeEl.offsetTop,
        moved: false,
      }

      suppressClickRef.current = false
      nodeEl.classList.add(styles.drag)
      nodeEl.style.transitionProperty = DRAGGING_TRANSITION
      nodeEl.setPointerCapture?.(e.pointerId)
      nodeEl.focus()
      setFocusedNodeId(nodeId)
      setHoveredNodeId(nodeId)
    },
    []
  )

  const handlePointerMove = useCallback(
    (nodeId: number) => (e: ReactPointerEvent<HTMLLIElement>) => {
      const dragState = dragStateRef.current
      if (dragState.pointerId !== e.pointerId || dragState.nodeId !== nodeId) {
        return
      }

      const deltaX = e.clientX - dragState.startX
      const deltaY = e.clientY - dragState.startY

      if (
        !dragState.moved &&
        (Math.abs(deltaX) >= DRAG_THRESHOLD_PX ||
          Math.abs(deltaY) >= DRAG_THRESHOLD_PX)
      ) {
        dragStateRef.current.moved = true
      }

      e.preventDefault()
      e.currentTarget.style.left = `${dragState.originLeft + deltaX}px`
      e.currentTarget.style.top = `${dragState.originTop + deltaY}px`
      updateLayout()
    },
    [updateLayout]
  )

  const handlePointerUp = useCallback(
    (e: ReactPointerEvent<HTMLLIElement>) => {
      finishDrag(e.currentTarget, e.pointerId)
    },
    [finishDrag]
  )

  const activeEdges = useMemo(() => {
    if (activeNodeId == null) return []
    return edges.filter(
      (edge) =>
        edge.passes && (edge.from === activeNodeId || edge.to === activeNodeId)
    )
  }, [activeNodeId, edges])

  const activeNode = useMemo(
    () => nodes.find((node) => node.i === activeNodeId) ?? null,
    [activeNodeId, nodes]
  )

  const activePartnerSummaries = useMemo(() => {
    if (activeNodeId == null) return []

    return activeEdges
      .map((edge) => {
        const partnerId = edge.from === activeNodeId ? edge.to : edge.from
        const partnerNode = nodes.find((node) => node.i === partnerId)
        if (!partnerNode) return null

        return `${partnerNode.hexLabel}, ${partnerNode.color}, ${edge.level ?? t('BelowThreshold')}, ${edge.ratio.toFixed(1)} to 1`
      })
      .filter((summary): summary is string => Boolean(summary))
  }, [activeEdges, activeNodeId, nodes, t])

  const liveRegionMessage = useMemo(() => {
    if (!activeNode) {
      return `${t('ColorConstellation')}. ${nodes.length} ${t('DraggableColors')}. ${t('CurrentThreshold')} ${threshold} to 1. ${t('FocusOrPinAColorToHearItsContrastMatches')}`
    }

    if (activePartnerSummaries.length === 0) {
      return `${activeNode.hexLabel}, ${activeNode.color}. ${t('NoVisibleMatchesAtTheCurrentThreshold')} ${threshold} to 1.`
    }

    return `${activeNode.hexLabel}, ${activeNode.color}. ${activePartnerSummaries.length} ${t('VisibleMatches')}: ${activePartnerSummaries.join('; ')}.`
  }, [activeNode, activePartnerSummaries, nodes.length, t, threshold])

  const getPartnerEdge = useCallback(
    (nodeId: number) => {
      if (activeNodeId == null || nodeId === activeNodeId) return null
      return (
        activeEdges.find(
          (edge) =>
            (edge.from === activeNodeId && edge.to === nodeId) ||
            (edge.to === activeNodeId && edge.from === nodeId)
        ) ?? null
      )
    },
    [activeEdges, activeNodeId]
  )

  const handleThresholdClick = useCallback(
    (nextThreshold: (typeof THRESHOLDS)[number]) =>
      (e: ReactMouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setThreshold(nextThreshold)
      },
    []
  )

  return (
    <div ref={componentRef}>
      <div ref={wrapperRef} className={styles['constellation-wrap']}>
        <svg
          className={styles['constellation-lines']}
          aria-hidden="true"
          viewBox={`0 0 ${Math.max(layout.width, 1)} ${Math.max(layout.height, 1)}`}
          preserveAspectRatio="none"
        >
          {edges
            .filter((edge) => edge.passes)
            .map((edge) => {
              const from = layout.centers[edge.from]
              const to = layout.centers[edge.to]
              if (!from || !to) return null

              const isHighlighted =
                activeNodeId != null &&
                (edge.from === activeNodeId || edge.to === activeNodeId)

              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={`${styles['constellation-line']} ${
                    edge.level === 'AAA'
                      ? styles['constellation-line-aaa']
                      : edge.level === 'UI'
                        ? styles['constellation-line-ui']
                        : styles['constellation-line-aa']
                  } ${isHighlighted ? styles.highlight : ''} ${
                    pinnedNodeId != null &&
                    isHighlighted &&
                    !prefersReducedMotion
                      ? styles.pulse
                      : ''
                  } ${activeNodeId != null && !isHighlighted ? styles.dimmed : ''}`}
                />
              )
            })}
        </svg>

        <ul
          ref={ulRef}
          id={`listbox-hero-${location.toLowerCase()}`}
          role="listbox"
          aria-labelledby="description"
          aria-describedby={`${instructionsId} ${liveRegionId}`}
          aria-activedescendant={
            activeNodeId ? `shape${activeNodeId}` : undefined
          }
          tabIndex={0}
          className={`${styles.herocontent} ${styles.constellation} ${styles[location] ?? ''} ${
            itemsVisible ? styles['items-visible'] : styles['items-hidden']
          }`}
          onMouseLeave={() => {
            setHoveredNodeId(null)
          }}
        >
          {nodes.map((node, index) => {
            const nodeSize = Math.round(node.size)
            const clamp = `clamp(44px, ${nodeSize}vw, 99px)`
            const isActive = activeNodeId === node.i
            const hasPinnedState = pinnedNodeId === node.i
            const partnerEdge = getPartnerEdge(node.i)
            const style: CSSProperties = {
              position: 'absolute',
              top: `calc(${node.yPercent}% - ${clamp} / 2)`,
              left: `calc(${node.xPercent}% - ${clamp} / 2)`,
              width: clamp,
              height: clamp,
              transitionDuration: '600ms',
              ['--constellation-color' as string]: node.color,
              ['--constellation-ring' as string]:
                node.luminance > 0.179 ? 'black' : 'white',
            }

            return (
              <li
                key={`${node.color}-${node.i}-${index}`}
                ref={(el) => {
                  itemRefs.current[node.i] = el
                }}
                id={`shape${node.i}`}
                className={`${styles.item} ${styles['constellation-node']} ${
                  isActive ? styles.active : ''
                } ${hasPinnedState ? styles.pinned : ''} ${
                  activeNodeId != null && !isActive && !partnerEdge
                    ? styles.dimmed
                    : ''
                }`}
                style={style}
                role="option"
                tabIndex={0}
                aria-selected={isActive}
                aria-label={`${node.hexLabel}. ${node.color}. ${partnerEdge ? `${t('ConnectedToActiveColorWith')} ${partnerEdge.level} ${t('ContrastAt')} ${partnerEdge.ratio.toFixed(1)} to 1.` : t('NoActiveContrastConnectionAnnounced')}`}
                aria-describedby={`${instructionsId} ${liveRegionId}`}
                draggable={false}
                onDragStart={(e) => {
                  e.preventDefault()
                }}
                onPointerDown={handlePointerDown(node.i)}
                onPointerMove={handlePointerMove(node.i)}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onLostPointerCapture={handlePointerUp}
                onFocus={() => {
                  setFocusedNodeId(node.i)
                  setHoveredNodeId(node.i)
                  requestLayoutRefresh()
                }}
                onBlur={() => {
                  setFocusedNodeId((current) =>
                    current === node.i ? null : current
                  )
                  setHoveredNodeId((current) =>
                    current === node.i ? null : current
                  )
                }}
                onClick={(e) => {
                  if (suppressClickRef.current) {
                    suppressClickRef.current = false
                    return
                  }
                  e.currentTarget.focus()
                  togglePinnedNode(node.i)
                  requestLayoutRefresh()
                }}
                onKeyDown={handleNodeKeyDown(node.i)}
                onTransitionEnd={requestLayoutRefresh}
              >
                <span
                  className={styles['constellation-node-inner']}
                  aria-hidden="true"
                />
                <span className="scr">
                  {node.hexLabel} {node.color}
                </span>

                <strong
                  className={styles['constellation-node-label']}
                  aria-hidden="true"
                >
                  {node.hexLabel}
                </strong>

                {partnerEdge && (
                  <span
                    className={styles['constellation-badge']}
                    aria-hidden="true"
                  >
                    {partnerEdge.level} · {partnerEdge.ratio.toFixed(1)}:1
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <p id={instructionsId} className="scr">
        {t('ColorConstellationInstructions')}
      </p>

      <p
        id={liveRegionId}
        className="scr"
        aria-live="polite"
        aria-atomic="true"
      >
        {liveRegionMessage}
      </p>

      <div className={styles['constellation-legend']} role="group">
        <div className={styles.inner}>
          {nodes.find((node) => node.i === activeNodeId)?.hexLabel ? (
            <CopyToClipboard
              value={
                nodes.find((node) => node.i === activeNodeId)?.hexLabel ??
                t('ColorAccessibility')
              }
              label={
                nodes.find((node) => node.i === activeNodeId)?.hexLabel ??
                t('ColorAccessibility')
              }
              aria-label={
                nodes.find((node) => node.i === activeNodeId)?.hexLabel +
                ' ' +
                t('CopyToClipboard')
              }
              className={styles['copy-to-clipboard']}
            />
          ) : (
            <span>{t('CurrentThreshold')}</span>
          )}
          <span>
            {nodes.find((node) => node.i === activeNodeId)?.color ? (
              <CopyToClipboard
                value={
                  nodes.find((node) => node.i === activeNodeId)?.color ??
                  `${threshold}:1`
                }
                label={
                  nodes.find((node) => node.i === activeNodeId)?.color ??
                  `${threshold}:1`
                }
                aria-label={
                  nodes.find((node) => node.i === activeNodeId)?.color +
                  ' ' +
                  t('CopyToClipboard')
                }
                className={styles['copy-to-clipboard']}
              />
            ) : (
              `${threshold}:1`
            )}
          </span>
          <div className={styles['constellation-thresholds']}>
            {THRESHOLDS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={threshold === value}
                aria-label={`${t('ShowColorLinksAtContrastAndAbove')} ${value} to 1`}
                className={`${styles['constellation-threshold-btn']} ${styles[`btn-${sanitize(value.toString())}`]} ${
                  threshold === value ? styles.active : ''
                }`}
                onClick={handleThresholdClick(value)}
              >
                {value}:1
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
