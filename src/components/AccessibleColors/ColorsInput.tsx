import { FC, useState } from 'react'
import { ELanguages, ESubmit } from '../../interfaces'
import styles from './accessibleColors.module.css'
import { Select, SelectOption } from '../Select/Select'
import { EColorFormat, ESelectColorFormat } from '../../interfaces/colors'
import useLocalStorage from '../../hooks/useStorage'

interface Props {
  language: ELanguages
  block: any
  updateColor: (id: number, color: string, format: 'hex' | 'rgb' | 'hsl') => void
  width: string
  hexToRGB: (hex: string) => { r: number; g: number; b: number }
  rgbToHSL: (r: number, g: number, b: number) => { h: number; s: number; l: number }
  fontSize: string
}

const ColorsInput: FC<Props> = ({
  language,
  block,
  updateColor,
  width,
  hexToRGB,
  rgbToHSL,
  fontSize,
}) => {
  const [input, setInput] = useState(
    block.colorFormat === 'hex'
      ? block.color
      : block.colorFormat === 'rgb'
      ? `rgb(${hexToRGB(block.color).r}, ${hexToRGB(block.color).g}, ${
          hexToRGB(block.color).b
        })`
      : `hsl(${
          rgbToHSL(
            hexToRGB(block.color).r,
            hexToRGB(block.color).g,
            hexToRGB(block.color).b
          ).h
        }, ${
          rgbToHSL(
            hexToRGB(block.color).r,
            hexToRGB(block.color).g,
            hexToRGB(block.color).b
          ).s
        }%, ${
          rgbToHSL(
            hexToRGB(block.color).r,
            hexToRGB(block.color).g,
            hexToRGB(block.color).b
          ).l
        }%)`
  )

  const colorFormatOptions: SelectOption[] = [
    { value: 'hex', label: 'Hex' },
    { value: 'rgb', label: 'RGB' },
    { value: 'hsl', label: 'HSL' },
  ]
  const [selected, setSelected] = useLocalStorage<SelectOption | undefined>(
    `Jenniina-color-format-${block.id}`,
    colorFormatOptions[0]
  )

  return (
    <>
      <Select
        hideDelete
        id='color-format-select'
        className={styles['color-format-select']}
        language={language}
        instructions={ESelectColorFormat[language]}
        hide
        options={colorFormatOptions}
        value={selected}
        onChange={(o) => {
          setSelected(o)
          const newFormat = o?.value as 'hex' | 'rgb' | 'hsl'
          let newColor = block.color

          try {
            if (newFormat === 'rgb') {
              const { r, g, b } = hexToRGB(block.color)
              newColor = `rgb(${r}, ${g}, ${b})`
            } else if (newFormat === 'hsl') {
              const { r, g, b } = hexToRGB(block.color)
              const { h, s, l } = rgbToHSL(r, g, b)
              newColor = `hsl(${h}, ${s}%, ${l}%)`
            }
            // If newFormat is 'hex', keep the color as is

            // Update the color with the new format
            updateColor(block.id, newColor, newFormat)
            setInput(newColor)
          } catch (error) {
            console.error(`Error converting color to ${newFormat}:`, error)
          }
        }}
      />

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault()

          if (block.colorFormat === 'hsl') {
            const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/
            const match = input?.match(hslRegex)
            if (match) {
              const h = Number(match[1])
              const s = Number(match[2])
              const l = Number(match[3])
              if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
                updateColor(block.id, input || block.color, block.colorFormat)
              } else {
                console.error('HSL values must be within valid ranges.')
              }
            } else {
              console.error('Invalid HSL format.')
            }
          } else {
            updateColor(block.id, input || block.color, block.colorFormat)
          }
        }}
      >
        <input
          type='text'
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          className={styles['color-input']}
          style={{ maxWidth: `${width}`, fontSize: fontSize }}
        />
        <button
          style={{ maxWidth: `${width}`, fontSize: fontSize }}
          type='submit'
          className={`${styles['color-format-submit']} small gray`}
        >
          {ESubmit[language]}
        </button>
      </form>
    </>
  )
}

export default ColorsInput
