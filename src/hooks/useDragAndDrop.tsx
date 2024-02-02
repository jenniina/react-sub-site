import { useState, useCallback } from 'react'
import useLocalStorage from './useStorage'

interface Item {
  id: number
  status: string
}

export const useDragAndDrop = <T extends Item, S extends string>(
  initialState: T[],
  statuses: S[]
) => {
  const itemsByStatus = statuses.reduce((acc, status) => {
    acc[status] = initialState.filter((item) => item?.status === status)
    return acc
  }, {} as Record<S, T[]>)

  const [isDragging, setIsDragging] = useState(false)

  const listItemsByStatus = statuses.reduce((acc, status) => {
    const [items, setItems, removeItems] = useLocalStorage<T[]>(
      `DnD-${status}`,
      itemsByStatus[status]
    )
    acc[status] = { items, setItems, removeItems }
    return acc
  }, {} as Record<S, { items: T[]; setItems: (value: T[] | ((val: T[]) => T[])) => void; removeItems: () => void }>)

  const handleUpdate = useCallback(
    (id: number, newStatus: S, target?: number) => {
      const oldStatus = Object.keys(listItemsByStatus).find((status) =>
        listItemsByStatus[status as S].items.find((item) => item?.id === id)
      ) as S

      if (!oldStatus) return

      const card = listItemsByStatus[oldStatus as S].items.find((item) => item?.id === id)
      const targetCard = listItemsByStatus[newStatus].items.find(
        (item) => item?.id === target
      )

      if (!card) return

      // Update card status
      card.status = newStatus

      // Remove card from old status list
      listItemsByStatus[oldStatus as S].setItems((items: T[]) =>
        items.filter((item: T) => item.id !== id)
      )

      // Add card to new status list at the correct position
      const targetIndex = listItemsByStatus[newStatus].items.findIndex(
        (item) => item?.id === target
      )
      listItemsByStatus[newStatus].setItems((prev: T[]) => {
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
