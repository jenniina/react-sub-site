import axios from 'axios'

const VITE_BASE_URI = import.meta.env.VITE_BASE_URI
const baseUrl = VITE_BASE_URI ? `${VITE_BASE_URI}/api/login` : '/api/login'

type credentials = {
  username: string
  password: string
}

const login = async (credentials: credentials) => {
  const response = await axios.post(baseUrl, credentials)
  const { token } = response.data

  // Store the token securely (e.g., in cookies or local storage)
  // Ensure you handle this securely based on your application's requirements
  localStorage.setItem('token', token)

  return response.data
}

export default { login }
