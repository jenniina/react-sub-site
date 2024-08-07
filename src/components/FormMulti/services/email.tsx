import axios from 'axios'
import { FormData } from '../interfaces'

export const sendEmail = async (data: FormData) => {
  const response = await axios.post(`https://jenniina.fi/bg/api/send-email-form`, data)
  return response.data
}
