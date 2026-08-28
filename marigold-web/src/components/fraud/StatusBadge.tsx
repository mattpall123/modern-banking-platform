import { Badge } from '../ui/Badge'
import type { FraudAlertStatus } from '../../types/fraud'

const VARIANT_MAP = {
  PENDING: 'warning',
  CONFIRMED: 'danger',
  DISMISSED: 'neutral',
} as const

export function StatusBadge({ status }: { status: FraudAlertStatus }) {
  return <Badge variant={VARIANT_MAP[status]}>{status}</Badge>
}
