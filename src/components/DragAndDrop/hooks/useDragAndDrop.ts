import { useState, useCallback } from 'react'
import { Data, Status } from '../interfaces'
import useLocalStorage from '../../../hooks/useStorage'
import '../dragAndDrop.module.css'

export const useDragAndDrop = (initialState: Data[], statuses: Status[]) => {
  const itemsByStatus = statuses.reduce((acc, status) => {
    acc[status] = initialState.filter((item) => item?.status === status)
    return acc
  }, {} as Record<Status, Data[]>)

  const [isDragging, setIsDragging] = useState(false)

  const listItemsByStatus = statuses.reduce((acc, status) => {
    const [items, setItems, removeItems] = useLocalStorage<Data[]>(
      `DnD-${status}`,
      itemsByStatus[status]
    )
    acc[status] = { items, setItems, removeItems }
    return acc
  }, {} as Record<Status, { items: Data[]; setItems: (value: Data[] | ((val: Data[]) => Data[])) => void; removeItems: () => void }>)

  const handleUpdate = useCallback(
    (id: number, newStatus: Status, target?: number) => {
      const oldStatus = Object.keys(listItemsByStatus).find((status) =>
        listItemsByStatus[status as Status].items.find((item) => item?.id === id)
      ) as Status

      if (!oldStatus) return

      const card = listItemsByStatus[oldStatus as Status].items.find(
        (item) => item?.id === id
      )
      const targetCard = listItemsByStatus[newStatus].items.find(
        (item) => item?.id === target
      )

      if (!card) return

      // Update card status
      card.status = newStatus

      // Remove card from old status list
      listItemsByStatus[oldStatus as Status].setItems((items: Data[]) =>
        items.filter((item: Data) => item.id !== id)
      )

      // Add card to new status list at the correct position
      const targetIndex = listItemsByStatus[newStatus].items.findIndex(
        (item) => item?.id === target
      )
      listItemsByStatus[newStatus].setItems((prev: Data[]) => {
        if (targetIndex === 0 || targetIndex === -1) {
          return [card, ...prev]
        } else if (targetIndex === prev.length - 1) {
          return [...prev, card]
        } else {
          return [...prev.slice(0, targetIndex), card, ...prev.slice(targetIndex)]
        }
      })
    },
    [listItemsByStatus]
  )

  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  return {
    isDragging,
    listItemsByStatus,
    handleUpdate,
    handleDragging,
  }
}
