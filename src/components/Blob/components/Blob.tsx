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
  layer: number
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
      | PointerEventReact,
    target: HTMLElement
  ) => void
  movement: (
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | TouchEventReact
      | MouseEventReact
      | PointerEventReact,
    target: HTMLElement
  ) => void
  stopMovementCheck: (
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | TouchEventReact
      | MouseEventReact
      | PointerEventReact,
    target: HTMLElement
  ) => void
  stopMoving: (
    e: MouseEvent | MouseEventReact | PointerEvent | PointerEventReact,
    target: HTMLElement
  ) => void
  wheel: (target: HTMLElement) => void
  focused: (e: HTMLElement) => void
  blurred: (e: HTMLElement) => void
  selectedvalue0: RefObject<HTMLSpanElement>
  focusedBlob: focusedBlob | null
  setFocusedBlob: Dispatch<SetStateAction<focusedBlob | null>>
}

const Blob = ({
  layer,
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
    ['--layer' as string]: `${layer}`,
  }

  return (
    <li
      onFocus={(e) => {
        focused(e.target as HTMLElement)
        const blob = e.target as HTMLElement
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
      onBlur={(e) => {
        setFocusedBlob(null)
        blurred(e.target as HTMLElement)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
      }}
      key={index}
      className='dragzone'
      id={item.id}
      aria-grabbed={false}
      role={'option'}
      tabIndex={0}
      style={blobStyle}
    >
      <div
        className='draggable-overlay'
        onMouseDown={(e) => {
          e.stopPropagation()
          const liElement = e.currentTarget.parentElement as HTMLElement
          liElement.draggable = true
          if (selectedvalue0.current)
            selectedvalue0.current.textContent = `${ESelectedBlob[language]}: ${
              (liElement as HTMLElement)?.querySelector('span')?.textContent
            }`

          start(e, liElement)
        }}
        onMouseMove={(e) => {
          if (e.buttons === 1) {
            e.stopPropagation()
            const liElement = e.currentTarget.parentElement as HTMLElement
            liElement.draggable = true
            movement(e, liElement)

            if (selectedvalue0.current)
              selectedvalue0.current.textContent = `${ESelectedBlob[language]}: ${
                (liElement as HTMLElement)?.querySelector('span')?.textContent
              }`
          }
        }}
        onMouseLeave={(e) => {
          e.stopPropagation()
          const liElement = e.currentTarget.parentElement as HTMLElement
          liElement.draggable = false
          stopMoving(e, liElement)
          if (selectedvalue0.current)
            selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
        }}
        onMouseUp={(e) => {
          const liElement = e.currentTarget.parentElement as HTMLElement
          liElement.draggable = false
          stopMovementCheck(e, liElement)
          if (selectedvalue0.current)
            selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
        }}
        onTouchStart={(e) => {
          e.preventDefault()
          e.stopPropagation()
          const liElement = e.currentTarget.parentElement as HTMLElement
          liElement.draggable = true
          start(e, liElement)
          if (selectedvalue0.current)
            selectedvalue0.current.textContent = `${ESelectedBlob[language]}: ${
              (liElement as HTMLElement)?.querySelector('span')?.textContent
            }`
        }}
        onTouchMove={(e) => {
          e.preventDefault()
          e.stopPropagation()
          const liElement = e.currentTarget.parentElement as HTMLElement
          liElement.draggable = true
          movement(e, liElement)
        }}
        onTouchEnd={(e) => {
          const liElement = e.currentTarget.parentElement as HTMLElement
          liElement.draggable = false
          stopMovementCheck(e, liElement)
          if (selectedvalue0.current)
            selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
        }}
        onWheel={(e) => {
          const liElement = e.currentTarget.parentElement as HTMLElement
          wheel(liElement)
        }}
      ></div>
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
//     wheel(e.target as HTMLElement)
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
