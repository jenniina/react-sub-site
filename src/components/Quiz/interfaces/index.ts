import { IUser } from '../../../interfaces'

// export interface ReducerProps {
//   notification: {
//     isError: boolean
//     message: string
//     seconds: number
//   }
//   difficulty: {
//     mode: EQuizType
//   }
//   quiz: {
//     quiz: IQuiz
//     quizzes: IQuiz[]
//   }
//   questions: {
//     questionsRedux: IQuestion[]
//     status: string
//     index: number
//     currentQuestion: {
//       id?: string
//       question?: string
//       options?: any[]
//       correctAnswer?: boolean
//       temp?: {
//         correctAnswer: boolean
//         incorrectAnswers: boolean[]
//       }
//     }
//     answer: string | null
//     points: number
//     highscores: IHighscore
//     secondsRemaining: number
//     finalSeconds: number
//   }
//   users: {
//     users: IUser[]
//   }
//   auth: {
//     user: IUser
//     isAuthenticated: boolean
//     isLoading: boolean
//     token: string
//   }
// }

// export interface IUser {
//   _id?: string
//   username: string
//   name?: string
//   password: string
//   language: string
//   verified?: boolean
//   createdAt?: string
//   updatedAt?: string
// }

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
  correctAnswer: boolean
  incorrectAnswers: boolean[]
}
