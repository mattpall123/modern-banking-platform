import { type HTMLAttributes } from 'react'
import { clsx } from 'clsx'

type BadgeVariant = 'warning' | 'danger' | 'neutral' | 'success' | 'marigold'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  warning: 'bg-warning-50 text-warning-700',
  danger: 'bg-danger-50 text-danger-700',
  neutral: 'bg-neutral-100 text-neutral-500',
  success: 'bg-leaf-50 text-leaf-700',
  marigold: 'bg-marigold-50 text-marigold-700',
}

export function Badge({ variant = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  )
}
