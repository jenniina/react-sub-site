import {
  RefObject,
  SetStateAction,
  Dispatch as DispatchReact,
  TouchEvent as TouchEventReact,
  MouseEvent as MouseEventReact,
  PointerEvent as PointerEventReact,
  useRef,
  useState,
  createRef,
  useEffect,
  useCallback,
} from 'react'
import { Draggable, focusedBlob, ColorPair } from '../interfaces'
import { ELanguages } from '../../../interfaces'
import DragLayer from './DragLayer'
import { ESelectedBlobNone } from '../../../interfaces/blobs'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import useTimeout from '../../../hooks/useTimeout'
import { notify } from '../../../reducers/notificationReducer'

interface DragLayerProps {
  layer: number
  layerAmount: number
  hiddenLayers: Set<number>
  setActiveLayer: DispatchReact<SetStateAction<number>>
  changeBlobLayer: (draggable: Draggable, layer: number) => void
  highestZIndex: Record<number, number>
  language: ELanguages
  dispatch: DispatchReact<any>
  d: number
  items: Draggable[]
  saveDraggables: () => void
  getPosition: (target: HTMLElement) => void
  dragWrap: RefObject<HTMLDivElement>
  selectedvalue0: RefObject<HTMLSpanElement>
  exitApp: RefObject<HTMLDivElement>
  colorBlockProps: RefObject<HTMLDivElement>[][]
  colorPairs: ColorPair[][]
  makeLarger0: RefObject<HTMLDivElement>
  makeSmaller0: RefObject<HTMLDivElement>
  makeMore0: RefObject<HTMLDivElement>
  deleteBlob0: RefObject<HTMLDivElement>
  layerIncrease: RefObject<HTMLDivElement>
  layerDecrease: RefObject<HTMLDivElement>
  setFocusedBlob: DispatchReact<SetStateAction<focusedBlob | null>>
  colorIndex: number
  setColorIndex: DispatchReact<SetStateAction<number>>
  setScroll: DispatchReact<SetStateAction<boolean>>
  scroll: boolean
  clickOutsideRef: RefObject<HTMLDivElement>
  colorswitch: () => string
}

let moveElement: boolean
let reset: boolean = true

let initialX = 0
let initialY = 0

let initialDistance: number
let initialScale: number
let tapCount: number = 0
let tapTimeout: NodeJS.Timeout | null = null

let angle = '90deg'

let currentFocusedElement: HTMLElement | null

const preventDefault = (e: Event) => {
  e.preventDefault()
  e.stopImmediatePropagation()
}

