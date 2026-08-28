import { Link, Navigate } from 'react-router-dom'
import { MessageCircle, Database, ShieldOff } from 'lucide-react'
import { useAuth } from '../../auth/useAuth'
import { MarketingPageLayout } from '../../components/marketing/MarketingPageLayout'
import { PageHero } from '../../components/marketing/PageHero'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ChatBubble } from '../../components/chat/ChatBubble'

export function AiAssistantPage() {
  const { auth } = useAuth()
  if (auth) {
    return <Navigate to={auth.role === 'ANALYST' ? '/fraud' : '/dashboard'} replace />
  }

  return (
    <MarketingPageLayout>
      <PageHero
        title="Marigold AI Assistant"
        subtitle="Ask about your accounts or bank policies and get answers grounded in real data, not guesses."
        icon={<MessageCircle className="text-marigold-600" size={32} />}
      />

      <section id="how-it-works" className="scroll-mt-24 mx-auto max-w-4xl px-4 py-16">
        <h2 className="mb-6 text-center font-display text-2xl font-semibold text-text">
          A conversation, not a canned response
        </h2>
        <Card className="mx-auto flex max-w-lg flex-col gap-3">
          <ChatBubble role="user" content="What's my checking account balance?" />
          <ChatBubble role="assistant" content="Your checking account (MB4585149112) currently has a balance of **$2,500.00**." />
          <ChatBubble role="user" content="What happens if I overdraft?" />
          <ChatBubble
            role="assistant"
            content="By default, a transaction that would take your account below $0 is declined at no charge, unless you've opted into overdraft coverage."
          />
        </Card>
      </section>

      <section className="border-t border-border bg-leaf-50">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-16 sm:grid-cols-2">
          <Card>
            <Database className="mb-3 text-leaf-600" size={24} />
            <h3 className="font-display text-lg font-semibold text-text">Grounded, not guessed</h3>
            <p className="mt-2 text-sm text-text-muted">
              Policy questions are answered from Marigold Bank's actual fee schedule, overdraft
              policy, and dispute process — the same documents on this site. Account questions call
              real tools that read your live balance and transaction history, never invented
              numbers.
            </p>
          </Card>
          <Card id="capabilities" className="scroll-mt-24">
            <ShieldOff className="mb-3 text-leaf-600" size={24} />
            <h3 className="font-display text-lg font-semibold text-text">Read-only, always</h3>
            <p className="mt-2 text-sm text-text-muted">
              The assistant can look up your accounts and transactions to answer questions, but it
              has no ability to move money, open accounts, or change anything. Every conversation
              is also logged for the audit trail analysts can review.
            </p>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-marigold-50">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold text-text">Try it yourself</h2>
          <Link to="/login">
            <Button className="px-6 py-3 text-base">Sign in to chat</Button>
          </Link>
        </div>
      </section>
    </MarketingPageLayout>
  )
}
