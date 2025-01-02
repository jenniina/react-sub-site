import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IJoke } from '../types'
import jokeService from '../services/jokes'

const jokeSlice = createSlice({
  name: 'joke',
  initialState: { jokes: [] as IJoke[], joke: null as IJoke | null },
  reducers: {
    create(state, action) {
      const newJoke = action.payload
      state.jokes?.push(newJoke)
    },
    setJokes(state, action) {
      state.jokes = action.payload
    },
    remove(state, action) {
      const id = action.payload
      state.jokes?.filter((joke) => joke?.jokeId !== id)
    },
    search(state, action) {
      const id = action.payload.jokeId
      state.jokes?.filter((joke) => joke?.jokeId === id) as IJoke[]
    },
    editJoke(state, action) {
      const id = action.payload._id
      const updatedJoke = action.payload
      state.jokes?.map((joke) => (joke?._id !== id ? joke : updatedJoke))
    },
    deleteUser(state, action) {
      return action.payload
    },
    save(state, action: PayloadAction<IJoke>) {
      const newJoke = action.payload
      const existingJoke = state.jokes?.find(
        (joke) => joke.jokeId === newJoke.jokeId && joke.language === newJoke.language
      )
      if (existingJoke) {
        state.jokes?.map((joke) =>
          joke.jokeId !== newJoke.jokeId && joke.language === newJoke.language
            ? joke
            : newJoke
        )
      } else {
        // If the joke does not exist in the state, add it
        state.jokes?.push(newJoke)
      }
    },
    setJoke(state, action: PayloadAction<IJoke | null>) {
      state.joke = action.payload
    },
  },
})

export const saveMostRecentJoke = (joke: IJoke) => {
  return async (dispatch: (arg0: { payload: any; type: 'joke/setJoke' }) => void) => {
    dispatch(setJoke(joke))
  }
}

export const initializeJokes = () => {
  return async (dispatch: (arg0: { payload: any; type: 'joke/setJokes' }) => void) => {
    const jokes = await jokeService.getAll()
    dispatch(setJokes(jokes))
  }
}

export const getJokesByUserId = (userId: string | undefined) => {
  return async (dispatch: (arg0: { payload: any; type: 'joke/setJokes' }) => void) => {
    const jokes = await jokeService.getJokesByUserId(userId)
    dispatch(setJokes(jokes))
    return jokes
  }
}

export const createJoke = (joke: IJoke) => {
  return async (dispatch: (arg0: { payload: any; type: 'joke/create' }) => void) => {
    const newJoke = await jokeService.create(joke)
    dispatch(create(newJoke))
    return newJoke
  }
}

export const removeJoke = (id: string | undefined) => {
  return async (dispatch: (arg0: { payload: any; type: 'joke/remove' }) => void) => {
    const deletedJoke = await jokeService.remove(id)
    dispatch(remove(deletedJoke))
  }
}

export const findJoke = (
  jokeId: number,
  language: string,
  category: string,
  type: string
) => {
  return async (dispatch: (arg0: { payload: any; type: 'joke/search' }) => IJoke) => {
    const joke = await jokeService.search(jokeId, language, category, type)
    dispatch({ type: 'joke/search', payload: joke })
    return joke
  }
}

export const updateJoke = (joke: IJoke) => {
  return async (dispatch: (arg0: { payload: any; type: 'joke/editJoke' }) => void) => {
    const updatedJoke = await jokeService.update(joke)
    dispatch({ type: 'joke/editJoke', payload: updatedJoke })
    return updatedJoke
  }
}

export const deleteUserFromJoke = (id: string, userId: string) => {
  return async (dispatch: (arg0: { payload: any; type: 'joke/deleteUser' }) => void) => {
    const deletedUser = await jokeService.deleteUser(id, userId)
    dispatch({ type: 'joke/deleteUser', payload: deletedUser })
  }
}

export const removeDuplicateJoke = (jokes: IJoke[]) => {
  return async (dispatch: (arg0: { payload: any; type: 'joke/setJokes' }) => void) => {
    const uniqueJokes = jokes?.filter(
      (joke, index, self) => index === self.findIndex((t) => t.jokeId === joke.jokeId)
    )
    dispatch(setJokes(uniqueJokes))
  }
}

export const { create, setJokes, setJoke, remove, editJoke, deleteUser, save } =
  jokeSlice.actions
export default jokeSlice.reducer
