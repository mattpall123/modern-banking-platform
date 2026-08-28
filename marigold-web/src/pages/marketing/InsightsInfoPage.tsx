import { Link, Navigate } from 'react-router-dom'
import { LineChart, PieChart, Sparkles } from 'lucide-react'
import { useAuth } from '../../auth/useAuth'
import { MarketingPageLayout } from '../../components/marketing/MarketingPageLayout'
import { PageHero } from '../../components/marketing/PageHero'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export function InsightsInfoPage() {
  const { auth } = useAuth()
  if (auth) {
    return <Navigate to={auth.role === 'ANALYST' ? '/fraud' : '/dashboard'} replace />
  }

  return (
    <MarketingPageLayout>
      <PageHero
        title="Spending Insights"
        subtitle="A monthly recap that reads your actual spending and tells you what changed and why."
        icon={<LineChart className="text-marigold-600" size={32} />}
      />

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Card>
            <PieChart className="mb-3 text-marigold-600" size={24} />
            <h3 className="font-display text-lg font-semibold text-text">Category breakdown</h3>
            <p className="mt-2 text-sm text-text-muted">
              See exactly where the last 30 days went — groceries, rent, dining, and everything
              else — ranked by amount.
            </p>
          </Card>
          <Card>
            <LineChart className="mb-3 text-marigold-600" size={24} />
            <h3 className="font-display text-lg font-semibold text-text">Period comparison</h3>
            <p className="mt-2 text-sm text-text-muted">
              Every recap compares this month against the prior 30 days, so a spending spike
              actually looks like one.
            </p>
          </Card>
          <Card>
            <Sparkles className="mb-3 text-marigold-600" size={24} />
            <h3 className="font-display text-lg font-semibold text-text">Written for you</h3>
            <p className="mt-2 text-sm text-text-muted">
              The recap is a short, plain-language summary written by Claude from your real
              numbers — not a template, and nothing invented.
            </p>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-leaf-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="mb-4 font-display text-2xl font-semibold text-text">
            Grounded in your real ledger
          </h2>
          <p className="text-text-muted">
            Insights are computed from your actual transaction history, not a sample. The first
            recap for an account takes a few seconds to generate; after that it's cached instantly
            so you're not waiting every time you check in.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-marigold-50">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold text-text">See your own recap</h2>
          <Link to="/register">
            <Button className="px-6 py-3 text-base">Open an account</Button>
          </Link>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
