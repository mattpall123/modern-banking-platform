import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { clsx } from 'clsx'

type ToastVariant = 'success' | 'danger' | 'info'

type ToastItem = {
  id: number
  message: string
  variant: ToastVariant
}

type ToastContextValue = {
  showToast: (message: string, variant?: ToastVariant) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: 'bg-leaf-50 text-leaf-700 border-leaf-500',
  danger: 'bg-danger-50 text-danger-700 border-danger-500',
  info: 'bg-marigold-50 text-marigold-700 border-marigold-500',
}

const VARIANT_ICONS: Record<ToastVariant, typeof CheckCircle2> = {
  success: CheckCircle2,
  danger: XCircle,
  info: Info,
}

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'info') => {
      const id = nextId++
      setToasts((current) => [...current, { id, message, variant }])
      setTimeout(() => dismiss(id), 4000)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => {
          const Icon = VARIANT_ICONS[toast.variant]
          return (
            <div
              key={toast.id}
              className={clsx(
                'flex items-center gap-2 rounded-xl border-l-4 bg-surface px-4 py-3 text-sm shadow-md',
                VARIANT_STYLES[toast.variant],
              )}
            >
              <Icon size={18} />
              <span>{toast.message}</span>
              <button
                onClick={() => dismiss(toast.id)}
                className="ml-2 text-text-muted hover:text-text"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
