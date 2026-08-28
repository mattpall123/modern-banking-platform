import { apiClient } from './client'
import type { FraudAlertResponse, FraudAlertStatus } from '../types/fraud'
import type { Page, PageParams } from '../types/pagination'

export async function getFraudAlerts(
  status: FraudAlertStatus | undefined,
  params: PageParams = {},
): Promise<Page<FraudAlertResponse>> {
  const { data } = await apiClient.get<Page<FraudAlertResponse>>('/fraud/alerts', {
    params: { status, ...params },
  })
  return data
}

export async function confirmFraudAlert(id: number): Promise<FraudAlertResponse> {
  const { data } = await apiClient.post<FraudAlertResponse>(`/fraud/alerts/${id}/confirm`)
  return data
}

export async function dismissFraudAlert(id: number): Promise<FraudAlertResponse> {
  const { data } = await apiClient.post<FraudAlertResponse>(`/fraud/alerts/${id}/dismiss`)
  return data
}
