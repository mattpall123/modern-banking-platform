import { AxiosError } from 'axios'
import type { ProblemDetail } from '../types/problem'

export function getErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (error instanceof AxiosError) {
    const detail = (error.response?.data as ProblemDetail | undefined)?.detail
    if (detail) {
      return detail
    }
  }
  if (error instanceof Error) {
    return error.message
  }
  return fallback
}
