import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clsx } from 'clsx'
import type { FraudAlertResponse } from '../../types/fraud'
import { confirmFraudAlert, dismissFraudAlert } from '../../api/fraud'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { StatusBadge } from './StatusBadge'
import { useToast } from '../ui/Toast'
import { Markdown } from '../ui/Markdown'
import { getErrorMessage } from '../../lib/errors'
import { formatDateTime } from '../../lib/formatters'

function riskScoreClass(score: number) {
  if (score >= 70) return 'text-danger-700'
  if (score >= 40) return 'text-warning-700'
  return 'text-leaf-700'
}

export function FraudAlertCard({ alert }: { alert: FraudAlertResponse }) {
  const { showToast } = useToast()
  const queryClient = useQueryClient()

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['fraud', 'alerts'] })

  const confirmMutation = useMutation({
    mutationFn: () => confirmFraudAlert(alert.id),
    onSuccess: () => {
      showToast('Alert confirmed', 'success')
      invalidate()
    },
    onError: (error) => {
      showToast(getErrorMessage(error), 'danger')
      invalidate()
    },
  })

  const dismissMutation = useMutation({
    mutationFn: () => dismissFraudAlert(alert.id),
    onSuccess: () => {
      showToast('Alert dismissed', 'success')
      invalidate()
    },
    onError: (error) => {
      showToast(getErrorMessage(error), 'danger')
      invalidate()
    },
  })

  const isPending = confirmMutation.isPending || dismissMutation.isPending

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-medium text-text">{alert.transactionDescription}</p>
          <p className="text-sm text-text-muted">
            {alert.accountNumber} · {formatDateTime(alert.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={clsx('tabular-nums text-2xl font-semibold', riskScoreClass(alert.riskScore))}>
            {alert.riskScore}
          </span>
          <StatusBadge status={alert.status} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {alert.reasonCodes.map((code) => (
          <Badge key={code} variant="neutral">
            {code}
          </Badge>
        ))}
      </div>

      <div className="text-sm text-text">
        <Markdown>{alert.narrative}</Markdown>
      </div>
      <p className="text-sm font-medium text-marigold-700">Recommended: {alert.recommendedAction}</p>

      {alert.status === 'PENDING' ? (
        <div className="flex gap-3">
          <Button variant="danger" onClick={() => confirmMutation.mutate()} disabled={isPending}>
            Confirm fraud
          </Button>
          <Button variant="ghost" onClick={() => dismissMutation.mutate()} disabled={isPending}>
            Dismiss
          </Button>
        </div>
      ) : (
        <p className="text-sm text-text-muted">
          Reviewed by {alert.reviewedBy} {alert.reviewedAt && `on ${formatDateTime(alert.reviewedAt)}`}
        </p>
      )}
    </Card>
  )
}
