import React, {
  KeyboardEvent,
  MouseEvent,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  CSSProperties,
  useEffect,
} from 'react'
import { Data, Status } from '../types'
import styles from '../dragAndDrop.module.css'
import {
  MdContentCopy,
  MdLocationOn,
  MdOutlineDragIndicator,
} from 'react-icons/md'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { sanitize } from '../../../utils'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { getErrorMessage } from '../../../utils'

interface Props {
  status: Status
  statuses: Status[]
  id: number
  data: Data
  index: number
  handleDragging: (dragging: boolean) => void
  handleUpdate: (id: number, status: Status, target?: number) => void
  handleRemoveColor: (data: Data) => Promise<void>
  setTheTarget: Dispatch<SetStateAction<number>>
  focusedCard: number | null
  setFocusedCard: Dispatch<SetStateAction<number | null>>
  translateStatus: (status: Status) => string
}

function CardSingle({
  status: currentStatus,
  statuses,
  id,
  index,
  data,
  handleDragging,
  handleUpdate,
  handleRemoveColor,
  setTheTarget,
  focusedCard,
  setFocusedCard,
  translateStatus,
}: Props) {
  const { t } = useLanguageContext()

  const dispatch = useAppDispatch()

  const styleCard: CSSProperties = {
    backgroundColor: data?.color,
    padding: '0.3em 5%',
    color: data?.lightness == 'dark' ? 'white' : 'black',
    borderColor:
      data?.lightness == 'dark' ? 'var(--color-gray-7)' : 'var(--color-gray-5)',
    textShadow:
      data?.lightness == 'dark'
        ? '1px 1px 1px black'
        : '1px -1px 3px rgba(255,255,255,0.6), -1px 1px 3px rgba(255,255,255,0.6)',
  }
  const styleReset: CSSProperties = {
    color: 'var(--color-primary-20)',
    textShadow: 'none',
  }

  const styleTitle: CSSProperties = {
    margin: '0 auto 0.3em',
    display: 'block',
    width: 'max-content',
    fontSize: '0.9em',
  }

  const [isOpen, setIsOpen] = useState(false)
  function toggleOpen() {
    setIsOpen(prev => !prev)
  }
  function closing() {
    setIsOpen(false)
  }
  // const cardRef = useOutsideClick({ onOutsideClick: closing })

  const cardRef = useRef<HTMLLIElement>(null)

  useOutsideClick({
    ref: cardRef,
    onOutsideClick: closing,
  })

  //original inspiration: https://www.aurigait.com/blog/drag-and-drop-in-react/

  const dragOverItem = useRef<number>(0)

  const handleDragEnter = (
    e: React.DragEvent<HTMLLIElement>,
    position: number
  ) => {
    e.preventDefault()
    setTheTarget(position)
    dragOverItem.current = position
  }
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    handleDragging(true)
    e.preventDefault()
  }

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ type: 'item', id: data?.id })
    )
    cardRef.current?.setAttribute('aria-selected', 'true')
  }

  function containerUpdate(e: MouseEvent<HTMLButtonElement>) {
    const btn = (e.target as HTMLButtonElement).closest('button[data-status]')
    const status = btn?.getAttribute('data-status') ?? undefined
    if (data && status) handleUpdate(data.id, status)
  }

  // function keyListen(e: KeyboardEvent<HTMLAnchorElement>) {
  //   switch (e.code) {
  //     case 'Enter':
  //     case 'Space':
  //       e.stopPropagation()
  //       e.preventDefault()
  //       const anchorElement = (e.target as HTMLElement).closest(
  //         'a[data-status]'
  //       )! as HTMLElement
  //       const stat = anchorElement?.dataset.status ?? status
  //       if (data) handleUpdate(data.id, stat)
  //       setIsOpen(prev => !prev)
  //       break
  //     case 'Escape':
  //       e.stopPropagation()
  //       e.preventDefault()
  //       setIsOpen(false)
  //       break
  //   }
  // }

  const handleUpAndDown = (e: KeyboardEvent<HTMLElement>, position: number) => {
    const parentLi = (e.target as HTMLElement).closest('li')!
    let li: HTMLLIElement | null
    if (parentLi) {
      li = parentLi
    } else {
      li = e.target as HTMLLIElement
    }
    const previous = Number(
      (li?.previousElementSibling as HTMLElement)?.dataset?.identity
    )
    const next = Number(
      (li?.nextElementSibling as HTMLElement)?.dataset?.identity
    )
    switch (e.key) {
      case 'ArrowUp':
        if (data && !Number.isNaN(previous)) {
          e.preventDefault()
          handleUpdate(position, data.status, previous)
          setFocusedCard(position)
        }
        break
      case 'ArrowDown':
        if (data && !Number.isNaN(next)) {
          e.preventDefault()
          handleUpdate(position, data.status, next)
          setFocusedCard(position)
        }
        break
      case 'Tab':
        setFocusedCard(null)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (focusedCard === id) {
      cardRef.current?.focus()
    }
  }, [focusedCard, id])

  const handleCopyToClipboard = async (text: string) => {
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text)
        void dispatch(notify(t('CopiedToClipboard'), false, 3))
      } catch {
        void dispatch(notify(`${t('FailedToCopy')}`, true, 3))
      }
    } else {
      // Fallback method for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      // append to body so selection and removal are reliable
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        void dispatch(notify(t('CopiedToClipboard'), false, 3))
      } catch (err: unknown) {
        const message = getErrorMessage(err, t('FailedToCopy'))
        void dispatch(notify(message, true, 3))
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <li
      ref={cardRef}
      role="option"
      aria-selected={false}
      draggable={'true'}
      onDragStart={e => handleDragStart(e)}
      onDragEnter={e => handleDragEnter(e, id)}
      onDragOver={e => handleDragOver(e)}
      onDragEnd={() => {
        handleDragging(false)
        cardRef.current?.setAttribute('aria-selected', 'false')
      }}
      tabIndex={0}
      aria-label={t('Draggable')}
      onKeyDown={e => handleUpAndDown(e, id)}
      data-identity={id}
    >
      <div style={styleCard} className={`${styles.card}`}>
        <span className={styles.text}>{data?.content}</span>
        <b>
          <button onClick={() => void handleRemoveColor(data)}>&times;</button>
          <button aria-haspopup="true" onClick={toggleOpen}>
            <MdOutlineDragIndicator aria-hidden="true" />
            <span className="scr" id={`instructions${id}`}>
              {t('ChooseDestination')}
            </span>
          </button>
        </b>
        <nav
          className={
            isOpen ? `${styles.open} ${styles.blur}` : `${styles.blur}`
          }
          style={styleReset}
        >
          <span style={styleTitle}>{t('Move')}:</span>
          <ul
            aria-describedby={`instructions${id}`}
            aria-expanded={isOpen ? 'true' : 'false'}
            role="listbox"
            className={sanitize(currentStatus)}
          >
            <li className={styles.copy}>
              <button
                type="button"
                className={styles.copy}
                onClick={() => void handleCopyToClipboard(data.content)}
                title={t('CopyToClipboard')}
              >
                <MdContentCopy />
                <i>{t('CopyText')}</i>
              </button>
            </li>
            {statuses.map((targetStatus, i) => (
              <li
                key={`${sanitize(targetStatus)}-${i}-${index}`}
                role="option"
                className={sanitize(targetStatus)}
                aria-selected={targetStatus === currentStatus}
              >
                <button
                  type="button"
                  className={sanitize(targetStatus)}
                  data-status={targetStatus}
                  onClick={e => containerUpdate(e)}
                  title={`${t('ToTarget')}: ${translateStatus(
                    targetStatus
                  ).toLowerCase()}`}
                >
                  <MdLocationOn />
                  <i>{translateStatus(targetStatus)}</i>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </li>
  )
}

export default CardSingle
