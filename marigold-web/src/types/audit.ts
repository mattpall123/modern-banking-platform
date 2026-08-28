export type AiInteractionLogResponse = {
  id: number
  userEmail: string
  feature: string
  prompt: string
  response: string
  flagged: boolean
  flagReason: string | null
  promptTokens: number | null
  completionTokens: number | null
  latencyMs: number
  createdAt: string
}
