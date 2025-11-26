import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import quizService from '../services/quiz'
import { IQuizHighscore, IQuestion } from '../types'

interface IQuizOptions {
  loading: boolean
  category: string
  difficulty: string
  type: string
  amount_of_questions: number
}

interface IQuizState {
  options: IQuizOptions
  questions: IQuestion[]
  index: number
  score: number
}

const initialState: IQuizState = {
  options: {
    loading: false,
    category: '',
    difficulty: '',
    type: '',
    amount_of_questions: 50,
  },
  questions: [],
  index: 0,
  score: 0,
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    changeLoading(state, action: PayloadAction<boolean>) {
      state.options.loading = action.payload
    },
    changeDifficulty(state, action: PayloadAction<string>) {
      state.options.difficulty = action.payload
    },
    changeCategory(state, action: PayloadAction<string>) {
      state.options.category = action.payload
    },
    changeType(state, action: PayloadAction<string>) {
      state.options.type = action.payload
    },
    changeAmount(state, action: PayloadAction<number>) {
      state.options.amount_of_questions = action.payload
    },
    setQuestions(state, action: PayloadAction<IQuestion[]>) {
      state.questions = action.payload
    },
    setScore(state, action: PayloadAction<number>) {
      state.score = action.payload
    },
    setIndex(state, action: PayloadAction<number>) {
      state.index = action.payload
    },
  },
})

export const addQuiz = (quiz: IQuizHighscore) => {
  return async () => {
    const newQuiz = await quizService.addQuiz(quiz)
    return newQuiz
  }
}

export const getUserQuiz = (id: string) => {
  return async () => {
    const quiz = await quizService.getUserQuiz(id)
    return quiz
  }
}

export const deleteDuplicates = (user: IQuizHighscore['user']) => {
  return async () => {
    return await quizService.deleteDuplicates(user)
  }
}

export const {
  changeLoading,
  changeCategory,
  changeDifficulty,
  changeType,
  changeAmount,
  setQuestions,
  setIndex,
  setScore,
} = quizSlice.actions

export default quizSlice.reducer
