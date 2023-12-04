import { createSlice } from '@reduxjs/toolkit'
import { ReducerProps } from '../interfaces'

const difficultySlice = createSlice({
  name: 'difficulty',
  initialState: {
    mode: 'easy',
  },
  reducers: {
    selectMode: (state, { payload }) => {
      localStorage.setItem('quizMode', payload)
      state.mode = payload
    },
  },
})

export const modeSelector = (state: ReducerProps) => state.difficulty.mode

export const returnMode = () => {
  const mode = localStorage.getItem('quizMode')
  return mode ? mode : localStorage.setItem('quizMode', 'easy')
}

export const { selectMode } = difficultySlice.actions
export default difficultySlice.reducer
