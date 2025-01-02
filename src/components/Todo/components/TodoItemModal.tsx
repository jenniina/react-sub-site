import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Select, SelectOption } from '../../Select/Select'
import styles from '../css/todo.module.css'
import stylesModal from '../../Modal/modal.module.css'
import { TbCancel } from 'react-icons/tb'
import { sanitize, first3Words, getRandomString } from '../../../utils'
import {
  ECancel,
  ECharactersLeft,
  EClose,
  EConfirm,
  EDay,
  EEdit,
  ELanguages,
  EMax,
  EMonth,
  ENameTooLong,
  ESet,
  EYear,
  EYearMustBeBetweenCurrentYearAnd10YearsFromNow,
} from '../../../types'
import {
  ECategory,
  ETask,
  EDeadline,
  EPriority,
  TCategory,
  TPriority,
  ETheDateIsInThePast,
} from '../types'
import { ESelectCategory } from '../../Jokes/types'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { FaRegCheckCircle } from 'react-icons/fa'
import { useTheme } from '../../../hooks/useTheme'

const randomString = getRandomString(6)

interface TodoItemModalProps {
  todo: any
  language: ELanguages
  priorityOptions: SelectOption[]
  categoryOptions: SelectOption[]
  handleModify: (e: React.FormEvent<HTMLFormElement>) => void
  sending: boolean
  showDeadline: boolean
  setShowDeadline: React.Dispatch<React.SetStateAction<boolean>>
  newCategory: TCategory
  newPriority: TPriority
  setNewPriority: React.Dispatch<React.SetStateAction<TPriority>>
  setNewCategory: React.Dispatch<React.SetStateAction<TCategory>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string | undefined
  newName: string
  setNewName: React.Dispatch<React.SetStateAction<string>>
  newDay: string
  setNewDay: React.Dispatch<React.SetStateAction<string>>
  newMonth: string
  setNewMonth: React.Dispatch<React.SetStateAction<string>>
  newYear: string
  setNewYear: React.Dispatch<React.SetStateAction<string>>
  maxCharacters: number
}

