import { Link } from 'react-router-dom'
import { MarigoldMark } from '../components/brand/MarigoldMark'
import { useAuth } from '../auth/useAuth'

export function NotFoundPage() {
  const { auth } = useAuth()
  const homePath = auth?.role === 'ANALYST' ? '/fraud' : '/dashboard'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <MarigoldMark size={64} className="opacity-60" />
      <h1 className="font-display text-2xl font-semibold text-text">Page not found</h1>
      <p className="text-text-muted">That page doesn't exist.</p>
      <Link to={homePath} className="font-medium text-marigold-600 hover:underline">
        Back home
      </Link>
    </div>
  )
}
