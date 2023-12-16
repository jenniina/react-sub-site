import axios from 'axios'

export type SelectData = {
  issues: string
  favoriteHero: string
  clarification: string
}

const VITE_BASE_URI = import.meta.env.VITE_BASE_URI
const baseUrl = VITE_BASE_URI ? `${VITE_BASE_URI}/api` : '/api'

export const sendEmail = async (data: SelectData) => {
  const response = await axios.post(`${baseUrl}/send-email-select`, data)
  return response.data
}
