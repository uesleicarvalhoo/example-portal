import axios from 'axios'
import { toast } from 'react-toastify'
import { BACKEND_API_BASE_URL } from '../config'
import { destroyAuthCookies, getAuthCookies, setAuthCookies } from '../utils/cookies'


function checkApiError(error): string {
  let errorMessage = error.response?.data?.message || 'Ocorreu um erro desconhecido'
  const code = error.response?.data?.code
  if (code) {
    errorMessage = `[${code}] - ${errorMessage}`
  }

  toast.error(errorMessage)
  return errorMessage
}

export function getAPIClient() {
  const api = axios.create({
    baseURL: BACKEND_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const refreshApi = axios.create({
    baseURL: BACKEND_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status
      if (status === 401 && !window.location.href.includes('/login')) {
        destroyAuthCookies()
        window.location.href = '/login'
      }

      const errorMessage = checkApiError(error)
      return Promise.resolve({ error: true, message: errorMessage, status })
    }
  )

  api.interceptors.request.use(
    async (config) => {
      const { accessToken, refreshToken } = getAuthCookies()

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      } else if (refreshToken) {
        try {
          const response = await refreshApi.post('/auth/refresh-token', {
            refreshToken: refreshToken,
          })
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data
          setAuthCookies(newAccessToken, newRefreshToken)
          config.headers['Authorization'] = `Bearer ${newAccessToken}`
        } catch (error) {
          destroyAuthCookies()
          checkApiError(error)
          toast.error('Sua sessão expirou, por favor, faça login novamente.')
          return Promise.reject(error)
        }
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return api
}
