import { useState } from 'react'
import { Data, Status } from '../interfaces'
import CardSingle from './CardSingle'
import { useTheme } from '../../../hooks/useTheme'
import styles from '../dragAndDrop.module.css'
import { ELanguages } from '../../../interfaces'
import { EBad, EGood, ENeutral } from '../../../interfaces/draganddrop'

interface Props {
  language: ELanguages
  itemsByStatus: Data[]
  status: Status
  isDragging: boolean
  handleUpdate: (id: number, status: Status, target?: number) => void
  handleDragging: (dragging: boolean) => void
}

export const CardsContainer = ({
  language,
  status,
  isDragging,
  handleDragging,
  handleUpdate,
  itemsByStatus,
}: Props) => {
  const lightTheme = useTheme()

  const [theTarget, setTheTarget] = useState<number>(0)

  const getTarget = (status: Status, target: number) => {
    setTheTarget(target)
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
      <span id={`label-${status}`}>
        {(() => {
          switch (status) {
            case 'good':
              return `${EGood[language]}?`
            case 'bad':
              return `${EBad[language]}?`
            case 'neutral':
              return `${ENeutral[language]}?`
            default:
              return status
          }
        })()}
      </span>
      <ul
        aria-labelledby={`label-${status}`}
        id={status}
        className={styles[status]}
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
            key={`${status}item${item.id}-${Date.now()}`}
            handleDragging={handleDragging}
            handleUpdate={handleUpdate}
            getTarget={getTarget}
          />
        ))}
      </ul>
    </div>
  )
}
