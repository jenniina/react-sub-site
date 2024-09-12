import {
  RefObject,
  Dispatch,
  SetStateAction,
  Dispatch as DispatchReact,
  CSSProperties,
  TouchEvent as TouchEventReact,
  MouseEvent as MouseEventReact,
  PointerEvent as PointerEventReact,
} from 'react'
import { Draggable, focusedBlob, ColorPair } from '../interfaces'
import Blob from './Blob'
import { ELanguages } from '../../../interfaces'

interface DragComponentProps {
  layer: number
  className: string
  language: ELanguages
  d: number
  items: Draggable[]
  saveDraggables: () => void
  dragWrap: RefObject<HTMLDivElement>
  dragUlRef: RefObject<HTMLUListElement>
  selectedvalue0: RefObject<HTMLSpanElement>
  focusedBlob: focusedBlob | null
  setFocusedBlob: Dispatch<SetStateAction<focusedBlob | null>>
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
}

const DragComponent = (props: DragComponentProps) => {
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
              start={props.start}
              movement={props.movement}
              stopMovementCheck={props.stopMovementCheck}
              stopMoving={props.stopMoving}
              wheel={props.wheel}
              focused={props.focused}
              blurred={props.blurred}
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
