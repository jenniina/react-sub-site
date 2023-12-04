import axios from 'axios'
import { IQuizHighscore } from '../interfaces'

const VITE_BASE_URI = import.meta.env.VITE_BASE_URI
const baseUrl = VITE_BASE_URI ? `${VITE_BASE_URI}/api/quiz` : '/api/quiz'

const getQuizzes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getUserQuiz = async (id: string, type: string) => {
  const response = await axios.get(`${baseUrl}/${id}/${type}`)
  return response.data
}

const addQuiz = async (newQuiz: IQuizHighscore) => {
  const response = await axios.post(baseUrl, newQuiz)
  return response.data
}

// const deleteQuiz = async (id: string) => {
//   const response = await axios.delete(`${baseUrl}/${id}`)
//   return response.data
// }

export default { getQuizzes, getUserQuiz, addQuiz }
