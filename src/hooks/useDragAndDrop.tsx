import { useCallback, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useStorage'

export interface IClosestItem {
  offset: number
  element?: HTMLElement
}

interface Item {
  id: number
  status: string
}

export const useDragAndDrop = <T extends Item, S extends string>(
  initialState: T[],
  statuses: S[]
) => {
  const [isDragging, setIsDragging] = useState(false)
  const [updatedItems, setUpdatedItems] = useState(initialState)

  useEffect(() => {
    setUpdatedItems(initialState)
  }, [initialState])

  const storageHooks = statuses.map((status) => {
    const items = updatedItems.filter((item) => item?.status === status)

    return useLocalStorage(`DnD-${status}`, items)
  })

  const [listItemsByStatus, setListItemsByStatus] = useState(() =>
    statuses.reduce((acc, status, index) => {
      const [storedItems, setStoredItems, removeStoredItems] = storageHooks[index]
      acc[status] = {
        items: storedItems,
        setItems: setStoredItems,
        removeItems: removeStoredItems,
      }
      return acc
    }, {} as Record<S, { items: T[]; setItems: (value: T[] | ((val: T[]) => T[])) => void; removeItems: () => void }>)
  )

  useEffect(() => {
    const newListItemsByStatus = statuses.reduce((acc, status, index) => {
      const [storedItems, setStoredItems, removeStoredItems] = storageHooks[index]
      const items = updatedItems.filter((item) => item?.status === status)
      acc[status] = {
        items,
        setItems: setStoredItems,
        removeItems: removeStoredItems,
      }
      return acc
    }, {} as Record<S, { items: T[]; setItems: (value: T[] | ((val: T[]) => T[])) => void; removeItems: () => void }>)

    setListItemsByStatus(newListItemsByStatus)
  }, [updatedItems])

  const handleUpdate = useCallback(
    (id: number, newStatus: S, target?: number) => {
      const oldStatus = Object.keys(listItemsByStatus).find((status) =>
        listItemsByStatus[status as S].items.find((item) => item?.id === id)
      ) as S

      if (!oldStatus) return

      const card = listItemsByStatus[oldStatus as S].items.find((item) => item?.id === id)
      const targetIndex = listItemsByStatus[newStatus].items.findIndex(
        (item) => item?.id === target
      )

      if (!card) return

      // Update card status
      card.status = newStatus

      // Remove card from old status list
      const oldStatusItems = listItemsByStatus[oldStatus as S].items.filter(
        (item: T) => item.id !== id
      )
      listItemsByStatus[oldStatus as S].setItems(oldStatusItems)

      // Create a copy of the new status list
      let newStatusItems = [...listItemsByStatus[newStatus].items]

      // Remove the card from its old position in the new status list
      newStatusItems = newStatusItems.filter((item) => item.id !== card.id)

      // Insert the card at the correct position in the new status list
      newStatusItems.splice(
        targetIndex >= 0 ? targetIndex : newStatusItems.length,
        0,
        card
      )

      // Update the new status list
      listItemsByStatus[newStatus].setItems(newStatusItems)

      // Update the listItemsByStatus state
      setListItemsByStatus((prev) => ({
        ...prev,
        [oldStatus]: {
          ...prev[oldStatus],
          items: oldStatusItems,
        },
        [newStatus]: {
          ...prev[newStatus],
          items: newStatusItems,
        },
      }))

      return newStatusItems
    },
    [listItemsByStatus, setListItemsByStatus]
  )

  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  return {
    isDragging,
    listItemsByStatus,
    handleUpdate,
    handleDragging,
  }
}
