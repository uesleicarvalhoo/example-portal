import { LoginData, LoginResponse } from '../types/auth';
import { User } from '../types/user';
import { setAuthCookies } from '@/shared/utils/cookies';
import { api } from './api';

export async function loginRequest(payload: LoginData): Promise<LoginResponse | null> {
  try {
    const { data } = await api.post<LoginResponse>('/auth/login', payload);
    setAuthCookies(data.accessToken, data.refreshToken);
    return data;
  } catch {
    return null;
  }
}

export async function refreshToken(token: string): Promise<LoginResponse | null> {
  try {
    const { data } = await api.post<LoginResponse>('/auth/refresh', {
      refreshToken: token,
    });
    setAuthCookies(data.accessToken, data.refreshToken);
    return data;
  } catch {
    return null;
  }
}

export async function getUserProfile(): Promise<User> {
  const { data } = await api.get<User>('/user/me');
  return data;
}
