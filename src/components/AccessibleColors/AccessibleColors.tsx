import { useState, useEffect, FC, useRef, useMemo, lazy, Suspense } from 'react'
import styles from './accessiblecolors.module.css'
import { notify } from '../../reducers/notificationReducer'
import useLocalStorage from '../../hooks/useStorage'
import {
  EDarkMode,
  EError,
  ELanguages,
  ELightMode,
  ELoading,
  ERemove,
  EReset,
} from '../../interfaces'
import { useDragAndDrop } from './hooks/useColorDragAndDrop'
import { EAddAColor } from '../../interfaces/draganddrop'
//import ColorsInput from './components/ColorsInput'
import {
  EAAACompliantWithID,
  EAAACompliantWithUI,
  EAACompliantWithID,
  EAAGraphicElementCompliantWithID,
  EAnalogous,
  EClearAndGenerateNew,
  EColorMode,
  EColorPicker,
  EComplementary,
  EEditSize,
  EGenerateColors,
  EGeneratesColorsBasedOnLastColor,
  EHideColorName,
  EHighestAAAComplianceWithRegularText,
  EMinimumAAComplianceWithRegularText,
  EMonochromatic,
  ENoCompliantColors,
  ERemoveColorConfirmation,
  ESaveAsPNG,
  ESaveAsSVG,
  ESelectColorMode,
  ESelectColorModeForNewColors,
  EShowColorName,
  ETetrad,
  EToggleColorNameVisibility,
  ETriad,
} from '../../interfaces/colors'
import { useTheme, useThemeUpdate } from '../../hooks/useTheme'
import {
  EAreYouSureYouWantToDeleteThisVersion,
  EArtSaved,
  EHideControls,
  EShowControls,
  EToggleControlVisibility,
} from '../../interfaces/blobs'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { EClear } from '../../interfaces/select'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { PiDownloadSimpleFill } from 'react-icons/pi'
import {
  calculateLuminance,
  clampValue,
  getContrastRatio,
  getRandomString,
  hexToRGB,
  hslToHex,
  hslToRGB,
  rgbToHex,
  rgbToHSL,
} from '../../utils'
import { Select, SelectOption } from '../Select/Select'
import useRandomMinMax from '../../hooks/useRandomMinMax'
import useAccessibleColors from './hooks/useAccessibleColors'

const ColorsInput = lazy(() => import('./components/ColorsInput'))

const randomString = getRandomString(5)

export interface ComplianceResult {
  isAARegularTextCompliant: boolean
  isAAARegularTextCompliant: boolean
  isAAUIComponentsCompliant: boolean
}

export interface ColorBlock {
  id: number
  color: string
  luminance: number
  status: string
  colorFormat: 'hex' | 'rgb' | 'hsl'
  compliantColors: {
    AA_RegularText: number[]
    AAA_RegularText: number[]
    AA_UIComponents: number[]
  }
}

export type TColorMode =
  | 'analogous'
  | 'complementary'
  | 'triad'
  | 'tetrad'
  | 'monochromatic'

export interface HSLColor {
  h: number
  s: number
  l: number
}

export enum ComplianceLevel {
  AA_RegularText = 'AA_RegularText',
  AAA_RegularText = 'AAA_RegularText',
  AA_UIComponents = 'AA_UIComponents',
}

////
//
//
//
//
//
////

