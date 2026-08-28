import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'

type PaginationProps = {
  page: number
  totalPages: number
  first: boolean
  last: boolean
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, first, last, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-between px-1 py-3">
      <span className="text-sm text-text-muted">
        Page {page + 1} of {totalPages}
      </span>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          disabled={first}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          variant="ghost"
          disabled={last}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  )
}
