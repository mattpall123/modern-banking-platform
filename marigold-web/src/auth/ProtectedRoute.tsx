import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import type { Role } from '../types/auth'

type ProtectedRouteProps = {
  children: ReactNode
  roles?: Role[]
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { auth } = useAuth()

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.includes(auth.role)) {
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}
