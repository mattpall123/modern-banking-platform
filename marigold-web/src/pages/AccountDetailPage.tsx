import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getAccount, getTransactions } from '../api/accounts'
import { queryKeys } from '../api/queryKeys'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import { NotFoundPage } from './NotFoundPage'
import { ForbiddenPage } from './ForbiddenPage'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
} from '../components/ui/Table'
import { Pagination } from '../components/ui/Pagination'
import { TransactionRow } from '../components/accounts/TransactionRow'
import { formatCurrency } from '../lib/formatters'

export function AccountDetailPage() {
  const { id } = useParams<{ id: string }>()
  const accountId = Number(id)
  const [page, setPage] = useState(0)

  const accountQuery = useQuery({
    queryKey: queryKeys.accounts.detail(accountId),
    queryFn: () => getAccount(accountId),
  })

  const transactionsQuery = useQuery({
    queryKey: queryKeys.accounts.transactions(accountId, page),
    queryFn: () => getTransactions(accountId, { page, size: 20 }),
    enabled: accountQuery.isSuccess,
  })

  if (accountQuery.isError) {
    const status = (accountQuery.error as AxiosError).response?.status
    if (status === 403) return <ForbiddenPage />
    if (status === 404) return <NotFoundPage />
  }

  if (accountQuery.isLoading || !accountQuery.data) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size={32} />
      </div>
    )
  }

  const account = accountQuery.data

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm capitalize text-text-muted">{account.type.toLowerCase()} · {account.accountNumber}</p>
          <p className="tabular-nums font-display text-3xl font-semibold text-text">
            {formatCurrency(account.balance, account.currency)}
          </p>
        </div>
        <Link to={`/transfer?from=${account.id}`}>
          <Button>Transfer from this account</Button>
        </Link>
      </Card>

      <div>
        <h2 className="mb-3 font-display text-xl font-semibold text-text">Transaction history</h2>
        {transactionsQuery.isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size={32} />
          </div>
        ) : transactionsQuery.data && transactionsQuery.data.content.length > 0 ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Description</TableHeaderCell>
                  <TableHeaderCell>Category</TableHeaderCell>
                  <TableHeaderCell className="text-right">Amount</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionsQuery.data.content.map((transaction) => (
                  <TransactionRow key={transaction.transactionId} transaction={transaction} />
                ))}
              </TableBody>
            </Table>
            <Pagination
              page={transactionsQuery.data.number}
              totalPages={transactionsQuery.data.totalPages}
              first={transactionsQuery.data.first}
              last={transactionsQuery.data.last}
              onPageChange={setPage}
            />
          </>
        ) : (
          <EmptyState title="No transactions yet" description="Activity on this account will show up here." />
        )}
      </div>
    </div>
  )
}
