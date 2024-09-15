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

interface DragLayerProps {
  layer: number
  layerAmount: number
  hiddenLayers: Set<number>
  setActiveLayer: DispatchReact<SetStateAction<number>>
  changeBlobLayer: (draggable: Draggable, layer: number) => void
  paused: boolean
  setPaused: DispatchReact<SetStateAction<boolean>>
  prefersReducedMotion: boolean
  highestZIndex: Record<number, number>
  setHighestZIndex: DispatchReact<SetStateAction<Record<number, number>>>
  language: ELanguages
  dispatch: DispatchReact<any>
  d: number
  items: Draggable[]
  amountOfBlobs: number
  saveDraggables: () => void
  getPosition: (target: HTMLElement) => void
  dragWrap: RefObject<HTMLDivElement>
  dragWrapOuter: RefObject<HTMLDivElement>
  selectedvalue0: RefObject<HTMLSpanElement>
  stopBlobs: RefObject<HTMLButtonElement>
  disableScrollButton: RefObject<HTMLButtonElement>
  resetBlobs: RefObject<HTMLButtonElement>
  exitApp: RefObject<HTMLDivElement>
  colorBlockProps: RefObject<HTMLDivElement>[][]
  colorPairs: ColorPair[][]
  makeLarger0: RefObject<HTMLButtonElement>
  makeSmaller0: RefObject<HTMLButtonElement>
  makeMore0: RefObject<HTMLButtonElement>
  deleteBlob0: RefObject<HTMLButtonElement>
  layerIncrease: RefObject<HTMLButtonElement>
  layerDecrease: RefObject<HTMLButtonElement>
  getRandomMinMax: (min: number, max: number) => number
  focusedBlob: focusedBlob | null
  setFocusedBlob: DispatchReact<SetStateAction<focusedBlob | null>>
  colorIndex: number
  setColorIndex: DispatchReact<SetStateAction<number>>
  setScroll: DispatchReact<SetStateAction<boolean>>
  scroll: boolean
  clickOutsideRef: RefObject<HTMLDivElement>
}

let moveElement: boolean
let reset: boolean = true

