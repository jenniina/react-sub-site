import { useState, useRef, useEffect, FC, ChangeEvent } from 'react'
import TodoList from './components/TodoList'
import { v4 as uuidv4 } from 'uuid'
import { ITask } from './interfaces'
import style from './css/todo.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import {
  fetchTodos,
  addTodo,
  addTodoAsync,
  deleteTodo,
  deleteTodoAsync,
  editTodo,
  editTodoAsync,
  clearCompletedTodos,
  deleteTodoFromState,
  clearCompletedTodosAsync,
  syncTodos,
} from './reducers/todoReducer'
import { notify } from '../../reducers/notificationReducer'
import Notification from '../Notification/Notification'
import { useSelector } from 'react-redux'
import { initializeUser } from '../../reducers/authReducer'
import { ReducerProps } from '../../interfaces'
import { RootState } from '../../store'

export default function TodoApp({}: {}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  const todos = useSelector((state: RootState) => state.todos.todos)
  const status = useSelector((state: RootState) => state.todos.status)
  const error = useSelector((state: RootState) => state.todos.error)

  const hasCompletedTasks = todos?.some((todo) => todo.complete)

  useEffect(() => {
    if (status === 'failed') {
      dispatch(notify(`There was an error: ${error}`, true, 8))
    }
  }, [status, error, dispatch])

  useEffect(() => {
    if (user?._id) {
      dispatch(syncTodos(user._id))
    }
  }, [user?._id, dispatch])

  function toggleTodo(key: string) {
    const todo = todos.find((todo) => todo.key === key)
    if (todo) {
      const updatedTodo = { ...todo, complete: !todo.complete }
      if (user) {
        dispatch(editTodoAsync(user._id, key, updatedTodo))
      } else {
        dispatch(editTodo(updatedTodo))
      }
    }
  }

  const todoNameRef = useRef<HTMLInputElement>(null)

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = todoNameRef.current?.value ?? ''
    if (name === '') return
    const key = uuidv4()
    const newTodo = { key, name: name, complete: false }
    if (user) {
      dispatch(addTodoAsync(user._id, newTodo))
    } else {
      dispatch(addTodo(newTodo))
    }
    if (todoNameRef.current) todoNameRef.current.value = ''
  }

  async function handleClearTodos(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if (user) {
      await dispatch(clearCompletedTodosAsync(user._id))
    } else {
      dispatch(clearCompletedTodos())
    }
  }

  function deleteTodo(key: string) {
    if (user?._id) {
      dispatch(deleteTodoAsync(user._id, key))
    } else {
      dispatch(deleteTodoFromState(key))
    }
  }

  return (
    <>
      <form onSubmit={handleAddTodo} className={style['form']}>
        <fieldset>
          <legend className='scr'>Add tasks to the task list</legend>
          <div className={style['todo-input-area']}>
            <label htmlFor={style['taskinput']}>Add tasks</label>
            <input
              ref={todoNameRef}
              id={style['taskinput']}
              className='bg'
              name='name'
              required
              type='text'
              placeholder='Task...'
            />
            <button id={style['submit-todo']} type='submit'>
              Add Task
            </button>
            <button
              disabled={!hasCompletedTasks}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleClearTodos(e)
              }
            >
              Clear Completed Tasks
            </button>
          </div>
        </fieldset>
      </form>
      <div className={style['list-wrap']}>
        <p className={style['left-to-do']}>
          {todos?.filter((todo) => !todo?.complete).length} left to do
        </p>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        {status === 'loading' && <p>Loading...</p>}
      </div>
      <Notification />
    </>
  )
}
