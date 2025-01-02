import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { returnMode } from './difficultyReducer'
import { IQuestion } from '../types'
import { ReducerProps } from '../../../types'

function shuffleArray(array: any[]) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const initialState: ReducerProps['questions'] = {
  questionsRedux: [],
  status: 'ready',
  index: 0,
  currentQuestion: {},
  answer: null,
  points: 0,
  secondsRemaining: 210,
  finalSeconds: 0,
  highscores: {
    easy: { score: 0, time: 210 },
    medium: { score: 0, time: 210 },
    hard: { score: 0, time: 210 },
  },
}

export const getQuestions = createAsyncThunk(
  'questions/getQuestions',
  async (difficulty: string) => {
    try {
      const resp = await fetch(
        `https://the-trivia-api.com/v2/questions?limit=15&difficulties=${difficulty}`
      )
      return resp.json()
    } catch (error) {
      console.error(error)
    }
  }
)

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuiz: (state, { payload }) => {
      return payload
    },
    resetTimer: (state) => {
      state.secondsRemaining = 210
    },
    lessSeconds: (state) => {
      state.secondsRemaining -= 1
    },
    finalSeconds: (state) => {
      state.finalSeconds = 210 - state.secondsRemaining
    },
    newAnswer: (state, { payload }: PayloadAction<string>) => {
      state.answer = payload
      if (typeof state.currentQuestion.correctAnswer === 'string')
        state.points =
          payload === state.currentQuestion.correctAnswer
            ? state.points + 20
            : state.points
    },
    nextQuestion: (state) => {
      let temp: IQuestion = state.questionsRedux[state.index + 1]
      let newArray = {
        id: temp.id,
        correctAnswer: temp.correctAnswer,
        question: temp.question.text,
        options: shuffleArray([...temp.incorrectAnswers, temp.correctAnswer]),
      }
      state.index += 1
      state.currentQuestion = newArray
      state.answer = null
    },
    gameFinished: (state) => {
      state.highscores[returnMode() as keyof typeof state.highscores].score =
        state.points >
        state.highscores[returnMode() as unknown as keyof typeof state.highscores].score
          ? state.points
          : state.highscores[returnMode() as unknown as keyof typeof state.highscores]
              .score
      state.highscores[returnMode() as keyof typeof state.highscores].time =
        state.finalSeconds <
        state.highscores[returnMode() as unknown as keyof typeof state.highscores].time
          ? state.finalSeconds
          : state.highscores[returnMode() as unknown as keyof typeof state.highscores]
              .time
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getQuestions.fulfilled, (state, { payload }) => {
        let temp = payload[0]
        let newArray = {
          id: temp.id,
          correctAnswer: temp.correctAnswer,
          question: temp.question.text,
          options: shuffleArray([...temp.incorrectAnswers, temp.correctAnswer]),
        }
        state.status = 'ready'
        state.questionsRedux = payload
        state.currentQuestion = newArray
        state.index = 0
        state.points = 0
        state.answer = null
      })
      .addCase(getQuestions.rejected, (state) => {
        state.status = 'error'
      })
  },
})

export const {
  newAnswer,
  nextQuestion,
  gameFinished,
  finalSeconds,
  lessSeconds,
  resetTimer,
} = questionsSlice.actions
export default questionsSlice.reducer
