import { NavLink } from 'react-router-dom'
import { clsx } from 'clsx'
import { useAuth } from '../../auth/useAuth'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'

const CUSTOMER_LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/transfer', label: 'Transfer' },
  { to: '/chat', label: 'AI Assistant' },
  { to: '/insights', label: 'Insights' },
]

const ANALYST_LINKS = [
  { to: '/fraud', label: 'Fraud Queue' },
  { to: '/audit', label: 'Audit Log' },
  { to: '/chat', label: 'AI Assistant' },
]

export function Navbar() {
  const { auth, logout } = useAuth()

  if (!auth) {
    return null
  }

  const links = auth.role === 'ANALYST' ? ANALYST_LINKS : CUSTOMER_LINKS

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Logo size={28} />
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  'rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-marigold-50 text-marigold-700'
                    : 'text-text-muted hover:bg-marigold-50 hover:text-text',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-text-muted sm:inline">{auth.email}</span>
          <Button variant="ghost" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
    </header>
  )
}
