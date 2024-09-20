import {
  RefObject,
  SetStateAction,
  Dispatch,
  CSSProperties,
  TouchEvent as TouchEventReact,
  MouseEvent as MouseEventReact,
  PointerEvent as PointerEventReact,
} from 'react'
import { Draggable, focusedBlob } from '../interfaces'
import Blob from './Blob'
import { ELanguages } from '../../../interfaces'
import { ELayer } from '../../../interfaces/blobs'

interface DragLayerProps {
  layer: number
  className: string
  language: ELanguages
  d: number
  items: Draggable[]
  saveDraggables: () => void
  dragUlRef: RefObject<HTMLUListElement>
  selectedvalue0: RefObject<HTMLSpanElement>
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

const DragLayer = (props: DragLayerProps) => {
  //   useEffect(() => {
  //     if (props.draggables[props.d] && props.draggables[props.d].length > 0) {
  //       props.saveDraggables()
  //     }
  //   }, [props.draggables?.[props.d]?.length])

  const svgFilter = props.d === 0 ? 0 : 1 // Choose the second filter for containers other than 0
  const layerStyle: CSSProperties = {
    WebkitFilter: `url(#svgfilter${svgFilter})`,
    filter: `url(#svgfilter${svgFilter})`,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
  }

  return (
    <>
      <label
        id={`listbox${props.d}-layer${props.layer}-label`}
        className='scr'
        htmlFor={`listbox${props.d}-layer${props.layer}`}
      >
        {ELayer[props.language]} {props.layer + 1}
      </label>
      <ul
        ref={props.dragUlRef}
        role='listbox'
        id={`listbox${props.d}-layer${props.layer}`}
        className={`drag-container-layer drag-container${props.d}-layer drag-container${props.d}-layer${props.layer} ${props.className}`}
        aria-labelledby={`listbox${props.d}-layer${props.layer}-label`}
        aria-activedescendant=''
        style={layerStyle}
      >
        {props.items?.map((item: Draggable, index: number) => {
          if (item !== null && item !== undefined) {
            return (
              <Blob
                layer={props.layer}
                key={index}
                d={props.d}
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
                setFocusedBlob={props.setFocusedBlob}
                dragUlRef={props.dragUlRef}
              />
            )
          }
        })}
      </ul>
    </>
  )
}

export default DragLayer
