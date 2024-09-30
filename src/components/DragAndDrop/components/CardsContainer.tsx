import { useRef, useState } from 'react'
import { Data, Status } from '../interfaces'
import CardSingle from './CardSingle'
import styles from '../dragAndDrop.module.css'
import {
  EChange,
  EDelete,
  EEdit,
  ELanguages,
  ESpecialCharactersOrSpaceNotAllowed,
  ESubmit,
} from '../../../interfaces'
import { EBad, EGood, ENeutral } from '../../../interfaces/draganddrop'
import Accordion from '../../Accordion/Accordion'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

interface Props {
  language: ELanguages
  itemsByStatus: Data[]
  status: Status
  statuses: Status[]
  isDragging: boolean
  handleUpdate: (id: number, status: Status, target?: number) => void
  handleRemoveColor: (color: Data['content']) => void
  handleDragging: (dragging: boolean) => void
  lightTheme: boolean
  sanitize: (str: string) => string
  updateStatus: (index: number, status: Status) => void
  reorderStatuses: (dragIndex: number, dropIndex: number) => void
  deleteStatus: (status: string) => void
}

export const CardsContainer = ({
  language,
  status,
  statuses,
  isDragging,
  handleDragging,
  handleUpdate,
  handleRemoveColor,
  itemsByStatus,
  lightTheme,
  sanitize,
  updateStatus,
  reorderStatuses,
  deleteStatus,
}: Props) => {
  const dispatch = useAppDispatch()

  const [theTarget, setTheTarget] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<Status>('')
  const [focusedCard, setFocusedCard] = useState<number | null>(null)
  const outsideClickRef = useRef<HTMLSpanElement>(null)
  const regex = /^[\w\u00C0-\u024F\u1E00-\u1EFF-_]*$/

  const handleStatusNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (regex.test(value)) {
      setNewStatus(value)
    } else {
      dispatch(notify(ESpecialCharactersOrSpaceNotAllowed[language], true, 6))
    }
  }

  useOutsideClick({
    ref: outsideClickRef,
    onOutsideClick: () => setIsOpen(false),
  })

  const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
    const data = JSON.parse(e.dataTransfer.getData('text/plain'))

    if (data.type === 'item') {
      handleUpdate(data.id, status, theTarget)
      handleDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLUListElement>) => e.preventDefault()

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
    const data = JSON.parse(e.dataTransfer.getData('text/plain'))
    if (data.type === 'span') {
      const dragIndex = data.id

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

  return (
    <div
      className={`${styles['cards-container']} ${
        isDragging ? styles['area-dragging'] : ''
      } ${lightTheme ? styles['light'] : ''}`}
      onDrop={(e) => handleContainerDrop(e, statuses.indexOf(status))}
      onDragEnd={() => handleDragging(false)}
    >
      <span
        ref={outsideClickRef}
        id={`label-${sanitize(status)}`}
        className={styles['status-label']}
        draggable
        onDragStart={(e) => handleContainerDragStart(e, statuses.indexOf(status))}
        onDragOver={handleContainerDragOver}
      >
        <b>
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
                return status
            }
          })()}
        </b>
        <Accordion
          isOpen={isOpen}
          setIsFormOpen={setIsOpen}
          language={language}
          text={`*`}
          hideBrackets
          className={`narrow2 ${styles['change-status']} change-status`}
          tooltip={EEdit[language]}
          x='left'
          y='below'
        >
          <form
            className={styles['change-status-form']}
            onSubmit={(e) => {
              e.preventDefault()
              updateStatus(statuses.indexOf(status), newStatus)
            }}
          >
            <div className='input-wrap'>
              <label htmlFor={`${sanitize(status)}-status`}>
                <input
                  type='text'
                  required
                  id={`${sanitize(status)}-status`}
                  value={newStatus}
                  onChange={(e) => handleStatusNameChange(e)}
                />
                <span>{EChange[language]}</span>
              </label>
            </div>
            <button type='submit'>{ESubmit[language]}</button>
            <button
              type='button'
              className='danger delete'
              onClick={() => {
                deleteStatus(status)
              }}
            >
              {EDelete[language]}
            </button>
          </form>
        </Accordion>
      </span>
      <ul
        aria-labelledby={`label-${sanitize(status)}`}
        id={sanitize(status)}
        className={sanitize(status)}
        role={'list'}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {itemsByStatus?.map((item, index) => (
          <CardSingle
            language={language}
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
            sanitize={sanitize}
            focusedCard={focusedCard}
            setFocusedCard={setFocusedCard}
          />
        ))}
      </ul>
    </div>
  )
}
