import {
  useRef,
  useEffect,
  useState,
  CSSProperties,
  PointerEvent as PointerEventReact,
  MouseEvent as MouseEventReact,
  TouchEvent as TouchEventReact,
  FormEvent,
  ChangeEvent,
  Dispatch as DispatchReact,
  SetStateAction,
  useContext,
  useCallback,
  useMemo,
} from 'react'
import { getRandomMinMax, hslToHex, sanitize } from '../../../utils'
import {
  Draggable,
  RefObject,
  focusedBlob,
  ColorPair,
  SavedBlobs,
  Modes,
} from '../types'
import { BlobContext } from './BlobProvider'
import { ReducerProps } from '../../../types'
import {
  BiChevronDown,
  BiChevronsDown,
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronsUp,
  BiChevronUp,
  BiPlus,
} from 'react-icons/bi'
import { ImEnlarge2, ImShrink2, ImCamera } from 'react-icons/im'
import { FaPlus, FaRegClone, FaSave } from 'react-icons/fa'
import useWindowSize from '../../../hooks/useWindowSize'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import Accordion from '../../Accordion/Accordion'
import { notify } from '../../../reducers/notificationReducer'
import { initializeUser } from '../../../reducers/authReducer'
import { initializeUsers } from '../../../reducers/usersReducer'
import { useNavigate } from 'react-router-dom'
import blobService from '../services/blob'
import { useLanguageContext } from '../../../contexts/LanguageContext'
import { useConfirm } from '../../../contexts/ConfirmContext'
import { useIsClient, useWindow } from '../../../hooks/useSSR'
import ColorBlocks from './ColorBlocks'
import Sliders from './Sliders'
import DragLayers from './DragLayers'
import { getErrorMessage } from '../../../utils'

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

const angle = '90deg'

const defaultLayerAmount = 3

const preventDefault = (e: Event) => {
  e.preventDefault()
}

