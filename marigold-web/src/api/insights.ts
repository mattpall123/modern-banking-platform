import { apiClient } from './client'
import type { MonthlyRecapResponse } from '../types/insights'

export async function getMonthlyRecap(accountId: number): Promise<MonthlyRecapResponse> {
  const { data } = await apiClient.get<MonthlyRecapResponse>('/ai/insights/monthly-recap', {
    params: { accountId },
  })
  return data
}
