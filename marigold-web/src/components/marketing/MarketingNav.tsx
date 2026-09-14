import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Lock } from 'lucide-react'
import { clsx } from 'clsx'
import { Link } from 'react-router-dom'
import { Logo } from '../brand/Logo'
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
    <header ref={navRef} className="relative z-20 bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Logo size={30} />
        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-md bg-marigold-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-marigold-600"
          >
            <Lock size={14} />
            Sign on
          </Link>
          <Link to="/register" className="hidden text-sm leading-tight text-text sm:block">
            Register for online
            <br />
            and mobile banking
          </Link>
        </div>
      </div>
      <nav className="border-y border-border">
        <div className="mx-auto flex max-w-6xl gap-7 px-4">
          {MEGA_MENU_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveMenu((current) => (current === category.id ? null : category.id))}
              className={clsx(
                'flex items-center gap-1 border-b-2 py-3 text-[15px] font-medium transition-colors',
                activeMenu === category.id
                  ? 'border-marigold-500 text-marigold-600'
                  : 'border-transparent text-text hover:text-marigold-600',
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
