import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { IUser } from '../types'
import { sleep } from '../utils'

type StoredUser = IUser & { token?: string | null }

const authSlice = createSlice({
  name: 'auth',
  initialState: null as IUser | null,
  reducers: {
    setUser(_state, action: PayloadAction<IUser | null>) {
      return action.payload
    },
    loginUser(_state, action: PayloadAction<IUser | null>) {
      return action.payload
    },
    logoutUser(_state, action: PayloadAction<IUser | null>) {
      return action.payload
    },
  },
})

export const initializeUser = () => {
  return async (
    dispatch: (arg0: { payload: IUser | null; type: 'auth/setUser' }) => void
  ) => {
    const loggedUserJSON = window
      ? window.localStorage.getItem('loggedJokeAppUser')
      : null
    if (loggedUserJSON) {
  const user = JSON.parse(loggedUserJSON) as StoredUser
  loginService.setToken(user.token ?? null)
      await sleep(10)
      void dispatch(setUser(user))
    }
  }
}

export const login = (username: string, password: string, language: string) => {
  return async (
    dispatch: (arg0: { payload: IUser | null; type: 'auth/loginUser' }) => void
  ) => {
    const user = (await loginService.login({
      username,
      password,
      language,
    })) as StoredUser
    if (window)
      window.localStorage.setItem('loggedJokeAppUser', JSON.stringify(user))

  loginService.setToken(user.token ?? null)
    const response = dispatch(loginUser(user))
    return response
  }
}

export const logout = () => {
  return async (
    dispatch: (arg0: { payload: IUser | null; type: 'auth/logoutUser' }) => void
  ) => {
    if (window) window.localStorage.removeItem('loggedJokeAppUser')
    await sleep(10)
    void dispatch(logoutUser(null))
  }
}

export const refreshUser = (user: IUser) => {
  return async (
    dispatch: (arg0: { payload: IUser | null; type: 'auth/setUser' }) => void
  ) => {
    const loggedUserJSON = window
      ? window.localStorage.getItem('loggedJokeAppUser')
      : null
    if (loggedUserJSON) {
  const data = JSON.parse(loggedUserJSON) as StoredUser
  const token = data.token ?? null
      if (token) {
        loginService.setToken(token) // Set the token in the loginService
      }
      if (window)
        window.localStorage.setItem(
          'loggedJokeAppUser',
          JSON.stringify({ user, token })
        )

      await sleep(10)
      void dispatch(setUser(user))
    }
  }
}

export const { setUser, loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer
