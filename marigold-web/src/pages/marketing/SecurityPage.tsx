import { Link, Navigate } from 'react-router-dom'
import { ShieldCheck, FileSearch, MessageCircle, UserCheck } from 'lucide-react'
import { useAuth } from '../../auth/useAuth'
import { MarketingPageLayout } from '../../components/marketing/MarketingPageLayout'
import { PageHero } from '../../components/marketing/PageHero'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export function SecurityPage() {
  const { auth } = useAuth()
  if (auth) {
    return <Navigate to={auth.role === 'ANALYST' ? '/fraud' : '/dashboard'} replace />
  }

  return (
    <MarketingPageLayout>
      <PageHero
        title="Security & Trust"
        subtitle="Every AI feature in Marigold Bank is built around one rule: the model can look, but a human always decides."
        icon={<ShieldCheck className="text-marigold-600" size={32} />}
      />

      <section id="fraud" className="scroll-mt-24 mx-auto max-w-4xl px-4 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <UserCheck className="mt-1 shrink-0 text-leaf-600" size={28} />
          <div>
            <h2 className="font-display text-2xl font-semibold text-text">
              Human-reviewed fraud alerts
            </h2>
            <p className="mt-3 text-text-muted">
              When a transaction looks unusual, Claude scores it for risk and writes a short
              explanation of why — reason codes, a narrative, and a recommended action. Nothing is
              blocked automatically. The alert goes to an analyst queue, where a trained human
              confirms or dismisses it. AI can be confidently wrong; a person always makes the
              final call.
            </p>
          </div>
        </div>
      </section>

      <section id="audit" className="scroll-mt-24 border-t border-border bg-leaf-50">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <FileSearch className="mt-1 shrink-0 text-leaf-600" size={28} />
            <div>
              <h2 className="font-display text-2xl font-semibold text-text">
                Every AI call is logged
              </h2>
              <p className="mt-3 text-text-muted">
                Every prompt, response, token count, and latency — for chat, insights, and fraud
                scoring alike — is recorded to an audit log analysts can search and review. Flagged
                interactions (like a blocked prompt-injection attempt) show up with the reason they
                were flagged. Nothing an AI feature does here happens invisibly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="read-only" className="scroll-mt-24 mx-auto max-w-4xl px-4 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <MessageCircle className="mt-1 shrink-0 text-leaf-600" size={28} />
          <div>
            <h2 className="font-display text-2xl font-semibold text-text">Read-only assistant</h2>
            <p className="mt-3 text-text-muted">
              The AI Assistant can look up your balance and transaction history to answer
              questions, but it has no tool that can move money, open an account, or change a
              setting. Ask it anything — it can only ever look, never act.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-marigold-50">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
          <Card className="flex flex-col items-center gap-3 bg-surface text-center">
            <h2 className="font-display text-xl font-semibold text-text">
              This is a demonstration project
            </h2>
            <p className="text-sm text-text-muted">
              These protections describe how the simulation is designed to behave. Marigold Bank
              doesn't hold real funds and isn't a real financial institution.
            </p>
            <Link to="/register">
              <Button>Open an account</Button>
            </Link>
          </Card>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
