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
import { Draggable, focusedBlob, ColorPair, Modes } from '../interfaces'
import { ELanguages } from '../../../interfaces'
import DragLayer from './DragLayer'
import { EThankYouForPlaying } from '../../../interfaces/blobs'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

interface DragLayerProps {
  layer_: number
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
  colorBlockProps: RefObject<HTMLButtonElement>[][]
  colorPairs: ColorPair[][]
  makeLarger0: RefObject<HTMLButtonElement>
  makeSmaller0: RefObject<HTMLButtonElement>
  makeMore0: RefObject<HTMLButtonElement>
  removeBlob: (draggable: Draggable) => void
  mode: Modes
  layerIncrease: RefObject<HTMLButtonElement>
  layerDecrease: RefObject<HTMLButtonElement>
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

let moveElement: boolean
let reset: boolean = true

let initialX = 0
let initialY = 0

let initialScale: number
let tapCount: number = 0
let tapTimeout: NodeJS.Timeout | null = null

let angle = '90deg'

let currentFocusedElement: HTMLElement | null

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
  language,
  dispatch,
  d,
  items,
  saveDraggables,
  getPosition,
  dragWrap,
  selectedvalue0,
  exitApp,
  colorBlockProps,
  colorPairs,
  makeLarger0,
  makeSmaller0,
  makeMore0,
  removeBlob,
  mode,
  layerIncrease,
  layerDecrease,
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
  const sortedDraggables = [...items].sort((a, b) => a.layer - b.layer)

  const groupedDraggables = sortedDraggables.reduce((acc, draggable) => {
    if (!acc[draggable.layer]) {
      acc[draggable.layer] = []
    }
    acc[draggable.layer].push(draggable)
    return acc
  }, {} as Record<number, Draggable[]>)

  const layers = Array.from({ length: layerAmount }, (_, i) => i)

  const layerRefs = useRef<Record<number, RefObject<HTMLUListElement>>>({})

  useEffect(() => {
    const refs = layers.reduce((acc, layer) => {
      acc[layer] = createRef<HTMLUListElement>()
      return acc
    }, {} as Record<number, RefObject<HTMLUListElement>>)

    layerRefs.current = refs
  }, [layerAmount])

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

  const handleOutsideClick = useCallback(
    (e: Event) => {
      reset = true
      document.removeEventListener('keydown', keyDown)
      document.removeEventListener('touchmove', preventDefault)
    },
    [keyDown]
  )

  useOutsideClick({
    ref: clickOutsideRef,
    onOutsideClick: handleOutsideClick,
  })

