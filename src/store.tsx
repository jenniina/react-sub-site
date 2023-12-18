import { configureStore } from '@reduxjs/toolkit'
import jokeReducer from './components/Jokes/reducers/jokeReducer'
import userReducer from './reducers/usersReducer'
import authReducer from './reducers/authReducer'
import notificationReducer from './reducers/notificationReducer'
import quizReducer from './components/Quiz/reducers/quizReducer'
import questionsReducer from './components/Quiz/reducers/questionsReducer'
import difficultyReducer from './components/Quiz/reducers/difficultyReducer'
import todoReducer from './components/Todo/reducers/todoReducer'

const store = configureStore({
  reducer: {
    jokes: jokeReducer,
    users: userReducer,
    auth: authReducer,
    notification: notificationReducer,
    quiz: quizReducer,
    difficulty: difficultyReducer,
    questions: questionsReducer,
    todos: todoReducer,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
