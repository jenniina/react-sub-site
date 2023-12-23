import { RefObject, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { Draggable, focusedBlob, ColorPair } from '../interfaces'
import Blob from './Blob'

let zIndex = 1
let zIndex0 = -1
let moveElement = false
let reset = true

let initialX = 0
let initialY = 0

let angle = '90deg'
let color1 = 'cyan'
let color2 = 'greenyellow'

interface DragComponentProps {
  dispatch: React.Dispatch<any>
  d: number
  items: Draggable[]
  draggables: Draggable[][]
  amountOfBlobs: number
  saveDraggables: () => void
  getPosition: (target: HTMLLIElement) => void
  dragWrap: RefObject<HTMLDivElement>
  dragWrapOuter: RefObject<HTMLDivElement>
  dragUl0: RefObject<HTMLUListElement>
  selectedvalue0: RefObject<HTMLDivElement>
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
  makeLarger0: RefObject<HTMLDivElement>
  makeSmaller0: RefObject<HTMLDivElement>
  makeMore0: RefObject<HTMLDivElement>
  deleteBlob0: RefObject<HTMLDivElement>
  sliderLightnessInput: RefObject<HTMLInputElement>
  sliderSaturationInput: RefObject<HTMLInputElement>
  sliderHueInput: RefObject<HTMLInputElement>
  getRandomMinMax: (min: number, max: number) => number
  focusedBlob: focusedBlob | null
  setFocusedBlob: Dispatch<SetStateAction<focusedBlob | null>>
  colorIndex: number
  setColorIndex: Dispatch<SetStateAction<number>>
  colorPairs: ColorPair[]
}

const DragComponent = (props: DragComponentProps) => {
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
  useEffect(() => {
    isTouchDevice()
  }, [])

  function start(
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | React.TouchEvent
      | React.MouseEvent
      | React.PointerEvent
  ) {
    e.stopPropagation()
    e.preventDefault()

    initialX = !isTouchDevice()
      ? (e as PointerEvent).clientX
      : (e as TouchEvent).touches[0].clientX
    initialY = !isTouchDevice()
      ? (e as PointerEvent).clientY
      : (e as TouchEvent).touches[0].clientY

    moveElement = true
    ;(e.target as HTMLElement).classList.add('drag')
    ;(e.target as HTMLElement).style.setProperty('z-index', `${zIndex}`)
    ;(e.target as HTMLElement).setAttribute('aria-grabbed', 'true')
    //increase z-index
    zIndex += 1
    ;(e.target as HTMLElement).focus()
  }

  //Handle mousemove and touchmove
  function movement(
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | React.TouchEvent
      | React.MouseEvent
      | React.PointerEvent
  ) {
    e.stopPropagation()

    if (moveElement) {
      //e.preventDefault();
      let newX = !isTouchDevice()
        ? (e as PointerEvent).clientX
        : (e as TouchEvent).touches[0].clientX
      let newY = !isTouchDevice()
        ? (e as PointerEvent).clientY
        : (e as TouchEvent).touches[0].clientY
      ;(e.target as HTMLElement).style.top =
        (e.target as HTMLElement).offsetTop - (initialY - newY) + 'px'
      ;(e.target as HTMLElement).style.left =
        (e.target as HTMLElement).offsetLeft - (initialX - newX) + 'px'
      initialX = newX
      initialY = newY

      props.getPosition(e.target as HTMLLIElement)
    }
  }

  //Handle mouse up and touch end, check for element overlap
  const stopMovementCheck = (
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | React.TouchEvent
      | React.MouseEvent
      | React.PointerEvent
  ) => {
    e.stopPropagation()
    let value = (e.target as HTMLElement).style.getPropertyValue('--i')
    let scale = parseFloat(value)

    if (
      props.colorBlockOrange.current &&
      elementsOverlap(e.target as HTMLElement, props.colorBlockOrange.current)
    ) {
      color1 = 'darkorange'
      color2 = 'orange'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-orange')
    }
    if (
      props.colorBlockRed.current &&
      elementsOverlap(e.target as HTMLElement, props.colorBlockRed.current)
    ) {
      color1 = 'red'
      color2 = 'tomato'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-red')
    }
    if (
      props.colorBlockPurple.current &&
      elementsOverlap(e.target as HTMLElement, props.colorBlockPurple.current)
    ) {
      color1 = 'magenta'
      color2 = 'violet'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-violet')
    }
    if (
      props.colorBlockBlue.current &&
      elementsOverlap(e.target as HTMLElement, props.colorBlockBlue.current)
    ) {
      color1 = 'deepskyblue'
      color2 = 'dodgerblue'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-blue')
    }
    if (
      props.colorBlockYellowLime0.current &&
      elementsOverlap(e.target as HTMLElement, props.colorBlockYellowLime0.current)
    ) {
      color1 = 'lemonchiffon'
      color2 = 'greenyellow'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-yellowlime')
    }
    if (
      props.colorBlockCyanYellow0.current &&
      elementsOverlap(e.target as HTMLElement, props.colorBlockCyanYellow0.current)
    ) {
      color1 = 'cyan'
      color2 = 'greenyellow'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-cyanyellow')
    }
    if (
      props.colorBlockCyanPink0.current &&
      elementsOverlap(e.target as HTMLElement, props.colorBlockCyanPink0.current)
    ) {
      color1 = 'cyan'
      color2 = 'pink'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-cyanpink')
    }
    if (
      props.colorBlockPinkYellow0.current &&
      elementsOverlap(e.target as HTMLElement, props.colorBlockPinkYellow0.current)
    ) {
      color1 = 'lemonchiffon'
      color2 = 'pink'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-pinkyellow')
    }
    if (
      props.makeLarger0.current &&
      elementsOverlap(e.target as HTMLElement, props.makeLarger0.current)
    ) {
      scale += 1
      scale = Math.min(Math.max(2, scale), 10)
      ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)
    }
    if (
      props.makeSmaller0.current &&
      elementsOverlap(e.target as HTMLElement, props.makeSmaller0.current)
    ) {
      scale -= 1
      scale = Math.min(Math.max(2, scale), 10)
      ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)
    }
    if (
      props.makeMore0.current &&
      elementsOverlap(e.target as HTMLElement, props.makeMore0.current)
    ) {
      makeBlob(e.target as HTMLElement)
    }
    if (
      props.deleteBlob0.current &&
      elementsOverlap(e.target as HTMLElement, props.deleteBlob0.current)
    ) {
      removeBlob(e.target as HTMLElement)
    }
    moveElement = false
    ;(e.target as HTMLElement).classList.remove('drag')
    ;(e.target as HTMLElement).setAttribute('aria-grabbed', 'false')
    props.getPosition(e.target as HTMLLIElement)
    ;(e.target as HTMLElement).blur()
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

  //Handle mouse leave
  const stopMoving = (
    e: MouseEvent | React.MouseEvent | PointerEvent | React.PointerEvent
  ) => {
    e.stopPropagation()
    moveElement = false
    ;(e.target as HTMLElement).classList.remove('drag')
    ;(e.target as HTMLElement).setAttribute('aria-grabbed', 'false')
    props.getPosition(e.target as HTMLLIElement)
    ;(e.target as HTMLElement).blur()
  }

  //on blob blur
  function blurred(draggable: HTMLLIElement) {
    draggable.classList.remove('drag')
    draggable.setAttribute('aria-grabbed', 'false')
    props.dragWrap.current?.setAttribute('aria-activedescendant', '')
    props.getPosition(draggable)
  }

  //on focused blob
  function focused(draggable: HTMLLIElement) {
    draggable.classList.add('drag')
    draggable.setAttribute('aria-grabbed', 'true')
    props.dragUl0.current?.setAttribute('aria-activedescendant', `${draggable.id}`)
    draggable.addEventListener('keydown', keyDown)
    return () => {
      draggable.removeEventListener('keydown', keyDown)
      draggable.classList.remove('drag')
      draggable.setAttribute('aria-grabbed', 'false')
      props.dragWrap.current?.setAttribute('aria-activedescendant', '')
      props.getPosition(draggable)
    }
  }

  //Mousewheel use
  function wheel(draggable: HTMLLIElement) {
    draggable.addEventListener('wheel', zoom, { passive: false })
    return () => {
      draggable.removeEventListener('wheel', zoom)
    }
  }
  function zoom(e: WheelEvent) {
    //e.preventDefault();
    let value = (e.target as HTMLElement).style.getPropertyValue('--i')
    let scale = parseFloat(value)

    scale += e.deltaY * -0.005
    // Restrict scale
    scale = Math.min(Math.max(2, scale), 10)
    // Apply
    ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)
    //increase z-index
    zIndex += 1
  }

  // Keyboard use
  function keyDown(e: KeyboardEvent) {
    const movePx = 8

    let value = (e.target as HTMLElement).style.getPropertyValue('--i')
    let scale = parseFloat(value)

    let attrLeft = window
      .getComputedStyle(e.target as HTMLElement)
      .getPropertyValue('left')
    let attrTop = window.getComputedStyle(e.target as HTMLElement).getPropertyValue('top')

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        ;(e.target as HTMLElement).style.left =
          parseFloat(attrLeft) - Number(movePx) + 'px'
        attrLeft = window
          .getComputedStyle(e.target as HTMLElement)
          .getPropertyValue('left')
        break
      case 'ArrowRight':
        e.preventDefault()
        ;(e.target as HTMLElement).style.left =
          parseFloat(attrLeft) + Number(movePx) + 'px'
        attrLeft = window
          .getComputedStyle(e.target as HTMLElement)
          .getPropertyValue('left')
        break
      case 'ArrowUp':
        e.preventDefault()
        ;(e.target as HTMLElement).style.top = parseFloat(attrTop) - Number(movePx) + 'px'
        attrTop = window.getComputedStyle(e.target as HTMLElement).getPropertyValue('top')
        break
      case 'ArrowDown':
        e.preventDefault()
        ;(e.target as HTMLElement).style.top = parseFloat(attrTop) + Number(movePx) + 'px'
        attrTop = window.getComputedStyle(e.target as HTMLElement).getPropertyValue('top')
        break
      case 'Escape':
        e.stopImmediatePropagation()
        //e.preventDefault()
        if (props.exitApp.current) {
          props.exitApp.current.setAttribute('tabindex', '0')
          props.exitApp.current.addEventListener('blur', exitAppBlur)
        }
        ;(e.target as HTMLElement).blur()
        props.dragWrap.current?.blur()
        //Go to exit notice in order to remove focus from the app
        if (props.exitApp.current)
          props.exitApp.current.textContent = 'Thank you for playing!'
        props.exitApp.current?.focus()
        break
      case 'Enter': //Cycle through colors
        //e.stopImmediatePropagation()
        if ((e.target as HTMLElement).closest(`.drag-container${props.d}`)) {
          props.setColorIndex((prevColorIndex) => {
            const nextColorIndex = (prevColorIndex + 1) % props.colorPairs.length
            const { color1, color2, class: colorClass } = props.colorPairs[nextColorIndex]

            ;(
              e.target as HTMLElement
            ).style.backgroundImage = `linear-gradient(${angle}, ${color1},${color2})`
            ;(e.target as HTMLElement).removeAttribute('class')
            ;(e.target as HTMLElement).classList.add('dragzone', colorClass)

            return nextColorIndex // Return the new color index
          })
        }
        //   // Old way of doing it:
        //   // Calculate the next color index first
        //   const nextColorIndex = (props.colorIndex + 1) % props.colorPairs.length
        //   const { color1, color2, class: colorClass } = props.colorPairs[nextColorIndex]

        //   ;(
        //     e.target as HTMLElement
        //   ).style.backgroundImage = `linear-gradient(${angle}, ${color1},${color2})`
        //   ;(e.target as HTMLElement).removeAttribute('class')
        //   ;(e.target as HTMLElement).classList.add('dragzone', colorClass)

        //   // Then update the state
        //   props.setColorIndex(nextColorIndex)
        //}
        // if ((e.target as HTMLElement).closest(`.drag-container${props.d}`)) {
        //   if (color1 == 'lemonchiffon' && color2 == 'pink') {
        //     color1 = 'lemonchiffon'
        //     color2 = 'greenyellow'
        //     ;(
        //       e.target as HTMLElement
        //     ).style.backgroundImage = `linear-gradient(${angle}, ${color1},${color2})`
        //     ;(e.target as HTMLElement).removeAttribute('class')
        //     ;(e.target as HTMLElement).classList.add('dragzone', 'color-yellowlime')
        //   } else if (color1 == 'lemonchiffon' && color2 == 'greenyellow') {
        //     color1 = 'cyan'
        //     color2 = 'greenyellow'
        //     ;(
        //       e.target as HTMLElement
        //     ).style.backgroundImage = `linear-gradient(${angle}, ${color1},${color2})`
        //     ;(e.target as HTMLElement).removeAttribute('class')
        //     ;(e.target as HTMLElement).classList.add('dragzone', 'color-cyanyellow')
        //   } else if (color1 == 'cyan' && color2 == 'greenyellow') {
        //     color1 = 'cyan'
        //     color2 = 'pink'
        //     ;(
        //       e.target as HTMLElement
        //     ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
        //     ;(e.target as HTMLElement).removeAttribute('class')
        //     ;(e.target as HTMLElement).classList.add('dragzone', 'color-cyanpink')
        //   } else if (color1 == 'cyan' && color2 == 'pink') {
        //     color1 = 'darkorange'
        //     color2 = 'orange'
        //     ;(
        //       e.target as HTMLElement
        //     ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
        //     ;(e.target as HTMLElement).removeAttribute('class')
        //     ;(e.target as HTMLElement).classList.add('dragzone', 'color-orange')
        //   } else if (color1 == 'darkorange' && color2 == 'orange') {
        //     color1 = 'red'
        //     color2 = 'tomato'
        //     ;(
        //       e.target as HTMLElement
        //     ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
        //     ;(e.target as HTMLElement).removeAttribute('class')
        //     ;(e.target as HTMLElement).classList.add('dragzone', 'color-red')
        //   } else if (color1 == 'red' && color2 == 'tomato') {
        //     color1 = 'magenta'
        //     color2 = 'violet'
        //     ;(
        //       e.target as HTMLElement
        //     ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
        //     ;(e.target as HTMLElement).removeAttribute('class')
        //     ;(e.target as HTMLElement).classList.add('dragzone', 'color-purple')
        //   } else if (color1 == 'magenta' && color2 == 'violet') {
        //     color1 = 'deepskyblue'
        //     color2 = 'dodgerblue'
        //     ;(
        //       e.target as HTMLElement
        //     ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
        //     ;(e.target as HTMLElement).removeAttribute('class')
        //     ;(e.target as HTMLElement).classList.add('dragzone', 'color-blue')
        //   } else if (color1 == 'deepskyblue' && color2 == 'dodgerblue') {
        //     color1 = 'lemonchiffon'
        //     color2 = 'pink'
        //     ;(
        //       e.target as HTMLElement
        //     ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
        //     ;(e.target as HTMLElement).removeAttribute('class')
        //     ;(e.target as HTMLElement).classList.add('dragzone', 'color-pinkyellow')
        //   } else {
        //     color1 = 'lemonchiffon'
        //     color2 = 'greenyellow'
        //     ;(
        //       e.target as HTMLElement
        //     ).style.backgroundImage = `linear-gradient(${angle}, ${color1},${color2})`
        //     ;(e.target as HTMLElement).removeAttribute('class')
        //     ;(e.target as HTMLElement).classList.add('dragzone', 'color-yellowlime')
        //   }
        // }
        //e.preventDefault()
        break
      case '0': //Move blob to the bottom of the z-index pile
        //e.stopImmediatePropagation()
        e.preventDefault()
        if (reset) {
          reset = false
          ;(e.target as HTMLElement).style.setProperty('z-index', `${zIndex0}`)
          //Reset z-index
          zIndex0 -= 1
          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case '1': //make blob smaller
        //e.stopImmediatePropagation()
        e.preventDefault()
        if (reset) {
          reset = false
          scale -= 1
          scale = Math.min(Math.max(2, scale), 10)
          ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)

          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case '2': //make blob larger
        //e.stopImmediatePropagation()
        e.preventDefault()
        if (reset) {
          reset = false
          scale += 1
          scale = Math.min(Math.max(2, scale), 10)
          ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)

          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case '3': //make a new clone
      case '+':
        //e.stopImmediatePropagation()
        e.preventDefault()
        makeBlob(e.target as HTMLElement)
        break
      case 'Delete': //remove blob
      case '-':
        //e.stopImmediatePropagation()
        e.preventDefault()
        removeBlob(e.target as HTMLElement)
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

      const newDraggable = {
        id: `blob${newId}-${props.d}`,
        number: newId,
        //get style property --i from target
        i: parseInt((target as HTMLElement).style.getPropertyValue('--i') || '--i', 4),
        x: `${target.style.left}`,
        y: `${target.style.top}`,
        z: `${target.style.zIndex + 1}`,
        display: 'block',
        ariaGrabbed: false,
        draggable: true,
        tabIndex: 0,
        background: `${target.style.background}`,
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
        props.selectedvalue0.current.textContent = `Selected blob: none`
      const cooldown = () => {
        reset = true
      }
      setTimeout(cooldown, 200)
    }
  }

  useEffect(() => {
    if (deleteId) {
      props.dispatch({ type: 'removeDraggable', payload: { d: props.d, id: deleteId } })
    }
  }, [deleteId])

  //   useEffect(() => {
  //     if (props.draggables[props.d] && props.draggables[props.d].length > 0) {
  //       props.saveDraggables()
  //     }
  //   }, [props.draggables?.[props.d]?.length])

  return (
    <ul
      ref={props.dragUl0}
      role='listbox'
      id={`listbox${props.d}`}
      aria-labelledby={`blobdescription${props.d}`}
      aria-activedescendant=''
    >
      {props.items?.map((item: Draggable, index: number) => {
        if (item !== null && item !== undefined) {
          return (
            <Blob
              key={index}
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