const DragLayers = (props: DragLayerProps) => {
  const sortedDraggables = [...props.items].sort((a, b) => a.layer - b.layer)

  const groupedDraggables = sortedDraggables.reduce((acc, draggable) => {
    if (!acc[draggable.layer]) {
      acc[draggable.layer] = []
    }
    acc[draggable.layer].push(draggable)
    return acc
  }, {} as Record<number, Draggable[]>)

  const layers = Array.from({ length: props.layerAmount }, (_, i) => i)

  // const layerRefs = layers.reduce(
  //   (acc: Record<number, RefObject<HTMLUListElement>>, layer) => {
  //     acc[layer] = useRef(null)
  //     return acc
  //   },
  //   {} as Record<number, RefObject<HTMLUListElement>>
  // )

  // const layerRefs = useRef<Record<number, RefObject<HTMLUListElement>>>(
  //   layers.reduce((acc, layer) => {
  //     acc[layer] = createRef<HTMLUListElement>()
  //     return acc
  //   }, {} as Record<number, RefObject<HTMLUListElement>>)
  // )

  const layerRefs = useRef<Record<number, RefObject<HTMLUListElement>>>({})

  useEffect(() => {
    const refs = layers.reduce((acc, layer) => {
      acc[layer] = createRef<HTMLUListElement>()
      return acc
    }, {} as Record<number, RefObject<HTMLUListElement>>)

    layerRefs.current = refs
  }, [props.layerAmount])

  //Detect touch device
  const isTouchDevice = () => {
    try {
      //Try to create TouchEvent (fails for desktops and throws error)
      document.createEvent('TouchEvent')
      return true
    } catch (e) {
      return false
    }
  }

  //const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0

  useEffect(() => {
    isTouchDevice()
  }, [])

  // Change the layer of the blob by 1 up to the maximum layer amount
  const increaseBlobLayer = (draggable: Draggable) => {
    let layer = draggable.layer
    if (layer < props.layerAmount - 1) {
      layer += 1
      props.changeBlobLayer(draggable, layer)
    }
  }
  const decreaseBlobLayer = (draggable: Draggable) => {
    let layer = draggable.layer
    if (layer > 0) {
      layer -= 1
      props.changeBlobLayer(draggable, layer)
    }
  }

  //Check to see if elements overlap
  function elementsOverlap(element1: HTMLElement, element2: HTMLElement) {
    const domRect1 = element1.getBoundingClientRect()
    const domRect2 = element2.getBoundingClientRect()

    return !(
      domRect1.top + 5 > domRect2.bottom - 5 ||
      domRect1.right < domRect2.left ||
      domRect1.bottom - 5 < domRect2.top + 5 ||
      domRect1.left > domRect2.right
    )
  }

  const handleOutsideClick = useCallback(
    (e: Event) => {
      reset = true
      document.removeEventListener('keydown', keyDown)
      document.removeEventListener('touchmove', preventDefault)
    },
    [keyDown]
  )

  useOutsideClick({
    ref: props.clickOutsideRef,
    onOutsideClick: handleOutsideClick,
  })

  useEffect(() => {
    if (isTouchDevice() && !currentFocusedElement && props.scroll) {
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
      document.removeEventListener('keydown', keyDown)
      document.removeEventListener('touchmove', preventDefault)
    }
  }, [currentFocusedElement, props.scroll])

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

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }

      moveElement = true
      currentFocusedElement = target

      initialX = !isTouchDevice()
        ? (e as PointerEvent).clientX
        : (e as TouchEvent).touches[0].clientX
      initialY = !isTouchDevice()
        ? (e as PointerEvent).clientY
        : (e as TouchEvent).touches[0].clientY
      ;(target as HTMLElement).classList.add('drag')
      const highestZIndexForLayer = props.highestZIndex[props.layer]
      if (isTouchDevice()) {
        let value = target?.style.getPropertyValue('--i') ?? '7'
        initialScale = parseFloat(value)
        initialScale = isNaN(initialScale) ? 7 : initialScale
      }
      props.dispatch({
        type: 'partialUpdate',
        payload: {
          d: props.d,
          id: target.id,
          update: {
            z: `${Math.max(1, highestZIndexForLayer + 1)}`,
          },
        },
      })
      //;(target as HTMLElement).focus() // This breaks dragging once a key is pressed and only clears after clicking away from the target

      document.addEventListener('keydown', keyDown)
      const layer = (target as HTMLElement).style.getPropertyValue('--layer')
      props.setActiveLayer(parseInt(layer) ?? 0)

      if (isTouchDevice()) {
        document.addEventListener('touchmove', preventDefault, { passive: false })
        document.body.style.overflow = 'hidden'
      }
    },
    [keyDown, isTouchDevice]
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
      if (isTouchDevice()) {
        e.preventDefault()
        document.body.style.overflow = 'hidden'
      }
      if (moveElement) {
        let newX = !isTouchDevice()
          ? (e as PointerEvent).clientX
          : (e as TouchEvent).touches[0].clientX
        let newY = !isTouchDevice()
          ? (e as PointerEvent).clientY
          : (e as TouchEvent).touches[0].clientY
        ;(currentFocusedElement as HTMLElement).style.top =
          (currentFocusedElement as HTMLElement).offsetTop - (initialY - newY) + 'px'
        ;(currentFocusedElement as HTMLElement).style.left =
          (currentFocusedElement as HTMLElement).offsetLeft - (initialX - newX) + 'px'
        initialX = newX
        initialY = newY

        props.dispatch({
          type: 'partialUpdate',
          payload: {
            d: props.d,
            id: currentFocusedElement?.id,
            update: {
              x: (currentFocusedElement as HTMLElement).style.left,
              y: (currentFocusedElement as HTMLElement).style.top,
            },
          },
        })
      }
    },
    [isTouchDevice]
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
          props.dispatch({
            type: 'partialUpdate',
            payload: {
              d: props.d,
              id: currentFocusedElement?.id,
              update: {
                i: scale,
              },
            },
          })
        } else if (tapCount === 3) {
          // Triple-tap detected, grow
          let scale = initialScale + 0.8
          scale = Math.min(36, scale)
          props.dispatch({
            type: 'partialUpdate',
            payload: {
              d: props.d,
              id: currentFocusedElement?.id,
              update: {
                i: scale,
              },
            },
          })
        }
        tapCount = 0
      }, 300)

      // document.removeEventListener('keydown', keyDown)
      let value = (target as HTMLElement).style.getPropertyValue('--i') ?? '7'
      let scale = parseFloat(value)
      scale = isNaN(scale) ? 7 : scale

      const hitbox = target.querySelector('div')

      const draggable: Draggable = {
        layer: parseInt(target.style.getPropertyValue('--layer')),
        id: target.id,
        number: parseInt(target.id.replace('blob', '').split('-')[0], 10),
        i: scale,
        x: target.style.left,
        y: target.style.top,
        z: target.style.zIndex,
        background:
          target.style.background || 'linear-gradient(90deg, cyan, greenyellow)',
      }

      if (isTouchDevice() && props.scroll) {
        document.removeEventListener('touchmove', preventDefault)
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
      } else if (isTouchDevice() && !props.scroll) {
        document.body.style.overflow = 'hidden'
      }

      if (
        props.layerIncrease.current &&
        elementsOverlap(hitbox as HTMLElement, props.layerIncrease.current)
      ) {
        increaseBlobLayer(draggable)
      }
      if (
        props.layerDecrease.current &&
        elementsOverlap(hitbox as HTMLElement, props.layerDecrease.current)
      ) {
        decreaseBlobLayer(draggable)
      }

      props.colorPairs[props.d].forEach((colorPair, index) => {
        const colorBlock = props.colorBlockProps[props.d][index]

        if (
          colorBlock.current &&
          elementsOverlap(hitbox as HTMLElement, colorBlock.current)
        ) {
          const { color1, color2 } = colorPair
          ;(
            target as HTMLElement
          ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
        }
      })

      if (
        props.makeLarger0.current &&
        elementsOverlap(hitbox as HTMLElement, props.makeLarger0.current)
      ) {
        scale += 0.4
        scale = Math.min(Math.max(7, scale), 36)
        props.dispatch({
          type: 'partialUpdate',
          payload: {
            d: props.d,
            id: target.id,
            update: {
              i: scale,
            },
          },
        })
      }
      if (
        props.makeSmaller0.current &&
        elementsOverlap(hitbox as HTMLElement, props.makeSmaller0.current)
      ) {
        scale -= 0.4
        scale = Math.min(Math.max(7, scale), 36)
        props.dispatch({
          type: 'partialUpdate',
          payload: {
            d: props.d,
            id: target.id,
            update: {
              i: scale,
            },
          },
        })
      }
      if (
        props.makeMore0.current &&
        elementsOverlap(hitbox as HTMLElement, props.makeMore0.current)
      ) {
        makeBlob(draggable)
      }
      if (
        props.deleteBlob0.current &&
        elementsOverlap(hitbox as HTMLElement, props.deleteBlob0.current)
      ) {
        removeBlob(draggable)
      }
      //  props.getPosition(target as HTMLElement)
      ;(target as HTMLElement).classList.remove('drag')
      ;(target as HTMLElement).blur()
      tapCount === 0 ? (currentFocusedElement = null) : (currentFocusedElement = target)
      props.setFocusedBlob(null)
    },
    [
      angle,
      elementsOverlap,
      keyDown,
      makeBlob,
      props.colorBlockProps,
      props.colorPairs,
      removeBlob,
      props.scroll,
    ]
  )

  //Handle mouse leave
  const stopMoving = useCallback(
    (
      e: MouseEvent | MouseEventReact | PointerEvent | PointerEventReact,
      target: HTMLElement
    ) => {
      e.stopPropagation()
      moveElement = false
      currentFocusedElement = null
      if (isTouchDevice() && props.scroll) {
        document.removeEventListener('touchmove', preventDefault)
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
      } else if (isTouchDevice() && !props.scroll) {
        document.body.style.overflow = 'hidden'
      }

      props.getPosition(target as HTMLElement)
      ;(target as HTMLElement).classList.remove('drag')
      // document.removeEventListener('keydown', keyDown)
      ;(target as HTMLElement).blur()
    },
    [keyDown]
  )

  useEffect(() => {
    if (isTouchDevice() && !currentFocusedElement && props.scroll) {
      document.removeEventListener('touchmove', preventDefault)
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
    }
    // const handleMouseUp = (e: MouseEvent) => {
    //   if (currentFocusedElement) {
    //     stopMovementCheck(e, currentFocusedElement)
    //   }
    // }
    // const handleTouchEnd = (e: TouchEvent) => {
    //   if (currentFocusedElement) {
    //     stopMovementCheck(e, currentFocusedElement)
    //   }
    // }
    // const handleTouchCancel = (e: TouchEvent) => {
    //   if (currentFocusedElement) {
    //     stopMovementCheck(e, currentFocusedElement)
    //   }
    // }
    // const handleDragEnd = (e: DragEvent) => {
    //   if (currentFocusedElement) {
    //     stopMovementCheck(e, currentFocusedElement)
    //   }
    // }

    // document.addEventListener('mouseup', handleMouseUp)
    // document.addEventListener('touchend', handleTouchEnd)
    // document.addEventListener('touchcancel', handleTouchCancel)
    // document.addEventListener('dragend', handleDragEnd)

    // return () => {
    //   document.removeEventListener('mouseup', handleMouseUp)
    //   document.removeEventListener('touchend', handleTouchEnd)
    //   document.removeEventListener('touchcancel', handleTouchCancel)
    //   document.removeEventListener('dragend', handleDragEnd)
    // }
  }, [stopMovementCheck, stopMoving, currentFocusedElement, props.scroll])

  //on blob blur
  function blurred(draggable: HTMLElement) {
    draggable.classList.remove('drag')
    document.removeEventListener('keydown', keyDown)
    props.getPosition(draggable)
    draggable.draggable = false
    currentFocusedElement = null
  }

  const [dragWrapRect, setDragWrapRect] = useState<DOMRect | undefined>(
    props.dragWrap.current?.getBoundingClientRect()
  )
  const [dragWrapCurrent, setDragWrapCurrent] = useState<HTMLElement | null>(
    props.dragWrap.current
  )

  //on focused blob
  function focused(draggable: HTMLElement) {
    // props.getPosition(draggable)
    currentFocusedElement = draggable
    draggable.classList.add('drag')
    const layerStyle = (draggable as HTMLElement).style.getPropertyValue('--layer')
    props.setActiveLayer(parseInt(layerStyle) ?? 0)
    document.addEventListener('keydown', keyDown)
    draggable.draggable = true
  }

  //Mousewheel use
  function wheel(target: HTMLElement) {
    const zoomHandler = (e: WheelEvent) => zoom(e, target)
    target.addEventListener('wheel', zoomHandler, { passive: false })
    return () => {
      target.removeEventListener('wheel', zoomHandler)
    }
  }
  function zoom(e: WheelEvent, target: HTMLElement) {
    //e.preventDefault();

    //scale += e.deltaY * -0.00001

    if (reset) {
      reset = false
      const blobStyle = window.getComputedStyle(target)
      let value =
        blobStyle.getPropertyValue('--i') ?? target.style.getPropertyValue('--i') ?? '7'
      let scale = parseFloat(value)
      scale = isNaN(scale) ? 7 : scale
      e.deltaY < 0 ? (scale *= 1.04) : (scale *= 0.96)
      scale = Math.min(Math.max(7, scale), 36)
      props.dispatch({
        type: 'partialUpdate',
        payload: {
          d: props.d,
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
  }

  useEffect(() => {
    const target = currentFocusedElement
    if (target) {
      const { color1, color2 } = props.colorPairs[props.d][props.colorIndex]
      const newBackground = `linear-gradient(${angle}, ${color1}, ${color2})`

      props.dispatch({
        type: 'partialUpdate',
        payload: {
          d: props.d,
          id: target.id,
          update: { background: newBackground },
        },
      })
    }
  }, [props.colorIndex])

  // Keyboard use
  function keyDown(e: KeyboardEvent) {
    const movePx = 4

    const target = currentFocusedElement
    if (!target) return

    const blobStyle = window.getComputedStyle(target)

    const setFocus = (target: HTMLElement) => {
      const marginTop = parseFloat(blobStyle.marginTop)
      const marginLeft = parseFloat(blobStyle.marginLeft)

      const blobRect = target.getBoundingClientRect()
      const parentRect = (target.parentNode as HTMLDivElement)?.getBoundingClientRect()
      props.setFocusedBlob({
        top: blobRect.top - parentRect.top - marginTop,
        left: blobRect.left - parentRect.left - marginLeft,
        width: blobRect.width,
        height: blobRect.height,
      })
    }

    let value =
      blobStyle.getPropertyValue('--i') ??
      (target as HTMLElement).style.getPropertyValue('--i') ??
      '7'
    let scale = parseFloat(value)
    scale = isNaN(scale) ? 7 : scale

    let attrLeft =
      parseFloat(blobStyle.getPropertyValue('left')) ??
      parseFloat(target.style.getPropertyValue('left')) ??
      0
    let attrTop =
      parseFloat(blobStyle.getPropertyValue('top')) ??
      parseFloat(target.style.getPropertyValue('top')) ??
      0

    const draggable: Draggable = {
      layer: parseInt(target.style.getPropertyValue('--layer')) ?? props.layer,
      id: target.id,
      number: parseInt(target.id.replace('blob', '').split('-')[0], 10),
      i: scale,
      x: target.style.getPropertyValue('left').toString(),
      y: target.style.getPropertyValue('top').toString(),
      z: target.style.zIndex ?? '0',
      background: target.style.background ?? 'linear-gradient(90deg, cyan, greenyellow)',
    }

    const updatePosition = (left: number, top: number) => {
      props.dispatch({
        type: 'partialUpdate',
        payload: {
          d: props.d,
          id: target.id,
          update: {
            x: `${left}px`,
            y: `${top}px`,
          },
        },
      })
      setFocus(target)
    }

    const handleNumberPress = (layer: number) => {
      e.preventDefault()
      if (reset) {
        reset = false
        props.changeBlobLayer(draggable, layer)
        const cooldown = () => {
          reset = true
        }
        setTimeout(cooldown, 100)
      }
    }
    const key = e.key
    if (key >= '1' && key <= props.layerAmount?.toString()) {
      handleNumberPress(parseInt(key) - 1)
    }

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        updatePosition(attrLeft - movePx, attrTop)
        break
      case 'ArrowRight':
        e.preventDefault()
        updatePosition(attrLeft + movePx, attrTop)
        break
      case 'ArrowUp':
        e.preventDefault()
        updatePosition(attrLeft, attrTop - movePx)
        break
      case 'ArrowDown':
        e.preventDefault()
        updatePosition(attrLeft, attrTop + movePx)
        break
      case 'Escape':
        e.preventDefault()

        props.setScroll(true)
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'

        if (props.exitApp.current) {
          props.exitApp.current.setAttribute('tabindex', '0')
          props.exitApp.current.addEventListener('blur', exitAppBlur)
        }
        ;(target as HTMLElement).blur()
        props.dragWrap.current?.blur()
        //Go to exit notice in order to remove focus from the app
        if (props.exitApp.current)
          props.exitApp.current.textContent = 'Thank you for playing!'
        props.exitApp.current?.focus()
        break
      case 'Enter': //Cycle through colors
        e.preventDefault()
        e.stopPropagation()
        if ((target as HTMLElement).closest(`#drag-wrap${props.d}`)) {
          props.setColorIndex((prevColorIndex) => {
            const nextColorIndex = (prevColorIndex + 1) % props.colorPairs[props.d].length
            return nextColorIndex // Return the new color index
          })
        }
        break
      case 'R':
      case 'r':
      case ' ': //Cycle through random colors using colorswitch
        e.preventDefault()
        e.stopPropagation()
        if ((target as HTMLElement).closest(`#drag-wrap${props.d}`)) {
          const color1 = props.colorswitch()
          let color2 = props.colorswitch()

          // Ensure color2 is different from color1
          while (color2 === color1) {
            color2 = props.colorswitch()
          }

          const newBackground = `linear-gradient(${angle}, ${color1}, ${color2})`
          props.dispatch({
            type: 'partialUpdate',
            payload: {
              d: props.d,
              id: target.id,
              update: { background: newBackground },
            },
          })
        }
        break
      case 'Z': //Move blob to the bottom of the z-index pile
      case 'z':
        e.preventDefault()
        if (reset) {
          reset = false
          props.dispatch({
            type: 'partialUpdate',
            payload: {
              d: props.d,
              id: target.id,
              update: {
                z: '0',
              },
            },
          })
          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case 'T': //Move blob to the top of the z-index pile
      case 't':
        //e.stopImmediatePropagation()
        e.preventDefault()
        if (reset) {
          reset = false
          props.dispatch({
            type: 'partialUpdate',
            payload: {
              d: props.d,
              id: target.id,
              update: {
                z: `${Math.max(1, props.highestZIndex[props.layer] + 1)}`,
              },
            },
          })
          const cooldown = () => {
            reset = true
          }
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
          props.dispatch({
            type: 'partialUpdate',
            payload: {
              d: props.d,
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
          props.dispatch({
            type: 'partialUpdate',
            payload: {
              d: props.d,
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
        break
      case 'C': //make a new clone
      case 'c':
      case 'D':
      case 'd':
      case '+':
        e.preventDefault()
        //e.stopImmediatePropagation()
        if (reset) {
          reset = false
          makeBlob(draggable)
          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case 'Delete': //remove blob
      case '-':
        //e.stopImmediatePropagation()
        e.preventDefault()
        if (reset) {
          reset = false
          removeBlob(draggable)
          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
    }
  }

  //Remove exit notice's tabindex and text as unnecessary after leaving it
  function exitAppBlur() {
    if (props.exitApp.current) {
      props.exitApp.current?.removeAttribute('tabindex')
      props.exitApp.current?.removeEventListener('blur', exitAppBlur)
      props.exitApp.current.textContent = ''
    }
  }

  //Clone blob
  function makeBlob(draggable: Draggable) {
    props.dispatch({
      type: 'duplicateDraggable',
      payload: { d: props.d, draggable },
    })
  }

  const [deleteId, setDeleteId] = useState<string>('')

  //Remove blob
  function removeBlob(draggable: Draggable) {
    setDeleteId(draggable.id)
    if (props.selectedvalue0.current)
      props.selectedvalue0.current.textContent = `${ESelectedBlobNone[props.language]}`
  }

  useEffect(() => {
    if (deleteId) {
      props.dispatch({ type: 'removeDraggable', payload: { d: props.d, id: deleteId } })
      setDeleteId('')
    }
  }, [deleteId, props.d, props.dispatch])

  return (
    <>
      {layers.map((layer) => (
        <DragLayer
          key={layer}
          layer={layer}
          dragUlRef={layerRefs.current[layer]}
          items={groupedDraggables[layer] || []}
          className={props.hiddenLayers.has(layer) ? 'hidden' : ''}
          language={props.language}
          d={props.d}
          saveDraggables={props.saveDraggables}
          selectedvalue0={props.selectedvalue0}
          setFocusedBlob={props.setFocusedBlob}
          start={start}
          movement={movement}
          stopMovementCheck={stopMovementCheck}
          stopMoving={stopMoving}
          wheel={wheel}
          focused={focused}
          blurred={blurred}
        />
      ))}
    </>
  )
}

export default DragLayers
