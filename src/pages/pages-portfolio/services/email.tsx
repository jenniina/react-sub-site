import axios from 'axios'
import { ELanguages } from '../../../interfaces'

export type SelectData = {
  language: ELanguages
  issues: string | undefined
  favoriteHero: string | undefined
  clarification: string | undefined
  email: string | undefined
}

const baseUrl = `https://bg.jenniina.fi/api`

export const sendEmail = async (data: SelectData) => {
  const response = await axios.post(`${baseUrl}/send-email-select`, data)
  return response.data
}
