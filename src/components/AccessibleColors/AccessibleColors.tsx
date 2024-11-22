import { useState, useEffect, FC, useRef } from 'react'
import { Select, SelectOption } from '../Select/Select'
import styles from './accessiblecolors.module.css'
import useLocalStorage from '../../hooks/useStorage'
import { ELanguages, ERemove } from '../../interfaces'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { EAddAColor } from '../../interfaces/draganddrop'

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
  luminance: string
  status: string
  compliantColorsAA: number[] // IDs of compliant color blocks
  compliantColorsAAA: number[] // IDs of compliant color blocks
}
interface Props {
  language: ELanguages
}

const AccessibleColors: FC<Props> = ({ language }) => {
  const [colors, setColors] = useLocalStorage<ColorBlock[]>('Jenniina-colors', [])
  const [currentColor, setCurrentColor] = useState<string>('#ffffff')
  const [idCounter, setIdCounter] = useLocalStorage<number>('Jenniina-idCounter', 1)

  const addColor = () => {
    const lum = determineAccessibility(currentColor, '#ffffff').isAACompliant
      ? 'dark'
      : 'light'

    const newColorBlock: ColorBlock = {
      id: idCounter,
      color: currentColor,
      luminance: lum,
      status: status,
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
  const width = '5.5em'

  // TODO:
  // Make the blocks draggable
  // Make the blocks color editable
  // Make the blocks resizable
  // Rename id to something more descriptive
  // Give screenshot ability
  // Give print ability
  // Give export ability

  const status = 'colors'
  const { isDragging, listItemsByStatus, handleDragging, handleUpdate } = useDragAndDrop(
    colors,
    [status]
  )

  const dragOverItem = useRef<number>(0)
  const [theTarget, setTheTarget] = useState<number>(0)

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

  return (
    <div className={`${styles['color-container']}`}>
      <div className={styles['color-picker']}>
        <input
          type='color'
          value={currentColor}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
        <button onClick={addColor}>{EAddAColor[language]}</button>
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
                draggable={'true'}
                onDragStart={(e) => handleDragStart(e, block.id)}
                onDragEnter={(e) => handleDragEnter(e, block.id)}
                onDragOver={(e) => handleDragOver(e)}
                onDragEnd={() => handleDragging(false)}
                title={`ID: ${block.id}`}
                style={{ width: `${width}`, maxWidth: `${width}` }}
                data-identity={block.id}
              >
                <div
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
                            key={`self-${otherColor.color}-${otherColor.id}`}
                            className={`${styles['indicator-null']} ${styles.indicator}`}
                            title={`No compliant colors`}
                            style={{
                              ['--color' as string]: otherColor.color,
                              ['--width' as string]: `calc(${width} / 3)`,
                              ['--left' as string]: `calc(calc(${width} / 3) * -1)`,
                              backgroundColor: 'transparent',
                              width: `calc(${width} / 3)`,
                              height: `calc(${width} / 3)`,
                            }}
                            aria-label={`No compliant colors`}
                          ></div>
                        )
                      }
                      if (block.compliantColorsAAA.includes(otherColor.id)) {
                        return (
                          <div
                            key={`aaa-${otherColor.color}-${otherColor.id}`}
                            className={`${styles['indicator-aaa']} ${styles.indicator}`}
                            title={`AAA Compliant with ID: ${otherColor.id}`}
                            style={{
                              ['--color' as string]: otherColor.color,
                              backgroundColor: otherColor.color,
                              ['--left' as string]: `calc(calc(${width} / 3) * -1)`,
                              width: `calc(${width} / 3)`,
                              height: `calc(${width} / 3)`,
                            }}
                            aria-label={`AAA compliant with color ID ${otherColor.id}`}
                          ></div>
                        )
                      } else if (block.compliantColorsAA.includes(otherColor.id)) {
                        return (
                          <div
                            key={`aa-${otherColor.color}-${otherColor.id}`}
                            className={`${styles['indicator-aa']} ${styles.indicator}`}
                            title={`AA Compliant with ID: ${otherColor.id}`}
                            style={{
                              ['--color' as string]: otherColor.color,
                              backgroundColor: otherColor.color,
                              ['--left' as string]: `calc(calc(${width} / 5) * -2)`,
                              width: `calc(${width} / 5)`,
                              height: `calc(${width} / 5)`,
                              margin: `calc(${width} / 15)`,
                            }}
                            aria-label={`AA compliant with color ID ${otherColor.id}`}
                          ></div>
                        )
                      }
                      return (
                        <div
                          key={`null-${otherColor.color}-${otherColor.id}`}
                          className={`${styles['indicator-null']} ${styles.indicator}`}
                          title={`No compliant colors`}
                          style={{
                            ['--color' as string]: otherColor.color,
                            backgroundColor: 'transparent',
                            ['--left' as string]: `calc(calc(${width} / 3) * -1)`,
                            width: `calc(${width} / 3)`,
                            height: `calc(${width} / 3)`,
                          }}
                          aria-label={`No compliant colors`}
                        ></div>
                      )
                    })}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: block.color,
                    width: `${width}`,
                    maxWidth: `${width}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.5em',
                  }}
                  className={styles['color-name']}
                >
                  <span
                    style={{
                      color: block.luminance === 'dark' ? 'white' : 'black',
                      display: 'inline-block',
                    }}
                  >
                    {block.color}
                  </span>
                </div>
                <button
                  className='tooltip-wrap small danger'
                  onClick={() => removeColor(block.id)}
                  style={{ margin: '0.8em 0' }}
                >
                  <span aria-hidden='true'>&times;</span>
                  <span className='tooltip above narrow2'>{ERemove[language]}</span>
                </button>
                <div
                  className={styles['compliance-info']}
                  style={{
                    maxWidth: `${width}`,
                    minWidth: '100%',
                    margin: ' 0 0 0.8em',
                    padding: '0.8em 0',
                  }}
                >
                  <div>
                    <strong>AA:</strong>{' '}
                    {block.compliantColorsAA.length > 0
                      ? `IDs: ${block.compliantColorsAA.join(', ')}`
                      : 'No compliant colors'}
                  </div>
                  <div>
                    <strong>AAA:</strong>{' '}
                    {block.compliantColorsAAA.length > 0
                      ? `IDs: ${block.compliantColorsAAA.join(', ')}`
                      : 'No compliant colors'}
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
