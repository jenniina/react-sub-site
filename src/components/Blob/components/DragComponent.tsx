import {
  RefObject,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  TouchEvent as TouchEventReact,
  MouseEvent as MouseEventReact,
  PointerEvent as PointerEventReact,
  Dispatch as DispatchReact,
  useCallback,
  CSSProperties,
} from 'react'
import { Draggable, focusedBlob, ColorPair } from '../interfaces'
import Blob from './Blob'
import { ELanguages, EWelcome } from '../../../interfaces'
import { ESelectedBlobNone } from '../../../interfaces/blobs'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

let moveElement: boolean
let reset = true

let initialX = 0
let initialY = 0

let angle = '90deg'

interface DragComponentProps {
  layer: number
  isCurrentLayer: boolean
  setActiveLayer: Dispatch<SetStateAction<number>>
  changeBlobLayer: (draggable: Draggable, layer: number) => void
  className: string
  paused: boolean
  setPaused: Dispatch<SetStateAction<boolean>>
  prefersReducedMotion: boolean
  highestZIndex: Record<number, number>
  setHighestZIndex: Dispatch<SetStateAction<Record<number, number>>>
  language: ELanguages
  dispatch: DispatchReact<any>
  d: number
  items: Draggable[]
  draggables: Draggable[][]
  amountOfBlobs: number
  saveDraggables: () => void
  getPosition: (target: HTMLElement) => void
  dragWrap: RefObject<HTMLDivElement>
  dragWrapOuter: RefObject<HTMLDivElement>
  dragUlRef: RefObject<HTMLUListElement>
  selectedvalue0: RefObject<HTMLSpanElement>
  stopBlobs: RefObject<HTMLButtonElement>
  disableScrollButton: RefObject<HTMLButtonElement>
  resetBlobs: RefObject<HTMLButtonElement>
  exitApp: RefObject<HTMLDivElement>
  colorBlockYellowLime0: RefObject<HTMLDivElement>
  colorBlockCyanYellow0: RefObject<HTMLDivElement>
  colorBlockCyanPink0: RefObject<HTMLDivElement>
  colorBlockPinkYellow0: RefObject<HTMLDivElement>
  colorBlockOrange: RefObject<HTMLDivElement>
  colorBlockRed: RefObject<HTMLDivElement>
  colorBlockPurple: RefObject<HTMLDivElement>
  colorBlockBlue: RefObject<HTMLDivElement>
  makeLarger0: RefObject<HTMLButtonElement>
  makeSmaller0: RefObject<HTMLButtonElement>
  makeMore0: RefObject<HTMLButtonElement>
  deleteBlob0: RefObject<HTMLButtonElement>
  sliderLightnessInput: RefObject<HTMLInputElement>
  sliderSaturationInput: RefObject<HTMLInputElement>
  sliderHueInput: RefObject<HTMLInputElement>
  getRandomMinMax: (min: number, max: number) => number
  focusedBlob: focusedBlob | null
  setFocusedBlob: Dispatch<SetStateAction<focusedBlob | null>>
  colorIndex: number
  setColorIndex: Dispatch<SetStateAction<number>>
  colorPairs: ColorPair[]
  colorBlockProps: RefObject<HTMLDivElement>[]
  scroll: boolean
  setScroll: Dispatch<SetStateAction<boolean>>
  clickOutsideRef: RefObject<HTMLDivElement>
}

let currentFocusedElement: HTMLElement | null

