import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { ArrowLeftRight, MessageCircle, LineChart } from 'lucide-react'
import { getAccounts, createAccount } from '../api/accounts'
import { queryKeys } from '../api/queryKeys'
import { useAuth } from '../auth/useAuth'
import { AccountCard } from '../components/accounts/AccountCard'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import { useToast } from '../components/ui/Toast'
import { getErrorMessage } from '../lib/errors'

export function DashboardPage() {
  const { auth } = useAuth()
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const { data: accounts, isLoading } = useQuery({
    queryKey: queryKeys.accounts.all(),
    queryFn: getAccounts,
  })

  const openAccountMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.accounts.all() })
      showToast('Account opened', 'success')
    },
    onError: (error) => showToast(getErrorMessage(error), 'danger'),
  })

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-text">Welcome back</h1>
        <p className="text-text-muted">{auth?.email}</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size={32} />
        </div>
      ) : accounts && accounts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No accounts yet"
          description="Open your first account to start banking with Marigold."
          action={
            <div className="flex gap-3">
              <Button
                onClick={() => openAccountMutation.mutate({ type: 'CHECKING' })}
                disabled={openAccountMutation.isPending}
              >
                Open Checking
              </Button>
              <Button
                variant="secondary"
                onClick={() => openAccountMutation.mutate({ type: 'SAVINGS' })}
                disabled={openAccountMutation.isPending}
              >
                Open Savings
              </Button>
            </div>
          }
        />
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link to="/transfer">
          <Card className="flex items-center gap-3 hover:shadow-md">
            <ArrowLeftRight className="text-marigold-500" />
            <span className="font-medium">Transfer money</span>
          </Card>
        </Link>
        <Link to="/chat">
          <Card className="flex items-center gap-3 hover:shadow-md">
            <MessageCircle className="text-marigold-500" />
            <span className="font-medium">Ask Marigold AI</span>
          </Card>
        </Link>
        <Link to="/insights">
          <Card className="flex items-center gap-3 hover:shadow-md">
            <LineChart className="text-marigold-500" />
            <span className="font-medium">View insights</span>
          </Card>
        </Link>
      </div>
    </div>
  )
}
