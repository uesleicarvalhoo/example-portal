import { createContext, useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { User, LoginData } from '../types'
import { loginRequest, getUserProfile } from '../services/auth'
import { destroyAuthCookies } from '../utils/cookies'

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  login: (data: LoginData) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>({ name: 'Anônimo' } as User)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    getUserProfile().then((userProfile) => {
      setUser(userProfile)
      setIsAuthenticated(true)
    }).catch(() => {
      setIsAuthenticated(false)
      Router.push('/login')
    })
  }, [])

  async function login({ email, password }: LoginData) {
    await loginRequest({
      email,
      password,
    })

    const user = await getUserProfile()

    setUser(user)
    setIsAuthenticated(true)
    Router.push('/')
  }

  async function signOut(): Promise<void> {
    setUser(null)
    destroyAuthCookies()
    Router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
