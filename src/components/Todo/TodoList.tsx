import Todo from './TodoItem';
import { ITask } from './Interfaces'
import style from './todo.module.css'

export default function TodoList({ todos, toggleTodo, deleteTodo }: {
    todos: ITask[];
    toggleTodo: (arg0: string) => void;
    deleteTodo: (arg0: string) => void;
}) {
    return (
        <ul className={style['todo-ul']}>
            {todos.map(todo => {
                return <Todo key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} todo={todo} />
            })}
        </ul>
    )
}
