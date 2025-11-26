import axios from 'axios'
import { IJoke, IJokeResponse } from '../types'

const url = 'https://react.jenniina.fi'
const baseUrl = `${url}/api/jokes`

const getAll = async (): Promise<IJoke[]> => {
  const response = await axios.get<IJoke[]>(baseUrl)
  return response.data
}

const getJokesByUserId = async (
  userId: string | undefined
): Promise<IJoke[]> => {
  const request = await axios.get<IJoke[]>(`${baseUrl}/user/${userId}`)
  return request.data
}

const create = async (newObject: IJoke): Promise<IJokeResponse> => {
  // const config = {
  //   headers: { Authorization: token },
  // }

  // const response = await axios.post(baseUrl, newObject, config)
  const response = await axios.post<IJokeResponse>(baseUrl, newObject)
  return response.data
}

const update = async (newObject: IJoke): Promise<IJokeResponse> => {
  const request = axios.put<IJokeResponse>(
    `${baseUrl}/${newObject._id}`,
    newObject
  )
  return request.then(response => response.data)
}

const remove = async (id: string | undefined): Promise<IJoke> => {
  const response = await axios.delete<IJoke>(`${baseUrl}/${id}`)
  return response.data
}

const search = async (
  jokeId: number,
  language: string,
  category: string,
  type: string
) => {
  const response = await axios.get<IJoke>(
    `${baseUrl}/${jokeId}/${language}/${category}/${type}`
  )
  return response.data
}

const deleteUser = async (
  id: string,
  userId: string
): Promise<IJokeResponse> => {
  const response = await axios.delete<IJokeResponse>(
    `${baseUrl}/${id}/delete-user/${userId}`
  )
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
