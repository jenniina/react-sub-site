import { ITask } from './Interfaces'

export default function Todo({ todo, toggleTodo, deleteTodo }: {
    todo: ITask;
    toggleTodo: (arg0: string) => void;
    deleteTodo: (arg0: string) => void;
}) {



    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    function handleDelete() {
        deleteTodo(todo.id)
    }
    return (
        <li>
            <button onClick={handleDelete}>
                <span>&times;</span>
                <span className='screen-reader-text'>Delete Task</span>
            </button>
            <label>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                {todo.name}
            </label>
        </li>
    )
}