const TodoItemModal: React.FC<TodoItemModalProps> = ({
  todo,
  language,
  priorityOptions,
  categoryOptions,
  handleModify,
  sending,
  newCategory,
  newPriority,
  setNewPriority,
  setNewCategory,
  showDeadline,
  setShowDeadline,
  title,
  newName,
  setNewName,
  newDay,
  setNewDay,
  newMonth,
  setNewMonth,
  newYear,
  setNewYear,
  setIsOpen,
  maxCharacters,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewName(e.target.value)
  }

  const handleDayChange = (value: string) => {
    if (Number(value) <= 31 && value.length <= 2) {
      setNewDay(value)
      setErrorMessage(null)
    } else {
      setErrorMessage(`${ESet[language]}: ${EDay[language]}`)
    }
  }

  const handleMonthChange = (value: string) => {
    if (Number(value) <= 12 && value.length <= 2) {
      setNewMonth(value)
      setErrorMessage(null)
    } else {
      setErrorMessage(`${ESet[language]}: ${EMonth[language]}`)
    }
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (Number(value) <= Number(new Date().getFullYear()) + 10 && value.length <= 4) {
      setNewYear(value)
      setErrorMessage(null)
    } else {
      setErrorMessage(EYearMustBeBetweenCurrentYearAnd10YearsFromNow[language])
    }
  }

  useEffect(() => {
    if (newDay && newMonth && newYear) {
      const selectedDate = new Date(Number(newYear), Number(newMonth) - 1, Number(newDay))
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      setErrorMessage(null)
      if (selectedDate < today) {
        setErrorMessage(ETheDateIsInThePast[language])
      }
    }
  }, [newDay, newMonth, newYear, language])

  useEffect(() => {
    if (showDeadline) {
      if (!newDay) setNewDay((new Date().getDate() + 1).toString().padStart(2, '0'))
      if (!newMonth) setNewMonth((new Date().getMonth() + 1).toString().padStart(2, '0'))
      if (!newYear) setNewYear(new Date().getFullYear().toString())
    } else {
      setNewDay('')
      setNewMonth('')
      setNewYear('')
    }
  }, [showDeadline])

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    previouslyFocusedElement.current = document.activeElement as HTMLElement

    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = closeButtonRef.current?.parentElement?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusableElements || focusableElements.length === 0) {
          e.preventDefault()
          return
        }
        const firstElement = focusableElements?.[0] as HTMLElement
        const lastElement = focusableElements?.[
          focusableElements.length - 1
        ] as HTMLElement

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      } else if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocusedElement.current) previouslyFocusedElement.current.focus()
      else document.body.focus()
    }
  }, [closeButtonRef.current])

  const handleClose = () => {
    setIsOpen(false)
    if (previouslyFocusedElement.current) previouslyFocusedElement.current.focus()
    else document.body.focus()
  }

  const lightTheme = useTheme()

  return ReactDOM.createPortal(
    <div
      className={`${stylesModal['modal-overlay']} ${lightTheme ? styles.light : ''}`}
      onClick={handleClose}
    >
      <div
        className={`${stylesModal['modal-content']} ${styles['todo-modal']}`}
        onClick={(e) => e.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-label={title ?? 'Task'}
      >
        <button
          ref={closeButtonRef}
          className={`${stylesModal['close-button']} tooltip-wrap`}
          onClick={handleClose}
        >
          <span aria-hidden='true'>&times;</span>
          <span className='scr'>{EClose[language]}</span>
          <span aria-hidden='true' className='tooltip below left narrow2'>
            {EClose[language]}
          </span>
        </button>
        <h2>{EEdit[language]}</h2>
        <form onSubmit={handleModify} className={`${styles.modify}`}>
          <Select
            id={`category_${sanitize(first3Words(todo?.name ?? randomString, language))}`}
            className={`${styles.select} ${styles['category-select']}`}
            value={categoryOptions?.find((o) => o.value === newCategory)}
            onChange={(o) => setNewCategory(o?.value as TCategory)}
            options={categoryOptions}
            instructions={ESelectCategory[language]}
            language={language}
            hideDelete
            z={3}
          />
          <Select
            id={`priority_${sanitize(first3Words(todo?.name ?? randomString, language))}`}
            className={`${styles.select}`}
            value={priorityOptions?.find((o) => o.value === newPriority)}
            onChange={(o) => setNewPriority(o?.value as TPriority)}
            options={priorityOptions}
            instructions={EPriority[language]}
            language={language}
            hideDelete
            z={2}
          />
          <fieldset className={`${styles['fieldset']} ${styles['deadline-wrap']}`}>
            <legend>
              <label>
                {EDeadline[language]}{' '}
                <input
                  style={{ marginLeft: '0.5em' }}
                  type='checkbox'
                  checked={showDeadline}
                  onChange={() => setShowDeadline(!showDeadline)}
                />
              </label>
            </legend>
            {showDeadline && (
              <>
                <div className={styles['deadline-inputs']}>
                  <div className={styles['input']}>
                    <label
                      className='scr'
                      htmlFor={`day_${sanitize(
                        first3Words(todo?.name ?? ETask[language], language)
                      )}`}
                    >
                      {EDay[language]}
                    </label>
                    <input
                      type='number'
                      id={`day_${sanitize(todo?.name || 'Task')}`}
                      name='day'
                      min={1}
                      max={31}
                      value={newDay}
                      placeholder='DD'
                      onChange={(e) => handleDayChange(e.target.value)}
                      required
                      className='bg'
                    />
                  </div>

                  <div className={styles['input']}>
                    <label
                      className='scr'
                      htmlFor={`month_${sanitize(todo?.name || 'Task')}`}
                    >
                      {EMonth[language]}
                    </label>
                    <input
                      type='number'
                      id={`month_${sanitize(
                        first3Words(todo?.name ?? ETask[language], language)
                      )}`}
                      name='month'
                      min={1}
                      max={12}
                      value={newMonth}
                      placeholder='MM'
                      onChange={(e) => handleMonthChange(e.target.value)}
                      required
                      className='bg'
                    />
                  </div>

                  <div className={styles['input']}>
                    <label
                      className='scr'
                      htmlFor={`year_${sanitize(todo?.name || 'Task')}`}
                    >
                      {EYear[language]}
                    </label>
                    <input
                      type='number'
                      id={`year_${sanitize(
                        first3Words(todo?.name ?? ETask[language], language)
                      )}`}
                      name='year'
                      min={new Date().getFullYear()}
                      max={new Date().getFullYear() + 10}
                      value={newYear}
                      placeholder='YYYY'
                      onChange={(e) => handleYearChange(e)}
                      required
                      className='bg'
                    />
                  </div>
                </div>{' '}
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              </>
            )}
          </fieldset>
          <fieldset className={`${styles['fieldset']} ${styles.textarea}`}>
            <legend>{ETask[language]}</legend>
            <label>
              <textarea
                id={`task_${sanitize(todo?.name)}`}
                required
                name='task'
                rows={4}
                value={newName}
                onChange={handleChange}
              />
              <p className={styles.small}>
                {maxCharacters - newName.length} {ECharactersLeft[language]} (
                {EMax[language]}: {maxCharacters}){' '}
                {newName.length > maxCharacters && (
                  <span className={styles.warning}>{ENameTooLong[language]}</span>
                )}
              </p>
              <span className='scr'>
                {EEdit[language]} {first3Words(todo?.name ?? ETask[language], language)}
              </span>
            </label>
          </fieldset>
          <button type='submit' disabled={sending} className='modify'>
            {EConfirm[language]} <FaRegCheckCircle />
          </button>
          <button
            onClick={handleClose}
            className={`reset ${styles['cancel']}`}
            type='button'
          >
            {ECancel[language]} <TbCancel />
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  )
}

export default TodoItemModal
