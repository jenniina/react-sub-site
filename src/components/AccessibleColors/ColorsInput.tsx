import { FC, useEffect, useState } from 'react'
import { ELanguages, ESubmit } from '../../interfaces'
import styles from './accessibleColors.module.css'
import { Select, SelectOption } from '../Select/Select'
import { EColorFormat, ESelectColorFormat } from '../../interfaces/colors'
import useLocalStorage from '../../hooks/useStorage'

interface Props {
  language: ELanguages
  block: any
  updateColor: (id: number, color: string, format: 'hsl' | 'hex' | 'rgb') => void
  width: string
  fontSize: string
  hslToRGB: (h: number, s: number, l: number) => { r: number; g: number; b: number }
  rgbToHSL: (r: number, g: number, b: number) => { h: number; s: number; l: number }
  hexToRGB: (hex: string) => { r: number; g: number; b: number }
  rgbToHex: (r: number, g: number, b: number) => string
}

const ColorsInput: FC<Props> = ({
  language,
  block,
  fontSize,
  updateColor,
  width,
  hexToRGB,
  hslToRGB,
  rgbToHex,
  rgbToHSL,
}) => {
  const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
  const hexRegex = /^#([0-9A-F]{3}){1,2}$/i

  const [input, setInput] = useState(block.color)

  const colorFormatOptions: SelectOption[] = [
    { value: 'hsl', label: 'HSL' },
    { value: 'rgb', label: 'RGB' },
    { value: 'hex', label: 'Hex' },
  ]
  const [selected, setSelected, deleteSelected] = useLocalStorage<
    SelectOption | undefined
  >(
    `Jenniina-color-format-${block.id}`,
    colorFormatOptions.find((option) => option.value === block.colorFormat) ||
      colorFormatOptions[0]
  )

  const extractHSL = (hslString: string): [number, number, number] => {
    const match = hslString.match(hslRegex)
    if (!match) {
      throw new Error('Invalid HSL format')
    }
    const h = Number(match[1])
    const s = Number(match[2])
    const l = Number(match[3])
    return [h, s, l]
  }

  const getRGBValues = (): { r: number; g: number; b: number } => {
    if (block.colorFormat === 'hsl') {
      const hslMatch = block.color.match(
        /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
      )
      if (hslMatch) {
        const h = Number(hslMatch[1])
        const s = Number(hslMatch[2])
        const l = Number(hslMatch[3])
        return hslToRGB(h, s, l)
      }
    } else if (block.colorFormat === 'rgb') {
      const rgbMatch = block.color.match(
        /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
      )
      if (rgbMatch) {
        return {
          r: Number(rgbMatch[1]),
          g: Number(rgbMatch[2]),
          b: Number(rgbMatch[3]),
        }
      }
    } else if (block.colorFormat === 'hex') {
      return hexToRGB(block.color)
    }
    throw new Error('Unsupported color format')
  }

  const getDisplayColor = (format: 'hsl' | 'rgb' | 'hex'): string => {
    if (format === block.colorFormat) {
      return block.color
    }

    const { r, g, b } = getRGBValues()

    if (format === 'hsl') {
      const { h, s, l } = rgbToHSL(r, g, b)
      return `hsl(${h}, ${s}%, ${l}%)`
    } else if (format === 'rgb') {
      return `rgb(${r}, ${g}, ${b})`
    } else if (format === 'hex') {
      return rgbToHex(r, g, b).toUpperCase()
    }
    return block.color
  }

  useEffect(() => {
    if (selected) {
      try {
        const displayColor = getDisplayColor(selected.value as 'hsl' | 'rgb' | 'hex')
        setInput(displayColor)
      } catch (error) {
        console.error(`Error converting color to ${selected.value}:`, error)
        setInput(block.color)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, block.color])

  //   useEffect(() => {
  //     deleteSelected()
  //     setSelected(colorFormatOptions[0])
  //   }, [])

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
          const newFormat = o?.value as 'hsl' | 'hex' | 'rgb'
          try {
            const displayColor = getDisplayColor(newFormat)
            setInput(displayColor)
          } catch (error) {
            console.error(`Error converting color to ${newFormat}:`, error)
            setInput(block.color)
          }
        }}
      />

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault()

          const format = selected?.value as 'hsl' | 'rgb' | 'hex'

          try {
            let formattedColor: string

            if (format === 'hsl') {
              const hslRegex =
                /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
              const match = input.match(hslRegex)
              if (match) {
                const h = Number(match[1])
                const s = Number(match[2])
                const l = Number(match[3])
                if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
                  formattedColor = `hsl(${h}, ${s}%, ${l}%)`
                  updateColor(block.id, formattedColor, 'hsl')
                } else {
                  throw new Error('HSL values must be within valid ranges.')
                }
              } else {
                throw new Error('Invalid HSL format.')
              }
            } else if (format === 'rgb') {
              const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
              const match = input.match(rgbRegex)
              if (match) {
                const r = Number(match[1])
                const g = Number(match[2])
                const b = Number(match[3])
                if ([r, g, b].every((v) => v >= 0 && v <= 255)) {
                  formattedColor = `rgb(${r}, ${g}, ${b})`
                  updateColor(block.id, formattedColor, 'rgb')
                } else {
                  throw new Error('RGB values must be within valid ranges.')
                }
              } else {
                throw new Error('Invalid RGB format.')
              }
            } else if (format === 'hex') {
              const hexRegex = /^#([0-9A-F]{3}){1,2}$/i
              if (hexRegex.test(input)) {
                formattedColor = input.toUpperCase()
                updateColor(block.id, formattedColor, 'hex')
              } else {
                throw new Error('Invalid Hex format.')
              }
            } else {
              throw new Error('Unsupported color format.')
            }
          } catch (error: any) {
            console.error(error.message)
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
