export type Status = 'good' | 'bad' | 'neutral'
export type Background = 'light' | 'dark'
export type Data = {
    id: number,
    content: string,
    color: string;
    status: Status,
    background: Background
}

export interface RefObject<T> {
    readonly current: T | null
}