import { apiClient } from './client'
import type { TransactionResponse, TransferRequest } from '../types/banking'

export async function createTransfer(request: TransferRequest): Promise<TransactionResponse> {
  const { data } = await apiClient.post<TransactionResponse>('/transfers', request)
  return data
}
