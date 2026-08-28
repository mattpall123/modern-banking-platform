import { apiClient } from './client'
import type { AiInteractionLogResponse } from '../types/audit'
import type { Page, PageParams } from '../types/pagination'

export async function getAuditLog(
  flaggedOnly: boolean,
  params: PageParams = {},
): Promise<Page<AiInteractionLogResponse>> {
  const { data } = await apiClient.get<Page<AiInteractionLogResponse>>('/ai/audit', {
    params: { flaggedOnly, ...params },
  })
  return data
}
