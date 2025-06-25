import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';

import { User, LoginData } from '../types';
import { loginRequest, getUserProfile } from '../services/auth';
import { destroyAuthCookies } from '../utils/cookies';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // evita redirecionamento prematuro

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
        setIsAuthenticated(true);
      } catch (err) {
        setUser(null);
        setIsAuthenticated(false);
        if (Router.pathname !== '/login') {
          toast.error('Sua sessão expirou. Faça login novamente.');
          Router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async ({ email, password }: LoginData) => {
    try {
      await loginRequest({ email, password });
      const userProfile = await getUserProfile();
      setUser(userProfile);
      setIsAuthenticated(true);
      toast.success('Login realizado com sucesso!');
      Router.push('/');
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      toast.error('Falha no login. Verifique suas credenciais.');
    }
  };

  const signOut = async () => {
    destroyAuthCookies();
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Você saiu da sua conta.');
    Router.push('/login');
  };

  // Enquanto verifica autenticação, evita renderizar o app (opcional)
  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
