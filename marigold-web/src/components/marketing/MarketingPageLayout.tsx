import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { MarketingNav } from './MarketingNav'
import { MarketingFooter } from './MarketingFooter'
import { MarketingUtilityBar } from './MarketingUtilityBar'
import { SimulationBanner } from './SimulationBanner'

export function MarketingPageLayout({ children }: { children: ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const target = document.getElementById(location.hash.slice(1))
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }, [location.pathname, location.hash])

  return (
    <div className="min-h-screen bg-bg">
      <MarketingUtilityBar />
      <SimulationBanner />
      <MarketingNav />
      {children}
      <MarketingFooter />
    </div>
  )
}
