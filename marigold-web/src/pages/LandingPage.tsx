import { Link, Navigate } from 'react-router-dom'
import {
  MessageCircle,
  LineChart,
  ShieldCheck,
  Wallet,
  FileSearch,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { useAuth } from '../auth/useAuth'
import { MarketingPageLayout } from '../components/marketing/MarketingPageLayout'
import { FeatureCard } from '../components/marketing/FeatureCard'
import { FaqAccordion } from '../components/marketing/FaqAccordion'
import { MarigoldMark } from '../components/brand/MarigoldMark'
import torontoSkyline from '../assets/toronto-skyline.jpg'
import torontoSunset from '../assets/toronto-sunset.jpg'

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

const QUICK_LINKS = [
  { label: 'Open an account', to: '/register' },
  { label: 'Sign on to online banking', to: '/login' },
  { label: 'Ask the AI Assistant', to: '/learn/ai-assistant' },
  { label: 'See your spending insights', to: '/learn/insights' },
  { label: 'How fraud review works', to: '/learn/security' },
  { label: 'Read the FAQ', to: '/learn/faq' },
]

export function LandingPage() {
  const { auth } = useAuth()

  if (auth) {
    return <Navigate to={auth.role === 'ANALYST' ? '/fraud' : '/dashboard'} replace />
  }

  return (
    <MarketingPageLayout>
      <section className="relative z-10 bg-marigold-50">
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${torontoSunset})`, backgroundPosition: 'center 55%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-marigold-50 via-marigold-50/85 to-marigold-500/25" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col items-start gap-5 text-left">
            <h1 className="font-display text-4xl font-semibold leading-tight text-text md:text-5xl">
              Banking that grows with you.
            </h1>
            <p className="max-w-md text-lg text-text-muted">
              Real checking and savings accounts, an AI assistant grounded in your own data, and
              fraud protection a human always signs off on.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="rounded-md bg-marigold-500 px-6 py-3 text-base font-semibold text-white hover:bg-marigold-600"
              >
                Open an account
              </Link>
              <Link to="/learn/accounts" className="flex items-center gap-1 font-semibold text-marigold-700 hover:underline">
                Learn more
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto h-72 w-full max-w-sm md:h-96">
            <Sparkles size={20} className="absolute right-2 top-0 text-marigold-300" />
            <Sparkles size={14} className="absolute left-8 top-10 text-marigold-300" />
            <Sparkles size={16} className="absolute bottom-24 right-16 text-white/70" />

            <div className="absolute left-0 top-6 w-64 rounded-2xl bg-marigold-500 p-5 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide">MARIGOLD DEBIT</span>
                <MarigoldMark size={22} />
              </div>
              <div className="mt-9 h-5 w-8 rounded-sm bg-white/40" />
              <p className="mt-5 font-mono text-base tracking-widest">•••• •••• •••• 4521</p>
              <div className="mt-4 flex items-center justify-between text-[11px]">
                <span>A CUSTOMER</span>
                <span>VALID THRU 12/29</span>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 w-64 rounded-2xl bg-gradient-to-br from-leaf-600 to-leaf-800 p-5 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide">MARIGOLD SAVINGS</span>
                <MarigoldMark size={22} />
              </div>
              <div className="mt-9 h-5 w-8 rounded-sm bg-white/40" />
              <p className="mt-5 font-mono text-base tracking-widest">•••• •••• •••• 8890</p>
              <div className="mt-4 flex items-center justify-between text-[11px]">
                <span>A CUSTOMER</span>
                <span>VALID THRU 12/29</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-semibold tracking-wide text-marigold-700">
          WELCOME TO MARIGOLD BANK
        </p>
        <h2 className="mt-1 font-display text-3xl font-semibold text-text md:text-4xl">
          Do more with your money
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
          <div className="rounded-md border border-border p-5">
            <h3 className="mb-3 text-sm font-semibold text-text">Quick links</h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-marigold-700 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="relative flex flex-col justify-between overflow-hidden rounded-md p-6 text-white">
              <div
                className="absolute inset-0 bg-cover"
                style={{ backgroundImage: `url(${torontoSkyline})`, backgroundPosition: 'center 75%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-marigold-700/90 via-marigold-700/50 to-marigold-700/10" />
              <MessageCircle size={26} className="relative" />
              <div className="relative mt-8">
                <p className="font-display text-xl font-semibold">Ask Marigold AI anything</p>
                <p className="mt-2 text-sm text-marigold-50">
                  Grounded in your real accounts and bank policy — never a guess.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-md bg-leaf-700 p-6 text-white">
              <ShieldCheck size={26} />
              <div className="mt-8">
                <p className="font-display text-xl font-semibold">Fraud caught, human-reviewed</p>
                <p className="mt-2 text-sm text-leaf-50">
                  AI flags it. A trained analyst always makes the final call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-2 font-display text-2xl font-semibold text-text">Explore your options</h2>
          <p className="mb-10 text-text-muted">
            Built to show what responsible, useful AI in banking actually looks like.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
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
