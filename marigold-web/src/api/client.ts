import axios from 'axios'
import type { Role } from '../types/auth'

const AUTH_STORAGE_KEY = 'marigold_auth'
export const UNAUTHORIZED_EVENT = 'marigold:unauthorized'

export type StoredAuth = {
  token: string
  email: string
  role: Role
}

export function getStoredAuth(): StoredAuth | null {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!raw) {
    return null
  }
  try {
    return JSON.parse(raw) as StoredAuth
  } catch {
    return null
  }
}

export function setStoredAuth(auth: StoredAuth) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
})

apiClient.interceptors.request.use((config) => {
  const auth = getStoredAuth()
  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT))
    }
    return Promise.reject(error)
  },
)
