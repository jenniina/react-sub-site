import { useState, useEffect, FC, useRef } from 'react'
import styles from './accessiblecolors.module.css'
import useLocalStorage from '../../hooks/useStorage'
import { ELanguages, ERemove } from '../../interfaces'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { EAddAColor } from '../../interfaces/draganddrop'
import ColorsInput from './ColorsInput'
import {
  EAAACompliantWithID,
  EAACompliantWithID,
  EColorPicker,
  EEditSize,
  ENoCompliantColors,
  ERemoveColorConfirmation,
} from '../../interfaces/colors'
import { useTheme } from '../../hooks/useTheme'

const colorNameToHex = (color: string) => {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) {
    throw new Error('Canvas context not available')
  }
  ctx.fillStyle = color
  return ctx.fillStyle
}

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

const determineAccessibility = (color1: ColorBlock, color2: ColorBlock) => {
  const parseColor = (color: ColorBlock) => {
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

  const rgb1 = parseColor(color1)
  const rgb2 = parseColor(color2)

  const lum1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b)
  const lum2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b)

  const contrastRatio = getContrastRatio(lum1, lum2)

  const isAACompliant = contrastRatio >= 4.5
  const isAAACompliant = contrastRatio >= 7

  return { isAACompliant, isAAACompliant }
}

interface ColorBlock {
  id: number
  color: string
  luminance: number
  status: string
  colorFormat: 'hex' | 'rgb' | 'hsl'
  compliantColorsAA: number[] // IDs of compliant color blocks
  compliantColorsAAA: number[] // IDs of compliant color blocks
}
interface Props {
  language: ELanguages
}

