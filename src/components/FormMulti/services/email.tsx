import axios from 'axios'
import { FormData } from '../types'

const url = 'https://react.jenniina.fi'
export const sendEmail = async (
  data: FormData
): Promise<{ success: boolean; message: string }> => {
  const response = await axios.post(`${url}/api/send-email-form`, data)
  return response.data as { success: boolean; message: string }
}
