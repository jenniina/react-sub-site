import axios, { AxiosRequestConfig } from 'axios'
import { IJoke } from '../interfaces'

const url =
  import.meta.env.VITE_BASE_URI ??
  'https://react-bg.braveisland-7060f196.westeurope.azurecontainerapps.io'
const baseUrl = `${url}/api/jokes`

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getJokesByUserId = async (userId: string | undefined) => {
  const request = await axios.get(`${baseUrl}/user/${userId}`)
  return request.data
}

const create = async (newObject: IJoke) => {
  // const config = {
  //   headers: { Authorization: token },
  // }

  // const response = await axios.post(baseUrl, newObject, config)
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (newObject: IJoke) => {
  const request = axios.put(`${baseUrl}/${newObject._id}`, newObject)
  return request.then((response) => response.data)
}

const remove = async (id: string | undefined) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

const search = async (
  jokeId: number,
  language: string,
  category: string,
  type: string
) => {
  const response = await axios.get(`${baseUrl}/${jokeId}/${language}/${category}/${type}`)
  return response.data
}

const deleteUser = async (id: string, userId: string) => {
  const response = await axios.delete(`${baseUrl}/${id}/delete-user/${userId}`)
  return response.data
}

export default {
  getAll,
  getJokesByUserId,
  create,
  update,
  remove,
  search,
  deleteUser,
}
