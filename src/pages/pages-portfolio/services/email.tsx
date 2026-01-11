import axios from 'axios'
import { ELanguages, IResponse } from '../../../types'

export interface SelectData {
  language: ELanguages
  issues: string | undefined
  favoriteHero: string | undefined
  clarification: string | undefined
  email: string | undefined
}

const url = import.meta.env.DEV
  ? 'http://localhost:4000'
  : 'https://react.jenniina.fi'
const baseUrl = `${url}/api`

export const sendEmail = async (data: SelectData): Promise<IResponse> => {
  const response = await axios.post(`${baseUrl}/send-email-select`, data)
  return response.data as IResponse
}
