import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { Link } from 'react-router-dom'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { MegaMenu } from './MegaMenu'
import { MEGA_MENU_CATEGORIES } from './megaMenuData'

export function MarketingNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const activeCategory = MEGA_MENU_CATEGORIES.find((c) => c.id === activeMenu)

  return (
    <header ref={navRef} className="relative z-20 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo size={28} />
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link to="/register">
            <Button>Get started</Button>
          </Link>
        </div>
      </div>
      <nav className="border-t border-border">
        <div className="mx-auto flex max-w-6xl gap-2 px-4">
          {MEGA_MENU_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveMenu((current) => (current === category.id ? null : category.id))}
              className={clsx(
                'flex items-center gap-1 px-3 py-2.5 text-sm font-medium transition-colors',
                activeMenu === category.id ? 'text-marigold-600' : 'text-text-muted hover:text-text',
              )}
            >
              {category.label}
              <ChevronDown
                size={14}
                className={clsx('transition-transform', activeMenu === category.id && 'rotate-180')}
              />
            </button>
          ))}
        </div>
      </nav>
      {activeCategory && <MegaMenu category={activeCategory} onNavigate={() => setActiveMenu(null)} />}
    </header>
  )
}
