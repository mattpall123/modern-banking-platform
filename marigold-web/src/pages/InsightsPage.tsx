import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAccounts } from '../api/accounts'
import { getMonthlyRecap } from '../api/insights'
import { queryKeys } from '../api/queryKeys'
import { Card } from '../components/ui/Card'
import { Select } from '../components/ui/Select'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import { MarigoldMark } from '../components/brand/MarigoldMark'
import { Markdown } from '../components/ui/Markdown'
import { CategoryBreakdownChart } from '../components/charts/CategoryBreakdownChart'
import { formatCurrency, formatDate } from '../lib/formatters'
import { clsx } from 'clsx'

export function InsightsPage() {
  const accountsQuery = useQuery({ queryKey: queryKeys.accounts.all(), queryFn: getAccounts })
  const [accountId, setAccountId] = useState<number | null>(null)

  const selectedAccountId = accountId ?? accountsQuery.data?.[0]?.id ?? null

  const recapQuery = useQuery({
    queryKey: queryKeys.insights.recap(selectedAccountId ?? -1),
    queryFn: () => getMonthlyRecap(selectedAccountId as number),
    enabled: selectedAccountId !== null,
    staleTime: Infinity,
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-text">Spending insights</h1>
        {accountsQuery.data && accountsQuery.data.length > 0 && (
          <div className="w-64">
            <Select
              value={selectedAccountId ?? ''}
              onChange={(e) => setAccountId(Number(e.target.value))}
            >
              {accountsQuery.data.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.type} · {account.accountNumber}
                </option>
              ))}
            </Select>
          </div>
        )}
      </div>

      {accountsQuery.data?.length === 0 && (
        <EmptyState title="No accounts yet" description="Open an account to see spending insights." />
      )}

      {recapQuery.isLoading && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Spinner size={32} />
          <p className="text-text-muted">Crunching your spending patterns...</p>
        </div>
      )}

      {recapQuery.data && (
        <>
          <p className="text-sm text-text-muted">
            {formatDate(recapQuery.data.periodStart)} – {formatDate(recapQuery.data.periodEnd)}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <p className="text-sm text-text-muted">Income</p>
              <p className="tabular-nums font-display text-2xl font-semibold text-leaf-600">
                {formatCurrency(recapQuery.data.totalIncome)}
              </p>
            </Card>
            <Card>
              <p className="text-sm text-text-muted">Spent</p>
              <p className="tabular-nums font-display text-2xl font-semibold text-text">
                {formatCurrency(recapQuery.data.totalSpent)}
              </p>
            </Card>
            <Card>
              <p className="text-sm text-text-muted">Net change</p>
              <p
                className={clsx(
                  'tabular-nums font-display text-2xl font-semibold',
                  recapQuery.data.netChange >= 0 ? 'text-leaf-600' : 'text-danger-700',
                )}
              >
                {formatCurrency(recapQuery.data.netChange)}
              </p>
            </Card>
          </div>

          {recapQuery.data.spendingByCategory.length > 0 ? (
            <Card>
              <h2 className="mb-4 font-display text-lg font-semibold text-text">Spending by category</h2>
              <CategoryBreakdownChart data={recapQuery.data.spendingByCategory} />
            </Card>
          ) : (
            <EmptyState title="No spending yet" description="Category breakdown will appear once there's activity." />
          )}

          <Card className="flex gap-3 bg-marigold-50">
            <MarigoldMark size={32} className="mt-1 shrink-0" />
            <div className="font-display text-base italic text-text">
              <Markdown>{recapQuery.data.narrative}</Markdown>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
