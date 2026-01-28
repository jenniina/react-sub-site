import React, { useEffect, useState, useRef, useCallback } from 'react'
import styles from '../css/todo.module.css'
import { ITaskDraggable } from './TodoList'
import { TCategory, TPriority } from '../types'
import Icon from '../../Icon/Icon'
import { sanitize } from '../../../utils'
import { SelectOption } from '../../Select/Select'
import TodoItemModal from './TodoItemModal'
// icons: IoPersonCircleSharp, HiDots*, TiShoppingCart, AiOutlineEdit, BsArrowDown
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { notify } from '../../../reducers/notificationReducer'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { useConfirm } from '../../../contexts/ConfirmContext'
import { useIsClient, useWindow } from '../../../hooks/useSSR'
import ButtonToggle from '../../ButtonToggle/ButtonToggle'
import { useOutsideClick } from '../../../hooks/useOutsideClick'
import CopyToClipboard from '../../CopyToClipboard/CopyToClipboard'

export default function Todo({
  todo,
  toggleTodo,
  deleteTodo,
  modifyTodo,
  modifyTodoOrder,
  handleUpdate,
  todosWithIdAndStatus,
  isDragging,
  handleDragging,
  sending,
  priorityOptions,
  categoryOptions,
  zin,
  maxCharacters,
}: {
  todo: ITaskDraggable | undefined
  toggleTodo: (key: string | undefined) => void
  deleteTodo: (key: string | undefined) => void
  modifyTodo: (
    key: string | undefined,
    name: string | undefined,
    priority: TPriority,
    deadline: string,
    category: string
  ) => void
  modifyTodoOrder: (
    order: { key: ITaskDraggable['key']; order: ITaskDraggable['order'] }[]
  ) => void
  handleUpdate: (
    order: number,
    status: string,
    newTargetIndex?: number
  ) => ITaskDraggable[] | undefined
  todosWithIdAndStatus: ITaskDraggable[]
  isDragging: boolean
  handleDragging: (dragging: boolean) => void
  sending: boolean
  priorityOptions: SelectOption[]
  categoryOptions: SelectOption[]
  zin: number
  maxCharacters: number
}) {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t, language } = useLanguageContext()
  const confirm = useConfirm()

  const dispatch = useAppDispatch()
  const [newName, setNewName] = useState(todo?.name ?? '')
  const [showDeadline, setShowDeadline] = useState(false)
  const [newPriority, setNewPriority] = useState<TPriority>(
    todo?.priority ?? 'low'
  )
  const [newDay, setNewDay] = useState<string>(
    todo?.deadline
      ? new Date(todo.deadline).getDate().toString().padStart(2, '0')
      : ''
  )
  const [newMonth, setNewMonth] = useState<string>(
    todo?.deadline
      ? (new Date(todo.deadline).getMonth() + 1).toString().padStart(2, '0')
      : ''
  )
  const [newYear, setNewYear] = useState<string>(
    todo?.deadline ? new Date(todo.deadline).getFullYear().toString() : ''
  )
  const combinedDeadline =
    newDay && newMonth && newYear ? `${newYear}-${newMonth}-${newDay}` : ''

  const [newCategory, setNewCategory] = useState<TCategory>(
    todo?.category ?? 'other'
  )
  const [isOpen, setIsOpen] = useState(false)
  const [showMoveMenu, setShowMoveMenu] = useState(false)

  const moveMenuRef = useRef<HTMLDivElement>(null)

  useOutsideClick({
    ref: moveMenuRef,
    onOutsideClick: () => setShowMoveMenu(false),
  })

  function handleTodoClick() {
    toggleTodo(todo?.key)
  }
  async function handleDelete() {
    if (
      await confirm({
        message: t('AreYouSureYouWantToDelete') + ' "' + todo?.name + '"?',
      })
    ) {
      setNewName('')
      // deleteTodo is a synchronous prop (dispatches actions). Call it and
      // close modal immediately rather than awaiting a non-Promise.
      void deleteTodo(todo?.key)
      setIsOpen(false)
    }
  }
  const handleModify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newName === '') {
      void dispatch(notify(t('AddTask'), true, 5))
      return
    }
    if (newName.length > maxCharacters) {
      void dispatch(notify(t('NameTooLong'), true, 5))
      return
    }
    // modifyTodo is a synchronous prop (dispatches actions). Call it directly
    // instead of awaiting a non-Promise value.
    void modifyTodo(
      todo?.key,
      newName,
      newPriority,
      combinedDeadline,
      newCategory
    )
    setIsOpen(false)
  }

  // input change is handled via controlled props passed to the modal; no local handler needed

  useEffect(() => {
    if (!todo?.deadline) return
    const t = window.setTimeout(() => setShowDeadline(true), 0)
    return () => clearTimeout(t)
  }, [todo?.deadline])

  useEffect(() => {
    // Don't overwrite local edits while the modal is open.
    if (!todo || isOpen) return
    const t = window.setTimeout(() => {
      setNewName(todo?.name ?? '')
      setNewPriority(todo?.priority ?? 'low')
      setNewCategory(todo?.category ?? 'other')
      if (todo?.deadline) {
        const deadlineDate = new Date(todo.deadline)
        setNewDay(deadlineDate.getDate().toString().padStart(2, '0'))
        setNewMonth((deadlineDate.getMonth() + 1).toString().padStart(2, '0'))
        setNewYear(deadlineDate.getFullYear().toString())
      }
    }, 0)
    return () => clearTimeout(t)
  }, [todo, isOpen])

  const [allowDrag, setAllowDrag] = useState(true)
  const completedText = useCallback(
    () => (todo?.complete ? t('MarkIncomplete') : t('MarkCompleted')),
    [todo?.complete, t]
  )

  const handleMouseDown = () => {
    setAllowDrag(true)
  }
  const handleMouseOverHandle = () => {
    setAllowDrag(true)
  }
  const handleMouseOverSpan = () => {
    setAllowDrag(false)
  }
  const handleMouseDownSpan = () => {
    setAllowDrag(false)
  }
  const handleMouseUpSpan = () => {
    if (!isClient || !windowObj) return
    if (windowObj.getSelection()?.toString()) {
      setAllowDrag(false)
    } else {
      setAllowDrag(true)
    }
  }

  const handleMoveUp = () => {
    if (!todo) return
    const currentIndex = todosWithIdAndStatus.findIndex(
      (t) => t.key === todo.key
    )
    if (currentIndex <= 0) return // Can't move up if already at top

    const order = handleUpdate(Number(currentIndex), 'todos', currentIndex - 1)

    if (Array.isArray(order)) {
      const newOrder = order.map((item, index) => ({
        key: item.key,
        order: index,
      }))

      modifyTodoOrder(newOrder)
    }
  }

  const handleMoveDown = () => {
    if (!todo) return
    const currentIndex = todosWithIdAndStatus.findIndex(
      (t) => t.key === todo.key
    )
    if (currentIndex >= todosWithIdAndStatus.length - 1) return // Can't move down if already at bottom

    const order = handleUpdate(Number(currentIndex), 'todos', currentIndex + 1)

    if (Array.isArray(order)) {
      const newOrder = order.map((item, index) => ({
        key: item.key,
        order: index,
      }))

      modifyTodoOrder(newOrder)
    }
  }

  const currentIndex = todosWithIdAndStatus.findIndex(
    (t) => t?.key === todo?.key
  )
  const canMoveUp = currentIndex > 0
  const canMoveDown = currentIndex < todosWithIdAndStatus.length - 1

  return (
    <>
      <li
        style={{ zIndex: `calc(${zin} - ${todo?.order})` }}
        className={`${isDragging ? 'dragging' : ''} ${
          isOpen ? styles.open : styles.closed
        }`}
        draggable={allowDrag}
        onDragStart={(e) => {
          if (allowDrag) {
            e.dataTransfer.setData(
              'application/my-app',
              String(todo?.order ?? '')
            )
            handleDragging(true)
          } else {
            e.preventDefault()
          }
        }}
        onDragEnd={() => handleDragging(false)}
      >
        <div ref={moveMenuRef}>
          <button
            type="button"
            onClick={() => setShowMoveMenu((prev) => !prev)}
            onMouseOver={handleMouseOverHandle}
            onFocus={handleMouseOverHandle}
            onMouseDown={handleMouseDown}
            className={`${styles['drag-handle']} tooltip-wrap`}
            aria-label={t('Draggable')}
            aria-expanded={showMoveMenu}
            aria-haspopup="menu"
          >
            <Icon lib="md" name="MdDragIndicator" />
            <span className="tooltip narrow2 below right">
              {t('Draggable')}
            </span>
          </button>
          {showMoveMenu && (
            <div className={styles['move-menu']} role="menu">
              <button
                type="button"
                onClick={handleMoveUp}
                disabled={!canMoveUp}
                role="menuitem"
                className={`${styles['move-button']} ${styles['move-up']}`}
              >
                <Icon lib="md" name="MdMoveUp" />
                <span>{t('MoveUp')}</span>
              </button>
              <button
                type="button"
                onClick={handleMoveDown}
                disabled={!canMoveDown}
                role="menuitem"
                className={`${styles['move-button']} ${styles['move-down']}`}
              >
                <span>{t('MoveDown')}</span>
                <Icon lib="md" name="MdMoveDown" />
              </button>
              <button
                type="button"
                onClick={() => setShowMoveMenu(false)}
                role="menuitem"
                className={styles['move-button']}
              >
                {t('Close')}
              </button>
            </div>
          )}
        </div>

        <div className={`tooltip-wrap ${styles['toggle-wrap']}`}>
          <ButtonToggle
            equal={true}
            name="complete"
            wrapperClass={styles.toggle}
            onChange={handleTodoClick}
            id={`check_${sanitize(todo?.name)}`}
            isChecked={todo?.complete ?? false}
            label={completedText()}
            on={t('Complete')}
            off={t('Incomplete')}
            hideLabel={true}
            hideOnOff={true}
          />
          <span className="tooltip narrow2 below right">{completedText()}</span>
        </div>

        <div
          className={`${styles.label}`}
          onMouseOver={handleMouseOverSpan}
          onFocus={handleMouseOverSpan}
          onMouseDown={handleMouseDownSpan}
          onMouseUp={handleMouseUpSpan}
        >
          <CopyToClipboard
            className={`${todo?.complete ? styles.complete : ''} ${styles['todo-name']}`}
            value={todo?.name ?? ''}
            label={todo?.name ?? ''}
          />
          <div className={`${styles['more-info-wrap']}`}>
            {todo?.deadline &&
              todo?.deadline !== '' &&
              (() => {
                const deadlineDate = new Date(todo.deadline)
                const today = new Date()

                deadlineDate.setHours(0, 0, 0, 0)
                today.setHours(0, 0, 0, 0)

                const isOverdue = deadlineDate < today
                const isToday = deadlineDate.getTime() === today.getTime()
                const isTomorrow =
                  deadlineDate.getTime() ===
                  new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() + 1
                  ).getTime()

                return (
                  <span
                    className={`${styles.deadline} ${
                      isOverdue ? styles.overdue : ''
                    } ${isToday ? styles.today : isTomorrow ? styles.tomorrow : ''}`}
                  >
                    {t('Deadline')}:{' '}
                    {isToday
                      ? t('Today')
                      : isTomorrow
                        ? t('Tomorrow')
                        : new Date(todo.deadline).toLocaleDateString(language, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                  </span>
                )
              })()}
          </div>
        </div>

        <div className={`${styles['btn-wrap']}`}>
          {todo?.priority === 'high' ? (
            <b className={`tooltip-wrap ${styles.high}`}>
              <Icon lib="fa6" name="FaTriangleExclamation" />
              <span className="scr">
                {t('Priority')}: {t('High')}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t('Priority')}: {t('High')}
              </span>
            </b>
          ) : todo?.priority === 'medium' ? (
            <b className={`tooltip-wrap ${styles.medium}`}>
              <Icon lib="hi" name="HiDotsHorizontal" />
              <span className="scr">
                {t('Priority')}: {t('Medium')}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t('Priority')}: {t('Medium')}
              </span>
            </b>
          ) : todo?.priority === 'low' ? (
            <b className={`tooltip-wrap ${styles.low}`}>
              <Icon lib="bs" name="BsArrowDownCircleFill" />
              <span className="scr">
                {t('Priority')}: {t('Low')}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t('Priority')}: {t('Low')}
              </span>
            </b>
          ) : (
            <>&nbsp;</>
          )}

          {todo?.category === 'personal' ? (
            <b className={`tooltip-wrap ${styles.cat}`}>
              <Icon lib="io5" name="IoPersonCircleSharp" />
              <span className="scr">
                {t('CategoryTitle')}: {t('Personal')}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t('CategoryTitle')}: {t('Personal')}
              </span>
            </b>
          ) : todo?.category === 'work' ? (
            <b className={`tooltip-wrap ${styles.cat} ${styles.bg}`}>
              <Icon lib="md" name="MdWork" />
              <span className="scr">
                {t('CategoryTitle')}: {t('Work')}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t('CategoryTitle')}: {t('Work')}
              </span>
            </b>
          ) : todo?.category === 'shopping' ? (
            <b className={`tooltip-wrap ${styles.cat} ${styles.bg}`}>
              <Icon lib="ti" name="TiShoppingCart" />
              <span className="scr">
                {t('CategoryTitle')}: {t('Shopping')}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t('CategoryTitle')}: {t('Shopping')}
              </span>
            </b>
          ) : (
            <b className={`tooltip-wrap ${styles.cat}`}>
              <Icon lib="hi" name="HiDotsCircleHorizontal" />
              <span className="scr">
                {t('CategoryTitle')}: {t('Other')}
              </span>
              <span className="tooltip narrow2 below left" aria-hidden="true">
                {t('CategoryTitle')}: {t('Other')}
              </span>
            </b>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className={`${styles.edit} tooltip-wrap`}
            disabled={todo?.complete ?? false}
          >
            <Icon lib="ai" name="AiOutlineEdit" />
            <span className="scr">{t('Edit')}</span>
            <span className="tooltip narrow2 below left" aria-hidden="true">
              {t('Edit')}
            </span>
          </button>
          <button
            className={`${styles.delete} tooltip-wrap`}
            onClick={
              isOpen ? () => setIsOpen(false) : () => void handleDelete()
            }
          >
            <span className={styles['delete-inner']} aria-hidden="true">
              &times;
            </span>
            <span className="scr">{t('DeleteTask')}</span>
            <span className="tooltip below left narrow2" aria-hidden="true">
              {t('DeleteTask')}
            </span>
          </button>
        </div>

        {isOpen && (
          <TodoItemModal
            title={todo?.name}
            handleModify={handleModify}
            newName={newName}
            setNewName={setNewName}
            newPriority={newPriority}
            setNewPriority={setNewPriority}
            newDay={newDay}
            setNewDay={setNewDay}
            newMonth={newMonth}
            setNewMonth={setNewMonth}
            newYear={newYear}
            setNewYear={setNewYear}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            priorityOptions={priorityOptions}
            categoryOptions={categoryOptions}
            showDeadline={showDeadline}
            setShowDeadline={setShowDeadline}
            sending={sending}
            todo={todo}
            setIsOpen={setIsOpen}
            maxCharacters={maxCharacters}
          />
        )}
      </li>
    </>
  )
}
