import { Navigate } from 'react-router-dom'
import { HelpCircle } from 'lucide-react'
import { useAuth } from '../../auth/useAuth'
import { MarketingPageLayout } from '../../components/marketing/MarketingPageLayout'
import { PageHero } from '../../components/marketing/PageHero'
import { FaqAccordion } from '../../components/marketing/FaqAccordion'

export function FaqPage() {
  const { auth } = useAuth()
  if (auth) {
    return <Navigate to={auth.role === 'ANALYST' ? '/fraud' : '/dashboard'} replace />
  }

  return (
    <MarketingPageLayout>
      <PageHero
        title="FAQ & Smart Advice"
        subtitle="The same policies Marigold AI is grounded in when it answers your questions."
        icon={<HelpCircle className="text-marigold-600" size={32} />}
      />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <FaqAccordion />
      </section>
    </MarketingPageLayout>
  )
}
