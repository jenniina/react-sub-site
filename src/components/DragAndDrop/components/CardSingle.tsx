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
import { AiOutlineEdit } from 'react-icons/ai'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { determineBackgroundLightness, sanitize } from '../../../utils'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { getErrorMessage } from '../../../utils'
import Accordion from '../../Accordion/Accordion'

interface Props {
  status: Status
  statuses: Status[]
  id: number
  data: Data
  index: number
  setData: React.Dispatch<React.SetStateAction<Data[]>>
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
  setData,
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
    padding: '0.3em 3% 0.3em 4%',
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

  const [isOpen, setIsOpen] = useState(false)
  const [isEditContentOpen, setIsEditContentOpen] = useState(false)
  const [isEditColorOpen, setIsEditColorOpen] = useState(false)
  const [editedContent, setEditedContent] = useState(data.content)
  const [editedColor, setEditedColor] = useState(data.color)
  const [sending, setSending] = useState(false)

  function toggleOpen() {
    setIsOpen(prev => !prev)
  }
  function closing() {
    setIsOpen(false)
    setIsEditContentOpen(false)
    setIsEditColorOpen(false)
  }

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
      // Position off-screen to prevent scrolling
      textArea.style.position = 'fixed'
      textArea.style.top = '-9999px'
      textArea.style.left = '-9999px'
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

  const handleEditContent = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    if (editedContent.trim() === '') {
      void dispatch(notify(t('PleaseFillInTheFields'), true, 6))
      setSending(false)
      return
    }

    setData(prevData =>
      prevData.map(item =>
        item.id === data.id
          ? { ...item, content: editedContent.trim(), isUser: true }
          : item
      )
    )
    setIsEditContentOpen(false)
    setSending(false)
    void dispatch(notify(t('Updated'), false, 3))
  }

  const isValidColor = (color: string) => {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      return CSS.supports('color', color)
    }
    return false
  }

  const handleEditColor = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    if (editedColor.trim() === '') {
      void dispatch(notify(t('PleaseFillInTheFields'), true, 6))
      setSending(false)
      return
    }

    if (!isValidColor(editedColor)) {
      void dispatch(notify(t('InvalidColor'), true, 6))
      setSending(false)
      return
    }

    const newLightness = determineBackgroundLightness(editedColor)

    setData(prevData =>
      prevData.map(item =>
        item.id === data.id
          ? {
              ...item,
              color: editedColor.trim(),
              lightness: newLightness,
              isUser: true,
            }
          : item
      )
    )
    setIsEditColorOpen(false)
    setSending(false)
    void dispatch(notify(t('Updated'), false, 3))
  }

  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedColor(e.target.value)
  }

  const normalizeColorForPicker = (color: string): string => {
    // If it's already a hex color, return it
    if (color.startsWith('#')) return color

    // Convert named colors or other formats to hex
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return '#000000'

    ctx.fillStyle = color
    return ctx.fillStyle
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
          <button onClick={() => void handleRemoveColor(data)}>
            <b>&times;</b>
          </button>
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
          <ul
            aria-describedby={`instructions${id}`}
            aria-expanded={isOpen ? 'true' : 'false'}
            role="listbox"
            className={sanitize(currentStatus)}
          >
            <li className={styles.copy}>
              <MdContentCopy />
              <button
                type="button"
                className={styles.copy}
                onClick={() => void handleCopyToClipboard(data.content)}
                title={t('CopyToClipboard')}
              >
                <i>{t('CopyText')}</i>
              </button>
            </li>
            <li className={styles.edit}>
              <AiOutlineEdit />
              <Accordion
                isOpen={isEditContentOpen}
                setIsFormOpen={setIsEditContentOpen}
                text={t('EditText')}
                className="edit-content"
                wrapperClass={styles['edit-wrap']}
                hideBrackets
              >
                <form onSubmit={handleEditContent}>
                  <div className="input-wrap">
                    <label htmlFor={`edit-content-${id}`}>
                      <input
                        type="text"
                        id={`edit-content-${id}`}
                        value={editedContent}
                        onChange={e => setEditedContent(e.target.value)}
                        required
                      />
                      <span>{t('Text')}:</span>
                    </label>
                  </div>
                  <button type="submit" disabled={sending}>
                    {t('Save')}
                  </button>
                </form>
              </Accordion>
            </li>
            <li className={styles.edit}>
              <AiOutlineEdit />
              <Accordion
                isOpen={isEditColorOpen}
                setIsFormOpen={setIsEditColorOpen}
                text={t('EditColor')}
                className="edit-color"
                wrapperClass={styles['edit-wrap']}
                hideBrackets
              >
                <form onSubmit={handleEditColor}>
                  <div className="input-wrap">
                    <label htmlFor={`edit-color-${id}`}>
                      <input
                        type="text"
                        id={`edit-color-${id}`}
                        value={editedColor}
                        onChange={e => setEditedColor(e.target.value)}
                        required
                      />
                      <span>{t('Color')}:</span>
                    </label>
                  </div>
                  <div className={styles['color-picker']}>
                    <label htmlFor={`edit-color-picker-${id}`}>
                      <span>{t('ColorPicker')}:</span>
                    </label>
                    <input
                      type="color"
                      id={`edit-color-picker-${id}`}
                      value={normalizeColorForPicker(editedColor)}
                      onChange={handleColorPickerChange}
                    />
                  </div>
                  <button type="submit" disabled={sending}>
                    {t('Save')}
                  </button>
                </form>
              </Accordion>
            </li>
            {statuses.map((targetStatus, i) => (
              <li
                key={`${sanitize(targetStatus)}-${i}-${index}`}
                role="option"
                className={sanitize(targetStatus)}
                aria-selected={targetStatus === currentStatus}
              >
                <MdLocationOn />
                <button
                  type="button"
                  className={`tooltip-wrap ${sanitize(targetStatus)}`}
                  data-status={targetStatus}
                  onClick={e => containerUpdate(e)}
                  title={`${t('ToTarget')}: ${translateStatus(
                    targetStatus
                  ).toLowerCase()}`}
                >
                  <i>{translateStatus(targetStatus)}</i>
                  <span className="tooltip above left narrow2">
                    {t('Move')}
                  </span>
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
