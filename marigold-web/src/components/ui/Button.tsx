import { type ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-marigold-500 text-white hover:bg-marigold-600 focus-visible:ring-marigold-500',
  secondary: 'bg-leaf-500 text-white hover:bg-leaf-600 focus-visible:ring-leaf-500',
  ghost: 'bg-transparent text-text hover:bg-neutral-100 focus-visible:ring-marigold-500',
  danger: 'bg-danger-500 text-white hover:bg-danger-700 focus-visible:ring-danger-500',
}

export function Button({ variant = 'primary', className, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium',
        'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant],
        className,
      )}
      disabled={disabled}
      {...props}
    />
  )
}