export default function DragContainer({
  d,
  dragWrapOuter,
  scroll,
  setScroll,
}: {
  d: number
  dragWrapOuter: RefObject<HTMLDivElement>
  scroll: boolean
  setScroll: DispatchReact<SetStateAction<boolean>>
}) {
  const isClient = useIsClient()
  const windowObj = useWindow()

  const { t, language } = useLanguageContext()
  const confirm = useConfirm()

  const defaultHue = '214'
  const defaultSaturation = d === 0 ? '80' : d === 2 ? '50' : '45'
  const defaultLightness = d === 0 ? '30' : d === 2 ? '5' : '25'

  const { state, dispatch } = useContext(BlobContext)!
  const dispatch2 = useAppDispatch()
  const user = useSelector((state: ReducerProps) => state.auth?.user)
  const users = useSelector((state: ReducerProps) => state.users ?? [])

  const dragWrap = useRef(null) as RefObject<HTMLDivElement>
  const dragWrapOutest = useRef(null) as RefObject<HTMLDivElement>

  const [selectedvalue0, setSelectedvalue0] = useState<string | null>(null)

  const stopBlobs = useRef(null) as RefObject<HTMLButtonElement>
  const disableScrollButton = useRef(null) as RefObject<HTMLButtonElement>
  const resetBlobs = useRef(null) as RefObject<HTMLButtonElement>
  const [loading, setLoading] = useState(false)

  const exitApp = useRef(null) as RefObject<HTMLDivElement>

  const makeLarger0 = useRef(null) as RefObject<HTMLButtonElement>
  const makeSmaller0 = useRef(null) as RefObject<HTMLButtonElement>
  const makeMore0 = useRef(null) as RefObject<HTMLButtonElement>
  const deleteBlob0 = useRef(null) as RefObject<HTMLButtonElement>
  const layerIncrease = useRef(null) as RefObject<HTMLButtonElement>
  const layerDecrease = useRef(null) as RefObject<HTMLButtonElement>

  const makeRandom0 = useRef(null) as RefObject<HTMLButtonElement>

  const markerDivRef = useRef<HTMLDivElement>(null)

  const sliderLightnessInput = useRef(null) as RefObject<HTMLInputElement>
  const sliderSaturationInput = useRef(null) as RefObject<HTMLInputElement>
  const sliderHueInput = useRef(null) as RefObject<HTMLInputElement>

  const localStorageLayerAmount = useMemo(() => {
    return `BlobLayerAmount${d.toString()}`
  }, [d])
  const localStorageBackground = useMemo(() => {
    return `BackgroundColor${d.toString()}`
  }, [d])
  const localStorageDraggables = useMemo(() => {
    return `Draggables${d.toString()}`
  }, [d])

  const backgroundColor = state.backgroundColor

  //loadBackground()

  const draggables = state.draggables

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
  const [hasBeenMade, setHasBeenMade] = useState<boolean>(false)
  const [paused, setPaused] = useState<boolean>(false)
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false)

  const draggablesD = draggables[d]

  const [name, setName] = useState<string>(t('BlobArt'))
  const [newName, setNewName] = useState(name)
  const [editName, setEditName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasSavedFiles, setHasSavedFiles] = useState(false)

  const [trackSaving, setTrackSaving] = useState(false)
  const [savedDraggablesbyD, setSavedDraggablesByD] = useState<
    Record<number, Record<string, SavedBlobs>>
  >({})

  const [layerAmount, setLayerAmount] = useState<number>(0)

  const colorBlockOrange = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockRed = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockPurple = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockBlue = useRef(null) as RefObject<HTMLButtonElement>

  const colorBlockYellowLime = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockCyanYellow = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockCyanPink = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockPinkYellow = useRef(null) as RefObject<HTMLButtonElement>

  const colorBlockReddish = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockBrown = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockKhaki = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockBluish = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockPurplish = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockGreenish = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockTan = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockGray = useRef(null) as RefObject<HTMLButtonElement>

  const colorBlockDarkPurple = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockDarkPink = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockDarkRed = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockDarkOrange = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockDarkGreen = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockGreenishBlue = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockDarkBlue = useRef(null) as RefObject<HTMLButtonElement>
  const colorBlockPurplishBlue = useRef(null) as RefObject<HTMLButtonElement>

  // Create a mapping between the ref objects and their names
  const refNameMapping = useMemo(() => {
    return new Map<RefObject<HTMLButtonElement>, string>([
      [colorBlockOrange, 'colorBlockOrange'],
      [colorBlockRed, 'colorBlockRed'],
      [colorBlockPurple, 'colorBlockPurple'],
      [colorBlockBlue, 'colorBlockBlue'],
      [colorBlockYellowLime, 'colorBlockYellowLime'],
      [colorBlockCyanYellow, 'colorBlockCyanYellow'],
      [colorBlockCyanPink, 'colorBlockCyanPink'],
      [colorBlockPinkYellow, 'colorBlockPinkYellow'],
    ])
  }, [
    colorBlockOrange,
    colorBlockRed,
    colorBlockPurple,
    colorBlockBlue,
    colorBlockYellowLime,
    colorBlockCyanYellow,
    colorBlockCyanPink,
    colorBlockPinkYellow,
  ])

  const refNameMapping2 = useMemo(() => {
    return new Map<RefObject<HTMLButtonElement>, string>([
      [colorBlockReddish, 'colorBlockReddish'],
      [colorBlockBrown, 'colorBlockBrown'],
      [colorBlockTan, 'colorBlockTan'],
      [colorBlockKhaki, 'colorBlockKhaki'],
      [colorBlockPurplish, 'colorBlockPurplish'],
      [colorBlockBluish, 'colorBlockBluish'],
      [colorBlockGreenish, 'colorBlockGreenish'],
      [colorBlockGray, 'colorBlockGray'],
    ])
  }, [
    colorBlockReddish,
    colorBlockBrown,
    colorBlockTan,
    colorBlockKhaki,
    colorBlockPurplish,
    colorBlockBluish,
    colorBlockGreenish,
    colorBlockGray,
  ])

  const refNameMapping3 = useMemo(() => {
    return new Map<RefObject<HTMLButtonElement>, string>([
      [colorBlockDarkPurple, 'colorBlockDarkPurple'],
      [colorBlockDarkPink, 'colorBlockDarkPink'],
      [colorBlockDarkRed, 'colorBlockDarkRed'],
      [colorBlockDarkOrange, 'colorBlockDarkOrange'],
      [colorBlockDarkGreen, 'colorBlockDarkGreen'],
      [colorBlockGreenishBlue, 'colorBlockGreenishBlue'],
      [colorBlockDarkBlue, 'colorBlockDarkBlue'],
      [colorBlockPurplishBlue, 'colorBlockPurplishBlue'],
    ])
  }, [
    colorBlockDarkPurple,
    colorBlockDarkPink,
    colorBlockDarkRed,
    colorBlockDarkOrange,
    colorBlockDarkGreen,
    colorBlockGreenishBlue,
    colorBlockDarkBlue,
    colorBlockPurplishBlue,
  ])

  const refNameMappingCombo = useMemo(() => {
    return [refNameMapping, refNameMapping2, refNameMapping3]
  }, [refNameMapping, refNameMapping2, refNameMapping3])

  const getRefName = useCallback(
    (
      refNameMapping: Map<RefObject<HTMLButtonElement>, string>,
      ref: RefObject<HTMLButtonElement>
    ): string | undefined => {
      return refNameMapping.get(ref)
    },
    []
  )

  // Should be in the same order as colorPairs:
  const colorBlockProps = useMemo(() => {
    return [
      colorBlockOrange,
      colorBlockRed,
      colorBlockPurple,
      colorBlockBlue,
      colorBlockYellowLime,
      colorBlockCyanYellow,
      colorBlockCyanPink,
      colorBlockPinkYellow,
    ]
  }, [
    colorBlockOrange,
    colorBlockRed,
    colorBlockPurple,
    colorBlockBlue,
    colorBlockYellowLime,
    colorBlockCyanYellow,
    colorBlockCyanPink,
    colorBlockPinkYellow,
  ])

  const colorBlockProps2 = useMemo(() => {
    return [
      colorBlockReddish,
      colorBlockBrown,
      colorBlockTan,
      colorBlockKhaki,
      colorBlockPurplish,
      colorBlockBluish,
      colorBlockGreenish,
      colorBlockGray,
    ]
  }, [
    colorBlockReddish,
    colorBlockBrown,
    colorBlockTan,
    colorBlockKhaki,
    colorBlockPurplish,
    colorBlockBluish,
    colorBlockGreenish,
    colorBlockGray,
  ])

  const colorBlockProps3 = useMemo(() => {
    return [
      colorBlockDarkPurple,
      colorBlockDarkPink,
      colorBlockDarkRed,
      colorBlockDarkOrange,
      colorBlockDarkGreen,
      colorBlockGreenishBlue,
      colorBlockDarkBlue,
      colorBlockPurplishBlue,
    ]
  }, [
    colorBlockDarkPurple,
    colorBlockDarkPink,
    colorBlockDarkRed,
    colorBlockDarkOrange,
    colorBlockDarkGreen,
    colorBlockGreenishBlue,
    colorBlockDarkBlue,
    colorBlockPurplishBlue,
  ])

  const colorBlockPropsCombo = useMemo(() => {
    return [colorBlockProps, colorBlockProps2, colorBlockProps3]
  }, [colorBlockProps, colorBlockProps2, colorBlockProps3])

  const [selectedColor, setSelectedColor] = useState<string>('')

  const changeColor = useCallback(
    (id: string) => {
      if (!selectedColor) {
        return
      }
      void dispatch({
        type: 'partialUpdate',
        payload: {
          d: d,
          id: id,
          update: {
            background: selectedColor,
          },
        },
      })
    },
    [d, dispatch, selectedColor]
  )

  const changeBlobLayer = useCallback(
    (draggable: Draggable, layer: number) => {
      const z = highestZIndex[layer] + 1
      void dispatch({
        type: 'partialUpdate',
        payload: { d, id: draggable.id, update: { layer, z } },
      })
      setActiveLayer(layer)
    },
    [d, dispatch, highestZIndex]
  )

  const toggleLayerVisibility = useCallback((layer: number) => {
    setHiddenLayers(prevHiddenLayers => {
      const newHiddenLayers = new Set(prevHiddenLayers)
      if (newHiddenLayers.has(layer)) {
        newHiddenLayers.delete(layer)
      } else {
        newHiddenLayers.add(layer)
        setActiveLayer(layer !== 0 ? layer - 1 : layer)
        if (document !== null) (document.activeElement as HTMLElement)?.blur()
      }
      return newHiddenLayers
    })
  }, [])

  //Check for keyboard use for the focusedBlob marker
  useEffect(() => {
    const keyupListener = () => setUsingKeyboard(true)
    const mousedownListener = () => {
      setUsingKeyboard(false)
    }
    const handleMouseUp = () => {
      setFocusedBlob(null) // To prevent Marker from showing up after keyboard use and mouseup
    }
    if (!isClient || !windowObj) return
    windowObj.addEventListener('keyup', keyupListener)
    windowObj.addEventListener('mousedown', mousedownListener)
    windowObj.addEventListener('mouseup', handleMouseUp)

    return () => {
      if (!isClient || !windowObj) return
      windowObj.removeEventListener('keyup', keyupListener)
      windowObj.removeEventListener('mousedown', mousedownListener)
      windowObj.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isClient, windowObj])

  const loadDraggables = useCallback(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (typeof window === 'undefined') {
          resolve(null)
          return
        }
        const draggablesJSON = localStorage.getItem(localStorageDraggables)
        if (
          draggablesJSON == null ||
          draggablesJSON == undefined ||
          draggablesJSON === 'undefined'
        ) {
          resolve(null)
        } else {
          const draggables: Draggable[] = JSON.parse(
            draggablesJSON
          ) as unknown as Draggable[]
          // Ensure each draggable has a layer property
          resolve(
            draggables.map(draggable => ({
              ...draggable,
              layer: draggable.layer ?? 0,
            }))
          )
        }
      }, 300)
    })
  }, [localStorageDraggables]) as () => Promise<Draggable[] | null>

  function loadLayerAmount(): Promise<number | null> {
    // First check the local storage value, then check if draggables[d] has blobs, finally return the default value if both are null
    return new Promise(resolve => {
      setTimeout(() => {
        if (typeof window === 'undefined') {
          resolve(null)
          return
        }
        const layerAmount = localStorage.getItem(localStorageLayerAmount)
        if (layerAmount != null) {
          resolve(parseInt(layerAmount))
        } else if (draggables[d]?.length > 0) {
          resolve(Math.max(...draggables[d].map(d => d.layer)) + 1)
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

  function loadBackground(): Promise<string[] | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (typeof window === 'undefined') {
          resolve(null)
          return
        }
        const backgroundColorJSON = localStorage.getItem(localStorageBackground)
        if (
          backgroundColorJSON == null ||
          backgroundColorJSON == undefined ||
          backgroundColorJSON === 'undefined'
        ) {
          resolve(null)
        } else {
          resolve(JSON.parse(backgroundColorJSON) as string[])
        }
      }, 300)
    })
  }

  const saveLayerAmount = useCallback(
    (amount: number = layerAmount) => {
      if (typeof window === 'undefined') return
      localStorage.setItem(localStorageLayerAmount, JSON.stringify(amount))
    },
    [layerAmount, localStorageLayerAmount]
  )

  const saveBackground = useCallback(
    (bg: string[] = backgroundColor[d]) => {
      if (typeof window === 'undefined') return
      localStorage.setItem(localStorageBackground, JSON.stringify(bg))
    },
    [backgroundColor, d, localStorageBackground]
  )

  const saveDraggables = useCallback(
    (blob: Draggable[] = draggables[d]) => {
      if (typeof window === 'undefined') return
      localStorage.setItem(localStorageDraggables, JSON.stringify(blob))
    },
    [d, draggables, localStorageDraggables]
  )

  const getBlobsFromServer = useCallback(async () => {
    setIsLoading(true)
    try {
      if (user?._id) {
        await blobService
          .getAllBlobsByUser(user?._id, d, language)
          .then((response: SavedBlobs[]) => {
            if (response) {
              // Initialize an empty object for sortedDraggables
              const sortedDraggables: Record<
                number,
                Record<string, SavedBlobs>
              > = {}

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
              setIsLoading(false)
            }
          })
          .catch((err: unknown) => {
            const message = getErrorMessage(err, t('Error'))
            void dispatch2(notify(message, true, 8))
            setIsLoading(false)
          })
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err, t('Error'))
      void dispatch2(notify(message, true, 8))
      setIsLoading(false)
    }
  }, [d, dispatch2, language, t, user?._id])

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
      void dispatch2(notify(t('SpecialCharactersNotAllowed'), true, 8))
    }
  }

  const handleNewNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (regex.test(value)) {
      setNewName(value)
    } else {
      void dispatch2(notify(t('SpecialCharactersNotAllowed'), true, 8))
    }
  }

  const saveBlobsToServer = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      if (name.trim() === '') {
        void dispatch2(notify(t('NameYourArtwork'), true, 8))
        setLoading(false)
        return
      } else if (name.trim().length > 30) {
        setLoading(false)
        void dispatch2(
          notify(
            `${t('NameTooLong')}. ${t('AMaxOf30CharactersPlease')}`,
            true,
            8
          )
        )
        return
      } else if (user?._id) {
        const versionName = name.trim()
        if (checkDuplicateVersionName(versionName)) {
          if (await confirm({ message: t('AVersionAlreadyExistsOverwrite') })) {
            // Proceed with saving, overwriting existing version
            await blobService
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
                setLoading(false)
                void dispatch2(notify(t('SavingSuccessful'), false, 8))
              })
              .catch((err: unknown) => {
                const message = getErrorMessage(err, t('Error'))
                void dispatch2(notify(message, true, 8))
              })
          }
        }
      } else {
        void dispatch2(notify(t('LoginToSaveBlobs'), true, 8))
        setLoading(false)
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err, t('Error'))
      void dispatch2(notify(message, true, 8))
      setLoading(false)
    }
  }

  const editBlobsByUser = async (
    versionName: string,
    newVersionName: string
  ) => {
    const newVersion = newVersionName.trim()
    if (newVersionName.trim() === '') {
      void dispatch2(notify(t('NameYourArtwork'), true, 8))
      return
    } else if (newVersionName.trim().length > 30) {
      void dispatch2(
        notify(`${t('NameTooLong')}. ${t('AMaxOf30CharactersPlease')}`, true, 8)
      )
      return
    } else {
      try {
        if (user?._id) {
          await blobService
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
              void dispatch2(notify(t('SavingSuccessful'), false, 8))
            })
            .catch((err: unknown) => {
              const message = getErrorMessage(err, t('Error'))
              void dispatch2(notify(message, true, 8))
            })
        } else {
          void dispatch2(notify(t('LoginToSaveBlobs'), true, 8))
        }
      } catch (err: unknown) {
        const message = getErrorMessage(err, t('Error'))
        void dispatch2(notify(message, true, 8))
      }
    }
  }

  const loadBlobsFromServer = async (d: number, versionName: string) => {
    const newVersion = versionName.trim()
    if (user?._id) {
      if (await confirm({ message: t('NoteThatUnsavedChangesWillBeLost') })) {
        await blobService
          .getBlobsVersionByUser(user?._id, d, newVersion, language)
          .then((response: SavedBlobs) => {
            const highestLayerInDraggables = Math.max(
              ...response.draggables.map(
                (draggable: Draggable) => draggable.layer
              )
            )
            setLayerAmount(highestLayerInDraggables + 1)
            setTimeout(() => {
              saveLayerAmount(highestLayerInDraggables + 1)
            }, 300)
            void dispatch({
              type: 'setDraggablesAtD',
              payload: { d, draggables: response.draggables },
            })
            void dispatch({
              type: 'setBackgroundColor',
              payload: { d, backgroundColor: response.backgroundColor },
            })
            saveBackground(response.backgroundColor)
            setSliderHueVal(response.backgroundColor[0])
            setSliderSatVal(response.backgroundColor[1])
            setSliderLightVal(response.backgroundColor[2])
            setDragWrapOuterHue({
              [`--hue${d}`]: `${response.backgroundColor[0]}`,
            })
            setDragWrapOuterSaturation({
              [`--saturation${d}`]: `${response.backgroundColor[1]}`,
            })
            setDragWrapOuterLightness({
              [`--lightness${d}`]: `${response.backgroundColor[2]}`,
            })
          })
          .then(() => {
            setName(newVersion)
            scrollToArt()

            setTimeout(() => {
              widthResize()
            }, 300)
          })
          .catch((err: unknown) => {
            const message = getErrorMessage(err, t('Error'))
            void dispatch2(notify(message, true, 8))
          })
      }
    }
  }

  const deleteBlobsVersionFromServer = async (
    d: number,
    versionName: string
  ) => {
    if (user._id) {
      if (
        await confirm({ message: t('AreYouSureYouWantToDeleteThisVersion') })
      ) {
        await blobService
          .deleteBlobsVersionByUser(user._id, d, versionName, language)
          .then(() => {
            void dispatch2(notify(t('DeletedArt'), false, 8))
            setTrackSaving(!trackSaving)
          })
          .catch((err: unknown) => {
            const message = getErrorMessage(err, t('Error'))
            void dispatch2(notify(message, true, 8))
          })
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch2(initializeUsers())
      await dispatch2(initializeUser())
    }
    void fetchData()
  }, [dispatch2])

  useEffect(() => {
    if (user) {
      void getBlobsFromServer()
    }
  }, [user, trackSaving, getBlobsFromServer])

  function getHighestZIndex(draggables: Draggable[]): Record<number, number> {
    return draggables.reduce(
      (acc, draggable) => {
        const zIndex = parseInt(draggable.z, 10)
        const layer = draggable.layer
        if (!acc[layer] || zIndex > acc[layer]) {
          acc[layer] = zIndex
        }
        return acc
      },
      {} as Record<number, number>
    )
  }

  useEffect(
    () => {
      const load = async () => {
        const loadedDraggables = await loadDraggables()
        const loadedBackgroundColor = await loadBackground()
        const delay = void setTimeout(() => {
          void (async () => {
            const loadedLayerAmount = await loadLayerAmount()
            if (loadedBackgroundColor?.length === 3) {
              void dispatch({
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
              void dispatch({
                type: 'setBackgroundColor',
                payload: {
                  d,
                  backgroundColor: [
                    defaultHue,
                    defaultSaturation,
                    defaultLightness,
                  ],
                },
              })
              saveBackground([defaultHue, defaultSaturation, defaultLightness])
            }
            if (loadedLayerAmount) {
              setLayerAmount(loadedLayerAmount)
            } else if (loadedDraggables && loadedDraggables.length > 0) {
              setLayerAmount(
                Math.max(...loadedDraggables.map(d => d.layer)) + 1
              )
            }
            if (loadedDraggables && loadedDraggables.length > 0) {
              if (loadedDraggables && loadedDraggables.length > 0) {
                makeFromStorage(loadedDraggables)
              }
              setHasBeenMade(true)
            } else if (
              (loadedDraggables === null || loadedDraggables === undefined) &&
              !hasBeenMade
            ) {
              makeAnew(amountOfBlobs, d)
              setHasBeenMade(true)
            }
          })()
        }, 300) // 300ms delay
        return () => clearTimeout(delay)
      }
      void load()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      d,
      hasBeenMade,
      dispatch,
      dragWrapOuter,
      defaultHue,
      defaultLightness,
      defaultSaturation,
    ]
  )

  useEffect(() => {
    if (draggablesD !== undefined && draggablesD?.length > 0) {
      saveDraggables()
      const highestZ = getHighestZIndex(draggablesD)
      setHighestZIndex(highestZ)
    }
  }, [draggablesD, saveDraggables])

  // function isValidDraggable(draggable: any): draggable is Draggable {
  //   return (
  //     typeof draggable === 'object' &&
  //     draggable !== null &&
  //     typeof draggable.layer === 'number' &&
  //     typeof draggable.id === 'string' &&
  //     typeof draggable.number === 'number' &&
  //     typeof draggable.i === 'number' &&
  //     typeof draggable.x === 'string' &&
  //     typeof draggable.y === 'string' &&
  //     typeof draggable.z === 'string' &&
  //     !isNaN(Number(draggable.z)) &&
  //     typeof draggable.background === 'string'
  //   )
  // }

  // function correctDraggable(draggable: any): Draggable {
  //   return {
  //     layer: typeof draggable.layer === 'number' ? draggable.layer : 0,
  //     id: typeof draggable.id === 'string' ? draggable.id : `blob${Date.now()}`,
  //     number: typeof draggable.number === 'number' ? draggable.number : 0,
  //     i: typeof draggable.i === 'number' ? draggable.i : 0,
  //     x: typeof draggable.x === 'string' ? draggable.x : '0px',
  //     y: typeof draggable.y === 'string' ? draggable.y : '0px',
  //     z: !isNaN(Number(draggable.z)) ? draggable.z : '1',
  //     background:
  //       typeof draggable.background === 'string'
  //         ? draggable.background
  //         : 'linear-gradient(90deg, cyan, greenyellow)',
  //   }
  // }

  // function updateInvalidDraggables() {
  //   const correctedDraggables = draggables[d].map(draggable =>
  //     isValidDraggable(draggable) ? draggable : correctDraggable(draggable)
  //   )
  //   void dispatch({
  //     type: 'setDraggablesAtD',
  //     payload: { d, draggables: correctedDraggables },
  //   })
  // }

  // useEffect(() => {
  //   updateInvalidDraggables() // temporary
  // }, [draggables[d]])

  function makeFromStorage(blobs: Draggable[]) {
    if (!hasBeenMade && blobs && blobs?.length > 0) {
      //dispatch({ type: 'resetDraggables', payload: {} })
      for (let i = 0; i < blobs?.length; i++) {
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
          void dispatch({
            type: 'addDraggable',
            payload: { d, draggable: newDraggable },
          })
        }
      }

      // setLayerAmount(Math.max(...blobs.map((d) => d.layer)) + 1)
    }
    setHasBeenMade(true)
  }

  const handleMoveLeft = () => {
    void dispatch({ type: 'moveDraggablesLeft', payload: { d } })
  }
  const handleMoveRight = () => {
    void dispatch({ type: 'moveDraggablesRight', payload: { d } })
  }
  const handleMoveUp = () => {
    void dispatch({ type: 'moveDraggablesUp', payload: { d } })
  }
  const handleMoveDown = () => {
    void dispatch({ type: 'moveDraggablesDown', payload: { d } })
  }

  function stopSway(
    e:
      | MouseEventReact<HTMLButtonElement, MouseEvent>
      | PointerEventReact<HTMLButtonElement>
  ) {
    e.preventDefault()
    const draggables = dragWrapOuter.current?.querySelectorAll('.dragzone')
    if (draggables && !paused) {
      draggables.forEach(draggable => {
        draggable.classList.remove('animation')
        // Trigger a reflow to ensure the class removal is processed:
        void (draggable as HTMLElement).offsetWidth
      })
      setPaused(true)
    } else if (draggables) {
      draggables.forEach(draggable => {
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
    if (!isClient || !windowObj) return
    const mediaQuery = windowObj.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const listener = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [isClient, windowObj])

  const amountOfBlobs = windowWidth > 700 ? 10 : 6 // Initial amount of blobs

  const escape = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          setScroll(true)

          if (document !== null) {
            document.body.style.overflowY = 'auto'
            document.body.style.overflowX = 'hidden'
          }
          break
      }
    },
    [setScroll]
  )

  useEffect(() => {
    if (!isClient || !windowObj) return
    windowObj.addEventListener('keyup', escape)
    return () => {
      windowObj.removeEventListener('keyup', escape)
    }
  }, [isClient, windowObj, escape])

  // Change every blob's layer by plus or minus one, unless any blob is already on the highest or lowest layer
  const changeEveryLayer = (amount: number) => {
    const isAnyOnLowestLayer = draggables[d].some(
      draggable => draggable.layer === 0 && amount < 0
    )
    const isAnyOnHighestLayer = draggables[d].some(
      draggable => draggable.layer === layerAmount - 1 && amount > 0
    )

    if (isAnyOnLowestLayer) {
      void dispatch2(
        notify(t('CannotLowerEveryBlobFurtherSomeBlobsAlreadyLowest'), true, 8)
      )
      return
    }

    if (isAnyOnHighestLayer) {
      void dispatch2(notify(t('CannotRaiseEveryBlobFurther'), true, 8))
      return
    }

    const newDraggables = draggables[d].map(draggable => {
      const layer = draggable.layer + amount
      if (layer >= 0 && layer < layerAmount) {
        return { ...draggable, layer }
      } else {
        return draggable
      }
    })

    void dispatch({
      type: 'setDraggablesAtD',
      payload: { d, draggables: newDraggables },
    })
  }

  async function resetBlobsFunction(
    e: MouseEventReact | TouchEventReact | PointerEventReact
  ) {
    e.preventDefault()
    if (await confirm({ message: `${t('ResetBlobs')}?` })) {
      if (!isClient || !windowObj) return

      windowObj.localStorage.removeItem(localStorageDraggables)

      void dispatch({ type: 'resetDraggables', payload: { d } })
      void dispatch({
        type: 'setDraggablesAtD',
        payload: { d, draggables: [] },
      })
      makeAnew(amountOfBlobs, d)
      setTimeout(() => {
        widthResize()
        saveLayerAmount(defaultLayerAmount)
      }, 300)
    }
  }

  const makeAnew = (amount: number, d: number) => {
    setActiveLayer(0)
    for (let i = 0; i < amount; i++) {
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
        i:
          windowWidth > 400
            ? Math.round(getRandomMinMax(7, 20))
            : Math.round(getRandomMinMax(7, 10)),
        x:
          windowWidth > windowHeight
            ? `${(windowWidth / 100) * Math.round(getRandomMinMax(2, 70))}px`
            : `${(windowWidth / 100) * Math.round(getRandomMinMax(2, 50))}px`,
        y: `${(windowHeight / 100) * Math.round(getRandomMinMax(2, 60))}px`,
        z: `1`,
        background: `linear-gradient(${angle ?? '90deg'}, ${
          colorFirst ?? 'cyan'
        },${colorSecond ?? 'greenyellow'})`,
      }
      void dispatch({
        type: 'addDraggable',
        payload: { d, draggable: newDraggable },
      })
    }

    setLayerAmount(defaultLayerAmount)
  }

  const colorswitch = () => {
    const colors = [
      'cyan',
      'lemonchiffon',
      'pink',
      'orangered',
      'magenta',
      'deepskyblue',
      'darkorange',
      'tomato',
      'violet',
      'dodgerblue',
      'greenyellow',
      'orange',
      'silver',
      'darkgray',
      'gray',
      'hotpink',
      'wheat',
      'sandybrown',
      'rosybrown',
      'dimgray',
      'darkkhaki',
      'darkseagreen',
      'slateblue',
      'royalblue',
      'moccasin',
      'burlywood',
      'chocolate',
      'cadetblue',
      'mediumpurple',
      'sienna',
      'peru',
      'indianred',
      'palevioletred',
      'plum',
      'palegreen',
      'mediumaquamarine',
      'lightsteelblue',
      'aquamarine',
      'yellowgreen',
    ]
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  useEffect(() => {
    return
  }, [state.draggables])

  const addRandomDraggable = (
    x_pos = `${(windowWidth / 100) * Math.round(getRandomMinMax(25, 55))}px`,
    y_pos = `${(windowHeight / 100) * Math.round(getRandomMinMax(2, 10))}px`,
    layer: number = activeLayer
  ) => {
    if (
      //makeRandom0 is focused:
      document !== null &&
      document.activeElement instanceof HTMLElement &&
      document.activeElement.id === `make-random${d}`
    )
      document.activeElement.blur() // Unfocus the button after clicking, as the tooltip will otherwise stay visible and be in the way

    if (hiddenLayers.has(activeLayer)) {
      void dispatch2(notify(t('LayerHidden'), true, 8))
      return
    }

    // Fully random:
    const colorFirst = colorswitch()
    const colorSecond = colorswitch()

    const maxId = Math.max(
      ...state.draggables[d].map((draggable: Draggable) =>
        parseInt(draggable.id.split('-')[0].replace('blob', ''), 10)
      )
    )

    const highestZ = !isNaN(highestZIndex[layer]) ? highestZIndex[layer] + 1 : 1

    const newDraggable: Draggable = {
      layer,
      id: `blob${maxId + 1}-${d}`,
      number: maxId + 1,
      i: Math.ceil(getRandomMinMax(6.5, 10)),
      x: x_pos,
      y: y_pos,
      z: `${highestZ}`,
      background: `linear-gradient(${angle ?? '90deg'}, ${
        colorFirst ?? 'cyan'
      },${colorSecond ?? 'greenyellow'})`,
    }
    void dispatch({
      type: 'duplicateDraggable',
      payload: { d, draggable: newDraggable },
    })
  }

  const getPosition = (draggable: HTMLElement) => {
    const blobID = draggable.id
    if (!isClient || !windowObj) return
    const blobStyle = windowObj.getComputedStyle(draggable)
    const blobNumber = parseInt(
      draggable.id.replace('blob', '').split('-')[0],
      10
    )
    const blobI =
      blobStyle.getPropertyValue('--i') ??
      draggable.style.getPropertyValue('--i') ??
      '10'
    const blobX =
      blobStyle.getPropertyValue('left') ??
      draggable.style.getPropertyValue('left')
    const blobY =
      blobStyle.getPropertyValue('top') ??
      draggable.style.getPropertyValue('top')
    const blobZ =
      blobStyle.getPropertyValue('z-index') ??
      draggable.style.getPropertyValue('z-index')
    const blobColor1 =
      blobStyle.getPropertyValue('background') ??
      draggable.style.getPropertyValue('background')
    const layer =
      blobStyle.getPropertyValue('--layer') ??
      draggable.style.getPropertyValue('--layer')

    const blobDraggable: Draggable = {
      layer: layer ? parseInt(layer) : activeLayer,
      id: blobID,
      number: blobNumber,
      i: isNaN(parseFloat(blobI)) ? 10 : parseFloat(blobI),
      x: blobX,
      y: blobY,
      z: blobZ,
      background: blobColor1 ?? 'linear-gradient(90deg, cyan, greenyellow)',
    }

    void dispatch({
      type: 'updateDraggable',
      payload: { d, draggable: blobDraggable },
    })
  }

  useEffect(() => {
    const dragWrapCurrent = dragWrapOuter.current

    if (!scroll && document !== null) {
      document.addEventListener('touchmove', preventDefault, {
        passive: false,
      })
      if (document !== null) document.body.style.overflow = 'hidden'
      dragWrapCurrent?.addEventListener('touchmove', preventDefault, {
        passive: false,
      })
      if (dragWrapCurrent) dragWrapCurrent.style.overflow = 'hidden'
    } else if (scroll && document !== null) {
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
      document.removeEventListener('touchmove', preventDefault)
      if (dragWrapCurrent) dragWrapCurrent.style.overflow = 'auto'
      dragWrapCurrent?.removeEventListener('touchmove', preventDefault)
    }
    return () => {
      document?.removeEventListener('touchmove', preventDefault)
      dragWrapCurrent?.removeEventListener('touchmove', preventDefault)
    }
  }, [scroll, dragWrapOuter])

  function disableScroll() {
    setScroll(!scroll)
  }

  // SLIDERS

  const [sliderHueVal, setSliderHueVal] = useState(() => {
    if (typeof window === 'undefined') return defaultHue
    const savedBackground = localStorage.getItem(localStorageBackground)
    const backgroundColor = savedBackground
      ? (JSON.parse(savedBackground) as string[])
      : null
    return backgroundColor?.[0] ?? defaultHue
  })
  const [sliderSatVal, setSliderSatVal] = useState(() => {
    if (typeof window === 'undefined') return defaultSaturation
    const savedBackground = localStorage.getItem(localStorageBackground)
    const backgroundColor = savedBackground
      ? (JSON.parse(savedBackground) as string[])
      : null
    return backgroundColor?.[1] ?? defaultSaturation
  })

  const [sliderLightVal, setSliderLightVal] = useState(() => {
    if (typeof window === 'undefined') return defaultLightness
    const savedBackground = localStorage.getItem(localStorageBackground)
    const backgroundColor = savedBackground
      ? (JSON.parse(savedBackground) as string[])
      : null
    return backgroundColor?.[2] ?? defaultLightness
  })

  const backgroundColorStyle = {
    backgroundColor: `hsl(var(--hue${d}), calc(var(--saturation${d}) * 1%), calc(var(--lightness${d}) * 1%))`,
  }
  const [dragWrapOuterHue, setDragWrapOuterHue] = useState<CSSProperties>(
    sliderHueInput.current
      ? {
          [`--hue${d}`]: `${sliderHueInput.current.value}`,
        }
      : {
          [`--hue${d}`]: `${sliderHueVal}`,
        }
  )
  const [dragWrapOuterSaturation, setDragWrapOuterSaturation] =
    useState<CSSProperties>(
      sliderSaturationInput.current
        ? {
            [`--saturation${d}`]: `${sliderSaturationInput.current.value}`,
          }
        : {
            [`--saturation${d}`]: `${sliderSatVal}`,
          }
    )
  const [dragWrapOuterLightness, setDragWrapOuterLightness] =
    useState<CSSProperties>(
      sliderLightnessInput.current
        ? {
            [`--lightness${d}`]: `${sliderLightnessInput.current.value}`,
          }
        : {
            [`--lightness${d}`]: `${sliderLightVal}`,
          }
    )

  function sliderHue() {
    if (dragWrapOuter.current) {
      setDragWrapOuterHue({ [`--hue${d}`]: `${sliderHueVal}` })
      const updatedBackgroundColor: string[][] = JSON.parse(
        JSON.stringify(backgroundColor)
      ) as unknown as string[][]
      updatedBackgroundColor[d][0] = sliderHueVal
      void dispatch({
        type: 'setBackgroundColor',
        payload: { d, backgroundColor: updatedBackgroundColor[d] },
      })
      saveBackground(updatedBackgroundColor[d])
    }
  }

  function sliderSaturation() {
    if (dragWrapOuter.current) {
      setDragWrapOuterSaturation({
        [`--saturation${d}`]: `${sliderSatVal}`,
      })
      const updatedBackgroundColor: string[][] = JSON.parse(
        JSON.stringify(backgroundColor)
      ) as unknown as string[][]
      updatedBackgroundColor[d][1] = sliderSatVal
      void dispatch({
        type: 'setBackgroundColor',
        payload: { d, backgroundColor: updatedBackgroundColor[d] },
      })
      saveBackground(updatedBackgroundColor[d])
    }
  }

  function sliderLightness() {
    if (dragWrapOuter.current) {
      setDragWrapOuterLightness({
        [`--lightness${d}`]: `${sliderLightVal}`,
      })

      const updatedBackgroundColor: string[][] = JSON.parse(
        JSON.stringify(backgroundColor)
      ) as unknown as string[][]
      updatedBackgroundColor[d][2] = sliderLightVal
      void dispatch({
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
    setDragWrapOuterLightness({
      [`--lightness${d}`]: `${defaultLightness}`,
    })
    if (sliderLightnessInput.current)
      sliderLightnessInput.current.value = defaultLightness
    setSliderLightVal(defaultLightness)
    const updatedBackgroundColor: string[][] = JSON.parse(
      JSON.stringify(backgroundColor)
    ) as unknown as string[][]
    updatedBackgroundColor[d][2] = defaultLightness
    saveBackground(updatedBackgroundColor[d])
    void dispatch({
      type: 'setBackgroundColor',
      payload: { d, backgroundColor: updatedBackgroundColor[d] },
    })
  }

  function sliderSaturationReset() {
    setDragWrapOuterSaturation({
      [`--saturation${d}`]: `${defaultSaturation}`,
    })
    if (sliderSaturationInput.current)
      sliderSaturationInput.current.value = defaultSaturation
    setSliderSatVal(defaultSaturation)
    const updatedBackgroundColor: string[][] = JSON.parse(
      JSON.stringify(backgroundColor)
    ) as unknown as string[][]
    updatedBackgroundColor[d][1] = defaultSaturation
    saveBackground(updatedBackgroundColor[d])
    void dispatch({
      type: 'setBackgroundColor',
      payload: { d, backgroundColor: updatedBackgroundColor[d] },
    })
  }

  function sliderHueReset() {
    setDragWrapOuterHue({ [`--hue${d}`]: `${defaultHue}` })
    if (sliderHueInput.current) sliderHueInput.current.value = defaultHue
    setSliderHueVal(defaultHue)
    const updatedBackgroundColor: string[][] = JSON.parse(
      JSON.stringify(backgroundColor)
    ) as unknown as string[][]
    updatedBackgroundColor[d][0] = defaultHue
    saveBackground(updatedBackgroundColor[d])
    void dispatch({
      type: 'setBackgroundColor',
      payload: { d, backgroundColor: updatedBackgroundColor[d] },
    })
  }

  //END SLIDERS

  const widthResize = useCallback(
    () => {
      const breakpointSmallest = 250
      const breakpointSmall = 300
      const y_pos = [12, 34, 56, 78] // color block y positions
      //place these items every time the window is resized:
      if (
        makeMore0.current &&
        dragWrap.current &&
        windowWidth < breakpointSmallest
      )
        place(makeMore0.current, 15, 0)
      else if (makeMore0.current && dragWrap.current)
        place(makeMore0.current, 23, 0)
      if (makeRandom0.current && dragWrap.current)
        place(
          makeRandom0.current,
          50 -
            (makeRandom0.current.offsetWidth / dragWrap.current.offsetWidth) *
              50,
          0
        )
      if (
        makeSmaller0.current &&
        dragWrap.current &&
        windowWidth < breakpointSmallest
      )
        place(
          makeSmaller0.current,
          85 -
            (makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) *
              100,
          0.3
        )
      else if (makeSmaller0.current && dragWrap.current)
        place(
          makeSmaller0.current,
          77 -
            (makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) *
              100,
          0.3
        )
      if (
        layerDecrease.current &&
        dragWrap.current &&
        windowWidth < breakpointSmall
      )
        place(
          layerDecrease.current,
          27,
          100 -
            (layerDecrease.current.offsetHeight /
              dragWrap.current.offsetHeight) *
              100
        )
      else if (layerDecrease.current && dragWrap.current)
        place(
          layerDecrease.current,
          32,
          100 -
            (layerDecrease.current.offsetHeight /
              dragWrap.current.offsetHeight) *
              100
        )
      if (
        layerIncrease.current &&
        dragWrap.current &&
        windowWidth < breakpointSmall
      )
        place(
          layerIncrease.current,
          73 -
            (layerIncrease.current.offsetWidth / dragWrap.current.offsetWidth) *
              100,
          100 -
            (layerIncrease.current.offsetHeight /
              dragWrap.current.offsetHeight) *
              100
        )
      else if (layerIncrease.current && dragWrap.current)
        place(
          layerIncrease.current,
          68 -
            (layerIncrease.current.offsetWidth / dragWrap.current.offsetWidth) *
              100,
          100 -
            (layerIncrease.current.offsetHeight /
              dragWrap.current.offsetHeight) *
              100
        )
      if (
        deleteBlob0.current &&
        dragWrap.current &&
        windowWidth < breakpointSmall
      )
        place(
          deleteBlob0.current,
          2,
          100 -
            (deleteBlob0.current.offsetHeight / dragWrap.current.offsetHeight) *
              100
        )
      else if (deleteBlob0.current && dragWrap.current)
        place(
          deleteBlob0.current,
          10,
          100 -
            (deleteBlob0.current.offsetHeight / dragWrap.current.offsetHeight) *
              100
        )
      if (
        makeLarger0.current &&
        dragWrap.current &&
        windowWidth < breakpointSmall
      )
        place(
          makeLarger0.current,
          98 -
            (makeLarger0.current.offsetWidth / dragWrap.current.offsetWidth) *
              100,
          100 -
            (makeLarger0.current.offsetHeight / dragWrap.current.offsetHeight) *
              100
        )
      else if (makeLarger0.current && dragWrap.current)
        place(
          makeLarger0.current,
          90 -
            (makeLarger0.current.offsetWidth / dragWrap.current.offsetWidth) *
              100,
          100 -
            (makeLarger0.current.offsetHeight / dragWrap.current.offsetHeight) *
              100
        )
      // place color blocks:
      colorBlockPropsCombo.forEach(colorBlockArray => {
        colorBlockArray.forEach((colorBlock, index) => {
          if (colorBlock.current && dragWrapOutest.current) {
            const x =
              index < 4
                ? 0
                : 100 -
                  (colorBlock.current.offsetWidth /
                    dragWrapOutest.current.offsetWidth) *
                    100
            const y = y_pos[index % 4]
            place(colorBlock.current, x, y)
          }
        })
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [windowWidth, windowHeight, dragWrap, dragWrapOutest, colorBlockPropsCombo]
  )

  useEffect(() => {
    widthResize()
  }, [windowWidth, windowHeight, scroll, widthResize])

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
    const scrollTarget =
      document !== null ? document.getElementById(`button-container${d}`) : null
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // useEffect(() => {
  //   const layerButton = document.getElementById(`layer-button-${d}-${activeLayer}`)
  //   if (layerButton) layerButton.focus()
  // }, [activeLayer])

  // const imgStyle: CSSProperties = {
  //   width: '100%',
  //   height: 'auto',
  //   margin: '0 auto',
  // }

  const takeScreenshot = async () => {
    if (!dragWrap.current || typeof window === 'undefined') return
    setLoading(true)
    try {
      // Dynamic import to avoid SSR issues
      const domtoimage = (await import('dom-to-image-more')) as unknown as {
        default: {
          toPng: (
            node: HTMLElement,
            options: DomToImageOptions
          ) => Promise<string>
        }
      }

      const getBackgroundColor = hslToHex(
        Number(backgroundColor[d][0]),
        Number(backgroundColor[d][1]),
        Number(backgroundColor[d][2])
      )

      interface DomToImageOptions {
        scale: number
        useCORS: boolean
        allowTaint: boolean
        bgcolor: string
        width: number
        height: number
        onclone: (clonedNode: HTMLElement) => void
      }

      const svgFilter = d === 0 ? 0 : 1

      const dataUrl = (await domtoimage.default.toPng(dragWrap.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        bgcolor: getBackgroundColor,
        width: dragWrap.current.offsetWidth,
        height: dragWrap.current.offsetHeight,
        onclone: (clonedNode: HTMLElement) => {
          const originalSvg: SVGSVGElement | null =
            document !== null
              ? document.querySelector(`svg#svgfilter${svgFilter}`)
              : null
          if (originalSvg) {
            const clonedSvg: SVGSVGElement = originalSvg.cloneNode(
              true
            ) as SVGSVGElement
            clonedNode.appendChild(clonedSvg)
          }
        },
      } as DomToImageOptions)) as unknown as string

      if (dataUrl) {
        const link = document?.createElement('a')
        if (link) {
          link.href = dataUrl
          link.download = 'blobs.png'
          document?.body.appendChild(link)
          link.click()
          document?.body.removeChild(link)

          void dispatch2(notify(t('ArtSaved'), false, 8))
        }
      } else {
        void dispatch2(notify(t('Error'), true, 8))
      }
    } catch (err) {
      console.error('Screenshot Error:', err)
      void dispatch2(notify(t('Error'), true, 8))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading) void dispatch2(notify(`${t('Loading')}...`, false, 20))
  }, [loading, dispatch2, t])

  const [itemsPerPage, setItemsPerPage] = useState(5)

  const [currentPage, setCurrentPage] = useState<Record<number, number>>({
    [d]: 1,
  })

  // Function to handle page change
  const handlePageChange = (dKey: number, newPage: number) => {
    setCurrentPage(prev => ({ ...prev, [dKey]: newPage }))
  }

  // //save layer amount to local storage
  // useEffect(() => {
  //   saveLayerAmount()
  // }, [layerAmount])

  const deleteHiddenLayers = async () => {
    // Check if there are any hidden layers
    if (hiddenLayers.size === 0) {
      void dispatch2(
        notify('Please hide the layers you want to delete.', true, 8)
      )
      return
    }

    // Check if any hidden layers are not empty
    const nonEmptyHiddenLayers = Array.from(hiddenLayers).filter(layer =>
      draggables[d].some(draggable => draggable.layer === layer)
    )

    if (nonEmptyHiddenLayers.length > 0) {
      const confirmDelete = await confirm({
        message: `${t('LayerNotEmpty')}. ${t('AreYouSureYouWantToProceed')}`,
      })
      if (!confirmDelete) {
        return
      }
    }

    // Remove hidden layers
    const newDraggables = draggables[d].filter(
      draggable => !hiddenLayers.has(draggable.layer)
    )

    const newLayerAmount = layerAmount - hiddenLayers.size

    if (newLayerAmount < 1) {
      void dispatch2(notify(t('MustHaveAtLeastOneLayer'), true, 8))
      return
    }

    // Adjust layers of remaining draggables
    const updatedDraggables = newDraggables.map(draggable => {
      const layer = draggable.layer
      let newLayer = layer
      hiddenLayers.forEach(hiddenLayer => {
        if (layer > hiddenLayer) {
          newLayer -= 1
        }
      })
      return { ...draggable, layer: newLayer }
    })

    void dispatch({
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
      void dispatch2(notify(t('MaximumLayerAmountReached'), true, 8))
      return
    }

    // Adjust layers of remaining draggables
    const updatedDraggables = draggables[d].map(draggable => {
      const layer =
        draggable.layer > activeLayer
          ? draggable.layer + byAmount
          : draggable.layer
      return { ...draggable, layer }
    })

    void dispatch({
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

  const [deleteId, setDeleteId] = useState<string>('')
  const [mode, setMode] = useState<Modes>('none')

  const toggleMode = (selectedMode: Modes) => {
    setMode(prevMode => {
      const newMode = prevMode === selectedMode ? 'none' : selectedMode
      if (newMode !== selectedMode) {
        setDeleteId('')
      }
      return newMode
    })
  }

  //Remove blob
  function removeBlob(draggable: Draggable) {
    setDeleteId(draggable.id)
    setSelectedvalue0(`${t('SelectedBlobNone')}`)
  }

  useEffect(() => {
    if (deleteId) {
      void dispatch({
        type: 'removeDraggable',
        payload: { d: d, id: deleteId },
      })
      setDeleteId('')
    }
  }, [deleteId, d, dispatch])

  const pagination = (dKey: string, current: number, totalPages: number) => {
    const uniqueNumber = Math.random().toString(36).substr(2, 9)
    return hasSavedFiles ? (
      <div className="pagination-controls">
        {current !== 1 ? (
          <>
            <button
              onClick={() => handlePageChange(Number(dKey), 1)}
              disabled={current === 1}
              className="btn-small pagination-btn"
            >
              &laquo;&nbsp;<span className="scr">{t('BackToStart')}</span>
            </button>
            <button
              onClick={() =>
                handlePageChange(Number(dKey), Math.max(current - 1, 1))
              }
              disabled={current === 1}
              className="btn-small pagination-btn"
            >
              &nbsp;&lsaquo;&nbsp;<span className="scr">{t('Previous')}</span>
            </button>
          </>
        ) : (
          <></>
        )}
        <span>
          {t('Page')} {current} / {totalPages}
        </span>
        {current !== totalPages ? (
          <>
            <button
              onClick={() =>
                handlePageChange(
                  Number(dKey),
                  Math.min(current + 1, totalPages)
                )
              }
              disabled={current === totalPages}
              className="btn-small pagination-btn"
            >
              <span className="scr">{t('Next')}</span>&nbsp;&rsaquo;&nbsp;
            </button>

            <button
              onClick={() => handlePageChange(Number(dKey), totalPages)}
              disabled={current === totalPages}
              className="btn-small pagination-btn"
            >
              <span className="scr">{t('ToLastPage')}</span>&nbsp;&raquo;
            </button>
          </>
        ) : (
          <></>
        )}
        <div className="input-wrap items-per-page">
          <label htmlFor={`items-per-page${d}-${uniqueNumber}`}>
            <input
              id={`items-per-page${d}-${uniqueNumber}`}
              className=""
              type="number"
              value={itemsPerPage}
              placeholder={itemsPerPage.toString()}
              min={1}
              max={100}
              onChange={e => setItemsPerPage(Number(e.target.value))}
            />
            <span>{t('PerPage')}</span>
          </label>
        </div>
      </div>
    ) : (
      <></>
    )
  }

  // // scroll to #drag-container:
  // const goToArt1 = (number: number) => {
  //   const dragContainer = document?.getElementById(`drag-container${number}`)
  //   if (dragContainer) {
  //     dragContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
  //   }
  // }

  return (
    <>
      <section className="card">
        <div>
          <div
            id={`drag-container${d}`}
            className={`drag-container drag-container${d}`}
          >
            <div className="blob-title-wrap">
              <h2 className="blob-title">
                {t('BlobArt')} {d + 1}
              </h2>
              {d === 0 ? (
                <p>{t('MoreColorsAvailableThroughRandomBlobButton')} </p>
              ) : d === 1 ? (
                <p>
                  {t('WithMoreMutedColors')}.{' '}
                  {t('MoreColorsAvailableThroughRandomBlobButton')}{' '}
                </p>
              ) : d === 2 ? (
                <p>
                  {t('DarkerColors')}.{' '}
                  {t('MoreColorsAvailableThroughRandomBlobButton')}{' '}
                </p>
              ) : (
                <p>{t('MoreColorsAvailableThroughRandomBlobButton')}</p>
              )}
            </div>
            <div className={'label-container'}>
              <span id={`blobdescription${d}`} className={'scr'}>
                {t('TryDraggingTheBlobs')}
              </span>
              <span>
                [{t('Layer')}: {activeLayer + 1}]{' '}
              </span>
              <span id={`selectedvalue${d}`} className="selectedvalue">
                {selectedvalue0 ?? t('SelectedBlobNone')}
              </span>
            </div>
            <div id={`button-container${d}`} className={'button-container'}>
              <button
                ref={stopBlobs}
                id={`stop-blobs${d}`}
                className="stop-blobs tooltip-wrap "
                onClick={e => {
                  stopSway(e)
                }}
                aria-labelledby={`stop-blobs${d}-span`}
              >
                <span id={`stop-blobs${d}-span`} className="tooltip above">
                  {t(
                    'AfterEnablingThereIsASlightDelayBeforeAllTheBlobsAreMovingAgain'
                  )}
                </span>
                {paused ? t('StartSway') : t('StopSway')}
              </button>
              <button
                ref={resetBlobs}
                id={`reset-blobs${d}`}
                aria-labelledby={`reset-blobs${d}-span`}
                className="reset-blobs tooltip-wrap"
                onClick={e => {
                  void resetBlobsFunction(e)
                }}
              >
                <span id={`reset-blobs${d}-span`} className="tooltip above">
                  {t('GetANewSetOfBlobs')}
                </span>{' '}
                {t('Reset')}
              </button>
              <button
                id={`toggle-marker${d}`}
                aria-labelledby={`toggle-marker${d}-span`}
                className="toggle-marker tooltip-wrap"
                onClick={() => setMarkerEnabled(!markerEnabled)}
              >
                <span
                  id={`toggle-marker${d}-span`}
                  className="tooltip above"
                >{`${t('ToggleMarkerVisibilityWhenUsingAKeyboard')}`}</span>
                {markerEnabled ? t('MarkerOn') : t('MarkerOff')}
              </button>

              <button
                ref={disableScrollButton}
                id={`disable-scroll${d}`}
                aria-labelledby={`disable-scroll${d}-span`}
                className={`disable-scroll tooltip-wrap ${
                  !scroll ? 'active' : ''
                }`}
                onClick={() => {
                  disableScroll()
                }}
              >
                <span id={`disable-scroll${d}-span`} className="tooltip above">
                  {scroll
                    ? t('DisableScrollInOrderToUseTheMouseWheelToResizeABlob')
                    : t('PressHereOrEscapeToRestoreScrolling')}
                </span>
                {scroll ? t('DisableScroll') : t('EnableScroll')}
              </button>

              <button
                id={`toggle-controls${d}`}
                aria-labelledby={`toggle-controls${d}-span`}
                className={`toggle-controls ${
                  !controlsVisible ? 'active' : ''
                }`}
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
                  {controlsVisible ? t('HideControls') : t('ShowControls')}
                </span>
              </button>
              <button
                type="button"
                id={`take-screenshot${d}`}
                aria-labelledby={`take-screenshot${d}-span`}
                disabled={loading}
                onClick={() => void takeScreenshot()}
                className="screenshot tooltip-wrap"
              >
                <ImCamera />
                <span
                  id={`take-screenshot${d}-span`}
                  className="tooltip left above"
                >
                  {loading ? t('Loading') : t('ClickHereToTakeAScreenshot')}
                </span>
              </button>
            </div>
            <div
              ref={dragWrapOutest}
              className={`drag-wrap-outest drag-wrap-outest${d}`}
            >
              <div
                ref={dragWrapOuter}
                id={`drag-wrap-outer${d}`}
                className="drag-wrap-outer"
                style={{
                  ...dragWrapOuterLightness,
                  ...dragWrapOuterSaturation,
                  ...dragWrapOuterHue,
                  ...backgroundColorStyle,
                }}
              >
                <button
                  tabIndex={0}
                  ref={makeSmaller0}
                  className={`make-smaller tooltip-wrap restore ${
                    !controlsVisible ? 'hidden' : ''
                  }`}
                  id={`make-smaller${d}`}
                  onClick={() => {
                    toggleMode('scale-down')
                  }}
                >
                  <ImShrink2 />
                  {mode === 'scale-down' && (
                    <span className="scale-down-alert">
                      {t('SizeDecreaseModeOn')}
                    </span>
                  )}
                  <span
                    id={`make-smaller${d}-span`}
                    className="tooltip left below"
                  >{`${t('ShrinkInstructions')}. ${t('Alternatively')}: ${t(
                    'ResizebyScrollInstructions'
                  )}`}</span>
                </button>
                <button
                  ref={makeLarger0}
                  className={`make-larger tooltip-wrap restore ${
                    !controlsVisible ? 'hidden' : ''
                  }`}
                  id={`make-larger${d}`}
                  onClick={() => {
                    toggleMode('scale-up')
                  }}
                >
                  <ImEnlarge2 />
                  {mode === 'scale-up' && (
                    <span className="scale-up-alert">
                      {t('SizeIncreaseModeOn')}
                    </span>
                  )}
                  <span
                    id={`make-larger${d}-span`}
                    className="tooltip left above"
                  >{`${t('EnlargeInstructions')}. ${t('Alternatively')}: ${t(
                    'ResizebyScrollInstructions'
                  )}`}</span>
                </button>

                <button
                  ref={makeMore0}
                  className={`make-more tooltip-wrap restore ${
                    !controlsVisible ? 'hidden' : ''
                  }`}
                  id={`make-more${d}`}
                  onClick={() => {
                    toggleMode('clone')
                  }}
                >
                  <FaRegClone />
                  {mode === 'clone' && (
                    <span className="clone-alert">{t('CloneModeOn')}</span>
                  )}
                  <span
                    id={`make-more${d}-span`}
                    className="tooltip right below"
                  >
                    {t('CloneInstructions')}
                  </span>
                </button>
                <button
                  ref={makeRandom0}
                  className={`make-random tooltip-wrap ${
                    !controlsVisible ? 'hidden' : ''
                  }`}
                  id={`make-random${d}`}
                  aria-labelledby={`make-random${d}-span`}
                  onClick={() => addRandomDraggable()}
                >
                  <FaPlus />
                  <span
                    id={`make-random${d}-span`}
                    className="tooltip below"
                  >{`${t('ClickMeToMakeARandomBlob')}. ${t(
                    'MoreColorsAvailable'
                  )}!`}</span>
                </button>
                <button
                  ref={deleteBlob0}
                  className={`delete-blob tooltip-wrap restore ${
                    !controlsVisible ? 'hidden' : ''
                  }`}
                  id={`delete-blob${d}`}
                  onClick={() => toggleMode('delete')}
                >
                  <span style={{ fontSize: '1.2em' }}>&times;</span>
                  {mode === 'delete' && (
                    <span className="delete-alert">{t('DeleteModeOn')}</span>
                  )}
                  <span
                    id={`delete-blob${d}-span`}
                    className="tooltip right above"
                  >
                    {t('RemovalInstructions')}
                  </span>
                </button>

                <button
                  ref={layerDecrease}
                  id={`layer-decrease${d}`}
                  className={`layer-adjust layer-decrease tooltip-wrap restore ${
                    !controlsVisible ? 'hidden' : ''
                  }`}
                  onClick={() => toggleMode('layer-down')}
                >
                  {mode === 'layer-down' && (
                    <span className="layer-down-alert">
                      {t('LayerDecreaseModeOn')}
                    </span>
                  )}
                  <span
                    id={`layer-decrease${d}-span`}
                    className="tooltip above"
                  >{`${t('DecreaseBlobLayerBy1Instructions')} ${t(
                    'KeyboardUsePressTheCorrespondingLayerNumber'
                  )}`}</span>
                  <BiChevronDown />
                </button>
                <button
                  ref={layerIncrease}
                  id={`layer-increase${d}`}
                  className={`layer-adjust layer-increase tooltip-wrap restore ${
                    !controlsVisible ? 'hidden' : ''
                  }`}
                  onClick={() => toggleMode('layer-up')}
                >
                  {mode === 'layer-up' && (
                    <span className="layer-up-alert">
                      {t('LayerIncreaseModeOn')}
                    </span>
                  )}
                  <span
                    id={`layer-increase${d}-span`}
                    className="tooltip above"
                  >{`${t('IncreaseBlobLayerBy1Instructions')} ${t(
                    'KeyboardUsePressTheCorrespondingLayerNumber'
                  )}`}</span>
                  <BiChevronUp />
                </button>

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

                <div
                  ref={dragWrap}
                  id={`drag-wrap${d}`}
                  className="drag-wrap"
                  style={{
                    height: 'calc(100vh - 7rem)',
                    minHeight: '420px',
                    width: '100%',
                    minWidth: '100%',
                    backgroundColor: 'transparent',
                    margin: '0',
                    padding: '0',
                    overflow: 'visible',
                    borderRadius: '0',
                    position: 'relative',
                  }}
                >
                  <DragLayers
                    layerAmount={layerAmount}
                    layer_={activeLayer}
                    hiddenLayers={hiddenLayers}
                    changeBlobLayer={changeBlobLayer}
                    setActiveLayer={setActiveLayer}
                    highestZIndex={highestZIndex}
                    dispatch={dispatch}
                    d={d}
                    items={draggables[d] ?? []}
                    getPosition={getPosition}
                    removeBlob={removeBlob}
                    dragWrap={dragWrap}
                    exitApp={exitApp}
                    setSelectedvalue0={setSelectedvalue0}
                    setFocusedBlob={setFocusedBlob}
                    colorIndex={colorIndex}
                    setColorIndex={setColorIndex}
                    colorPairs={colorPairsCombo}
                    colorswitch={colorswitch}
                    scroll={scroll}
                    setScroll={setScroll}
                    clickOutsideRef={dragWrap}
                    addRandomDraggable={addRandomDraggable}
                    mode={mode}
                    changeColor={changeColor}
                  />
                </div>
              </div>
              <ColorBlocks
                d={d}
                getRefName={getRefName}
                map={refNameMappingCombo}
                colorBlockProps={colorBlockPropsCombo}
                colorPairs={colorPairsCombo}
                controlsVisible={controlsVisible}
                setSelectedColor={setSelectedColor}
                selectedColor={selectedColor}
                setMode={setMode}
              />
            </div>
            <div className="layer-mover-control-wrap">
              <div
                className={`movers-wrap movers-wrap1 ${
                  !controlsVisible ? 'hidden' : ''
                }`}
              >
                <button
                  id={`moveleft${d}`}
                  aria-labelledby={`moveleft${d}-span`}
                  className={`moveleft mover tooltip-wrap narrow2`}
                  onClick={handleMoveRight}
                >
                  <BiChevronsLeft />
                  <span id={`moveleft${d}-span`} className="tooltip above">
                    {t('MoveViewLeft')}
                  </span>
                </button>
                <button
                  id={`moveright${d}`}
                  aria-labelledby={`moveright${d}-span`}
                  className={`moveright mover tooltip-wrap narrow2`}
                  onClick={handleMoveLeft}
                >
                  <BiChevronsRight />
                  <span id={`moveright${d}-span`} className="tooltip above">
                    {t('MoveViewRight')}
                  </span>
                </button>
              </div>
              <div className="layer-btn-wrap layer-tools layer-tools1">
                <button
                  id={`decrease-layer-amount${d}`}
                  aria-labelledby={`decrease-layer-amount${d}-span`}
                  className="layer-tool layer-amount decrease-layer-amount tooltip-wrap narrow2 danger"
                  onClick={() => void deleteHiddenLayers()}
                >
                  <span
                    id={`decrease-layer-amount${d}-span`}
                    className="tooltip above"
                  >
                    {t('DeleteHiddenLayers')}
                  </span>
                  &times;
                </button>
                <button
                  id={`every-layer-minus${d}`}
                  aria-labelledby={`every-layer-minus${d}-span`}
                  className="layer-tool every-layer tooltip-wrap narrow2"
                  onClick={() => changeEveryLayer(-1)}
                >
                  <span
                    id={`every-layer-minus${d}-span`}
                    className="tooltip above"
                  >
                    {t('ClickHereToMoveDownLayer')}
                  </span>
                  <BiChevronDown />
                </button>
              </div>
              <div className="layer-btn-wrap layers">
                {Array.from({ length: layerAmount }, (_, i) => i).map(
                  (layer, index) => (
                    <button
                      key={`${layer}*${index}`}
                      id={`layer-button-${d}-${layer}`}
                      aria-labelledby={`layer-button-${d}-${layer}-span`}
                      onClick={() => {
                        if (activeLayer === layer) {
                          toggleLayerVisibility(layer)
                        } else {
                          setActiveLayer(layer)
                        }
                      }}
                      className={`layer-button tooltip-wrap narrow2 ${
                        activeLayer === layer ? 'active' : ''
                      } ${hiddenLayers.has(layer) ? 'dim' : ''}`}
                    >
                      <span id={`layer-button-${d}-${layer}-span`}>
                        <span className="scr">{t('Layer')}</span> {layer + 1}{' '}
                        <span className="tooltip above">
                          {activeLayer === layer
                            ? t('ToggleLayerByClickingMe')
                            : t('ChangeLayerByClickingMe')}
                        </span>
                      </span>
                    </button>
                  )
                )}
              </div>
              <div className="layer-btn-wrap layer-tools layer-tools2">
                <button
                  id={`every-layer-plus${d}`}
                  aria-labelledby={`every-layer-plus${d}-span`}
                  className="layer-tool every-layer tooltip-wrap narrow2"
                  onClick={() => changeEveryLayer(1)}
                >
                  <span
                    id={`every-layer-plus${d}-span`}
                    className="tooltip above"
                  >
                    {t('ClickHereToMoveUpLayer')}
                  </span>
                  <BiChevronUp />
                </button>
                <button
                  id={`increase-layer-amount${d}`}
                  disabled={layerAmount >= 9}
                  aria-labelledby={`increase-layer-amount${d}-span`}
                  className="layer-tool layer-amount increase-layer-amount tooltip-wrap narrow2"
                  onClick={() => addToLayerAmount(1)}
                >
                  <span
                    id={`increase-layer-amount${d}-span`}
                    className="tooltip above"
                  >
                    {t('GetMoreLayers')}
                  </span>
                  <BiPlus />
                </button>
              </div>
              <div
                className={`movers-wrap movers-wrap2 ${
                  !controlsVisible ? 'hidden' : ''
                }`}
              >
                <button
                  id={`moveup${d}`}
                  aria-labelledby={`moveup${d}-span`}
                  className={`moveup mover tooltip-wrap narrow2`}
                  onClick={handleMoveDown}
                >
                  <BiChevronsUp />
                  <span id={`moveup${d}-span`} className="tooltip above">
                    {t('MoveViewUp')}
                  </span>
                </button>
                <button
                  id={`movedown${d}`}
                  aria-labelledby={`movedown${d}-span`}
                  className={`movedown mover tooltip-wrap narrow2`}
                  onClick={handleMoveUp}
                >
                  <BiChevronsDown />
                  <span id={`movedown${d}-span`} className="tooltip above">
                    {t('MoveViewDown')}
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
            <div ref={exitApp} id={`exitblob${d}`} className="exitblob"></div>

            {user ? (
              <div className="blob-handling">
                <div className="full wide flex column center gap">
                  <form onSubmit={e => void saveBlobsToServer(e)}>
                    <div className="input-wrap">
                      <label htmlFor={`blobname${d}`}>
                        <input
                          id={`blobname${d}`}
                          type="text"
                          value={name}
                          onChange={handleNameChange}
                          placeholder={t('NameYourArtwork')}
                          maxLength={30}
                        />
                        <span>{t('NameYourArtwork')}:</span>
                      </label>
                    </div>
                    <button type="submit" disabled={loading}>
                      {t('Save')}
                    </button>
                  </form>
                </div>

                <h3>{t('Art')}</h3>
                {isLoading ? (
                  <p>{t('LoadingSavedArtwork')}</p>
                ) : !users || users.length < 1 ? (
                  <p>{t('ErrorConnectingToTheServer')}</p>
                ) : !hasSavedFiles ? (
                  <p>{t('NoSavedArtworkYet')}</p>
                ) : (
                  Object.keys(savedDraggablesbyD).map((dKey, index) => {
                    const versions = Object.keys(
                      savedDraggablesbyD[Number(dKey)]
                    )
                    const totalPages = Math.ceil(versions.length / itemsPerPage)
                    const current = currentPage[Number(dKey)] ?? 1
                    const startIdx = (current - 1) * itemsPerPage
                    const endIdx = startIdx + itemsPerPage
                    const currentVersions = versions.slice(startIdx, endIdx)

                    return (
                      <div
                        className="flex center margin0auto"
                        key={`${dKey}:${index}`}
                      >
                        {pagination(dKey, current, totalPages)}
                        <ul
                          key={`${dKey}+${index}`}
                          className="blob-versions-wrap"
                        >
                          {currentVersions.map((versionName, index) => (
                            <li
                              key={`${versionName}+${index}`}
                              className="blob-version-item"
                            >
                              <span>{versionName}</span>
                              <div className="button-wrap">
                                <button
                                  onClick={() =>
                                    void loadBlobsFromServer(
                                      Number(dKey),
                                      versionName
                                    )
                                  }
                                >
                                  {t('Load')}{' '}
                                  <span className="scr">{versionName}</span>
                                </button>
                                <button
                                  onClick={() =>
                                    void deleteBlobsVersionFromServer(
                                      Number(dKey),
                                      versionName
                                    )
                                  }
                                >
                                  {t('Delete')}{' '}
                                  <span className="scr">{versionName}</span>
                                </button>
                                <Accordion
                                  id={`accordion-blobnewname-${sanitize(
                                    versionName
                                  )}`}
                                  className="blobnewname"
                                  wrapperClass="blobnewname-wrap"
                                  text={t('Rename')}
                                  hideBrackets={true}
                                  onClick={() => {
                                    setNewName(versionName)
                                    setEditName(versionName)
                                  }}
                                  isOpen={editName === versionName}
                                >
                                  <>
                                    <div className="input-wrap">
                                      <label
                                        htmlFor={`blobnewname-${sanitize(
                                          versionName
                                        )}`}
                                      >
                                        <input
                                          id={`blobnewname-${sanitize(
                                            versionName
                                          )}`}
                                          type="text"
                                          value={newName}
                                          onChange={handleNewNameChange}
                                          placeholder={t('RenameYourArtwork')}
                                          maxLength={30}
                                        />
                                        <span>{t('Rename')}:</span>{' '}
                                        <span className="scr">
                                          {versionName}
                                        </span>
                                      </label>
                                    </div>
                                    <button
                                      onClick={() => {
                                        if (versionName !== newName) {
                                          void editBlobsByUser(
                                            versionName,
                                            newName
                                          )
                                        } else
                                          void dispatch2(
                                            notify(
                                              `${t('Error')}: ${t(
                                                'RenameYourArtwork'
                                              )}`,
                                              true,
                                              5
                                            )
                                          )
                                      }}
                                    >
                                      {t('Edit')}{' '}
                                      <span className="scr">
                                        {versionName}: {t('NewName')} {newName}
                                      </span>
                                    </button>
                                  </>
                                </Accordion>
                              </div>
                            </li>
                          ))}
                        </ul>
                        {/* Pagination Controls */}
                        {pagination(dKey, current, totalPages)}
                      </div>
                    )
                  })
                )}
              </div>
            ) : (
              <div className="wide flex column center gap">
                <div className="login-to-save wide flex column center gap-half">
                  <FaSave />
                  {t('InOrderToSaveTheBlobs')}
                </div>
                <div className={`blob-register-login-wrap`}>
                  <button onClick={navigateToLogin}>{t('Login')}</button>
                  <big>{t('Or')}</big>
                  <button onClick={navigateToRegister}>{t('Register')}</button>
                </div>
              </div>
            )}
            <svg className="filter" id={`svgfilter0`}>
              <defs>
                <filter id="svgGaussian0">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="7"
                  ></feGaussianBlur>
                </filter>
                <filter id="svgMatrix0">
                  <feColorMatrix
                    values="
1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 50 -18
"
                  ></feColorMatrix>{' '}
                </filter>
              </defs>
            </svg>
            <svg className="filter" id="svgfilter1">
              <defs>
                {' '}
                <filter id="svgGaussian1">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                  ></feGaussianBlur>
                </filter>
                <filter id="svgMatrix1">
                  <feColorMatrix
                    values="
1 0 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 46 -28
"
                  ></feColorMatrix>
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </>
  )
}
