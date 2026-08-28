import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { AiInteractionLogResponse } from '../../types/audit'
import { TableRow, TableCell } from '../ui/Table'
import { Badge } from '../ui/Badge'
import { formatDateTime, formatLatency } from '../../lib/formatters'

export function AuditLogRow({ entry }: { entry: AiInteractionLogResponse }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <TableRow className="cursor-pointer" onClick={() => setExpanded((v) => !v)}>
        <TableCell>{expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</TableCell>
        <TableCell className="text-text-muted">{formatDateTime(entry.createdAt)}</TableCell>
        <TableCell>{entry.userEmail}</TableCell>
        <TableCell>{entry.feature}</TableCell>
        <TableCell>
          {entry.flagged ? (
            <Badge variant="danger">{entry.flagReason ?? 'Flagged'}</Badge>
          ) : (
            <span className="text-text-muted">—</span>
          )}
        </TableCell>
        <TableCell className="tabular-nums text-text-muted">
          {entry.promptTokens ?? '—'} / {entry.completionTokens ?? '—'}
        </TableCell>
        <TableCell className="tabular-nums text-text-muted">{formatLatency(entry.latencyMs)}</TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={7} className="bg-marigold-50/40">
            <div className="flex flex-col gap-2 text-sm">
              <div>
                <p className="font-medium text-text-muted">Prompt</p>
                <p className="whitespace-pre-wrap text-text">{entry.prompt}</p>
              </div>
              <div>
                <p className="font-medium text-text-muted">Response</p>
                <p className="whitespace-pre-wrap text-text">{entry.response}</p>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
