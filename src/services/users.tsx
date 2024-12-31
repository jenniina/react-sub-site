import axios, { AxiosResponse } from 'axios'
import { IUser as user, ELanguages, IBlacklistedJoke } from '../interfaces'

const url = import.meta.env.VITE_BASE_URI ?? 'https://bg.jenniina.fi'
const baseUrl = `${url}/api/users`

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('JokeApptoken')}`,
  },
})

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig())
  return response.data
}

const createNewUser = async (newUser: user) => {
  const response = await axios.post(baseUrl + '/register', newUser)
  return response
}

const deleteUser = async (id: user['_id'], deleteJokes: boolean) => {
  const response = await axios.delete(`${baseUrl}/${id}/${deleteJokes}`, getConfig())
  return response.data as AxiosResponse<{ success: boolean; message: string }>
}

const updateUser = async (
  user: Pick<user, '_id' | 'language' | 'name' | 'passwordOld'>
) => {
  const newUserSettings = {
    _id: user._id,
    name: user.name,
    language: user.language,
    passwordOld: user.passwordOld,
  }
  const response = await axios.put(`${baseUrl}/${user._id}`, newUserSettings)
  return response.data
}
const addToBlacklistedJokes = async (
  id: user['_id'],
  jokeId: string,
  language: string,
  value: string | undefined
) => {
  const valueObject = {
    value,
  }
  const response = await axios.put(`${baseUrl}/${id}/${jokeId}/${language}`, valueObject)
  return response.data
}

// router.delete('/api/users/:id/:jokeId/:language', removeJokeFromBlacklisted)
const removeJokeFromBlacklisted = async (
  id: user['_id'] | undefined,
  joke_id: IBlacklistedJoke['_id'] | undefined,
  language: ELanguages
) => {
  const response = await axios.delete(
    `${baseUrl}/${id}/${joke_id}/${language}`,
    getConfig()
  )
  return response.data
}

const updateUsername = async (
  user: Pick<user, '_id' | 'language' | 'username' | 'passwordOld'>
) => {
  const newUserSettings = {
    _id: user._id,
    username: user.username,
    language: user.language,
    passwordOld: user.passwordOld,
  }
  const response = await axios.put(`${baseUrl}`, newUserSettings)
  return response.data
}
const updatePassword = async (
  user: Pick<user, '_id' | 'language' | 'password' | 'passwordOld'>
) => {
  const newUserSettings = {
    _id: user._id,
    language: user.language,
    password: user.password,
    passwordOld: user.passwordOld,
  }
  const response = await axios.put(`${baseUrl}/${user._id}`, newUserSettings)
  return response.data
}

const updateToken = async (user: Pick<user, 'username' | 'language'>) => {
  const response = await axios.put(`${baseUrl}/request-new-token`, user)
  return response.data
}

const searchUsername = async (username: string) => {
  const response = await axios.get(`${baseUrl}/username/${username}`)
  return response.data
}

const searchId = async (id: string | undefined) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data as user
}

const forgot = async (username: string | undefined, language: string | ELanguages) => {
  const response = await axios.post(`${baseUrl}/forgot`, { username, language })
  return response.data
}

export default {
  getAll,
  createNewUser,
  deleteUser,
  updateUser,
  updateUsername,
  updatePassword,
  searchUsername,
  searchId,
  updateToken,
  forgot,
  addToBlacklistedJokes,
  removeJokeFromBlacklisted,
}
