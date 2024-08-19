import { useRef, useEffect, useState } from 'react'
import TodoList, { ITaskDraggable } from './components/TodoList'
import { v4 as uuidv4 } from 'uuid'
import {
  EAddTask,
  EAddTaskToTheTaskList,
  EClearCompleted,
  ELeftToDo,
  ELoading,
  ETask,
  ITask,
} from './interfaces'
import style from './css/todo.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import {
  addTodo,
  addTodoAsync,
  deleteTodoAsync,
  editTodo,
  editTodoAsync,
  clearCompletedTodos,
  deleteTodoFromState,
  clearCompletedTodosAsync,
  syncTodos,
  editTodoOrder,
  fetchTodos,
  changeTodoOrder,
} from './reducers/todoReducer'
import { notify } from '../../reducers/notificationReducer'
import Notification from '../Notification/Notification'
import { useSelector } from 'react-redux'
import { initializeUser } from '../../reducers/authReducer'
import { ReducerProps } from '../../interfaces'
import { RootState } from '../../store'
import { ELanguages } from '../../interfaces'

interface Props {
  language: ELanguages
}
export default function TodoApp({ language }: Props) {
  const dispatch = useAppDispatch()

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const todos = useSelector((state: RootState) => state.todos.todos)
  const status = useSelector((state: RootState) => state.todos.status)
  const error = useSelector((state: RootState) => state.todos.error)

  const localName = 'ReactTodos'

  const hasCompletedTasks = todos?.some((todo) => todo.complete)

  useEffect(() => {
    if (todos.length === 0 && !user) {
      const storedTodos = JSON.parse(window.localStorage.getItem(localName) || '[]')
      const existingTodoKeys = new Set(todos.map((todo) => todo.key))
      storedTodos.forEach((todo: any) => {
        if (!existingTodoKeys.has(todo.key)) {
          dispatch(addTodo(todo))
        }
      })
    }
  }, [dispatch, todos, user])

  const findDuplicates = (todos: ITask[]) => {
    const seenKeys = new Set()
    const duplicates: ITask[] = []
    todos.forEach((todo) => {
      if (seenKeys.has(todo.key)) {
        duplicates.push(todo)
      } else {
        seenKeys.add(todo.key)
      }
    })
    return duplicates
  }

  const deleteTodoHandler = (key: ITask['key']) => {
    if (!key) {
      dispatch(notify(`Error: no key`, true, 8))
      return
    }
    if (user?._id) {
      dispatch(deleteTodoAsync(user._id, key))
    } else {
      dispatch(deleteTodoFromState(key))
      const updatedTodos = todos.filter((todo) => todo.key !== key)
      window.localStorage.setItem(localName, JSON.stringify(updatedTodos))
    }
  }

  useEffect(() => {
    const duplicates = findDuplicates(todos)
    const uniqueKeys = new Set()
    duplicates.forEach((duplicate) => {
      if (!uniqueKeys.has(duplicate.key)) {
        deleteTodoHandler(duplicate.key)
        uniqueKeys.add(duplicate.key)
      }
    })
  }, [todos])

  const [todosWithIdAndStatus, setTodosWithIdAndStatus] = useState<ITaskDraggable[]>([])

  useEffect(() => {
    const newTodosWithIdAndStatus = todos
      ?.slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((todo, index) => {
        return { ...todo, id: index, status: 'todos' }
      }) as ITaskDraggable[]

    setTodosWithIdAndStatus(newTodosWithIdAndStatus)
  }, [todos])

  useEffect(() => {
    if (status === 'failed') {
      dispatch(notify(`There was an error: ${error}`, true, 8))
    }
  }, [status, error, dispatch])

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (user?._id && !loggedIn) {
      dispatch(syncTodos(user._id)).then(() => {
        setLoggedIn(true)
      })
    }
  }, [user?._id])

  function toggleTodo(key: string | undefined) {
    const todo = todos.find((todo) => todo.key === key)
    if (todo) {
      const updatedTodo = { ...todo, complete: !todo.complete }
      if (user) {
        dispatch(editTodoAsync(user._id, key as ITask['key'], updatedTodo))
      } else {
        dispatch(editTodo(updatedTodo))
      }
    }
  }

  const modifyTodo = async (key: string | undefined, name: string | undefined) => {
    if (!key) {
      dispatch(notify(`Error: no key`, true, 8))
      return
    }
    const todo = todos.find((todo) => todo.key === key)
    if (todo) {
      const updatedTodo = { ...todo, name: name }
      if (user) {
        await dispatch(editTodoAsync(user._id, key, updatedTodo as ITask))
          .then(() => {
            dispatch(notify(`Todo updated`, false, 3))
          })
          .catch((e) => {
            console.error(e)
            dispatch(notify(`${e}`, true, 8))
          })
      } else {
        dispatch(editTodo(updatedTodo as ITask))
        const updatedTodos = todos.map((todo) => (todo.key === key ? updatedTodo : todo))
        window.localStorage.setItem(localName, JSON.stringify(updatedTodos))
      }
    }
  }

  const modifyTodoOrder = (order: { key: ITask['key']; order: ITask['order'] }[]) => {
    if (user) {
      dispatch(async (dispatch) => {
        try {
          await editTodoOrder(user._id, order).then(() => {
            dispatch(fetchTodos(user._id))
          })
        } catch (e) {
          console.error(e)
          dispatch(notify(`${e}`, true, 8))
        }
      })
    } else {
      dispatch(changeTodoOrder(order))
      window.localStorage.setItem(localName, JSON.stringify(todos))
    }
  }

  const todoNameRef = useRef<HTMLTextAreaElement>(null)

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = todoNameRef.current?.value ?? ''
    if (name === '') return
    const key = uuidv4()
    const maxOrder = todos.reduce((max, todo) => (todo.order > max ? todo.order : max), 0)
    const newTodo = { key, name: name, complete: false, order: maxOrder + 1 }
    if (user) {
      dispatch(addTodoAsync(user._id, newTodo))
    } else {
      dispatch(addTodo(newTodo))
      window.localStorage.setItem(localName, JSON.stringify([...todos, newTodo]))
    }
    if (todoNameRef.current) todoNameRef.current.value = ''
  }

  async function handleClearTodos(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if (user) {
      await dispatch(clearCompletedTodosAsync(user._id))
    } else {
      dispatch(clearCompletedTodos())
      const updatedTodos = todos.filter((todo) => !todo.complete)
      window.localStorage.setItem(localName, JSON.stringify(updatedTodos))
    }
  }

  function deleteTodo(key: string | undefined) {
    if (!key) {
      dispatch(notify(`Error: no key`, true, 8))
      return
    }
    if (user?._id) {
      dispatch(deleteTodoAsync(user._id, key))
    } else {
      dispatch(deleteTodoFromState(key))
      const updatedTodos = todos.filter((todo) => todo.key !== key)
      window.localStorage.setItem(localName, JSON.stringify(updatedTodos))
    }
  }

  return (
    <>
      <form onSubmit={handleAddTodo} className={style['form']}>
        <fieldset>
          <legend className='scr'>{EAddTaskToTheTaskList[language]}</legend>
          <div className={style['todo-input-area']}>
            <label htmlFor='taskinput'>{EAddTask[language]}</label>
            <textarea
              ref={todoNameRef}
              id='taskinput'
              className={`bg`}
              name='name'
              required
              autoComplete='off'
              placeholder={`${ETask[language]}...`}
            />
            <button id={style['submit-todo']} type='submit'>
              {EAddTask[language]}
            </button>
            <button
              disabled={!hasCompletedTasks}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleClearTodos(e)
              }
            >
              {EClearCompleted[language]}
            </button>
          </div>
        </fieldset>
      </form>
      <div className={style['list-wrap']}>
        <p className={style['left-to-do']}>
          {todos?.filter((todo) => !todo?.complete).length} {ELeftToDo[language]}
        </p>
        <TodoList
          todosWithIdAndStatus={todosWithIdAndStatus}
          setTodosWithIdAndStatus={setTodosWithIdAndStatus}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          language={language}
          modifyTodo={modifyTodo}
          modifyTodoOrder={modifyTodoOrder}
        />
        {status === 'loading' && <p>{ELoading[language]}...</p>}
      </div>
      <Notification language={language} />
    </>
  )
}
