import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IJoke as joke } from '../interfaces'
import jokeService from '../services/jokes'

const jokeSlice = createSlice({
  name: 'joke',
  initialState: [] as joke[],
  reducers: {
    create(state, action) {
      return [...state, action.payload]
      // state.push(action.payload)
      // const updatedJoke = action.payload
      // return state.map((joke) =>
      //   joke.jokeId !== updatedJoke.jokeId ? joke : updatedJoke
      // )
    },
    setJokes(_state, action) {
      return action.payload
    },
    remove(state, action) {
      const id = action.payload
      return state.filter((joke) => joke?.jokeId !== id)
    },
    search(state, action) {
      const id = action.payload.jokeId
      return state.filter((joke) => joke?.jokeId === id) as joke[]
    },
    editJoke(state, action) {
      const id = action.payload._id
      const updatedJoke = action.payload
      return state.map((joke) => (joke?._id !== id ? joke : updatedJoke))
    },
    deleteUser(state, action) {
      return action.payload
    },
    save(state, action: PayloadAction<joke>) {
      const newJoke = action.payload
      const existingJoke = state.find(
        (joke) => joke.jokeId === newJoke.jokeId && joke.language === newJoke.language
      )
      if (existingJoke) {
        return state.map((joke) =>
          joke.jokeId !== newJoke.jokeId && joke.language === newJoke.language
            ? joke
            : newJoke
        )
      } else {
        // If the joke does not exist in the state, add it
        state.push(newJoke)
      }
    },
  },
})

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

export const createJoke = (joke: joke) => {
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
  return async (dispatch: (arg0: { payload: any; type: 'joke/search' }) => joke) => {
    const joke = await jokeService.search(jokeId, language, category, type)
    dispatch({ type: 'joke/search', payload: joke })
    return joke
  }
}

export const updateJoke = (joke: joke) => {
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

export const removeDuplicateJoke = (jokes: joke[]) => {
  return async (dispatch: (arg0: { payload: any; type: 'joke/setJokes' }) => void) => {
    const uniqueJokes = jokes.filter(
      (joke, index, self) => index === self.findIndex((t) => t.jokeId === joke.jokeId)
    )
    dispatch(setJokes(uniqueJokes))
  }
}

export const { create, setJokes, remove, editJoke, deleteUser, save } = jokeSlice.actions
export default jokeSlice.reducer
