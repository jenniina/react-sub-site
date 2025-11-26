import { ITask, TPriority } from '../types'
import style from '../css/todo.module.css'
import { IClosestItem, useDragAndDrop } from '../../../hooks/useDragAndDrop'
import { SelectOption } from '../../Select/Select'
import Todo from './TodoItem'

export interface ITaskDraggable extends ITask {
  id: number
  status: string
}

export default function TodoList({
  toggleTodo,
  deleteTodo,
  modifyTodo,
  modifyTodoOrder,
  todosWithIdAndStatus,
  sending,
  priorityOptions,
  categoryOptions,
  maxCharacters,
}: {
  toggleTodo: (key: string | undefined) => void
  deleteTodo: (key: string | undefined) => void
  modifyTodo: (
    key: string | undefined,
    name: string | undefined,
    priority: TPriority,
    deadline: string,
    category: string
  ) => void
  modifyTodoOrder: (
    order: { key: ITask['key']; order: ITask['order'] }[]
  ) => void
  todosWithIdAndStatus: ITaskDraggable[]
  sending: boolean
  priorityOptions: SelectOption[]
  categoryOptions: SelectOption[]
  maxCharacters: number
}) {
  // const todosWithIdAndStatus = todos
  //   ?.slice()
  //   .sort(
  //     (a, b) =>
  //       new Date(a.createdAt ?? '').getTime() - new Date(b.createdAt ?? '').getTime()
  //   )
  //   .map((todo, index) => {
  //     return { ...todo, id: index, status: 'todos' }
  //   }) as ITaskDraggable[]

  const { isDragging, listItemsByStatus, handleUpdate, handleDragging } =
    useDragAndDrop<ITaskDraggable, string>(todosWithIdAndStatus, ['todos'])

  return (
    <ul
      className={`${style['todo-ul']} todo-ul`}
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        // handleUpdate(+e.dataTransfer.getData('text'), 'todos')
        e.preventDefault()
        const draggedId = e.dataTransfer.getData('application/my-app')
        // Find the closest item to the drop position
        const closestItem = Array.from(
          e.currentTarget.querySelectorAll('.todo-ul > li')
        )?.reduce<IClosestItem>(
          (closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = Math.abs(box.top - e.clientY)
            if (offset < closest.offset) {
              return { offset, element: child as HTMLElement }
            } else {
              return closest
            }
          },
          { offset: Number.POSITIVE_INFINITY }
        )
        // Use the index of the closest item as the new target index
        const newTargetIndex = Array.from(
          e.currentTarget.querySelectorAll('.todo-ul > li')
        ).indexOf(closestItem.element!)

        // If the draggedId and newTargetIndex are the same, do nothing
        if (Number(draggedId) === newTargetIndex) {
          return
        }

        const order = handleUpdate(Number(draggedId), 'todos', newTargetIndex)

        if (Array.isArray(order)) {
          const newOrder = order?.map((item, index) => ({
            key: item.key,
            order: index,
          }))

          modifyTodoOrder(
            newOrder as { key: ITask['key']; order: ITask['order'] }[]
          )
        } else {
          console.error('Order is not an array')
        }
        handleDragging(false)
      }}
    >
      {listItemsByStatus.todos?.items
        ?.slice()
        .sort((a, b) => ((a.order ?? 0 > (b.order ?? 0)) ? 1 : -1))
        .sort((a, b) => (a.complete === b.complete ? 0 : a.complete ? 1 : -1))
        .map(todo => {
          return (
            <Todo
              key={todo?.key}
              sending={sending}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              todo={todosWithIdAndStatus?.find(t => t.key === todo.key)}
              modifyTodo={modifyTodo}
              isDragging={isDragging}
              handleDragging={handleDragging}
              priorityOptions={priorityOptions}
              categoryOptions={categoryOptions}
              zin={listItemsByStatus.todos?.items.length}
              maxCharacters={maxCharacters}
            />
          )
        })}
    </ul>
  )
}
