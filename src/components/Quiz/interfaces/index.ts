export interface ReducerProps {
  notification: {
    isError: boolean
    message: string
    seconds: number
  }
  difficulty: {
    mode: EQuizType
  }
  quiz: {
    quiz: IQuiz
    quizzes: IQuiz[]
  }
  timer: {
    secondsRemaining: number
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
    highscores: {
      easy: number
      medium: number
      hard: number
    }
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
}

export interface IUser {
  _id?: string
  username: string
  name?: string
  password: string
  language: string
  verified?: boolean
  createdAt?: string
  updatedAt?: string
}

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
  highscores: {
    easy: number
    medium: number
    hard: number
  }
  user: IUser['_id']
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
