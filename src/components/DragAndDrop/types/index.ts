export type Status = string
export type Lightness = 'light' | 'dark'
export interface Data {
  id: number
  content: string
  color: string
  status: Status
  lightness: Lightness
}

export interface RefObject<T> {
  readonly current: T | null
}
