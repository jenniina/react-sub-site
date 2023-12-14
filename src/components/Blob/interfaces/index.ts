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
