import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useLocalStorage from '../hooks/useStorage'

export interface IClosestItem {
  offset: number
  element?: HTMLElement
}

interface Item {
  id: number
  status: string
}
interface ListItemsByStatus<S extends string, T extends Item> {
  [key: string]: {
    items: T[]
    setItems: (items: T[]) => void
    removeItems: () => void
  }
}
export const useDragAndDrop = <T extends Item, S extends string>(
  initialState: T[],
  statuses: S[]
) => {
  const [isDragging, setIsDragging] = useState(false)

  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  const storageKeys = useMemo(() => {
    return statuses?.map((status) => `${isLocalhost ? 'local-' : ''}DnD-${status}`)
  }, [statuses, isLocalhost])

  const initializeListItemsByStatus = useCallback(() => {
    const initialList: ListItemsByStatus<S, T> = {}
    statuses.forEach((status, index) => {
      const storedItems = JSON.parse(
        localStorage.getItem(storageKeys[index]) || '[]'
      ) as T[]
      initialList[status] = {
        items:
          storedItems.length > 0
            ? storedItems
            : initialState.filter((item) => item.status === status),
        setItems: (items: T[]) => {
          localStorage.setItem(storageKeys[index], JSON.stringify(items))
          setListItemsByStatus((prev) => ({
            ...prev,
            [status]: {
              ...prev[status],
              items: [...items],
            },
          }))
        },
        removeItems: () => {
          localStorage.removeItem(storageKeys[index])
          setListItemsByStatus((prev) => ({
            ...prev,
            [status]: {
              ...prev[status],
              items: [],
            },
          }))
        },
      }
    })
    return initialList
  }, [statuses, storageKeys, initialState])

  const deepEqual = (a: T | S, b: T | S) => {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  const [listItemsByStatus, setListItemsByStatus] = useState(initializeListItemsByStatus)

  useEffect(() => {
    setListItemsByStatus((prev) => {
      const updatedList: ListItemsByStatus<S, T> = { ...prev }

      statuses.forEach((status, index) => {
        const existingItems = prev[status]?.items || []
        const initialStatusItems = initialState.filter((item) => item.status === status)

        // Create a map for easy lookup
        const initialItemsMap = new Map(initialStatusItems.map((item) => [item.id, item]))

        // Update existing items if content has changed
        const updatedExistingItems = existingItems.map((item) => {
          const initialItem = initialItemsMap.get(item.id)
          return initialItem && !deepEqual(item, initialItem) ? initialItem : item
        })

        // Identify new items to add
        const existingIds = new Set(existingItems.map((item) => item.id))
        const newItems = initialStatusItems.filter((item) => !existingIds.has(item.id))

        // Update the list with modified and new items
        updatedList[status].items = [...updatedExistingItems, ...newItems]
        updatedList[status].setItems(updatedList[status].items)
      })

      return updatedList
    })
  }, [initialState, statuses])

  useEffect(() => {
    statuses?.forEach((status, index) => {
      const items = listItemsByStatus[status]?.items || []
      localStorage.setItem(storageKeys[index], JSON.stringify(items))
    })
  }, [statuses, storageKeys])

  const handleUpdate = useCallback(
    (id: number, newStatus: S, target?: number) => {
      const oldStatus = Object.keys(listItemsByStatus)?.find((status) =>
        listItemsByStatus?.[status as S]?.items?.find((item) => item?.id === id)
      ) as S

      if (!oldStatus) return

      const card = listItemsByStatus?.[oldStatus as S]?.items?.find(
        (item) => item?.id === id
      )
      const targetIndex = listItemsByStatus?.[newStatus]?.items?.findIndex(
        (item) => item?.id === target
      )

      if (!card) return

      // Update card status
      const updatedCard = { ...card, status: newStatus }

      // Remove card from old status list
      const oldStatusItems = listItemsByStatus?.[oldStatus as S]?.items?.filter(
        (item: T) => item.id !== id
      )
      listItemsByStatus?.[oldStatus as S]?.setItems(oldStatusItems)

      // Create a copy of the new status list
      let newStatusItems = [...listItemsByStatus?.[newStatus]?.items]

      if (target !== undefined) {
        const targetIndex = newStatusItems.findIndex((item) => item.id === target)
        const insertIndex = targetIndex >= 0 ? targetIndex : newStatusItems.length
        newStatusItems.splice(insertIndex, 0, updatedCard)
      } else {
        newStatusItems.push(updatedCard)
      }
      // Remove the card from its old position in the new status list
      newStatusItems = newStatusItems.filter((item) => item.id !== card.id)

      // Insert the card at the correct position in the new status list
      newStatusItems.splice(
        targetIndex >= 0 ? targetIndex : newStatusItems.length,
        0,
        card
      )

      // Update the new status list
      listItemsByStatus?.[newStatus]?.setItems(newStatusItems)

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

  const handleRenameStatus = useCallback(
    (oldStatus: S, newStatus: S) => {
      if (oldStatus === newStatus) return

      const oldStatusIndex = statuses?.indexOf(oldStatus)

      if (oldStatusIndex === -1) {
        console.error(`Old status "${oldStatus}" not found in statuses array`)
        return
      }

      // Get the old and new storage keys
      const oldStorageKey = storageKeys[oldStatusIndex]
      const newStorageKey = `${isLocalhost ? 'local-' : ''}DnD-${newStatus}`

      // Update items' status
      const updatedItems = listItemsByStatus[oldStatus].items.map((item) => ({
        ...item,
        status: newStatus,
      }))

      // Update state
      setListItemsByStatus((prev) => ({
        ...prev,
        [oldStatus]: {
          ...prev[oldStatus],
          items: [],
        },
        [newStatus]: {
          ...prev[newStatus],
          items: updatedItems,
        },
      }))

      // Update local storage
      localStorage.setItem(newStorageKey, JSON.stringify(updatedItems))
      localStorage.removeItem(oldStorageKey)
    },
    [listItemsByStatus, storageKeys, statuses]
  )

  const handleDragging = (dragging: boolean) => setIsDragging(dragging)

  return {
    isDragging,
    listItemsByStatus,
    handleUpdate,
    handleRenameStatus,
    handleDragging,
  }
}
