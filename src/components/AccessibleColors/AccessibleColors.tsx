import { useState, useEffect, FC, useRef } from 'react'
import styles from './accessiblecolors.module.css'
import useLocalStorage from '../../hooks/useStorage'
import { ELanguages, ERemove, ESubmit } from '../../interfaces'
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

const calculateLuminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

const getContrastRatio = (lum1: number, lum2: number) => {
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

const determineAccessibility = (color1: string, color2: string) => {
  const hex1 = color1.startsWith('#') ? color1 : colorNameToHex(color1)
  const hex2 = color2.startsWith('#') ? color2 : colorNameToHex(color2)

  const { r: r1, g: g1, b: b1 } = hexToRGB(hex1)
  const { r: r2, g: g2, b: b2 } = hexToRGB(hex2)

  const lum1 = calculateLuminance(r1, g1, b1)
  const lum2 = calculateLuminance(r2, g2, b2)

  const contrastRatio = getContrastRatio(lum1, lum2)

  // WCAG AA requires a contrast ratio of at least 4.5:1 for normal text
  const isAACompliant = contrastRatio >= 4.5
  // WCAG AAA requires a contrast ratio of at least 7:1 for normal text
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
  const [colors, setColors] = useLocalStorage<ColorBlock[]>('Jenniina-colors', [])
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
    const lum = calculateLuminance(r, g, b)

    const newColorBlock: ColorBlock = {
      id: idCounter,
      color: currentColor,
      luminance: lum,
      status: status,
      colorFormat: 'hex',
      compliantColorsAA: [],
      compliantColorsAAA: [],
    }

    // Determine AA and AAA compliance with existing colors
    const compliantAA = colors
      .filter(
        (block) => determineAccessibility(newColorBlock.color, block.color).isAACompliant
      )
      .map((block) => block.id)

    const compliantAAA = colors
      .filter(
        (block) => determineAccessibility(newColorBlock.color, block.color).isAAACompliant
      )
      .map((block) => block.id)

    newColorBlock.compliantColorsAA = compliantAA
    newColorBlock.compliantColorsAAA = compliantAAA

    // Update existing colors' compliantColorsAA and compliantColorsAAA
    const updatedColors = colors.map((block) => {
      const accessibility = determineAccessibility(newColorBlock.color, block.color)
      return {
        ...block,
        compliantColorsAA: accessibility.isAACompliant
          ? [...block.compliantColorsAA, newColorBlock.id]
          : block.compliantColorsAA,
        compliantColorsAAA: accessibility.isAAACompliant
          ? [...block.compliantColorsAAA, newColorBlock.id]
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
    let hexColor = newColor
    try {
      if (format === 'rgb') {
        const rgb = newColor.match(
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
        )
        if (!rgb) throw new Error('Invalid RGB format')
        const r = Number(rgb[1])
        const g = Number(rgb[2])
        const b = Number(rgb[3])
        if ([r, g, b].some((v) => v < 0 || v > 255))
          throw new Error('RGB values must be between 0 and 255')
        hexColor = rgbToHex(r, g, b)
      } else if (format === 'hsl') {
        const hsl = newColor.match(
          /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/
        )
        if (!hsl) throw new Error('Invalid HSL format')
        const h = Number(hsl[1])
        const s = Number(hsl[2])
        const l = Number(hsl[3])
        if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100)
          throw new Error('HSL values out of range')
        const { r, g, b } = hslToRGB(h, s, l)
        hexColor = rgbToHex(r, g, b)
      } else if (format === 'hex') {
        if (!/^#([0-9A-F]{3}){1,2}$/i.test(newColor))
          throw new Error('Invalid Hex format')
        hexColor = newColor.toUpperCase()
      }
    } catch (error) {
      console.error(`Error updating color:`, error)
      return
    }

    const { r, g, b } = hexToRGB(hexColor)
    const lum = calculateLuminance(r, g, b)

    const updatedColors = colors.map((block) => {
      if (block.id === id) {
        // Update the specific block
        return {
          ...block,
          color: hexColor,
          colorFormat: format,
          luminance: lum,
        }
      } else {
        // Recalculate compliance
        const accessibility = determineAccessibility(block.color, hexColor)
        return {
          ...block,
          compliantColorsAA: accessibility.isAACompliant
            ? block.compliantColorsAA.includes(id)
              ? block.compliantColorsAA
              : [...block.compliantColorsAA, id]
            : block.compliantColorsAA.filter((cid) => cid !== id),
          compliantColorsAAA: accessibility.isAAACompliant
            ? block.compliantColorsAAA.includes(id)
              ? block.compliantColorsAAA
              : [...block.compliantColorsAAA, id]
            : block.compliantColorsAAA.filter((cid) => cid !== id),
        }
      }
    }) as ColorBlock[]

    // Recalculate compliances for the updated block
    const updatedBlock = updatedColors.find((block) => block.id === id)
    if (updatedBlock) {
      updatedBlock.compliantColorsAA = updatedColors
        .filter(
          (block) =>
            block.id !== id &&
            determineAccessibility(updatedBlock.color, block.color).isAACompliant
        )
        .map((block) => block.id)

      updatedBlock.compliantColorsAAA = updatedColors
        .filter(
          (block) =>
            block.id !== id &&
            determineAccessibility(updatedBlock.color, block.color).isAAACompliant
        )
        .map((block) => block.id)
    }

    setColors([...updatedColors])
  }

  const baseWidth = 5.5
  const [widthNumber, setWidth] = useLocalStorage('Jenniina-color-block-width', baseWidth)
  const width = `${widthNumber}em`

  const fontSizeMultiplier = widthNumber / baseWidth

  const dynamicFontSize = {
    tooltip: `${0.75 * fontSizeMultiplier}em`,
    colorName: `${0.8 * fontSizeMultiplier}em`,
    input: `${0.8 * fontSizeMultiplier}em`,
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
                                style={{ fontSize: '0.75em' }}
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
                                style={{ fontSize: '0.75em' }}
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
                    padding: '1em 0.5em 0.5em',
                  }}
                  className={styles['color-name']}
                >
                  <span
                    style={{
                      color: block.luminance < 0.5 ? 'white' : 'black',
                      display: 'inline-block',
                      fontSize: `clamp(0.75rem, ${dynamicFontSize.colorName}, 2rem)`,
                    }}
                  >
                    {block.color}
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
                    fontSize={`clamp(0.75rem, ${dynamicFontSize.input}, 1.8rem)`}
                  />
                </div>
                <button
                  aria-labelledby={`span-${block.id}`}
                  className='tooltip-wrap small danger gray'
                  onClick={() => removeColor(block.id)}
                  style={{
                    margin: '0.8em 0',
                    fontSize: `clamp(0.75rem, ${dynamicFontSize.input}, 2rem)`,
                  }}
                >
                  <span aria-hidden='true'>&times;</span>
                  <span id={`span-${block.id}`} className='tooltip above narrow2'>
                    {ERemove[language]}
                  </span>
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
                    fontSize: `clamp(0.75rem, ${dynamicFontSize.input}, 2rem)`,
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
