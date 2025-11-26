import axios from 'axios'
import { ELanguages } from '../../../types'

export interface SelectData {
  language: ELanguages
  issues: string | undefined
  favoriteHero: string | undefined
  clarification: string | undefined
  email: string | undefined
}

const url = 'https://react.jenniina.fi'
const baseUrl = `${url}/api`

export const sendEmail = async (
  data: SelectData
): Promise<{ success: boolean; message: string }> => {
  const response = await axios.post(`${baseUrl}/send-email-select`, data)
  return response.data as { success: boolean; message: string }
}
