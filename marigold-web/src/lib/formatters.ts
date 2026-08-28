import { format } from 'date-fns'

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export function formatDate(iso: string): string {
  return format(new Date(iso), 'MMM d, yyyy')
}

export function formatDateTime(iso: string): string {
  return format(new Date(iso), 'MMM d, yyyy, h:mm a')
}

export function formatLatency(ms: number): string {
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(1)}s`
  }
  return `${ms}ms`
}
