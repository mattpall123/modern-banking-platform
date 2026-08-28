import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './auth/useAuth'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { AppLayout } from './components/layout/AppLayout'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { AccountDetailPage } from './pages/AccountDetailPage'
import { TransferPage } from './pages/TransferPage'
import { ChatPage } from './pages/ChatPage'
import { InsightsPage } from './pages/InsightsPage'
import { FraudQueuePage } from './pages/FraudQueuePage'
import { AuditLogPage } from './pages/AuditLogPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ForbiddenPage } from './pages/ForbiddenPage'

function RootRedirect() {
  const { auth } = useAuth()
  if (!auth) {
    return <Navigate to="/login" replace />
  }
  return <Navigate to={auth.role === 'ANALYST' ? '/fraud' : '/dashboard'} replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/403" element={<ForbiddenPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={['CUSTOMER']}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts/:id"
          element={
            <ProtectedRoute roles={['CUSTOMER']}>
              <AccountDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transfer"
          element={
            <ProtectedRoute roles={['CUSTOMER']}>
              <TransferPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute roles={['CUSTOMER']}>
              <InsightsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/chat" element={<ChatPage />} />
        <Route
          path="/fraud"
          element={
            <ProtectedRoute roles={['ANALYST']}>
              <FraudQueuePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/audit"
          element={
            <ProtectedRoute roles={['ANALYST']}>
              <AuditLogPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
