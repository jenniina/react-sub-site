import {
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  FormEvent as ReactFormEvent,
  SetStateAction as ReactSetStateAction,
  Dispatch as ReactDispatch,
  FC,
  ChangeEvent as ReactChangeEvent,
  useCallback,
} from 'react'
import { createPortal } from 'react-dom'
import { Select, SelectOption } from '../../Select/Select'
import styles from '../css/todo.module.css'
import stylesModal from '../../Modal/modal.module.css'
import { TbCancel } from 'react-icons/tb'
import { sanitize, first3Words, getRandomString } from '../../../utils'
import { TCategory, TPriority } from '../types'
import { ITaskDraggable } from './TodoList'
import { FaRegCheckCircle } from 'react-icons/fa'
import { useTheme } from '../../../hooks/useTheme'
import { useLanguageContext } from '../../../contexts/LanguageContext'

const randomString = getRandomString(6)

interface TodoItemModalProps {
  todo: ITaskDraggable | undefined
  priorityOptions: SelectOption[]
  categoryOptions: SelectOption[]
  handleModify: (e: ReactFormEvent<HTMLFormElement>) => void
  sending: boolean
  showDeadline: boolean
  setShowDeadline: ReactDispatch<ReactSetStateAction<boolean>>
  newCategory: TCategory
  newPriority: TPriority
  setNewPriority: ReactDispatch<ReactSetStateAction<TPriority>>
  setNewCategory: ReactDispatch<ReactSetStateAction<TCategory>>
  setIsOpen: ReactDispatch<ReactSetStateAction<boolean>>
  title: string | undefined
  newName: string
  setNewName: ReactDispatch<ReactSetStateAction<string>>
  newDay: string
  setNewDay: ReactDispatch<ReactSetStateAction<string>>
  newMonth: string
  setNewMonth: ReactDispatch<ReactSetStateAction<string>>
  newYear: string
  setNewYear: ReactDispatch<ReactSetStateAction<string>>
  maxCharacters: number
}

