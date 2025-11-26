import { IUser } from '../../../types'

export interface IQuiz {
  id: string
  name: string
  description: string
  questions: IQuestion[]
}
export enum EQuizType {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

export type TQuizModes = 'easy' | 'medium' | 'hard'

export interface IQuizHighscore {
  highscores: IHighscore
  user: IUser['_id']
}
export interface IHighscore {
  easy: { score: number; time: number }
  medium: { score: number; time: number }
  hard: { score: number; time: number }
}
export interface IQuestion {
  id: string
  title: string
  options: string[]
  question: {
    text: string
  }
  correctAnswer: string
  incorrectAnswers: string[]
}
