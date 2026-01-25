import React, { useRef, useState } from 'react'
import { Data, IContainerColors, Status } from '../types'
import CardSingle from './CardSingle'
import { determineBackgroundLightness, sanitize } from '../../../utils'
import styles from '../dragAndDrop.module.css'
import Accordion from '../../Accordion/Accordion'
import { notify } from '../../../reducers/notificationReducer'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { HiMenu } from 'react-icons/hi'

interface DragData {
  type: 'item' | 'span'
  id: string
}

interface Props {
  itemsByStatus: Data[]
  setData: React.Dispatch<React.SetStateAction<Data[]>>
  status: Status
  statuses: Status[]
  statusesColors: IContainerColors[]
  setStatusesColors: React.Dispatch<React.SetStateAction<IContainerColors[]>>
  defaultTopColor: string
  defaultBodyColor: string
  translateStatus: (status: string) => string
  isDragging: boolean
  handleUpdate: (id: number, status: Status, target?: number) => void
  handleRemoveColor: (data: Data) => Promise<void>
  handleDragging: (dragging: boolean) => void
  lightTheme: boolean
  updateStatus: (index: number, status: Status) => void
  reorderStatuses: (dragIndex: number, dropIndex: number) => void
  deleteStatus: (status: string) => Promise<void>
  regex: RegExp
}

const CardsContainer = ({
  setData,
  status,
  statuses,
  statusesColors,
  setStatusesColors,
  defaultTopColor,
  defaultBodyColor,
  translateStatus,
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

  const statusColorConfig = statusesColors.find((sc) => sc.name === status)

  const topStyle = statusColorConfig
    ? {
        ['--status-bg-name' as string]: statusColorConfig.top,
        backgroundColor: statusColorConfig.top,
        color: statusColorConfig.lightness === 'dark' ? 'white' : 'black',
      }
    : {}

  const bodyStyle = statusColorConfig
    ? {
        ['--status-bg' as string]: statusColorConfig.body,
        backgroundColor: statusColorConfig.body,
      }
    : {}

  return (
    <div
      className={`${styles['cards-container']} ${
        isDragging ? styles['area-dragging'] : ''
      } ${lightTheme ? styles.light : ''}`}
      onDrop={(e) => void handleContainerDrop(e, statuses.indexOf(status))}
      onDragEnd={() => handleDragging(false)}
      style={bodyStyle}
    >
      <span
        // this is the top bar needing a color based on statusesColors
        ref={outsideClickRef}
        id={`label-${sanitize(status)}`}
        className={styles['status-label']}
        draggable
        onDragStart={(e) =>
          handleContainerDragStart(e, statuses.indexOf(status))
        }
        onDragOver={handleContainerDragOver}
        style={topStyle}
      >
        <b>{translateStatus(status)}</b>
        <Accordion
          isOpen={isOpen}
          setIsFormOpen={setIsOpen}
          text={<HiMenu />}
          hideBrackets
          onClick={() => setNewStatus(status)}
          className={`narrow2 ${styles['change-status']} change-status`}
          wrapperClass={`${styles['change-status-wrap']} ${isOpen ? styles.open : ''} change-status-wrap`}
          tooltip={t('Edit')}
          x="left"
          y="below"
        >
          <>
            <i>{translateStatus(status)}</i>
            <form
              className={styles['change-status-form']}
              onSubmit={(e) => {
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
                    onChange={(e) => handleStatusNameChange(e)}
                  />
                  <span>{t('Change')}:</span>
                </label>
              </div>
              <button type="submit" disabled={sending}>
                {t('Change')}
              </button>
              <div className={`mt1 ${styles['edit-color-wrap']}`}>
                <div className={styles['color-picker']}>
                  <label
                    htmlFor={`${sanitize(status)}-top-color-picker`}
                    aria-label={`${t('ColorPicker')} (${t('Name')})`}
                  >
                    <span>
                      <b>{t('ColorPicker')}</b> <i>({t('Name')}):</i>
                    </span>
                  </label>
                  <input
                    type="color"
                    id={`${sanitize(status)}-top-color-picker`}
                    name={`${sanitize(status)}-top-color-picker`}
                    className={styles['color-picker-input']}
                    defaultValue={
                      statusColorConfig
                        ? statusColorConfig.top
                        : defaultTopColor
                    }
                    onChange={(e) => {
                      const newTopColor = e.target.value
                      setStatusesColors((prevColors) =>
                        prevColors.map((colorConfig) =>
                          colorConfig.name === status
                            ? {
                                ...colorConfig,
                                top: newTopColor,
                                lightness:
                                  determineBackgroundLightness(newTopColor),
                              }
                            : colorConfig
                        )
                      )
                    }}
                  />
                </div>
                <div className={styles['color-picker']}>
                  <label htmlFor={`${sanitize(status)}-body-color-picker`}>
                    <span>
                      <b>{t('ColorPicker')}</b> <i>({t('Content')}):</i>{' '}
                    </span>
                  </label>
                  <input
                    type="color"
                    id={`${sanitize(status)}-body-color-picker`}
                    name={`${sanitize(status)}-body-color-picker`}
                    className={styles['color-picker-input']}
                    defaultValue={
                      statusColorConfig
                        ? statusColorConfig.body
                        : defaultBodyColor
                    }
                    onChange={(e) => {
                      const newBodyColor = e.target.value
                      setStatusesColors((prevColors) =>
                        prevColors.map((colorConfig) =>
                          colorConfig.name === status
                            ? { ...colorConfig, body: newBodyColor }
                            : colorConfig
                        )
                      )
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                className="danger delete outline"
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
        // this is the body needing a color based on statusesColors
        aria-labelledby={`label-${sanitize(status)}`}
        role="listbox"
        id={sanitize(status)}
        className={sanitize(status)}
        onDrop={(e) => void handleDrop(e)}
        onDragOver={handleDragOver}
        style={bodyStyle}
      >
        {itemsByStatus?.map((item, index) => (
          <CardSingle
            id={item.id}
            index={index}
            data={item}
            setData={setData}
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
