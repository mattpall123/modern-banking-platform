import { type LucideIcon, Flower2 } from 'lucide-react'
import { type ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description?: string
  icon?: LucideIcon
  action?: ReactNode
}

export function EmptyState({ title, description, icon: Icon = Flower2, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-12 text-center">
      <Icon size={32} className="text-marigold-300" />
      <p className="font-medium text-text">{title}</p>
      {description && <p className="max-w-sm text-sm text-text-muted">{description}</p>}
      {action}
    </div>
  )
}
