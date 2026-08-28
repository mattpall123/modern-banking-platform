import { apiClient } from './client'
import type { ChatResponse } from '../types/chat'

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const { data } = await apiClient.post<ChatResponse>('/ai/chat', { message })
  return data
}
