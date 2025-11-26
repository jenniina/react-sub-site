import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReducerProps } from '../../../types'
import { EQuizType } from '../types'

const difficultySlice = createSlice({
  name: 'difficulty',
  initialState: {
    mode: EQuizType.easy,
  },
  reducers: {
    selectMode: (state, { payload }: PayloadAction<string>) => {
      localStorage.setItem('quizMode', payload)
      state.mode = payload as ReducerProps['difficulty']['mode']
    },
  },
})

export const modeSelector = (state: ReducerProps) => state.difficulty.mode

export const returnMode = (): string => {
  const mode = localStorage.getItem('quizMode')
  if (mode) return mode
  localStorage.setItem('quizMode', 'easy')
  return 'easy'
}

export const { selectMode } = difficultySlice.actions
export default difficultySlice.reducer
