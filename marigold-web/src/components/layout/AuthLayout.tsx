import type { ReactNode } from 'react'
import { MarigoldMark } from '../brand/MarigoldMark'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-marigold-50 md:flex">
        <MarigoldMark size={420} className="absolute opacity-10" />
        <div className="relative flex flex-col items-center gap-3 text-center">
          <MarigoldMark size={64} />
          <h1 className="font-display text-3xl font-semibold text-text">Marigold Bank</h1>
          <p className="max-w-xs text-text-muted">Banking that grows with you.</p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-bg px-6 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  )
}
