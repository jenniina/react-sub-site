import axios from 'axios'
import { ELanguages } from '../../../interfaces'

export interface PoemItem {
  title: string
  author: string
  lines: string[]
  linecount: string
}

const API_URL = 'https://poetrydb.org'

export const getPoem = async (
  language: ELanguages,
  linecount: number
): Promise<PoemItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/random,linecount/1;${linecount}`)
    if (response.status === 200 && response.data) {
      return response.data as PoemItem[]
    } else {
      throw new Error('Failed to fetch poem.')
    }
  } catch (error) {
    console.error('Error fetching poem:', error)
    return []
  }
}
