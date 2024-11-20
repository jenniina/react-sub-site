import { useEffect, useState } from 'react'
import {
  EClose,
  EConfirm,
  EDraggable,
  EEdit,
  EEtc,
  ELanguages,
} from '../../../interfaces'
import { EDeleteTask } from '../../../interfaces/todo'
import Accordion from '../../Accordion/Accordion'
import styles from '../css/todo.module.css'
import { ITaskDraggable } from './TodoList'
import { EAreYouSureYouWantToDelete } from '../../UserEdit/interfaces'
import { ETask } from '../interfaces'
import { MdDragIndicator } from 'react-icons/md'
import { sanitize, first3Words } from '../../../utils'
import { FaAnglesUp } from 'react-icons/fa6'

export default function Todo({
  todo,
  toggleTodo,
  deleteTodo,
  language,
  modifyTodo,
  isDragging,
  handleUpdate,
  handleDragging,
  sending,
}: {
  todo: ITaskDraggable | undefined
  toggleTodo: (key: string | undefined) => void
  deleteTodo: (key: string | undefined) => void
  language: ELanguages
  modifyTodo: (key: string | undefined, name: string | undefined) => void
  isDragging: boolean
  handleUpdate: (id: number, status: string, target?: number) => void
  handleDragging: (dragging: boolean) => void
  sending: boolean
}) {
  const [newName, setNewName] = useState(todo?.name ?? '')
  const [isOpen, setIsOpen] = useState(false)

  function handleTodoClick() {
    toggleTodo(todo?.key)
  }
  function handleDelete() {
    if (window.confirm(EAreYouSureYouWantToDelete[language] + ' "' + todo?.name + '"?')) {
      setNewName('')
      deleteTodo(todo?.key)
      setIsOpen(false)
    }
  }
  const handleModify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    modifyTodo(todo?.key, newName)
    setIsOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewName(e.target.value)
  }

  useEffect(() => {
    // Ensure inputValue is always defined
    if (todo?.name !== newName) {
      setNewName(todo?.name || '')
    }
  }, [todo])

  const [allowDrag, setAllowDrag] = useState(true)
  const [isSelectingText, setIsSelectingText] = useState(false)

  const handleMouseDown = () => {
    setAllowDrag(true)
    setIsSelectingText(false)
  }
  const handleMouseOverHandle = () => {
    setAllowDrag(true)
  }
  const handleMouseOverSpan = () => {
    setAllowDrag(false)
  }
  const handleMouseDownSpan = () => {
    setAllowDrag(false)
    setIsSelectingText(true)
  }
  const handleMouseUpSpan = () => {
    if (window.getSelection()?.toString()) {
      setAllowDrag(false)
      setIsSelectingText(true)
    } else {
      setAllowDrag(true)
      setIsSelectingText(false)
    }
  }

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (isSelectingText) {
      e.preventDefault()
    }
  }

  return (
    <li
      className={`${isDragging ? 'dragging' : ''}`}
      draggable={allowDrag}
      onDragStart={(e) => {
        if (allowDrag) {
          e.dataTransfer.setData('application/my-app', todo?.order?.toString() as string)
          handleDragging(true)
        } else {
          e.preventDefault()
        }
      }}
      onDragEnd={() => handleDragging(false)}
    >
      <span
        onMouseOver={handleMouseOverHandle}
        onMouseDown={handleMouseDown}
        className={`${styles['drag-handle']} tooltip-wrap`}
      >
        <MdDragIndicator />
        <span className='tooltip narrow2 below right'>{EDraggable[language]}</span>
      </span>

      <label
        className={`${isOpen ? styles.open : styles.closed}`}
        onClick={handleLabelClick}
      >
        <input
          type='checkbox'
          id={`check_${sanitize(todo?.name)}`}
          checked={todo?.complete ?? false}
          onChange={handleTodoClick}
        />
        <span
          onMouseOver={handleMouseOverSpan}
          onMouseDown={handleMouseDownSpan}
          onMouseUp={handleMouseUpSpan}
        >
          {todo?.name}
        </span>
      </label>
      <div className={`${isOpen ? styles.open : styles.closed} ${styles['btn-wrap']}`}>
        <Accordion
          language={language}
          className={`${styles['modify-todo']} modify-todo`}
          wrapperClass='modify-todo-wrap'
          text={EEdit[language]}
          isOpen={isOpen}
          setIsFormOpen={setIsOpen}
          hideBrackets={false}
          onClick={() => {
            setNewName(todo?.name ?? '')
          }}
        >
          <form onSubmit={handleModify} className={`${styles.modify}`}>
            <label>
              <textarea
                id={`task_${sanitize(todo?.name)}`}
                required
                name='task'
                rows={4}
                value={newName}
                onChange={handleChange}
              />
              <span className='scr'>
                {EEdit[language]} {first3Words(todo?.name ?? ETask[language], language)}
              </span>
            </label>

            <button type='submit' disabled={sending} className='modify'>
              {EConfirm[language]}
            </button>
          </form>
        </Accordion>
        <button
          className={`${styles['delete']} tooltip-wrap`}
          onClick={isOpen ? () => setIsOpen(false) : handleDelete}
        >
          <span aria-hidden='true'>
            {isOpen ? <FaAnglesUp style={{ fontSize: '0.8em' }} /> : <>&times;</>}
          </span>
          <span className='tooltip below left narrow2'>
            {isOpen ? EClose[language] : EDeleteTask[language]}
          </span>
        </button>
      </div>
    </li>
  )
}
