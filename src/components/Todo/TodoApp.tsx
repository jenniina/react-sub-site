import React, { useRef, useEffect, useState, useCallback } from "react"
import { getErrorMessage } from "../../utils"
import { ITaskDraggable } from "./components/TodoList"
import { v4 as uuidv4 } from "uuid"
import { generateOptions, ITask, TCategory, TPriority } from "./types"
import styles from "./css/todo.module.css"
import { useAppDispatch } from "../../hooks/useAppDispatch"
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
} from "./reducers/todoReducer"
import { notify } from "../../reducers/notificationReducer"
import { useSelector } from "react-redux"
import { initializeUser } from "../../reducers/authReducer"
import { RootState } from "../../store"
import { ReducerProps } from "../../types"
import { Select } from "../Select/Select"
import Icon from "../Icon/Icon"
import { useLanguageContext } from "../../contexts/LanguageContext"
import { useConfirm } from "../../contexts/ConfirmContext"
import { useIsClient, useWindow } from "../../hooks/useSSR"
import TodoList from "./components/TodoList"

const maxCharacters = 300

export default function TodoApp() {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t, language } = useLanguageContext()
  const confirm = useConfirm()

  const dispatch = useAppDispatch()

  const user = useSelector((state: ReducerProps) => {
    return state.auth?.user
  })

  const initialize = useCallback(async () => {
    await dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    void initialize()
  }, [initialize])

  const todos = useSelector((state: RootState) => state.todos?.todos ?? [])
  const status = useSelector(
    (state: RootState) => state.todos?.status ?? "idle"
  )
  const error = useSelector((state: RootState) => state.todos?.error ?? null)

  const [priority, setPriority] = useState<TPriority>("low")
  const [category, setCategory] = useState<TCategory>("other")

  const [filterPriority, setFilterPriority] = useState<TPriority>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const localName = "ReactTodos"

  const hasCompletedTasks: boolean =
    todos?.some((todo) => todo.complete) ?? false

  useEffect(() => {
    if (!isClient || !windowObj) return
    if (todos.length === 0 && !user) {
      const storedTodosUnknown = JSON.parse(
        windowObj.localStorage.getItem(localName) ?? "[]"
      ) as unknown
      let storedTodos: ITask[] = []
      if (Array.isArray(storedTodosUnknown))
        storedTodos = storedTodosUnknown as ITask[]
      const existingTodoKeys = new Set(todos.map((todo) => todo.key))
      storedTodos.forEach((todo: ITask) => {
        if (!existingTodoKeys.has(todo.key)) {
          void dispatch(addTodo(todo))
        }
      })
    }
  }, [dispatch, todos, user, isClient, windowObj])

  useEffect(() => {
    if (!isClient || !windowObj) return
    // Save todos to local storage whenever they change
    windowObj.localStorage.setItem(localName, JSON.stringify(todos))
  }, [todos, isClient, windowObj])

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

  const deleteTodoHandler = useCallback(
    (key: ITask["key"]) => {
      if (!key) {
        void dispatch(notify(`Error: no key`, true, 8))
        return
      }
      if (user?._id) {
        void dispatch(deleteTodoAsync(user._id, key))
      } else {
        void dispatch(deleteTodoFromState(key))
        const updatedTodos = todos.filter((todo) => todo.key !== key)
        if (!isClient || !windowObj) return
        windowObj.localStorage.setItem(localName, JSON.stringify(updatedTodos))
      }
    },
    [dispatch, user?._id, todos, isClient, windowObj]
  )

  useEffect(() => {
    const duplicates = findDuplicates(todos)
    const uniqueKeys = new Set()
    duplicates.forEach((duplicate) => {
      if (!uniqueKeys.has(duplicate.key)) {
        deleteTodoHandler(duplicate.key)
        uniqueKeys.add(duplicate.key)
      }
    })
  }, [todos, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  const [todosWithIdAndStatus, setTodosWithIdAndStatus] = useState<
    ITaskDraggable[]
  >([])

  const filteredTodos = todos.filter((todo) => {
    const priorityMatch =
      filterPriority === "all" || todo.priority === filterPriority
    const categoryMatch =
      filterCategory === "all" || todo.category === filterCategory
    return priorityMatch && categoryMatch
  })

  useEffect(() => {
    const newTodosWithIdAndStatus = filteredTodos
      ?.slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((todo) => {
        return { ...todo, id: todo.order, status: "todos" }
      }) as ITaskDraggable[]

    setTodosWithIdAndStatus((prev) => {
      // If identical by length and keys/orders/complete, keep previous reference to avoid re-renders
      if (
        prev.length === newTodosWithIdAndStatus.length &&
        prev.every((p, idx) => {
          const n = newTodosWithIdAndStatus[idx]
          return (
            p.key === n.key &&
            p.order === n.order &&
            p.complete === n.complete &&
            p.priority === n.priority &&
            p.category === n.category &&
            (p.deadline ?? "") === (n.deadline ?? "") &&
            p.name === n.name
          )
        })
      ) {
        return prev
      }
      return newTodosWithIdAndStatus
    })
  }, [todos, filterPriority, filterCategory])

  const filterPriorityTypes: TPriority[] = ["all", "low", "medium", "high"]
  const filterCategoryTypes: TCategory[] = [
    "all",
    "work",
    "personal",
    "shopping",
    "other",
  ]

  const priorityTypes = ["low", "medium", "high"]
  const categoryTypes = ["work", "personal", "shopping", "other"]

  const filterPriorityOptions = generateOptions(filterPriorityTypes, language)

  const filterCategoryOptions = generateOptions(filterCategoryTypes, language)

  const priorityOptions = generateOptions(priorityTypes, language)

  const categoryOptions = generateOptions(categoryTypes, language)

  useEffect(() => {
    if (status === "failed") {
      void dispatch(notify(`There was an error: ${error}`, true, 8))
    }
  }, [status, error, dispatch])

  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (user?._id) {
      void dispatch(syncTodos(user._id))
        .then(() => {
          void dispatch(fetchTodos(user._id))
        })
        .catch((err: unknown) => {
          console.error(err)
          const message = getErrorMessage(err, t("Error"))
          void dispatch(notify(message, true, 8))
        })
    }
  }, [user?._id, dispatch, t])

  function toggleTodo(key: string | undefined) {
    const todo = todos.find((todo) => todo.key === key)
    if (todo) {
      const updatedTodo = { ...todo, complete: !todo.complete }
      if (user) {
        void dispatch(editTodoAsync(user._id, key!, updatedTodo))
      } else {
        void dispatch(editTodo(updatedTodo))
      }
    }
  }

  const modifyTodo = (
    key: string | undefined,
    name: string | undefined,
    priority: TPriority,
    deadline: string,
    category: string
  ) => {
    setSending(true)
    if (!key) {
      void dispatch(notify(`Error: no key`, true, 8))
      setSending(false)
      return
    }
    const todo = todos.find((todo) => todo.key === key)
    if (todo) {
      const updatedTodo = { ...todo, name: name, priority, deadline, category }
      if (user) {
        void dispatch(editTodoAsync(user._id, key, updatedTodo as ITask))
          .then(() => {
            void dispatch(notify(`${t("Updated")}`, false, 3))
            // Ensure local state is refreshed from server data
            void dispatch(fetchTodos(user._id))
            setSending(false)
          })
          .catch((err: unknown) => {
            console.error(err)
            const message = getErrorMessage(err, t("Error"))
            void dispatch(notify(message, true, 8))
            setSending(false)
          })
      } else {
        void dispatch(editTodo(updatedTodo as ITask))
        const updatedTodos = todos.map((todo) =>
          todo.key === key ? updatedTodo : todo
        )
        setSending(false)
        if (!isClient || !windowObj) return
        windowObj.localStorage.setItem(localName, JSON.stringify(updatedTodos))
      }
    }
  }

  const modifyTodoOrder = (
    order: { key: ITask["key"]; order: ITask["order"] }[]
  ) => {
    if (user) {
      void dispatch(async (dispatch) => {
        await editTodoOrder(user._id, order)
          .then(() => {
            void dispatch(fetchTodos(user._id))
          })
          .catch((err: unknown) => {
            console.error(err)
            const message = getErrorMessage(err, t("Error"))
            void dispatch(notify(message, true, 8))
          })
      })
    } else {
      try {
        void dispatch(changeTodoOrder(order))
        // Update local storage with the new ordering immediately
        const updatedTodos = todos
          .map((todo) => {
            const found = order.find((o) => o.key === todo.key)
            return found ? { ...todo, order: found.order } : todo
          })
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        void dispatch(setAllTodos(updatedTodos))
        if (!isClient || !windowObj) return
        windowObj.localStorage.setItem(localName, JSON.stringify(updatedTodos))
      } catch (err: unknown) {
        console.error(err)
        const message = getErrorMessage(err, t("Error"))
        void dispatch(notify(message, true, 8))
      }
    }
  }

  const todoNameRef = useRef<HTMLTextAreaElement>(null)
  const [name, setName] = useState<string>("")

  const [showDeadline, setShowDeadline] = useState(false)
  const [newDay, setNewDay] = useState<string>("")
  const [newMonth, setNewMonth] = useState<string>("")
  const [newYear, setNewYear] = useState<string>("")
  const combinedDeadline =
    newDay && newMonth && newYear ? `${newYear}-${newMonth}-${newDay}` : ""
  const [deadlineErrorMessage, setDeadlineErrorMessage] = useState<string | null>(
    null
  )

  const handleDayChange = (value: string) => {
    if (Number(value) <= 31 && value.length <= 2) {
      setNewDay(value)
      setDeadlineErrorMessage(null)
    } else {
      setDeadlineErrorMessage(`${t("Set")}: ${t("Day")}`)
    }
  }

  const handleMonthChange = (value: string) => {
    if (Number(value) <= 12 && value.length <= 2) {
      setNewMonth(value)
      setDeadlineErrorMessage(null)
    } else {
      setDeadlineErrorMessage(`${t("Set")}: ${t("Month")}`)
    }
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (
      Number(value) <= Number(new Date().getFullYear()) + 10 &&
      value.length <= 4
    ) {
      setNewYear(value)
      setDeadlineErrorMessage(null)
    } else {
      setDeadlineErrorMessage(t("YearMustBeBetweenCurrentYearAnd10YearsFromNow"))
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

        setDeadlineErrorMessage(null)
        if (selectedDate < today) {
          setDeadlineErrorMessage(t("TheDateIsInThePast"))
        }
      }, 0)

      return () => clearTimeout(timer)
    }
  }, [newDay, newMonth, newYear, language, t])

  useEffect(() => {
    if (showDeadline) {
      if (!newDay)
        setNewDay((new Date().getDate() + 1).toString().padStart(2, "0"))
      if (!newMonth)
        setNewMonth((new Date().getMonth() + 1).toString().padStart(2, "0"))
      if (!newYear) setNewYear(new Date().getFullYear().toString())
    } else {
      setNewDay("")
      setNewMonth("")
      setNewYear("")
      setDeadlineErrorMessage(null)
    }
  }, [showDeadline, newDay, newMonth, newYear])

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    // const name = todoNameRef.current?.value ?? ''
    if (name.trim() === "") {
      setSending(false)
      void dispatch(notify(t("AddTask"), true, 3))
      return
    } else if (name.length > maxCharacters) {
      setSending(false)
      void dispatch(
        notify(`${t("NameTooLong")} (${maxCharacters} max)`, true, 8)
      )
      return
    }

    if (showDeadline) {
      if (!combinedDeadline) {
        setSending(false)
        void dispatch(notify(`${t("Set")}: ${t("Deadline")}`, true, 6))
        return
      }
      if (deadlineErrorMessage) {
        setSending(false)
        void dispatch(notify(deadlineErrorMessage, true, 6))
        return
      }
    }

    const key = uuidv4()
    const maxOrder = todos.reduce(
      (max, todo) => (todo.order > max ? todo.order : max),
      0
    )
    const minOrder = todos.reduce(
      (min, todo) => (todo.order < min ? todo.order : min),
      0
    )

    let newTodo: ITask
    if (priority === "high") {
      newTodo = {
        key,
        name: name,
        complete: false,
        order: minOrder - 1,
        priority,
        deadline: showDeadline ? combinedDeadline : "",
        category,
      }
    } else
      newTodo = {
        key,
        name: name,
        complete: false,
        order: maxOrder + 1,
        priority,
        deadline: showDeadline ? combinedDeadline : "",
        category,
      }
    if (user) {
      void dispatch(addTodoAsync(user._id, newTodo))
      // scroll to #todo-list-wrap
      const element = document.getElementById("todo-list-wrap")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      setSending(false)
      setName("")
      setShowDeadline(false)
    } else {
      const updatedTodos = [...todos, newTodo]
        .sort((a, b) => a.order - b.order)
        .map((todo, index) => ({
          ...todo,
          order: index,
        }))
      void dispatch(setAllTodos(updatedTodos))
      setAllTodos(updatedTodos)
      // scroll to #todo-list-wrap
      const element = document.getElementById("todo-list-wrap")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
      setSending(false)
      if (!isClient || !windowObj) return
      windowObj.localStorage.setItem(localName, JSON.stringify(updatedTodos))
      setName("")
      setShowDeadline(false)
    }
  }

  async function handleClearTodos(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault()
    if (
      await confirm({ message: t("AreYouSureYouWantToClearAllCompletedTasks") })
    ) {
      if (user) {
        await dispatch(clearCompletedTodosAsync(user._id))
      } else {
        void dispatch(clearCompletedTodos())
        const updatedTodos = todos.filter((todo) => !todo.complete)
        if (!isClient || !windowObj) return
        windowObj.localStorage.setItem(localName, JSON.stringify(updatedTodos))
      }
    }
  }
  function deleteTodo(key: string | undefined) {
    if (!key) {
      void dispatch(notify(`Error: no key`, true, 8))
      return
    }
    if (user?._id) {
      void dispatch(deleteTodoAsync(user._id, key))
    } else {
      void dispatch(deleteTodoFromState(key))
      let updatedTodos = todos.filter((todo) => todo.key !== key)
      // Reassign order to ensure there are no gaps
      updatedTodos = updatedTodos.map((todo, index) => ({
        ...todo,
        order: index + 1,
      }))
      void dispatch(setAllTodos(updatedTodos))
      if (!isClient || !windowObj) return
      windowObj.localStorage.setItem(localName, JSON.stringify(updatedTodos))
    }
  }

  return (
    <>
      <form onSubmit={handleAddTodo} className={styles.form}>
        <fieldset>
          <legend className="scr">{t("AddTaskToTheTaskList")}</legend>
          <div className={styles["todo-input-area"]}>
            <label htmlFor="taskinput">{t("AddTask")}</label>
            <textarea
              ref={todoNameRef}
              id="taskinput"
              className={`bg`}
              rows={3}
              name="task"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
              placeholder={`${t("Task")}...`}
            />
            <p className={styles.small}>
              {maxCharacters - name.length} {t("CharactersLeft")} ({t("Max")}:{" "}
              {maxCharacters}){" "}
              {name.length > maxCharacters && (
                <span className={styles.warning}>{t("NameTooLong")}</span>
              )}
            </p>

            <Select
              z={todosWithIdAndStatus.length + 5}
              id="category"
              className={`${styles.select} ${styles["category-select"]}`}
              hideDelete
              instructions={t("SelectCategory")}
              value={
                categoryOptions.find((o) => o.value === category) ??
                categoryOptions[0]
              }
              onChange={(o) => setCategory(o?.value as TCategory)}
              options={categoryOptions}
              language={language}
            />
            <Select
              id="priority"
              className={styles.select}
              hideDelete
              instructions={t("SelectPriority")}
              value={
                priorityOptions.find((o) => o.value === priority) ??
                priorityOptions[0]
              }
              onChange={(o) => setPriority(o?.value as TPriority)}
              options={priorityOptions}
              language={language}
              z={todosWithIdAndStatus.length + 4}
            />

            <fieldset className={`${styles.fieldset} ${styles["deadline-wrap"]}`}>
              <legend>
                <label>
                  {t("Deadline")} {" "}
                  <input
                    style={{ marginLeft: "0.5em" }}
                    type="checkbox"
                    checked={showDeadline}
                    onChange={() => setShowDeadline(!showDeadline)}
                  />
                </label>
              </legend>
              {showDeadline && (
                <>
                  <div className={styles["deadline-inputs"]}>
                    <div className={styles.input}>
                      <label className="scr" htmlFor="day_addTodo">
                        {t("Day")}
                      </label>
                      <input
                        type="number"
                        id="day_addTodo"
                        name="day"
                        min={1}
                        max={31}
                        value={newDay}
                        placeholder="DD"
                        onChange={(e) => handleDayChange(e.target.value)}
                        required
                        className="bg"
                      />
                    </div>

                    <div className={styles.input}>
                      <label className="scr" htmlFor="month_addTodo">
                        {t("Month")}
                      </label>
                      <input
                        type="number"
                        id="month_addTodo"
                        name="month"
                        min={1}
                        max={12}
                        value={newMonth}
                        placeholder="MM"
                        onChange={(e) => handleMonthChange(e.target.value)}
                        required
                        className="bg"
                      />
                    </div>

                    <div className={styles.input}>
                      <label className="scr" htmlFor="year_addTodo">
                        {t("Year")}
                      </label>
                      <input
                        type="number"
                        id="year_addTodo"
                        name="year"
                        min={new Date().getFullYear()}
                        max={new Date().getFullYear() + 10}
                        value={newYear}
                        placeholder="YYYY"
                        onChange={(e) => handleYearChange(e)}
                        required
                        className="bg"
                      />
                    </div>
                  </div>
                  {deadlineErrorMessage && (
                    <p className={styles.error}>{deadlineErrorMessage}</p>
                  )}
                </>
              )}
            </fieldset>
            <button
              id={styles["submit-todo"]}
              className={styles["submit-todo"]}
              type="submit"
              disabled={sending}
            >
              {t("AddTask")} <Icon lib="io" name="IoMdAdd" />
            </button>
          </div>
        </fieldset>
      </form>

      <div className={styles["controls-wrap"]}>
        <Select
          id="category-filter"
          className={`${styles.select} ${styles["category-select"]}`}
          hideDelete
          instructions={t("FilterByCategory")}
          value={
            filterCategoryOptions.find((o) => o.value === filterCategory) ??
            filterCategoryOptions[0]
          }
          onChange={(o) => setFilterCategory(o?.value as string)}
          options={filterCategoryOptions}
          language={language}
          z={todosWithIdAndStatus.length + 3}
        />
        <Select
          id="priority-filter"
          className={styles.select}
          hideDelete
          instructions={t("FilterByPriority")}
          value={
            filterPriorityOptions.find((o) => o.value === filterPriority) ??
            filterPriorityOptions[0]
          }
          onChange={(o) => setFilterPriority(o?.value as TPriority)}
          options={filterPriorityOptions}
          language={language}
          z={todosWithIdAndStatus.length + 2}
        />

        <button
          className={`danger ${styles["clear-completed"]}`}
          disabled={!hasCompletedTasks}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            void handleClearTodos(e)
          }
        >
          {t("ClearCompleted")}
        </button>
        <button
          className={styles["move-all-down"]}
          disabled={!hasCompletedTasks || todos.length === 0}
          onClick={(e) => {
            e.preventDefault()
            const incompleteTodos = todos
              .filter((todo) => !todo.complete)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((todo, index) => ({
                ...todo,
                order: index,
              }))
            const completedTodos = todos
              .filter((todo) => todo.complete)
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((todo, index) => ({
                ...todo,
                order: index + incompleteTodos.length,
              }))
            const newTodos = [...incompleteTodos, ...completedTodos]
            const order = newTodos.map((item, index) => ({
              key: item.key,
              order: index,
            }))
            // use existing flow to update order so server and local user flows behave the same
            modifyTodoOrder(order)
          }}
        >
          {t("MoveCompletedToBottom")}
        </button>
      </div>

      <div id="todo-list-wrap" className={styles["list-wrap"]}>
        <p className={styles["left-to-do"]}>
          {todos?.filter((todo) => !todo?.complete).length} {t("LeftToDo")}
        </p>

        {(filterPriority !== "all" || filterCategory !== "all") && (
          <p className={styles["filter-notification"]}>
            {t("Note")} {t("Filtered")}
          </p>
        )}

        <TodoList
          sending={sending}
          todosWithIdAndStatus={todosWithIdAndStatus}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          modifyTodo={modifyTodo}
          modifyTodoOrder={modifyTodoOrder}
          priorityOptions={priorityOptions}
          categoryOptions={categoryOptions}
          maxCharacters={maxCharacters}
        />
        {status === "loading" && (
          <p className="flex center margin0auto textcenter">
            {t("Loading")}...
          </p>
        )}
      </div>
    </>
  )
}
