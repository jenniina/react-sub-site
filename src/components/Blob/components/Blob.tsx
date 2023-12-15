import {
  RefObject,
  MouseEvent,
  TouchEvent,
  CSSProperties,
  SetStateAction,
  Dispatch,
} from 'react'
import { Draggable, focusedBlob } from '../interfaces'

interface BlobProps {
  item: Draggable
  index: number
  start: (
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | React.TouchEvent
      | React.MouseEvent
      | React.PointerEvent
  ) => void
  movement: (
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | React.TouchEvent
      | React.MouseEvent
      | React.PointerEvent
  ) => void
  stopMovementCheck: (
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | React.TouchEvent
      | React.MouseEvent
      | React.PointerEvent
  ) => void
  stopMoving: (
    e: MouseEvent | React.MouseEvent | PointerEvent | React.PointerEvent
  ) => void
  wheel: (e: HTMLLIElement) => void
  focused: (e: HTMLLIElement) => void
  blurred: (e: HTMLLIElement) => void
  selectedvalue0: RefObject<HTMLSpanElement>
  focusedBlob: focusedBlob | null
  setFocusedBlob: Dispatch<SetStateAction<focusedBlob | null>>
}

const Blob = ({
  item,
  index,
  start,
  movement,
  stopMovementCheck,
  stopMoving,
  wheel,
  focused,
  blurred,
  selectedvalue0,
  focusedBlob,
  setFocusedBlob,
}: BlobProps) => {
  const blobStyle: CSSProperties = {
    background: `${item.background}`,
    display: `${item.display}`,
    left: `${item.x}`,
    top: `${item.y}`,
    zIndex: `${item.z}`,
    ['--i' as string]: `${item.i}`,
  }

  return (
    <li
      key={index}
      className='dragzone'
      id={item.id}
      aria-grabbed={false}
      role={'option'}
      tabIndex={0}
      draggable='true'
      style={blobStyle}
      onMouseDown={(e) => {
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: ${
            (e.target as HTMLElement)?.querySelector('span')?.textContent
          }`
        start(e)
      }}
      onMouseMove={(e) => {
        movement(e)
      }}
      onMouseUp={(e) => {
        stopMovementCheck(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: none`
      }}
      onMouseLeave={(e) => {
        stopMoving(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: none`
      }}
      onTouchStart={(e) => {
        start(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: ${
            (e.target as HTMLElement)?.querySelector('span')?.textContent
          }`
      }}
      onTouchMove={(e) => {
        movement(e)
      }}
      onTouchEnd={(e) => {
        stopMovementCheck(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: none`
      }}
      onWheel={(e) => {
        wheel(e.target as HTMLLIElement)
      }}
      onFocus={(e) => {
        focused(e.target as HTMLLIElement)
        const blob = e.target as HTMLLIElement
        const blobRect = blob.getBoundingClientRect()
        const parentRect = (blob.parentNode as HTMLDivElement)?.getBoundingClientRect()

        const blobStyle = window.getComputedStyle(blob)
        const marginTop = parseFloat(blobStyle.marginTop)
        const marginLeft = parseFloat(blobStyle.marginLeft)

        setFocusedBlob({
          top: blobRect.top - parentRect.top - marginTop,
          left: blobRect.left - parentRect.left - marginLeft,
          width: blobRect.width,
          height: blobRect.height,
        })
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: ${
            (e.target as HTMLElement)?.querySelector('span')?.textContent
          }`
      }}
      onBlurCapture={(e) => {
        blurred(e.target as HTMLLIElement)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: none`
      }}
    >
      <span className='scr'>Blob {item.number}</span>
    </li>
  )
}

export default Blob

{
  /* <li
        key={index}
        className='dragzone'
        id={item.id}
        aria-grabbed={false}
        role={'option'}
        tabIndex={0}
        draggable='true'
        style={blobStyle}
        onMouseDown={start}
        onMouseMove={movement}
        onMouseUp={stopMovementCheck}
        onMouseLeave={stopMoving}
        onTouchStart={start}
        onTouchMove={movement}
        onTouchEnd={stopMovementCheck}
        onWheel={wheel}
        onFocus={focused}
        onBlurCapture={blurred}
      >
        <span className='scr'>Blob {item.number}</span>
      </li> */
}

// <li
//   key={index}
//   className='dragzone'
//   id={item.id}
//   aria-grabbed={false}
//   role={'option'}
//   tabIndex={0}
//   draggable='true'
//   style={blobStyle}
//   onMouseDown={(e) => {
//     if (props.selectedvalue0.current)
//       props.selectedvalue0.current.textContent = `Selected blob: ${
//         (e.target as HTMLElement)?.querySelector('span')?.textContent
//       }`
//     start(e)
//   }}
//   onMouseMove={(e) => {
//     movement(e)
//   }}
//   onMouseUp={(e) => {
//     stopMovementCheck(e)
//     if (props.selectedvalue0.current)
//       props.selectedvalue0.current.textContent = `Selected blob: none`
//   }}
//   onMouseLeave={(e) => {
//     stopMoving(e)
//     if (props.selectedvalue0.current)
//       props.selectedvalue0.current.textContent = `Selected blob: none`
//   }}
//   onTouchStart={(e) => {
//     start(e)
//     if (props.selectedvalue0.current)
//       props.selectedvalue0.current.textContent = `Selected blob: ${
//         (e.target as HTMLElement)?.querySelector('span')?.textContent
//       }`
//   }}
//   onTouchMove={(e) => {
//     movement(e)
//   }}
//   onTouchEnd={(e) => {
//     stopMovementCheck(e)
//     if (props.selectedvalue0.current)
//       props.selectedvalue0.current.textContent = `Selected blob: none`
//   }}
//   onWheel={(e) => {
//     wheel(e.target as HTMLLIElement)
//   }}
//   onFocus={(e) => {
//     focused(e.target)
//     if (props.selectedvalue0.current)
//       props.selectedvalue0.current.textContent = `Selected blob: ${
//         (e.target as HTMLElement)?.querySelector('span')?.textContent
//       }`
//   }}
//   onBlurCapture={(e) => {
//     blurred(e.target)
//     if (props.selectedvalue0.current)
//       props.selectedvalue0.current.textContent = `Selected blob: none`
//   }}
// >
//   <span className='scr'>Blob {item.number}</span>
// </li>
