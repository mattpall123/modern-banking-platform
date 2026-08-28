import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getFraudAlerts } from '../api/fraud'
import { queryKeys } from '../api/queryKeys'
import type { FraudAlertStatus } from '../types/fraud'
import { Select } from '../components/ui/Select'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import { Pagination } from '../components/ui/Pagination'
import { FraudAlertCard } from '../components/fraud/FraudAlertCard'

const STATUS_OPTIONS: { value: FraudAlertStatus | ''; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'DISMISSED', label: 'Dismissed' },
]

export function FraudQueuePage() {
  const [status, setStatus] = useState<FraudAlertStatus | ''>('PENDING')
  const [page, setPage] = useState(0)

  const statusParam = status || undefined
  const alertsQuery = useQuery({
    queryKey: queryKeys.fraud.list(statusParam, page),
    queryFn: () => getFraudAlerts(statusParam, { page, size: 10 }),
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-text">Fraud Queue</h1>
        <div className="w-52">
          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as FraudAlertStatus | '')
              setPage(0)
            }}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {alertsQuery.isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size={32} />
        </div>
      ) : alertsQuery.data && alertsQuery.data.content.length > 0 ? (
        <>
          <div className="flex flex-col gap-4">
            {alertsQuery.data.content.map((alert) => (
              <FraudAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
          <Pagination
            page={alertsQuery.data.number}
            totalPages={alertsQuery.data.totalPages}
            first={alertsQuery.data.first}
            last={alertsQuery.data.last}
            onPageChange={setPage}
          />
        </>
      ) : (
        <EmptyState title="No fraud alerts" description="Nothing matches this filter right now." />
      )}
    </div>
  )
}
