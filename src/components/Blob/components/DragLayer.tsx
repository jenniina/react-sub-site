import {
  RefObject,
  SetStateAction,
  Dispatch,
  CSSProperties,
  TouchEvent as TouchEventReact,
  MouseEvent as MouseEventReact,
  PointerEvent as PointerEventReact,
  useContext,
} from 'react'
import { Draggable, focusedBlob, Modes } from '../types'
import Blob from './Blob'
import { ELanguages } from '../../../types'
import { LanguageContext } from '../../../contexts/LanguageContext'

interface DragLayerProps {
  layer_: number
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
  removeBlob: (draggable: Draggable) => void
  mode: Modes
  changeBlobLayer: (draggable: Draggable, layer: number) => void
  layerAmount: number
  changeColor: (id: string) => void
}

const DragLayer = ({
  layer_,
  className,
  language,
  d,
  items,
  saveDraggables,
  dragUlRef,
  selectedvalue0,
  setFocusedBlob,
  start,
  movement,
  stopMovementCheck,
  stopMoving,
  wheel,
  focused,
  blurred,
  removeBlob,
  mode,
  layerAmount,
  changeBlobLayer,
  changeColor,
}: DragLayerProps) => {
  const { t } = useContext(LanguageContext)!

  const svgFilter = d === 0 ? 0 : 1 // Choose the second filter for containers other than 0
  const layerStyle: CSSProperties = {
    WebkitFilter: `url(#svgGaussian${svgFilter}) url(#svgMatrix${svgFilter})`,
    filter: `url(#svgGaussian${svgFilter}) url(#svgMatrix${svgFilter})`,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    minHeight: '420px',
    minWidth: '100%',
    margin: '0',
    padding: '0',
    overflow: 'visible',
    borderRadius: '0',
  }

  return (
    <>
      <span id={`listbox${d}-layer${layer_}-label`} className='scr'>
        {t('Layer')} {layer_ + 1}
      </span>
      <ul
        ref={dragUlRef}
        role='listbox'
        id={`listbox${d}-layer${layer_}`}
        className={`drag-container-layer drag-container${d}-layer drag-container${d}-layer${layer_} ${className}`}
        aria-labelledby={`listbox${d}-layer${layer_}-label`}
        aria-activedescendant=''
        style={layerStyle}
      >
        {items?.map((item: Draggable, index: number) => {
          if (item !== null && item !== undefined) {
            return (
              <Blob
                layer={layer_}
                key={index}
                d={d}
                language={language}
                item={item}
                index={index}
                start={start}
                movement={movement}
                stopMovementCheck={stopMovementCheck}
                stopMoving={stopMoving}
                wheel={wheel}
                focused={focused}
                blurred={blurred}
                selectedvalue0={selectedvalue0}
                setFocusedBlob={setFocusedBlob}
                dragUlRef={dragUlRef}
                removeBlob={removeBlob}
                mode={mode}
                changeBlobLayer={changeBlobLayer}
                layerAmount={layerAmount}
                changeColor={changeColor}
              />
            )
          }
        })}
      </ul>
    </>
  )
}

export default DragLayer
