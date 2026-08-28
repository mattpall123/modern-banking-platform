import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { CategorySpend } from '../../types/insights'
import { formatCurrency } from '../../lib/formatters'

const PALETTE = [
  '#F5A623',
  '#4C9A5B',
  '#E8A93A',
  '#E0463F',
  '#FFC85E',
  '#2E6238',
  '#DB8B0F',
  '#9B978F',
  '#B06F0A',
  '#3B7D48',
]

export function CategoryBreakdownChart({ data }: { data: CategorySpend[] }) {
  const chartData = data
    .map((item) => ({ category: item.category, amount: Math.abs(item.total) }))
    .sort((a, b) => b.amount - a.amount)

  return (
    <ResponsiveContainer width="100%" height={Math.max(200, chartData.length * 44)}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 16, right: 24 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EFE6D8" />
        <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} fontSize={12} />
        <YAxis type="category" dataKey="category" width={110} fontSize={12} />
        <Tooltip formatter={(value: number) => formatCurrency(value)} />
        <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
          {chartData.map((_, index) => (
            <Cell key={index} fill={PALETTE[index % PALETTE.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
