import {
  KeyboardEvent,
  MouseEvent,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  CSSProperties,
  useEffect,
} from 'react'
import { Data, Status } from '../interfaces'
import styles from '../dragAndDrop.module.css'
import { MdContentCopy, MdLocationOn, MdOutlineDragIndicator } from 'react-icons/md'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import {
  EBad,
  EChooseDestination,
  EGood,
  ENeutral,
} from '../../../interfaces/draganddrop'
import {
  EChange,
  ECopiedToClipboard,
  ECopyText,
  EFailedToCopy,
  ELanguages,
} from '../../../interfaces'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

interface Props {
  language: ELanguages
  status: Status
  statuses: Status[]
  id: number
  data: Data
  index: number
  handleDragging: (dragging: boolean) => void
  handleUpdate: (id: number, status: Status, target?: number) => void
  handleRemoveColor: (color: Data['content']) => void
  setTheTarget: Dispatch<SetStateAction<number>>
  sanitize: (str: string) => string
  focusedCard: number | null
  setFocusedCard: Dispatch<SetStateAction<number | null>>
}

function CardSingle({
  language,
  status,
  statuses,
  id,
  index,
  data,
  handleDragging,
  handleUpdate,
  handleRemoveColor,
  setTheTarget,
  sanitize,
  focusedCard,
  setFocusedCard,
}: Props) {
  const dispatch2 = useAppDispatch()

  const styleCard: CSSProperties = {
    backgroundColor: data?.color,
    padding: '0.3em 5%',
    color: data?.lightness == 'dark' ? 'white' : 'black',
    borderColor:
      data?.lightness == 'dark' ? 'var(--color-gray-lighter)' : 'var(--color-gray-dark)',
    textShadow:
      data?.lightness == 'dark'
        ? '1px 1px 1px black'
        : '-8px 0 12px rgba(255,255,255,0.5), 8px 0 12px rgba(255,255,255,0.5)',
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
    setIsOpen((prev) => !prev)
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

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, position: number) => {
    e.preventDefault()
    setTheTarget(position)
    dragOverItem.current = position
  }
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    handleDragging(true)
    e.preventDefault()
  }

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, position: number) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'item', id: data?.id }))
  }

  function containerUpdate(e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) {
    const anchorElement = (e.target as HTMLElement).closest(
      'a[data-status]'
    ) as HTMLAnchorElement
    const status = anchorElement?.dataset.status
    if (data && status) handleUpdate(data.id, status as Status)
  }

  function keyListen(e: KeyboardEvent<HTMLAnchorElement>) {
    switch (e.code) {
      case 'Enter':
      case 'Space':
        e.stopPropagation()
        e.preventDefault()
        const anchorElement = (e.target as HTMLElement).closest(
          'a[data-status]'
        ) as HTMLAnchorElement
        const stat = anchorElement?.dataset.status ?? status
        if (data) handleUpdate(data.id, stat)
        setIsOpen((prev) => !prev)
        break
      case 'Escape':
        e.stopPropagation()
        e.preventDefault()
        setIsOpen(false)
        break
    }
  }

  const handleUpAndDown = (e: KeyboardEvent<HTMLElement>, position: number) => {
    const parentLi = (e.target as HTMLElement).closest('li') as HTMLLIElement
    let li: HTMLLIElement | null
    if (parentLi) {
      li = parentLi
    } else {
      li = e.target as HTMLLIElement
    }
    const previous = Number(
      (li?.previousElementSibling as HTMLLIElement)?.dataset.identity
    )
    const next = Number((li?.nextElementSibling as HTMLLIElement)?.dataset.identity)
    switch (e.key) {
      case 'ArrowUp':
        if (data && previous !== null) {
          e.preventDefault()
          handleUpdate(position, data.status, previous)
          setFocusedCard(position)
        }
        break
      case 'ArrowDown':
        if (data && next !== null) {
          e.preventDefault()
          handleUpdate(position, data.status, next)
          setFocusedCard(position)
        }
        break
      case 'Tab':
        setFocusedCard(null)
      default:
        break
    }
  }

  useEffect(() => {
    if (focusedCard === id) {
      cardRef.current?.focus()
    }
  }, [focusedCard, id])

  const handleCopyToClipboard = (text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => {
          dispatch2(notify(ECopiedToClipboard[language], false, 3))
        },
        (err) => {
          dispatch2(notify(`${EFailedToCopy[language]}`, true, 3))
        }
      )
    } else {
      // Fallback method for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      cardRef.current?.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        dispatch2(notify(ECopiedToClipboard[language], false, 3))
      } catch (err) {
        dispatch2(notify(`${EFailedToCopy[language]}`, true, 3))
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <li
      ref={cardRef}
      draggable={'true'}
      onDragStart={(e) => handleDragStart(e, id)}
      onDragEnter={(e) => handleDragEnter(e, id)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnd={() => handleDragging(false)}
      role={'listitem'}
      title={data?.status}
      tabIndex={0}
      onKeyDown={(e) => handleUpAndDown(e, id)}
      data-identity={id}
    >
      <div style={styleCard} className={`${styles['card']}`}>
        <span className={styles.text}>{data?.content}</span>
        <b>
          <button onClick={() => handleRemoveColor(data.content)}>&times;</button>
          <button aria-haspopup='true' onClick={toggleOpen}>
            <MdOutlineDragIndicator aria-hidden='true' />
            <span className='scr' id={`instructions${id}`}>
              {EChooseDestination[language]}
            </span>
          </button>
        </b>
        <nav
          className={isOpen ? `${styles.open} ${styles.blur}` : `${styles.blur}`}
          style={styleReset}
        >
          <span style={styleTitle}>{EChange[language]}:</span>
          <ul
            role='listbox'
            aria-describedby={`instructions${id}`}
            aria-expanded={isOpen ? 'true' : 'false'}
            className={sanitize(status)}
          >
            <li role='option' className={styles.copy}>
              <a
                className={styles.copy}
                onClick={() => handleCopyToClipboard(data.content)}
                tabIndex={0}
              >
                <MdContentCopy />
                <i>{ECopyText[language]}</i>
              </a>
            </li>
            {statuses.map((status, i) => (
              <li
                key={`${sanitize(status)}-${i}-${index}`}
                role='option'
                className={sanitize(status)}
              >
                <a
                  className={sanitize(status)}
                  data-status={status}
                  onClick={(e) => containerUpdate(e)}
                  onKeyDown={(e) => keyListen(e)}
                  tabIndex={0}
                >
                  <MdLocationOn />
                  <i>
                    {(() => {
                      const statusLowerCase = status.toLowerCase()
                      // translations for the initial statuses:
                      switch (statusLowerCase) {
                        case 'good':
                          return EGood[language]
                        case 'bad':
                          return EBad[language]
                        case 'neutral':
                          return ENeutral[language]
                        default:
                          return status.replace(/_/g, ' ')
                      }
                    })()}
                  </i>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </li>
  )
}

export default CardSingle
