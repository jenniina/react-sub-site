import { ITask } from '../interfaces'

export default function Todo({
  todo,
  toggleTodo,
  deleteTodo,
}: {
  todo: ITask
  toggleTodo: (arg0: string) => void
  deleteTodo: (arg0: string) => void
}) {
  function handleTodoClick() {
    toggleTodo(todo?.key)
  }
  function handleDelete() {
    deleteTodo(todo?.key)
  }
  return (
    <li>
      <button onClick={handleDelete}>
        <span>&times;</span>
        <span className='scr'>Delete Task</span>
      </button>
      <label>
        <input type='checkbox' checked={todo?.complete} onChange={handleTodoClick} />
        <span>{todo?.name}</span>
      </label>
    </li>
  )
}
