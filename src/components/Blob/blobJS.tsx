import {
  useRef,
  useEffect,
  useState,
  useContext,
  CSSProperties,
  PointerEvent as PointerEventReact,
  MouseEvent as MouseEventReact,
  TouchEvent as TouchEventReact,
  FormEvent,
} from 'react'
import {
  Draggable,
  BackgroundColor,
  RefObject,
  focusedBlob,
  ColorPair,
  SavedBlobs,
} from './interfaces'
import { BlobContext, Props } from './components/BlobProvider'
import {
  EEdit,
  EError,
  ELanguages,
  ELogin,
  EOr,
  EPasswordsDoNotMatch,
  ERegister,
  ERegistrationSuccesful,
  ESave,
  ESavingSuccessful,
  ESpecialCharactersNotAllowed,
  ReducerProps,
} from '../../interfaces'
import {
  EAdjustBackgroundHue,
  EAdjustBackgroundLightness,
  EAdjustBackgroundSaturation,
  EAlternatively,
  EChangeLayerByClickingMe,
  EClickMeToMakeARandomBlob,
  ECloneInstructions,
  EDisableScroll,
  EEnableScroll,
  EEnlargeInstructions,
  ELayer,
  EMarkerOff,
  EMarkerOn,
  EMoveViewDown,
  EMoveViewLeft,
  EMoveViewRight,
  EMoveViewUp,
  EReleaseToChangeColorInstructions,
  ERemovalInstructions,
  EResetBlobs,
  EResetHue,
  EResetLightness,
  EResetSaturation,
  EResizebyScrollInstructions,
  ESelectedBlobNone,
  EShrinkInstructions,
  EStartSway,
  EStopSway,
  EToggleLayerByClickingMe,
  EToggleMarkerVisibilityWhenUsingAKeyboard,
  ETryDraggingTheBlobs,
  EHideControls,
  EShowControls,
  EPressHereOrEscapeToRestoreScrolling,
  ELoginToSaveBlobs,
  EInOrderToSaveTheBlobs,
  ENameYourArtwork,
  ERenameYourArtwork,
  ERename,
  ESavedArt,
  EAreYouSureYouWantToDeleteThisVersion,
  ENoteThatUnsavedChangesWillBeLost,
  EDeletedArt,
  EAVersionAlreadyExistsOverwrite,
  ENameTooLong,
  EAMaxOf30CharactersPlease,
  ELoadingSavedArtwork,
  ENoSavedArtworkYet,
  EDisableScrollInOrderToUseTheMouseWheelToResizeABlob,
} from '../../interfaces/blobs'
import {
  BiChevronsDown,
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronsUp,
} from 'react-icons/bi'
import { ImEnlarge2, ImShrink2 } from 'react-icons/im'
import { FaPlus, FaRegClone, FaSave, FaTimes } from 'react-icons/fa'
import DragContainer from './components/DragContainer'
import useWindowSize from '../../hooks/useWindowSize'
import { IUser } from '../../interfaces'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import Accordion from '../Accordion/Accordion'
import { notify } from '../../reducers/notificationReducer'
import { initializeUser } from '../../reducers/authReducer'
import { initializeUsers } from '../../reducers/usersReducer'
import { useNavigate } from 'react-router-dom'
import blobService from './services/blob'

let angle = '90deg'
let color = 'cyan'
let color1 = 'cyan'
let color2 = 'greenyellow'

const defaultLightness = '30'
const defaultSaturation = '80'
const defaultHue = '214'

