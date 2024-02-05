export type BackgroundColor = string

export type Draggable = {
  id: string
  number: number
  i: number
  x: string
  y: string
  z: string
  display: string
  ariaGrabbed: boolean
  draggable: boolean
  tabIndex: number
  background: string
  function?: Function
}

export interface RefObject<T> {
  readonly current: T | null
}

export interface ReducerProps {
  blob: {
    draggables: Draggable[][]
    dragItemList: Draggable[]
    hasBeenMadeFromStorage: boolean
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
