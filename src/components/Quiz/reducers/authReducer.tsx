import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import loginService from '../services/login'

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
      userService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const login = (username: string, password: string) => {
  return async (dispatch: (arg0: { payload: any; type: 'auth/loginUser' }) => void) => {
    const user = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem('loggedJokeAppUser', JSON.stringify(user))
    userService.setToken(user.token)
    dispatch(loginUser(user))
  }
}

export const logout = () => {
  return async (dispatch: (arg0: { payload: any; type: 'auth/logoutUser' }) => void) => {
    window.localStorage.removeItem('loggedJokeAppUser')
    dispatch(logoutUser(null))
  }
}
export const { setUser, loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer
