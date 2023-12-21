import Todo from './TodoItem'
import { ITask } from '../interfaces'
import style from '../css/todo.module.css'

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
}: {
  todos: ITask[]
  toggleTodo: (arg0: string) => void
  deleteTodo: (arg0: string) => void
}) {
  return (
    <ul className={style['todo-ul']}>
      {todos?.map((todo, index) => {
        return (
          <Todo key={index} toggleTodo={toggleTodo} deleteTodo={deleteTodo} todo={todo} />
        )
      })}
    </ul>
  )
}