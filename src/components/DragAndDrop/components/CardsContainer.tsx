import { useState } from 'react'
import { Data, Status } from '../interfaces'
import CardSingle from './CardSingle'
import styles from '../dragAndDrop.module.css'
import {
  EChange,
  EChangeCategoryTitle,
  ELanguages,
  ERenameTitle,
  ESpecialCharactersOrSpaceNotAllowed,
  ESubmit,
} from '../../../interfaces'
import { EBad, EGood, ENeutral } from '../../../interfaces/draganddrop'
import Accordion from '../../Accordion/Accordion'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

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
}: Props) => {
  const dispatch = useAppDispatch()

  const [theTarget, setTheTarget] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<Status>('')

  const regex = /^[\w\u00C0-\u024F\u1E00-\u1EFF-_]*$/

  const handleStatusNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (regex.test(value)) {
      setNewStatus(value)
    } else {
      dispatch(notify(ESpecialCharactersOrSpaceNotAllowed[language], true, 6))
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
    handleUpdate(+e.dataTransfer.getData('text'), status, theTarget)
    handleDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLUListElement>) => e.preventDefault()

  return (
    <div
      className={`${styles['cards-container']} ${
        isDragging ? styles['area-dragging'] : ''
      } ${lightTheme ? styles['light'] : ''}`}
    >
      <span id={`label-${sanitize(status)}`}>
        {(() => {
          const statusLowerCase = status.toLowerCase()
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
        <Accordion
          isOpen={isOpen}
          setIsFormOpen={setIsOpen}
          language={language}
          text={`*`}
          hideBrackets
          className={`${styles['change-status']} change-status`}
          tooltip={ERenameTitle[language]}
          x='left'
          y='below'
        >
          <form
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
          />
        ))}
      </ul>
    </div>
  )
}
