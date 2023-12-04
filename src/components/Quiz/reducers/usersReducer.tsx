import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../interfaces'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as IUser[],
  reducers: {
    register(state: IUser[], action) {
      const updatedUser = action.payload
      return state.map((user) => (user._id !== updatedUser._id ? user : updatedUser))
    },
    setUsers(_state, action) {
      return action.payload
    },
    remove(state, action) {
      const id = action.payload
      return state.filter((user) => user?._id !== id)
    },
    update(state, action) {
      const id = action.payload._id
      const updatedUser = action.payload
      return state.map((user) => (user?._id !== id ? user : updatedUser))
    },
    searchUsername(state, action) {
      const username = action.payload.username
      return state.filter((user) => user?.username === username) as IUser[]
    },
    searchId(state, action) {
      const id = action.payload
      return state.filter((user) => user?._id === id) as IUser[]
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch: (arg0: { payload: any; type: 'users/setUsers' }) => void) => {
    const users = await userService.getAll()
    dispatch({ type: 'users/setUsers', payload: users })
  }
}

export const createUser = (newUser: IUser) => {
  return async (dispatch: (arg0: { payload: any; type: 'users/register' }) => void) => {
    const user = await userService.createNewUser(newUser)
    dispatch({ type: 'users/register', payload: user })
  }
}

export const removeUser = (id: IUser['_id']) => {
  return async (dispatch: (arg0: { payload: IUser; type: 'users/remove' }) => void) => {
    const deletedUser = await userService.deleteUser(id)
    dispatch({ type: 'users/remove', payload: deletedUser })
  }
}

export const updateUser = (user: IUser) => {
  return async (dispatch: (arg0: { payload: IUser; type: 'users/update' }) => void) => {
    const updatedUser = await userService.updateUser(user)
    dispatch({ type: 'users/update', payload: updatedUser })
  }
}

export const findUserbyUsername = (username: string) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'users/searchUsername' }) => IUser
  ) => {
    const user = await userService.searchUsername(username)
    dispatch({ type: 'users/searchUsername', payload: user })
    return user.user
  }
}

export const findUserById = (id: string) => {
  return async (dispatch: (arg0: { payload: any; type: 'users/searchId' }) => IUser) => {
    const user = await userService.searchId(id)
    return dispatch({ type: 'users/searchId', payload: user._id })
  }
}

export const { register, setUsers, remove, update, searchUsername, searchId } =
  usersSlice.actions
export default usersSlice.reducer
