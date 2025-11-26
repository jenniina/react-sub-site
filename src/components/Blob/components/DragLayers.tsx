import {
  RefObject,
  SetStateAction,
  Dispatch as DispatchReact,
  TouchEvent as TouchEventReact,
  MouseEvent as MouseEventReact,
  PointerEvent as PointerEventReact,
  createRef,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import { Draggable, focusedBlob, ColorPair, Modes } from '../types'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { useIsClient, useWindow } from '../../../hooks/useSSR'
import DragLayer from './DragLayer'

let moveElement: boolean
let reset = true

let initialX = 0
let initialY = 0

let initialScale: number
let tapCount = 0
let tapTimeout: NodeJS.Timeout | null = null

const angle = '90deg'

interface DragLayerProps {
  layer_: number
  layerAmount: number
  hiddenLayers: Set<number>
  setActiveLayer: DispatchReact<SetStateAction<number>>
  changeBlobLayer: (draggable: Draggable, layer: number) => void
  highestZIndex: Record<number, number>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: DispatchReact<any>
  d: number
  items: Draggable[]
  getPosition: (target: HTMLElement) => void
  dragWrap: RefObject<HTMLDivElement>
  setSelectedvalue0: DispatchReact<SetStateAction<string | null>>
  exitApp: RefObject<HTMLDivElement>
  colorPairs: ColorPair[][]
  removeBlob: (draggable: Draggable) => void
  mode: Modes
  setFocusedBlob: DispatchReact<SetStateAction<focusedBlob | null>>
  colorIndex: number
  setColorIndex: DispatchReact<SetStateAction<number>>
  setScroll: DispatchReact<SetStateAction<boolean>>
  scroll: boolean
  clickOutsideRef: RefObject<HTMLDivElement>
  colorswitch: () => string
  addRandomDraggable: (x_pos: string, y_pos: string, layer: number) => void
  changeColor: (id: string) => void
}

const preventDefault = (e: Event) => {
  e.preventDefault()
  e.stopImmediatePropagation()
}

const DragLayers = ({
  layer_,
  layerAmount,
  hiddenLayers,
  setActiveLayer,
  changeBlobLayer,
  highestZIndex,
  dispatch,
  d,
  items,
  getPosition,
  dragWrap,
  setSelectedvalue0,
  exitApp,
  colorPairs,
  removeBlob,
  mode,
  setFocusedBlob,
  colorIndex,
  setColorIndex,
  setScroll,
  scroll,
  clickOutsideRef,
  colorswitch,
  addRandomDraggable,
  changeColor,
}: DragLayerProps) => {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t } = useLanguageContext()

  const currentFocusedElementRef = useRef<HTMLElement | null>(null)

  const sortedDraggables = useMemo(
    () => [...items].sort((a, b) => a.layer - b.layer),
    [items]
  )

  const groupedDraggables = useMemo(
    () =>
      sortedDraggables.reduce(
        (acc, draggable) => {
          if (!acc[draggable.layer]) {
            acc[draggable.layer] = []
          }
          acc[draggable.layer].push(draggable)
          return acc
        },
        {} as Record<number, Draggable[]>
      ),
    [sortedDraggables]
  )

  const layers = useMemo(
    () => Array.from({ length: layerAmount }, (_, i) => i),
    [layerAmount]
  )

  const layerRefs = useMemo(() => {
    return Array.from({ length: layerAmount }, (_, i) => i).reduce(
      (acc, layer) => {
        acc[layer] = createRef<HTMLUListElement>()
        return acc
      },
      {} as Record<number, RefObject<HTMLUListElement>>
    )
  }, [layerAmount])

  //Detect touch device
  const isTouchDevice = useMemo(() => {
    if (!isClient) return false
    try {
      document?.createEvent('TouchEvent')
      return true
    } catch {
      return false
    }
  }, [isClient])

  //const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0

  //Remove exit notice's tabindex and text as unnecessary after leaving it
  const exitAppBlur = useCallback(() => {
    if (exitApp.current) {
      exitApp.current?.removeAttribute('tabindex')
      exitApp.current?.removeEventListener('blur', exitAppBlur)
      exitApp.current.textContent = ''
    }
  }, [exitApp])

  //Clone blob
  const makeBlob = useCallback(
    (draggable: Draggable) => {
      void dispatch({
        type: 'duplicateDraggable',
        payload: { d: d, draggable },
      })
    },
    [dispatch, d]
  )

  // Keyboard use
  const keyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isClient || !windowObj) return

      const movePx = 4

      const target = currentFocusedElementRef.current
      if (!target) return

      const blobStyle = windowObj.getComputedStyle(target)

      const setFocus = (target: HTMLElement) => {
        const marginTop = parseFloat(blobStyle.marginTop)
        const marginLeft = parseFloat(blobStyle.marginLeft)

        const blobRect = target.getBoundingClientRect()
        const parentRect = (
          target.parentNode as HTMLDivElement
        )?.getBoundingClientRect()
        setFocusedBlob({
          top: blobRect.top - parentRect.top - marginTop,
          left: blobRect.left - parentRect.left - marginLeft,
          width: blobRect.width,
          height: blobRect.height,
        })
      }

      const value =
        blobStyle.getPropertyValue('--i') ??
        target.style.getPropertyValue('--i') ??
        '10'
      let scale = parseFloat(value)
      scale = isNaN(scale) ? 10 : scale

      const attrLeft =
        parseFloat(blobStyle.getPropertyValue('left')) ??
        parseFloat(target.style.getPropertyValue('left')) ??
        0
      const attrTop =
        parseFloat(blobStyle.getPropertyValue('top')) ??
        parseFloat(target.style.getPropertyValue('top')) ??
        0

      const layer = target.style.getPropertyValue('--layer')

      const draggable: Draggable = {
        layer: parseInt(layer) ?? layer_,
        id: target.id,
        number: parseInt(target.id.replace('blob', '').split('-')[0], 10),
        i: scale,
        x: target.style.getPropertyValue('left').toString(),
        y: target.style.getPropertyValue('top').toString(),
        z: target.style.zIndex ?? '0',
        background:
          target.style.background ??
          'linear-gradient(90deg, cyan, greenyellow)',
      }

      const updatePosition = (left: number, top: number) => {
        void dispatch({
          type: 'partialUpdate',
          payload: {
            d: d,
            id: target.id,
            update: {
              x: `${left}px`,
              y: `${top}px`,
            },
          },
        })
        setFocus(target)
      }

      const cooldown = () => {
        reset = true
      }

      const handleNumberPress = (l: number) => {
        e.preventDefault()
        if (reset) {
          reset = false
          changeBlobLayer(draggable, l)
          setTimeout(cooldown, 100)
        }
      }
      const key = e.key
      if (parseInt(key) >= 1 && parseInt(key) <= layerAmount) {
        handleNumberPress(parseInt(key) - 1)
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          if (reset) {
            updatePosition(attrLeft - movePx, attrTop)
            setTimeout(cooldown, 100)
          }

          break
        case 'ArrowRight':
          e.preventDefault()
          if (reset) {
            updatePosition(attrLeft + movePx, attrTop)
            setTimeout(cooldown, 100)
          }
          break
        case 'ArrowUp':
          e.preventDefault()
          if (reset) {
            updatePosition(attrLeft, attrTop - movePx)
            setTimeout(cooldown, 100)
          }
          break
        case 'ArrowDown':
          e.preventDefault()
          if (reset) {
            updatePosition(attrLeft, attrTop + movePx)
            setTimeout(cooldown, 100)
          }
          break
        case 'Escape':
          e.preventDefault()

          setScroll(true)
          if (document) document.body.style.overflowY = 'auto'
          if (document) document.body.style.overflowX = 'hidden'

          if (exitApp.current) {
            exitApp.current.setAttribute('tabindex', '0')
            exitApp.current.addEventListener('blur', exitAppBlur)
          }
          target.blur()
          dragWrap.current?.blur()
          //Go to exit notice in order to remove focus from the app
          if (exitApp.current)
            exitApp.current.textContent = t('ThankYouForPlaying')
          exitApp.current?.focus()
          break
        case 'Enter': //Cycle through colors
          e.preventDefault()
          e.stopPropagation()
          if (reset) {
            reset = false
            if (target.closest(`#drag-wrap${d}`)) {
              setColorIndex(prevColorIndex => {
                const nextColorIndex =
                  (prevColorIndex + 1) % colorPairs[d].length
                return nextColorIndex // Return the new color index
              })
            }
            setTimeout(cooldown, 100)
          }
          break
        case 'R':
        case 'r':
        case ' ': //Cycle through random colors using colorswitch
          e.preventDefault()
          e.stopPropagation()
          if (reset) {
            reset = false
            if (target.closest(`#drag-wrap${d}`)) {
              const color1 = colorswitch()
              let color2 = colorswitch()

              if (color2 === color1) {
                color2 = colorswitch()
              }

              const newBackground = `linear-gradient(${angle}, ${color1}, ${color2})`
              void dispatch({
                type: 'partialUpdate',
                payload: {
                  d: d,
                  id: target.id,
                  update: { background: newBackground },
                },
              })
            }
            setTimeout(cooldown, 100)
          }
          break
        case 'Z': //Move blob to the bottom of the z-index pile
        case 'z':
          e.preventDefault()
          if (reset) {
            reset = false
            void dispatch({
              type: 'partialUpdate',
              payload: {
                d: d,
                id: target.id,
                update: {
                  z: '0',
                },
              },
            })
            setTimeout(cooldown, 100)
          }
          break
        case 'T': //Move blob to the top of the z-index pile
        case 't':
          //e.stopImmediatePropagation()
          e.preventDefault()
          if (reset) {
            reset = false
            void dispatch({
              type: 'partialUpdate',
              payload: {
                d: d,
                id: target.id,
                update: {
                  z: `${Math.max(1, highestZIndex[layer_] + 1)}`,
                },
              },
            })
            setTimeout(cooldown, 100)
          }
          break
        case 'S':
        case 's': //make blob smaller
          e.preventDefault()
          if (reset) {
            reset = false
            scale -= 0.4
            scale = Math.min(Math.max(7, scale), 36)
            void dispatch({
              type: 'partialUpdate',
              payload: {
                d: d,
                id: target.id,
                update: {
                  i: scale,
                },
              },
            })
            setTimeout(cooldown, 100)
          }
          break
        case 'B': //make blob larger
        case 'b':
        case 'L':
        case 'l':
          //e.stopImmediatePropagation()
          e.preventDefault()
          if (reset) {
            reset = false
            scale += 0.4
            scale = Math.min(Math.max(7, scale), 36)
            void dispatch({
              type: 'partialUpdate',
              payload: {
                d: d,
                id: target.id,
                update: {
                  i: scale,
                },
              },
            })
            setTimeout(cooldown, 100)
          }
          break
        case 'C': //make a new clone
        case 'c':
        case 'D':
        case 'd':
          e.preventDefault()
          //e.stopImmediatePropagation()
          if (reset) {
            reset = false
            makeBlob(draggable)
            setTimeout(cooldown, 100)
          }
          break
        case '+': // Make a random blob
          e.preventDefault()
          if (reset) {
            reset = false
            addRandomDraggable(draggable.x, draggable.y, draggable.layer)
            setTimeout(cooldown, 200)
          }
          break
        case 'Delete': //remove blob
        case '-':
          //e.stopImmediatePropagation()
          e.preventDefault()
          if (reset) {
            reset = false
            removeBlob(draggable)
            setTimeout(cooldown, 100)
          }
          break
      }
    },
    [
      isClient,
      windowObj,
      d,
      layer_,
      layerAmount,
      dispatch,
      setFocusedBlob,
      setColorIndex,
      changeBlobLayer,
      removeBlob,
      setScroll,
      exitApp,
      dragWrap,
      t,
      colorPairs,
      colorswitch,
      addRandomDraggable,
      makeBlob,
      exitAppBlur,
      highestZIndex,
    ]
  )

  const handleOutsideClick = useCallback(() => {
    reset = true
    document?.removeEventListener('keydown', keyDown)
    document?.removeEventListener('touchmove', preventDefault)
  }, [keyDown])

  useOutsideClick({
    ref: clickOutsideRef,
    onOutsideClick: handleOutsideClick,
  })

  useEffect(() => {
    if (
      isTouchDevice &&
      !currentFocusedElementRef.current &&
      scroll &&
      document
    ) {
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
      document.removeEventListener('keydown', keyDown)
      document.removeEventListener('touchmove', preventDefault)
    }
  }, [scroll, isTouchDevice, keyDown])

  const start = useCallback(
    (
      e:
        | TouchEvent
        | MouseEvent
        | PointerEvent
        | TouchEventReact
        | MouseEventReact
        | PointerEventReact,
      target: HTMLElement
    ) => {
      e.stopPropagation()
      e.preventDefault()

      if (document?.activeElement instanceof HTMLElement) {
        document?.activeElement.blur()
      }

      moveElement = true
      currentFocusedElementRef.current = target

      initialX = !isTouchDevice
        ? (e as PointerEvent).clientX
        : (e as TouchEvent).touches[0].clientX
      initialY = !isTouchDevice
        ? (e as PointerEvent).clientY
        : (e as TouchEvent).touches[0].clientY
      target.classList.add('drag')
      const highestZIndexForLayer = highestZIndex[layer_]
      if (isTouchDevice) {
        const value = target?.style.getPropertyValue('--i') ?? '10'
        initialScale = parseFloat(value)
        initialScale = isNaN(initialScale) ? 10 : initialScale
      }
      void dispatch({
        type: 'partialUpdate',
        payload: {
          d: d,
          id: target.id,
          update: {
            z: `${Math.max(1, highestZIndexForLayer + 1)}`,
          },
        },
      })
      //;(target as HTMLElement).focus() // This breaks dragging once a key is pressed and only clears after clicking away from the target

      document?.addEventListener('keydown', keyDown)
      const blobLayer = target.style.getPropertyValue('--layer')
      setActiveLayer(isNaN(parseInt(blobLayer)) ? 1 : parseInt(blobLayer))

      if (isTouchDevice) {
        document?.addEventListener('touchmove', preventDefault, {
          passive: false,
        })
        if (document) document.body.style.overflow = 'hidden'
      }
    },
    [keyDown, isTouchDevice, dispatch, d, highestZIndex, layer_, setActiveLayer]
  )

  //Handle mousemove and touchmove
  const movement = useCallback(
    (
      e:
        | TouchEvent
        | MouseEvent
        | PointerEvent
        | TouchEventReact
        | MouseEventReact
        | PointerEventReact
    ) => {
      e.stopPropagation()
      if (isTouchDevice) {
        e.preventDefault()
        if (document) document.body.style.overflow = 'hidden'
      }
      if (moveElement) {
        const newX = !isTouchDevice
          ? (e as PointerEvent).clientX
          : (e as TouchEvent).touches[0].clientX
        const newY = !isTouchDevice
          ? (e as PointerEvent).clientY
          : (e as TouchEvent).touches[0].clientY
        currentFocusedElementRef.current!.style.top =
          currentFocusedElementRef.current!.offsetTop - (initialY - newY) + 'px'
        currentFocusedElementRef.current!.style.left =
          currentFocusedElementRef.current!.offsetLeft -
          (initialX - newX) +
          'px'
        initialX = newX
        initialY = newY

        void dispatch({
          type: 'partialUpdate',
          payload: {
            d: d,
            id: currentFocusedElementRef.current?.id,
            update: {
              x: currentFocusedElementRef.current!.style.left,
              y: currentFocusedElementRef.current!.style.top,
            },
          },
        })
      }
    },
    [isTouchDevice, dispatch, d]
  )

  //Handle mouse up and touch end, check for element overlap
  const stopMovementCheck = useCallback(
    (
      e:
        | TouchEvent
        | MouseEvent
        | PointerEvent
        | TouchEventReact
        | MouseEventReact
        | PointerEventReact,
      target: HTMLElement
    ) => {
      e.stopPropagation()
      e.preventDefault()
      moveElement = false
      tapCount++

      if (tapTimeout) clearTimeout(tapTimeout)
      tapTimeout = setTimeout(() => {
        if (tapCount === 2) {
          // Double-tap detected, shrink
          let scale = initialScale - 0.8
          scale = Math.max(7, scale)
          void dispatch({
            type: 'partialUpdate',
            payload: {
              d: d,
              id: currentFocusedElementRef.current?.id,
              update: {
                i: scale,
              },
            },
          })
        } else if (tapCount === 3) {
          // Triple-tap detected, grow
          let scale = initialScale + 0.8
          scale = Math.min(36, scale)
          void dispatch({
            type: 'partialUpdate',
            payload: {
              d: d,
              id: currentFocusedElementRef.current?.id,
              update: {
                i: scale,
              },
            },
          })
        }
        tapCount = 0
      }, 300)

      document?.removeEventListener('keydown', keyDown)

      if (isTouchDevice && scroll && document) {
        document.removeEventListener('touchmove', preventDefault)

        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
      } else if (isTouchDevice && !scroll && document) {
        document.body.style.overflow = 'hidden'
      }

      target.classList.remove('drag')
      target.blur()
      if (tapCount === 0) currentFocusedElementRef.current = null
      else currentFocusedElementRef.current = target
      setFocusedBlob(null)
    },
    [isTouchDevice, scroll, dispatch, d, keyDown, setFocusedBlob]
  )

  //Handle mouse leave
  const stopMoving = useCallback(
    (
      e: MouseEvent | MouseEventReact | PointerEvent | PointerEventReact,
      target: HTMLElement
    ) => {
      e.stopPropagation()
      moveElement = false
      currentFocusedElementRef.current = null
      if (isTouchDevice && scroll && document) {
        document?.removeEventListener('touchmove', preventDefault)
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
      } else if (isTouchDevice && !scroll && document) {
        document.body.style.overflow = 'hidden'
      }

      getPosition(target)
      target.classList.remove('drag')
      document?.removeEventListener('keydown', keyDown)
      target.blur()
    },
    [keyDown, isTouchDevice, scroll, getPosition]
  )

  useEffect(() => {
    if (
      isTouchDevice &&
      !currentFocusedElementRef.current &&
      scroll &&
      document
    ) {
      document.removeEventListener('touchmove', preventDefault)
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
    }
  }, [stopMovementCheck, stopMoving, scroll, isTouchDevice, getPosition])

  //on blob blur
  const blurred = useCallback(
    (draggable: HTMLElement) => {
      draggable.classList.remove('drag')
      document?.removeEventListener('keydown', keyDown)
      getPosition(draggable)
      draggable.draggable = false
      currentFocusedElementRef.current = null
    },
    [keyDown, getPosition]
  )

  //on focused blob
  const focused = useCallback(
    (draggable: HTMLElement) => {
      // getPosition(draggable)
      currentFocusedElementRef.current = draggable
      draggable.classList.add('drag')
      const layerStyle = draggable.style.getPropertyValue('--layer')
      setActiveLayer(parseInt(layerStyle) ?? 2)
      document?.addEventListener('keydown', keyDown)
      draggable.draggable = true
    },
    [keyDown, setActiveLayer]
  )

  const zoom = useCallback(
    (e: WheelEvent, target: HTMLElement) => {
      //e.preventDefault();

      //scale += e.deltaY * -0.00001

      if (!isClient || !windowObj) return

      if (reset) {
        reset = false
        const blobStyle = windowObj.getComputedStyle(target)
        const value =
          blobStyle.getPropertyValue('--i') ??
          target.style.getPropertyValue('--i') ??
          '10'
        let scale = parseFloat(value)
        scale = isNaN(scale) ? 10 : scale
        if (e.deltaY < 0) scale *= 1.04
        else scale *= 0.96
        scale = Math.min(Math.max(7, scale), 36)
        void dispatch({
          type: 'partialUpdate',
          payload: {
            d: d,
            id: target.id,
            update: {
              i: scale,
            },
          },
        })
        const cooldown = () => {
          reset = true
        }
        setTimeout(cooldown, 100)
      }
    },
    [isClient, windowObj, dispatch, d]
  )

  //Mousewheel use
  const wheel = useCallback(
    (target: HTMLElement) => {
      const zoomHandler = (e: WheelEvent) => zoom(e, target)
      if (!scroll)
        target.addEventListener('wheel', zoomHandler, { passive: false })
      return () => {
        target.removeEventListener('wheel', zoomHandler)
      }
    },
    [scroll, zoom]
  )

  useEffect(() => {
    const target = currentFocusedElementRef.current
    if (target) {
      const { color1, color2 } = colorPairs[d][colorIndex]
      const newBackground = `linear-gradient(${angle}, ${color1}, ${color2})`

      void dispatch({
        type: 'partialUpdate',
        payload: {
          d: d,
          id: target.id,
          update: { background: newBackground },
        },
      })
    }
  }, [colorIndex, d, dispatch, colorPairs])

  if (!isClient) {
    return (
      <div className="flex center margin0auto textcenter">
        {t('Loading')}...
      </div>
    )
  }

  return (
    <>
      {layers.map(l => (
        <DragLayer
          key={l}
          layer_={l}
          dragUlRef={layerRefs[l]}
          items={groupedDraggables[l] ?? []}
          className={hiddenLayers.has(l) ? 'hidden' : ''}
          d={d}
          setSelectedvalue0={setSelectedvalue0}
          setFocusedBlob={setFocusedBlob}
          start={start}
          movement={movement}
          stopMovementCheck={stopMovementCheck}
          stopMoving={stopMoving}
          wheel={wheel}
          focused={focused}
          blurred={blurred}
          removeBlob={removeBlob}
          mode={mode}
          changeBlobLayer={changeBlobLayer}
          layerAmount={layerAmount}
          changeColor={changeColor}
        />
      ))}
    </>
  )
}

export default DragLayers
