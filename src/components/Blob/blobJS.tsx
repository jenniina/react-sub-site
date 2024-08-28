import {
  useRef,
  useEffect,
  useState,
  useContext,
  CSSProperties,
  PointerEvent as PointerEventReact,
  MouseEvent as MouseEventReact,
  TouchEvent as TouchEventReact,
} from 'react'
import {
  Draggable,
  BackgroundColor,
  RefObject,
  focusedBlob,
  ColorPair,
} from './interfaces'
import { BlobContext, Props } from './components/BlobProvider'
import { ELanguages } from '../../interfaces'
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
} from '../../interfaces/blobs'
import {
  BiChevronsDown,
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronsUp,
} from 'react-icons/bi'
import { ImEnlarge2, ImShrink2 } from 'react-icons/im'
import { FaPlus, FaRegClone, FaTimes } from 'react-icons/fa'
import DragContainer from './components/DragContainer'
import useWindowSize from '../../hooks/useWindowSize'

let angle = '90deg'
let color = 'cyan'
let color1 = 'cyan'
let color2 = 'greenyellow'

const defaultLightness = '30'
const defaultSaturation = '80'
const defaultHue = '214'

export default function BlobJS({ language }: { language: ELanguages }) {
  const { state, dispatch } = useContext(BlobContext) as Props

  const d = 0

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

  const changeBlobLayer = (draggable: Draggable, layer: number) => {
    dispatch({
      type: 'updateDraggable',
      payload: { draggable: { ...draggable, layer: layer } },
    })
    saveDraggables()
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

  const colorPairs: ColorPair[] = [
    { color1: 'lemonchiffon', color2: 'pink' },
    { color1: 'lemonchiffon', color2: 'greenyellow' },
    { color1: 'cyan', color2: 'greenyellow' },
    { color1: 'cyan', color2: 'pink' },
    { color1: 'darkorange', color2: 'orange' },
    { color1: 'red', color2: 'tomato' },
    { color1: 'magenta', color2: 'violet' },
    { color1: 'deepskyblue', color2: 'dodgerblue' },
  ]

  const [colorIndex, setColorIndex] = useState(0)

  const [focusedBlob, setFocusedBlob] = useState<focusedBlob | null>(null)
  const [usingKeyboard, setUsingKeyboard] = useState(false)
  const [markerEnabled, setMarkerEnabled] = useState(true)
  const [controlsVisible, setControlsVisible] = useState(true)
  const markerDivRef = useRef<HTMLDivElement>(null)

  //Check for keyboard use for the focusedBlob marker
  useEffect(() => {
    const keydownListener = () => setUsingKeyboard(true)
    const mousedownListener = () => setUsingKeyboard(false)

    window.addEventListener('keydown', keydownListener)
    window.addEventListener('mousedown', mousedownListener)

    return () => {
      window.removeEventListener('keydown', keydownListener)
      window.removeEventListener('mousedown', mousedownListener)
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
    else return JSON.parse(draggablesJSON)
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

  const [hasBeenMade, setHasBeenMade] = useState<boolean>(false)

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

  const [paused, setPaused] = useState(false)

  function stopSway(
    e:
      | MouseEventReact<HTMLButtonElement, MouseEvent>
      | PointerEventReact<HTMLButtonElement>
  ) {
    e.preventDefault()

    if (!paused) {
      setPaused(true)
      if (stopBlobs.current) stopBlobs.current.textContent = EStartSway[language]
    } else if (paused) {
      setPaused(false)
      if (stopBlobs.current) stopBlobs.current.textContent = EStopSway[language]
    }
  }

  useEffect(() => {
    if (paused && stopBlobs.current) stopBlobs.current.textContent = EStopSway[language]
  }, [paused])

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

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

  function resetBlobsFunction(e: MouseEventReact | TouchEventReact | PointerEventReact) {
    e.preventDefault()
    setActiveLayer(0)
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
        i: windowWidth > 400 ? getRandomMinMax(2, 9) : getRandomMinMax(2, 5),
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
      let number: number = Math.ceil(getRandomMinMax(0.01, 13))

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
      i: Math.ceil(getRandomMinMax(1.5, 5)),
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
    setActiveLayer(parseInt(layer))
    saveDraggables()
  }

  const [scroll, setScroll] = useState<boolean>(true)

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

    window.addEventListener('resize', widthResize)

    return () => {
      window.removeEventListener('resize', widthResize)
    }
  }, [])

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

    windowWidth < 400 && makeSmaller0.current && dragWrap.current
      ? place(
          makeSmaller0.current,
          90 - (makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
          93
        )
      : makeSmaller0.current && dragWrap.current
      ? place(
          makeSmaller0.current,
          77 - (makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
          93
        )
      : null
    windowWidth < 400 && deleteBlob0.current && dragWrap.current
      ? place(deleteBlob0.current, 10, 93)
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
        <div className={'button-container'}>
          <button
            ref={stopBlobs}
            id={`stop-blobs${d}`}
            className='stop-blobs'
            onClick={(e) => {
              stopSway(e)
            }}
          >
            {EStopSway[language]}
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
            className='disable-scroll'
            onClick={() => {
              disableScroll()
              widthResize()
            }}
          >
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
            className='toggle-controls tooltip-wrap'
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
              paused={paused}
              setPaused={setPaused}
              prefersReducedMotion={prefersReducedMotion}
              language={language}
              dispatch={dispatch}
              d={d}
              items={draggables[d] ?? []}
              amountOfBlobs={amountOfBlobs}
              saveDraggables={saveDraggables}
              getPosition={getPosition}
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
