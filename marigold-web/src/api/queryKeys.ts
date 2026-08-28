import type { FraudAlertStatus } from '../types/fraud'

export const queryKeys = {
  accounts: {
    all: () => ['accounts'] as const,
    detail: (id: number) => ['accounts', id] as const,
    transactions: (id: number, page: number) => ['accounts', id, 'transactions', page] as const,
  },
  insights: {
    recap: (accountId: number) => ['insights', 'recap', accountId] as const,
  },
  fraud: {
    list: (status: FraudAlertStatus | undefined, page: number) =>
      ['fraud', 'alerts', status ?? 'ALL', page] as const,
  },
  audit: {
    list: (flaggedOnly: boolean, page: number) => ['audit', 'log', flaggedOnly, page] as const,
  },
}
