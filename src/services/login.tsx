import axios, { AxiosRequestConfig } from 'axios'

const VITE_BASE_URI = import.meta.env.VITE_BASE_URI
const baseUrl = `${VITE_BASE_URI}/api/login`

type credentials = {
  username: string
  password: string
  language: string
}
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
