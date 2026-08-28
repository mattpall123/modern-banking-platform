import { useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

type FaqItem = {
  id: string
  question: string
  answer: string
}

export const FAQ_ID = {
  openAccount: 'faq-open-account',
  overdraft: 'faq-overdraft',
  dispute: 'faq-dispute',
  disputeTimeline: 'faq-dispute-timeline',
  lostCard: 'faq-lost-card',
  fees: 'faq-fees',
  safety: 'faq-safety',
} as const

const FAQ_ITEMS: FaqItem[] = [
  {
    id: FAQ_ID.openAccount,
    question: 'How do I open an account?',
    answer:
      'Register for an account, then open a Checking or Savings account right from your dashboard. No minimum opening deposit is required, and there is no monthly maintenance fee on either account type.',
  },
  {
    id: FAQ_ID.overdraft,
    question: 'What happens if I overdraft?',
    answer:
      "By default, a transaction that would take your checking account below $0 is simply declined at no charge. Savings accounts are never eligible for overdraft. There's no surprise fee for an account you haven't opted into overdraft coverage on.",
  },
  {
    id: FAQ_ID.dispute,
    question: "What if I don't recognize a transaction?",
    answer:
      "You can dispute it. Marigold AI can walk you through the process in the Assistant, and disputes are also reviewed by a human analyst — the same human-in-the-loop principle behind our fraud detection.",
  },
  {
    id: FAQ_ID.disputeTimeline,
    question: 'How long does a dispute take?',
    answer:
      "You'll typically see a provisional credit within 10 business days while it's investigated. Most disputes resolve within 45 days — up to 90 days for transactions made outside the country. If it's resolved in your favor, the credit becomes permanent.",
  },
  {
    id: FAQ_ID.lostCard,
    question: 'What if my card or login is lost or stolen?',
    answer:
      "Report it right away. Your liability for unauthorized transactions is $0 if you report it within 2 business days of discovering the loss.",
  },
  {
    id: FAQ_ID.fees,
    question: 'Are there fees to move money?',
    answer:
      'Transfers between your own Marigold Bank accounts are free with no limit. There are no monthly fees on Checking or Savings.',
  },
  {
    id: FAQ_ID.safety,
    question: 'Is my money actually safe here?',
    answer:
      "Marigold Bank is a demonstration project built to explore responsible AI in banking — it doesn't hold real funds and isn't a real financial institution. Everything above describes how the simulation is designed to behave, not real deposit protection.",
  },
]

function openAndScrollToHash() {
  const id = window.location.hash.slice(1)
  if (!id) return
  const target = document.getElementById(id)
  if (target instanceof HTMLDetailsElement) {
    target.open = true
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

type FaqAccordionProps = {
  limit?: number
}

export function FaqAccordion({ limit }: FaqAccordionProps) {
  useEffect(() => {
    openAndScrollToHash()
    window.addEventListener('hashchange', openAndScrollToHash)
    return () => window.removeEventListener('hashchange', openAndScrollToHash)
  }, [])

  const items = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group scroll-mt-24 rounded-xl border border-border bg-surface p-4">
          <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-text">
            {item.question}
            <ChevronDown size={18} className="text-text-muted transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-sm text-text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
