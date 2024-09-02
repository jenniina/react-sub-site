import {
  KeyboardEvent,
  MouseEvent,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  CSSProperties,
} from 'react'
import { Data, Status } from '../interfaces'
import styles from '../dragAndDrop.module.css'
import { MdOutlineDragIndicator } from 'react-icons/md'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { EChooseDestination } from '../../../interfaces/draganddrop'
import { EChange, ELanguages } from '../../../interfaces'

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
}: Props) {
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

  const types = statuses.reduce((acc, status) => {
    acc[status] = status
    return acc
  }, {} as Record<string, string>) // for example, if the statuses are ['good', 'neutral', 'bad'], then types is {good: 'good', neutral: 'neutral', bad: 'bad'}

  const [isOpen, setIsOpen] = useState(false)
  function toggleOpen() {
    setIsOpen((prev) => !prev)
  }
  function closing() {
    setIsOpen(false)
  }
  // const closingRef = useOutsideClick({ onOutsideClick: closing })

  const closingRef = useRef<HTMLLIElement>(null)

  useOutsideClick({
    ref: closingRef,
    onOutsideClick: closing,
  })

  //original inspiration: https://www.aurigait.com/blog/drag-and-drop-in-react/

  const dragItem = useRef<number>(0)
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
    e.dataTransfer.setData('text', `${data?.id}`)
  }

  function containerUpdate(e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) {
    if (data) handleUpdate(data.id, (e.target as HTMLAnchorElement).textContent as Status)
  }
  function keyListen(e: KeyboardEvent<HTMLAnchorElement>) {
    switch (e.code) {
      case 'Enter':
      case 'Space':
        e.stopPropagation()
        e.preventDefault()
        if (data)
          handleUpdate(data.id, (e.target as HTMLAnchorElement).textContent as Status)
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
    e.preventDefault()
    const previous = Number(
      ((e.target as HTMLElement)?.previousElementSibling as HTMLLIElement)?.dataset
        .identity
    )
    const next = Number(
      ((e.target as HTMLElement)?.nextElementSibling as HTMLLIElement)?.dataset.identity
    )
    switch (e.key) {
      case 'ArrowUp':
        if (data && previous) handleUpdate(position, data.status, previous)
        break
      case 'ArrowDown':
        if (data && next) handleUpdate(position, data.status, next)
        break
      default:
        break
    }
  }

  return (
    <li
      ref={closingRef}
      draggable={'true'}
      onDragStart={(e) => handleDragStart(e, id)}
      onDragEnter={(e) => handleDragEnter(e, id)}
      onDragOver={(e) => handleDragOver(e)}
      role={'listitem'}
      title={data?.status}
      tabIndex={0}
      onKeyUp={(e) => handleUpAndDown(e, id)}
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
            {statuses.map((status, i) => (
              <li
                key={`${sanitize(status)}-${i}-${index}`}
                role='option'
                className={sanitize(status)}
              >
                <a
                  className={sanitize(status)}
                  onClick={(e) => containerUpdate(e)}
                  onKeyDown={(e) => keyListen(e)}
                  tabIndex={0}
                >
                  {types[status]}
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
