import axios from 'axios'

const getBaseUrl = () => {
  if (import.meta.env.DEV) return 'http://localhost:4000'

  const apiOrigin = import.meta.env.VITE_API_ORIGIN?.trim()
  if (apiOrigin) return apiOrigin

  if (typeof window !== 'undefined') return window.location.origin

  return ''
}

const api = axios.create({
  baseURL: `${getBaseUrl()}/api`,
})

// Attach token automatically
api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config

  const token = localStorage.getItem('JokeApptoken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Force logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      if (typeof window === 'undefined') return Promise.reject(error)

      localStorage.removeItem('JokeApptoken')
      localStorage.removeItem('loggedJokeAppUser')
    }
    return Promise.reject(error)
  }
)

export default api
