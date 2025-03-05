import {
  useState,
  useMemo,
  FormEvent,
  useEffect,
  useRef,
  lazy,
  Suspense,
  useContext,
} from 'react'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { Status, Data, Lightness } from './types'
import styles from './dragAndDrop.module.css'
import { sanitize } from '../../utils'
import { ELanguages } from '../../types'
import { useTheme } from '../../hooks/useTheme'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { notify } from '../../reducers/notificationReducer'
import { Select, SelectOption } from '../Select/Select'
import useLocalStorage from '../../hooks/useStorage'
import { LanguageContext } from '../../contexts/LanguageContext'

const CardsContainer = lazy(() => import('./components/CardsContainer'))

const initialStatuses: string[] = ['good', 'neutral', 'bad']

export const DragAndDrop = ({ language }: { language: ELanguages }) => {
  const { t } = useContext(LanguageContext)!

  const dispatch = useAppDispatch()

  const [data, setData, removeData] = useLocalStorage<Data[]>('DnD-data', [])

  const initialColors = [
    { content: 'orchid', color: 'orchid' },
    { content: 'lightgreen', color: 'lightgreen' },
    { content: 'lightsalmon', color: 'lightsalmon' },
    { content: 'lightblue', color: 'lightblue' },
    { content: 'pink', color: 'pink' },
    { content: 'turquoise', color: 'turquoise' },
    { content: 'blue', color: 'blue' },
    { content: 'crimson', color: 'crimson' },
    { content: 'yellow', color: 'yellow' },
    { content: t('EWithPurpleWrittenLast'), color: 'purple' },
    { content: t('EWithOrangeWrittenLast'), color: 'orange' },
    { content: t('ELongTextWithoutColorNameAtTheEnd'), color: 'lightgray' },
    { content: t('ESomeTextNoColorName'), color: 'lightgray' },
  ]

  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  const [userColors, setUserColors, removeUserColors] = useLocalStorage<Partial<Data>[]>(
    'DnD-userColors',
    []
  )
  const [sending, setSending] = useState<boolean>(false)
  const [statuses, setStatuses, removeStatuses] = useLocalStorage(
    `${isLocalhost ? 'local-' : ''}DnD-statuses`,
    initialStatuses
  )
  const [newStatus, setNewStatus] = useState<string>('')

  const containerRef = useRef<HTMLDivElement>(null)

  const regex = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF- ]*$/

  const storedData = statuses
    .map((status) => {
      const item = window.localStorage.getItem(
        `${isLocalhost ? 'local-' : ''}DnD-${status}`
      )
      return item ? JSON.parse(item) : []
    })
    .flat()

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
          ul.${safeStatus} li.${safeStatus} a.${safeStatus}, 
          ul.${safeStatus} li.${safeStatus} a.${safeStatus} i, 
          ul.${safeStatus} li.${safeStatus} a.${safeStatus} svg {
            cursor: auto;
            pointer-events: none;
            color: var(--color-primary-20);
          } 
          ul.${safeStatus} li a {
            padding: 0.4em 0;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            flex: 0 1 auto;
          }
          ul.${safeStatus} li a > i {
            line-height: 1;
          }
          ul.${safeStatus} li a svg {
            font-size: 0.7rem;
            min-width: 1rem;
            max-width: 1rem;
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

  const addStatus = (newStatus: string) => {
    setSending(true)
    if (regex.test(newStatus)) {
      const newStatusTrim = newStatus.trim().replace(/ /g, '_')
      if (newStatusTrim.length > 20) {
        dispatch(
          notify(`${t('ENameTooLong')}: ${t('EAMaxOf20CharactersPlease')}`, true, 9)
        )
        setSending(false)
        return
      }
      if (newStatus.trim() === '') {
        dispatch(notify(t('EPleaseFillInTheFields'), true, 6))
        setSending(false)
        return
      }
      //if new status is already in the list, notify:
      if (statuses.includes(newStatusTrim)) {
        dispatch(notify(t('ETheCategoryAlreadyExists'), true, 6))
        setSending(false)
        return
      }
      // if already length 8, don't allow more statuses
      if (statuses.length === 8) {
        dispatch(notify(t('ECannotAddMoreCategories'), true, 8))
        setSending(false)
        return
      }
      setStatuses((prevStatuses) => {
        if (newStatusTrim === '') {
          setSending(false)
          return prevStatuses
        }
        if (prevStatuses.includes(newStatusTrim)) {
          setSending(false)
          return prevStatuses
        }
        setSending(false)
        return [...prevStatuses, newStatusTrim]
      })
    } else {
      dispatch(notify(t('ESpecialCharactersNotAllowed'), true, 6))
      setSending(false)
    }
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
    if (!regex.test(newStatus)) {
      dispatch(notify(t('ESpecialCharactersNotAllowed'), true, 6))
      return
    }
    setStatuses((prevStatuses) => {
      const newStatusTrim = newStatus.trim().replace(/ /g, '_')
      if (newStatusTrim.length > 20) {
        dispatch(
          notify(`${t('ENameTooLong')}: ${t('EAMaxOf20CharactersPlease')}`, true, 9)
        )
        return prevStatuses
      }
      if (newStatusTrim === '') {
        dispatch(notify(t('EPleaseFillInTheFields'), true, 6))
        return prevStatuses
      }
      if (prevStatuses.includes(newStatusTrim)) {
        dispatch(notify(t('ETheCategoryAlreadyExists'), true, 6))
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

  const deleteStatus = (status: string) => {
    //if only one status left, don't allow removal
    if (statuses.length === 1) {
      dispatch(notify(t('ECannotRemoveLastCategory'), true, 8))
      return
    } // check if there are items with this status
    else if (data.some((d) => d.status === status)) {
      dispatch(
        notify(`${t('EAreYouSureYouWantToRemoveThis')} ${t('EItIsNotEmpty')}`, true, 8)
      )
      setStatuses((prevStatuses) => prevStatuses.filter((s) => s !== status))
      setData((prevData) => prevData.filter((d) => d.status !== status))
    } else if (window.confirm(`${t('EAreYouSureYouWantToRemoveThis')} (${status})`)) {
      setStatuses((prevStatuses) => prevStatuses.filter((s) => s !== status))
      setData((prevData) => prevData.filter((d) => d.status !== status))
    } else return
  }

  const generateInitialData = () => {
    const array: Data[] = []
    let state: Status = initialStatuses[1]
    let lightness: Lightness

    if (
      userColors &&
      userColors.length > 0 &&
      window.confirm(t('EDoYouWantToDeleteYourColorsText'))
    ) {
      removeData()
      setData([])
      removeUserColors()
      for (let i: number = 0; i < initialColors.length; i++) {
        const color = initialColors[i].color || 'lightgray'
        const content = initialColors[i].content || 'lightgray'
        lightness = determineBackgroundLightness(color)

        // Randomize the item status
        const randomIndex = Math.floor(Math.random() * statuses.length)
        state = statuses[randomIndex]

        const item: Data = {
          id: i,
          content: content,
          color: color,
          status: state,
          lightness: lightness,
        }
        array.push(item)
      }
      return array
    } else {
      removeData()
      setData([])
      for (let i: number = 0; i < userColors.length; i++) {
        const color = userColors[i].color || 'lightgray' // Use user-defined colors or default to 'lightgray'
        const content = userColors[i].content || 'lightgray' // Use user-defined colors or default to 'lightgray'
        lightness = determineBackgroundLightness(color)

        // Randomize the item status
        const randomIndex = Math.floor(Math.random() * statuses.length)
        state = statuses[randomIndex]

        const item: Data = {
          id: i,
          content: content,
          color: color,
          status: state,
          lightness: lightness,
        }
        array.push(item)
      }
      for (let i: number = userColors.length; i < initialColors.length; i++) {
        const color = initialColors[i].color || 'lightgray'
        const content = initialColors[i].content || 'lightgray'
        lightness = determineBackgroundLightness(color)

        // Randomize the item status
        const randomIndex = Math.floor(Math.random() * statuses.length)
        state = statuses[randomIndex]

        const item: Data = {
          id: i,
          content: content,
          color: color,
          status: state,
          lightness: lightness,
        }
        array.push(item)
      }
      return array
    }
  }

  const startAgain = () => {
    if (window.confirm(t('EAreYouSureYouWantToDeleteThisVersion'))) {
      removeStatuses()
      setStatuses(initialStatuses)
      setData(generateInitialData())
    }
  }

  const startAgainEmpty = () => {
    if (
      window.confirm(`${t('EAreYouSureYouWantToDeleteThisVersion')} (${t('EClear')})`)
    ) {
      if (
        userColors &&
        userColors.length > 0 &&
        window.confirm(t('EDoYouWantToDeleteYourColorsText'))
      ) {
        statuses.forEach((status) => {
          listItemsByStatus[status].removeItems()
        })
        removeStatuses()
        setStatuses(initialStatuses)
        removeData()
        setData([])
      } else {
        removeStatuses()
        setStatuses(initialStatuses)
        removeData()
        setData([])
        setData(
          userColors.map((item, index) => {
            const color = item.color || 'lightgray'
            const content = item.content || 'lightgray'
            const lightness = determineBackgroundLightness(color)
            const state = statuses[Math.floor(Math.random() * statuses.length)]
            return {
              id: index,
              content: content,
              color: color,
              status: state,
              lightness: lightness,
            }
          })
        )
      }
    }
  }

  const setTheData = useMemo(() => {
    // If data is already in localStorage, use that
    if (storedData.length > 0) {
      return storedData
    }
    const initialData = generateInitialData()
    return initialData
  }, [])

  useEffect(() => {
    setData(setTheData)
  }, [setTheData])

  const [newColor, setNewColor] = useState<string>('')
  const [newStatusForItem, setNewStatusForItem] = useState<SelectOption>({
    label: statuses[0],
    value: statuses[0],
  })

  const handleAddColor = (
    e: FormEvent,
    newColor: string,
    statusForItem: Data['status']
  ) => {
    e.preventDefault()
    setSending(true)
    if (newColor.trim() === '') {
      dispatch(notify(t('EPleaseFillInTheFields'), true, 6))
      setSending(false)
      return
    }
    // Check if there are more than one word. If the last word is a color, separate it and handle it as the color of the item:
    const words = newColor.trim().split(' ')
    const allButLastWord = words.length === 1 ? newColor : words.slice(0, -1).join(' ')
    const lastWord = words.length === 1 ? newColor : words[words.length - 1]
    const isLastWordValidColor = isValidColor(lastWord)

    if (isLastWordValidColor) {
      const highestIdInData = data.reduce(
        (acc, item) => (item.id > acc ? item.id : acc),
        0
      )
      const newItem: Data = {
        id: highestIdInData + 1,
        content: allButLastWord,
        color: lastWord,
        status: statusForItem,
        lightness: determineBackgroundLightness(newColor),
      }
      setData((prevData) => [...prevData, newItem])
      setUserColors((prevColors) => {
        const updatedColors = [
          ...prevColors,
          { content: allButLastWord, color: lastWord },
        ]
        return updatedColors
      })

      containerRef.current?.scrollIntoView({ behavior: 'smooth' })
      setSending(false)
    } else {
      if (
        window.confirm(`${t('EInvalidColorName')}: ${t('EAreYouSureYouWantToProceed')}`)
      ) {
        // If the user confirms, add the color anyway with the color lightgray and lightness light. This is to enable users to add sortable items for general use
        setUserColors((prevColors) => {
          const updatedColors = [...prevColors, { content: newColor, color: 'lightgray' }]
          const newItem: Data = {
            id: updatedColors.length - 1,
            content: newColor,
            color: 'lightgray',
            status: statusForItem,
            lightness: 'light',
          }
          setData((prevData) => [...prevData, newItem])
          return updatedColors
        })
        containerRef.current?.scrollIntoView({ behavior: 'smooth' })
        setSending(false)
      }
    }
  }
  const handleRemoveColor = (content: Data['content']) => {
    if (window.confirm(`${t('EAreYouSureYouWantToRemoveThis')} (${content})`)) {
      setData((prevData) => prevData.filter((d) => d.content !== content))
      setUserColors((prevColors) => {
        const updatedColors = prevColors.filter((c) => c.content !== content)
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
    handleDragging,
    handleRenameStatus,
    handleUpdate,
  } = useDragAndDrop(data, statuses)

  return (
    <>
      <div
        className={`${styles.grid} ${
          statuses.length < 2
            ? styles.one
            : statuses.length < 3
            ? styles.two
            : statuses?.length < 4 || statuses?.length === 5 || statuses?.length === 6
            ? styles.three
            : styles.four
        }`}
        ref={containerRef}
      >
        {statuses.map((container, index) => (
          <Suspense
            key={index}
            fallback={
              <div className='flex center margin0auto textcenter'>{t('ELoading')}...</div>
            }
          >
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
              updateStatus={updateStatus}
              reorderStatuses={reorderStatuses}
              deleteStatus={deleteStatus}
              regex={regex}
            />
          </Suspense>
        ))}
      </div>
      <div className='flex center gap max-content margin0auto'>
        <button onClick={startAgain}>{t('EReset')}</button>
        <button onClick={startAgainEmpty}>{t('EClear')}</button>
      </div>

      <div className={styles['add-color']}>
        <h2>{t('EAddAColor')}</h2>
        <p>
          {t('EForExample')} "darkblue" {t('EOr')} "slategray".{' '}
          {t('EYouMayAlsoAddOtherWordsForGenericUse')}.{' '}
          {t('ETipIfYouAddAGenericWordYouCanColorTheCard')}.{' '}
          {t('EThisWillResultInAPinkCardWithAppleWrittenOnIt')}.
        </p>
        <form
          onSubmit={(e) => handleAddColor(e, newColor, newStatusForItem.label as Status)}
        >
          <div className={`input-wrap ${styles['input-wrap']}`}>
            <label htmlFor='dnd-color-add'>
              <input
                required
                type='text'
                id='dnd-color-add'
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />
              <span>{t('EAddAColor')}</span>
            </label>
          </div>
          <Select
            language={language}
            id='dnd-color-status'
            className={`${styles['color-select']} color`}
            instructions={t('ESelectCategory')}
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
          <button type='submit' disabled={sending}>
            {t('EAddAColor')}
          </button>
        </form>
        <p className='textcenter'>
          <span>{t('ENeedHelp')} </span>{' '}
          <a href='https://htmlcolorcodes.com/color-names/' target='_blank'>
            {t('EColorNames')}
          </a>
        </p>
      </div>
      <div className={styles['add-status']}>
        <h2>{t('EAddANewCategory')}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            addStatus(newStatus)
          }}
        >
          <div className='input-wrap'>
            <label htmlFor='dnd-status-add'>
              <input
                required
                type='text'
                id='dnd-status-add'
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              />
              <span>{t('EAddANewCategory')}</span>
            </label>
          </div>
          <button type='submit' disabled={sending}>
            {t('ESubmit')}
          </button>
        </form>
      </div>
    </>
  )
}
