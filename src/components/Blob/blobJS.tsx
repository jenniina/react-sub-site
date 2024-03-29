import React, {
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
import DragComponent from './components/DragComponent'
import { BlobContext, Props } from './components/BlobProvider'
import { ELanguages } from '../../interfaces'
import {
  EAdjustBackgroundHue,
  EAdjustBackgroundLightness,
  EAdjustBackgroundSaturation,
  EDisableScroll,
  EEnableScroll,
  EMarkerOff,
  EMarkerOn,
  EResetBlobs,
  EResetHue,
  EResetLightness,
  EResetSaturation,
  ESelectedBlobNone,
  EStartSway,
  EStopSway,
  ETryDraggingTheBlobs,
} from '../../interfaces/blobs'

let angle = '90deg'
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
  const dragUl0 = useRef() as RefObject<HTMLUListElement>

  const selectedvalue0 = useRef() as RefObject<HTMLDivElement>

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

  const makeLarger0 = useRef() as RefObject<HTMLDivElement>
  const makeSmaller0 = useRef() as RefObject<HTMLDivElement>
  const makeMore0 = useRef() as RefObject<HTMLDivElement>
  const deleteBlob0 = useRef() as RefObject<HTMLDivElement>

  const sliderLightnessInput = useRef() as RefObject<HTMLInputElement>
  const sliderSaturationInput = useRef() as RefObject<HTMLInputElement>
  const sliderHueInput = useRef() as RefObject<HTMLInputElement>

  const backgroundColor: BackgroundColor[][] = []

  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

  const localStorageBackground = `${isLocalhost ? 'local-' : ''}BackgroundColor${[d]}`
  const localStorageDraggables = `${isLocalhost ? 'local-' : ''}Draggables${[d]}`

  backgroundColor[d] = loadBackground()

  const draggables = (state.draggables as Draggable[][]) ?? []

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

  const [hasBeenMade, setHasBeenMade] = useState<Boolean>(false)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    if (draggables[d] !== undefined && draggables[d]?.length > 0) {
      saveDraggables()
    }
  }, [draggables[d]])

  function makeFromStorage(blobs: Draggable[]) {
    if (backgroundColor[d]?.length > 1) {
      dragWrapOuter.current?.style.setProperty('--lightness', `${backgroundColor[d][0]}`)
      dragWrapOuter.current?.style.setProperty('--saturation', `${backgroundColor[d][1]}`)
      dragWrapOuter.current?.style.setProperty('--hue', `${backgroundColor[d][2]}`)
    }
    if (!hasBeenMade && blobs && blobs?.length > 0) {
      for (let i: number = 0; i < blobs?.length; i++) {
        if (blobs[i] !== null && blobs[i] !== undefined) {
          const newDraggable = {
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

  const [paused, setPaused] = useState(false)

  function stopSway(
    e:
      | MouseEventReact<HTMLButtonElement, MouseEvent>
      | PointerEventReact<HTMLButtonElement>
  ) {
    e.preventDefault()

    if (!paused && dragUl0.current) {
      dragUl0.current.classList.add('paused')
      setPaused(true)
      if (stopBlobs.current) stopBlobs.current.textContent = EStartSway[language]
    } else if (paused && dragUl0.current) {
      dragUl0.current.classList.remove('paused')
      setPaused(false)
      if (stopBlobs.current) stopBlobs.current.textContent = EStopSway[language]
    }
  }

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

  useEffect(() => {
    if (prefersReducedMotion && dragUl0.current) {
      dragUl0.current.classList.add('paused')
      setPaused(true)
      if (stopBlobs.current) stopBlobs.current.textContent = EStartSway[language]
    }
  }, [prefersReducedMotion])

  const amountOfBlobs = 8 // Initial amount of blobs

  function resetBlobsFunction(e: MouseEventReact | TouchEventReact | PointerEventReact) {
    e.preventDefault()
    window.localStorage.removeItem(localStorageDraggables)
    dispatch({ type: 'setDraggablesAtD', payload: { d, draggables: [] } })

    makeAnew(amountOfBlobs)
  }

  const makeAnew = (amount: number) => {
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
            color1 = 'darkorage'
            color2 = 'orange'
            break
          default:
            color1 = 'cyan'
            color2 = 'greenyellow'
        }
        return [color1, color2]
      }

      const colorFirst: string = colorswitch()[0]
      const colorSecond: string = colorswitch()[1]

      const newDraggable = {
        id: `blob${i + 1}-${d}`,
        number: i + 1,
        i: i + 1,
        x:
          window.innerWidth > window.innerHeight
            ? `${(window.innerWidth / 100) * getRandomMinMax(0, 70)}px`
            : `${(window.innerWidth / 100) * getRandomMinMax(0, 50)}px`,
        y: `${(window.innerHeight / 100) * getRandomMinMax(0, 70)}px`,
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

  //save blob stats to localhost array
  const getPosition = (draggable: HTMLLIElement) => {
    const blobID = draggable.id
    const blobNumber = draggable.id.replace(/^\D+/g, '') //replace non-numbers with empty
    const blobI = window.getComputedStyle(draggable).getPropertyValue('--i')
    const blobX = window.getComputedStyle(draggable).getPropertyValue('left')
    const blobY = window.getComputedStyle(draggable).getPropertyValue('top')
    const blobZ = window.getComputedStyle(draggable).getPropertyValue('z-index')
    const blobColor1 = window.getComputedStyle(draggable).getPropertyValue('background')
    const blobDisplay = window.getComputedStyle(draggable).getPropertyValue('display')

    const blobDraggables: Draggable = {
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
      payload: { d, i: blobDraggables.number - 1, draggable: blobDraggables },
    })

    saveDraggables()
  }

  const [scroll, setScroll] = useState<Boolean>(true)

  function disableScroll() {
    if (scroll) {
      if (disableScrollButton.current)
        disableScrollButton.current.textContent = EEnableScroll[language]
      document.body.style.overflow = 'hidden'
    } else {
      if (disableScrollButton.current)
        disableScrollButton.current.textContent = EDisableScroll[language]
      document.body.style.overflow = 'auto'
    }
    setScroll(!scroll)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !scroll) {
        setScroll(true)
        if (disableScrollButton.current)
          disableScrollButton.current.textContent = EDisableScroll[language]
        document.body.style.overflow = 'auto'
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [scroll])

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
    //place these items every time the window is resized
    if (makeLarger0.current && dragWrap.current)
      place(
        makeLarger0.current,
        83 - (makeLarger0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        0.5
      )

    if (colorBlockOrange.current && dragWrap.current)
      place(colorBlockOrange.current, 0, 18)
    if (colorBlockRed.current && dragWrap.current) place(colorBlockRed.current, 0, 38)
    if (colorBlockPurple.current && dragWrap.current)
      place(colorBlockPurple.current, 0, 58)
    if (colorBlockBlue.current && dragWrap.current) place(colorBlockBlue.current, 0, 78)

    if (colorBlockYellowLime0.current && dragWrap.current)
      place(
        colorBlockYellowLime0.current,
        100 -
          (colorBlockYellowLime0.current.offsetWidth / dragWrap.current?.offsetWidth) *
            100,
        18
      )
    if (colorBlockCyanYellow0.current && dragWrap.current)
      place(
        colorBlockCyanYellow0.current,
        100 -
          (colorBlockCyanYellow0.current.offsetWidth / dragWrap.current?.offsetWidth) *
            100,
        38
      )
    if (colorBlockCyanPink0.current && dragWrap.current)
      place(
        colorBlockCyanPink0.current,
        100 -
          (colorBlockCyanPink0.current.offsetWidth / dragWrap.current?.offsetWidth) * 100,
        58
      )
    if (colorBlockPinkYellow0.current && dragWrap.current)
      place(
        colorBlockPinkYellow0.current,
        100 -
          (colorBlockPinkYellow0.current.offsetWidth / dragWrap.current?.offsetWidth) *
            100,
        78
      )

    if (makeSmaller0.current && dragWrap.current)
      place(
        makeSmaller0.current,
        83 - (makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        95
      )
    if (deleteBlob0.current && dragWrap.current) place(deleteBlob0.current, 17, 95)
  }
  function place(element: HTMLElement, x_pos: number, y_pos: number) {
    if (element && dragWrap.current) {
      element.style.left = (dragWrap.current.offsetWidth / 100) * x_pos + 'px'
      element.style.top = (dragWrap.current.offsetHeight / 100) * y_pos + 'px'
    }
  }

  return (
    <>
      <section id={`drag-container${d}`} className={`drag-container drag-container${d}`}>
        <div className={'label-container'}>
          <span id={`blobdescription${d}`} className={'scr'}>
            {ETryDraggingTheBlobs[language]}
          </span>
          <div ref={selectedvalue0} id={`selectedvalue${d}`} className='selectedvalue'>
            {ESelectedBlobNone[language]}
          </div>
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
            {EDisableScroll[language]}
          </button>
          <button
            className='toggle-marker'
            onClick={() => setMarkerEnabled(!markerEnabled)}
          >
            {markerEnabled ? EMarkerOn[language] : EMarkerOff[language]}
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
          {markerEnabled && usingKeyboard && focusedBlob && (
            <div
              style={{
                position: 'absolute',
                top: `${focusedBlob.top + 17}px`,
                left: `${focusedBlob.left}px`,
                width: `${focusedBlob.width}px`,
                height: `${focusedBlob.height}px`,
                outline: '3px dashed blue',
                outlineOffset: '5px',
                borderRadius: '50%',
                zIndex: 1000,
              }}
            />
          )}
          <div ref={dragWrap} className='drag-wrap'>
            <DragComponent
              language={language}
              dispatch={dispatch}
              d={d}
              items={draggables[d]}
              amountOfBlobs={amountOfBlobs}
              dragUl0={dragUl0}
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
            />
          </div>
          <div
            ref={colorBlockOrange}
            className='colorblock color-orange'
            id={`color-orange${d}`}
          ></div>
          <div
            ref={colorBlockRed}
            className='colorblock color-red'
            id={`color-red${d}`}
          ></div>
          <div
            ref={colorBlockPurple}
            className='colorblock color-purple'
            id={`color-purple${d}`}
          ></div>
          <div
            ref={colorBlockBlue}
            className='colorblock color-blue'
            id={`color-blue${d}`}
          ></div>
          <div
            ref={colorBlockYellowLime0}
            className='colorblock color-yellowlime'
            id={`color-yellowlime${d}`}
          ></div>
          <div
            ref={colorBlockCyanYellow0}
            className='colorblock color-cyanyellow'
            id={`color-cyanyellow${d}`}
          ></div>
          <div
            ref={colorBlockCyanPink0}
            className='colorblock color-cyanpink'
            id={`color-cyanpink${d}`}
          ></div>
          <div
            ref={colorBlockPinkYellow0}
            className='colorblock color-pinkyellow'
            id={`color-pinkyellow${d}`}
          ></div>
          <div ref={makeLarger0} className='make-larger' id={`make-larger${d}`}>
            L
          </div>
          <div ref={makeSmaller0} className='make-smaller' id={`make-smaller${d}`}>
            S
          </div>
          <div ref={makeMore0} className='make-more' id={`make-more${d}`}>
            +
          </div>
          <div ref={deleteBlob0} className='delete-blob' id={`delete-blob${d}`}>
            &times;
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
          <feGaussianBlur in='SourceGraphic' stdDeviation='10'></feGaussianBlur>
          <feColorMatrix
            values='
1 0 0 0 0 
0 1 0 0 0 
0 0 1 0 0
0 0 0 30 -11 
'
          ></feColorMatrix>
        </filter>
      </svg>
    </>
  )
}
