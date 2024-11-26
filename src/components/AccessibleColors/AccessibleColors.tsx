import { useState, useEffect, FC, useRef } from 'react'
import styles from './accessiblecolors.module.css'
import { notify } from '../../reducers/notificationReducer'
import useLocalStorage from '../../hooks/useStorage'
import {
  EDarkMode,
  EDeleted,
  EError,
  ELanguages,
  ELightMode,
  ERemove,
  EReset,
} from '../../interfaces'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { EAddAColor } from '../../interfaces/draganddrop'
import ColorsInput from './ColorsInput'
import {
  EAAACompliantWithID,
  EAAACompliantWithUI,
  EAACompliantWithID,
  EAAGraphicElementCompliantWithID,
  EColorPicker,
  EEditSize,
  EHideColorName,
  EHighestAAAComplianceWithRegularText,
  EMinimumAAComplianceWithRegularText,
  ENoCompliantColors,
  ERemoveColorConfirmation,
  ESaveAsPNG,
  ESaveAsSVG,
  EShowColorName,
  EToggleColorNameVisibility,
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
  getContrastRatio,
  getRandomString,
  hexToRGB,
  hslToHex,
  hslToRGB,
  rgbToHex,
  rgbToHSL,
} from '../../utils'

const randomString = getRandomString(5)

interface ComplianceResult {
  isAARegularTextCompliant: boolean
  isAAARegularTextCompliant: boolean
  isAAUIComponentsCompliant: boolean
}

const determineAccessibility = (
  color1: ColorBlock,
  color2: ColorBlock
): ComplianceResult => {
  const parseC = (color: ColorBlock) => {
    let r: number, g: number, b: number

    if (color.colorFormat === 'hex') {
      ;({ r, g, b } = hexToRGB(color.color))
    } else if (color.colorFormat === 'rgb') {
      const rgbMatch = color.color.match(
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
      )
      if (rgbMatch) {
        r = Number(rgbMatch[1])
        g = Number(rgbMatch[2])
        b = Number(rgbMatch[3])
      } else {
        throw new Error('Invalid RGB format')
      }
    } else if (color.colorFormat === 'hsl') {
      const hslMatch = color.color.match(
        /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
      )
      if (hslMatch) {
        const h = Number(hslMatch[1])
        const s = Number(hslMatch[2])
        const l = Number(hslMatch[3])
        ;({ r, g, b } = hslToRGB(h, s, l))
      } else {
        throw new Error('Invalid HSL format')
      }
    } else {
      throw new Error('Unsupported color format')
    }

    return { r, g, b }
  }

  const rgb1 = parseC(color1)
  const rgb2 = parseC(color2)

  const lum1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b)

  const contrastRatio = getContrastRatio(lum1, lum2)

  return {
    isAAARegularTextCompliant: contrastRatio >= 7,
    isAARegularTextCompliant: contrastRatio >= 4.5,
    isAAUIComponentsCompliant: contrastRatio >= 3,
  }
}

const status = 'colors'
const format = 'hsl'

const defaultColors: ColorBlock[] = [
  {
    id: 1,
    color: 'hsl(200, 50%, 10%)',
    luminance: 0.011540526030345211,
    status: status,
    colorFormat: format,
    compliantColors: {
      AAA_RegularText: [4, 5],
      AA_UIComponents: [3, 4, 5],
      AA_RegularText: [3, 4, 5],
    },
  },
  {
    id: 2,
    color: 'hsl(200, 50%, 35%)',
    luminance: 0.12179747967530058,
    status: status,
    colorFormat: format,
    compliantColors: {
      AAA_RegularText: [],
      AA_UIComponents: [4, 5],
      AA_RegularText: [5],
    },
  },
  {
    id: 3,
    color: 'hsl(200, 50%, 55%)',
    luminance: 0.3071249100459835,
    status: status,
    colorFormat: format,
    compliantColors: {
      AAA_RegularText: [],
      AA_UIComponents: [1],
      AA_RegularText: [1],
    },
  },
  {
    id: 4,
    color: 'hsl(200, 50%, 75%)',
    luminance: 0.5493970089199802,
    status: status,
    colorFormat: format,
    compliantColors: {
      AAA_RegularText: [1],
      AA_UIComponents: [1, 2],
      AA_RegularText: [1],
    },
  },
  {
    id: 5,
    color: 'hsl(200, 50%, 90%)',
    luminance: 0.800081557105977,
    status: status,
    colorFormat: format,
    compliantColors: {
      AAA_RegularText: [1],
      AA_UIComponents: [1, 2],
      AA_RegularText: [1, 2],
    },
  },
]

