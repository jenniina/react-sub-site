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
