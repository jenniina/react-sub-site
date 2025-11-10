import axios, { AxiosRequestConfig } from 'axios'
import { credentials } from '../types'

const url = import.meta.env.VITE_BASE_URI ?? 'https://react.jenniina.fi'
const baseUrl = `${url}/api/login`

let token: string | null = null
let config: AxiosRequestConfig<any> | undefined

const setToken = (newToken: string | null) => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const login = async (credentials: credentials) => {
  const response = await axios.post(baseUrl, credentials, config)
  const { token } = response.data
  localStorage.setItem('JokeApptoken', token)
  return response.data
}

export default { login, setToken }
