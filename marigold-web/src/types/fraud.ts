export type FraudAlertStatus = 'PENDING' | 'CONFIRMED' | 'DISMISSED'

export type FraudAlertResponse = {
  id: number
  transactionId: number
  transactionDescription: string
  accountId: number
  accountNumber: string
  riskScore: number
  reasonCodes: string[]
  narrative: string
  recommendedAction: string
  status: FraudAlertStatus
  reviewedBy: string | null
  reviewedAt: string | null
  createdAt: string
}
