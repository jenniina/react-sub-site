import { SelectOption } from '../Select/Select'

export type FormData = {
    firstName: string
    lastName: string
    encouragement: string
    color: HEX | string
    dark: string
    light: string
    email: string
    message: string
    gdpr: string
    select: SelectOption
    selectmulti: string
}

export const INITIAL_DATA: FormData = {
    firstName: '',
    lastName: '',
    encouragement: '',
    color: '#FFFFFF',
    dark: '',
    light: '',
    email: '',
    message: '',
    gdpr: '',
    select: { label: "Please select an option", value: "Unselected" },
    selectmulti: ''
}





export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`
export type Color = RGB | RGBA | HEX | string;