import { Link } from 'react-router-dom'
import { Wallet, PiggyBank } from 'lucide-react'
import type { AccountResponse } from '../../types/banking'
import { Card } from '../ui/Card'
import { formatCurrency } from '../../lib/formatters'

export function AccountCard({ account }: { account: AccountResponse }) {
  const Icon = account.type === 'SAVINGS' ? PiggyBank : Wallet
  const maskedNumber = `•••• ${account.accountNumber.slice(-4)}`

  return (
    <Link to={`/accounts/${account.id}`}>
      <Card className="flex flex-col gap-4 transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-text-muted">
            <Icon size={18} />
            <span className="text-sm font-medium capitalize">{account.type.toLowerCase()}</span>
          </div>
          <span className="text-sm text-text-muted">{maskedNumber}</span>
        </div>
        <div className="tabular-nums font-display text-3xl font-semibold text-text">
          {formatCurrency(account.balance, account.currency)}
        </div>
        <span className="text-sm font-medium text-marigold-600">View transactions →</span>
      </Card>
    </Link>
  )
}
