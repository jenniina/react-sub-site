import React, {
  RefObject,
  MouseEvent,
  TouchEvent,
  CSSProperties,
  SetStateAction,
  Dispatch,
  useContext,
} from 'react'
import { Draggable, focusedBlob, Modes } from '../types'
import { clampValue } from '../../../utils'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { BlobContext } from './BlobProvider'
import { notify } from '../../../reducers/notificationReducer'
import { useLanguageContext } from '../../../contexts/LanguageContext'

interface BlobProps {
  d: number
  layer: number
  item: Draggable
  index: number
  start: (
    e: TouchEvent | MouseEvent | PointerEvent,
    target: HTMLElement
  ) => void
  movement: (
    e: TouchEvent | MouseEvent | PointerEvent,
    target: HTMLElement
  ) => void
  stopMovementCheck: (
    e: TouchEvent | MouseEvent | PointerEvent,
    target: HTMLElement
  ) => void
  stopMoving: (e: MouseEvent | PointerEvent, target: HTMLElement) => void
  wheel: (target: HTMLElement) => void
  focused: (e: HTMLElement) => void
  blurred: (e: HTMLElement) => void
  setSelectedvalue0: Dispatch<SetStateAction<string | null>>
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
  item,
  index,
  start,
  movement,
  stopMovementCheck,
  stopMoving,
  wheel,
  focused,
  blurred,
  setSelectedvalue0,
  setFocusedBlob,
  dragUlRef,
  removeBlob,
  mode,
  changeBlobLayer,
  layerAmount,
  changeColor,
}: BlobProps) => {
  const { t } = useLanguageContext()

  const blur = d === 0 ? 33 : clampValue(22, item.i * 2.6, 50)
  const { dispatch } = useContext(BlobContext)!
  const dispatch2 = useAppDispatch()

  const blobStyle: CSSProperties = {
    background: `${item.background}`,
    display: `block`,
    left: `${item.x}`,
    top: `${item.y}`,
    zIndex: `${item.z}`,
    ['--i' as string]: isNaN(Number(item.i)) ? '10' : `${item.i}`, // default value for i
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

  const handleClick = () => {
    if (mode === 'change-color') {
      changeColor(item.id)
    } else if (mode === 'delete') {
      removeBlob(item)
    } else if (mode === 'clone') {
      void dispatch({
        type: 'duplicateDraggable',
        payload: { d, draggable: item },
      })
    } else if (mode === 'layer-up') {
      let layer = item.layer
      if (layer < layerAmount - 1) {
        layer += 1
        changeBlobLayer(item, layer)
      } else {
        void dispatch2(notify(t('CannotRaiseBlobFurther'), true, 4))
      }
    } else if (mode === 'layer-down') {
      let layer = item.layer
      if (layer > 0) {
        layer -= 1
        changeBlobLayer(item, layer)
      } else {
        void dispatch2(notify(t('CannotLowerBlobFurther'), true, 4))
      }
    } else if (mode === 'scale-down') {
      let scale = item.i
      scale = isNaN(scale) ? 10 : scale
      scale -= 0.4
      scale = Math.min(Math.max(7, scale), 36)
      void dispatch({
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
      scale = isNaN(scale) ? 10 : scale
      scale += 0.4
      scale = Math.min(Math.max(7, scale), 36)
      void dispatch({
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
      onFocus={e => {
        dragUlRef?.current?.setAttribute(
          'aria-activedescendant',
          `${e.target.id}`
        )

        const blob = e.target

        setTimeout(() => {
          // Calculate the position of the blob after scrolling

          const blobRect = blob.getBoundingClientRect()
          const parentRect = (
            blob.parentNode as HTMLUListElement
          )?.getBoundingClientRect()
          const container = blob.closest('.drag-wrap-outer')!
          const scrollLeft = container?.scrollLeft
          const scrollTop = container?.scrollTop

          setFocusedBlob({
            top: blobRect.top - parentRect.top - scrollTop,
            left: blobRect.left - parentRect.left - scrollLeft,
            width: blobRect.width,
            height: blobRect.height,
          })

          {
            setSelectedvalue0(
              `${t('SelectedBlob')}: ${blob.querySelector('span')?.textContent}?`
            )
          }
        }, 500) // Adjust the timeout duration as needed
        focused(blob)
      }}
      onBlur={e => {
        setFocusedBlob(null)
        blurred(e.target)
        dragUlRef?.current?.removeAttribute('aria-activedescendant')

        setSelectedvalue0(`${t('SelectedBlobNone')}`)
      }}
      key={index}
      className={`dragzone animation ${mode}`}
      id={item.id}
      role={'option'}
      aria-selected={false}
      tabIndex={0}
      style={blobStyle}
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <button
        className="draggable-overlay"
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
                      : isNaN(Number(item.i)) ||
                          item.i === null ||
                          item.i === undefined
                        ? {
                            width: `7 * ${innerSize[6]})`,
                            height: `7 * ${innerSize[6]})`,
                          }
                        : {
                            width: `calc(var(--i) * ${innerSize[6]})`,
                            height: `calc(var(--i) * ${innerSize[6]})`,
                          }
        }
        onMouseDown={e => {
          e.stopPropagation()
          const liElement = e.currentTarget.parentElement!
          liElement.draggable = true

          setSelectedvalue0(
            `${t('SelectedBlob')}: ${liElement?.querySelector('span')?.textContent}?`
          )

          dragUlRef?.current?.setAttribute(
            'aria-activedescendant',
            `${liElement.id}`
          )

          start(e, liElement)
        }}
        onMouseMove={e => {
          if (e.buttons === 1) {
            e.stopPropagation()
            const liElement = e.currentTarget.parentElement!
            liElement.draggable = true
            movement(e, liElement)

            setSelectedvalue0(
              `${t('SelectedBlob')}: ${
                liElement?.querySelector('span')?.textContent
              }?`
            )
          }
        }}
        onMouseLeave={e => {
          e.stopPropagation()
          const liElement = e.currentTarget.parentElement!
          liElement.draggable = false
          dragUlRef?.current?.removeAttribute('aria-activedescendant')
          stopMoving(e, liElement)
          setSelectedvalue0(`${t('SelectedBlobNone')}`)
        }}
        onMouseUp={e => {
          const liElement = e.currentTarget.parentElement!
          liElement.draggable = false
          stopMovementCheck(e, liElement)
          dragUlRef?.current?.removeAttribute('aria-activedescendant')
          setSelectedvalue0(`${t('SelectedBlobNone')}`)
        }}
        onTouchStart={e => {
          e.preventDefault()
          e.stopPropagation()
          const liElement = e.currentTarget.parentElement!
          liElement.draggable = true
          dragUlRef?.current?.setAttribute(
            'aria-activedescendant',
            `${liElement.id}`
          )
          start(e, liElement)

          setSelectedvalue0(
            `${t('SelectedBlob')}: ${
              liElement?.querySelector('span')?.textContent ?? ''
            }`
          )
        }}
        onTouchMove={e => {
          e.preventDefault()
          e.stopPropagation()
          const liElement = e.currentTarget.parentElement!
          liElement.draggable = true
          movement(e, liElement)
        }}
        onTouchEnd={e => {
          const liElement = e.currentTarget.parentElement!
          liElement.draggable = false
          dragUlRef?.current?.removeAttribute('aria-activedescendant')
          stopMovementCheck(e, liElement)
          setSelectedvalue0(`${t('SelectedBlobNone')}`)
        }}
        onWheel={e => {
          const liElement = e.currentTarget.parentElement!
          wheel(liElement)
        }}
      ></button>
      <span className="scr">
        {t('Blob')} {item.number}
      </span>
    </li>
  )
}

export default Blob
