import { useState, useEffect, FC, useRef } from 'react'
import styles from './accessiblecolors.module.css'
import { notify } from '../../reducers/notificationReducer'
import useLocalStorage from '../../hooks/useStorage'
import {
  EDarkMode,
  EDeleted,
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
  EAACompliantWithID,
  EAAGraphicElementCompliantWithID,
  EColorPicker,
  EEditSize,
  EHideColorName,
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

const hexToRGB = (hex: string) => {
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

const rgbToHSL = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
      default:
        break
    }
    h /= 6
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

const hslToRGB = (h: number, s: number, l: number) => {
  h /= 360
  s /= 100
  l /= 100

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
}

const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100
  l /= 100

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    const hk = h / 360
    r = hue2rgb(p, q, hk + 1 / 3)
    g = hue2rgb(p, q, hk)
    b = hue2rgb(p, q, hk - 1 / 3)
  }

  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255))
}

const calculateLuminance = (r: number, g: number, b: number): number => {
  const [R, G, B] = [r, g, b].map((v) => {
    const normalized = v / 255
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4)
  })
  return R * 0.2126 + G * 0.7152 + B * 0.0722
}

const getContrastRatio = (lum1: number, lum2: number) => {
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

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

  const [colors, setColors, deleteColors] = useLocalStorage<ColorBlock[]>(
    'Jenniina-colors',
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
    'AA_RegularText' | 'AA_UIComponents' | 'AAA_RegularText',
    ComplianceShapeFunction
  > = {
    AA_RegularText: ({
      xPosition,
      yIndicator,
      blockWidth,
      indicatorSize,
      squareSize,
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
  r="${indicatorSize * 0.35}"
  fill="${convertedBlockColor}"
  stroke="${convertedOtherColor}"
  stroke-width="5"
/>
`
    },
    AA_UIComponents: ({
      xPosition,
      yIndicator,
      blockWidth,
      indicatorSize,
      squareSize,
      otherColor,
      blockColor,
      colorFormatBlock,
      colorFormatOther,
    }) => {
      const convertedBlockColor = parseColor(blockColor, colorFormatBlock)
      const convertedOtherColor = parseColor(otherColor, colorFormatOther)

      return `
    <rect
  x="${xPosition + blockWidth / 2 - squareSize * 0.35}"
  y="${yIndicator + indicatorSize / 2 - squareSize * 0.35}"
  width="${squareSize * 0.7}"
  height="${squareSize * 0.7}"
  fill="${convertedBlockColor}"
  stroke="${convertedOtherColor}"
  stroke-width="4"
/>
`
    },
    AAA_RegularText: ({
      xPosition,
      yIndicator,
      blockWidth,
      indicatorSize,
      squareSize,
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
    const squareSize = indicatorSize * 0.5
    const indicatorSpacing = indicatorSize / 1.5
    const padding = width / 4
    const lineHeight = indicatorSize / 20
    const fontSize = blockWidth / 10

    const totalIndicators = colors.length
    const blockHeight =
      totalIndicators * (indicatorSize + indicatorSpacing) -
      indicatorSpacing +
      padding * 2
    const textBlockHeight = showColorName ? fontSize + padding : 0

    const svgWidth = colors.length * blockWidth
    const svgHeight = blockHeight + textBlockHeight

    const blocksGroup = colors
      .map((block, index) => {
        const xPosition = index * blockWidth

        // Convert block color
        let convertedBlockColor: string
        try {
          convertedBlockColor = parseColor(block.color, block.colorFormat)
        } catch (error) {
          console.error(error)
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

    const linesGroup = colors
      .map((colorItem, idx) => {
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

    const indicatorsGroup = colors
      .map((block, index) => {
        const xPosition = index * blockWidth

        // Determine highest compliance level for each color
        const highestCompliance = (
          otherId: number
        ): keyof typeof ComplianceShapes | null => {
          if (block.compliantColors?.AAA_RegularText?.includes(otherId))
            return 'AAA_RegularText'
          if (block.compliantColors?.AA_RegularText?.includes(otherId))
            return 'AA_RegularText'
          if (block.compliantColors?.AA_UIComponents?.includes(otherId))
            return 'AA_UIComponents'

          return null
        }

        const indicators = colors
          .filter((other) => other.id !== block.id)
          .map((other) => {
            const complianceLevel = highestCompliance(other.id)
            if (!complianceLevel) return ''

            return ComplianceShapes[complianceLevel]({
              xPosition,
              yIndicator: padding + (other.id - 1) * (indicatorSize + indicatorSpacing),
              blockWidth,
              indicatorSize,
              squareSize,
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
    squareSize: number
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
      // Optional: dispatch an error notification
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
    colors.forEach((block) => {
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
    const updatedColors = colors.map((block) => ({
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
      const updatedColors = colors
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

      const updatedColors = colors.map((block) => {
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

  const formatColor = (color: string, format: 'hex' | 'rgb' | 'hsl') => {
    const hslRegex = /^hsl\(\s*(\d+),\s*(\d+)%,\s*(\d+)%\)$/
    const match = color.match(hslRegex)
    if (!match) return color

    const h = Number(match[1])
    const s = Number(match[2])
    const l = Number(match[3])

    if (format === 'hsl') {
      return color
    } else if (format === 'rgb') {
      const { r, g, b } = hslToRGB(h, s, l)
      return `rgb(${r}, ${g}, ${b})`
    } else if (format === 'hex') {
      const { r, g, b } = hslToRGB(h, s, l)
      const hex = rgbToHex(r, g, b)
      return hex.toUpperCase()
    }
    return color
  }

  useEffect(() => {
    if (colors.length < 1) {
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
      {' '}
      <div className={styles['btn-wrap']}>
        {colors?.length > 0 && (
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
                        let complianceLevel: keyof ComplianceResult | null = null
                        if (
                          block.compliantColors?.AAA_RegularText?.includes(otherColor.id)
                        ) {
                          complianceLevel = 'AAA_RegularText' as keyof ComplianceResult
                        } else if (
                          block.compliantColors?.AA_RegularText?.includes(otherColor.id)
                        ) {
                          complianceLevel = 'AA_RegularText' as keyof ComplianceResult
                        } else if (
                          block.compliantColors?.AA_UIComponents?.includes(otherColor.id)
                        ) {
                          complianceLevel = 'AA_UIComponents' as keyof ComplianceResult
                        }

                        if (
                          complianceLevel ===
                          ('AAA_RegularText' as keyof ComplianceResult)
                        ) {
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
                              aria-labelledby={`span-${otherColor.id}-${block.id}`}
                            >
                              <span
                                id={`span-${otherColor.id}-${block.id}`}
                                className={`tooltip below narrow3 ${styles['tooltip']}`}
                                style={{
                                  fontSize: `clamp(0.7rem, ${dynamicFontSize.input}, 1rem)`,
                                }}
                              >{`${EAAACompliantWithID[language]}: ${otherColor.id}`}</span>
                            </div>
                          )
                        } else if (
                          complianceLevel === ('AA_RegularText' as keyof ComplianceResult)
                        ) {
                          return (
                            <div
                              key={`aa-${otherColor.color}-${otherColor.id}`}
                              tabIndex={0}
                              className={`${styles['indicator-aa']} ${styles.indicator} tooltip-wrap`}
                              style={{
                                ['--color' as string]: otherColor.color,
                                backgroundColor: block.color,
                                outline: `calc(${width} * ${times * 1.2}) solid ${
                                  otherColor.color
                                }`,
                                outlineOffset: `0`,
                                ['--left' as string]: `calc(calc(${width} / 5) * -2)`,
                                width: `calc(${width} / 5)`,
                                height: `calc(${width} / 5)`,
                                margin: `calc(${width} / 15)`,
                                borderRadius: '50%',
                              }}
                              aria-labelledby={`span-${otherColor.id}-${block.id}`}
                            >
                              <span
                                id={`span-${otherColor.id}-${block.id}`}
                                className='tooltip below narrow3'
                                style={{
                                  fontSize: `clamp(0.7rem, ${dynamicFontSize.input}, 1rem)`,
                                }}
                              >{`${EAACompliantWithID[language]}: ${otherColor.id}`}</span>
                            </div>
                          )
                        } else if (
                          complianceLevel ===
                          ('AA_UIComponents' as keyof ComplianceResult)
                        ) {
                          return (
                            <div
                              key={`aa-ui-${otherColor.color}-${otherColor.id}`}
                              tabIndex={0}
                              className={`${styles['indicator-aa-ui']} ${styles.indicator} tooltip-wrap`}
                              style={{
                                ['--color' as string]: otherColor.color,
                                ['--left' as string]: `calc(calc(${width} / 6) * -2.5)`,
                                backgroundColor: block.color,
                                outline: `calc(${width} * ${times}) solid ${otherColor.color}`,
                                outlineOffset: `calc(${width} * ${times} * -1)`,
                                width: `calc(${width} / 6)`,
                                height: `calc(${width} / 6)`,
                                margin: `calc(${width} / 12)`,
                              }}
                              aria-labelledby={`span-ui-${otherColor.id}-${block.id}`}
                            >
                              <span
                                id={`span-ui-${otherColor.id}-${block.id}`}
                                className={`tooltip below narrow3 ${styles['tooltip']}`}
                                style={{
                                  fontSize: `clamp(0.7rem, ${dynamicFontSize.input}, 1rem)`,
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
                        fontSize: `clamp(0.7rem, ${dynamicFontSize.input}, 0.9rem)`,
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
                    <div
                      aria-hidden='true'
                      className={styles['compliance-info']}
                      style={{
                        width: `calc(100% - 8px)`,
                        margin: ' 0 0.1em 0.5em',
                        textAlign: 'left',
                        display: 'flex',
                        flexFlow: 'column nowrap',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        gap: '0.5em',
                        fontSize: `clamp(0.75rem, ${dynamicFontSize.input}, 1rem)`,
                      }}
                    ></div>
                  </>
                )}
              </li>
            </ul>
          )
        })}
      </div>
      {colors?.length > 0 && (
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
