import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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

  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  const storageKeys = useMemo(() => {
    return statuses?.map((status) => `${isLocalhost ? 'local-' : ''}DnD-${status}`)
  }, [statuses, isLocalhost])

  const initializeListItemsByStatus = useCallback(() => {
    return statuses?.reduce((acc, status, index) => {
      const storedItems = JSON.parse(localStorage.getItem(storageKeys[index]) || '[]')
      acc[status] = {
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
              items,
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
      return acc
    }, {} as Record<S, { items: T[]; setItems: (value: T[]) => void; removeItems: () => void }>)
  }, [statuses, storageKeys])

  const deepEqual = (a: T[] | S[], b: T[] | S[]) => {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  const [listItemsByStatus, setListItemsByStatus] = useState(initializeListItemsByStatus)

  const prevUpdatedItemsRef = useRef(updatedItems)
  const prevStatusesRef = useRef(statuses)

  useEffect(() => {
    const prevUpdatedItems = prevUpdatedItemsRef.current
    const prevStatuses = prevStatusesRef.current

    // Compare previous and current values
    if (
      !deepEqual(prevUpdatedItems, updatedItems) ||
      !deepEqual(prevStatuses, statuses)
    ) {
      const newListItemsByStatus = statuses?.reduce((acc, status, index) => {
        const items = updatedItems.filter((item) => item.status === status)
        acc[status] = {
          items,
          setItems:
            listItemsByStatus[status]?.setItems ||
            ((items: T[]) => {
              localStorage.setItem(storageKeys[index], JSON.stringify(items))
              setListItemsByStatus((prev) => ({
                ...prev,
                [status]: {
                  ...prev[status],
                  items,
                },
              }))
            }),
          removeItems:
            listItemsByStatus[status]?.removeItems ||
            (() => {
              localStorage.removeItem(storageKeys[index])
              setListItemsByStatus((prev) => ({
                ...prev,
                [status]: {
                  ...prev[status],
                  items: [],
                },
              }))
            }),
        }
        return acc
      }, {} as Record<S, { items: T[]; setItems: (value: T[]) => void; removeItems: () => void }>)

      setListItemsByStatus(newListItemsByStatus)

      // Update refs with current values
      prevUpdatedItemsRef.current = updatedItems
      prevStatusesRef.current = statuses
    }
  }, [updatedItems, statuses, storageKeys])

  useEffect(() => {
    statuses?.forEach((status, index) => {
      const items = updatedItems?.filter((item) => item.status === status)
      localStorage.setItem(storageKeys[index], JSON.stringify(items))
    })
  }, [updatedItems, statuses, storageKeys])

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
      card.status = newStatus

      // Remove card from old status list
      const oldStatusItems = listItemsByStatus?.[oldStatus as S]?.items?.filter(
        (item: T) => item.id !== id
      )
      listItemsByStatus?.[oldStatus as S]?.setItems(oldStatusItems)

      // Create a copy of the new status list
      let newStatusItems = [...listItemsByStatus?.[newStatus]?.items]

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
