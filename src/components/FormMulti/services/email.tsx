import axios from 'axios'
import { FormData } from '../interfaces'

const VITE_BASE_URI = import.meta.env.VITE_BASE_URI
const baseUrl = `${VITE_BASE_URI}/api`

export const sendEmail = async (data: FormData) => {
  const response = await axios.post(`${baseUrl}/send-email-form`, data)
  return response.data
}
