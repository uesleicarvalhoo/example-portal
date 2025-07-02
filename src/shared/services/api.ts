import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { BACKEND_API_BASE_URL } from '@/config';
import {
  destroyAuthCookies,
  getAuthCookies,
  setAuthCookies,
} from '@/shared/utils/cookies';

function extractApiErrorMessage(error: unknown): string {
  const err = error as AxiosError<{ message?: string; code?: string }>;
  const data = err.response?.data;

  let message = data?.message || 'Ocorreu um erro desconhecido';
  if (data?.code) {
    message = `[${data.code}] ${message}`;
  }

  toast.error(message);
  return message;
}

export function getAPIClient() {
  const api = axios.create({
    baseURL: BACKEND_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const refreshApi = axios.create({
    baseURL: BACKEND_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(async (config) => {
    const { accessToken, refreshToken } = getAuthCookies();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (refreshToken) {
      try {
        const response = await refreshApi.post('/auth/refresh-token', {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;

        setAuthCookies(newAccessToken, newRefreshToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } catch (err) {
        destroyAuthCookies();
        extractApiErrorMessage(err);
        toast.error('Sua sessão expirou. Faça login novamente.');
        Router.push('/login');
        return Promise.reject(err);
      }
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;

      if (status === 401 && typeof window !== 'undefined' && !Router.pathname.includes('/login')) {
        destroyAuthCookies();
        const message = 'Sessão expirada. Faça login novamente.';
        localStorage.setItem('loginError', message);
        Router.push('/login');
      }

      const message = extractApiErrorMessage(error);
      return Promise.reject(new Error(message));
    }
  );

  return api;
}

export const api = getAPIClient();
