////// Remember to import and place this in component:

//     isTouchDevice();

import React from 'react'

let initialX = 0
let initialY = 0

let zIndex = 1
let zIndex0 = -1
let moveElement = false
let reset = true
let touchScrollLocked = false
let activeDraggable: HTMLElement | null = null
let globalReleaseHandlersAttached = false

type DragPointerEvent =
  | TouchEvent
  | MouseEvent
  | PointerEvent
  | React.TouchEvent
  | React.MouseEvent
  | React.PointerEvent

const getDraggableElement = (
  e:
    | DragPointerEvent
    | WheelEvent
    | KeyboardEvent
    | React.KeyboardEvent<HTMLLIElement>
) => {
  if ('currentTarget' in e && e.currentTarget) {
    return e.currentTarget as HTMLElement
  }
  return e.target as HTMLElement
}

const isTouchPointerEvent = (
  e: DragPointerEvent
): e is TouchEvent | React.TouchEvent => {
  return 'touches' in e || 'changedTouches' in e
}

const getPointerPosition = (
  e: DragPointerEvent
): { x: number; y: number; isTouch: boolean } => {
  if (isTouchPointerEvent(e) && e.touches.length > 0) {
    const touch = e.touches.item(0)
    if (!touch) {
      return { x: 0, y: 0, isTouch: true }
    }
    return {
      x: touch.clientX,
      y: touch.clientY,
      isTouch: true,
    }
  }

  if (isTouchPointerEvent(e) && e.changedTouches.length > 0) {
    const touch = e.changedTouches.item(0)
    if (!touch) {
      return { x: 0, y: 0, isTouch: true }
    }
    return {
      x: touch.clientX,
      y: touch.clientY,
      isTouch: true,
    }
  }

  if ('clientX' in e && 'clientY' in e) {
    return {
      x: e.clientX,
      y: e.clientY,
      isTouch: false,
    }
  }

  return {
    x: 0,
    y: 0,
    isTouch: false,
  }
}

export const preventDefault = (e: Event) => {
  e.preventDefault()
  e.stopImmediatePropagation()
}

const removeGlobalReleaseHandlers = () => {
  if (!globalReleaseHandlersAttached || !document) return
  document.removeEventListener('pointerup', handleGlobalPointerRelease)
  document.removeEventListener('pointercancel', handleGlobalPointerRelease)
  document.removeEventListener('mouseup', handleGlobalPointerRelease)
  document.removeEventListener('touchend', handleGlobalPointerRelease)
  document.removeEventListener('touchcancel', handleGlobalPointerRelease)
  globalReleaseHandlersAttached = false
}

const cleanupDragState = () => {
  if (touchScrollLocked) {
    if (document) document.removeEventListener('touchmove', preventDefault)
    if (document) document.body.style.overflowY = 'auto'
    if (document) document.body.style.overflowX = 'hidden'
    touchScrollLocked = false
  }

  moveElement = false
  if (activeDraggable) {
    activeDraggable.classList.remove('drag')
    activeDraggable.blur()
    activeDraggable = null
  }

  removeGlobalReleaseHandlers()
}

function handleGlobalPointerRelease() {
  cleanupDragState()
}

const ensureGlobalReleaseHandlers = () => {
  if (globalReleaseHandlersAttached || !document) return
  document.addEventListener('pointerup', handleGlobalPointerRelease)
  document.addEventListener('pointercancel', handleGlobalPointerRelease)
  document.addEventListener('mouseup', handleGlobalPointerRelease)
  document.addEventListener('touchend', handleGlobalPointerRelease)
  document.addEventListener('touchcancel', handleGlobalPointerRelease)
  globalReleaseHandlersAttached = true
}

//Detect touch device
export const isTouchDevice = () => {
  try {
    //Try to create TouchEvent (fails for desktops and throws error)
    document?.createEvent('TouchEvent')
    return true
  } catch {
    return false
  }
}

export function start(e: DragPointerEvent) {
  e.stopPropagation()
  e.preventDefault()

  const pointer = getPointerPosition(e)

  if (pointer.isTouch) {
    if (document)
      document.addEventListener('touchmove', preventDefault, {
        passive: false,
      })

    if (document) document.body.style.overflow = 'hidden'
    touchScrollLocked = true
  }
  initialX = pointer.x
  initialY = pointer.y

  moveElement = true
  const draggable = getDraggableElement(e)
  activeDraggable = draggable
  draggable.classList.add('drag')
  draggable.style.setProperty('z-index', `${zIndex}`)
  //increase z-index
  zIndex += 1
  draggable.focus()
  ensureGlobalReleaseHandlers()
}

//Handle mousemove and touchmove
export function movement(e: DragPointerEvent) {
  e.stopPropagation()
  e.preventDefault()

  if (moveElement && activeDraggable) {
    const pointer = getPointerPosition(e)
    const newX = pointer.x
    const newY = pointer.y
    activeDraggable.style.top =
      activeDraggable.offsetTop - (initialY - newY) + 'px'
    activeDraggable.style.left =
      activeDraggable.offsetLeft - (initialX - newX) + 'px'
    initialX = newX
    initialY = newY
  }
}

