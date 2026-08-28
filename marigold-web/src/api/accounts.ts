import { apiClient } from './client'
import type { AccountResponse, CreateAccountRequest, TransactionResponse } from '../types/banking'
import type { Page, PageParams } from '../types/pagination'

export async function getAccounts(): Promise<AccountResponse[]> {
  const { data } = await apiClient.get<AccountResponse[]>('/accounts')
  return data
}

export async function getAccount(id: number): Promise<AccountResponse> {
  const { data } = await apiClient.get<AccountResponse>(`/accounts/${id}`)
  return data
}

export async function createAccount(request: CreateAccountRequest): Promise<AccountResponse> {
  const { data } = await apiClient.post<AccountResponse>('/accounts', request)
  return data
}

export async function getTransactions(
  accountId: number,
  params: PageParams = {},
): Promise<Page<TransactionResponse>> {
  const { data } = await apiClient.get<Page<TransactionResponse>>(
    `/accounts/${accountId}/transactions`,
    { params },
  )
  return data
}
