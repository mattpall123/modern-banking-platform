import { Link } from 'react-router-dom'

export function MarketingUtilityBar() {
  return (
    <div className="bg-marigold-500 text-sm text-white">
      <div className="mx-auto flex max-w-6xl items-stretch justify-between px-4">
        <span className="bg-bg px-4 py-2 font-medium text-marigold-600">Personal</span>
        <div className="flex items-center gap-5">
          <Link to="/learn/security" className="hover:underline">
            Security &amp; Trust
          </Link>
          <Link to="/learn/faq" className="hover:underline">
            FAQ
          </Link>
          <span className="text-marigold-100">Simulation only — no real funds</span>
        </div>
      </div>
    </div>
  )
}
