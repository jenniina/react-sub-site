import axios from 'axios'
import { ELanguages } from '../../../types'

export type SelectData = {
  language: ELanguages
  issues: string | undefined
  favoriteHero: string | undefined
  clarification: string | undefined
  email: string | undefined
}

const url = import.meta.env.VITE_BASE_URI ?? 'https://bg.jenniina.fi'
const baseUrl = `${url}/api`

export const sendEmail = async (data: SelectData) => {
  const response = await axios.post(`${baseUrl}/send-email-select`, data)
  return response.data
}