  useEffect(() => {
    if (isTouchDevice() && !currentFocusedElement && scroll) {
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
      document.removeEventListener('keydown', keyDown)
      document.removeEventListener('touchmove', preventDefault)
    }
  }, [currentFocusedElement, scroll, isTouchDevice, keyDown])

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
      const highestZIndexForLayer = highestZIndex[layer_]
      if (isTouchDevice()) {
        let value = target?.style.getPropertyValue('--i') ?? '7'
        initialScale = parseFloat(value)
        initialScale = isNaN(initialScale) ? 7 : initialScale
      }
      dispatch({
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

      document.addEventListener('keydown', keyDown)
      const blobLayer = (target as HTMLElement).style.getPropertyValue('--layer')
      setActiveLayer(isNaN(parseInt(blobLayer)) ? 1 : parseInt(blobLayer))

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

        dispatch({
          type: 'partialUpdate',
          payload: {
            d: d,
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
          dispatch({
            type: 'partialUpdate',
            payload: {
              d: d,
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
          dispatch({
            type: 'partialUpdate',
            payload: {
              d: d,
              id: currentFocusedElement?.id,
              update: {
                i: scale,
              },
            },
          })
        }
        tapCount = 0
      }, 300)

      document.removeEventListener('keydown', keyDown)
      let value = (target as HTMLElement).style.getPropertyValue('--i') ?? '7'
      let scale = parseFloat(value)
      scale = isNaN(scale) ? 7 : scale

      if (isTouchDevice() && scroll) {
        document.removeEventListener('touchmove', preventDefault)
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
      } else if (isTouchDevice() && !scroll) {
        document.body.style.overflow = 'hidden'
      }

      ;(target as HTMLElement).classList.remove('drag')
      ;(target as HTMLElement).blur()
      tapCount === 0 ? (currentFocusedElement = null) : (currentFocusedElement = target)
      setFocusedBlob(null)
    },
    [angle, keyDown, scroll]
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
      if (isTouchDevice() && scroll) {
        document.removeEventListener('touchmove', preventDefault)
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
      } else if (isTouchDevice() && !scroll) {
        document.body.style.overflow = 'hidden'
      }

      getPosition(target as HTMLElement)
      ;(target as HTMLElement).classList.remove('drag')
      document.removeEventListener('keydown', keyDown)
      ;(target as HTMLElement).blur()
    },
    [keyDown]
  )

  useEffect(() => {
    if (isTouchDevice() && !currentFocusedElement && scroll) {
      document.removeEventListener('touchmove', preventDefault)
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
    }
  }, [stopMovementCheck, stopMoving, currentFocusedElement, scroll])

  //on blob blur
  function blurred(draggable: HTMLElement) {
    draggable.classList.remove('drag')
    document.removeEventListener('keydown', keyDown)
    getPosition(draggable)
    draggable.draggable = false
    currentFocusedElement = null
  }

  //on focused blob
  function focused(draggable: HTMLElement) {
    // getPosition(draggable)
    currentFocusedElement = draggable
    draggable.classList.add('drag')
    const layerStyle = (draggable as HTMLElement).style.getPropertyValue('--layer')
    setActiveLayer(parseInt(layerStyle) ?? 2)
    document.addEventListener('keydown', keyDown)
    draggable.draggable = true
  }

  //Mousewheel use
  function wheel(target: HTMLElement) {
    const zoomHandler = (e: WheelEvent) => zoom(e, target)
    if (!scroll) target.addEventListener('wheel', zoomHandler, { passive: false })
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
      dispatch({
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
  }

  useEffect(() => {
    const target = currentFocusedElement
    if (target) {
      const { color1, color2 } = colorPairs[d][colorIndex]
      const newBackground = `linear-gradient(${angle}, ${color1}, ${color2})`

      dispatch({
        type: 'partialUpdate',
        payload: {
          d: d,
          id: target.id,
          update: { background: newBackground },
        },
      })
    }
  }, [colorIndex])

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
      setFocusedBlob({
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

    const layer = target.style.getPropertyValue('--layer')

    const draggable: Draggable = {
      layer: parseInt(layer) ?? layer_,
      id: target.id,
      number: parseInt(target.id.replace('blob', '').split('-')[0], 10),
      i: scale,
      x: target.style.getPropertyValue('left').toString(),
      y: target.style.getPropertyValue('top').toString(),
      z: target.style.zIndex ?? '0',
      background: target.style.background ?? 'linear-gradient(90deg, cyan, greenyellow)',
    }

    const updatePosition = (left: number, top: number) => {
      dispatch({
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
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'

        if (exitApp.current) {
          exitApp.current.setAttribute('tabindex', '0')
          exitApp.current.addEventListener('blur', exitAppBlur)
        }
        ;(target as HTMLElement).blur()
        dragWrap.current?.blur()
        //Go to exit notice in order to remove focus from the app
        if (exitApp.current) exitApp.current.textContent = EThankYouForPlaying[language]
        exitApp.current?.focus()
        break
      case 'Enter': //Cycle through colors
        e.preventDefault()
        e.stopPropagation()
        if (reset) {
          reset = false
          if ((target as HTMLElement).closest(`#drag-wrap${d}`)) {
            setColorIndex((prevColorIndex) => {
              const nextColorIndex = (prevColorIndex + 1) % colorPairs[d].length
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
          if ((target as HTMLElement).closest(`#drag-wrap${d}`)) {
            const color1 = colorswitch()
            let color2 = colorswitch()

            if (color2 === color1) {
              color2 = colorswitch()
            }

            const newBackground = `linear-gradient(${angle}, ${color1}, ${color2})`
            dispatch({
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
          dispatch({
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
          dispatch({
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
          dispatch({
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
          dispatch({
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
  }

  //Remove exit notice's tabindex and text as unnecessary after leaving it
  function exitAppBlur() {
    if (exitApp.current) {
      exitApp.current?.removeAttribute('tabindex')
      exitApp.current?.removeEventListener('blur', exitAppBlur)
      exitApp.current.textContent = ''
    }
  }

  //Clone blob
  function makeBlob(draggable: Draggable) {
    dispatch({
      type: 'duplicateDraggable',
      payload: { d: d, draggable },
    })
  }

  // const [deleteId, setDeleteId] = useState<string>('')

  // //Remove blob
  // function removeBlob(draggable: Draggable) {
  //   setDeleteId(draggable.id)
  //   if (selectedvalue0.current)
  //     selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
  // }

  // useEffect(() => {
  //   if (deleteId) {
  //     dispatch({ type: 'removeDraggable', payload: { d: d, id: deleteId } })
  //     setDeleteId('')
  //   }
  // }, [deleteId, d, dispatch])

  return (
    <>
      {layers.map((l) => (
        <DragLayer
          key={l}
          layer_={l}
          dragUlRef={layerRefs.current[l]}
          items={groupedDraggables[l] || []}
          className={hiddenLayers.has(l) ? 'hidden' : ''}
          language={language}
          d={d}
          saveDraggables={saveDraggables}
          selectedvalue0={selectedvalue0}
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