export default function BlobJS({ language }: { language: ELanguages }) {
  const { state, dispatch } = useContext(BlobContext) as Props
  const dispatch2 = useAppDispatch()
  const user = useSelector((state: ReducerProps) => state.auth?.user) as IUser

  const d = 0 // for the time being, only one d is used

  const dragWrapOuter = useRef() as RefObject<HTMLDivElement>
  const dragWrap = useRef() as RefObject<HTMLDivElement>

  const selectedvalue0 = useRef() as RefObject<HTMLSpanElement>

  const stopBlobs = useRef() as RefObject<HTMLButtonElement>
  const disableScrollButton = useRef() as RefObject<HTMLButtonElement>
  const resetBlobs = useRef() as RefObject<HTMLButtonElement>

  const exitApp = useRef() as RefObject<HTMLDivElement>

  const colorBlockYellowLime0 = useRef() as RefObject<HTMLDivElement>
  const colorBlockCyanYellow0 = useRef() as RefObject<HTMLDivElement>
  const colorBlockCyanPink0 = useRef() as RefObject<HTMLDivElement>
  const colorBlockPinkYellow0 = useRef() as RefObject<HTMLDivElement>

  const colorBlockOrange = useRef() as RefObject<HTMLDivElement>
  const colorBlockRed = useRef() as RefObject<HTMLDivElement>
  const colorBlockPurple = useRef() as RefObject<HTMLDivElement>
  const colorBlockBlue = useRef() as RefObject<HTMLDivElement>

  const makeLarger0 = useRef() as RefObject<HTMLButtonElement>
  const makeSmaller0 = useRef() as RefObject<HTMLButtonElement>
  const makeMore0 = useRef() as RefObject<HTMLButtonElement>
  const deleteBlob0 = useRef() as RefObject<HTMLButtonElement>
  const makeRandom0 = useRef() as RefObject<HTMLButtonElement>

  const layerButtons0 = useRef() as RefObject<HTMLDivElement>
  const markerDivRef = useRef<HTMLDivElement>(null)

  const sliderLightnessInput = useRef() as RefObject<HTMLInputElement>
  const sliderSaturationInput = useRef() as RefObject<HTMLInputElement>
  const sliderHueInput = useRef() as RefObject<HTMLInputElement>

  const backgroundColor: BackgroundColor[][] = []

  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  const localStorageBackground = `${isLocalhost ? 'local-' : ''}BackgroundColor${[d]}`
  const localStorageDraggables = `${isLocalhost ? 'local-' : ''}Draggables${[d]}`

  backgroundColor[d] = loadBackground()

  const draggables = state.draggables as Draggable[][]

  const { windowHeight, windowWidth } = useWindowSize()

  const [layerAmount, setLayerAmount] = useState<number>(3)
  const [activeLayer, setActiveLayer] = useState<number>(0)
  const [hiddenLayers, setHiddenLayers] = useState<Set<number>>(new Set())
  const [highestZIndex, setHighestZIndex] = useState<Record<number, number>>({}) // {0: 144, 1: 146, 2: 24}
  const [colorIndex, setColorIndex] = useState(0)
  const [focusedBlob, setFocusedBlob] = useState<focusedBlob | null>(null)
  const [usingKeyboard, setUsingKeyboard] = useState(false)
  const [markerEnabled, setMarkerEnabled] = useState(true)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [scroll, setScroll] = useState<boolean>(true)
  const [hasBeenMade, setHasBeenMade] = useState<boolean>(false)
  const [paused, setPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Should be in the same order as colorBlockProps
  const colorPairs: ColorPair[] = [
    { color1: 'lemonchiffon', color2: 'pink' }, //colorBlockPinkYellow0
    { color1: 'lemonchiffon', color2: 'greenyellow' }, //colorBlockYellowLime0
    { color1: 'cyan', color2: 'greenyellow' }, //colorBlockCyanYellow0
    { color1: 'cyan', color2: 'pink' }, //colorBlockCyanPink0
    { color1: 'darkorange', color2: 'orange' }, //colorBlockOrange
    { color1: 'red', color2: 'tomato' }, //colorBlockRed
    { color1: 'magenta', color2: 'violet' }, //colorBlockPurple
    { color1: 'deepskyblue', color2: 'dodgerblue' }, //colorBlockBlue
  ]
  // Should be in the same order as colorPairs:
  const colorBlockProps = [
    colorBlockPinkYellow0,
    colorBlockYellowLime0,
    colorBlockCyanYellow0,
    colorBlockCyanPink0,
    colorBlockOrange,
    colorBlockRed,
    colorBlockPurple,
    colorBlockBlue,
  ]

  const changeBlobLayer = (draggable: Draggable, layer: number) => {
    dispatch({
      type: 'updateDraggable',
      payload: { draggable: { ...draggable, layer: layer } },
    })
    saveDraggables()
    setActiveLayer(layer)
  }

  const toggleLayerVisibility = (layer: number) => {
    setHiddenLayers((prevHiddenLayers) => {
      const newHiddenLayers = new Set(prevHiddenLayers)
      if (newHiddenLayers.has(layer)) {
        newHiddenLayers.delete(layer)
      } else {
        newHiddenLayers.add(layer)
      }
      return newHiddenLayers
    })
  }

  //Check for keyboard use for the focusedBlob marker
  useEffect(() => {
    const keydownListener = () => setUsingKeyboard(true)
    const mousedownListener = () => {
      setUsingKeyboard(false)
    }
    const handleMouseUp = () => {
      setFocusedBlob(null) // To prevent Marker from showing up after keyboard use and mouseup
    }

    window.addEventListener('keydown', keydownListener)
    window.addEventListener('mousedown', mousedownListener)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('keydown', keydownListener)
      window.removeEventListener('mousedown', mousedownListener)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  function loadDraggables(): Draggable[] | null {
    const draggablesJSON = localStorage.getItem(localStorageDraggables)
    if (
      draggablesJSON == null ||
      draggablesJSON == undefined ||
      draggablesJSON === 'undefined'
    )
      return null
    //else return JSON.parse(draggablesJSON)
    else {
      const draggables: Draggable[] = JSON.parse(draggablesJSON)
      // Ensure each draggable has a layer property
      return draggables.map((draggable) => ({
        ...draggable,
        layer: draggable.layer ?? 0,
      }))
    }
  }

  function loadBackground(): BackgroundColor[] {
    const backgroundColorJSON = localStorage.getItem(localStorageBackground)
    if (backgroundColorJSON == null) return []
    else return JSON.parse(backgroundColorJSON)
  }

  function saveBackground() {
    localStorage.setItem(localStorageBackground, JSON.stringify(backgroundColor[d]))
  }
  function saveDraggables() {
    localStorage.setItem(localStorageDraggables, JSON.stringify(draggables[d]))
  }
  const [name, setName] = useState('Blob Art')
  const [newName, setNewName] = useState(name)
  const [editName, setEditName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasSavedFiles, setHasSavedFiles] = useState(false)

  const [trackSaving, setTrackSaving] = useState(false)
  const [savedDraggablesbyD, setSavedDraggablesByD] = useState<{
    [key: number]: { [versionName: string]: SavedBlobs }
  }>({})

  // useEffect(() => {
  //   console.log('savedDraggablesbyD:', JSON.stringify(savedDraggablesbyD, null, 2))
  // }, [savedDraggablesbyD])

  const getBlobsFromServer = async () => {
    setIsLoading(true)
    try {
      if (user?._id) {
        blobService
          .getAllBlobsByUser(user?._id, d, language)
          .then((response) => {
            if (response) {
              // Initialize an empty object for sortedDraggables
              const sortedDraggables: {
                [key: number]: { [versionName: string]: SavedBlobs }
              } = {}

              // Iterate through the response and sort draggables by d
              response.forEach((item: SavedBlobs) => {
                const { d, versionName } = item
                if (!sortedDraggables[d]) {
                  sortedDraggables[d] = {}
                }
                sortedDraggables[d][versionName] = item
              })

              // Update the state with the sorted draggables
              setSavedDraggablesByD(sortedDraggables)
              setHasSavedFiles(Object.keys(sortedDraggables).length > 0)
            }
          })
          .catch((error) => {
            dispatch2(notify(`${EError[language]}: ${error.message}`, true, 8))
          })
      }
    } catch (error) {
      dispatch2(notify(EError[language], true, 8))
    } finally {
      setIsLoading(false)
    }
  }

  const checkDuplicateVersionName = (versionName: string): boolean => {
    for (const dKey in savedDraggablesbyD) {
      if (savedDraggablesbyD[dKey][versionName]) {
        return true
      }
    }
    return false
  }

  const regex = /^[\w\s\u00C0-\u024F\u1E00-\u1EFF-_]*$/

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (regex.test(value)) {
      setName(value)
    } else {
      dispatch2(notify(ESpecialCharactersNotAllowed[language], true, 8))
    }
  }

  const handleNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (regex.test(value)) {
      setNewName(value)
    } else {
      dispatch2(notify(ESpecialCharactersNotAllowed[language], true, 8))
    }
  }

  const saveBlobsToServer = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (name.trim() === '') {
        dispatch2(notify(ENameYourArtwork[language], true, 8))
        return
      } else if (name.trim().length > 30) {
        dispatch2(
          notify(
            `${ENameTooLong[language]}. ${EAMaxOf30CharactersPlease[language]}`,
            true,
            8
          )
        )
        return
      } else if (user?._id) {
        const versionName = name.trim()
        if (checkDuplicateVersionName(versionName)) {
          if (!window.confirm(EAVersionAlreadyExistsOverwrite[language])) {
            return
          }
        } else {
          blobService
            .saveBlobsByUser(
              user?._id,
              d,
              draggables[d],
              name,
              backgroundColor[d],
              language
            )
            .then(() => {
              setTrackSaving(!trackSaving)
              dispatch2(notify(ESavingSuccessful[language], false, 8))
            })
            .catch((error) => {
              dispatch2(notify(`${EError[language]}: ${error.message}`, true, 8))
            })
        }
      } else {
        dispatch2(notify(ELoginToSaveBlobs[language], true, 8))
      }
    } catch (error) {
      dispatch2(notify(EError[language], true, 8))
    }
  }

  const editBlobsByUser = async (versionName: string, newVersionName: string) => {
    const newVersion = newVersionName.trim()
    if (newVersionName.trim() === '') {
      dispatch2(notify(ENameYourArtwork[language], true, 8))
      return
    } else if (newVersionName.trim().length > 30) {
      dispatch2(
        notify(
          `${ENameTooLong[language]}. ${EAMaxOf30CharactersPlease[language]}`,
          true,
          8
        )
      )
      return
    } else {
      try {
        if (user?._id) {
          blobService
            .editBlobsByUser(
              user?._id,
              d,
              draggables[d],
              versionName,
              backgroundColor[d],
              language,
              newVersion
            )
            .then(() => {
              setTrackSaving(!trackSaving)
              dispatch2(notify(ESavingSuccessful[language], false, 8))
            })
            .catch((error) => {
              dispatch2(notify(`${EError[language]}: ${error.message}`, true, 8))
            })
        } else {
          dispatch2(notify(ELoginToSaveBlobs[language], true, 8))
        }
      } catch (error) {
        dispatch2(notify(EError[language], true, 8))
      }
    }
  }

  const loadBlobsFromServer = (d: number, versionName: string) => {
    const newVersion = versionName.trim()
    if (user?._id) {
      if (window.confirm(ENoteThatUnsavedChangesWillBeLost[language])) {
        blobService
          .getBlobsVersionByUser(user?._id, d, newVersion, language)
          .then((response) => {
            dispatch({
              type: 'setDraggablesAtD',
              payload: { d, draggables: response.draggables },
            })
            dispatch({
              type: 'setBackgroundColor',
              payload: { d, backgroundColor: response.backgroundColor },
            })
          })
          .then(() => {
            setName(newVersion)
            scrollToArt()
          })
          .catch((error) => {
            dispatch2(notify(`${EError[language]}: ${error.message}`, true, 8))
          })
      }
    }
  }

  const deleteBlobsVersionFromServer = (d: number, versionName: string) => {
    if (user._id) {
      if (window.confirm(EAreYouSureYouWantToDeleteThisVersion[language])) {
        blobService
          .deleteBlobsVersionByUser(user._id, d, versionName, language)
          .then(() => {
            dispatch2(notify(EDeletedArt[language], false, 8))
            setTrackSaving(!trackSaving)
          })
          .catch((error) => {
            dispatch2(notify(`${EError[language]}: ${error.message}`, true, 8))
          })
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch2(initializeUsers())
      await dispatch2(initializeUser())
    }
    fetchData()
  }, [dispatch2])

  useEffect(() => {
    if (user) {
      getBlobsFromServer()
    }
  }, [user, trackSaving])

  function getHighestZIndex(draggables: Draggable[]): Record<number, number> {
    return draggables.reduce((acc, draggable) => {
      const zIndex = parseInt(draggable.z, 10)
      const layer = draggable.layer
      if (!acc[layer] || zIndex > acc[layer]) {
        acc[layer] = zIndex
      }
      return acc
    }, {} as Record<number, number>)
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      const loadedDraggables = loadDraggables()
      if (loadedDraggables && loadedDraggables?.length > 0) {
        makeFromStorage(loadedDraggables)
        // dispatch({
        //   type: 'setDraggablesAtD',
        //   payload: { d, draggables: loadedDraggables },
        // })
        setHasBeenMade(true)
      } else if (loadedDraggables === null && !hasBeenMade) {
        makeAnew(amountOfBlobs)
        setHasBeenMade(true)
      }
    }, 100) // 100ms delay

    return () => clearTimeout(delay)
  }, [])

  useEffect(() => {
    if (state.draggables !== undefined && draggables[d]?.length > 0) {
      saveDraggables()
      const highestZ = getHighestZIndex(draggables[d])
      setHighestZIndex(highestZ)
    }
  }, [state.draggables])

  function makeFromStorage(blobs: Draggable[]) {
    if (backgroundColor[d]?.length > 1) {
      dragWrapOuter.current?.style.setProperty('--lightness', `${backgroundColor[d][0]}`)
      dragWrapOuter.current?.style.setProperty('--saturation', `${backgroundColor[d][1]}`)
      dragWrapOuter.current?.style.setProperty('--hue', `${backgroundColor[d][2]}`)
    }
    if (!hasBeenMade && blobs && blobs?.length > 0) {
      //dispatch({ type: 'resetBlobs', payload: {} })
      for (let i: number = 0; i < blobs?.length; i++) {
        if (blobs[i] !== null && blobs[i] !== undefined) {
          const newDraggable = {
            layer: blobs[i].layer,
            id: `${blobs[i].id}`,
            number: blobs[i].number,
            i: blobs[i].i,
            x: `${blobs[i].x}`,
            y: `${blobs[i].y}`,
            z: `${blobs[i].z}`,
            display: `${blobs[i].display}` ?? 'block',
            ariaGrabbed: false,
            draggable: true,
            tabIndex: 0,
            background: `${
              blobs[i].background ?? 'linear-gradient(90deg, cyan, greenyellow)'
            }`,
          }
          dispatch({ type: 'addDraggable', payload: { d, draggable: newDraggable } })
        }
      }
      saveDraggables()
    }
    setHasBeenMade(true)
  }

  const handleMoveLeft = () => {
    dispatch({ type: 'moveDraggablesLeft', payload: {} })
  }
  const handleMoveRight = () => {
    dispatch({ type: 'moveDraggablesRight', payload: {} })
  }
  const handleMoveUp = () => {
    dispatch({ type: 'moveDraggablesUp', payload: {} })
  }
  const handleMoveDown = () => {
    dispatch({ type: 'moveDraggablesDown', payload: {} })
  }

  function stopSway(
    e:
      | MouseEventReact<HTMLButtonElement, MouseEvent>
      | PointerEventReact<HTMLButtonElement>
  ) {
    e.preventDefault()

    if (!paused && dragWrap.current) {
      setPaused(true)
      dragWrap.current.classList.add('paused')
    } else if (paused && dragWrap.current) {
      setPaused(false)
      dragWrap.current.classList.remove('paused')
    }
  }

  useEffect(() => {
    if (prefersReducedMotion && dragWrap.current) {
      dragWrap.current.classList.add('paused')
      setPaused(true)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const listener = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [])

  const amountOfBlobs = windowWidth > 400 ? 10 : 6 // Initial amount of blobs

  const escape = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        //e.preventDefault()
        //e.stopImmediatePropagation()
        setScroll(true)
        document.body.style.overflow = 'auto'
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', escape)
    return () => {
      window.removeEventListener('keydown', escape)
    }
  }, [])

  function resetBlobsFunction(e: MouseEventReact | TouchEventReact | PointerEventReact) {
    e.preventDefault()
    window.localStorage.removeItem(localStorageDraggables)
    dispatch({ type: 'resetBlobs', payload: {} })
    dispatch({ type: 'setDraggablesAtD', payload: { d, draggables: [] } })

    makeAnew(amountOfBlobs)
  }

  const makeAnew = (amount: number) => {
    dispatch({ type: 'resetBlobs', payload: {} })
    for (let i: number = 0; i < amount; i++) {
      const colorswitch = () => {
        let number: number = Math.ceil(getRandomMinMax(0.01, 8))
        switch (number) {
          case 1:
            color1 = 'cyan'
            color2 = 'greenyellow'
            break
          case 2:
            color1 = 'lemonchiffon'
            color2 = 'greenyellow'
            break
          case 3:
            color1 = 'cyan'
            color2 = 'pink'
            break
          case 4:
            color1 = 'lemonchiffon'
            color2 = 'pink'
            break
          case 5:
            color1 = 'red'
            color2 = 'tomato'
            break
          case 6:
            color1 = 'magenta'
            color2 = 'violet'
            break
          case 7:
            color1 = 'deepskyblue'
            color2 = 'dodgerblue'
            break
          case 8:
            color1 = 'darkorange'
            color2 = 'orange'
            break
          default:
            color1 = 'cyan'
            color2 = 'greenyellow'
        }
        return [color1, color2]
      }

      const [colorFirst, colorSecond] = colorswitch()

      const newDraggable = {
        layer: activeLayer,
        id: `blob${i + 1}-${d}`,
        number: i + 1,
        i: windowWidth > 400 ? getRandomMinMax(8, 20) : getRandomMinMax(8, 10),
        x:
          windowWidth > windowHeight
            ? `${(windowWidth / 100) * getRandomMinMax(2, 70)}px`
            : `${(windowWidth / 100) * getRandomMinMax(2, 50)}px`,
        y: `${(windowHeight / 100) * getRandomMinMax(2, 60)}px`,
        z: '1',
        display: 'block',
        ariaGrabbed: false,
        draggable: true,
        tabIndex: 0,
        background: `linear-gradient(${angle ?? '90deg'}, ${colorFirst ?? 'cyan'},${
          colorSecond ?? 'greenyellow'
        })`,
      }
      dispatch({ type: 'addDraggable', payload: { d, draggable: newDraggable } })
    }
    saveDraggables()
  }

  function getRandomMinMax(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const addRandomDraggable = () => {
    const colorswitch = () => {
      let number: number = Math.ceil(getRandomMinMax(0.001, 17))

      switch (number) {
        case 1:
          color = 'cyan'
          break
        case 2:
          color = 'lemonchiffon'
          break
        case 3:
          color = 'pink'
          break
        case 4:
          color = 'lemonchiffon'
          break
        case 5:
          color = 'red'
          break
        case 6:
          color = 'magenta'
          break
        case 7:
          color = 'deepskyblue'
          break
        case 8:
          color = 'darkorange'
          break
        case 9:
          color = 'tomato'
          break
        case 10:
          color = 'violet'
          break
        case 11:
          color = 'dodgerblue'
          break
        case 12:
          color = 'greenyellow'
          break
        case 13:
          color = 'orange'
          break
        case 14:
          color = 'silver'
          break
        case 15:
          color = 'darkgray'
          break
        case 16:
          color = 'gray'
          break
        case 17:
          color = 'hotpink'
          break
        default:
          color = 'cyan'
          break
      }
      return color
    }

    const colorFirst = colorswitch()
    const colorSecond = colorswitch()

    const newDraggable = {
      layer: activeLayer,
      id: `blob${state.highestBlobNumber + 1}-${d}`,
      number: state.highestBlobNumber + 1,
      i: Math.ceil(getRandomMinMax(6.5, 10)),
      x: `${(windowWidth / 100) * getRandomMinMax(25, 55)}px`,
      y: `${(windowHeight / 100) * getRandomMinMax(2, 15)}px`,
      z: '1',
      display: 'block',
      ariaGrabbed: false,
      draggable: true,
      tabIndex: 0,
      background: `linear-gradient(${angle ?? '90deg'}, ${colorFirst ?? 'cyan'},${
        colorSecond ?? 'greenyellow'
      })`,
    }
    dispatch({ type: 'addDraggable', payload: { d, draggable: newDraggable } })
  }

  //save blob stats to localhost array
  const getPosition = (draggable: HTMLElement) => {
    const blobID = draggable.id
    const blobNumber = draggable.id.replace(/^\D+/g, '') //replace non-numbers with empty
    const blobI = window.getComputedStyle(draggable).getPropertyValue('--i')
    const blobX = window.getComputedStyle(draggable).getPropertyValue('left')
    const blobY = window.getComputedStyle(draggable).getPropertyValue('top')
    const blobZ = window.getComputedStyle(draggable).getPropertyValue('z-index')
    const blobColor1 = window.getComputedStyle(draggable).getPropertyValue('background')
    const blobDisplay = window.getComputedStyle(draggable).getPropertyValue('display')
    const layer = window.getComputedStyle(draggable).getPropertyValue('--layer')

    const blobDraggables: Draggable = {
      layer: layer ? parseInt(layer) : activeLayer,
      id: blobID,
      number: parseInt(blobNumber),
      i: parseFloat(blobI),
      x: blobX,
      y: blobY,
      z: blobZ,
      display: blobDisplay,
      ariaGrabbed: false,
      draggable: true,
      tabIndex: 0,
      background: blobColor1 ?? 'linear-gradient(90deg, cyan, greenyellow)',
    }

    dispatch({
      type: 'updateDraggable',
      payload: { draggable: blobDraggables, id: blobDraggables.id },
    })
  }

  function disableScroll() {
    if (scroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    setScroll(!scroll)
  }

  //SLIDERS

  const [slider1Val, setSlider1Val] = useState(backgroundColor[d][0] ?? defaultLightness)
  const [slider2Val, setSlider2Val] = useState(backgroundColor[d][1] ?? defaultSaturation)
  const [slider3Val, setSlider3Val] = useState(backgroundColor[d][2] ?? defaultHue)

  let lightness = slider1Val
  let saturation = slider2Val
  let hue = slider3Val

  const [dragWrapOuterLightness, setDragWrapOuterLightness] = useState<CSSProperties>(
    sliderLightnessInput.current
      ? {
          ['--lightness' as string]: `${sliderLightnessInput.current.value}`,
        }
      : {
          ['--lightness' as string]: `${slider1Val}`,
        }
  )
  const [dragWrapOuterSaturation, setDragWrapOuterSaturation] = useState<CSSProperties>(
    sliderSaturationInput.current
      ? {
          ['--saturation' as string]: `${sliderSaturationInput.current.value}`,
        }
      : {
          ['--saturation' as string]: `${slider2Val}`,
        }
  )
  const [dragWrapOuterHue, setDragWrapOuterHue] = useState<CSSProperties>(
    sliderHueInput.current
      ? {
          ['--hue' as string]: `${sliderHueInput.current.value}`,
        }
      : {
          ['--hue' as string]: `${slider3Val}`,
        }
  )

  useEffect(() => {
    const lightness: BackgroundColor = backgroundColor[d][0]
      ? backgroundColor[d][0]
      : defaultLightness
    const saturation: BackgroundColor = backgroundColor[d][1]
      ? backgroundColor[d][1]
      : defaultSaturation
    const hue: BackgroundColor = backgroundColor[d][2]
      ? backgroundColor[d][2]
      : defaultHue

    setSlider1Val(lightness ?? defaultLightness)

    setSlider2Val(saturation ?? defaultSaturation)

    setSlider3Val(hue ?? defaultHue)

    setDragWrapOuterLightness({ ['--lightness' as string]: `${lightness}` })
    setDragWrapOuterSaturation({ ['--saturation' as string]: `${saturation}` })
    setDragWrapOuterHue({ ['--hue' as string]: `${hue}` })

    backgroundColor[d][0] = lightness
    backgroundColor[d][1] = saturation
    backgroundColor[d][2] = hue

    saveBackground()
  }, [])

  function sliderLightness() {
    lightness = slider1Val
    if (dragWrapOuter.current) {
      //dragWrapOuter.style.setProperty('--lightness', `${lightness}`)
      setDragWrapOuterLightness({ ['--lightness' as string]: `${lightness}` })

      const background: BackgroundColor = lightness
      backgroundColor[d][0] = background
      saveBackground()
    }
  }
  function sliderSaturation() {
    saturation = slider2Val
    if (dragWrapOuter.current) {
      //dragWrapOuter.style.setProperty('--saturation', `${saturation}`)
      setDragWrapOuterSaturation({ ['--saturation' as string]: `${saturation}` })
      const background: BackgroundColor = saturation
      backgroundColor[d][1] = background
      saveBackground()
    }
  }
  function sliderHue() {
    hue = slider3Val
    if (dragWrapOuter.current) {
      //dragWrapOuter.style.setProperty('--hue', `${hue}`)
      setDragWrapOuterHue({ ['--hue' as string]: `${hue}` })
      const background: BackgroundColor = hue
      backgroundColor[d][2] = background
      saveBackground()
    }
  }

  //To force the sliders to update
  useEffect(() => {
    if (sliderLightnessInput.current) setSlider1Val(sliderLightnessInput.current.value)
  }, [slider1Val, sliderLightnessInput?.current?.value])

  useEffect(() => {
    if (sliderSaturationInput.current) setSlider2Val(sliderSaturationInput.current.value)
  }, [slider2Val, sliderLightnessInput?.current?.value])

  useEffect(() => {
    if (sliderHueInput.current) setSlider3Val(sliderHueInput.current.value)
  }, [slider3Val, sliderLightnessInput?.current?.value])

  function sliderLightnessReset() {
    //dragWrapOuter.current?.style.setProperty('--lightness', `${defaultLightness}`)
    setDragWrapOuterLightness({ ['--lightness' as string]: `${defaultLightness}` })
    if (sliderLightnessInput.current)
      sliderLightnessInput.current.value = defaultLightness
    setSlider1Val(defaultLightness)
  }
  function sliderSaturationReset() {
    //dragWrapOuter?.style.setProperty('--saturation', `${slider2Val}`)
    setDragWrapOuterSaturation({ ['--saturation' as string]: `${defaultSaturation}` })
    if (sliderSaturationInput.current)
      sliderSaturationInput.current.value = defaultSaturation
    setSlider2Val(defaultSaturation)
  }
  function sliderHueReset() {
    //dragWrapOuter.current?.style.setProperty('--hue', `${slider3Val}`)
    setDragWrapOuterHue({ ['--hue' as string]: `${defaultHue}` })
    if (sliderHueInput.current) sliderHueInput.current.value = defaultHue
    setSlider3Val(defaultHue)
  }
  //END SLIDERS

  useEffect(() => {
    // // Getting the width of the browser on load
    widthResize()

    // window.addEventListener('resize', widthResize)

    // return () => {
    //   window.removeEventListener('resize', widthResize)
    // }
  }, [windowWidth])

  const widthResize = () => {
    //place layer-buttons to the middle in the bottom
    if (layerButtons0.current && dragWrap.current) {
      layerButtons0.current.style.left =
        dragWrap.current.offsetWidth / 2 - layerButtons0.current.offsetWidth / 2 + 'px'
      layerButtons0.current.style.top =
        dragWrap.current.offsetHeight - layerButtons0.current.offsetHeight + 'px'
    }
    //place these items every time the window is resized
    if (makeLarger0.current && dragWrap.current)
      place(
        makeLarger0.current,
        77 - (makeLarger0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        0.5
      )

    if (colorBlockOrange.current && dragWrap.current)
      place(colorBlockOrange.current, 0, 19)
    if (colorBlockRed.current && dragWrap.current) place(colorBlockRed.current, 0, 39)
    if (colorBlockPurple.current && dragWrap.current)
      place(colorBlockPurple.current, 0, 59)
    if (colorBlockBlue.current && dragWrap.current) place(colorBlockBlue.current, 0, 79)

    if (colorBlockYellowLime0.current && dragWrap.current)
      place(
        colorBlockYellowLime0.current,
        100 -
          (colorBlockYellowLime0.current.offsetWidth / dragWrap.current?.offsetWidth) *
            100,
        19
      )
    if (colorBlockCyanYellow0.current && dragWrap.current)
      place(
        colorBlockCyanYellow0.current,
        100 -
          (colorBlockCyanYellow0.current.offsetWidth / dragWrap.current?.offsetWidth) *
            100,
        39
      )
    if (colorBlockCyanPink0.current && dragWrap.current)
      place(
        colorBlockCyanPink0.current,
        100 -
          (colorBlockCyanPink0.current.offsetWidth / dragWrap.current?.offsetWidth) * 100,
        59
      )
    if (colorBlockPinkYellow0.current && dragWrap.current)
      place(
        colorBlockPinkYellow0.current,
        100 -
          (colorBlockPinkYellow0.current.offsetWidth / dragWrap.current?.offsetWidth) *
            100,
        79
      )

    windowWidth < 330 && makeSmaller0.current && dragWrap.current
      ? place(
          makeSmaller0.current,
          95 - (makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
          93
        )
      : makeSmaller0.current && dragWrap.current
      ? place(
          makeSmaller0.current,
          77 - (makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
          93
        )
      : null
    windowWidth < 330 && deleteBlob0.current && dragWrap.current
      ? place(deleteBlob0.current, 5, 93)
      : deleteBlob0.current && dragWrap.current
      ? place(deleteBlob0.current, 23, 93)
      : null
  }
  function place(element: HTMLElement, x_pos: number, y_pos: number) {
    if (element && dragWrap.current) {
      element.style.left = (dragWrap.current.offsetWidth / 100) * x_pos + 'px'
      element.style.top = (dragWrap.current.offsetHeight / 100) * y_pos + 'px'
    }
  }

  useEffect(() => {
    if (focusedBlob) {
      if (markerDivRef.current) {
        markerDivRef.current.style.top = `${focusedBlob.top}px`
        markerDivRef.current.style.left = `${focusedBlob.left}px`
        markerDivRef.current.style.width = `${focusedBlob.width}px`
        markerDivRef.current.style.height = `${focusedBlob.height}px`
      }
    }
  }, [focusedBlob])

  const navigate = useNavigate()

  const navigateToRegister = () => {
    navigate('/portfolio/blob?register=register')
  }

  const navigateToLogin = () => {
    navigate('/portfolio/blob?login=login')
  }

  const scrollToArt = () => {
    const scrollTarget = document.getElementById(`button-container${d}`)
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <section id={`drag-container${d}`} className={`drag-container drag-container${d}`}>
        <div className={'label-container'}>
          <span id={`blobdescription${d}`} className={'scr'}>
            {ETryDraggingTheBlobs[language]}
          </span>
          <span>
            [{ELayer[language]}: {activeLayer + 1}]{' '}
          </span>
          <span ref={selectedvalue0} id={`selectedvalue${d}`} className='selectedvalue'>
            {ESelectedBlobNone[language]}
          </span>
        </div>
        <div id={`button-container${d}`} className={'button-container'}>
          <button
            ref={stopBlobs}
            id={`stop-blobs${d}`}
            className='stop-blobs'
            onClick={(e) => {
              stopSway(e)
            }}
          >
            {paused ? EStartSway[language] : EStopSway[language]}
          </button>
          <button
            ref={resetBlobs}
            id={`reset-blobs${d}`}
            className='reset-blobs'
            onClick={(e) => {
              resetBlobsFunction(e)
            }}
          >
            {EResetBlobs[language]}
          </button>
          <button
            ref={disableScrollButton}
            id={`disable-scroll${d}`}
            className='disable-scroll tooltip-wrap'
            onClick={() => {
              disableScroll()
              widthResize()
            }}
          >
            <span
              className='tooltip right below space'
              data-tooltip={
                scroll
                  ? EDisableScrollInOrderToUseTheMouseWheelToResizeABlob[language]
                  : EPressHereOrEscapeToRestoreScrolling[language]
              }
            ></span>
            {scroll ? EDisableScroll[language] : EEnableScroll[language]}
          </button>
          <button
            className='toggle-marker tooltip-wrap'
            onClick={() => setMarkerEnabled(!markerEnabled)}
          >
            <span
              className='tooltip left below space'
              data-tooltip={`${EToggleMarkerVisibilityWhenUsingAKeyboard[language]}`}
            ></span>
            {markerEnabled ? EMarkerOn[language] : EMarkerOff[language]}
          </button>
          <button
            className='toggle-controls'
            onClick={() => setControlsVisible(!controlsVisible)}
          >
            {controlsVisible ? EHideControls[language] : EShowControls[language]}
          </button>
        </div>
        <div
          ref={dragWrapOuter}
          className='drag-wrap-outer'
          style={{
            ...dragWrapOuterLightness,
            ...dragWrapOuterSaturation,
            ...dragWrapOuterHue,
          }}
        >
          <button
            ref={makeSmaller0}
            className={`make-smaller tooltip-wrap reset ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`make-smaller${d}`}
            role='tooltip'
            aria-label={`${EShrinkInstructions[language]}. ${EAlternatively[language]}: ${EResizebyScrollInstructions[language]}`}
          >
            <ImShrink2 />
            <span
              className='tooltip left above'
              data-tooltip={`${EShrinkInstructions[language]}. ${EAlternatively[language]}: ${EResizebyScrollInstructions[language]}`}
            ></span>
          </button>
          <button
            ref={makeLarger0}
            className={`make-larger tooltip-wrap reset ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`make-larger${d}`}
            role='tooltip'
            aria-label={`${EEnlargeInstructions[language]}. ${EAlternatively[language]}: ${EResizebyScrollInstructions[language]}`}
          >
            <ImEnlarge2 />
            <span
              className='tooltip left below'
              data-tooltip={`${EEnlargeInstructions[language]}. ${EAlternatively[language]}: ${EResizebyScrollInstructions[language]}`}
            ></span>
          </button>

          <button
            ref={makeMore0}
            className={`make-more tooltip-wrap reset ${!controlsVisible ? 'hidden' : ''}`}
            id={`make-more${d}`}
            role='tooltip'
            aria-label={ECloneInstructions[language]}
          >
            <FaRegClone />
            <span
              className='tooltip right below'
              data-tooltip={ECloneInstructions[language]}
            ></span>
          </button>
          <button
            ref={makeRandom0}
            className={`make-random tooltip-wrap  ${!controlsVisible ? 'hidden' : ''}`}
            id={`make-random${d}`}
            role='tooltip'
            aria-label={EClickMeToMakeARandomBlob[language]}
            onClick={() => addRandomDraggable()}
          >
            <FaPlus />
            <span
              className='tooltip left below'
              data-tooltip={EClickMeToMakeARandomBlob[language]}
            ></span>
          </button>
          <button
            ref={deleteBlob0}
            className={`delete-blob tooltip-wrap reset ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`delete-blob${d}`}
            role='tooltip'
            aria-label={ERemovalInstructions[language]}
          >
            <FaTimes />
            <span
              className='tooltip right above'
              data-tooltip={ERemovalInstructions[language]}
            ></span>
          </button>
          <div className={`movers-wrap movers-wrap1 ${!controlsVisible ? 'hidden' : ''}`}>
            <button className={`moveleft mover`} onClick={handleMoveRight}>
              <BiChevronsLeft />
              <span className='scr'>{EMoveViewLeft[language]}</span>
            </button>
            <button className={`moveright mover`} onClick={handleMoveLeft}>
              <BiChevronsRight />
              <span className='scr'>{EMoveViewRight[language]}</span>
            </button>
          </div>
          <div className={`movers-wrap movers-wrap2 ${!controlsVisible ? 'hidden' : ''}`}>
            <button className={`moveup mover`} onClick={handleMoveDown}>
              <BiChevronsUp />
              <span className='scr'>{EMoveViewUp[language]}</span>
            </button>
            <button className={`movedown mover`} onClick={handleMoveUp}>
              <BiChevronsDown />
              <span className='scr'>{EMoveViewDown[language]}</span>
            </button>
          </div>
          {markerEnabled && usingKeyboard && focusedBlob && (
            <div
              ref={markerDivRef}
              style={{
                position: 'absolute',
                top: `${focusedBlob.top}px`,
                left: `${focusedBlob.left}px`,
                width: `${focusedBlob.width}px`,
                height: `${focusedBlob.height}px`,
                outline: '3px dashed black',
                outlineOffset: '2px',
                border: '3px dashed white',
                borderRadius: '50%',
                zIndex: 1000,
              }}
            />
          )}

          <div ref={dragWrap} className='drag-wrap'>
            <DragContainer
              layerAmount={layerAmount}
              layer={activeLayer}
              hiddenLayers={hiddenLayers}
              changeBlobLayer={changeBlobLayer}
              setActiveLayer={setActiveLayer}
              paused={paused}
              setPaused={setPaused}
              prefersReducedMotion={prefersReducedMotion}
              highestZIndex={highestZIndex}
              setHighestZIndex={setHighestZIndex}
              language={language}
              dispatch={dispatch}
              d={d}
              items={draggables[d] ?? []}
              amountOfBlobs={amountOfBlobs}
              saveDraggables={saveDraggables}
              getPosition={getPosition}
              colorBlockProps={colorBlockProps}
              colorBlockOrange={colorBlockOrange}
              colorBlockRed={colorBlockRed}
              colorBlockPurple={colorBlockPurple}
              colorBlockBlue={colorBlockBlue}
              colorBlockYellowLime0={colorBlockYellowLime0}
              colorBlockCyanYellow0={colorBlockCyanYellow0}
              colorBlockCyanPink0={colorBlockCyanPink0}
              colorBlockPinkYellow0={colorBlockPinkYellow0}
              makeLarger0={makeLarger0}
              makeSmaller0={makeSmaller0}
              makeMore0={makeMore0}
              deleteBlob0={deleteBlob0}
              dragWrap={dragWrap}
              exitApp={exitApp}
              selectedvalue0={selectedvalue0}
              draggables={draggables}
              dragWrapOuter={dragWrapOuter}
              stopBlobs={stopBlobs}
              disableScrollButton={disableScrollButton}
              resetBlobs={resetBlobs}
              sliderLightnessInput={sliderLightnessInput}
              sliderSaturationInput={sliderSaturationInput}
              sliderHueInput={sliderHueInput}
              getRandomMinMax={getRandomMinMax}
              focusedBlob={focusedBlob}
              setFocusedBlob={setFocusedBlob}
              colorIndex={colorIndex}
              setColorIndex={setColorIndex}
              colorPairs={colorPairs}
              scroll={scroll}
              setScroll={setScroll}
              clickOutsideRef={dragWrap}
            />
          </div>

          <div
            className={`layer-buttons ${!controlsVisible ? 'hidden' : ''}`}
            ref={layerButtons0}
          >
            {Array.from({ length: layerAmount }, (_, i) => i).map((layer) => (
              <button
                key={layer}
                onClick={() => {
                  if (activeLayer === layer) {
                    toggleLayerVisibility(layer)
                  } else {
                    setActiveLayer(layer)
                  }
                }}
                className={`layer-button tooltip-wrap ${
                  activeLayer === layer ? 'active' : ''
                } ${hiddenLayers.has(layer) ? 'dim' : ''}`}
              >
                <span
                  className='tooltip above right'
                  data-tooltip={
                    activeLayer === layer
                      ? EToggleLayerByClickingMe[language]
                      : EChangeLayerByClickingMe[language]
                  }
                ></span>
                <span className='scr'>{ELayer[language]}</span> {layer + 1}
              </button>
            ))}
          </div>
          <div
            ref={colorBlockOrange}
            className={`colorblock color-orange tooltip-wrap ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`color-orange${d}`}
          >
            <span
              className='tooltip right above'
              data-tooltip={EReleaseToChangeColorInstructions[language]}
            ></span>
          </div>
          <div
            ref={colorBlockRed}
            className={`colorblock color-red tooltip-wrap ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`color-red${d}`}
          >
            <span
              className='tooltip right above'
              data-tooltip={EReleaseToChangeColorInstructions[language]}
            ></span>
          </div>
          <div
            ref={colorBlockPurple}
            className={`colorblock color-purple tooltip-wrap ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`color-purple${d}`}
          >
            <span
              className='tooltip right above'
              data-tooltip={EReleaseToChangeColorInstructions[language]}
            ></span>
          </div>
          <div
            ref={colorBlockBlue}
            className={`colorblock color-blue tooltip-wrap  ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`color-blue${d}`}
          >
            <span
              className='tooltip right above'
              data-tooltip={EReleaseToChangeColorInstructions[language]}
            ></span>
          </div>
          <div
            ref={colorBlockYellowLime0}
            className={`colorblock color-yellowlime tooltip-wrap ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`color-yellowlime${d}`}
          >
            <span
              className='tooltip left above'
              data-tooltip={EReleaseToChangeColorInstructions[language]}
            ></span>
          </div>
          <div
            ref={colorBlockCyanYellow0}
            className={`colorblock color-cyanyellow tooltip-wrap ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`color-cyanyellow${d}`}
          >
            <span
              className='tooltip left above'
              data-tooltip={EReleaseToChangeColorInstructions[language]}
            ></span>
          </div>
          <div
            ref={colorBlockCyanPink0}
            className={`colorblock color-cyanpink tooltip-wrap ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`color-cyanpink${d}`}
          >
            <span
              className='tooltip left above'
              data-tooltip={EReleaseToChangeColorInstructions[language]}
            ></span>
          </div>
          <div
            ref={colorBlockPinkYellow0}
            className={`colorblock color-pinkyellow tooltip-wrap ${
              !controlsVisible ? 'hidden' : ''
            }`}
            id={`color-pinkyellow${d}`}
          >
            <span
              className='tooltip left above'
              data-tooltip={EReleaseToChangeColorInstructions[language]}
            ></span>
          </div>
        </div>
        <div className='drag-slider-wrap'>
          <label htmlFor={`drag-slider-lightness${d}`} id={`lightnessdescription${d}`}>
            {EAdjustBackgroundLightness[language]}
          </label>
          <input
            ref={sliderLightnessInput}
            onChange={(e) => {
              setSlider1Val(e.target.value)
              sliderLightness()
            }}
            onMouseUp={(e) => {
              setSlider1Val((e.target as HTMLInputElement).value)
              sliderLightness()
            }}
            onPointerUp={(e) => {
              setSlider1Val((e.target as HTMLInputElement).value)
              sliderLightness()
            }}
            type='range'
            min={0}
            max={100}
            defaultValue={slider1Val}
            className='drag-slider drag-slider-lightness'
            id={`drag-slider-lightness${d}`}
          />
          <span>{slider1Val}</span>

          <button
            onClick={() => {
              setSlider1Val(defaultLightness)
              sliderLightnessReset()
            }}
          >
            {EResetLightness[language]}
          </button>
        </div>
        <div className='drag-slider-wrap'>
          <label htmlFor={`drag-slider-saturation${d}`} id={`saturationdescription${d}`}>
            {EAdjustBackgroundSaturation[language]}
          </label>
          <input
            ref={sliderSaturationInput}
            onChange={(e) => {
              setSlider2Val(e.target.value)
              sliderSaturation()
            }}
            onMouseUp={(e) => {
              setSlider2Val((e.target as HTMLInputElement).value)
              sliderSaturation()
            }}
            onPointerUp={(e) => {
              setSlider2Val((e.target as HTMLInputElement).value)
              sliderSaturation()
            }}
            type='range'
            min={0}
            max='100'
            defaultValue={slider2Val}
            className='drag-slider drag-slider-saturation'
            id={`drag-slider-saturation${d}`}
          />
          <span>{slider2Val}</span>
          <button
            onClick={() => {
              setSlider2Val(defaultSaturation)
              sliderSaturationReset()
            }}
          >
            {EResetSaturation[language]}
          </button>
        </div>
        <div className='drag-slider-wrap'>
          <label htmlFor={`drag-slider-hue${d}`} id={`huedescription${d}`}>
            {EAdjustBackgroundHue[language]}
          </label>
          <input
            ref={sliderHueInput}
            onChange={(e) => {
              setSlider3Val(e.target.value)
              sliderHue()
            }}
            onMouseUp={(e) => {
              setSlider3Val((e.target as HTMLInputElement).value)
              sliderHue()
            }}
            onPointerUp={(e) => {
              setSlider3Val((e.target as HTMLInputElement).value)
              sliderHue()
            }}
            type='range'
            min={0}
            max='359'
            defaultValue={slider3Val}
            className='drag-slider drag-slider-hue'
            id={`drag-slider-hue${d}`}
          />
          <span>{slider3Val}</span>
          <button
            onClick={() => {
              setSlider3Val(defaultHue)
              sliderHueReset()
            }}
          >
            {EResetHue[language]}
          </button>
        </div>
        <div ref={exitApp} id={`exitblob${d}`} className='exitblob' role='dialog'></div>
        {user ? (
          <div className='blob-handling'>
            <div className='full wide flex column center gap'>
              <form onSubmit={(e) => saveBlobsToServer(e)}>
                <div className='input-wrap'>
                  <label htmlFor='blobname'>
                    <input
                      id='blobname'
                      type='text'
                      value={name}
                      onChange={handleNameChange}
                      placeholder={ENameYourArtwork[language]}
                      maxLength={30}
                    />
                    <span>{ENameYourArtwork[language]}:</span>
                  </label>
                </div>
                <button type='submit'>{ESave[language]}</button>
              </form>
            </div>
            <h2>{ESavedArt[language]}</h2>
            {isLoading ? (
              <p>{ELoadingSavedArtwork[language]}</p>
            ) : !hasSavedFiles ? (
              <p>{ENoSavedArtworkYet[language]}</p>
            ) : (
              Object.keys(savedDraggablesbyD).map((dKey) => (
                <ul key={dKey} className='blob-versions-wrap'>
                  {Object.keys(savedDraggablesbyD[Number(dKey)]).map((versionName) => (
                    <li key={versionName} className='blob-version-item'>
                      <span>{versionName}</span>
                      <div className='button-wrap'>
                        <button
                          onClick={() => loadBlobsFromServer(Number(dKey), versionName)}
                        >
                          Load
                        </button>
                        <button
                          onClick={() =>
                            deleteBlobsVersionFromServer(Number(dKey), versionName)
                          }
                        >
                          Delete
                        </button>
                        <Accordion
                          language={language}
                          id={`accordion-blobnewname-${versionName.replace(/\s/g, '-')}`}
                          className='blobnewname'
                          text={ERename[language]}
                          hideBrackets={true}
                          onClick={() => {
                            setNewName(versionName)
                            setEditName(versionName)
                          }}
                          isOpen={editName === versionName}
                        >
                          <div className='input-wrap'>
                            <label
                              htmlFor={`blobnewname-${versionName.replace(/\s/g, '-')}`}
                            >
                              <input
                                id={`blobnewname-${versionName.replace(/\s/g, '-')}`}
                                type='text'
                                value={newName}
                                onChange={handleNewNameChange}
                                placeholder={ERenameYourArtwork[language]}
                                maxLength={30}
                              />
                              <span>{ERename[language]}:</span>
                            </label>
                          </div>
                          <button
                            onClick={() => {
                              if (versionName !== newName) {
                                editBlobsByUser(versionName, newName)
                              } else
                                dispatch2(
                                  notify(
                                    `${EError[language]}: ${ERenameYourArtwork[language]}`,
                                    true,
                                    5
                                  )
                                )
                            }}
                          >
                            {EEdit[language]}
                          </button>
                        </Accordion>
                      </div>
                    </li>
                  ))}
                </ul>
              ))
            )}
          </div>
        ) : (
          <div className='wide flex column center gap'>
            <div className='login-to-save wide flex column center gap-half'>
              <FaSave />
              {EInOrderToSaveTheBlobs[language]}
            </div>
            <div className={`blob-register-login-wrap`}>
              <button onClick={navigateToLogin}>{ELogin[language]}</button>
              <big>{EOr[language]}</big>
              <button onClick={navigateToRegister}>{ERegister[language]}</button>
            </div>
          </div>
        )}
      </section>

      <svg className='filter'>
        <filter id='svgfilter'>
          <feGaussianBlur in='SourceGraphic' stdDeviation='5'></feGaussianBlur>
          <feColorMatrix
            values='
1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 37 -14
'
          ></feColorMatrix>
        </filter>
      </svg>
    </>
  )
}
