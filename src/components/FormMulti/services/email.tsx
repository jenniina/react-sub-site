import axios from 'axios'
import { FormData } from '../types'
import { IResponse } from '../../../types'

const url = import.meta.env.DEV
  ? 'http://localhost:4000'
  : 'https://react.jenniina.fi'
export const sendEmail = async (data: FormData): Promise<IResponse> => {
  const response = await axios.post(`${url}/api/send-email-form`, data)
  return response.data as IResponse
}
