export enum CardType {
  letters = 'letters',
  numbers = 'numbers',
  icons = 'icons',
}
export interface CardTypeOptions {
  value: CardType
  label: string
}

export interface IHighScore {
  _id?: string
  levelKey: string
  time: number
  size: number
  type: string
  players: IPlayer[]
  createdAt?: string
  updatedAt?: string
}

export interface IPlayer {
  id: number
  name: string
  score: number
}

export interface IHighScoreResponse {
  success: boolean
  message: string
  highScore?: IHighScore
  highScores?: IHighScore[]
}

export type GameMode = 'solo' | 'duet'
export enum EGameMode {
  solo = 'solo',
  duet = 'duet',
}

export type HighScores = {
  [mode: string]: {
    [levelKey: string]: IHighScore[]
  }
}