interface Props {
  language: ELanguages
}
const status = 'colors'
const AccessibleColors: FC<Props> = ({ language }) => {
  const {
    colors,
    setColors,
    addColor,
    removeColor,
    updateColor,
    currentColor,
    setCurrentColor,
    resetColors,
    clearColors,
    mode,
    setMode,
    makeColorPalette,
    setColorsReset,
  } = useAccessibleColors('analogous')

  const statuses = useMemo(() => [status], [])

  const dispatch = useAppDispatch()
  const lightTheme = useTheme()
  const toggleTheme = useThemeUpdate()
  const [show, setShow] = useState(true)
  const [showColorName, setShowColorName] = useLocalStorage(
    'Jenniina-showColorNames',
    true
  )

  const { isDragging, listItemsByStatus, handleDragging, handleUpdate } = useDragAndDrop(
    colors,
    statuses
  )
  const dragOverItem = useRef<number>(0)
  const [theTarget, setTheTarget] = useState<number>(0)

  const baseWidth = 8
  const [widthNumber, setWidth] = useLocalStorage('Jenniina-color-block-width', baseWidth)
  const width = `${widthNumber}em`

  const fontSizeMultiplier = widthNumber / baseWidth
  const dynamicFontSize = {
    tooltip: `${0.7 * fontSizeMultiplier}em`,
    colorName: `${0.7 * fontSizeMultiplier}em`,
    input: `${0.8 * fontSizeMultiplier}em`,
  }

  const colorModeOptions: SelectOption[] = [
    { value: 'analogous', label: EAnalogous[language] },
    { value: 'complementary', label: EComplementary[language] },
    { value: 'monochromatic', label: EMonochromatic[language] },
    { value: 'triad', label: ETriad[language] },
    { value: 'tetrad', label: ETetrad[language] },
  ]

  let random: number = Math.floor(Math.random() * colorModeOptions.length)

  const [colorMode, setColorMode] = useState<SelectOption | undefined>(
    colorModeOptions[random]
  )

  useEffect(() => {
    setMode(colorMode?.value as TColorMode)
  }, [colorMode])

  const resetAndMake = () => {
    listItemsByStatus[status].removeItems()
    setColorsReset(true)
    clearColors()
  }

  const parseColor = (color: string, format: string): string => {
    if (format === 'hex') {
      // Validate HEX format
      const hexRegex = /^#([A-Fa-f0-9]{6})$/
      if (hexRegex.test(color)) {
        return color.toUpperCase()
      } else {
        throw new Error(`Invalid HEX color format: ${color}`)
      }
    } else if (format === 'rgb') {
      const rgbMatch = color.match(
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
      )
      if (rgbMatch) {
        const r = Number(rgbMatch[1])
        const g = Number(rgbMatch[2])
        const b = Number(rgbMatch[3])
        if ([r, g, b].every((val) => val >= 0 && val <= 255)) {
          return rgbToHex(r, g, b)
        } else {
          throw new Error(`RGB values out of range in color: ${color}`)
        }
      } else {
        throw new Error(`Invalid RGB color format: ${color}`)
      }
    } else if (format === 'hsl') {
      const hslMatch = color.match(
        /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
      )
      if (hslMatch) {
        let h = clampValue(0, Number(hslMatch[1]), 360)
        let s = clampValue(0, Number(hslMatch[2]), 100)
        let l = clampValue(0, Number(hslMatch[3]), 100)

        h = (h + 360) % 360
        s = clampValue(0, s, 100)
        l = clampValue(0, l, 100)

        return `hsl(${h}, ${s}%, ${l}%)`
      } else {
        throw new Error(`Invalid HSL color format: ${color}`)
      }
    } else {
      throw new Error(`Unsupported color format: ${format}`)
    }
  }

  const ComplianceShapes: Record<
    | ComplianceLevel.AA_RegularText
    | ComplianceLevel.AA_UIComponents
    | ComplianceLevel.AAA_RegularText,
    ComplianceShapeFunction
  > = {
    AA_RegularText: ({
      xPosition,
      yIndicator,
      blockWidth,
      indicatorSize,
      otherColor,
      blockColor,
      colorFormatBlock,
      colorFormatOther,
    }) => {
      const convertedBlockColor = parseColor(blockColor, colorFormatBlock)
      const convertedOtherColor = parseColor(otherColor, colorFormatOther)
      return `
 <circle
  cx="${xPosition + blockWidth / 2}"
  cy="${yIndicator + indicatorSize / 2}"
  r="${indicatorSize * 0.32}"
  fill="${convertedBlockColor}"
  stroke="${convertedOtherColor}"
  stroke-width="${indicatorSize * 0.1}"
/>
`
    },
    AA_UIComponents: ({
      xPosition,
      yIndicator,
      blockWidth,
      indicatorSize,
      otherColor,
      blockColor,
      colorFormatBlock,
      colorFormatOther,
    }) => {
      const convertedBlockColor = parseColor(blockColor, colorFormatBlock)
      const convertedOtherColor = parseColor(otherColor, colorFormatOther)

      return `
    <rect
  x="${xPosition + blockWidth / 2 - indicatorSize * 0.2}"
  y="${yIndicator + indicatorSize / 2 - indicatorSize * 0.15}"
  width="${indicatorSize * 0.3}"
  height="${indicatorSize * 0.3}"
  fill="${convertedBlockColor}"
  stroke="${convertedOtherColor}"
  stroke-width="${indicatorSize * 0.1}"
/>
`
    },
    AAA_RegularText: ({
      xPosition,
      yIndicator,
      blockWidth,
      indicatorSize,
      otherColor,
      blockColor,
      colorFormatBlock,
      colorFormatOther,
    }) => {
      const convertedOtherColor = parseColor(otherColor, colorFormatOther)
      return `
<circle
  cx="${xPosition + blockWidth / 2}"
  cy="${yIndicator + indicatorSize / 2}"
  r="${indicatorSize / 2}"
  fill="${convertedOtherColor}"
  stroke="none"
/>
`
    },
  }

  const generateSVG = (): { svgContent: string; svgWidth: number; svgHeight: number } => {
    const width = widthNumber * 20
    const blockWidth = width
    const indicatorSize = blockWidth / 3
    const indicatorSpacing = indicatorSize / 1.5
    const padding = width / 4
    const lineHeight = indicatorSize / 20
    const fontSize = blockWidth / 10
    const items = listItemsByStatus[status]?.items || []

    const totalIndicators = items?.length
    const blockHeight =
      totalIndicators * (indicatorSize + indicatorSpacing) -
      indicatorSpacing +
      padding * 2
    const textBlockHeight = showColorName ? fontSize + padding : 0

    const svgWidth = items.length * blockWidth
    const svgHeight = blockHeight + textBlockHeight * 1.6

    const blocksGroup = items
      ?.map((block, index) => {
        const xPosition = index * blockWidth

        // Convert block color
        let convertedBlockColor: string
        try {
          convertedBlockColor = parseColor(block.color, block.colorFormat)
        } catch (error) {
          console.error(error)
          dispatch(notify(`${EError[language]}: ${(error as Error).message}`, true, 4))
          convertedBlockColor = '#000000' // Default to black on error
        }

        // Color block rectangle
        const blockRect = `
        <rect
          x="${xPosition}"
          y="0"
          width="${blockWidth}"
          height="${blockHeight}"
          fill="${convertedBlockColor}"
          stroke="none"
        />
      `

        // Text background rectangle and label
        const textContent = showColorName
          ? `
        <!-- Text Background -->
        <rect
          x="${xPosition}"
          y="${blockHeight - 0.5}"
          width="${blockWidth}"
          height="${textBlockHeight}"
          fill="${convertedBlockColor}"
          stroke="none"
        />
        <!-- Color Text Label -->
        <text
          x="${xPosition + blockWidth / 2}"
          y="${blockHeight + textBlockHeight / 2 + fontSize / 3}"
          font-size="${fontSize}"
          font-family="Arial"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="${block.luminance > 0.179 ? '#000000' : '#FFFFFF'}"
          stroke="none"
        >
          ${block.color}
        </text>
      `
          : ''

        return `
        <g>
          <!-- Color Block -->
          ${blockRect}
          <!-- Color Text Label -->
          ${textContent}
        </g>
      `
      })
      .join('')

    const linesGroup = items
      ?.map((colorItem, idx) => {
        const yIndicator = padding + idx * (indicatorSize + indicatorSpacing)
        const yLine = yIndicator + (indicatorSize - lineHeight) / 2
        const lineColor = parseColor(colorItem.color, colorItem.colorFormat)

        return `
        <rect
          x="0"
          y="${yLine}"
          width="${svgWidth}"
          height="${lineHeight}"
          fill="${lineColor}"
          stroke="none"
        />
      `
      })
      .join('')

    const indicatorsGroup = items
      ?.map((block, index) => {
        const xPosition = index * blockWidth

        // Determine highest compliance level for each color
        const highestCompliance = (
          otherId: number
        ): keyof typeof ComplianceShapes | null => {
          if (block.compliantColors?.AAA_RegularText?.includes(otherId))
            return ComplianceLevel.AAA_RegularText
          if (block.compliantColors?.AA_RegularText?.includes(otherId))
            return ComplianceLevel.AA_RegularText
          if (block.compliantColors?.AA_UIComponents?.includes(otherId))
            return ComplianceLevel.AA_UIComponents

          return null
        }

        const indicators = items
          ?.filter((_, otherIdx) => otherIdx !== index)
          .map((other) => {
            const complianceLevel = highestCompliance(other.id)
            if (!complianceLevel) return ''

            return ComplianceShapes[complianceLevel]({
              xPosition,
              yIndicator:
                padding + items.indexOf(other) * (indicatorSize + indicatorSpacing),
              blockWidth,
              indicatorSize,

              otherColor: other.color,
              blockColor: block.color,
              colorFormatBlock: block.colorFormat,
              colorFormatOther: other.colorFormat,
            })
          })
          .join('')

        return `
        <g>
          <!-- Compliance Indicators -->
          ${indicators}
        </g>
      `
      })
      .join('')

    const linkMargin = 10
    const linkX = svgWidth - linkMargin
    const linkY = svgHeight - linkMargin * 1.5
    const linkURL = 'https://colors.jenniina.fi'

    const linkElement = `
      <a href="${linkURL}" target="_blank" rel="noopener noreferrer">
        <text
          x="${linkX}"
          y="${linkY}"
          font-size="${fontSize}"
          font-family="Arial"
          text-anchor="end"
          fill="#000000"
          stroke="none"
        >
          ${linkURL}
        </text>
      </a>
    `

    const linkElement2 = `
      <a href="${linkURL}" target="_blank" rel="noopener noreferrer">
        <text
          x="${linkMargin}"
          y="${linkY}"
          font-size="${fontSize}"
          font-family="Arial"
          text-anchor="start"
          fill="#FFFFFF"
          stroke="none"
        >
          ${linkURL}
        </text>
      </a>
    `

    const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">
      <!-- Color Blocks -->
      <g>
        ${blocksGroup}
      </g>
      <!-- Lines -->
      <g>
        ${linesGroup}
      </g>
      <!-- Compliance Indicators -->
      <g>
        ${indicatorsGroup}
      </g>
      <!-- Source Link -->
      <g>
        ${linkElement2}
      </g>
      <g>
        ${linkElement}
      </g>
    </svg>
  `

    return { svgContent, svgWidth, svgHeight }
  }

  // Compliance Shapes Mapping
  type ComplianceShapeFunction = (props: {
    xPosition: number
    yIndicator: number
    blockWidth: number
    indicatorSize: number
    otherColor: string
    blockColor: string
    colorFormatBlock: string
    colorFormatOther: string
  }) => string

  const saveAsSVG = () => {
    const { svgContent } = generateSVG()
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'color-blocks.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    dispatch(notify(EArtSaved[language], false, 5))
  }

  const saveAsPNG = () => {
    const { svgContent, svgWidth, svgHeight } = generateSVG()

    const img = new Image()
    img.width = svgWidth
    img.height = svgHeight

    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = svgWidth
      canvas.height = svgHeight
      const context = canvas.getContext('2d')

      context?.drawImage(img, 0, 0)

      const pngDataUrl = canvas.toDataURL('image/png')

      const link = document.createElement('a')
      link.href = pngDataUrl
      link.download = 'color-blocks.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
      dispatch(notify(EArtSaved[language], false, 5))
    }

    img.onerror = (err) => {
      console.error('Error loading SVG into image for PNG conversion:', err)
      URL.revokeObjectURL(url)
      dispatch(notify(EError[language], true, 4))
    }

    img.src = url
  }

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, position: number) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: 'item', id: position }))
  }

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, position: number) => {
    e.preventDefault()
    setTheTarget(position)
    dragOverItem.current = position
  }

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault()
    handleDragging(true)
  }

  const handleDrop = (e: React.DragEvent<HTMLUListElement>) => {
    const data = JSON.parse(e.dataTransfer.getData('text/plain'))
    if (data.type === 'item') {
      handleUpdate(data.id, status, theTarget)
      setTimeout(() => {
        setColors(listItemsByStatus[status]?.items)
      }, 200)
      handleDragging(false)
    }
  }

  useEffect(() => {
    if (
      !listItemsByStatus[status]?.items ||
      listItemsByStatus[status]?.items.length < 1
    ) {
      resetColors()
    }
  }, [])

  const times = 0.04

  return (
    <div
      id={styles['color-container']}
      className={`${styles['color-container']} ${lightTheme ? styles.light : ''}`}
      style={{ ['--font-size' as string]: dynamicFontSize.input }}
    >
      <div id='info' className={styles['info-wrap']}>
        <ul>
          <li>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-primary-20)',
                borderRadius: '50%',
                width: `2em`,
                height: `2em`,
              }}
            ></div>
            <span>{EHighestAAAComplianceWithRegularText[language]}</span>
          </li>
          <li>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                outline: `0.3em solid var(--color-primary-20)`,
                outlineOffset: `-0.3em`,
                borderRadius: '50%',
                width: `1.7em`,
                height: `1.7em`,
                margin: '0 0.2em 0 0.2em ',
              }}
            ></div>
            <span>{EMinimumAAComplianceWithRegularText[language]}</span>
          </li>
          <li>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                outline: `0.3em solid var(--color-primary-20)`,
                outlineOffset: `-0.26em`,
                borderRadius: '0',
                width: `0.9em`,
                height: `0.9em`,
                margin: '0 0.65em 0 0.65em',
              }}
            ></div>
            <span>{EAAACompliantWithUI[language]}</span>
          </li>
        </ul>
      </div>

      <div className={styles['btn-wrap']}>
        {listItemsByStatus[status]?.items?.length > 0 && (
          <>
            <button type='button' onClick={saveAsPNG} className='gray small'>
              {ESaveAsPNG[language]}&nbsp;&nbsp;
              <PiDownloadSimpleFill />
            </button>
            <button type='button' onClick={saveAsSVG} className='gray small'>
              {ESaveAsSVG[language]}&nbsp;&nbsp;
              <PiDownloadSimpleFill />
            </button>
          </>
        )}
        <button onClick={toggleTheme} className='gray small'>
          {lightTheme ? (
            <>
              {EDarkMode[language]}&nbsp;&nbsp;
              <MdDarkMode />
            </>
          ) : (
            <>
              {ELightMode[language]}&nbsp;&nbsp;
              <MdLightMode />{' '}
            </>
          )}
        </button>
      </div>
      <div className={styles['color-picker']}>
        <label htmlFor='color-input' className=' '>
          {EColorPicker[language]}:
        </label>
        <input
          id='color-input'
          type='color'
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
        <button className='gray small' type='button' onClick={addColor}>
          {EAddAColor[language]}
        </button>
        <button className='gray small' type='button' onClick={resetColors}>
          {EReset[language]}
        </button>
        <button
          className='gray small'
          type='button'
          onClick={() => {
            listItemsByStatus[status].removeItems()
            clearColors()
          }}
        >
          {EClear[language]}
        </button>

        <div className={`${styles['color-edit-container']} ${styles['mode-container']}`}>
          <Select
            options={colorModeOptions}
            value={colorMode}
            onChange={(o) => setColorMode(o)}
            id='color-mode'
            instructions={ESelectColorModeForNewColors[language]}
            className={`${styles['color-select']}`}
            hide
            hideDelete
            tooltip={true}
            y='above narrow2'
            z={3}
          />
          <button
            className='gray small tooltip-wrap'
            type='button'
            onClick={makeColorPalette}
          >
            {EGenerateColors[language]}
            <span className='tooltip above narrow2'>
              {EGeneratesColorsBasedOnLastColor[language]}
            </span>
          </button>
          <button className='gray small' type='button' onClick={resetAndMake}>
            {EClearAndGenerateNew[language]}
          </button>
        </div>
      </div>
      <div
        id='color-blocks'
        className={`${styles['color-blocks']} ${
          !showColorName || !show ? styles.overflow : ''
        } ${isDragging ? styles.drag : ''}`}
      >
        {listItemsByStatus[status]?.items.map((block) => {
          return (
            <ul key={`${block.id}`} className={styles['block-wrap']} onDrop={handleDrop}>
              <li
                className={styles['color-wrap']}
                title={`ID: ${block.id}`}
                aria-label={`ID: ${block.id}`}
                style={{ width: `${width}`, maxWidth: `${width}` }}
              >
                <ul>
                  <li
                    draggable={'true'}
                    onDragStart={(e) => handleDragStart(e, block.id)}
                    onDragEnter={(e) => handleDragEnter(e, block.id)}
                    onDragOver={(e) => handleDragOver(e)}
                    onDragEnd={() => handleDragging(false)}
                    data-identity={block.id}
                    className={styles['color-block']}
                    style={{
                      ['--color' as string]: block.color,
                      backgroundColor: block.color,
                      width: `${width}`,
                      maxWidth: `${width}`,
                      height: `calc(calc(${width} * 0.6) * ${listItemsByStatus[status]?.items.length})`,
                    }}
                  >
                    <div
                      className={styles['compliance-indicators']}
                      style={{
                        gap: `calc(${width} / 4)`,
                        ['--width-full' as string]: `${width}`,
                      }}
                    >
                      {listItemsByStatus[status]?.items.map((otherColor) => {
                        if (otherColor.id === block.id) {
                          return (
                            <div
                              key={`none-${otherColor.color}-${otherColor.id}`}
                              className={`${styles['indicator-null']} ${styles.indicator}`}
                              style={{
                                ['--color' as string]: otherColor.color,
                                ['--width' as string]: `calc(${width} / 3)`,
                                ['--left' as string]: `calc(calc(${width} / 3) * -1)`,
                                backgroundColor: 'transparent',
                                width: `calc(${width} / 3)`,
                                height: `calc(${width} / 3)`,
                              }}
                            ></div>
                          )
                        }
                        let complianceLevel: ComplianceLevel | null = null
                        if (
                          block.compliantColors?.AAA_RegularText?.includes(otherColor.id)
                        ) {
                          complianceLevel = ComplianceLevel.AAA_RegularText
                        } else if (
                          block.compliantColors?.AA_RegularText?.includes(otherColor.id)
                        ) {
                          complianceLevel = ComplianceLevel.AA_RegularText
                        } else if (
                          block.compliantColors?.AA_UIComponents?.includes(otherColor.id)
                        ) {
                          complianceLevel = ComplianceLevel.AA_UIComponents
                        }

                        if (complianceLevel === ComplianceLevel.AAA_RegularText) {
                          return (
                            <div
                              key={`aaa-${otherColor.color}-${otherColor.id}`}
                              tabIndex={0}
                              className={`${styles['indicator-aaa']} ${styles.indicator} tooltip-wrap`}
                              style={{
                                ['--color' as string]: otherColor.color,
                                backgroundColor: otherColor.color,
                                ['--left' as string]: `calc(calc(${width} / 3) * -1)`,
                                width: `calc(${width} / 3)`,
                                height: `calc(${width} / 3)`,
                              }}
                            >
                              <span
                                id={`span-${otherColor.id}-${block.id}-${randomString}`}
                                className={`tooltip below narrow3 ${styles['tooltip']}`}
                                style={{
                                  fontSize: `clamp(0.7rem, ${dynamicFontSize.input}, 0.9rem)`,
                                  ['--tooltip-max-width' as string]: width,
                                }}
                              >{`${EAAACompliantWithID[language]}: ${otherColor.id}`}</span>
                            </div>
                          )
                        } else if (complianceLevel === ComplianceLevel.AA_RegularText) {
                          return (
                            <div
                              key={`aa-${otherColor.color}-${otherColor.id}`}
                              tabIndex={0}
                              className={`${styles['indicator-aa']} ${styles.indicator} tooltip-wrap`}
                              style={{
                                ['--color' as string]: otherColor.color,
                                backgroundColor: block.color,
                                outline: `calc(${width} * ${times * 1.1}) solid ${
                                  otherColor.color
                                }`,
                                outlineOffset: `calc(${width} * -0.013)`,
                                ['--left' as string]: `calc(calc(${width} / 5) * -2)`,
                                width: `calc(${width} / 5)`,
                                height: `calc(${width} / 5)`,
                                margin: `calc(${width} / 15)`,
                                borderRadius: '50%',
                              }}
                            >
                              <span
                                id={`span-${otherColor.id}-${block.id}-${randomString}`}
                                className='tooltip below narrow3'
                                style={{
                                  fontSize: `clamp(0.7rem, ${dynamicFontSize.input}, 0.9rem)`,
                                  ['--tooltip-max-width' as string]: width,
                                }}
                              >{`${EAACompliantWithID[language]}: ${otherColor.id}`}</span>
                            </div>
                          )
                        } else if (complianceLevel === ComplianceLevel.AA_UIComponents) {
                          return (
                            <div
                              key={`aa-ui-${otherColor.color}-${otherColor.id}`}
                              tabIndex={0}
                              className={`${styles['indicator-aa-ui']} ${styles.indicator} tooltip-wrap`}
                              style={{
                                ['--color' as string]: otherColor.color,
                                ['--left' as string]: `calc(calc(${width} / 7) * -3)`,
                                backgroundColor: block.color,
                                outline: `calc(${width} * ${times}) solid ${otherColor.color}`,
                                outlineOffset: `calc(${width} * ${times} * -1)`,
                                width: `calc(${width} / 7)`,
                                height: `calc(${width} / 7)`,
                                margin: `calc(${width} / 10.5)`,
                              }}
                            >
                              <span
                                id={`span-ui-${otherColor.id}-${block.id}-${randomString}`}
                                className={`tooltip below narrow3 ${styles['tooltip']}`}
                                style={{
                                  fontSize: `clamp(0.7rem, ${dynamicFontSize.input}, 0.9rem)`,
                                  ['--tooltip-max-width' as string]: width,
                                }}
                              >{`${EAAGraphicElementCompliantWithID[language]}: ${otherColor.id}`}</span>
                            </div>
                          )
                        }

                        return (
                          <div
                            aria-hidden='true'
                            key={`null-${otherColor.color}-${otherColor.id}`}
                            className={`${styles['indicator-null']} ${styles.indicator}`}
                            style={{
                              ['--color' as string]: otherColor.color,
                              backgroundColor: 'transparent',
                              ['--left' as string]: `calc(calc(${width} / 3) * -1)`,
                              width: `calc(${width} / 3)`,
                              height: `calc(${width} / 3)`,
                            }}
                          ></div>
                        )
                      })}
                    </div>
                  </li>
                </ul>
                {showColorName && (
                  <div
                    style={{
                      backgroundColor: block.color,
                      width: `${width}`,
                      maxWidth: `${width}`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0.5em 0.1em ',
                    }}
                    className={styles['color-name']}
                  >
                    <span
                      style={{
                        color: block.luminance < 0.179 ? 'white' : 'black',
                        fontSize: `clamp(0.7rem, ${dynamicFontSize.input}, 1.2rem)`,
                        textAlign: 'center',
                      }}
                    >
                      {block.color}
                    </span>
                  </div>
                )}
                {show && (
                  <>
                    <div className={styles['color-edit-container']}>
                      <Suspense fallback={<div>{ELoading[language]}...</div>}>
                        <ColorsInput
                          language={language}
                          block={block}
                          updateColor={updateColor}
                          width={width}
                          hexToRGB={hexToRGB}
                          rgbToHSL={rgbToHSL}
                          rgbToHex={rgbToHex}
                          hslToRGB={hslToRGB}
                          fontSize={`clamp(0.75rem, ${dynamicFontSize.input}, 1rem)`}
                        />
                      </Suspense>
                    </div>
                    <button
                      className={`tooltip-wrap small delete danger gray ${styles.remove}`}
                      onClick={() => removeColor(block.id)}
                      style={{
                        margin: '0.8em auto',
                        width: `calc(100% - 4px)`,
                        minWidth: `calc(100% - 4px)`,
                        fontSize: `clamp(0.75rem, ${dynamicFontSize.input}, 2rem)`,
                      }}
                    >
                      {ERemove[language]}
                    </button>
                  </>
                )}
              </li>
            </ul>
          )
        })}
      </div>
      {listItemsByStatus[status]?.items?.length > 0 && (
        <>
          <div className={styles['width-wrap']}>
            <label htmlFor='color-block-width'>{EEditSize[language]}</label>
            <input
              id='color-block-width'
              type='range'
              min={6}
              max={12}
              step={0.5}
              value={widthNumber}
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>
          <div className={`${styles['toggle-controls']}`}>
            <div>
              <strong>{EToggleControlVisibility[language]}</strong>
              <button
                id='toggle-controls'
                type='button'
                onClick={() => setShow(!show)}
                className='gray small'
              >
                {show ? EHideControls[language] : EShowControls[language]}
              </button>
            </div>
            <div>
              <strong>{EToggleColorNameVisibility[language]}</strong>
              <button
                type='button'
                onClick={() => setShowColorName(!showColorName)}
                className='gray small'
              >
                {showColorName ? EHideColorName[language] : EShowColorName[language]}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AccessibleColors
