import { forwardRef, type SelectHTMLAttributes } from 'react'
import { clsx } from 'clsx'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, id, name, children, ...props }, ref) => {
    const resolvedId = id ?? name
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={resolvedId} className="text-sm font-medium text-text">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={resolvedId}
          name={name}
          className={clsx(
            'rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text',
            'focus:outline-none focus:ring-2 focus:ring-marigold-500 focus:border-marigold-500',
            error && 'border-danger-500 focus:ring-danger-500 focus:border-danger-500',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {error && <span className="text-sm text-danger-700">{error}</span>}
      </div>
    )
  },
)
Select.displayName = 'Select'
