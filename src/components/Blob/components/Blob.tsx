import {
  RefObject,
  MouseEvent,
  TouchEvent,
  CSSProperties,
  SetStateAction,
  Dispatch,
  TouchEvent as TouchEventReact,
  MouseEvent as MouseEventReact,
  PointerEvent as PointerEventReact,
} from 'react'
import { Draggable, focusedBlob } from '../interfaces'
import { EBlob, ELanguages } from '../../../interfaces'
import { ESelectedBlob, ESelectedBlobNone } from '../../../interfaces/blobs'

interface BlobProps {
  language: ELanguages
  item: Draggable
  index: number
  start: (
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | TouchEventReact
      | MouseEventReact
      | PointerEventReact
  ) => void
  movement: (
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | TouchEventReact
      | MouseEventReact
      | PointerEventReact
  ) => void
  stopMovementCheck: (
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | TouchEventReact
      | MouseEventReact
      | PointerEventReact
  ) => void
  stopMoving: (e: MouseEvent | MouseEventReact | PointerEvent | PointerEventReact) => void
  wheel: (e: HTMLLIElement) => void
  focused: (e: HTMLLIElement) => void
  blurred: (e: HTMLLIElement) => void
  selectedvalue0: RefObject<HTMLSpanElement>
  focusedBlob: focusedBlob | null
  setFocusedBlob: Dispatch<SetStateAction<focusedBlob | null>>
}

const Blob = ({
  language,
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
    background: `${item.background ?? 'linear-gradient(90deg, cyan, greenyellow)'}`,
    display: `block`,
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
          selectedvalue0.current.textContent = `${ESelectedBlob[language]}: ${
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
          selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
      }}
      onMouseLeave={(e) => {
        stopMoving(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
      }}
      onTouchStart={(e) => {
        start(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `${ESelectedBlob[language]}: ${
            (e.target as HTMLElement)?.querySelector('span')?.textContent
          }`
      }}
      onTouchMove={(e) => {
        movement(e)
      }}
      onTouchEnd={(e) => {
        stopMovementCheck(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
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
          selectedvalue0.current.textContent = `${ESelectedBlob[language]}: ${
            (e.target as HTMLElement)?.querySelector('span')?.textContent
          }`
      }}
      onBlurCapture={(e) => {
        blurred(e.target as HTMLLIElement)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
      }}
    >
      <span className='scr'>
        {EBlob[language]} {item.number}
      </span>
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