const AccessibleColors: FC<Props> = ({ language }) => {
  const lightTheme = useTheme()
  const [colors, setColors, deleteColors] = useLocalStorage<ColorBlock[]>(
    'Jenniina-colors',
    []
  )
  const [inputs, setInputs] = useState<{ id: number; input: string }[]>(
    colors.map((block) => ({ id: block.id, input: block.color }))
  )
  const [currentColor, setCurrentColor] = useLocalStorage<string>(
    'Jenniina-currentColor',
    '#ffffff'
  )
  const [idCounter, setIdCounter] = useLocalStorage<number>('Jenniina-idCounter', 1)
  const status = 'colors'
  const { isDragging, listItemsByStatus, handleDragging, handleUpdate } = useDragAndDrop(
    colors,
    [status]
  )
  const dragOverItem = useRef<number>(0)
  const [theTarget, setTheTarget] = useState<number>(0)

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
      compliantColorsAA: [],
      compliantColorsAAA: [],
    }

    const compliantAA = colors
      .filter((block) => determineAccessibility(newColorBlock, block).isAACompliant)
      .map((block) => block.id)

    const compliantAAA = colors
      .filter((block) => determineAccessibility(newColorBlock, block).isAAACompliant)
      .map((block) => block.id)

    newColorBlock.compliantColorsAA = compliantAA
    newColorBlock.compliantColorsAAA = compliantAAA

    const updatedColors = colors.map((block) => {
      const accessibility = determineAccessibility(newColorBlock, block)
      return {
        ...block,
        compliantColorsAA: accessibility.isAACompliant
          ? [...new Set([...block.compliantColorsAA, newColorBlock.id])]
          : block.compliantColorsAA,
        compliantColorsAAA: accessibility.isAAACompliant
          ? [...new Set([...block.compliantColorsAAA, newColorBlock.id])]
          : block.compliantColorsAAA,
      }
    })

    setColors([...updatedColors, newColorBlock])
    setIdCounter(idCounter + 1)
  }

  const removeColor = (id: number) => {
    if (window.confirm(ERemoveColorConfirmation[language])) {
      const updatedColors = colors
        .filter((block) => block.id !== id)
        .map((block) => ({
          ...block,
          compliantColorsAA: block.compliantColorsAA.filter(
            (compliantId) => compliantId !== id
          ),
          compliantColorsAAA: block.compliantColorsAAA.filter(
            (compliantId) => compliantId !== id
          ),
        }))
      setColors(updatedColors)
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
          }
        } else {
          const accessibility = determineAccessibility(block, {
            id,
            color: storedColor,
            colorFormat: format,
            luminance: lum,
            status: block.status,
            compliantColorsAA: block.compliantColorsAA,
            compliantColorsAAA: block.compliantColorsAAA,
          })
          return {
            ...block,
            compliantColorsAA: accessibility.isAACompliant
              ? [...new Set([...block.compliantColorsAA, id])]
              : block.compliantColorsAA.filter((cid) => cid !== id),
            compliantColorsAAA: accessibility.isAAACompliant
              ? [...new Set([...block.compliantColorsAAA, id])]
              : block.compliantColorsAAA.filter((cid) => cid !== id),
          }
        }
      }) as ColorBlock[]

      const updatedBlock = updatedColors.find((block) => block.id === id)
      if (updatedBlock) {
        updatedBlock.compliantColorsAA = updatedColors
          .filter(
            (block) =>
              block.id !== id && determineAccessibility(updatedBlock, block).isAACompliant
          )
          .map((block) => block.id)

        updatedBlock.compliantColorsAAA = updatedColors
          .filter(
            (block) =>
              block.id !== id &&
              determineAccessibility(updatedBlock, block).isAAACompliant
          )
          .map((block) => block.id)
      }

      setColors([...updatedColors])
    } catch (error) {
      console.error('Error updating color:', error)
    }
  }

  //   useEffect(() => {
  //     const updatedColors = colors.map((block) => {
  //       if (block.colorFormat === 'hex') {
  //         const { r, g, b } = hexToRGB(block.color)
  //         const { h, s, l } = rgbToHSL(r, g, b)
  //         return {
  //           ...block,
  //           color: `hsl(${h}, ${s}%, ${l}%)`,
  //           colorFormat: 'hsl',
  //         }
  //       }
  //       return block
  //     }) as ColorBlock[]
  //     setColors(updatedColors)
  //   }, [])

  const baseWidth = 8
  const [widthNumber, setWidth] = useLocalStorage('Jenniina-color-block-width', baseWidth)
  const width = `${widthNumber}em`

  const fontSizeMultiplier = widthNumber / baseWidth

  const dynamicFontSize = {
    tooltip: `${0.75 * fontSizeMultiplier}em`,
    colorName: `${0.7 * fontSizeMultiplier}em`,
    input: `${0.8 * fontSizeMultiplier}em`,
  }

  // TODO:
  // Give screenshot ability
  // Give print ability
  // Give export ability

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

  //   useEffect(() => {
  //     deleteColors()
  //     setColors([])
  //     setIdCounter(1)
  //   }, [])

  useEffect(() => {
    // console.log(colors)
    if (colors.length < 1) {
      setIdCounter(1)
    }
  }, [colors])

  return (
    <div
      id={styles['color-container']}
      className={`${styles['color-container']} ${lightTheme ? styles.light : ''}`}
      style={{ ['--font-size' as string]: dynamicFontSize.input }}
    >
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
        <button className='gray' type='button' onClick={addColor}>
          {EAddAColor[language]}
        </button>
      </div>

      {colors?.length > 0 && (
        <div className={styles['width-wrap']}>
          <label htmlFor='color-block-width'>{EEditSize[language]}</label>
          <input
            id='color-block-width'
            type='range'
            min={5.5}
            max={12}
            step={0.5}
            value={widthNumber}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </div>
      )}
      <div id='color-blocks' className={styles['color-blocks']}>
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
                        if (block.compliantColorsAAA.includes(otherColor.id)) {
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
                                  fontSize: `clamp(0.75rem, ${dynamicFontSize.input}, 1rem)`,
                                }}
                              >{`${EAAACompliantWithID[language]}: ${otherColor.id}`}</span>
                            </div>
                          )
                        } else if (block.compliantColorsAA.includes(otherColor.id)) {
                          return (
                            <div
                              key={`aa-${otherColor.color}-${otherColor.id}`}
                              tabIndex={0}
                              className={`${styles['indicator-aa']} ${styles.indicator} tooltip-wrap`}
                              style={{
                                ['--color' as string]: otherColor.color,
                                backgroundColor: otherColor.color,
                                ['--left' as string]: `calc(calc(${width} / 5) * -2)`,
                                width: `calc(${width} / 5)`,
                                height: `calc(${width} / 5)`,
                                margin: `calc(${width} / 15)`,
                              }}
                              aria-labelledby={`span-${otherColor.id}-${block.id}`}
                            >
                              <span
                                id={`span-${otherColor.id}-${block.id}`}
                                className='tooltip below narrow3'
                                style={{
                                  fontSize: `clamp(0.75rem, ${dynamicFontSize.input}, 1rem)`,
                                }}
                              >{`${EAACompliantWithID[language]}: ${otherColor.id}`}</span>
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
                      fontSize: `clamp(0.75rem, ${dynamicFontSize.input}, 0.9rem)`,
                      textAlign: 'center',
                    }}
                  >
                    {formatColor(block.color, block.colorFormat)}
                  </span>
                </div>
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
                  className='tooltip-wrap small delete danger gray'
                  onClick={() => removeColor(block.id)}
                  style={{
                    margin: '0.8em 0',
                    width: `clamp(3em, ${width}, 8em)`,
                    fontSize: `clamp(0.75rem, ${dynamicFontSize.input}, 2rem)`,
                  }}
                >
                  {ERemove[language]}
                </button>
                <div
                  aria-hidden='true'
                  className={styles['compliance-info']}
                  style={{
                    maxWidth: `clamp(5em,max-content, ${width})`,
                    margin: ' 0 0 0.8em',
                    padding: '0.8em 0',
                    textAlign: 'left',
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    gap: '0.5em',
                    fontSize: `clamp(0.75rem, ${dynamicFontSize.input}, 1rem)`,
                  }}
                >
                  <div>
                    <strong>AA:</strong>{' '}
                    {block.compliantColorsAA.length > 0
                      ? `${block.compliantColorsAA.join(', ')}`
                      : ENoCompliantColors[language]}
                  </div>
                  <div>
                    <strong>AAA:</strong>{' '}
                    {block.compliantColorsAAA.length > 0
                      ? `${block.compliantColorsAAA.join(', ')}`
                      : ENoCompliantColors[language]}
                  </div>
                </div>
              </li>
            </ul>
          )
        })}
      </div>
    </div>
  )
}

export default AccessibleColors
