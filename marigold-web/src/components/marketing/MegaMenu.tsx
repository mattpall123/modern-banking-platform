import { Link } from 'react-router-dom'
import type { MegaMenuCategory } from './megaMenuData'
import { Button } from '../ui/Button'

type MegaMenuProps = {
  category: MegaMenuCategory
  onNavigate: () => void
}

function MenuLink({ href, label, onNavigate }: { href: string; label: string; onNavigate: () => void }) {
  const className = 'text-sm text-text-muted hover:text-marigold-600'
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className} onClick={onNavigate}>
        {label}
      </Link>
    )
  }
  return (
    <a href={href} className={className} onClick={onNavigate}>
      {label}
    </a>
  )
}

export function MegaMenu({ category, onNavigate }: MegaMenuProps) {
  const Icon = category.promo.icon

  return (
    <div className="absolute left-0 right-0 top-full border-b border-border bg-surface shadow-md">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:grid-cols-[1fr_1fr_auto]">
        {category.columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase text-text-muted">{column.title}</h3>
            {column.links.map((link) => (
              <MenuLink key={link.label} href={link.href} label={link.label} onNavigate={onNavigate} />
            ))}
          </div>
        ))}

        <div className="w-full rounded-xl bg-marigold-50 p-5 sm:w-64">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-marigold-600">
            <Icon size={18} />
          </div>
          <p className="font-display font-semibold text-text">{category.promo.title}</p>
          <p className="mt-1 text-sm text-text-muted">{category.promo.description}</p>
          {category.promo.ctaHref.startsWith('/') ? (
            <Link to={category.promo.ctaHref} onClick={onNavigate}>
              <Button className="mt-4 w-full justify-center">{category.promo.ctaLabel}</Button>
            </Link>
          ) : (
            <a href={category.promo.ctaHref} onClick={onNavigate}>
              <Button className="mt-4 w-full justify-center">{category.promo.ctaLabel}</Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
