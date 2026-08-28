import { Link, Navigate } from 'react-router-dom'
import { Wallet, PiggyBank } from 'lucide-react'
import { useAuth } from '../../auth/useAuth'
import { MarketingPageLayout } from '../../components/marketing/MarketingPageLayout'
import { PageHero } from '../../components/marketing/PageHero'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

const FEE_ROWS = [
  ['Monthly maintenance fee', '$0 on Checking and Savings'],
  ['Minimum balance', 'None required'],
  ['Overdraft fee (if enrolled)', '$30 per item, capped at 3 per day'],
  ['Internal transfers', 'Free, unlimited'],
  ['Outgoing wire transfer', '$25 per transfer'],
  ['Incoming wire transfer', 'Free'],
  ['Excess savings withdrawal', '$5 beyond 6 per statement cycle'],
]

export function AccountsPage() {
  const { auth } = useAuth()
  if (auth) {
    return <Navigate to={auth.role === 'ANALYST' ? '/fraud' : '/dashboard'} replace />
  }

  return (
    <MarketingPageLayout>
      <PageHero
        title="Checking & Savings"
        subtitle="Everyday accounts with no monthly fees, built to work with Marigold AI from day one."
      />

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Card id="checking" className="scroll-mt-24">
            <Wallet className="mb-3 text-marigold-600" size={28} />
            <h2 className="font-display text-xl font-semibold text-text">Checking</h2>
            <p className="mt-2 text-sm text-text-muted">
              Your everyday account for spending and transfers. No monthly fee, no minimum balance,
              and instant transfers to your other Marigold accounts.
            </p>
          </Card>
          <Card id="savings" className="scroll-mt-24">
            <PiggyBank className="mb-3 text-marigold-600" size={28} />
            <h2 className="font-display text-xl font-semibold text-text">Savings</h2>
            <p className="mt-2 text-sm text-text-muted">
              Set money aside without a monthly fee. Savings accounts are never eligible for
              overdraft, so there's never a surprise fee on this account.
            </p>
          </Card>
        </div>
      </section>

      <section id="fees" className="scroll-mt-24 border-t border-border bg-leaf-50">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="mb-6 text-center font-display text-2xl font-semibold text-text">Fee schedule</h2>
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <table className="w-full text-sm">
              <tbody>
                {FEE_ROWS.map(([label, value]) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 text-text">{label}</td>
                    <td className="px-5 py-3 text-right font-medium text-text">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="overdraft" className="scroll-mt-24 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="mb-6 text-center font-display text-2xl font-semibold text-text">
            Overdraft protection
          </h2>
          <ul className="flex flex-col gap-4 text-sm text-text-muted">
            <li>
              <strong className="text-text">Not enrolled by default.</strong> A transaction that
              would take your checking account below $0 is simply declined at no charge unless
              you've opted in to overdraft coverage.
            </li>
            <li>
              <strong className="text-text">If you opt in,</strong> Marigold Bank covers
              transactions up to $500 overdrawn. Each overdraft item costs $30, capped at 3 fees
              ($90) per day.
            </li>
            <li>
              <strong className="text-text">21-day window.</strong> Your account needs to return to
              a positive balance within 21 days, or it may be restricted from further debit
              transactions.
            </li>
            <li>
              <strong className="text-text">Savings accounts are never eligible</strong> for
              overdraft coverage.
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-marigold-50">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold text-text">Ready to open an account?</h2>
          <Link to="/register">
            <Button className="px-6 py-3 text-base">Get started</Button>
          </Link>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
