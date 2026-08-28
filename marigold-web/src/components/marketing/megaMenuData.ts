import type { LucideIcon } from 'lucide-react'
import { Wallet, MessageCircle, ShieldCheck, HelpCircle } from 'lucide-react'
import { FAQ_ID } from './FaqAccordion'

export type MegaMenuLink = {
  label: string
  href: string
}

export type MegaMenuColumn = {
  title: string
  links: MegaMenuLink[]
}

export type MegaMenuPromo = {
  icon: LucideIcon
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}

export type MegaMenuCategory = {
  id: string
  label: string
  columns: MegaMenuColumn[]
  promo: MegaMenuPromo
}

export const MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    id: 'accounts',
    label: 'Accounts',
    columns: [
      {
        title: 'Account types',
        links: [
          { label: 'Checking', href: '/learn/accounts#checking' },
          { label: 'Savings', href: '/learn/accounts#savings' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Fee schedule', href: '/learn/accounts#fees' },
          { label: 'Overdraft protection', href: '/learn/accounts#overdraft' },
        ],
      },
    ],
    promo: {
      icon: Wallet,
      title: 'Open your first account',
      description: 'No monthly fees, no minimum deposit.',
      ctaLabel: 'Get started',
      ctaHref: '/register',
    },
  },
  {
    id: 'ai',
    label: 'AI & Insights',
    columns: [
      {
        title: 'Capabilities',
        links: [
          { label: 'AI Assistant', href: '/learn/ai-assistant' },
          { label: 'Spending Insights', href: '/learn/insights' },
        ],
      },
      {
        title: 'How it works',
        links: [
          { label: 'Grounded in your real data', href: '/learn/ai-assistant#how-it-works' },
          { label: 'Read-only, always', href: '/learn/ai-assistant#capabilities' },
        ],
      },
    ],
    promo: {
      icon: MessageCircle,
      title: 'Try the assistant',
      description: 'Ask about your balance, transactions, or policies.',
      ctaLabel: 'Sign in to chat',
      ctaHref: '/login',
    },
  },
  {
    id: 'security',
    label: 'Security & Trust',
    columns: [
      {
        title: 'Protections',
        links: [
          { label: 'Human-reviewed fraud alerts', href: '/learn/security#fraud' },
          { label: 'Full AI audit logging', href: '/learn/security#audit' },
          { label: 'Read-only assistant', href: '/learn/security#read-only' },
        ],
      },
    ],
    promo: {
      icon: ShieldCheck,
      title: 'See how we review AI decisions',
      description: 'Every AI call is logged and auditable.',
      ctaLabel: 'Learn more',
      ctaHref: '/learn/security',
    },
  },
  {
    id: 'faq',
    label: 'FAQ & Smart Advice',
    columns: [
      {
        title: 'Popular questions',
        links: [
          { label: 'How do I open an account?', href: `/learn/faq#${FAQ_ID.openAccount}` },
          { label: 'What happens if I overdraft?', href: `/learn/faq#${FAQ_ID.overdraft}` },
          { label: "What if I don't recognize a transaction?", href: `/learn/faq#${FAQ_ID.dispute}` },
          { label: 'Are there fees to move money?', href: `/learn/faq#${FAQ_ID.fees}` },
          { label: 'Is my money actually safe here?', href: `/learn/faq#${FAQ_ID.safety}` },
        ],
      },
    ],
    promo: {
      icon: HelpCircle,
      title: 'Still have questions?',
      description: 'Browse the full FAQ.',
      ctaLabel: 'View FAQ',
      ctaHref: '/learn/faq',
    },
  },
]
