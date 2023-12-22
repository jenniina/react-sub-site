import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { IUser } from '../interfaces'

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
    loginUser(_state, action) {
      return action.payload
    },
    logoutUser(_state, action) {
      return action.payload
    },
  },
})

export const initializeUser = () => {
  return async (dispatch: (arg0: { payload: any; type: 'auth/setUser' }) => void) => {
    const loggedUserJSON = window.localStorage.getItem('loggedJokeAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      loginService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const login = (username: string, password: string, language: string) => {
  return async (dispatch: (arg0: { payload: any; type: 'auth/loginUser' }) => void) => {
    const user = await loginService.login({
      username,
      password,
      language,
    })
    window.localStorage.setItem('loggedJokeAppUser', JSON.stringify(user))
    loginService.setToken(user.token)
    const response = dispatch(loginUser(user))
    return response
  }
}

export const logout = () => {
  return async (dispatch: (arg0: { payload: any; type: 'auth/logoutUser' }) => void) => {
    window.localStorage.removeItem('loggedJokeAppUser')
    dispatch(logoutUser(null))
  }
}

export const refreshUser = (user: IUser) => {
  return async (dispatch: (arg0: { payload: any; type: 'auth/setUser' }) => void) => {
    const loggedUserJSON = window.localStorage.getItem('loggedJokeAppUser')
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON)
      const token = data.token
      if (token) {
        loginService.setToken(token) // Set the token in the loginService
      }
      window.localStorage.setItem('loggedJokeAppUser', JSON.stringify({ user, token }))
      dispatch(setUser(user))
    }
  }
}

export const { setUser, loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer
