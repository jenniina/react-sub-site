import { useState } from 'react'
import { EEdit, ELanguages } from '../../../interfaces'
import { EDeleteTask } from '../../../interfaces/todo'
import Accordion from '../../Accordion/Accordion'
import { ITask } from '../interfaces'
import styles from '../css/todo.module.css'
import { set } from 'lodash'
import { ITaskDraggable } from './TodoList'
import { EAreYouSureYouWantToDelete } from '../../UserEdit/interfaces'

export default function Todo({
  todo,
  toggleTodo,
  deleteTodo,
  language,
  modifyTodo,
  isDragging,
  handleUpdate,
  handleDragging,
}: {
  todo: ITaskDraggable | undefined
  toggleTodo: (key: string | undefined) => void
  deleteTodo: (key: string | undefined) => void
  language: ELanguages
  modifyTodo: (key: string | undefined, name: string | undefined) => void
  isDragging: boolean
  handleUpdate: (id: number, status: string, target?: number) => void
  handleDragging: (dragging: boolean) => void
}) {
  const [newName, setNewName] = useState(todo?.name)

  function handleTodoClick() {
    toggleTodo(todo?.key)
  }
  function handleDelete() {
    if (window.confirm(EAreYouSureYouWantToDelete[language] + ' "' + todo?.name + '"?')) {
      setNewName('')
      deleteTodo(todo?.key)
    }
  }
  const handleModify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    modifyTodo(todo?.key, newName)
  }

  return (
    <li
      className={`${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('application/my-app', todo?.order?.toString() as string)
        handleDragging(true)
      }}
      onDragEnd={() => handleDragging(false)}
    >
      <label>
        <input type='checkbox' checked={todo?.complete} onChange={handleTodoClick} />
        <span>{todo?.name}</span>
      </label>
      <div className={styles['btn-wrap']}>
        <Accordion
          language={language}
          className={`modify-todo`}
          text={EEdit[language]}
          isOpen={false}
          hideBrackets={false}
          onClick={() => {
            setNewName(todo?.name)
          }}
        >
          <form onSubmit={handleModify} className={styles.modify}>
            <div className='input-wrap'>
              <label>
                <input
                  required
                  type='text'
                  name='name'
                  value={newName}
                  onChange={({ target }) => setNewName(target.value)}
                />
                <span className='scr'>
                  {EEdit[language]} {todo?.name}
                </span>
              </label>
            </div>
            <button type='submit' className='modify'>
              {EEdit[language]}
            </button>
          </form>
        </Accordion>
        <button className={`${styles['delete']}`} onClick={handleDelete}>
          <span>&times;</span>
          <span className='scr'>{EDeleteTask[language]}</span>
        </button>
      </div>
    </li>
  )
}