const TodoItemModal: FC<TodoItemModalProps> = ({
  todo,
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
  const { t, language } = useLanguageContext()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: ReactChangeEvent<HTMLTextAreaElement>) => {
    setNewName(e.target.value)
  }

  const handleDayChange = (value: string) => {
    if (Number(value) <= 31 && value.length <= 2) {
      setNewDay(value)
      setErrorMessage(null)
    } else {
      setErrorMessage(`${t('Set')}: ${t('Day')}`)
    }
  }

  const handleMonthChange = (value: string) => {
    if (Number(value) <= 12 && value.length <= 2) {
      setNewMonth(value)
      setErrorMessage(null)
    } else {
      setErrorMessage(`${t('Set')}: ${t('Month')}`)
    }
  }

  const handleYearChange = (e: ReactChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (
      Number(value) <= Number(new Date().getFullYear()) + 10 &&
      value.length <= 4
    ) {
      setNewYear(value)
      setErrorMessage(null)
    } else {
      setErrorMessage(t('YearMustBeBetweenCurrentYearAnd10YearsFromNow'))
    }
  }

  useEffect(() => {
    if (newDay && newMonth && newYear) {
      const timer = window.setTimeout(() => {
        const selectedDate = new Date(
          Number(newYear),
          Number(newMonth) - 1,
          Number(newDay)
        )
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        setErrorMessage(null)
        if (selectedDate < today) {
          setErrorMessage(t('TheDateIsInThePast'))
        }
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [newDay, newMonth, newYear, language, t])

  useEffect(() => {
    if (showDeadline) {
      if (!newDay)
        setNewDay((new Date().getDate() + 1).toString().padStart(2, '0'))
      if (!newMonth)
        setNewMonth((new Date().getMonth() + 1).toString().padStart(2, '0'))
      if (!newYear) setNewYear(new Date().getFullYear().toString())
    } else {
      setNewDay('')
      setNewMonth('')
      setNewYear('')
    }
  }, [
    showDeadline,
    newDay,
    newMonth,
    newYear,
    setNewDay,
    setNewMonth,
    setNewYear,
  ])

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  const handleOutsideClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (closeRef.current && !closeRef.current.contains(e.target as Node)) {
      handleClose()
    }
  }

  const handleClose = useCallback(
    () => {
      setIsOpen(false)
      if (previouslyFocusedElement.current)
        previouslyFocusedElement.current.focus()
      else document?.body.focus()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    previouslyFocusedElement.current = document?.activeElement as HTMLElement

    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements =
          closeButtonRef.current?.parentElement?.querySelectorAll(
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
          if (document?.activeElement === firstElement) {
            e.preventDefault()
            lastElement?.focus()
          }
        } else {
          // Tab
          if (document?.activeElement === lastElement) {
            e.preventDefault()
            firstElement?.focus()
          }
        }
      } else if (e.key === 'Escape') {
        handleClose()
      }
    }

    document?.addEventListener('keydown', handleKeyDown)

    return () => {
      document?.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocusedElement.current)
        previouslyFocusedElement.current.focus()
      else document?.body.focus()
    }
  }, [closeButtonRef, handleClose])

  const lightTheme = useTheme()

  if (typeof document === 'undefined') return null
  let modalRoot = document.getElementById('modal-root')
  if (!modalRoot && typeof document !== 'undefined') {
    modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
  }

  const modalContent = (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`${stylesModal['modal-overlay']} ${
        lightTheme ? styles.light : ''
      }`}
      ref={closeRef}
      onClick={e => {
        handleOutsideClick(e)
      }}
      onKeyDown={e => {
        if (e.key === 'Escape') handleClose()
      }}
    >
      <div
        className={`${stylesModal['modal-content']} ${styles['todo-modal']}`}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Task'}
      >
        <button
          ref={closeButtonRef}
          className={`${stylesModal['close-button']} tooltip-wrap`}
          onClick={handleClose}
        >
          <span aria-hidden="true">&times;</span>
          <span className="scr">{t('Close')}</span>
          <span aria-hidden="true" className="tooltip below left narrow2">
            {t('Close')}
          </span>
        </button>
        <h2>{t('Edit')}</h2>
        <form onSubmit={handleModify} className={`${styles.modify}`}>
          <Select
            id={`category_${sanitize(
              first3Words(todo?.name ?? randomString, language)
            )}`}
            className={`${styles.select} ${styles['category-select']}`}
            value={categoryOptions?.find(o => o.value === newCategory)}
            onChange={o => setNewCategory(o?.value as TCategory)}
            options={categoryOptions}
            instructions={t('SelectCategory')}
            language={language}
            hideDelete
            z={3}
          />
          <Select
            id={`priority_${sanitize(
              first3Words(todo?.name ?? randomString, language)
            )}`}
            className={`${styles.select}`}
            value={priorityOptions?.find(o => o.value === newPriority)}
            onChange={o => setNewPriority(o?.value as TPriority)}
            options={priorityOptions}
            instructions={t('Priority')}
            language={language}
            hideDelete
            z={2}
          />
          <fieldset className={`${styles.fieldset} ${styles['deadline-wrap']}`}>
            <legend>
              <label>
                {t('Deadline')}{' '}
                <input
                  style={{ marginLeft: '0.5em' }}
                  type="checkbox"
                  checked={showDeadline}
                  onChange={() => setShowDeadline(!showDeadline)}
                />
              </label>
            </legend>
            {showDeadline && (
              <>
                <div className={styles['deadline-inputs']}>
                  <div className={styles.input}>
                    <label
                      className="scr"
                      htmlFor={`day_${sanitize(
                        first3Words(todo?.name ?? t('Task'), language)
                      )}`}
                    >
                      {t('Day')}
                    </label>
                    <input
                      type="number"
                      id={`day_${sanitize(todo?.name ?? 'Task')}`}
                      name="day"
                      min={1}
                      max={31}
                      value={newDay}
                      placeholder="DD"
                      onChange={e => handleDayChange(e.target.value)}
                      required
                      className="bg"
                    />
                  </div>

                  <div className={styles.input}>
                    <label
                      className="scr"
                      htmlFor={`month_${sanitize(todo?.name ?? 'Task')}`}
                    >
                      {t('Month')}
                    </label>
                    <input
                      type="number"
                      id={`month_${sanitize(
                        first3Words(todo?.name ?? t('Task'), language)
                      )}`}
                      name="month"
                      min={1}
                      max={12}
                      value={newMonth}
                      placeholder="MM"
                      onChange={e => handleMonthChange(e.target.value)}
                      required
                      className="bg"
                    />
                  </div>

                  <div className={styles.input}>
                    <label
                      className="scr"
                      htmlFor={`year_${sanitize(todo?.name ?? 'Task')}`}
                    >
                      {t('Year')}
                    </label>
                    <input
                      type="number"
                      id={`year_${sanitize(
                        first3Words(todo?.name ?? t('Task'), language)
                      )}`}
                      name="year"
                      min={new Date().getFullYear()}
                      max={new Date().getFullYear() + 10}
                      value={newYear}
                      placeholder="YYYY"
                      onChange={e => handleYearChange(e)}
                      required
                      className="bg"
                    />
                  </div>
                </div>{' '}
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              </>
            )}
          </fieldset>
          <fieldset className={`${styles.fieldset} ${styles.textarea}`}>
            <legend>{t('Task')}</legend>
            <label>
              <textarea
                id={`task_${sanitize(todo?.name)}`}
                required
                name="task"
                rows={4}
                value={newName}
                onChange={handleChange}
              />
              <p className={styles.small}>
                {maxCharacters - newName.length} {t('CharactersLeft')} (
                {t('Max')}: {maxCharacters}){' '}
                {newName.length > maxCharacters && (
                  <span className={styles.warning}>{t('NameTooLong')}</span>
                )}
              </p>
              <span className="scr">
                {t('Edit')} {first3Words(todo?.name ?? t('Task'), language)}
              </span>
            </label>
          </fieldset>
          <button type="submit" disabled={sending} className="modify">
            {t('Confirm')} <FaRegCheckCircle />
          </button>
          <button
            onClick={handleClose}
            className={`reset ${styles.cancel}`}
            type="button"
          >
            {t('Cancel')} <TbCancel />
          </button>
        </form>
      </div>
    </div>
  )

  if (modalRoot) return createPortal(modalContent, modalRoot)
  // If there is no portal root, render inline as a fallback
  return modalContent
}

export default TodoItemModal
