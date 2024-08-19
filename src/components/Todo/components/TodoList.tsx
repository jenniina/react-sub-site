import Todo from './TodoItem'
import { ITask } from '../interfaces'
import style from '../css/todo.module.css'
import { ELanguages } from '../../../interfaces'
import { IClosestItem, useDragAndDrop } from '../../../hooks/useDragAndDrop'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { syncTodos } from '../reducers/todoReducer'

export interface ITaskDraggable extends ITask {
  id: number
  status: string
}

export default function TodoList({
  toggleTodo,
  deleteTodo,
  language,
  modifyTodo,
  modifyTodoOrder,
  todosWithIdAndStatus,
  setTodosWithIdAndStatus,
}: {
  toggleTodo: (key: string | undefined) => void
  deleteTodo: (key: string | undefined) => void
  language: ELanguages
  modifyTodo: (key: string | undefined, name: string | undefined) => void
  modifyTodoOrder: (order: { key: ITask['key']; order: ITask['order'] }[]) => void
  todosWithIdAndStatus: ITaskDraggable[]
  setTodosWithIdAndStatus: React.Dispatch<React.SetStateAction<ITaskDraggable[]>>
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

  const { isDragging, listItemsByStatus, handleUpdate, handleDragging } = useDragAndDrop<
    ITaskDraggable,
    string
  >(todosWithIdAndStatus, ['todos'])

  const dispatch = useAppDispatch()

  return (
    <ul
      className={`${style['todo-ul']} todo-ul`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
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
        ).indexOf(closestItem.element as HTMLElement)

        // If the draggedId and newTargetIndex are the same, do nothing
        if (Number(draggedId) === newTargetIndex) {
          return
        }

        const order = handleUpdate(Number(draggedId), 'todos', newTargetIndex)

        const newOrder = order?.map((item, index) => ({
          key: item.key,
          order: index,
        }))

        modifyTodoOrder(newOrder as { key: ITask['key']; order: ITask['order'] }[])

        handleDragging(false)
      }}
    >
      {listItemsByStatus['todos']?.items
        ?.slice()
        .sort((a, b) => (a.order ?? 0 > (b.order ?? 0) ? 1 : -1))
        .sort((a, b) => (a.complete === b.complete ? 0 : a.complete ? 1 : -1))
        .map((todo) => {
          return (
            <Todo
              key={todo?.key}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              todo={todosWithIdAndStatus?.find((t) => t.key === todo.key)}
              language={language}
              modifyTodo={modifyTodo}
              isDragging={isDragging}
              handleUpdate={handleUpdate}
              handleDragging={handleDragging}
            />
          )
        })}
    </ul>
  )
}
