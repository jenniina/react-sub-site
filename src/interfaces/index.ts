import { ELanguages, IJoke } from '../components/Jokes/interfaces'
import { EQuizType, IQuiz, IQuestion, IHighscore } from '../components/Quiz/interfaces'
import { ITask, ITodos } from '../components/Todo/interfaces'

export interface RefObject<T> {
  readonly current: T | null
}

export const breakpoint = 600
export const breakpointSmall = 300

export interface IUser {
  _id?: string
  username: string
  name?: string
  password: string
  language: ELanguages | string
  verified?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ReducerProps {
  notification: {
    isError: boolean
    message: string
    seconds: number
  }
  jokes: IJoke[]
  difficulty: {
    mode: EQuizType
  }
  quiz: {
    quiz: IQuiz
    quizzes: IQuiz[]
  }
  questions: {
    questionsRedux: IQuestion[]
    status: string
    index: number
    currentQuestion: {
      id?: string
      question?: string
      options?: any[]
      correctAnswer?: boolean
      temp?: {
        correctAnswer: boolean
        incorrectAnswers: boolean[]
      }
    }
    answer: string | null
    points: number
    highscores: IHighscore
    secondsRemaining: number
    finalSeconds: number
  }
  users: {
    users: IUser[]
  }
  auth: {
    user: IUser
    isAuthenticated: boolean
    isLoading: boolean
    token: string
  }
  todos: ITodos
}
