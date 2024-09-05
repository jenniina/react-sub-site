import axios from 'axios'
import { FormData } from '../interfaces'

const url =
  import.meta.env.VITE_BASE_URI ??
  'https://react-bg.braveisland-7060f196.westeurope.azurecontainerapps.io'
export const sendEmail = async (data: FormData) => {
  const response = await axios.post(`${url}/api/send-email-form`, data)
  return response.data
}