////
//
//
//
//
//
////

enum ComplianceLevel {
  AA_RegularText = 'AA_RegularText',
  AAA_RegularText = 'AAA_RegularText',
  AA_UIComponents = 'AA_UIComponents',
}

interface ColorBlock {
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
interface Props {
  language: ELanguages
}

const AccessibleColors: FC<Props> = ({ language }) => {
  const dispatch = useAppDispatch()
  const lightTheme = useTheme()
  const toggleTheme = useThemeUpdate()
  const [show, setShow] = useState(true)
  const [showColorName, setShowColorName] = useLocalStorage(
    'Jenniina-showColorNames',
    true
  )

  const [colors, setColors, deleteColors] = useLocalStorage<ColorBlock[]>(
    'Jenniina-colorsAccessibility',
    defaultColors
  )
  const [currentColor, setCurrentColor] = useLocalStorage<string>(
    'Jenniina-currentColor',
    '#7D7D7D'
  )
  const [idCounter, setIdCounter] = useLocalStorage<number>('Jenniina-idCounter', 1)

  const { isDragging, listItemsByStatus, handleDragging, handleUpdate } = useDragAndDrop(
    colors,
    [status]
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
        const h = Number(hslMatch[1])
        const s = Number(hslMatch[2])
        const l = Number(hslMatch[3])
        if (
          [h, s, l].every((val, idx) =>
            idx === 0 ? val >= 0 && val <= 360 : val >= 0 && val <= 100
          )
        ) {
          return hslToHex(h, s, l)
        } else {
          throw new Error(`HSL values out of range in color: ${color}`)
        }
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

    const totalIndicators = listItemsByStatus[status]?.items?.length
    const blockHeight =
      totalIndicators * (indicatorSize + indicatorSpacing) -
      indicatorSpacing +
      padding * 2
    const textBlockHeight = showColorName ? fontSize + padding : 0

    const svgWidth = listItemsByStatus[status]?.items.length * blockWidth
    const svgHeight = blockHeight + textBlockHeight

    const blocksGroup = listItemsByStatus[status]?.items
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

    const linesGroup = listItemsByStatus[status]?.items
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

    const indicatorsGroup = listItemsByStatus[status]?.items
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

        const indicators = listItemsByStatus[status]?.items
          ?.filter((other) => other.id !== block.id)
          .map((other) => {
            const complianceLevel = highestCompliance(other.id)
            if (!complianceLevel) return ''

            return ComplianceShapes[complianceLevel]({
              xPosition,
              yIndicator: padding + (other.id - 1) * (indicatorSize + indicatorSpacing),
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

  const addColor = () => {
    const { r, g, b } = hexToRGB(currentColor)
    const { h, s, l } = rgbToHSL(r, g, b)
    const lum = calculateLuminance(r, g, b)

    const newColorBlock: ColorBlock = {
      id: idCounter,
      color: `hsl(${h}, ${s}%, ${l}%)`,
      luminance: lum,
      status: status,
      colorFormat: 'hsl',
      compliantColors: {
        AA_RegularText: [],
        AAA_RegularText: [],
        AA_UIComponents: [],
      },
    }

    // Iterate over existing color blocks to determine compliance levels
    listItemsByStatus[status]?.items?.forEach((block) => {
      const compliance = determineAccessibility(newColorBlock, block)

      if (compliance.isAAARegularTextCompliant) {
        newColorBlock.compliantColors?.AAA_RegularText.push(block.id)
        block.compliantColors?.AAA_RegularText.push(newColorBlock.id)
      } else if (compliance.isAARegularTextCompliant) {
        newColorBlock.compliantColors?.AA_RegularText.push(block.id)
        block.compliantColors?.AA_RegularText.push(newColorBlock.id)
      } else if (compliance.isAAUIComponentsCompliant) {
        newColorBlock.compliantColors?.AA_UIComponents?.push(block.id)
        block.compliantColors?.AA_UIComponents?.push(newColorBlock.id)
      }
    })

    // Remove duplicate IDs by converting to Set and back to array
    const updatedColors = listItemsByStatus[status]?.items.map((block) => ({
      ...block,
      compliantColors: {
        AAA_RegularText: Array.from(new Set(block.compliantColors?.AAA_RegularText)),
        AA_RegularText: Array.from(new Set(block.compliantColors?.AA_RegularText)),
        AA_UIComponents: Array.from(new Set(block.compliantColors?.AA_UIComponents)),
      },
    }))

    setColors([...updatedColors, newColorBlock])
    setIdCounter(idCounter + 1)
  }

  const removeColor = (id: number) => {
    if (window.confirm(ERemoveColorConfirmation[language])) {
      const updatedColors = listItemsByStatus[status]?.items
        .filter((block) => block.id !== id)
        .map((block) => ({
          ...block,
          compliantColors: {
            AAA_RegularText: block.compliantColors?.AAA_RegularText.filter(
              (compliantId) => compliantId !== id
            ),
            AA_RegularText: block.compliantColors?.AA_RegularText.filter(
              (compliantId) => compliantId !== id
            ),
            AA_UIComponents: block.compliantColors?.AA_UIComponents?.filter(
              (compliantId) => compliantId !== id
            ),
          },
        }))

      setColors(updatedColors)
      dispatch(notify(EDeleted[language], false, 5))
    }
  }

  const updateColor = (id: number, newColor: string, format: 'hex' | 'rgb' | 'hsl') => {
    try {
      let storedColor: string
      let r: number, g: number, b: number

      // Parse and store the color based on the selected format
      if (format === 'hsl') {
        const hslMatch = newColor.match(
          /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
        )
        if (!hslMatch) throw new Error('Invalid HSL format')

        const h = Number(hslMatch[1])
        const s = Number(hslMatch[2])
        const l = Number(hslMatch[3])

        if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
          throw new Error('HSL values out of range')
        }

        storedColor = `hsl(${h}, ${s}%, ${l}%)`

        const rgb = hslToRGB(h, s, l)
        r = rgb.r
        g = rgb.g
        b = rgb.b
      } else if (format === 'rgb') {
        const rgbMatch = newColor.match(
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
        )
        if (!rgbMatch) throw new Error('Invalid RGB format')

        const rVal = Number(rgbMatch[1])
        const gVal = Number(rgbMatch[2])
        const bVal = Number(rgbMatch[3])

        if ([rVal, gVal, bVal].some((v) => v < 0 || v > 255)) {
          throw new Error('RGB values must be between 0 and 255')
        }

        storedColor = `rgb(${rVal}, ${gVal}, ${bVal})`
        r = rVal
        g = gVal
        b = bVal
      } else if (format === 'hex') {
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(newColor))
          throw new Error('Invalid Hex format')

        storedColor = newColor.toUpperCase()
        const rgb = hexToRGB(storedColor)
        r = rgb.r
        g = rgb.g
        b = rgb.b
      } else {
        throw new Error('Unsupported color format')
      }

      const lum = calculateLuminance(r, g, b)

      const updatedColors = listItemsByStatus[status]?.items.map((block) => {
        if (block.id === id) {
          return {
            ...block,
            color: storedColor,
            colorFormat: format,
            luminance: lum,
            compliantColors: {
              AAA_RegularText: [],
              AA_RegularText: [],
              AA_UIComponents: [],
            },
          }
        } else {
          const accessibility = determineAccessibility(block, {
            id,
            color: storedColor,
            colorFormat: format,
            luminance: lum,
            status: block.status,
            compliantColors: {
              AAA_RegularText: [],
              AA_RegularText: [],
              AA_UIComponents: [],
            },
          })
          return {
            ...block,
            compliantColors: {
              AAA_RegularText: accessibility.isAAARegularTextCompliant
                ? [...new Set([...block.compliantColors?.AAA_RegularText, id])]
                : block.compliantColors?.AAA_RegularText.filter((cid) => cid !== id),
              AA_RegularText: accessibility.isAARegularTextCompliant
                ? [...new Set([...block.compliantColors?.AA_RegularText, id])]
                : block.compliantColors?.AA_RegularText.filter((cid) => cid !== id),
              AA_UIComponents: accessibility.isAAUIComponentsCompliant
                ? [...new Set([...block.compliantColors?.AA_UIComponents, id])]
                : block.compliantColors?.AA_UIComponents?.filter((cid) => cid !== id),
            },
          }
        }
      }) as ColorBlock[]

      const determineComplianceForBlock = (
        block: ColorBlock,
        allColors: ColorBlock[]
      ) => {
        let aaa: number[] = []
        let aaUI: number[] = []
        let aaRegular: number[] = []

        allColors.forEach((other) => {
          if (other.id === block.id) return
          const accessibility = determineAccessibility(block, other)
          if (accessibility.isAAARegularTextCompliant) {
            aaa.push(other.id)
          }
          if (accessibility.isAARegularTextCompliant) {
            aaRegular.push(other.id)
          }
          if (accessibility.isAAUIComponentsCompliant) {
            aaUI.push(other.id)
          }
        })

        return {
          AAA_RegularText: Array.from(new Set(aaa)),
          AA_RegularText: Array.from(new Set(aaRegular)),
          AA_UIComponents: Array.from(new Set(aaUI)),
        }
      }

      const updatedBlockIndex = updatedColors.findIndex((block) => block.id === id)
      if (updatedBlockIndex !== -1) {
        const recalculatedCompliance = determineComplianceForBlock(
          updatedColors[updatedBlockIndex],
          updatedColors
        )
        updatedColors[updatedBlockIndex] = {
          ...updatedColors[updatedBlockIndex],
          compliantColors: recalculatedCompliance,
        }
      }

      setColors([...updatedColors])
    } catch (error) {
      console.error('Error updating color:', error)
      dispatch(notify(`${EError[language]}: ${(error as Error).message}`, true, 4))
    }
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
      handleDragging(false)
    }
  }

  useEffect(() => {
    setColors(listItemsByStatus[status]?.items)
  }, [listItemsByStatus])

  useEffect(() => {
    if (
      !listItemsByStatus[status]?.items ||
      listItemsByStatus[status]?.items.length < 1
    ) {
      setColors(defaultColors)
    }
  }, [])

  useEffect(() => {
    if (listItemsByStatus[status]?.items.length < 1) {
      setIdCounter(1)
    }
  }, [colors])

  const clear = () => {
    if (window.confirm(EAreYouSureYouWantToDeleteThisVersion[language])) {
      deleteColors()
      setColors([])
    }
  }

  const reset = () => {
    if (window.confirm(EAreYouSureYouWantToDeleteThisVersion[language])) {
      deleteColors()
      setColors(defaultColors)
    }
  }

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
        <button className='gray small' type='button' onClick={reset}>
          {EReset[language]}
        </button>
        <button className='gray small' type='button' onClick={clear}>
          {EClear[language]}
        </button>
      </div>
      <div
        id='color-blocks'
        className={`${styles['color-blocks']} ${
          !showColorName || !show ? styles.overflow : ''
        } ${isDragging ? styles.drag : ''}`}
      >
        {listItemsByStatus[status]?.items.map((block) => {
          return (
            <ul
              key={`${block.color}-${block.id}`}
              className={styles['block-wrap']}
              onDrop={handleDrop}
            >
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
                              aria-labelledby={`span-${otherColor.id}-${block.id}-${randomString}`}
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
                              aria-labelledby={`span-${otherColor.id}-${block.id}-${randomString}`}
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
                              aria-labelledby={`span-ui-${otherColor.id}-${block.id}-${randomString}`}
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
