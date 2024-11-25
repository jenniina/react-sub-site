import { FC, useEffect, useState } from 'react'
import { ELanguages, ESubmit } from '../../interfaces'
import styles from './accessiblecolors.module.css'
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

  const colorFormatOptions: SelectOption[] = [
    { value: 'hsl', label: 'HSL' },
    { value: 'rgb', label: 'RGB' },
    { value: 'hex', label: 'Hex' },
  ]
  const [selected, setSelected] = useState<SelectOption | undefined>(
    colorFormatOptions.find((option) => option.value === block.colorFormat) ||
      colorFormatOptions[0]
  )

  const [hex, setHex] = useState<string>('')
  const [r, setR] = useState<number>(0)
  const [g, setG] = useState<number>(0)
  const [b, setB] = useState<number>(0)
  const [h, setH] = useState<number>(0)
  const [s, setS] = useState<number>(0)
  const [l, setL] = useState<number>(0)

  useEffect(() => {
    switch (block.colorFormat) {
      case 'hex': {
        setHex(block.color)
        const { r, g, b } = hexToRGB(block.color)
        setR(r)
        setG(g)
        setB(b)
        const { h, s, l } = rgbToHSL(r, g, b)
        setH(h)
        setS(s)
        setL(l)
        break
      }
      case 'rgb': {
        const rgbMatch = block.color.match(rgbRegex)
        if (rgbMatch) {
          const rVal = Number(rgbMatch[1])
          const gVal = Number(rgbMatch[2])
          const bVal = Number(rgbMatch[3])
          setR(rVal)
          setG(gVal)
          setB(bVal)
          const { h, s, l } = rgbToHSL(rVal, gVal, bVal)
          setH(h)
          setS(s)
          setL(l)
        }
        break
      }
      case 'hsl': {
        const hslMatch = block.color.match(hslRegex)
        if (hslMatch) {
          const hVal = Number(hslMatch[1])
          const sVal = Number(hslMatch[2])
          const lVal = Number(hslMatch[3])
          setH(hVal)
          setS(sVal)
          setL(lVal)
          const { r, g, b } = hslToRGB(hVal, sVal, lVal)
          setR(r)
          setG(g)
          setB(b)
          const hexVal = rgbToHex(r, g, b)
          setHex(hexVal)
        }
        break
      }
      default:
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //   useEffect(() => {
  //     deleteSelected()
  //     setSelected(colorFormatOptions[0])
  //   }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const format = selected?.value as 'hex' | 'rgb' | 'hsl'

    try {
      let formattedColor: string

      if (format === 'hex') {
        if (hexRegex.test(hex)) {
          formattedColor = hex.toUpperCase()
          updateColor(block.id, formattedColor, 'hex')
        } else {
          throw new Error('Invalid Hex format.')
        }
      } else if (format === 'rgb') {
        if ([r, g, b].every((v) => v >= 0 && v <= 255)) {
          formattedColor = `rgb(${r}, ${g}, ${b})`
          updateColor(block.id, formattedColor, 'rgb')
        } else {
          throw new Error('RGB values must be within valid ranges.')
        }
      } else if (format === 'hsl') {
        if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
          formattedColor = `hsl(${h}, ${s}%, ${l}%)`
          updateColor(block.id, formattedColor, 'hsl')
        } else {
          throw new Error('HSL values must be within valid ranges.')
        }
      } else {
        throw new Error('Unsupported color format.')
      }
    } catch (error: any) {
      console.error(error.message)
    }
  }

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
          // const newFormat = o?.value as 'hsl' | 'hex' | 'rgb'
          // try {
          //   const displayColor = getDisplayColor(newFormat)
          //   setInput(displayColor)
          // } catch (error) {
          //   console.error(`Error converting color to ${newFormat}:`, error)
          //   setInput(block.color)
          // }
        }}
      />

      <form
        className={styles.form}
        onSubmit={
          handleSubmit
          // e.preventDefault()

          // const format = selected?.value as 'hsl' | 'rgb' | 'hex'

          // try {
          //   let formattedColor: string

          //   if (format === 'hsl') {
          //     const hslRegex =
          //       /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i
          //     const match = input.match(hslRegex)
          //     if (match) {
          //       const h = Number(match[1])
          //       const s = Number(match[2])
          //       const l = Number(match[3])
          //       if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
          //         formattedColor = `hsl(${h}, ${s}%, ${l}%)`
          //         updateColor(block.id, formattedColor, 'hsl')
          //       } else {
          //         throw new Error('HSL values must be within valid ranges.')
          //       }
          //     } else {
          //       throw new Error('Invalid HSL format.')
          //     }
          //   } else if (format === 'rgb') {
          //     const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
          //     const match = input.match(rgbRegex)
          //     if (match) {
          //       const r = Number(match[1])
          //       const g = Number(match[2])
          //       const b = Number(match[3])
          //       if ([r, g, b].every((v) => v >= 0 && v <= 255)) {
          //         formattedColor = `rgb(${r}, ${g}, ${b})`
          //         updateColor(block.id, formattedColor, 'rgb')
          //       } else {
          //         throw new Error('RGB values must be within valid ranges.')
          //       }
          //     } else {
          //       throw new Error('Invalid RGB format.')
          //     }
          //   } else if (format === 'hex') {
          //     const hexRegex = /^#([0-9A-F]{3}){1,2}$/i
          //     if (hexRegex.test(input)) {
          //       formattedColor = input.toUpperCase()
          //       updateColor(block.id, formattedColor, 'hex')
          //     } else {
          //       throw new Error('Invalid Hex format.')
          //     }
          //   } else {
          //     throw new Error('Unsupported color format.')
          //   }
          // } catch (error: any) {
          //   console.error(error.message)
          // }
        }
      >
        {/* <input
          type='text'
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          className={styles['color-input']}
          style={{ maxWidth: `${width}`, fontSize: fontSize }}
        /> */}

        {selected?.value === 'hex' && (
          <div className={`${styles.inputs} ${styles['hex-input']}`}>
            <label>
              <span>Hex: </span>
              <input
                name={`hex-input-${block.id}`}
                type='text'
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className={styles['color-input']}
                style={{ maxWidth: `${width}`, fontSize: fontSize }}
                placeholder='#FFFFFF'
              />
            </label>
          </div>
        )}

        {selected?.value === 'rgb' && (
          <div className={`${styles.inputs} ${styles['rgb-inputs']}`}>
            <label>
              <span>R: </span>
              <input
                name={`r-input-${block.id}`}
                type='number'
                value={r}
                onChange={(e) => setR(Number(e.target.value))}
                min={0}
                max={255}
                className={styles['color-input']}
                style={{ maxWidth: `${width}`, fontSize: fontSize }}
              />
            </label>

            <label>
              <span>G: </span>
              <input
                name={`g-input-${block.id}`}
                type='number'
                value={g}
                onChange={(e) => setG(Number(e.target.value))}
                min={0}
                max={255}
                className={styles['color-input']}
                style={{ maxWidth: `${width}`, fontSize: fontSize }}
              />
            </label>

            <label>
              <span>B: </span>
              <input
                name={`b-input-${block.id}`}
                type='number'
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                min={0}
                max={255}
                className={styles['color-input']}
                style={{ maxWidth: `${width}`, fontSize: fontSize }}
              />
            </label>
          </div>
        )}

        {selected?.value === 'hsl' && (
          <div className={`${styles.inputs} ${styles['hsl-inputs']}`}>
            <label>
              <span>H: </span>
              <input
                name={`h-input-${block.id}`}
                type='number'
                value={h}
                onChange={(e) => setH(Number(e.target.value))}
                min={0}
                max={360}
                className={styles['color-input']}
                style={{ maxWidth: `${width}`, fontSize: fontSize }}
              />{' '}
            </label>
            <label>
              <span>S: </span>
              <input
                name={`s-input-${block.id}`}
                type='number'
                value={s}
                onChange={(e) => setS(Number(e.target.value))}
                min={0}
                max={100}
                className={styles['color-input']}
                style={{ maxWidth: `${width}`, fontSize: fontSize }}
              />
            </label>

            <label>
              <span>L: </span>
              <input
                name={`l-input-${block.id}`}
                type='number'
                value={l}
                onChange={(e) => setL(Number(e.target.value))}
                min={0}
                max={100}
                className={styles['color-input']}
                style={{ maxWidth: `${width}`, fontSize: fontSize }}
              />
            </label>
          </div>
        )}

        <button
          style={{
            minWidth: `calc(100% - 4px)`,
            maxWidth: `calc(100% - 4px)`,
            fontSize: fontSize,
          }}
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
