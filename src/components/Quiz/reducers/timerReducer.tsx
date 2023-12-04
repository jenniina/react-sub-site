import { createSlice } from '@reduxjs/toolkit'
const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    secondsRemaining: 210,
  },
  reducers: {
    resetTimer: (state) => {
      state.secondsRemaining = 210
    },
    lessSeconds: (state) => {
      state.secondsRemaining -= 1
    },
  },
})

export const { lessSeconds, resetTimer } = timerSlice.actions
export default timerSlice.reducer
