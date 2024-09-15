import { IUser } from '../../../interfaces'

export type BackgroundColor = string

export type Draggable = {
  layer: number
  id: string
  number: number
  i: number
  x: string
  y: string
  z: string
  background: string
  function?: Function
}

export interface SavedBlobs {
  user: IUser['_id']
  d: number
  draggables: Draggable[]
  backgroundColor: BackgroundColor[]
  versionName: string
}

export interface RefObject<T> {
  readonly current: T | null
}

export interface ReducerProps {
  blob: {
    draggables: Draggable[][]
    backgroundColor: BackgroundColor[][]
  }
}

export interface focusedBlob {
  top: number
  left: number
  width: number
  height: number
}
export interface ColorPair {
  color1: string
  color2: string
}
