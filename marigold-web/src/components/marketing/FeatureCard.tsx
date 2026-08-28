import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
  to?: string
}

export function FeatureCard({ icon: Icon, title, description, to }: FeatureCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-marigold-50 text-marigold-600">
        <Icon size={20} />
      </div>
      <h3 className="font-display text-lg font-semibold text-text">{title}</h3>
      <p className="text-sm text-text-muted">{description}</p>
      {to && (
        <Link to={to} className="mt-1 text-sm font-medium text-marigold-600 hover:underline">
          Learn more →
        </Link>
      )}
    </Card>
  )
}
