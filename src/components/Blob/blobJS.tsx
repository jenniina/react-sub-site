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
  Fragment,
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
  EAreYouSureYouWantToProceed,
  EDownload,
  EEdit,
  EError,
  EErrorConnectingToTheServer,
  ELanguages,
  ELoad,
  ELogin,
  ENext,
  EOr,
  EPage,
  EPrevious,
  ERegister,
  EReset,
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
  EArtSaved,
  EAreYouSureYouWantToDeleteThisVersion,
  ENoteThatUnsavedChangesWillBeLost,
  EDeletedArt,
  EAVersionAlreadyExistsOverwrite,
  ENameTooLong,
  EAMaxOf30CharactersPlease,
  ELoadingSavedArtwork,
  ENoSavedArtworkYet,
  EDisableScrollInOrderToUseTheMouseWheelToResizeABlob,
  EClickHereToTakeAScreenshot,
  EScreenshotTaken,
  EScreenshot,
  EIncreaseBlobLayerBy1Instructions,
  EDecreaseBlobLayerBy1Instructions,
  ENoScreenshotAvailableToSave,
  EYouMayFindTheImageBelow,
  EKeyboardUsePressTheCorrespondingLayerNumber,
  EMoreColorsAvailable,
  ECannotLowerEveryBlobFurther,
  EClickHereToMoveUpLayer,
  EClickHereToMoveDownLayer,
  EArt,
  EGetMoreLayers,
  EDeleteHiddenLayers,
  EMaximumLayerAmountReached,
  EMustHaveAtLeastOneLayer,
  ELayerNotEmpty,
  ECannotRaiseEveryBlobFurther,
  ELayerHidden,
} from '../../interfaces/blobs'
import {
  BiChevronDown,
  BiChevronsDown,
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronsUp,
  BiChevronUp,
  BiMinus,
  BiPlus,
} from 'react-icons/bi'
import { ImEnlarge2, ImShrink2 } from 'react-icons/im'
import { FaCamera, FaPlus, FaRegClone, FaSave, FaTimes } from 'react-icons/fa'
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
import { BsFillCameraFill } from 'react-icons/bs'
import { ELoading } from '../Todo/interfaces'
import { EDelete } from '../Jokes/interfaces'
import React from 'react'
import { save } from '../Jokes/reducers/jokeReducer'

let angle = '90deg'
let color = 'cyan'
let color1 = 'cyan'
let color2 = 'greenyellow'

const defaultLightness = '30'
const defaultSaturation = '80'
const defaultHue = '214'

const defaultLayerAmount = 3

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

const preventDefault = (e: Event) => {
  e.preventDefault()
}

