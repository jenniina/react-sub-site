import { Fragment } from 'react'
import { EEtc, ELanguages } from '../interfaces'
import { SelectOption } from '../components/Select/Select'

export const splitToLines = (details: string) => {
  return details.split('\n').map((line: string, index: number) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      <br />
    </Fragment>
  ))
}
export const firstToLowerCase = (str: string) => {
  if (!str) return str
  return str.charAt(0).toLowerCase() + str.slice(1)
}
export const firstToUpperCase = (str: string) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const sanitize = (name: string = getRandomString(9)): string => {
  return name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '-')
}

export const first3Words = (name: string, language: ELanguages): string => {
  // if name is less than 5 words, return the name
  if (name.split(' ').length <= 4) return name
  // else return the first 3 words
  else return name.split(' ').slice(0, 3).join(' ') + ' ' + EEtc[language]
}

export const options = (enumObj: typeof ELanguages) => {
  return Object.keys(enumObj).map((key) => ({
    value: enumObj[key as keyof typeof enumObj],
    label: key,
  })) as SelectOption[]
}

export const getRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
export const getRandomLetters = (length: number, capitals: boolean = false) => {
  const lettersAll = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const lettersCapital = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const characters = capitals ? lettersCapital : lettersAll
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
export const getRandomMinMax = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}
export const scrollIntoView = (
  id: string,
  block: ScrollLogicalPosition = 'start',
  inline: ScrollLogicalPosition = 'nearest'
) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block, inline })
  }
}

export function clampValue(min: number, val: number, max: number) {
  return Math.min(Math.max(val, min), max)
}

export function createSelectOptions(
  enums: Array<Record<ELanguages, string>>,
  language: ELanguages
): SelectOption[] {
  return enums.map((enumObj) => {
    const label = enumObj[language]
    return { label, value: label }
  })
}

export const hexToRGB = (hex: string) => {
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

export const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}

export const rgbToHSL = (r: number, g: number, b: number) => {
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

  return {
    h: Math.round(h * 360),
    s: Math.round(Math.min(s * 100, 100)),
    l: Math.round(l * 100),
  }
}

export const hslToRGB = (h: number, s: number, l: number) => {
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

  return {
    r: Math.round(Math.min(r * 255, 255)),
    g: Math.round(Math.min(g * 255, 255)),
    b: Math.round(Math.min(b * 255, 255)),
  }
}

export const hslToHex = (h: number, s: number, l: number): string => {
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

  return rgbToHex(
    Math.round(Math.min(r * 255, 255)),
    Math.round(Math.min(g * 255, 255)),
    Math.round(Math.min(b * 255, 255))
  )
}

export const calculateLuminance = (r: number, g: number, b: number): number => {
  const [R, G, B] = [r, g, b].map((v) => {
    const normalized = v / 255
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4)
  })
  return R * 0.2126 + G * 0.7152 + B * 0.0722
}

export const getContrastRatio = (lum1: number, lum2: number) => {
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function elementsOverlap(element1: HTMLElement, element2: HTMLElement) {
  const domRect1 = element1.getBoundingClientRect()
  const domRect2 = element2.getBoundingClientRect()

  return !(
    domRect1.top + 5 > domRect2.bottom - 5 ||
    domRect1.right < domRect2.left ||
    domRect1.bottom - 5 < domRect2.top + 5 ||
    domRect1.left > domRect2.right
  )
}

export function removeMinus(val: number): number {
  return val < 0 ? -val : val
}
