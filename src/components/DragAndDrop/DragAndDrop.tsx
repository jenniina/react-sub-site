import { useState, useMemo, FormEvent, useEffect, useRef } from 'react'
// import { useDragAndDrop } from './hooks/useDragAndDrop'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { Status, Data, Lightness } from './interfaces'
import { CardsContainer } from './components/CardsContainer'
import styles from './dragAndDrop.module.css'
import useRandomMinMax from '../../hooks/useRandomMinMax'
import {
  EAreYouSureYouWantToRemoveThis,
  EForExample,
  ELanguages,
  ENeedHelp,
  EReset,
  ETheCategoryAlreadyExists,
} from '../../interfaces'
import { useTheme } from '../../hooks/useTheme'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { EAddAColor, EColorNames, EInvalidColorName } from '../../interfaces/draganddrop'
import { Select, SelectOption } from '../Select/Select'
import { ESelectCategory } from '../Jokes/interfaces'
import useLocalStorage from '../../hooks/useStorage'
import { EPleaseFillInTheFields } from '../../interfaces/form'
import { EAreYouSureYouWantToDeleteThisVersion } from '../../interfaces/blobs'

const initialStatuses: string[] = ['good', 'neutral', 'bad']

export const DragAndDrop = ({ language }: { language: ELanguages }) => {
  const dispatch = useAppDispatch()

  const [data, setData] = useState<Data[]>([])

  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  const [statuses, setStatuses, removeStatuses] = useLocalStorage(
    `${isLocalhost ? 'local-' : ''}DnD-statuses`,
    initialStatuses
  )
  const containerRef = useRef<HTMLDivElement>(null)

  const storedData = statuses
    .map((status) => {
      const item = window.localStorage.getItem(
        `${isLocalhost ? 'local-' : ''}DnD-${status}`
      )
      return item ? JSON.parse(item) : []
    })
    .flat()

  const sanitize = (status: string): string => {
    return status.replace(/[^a-zA-Z0-9]/g, '-').replace(/\s+/g, '_')
  }

  // Generate and inject CSS styles whenever statuses change
  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.id = 'dnd-styles'
    document.head.appendChild(styleElement)

    // Disable the link for the current status:
    const generateStyles = (statuses: Status[]) => {
      return statuses
        .map((status) => {
          const safeStatus = sanitize(status)
          return `
          ul.${safeStatus} li.${safeStatus} a.${safeStatus} {
            cursor: auto;
            pointer-events: none;
            color: var(--color-primary-20);
          }
        `
        })
        .join('\n')
    }
    const styles = generateStyles(statuses)
    styleElement.innerHTML = styles

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [statuses])

  const colorNameToHex = (color: string) => {
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) {
      throw new Error('Canvas context not available')
    }
    ctx.fillStyle = color
    return ctx.fillStyle
  }

  const hexToRGB = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  const calculateLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    })
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  const determineBackgroundLightness = (color: string) => {
    const hexColor = color.startsWith('#') ? color : colorNameToHex(color)
    const { r, g, b } = hexToRGB(hexColor)
    const luminance = calculateLuminance(r, g, b)
    return luminance > 0.179 ? 'light' : 'dark'
  }

  const startAgain = () => {
    if (window.confirm(EAreYouSureYouWantToDeleteThisVersion[language])) {
      removeStatuses()
      setStatuses(initialStatuses)
      setUserColors(initialColors)
      setData(generateInitialData())
    }
  }

  const addStatus = (newStatus: string) => {
    setStatuses((prevStatuses) => {
      const newStatusTrim = newStatus.trim()
      if (newStatusTrim === '') {
        dispatch(notify(EPleaseFillInTheFields[language], true, 6))
        return prevStatuses
      }
      if (prevStatuses.includes(newStatusTrim)) {
        dispatch(notify(ETheCategoryAlreadyExists[language], true, 6))
        return prevStatuses
      }
      return [...prevStatuses, newStatusTrim]
    })
  }

  const reorderStatuses = (oldIndex: number, newIndex: number) => {
    setStatuses((prevStatuses) => {
      const updatedStatuses = [...prevStatuses]
      const [removed] = updatedStatuses.splice(oldIndex, 1)
      updatedStatuses.splice(newIndex, 0, removed)
      return updatedStatuses
    })
  }

  const updateStatus = (index: number, newStatus: string) => {
    setStatuses((prevStatuses) => {
      const newStatusTrim = newStatus.trim()
      if (newStatusTrim === '') {
        dispatch(notify(EPleaseFillInTheFields[language], true, 6))
        return prevStatuses
      }
      if (prevStatuses.includes(newStatusTrim)) {
        dispatch(notify(ETheCategoryAlreadyExists[language], true, 6))
        return prevStatuses
      }

      const updatedStatuses = [...prevStatuses]
      const oldStatus = updatedStatuses[index]
      updatedStatuses[index] = newStatusTrim

      // Update the data array to reflect the new status name
      setData((prevData) =>
        prevData.map((item) =>
          item.status === oldStatus ? { ...item, status: newStatusTrim } : item
        )
      )

      // Call handleRenameStatus after updating statuses
      handleRenameStatus(oldStatus, newStatusTrim)

      return updatedStatuses
    })
  }

  useEffect(() => {
    setData(setTheData)
  }, [])

  const initialColors = [
    'orchid',
    'lightgreen',
    'lightsalmon',
    'lightblue',
    'pink',
    'turquoise',
    'blue',
    'crimson',
    'red',
    'yellow',
  ]

  const [userColors, setUserColors] = useState<string[]>(initialColors)

  const generateInitialData = () => {
    const array: Data[] = []
    let state: Status = initialStatuses[1]
    let lightness: Lightness

    for (let i: number = 0; i < userColors.length; i++) {
      const color = userColors[i] || 'white' // Use user-defined colors or default to 'white'

      lightness = determineBackgroundLightness(color)

      // Randomize the item status
      const randomIndex = Math.floor(Math.random() * statuses.length)
      state = statuses[randomIndex]

      const item: Data = {
        id: i,
        content: color,
        color: color,
        status: state,
        lightness: lightness,
      }
      array.push(item)
    }
    return array
  }

  const setTheData = useMemo(() => {
    // If data is already in localStorage, use that
    if (storedData.length > 0) {
      return storedData
    }

    const initialData = generateInitialData()
    setData(initialData)
    return initialData
  }, [])

  const [newColor, setNewColor] = useState<string>('')
  const [newStatusForItem, setNewStatusForItem] = useState<SelectOption>({
    label: statuses[0],
    value: statuses[0],
  })

  const handleAddColor = (
    e: FormEvent,
    newColor: string,
    newStatusForItem: Data['status']
  ) => {
    e.preventDefault()
    if (isValidColor(newColor)) {
      setUserColors((prevColors) => {
        const updatedColors = [...prevColors, newColor]
        const newItem: Data = {
          id: updatedColors.length - 1,
          content: newColor,
          color: newColor,
          status: newStatusForItem,
          lightness: determineBackgroundLightness(newColor),
        }
        setData((prevData) => [...prevData, newItem])
        return updatedColors
      })
      containerRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      dispatch(notify(EInvalidColorName[language], true, 8))
    }
  }

  const handleRemoveColor = (color: Data['content']) => {
    if (window.confirm(`${EAreYouSureYouWantToRemoveThis[language]} (${color})`)) {
      setUserColors((prevColors) => {
        const updatedColors = prevColors.filter((c) => c !== color)
        setData((prevData) => prevData.filter((d) => d.color !== color))
        return updatedColors
      })
    } else return
  }

  const isValidColor = (color: string) => {
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) {
      throw new Error('Canvas context not available')
    }
    ctx.fillStyle = color
    return ctx.fillStyle !== '#000000' || color.toLowerCase() === 'black' // Check if the color is recognized
  }

  const lightTheme = useTheme()

  const {
    isDragging,
    listItemsByStatus,
    setListItemsByStatus,
    handleDragging,
    handleRenameStatus,
    handleUpdate,
  } = useDragAndDrop(data, statuses)

  return (
    <>
      <div className={styles.grid} ref={containerRef}>
        {statuses.map((container) => (
          <CardsContainer
            language={language}
            itemsByStatus={listItemsByStatus[container]?.items}
            status={container}
            statuses={statuses}
            key={container}
            isDragging={isDragging}
            handleDragging={handleDragging}
            handleUpdate={handleUpdate}
            handleRemoveColor={handleRemoveColor}
            lightTheme={lightTheme}
            sanitize={sanitize}
            updateStatus={updateStatus}
            reorderStatuses={reorderStatuses}
          />
        ))}
      </div>
      <button onClick={startAgain}>{EReset[language]}</button>
      <div className={styles['add-color']}>
        <h2>{EAddAColor[language]}</h2>
        <p>{EForExample[language]} darkblue or lightslategray</p>
        <form
          onSubmit={(e) => handleAddColor(e, newColor, newStatusForItem.label as Status)}
        >
          <div className='input-wrap'>
            <label htmlFor='dnd-color-add'>
              <input
                required
                type='text'
                id='dnd-color-add'
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />
              <span>{EAddAColor[language]}</span>
            </label>
          </div>
          <Select
            language={language}
            id='dnd-color-status'
            className='color'
            instructions={ESelectCategory[language]}
            hide
            options={statuses.map((status) => ({ label: status, value: status }))}
            value={newStatusForItem}
            onChange={(o) =>
              setNewStatusForItem(
                o || {
                  label: statuses[0],
                  value: statuses[0],
                }
              )
            }
          />
          <button type='submit'>{EAddAColor[language]}</button>
        </form>
        <p>
          <span>{ENeedHelp[language]} </span>{' '}
          <a href='https://htmlcolorcodes.com/color-names/' target='_blank'>
            {EColorNames[language]}
          </a>
        </p>
      </div>
    </>
  )
}
