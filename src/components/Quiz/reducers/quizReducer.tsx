import { createSlice } from '@reduxjs/toolkit'
import quizService from '../services/quiz'
import { IQuizHighscore } from '../interfaces'

const initialState = {
  options: {
    loading: false,
    question_category: '',
    question_difficulty: '',
    question_type: '',
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
    changeLoading(state, action) {
      state.options.loading = action.payload
    },
    changeDifficulty(state, action) {
      state.options.question_difficulty = action.payload
    },
    changeCategory(state, action) {
      state.options.question_category = action.payload
    },
    changeType(state, action) {
      state.options.question_type = action.payload
    },
    changeAmount(state, action) {
      state.options.amount_of_questions = action.payload
    },
    setQuestions(state, action) {
      state.questions = action.payload
    },
    setScore(state, action) {
      state.score = action.payload
    },
    setIndex(state, action) {
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
