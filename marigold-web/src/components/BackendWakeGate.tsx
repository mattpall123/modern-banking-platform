import { useEffect, useState, type ReactNode } from 'react'
import { AxiosError } from 'axios'
import { apiClient } from '../api/client'
import { Spinner } from './ui/Spinner'
import { MarigoldMark } from './brand/MarigoldMark'

const POLL_INTERVAL_MS = 2500
const SLOW_AFTER_MS = 15000
const GIVE_UP_AFTER_MS = 120000

type GateStatus = 'checking' | 'slow' | 'stalled' | 'ready'

async function backendIsAwake(): Promise<boolean> {
  try {
    await apiClient.get('/auth/login', { timeout: 5000 })
    return true
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return true
    }
    return false
  }
}

export function BackendWakeGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<GateStatus>('checking')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    const startedAt = Date.now()

    async function poll() {
      const awake = await backendIsAwake()
      if (cancelled) return

      if (awake) {
        setStatus('ready')
        return
      }

      const elapsed = Date.now() - startedAt
      if (elapsed >= GIVE_UP_AFTER_MS) {
        setStatus('stalled')
        return
      }

      setStatus(elapsed >= SLOW_AFTER_MS ? 'slow' : 'checking')
      setTimeout(poll, POLL_INTERVAL_MS)
    }

    poll()
    return () => {
      cancelled = true
    }
  }, [attempt])

  const retry = () => {
    setStatus('checking')
    setAttempt((n) => n + 1)
  }

  if (status === 'ready') {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="flex max-w-sm flex-col items-center gap-4 text-center">
        <MarigoldMark size={48} className="opacity-70" />
        {status === 'stalled' ? (
          <>
            <p className="font-display text-lg text-text">Taking longer than expected</p>
            <p className="text-sm text-text-muted">
              The demo backend may be having trouble waking up. You can try again, or check back
              in a minute.
            </p>
            <button
              onClick={retry}
              className="rounded-xl bg-marigold-500 px-4 py-2 text-sm font-medium text-white hover:bg-marigold-600"
            >
              Try again
            </button>
          </>
        ) : (
          <>
            <Spinner size={28} />
            <p className="font-display text-lg text-text">Waking up the demo</p>
            <p className="text-sm text-text-muted">
              {status === 'slow'
                ? "This is running on free-tier hosting that spins down when idle, so a cold start can take up to a minute. Almost there."
                : 'Connecting to the backend...'}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
