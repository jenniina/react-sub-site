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
  ChangeEvent,
} from 'react'
import {
  Draggable,
  BackgroundColor,
  RefObject,
  focusedBlob,
  ColorPair,
  SavedBlobs,
} from '../interfaces'
import { BlobContext, Props } from './BlobProvider'
import {
  EAreYouSureYouWantToProceed,
  EBackToStart,
  EBlobApp,
  EDownload,
  EEdit,
  EError,
  EErrorConnectingToTheServer,
  EItemsPerPage,
  ELanguages,
  ELoad,
  ELogin,
  ENew,
  ENewName,
  ENext,
  EOr,
  EPage,
  EPerPage,
  EPrevious,
  ERegister,
  EReset,
  ESave,
  ESavingSuccessful,
  ESpecialCharactersNotAllowed,
  EToLastPage,
  ReducerProps,
} from '../../../interfaces'
import {
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
  ERemovalInstructions,
  EResetBlobs,
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
  EWithMoreMutedColors,
  EMoreColorsAvailableThroughRandomBlobButton,
  EDarkerColors,
  EAfterEnablingThereIsASlightDelayBeforeAllTheBlobsAreMovingAgain,
  EGetANewSetOfBlobs,
} from '../../../interfaces/blobs'
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
import DragLayer from './DragLayers'
import useWindowSize from '../../../hooks/useWindowSize'
import { IUser } from '../../../interfaces'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import Accordion from '../../Accordion/Accordion'
import { notify } from '../../../reducers/notificationReducer'
import { initializeUser } from '../../../reducers/authReducer'
import { initializeUsers } from '../../../reducers/usersReducer'
import { useNavigate } from 'react-router-dom'
import blobService from '../services/blob'
import { ELoading } from '../../Todo/interfaces'
import { EDelete } from '../../Jokes/interfaces'
import ColorBlocks from './ColorBlocks'
import Sliders from './Sliders'
import { EBlobArt } from '../../../interfaces/about'
import { focused, isTouchDevice } from '../../../hooks/useDraggable'

// Should be in the same order as colorBlockProps
const colorPairs: ColorPair[] = [
  { color1: 'darkorange', color2: 'orange' }, //colorBlockOrange
  { color1: 'orangered', color2: 'palevioletred' }, //colorBlockRed
  { color1: 'magenta', color2: 'violet' }, //colorBlockPurple
  { color1: 'blue', color2: 'cyan' }, //colorBlockBlue
  { color1: 'greenyellow', color2: 'lemonchiffon' }, //colorBlockYellowLime
  { color1: 'cyan', color2: 'greenyellow' }, //colorBlockCyanYellow
  { color1: 'cyan', color2: 'pink' }, //colorBlockCyanPink
  { color1: 'lemonchiffon', color2: 'pink' }, //colorBlockPinkYellow
]
// Should be in the same order as colorBlockProps2
const colorPairs2: ColorPair[] = [
  { color1: 'indianred', color2: 'palevioletred' }, //colorBlockReddish
  { color1: 'sienna', color2: 'peru' }, //colorBlockBrown
  { color1: 'chocolate', color2: 'burlywood' }, //colorBlockTan
  { color1: 'darkkhaki', color2: 'moccasin' }, //colorBlockKhaki
  { color1: 'slateblue', color2: 'mediumpurple' }, //colorBlockPurplish
  { color1: 'royalblue', color2: 'turquoise' }, //colorBlockBluish
  { color1: 'cadetblue', color2: 'mediumaquamarine' }, //colorBlockGreenish
  { color1: 'lightslategray', color2: 'lightsteelblue' }, //colorBlockGray
]
// Should be in the same order as colorBlockProps3
const colorPairs3: ColorPair[] = [
  { color1: 'indigo', color2: 'mediumorchid' }, //colorBlockDarkPurple
  { color1: 'darkmagenta', color2: 'palevioletred' }, //colorBlockDarkPink
  { color1: 'crimson', color2: 'indianred' }, //colorBlockDarkRed
  { color1: 'chocolate', color2: 'orangered' }, //colorBlockDarkOrange
  { color1: 'darkcyan', color2: 'olivedrab' }, //colorBlockDarkGreen
  { color1: 'midnightblue', color2: 'darkturquoise' }, //colorBlockGreenishBlue
  { color1: 'mediumblue', color2: 'cadetblue' }, //colorBlockDarkBlue
  { color1: 'darkblue', color2: 'mediumslateblue' }, //colorBlockPurplishBlue
]

const colorPairsCombo: ColorPair[][] = [colorPairs, colorPairs2, colorPairs3]

let angle = '90deg'
let color = 'cyan'

const defaultLayerAmount = 3

const preventDefault = (e: Event) => {
  e.preventDefault()
}

