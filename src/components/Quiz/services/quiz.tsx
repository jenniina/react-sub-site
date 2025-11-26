import axios from 'axios'
import { IQuizHighscore } from '../types'

const url = 'https://react.jenniina.fi'
const baseUrl = `${url}/api/quiz`

const getQuizzes = async (): Promise<IQuizHighscore[]> => {
  const response = await axios.get<IQuizHighscore[]>(baseUrl)
  return response.data
}
const getUserQuiz = async (id: string): Promise<IQuizHighscore | null> => {
  const response = await axios.get<IQuizHighscore | null>(`${baseUrl}/${id}`)
  return response.data
}

const addQuiz = async (newQuiz: IQuizHighscore): Promise<IQuizHighscore> => {
  const response = await axios.post<IQuizHighscore>(baseUrl, newQuiz)
  return response.data
}

const deleteDuplicates = async (
  user: IQuizHighscore['user']
): Promise<boolean> => {
  const response = await axios.delete<boolean>(`${baseUrl}/remove/${user}`)
  return response.data
}

// const deleteQuiz = async (id: string) => {
//   const response = await axios.delete(`${baseUrl}/${id}`)
//   return response.data
// }

export default { getQuizzes, getUserQuiz, addQuiz, deleteDuplicates }
