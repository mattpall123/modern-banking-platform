export type AccountType = 'CHECKING' | 'SAVINGS' | 'SYSTEM'

export type AccountResponse = {
  id: number
  accountNumber: string
  type: AccountType
  currency: string
  balance: number
}

export type CreateAccountRequest = {
  type: AccountType
}

export type TransactionResponse = {
  transactionId: number
  description: string
  category: string | null
  amount: number
  occurredAt: string
}

export type TransferRequest = {
  fromAccountId: number
  toAccountId: number
  amount: number
  description: string
  category?: string | null
}
