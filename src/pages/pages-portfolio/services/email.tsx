import axios from 'axios'
import { ELanguages } from '../../../interfaces'

export type SelectData = {
  language: ELanguages
  issues: string | undefined
  favoriteHero: string | undefined
  clarification: string | undefined
  email: string | undefined
}

const url =
  import.meta.env.VITE_BASE_URI ??
  'https://react-bg.braveisland-7060f196.westeurope.azurecontainerapps.io'
const baseUrl = `${url}/api`

export const sendEmail = async (data: SelectData) => {
  const response = await axios.post(`${baseUrl}/send-email-select`, data)
  return response.data
}
