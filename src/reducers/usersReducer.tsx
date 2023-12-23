import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { EPleaseGiveValidEmail, IUser, ELanguages } from '../interfaces'
import AppThunk from '../store'
import { AxiosResponse } from 'axios'

const usersSlice = createSlice({
  name: 'users',
  initialState: [] as IUser[],
  reducers: {
    register(state, action) {
      //state.push(action.payload);
      return [...state, action.payload]
      //   const updatedUser = action.payload
      //   return state.map((user) => (user._id !== updatedUser._id ? user : updatedUser))
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
      const id = action.payload._id
      return state.filter((user) => user?._id === id) as IUser[]
    },
    updateToken(state, action) {
      const id = action.payload._id
      const updatedUser = action.payload
      return state.map((user) => (user?._id !== id ? user : updatedUser))
    },
    forgotPassword(state, action) {
      return action.payload
      // const id = action.payload._id
      // const updatedUser = action.payload
      // return state.map((user) => (user?._id !== id ? user : updatedUser))
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch: (arg0: { payload: any; type: 'users/setUsers' }) => void) => {
    const users = await userService.getAll()
    dispatch({ type: 'users/setUsers', payload: users })
  }
}
interface IContent {
  success: boolean
  user: IUser
  message: string
}
export const createUser = (newUser: IUser) => {
  return async (
    dispatch: (arg0: { payload: IUser; type: 'users/register' }) => IContent
  ) => {
    const response = (await userService.createNewUser(newUser)) as AxiosResponse<IContent>
    dispatch(register(response.data))
    return response.data
  }
}

// export const createUser = (newUser: IUser) => {
//   return async (dispatch: (arg0: { type: string; payload: any }) => IContent) => {
//     const response = (await userService.createNewUser(newUser)) as AxiosResponse<IContent>
//     // Dispatch an action to update the state with the response data
//     return dispatch(createUserSuccess(response))
//   }
// }

// // Action creator for updating the state after a successful create user request
// const createUserSuccess = (payload: AxiosResponse<IContent, any>) => {
//   return {
//     type: 'users/register',
//     payload: payload,
//   }
// }

export const removeUser = (id: IUser['_id']) => {
  return async (
    dispatch: (arg0: { payload: IUser['_id']; type: 'users/remove' }) => void
  ) => {
    const deletedUser = await userService.deleteUser(id)
    dispatch(remove(deletedUser))
  }
}

export const updateUser = (
  user: Pick<IUser, '_id' | 'language' | 'name' | 'passwordOld'>
) => {
  return async (dispatch: (arg0: { payload: IUser; type: 'users/update' }) => IUser) => {
    const content: IContent = await userService.updateUser(user)
    dispatch(update(content.user))
    return content
  }
}

export const updateUsername = (
  user: Pick<IUser, '_id' | 'language' | 'username' | 'passwordOld'>
) => {
  return async () => {
    const content: IContent = await userService.updateUsername(user)
    return content
  }
}

export const updatePassword = (
  user: Pick<IUser, '_id' | 'language' | 'password' | 'passwordOld'>
) => {
  return async (dispatch: (arg0: { payload: IUser; type: 'users/update' }) => IUser) => {
    const content: IContent = await userService.updatePassword(user)
    dispatch(update(content.user))
    return content
  }
}

// export const findUserbyUsername = (username: string | undefined) => {
//   return async (
//     dispatch: (arg0: { payload: any; type: 'users/searchUsername' }) => IUser
//   ) => {
//     const user = await userService.searchUsername(username)
//     dispatch({ type: 'users/searchUsername', payload: user })
//     return user.user
//   }
// }

export const findUserById = (id: string) => {
  return async (dispatch: (arg0: { payload: any; type: 'users/searchId' }) => IUser) => {
    const user = await userService.searchId(id)
    dispatch({ type: 'users/searchId', payload: user })
    return user
  }
}

export const updateUserToken = (user: Pick<IUser, 'username' | 'language'>) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'users/updateToken' }) => void
  ) => {
    const updated: IContent = await userService.updateToken(user)
    dispatch(updateToken(updated))
    //dispatch({ type: 'users/updateToken', payload: updated })
  }
}

export const forgot = (username: string | undefined, language: string | ELanguages) => {
  return async (
    dispatch: (arg0: { payload: any; type: 'users/forgotPassword' }) => void
  ) => {
    if (username) {
      const updated: IContent = await userService.forgot(username, language)
      dispatch(forgotPassword(updated))
      //dispatch({ type: 'users/updateToken', payload: updated })
      return updated
    } else {
      return {
        success: false,
        message: `${
          EPleaseGiveValidEmail[(language as keyof typeof EPleaseGiveValidEmail) || 'en']
        }`,
      }
    }
  }
}

export const {
  register,
  setUsers,
  remove,
  update,
  searchUsername,
  searchId,
  updateToken,
  forgotPassword,
} = usersSlice.actions
export default usersSlice.reducer
