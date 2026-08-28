import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  clearStoredAuth,
  getStoredAuth,
  setStoredAuth,
  UNAUTHORIZED_EVENT,
  type StoredAuth,
} from '../api/client'

type AuthContextValue = {
  auth: StoredAuth | null
  login: (auth: StoredAuth) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(() => getStoredAuth())
  const navigate = useNavigate()

  const login = useCallback((newAuth: StoredAuth) => {
    setStoredAuth(newAuth)
    setAuth(newAuth)
  }, [])

  const logout = useCallback(() => {
    clearStoredAuth()
    setAuth(null)
    navigate('/login', { replace: true })
  }, [navigate])

  useEffect(() => {
    const handleUnauthorized = () => {
      clearStoredAuth()
      setAuth(null)
      navigate('/login', { replace: true })
    }
    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized)
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized)
  }, [navigate])

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>
}
