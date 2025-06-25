import { LoginData, LoginResponse, User } from '../types'
import { setAuthCookies } from '../utils/cookies'
import { api } from './axios'

export async function loginRequest(payload: LoginData): Promise<LoginResponse> {
  const { status, data } = await api.post('/auth/login', payload)

  if (status == 200) {
    setAuthCookies(data.accessToken, data.refreshToken)
    return data
  }
  
  return null
}

export async function refreshToken(token: string): Promise<LoginResponse> {
  const { status, data } = await api.post('/auth/refresh', { refreshToken: token })
  if (status == 200) {
    setAuthCookies(data.accessToken, data.refreshToken)
    return data
  }

  return null
}

export async function getUserProfile(): Promise<User> {
  const { data } = await api.get('/user/me')
  return data
}
