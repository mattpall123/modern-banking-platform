import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

type SpinnerProps = {
  size?: number
  className?: string
}

export function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      className={clsx('animate-spin text-marigold-500', className)}
      aria-label="Loading"
    />
  )
}
