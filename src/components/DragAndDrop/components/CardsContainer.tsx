import React, { useRef, useState } from 'react'
import { Data, Status } from '../types'
import CardSingle from './CardSingle'
import { sanitize } from '../../../utils'
import styles from '../dragAndDrop.module.css'
import Accordion from '../../Accordion/Accordion'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { useLanguageContext } from '../../../contexts/LanguageContext'

interface DragData {
  type: 'item' | 'span'
  id: string
}

interface Props {
  itemsByStatus: Data[]
  status: Status
  statuses: Status[]
  isDragging: boolean
  handleUpdate: (id: number, status: Status, target?: number) => void
  handleRemoveColor: (color: Data['content']) => Promise<void>
  handleDragging: (dragging: boolean) => void
  lightTheme: boolean
  updateStatus: (index: number, status: Status) => void
  reorderStatuses: (dragIndex: number, dropIndex: number) => void
  deleteStatus: (status: string) => Promise<void>
  regex: RegExp
}

const CardsContainer = ({
  status,
  statuses,
  isDragging,
  handleDragging,
  handleUpdate,
  handleRemoveColor,
  itemsByStatus,
  lightTheme,
  updateStatus,
  reorderStatuses,
  deleteStatus,
  regex,
}: Props) => {
  const { t } = useLanguageContext()

  const dispatch = useAppDispatch()

  const [theTarget, setTheTarget] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<Status>('')
  const [focusedCard, setFocusedCard] = useState<number | null>(null)
  const outsideClickRef = useRef<HTMLSpanElement>(null)
  const [sending, setSending] = useState(false)

  const handleStatusNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSending(true)
    const value = e.target.value
    if (regex.test(value)) {
      setNewStatus(value)
      setSending(false)
    } else {
      void dispatch(notify(t('SpecialCharactersNotAllowed'), true, 6))
      setSending(false)
    }
  }

  useOutsideClick({
    ref: outsideClickRef,
    onOutsideClick: () => setIsOpen(false),
  })

  const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
    const data = JSON.parse(e.dataTransfer.getData('text/plain')) as DragData

    if (data.type === 'item') {
      handleUpdate(parseInt(data.id), status, theTarget)
      handleDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLUListElement>) =>
    e.preventDefault()

  const handleContainerDragStart = (
    e: React.DragEvent<HTMLSpanElement>,
    index: number
  ) => {
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ type: 'span', id: index.toString() })
    )
    handleDragging(true)
  }
  const handleContainerDragOver = (e: React.DragEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const handleContainerDrop = (
    e: React.DragEvent<HTMLSpanElement>,
    dropIndex: number
  ) => {
    e.preventDefault()
    const data = JSON.parse(e.dataTransfer.getData('text/plain')) as DragData
    if (data.type === 'span') {
      const dragIndex: number = parseInt(data.id)

      if (dragIndex !== dropIndex) {
        const reorderedStatuses = Array.from(statuses)
        const [removed] = reorderedStatuses.splice(dragIndex, 1)
        reorderedStatuses.splice(dropIndex, 0, removed)

        // Update the statuses order
        reorderStatuses(dragIndex, dropIndex)
      }

      handleDragging(false)
    }
  }

  const translateStatus = (status: string) => {
    const statusLowerCase = status.toLowerCase()
    switch (statusLowerCase) {
      case 'good':
        return t('Good')
      case 'bad':
        return t('Bad')
      case 'neutral':
        return t('Neutral')
      default:
        return status.replace(/_/g, ' ')
    }
  }

  return (
    <div
      className={`${styles['cards-container']} ${
        isDragging ? styles['area-dragging'] : ''
      } ${lightTheme ? styles.light : ''}`}
      onDrop={e => void handleContainerDrop(e, statuses.indexOf(status))}
      onDragEnd={() => handleDragging(false)}
    >
      <span
        ref={outsideClickRef}
        id={`label-${sanitize(status)}`}
        className={styles['status-label']}
        draggable
        onDragStart={e => handleContainerDragStart(e, statuses.indexOf(status))}
        onDragOver={handleContainerDragOver}
      >
        <b>{translateStatus(status)}</b>
        <Accordion
          isOpen={isOpen}
          setIsFormOpen={setIsOpen}
          text={`*`}
          hideBrackets
          onClick={() => setNewStatus(status)}
          className={`narrow2 ${styles['change-status']} change-status`}
          wrapperClass="change-status-wrap"
          tooltip={t('Edit')}
          x="left"
          y="below"
        >
          <>
            <i>{translateStatus(status)}</i>
            <form
              className={styles['change-status-form']}
              onSubmit={e => {
                e.preventDefault()
                updateStatus(statuses.indexOf(status), newStatus)
              }}
            >
              <div className="input-wrap">
                <label htmlFor={`${sanitize(status)}-status`}>
                  <input
                    type="text"
                    required
                    id={`${sanitize(status)}-status`}
                    value={newStatus}
                    onChange={e => handleStatusNameChange(e)}
                  />
                  <span>{t('Change')}:</span>
                </label>
              </div>
              <button type="submit" disabled={sending}>
                {t('Change')}
              </button>
              <button
                type="button"
                className="danger delete"
                onClick={() => {
                  void deleteStatus(status)
                }}
              >
                {t('Delete')}
              </button>
            </form>
          </>
        </Accordion>
      </span>
      <ul
        aria-labelledby={`label-${sanitize(status)}`}
        role="listbox"
        id={sanitize(status)}
        className={sanitize(status)}
        onDrop={e => void handleDrop(e)}
        onDragOver={handleDragOver}
      >
        {itemsByStatus?.map((item, index) => (
          <CardSingle
            id={item.id}
            index={index}
            data={item}
            status={status}
            statuses={statuses}
            key={`${sanitize(status)}-item-${item.id}-${index}`}
            handleDragging={handleDragging}
            handleUpdate={handleUpdate}
            handleRemoveColor={handleRemoveColor}
            setTheTarget={setTheTarget}
            focusedCard={focusedCard}
            setFocusedCard={setFocusedCard}
            translateStatus={translateStatus}
          />
        ))}
      </ul>
    </div>
  )
}

export default CardsContainer
