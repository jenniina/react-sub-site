////// Remember to import and place this in component:

//     isTouchDevice();

let initialX = 0
let initialY = 0

let zIndex = 1
let zIndex0 = -1
let moveElement = false
let reset = true

export const preventDefault = (e: Event) => {
  e.preventDefault()
  e.stopImmediatePropagation()
}

//Detect touch device
export const isTouchDevice = () => {
  try {
    //Try to create TouchEvent (fails for desktops and throws error)
    document.createEvent('TouchEvent')
    return true
  } catch (e) {
    return false
  }
}

export function start(
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
  if (isTouchDevice()) {
    document.addEventListener('touchmove', preventDefault, { passive: false })
    document.body.style.overflow = 'hidden'
  }
  initialX = !isTouchDevice()
    ? (e as PointerEvent).clientX
    : (e as TouchEvent).touches[0].clientX
  initialY = !isTouchDevice()
    ? (e as PointerEvent).clientY
    : (e as TouchEvent).touches[0].clientY

  moveElement = true
  ;(e.target as HTMLElement).classList.add('drag')
  ;(e.target as HTMLElement).style.setProperty('z-index', `${zIndex}`)
  //increase z-index
  zIndex += 1
  ;(e.target as HTMLElement).focus()
}

//Handle mousemove and touchmove
export function movement(
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
  }
}

//Handle mouse up and touch end, check for element overlap
export const stopMovementCheck = (
  e:
    | TouchEvent
    | MouseEvent
    | PointerEvent
    | React.TouchEvent
    | React.MouseEvent
    | React.PointerEvent
) => {
  e.stopPropagation()
  if (isTouchDevice()) {
    document.removeEventListener('touchmove', preventDefault)
    document.body.style.overflowY = 'auto'
    document.body.style.overflowX = 'hidden'
  }

  moveElement = false
  ;(e.target as HTMLElement).classList.remove('drag')
  ;(e.target as HTMLElement).blur()
}

//Handle mouse leave
export const stopMoving = (
  e: MouseEvent | React.MouseEvent | PointerEvent | React.PointerEvent
) => {
  e.stopPropagation()
  moveElement = false
  ;(e.target as HTMLElement).classList.remove('drag')
  ;(e.target as HTMLElement).blur()
}

//on blob blur
export function blurred(draggable: HTMLElement) {
  draggable.classList.remove('drag')
}

//on focused blob
export function focused(draggable: HTMLElement) {
  draggable.classList.add('drag')
  return () => {
    draggable.classList.remove('drag')
  }
}

//Mousewheel use
export function wheel(draggable: HTMLElement) {
  draggable.addEventListener('wheel', zoom, { passive: false })
  return () => {
    draggable.removeEventListener('wheel', zoom)
  }
}
export function zoom(e: WheelEvent) {
  let value = (e.target as HTMLElement).style.getPropertyValue('--i')
  let scale = parseFloat(value)

  scale += e.deltaY * -0.005
  // Restrict scale
  scale = Math.min(Math.max(2, scale), 20)
  // Apply
  ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)
  //increase z-index
  zIndex += 1
}

// Keyboard use
export function keyDown(
  e: KeyboardEvent | React.KeyboardEvent<HTMLLIElement>,
  target: HTMLElement
) {
  const movePx = 8

  let value = target.style.getPropertyValue('--i')
  let scale = parseFloat(value)

  let attrLeft = window.getComputedStyle(target).getPropertyValue('left')
  let attrTop = window.getComputedStyle(target).getPropertyValue('top')

  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      target.style.left = parseFloat(attrLeft) - Number(movePx) + 'px'
      attrLeft = window.getComputedStyle(target).getPropertyValue('left')
      break
    case 'ArrowRight':
      e.preventDefault()
      target.style.left = parseFloat(attrLeft) + Number(movePx) + 'px'
      attrLeft = window.getComputedStyle(target).getPropertyValue('left')
      break
    case 'ArrowUp':
      e.preventDefault()
      target.style.top = parseFloat(attrTop) - Number(movePx) + 'px'
      attrTop = window.getComputedStyle(target).getPropertyValue('top')
      break
    case 'ArrowDown':
      e.preventDefault()
      target.style.top = parseFloat(attrTop) + Number(movePx) + 'px'
      attrTop = window.getComputedStyle(target).getPropertyValue('top')
      break
    case 'Escape':
      e.stopPropagation()
      e.preventDefault()
      target.blur()
      break
    case 'Z':
    case 'z': //Move blob to the bottom of the z-index pile
      e.stopPropagation()
      e.preventDefault()
      if (reset) {
        reset = false
        target.style.setProperty('z-index', `${zIndex0}`)
        //Reset z-index
        zIndex0 -= 1
        const cooldown = () => {
          reset = true
        }
        setTimeout(cooldown, 100)
      }
      break
    case 's':
    case 'S': //make blob smaller
      e.stopPropagation()
      e.preventDefault()
      if (reset) {
        reset = false
        scale -= 1
        scale = Math.min(Math.max(2, scale), 20)
        target.style.setProperty('--i', `${scale}`)

        const cooldown = () => {
          reset = true
        }
        setTimeout(cooldown, 100)
      }
      break
    case 'B':
    case 'b':
    case 'L':
    case 'l': //make blob larger
      e.stopPropagation()
      e.preventDefault()
      if (reset) {
        reset = false
        scale += 1
        scale = Math.min(Math.max(2, scale), 20)
        target.style.setProperty('--i', `${scale}`)

        const cooldown = () => {
          reset = true
        }
        setTimeout(cooldown, 100)
      }
      break
    default:
      e.stopPropagation()
  }
}
