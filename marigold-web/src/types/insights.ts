export type CategorySpend = {
  category: string
  total: number
}

export type MonthlyRecapResponse = {
  accountId: number
  periodStart: string
  periodEnd: string
  totalIncome: number
  totalSpent: number
  netChange: number
  spendingByCategory: CategorySpend[]
  narrative: string
}
