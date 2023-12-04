import axios, { AxiosRequestConfig } from 'axios'
import { IUser as user } from '../interfaces'

let token: string | null = null
let config: AxiosRequestConfig<any> | undefined

const setToken = (newToken: string | null) => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const VITE_BASE_URI = import.meta.env.VITE_BASE_URI
const baseUrl = VITE_BASE_URI ? `${VITE_BASE_URI}/api/users` : '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewUser = async (newUser: user) => {
  const response = await axios.post(baseUrl + '/register', newUser)
  return response.data
}

const deleteUser = async (id: user['_id']) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const updateUser = async (user: user) => {
  const response = await axios.put(`${baseUrl}/${user._id}`, user)
  return response.data
}

const searchUsername = async (username: string) => {
  const response = await axios.get(`${baseUrl}/username/${username}`)
  return response.data
}

const searchId = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

// const updateUserJokes = async (user: user) => {
//   const response = await axios.put(`${baseUrl}/${user._id}/update-jokes`, user)
//   return response.data
// }

export default {
  setToken,
  getAll,
  createNewUser,
  deleteUser,
  updateUser,
  searchUsername,
  searchId,
}
