import { Link, Navigate } from 'react-router-dom'
import { MessageCircle, LineChart, ShieldCheck, Wallet, FileSearch } from 'lucide-react'
import { useAuth } from '../auth/useAuth'
import { MarketingPageLayout } from '../components/marketing/MarketingPageLayout'
import { FeatureCard } from '../components/marketing/FeatureCard'
import { FaqAccordion } from '../components/marketing/FaqAccordion'
import { MarigoldMark } from '../components/brand/MarigoldMark'
import { Button } from '../components/ui/Button'

const FEATURES = [
  {
    icon: Wallet,
    title: 'Real accounts, real transfers',
    description: 'Open checking and savings accounts and move money between them instantly.',
    to: '/learn/accounts',
  },
  {
    icon: MessageCircle,
    title: 'AI Assistant',
    description:
      "Ask Marigold AI about your accounts or bank policies and get answers grounded in your real data, not guesses.",
    to: '/learn/ai-assistant',
  },
  {
    icon: LineChart,
    title: 'Smart spending insights',
    description: 'A monthly recap that reads your actual spending and tells you what changed and why.',
    to: '/learn/insights',
  },
  {
    icon: ShieldCheck,
    title: 'Fraud protection, human-reviewed',
    description: 'AI flags unusual activity, but a real analyst always makes the final call before anything happens.',
    to: '/learn/security',
  },
]

export function LandingPage() {
  const { auth } = useAuth()

  if (auth) {
    return <Navigate to={auth.role === 'ANALYST' ? '/fraud' : '/dashboard'} replace />
  }

  return (
    <MarketingPageLayout>
      <section className="relative overflow-hidden bg-marigold-50">
        <MarigoldMark size={220} className="absolute -left-16 -top-16 rotate-12 opacity-20" />
        <MarigoldMark size={160} className="absolute -right-10 top-24 -rotate-12 opacity-15" />
        <MarigoldMark size={120} className="absolute bottom-0 left-1/3 opacity-10" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
          <h1 className="font-display text-5xl font-semibold text-text">
            Banking that grows with you.
          </h1>
          <p className="max-w-xl text-lg text-text-muted">
            Marigold Bank pairs real checking and savings accounts with an AI assistant, spending
            insights, and human-reviewed fraud protection — all in one place.
          </p>
          <div className="flex gap-3">
            <Link to="/register">
              <Button className="px-6 py-3 text-base">Open an account</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="px-6 py-3 text-base">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
        <h2 className="mb-2 text-center font-display text-3xl font-semibold text-text">
          Everything you need, nothing you don't
        </h2>
        <p className="mb-10 text-center text-text-muted">
          Built to show what responsible, useful AI in banking actually looks like.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section id="security" className="scroll-mt-24 border-t border-border bg-leaf-50">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <ShieldCheck className="text-leaf-600" size={32} />
            <h2 className="font-display text-2xl font-semibold text-text">
              AI that assists, never decides alone
            </h2>
            <p className="max-w-xl text-text-muted">
              Every AI feature in Marigold Bank is built around the same rule: the model can look, but
              a human always decides.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-xl bg-surface p-5">
              <ShieldCheck className="mb-2 text-leaf-600" size={20} />
              <p className="font-medium text-text">Human-reviewed fraud alerts</p>
              <p className="mt-1 text-sm text-text-muted">
                AI flags unusual transactions, but only a trained analyst can confirm or dismiss one.
              </p>
            </div>
            <div className="rounded-xl bg-surface p-5">
              <FileSearch className="mb-2 text-leaf-600" size={20} />
              <p className="font-medium text-text">Every AI call is logged</p>
              <p className="mt-1 text-sm text-text-muted">
                Prompts, responses, token usage, and latency are recorded for every AI interaction and
                are auditable.
              </p>
            </div>
            <div className="rounded-xl bg-surface p-5">
              <MessageCircle className="mb-2 text-leaf-600" size={20} />
              <p className="font-medium text-text">Read-only assistant</p>
              <p className="mt-1 text-sm text-text-muted">
                Marigold AI can answer questions about your accounts, but it can never move money on
                its own.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link to="/learn/security" className="font-medium text-marigold-600 hover:underline">
              Learn more about security &amp; trust →
            </Link>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20">
          <h2 className="mb-2 text-center font-display text-3xl font-semibold text-text">
            FAQ &amp; Smart Advice
          </h2>
          <p className="mb-10 text-center text-text-muted">
            The same policies Marigold AI is grounded in when it answers your questions.
          </p>
          <FaqAccordion limit={2} />
          <div className="mt-6 text-center">
            <Link to="/learn/faq" className="font-medium text-marigold-600 hover:underline">
              View all FAQs →
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
