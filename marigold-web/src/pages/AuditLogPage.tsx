import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAuditLog } from '../api/audit'
import { queryKeys } from '../api/queryKeys'
import { Spinner } from '../components/ui/Spinner'
import { EmptyState } from '../components/ui/EmptyState'
import { Pagination } from '../components/ui/Pagination'
import { Table, TableHead, TableBody, TableRow, TableHeaderCell } from '../components/ui/Table'
import { AuditLogRow } from '../components/audit/AuditLogRow'

export function AuditLogPage() {
  const [flaggedOnly, setFlaggedOnly] = useState(false)
  const [page, setPage] = useState(0)

  const auditQuery = useQuery({
    queryKey: queryKeys.audit.list(flaggedOnly, page),
    queryFn: () => getAuditLog(flaggedOnly, { page, size: 20 }),
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-text">AI Audit Log</h1>
        <label className="flex items-center gap-2 text-sm text-text">
          <input
            type="checkbox"
            checked={flaggedOnly}
            onChange={(e) => {
              setFlaggedOnly(e.target.checked)
              setPage(0)
            }}
            className="h-4 w-4 rounded border-border text-marigold-500 focus:ring-marigold-500"
          />
          Flagged only
        </label>
      </div>

      {auditQuery.isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size={32} />
        </div>
      ) : auditQuery.data && auditQuery.data.content.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell />
                <TableHeaderCell>Time</TableHeaderCell>
                <TableHeaderCell>User</TableHeaderCell>
                <TableHeaderCell>Feature</TableHeaderCell>
                <TableHeaderCell>Flagged</TableHeaderCell>
                <TableHeaderCell>Tokens (in/out)</TableHeaderCell>
                <TableHeaderCell>Latency</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditQuery.data.content.map((entry) => (
                <AuditLogRow key={entry.id} entry={entry} />
              ))}
            </TableBody>
          </Table>
          <Pagination
            page={auditQuery.data.number}
            totalPages={auditQuery.data.totalPages}
            first={auditQuery.data.first}
            last={auditQuery.data.last}
            onPageChange={setPage}
          />
        </>
      ) : (
        <EmptyState title="No interactions logged" description="AI activity will appear here as it happens." />
      )}
    </div>
  )
}
