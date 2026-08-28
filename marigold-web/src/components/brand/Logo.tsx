import { Link } from 'react-router-dom'
import { MarigoldMark } from './MarigoldMark'

type LogoProps = {
  size?: number
  to?: string
}

export function Logo({ size = 32, to = '/' }: LogoProps) {
  return (
    <Link to={to} className="flex items-center gap-2">
      <MarigoldMark size={size} />
      <span className="font-display text-xl font-semibold text-text">Marigold Bank</span>
    </Link>
  )
}
