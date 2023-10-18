import axios, { Axios, AxiosResponse } from 'axios'
import { ELanguages, IUser as user } from '../interfaces'
import CircularJSON from 'circular-json'

const VITE_BASE_URI = import.meta.env.VITE_BASE_URI
const baseUrl = VITE_BASE_URI ? `${VITE_BASE_URI}/api/users` : '/api/users'

const token = localStorage.getItem('token')

// Include the token in the request headers
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createNewUser = async (newUser: user) => {
  const response = await axios.post(baseUrl + '/register', newUser)
  return response
}

const deleteUser = async (id: user['_id']) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data as AxiosResponse<{ user: user; message: string }>
}

const updateUser = async (user: Pick<user, '_id' | 'language' | 'name' | 'password'>) => {
  const response = await axios.put(`${baseUrl}/${user._id}`, user)
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
  searchUsername,
  searchId,
  updateToken,
  forgot,
}