let initialX = 0
let initialY = 0

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

  const layerRefs = useRef<Record<number, RefObject<HTMLUListElement>>>(
    layers.reduce((acc, layer) => {
      acc[layer] = createRef<HTMLUListElement>()
      return acc
    }, {} as Record<number, RefObject<HTMLUListElement>>)
  )

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
  const increaseBlobLayer = (target: HTMLElement, draggable: Draggable) => {
    let layer = draggable.layer
    if (layer < props.layerAmount - 1) {
      layer = layer + 1

      props.changeBlobLayer(draggable, layer)
      target.style.setProperty('--layer', `${layer}`)
    }
  }
  const decreaseBlobLayer = (target: HTMLElement, draggable: Draggable) => {
    let layer = draggable.layer
    if (layer > 0) {
      layer = layer - 1

      props.changeBlobLayer(draggable, layer)
      target.style.setProperty('--layer', `${layer}`)
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
      document.removeEventListener('keyup', keyUp)
      document.removeEventListener('touchmove', preventDefault)
    },
    [keyUp]
  )

  useOutsideClick({
    ref: props.clickOutsideRef,
    onOutsideClick: handleOutsideClick,
  })

  useEffect(() => {
    if (isTouchDevice() && !currentFocusedElement && !props.scroll) {
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
      document.removeEventListener('keyup', keyUp)
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
      target.style.setProperty('z-index', `${Math.max(1, highestZIndexForLayer + 1)}`)
      ;(target as HTMLElement).setAttribute('aria-grabbed', 'true')
      //;(target as HTMLElement).focus() // This breaks dragging once a key is pressed and only clears after clicking away from the target

      document.addEventListener('keyup', keyUp)
      const layer = (target as HTMLElement).style.getPropertyValue('--layer')
      props.setActiveLayer(parseInt(layer) ?? 0)

      if (isTouchDevice()) {
        document.addEventListener('touchmove', preventDefault, { passive: false })
        document.body.style.overflow = 'hidden'
      }
    },
    [keyUp, isTouchDevice]
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
        //e.preventDefault();
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

      // document.removeEventListener('keyup', keyUp)
      let value = (target as HTMLElement).style.getPropertyValue('--i')
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
      } else if (!props.scroll) {
        document.body.style.overflow = 'hidden'
      }

      if (
        props.layerIncrease.current &&
        elementsOverlap(hitbox as HTMLElement, props.layerIncrease.current)
      ) {
        increaseBlobLayer(target, draggable)
      }
      if (
        props.layerDecrease.current &&
        elementsOverlap(hitbox as HTMLElement, props.layerDecrease.current)
      ) {
        decreaseBlobLayer(target, draggable)
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
        scale += 0.5
        scale = Math.min(Math.max(7, scale), 20)
        ;(target as HTMLElement).style.setProperty('--i', `${scale}`)
      }
      if (
        props.makeSmaller0.current &&
        elementsOverlap(hitbox as HTMLElement, props.makeSmaller0.current)
      ) {
        scale -= 0.5
        scale = Math.min(Math.max(7, scale), 20)
        ;(target as HTMLElement).style.setProperty('--i', `${scale}`)
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
      props.getPosition(target as HTMLElement)
      ;(target as HTMLElement).classList.remove('drag')
      ;(target as HTMLElement).setAttribute('aria-grabbed', 'false')
      ;(target as HTMLElement).blur()
      currentFocusedElement = null
      props.setFocusedBlob(null)
    },
    [
      angle,
      elementsOverlap,
      keyUp,
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
      } else if (!props.scroll) {
        document.body.style.overflow = 'hidden'
      }

      props.getPosition(target as HTMLElement)
      ;(target as HTMLElement).classList.remove('drag')
      ;(target as HTMLElement).setAttribute('aria-grabbed', 'false')
      // document.removeEventListener('keyup', keyUp)
      ;(target as HTMLElement).blur()
    },
    [keyUp]
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
    draggable.setAttribute('aria-grabbed', 'false')
    props.dragWrap.current?.setAttribute('aria-activedescendant', '')
    document.removeEventListener('keyup', keyUp)
    props.getPosition(draggable)
    draggable.draggable = false
    currentFocusedElement = null
  }

  //on focused blob
  function focused(draggable: HTMLElement) {
    props.getPosition(draggable)
    draggable.classList.add('drag')
    draggable.setAttribute('aria-grabbed', 'true')
    layerRefs.current[props.layer].current?.setAttribute(
      'aria-activedescendant',
      `${draggable.id}`
    )
    currentFocusedElement = draggable
    const layerStyle = (draggable as HTMLElement).style.getPropertyValue('--layer')
    props.setActiveLayer(parseInt(layerStyle) ?? 0)
    document.addEventListener('keyup', keyUp)
    draggable.draggable = true
  }

  //Mousewheel use
  function wheel(draggable: HTMLElement) {
    const zoomHandler = (e: WheelEvent) => zoom(e, draggable)
    draggable.addEventListener('wheel', zoomHandler, { passive: false })
    return () => {
      draggable.removeEventListener('wheel', zoomHandler)
    }
  }
  function zoom(e: WheelEvent, target: HTMLElement) {
    //e.preventDefault();
    let value = (target as HTMLElement).style.getPropertyValue('--i')
    let scale = parseFloat(value)
    scale = isNaN(scale) ? 7 : scale

    scale += e.deltaY * -0.00005
    // Restrict scale
    scale = Math.min(Math.max(7, scale), 20)
    // Apply
    ;(target as HTMLElement).style.setProperty('--i', `${scale ?? 7}`)
  }

  useEffect(() => {
    const target = currentFocusedElement
    if (target) {
      const { color1, color2 } = props.colorPairs[props.d][props.colorIndex]
      const newBackground = `linear-gradient(${angle}, ${color1}, ${color2})`
      ;(target as HTMLElement).style.backgroundImage = newBackground

      const draggable = props.items.find((d) => d.id === target.id)
      // Update the draggable's background in the state
      const updatedDraggable = { ...draggable, background: newBackground }

      props.dispatch({
        type: 'updateDraggable',
        payload: { d: props.d, draggable: updatedDraggable },
      })
    }
  }, [props.colorIndex])

  // Keyboard use
  function keyUp(e: KeyboardEvent) {
    const movePx = 5

    const target = currentFocusedElement
    if (!target) return

    const setFocus = (target: HTMLElement) => {
      const blobStyle = window.getComputedStyle(target)
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

    let value = (target as HTMLElement).style.getPropertyValue('--i')
    let scale = parseFloat(value)
    scale = isNaN(scale) ? 7 : scale

    // let attrLeft = window
    //   .getComputedStyle(e.target as HTMLElement)
    //   .getPropertyValue('left')
    // let attrTop = window.getComputedStyle(e.target as HTMLElement).getPropertyValue('top')

    let attrLeft = parseFloat(target.style.getPropertyValue('left')) || 0
    let attrTop = parseFloat(target.style.getPropertyValue('top')) || 0

    const draggable: Draggable = {
      layer: props.layer,
      id: target.id,
      number: parseInt(target.id.replace('blob', '').split('-')[0], 10),
      i: scale,
      x: target.style.getPropertyValue('left').toString(),
      y: target.style.getPropertyValue('top').toString(),
      z: target.style.zIndex || '0',
      background: target.style.background || 'linear-gradient(90deg, cyan, greenyellow)',
    }

    const updatePosition = (left: number, top: number) => {
      target.style.left = `${left}px`
      target.style.top = `${top}px`
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
        //e.stopImmediatePropagation()

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
        e.stopPropagation()
        e.preventDefault()
        if ((target as HTMLElement).closest(`.drag-container${props.d}`)) {
          props.setColorIndex((prevColorIndex) => {
            const nextColorIndex = (prevColorIndex + 1) % props.colorPairs.length
            return nextColorIndex // Return the new color index
          })
        }
        break
      case 'Z': //Move blob to the bottom of the z-index pile
      case 'z':
        //e.stopImmediatePropagation()
        e.preventDefault()
        if (reset) {
          reset = false
          ;(target as HTMLElement).style.setProperty('z-index', `1`)
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
          ;(target as HTMLElement).style.setProperty(
            'z-index',
            `${Math.max(1, props.highestZIndex[props.layer] + 1)}`
          )
          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case 'S':
      case 's': //make blob smaller
        //e.stopImmediatePropagation()
        e.preventDefault()
        if (reset) {
          reset = false
          scale -= 0.5
          scale = Math.min(Math.max(7, scale), 20)
          ;(target as HTMLElement).style.setProperty('--i', `${scale ?? 7}`)

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
          scale += 0.5
          scale = Math.min(Math.max(7, scale), 20)
          ;(target as HTMLElement).style.setProperty('--i', `${scale ?? 7}`)

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
          dragWrap={props.dragWrap}
          selectedvalue0={props.selectedvalue0}
          focusedBlob={props.focusedBlob}
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
