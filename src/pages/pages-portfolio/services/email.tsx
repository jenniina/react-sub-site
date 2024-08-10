import axios from 'axios'

export type SelectData = {
  issues: string
  favoriteHero: string
  clarification: string
  email: string
}

const baseUrl = `https://bg.jenniina.fi/api`

export const sendEmail = async (data: SelectData) => {
  const response = await axios.post(`${baseUrl}/send-email-select`, data)
  return response.data
}
