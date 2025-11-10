import axios from 'axios'
import { IQuizHighscore } from '../types'

const url = import.meta.env.VITE_BASE_URI ?? 'https://react.jenniina.fi'
const baseUrl = `${url}/api/quiz`

const getQuizzes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getUserQuiz = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const addQuiz = async (newQuiz: IQuizHighscore) => {
  const response = await axios.post(baseUrl, newQuiz)
  return response.data
}

const deleteDuplicates = async (user: IQuizHighscore['user']) => {
  const response = await axios.delete(`${baseUrl}/remove/${user}`)
  return response.data
}

// const deleteQuiz = async (id: string) => {
//   const response = await axios.delete(`${baseUrl}/${id}`)
//   return response.data
// }

export default { getQuizzes, getUserQuiz, addQuiz, deleteDuplicates }
