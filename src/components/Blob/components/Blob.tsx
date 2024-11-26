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
  useContext,
} from 'react'
import { Draggable, focusedBlob, Modes } from '../interfaces'
import { EBlob, ELanguages } from '../../../interfaces'
import {
  ECannotLowerBlobFurther,
  ECannotRaiseBlobFurther,
  ESelectedBlob,
  ESelectedBlobNone,
} from '../../../interfaces/blobs'
import { clamp } from '../../../utils'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { BlobContext, Props } from './BlobProvider'
import { notify } from '../../../reducers/notificationReducer'

interface BlobProps {
  d: number
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
  setFocusedBlob: Dispatch<SetStateAction<focusedBlob | null>>
  dragUlRef: RefObject<HTMLUListElement>
  removeBlob: (draggable: Draggable) => void
  mode: Modes
  changeBlobLayer: (draggable: Draggable, layer: number) => void
  layerAmount: number
  changeColor: (id: string) => void
}

const Blob = ({
  d,
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
  setFocusedBlob,
  dragUlRef,
  removeBlob,
  mode,
  changeBlobLayer,
  layerAmount,
  changeColor,
}: BlobProps) => {
  const blur = d === 0 ? 33 : clamp(22, item.i * 2.6, 50)
  const { dispatch } = useContext(BlobContext) as Props
  const dispatch2 = useAppDispatch()

  const blobStyle: CSSProperties = {
    background: `${item.background}`,
    display: `block`,
    left: `${item.x}`,
    top: `${item.y}`,
    zIndex: `${item.z}`,
    ['--i' as string]: isNaN(Number(item.i)) ? '7' : `${item.i}`, // default value for i
    ['--layer' as string]: `${layer}`,
    WebkitFilter: `blur(${blur}px)`,
    filter: `blur(${blur}px)`,
  }

  const innerSize =
    d === 0
      ? [
          '5.9px', //<8
          '8.2px', //<10
          '9.9px', //<20
          '10.8px', //<24
          '10.7px', //<28
          '10.5px', //<32
          '10px',
        ]
      : ['5.1px', '5.4px', '6.5px', '7px', '7.8px', '8.4px', '8.6px'] // breakpoints for hitbox size due to varying levels of blur between the containers and blob sizes

  const handleClick = (e: React.MouseEvent) => {
    if (mode === 'changeColor') {
      changeColor(item.id)
    } else if (mode === 'delete') {
      removeBlob(item)
    } else if (mode === 'clone') {
      dispatch({ type: 'duplicateDraggable', payload: { d, item } })
    } else if (mode === 'layer-up') {
      let layer = item.layer
      if (layer < layerAmount - 1) {
        layer += 1
        changeBlobLayer(item, layer)
      } else {
        dispatch2(notify(ECannotRaiseBlobFurther[language], true, 4))
      }
    } else if (mode === 'layer-down') {
      let layer = item.layer
      if (layer > 0) {
        layer -= 1
        changeBlobLayer(item, layer)
      } else {
        dispatch2(notify(ECannotLowerBlobFurther[language], true, 4))
      }
    } else if (mode === 'scale-down') {
      let scale = item.i
      scale = isNaN(scale) ? 7 : scale
      scale -= 0.4
      scale = Math.min(Math.max(7, scale), 36)
      dispatch({
        type: 'partialUpdate',
        payload: {
          d: d,
          id: item.id,
          update: {
            i: scale,
          },
        },
      })
    } else if (mode === 'scale-up') {
      let scale = item.i
      scale = isNaN(scale) ? 7 : scale
      scale += 0.4
      scale = Math.min(Math.max(7, scale), 36)
      dispatch({
        type: 'partialUpdate',
        payload: {
          d: d,
          id: item.id,
          update: {
            i: scale,
          },
        },
      })
    }
  }

  return (
    <li
      onFocus={(e) => {
        if (dragUlRef && dragUlRef.current)
          dragUlRef.current?.setAttribute(
            'aria-activedescendant',
            `${(e.target as HTMLElement).id}`
          )

        const blob = e.target as HTMLElement

        setTimeout(() => {
          // Calculate the position of the blob after scrolling

          const blobRect = blob.getBoundingClientRect()
          const parentRect = (
            blob.parentNode as HTMLUListElement
          )?.getBoundingClientRect()
          const container = blob.closest('.drag-wrap-outer') as HTMLElement
          const scrollLeft = (container as HTMLElement)?.scrollLeft
          const scrollTop = (container as HTMLElement)?.scrollTop

          setFocusedBlob({
            top: blobRect.top - parentRect.top - scrollTop,
            left: blobRect.left - parentRect.left - scrollLeft,
            width: blobRect.width,
            height: blobRect.height,
          })

          if (selectedvalue0.current) {
            selectedvalue0.current.textContent = `${ESelectedBlob[language]}: ${
              blob.querySelector('span')?.textContent
            }`
          }
        }, 500) // Adjust the timeout duration as needed
        focused(blob)
      }}
      onBlur={(e) => {
        setFocusedBlob(null)
        blurred(e.target as HTMLElement)
        if (dragUlRef && dragUlRef.current)
          dragUlRef.current?.removeAttribute('aria-activedescendant')

        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
      }}
      key={index}
      className={`dragzone animation ${
        mode === 'delete'
          ? 'del'
          : mode === 'clone'
          ? 'copy'
          : mode === 'scale-down'
          ? 'smaller'
          : mode === 'scale-up'
          ? 'larger'
          : ''
      }`}
      id={item.id}
      role={'option'}
      tabIndex={0}
      style={blobStyle}
      onClick={handleClick}
    >
      <div
        className='draggable-overlay'
        style={
          Number(item.i) < 8
            ? {
                width: `calc(var(--i) * ${innerSize[0]})`,
                height: `calc(var(--i) * ${innerSize[0]})`,
              }
            : Number(item.i) < 10
            ? {
                width: `calc(var(--i) * ${innerSize[1]})`,
                height: `calc(var(--i) * ${innerSize[1]})`,
              }
            : Number(item.i) < 20
            ? {
                width: `calc(var(--i) * ${innerSize[2]})`,
                height: `calc(var(--i) * ${innerSize[2]})`,
              }
            : Number(item.i) < 24
            ? {
                width: `calc(var(--i) * ${innerSize[3]})`,
                height: `calc(var(--i) * ${innerSize[3]})`,
              }
            : Number(item.i) < 28
            ? {
                width: `calc(var(--i) * ${innerSize[4]})`,
                height: `calc(var(--i) * ${innerSize[4]})`,
              }
            : Number(item.i) < 32
            ? {
                width: `calc(var(--i) * ${innerSize[5]})`,
                height: `calc(var(--i) * ${innerSize[5]})`,
              }
            : isNaN(Number(item.i)) || item.i === null || item.i === undefined
            ? {
                width: `7 * ${innerSize[6]})`,
                height: `7 * ${innerSize[6]})`,
              }
            : {
                width: `calc(var(--i) * ${innerSize[6]})`,
                height: `calc(var(--i) * ${innerSize[6]})`,
              }
        }
        onMouseDown={(e) => {
          e.stopPropagation()
          const liElement = e.currentTarget.parentElement as HTMLElement
          liElement.draggable = true
          if (selectedvalue0.current)
            selectedvalue0.current.textContent = `${ESelectedBlob[language]}: ${
              (liElement as HTMLElement)?.querySelector('span')?.textContent
            }`
          if (dragUlRef && dragUlRef.current)
            dragUlRef.current?.setAttribute(
              'aria-activedescendant',
              `${(liElement as HTMLElement).id}`
            )

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
          if (dragUlRef && dragUlRef.current)
            dragUlRef.current?.removeAttribute('aria-activedescendant')
          stopMoving(e, liElement)
          if (selectedvalue0.current)
            selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
        }}
        onMouseUp={(e) => {
          const liElement = e.currentTarget.parentElement as HTMLElement
          liElement.draggable = false
          stopMovementCheck(e, liElement)
          if (dragUlRef && dragUlRef.current)
            dragUlRef.current?.removeAttribute('aria-activedescendant')
          if (selectedvalue0.current)
            selectedvalue0.current.textContent = `${ESelectedBlobNone[language]}`
        }}
        onTouchStart={(e) => {
          e.preventDefault()
          e.stopPropagation()
          const liElement = e.currentTarget.parentElement as HTMLElement
          liElement.draggable = true
          if (dragUlRef && dragUlRef.current)
            dragUlRef.current?.setAttribute(
              'aria-activedescendant',
              `${(liElement as HTMLElement).id}`
            )
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
          if (dragUlRef && dragUlRef.current)
            dragUlRef.current?.removeAttribute('aria-activedescendant')
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
