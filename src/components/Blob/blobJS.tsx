import React, { useRef, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BackgroundColor } from './blobInterfaces'
import { Draggable } from './blobInterfaces'
import { RefObject } from './blobInterfaces'

let angle = '90deg'
let color1 = 'cyan'
let color2 = 'greenyellow'

const defaultLightness = '30'
const defaultSaturation = '80'
const defaultHue = '214'

let initialX = 0
let initialY = 0

let zIndex = 1
let zIndex0 = -1
let moveElement = false
let reset = true
let hasBeenMadeFromStorage: Boolean
const d = 0

export default function BlobJS() {
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
  const draggables: Draggable[][] = []

  const [dragItemList, setDragItemList] = useState<Draggable[]>([])

  const localStorageBackground = `BackgroundColor${[d]}`
  const localStorageDraggables = `Draggables${[d]}`

  backgroundColor[d] = loadBackground()
  draggables[d] = loadDraggables()

  function loadBackground(): BackgroundColor[] {
    const backgroundColorJSON = localStorage.getItem(localStorageBackground)
    if (backgroundColorJSON == null) return []
    return JSON.parse(backgroundColorJSON)
  }
  function loadDraggables(): Draggable[] {
    const draggablesJSON = localStorage.getItem(localStorageDraggables)
    if (draggablesJSON == null) return []
    return JSON.parse(draggablesJSON)
  }

  function saveBackground() {
    localStorage.setItem(localStorageBackground, JSON.stringify(backgroundColor[d]))
  }
  function saveDraggables() {
    localStorage.setItem(localStorageDraggables, JSON.stringify(draggables[d]))
  }

  function makeFromStorage() {
    if (backgroundColor[d].length > 1) {
      dragWrapOuter.current?.style.setProperty('--lightness', `${backgroundColor[d][0]}`)
      dragWrapOuter.current?.style.setProperty('--saturation', `${backgroundColor[d][1]}`)
      dragWrapOuter.current?.style.setProperty('--hue', `${backgroundColor[d][2]}`)
    }
    if (!hasBeenMadeFromStorage && draggables[d].length > 1) {
      for (let i: number = 0; i < draggables[d].length; i++) {
        if (draggables[d][i] !== null || draggables[d][i] !== undefined) {
          setDragItemList((current) => [
            ...current,
            {
              id: `${draggables[d][i].id}`,
              number: draggables[d][i].number,
              i: draggables[d][i].i,
              x: `${draggables[d][i].x}`,
              y: `${draggables[d][i].y}`,
              z: `${draggables[d][i].z}`,
              display: `${draggables[d][i].display}`,
              ariaGrabbed: false,
              draggable: true,
              tabIndex: 0,
              background: `${draggables[d][i].background}`,
            },
          ])
        }
      }
    }
    hasBeenMadeFromStorage = true
  }

  let paused: boolean

  function stopSway(
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.PointerEvent<HTMLButtonElement>
  ) {
    e.preventDefault()

    if (!paused && dragUl0.current) {
      dragUl0.current.classList.add('paused')
      paused = true
      if (stopBlobs.current) stopBlobs.current.textContent = 'Start Movement'
    } else if (paused && dragUl0.current) {
      dragUl0.current.classList.remove('paused')
      paused = false
      if (stopBlobs.current) stopBlobs.current.textContent = 'Stop Movement'
    }
    return () => {}
  }

  function resetBlobsFunction(
    e: React.MouseEvent | React.TouchEvent | React.PointerEvent
  ) {
    e.preventDefault()
    setDragItemList([])
    window.localStorage.removeItem(localStorageDraggables)
    //dragUl0.current.removeChild(dragUl0.current.children[0])
  }

  useEffect(() => {
    draggables[d] = loadDraggables()
    draggables[d].length > 1 && dragItemList.length == 0
      ? makeFromStorage()
      : makeAnew(amountOfBlobs)
  }, [])

  const dragzonesList = document.querySelectorAll<HTMLElement>('.dragzone')
  const dragzones = Array.from(dragzonesList as NodeListOf<HTMLElement>)

  useEffect(() => {
    const dragzonesList = document.querySelectorAll<HTMLElement>('.dragzone')
    const dragzones = Array.from(dragzonesList as NodeListOf<HTMLElement>)

    dragzones.forEach((draggable) => getPosition(draggable))
  }, [dragzonesList])

  useEffect(() => {
    if (draggables[d].length === 0 && dragItemList.length === 0) {
      makeAnew(amountOfBlobs)
    }
  }, [dragItemList])

  const makeAnew = (amount: number) => {
    if (dragItemList.length === 0) {
      const dragzonesList = document.querySelectorAll<HTMLElement>('.dragzone')
      const dragzones = Array.from(dragzonesList as NodeListOf<HTMLElement>)

      dragzones.forEach((draggable) => draggable.remove())
      window.localStorage.removeItem(localStorageDraggables)
      setDragItemList([])

      for (let i: number = 0; i < amount; i++) {
        const colorswitch = () => {
          let number: number = Math.round(getRandomMinMax(0.1, 7))
          switch (number) {
            case 1:
              color1 = 'lemonchiffon'
              color2 = 'greenyellow'
              break
            case 2:
              color1 = 'cyan'
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
          }
          return [color1, color2]
        }

        const colorFirst: string = colorswitch()[0]
        const colorSecond: string = colorswitch()[1]

        setDragItemList((current) => [
          ...current,
          {
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
            background: `linear-gradient(${angle}, ${colorFirst},${colorSecond})`,
          },
        ])
      }
    }
  }
  function getRandomMinMax(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const amountOfBlobs = 8 // Initial amount of blobs

  let blobCount =
    draggables[d].length > amountOfBlobs ? draggables[d].length : amountOfBlobs

  const DragComponent = ({ items }: { items: Draggable[] }) => {
    return (
      <ul
        ref={dragUl0}
        role='listbox'
        id={`listbox${d}`}
        aria-labelledby={`blobdescription${d}`}
        aria-activedescendant=''
      >
        {items.map((item: Draggable) => {
          const blobStyle: React.CSSProperties = {
            background: `${item.background}`,
            display: `${item.display}`,
            left: `${item.x}`,
            top: `${item.y}`,
            zIndex: `${item.z}`,
            ['--i' as string]: `${item.i}`,
          }

          const blobDraggable: Draggable = {
            id: item.id,
            number: item.number,
            i: item.i,
            x: item.x,
            y: item.y,
            z: item.z,
            display: item.display,
            ariaGrabbed: false,
            draggable: true,
            tabIndex: 0,
            background: item.background,
          }
          draggables[d][item.number - 1] = blobDraggable
          saveDraggables()

          return (
            <li
              key={uuidv4()}
              className='dragzone'
              id={item.id}
              aria-grabbed={false}
              role={'option'}
              tabIndex={item.tabIndex}
              draggable={item.draggable}
              style={blobStyle}
              onMouseDown={(e) => {
                if (selectedvalue0.current)
                  selectedvalue0.current.textContent = `Selected blob: ${
                    (e.target as HTMLElement)?.querySelector('span')?.textContent
                  }`
                start(e)
              }}
              onMouseMove={(e) => {
                movement(e)
              }}
              onMouseUp={(e) => {
                stopMovementCheck(e)
                if (selectedvalue0.current)
                  selectedvalue0.current.textContent = `Selected blob: none`
              }}
              onMouseLeave={(e) => {
                stopMoving(e)
                if (selectedvalue0.current)
                  selectedvalue0.current.textContent = `Selected blob: none`
              }}
              onTouchStart={(e) => {
                start(e)
                if (selectedvalue0.current)
                  selectedvalue0.current.textContent = `Selected blob: ${
                    (e.target as HTMLElement)?.querySelector('span')?.textContent
                  }`
              }}
              onTouchMove={(e) => {
                movement(e)
              }}
              onTouchEnd={(e) => {
                stopMovementCheck(e)
                if (selectedvalue0.current)
                  selectedvalue0.current.textContent = `Selected blob: none`
              }}
              onWheel={(e) => {
                wheel(e.target as HTMLLIElement)
              }}
              onFocus={(e) => {
                focused(e.target)
                if (selectedvalue0.current)
                  selectedvalue0.current.textContent = `Selected blob: ${
                    (e.target as HTMLElement)?.querySelector('span')?.textContent
                  }`
              }}
              onBlurCapture={(e) => {
                blurred(e.target)
                if (selectedvalue0.current)
                  selectedvalue0.current.textContent = `Selected blob: none`
              }}
            >
              <span className='scr'>Blob {item.number}</span>
            </li>
          )
        })}
      </ul>
    )
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
      background: blobColor1,
    }

    draggables[d][blobDraggables.number - 1] = blobDraggables
    saveDraggables()
  }

  //reset most stats when removing a blob
  const getPositionReset = (draggable: HTMLElement) => {
    const blobID = draggable.id
    const blobNumber = draggable.id.replace(/^\D+/g, '') //replace non-numbers with empty

    const blobDraggables: Draggable = {
      id: blobID,
      number: parseInt(blobNumber),
      i: 1,
      x: '0',
      y: '0',
      z: '0',
      display: 'none',
      ariaGrabbed: false,
      draggable: false,
      tabIndex: 0,
      background: 'none',
    }

    draggables[d][blobDraggables.number - 1] = blobDraggables
    saveDraggables()
  }

  let scroll = true

  function disableScroll() {
    if (scroll) {
      if (disableScrollButton.current)
        disableScrollButton.current.textContent = 'Enable Scroll'
      document.body.style.overflow = 'hidden'
    } else {
      if (disableScrollButton.current)
        disableScrollButton.current.textContent = 'Disable Scroll'
      document.body.style.overflow = 'auto'
    }
    scroll ? (scroll = false) : (scroll = true)
  }

  //SLIDERS

  const [slider1Val, setSlider1Val] = useState(backgroundColor[d][0] ?? defaultLightness)
  const [slider2Val, setSlider2Val] = useState(backgroundColor[d][1] ?? defaultSaturation)
  const [slider3Val, setSlider3Val] = useState(backgroundColor[d][2] ?? defaultHue)

  let lightness = slider1Val
  let saturation = slider2Val
  let hue = slider3Val

  const [dragWrapOuterLightness, setDragWrapOuterLightness] =
    useState<React.CSSProperties>(
      sliderLightnessInput.current
        ? {
            ['--lightness' as string]: `${sliderLightnessInput.current.value}`,
          }
        : {
            ['--lightness' as string]: `${slider1Val}`,
          }
    )
  const [dragWrapOuterSaturation, setDragWrapOuterSaturation] =
    useState<React.CSSProperties>(
      sliderSaturationInput.current
        ? {
            ['--saturation' as string]: `${sliderSaturationInput.current.value}`,
          }
        : {
            ['--saturation' as string]: `${slider2Val}`,
          }
    )
  const [dragWrapOuterHue, setDragWrapOuterHue] = useState<React.CSSProperties>(
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
        100 - (makeLarger0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        0
      )

    if (colorBlockRed.current && dragWrap.current) place(colorBlockRed.current, 0, 28)
    if (colorBlockPurple.current && dragWrap.current)
      place(colorBlockPurple.current, 0, 48)
    if (colorBlockBlue.current && dragWrap.current) place(colorBlockBlue.current, 0, 68)

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
        100 - (makeSmaller0.current.offsetWidth / dragWrap.current.offsetWidth) * 100,
        95
      )
  }
  function place(element: HTMLElement, x_pos: number, y_pos: number) {
    if (element && dragWrap.current) {
      element.style.left = (dragWrap.current.offsetWidth / 100) * x_pos + 'px'
      element.style.top = (dragWrap.current.offsetHeight / 100) * y_pos + 'px'
    }
  }

  //Detect touch device
  const isTouchDevice = () => {
    try {
      //Try to create TouchEvent (fails for desktops and throws error)
      document.createEvent('TouchEvent')
      return true
    } catch (e) {
      return false
    }
  }
  useEffect(() => {
    isTouchDevice()
  }, [])

  function start(
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | React.TouchEvent
      | React.MouseEvent
      | React.PointerEvent
  ) {
    e.stopPropagation()
    e.preventDefault()

    initialX = !isTouchDevice()
      ? (e as PointerEvent).clientX
      : (e as TouchEvent).touches[0].clientX
    initialY = !isTouchDevice()
      ? (e as PointerEvent).clientY
      : (e as TouchEvent).touches[0].clientY

    moveElement = true
    ;(e.target as HTMLElement).classList.add('drag')
    ;(e.target as HTMLElement).style.setProperty('z-index', `${zIndex}`)
    ;(e.target as HTMLElement).setAttribute('aria-grabbed', 'true')
    //increase z-index
    zIndex += 1
    ;(e.target as HTMLElement).focus()
  }

  //Handle mousemove and touchmove
  function movement(
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | React.TouchEvent
      | React.MouseEvent
      | React.PointerEvent
  ) {
    e.stopPropagation()

    if (moveElement) {
      //e.preventDefault();
      let newX = !isTouchDevice()
        ? (e as PointerEvent).clientX
        : (e as TouchEvent).touches[0].clientX
      let newY = !isTouchDevice()
        ? (e as PointerEvent).clientY
        : (e as TouchEvent).touches[0].clientY
      ;(e.target as HTMLElement).style.top =
        (e.target as HTMLElement).offsetTop - (initialY - newY) + 'px'
      ;(e.target as HTMLElement).style.left =
        (e.target as HTMLElement).offsetLeft - (initialX - newX) + 'px'
      initialX = newX
      initialY = newY

      getPosition(e.target as HTMLElement)
    }
  }

  //Handle mouse up and touch end, check for element overlap
  const stopMovementCheck = (
    e:
      | TouchEvent
      | MouseEvent
      | PointerEvent
      | React.TouchEvent
      | React.MouseEvent
      | React.PointerEvent
  ) => {
    e.stopPropagation()
    let value = (e.target as HTMLElement).style.getPropertyValue('--i')
    let scale = parseFloat(value)

    if (
      colorBlockRed.current &&
      elementsOverlap(e.target as HTMLElement, colorBlockRed.current)
    ) {
      color1 = 'red'
      color2 = 'tomato'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-red')
    }
    if (
      colorBlockPurple.current &&
      elementsOverlap(e.target as HTMLElement, colorBlockPurple.current)
    ) {
      color1 = 'magenta'
      color2 = 'violet'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-red')
    }
    if (
      colorBlockBlue.current &&
      elementsOverlap(e.target as HTMLElement, colorBlockBlue.current)
    ) {
      color1 = 'deepskyblue'
      color2 = 'dodgerblue'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-blue')
    }
    if (
      colorBlockYellowLime0.current &&
      elementsOverlap(e.target as HTMLElement, colorBlockYellowLime0.current)
    ) {
      color1 = 'lemonchiffon'
      color2 = 'greenyellow'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-yellowlime')
    }
    if (
      colorBlockCyanYellow0.current &&
      elementsOverlap(e.target as HTMLElement, colorBlockCyanYellow0.current)
    ) {
      color1 = 'cyan'
      color2 = 'greenyellow'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-cyanyellow')
    }
    if (
      colorBlockCyanPink0.current &&
      elementsOverlap(e.target as HTMLElement, colorBlockCyanPink0.current)
    ) {
      color1 = 'cyan'
      color2 = 'pink'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-cyanpink')
    }
    if (
      colorBlockPinkYellow0.current &&
      elementsOverlap(e.target as HTMLElement, colorBlockPinkYellow0.current)
    ) {
      color1 = 'lemonchiffon'
      color2 = 'pink'
      ;(
        e.target as HTMLElement
      ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
      ;(e.target as HTMLElement).removeAttribute('class')
      ;(e.target as HTMLElement).classList.add('dragzone', 'color-pinkyellow')
    }
    if (
      makeLarger0.current &&
      elementsOverlap(e.target as HTMLElement, makeLarger0.current)
    ) {
      scale += 1
      scale = Math.min(Math.max(2, scale), 10)
      ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)
    }
    if (
      makeSmaller0.current &&
      elementsOverlap(e.target as HTMLElement, makeSmaller0.current)
    ) {
      scale -= 1
      scale = Math.min(Math.max(2, scale), 10)
      ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)
    }
    if (
      makeMore0.current &&
      elementsOverlap(e.target as HTMLElement, makeMore0.current)
    ) {
      makeBlob(e.target as HTMLElement)
    }
    if (
      deleteBlob0.current &&
      elementsOverlap(e.target as HTMLElement, deleteBlob0.current)
    ) {
      hideBlob(e.target as HTMLElement)
    }
    moveElement = false
    ;(e.target as HTMLElement).classList.remove('drag')
    ;(e.target as HTMLElement).setAttribute('aria-grabbed', 'false')
    getPosition(e.target as HTMLElement)
    ;(e.target as HTMLElement).blur()
  }
  //Check to see if elements overlap
  function elementsOverlap(element1: HTMLElement, element2: HTMLElement) {
    const domRect1 = element1.getBoundingClientRect()
    const domRect2 = element2.getBoundingClientRect()

    return !(
      domRect1.top + 5 > domRect2.bottom - 5 ||
      domRect1.right < domRect2.left ||
      domRect1.bottom - 5 < domRect2.top + 5 ||
      domRect1.left > domRect2.right
    )
  }

  //Handle mouse leave
  const stopMoving = (
    e: MouseEvent | React.MouseEvent | PointerEvent | React.PointerEvent
  ) => {
    e.stopPropagation()
    moveElement = false
    ;(e.target as HTMLElement).classList.remove('drag')
    ;(e.target as HTMLElement).setAttribute('aria-grabbed', 'false')
    getPosition(e.target as HTMLElement)
    ;(e.target as HTMLElement).blur()
  }

  //on blob blur
  function blurred(draggable: HTMLLIElement) {
    draggable.classList.remove('drag')
    draggable.setAttribute('aria-grabbed', 'false')
    dragWrap.current?.setAttribute('aria-activedescendant', '')
    getPosition(draggable)
  }

  //on focused blob
  function focused(draggable: HTMLLIElement) {
    draggable.classList.add('drag')
    draggable.setAttribute('aria-grabbed', 'true')
    dragUl0.current?.setAttribute('aria-activedescendant', `${draggable.id}`)
    draggable.addEventListener('keydown', keyDown)
    return () => {
      draggable.removeEventListener('keydown', keyDown)
      draggable.classList.remove('drag')
      draggable.setAttribute('aria-grabbed', 'false')
      dragWrap.current?.setAttribute('aria-activedescendant', '')
      getPosition(draggable)
    }
  }

  //Mousewheel use
  function wheel(draggable: HTMLLIElement) {
    draggable.addEventListener('wheel', zoom, { passive: false })
    return () => {
      draggable.removeEventListener('wheel', zoom)
    }
  }
  function zoom(e: WheelEvent) {
    //e.preventDefault();
    let value = (e.target as HTMLElement).style.getPropertyValue('--i')
    let scale = parseFloat(value)

    scale += e.deltaY * -0.005
    // Restrict scale
    scale = Math.min(Math.max(2, scale), 10)
    // Apply
    ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)
    //increase z-index
    zIndex += 1
  }

  // Keyboard use
  function keyDown(e: KeyboardEvent) {
    const movePx = 8

    let value = (e.target as HTMLElement).style.getPropertyValue('--i')
    let scale = parseFloat(value)

    let attrLeft = window
      .getComputedStyle(e.target as HTMLElement)
      .getPropertyValue('left')
    let attrTop = window.getComputedStyle(e.target as HTMLElement).getPropertyValue('top')

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        ;(e.target as HTMLElement).style.left =
          parseFloat(attrLeft) - Number(movePx) + 'px'
        attrLeft = window
          .getComputedStyle(e.target as HTMLElement)
          .getPropertyValue('left')
        break
      case 'ArrowRight':
        e.preventDefault()
        ;(e.target as HTMLElement).style.left =
          parseFloat(attrLeft) + Number(movePx) + 'px'
        attrLeft = window
          .getComputedStyle(e.target as HTMLElement)
          .getPropertyValue('left')
        break
      case 'ArrowUp':
        e.preventDefault()
        ;(e.target as HTMLElement).style.top = parseFloat(attrTop) - Number(movePx) + 'px'
        attrTop = window.getComputedStyle(e.target as HTMLElement).getPropertyValue('top')
        break
      case 'ArrowDown':
        e.preventDefault()
        ;(e.target as HTMLElement).style.top = parseFloat(attrTop) + Number(movePx) + 'px'
        attrTop = window.getComputedStyle(e.target as HTMLElement).getPropertyValue('top')
        break
      case 'Escape':
        e.stopImmediatePropagation()
        e.preventDefault()
        if (exitApp.current) {
          exitApp.current.setAttribute('tabindex', '0')
          exitApp.current.addEventListener('blur', exitAppBlur)
        }
        ;(e.target as HTMLElement).blur()
        dragWrap.current?.blur()
        //Go to exit notice in order to remove focus from the app
        if (exitApp.current) exitApp.current.textContent = 'Thank you for playing!'
        exitApp.current?.focus()
        break
      case 'Enter': //Cycle through colors
        e.stopImmediatePropagation()
        if ((e.target as HTMLElement).closest('.drag-container0')) {
          if (color1 == 'lemonchiffon' && color2 == 'pink') {
            color1 = 'lemonchiffon'
            color2 = 'greenyellow'
            ;(
              e.target as HTMLElement
            ).style.backgroundImage = `linear-gradient(${angle}, ${color1},${color2})`
            ;(e.target as HTMLElement).removeAttribute('class')
            ;(e.target as HTMLElement).classList.add('dragzone', 'color-yellowlime')
          } else if (color1 == 'lemonchiffon' && color2 == 'greenyellow') {
            color1 = 'cyan'
            color2 = 'greenyellow'
            ;(
              e.target as HTMLElement
            ).style.backgroundImage = `linear-gradient(${angle}, ${color1},${color2})`
            ;(e.target as HTMLElement).removeAttribute('class')
            ;(e.target as HTMLElement).classList.add('dragzone', 'color-cyanyellow')
          } else if (color1 == 'cyan' && color2 == 'greenyellow') {
            color1 = 'cyan'
            color2 = 'pink'
            ;(
              e.target as HTMLElement
            ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
            ;(e.target as HTMLElement).removeAttribute('class')
            ;(e.target as HTMLElement).classList.add('dragzone', 'color-cyanpink')
          } else if (color1 == 'cyan' && color2 == 'pink') {
            color1 = 'lemonchiffon'
            color2 = 'pink'
            ;(
              e.target as HTMLElement
            ).style.background = `linear-gradient(${angle}, ${color1},${color2})`
            ;(e.target as HTMLElement).removeAttribute('class')
            ;(e.target as HTMLElement).classList.add('dragzone', 'color-pinkyellow')
          } else {
            color1 = 'lemonchiffon'
            color2 = 'greenyellow'
            ;(
              e.target as HTMLElement
            ).style.backgroundImage = `linear-gradient(${angle}, ${color1},${color2})`
            ;(e.target as HTMLElement).removeAttribute('class')
            ;(e.target as HTMLElement).classList.add('dragzone', 'color-yellowlime')
          }
        }
        e.preventDefault()
        break
      case '0': //Move blob to the bottom of the z-index pile
        e.stopImmediatePropagation()
        e.preventDefault()
        if (reset) {
          reset = false
          ;(e.target as HTMLElement).style.setProperty('z-index', `${zIndex0}`)
          //Reset z-index
          zIndex0 -= 1
          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case '1': //make blob smaller
        e.stopImmediatePropagation()
        e.preventDefault()
        if (reset) {
          reset = false
          scale -= 1
          scale = Math.min(Math.max(2, scale), 10)
          ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)

          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case '2': //make blob larger
        e.stopImmediatePropagation()
        e.preventDefault()
        if (reset) {
          reset = false
          scale += 1
          scale = Math.min(Math.max(2, scale), 10)
          ;(e.target as HTMLElement).style.setProperty('--i', `${scale}`)

          const cooldown = () => {
            reset = true
          }
          setTimeout(cooldown, 100)
        }
        break
      case '3': //make a new clone
      case '+':
        e.stopImmediatePropagation()
        e.preventDefault()
        makeBlob(e.target as HTMLElement)
        break
      case 'Delete': //remove blob
      case '-':
        e.stopImmediatePropagation()
        e.preventDefault()
        hideBlob(e.target as HTMLElement)
        break
    }
  }

  //Remove exit notice's tabindex and text as unnecessary after leaving it
  function exitAppBlur() {
    if (exitApp.current) {
      exitApp.current?.removeAttribute('tabindex')
      exitApp.current?.removeEventListener('blur', exitAppBlur)
      exitApp.current.textContent = ''
    }
  }

  //Clone blob
  function makeBlob(target: HTMLElement) {
    if (reset) {
      blobCount++
      reset = false

      const clone = target.cloneNode(false)

      ;(clone as HTMLElement).removeAttribute('id')
      ;(clone as HTMLElement).setAttribute('id', `blob${blobCount}-${d}`)
      ;(clone as HTMLElement).setAttribute('role', 'option')
      let cloneSpan = document.createElement('span')
      cloneSpan.innerText = `blob ${blobCount}`
      clone.appendChild(cloneSpan)
      //increase z-index
      zIndex += 1
      ;(clone as HTMLElement).style.setProperty('z-index', `${zIndex}`)

      dragUl0.current?.append(clone)
      ;(clone as HTMLElement).onmousedown = (e) => {
        start(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: ${
            (e.target as HTMLElement)?.querySelector('span')?.textContent
          }`
      }
      ;(clone as HTMLElement).onmousemove = (e) => {
        movement(e)
      }
      ;(clone as HTMLElement).onmouseup = (e) => {
        stopMovementCheck(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: none`
      }
      ;(clone as HTMLElement).onmouseleave = (e) => {
        stopMoving(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: none`
      }
      ;(clone as HTMLElement).ontouchstart = (e) => {
        start(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: ${
            (e.target as HTMLElement)?.querySelector('span')?.textContent
          }`
      }
      ;(clone as HTMLElement).ontouchmove = (e) => {
        movement(e)
      }
      ;(clone as HTMLElement).ontouchend = (e) => {
        stopMovementCheck(e)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: none`
      }
      ;(clone as HTMLElement).onwheel = (e) => {
        wheel(e.target as HTMLLIElement)
      }
      ;(clone as HTMLElement).onfocus = (e) => {
        focused(e.target as HTMLLIElement)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: ${
            (e.target as HTMLElement)?.querySelector('span')?.textContent
          }`
      }
      ;(clone as HTMLElement).onblur = (e) => {
        blurred(e.target as HTMLLIElement)
        if (selectedvalue0.current)
          selectedvalue0.current.textContent = `Selected blob: none`
      }

      getPosition(clone as HTMLLIElement)

      const cooldown = () => {
        reset = true
      }
      setTimeout(cooldown, 100)
      ;(clone as HTMLElement).focus()
    }
  }

  //Remove blob
  function hideBlob(target: HTMLElement) {
    if (reset) {
      reset = false
      ;(target as HTMLElement).style.display = 'none'
      setDragItemList((current) => current.filter((item) => item.id !== target.id))
      getPositionReset(target as HTMLElement)
      const cooldown = () => {
        reset = true
      }
      setTimeout(cooldown, 100)
    }
  }

  return (
    <>
      <section id={`drag-container${d}`} className={`drag-container drag-container${d}`}>
        <div className={'label-container'}>
          <span id={`blobdescription${d}`} className={'scr'}>
            Try dragging the blobs
          </span>
          <div ref={selectedvalue0} id={`selectedvalue${d}`} className='selectedvalue'>
            Selected blob: none
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
            Stop Movement
          </button>
          <button
            ref={resetBlobs}
            id={`reset-blobs${d}`}
            className='reset-blobs'
            onClick={(e) => {
              resetBlobsFunction(e)
            }}
          >
            Reset Blobs
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
            Disable Scroll
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
          <div ref={dragWrap} className='drag-wrap'>
            <DragComponent items={dragItemList} />
          </div>
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
            -
          </div>
        </div>
        <div className='drag-slider-wrap'>
          <label htmlFor={`drag-slider-lightness${d}`} id={`lightnessdescription${d}`}>
            Adjust background lightness
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
            Reset Lightness
          </button>
        </div>
        <div className='drag-slider-wrap'>
          <label htmlFor='drag-slider-saturation0' id={`saturationdescription${d}`}>
            Adjust background saturation
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
            Reset Saturation
          </button>
        </div>
        <div className='drag-slider-wrap'>
          <label htmlFor={`drag-slider-hue${d}`} id={`huedescription${d}`}>
            Adjust background hue
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
            Reset Hue
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
