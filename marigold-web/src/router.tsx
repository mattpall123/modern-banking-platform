import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { BackendWakeGate } from './components/BackendWakeGate'
import { AppLayout } from './components/layout/AppLayout'
import { LandingPage } from './pages/LandingPage'
import { AccountsPage } from './pages/marketing/AccountsPage'
import { AiAssistantPage } from './pages/marketing/AiAssistantPage'
import { InsightsInfoPage } from './pages/marketing/InsightsInfoPage'
import { SecurityPage } from './pages/marketing/SecurityPage'
import { FaqPage } from './pages/marketing/FaqPage'
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

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/learn/accounts" element={<AccountsPage />} />
      <Route path="/learn/ai-assistant" element={<AiAssistantPage />} />
      <Route path="/learn/insights" element={<InsightsInfoPage />} />
      <Route path="/learn/security" element={<SecurityPage />} />
      <Route path="/learn/faq" element={<FaqPage />} />
      <Route
        path="/login"
        element={
          <BackendWakeGate>
            <LoginPage />
          </BackendWakeGate>
        }
      />
      <Route
        path="/register"
        element={
          <BackendWakeGate>
            <RegisterPage />
          </BackendWakeGate>
        }
      />
      <Route path="/403" element={<ForbiddenPage />} />

      <Route
        element={
          <BackendWakeGate>
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          </BackendWakeGate>
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
