import { clsx } from 'clsx'
import type { TransactionResponse } from '../../types/banking'
import { TableRow, TableCell } from '../ui/Table'
import { CategoryBadge } from './CategoryBadge'
import { formatCurrency, formatDateTime } from '../../lib/formatters'

export function TransactionRow({ transaction }: { transaction: TransactionResponse }) {
  const isPositive = transaction.amount > 0

  return (
    <TableRow>
      <TableCell className="text-text-muted">{formatDateTime(transaction.occurredAt)}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>
        <CategoryBadge category={transaction.category} />
      </TableCell>
      <TableCell
        className={clsx(
          'tabular-nums text-right font-medium',
          isPositive ? 'text-leaf-600' : 'text-text',
        )}
      >
        {isPositive ? '+' : '−'}
        {formatCurrency(Math.abs(transaction.amount))}
      </TableCell>
    </TableRow>
  )
}