export default function BlobJS({ language }: { language: ELanguages }) {
  const { state, dispatch } = useContext(BlobContext) as Props
  const dispatch2 = useAppDispatch()
  const user = useSelector((state: ReducerProps) => state.auth?.user) as IUser
  const users = useSelector((state: ReducerProps) => state.users) as IUser[]

  const d = 0 // for the time being, only one d is used

  const dragWrapOuter = useRef() as RefObject<HTMLDivElement>
  const dragWrap = useRef() as RefObject<HTMLDivElement>

  const selectedvalue0 = useRef() as RefObject<HTMLSpanElement>

  const stopBlobs = useRef() as RefObject<HTMLButtonElement>
  const disableScrollButton = useRef() as RefObject<HTMLButtonElement>
  const resetBlobs = useRef() as RefObject<HTMLButtonElement>
  const blobScreenshot = useRef() as RefObject<HTMLDivElement>
  const screenshotImg = useRef() as RefObject<HTMLImageElement>
  const [loading, setLoading] = useState(false)

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

  const layerIncrease = useRef() as RefObject<HTMLButtonElement>
  const layerDecrease = useRef() as RefObject<HTMLButtonElement>

  const markerDivRef = useRef<HTMLDivElement>(null)

  const sliderLightnessInput = useRef() as RefObject<HTMLInputElement>
  const sliderSaturationInput = useRef() as RefObject<HTMLInputElement>
  const sliderHueInput = useRef() as RefObject<HTMLInputElement>

  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  const localStorageLayerAmount = `${isLocalhost ? 'local-' : ''}BlobLayerAmount`
  const localStorageBackground = `${isLocalhost ? 'local-' : ''}BackgroundColor${[d]}`
  const localStorageDraggables = `${isLocalhost ? 'local-' : ''}Draggables${[d]}`

  const backgroundColor = state.backgroundColor as BackgroundColor[]

  //loadBackground()

  const draggables = state.draggables as Draggable[][]

  const { windowHeight, windowWidth } = useWindowSize()

  // const [layerAmount, setLayerAmount] = useLocalStorage<number>(
  //   'blobLayerAmount',
  //   state.draggables[d]?.length > 0 ? Math.max(...state.draggables[d].map((d) => d.layer)) + 1 : defaultLayerAmount
  // )

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
    const z = highestZIndex[layer] + 1
    dispatch({
      type: 'updateDraggable',
      payload: { d, draggable: { ...draggable, layer, z } },
    })
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
    const keyupListener = () => setUsingKeyboard(true)
    const mousedownListener = () => {
      setUsingKeyboard(false)
    }
    const handleMouseUp = () => {
      setFocusedBlob(null) // To prevent Marker from showing up after keyboard use and mouseup
    }

    window.addEventListener('keyup', keyupListener)
    window.addEventListener('mousedown', mousedownListener)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('keyup', keyupListener)
      window.removeEventListener('mousedown', mousedownListener)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  function loadDraggables(): Promise<Draggable[] | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const draggablesJSON = localStorage.getItem(localStorageDraggables)
        if (
          draggablesJSON == null ||
          draggablesJSON == undefined ||
          draggablesJSON === 'undefined'
        ) {
          resolve(null)
        } else {
          const draggables: Draggable[] = JSON.parse(draggablesJSON)
          // Ensure each draggable has a layer property
          resolve(
            draggables.map((draggable) => ({
              ...draggable,
              layer: draggable.layer ?? 0,
            }))
          )
        }
      }, 300)
    })
  }

  function loadLayerAmount(): number {
    //first check if draggables[d] has blobs, then find the highest layer. If there are no find the local storage value, finally if there is no local storage value, return the default value
    if (draggables[d]?.length > 0) {
      return Math.max(...draggables[d].map((d) => d.layer)) + 1
    } else {
      const layerAmount = localStorage.getItem(localStorageLayerAmount)
      if (layerAmount == null) return defaultLayerAmount
      else return parseInt(layerAmount)
    }
  }

  function loadBackground(): Promise<BackgroundColor[] | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const backgroundColorJSON = localStorage.getItem(localStorageBackground)
        if (
          backgroundColorJSON == null ||
          backgroundColorJSON == undefined ||
          backgroundColorJSON === 'undefined'
        ) {
          resolve(null)
        } else {
          resolve(JSON.parse(backgroundColorJSON))
        }
      }, 300)
    })
  }

  function saveLayerAmount() {
    localStorage.setItem(localStorageLayerAmount, JSON.stringify(layerAmount))
  }
  function saveBackground(bg: BackgroundColor[] = backgroundColor) {
    localStorage.setItem(localStorageBackground, JSON.stringify(bg))
  }
  function saveDraggables(blob: Draggable[] = draggables[d]) {
    localStorage.setItem(localStorageDraggables, JSON.stringify(blob))
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

  const [layerAmount, setLayerAmount] = useState<number>(loadLayerAmount())

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

              // // Update the state with the sorted draggables
              // setLayerAmount(
              //   Math.max(
              //     ...Object.values(sortedDraggables).map((d) => {
              //       return Math.max(
              //         ...Object.values(d).map((version) => {
              //           return version.draggables.length > 0
              //             ? Math.max(...version.draggables.map((d) => d.layer))
              //             : 0
              //         })
              //       )
              //     })
              //   ) + 1
              // )
              // setTimeout(() => {
              //   saveLayerAmount()
              // }, 300)
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

  //draggable[d] highest layer:
  // console.log('highest layer:', Math.max(...draggables[d].map((d) => d.layer)))

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
        }
        blobService
          .saveBlobsByUser(user?._id, d, draggables[d], name, backgroundColor, language)
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
              backgroundColor,
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
          .then((response: SavedBlobs) => {
            const highestLayerInDraggables = Math.max(
              ...response.draggables.map((draggable: Draggable) => draggable.layer)
            )
            setLayerAmount(highestLayerInDraggables + 1)
            setTimeout(() => {
              saveLayerAmount()
            }, 300)
            dispatch({
              type: 'setDraggablesAtD',
              payload: { d, draggables: response.draggables },
            })
            dispatch({
              type: 'setBackgroundColor',
              payload: { d, backgroundColor: response.backgroundColor },
            })
            saveBackground(response.backgroundColor)
          })
          .then(() => {
            setName(newVersion)
            scrollToArt()

            setTimeout(() => {
              widthResize()
            }, 300)
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
    const load = async () => {
      const loadedDraggables = await loadDraggables()
      const loadedBackgroundColor = await loadBackground()
      const delay = setTimeout(async () => {
        if (loadedBackgroundColor) {
          dispatch({
            type: 'setBackgroundColor',
            payload: { d, backgroundColor: loadedBackgroundColor },
          })
          saveBackground(loadedBackgroundColor)

          setSliderLightVal(loadedBackgroundColor[0])
          setSliderSatVal(loadedBackgroundColor[1])
          setSliderHueVal(loadedBackgroundColor[2])

          dragWrapOuter.current?.style.setProperty(
            '--lightness',
            `${loadedBackgroundColor[0]}`
          )
          dragWrapOuter.current?.style.setProperty(
            '--saturation',
            `${loadedBackgroundColor[1]}`
          )
          dragWrapOuter.current?.style.setProperty('--hue', `${loadedBackgroundColor[2]}`)
        } else {
          dispatch({
            type: 'setBackgroundColor',
            payload: {
              d,
              backgroundColor: [defaultLightness, defaultSaturation, defaultHue],
            },
          })
          saveBackground([defaultLightness, defaultSaturation, defaultHue])
        }
        if (loadedDraggables && loadedDraggables.length > 0) {
          if (loadedDraggables && loadedDraggables.length > 0) {
            makeFromStorage(loadedDraggables)
          }

          // dispatch({
          //   type: 'setDraggablesAtD',
          //   payload: { d, draggables: loadedDraggables },
          // })
          setHasBeenMade(true)
        } else if (
          (loadedDraggables === null || loadedDraggables === undefined) &&
          !hasBeenMade
        ) {
          makeAnew(amountOfBlobs)
          setHasBeenMade(true)
        }
      }, 300) // 300ms delay
      return () => clearTimeout(delay)
    }
    load()
  }, [])

  useEffect(() => {
    if (draggables[d] !== undefined && draggables[d]?.length > 0) {
      saveDraggables()
      const highestZ = getHighestZIndex(draggables[d])
      setHighestZIndex(highestZ)
    }
  }, [draggables[d]])

  function makeFromStorage(blobs: Draggable[]) {
    if (backgroundColor) {
      dragWrapOuter.current?.style.setProperty('--lightness', `${backgroundColor[0]}`)
      dragWrapOuter.current?.style.setProperty('--saturation', `${backgroundColor[1]}`)
      dragWrapOuter.current?.style.setProperty('--hue', `${backgroundColor[2]}`)
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
            background: `${
              blobs[i].background ?? 'linear-gradient(90deg, cyan, greenyellow)'
            }`,
          }
          dispatch({ type: 'addDraggable', payload: { d, draggable: newDraggable } })
        }
      }

      setLayerAmount(Math.max(...blobs.map((d) => d.layer)) + 1)
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

  const amountOfBlobs = windowWidth > 700 ? 10 : 6 // Initial amount of blobs

  const escape = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        //e.preventDefault()
        //e.stopImmediatePropagation()
        setScroll(true)
        document.body.style.overflowY = 'auto'
        document.body.style.overflowX = 'hidden'
        break
    }
  }
  useEffect(() => {
    window.addEventListener('keyup', escape)
    return () => {
      window.removeEventListener('keyup', escape)
    }
  }, [])

  // Change every blob's layer by plus or minus one, unless any blob is already on the highest or lowest layer
  const changeEveryLayer = (amount: number) => {
    const isAnyOnLowestLayer = draggables[d].some(
      (draggable) => draggable.layer === 0 && amount < 0
    )
    const isAnyOnHighestLayer = draggables[d].some(
      (draggable) => draggable.layer === layerAmount - 1 && amount > 0
    )

    if (isAnyOnLowestLayer) {
      dispatch2(notify(ECannotLowerEveryBlobFurther[language], true, 8))
      return
    }

    if (isAnyOnHighestLayer) {
      dispatch2(notify(ECannotRaiseEveryBlobFurther[language], true, 8))
      return
    }

    const newDraggables = draggables[d].map((draggable) => {
      const layer = draggable.layer + amount
      if (layer >= 0 && layer < layerAmount) {
        return { ...draggable, layer }
      } else {
        return draggable
      }
    })

    dispatch({ type: 'setDraggablesAtD', payload: { d, draggables: newDraggables } })
  }

  function resetBlobsFunction(e: MouseEventReact | TouchEventReact | PointerEventReact) {
    e.preventDefault()
    if (window.confirm(`${EResetBlobs[language]}?`)) {
      window.localStorage.removeItem(localStorageDraggables)
      dispatch({ type: 'resetBlobs', payload: {} })
      dispatch({ type: 'setDraggablesAtD', payload: { d, draggables: [] } })
      dispatch({
        type: 'setBackgroundColor',
        payload: {
          d,
          backgroundColor: [defaultLightness, defaultSaturation, defaultHue],
        },
      })
      saveBackground([defaultLightness, defaultSaturation, defaultHue])
      makeAnew(amountOfBlobs)
      setLayerAmount(defaultLayerAmount)
      setTimeout(() => {
        widthResize()
        saveLayerAmount()
      }, 300)
    }
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

      const newDraggable: Draggable = {
        layer: activeLayer,
        id: `blob${i + 1}-${d}`,
        number: i + 1,
        i: windowWidth > 400 ? getRandomMinMax(7, 20) : getRandomMinMax(7, 10),
        x:
          windowWidth > windowHeight
            ? `${(windowWidth / 100) * getRandomMinMax(2, 70)}px`
            : `${(windowWidth / 100) * getRandomMinMax(2, 50)}px`,
        y: `${(windowHeight / 100) * getRandomMinMax(2, 60)}px`,
        z: `1`,
        background: `linear-gradient(${angle ?? '90deg'}, ${colorFirst ?? 'cyan'},${
          colorSecond ?? 'greenyellow'
        })`,
      }
      dispatch({ type: 'addDraggable', payload: { d, draggable: newDraggable } })
    }

    dispatch({
      type: 'setBackgroundColor',
      payload: {
        d,
        backgroundColor: [defaultLightness, defaultSaturation, defaultHue],
      },
    })
    saveBackground([defaultLightness, defaultSaturation, defaultHue])
    setLayerAmount(defaultLayerAmount)
  }

  function getRandomMinMax(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const addRandomDraggable = () => {
    if (hiddenLayers.has(activeLayer)) {
      dispatch2(notify(ELayerHidden[language], true, 8))
      return
    }
    const colorswitch = () => {
      let number: number = Math.ceil(getRandomMinMax(0.001, 20))

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
        case 18:
          color = 'saddlebrown'
          break
        case 19:
          color = 'sandybrown'
          break
        case 20:
          color = 'rosybrown'
          break
        default:
          color = 'cyan'
          break
      }
      return color
    }

    const colorFirst = colorswitch()
    const colorSecond = colorswitch()

    const maxId = Math.max(
      ...draggables[d].map((draggable: Draggable) =>
        parseInt(draggable.id.split('-')[0].replace('blob', ''), 10)
      )
    )

    const newDraggable: Draggable = {
      layer: activeLayer,
      id: `blob${maxId + 1}-${d}`,
      number: maxId + 1,
      i: Math.ceil(getRandomMinMax(6.5, 10)),
      x: `${(windowWidth / 100) * getRandomMinMax(25, 55)}px`,
      y: `${(windowHeight / 100) * getRandomMinMax(2, 15)}px`,
      z: `${highestZIndex[activeLayer] + 1}`,
      background: `linear-gradient(${angle ?? '90deg'}, ${colorFirst ?? 'cyan'},${
        colorSecond ?? 'greenyellow'
      })`,
    }
    dispatch({ type: 'addDraggable', payload: { d, draggable: newDraggable } })
  }

  const getPosition = (draggable: HTMLElement) => {
    const blobID = draggable.id
    const blobNumber = parseInt(draggable.id.replace('blob', '').split('-')[0], 10)
    const blobI = draggable.style.getPropertyValue('--i')
    const blobX = draggable.style.getPropertyValue('left')
    const blobY = draggable.style.getPropertyValue('top')
    const blobZ = draggable.style.getPropertyValue('z-index')
    const blobColor1 = draggable.style.getPropertyValue('background')
    const layer = draggable.style.getPropertyValue('--layer')

    const blobDraggable: Draggable = {
      layer: layer ? parseInt(layer) : activeLayer,
      id: blobID,
      number: blobNumber,
      i: parseFloat(blobI),
      x: blobX,
      y: blobY,
      z: blobZ,
      background: blobColor1 ?? 'linear-gradient(90deg, cyan, greenyellow)',
    }

    dispatch({
      type: 'updateDraggable',
      payload: { d, draggable: blobDraggable },
    })
  }

  useEffect(() => {
    if (backgroundColor.length === 3) {
      dragWrapOuter.current?.style.setProperty('--lightness', `${backgroundColor[0]}`)
      dragWrapOuter.current?.style.setProperty('--saturation', `${backgroundColor[1]}`)
      dragWrapOuter.current?.style.setProperty('--hue', `${backgroundColor[2]}`)

      setSliderLightVal(backgroundColor[0])
      setSliderSatVal(backgroundColor[1])
      setSliderHueVal(backgroundColor[2])
    }
  }, [backgroundColor])

  useEffect(() => {
    if (!scroll) {
      document.addEventListener('touchmove', preventDefault, { passive: false })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
      document.removeEventListener('touchmove', preventDefault)
    }
    return () => {
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
      document.removeEventListener('touchmove', preventDefault)
    }
  }, [scroll])

  function disableScroll() {
    setScroll(!scroll)
  }

  //SLIDERS

  const [sliderLightVal, setSliderLightVal] = useState(() => {
    const savedBackground = localStorage.getItem(localStorageBackground)
    const backgroundColor = savedBackground ? JSON.parse(savedBackground) : null
    return backgroundColor?.[0] ?? defaultLightness
  })
  const [sliderSatVal, setSliderSatVal] = useState(() => {
    const savedBackground = localStorage.getItem(localStorageBackground)
    const backgroundColor = savedBackground ? JSON.parse(savedBackground) : null
    return backgroundColor?.[1] ?? defaultSaturation
  })

  const [sliderHueVal, setSliderHueVal] = useState(() => {
    const savedBackground = localStorage.getItem(localStorageBackground)
    const backgroundColor = savedBackground ? JSON.parse(savedBackground) : null
    return backgroundColor?.[2] ?? defaultHue
  })

  const [dragWrapOuterLightness, setDragWrapOuterLightness] = useState<CSSProperties>(
    sliderLightnessInput.current
      ? {
          ['--lightness' as string]: `${sliderLightnessInput.current.value}`,
        }
      : {
          ['--lightness' as string]: `${sliderLightVal}`,
        }
  )
  const [dragWrapOuterSaturation, setDragWrapOuterSaturation] = useState<CSSProperties>(
    sliderSaturationInput.current
      ? {
          ['--saturation' as string]: `${sliderSaturationInput.current.value}`,
        }
      : {
          ['--saturation' as string]: `${sliderSatVal}`,
        }
  )
  const [dragWrapOuterHue, setDragWrapOuterHue] = useState<CSSProperties>(
    sliderHueInput.current
      ? {
          ['--hue' as string]: `${sliderHueInput.current.value}`,
        }
      : {
          ['--hue' as string]: `${sliderHueVal}`,
        }
  )

  function sliderLightness() {
    if (dragWrapOuter.current) {
      //dragWrapOuter.style.setProperty('--lightness', `${lightness}`)
      setDragWrapOuterLightness({ ['--lightness' as string]: `${sliderLightVal}` })

      const updatedBackgroundColor = [...backgroundColor]
      updatedBackgroundColor[0] = sliderLightVal
      dispatch({
        type: 'setBackgroundColor',
        payload: { d, backgroundColor: updatedBackgroundColor },
      })
      saveBackground(updatedBackgroundColor)
    }
  }
  function sliderSaturation() {
    if (dragWrapOuter.current) {
      //dragWrapOuter.style.setProperty('--saturation', `${saturation}`)
      setDragWrapOuterSaturation({ ['--saturation' as string]: `${sliderSatVal}` })
      const updatedBackgroundColor = [...backgroundColor]
      updatedBackgroundColor[1] = sliderSatVal
      dispatch({
        type: 'setBackgroundColor',
        payload: { d, backgroundColor: updatedBackgroundColor },
      })
      saveBackground(updatedBackgroundColor)
    }
  }
  function sliderHue() {
    if (dragWrapOuter.current) {
      //dragWrapOuter.style.setProperty('--hue', `${hue}`)
      setDragWrapOuterHue({ ['--hue' as string]: `${sliderHueVal}` })
      const updatedBackgroundColor = [...backgroundColor]
      updatedBackgroundColor[2] = sliderHueVal
      dispatch({
        type: 'setBackgroundColor',
        payload: { d, backgroundColor: updatedBackgroundColor },
      })
      saveBackground(updatedBackgroundColor)
    }
  }

  //To force the sliders to update
  useEffect(() => {
    if (sliderLightnessInput.current)
      setSliderLightVal(sliderLightnessInput.current.value)
  }, [sliderLightnessInput?.current?.value])

  useEffect(() => {
    if (sliderSaturationInput.current)
      setSliderSatVal(sliderSaturationInput.current.value)
  }, [sliderSaturationInput?.current?.value])

  useEffect(() => {
    if (sliderHueInput.current) setSliderHueVal(sliderHueInput.current.value)
  }, [sliderHueInput?.current?.value])

  function sliderLightnessReset() {
    //dragWrapOuter.current?.style.setProperty('--lightness', `${sliderLightVal}`)
    setDragWrapOuterLightness({ ['--lightness' as string]: `${defaultLightness}` })
    if (sliderLightnessInput.current)
      sliderLightnessInput.current.value = defaultLightness
    setSliderLightVal(defaultLightness)
    //save to state
    const updatedBackgroundColor = [...backgroundColor]
    updatedBackgroundColor[0] = defaultLightness
    dispatch({
      type: 'setBackgroundColor',
      payload: { d, backgroundColor: updatedBackgroundColor },
    })
  }
  function sliderSaturationReset() {
    //dragWrapOuter?.style.setProperty('--saturation', `${sliderSatVal}`)
    setDragWrapOuterSaturation({ ['--saturation' as string]: `${defaultSaturation}` })
    if (sliderSaturationInput.current)
      sliderSaturationInput.current.value = defaultSaturation
    setSliderSatVal(defaultSaturation)
    //save to state
    const updatedBackgroundColor = [...backgroundColor]
    updatedBackgroundColor[2] = defaultSaturation
    dispatch({
      type: 'setBackgroundColor',
      payload: { d, backgroundColor: updatedBackgroundColor },
    })
  }
  function sliderHueReset() {
    //dragWrapOuter.current?.style.setProperty('--hue', `${sliderHueVal}`)
    setDragWrapOuterHue({ ['--hue' as string]: `${defaultHue}` })
    if (sliderHueInput.current) sliderHueInput.current.value = defaultHue
    setSliderHueVal(defaultHue)
    //save to state
    const updatedBackgroundColor = [...backgroundColor]
    updatedBackgroundColor[2] = defaultHue
    dispatch({
      type: 'setBackgroundColor',
      payload: { d, backgroundColor: updatedBackgroundColor },
    })
  }
  //END SLIDERS

  useEffect(() => {
    widthResize()
  }, [windowWidth, windowHeight, scroll])

  const widthResize = () => {
    //place these items every time the window is resized
    if (layerIncrease.current && dragWrap.current) place(layerIncrease.current, 57, 93.5)
    if (layerDecrease.current && dragWrap.current)
      place(
        layerDecrease.current,
        43 - (layerDecrease.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        93.5
      )
    if (makeSmaller0.current && dragWrap.current)
      place(
        makeSmaller0.current,
        87 - (makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        93
      )
    if (deleteBlob0.current && dragWrap.current) place(deleteBlob0.current, 13, 93)

    if (makeLarger0.current && dragWrap.current)
      place(
        makeLarger0.current,
        77 - (makeLarger0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        0.5
      )

    if (colorBlockOrange.current && dragWrap.current)
      place(colorBlockOrange.current, 0, 19)
    if (colorBlockRed.current && dragWrap.current) place(colorBlockRed.current, 0, 37)
    if (colorBlockPurple.current && dragWrap.current)
      place(colorBlockPurple.current, 0, 57)
    if (colorBlockBlue.current && dragWrap.current) place(colorBlockBlue.current, 0, 77)

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
        37
      )
    if (colorBlockCyanPink0.current && dragWrap.current)
      place(
        colorBlockCyanPink0.current,
        100 -
          (colorBlockCyanPink0.current.offsetWidth / dragWrap.current?.offsetWidth) * 100,
        57
      )
    if (colorBlockPinkYellow0.current && dragWrap.current)
      place(
        colorBlockPinkYellow0.current,
        100 -
          (colorBlockPinkYellow0.current.offsetWidth / dragWrap.current?.offsetWidth) *
            100,
        77
      )
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

  const imgStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    margin: '0 auto',
  }

  const takeScreenshot = async () => {
    const dragWrap = document.getElementById('drag-slider-wrap')
    if (dragWrap && !loading) {
      try {
        let localStorageData: { [key: string]: string } = {}
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key) {
            const value = localStorage.getItem(key)
            if (value !== null) {
              localStorageData[key] = value
            }
          }
        }
        setLoading(true)
        const url =
          import.meta.env.VITE_BASE_URI ??
          'https://react-bg.braveisland-7060f196.westeurope.azurecontainerapps.io'
        const baseUrl = `${url}/api/blobs/screenshot`
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: window.location.href,
            selector: `#drag-wrap${d}`,
            language,
            localStorageData,
            width: windowWidth,
            height: windowHeight,
          }),
        })

        if (!response.ok) {
          dispatch2(notify(EError[language], true, 8))
          setLoading(false)
          throw new Error(`Error: ${response.statusText}`)
        }

        const data = await response.json()

        const container = blobScreenshot.current
        const img = screenshotImg.current

        if (container && img) {
          img.src = `data:image/png;base64,${data.screenshot}`
          container.style.display = 'block'
          img.scrollIntoView({ behavior: 'smooth', block: 'start' })
          dispatch2(
            notify(
              `${EScreenshotTaken[language]}; ${EYouMayFindTheImageBelow[language]}`,
              false,
              10
            )
          )
          setLoading(false)
          setScroll(true)
        }
      } catch (error) {
        dispatch2(notify(EError[language], true, 8))
        console.error(EError[language], error)
      }
    }
  }

  const saveScreenshot = () => {
    const img = screenshotImg.current
    if (img && img.src) {
      const link = document.createElement('a')
      link.href = img.src
      link.download = 'blobs.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      dispatch2(notify(EArtSaved[language], false, 8))
    } else {
      dispatch2(notify(ENoScreenshotAvailableToSave[language], true, 8))
      console.error(ENoScreenshotAvailableToSave[language])
    }
  }

  useEffect(() => {
    if (loading) dispatch2(notify(`${ELoading[language]}...`, false, 20))
  }, [loading])

  const [itemsPerPage, setItemsPerPage] = useState(6)

  const [currentPage, setCurrentPage] = useState<Record<number, number>>({ [d]: 1 })

  // Function to handle page change
  const handlePageChange = (dKey: number, newPage: number) => {
    setCurrentPage((prev) => ({ ...prev, [dKey]: newPage }))
  }

  //save layer amount to local storage
  useEffect(() => {
    saveLayerAmount()
  }, [layerAmount])

  const deleteHiddenLayers = () => {
    // Check if there are any hidden layers
    if (hiddenLayers.size === 0) {
      dispatch2(notify('Please hide the layers you want to delete.', true, 8))
      return
    }

    // Check if any hidden layers are not empty
    const nonEmptyHiddenLayers = Array.from(hiddenLayers).filter((layer) =>
      draggables[d].some((draggable) => draggable.layer === layer)
    )

    if (nonEmptyHiddenLayers.length > 0) {
      const confirmDelete = window.confirm(
        `${ELayerNotEmpty[language]}. ${EAreYouSureYouWantToProceed[language]}`
      )
      if (!confirmDelete) {
        return
      }
    }

    // Remove hidden layers
    const newDraggables = draggables[d].filter(
      (draggable) => !hiddenLayers.has(draggable.layer)
    )

    const newLayerAmount = layerAmount - hiddenLayers.size

    if (newLayerAmount < 1) {
      dispatch2(notify(EMustHaveAtLeastOneLayer[language], true, 8))
      return
    }

    // Adjust layers of remaining draggables
    const updatedDraggables = newDraggables.map((draggable) => {
      const layer = draggable.layer
      let newLayer = layer
      hiddenLayers.forEach((hiddenLayer) => {
        if (layer > hiddenLayer) {
          newLayer -= 1
        }
      })
      return { ...draggable, layer: newLayer }
    })

    dispatch({
      type: 'setDraggablesAtD',
      payload: { d, draggables: updatedDraggables },
    })

    setLayerAmount(newLayerAmount)
    setHiddenLayers(new Set()) // Reset hidden layers
    setTimeout(() => {
      widthResize()
      saveLayerAmount()
    }, 300)
  }

  const addToLayerAmount = (byAmount: number) => {
    const newLayerAmount = layerAmount + byAmount

    if (newLayerAmount > 9) {
      dispatch2(notify(EMaximumLayerAmountReached[language], true, 8))
      return
    }

    // Adjust layers of remaining draggables
    const updatedDraggables = draggables[d].map((draggable) => {
      const layer =
        draggable.layer > activeLayer ? draggable.layer + byAmount : draggable.layer
      return { ...draggable, layer }
    })

    dispatch({
      type: 'setDraggablesAtD',
      payload: { d, draggables: updatedDraggables },
    })

    setLayerAmount(newLayerAmount)
    setHiddenLayers(new Set()) // Reset hidden layers
    setTimeout(() => {
      widthResize()
      saveLayerAmount()
    }, 300)
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
            {EReset[language]}
          </button>
          <button
            className='toggle-marker tooltip-wrap'
            onClick={() => setMarkerEnabled(!markerEnabled)}
          >
            <span
              className='tooltip left above space'
              data-tooltip={`${EToggleMarkerVisibilityWhenUsingAKeyboard[language]}`}
            ></span>
            {markerEnabled ? EMarkerOn[language] : EMarkerOff[language]}
          </button>

          <button
            ref={disableScrollButton}
            id={`disable-scroll${d}`}
            className={`disable-scroll tooltip-wrap ${!scroll ? 'active' : ''}`}
            onClick={() => {
              disableScroll()
            }}
          >
            <span
              className='tooltip right above space'
              data-tooltip={
                scroll
                  ? EDisableScrollInOrderToUseTheMouseWheelToResizeABlob[language]
                  : EPressHereOrEscapeToRestoreScrolling[language]
              }
            ></span>
            {scroll ? EDisableScroll[language] : EEnableScroll[language]}
          </button>

          <button
            id='toggle-controls'
            className='toggle-controls'
            onClick={() => {
              setControlsVisible(!controlsVisible)
              if (!controlsVisible) {
                setTimeout(() => {
                  widthResize()
                }, 200)
              }
            }}
          >
            {controlsVisible ? EHideControls[language] : EShowControls[language]}
          </button>
          <button
            disabled={loading}
            onClick={takeScreenshot}
            className='reset screenshot tooltip-wrap'
          >
            <BsFillCameraFill />
            <span
              className='tooltip left below space'
              data-tooltip={
                loading ? ELoading[language] : EClickHereToTakeAScreenshot[language]
              }
            ></span>
          </button>
        </div>
        <div
          ref={dragWrapOuter}
          id='drag-wrap-outer'
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
            aria-label={`${EClickMeToMakeARandomBlob[language]}. ${EMoreColorsAvailable[language]}`}
            onClick={() => addRandomDraggable()}
          >
            <FaPlus />
            <span
              className='tooltip left below'
              data-tooltip={`${EClickMeToMakeARandomBlob[language]}. ${EMoreColorsAvailable[language]}!`}
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

          <div ref={dragWrap} id={`drag-wrap${d}`} className='drag-wrap'>
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
              layerIncrease={layerIncrease}
              layerDecrease={layerDecrease}
              dragWrap={dragWrap}
              exitApp={exitApp}
              selectedvalue0={selectedvalue0}
              dragWrapOuter={dragWrapOuter}
              stopBlobs={stopBlobs}
              disableScrollButton={disableScrollButton}
              resetBlobs={resetBlobs}
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

          <button
            ref={layerDecrease}
            id='layer-decrease'
            className={`layer-adjust layer-decrease tooltip-wrap ${
              !controlsVisible ? 'hidden' : ''
            }`}
          >
            <span
              className='tooltip above right'
              data-tooltip={`${EDecreaseBlobLayerBy1Instructions[language]} ${EKeyboardUsePressTheCorrespondingLayerNumber[language]}`}
            ></span>
            <BiChevronDown />
          </button>
          <button
            ref={layerIncrease}
            id='layer-increase'
            className={`layer-adjust layer-increase tooltip-wrap ${
              !controlsVisible ? 'hidden' : ''
            }`}
          >
            <span
              className='tooltip above left'
              data-tooltip={`${EIncreaseBlobLayerBy1Instructions[language]} ${EKeyboardUsePressTheCorrespondingLayerNumber[language]}`}
            ></span>
            <BiChevronUp />
          </button>
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
        <div className='layer-control-wrap layer-buttons'>
          <div className='layer-btn-wrap'>
            <button
              className='layer-amount decrease-layer-amount tooltip-wrap'
              onClick={deleteHiddenLayers}
            >
              <span
                className='tooltip above right'
                data-tooltip={EDeleteHiddenLayers[language]}
              ></span>
              <BiMinus />
            </button>
            <button
              id='every-layer-minus'
              className='layer-button every-layer tooltip-wrap'
              onClick={() => changeEveryLayer(-1)}
            >
              <span
                className='tooltip above right'
                data-tooltip={EClickHereToMoveDownLayer[language]}
              ></span>
              <BiChevronsDown />
            </button>
          </div>
          <div className='layer-btn-wrap'>
            {Array.from({ length: layerAmount }, (_, i) => i).map((layer, index) => (
              <button
                key={`${layer}*${index}`}
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
          <div className='layer-btn-wrap'>
            <button
              className='layer-button every-layer tooltip-wrap'
              onClick={() => changeEveryLayer(1)}
            >
              <span
                className='tooltip above left'
                data-tooltip={EClickHereToMoveUpLayer[language]}
              ></span>
              <BiChevronsUp />
            </button>
            <button
              className='layer-amount increase-layer-amount tooltip-wrap'
              onClick={() => addToLayerAmount(1)}
            >
              <span
                className='tooltip above left'
                data-tooltip={EGetMoreLayers[language]}
              ></span>
              <BiPlus />
            </button>
          </div>
        </div>
        <div className='drag-slider-wrap'>
          <label htmlFor={`drag-slider-lightness${d}`} id={`lightnessdescription${d}`}>
            {EAdjustBackgroundLightness[language]}
          </label>
          <input
            ref={sliderLightnessInput}
            onChange={(e) => {
              setSliderLightVal(e.target.value)
              sliderLightness()
            }}
            onMouseUp={(e) => {
              setSliderLightVal((e.target as HTMLInputElement).value)
              sliderLightness()
            }}
            onPointerUp={(e) => {
              setSliderLightVal((e.target as HTMLInputElement).value)
              sliderLightness()
            }}
            type='range'
            min={0}
            max={100}
            value={sliderLightVal}
            className='drag-slider drag-slider-lightness'
            id={`drag-slider-lightness${d}`}
          />
          <span>{sliderLightVal}</span>

          <button
            onClick={() => {
              setSliderLightVal(defaultLightness)
              sliderLightnessReset()
            }}
          >
            {EResetLightness[language]}
          </button>
        </div>
        <div id='drag-slider-wrap' className='drag-slider-wrap'>
          <label htmlFor={`drag-slider-saturation${d}`} id={`saturationdescription${d}`}>
            {EAdjustBackgroundSaturation[language]}
          </label>
          <input
            ref={sliderSaturationInput}
            onChange={(e) => {
              setSliderSatVal(e.target.value)
              sliderSaturation()
            }}
            onMouseUp={(e) => {
              setSliderSatVal((e.target as HTMLInputElement).value)
              sliderSaturation()
            }}
            onPointerUp={(e) => {
              setSliderSatVal((e.target as HTMLInputElement).value)
              sliderSaturation()
            }}
            type='range'
            min={0}
            max={100}
            value={sliderSatVal}
            className='drag-slider drag-slider-saturation'
            id={`drag-slider-saturation${d}`}
          />
          <span>{sliderSatVal}</span>
          <button
            onClick={() => {
              setSliderSatVal(defaultSaturation)
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
              setSliderHueVal(e.target.value)
              sliderHue()
            }}
            onMouseUp={(e) => {
              setSliderHueVal((e.target as HTMLInputElement).value)
              sliderHue()
            }}
            onPointerUp={(e) => {
              setSliderHueVal((e.target as HTMLInputElement).value)
              sliderHue()
            }}
            type='range'
            min={0}
            max={359}
            value={sliderHueVal}
            className='drag-slider drag-slider-hue'
            id={`drag-slider-hue${d}`}
          />
          <span>{sliderHueVal}</span>
          <button
            onClick={() => {
              setSliderHueVal(defaultHue)
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
            <div ref={blobScreenshot} id='blob-screenshot' style={{ display: 'none' }}>
              <button onClick={saveScreenshot}>{EDownload[language]}</button>
              <img
                src=''
                ref={screenshotImg}
                alt={EScreenshot[language]}
                style={imgStyle}
              />
              <button onClick={saveScreenshot}>{EDownload[language]}</button>
            </div>
            <h2>{EArt[language]}</h2>
            {isLoading ? (
              <p>{ELoadingSavedArtwork[language]}</p>
            ) : !users || users.length < 1 ? (
              <p>{EErrorConnectingToTheServer[language]}</p>
            ) : !hasSavedFiles ? (
              <p>{ENoSavedArtworkYet[language]}</p>
            ) : (
              Object.keys(savedDraggablesbyD).map((dKey, index) => {
                const versions = Object.keys(savedDraggablesbyD[Number(dKey)])
                const totalPages = Math.ceil(versions.length / itemsPerPage)
                const current = currentPage[Number(dKey)] ?? 1
                const startIdx = (current - 1) * itemsPerPage
                const endIdx = startIdx + itemsPerPage
                const currentVersions = versions.slice(startIdx, endIdx)

                return (
                  <Fragment key={`${dKey}:${index}`}>
                    <ul key={`${dKey}+${index}`} className='blob-versions-wrap'>
                      {currentVersions.map((versionName, index) => (
                        <li key={`${versionName}+${index}`} className='blob-version-item'>
                          <span>{versionName}</span>
                          <div className='button-wrap'>
                            <button
                              onClick={() =>
                                loadBlobsFromServer(Number(dKey), versionName)
                              }
                            >
                              {ELoad[language]}
                            </button>
                            <button
                              onClick={() =>
                                deleteBlobsVersionFromServer(Number(dKey), versionName)
                              }
                            >
                              {EDelete[language]}
                            </button>
                            <Accordion
                              language={language}
                              id={`accordion-blobnewname-${versionName.replace(
                                /\s/g,
                                '-'
                              )}`}
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
                                  htmlFor={`blobnewname-${versionName.replace(
                                    /\s/g,
                                    '-'
                                  )}`}
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
                    {/* Pagination Controls */}
                    <div className='pagination-controls flex center gap-half margin0auto'>
                      {current !== 1 ? (
                        <button
                          onClick={() =>
                            handlePageChange(Number(dKey), Math.max(current - 1, 1))
                          }
                          disabled={current === 1}
                        >
                          &laquo; {EPrevious[language]}
                        </button>
                      ) : (
                        <></>
                      )}
                      <span>
                        {EPage[language]} {current} / {totalPages}
                      </span>
                      {current !== totalPages ? (
                        <button
                          onClick={() =>
                            handlePageChange(
                              Number(dKey),
                              Math.min(current + 1, totalPages)
                            )
                          }
                          disabled={current === totalPages}
                        >
                          {ENext[language]} &raquo;
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Fragment>
                )
              })
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
