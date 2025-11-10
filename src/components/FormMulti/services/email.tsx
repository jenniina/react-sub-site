import axios from 'axios'
import { FormData } from '../types'

const url = import.meta.env.VITE_BASE_URI ?? 'https://react.jenniina.fi'
export const sendEmail = async (data: FormData) => {
  const response = await axios.post(`${url}/api/send-email-form`, data)
  return response.data
}