const DragComponent = (props: DragComponentProps) => {
  const dispatch = useAppDispatch()
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
      document.removeEventListener('keydown', keyDown)
    },
    [keyDown]
  )
  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', keyDown)
    }
  }, [])

  useOutsideClick({
    ref: props.clickOutsideRef,
    onOutsideClick: handleOutsideClick,
  })

  const preventDefault = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

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

      moveElement = true

      initialX = !isTouchDevice()
        ? (e as PointerEvent).clientX
        : (e as TouchEvent).touches[0].clientX
      initialY = !isTouchDevice()
        ? (e as PointerEvent).clientY
        : (e as TouchEvent).touches[0].clientY
      props.getPosition(target as HTMLElement)
      ;(target as HTMLElement).classList.add('drag')
      const highestZIndexForLayer = props.highestZIndex[props.layer]
      target.style.setProperty('z-index', `${Math.max(1, highestZIndexForLayer + 1)}`)
      ;(target as HTMLElement).setAttribute('aria-grabbed', 'true')
      //;(target as HTMLElement).focus() // This breaks dragging once a key is pressed and only clears after clicking away from the target
      currentFocusedElement = target
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
        | PointerEventReact,
      target: HTMLElement
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
        ;(target as HTMLElement).style.top =
          (target as HTMLElement).offsetTop - (initialY - newY) + 'px'
        ;(target as HTMLElement).style.left =
          (target as HTMLElement).offsetLeft - (initialX - newX) + 'px'
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
      currentFocusedElement = null
      props.setFocusedBlob(null)
      document.removeEventListener('keydown', keyDown)
      let value = (target as HTMLElement).style.getPropertyValue('--i')
      let scale = parseFloat(value)
      scale = isNaN(scale) ? 8 : scale

      const hitbox = target.querySelector('div')

      if (isTouchDevice()) {
        document.removeEventListener('touchmove', preventDefault)
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
      }
      if (props.scroll) {
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
      } else {
        document.body.style.overflow = 'hidden'
      }

      props.colorPairs.forEach((colorPair, index) => {
        const colorBlock = props.colorBlockProps[index]

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
        scale = Math.min(Math.max(8, scale), 20)
        ;(target as HTMLElement).style.setProperty('--i', `${scale}`)
      }
      if (
        props.makeSmaller0.current &&
        elementsOverlap(hitbox as HTMLElement, props.makeSmaller0.current)
      ) {
        scale -= 0.5
        scale = Math.min(Math.max(8, scale), 20)
        ;(target as HTMLElement).style.setProperty('--i', `${scale}`)
      }
      if (
        props.makeMore0.current &&
        elementsOverlap(hitbox as HTMLElement, props.makeMore0.current)
      ) {
        makeBlob(target as HTMLElement)
      }
      if (
        props.deleteBlob0.current &&
        elementsOverlap(hitbox as HTMLElement, props.deleteBlob0.current)
      ) {
        removeBlob(target as HTMLElement)
      }
      ;(target as HTMLElement).classList.remove('drag')
      ;(target as HTMLElement).setAttribute('aria-grabbed', 'false')
      props.getPosition(target as HTMLElement)
      ;(target as HTMLElement).blur()
    },
    [
      angle,
      elementsOverlap,
      keyDown,
      makeBlob,
      props.colorBlockProps,
      props.colorPairs,
      removeBlob,
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
      if (isTouchDevice()) {
        document.removeEventListener('touchmove', preventDefault)
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
      }
      if (props.scroll) {
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
      } else {
        document.body.style.overflow = 'hidden'
      }
      ;(target as HTMLElement).classList.remove('drag')
      ;(target as HTMLElement).setAttribute('aria-grabbed', 'false')
      props.getPosition(target as HTMLElement)
      document.removeEventListener('keydown', keyDown)
      ;(target as HTMLElement).blur()
    },
    [keyDown]
  )
  useEffect(() => {
    isTouchDevice() ? dispatch(notify(EWelcome[props.language], false, 2)) : null
  }, [])

  useEffect(() => {
    if (isTouchDevice() && !currentFocusedElement) {
      document.removeEventListener('touchmove', preventDefault)
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
    }
    const handleMouseUp = (e: MouseEvent) => {
      if (currentFocusedElement) {
        stopMovementCheck(e, currentFocusedElement)
      }
    }
    const handleTouchEnd = (e: TouchEvent) => {
      if (currentFocusedElement) {
        stopMovementCheck(e, currentFocusedElement)
      }
    }
    const handleTouchCancel = (e: TouchEvent) => {
      if (currentFocusedElement) {
        stopMovementCheck(e, currentFocusedElement)
      }
    }
    const handleDragEnd = (e: DragEvent) => {
      if (currentFocusedElement) {
        stopMovementCheck(e, currentFocusedElement)
      }
    }

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchend', handleTouchEnd)
    document.addEventListener('touchcancel', handleTouchCancel)
    document.addEventListener('dragend', handleDragEnd)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('touchcancel', handleTouchCancel)
      document.removeEventListener('dragend', handleDragEnd)
    }
  }, [stopMovementCheck, stopMoving, currentFocusedElement])

  //on blob blur
  function blurred(draggable: HTMLElement) {
    draggable.classList.remove('drag')
    draggable.setAttribute('aria-grabbed', 'false')
    props.dragWrap.current?.setAttribute('aria-activedescendant', '')
    document.removeEventListener('keydown', keyDown)
    draggable.draggable = false
    props.getPosition(draggable)
    currentFocusedElement = null
  }

  //on focused blob
  function focused(draggable: HTMLElement) {
    props.getPosition(draggable)
    draggable.classList.add('drag')
    draggable.setAttribute('aria-grabbed', 'true')
    props.dragUlRef.current?.setAttribute('aria-activedescendant', `${draggable.id}`)
    currentFocusedElement = draggable
    const layer = (draggable as HTMLElement).style.getPropertyValue('--layer')
    props.setActiveLayer(parseInt(layer) ?? 0)
    document.addEventListener('keydown', keyDown)
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
    scale = isNaN(scale) ? 8 : scale

    scale += e.deltaY * -0.00005
    // Restrict scale
    scale = Math.min(Math.max(8, scale), 20)
    // Apply
    ;(target as HTMLElement).style.setProperty('--i', `${scale ?? 8}`)
  }

  // Keyboard use
  function keyDown(e: KeyboardEvent) {
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
    scale = isNaN(scale) ? 8 : scale

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
      display: 'block',
      ariaGrabbed: false,
      draggable: true,
      tabIndex: 0,
      background: target.style.background || 'linear-gradient(90deg, cyan, greenyellow)',
    }

    const updatePosition = (left: number, top: number) => {
      target.style.left = `${left}px`
      target.style.top = `${top}px`
      setFocus(target)
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
        e.stopImmediatePropagation()
        if ((target as HTMLElement).closest(`.drag-container${props.d}`)) {
          props.setColorIndex((prevColorIndex) => {
            const nextColorIndex = (prevColorIndex + 1) % props.colorPairs.length
            const { color1, color2 } = props.colorPairs[nextColorIndex]

            ;(
              target as HTMLElement
            ).style.backgroundImage = `linear-gradient(${angle}, ${color1},${color2})`

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
          scale = Math.min(Math.max(8, scale), 20)
          ;(target as HTMLElement).style.setProperty('--i', `${scale ?? 8}`)

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
          scale = Math.min(Math.max(8, scale), 20)
          ;(target as HTMLElement).style.setProperty('--i', `${scale ?? 8}`)

          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case 'C': //make a new clone
      case 'c':
      case '+':
        //e.stopImmediatePropagation()
        e.preventDefault()
        makeBlob(target as HTMLElement)
        break
      case 'Delete': //remove blob
      case '-':
        //e.stopImmediatePropagation()
        e.preventDefault()
        removeBlob(target as HTMLElement)
        break
      case '1':
        e.preventDefault()
        if (reset) {
          reset = false
          props.changeBlobLayer(draggable, 0)
          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case '2':
        e.preventDefault()
        if (reset) {
          reset = false
          props.changeBlobLayer(draggable, 1)
          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case '3':
        e.preventDefault()
        if (reset) {
          reset = false
          props.changeBlobLayer(draggable, 2)
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
  function makeBlob(target: HTMLElement) {
    if (reset) {
      reset = false

      // Find the maximum id currently in state
      const maxId = Math.max(
        ...props.draggables.flatMap((draggables) =>
          draggables.map((draggable) =>
            parseInt(draggable.id.replace('blob', '').split('-')[0], 10)
          )
        ),
        0 // This is a fallback in case the array is empty
      )

      const newId = maxId + 1

      let parsedValue = parseInt(
        (target as HTMLElement).style.getPropertyValue('--i'),
        10
      )

      const newDraggable = {
        layer: props.layer,
        id: `blob${newId}-${props.d}`,
        number: newId,
        //get style property --i from target

        i: isNaN(parsedValue) ? 8 : parsedValue,
        x: `${target.style.left}`,
        y: `${target.style.top}`,
        z: `${Math.max(1, props.highestZIndex[props.layer] + 1)}`,
        display: 'block',
        ariaGrabbed: false,
        draggable: true,
        tabIndex: 0,
        background: `${
          target.style.background ?? 'linear-gradient(90deg, cyan, greenyellow)'
        }`,
      }

      props.dispatch({
        type: 'addDraggable',
        payload: { d: props.d, draggable: newDraggable },
      })

      props.saveDraggables()

      const cooldown = () => {
        reset = true
      }
      setTimeout(cooldown, 200)
    }
  }

  const [deleteId, setDeleteId] = useState<string>('')

  //Remove blob
  function removeBlob(target: HTMLElement) {
    if (reset) {
      reset = false
      const id = target.id
      setDeleteId(id)
      if (props.selectedvalue0.current)
        props.selectedvalue0.current.textContent = `${ESelectedBlobNone[props.language]}`
      const cooldown = () => {
        reset = true
      }
      setTimeout(cooldown, 200)
    }
  }

  useEffect(() => {
    if (deleteId) {
      props.dispatch({ type: 'removeDraggable', payload: { d: props.d, id: deleteId } })
      props.saveDraggables()
    }
  }, [deleteId])

  //   useEffect(() => {
  //     if (props.draggables[props.d] && props.draggables[props.d].length > 0) {
  //       props.saveDraggables()
  //     }
  //   }, [props.draggables?.[props.d]?.length])

  const layerStyle: CSSProperties = {
    WebkitFilter: 'url(#svgfilter)',
    filter: 'url(#svgfilter)',
    backgroundColor: 'transparent',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    pointerEvents: 'none',
  }

  return (
    <ul
      ref={props.dragUlRef}
      role='listbox'
      id={`listbox${props.d}-layer${props.layer}`}
      className={`drag-container${props.d}-layer drag-container${props.d}-layer${props.layer} ${props.className}`}
      aria-labelledby={`blobdescription${props.d}`}
      aria-activedescendant=''
      style={layerStyle}
    >
      {props.items?.map((item: Draggable, index: number) => {
        if (item !== null && item !== undefined) {
          return (
            <Blob
              layer={props.layer}
              key={index}
              language={props.language}
              item={item}
              index={index}
              start={start}
              movement={movement}
              stopMovementCheck={stopMovementCheck}
              stopMoving={stopMoving}
              wheel={wheel}
              focused={focused}
              blurred={blurred}
              selectedvalue0={props.selectedvalue0}
              focusedBlob={props.focusedBlob}
              setFocusedBlob={props.setFocusedBlob}
            />
          )
        }
      })}
    </ul>
  )
}

export default DragComponent
