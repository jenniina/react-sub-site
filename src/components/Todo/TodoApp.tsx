import { useState, useRef, useEffect, FC, ChangeEvent } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'
import { ITask } from './Interfaces'
import style from './todo.module.css'



export default function TodoApp({ }: {

}) {
    const localStorageKey = "React-Todos"

    const [todos, setTodos] = useState<ITask[]>([])
    //const [state, setState] = useLocalStorage(localStorageKey)


    useEffect(() => {
        const storedTodos = window.localStorage.getItem(localStorageKey)
        if (storedTodos && storedTodos.length > 2) setTodos(JSON.parse(storedTodos))
    }, [])


    useEffect(() => {
        window.localStorage.setItem(localStorageKey, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id: string) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        if (todo) todo.complete = !todo.complete
        setTodos(newTodos)
    }

    const todoNameRef = useRef<HTMLInputElement>(null)

    function handleAddTodo(e: { preventDefault: () => void }) {
        e.preventDefault()
        const name = todoNameRef.current?.value ?? ""
        if (name === "") return
        setTodos(prevTodos => {
            return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
        })
        if (todoNameRef.current) todoNameRef.current.value = ""
    }

    function handleClearTodos(e: { preventDefault: () => void }) {
        e.preventDefault()
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }
    function deleteTodo(id: string) {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
    }

    //Make sure that pressing enter in the input field submits the form
    useEffect(() => {
        const keyDownHandler = (e: { key: string; preventDefault: () => void }) => {

            if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTodo(e);
            }
        };
        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);


    return (
        <form onSubmit={handleAddTodo} className={style['form']}>
            <fieldset>
                <legend className="screen-reader-text">
                    Add tasks to the task list
                </legend>
                <div className={style['todo-input-area']}>
                    <label htmlFor={style['taskinput']}>
                        Add tasks
                    </label>
                    <input ref={todoNameRef} id={style['taskinput']}
                        className='bg' name="task" required type="text" placeholder="Task..." />
                    <button id={style['submit-todo']} type="submit" onClick={handleAddTodo}>
                        Add Task
                    </button>
                    <button onClick={handleClearTodos}>
                        Clear Completed Tasks
                    </button>
                </div>
                <div className={style['list-wrap']}>
                    <p className={style['left-to-do']}>
                        {todos.filter(todo => !todo.complete).length} left to do
                    </p>
                    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                </div>
            </fieldset>
        </form>
    )
}