//Handle mouse up and touch end, check for element overlap
export const stopMovementCheck = (e: DragPointerEvent) => {
  e.stopPropagation()
  cleanupDragState()
}

//Handle mouse leave
export const stopMoving = (
  e: MouseEvent | React.MouseEvent | PointerEvent | React.PointerEvent
) => {
  e.stopPropagation()
  cleanupDragState()
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
  const draggable = getDraggableElement(e)
  const value = draggable.style.getPropertyValue('--size')
  let scale = parseFloat(value)

  scale += e.deltaY * -0.005
  // Restrict scale
  scale = Math.min(Math.max(2, scale), 20)
  // Apply
  draggable.style.setProperty('--size', `${scale}`)
  //increase z-index
  zIndex += 1
}

// Keyboard use
export function keyDown(
  e: KeyboardEvent | React.KeyboardEvent<HTMLLIElement>,
  target: HTMLElement,
  windowObj: Window | null,
  escapeFunction:
    | ((
        e:
          | React.PointerEvent<HTMLElement>
          | React.KeyboardEvent<HTMLLIElement>
          | React.MouseEvent<HTMLLIElement, MouseEvent>
          | React.TouchEvent<HTMLLIElement>
          | KeyboardEvent
      ) => void)
    | null,
  enterFunction:
    | ((
        e:
          | React.PointerEvent<HTMLElement>
          | React.KeyboardEvent<HTMLElement>
          | React.MouseEvent<HTMLLIElement, MouseEvent>
          | React.TouchEvent<HTMLLIElement>
          | KeyboardEvent
      ) => void)
    | null,
  deleteFunction:
    | ((
        e:
          | React.PointerEvent<HTMLElement>
          | React.KeyboardEvent<HTMLElement>
          | React.MouseEvent<HTMLLIElement, MouseEvent>
          | React.TouchEvent<HTMLLIElement>
          | KeyboardEvent
      ) => void)
    | null,
  spaceFunction:
    | ((
        e:
          | React.PointerEvent<HTMLElement>
          | React.KeyboardEvent<HTMLElement>
          | React.MouseEvent<HTMLLIElement, MouseEvent>
          | React.TouchEvent<HTMLLIElement>
          | KeyboardEvent
      ) => void)
    | null
) {
  const movePx = 10

  const size = target.style.getPropertyValue('--size')
  let scale = parseFloat(size)

  let attrLeft = windowObj
    ? windowObj.getComputedStyle(target).getPropertyValue('left')
    : target.style.getPropertyValue('left')
  let attrTop = windowObj
    ? windowObj.getComputedStyle(target).getPropertyValue('top')
    : target.style.getPropertyValue('top')

  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault()
      target.style.left = parseFloat(attrLeft) - Number(movePx) + 'px'
      attrLeft = windowObj
        ? windowObj.getComputedStyle(target).getPropertyValue('left')
        : target.style.getPropertyValue('left')
      break
    case 'ArrowRight':
      e.preventDefault()
      target.style.left = parseFloat(attrLeft) + Number(movePx) + 'px'
      attrLeft = windowObj
        ? windowObj.getComputedStyle(target).getPropertyValue('left')
        : target.style.getPropertyValue('left')
      break
    case 'ArrowUp':
      e.preventDefault()
      target.style.top = parseFloat(attrTop) - Number(movePx) + 'px'
      attrTop = windowObj
        ? windowObj.getComputedStyle(target).getPropertyValue('top')
        : target.style.getPropertyValue('top')
      break
    case 'ArrowDown':
      e.preventDefault()
      target.style.top = parseFloat(attrTop) + Number(movePx) + 'px'
      attrTop = windowObj
        ? windowObj.getComputedStyle(target).getPropertyValue('top')
        : target.style.getPropertyValue('top')
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
    case 'S': //make smaller
      e.stopPropagation()
      e.preventDefault()
      if (reset) {
        reset = false
        scale -= 1
        scale = Math.min(Math.max(2, scale), 20)

        target.style.setProperty('--size', `${scale}`)

        const cooldown = () => {
          reset = true
        }
        setTimeout(cooldown, 100)
      }
      break
    case 'B':
    case 'b':
    case 'L':
    case 'l': //make larger
      e.stopPropagation()
      e.preventDefault()
      if (reset) {
        reset = false
        scale += 1
        scale = Math.min(Math.max(2, scale), 20)

        target.style.setProperty('--size', `${scale}`)

        const cooldown = () => {
          reset = true
        }
        setTimeout(cooldown, 100)
      }
      break
    case 'Enter':
      if (enterFunction) {
        e.stopPropagation()
        e.preventDefault()
        enterFunction(e)
      }
      break
    case 'Delete':
      if (deleteFunction) {
        e.stopPropagation()
        e.preventDefault()
        deleteFunction(e)
      }
      break
    case 'Escape':
      target.blur()
      if (escapeFunction) {
        e.stopPropagation()
        e.preventDefault()
        escapeFunction(e)
      }
      break
    case ' ':
      if (spaceFunction) {
        e.stopPropagation()
        e.preventDefault()
        spaceFunction(e)
      }
      break
    default:
      e.stopPropagation()
  }
}
