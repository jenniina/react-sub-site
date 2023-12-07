import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './reducers/quizReducer'
import userReducer from './reducers/usersReducer'
import authReducer from './reducers/authReducer'
import notificationReducer from './reducers/notificationReducer'
import questionsReducer from './reducers/questionsReducer'
import difficultyReducer from './reducers/difficultyReducer'

const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    notification: notificationReducer,
    quiz: quizReducer,
    difficulty: difficultyReducer,
    questions: questionsReducer,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
