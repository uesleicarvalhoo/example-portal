import { jwtDecode } from 'jwt-decode';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

type AuthCookies = {
  accessToken: string;
  refreshToken: string;
};

const getCookieExp = (token: string): Date => {
  const decoded: any = jwtDecode(token);
  return decoded?.exp ? new Date(decoded.exp * 1000) : null;
};

export const setAuthCookies = (accessToken: string, refreshToken: string): void => {
  setCookie(undefined, 'auth.accessToken', accessToken, { expires: getCookieExp(accessToken) });
  setCookie(undefined, 'auth.refreshToken', refreshToken, { expires: getCookieExp(refreshToken) });
};

export const destroyAuthCookies = (): void => {
  destroyCookie(undefined, 'auth.accessToken');
  destroyCookie(undefined, 'auth.refreshToken');
};

export const getAuthCookies = (): AuthCookies => {
  const { 'auth.accessToken': accessToken, 'auth.refreshToken': refreshToken } = parseCookies();
  return { accessToken, refreshToken };
};