export default function DragContainer({
  language,
  d,
  ds,
  dragWrapOuter,
}: {
  language: ELanguages
  d: number
  ds: number
  dragWrapOuter: RefObject<HTMLDivElement>
}) {
  const defaultHue = '214'
  const defaultSaturation = d === 0 ? '80' : d === 2 ? '50' : '45'
  const defaultLightness = d === 0 ? '30' : d === 2 ? '5' : '25'

  const { state, dispatch } = useContext(BlobContext) as Props
  const dispatch2 = useAppDispatch()
  const user = useSelector((state: ReducerProps) => state.auth?.user) as IUser
  const users = useSelector((state: ReducerProps) => state.users) as IUser[]

  //const dragWrapOuter = useRef() as RefObject<HTMLDivElement>
  const dragWrap = useRef() as RefObject<HTMLDivElement>
  const dragWrapOutest = useRef() as RefObject<HTMLDivElement>

  const selectedvalue0 = useRef() as RefObject<HTMLSpanElement>

  const stopBlobs = useRef() as RefObject<HTMLButtonElement>
  const disableScrollButton = useRef() as RefObject<HTMLButtonElement>
  const resetBlobs = useRef() as RefObject<HTMLButtonElement>
  const blobScreenshot = useRef() as RefObject<HTMLDivElement>
  const screenshotImg = useRef() as RefObject<HTMLImageElement>
  const [loading, setLoading] = useState(false)

  const exitApp = useRef() as RefObject<HTMLDivElement>

  const makeLarger0 = useRef() as RefObject<HTMLDivElement>
  const makeSmaller0 = useRef() as RefObject<HTMLDivElement>
  const makeMore0 = useRef() as RefObject<HTMLDivElement>
  const deleteBlob0 = useRef() as RefObject<HTMLDivElement>
  const layerIncrease = useRef() as RefObject<HTMLDivElement>
  const layerDecrease = useRef() as RefObject<HTMLDivElement>

  const makeRandom0 = useRef() as RefObject<HTMLButtonElement>

  const markerDivRef = useRef<HTMLDivElement>(null)

  const sliderLightnessInput = useRef() as RefObject<HTMLInputElement>
  const sliderSaturationInput = useRef() as RefObject<HTMLInputElement>
  const sliderHueInput = useRef() as RefObject<HTMLInputElement>

  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  const localStorageLayerAmount = `${isLocalhost ? 'local-' : ''}BlobLayerAmount${[d]}`
  const localStorageBackground = `${isLocalhost ? 'local-' : ''}BackgroundColor${[d]}`
  const localStorageDraggables = `${isLocalhost ? 'local-' : ''}Draggables${[d]}`

  const backgroundColor = state.backgroundColor as BackgroundColor[][]

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
  const [colorIndex, setColorIndex] = useState<number>(0)
  const [focusedBlob, setFocusedBlob] = useState<focusedBlob | null>(null)
  const [usingKeyboard, setUsingKeyboard] = useState<boolean>(false)
  const [markerEnabled, setMarkerEnabled] = useState<boolean>(true)
  const [controlsVisible, setControlsVisible] = useState<boolean>(true)
  const [scroll, setScroll] = useState<boolean>(true)
  const [hasBeenMade, setHasBeenMade] = useState<boolean>(false)
  const [paused, setPaused] = useState<boolean>(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)

  const colorBlockOrange = useRef() as RefObject<HTMLDivElement>
  const colorBlockRed = useRef() as RefObject<HTMLDivElement>
  const colorBlockPurple = useRef() as RefObject<HTMLDivElement>
  const colorBlockBlue = useRef() as RefObject<HTMLDivElement>

  const colorBlockYellowLime = useRef() as RefObject<HTMLDivElement>
  const colorBlockCyanYellow = useRef() as RefObject<HTMLDivElement>
  const colorBlockCyanPink = useRef() as RefObject<HTMLDivElement>
  const colorBlockPinkYellow = useRef() as RefObject<HTMLDivElement>

  const colorBlockReddish = useRef() as RefObject<HTMLDivElement>
  const colorBlockBrown = useRef() as RefObject<HTMLDivElement>
  const colorBlockKhaki = useRef() as RefObject<HTMLDivElement>
  const colorBlockBluish = useRef() as RefObject<HTMLDivElement>
  const colorBlockPurplish = useRef() as RefObject<HTMLDivElement>
  const colorBlockGreenish = useRef() as RefObject<HTMLDivElement>
  const colorBlockTan = useRef() as RefObject<HTMLDivElement>
  const colorBlockGray = useRef() as RefObject<HTMLDivElement>

  const colorBlockDarkPurple = useRef() as RefObject<HTMLDivElement>
  const colorBlockDarkPink = useRef() as RefObject<HTMLDivElement>
  const colorBlockDarkRed = useRef() as RefObject<HTMLDivElement>
  const colorBlockDarkOrange = useRef() as RefObject<HTMLDivElement>
  const colorBlockDarkGreen = useRef() as RefObject<HTMLDivElement>
  const colorBlockGreenishBlue = useRef() as RefObject<HTMLDivElement>
  const colorBlockDarkBlue = useRef() as RefObject<HTMLDivElement>
  const colorBlockPurplishBlue = useRef() as RefObject<HTMLDivElement>

  // Create a mapping between the ref objects and their names
  const refNameMapping = new Map<RefObject<HTMLDivElement>, string>([
    [colorBlockOrange, 'colorBlockOrange'],
    [colorBlockRed, 'colorBlockRed'],
    [colorBlockPurple, 'colorBlockPurple'],
    [colorBlockBlue, 'colorBlockBlue'],
    [colorBlockYellowLime, 'colorBlockYellowLime'],
    [colorBlockCyanYellow, 'colorBlockCyanYellow'],
    [colorBlockCyanPink, 'colorBlockCyanPink'],
    [colorBlockPinkYellow, 'colorBlockPinkYellow'],
  ])

  const refNameMapping2 = new Map<RefObject<HTMLDivElement>, string>([
    [colorBlockReddish, 'colorBlockReddish'],
    [colorBlockBrown, 'colorBlockBrown'],
    [colorBlockTan, 'colorBlockTan'],
    [colorBlockKhaki, 'colorBlockKhaki'],
    [colorBlockPurplish, 'colorBlockPurplish'],
    [colorBlockBluish, 'colorBlockBluish'],
    [colorBlockGreenish, 'colorBlockGreenish'],
    [colorBlockGray, 'colorBlockGray'],
  ])

  const refNameMapping3 = new Map<RefObject<HTMLDivElement>, string>([
    [colorBlockDarkPurple, 'colorBlockDarkPurple'],
    [colorBlockDarkPink, 'colorBlockDarkPink'],
    [colorBlockDarkRed, 'colorBlockDarkRed'],
    [colorBlockDarkOrange, 'colorBlockDarkOrange'],
    [colorBlockDarkGreen, 'colorBlockDarkGreen'],
    [colorBlockGreenishBlue, 'colorBlockGreenishBlue'],
    [colorBlockDarkBlue, 'colorBlockDarkBlue'],
    [colorBlockPurplishBlue, 'colorBlockPurplishBlue'],
  ])

  const refNameMappingCombo = [refNameMapping, refNameMapping2, refNameMapping3]

  const getRefName = (
    refNameMapping: Map<RefObject<HTMLDivElement>, string>,
    ref: RefObject<HTMLDivElement>
  ): string | undefined => {
    return refNameMapping.get(ref)
  }

  // Should be in the same order as colorPairs:
  const colorBlockProps = [
    colorBlockOrange,
    colorBlockRed,
    colorBlockPurple,
    colorBlockBlue,
    colorBlockYellowLime,
    colorBlockCyanYellow,
    colorBlockCyanPink,
    colorBlockPinkYellow,
  ]
  const colorBlockProps2 = [
    colorBlockReddish,
    colorBlockBrown,
    colorBlockTan,
    colorBlockKhaki,
    colorBlockPurplish,
    colorBlockBluish,
    colorBlockGreenish,
    colorBlockGray,
  ]
  const colorBlockProps3 = [
    colorBlockDarkPurple,
    colorBlockDarkPink,
    colorBlockDarkRed,
    colorBlockDarkOrange,
    colorBlockDarkGreen,
    colorBlockGreenishBlue,
    colorBlockDarkBlue,
    colorBlockPurplishBlue,
  ]

  const colorBlockPropsCombo = [colorBlockProps, colorBlockProps2, colorBlockProps3]

  const changeBlobLayer = (draggable: Draggable, layer: number) => {
    const z = highestZIndex[layer] + 1
    dispatch({
      type: 'partialUpdate',
      payload: { d, id: draggable.id, update: { layer, z } },
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

  function loadLayerAmount(): Promise<number | null> {
    // First check the local storage value, then check if draggables[d] has blobs, finally return the default value if both are null
    return new Promise((resolve) => {
      setTimeout(() => {
        const layerAmount = localStorage.getItem(localStorageLayerAmount)
        if (layerAmount != null) {
          resolve(parseInt(layerAmount))
        } else if (draggables[d]?.length > 0) {
          resolve(Math.max(...draggables[d].map((d) => d.layer)) + 1)
        } else {
          resolve(defaultLayerAmount)
        }
      }, 100)
    })
  }

  // if (draggables[d]?.length > 0) {
  //   return Math.max(...draggables[d].map((d) => d.layer)) + 1
  // } else {
  //   const layerAmount = localStorage.getItem(localStorageLayerAmount)
  //   if (layerAmount == null) return defaultLayerAmount
  //   else return parseInt(layerAmount)
  // }

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

  function saveLayerAmount(amount: number = layerAmount) {
    localStorage.setItem(localStorageLayerAmount, JSON.stringify(amount))
  }
  function saveBackground(bg: BackgroundColor[] = backgroundColor[d]) {
    localStorage.setItem(localStorageBackground, JSON.stringify(bg))
  }
  function saveDraggables(blob: Draggable[] = draggables[d]) {
    localStorage.setItem(localStorageDraggables, JSON.stringify(blob))
  }
  const [name, setName] = useState<string>(EBlobArt[language])
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

  const [layerAmount, setLayerAmount] = useState<number>(0)

  // useEffect(() => {
  //   const fetchLayerAmount = async () => {
  //     const amount = await loadLayerAmount()
  //     setLayerAmount(amount ?? 3) // Default to 3 if null
  //   }
  //   fetchLayerAmount()
  // }, [])

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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (regex.test(value)) {
      setName(value)
    } else {
      dispatch2(notify(ESpecialCharactersNotAllowed[language], true, 8))
    }
  }

  //draggable[d] highest layer:
  // console.log('highest layer:', Math.max(...draggables[d].map((d) => d.layer)))

  const handleNewNameChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          .then((response: SavedBlobs) => {
            const highestLayerInDraggables = Math.max(
              ...response.draggables.map((draggable: Draggable) => draggable.layer)
            )
            setLayerAmount(highestLayerInDraggables + 1)
            setTimeout(() => {
              saveLayerAmount(highestLayerInDraggables + 1)
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
            setSliderHueVal(response.backgroundColor[0])
            setSliderSatVal(response.backgroundColor[1])
            setSliderLightVal(response.backgroundColor[2])
            setDragWrapOuterHue({
              [`--hue${d}` as string]: `${response.backgroundColor[0]}`,
            })
            setDragWrapOuterSaturation({
              [`--saturation${d}` as string]: `${response.backgroundColor[1]}`,
            })
            setDragWrapOuterLightness({
              [`--lightness${d}` as string]: `${response.backgroundColor[2]}`,
            })
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
        const loadedLayerAmount = await loadLayerAmount()
        if (loadedBackgroundColor && loadedBackgroundColor.length === 3) {
          dispatch({
            type: 'setBackgroundColor',
            payload: { d, backgroundColor: loadedBackgroundColor },
          })
          saveBackground(loadedBackgroundColor)

          setSliderHueVal(loadedBackgroundColor[0])
          setSliderSatVal(loadedBackgroundColor[1])
          setSliderLightVal(loadedBackgroundColor[2])

          dragWrapOuter.current?.style.setProperty(
            `--hue${d}`,
            `${loadedBackgroundColor[0]}`
          )
          dragWrapOuter.current?.style.setProperty(
            `--saturation${d}`,
            `${loadedBackgroundColor[1]}`
          )
          dragWrapOuter.current?.style.setProperty(
            `--lightness${d}`,
            `${loadedBackgroundColor[2]}`
          )
        } else {
          dispatch({
            type: 'setBackgroundColor',
            payload: {
              d,
              backgroundColor: [defaultHue, defaultSaturation, defaultLightness],
            },
          })
          saveBackground([defaultHue, defaultSaturation, defaultLightness])
        }
        if (loadedLayerAmount) {
          setLayerAmount(loadedLayerAmount)
        } else if (loadedDraggables && loadedDraggables.length > 0) {
          setLayerAmount(Math.max(...loadedDraggables.map((d) => d.layer)) + 1)
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
          makeAnew(amountOfBlobs, d)
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
    if (!hasBeenMade && blobs && blobs?.length > 0) {
      //dispatch({ type: 'resetDraggables', payload: {} })
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

      // setLayerAmount(Math.max(...blobs.map((d) => d.layer)) + 1)
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

    // if (!paused && dragWrap.current) {
    //   setPaused(true)
    //   dragWrap.current.classList.add('paused')
    // } else if (paused && dragWrap.current) {
    //   setPaused(false)
    //   dragWrap.current.classList.remove('paused')
    // }

    const draggables = dragWrapOuter.current?.querySelectorAll('.dragzone')
    if (draggables && !paused) {
      draggables.forEach((draggable) => {
        draggable.classList.remove('animation')
        // Trigger a reflow to ensure the class removal is processed:
        void (draggable as HTMLElement).offsetWidth
      })
      setPaused(true)
    } else if (draggables) {
      draggables.forEach((draggable) => {
        draggable.classList.add('animation')
        // Trigger a reflow to ensure the class addition is processed:
        void (draggable as HTMLElement).offsetWidth
      })
      setPaused(false)
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
      dispatch({ type: 'resetDraggables', payload: { d } })
      dispatch({ type: 'setDraggablesAtD', payload: { d, draggables: [] } })
      makeAnew(amountOfBlobs, d)
      setTimeout(() => {
        widthResize()
        saveLayerAmount(defaultLayerAmount)
      }, 300)
    }
  }

  const makeAnew = (amount: number, d: number) => {
    setActiveLayer(0)
    for (let i: number = 0; i < amount; i++) {
      const colorswitch = () => {
        const colorArray = colorPairsCombo[d]
        const randomIndex = Math.floor(Math.random() * colorArray.length)
        return [colorArray[randomIndex].color1, colorArray[randomIndex].color2]
      }
      const [colorFirst, colorSecond] = colorswitch()

      const newDraggable: Draggable = {
        layer: 0,
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

    setLayerAmount(defaultLayerAmount)
  }

  function getRandomMinMax(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const addRandomDraggable = () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur() // Unfocus the button after clicking, as the tooltip will otherwise stay visible and be in the way

    if (hiddenLayers.has(activeLayer)) {
      dispatch2(notify(ELayerHidden[language], true, 8))
      return
    }
    const colorswitch = () => {
      let number: number = Math.ceil(getRandomMinMax(0.0001, 40))
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
          color = 'orangered'
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
          color = 'wheat'
          break
        case 19:
          color = 'sandybrown'
          break
        case 20:
          color = 'rosybrown'
          break
        case 21:
          color = 'dimgray'
          break
        case 22:
          color = 'darkkhaki'
          break
        case 23:
          color = 'darkseagreen'
          break
        case 24:
          color = 'slateblue'
          break
        case 25:
          color = 'royalblue'
          break
        case 26:
          color = 'moccasin'
          break
        case 27:
          color = 'burlywood'
          break
        case 28:
          color = 'chocolate'
          break
        case 29:
          color = 'cadetblue'
          break
        case 30:
          color = 'mediumpurple'
          break
        case 31:
          color = 'sienna'
          break
        case 32:
          color = 'peru'
          break
        case 33:
          color = 'indianred'
          break
        case 34:
          color = 'palevioletred'
          break
        case 35:
          color = 'plum'
          break
        case 36:
          color = 'palegreen'
          break
        case 37:
          color = 'mediumaquamarine'
          break
        case 38:
          color = 'lightsteelblue'
          break
        case 39:
          color = 'aquamarine'
          break
        case 40:
          color = 'yellowgreen'
          break
        default:
          color = 'cyan'
          break
      }
      return color
    }

    // Fully random:
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
    const blobStyle = window.getComputedStyle(draggable)
    const blobNumber = parseInt(draggable.id.replace('blob', '').split('-')[0], 10)
    const blobI =
      blobStyle.getPropertyValue('--i') ?? draggable.style.getPropertyValue('--i')
    const blobX =
      blobStyle.getPropertyValue('left') ?? draggable.style.getPropertyValue('left')
    const blobY =
      blobStyle.getPropertyValue('top') ?? draggable.style.getPropertyValue('top')
    const blobZ =
      blobStyle.getPropertyValue('z-index') ?? draggable.style.getPropertyValue('z-index')
    const blobColor1 =
      blobStyle.getPropertyValue('background') ??
      draggable.style.getPropertyValue('background')
    const layer =
      blobStyle.getPropertyValue('--layer') ?? draggable.style.getPropertyValue('--layer')

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
    if (!scroll) {
      document.addEventListener('touchmove', preventDefault, { passive: false })
      document.body.style.overflow = 'hidden'
    } else if (scroll) {
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
      document.removeEventListener('touchmove', preventDefault)
    }
    return () => {
      document.removeEventListener('touchmove', preventDefault)
    }
  }, [scroll])

  function disableScroll() {
    setScroll(!scroll)
  }

  // SLIDERS

  const [sliderHueVal, setSliderHueVal] = useState(() => {
    const savedBackground = localStorage.getItem(localStorageBackground)
    const backgroundColor = savedBackground ? JSON.parse(savedBackground) : null
    return backgroundColor?.[0] ?? defaultHue
  })
  const [sliderSatVal, setSliderSatVal] = useState(() => {
    const savedBackground = localStorage.getItem(localStorageBackground)
    const backgroundColor = savedBackground ? JSON.parse(savedBackground) : null
    return backgroundColor?.[1] ?? defaultSaturation
  })

  const [sliderLightVal, setSliderLightVal] = useState(() => {
    const savedBackground = localStorage.getItem(localStorageBackground)
    const backgroundColor = savedBackground ? JSON.parse(savedBackground) : null
    return backgroundColor?.[2] ?? defaultLightness
  })

  const backgroundColorStyle = {
    backgroundColor: `hsl(var(--hue${d}), calc(var(--saturation${d}) * 1%), calc(var(--lightness${d}) * 1%))`,
  }
  const [dragWrapOuterHue, setDragWrapOuterHue] = useState<CSSProperties>(
    sliderHueInput.current
      ? {
          [`--hue${d}` as string]: `${sliderHueInput.current.value}`,
        }
      : {
          [`--hue${d}` as string]: `${sliderHueVal}`,
        }
  )
  const [dragWrapOuterSaturation, setDragWrapOuterSaturation] = useState<CSSProperties>(
    sliderSaturationInput.current
      ? {
          [`--saturation${d}` as string]: `${sliderSaturationInput.current.value}`,
        }
      : {
          [`--saturation${d}` as string]: `${sliderSatVal}`,
        }
  )
  const [dragWrapOuterLightness, setDragWrapOuterLightness] = useState<CSSProperties>(
    sliderLightnessInput.current
      ? {
          [`--lightness${d}` as string]: `${sliderLightnessInput.current.value}`,
        }
      : {
          [`--lightness${d}` as string]: `${sliderLightVal}`,
        }
  )

  function sliderHue() {
    if (dragWrapOuter.current) {
      setDragWrapOuterHue({ [`--hue${d}` as string]: `${sliderHueVal}` })
      const updatedBackgroundColor = JSON.parse(JSON.stringify(backgroundColor))
      updatedBackgroundColor[d][0] = sliderHueVal
      dispatch({
        type: 'setBackgroundColor',
        payload: { d, backgroundColor: updatedBackgroundColor[d] },
      })
      saveBackground(updatedBackgroundColor[d])
    }
  }

  function sliderSaturation() {
    if (dragWrapOuter.current) {
      setDragWrapOuterSaturation({ [`--saturation${d}` as string]: `${sliderSatVal}` })
      const updatedBackgroundColor = JSON.parse(JSON.stringify(backgroundColor))
      updatedBackgroundColor[d][1] = sliderSatVal
      dispatch({
        type: 'setBackgroundColor',
        payload: { d, backgroundColor: updatedBackgroundColor[d] },
      })
      saveBackground(updatedBackgroundColor[d])
    }
  }

  function sliderLightness() {
    if (dragWrapOuter.current) {
      setDragWrapOuterLightness({ [`--lightness${d}` as string]: `${sliderLightVal}` })

      const updatedBackgroundColor = JSON.parse(JSON.stringify(backgroundColor))
      updatedBackgroundColor[d][2] = sliderLightVal
      dispatch({
        type: 'setBackgroundColor',
        payload: { d, backgroundColor: updatedBackgroundColor[d] },
      })
      saveBackground(updatedBackgroundColor[d])
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
    setDragWrapOuterLightness({ [`--lightness${d}` as string]: `${defaultLightness}` })
    if (sliderLightnessInput.current)
      sliderLightnessInput.current.value = defaultLightness
    setSliderLightVal(defaultLightness)
    const updatedBackgroundColor = JSON.parse(JSON.stringify(backgroundColor))
    updatedBackgroundColor[d][2] = defaultLightness
    saveBackground(updatedBackgroundColor[d])
    dispatch({
      type: 'setBackgroundColor',
      payload: { d, backgroundColor: updatedBackgroundColor[d] },
    })
  }

  function sliderSaturationReset() {
    setDragWrapOuterSaturation({ [`--saturation${d}` as string]: `${defaultSaturation}` })
    if (sliderSaturationInput.current)
      sliderSaturationInput.current.value = defaultSaturation
    setSliderSatVal(defaultSaturation)
    const updatedBackgroundColor = JSON.parse(JSON.stringify(backgroundColor))
    updatedBackgroundColor[d][1] = defaultSaturation
    saveBackground(updatedBackgroundColor[d])
    dispatch({
      type: 'setBackgroundColor',
      payload: { d, backgroundColor: updatedBackgroundColor[d] },
    })
  }

  function sliderHueReset() {
    setDragWrapOuterHue({ [`--hue${d}` as string]: `${defaultHue}` })
    if (sliderHueInput.current) sliderHueInput.current.value = defaultHue
    setSliderHueVal(defaultHue)
    const updatedBackgroundColor = JSON.parse(JSON.stringify(backgroundColor))
    updatedBackgroundColor[d][0] = defaultHue
    saveBackground(updatedBackgroundColor[d])
    dispatch({
      type: 'setBackgroundColor',
      payload: { d, backgroundColor: updatedBackgroundColor[d] },
    })
  }

  //END SLIDERS

  useEffect(() => {
    widthResize()
  }, [windowWidth, windowHeight, scroll])

  const widthResize = () => {
    const y_pos = [10, 32, 54, 76] // color block y positions
    //place these items every time the window is resized
    if (makeMore0.current && dragWrap.current) place(makeMore0.current, 23, 0)
    if (makeRandom0.current && dragWrap.current)
      place(
        makeRandom0.current,
        50 - (makeRandom0.current.offsetWidth / dragWrap.current.offsetWidth) * 50,
        0
      )
    if (makeSmaller0.current && dragWrap.current)
      place(
        makeSmaller0.current,
        77 - (makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        0.3
      )
    if (layerDecrease.current && dragWrap.current)
      place(
        layerDecrease.current,
        34,
        100 - (layerDecrease.current.offsetHeight / dragWrap.current.offsetHeight) * 100
      )
    if (layerIncrease.current && dragWrap.current)
      place(
        layerIncrease.current,
        66 - (layerIncrease.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        100 - (layerIncrease.current.offsetHeight / dragWrap.current.offsetHeight) * 100
      )
    if (deleteBlob0.current && dragWrap.current)
      place(
        deleteBlob0.current,
        10,
        100 - (deleteBlob0.current.offsetHeight / dragWrap.current.offsetHeight) * 100
      )

    if (makeLarger0.current && dragWrap.current)
      place(
        makeLarger0.current,
        90 - (makeLarger0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        100 - (makeLarger0.current.offsetHeight / dragWrap.current.offsetHeight) * 100
      )
    // place color blocks:
    colorBlockPropsCombo.forEach((colorBlockArray) => {
      colorBlockArray.forEach((colorBlock, index) => {
        if (colorBlock.current && dragWrapOutest.current) {
          const x =
            index < 4
              ? 0
              : 100 -
                (colorBlock.current.offsetWidth / dragWrapOutest.current.offsetWidth) *
                  100
          const y = y_pos[index % 4]
          place(colorBlock.current, x, y)
        }
      })
    })
  }

  function place(element: HTMLElement, x_pos: number, y_pos: number) {
    if (element && dragWrap.current) {
      element.style.left = (dragWrap.current.offsetWidth / 100) * x_pos + 'px'
      element.style.top = (dragWrap.current.offsetHeight / 100) * y_pos + 'px'
    }
  }

  useEffect(() => {
    if (focusedBlob && markerEnabled && usingKeyboard && focusedBlob) {
      if (markerDivRef.current) {
        markerDivRef.current.style.top = `${
          focusedBlob.top + focusedBlob.width * -0.05
        }px`
        markerDivRef.current.style.left = `${
          focusedBlob.left + focusedBlob.width * -0.05
        }px`
        markerDivRef.current.style.width = `${focusedBlob.width * 1.1}px`
        markerDivRef.current.style.height = `${focusedBlob.height * 1.1}px`
      }
    }
  }, [focusedBlob, markerEnabled, usingKeyboard])

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
    const dragWrap = document.getElementById('drag-wrap' + d)
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

  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [currentPage, setCurrentPage] = useState<Record<number, number>>({ [d]: 1 })

  // Function to handle page change
  const handlePageChange = (dKey: number, newPage: number) => {
    setCurrentPage((prev) => ({ ...prev, [dKey]: newPage }))
  }

  // //save layer amount to local storage
  // useEffect(() => {
  //   saveLayerAmount()
  // }, [layerAmount])

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
    saveLayerAmount(newLayerAmount)
    setHiddenLayers(new Set()) // Reset hidden layers
    setTimeout(() => {
      widthResize()
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
    saveLayerAmount(newLayerAmount)
    setHiddenLayers(new Set()) // Reset hidden layers
    setTimeout(() => {
      widthResize()
    }, 300)
  }

  const pagination = (dKey: string, current: number, totalPages: number) => {
    const uniqueNumber = Math.random().toString(36).substr(2, 9)
    return hasSavedFiles ? (
      <div className='pagination-controls'>
        {current !== 1 ? (
          <>
            <button
              onClick={() => handlePageChange(Number(dKey), 1)}
              disabled={current === 1}
              className='btn-small pagination-btn'
            >
              &laquo;&nbsp;<span className='scr'>{EBackToStart[language]}</span>
            </button>
            <button
              onClick={() => handlePageChange(Number(dKey), Math.max(current - 1, 1))}
              disabled={current === 1}
              className='btn-small pagination-btn'
            >
              &nbsp;&lsaquo;&nbsp;<span className='scr'>{EPrevious[language]}</span>
            </button>
          </>
        ) : (
          <></>
        )}
        <span>
          {EPage[language]} {current} / {totalPages}
        </span>
        {current !== totalPages ? (
          <>
            <button
              onClick={() =>
                handlePageChange(Number(dKey), Math.min(current + 1, totalPages))
              }
              disabled={current === totalPages}
              className='btn-small pagination-btn'
            >
              <span className='scr'>{ENext[language]}</span>&nbsp;&rsaquo;&nbsp;
            </button>

            <button
              onClick={() => handlePageChange(Number(dKey), totalPages)}
              disabled={current === totalPages}
              className='btn-small pagination-btn'
            >
              <span className='scr'>{EToLastPage[language]}</span>&nbsp;&raquo;
            </button>
          </>
        ) : (
          <></>
        )}
        <div className='input-wrap items-per-page'>
          <label htmlFor={`items-per-page${d}-${uniqueNumber}`}>
            <input
              id={`items-per-page${d}-${uniqueNumber}`}
              className=''
              type='number'
              value={itemsPerPage}
              placeholder={itemsPerPage.toString()}
              min={1}
              max={100}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            />
            <span>{EPerPage[language]}</span>
          </label>
        </div>
      </div>
    ) : (
      <></>
    )
  }

  // scroll to #drag-container:
  const goToArt1 = (number: number) => {
    const dragContainer = document.getElementById(`drag-container${number}`)
    if (dragContainer) {
      dragContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <section id={`drag-container${d}`} className={`drag-container drag-container${d}`}>
        <div className='blob-title-wrap'>
          <h2 className='blob-title'>
            {EBlobArt[language]} {d + 1}
          </h2>
          {d === 0 ? (
            <p>{EMoreColorsAvailableThroughRandomBlobButton[language]} </p>
          ) : d === 1 ? (
            <p>
              {EWithMoreMutedColors[language]}.{' '}
              {EMoreColorsAvailableThroughRandomBlobButton[language]}{' '}
            </p>
          ) : d === 2 ? (
            <p>
              {EDarkerColors[language]}.{' '}
              {EMoreColorsAvailableThroughRandomBlobButton[language]}{' '}
            </p>
          ) : (
            <p>{EMoreColorsAvailableThroughRandomBlobButton[language]}</p>
          )}
        </div>
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
            className='stop-blobs tooltip-wrap'
            onClick={(e) => {
              stopSway(e)
            }}
            aria-labelledby={`stop-blobs${d}-span`}
          >
            <span id={`stop-blobs${d}-span`} className='tooltip right above space'>
              {EAfterEnablingThereIsASlightDelayBeforeAllTheBlobsAreMovingAgain[language]}
            </span>
            {paused ? EStartSway[language] : EStopSway[language]}
          </button>
          <button
            ref={resetBlobs}
            id={`reset-blobs${d}`}
            aria-labelledby={`reset-blobs${d}-span`}
            className='reset-blobs tooltip-wrap'
            onClick={(e) => {
              resetBlobsFunction(e)
            }}
          >
            <span id={`reset-blobs${d}-span`} className='tooltip above space'>
              {EGetANewSetOfBlobs[language]}
            </span>{' '}
            {EReset[language]}
          </button>
          <button
            id={`toggle-marker${d}`}
            aria-labelledby={`toggle-marker${d}-span`}
            className='toggle-marker tooltip-wrap'
            onClick={() => setMarkerEnabled(!markerEnabled)}
          >
            <span
              id={`toggle-marker${d}-span`}
              className='tooltip left above space'
            >{`${EToggleMarkerVisibilityWhenUsingAKeyboard[language]}`}</span>
            {markerEnabled ? EMarkerOn[language] : EMarkerOff[language]}
          </button>

          <button
            ref={disableScrollButton}
            id={`disable-scroll${d}`}
            aria-labelledby={`disable-scroll${d}-span`}
            className={`disable-scroll tooltip-wrap ${!scroll ? 'active' : ''}`}
            onClick={() => {
              disableScroll()
            }}
          >
            <span id={`disable-scroll${d}-span`} className='tooltip right above space'>
              {scroll
                ? EDisableScrollInOrderToUseTheMouseWheelToResizeABlob[language]
                : EPressHereOrEscapeToRestoreScrolling[language]}
            </span>
            {scroll ? EDisableScroll[language] : EEnableScroll[language]}
          </button>

          <button
            id={`toggle-controls${d}`}
            aria-labelledby={`toggle-controls${d}-span`}
            className={`toggle-controls ${!controlsVisible ? 'active' : ''}`}
            onClick={() => {
              setControlsVisible(!controlsVisible)
              if (!controlsVisible) {
                setTimeout(() => {
                  widthResize()
                }, 200)
              }
            }}
          >
            <span id={`toggle-controls${d}-span`}>
              {' '}
              {controlsVisible ? EHideControls[language] : EShowControls[language]}
            </span>
          </button>
          <button
            id={`take-screenshot${d}`}
            aria-labelledby={`take-screenshot${d}-span`}
            disabled={loading}
            onClick={takeScreenshot}
            className='reset screenshot tooltip-wrap'
          >
            <FaCamera />
            <span id={`take-screenshot${d}-span`} className='tooltip left below space'>
              {loading ? ELoading[language] : EClickHereToTakeAScreenshot[language]}
            </span>
          </button>
        </div>
        <div ref={dragWrapOutest} className={`drag-wrap-outest drag-wrap-outest${d}`}>
          <div
            ref={dragWrapOuter}
            id={`drag-wrap-outer${d}`}
            className='drag-wrap-outer'
            style={{
              ...dragWrapOuterLightness,
              ...dragWrapOuterSaturation,
              ...dragWrapOuterHue,
              ...backgroundColorStyle,
            }}
          >
            <div
              tabIndex={0}
              ref={makeSmaller0}
              className={`make-smaller tooltip-wrap reset ${
                !controlsVisible ? 'hidden' : ''
              }`}
              id={`make-smaller${d}`}
            >
              <ImShrink2 />
              <span
                id={`make-smaller${d}-span`}
                className='tooltip left below'
              >{`${EShrinkInstructions[language]}. ${EAlternatively[language]}: ${EResizebyScrollInstructions[language]}`}</span>
            </div>
            <div
              ref={makeLarger0}
              className={`make-larger tooltip-wrap reset ${
                !controlsVisible ? 'hidden' : ''
              }`}
              id={`make-larger${d}`}
            >
              <ImEnlarge2 />
              <span
                id={`make-larger${d}-span`}
                className='tooltip left above'
              >{`${EEnlargeInstructions[language]}. ${EAlternatively[language]}: ${EResizebyScrollInstructions[language]}`}</span>
            </div>

            <div
              ref={makeMore0}
              className={`make-more tooltip-wrap reset ${
                !controlsVisible ? 'hidden' : ''
              }`}
              id={`make-more${d}`}
            >
              <FaRegClone />
              <span id={`make-more${d}-span`} className='tooltip right below'>
                {ECloneInstructions[language]}
              </span>
            </div>
            <button
              ref={makeRandom0}
              className={`make-random tooltip-wrap  ${!controlsVisible ? 'hidden' : ''}`}
              id={`make-random${d}`}
              aria-labelledby={`make-random${d}-span`}
              onClick={() => addRandomDraggable()}
            >
              <FaPlus />
              <span
                id={`make-random${d}-span`}
                className='tooltip below'
              >{`${EClickMeToMakeARandomBlob[language]}. ${EMoreColorsAvailable[language]}!`}</span>
            </button>
            <div
              ref={deleteBlob0}
              className={`delete-blob tooltip-wrap reset ${
                !controlsVisible ? 'hidden' : ''
              }`}
              id={`delete-blob${d}`}
            >
              <FaTimes />
              <span id={`delete-blob${d}-span`} className='tooltip right above'>
                {ERemovalInstructions[language]}
              </span>
            </div>

            <div
              ref={layerDecrease}
              id={`layer-decrease${d}`}
              className={`layer-adjust layer-decrease tooltip-wrap ${
                !controlsVisible ? 'hidden' : ''
              }`}
            >
              <span
                id={`layer-decrease${d}-span`}
                className='tooltip above right'
              >{`${EDecreaseBlobLayerBy1Instructions[language]} ${EKeyboardUsePressTheCorrespondingLayerNumber[language]}`}</span>
              <BiChevronDown />
            </div>
            <div
              ref={layerIncrease}
              id={`layer-increase${d}`}
              className={`layer-adjust layer-increase tooltip-wrap ${
                !controlsVisible ? 'hidden' : ''
              }`}
            >
              <span
                id={`layer-increase${d}-span`}
                className='tooltip above left'
              >{`${EIncreaseBlobLayerBy1Instructions[language]} ${EKeyboardUsePressTheCorrespondingLayerNumber[language]}`}</span>
              <BiChevronUp />
            </div>

            {markerEnabled && usingKeyboard && focusedBlob && (
              <div
                ref={markerDivRef}
                style={{
                  position: 'absolute',
                  top: `${focusedBlob.top + focusedBlob.width * -0.05}px`,
                  left: `${focusedBlob.left + focusedBlob.width * -0.05}px`,
                  width: `${focusedBlob.width * 1.1}px`,
                  height: `${focusedBlob.height * 1.1}px`,
                  outline: '3px dashed black',
                  outlineOffset: '2px',
                  border: '3px dashed white',
                  borderRadius: '50%',
                  zIndex: 999,
                }}
              />
            )}

            <div ref={dragWrap} id={`drag-wrap${d}`} className='drag-wrap'>
              <DragLayer
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
                dispatch2={dispatch2}
                d={d}
                items={draggables[d] ?? []}
                amountOfBlobs={amountOfBlobs}
                saveDraggables={saveDraggables}
                getPosition={getPosition}
                colorBlockProps={colorBlockPropsCombo}
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
                setFocusedBlob={setFocusedBlob}
                colorIndex={colorIndex}
                setColorIndex={setColorIndex}
                colorPairs={colorPairsCombo}
                scroll={scroll}
                setScroll={setScroll}
                clickOutsideRef={dragWrap}
              />
            </div>
          </div>
          <ColorBlocks
            d={d}
            language={language}
            getRefName={getRefName}
            map={refNameMappingCombo}
            colorBlockProps={colorBlockPropsCombo}
            colorPairs={colorPairsCombo}
            controlsVisible={controlsVisible}
          />
        </div>
        <div className='layer-mover-control-wrap'>
          <div className={`movers-wrap movers-wrap1 ${!controlsVisible ? 'hidden' : ''}`}>
            <button
              id={`moveleft${d}`}
              aria-labelledby={`moveleft${d}-span`}
              className={`moveleft mover tooltip-wrap`}
              onClick={handleMoveRight}
            >
              <BiChevronsLeft />
              <span id={`moveleft${d}-span`} className='tooltip above right'>
                {EMoveViewLeft[language]}
              </span>
            </button>
            <button
              id={`moveright${d}`}
              aria-labelledby={`moveright${d}-span`}
              className={`moveright mover tooltip-wrap`}
              onClick={handleMoveLeft}
            >
              <BiChevronsRight />
              <span id={`moveright${d}-span`} className='tooltip above right'>
                {EMoveViewRight[language]}
              </span>
            </button>
          </div>
          <div className='layer-btn-wrap layer-tools layer-tools1'>
            <button
              id={`decrease-layer-amount${d}`}
              aria-labelledby={`decrease-layer-amount${d}-span`}
              className='layer-tool layer-amount decrease-layer-amount tooltip-wrap'
              onClick={deleteHiddenLayers}
            >
              <span id={`decrease-layer-amount${d}-span`} className='tooltip above right'>
                {EDeleteHiddenLayers[language]}
              </span>
              <BiMinus />
            </button>
            <button
              id={`every-layer-minus${d}`}
              aria-labelledby={`every-layer-minus${d}-span`}
              className='layer-tool every-layer tooltip-wrap'
              onClick={() => changeEveryLayer(-1)}
            >
              <span id={`every-layer-minus${d}-span`} className='tooltip above right'>
                {EClickHereToMoveDownLayer[language]}
              </span>
              <BiChevronDown />
            </button>
          </div>
          <div className='layer-btn-wrap layers'>
            {Array.from({ length: layerAmount }, (_, i) => i).map((layer, index) => (
              <button
                key={`${layer}*${index}`}
                id={`layer-button${layer}`}
                aria-labelledby={`layer-button${layer}-span`}
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
                <span id={`layer-button${layer}-span`}>
                  <span className='scr'>{ELayer[language]}</span> {layer + 1}{' '}
                  <span className='tooltip above'>
                    {activeLayer === layer
                      ? EToggleLayerByClickingMe[language]
                      : EChangeLayerByClickingMe[language]}
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className='layer-btn-wrap layer-tools layer-tools2'>
            <button
              id={`every-layer-plus${d}`}
              aria-labelledby={`every-layer-plus${d}-span`}
              className='layer-tool every-layer tooltip-wrap'
              onClick={() => changeEveryLayer(1)}
            >
              <span id={`every-layer-plus${d}-span`} className='tooltip above left'>
                {EClickHereToMoveUpLayer[language]}
              </span>
              <BiChevronUp />
            </button>
            <button
              id={`increase-layer-amount${d}`}
              aria-labelledby={`increase-layer-amount${d}-span`}
              className='layer-tool layer-amount increase-layer-amount tooltip-wrap'
              onClick={() => addToLayerAmount(1)}
            >
              <span id={`increase-layer-amount${d}-span`} className='tooltip above left'>
                {EGetMoreLayers[language]}
              </span>
              <BiPlus />
            </button>
          </div>
          <div className={`movers-wrap movers-wrap2 ${!controlsVisible ? 'hidden' : ''}`}>
            <button
              id={`moveup${d}`}
              aria-labelledby={`moveup${d}-span`}
              className={`moveup mover tooltip-wrap`}
              onClick={handleMoveDown}
            >
              <BiChevronsUp />
              <span id={`moveup${d}-span`} className='tooltip above left'>
                {EMoveViewUp[language]}
              </span>
            </button>
            <button
              id={`movedown${d}`}
              aria-labelledby={`movedown${d}-span`}
              className={`movedown mover tooltip-wrap`}
              onClick={handleMoveUp}
            >
              <BiChevronsDown />
              <span id={`movedown${d}-span`} className='tooltip above left'>
                {EMoveViewDown[language]}
              </span>
            </button>
          </div>
        </div>
        <Sliders
          d={d}
          defaultHue={defaultHue}
          defaultSaturation={defaultSaturation}
          defaultLightness={defaultLightness}
          setSliderHueVal={setSliderHueVal}
          setSliderSatVal={setSliderSatVal}
          setSliderLightVal={setSliderLightVal}
          language={language}
          sliderLightness={sliderLightness}
          sliderSaturation={sliderSaturation}
          sliderHue={sliderHue}
          sliderLightnessReset={sliderLightnessReset}
          sliderSaturationReset={sliderSaturationReset}
          sliderHueReset={sliderHueReset}
          sliderLightVal={sliderLightVal}
          sliderSatVal={sliderSatVal}
          sliderHueVal={sliderHueVal}
          sliderLightnessInput={sliderLightnessInput}
          sliderSaturationInput={sliderSaturationInput}
          sliderHueInput={sliderHueInput}
        />
        <div ref={exitApp} id={`exitblob${d}`} className='exitblob'></div>
        {user ? (
          <div className='blob-handling'>
            <div className='full wide flex column center gap'>
              <form onSubmit={(e) => saveBlobsToServer(e)}>
                <div className='input-wrap'>
                  <label htmlFor={`blobname${d}`}>
                    <input
                      id={`blobname${d}`}
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
            <div
              ref={blobScreenshot}
              id={`blob-screenshot${d}`}
              style={{ display: 'none' }}
            >
              <button onClick={saveScreenshot}>{EDownload[language]}</button>
              <img
                src=''
                ref={screenshotImg}
                alt={EScreenshot[language]}
                style={imgStyle}
              />
              <button onClick={saveScreenshot}>{EDownload[language]}</button>
            </div>
            <h3>{EArt[language]}</h3>
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
                    {pagination(dKey, current, totalPages)}
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
                              {ELoad[language]} <span className='scr'>{versionName}</span>
                            </button>
                            <button
                              onClick={() =>
                                deleteBlobsVersionFromServer(Number(dKey), versionName)
                              }
                            >
                              {EDelete[language]}{' '}
                              <span className='scr'>{versionName}</span>
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
                                  <span>{ERename[language]}:</span>{' '}
                                  <span className='scr'>{versionName}</span>
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
                                {EEdit[language]}{' '}
                                <span className='scr'>
                                  {versionName}: {ENewName[language]} {newName}
                                </span>
                              </button>
                            </Accordion>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {/* Pagination Controls */}
                    {pagination(dKey, current, totalPages)}
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
        <svg className='filter'>
          <filter id='svgfilter0'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='7'></feGaussianBlur>
            <feColorMatrix
              values='
1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 50 -18
'
            ></feColorMatrix>
          </filter>
        </svg>
        <svg className='filter'>
          <filter id='svgfilter1'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='8'></feGaussianBlur>
            <feColorMatrix
              values='
1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 46 -28
'
            ></feColorMatrix>
          </filter>
        </svg>
      </section>
    </>
  )
}
