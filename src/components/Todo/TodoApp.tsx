import { useRef, useEffect, useState, lazy, Suspense, useContext } from 'react'
import { ITaskDraggable } from './components/TodoList'
import { v4 as uuidv4 } from 'uuid'
import { generateOptions, ITask, TCategory, TPriority } from './types'
import styles from './css/todo.module.css'
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
  setAllTodos,
} from './reducers/todoReducer'
import { notify } from '../../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { initializeUser } from '../../reducers/authReducer'
import { RootState } from '../../store'
import { ELanguages, ReducerProps } from '../../types'
import { Select } from '../Select/Select'
import { IoMdAdd } from 'react-icons/io'
import { LanguageContext } from '../../contexts/LanguageContext'

const TodoList = lazy(() => import('./components/TodoList'))

const maxCharacters = 300

interface Props {
  language: ELanguages
}
export default function TodoApp({ language }: Props) {
  const { t } = useContext(LanguageContext)!

  const dispatch = useAppDispatch()

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const todos = useSelector((state: RootState) => state.todos.todos) as ITask[]
  const status = useSelector((state: RootState) => state.todos.status)
  const error = useSelector((state: RootState) => state.todos.error)

  const [priority, setPriority] = useState<TPriority>('low')
  const [deadline, setDeadline] = useState<string>('')
  const [category, setCategory] = useState<TCategory>('other')

  const [filterPriority, setFilterPriority] = useState<TPriority>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const localName = 'ReactTodos'

  const hasCompletedTasks: boolean = todos?.some((todo) => todo.complete)

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

  useEffect(() => {
    // Save todos to local storage whenever they change
    window.localStorage.setItem(localName, JSON.stringify(todos))
  }, [todos])

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

  const filteredTodos = todos.filter((todo) => {
    const priorityMatch = filterPriority === 'all' || todo.priority === filterPriority
    const categoryMatch = filterCategory === 'all' || todo.category === filterCategory
    return priorityMatch && categoryMatch
  })

  useEffect(() => {
    const newTodosWithIdAndStatus = filteredTodos
      ?.slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((todo) => {
        return { ...todo, id: todo.order, status: 'todos' }
      }) as ITaskDraggable[]

    setTodosWithIdAndStatus(newTodosWithIdAndStatus)
  }, [todos, filterPriority, filterCategory])

  const filterPriorityTypes: TPriority[] = ['all', 'low', 'medium', 'high']
  const filterCategoryTypes: TCategory[] = [
    'all',
    'work',
    'personal',
    'shopping',
    'other',
  ]

  const priorityTypes = ['low', 'medium', 'high']
  const categoryTypes = ['work', 'personal', 'shopping', 'other']

  const filterPriorityOptions = generateOptions(filterPriorityTypes, language)

  const filterCategoryOptions = generateOptions(filterCategoryTypes, language)

  const priorityOptions = generateOptions(priorityTypes, language)

  const categoryOptions = generateOptions(categoryTypes, language)

  useEffect(() => {
    if (status === 'failed') {
      dispatch(notify(`There was an error: ${error}`, true, 8))
    }
  }, [status, error, dispatch])

  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (user?._id) {
      dispatch(syncTodos(user._id))
        .then(() => {
          dispatch(fetchTodos(user._id))
        })
        .catch((e) => {
          console.error(e)
          if (e.response?.data?.message)
            dispatch(notify(e.response.data.message, true, 8))
          else dispatch(notify(`${e.message}`, true, 8))
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

  const modifyTodo = async (
    key: string | undefined,
    name: string | undefined,
    priority: TPriority,
    deadline: string,
    category: string
  ) => {
    setSending(true)
    if (!key) {
      dispatch(notify(`Error: no key`, true, 8))
      setSending(false)
      return
    }
    const todo = todos.find((todo) => todo.key === key)
    if (todo) {
      const updatedTodo = { ...todo, name: name, priority, deadline, category }
      if (user) {
        await dispatch(editTodoAsync(user._id, key, updatedTodo as ITask))
          .then(() => {
            dispatch(notify(`${t('Updated')}`, false, 3))
            setSending(false)
          })
          .catch((e) => {
            console.error(e)
            if (e.response?.data?.message)
              dispatch(notify(e.response.data.message, true, 8))
            else dispatch(notify(`${e}`, true, 8))
            setSending(false)
          })
      } else {
        dispatch(editTodo(updatedTodo as ITask))
        const updatedTodos = todos.map((todo) => (todo.key === key ? updatedTodo : todo))
        window.localStorage.setItem(localName, JSON.stringify(updatedTodos))
        setSending(false)
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
        } catch (e: any) {
          console.error(e)
          if (e.response?.data?.message)
            dispatch(notify(e.response.data.message, true, 8))
          else dispatch(notify(`${e}`, true, 8))
        }
      })
    } else {
      try {
        dispatch(changeTodoOrder(order))
      } catch (e: any) {
        console.error(e)
        if (e.response?.data?.message) dispatch(notify(e.response.data.message, true, 8))
        else dispatch(notify(`${e}`, true, 8))
      } finally {
        window.localStorage.setItem(localName, JSON.stringify(todos))
      }
    }
  }

  const todoNameRef = useRef<HTMLTextAreaElement>(null)
  const [name, setName] = useState<string>('')

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    // const name = todoNameRef.current?.value ?? ''
    if (name === '') {
      setSending(false)
      dispatch(notify(t('AddTask'), true, 3))
      return
    }
    if (name.length > maxCharacters) {
      setSending(false)
      dispatch(notify(`${t('NameTooLong')} (${maxCharacters} max)`, true, 8))
      return
    }
    const key = uuidv4()
    const maxOrder = todos.reduce((max, todo) => (todo.order > max ? todo.order : max), 0)
    const minOrder = todos.reduce((min, todo) => (todo.order < min ? todo.order : min), 0)

    let newTodo: ITask
    if (priority === 'high') {
      newTodo = {
        key,
        name: name,
        complete: false,
        order: minOrder - 1,
        priority,
        deadline,
        category,
      }
    } else
      newTodo = {
        key,
        name: name,
        complete: false,
        order: maxOrder + 1,
        priority,
        deadline,
        category,
      }
    if (user) {
      dispatch(addTodoAsync(user._id, newTodo))
      setSending(false)
    } else {
      const updatedTodos = [...todos, newTodo]
        .sort((a, b) => a.order - b.order)
        .map((todo, index) => ({
          ...todo,
          order: index,
        }))
      dispatch(setAllTodos(updatedTodos))
      window.localStorage.setItem(localName, JSON.stringify(updatedTodos))
      setAllTodos(updatedTodos)
      setSending(false)
    }
    if (todoNameRef.current) todoNameRef.current.value = ''
  }

  async function handleClearTodos(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if (window.confirm(t('AreYouSureYouWantToClearAllCompletedTasks'))) {
      if (user) {
        await dispatch(clearCompletedTodosAsync(user._id))
      } else {
        dispatch(clearCompletedTodos())
        const updatedTodos = todos.filter((todo) => !todo.complete)
        window.localStorage.setItem(localName, JSON.stringify(updatedTodos))
      }
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
      let updatedTodos = todos.filter((todo) => todo.key !== key)
      // Reassign order to ensure there are no gaps
      updatedTodos = updatedTodos.map((todo, index) => ({
        ...todo,
        order: index + 1,
      }))
      dispatch(setAllTodos(updatedTodos))
      window.localStorage.setItem(localName, JSON.stringify(updatedTodos))
    }
  }

  return (
    <>
      <form onSubmit={handleAddTodo} className={styles['form']}>
        <fieldset>
          <legend className='scr'>{t('AddTaskToTheTaskList')}</legend>
          <div className={styles['todo-input-area']}>
            <label htmlFor='taskinput'>{t('AddTask')}</label>
            <textarea
              ref={todoNameRef}
              id='taskinput'
              className={`bg`}
              rows={3}
              name='task'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete='off'
              placeholder={`${t('Task')}...`}
            />
            <p className={styles.small}>
              {maxCharacters - name.length} {t('CharactersLeft')} ({t('Max')}:{' '}
              {maxCharacters}){' '}
              {name.length > maxCharacters && (
                <span className={styles.warning}>{t('NameTooLong')}</span>
              )}
            </p>

            <Select
              z={todosWithIdAndStatus.length + 5}
              id='category'
              className={`${styles['select']} ${styles['category-select']}`}
              hideDelete
              instructions={t('SelectCategory')}
              value={
                categoryOptions.find((o) => o.value === category) || categoryOptions[0]
              }
              onChange={(o) => setCategory(o?.value as TCategory)}
              options={categoryOptions}
              language={language}
            />
            <Select
              id='priority'
              className={styles['select']}
              hideDelete
              instructions={t('SelectPriority')}
              value={
                priorityOptions.find((o) => o.value === priority) || priorityOptions[0]
              }
              onChange={(o) => setPriority(o?.value as TPriority)}
              options={priorityOptions}
              language={language}
              z={todosWithIdAndStatus.length + 4}
            />
            <button
              id={styles['submit-todo']}
              className={styles['submit-todo']}
              type='submit'
              disabled={sending}
            >
              {t('AddTask')} <IoMdAdd />
            </button>
          </div>
        </fieldset>
      </form>

      <div className={styles['controls-wrap']}>
        <Select
          id='category-filter'
          className={`${styles['select']} ${styles['category-select']}`}
          hideDelete
          instructions={t('FilterByCategory')}
          value={
            filterCategoryOptions.find((o) => o.value === filterCategory) ||
            filterCategoryOptions[0]
          }
          onChange={(o) => setFilterCategory(o?.value as string)}
          options={filterCategoryOptions}
          language={language}
          z={todosWithIdAndStatus.length + 3}
        />
        <Select
          id='priority-filter'
          className={styles['select']}
          hideDelete
          instructions={t('FilterByPriority')}
          value={
            filterPriorityOptions.find((o) => o.value === filterPriority) ||
            filterPriorityOptions[0]
          }
          onChange={(o) => setFilterPriority(o?.value as TPriority)}
          options={filterPriorityOptions}
          language={language}
          z={todosWithIdAndStatus.length + 2}
        />

        <button
          className={`danger ${styles['clear-completed']}`}
          disabled={!hasCompletedTasks}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handleClearTodos(e)
          }
        >
          {t('ClearCompleted')}
        </button>
      </div>

      <div className={styles['list-wrap']}>
        <p className={styles['left-to-do']}>
          {todos?.filter((todo) => !todo?.complete).length} {t('LeftToDo')}
        </p>

        {(filterPriority !== 'all' || filterCategory !== 'all') && (
          <p className={styles['filter-notification']}>
            {t('Note')} {t('Filtered')}
          </p>
        )}

        <Suspense
          fallback={
            <p className='flex center margin0auto textcenter'>{t('Loading')}...</p>
          }
        >
          <TodoList
            sending={sending}
            todosWithIdAndStatus={todosWithIdAndStatus}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            language={language}
            modifyTodo={modifyTodo}
            modifyTodoOrder={modifyTodoOrder}
            priorityOptions={priorityOptions}
            categoryOptions={categoryOptions}
            maxCharacters={maxCharacters}
          />
        </Suspense>
        {status === 'loading' && (
          <p className='flex center margin0auto textcenter'>{t('Loading')}...</p>
        )}
      </div>
    </>
  )
}
