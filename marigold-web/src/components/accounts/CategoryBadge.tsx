import { Badge } from '../ui/Badge'

export function CategoryBadge({ category }: { category: string | null }) {
  if (!category) {
    return <Badge variant="neutral">Uncategorized</Badge>
  }
  return <Badge variant="marigold">{category}</Badge>
}
