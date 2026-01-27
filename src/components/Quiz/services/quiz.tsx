import { IQuizHighscore } from '../types'
import api from '../../../services/api'

const baseUrl = `/quiz`

const getQuizzes = async (): Promise<IQuizHighscore[]> => {
  const response = await api.get<IQuizHighscore[]>(baseUrl)
  return response.data
}
const getUserQuiz = async (id: string): Promise<IQuizHighscore | null> => {
  const response = await api.get<IQuizHighscore | null>(`${baseUrl}/${id}`)
  return response.data
}

const addQuiz = async (newQuiz: IQuizHighscore): Promise<IQuizHighscore> => {
  const response = await api.post<IQuizHighscore>(baseUrl, newQuiz)
  return response.data
}

const deleteDuplicates = async (
  user: IQuizHighscore['user']
): Promise<boolean> => {
  const response = await api.delete<boolean>(`${baseUrl}/remove/${user}`)
  return response.data
}

// const deleteQuiz = async (id: string) => {
//   const response = await api.delete(`${baseUrl}/${id}`)
//   return response.data
// }

export default { getQuizzes, getUserQuiz, addQuiz, deleteDuplicates }
