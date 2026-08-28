import type { ReactNode } from 'react'

type PageHeroProps = {
  title: string
  subtitle: string
  icon?: ReactNode
}

export function PageHero({ title, subtitle, icon }: PageHeroProps) {
  return (
    <section className="bg-marigold-50">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-16 text-center">
        {icon}
        <h1 className="font-display text-4xl font-semibold text-text">{title}</h1>
        <p className="max-w-xl text-text-muted">{subtitle}</p>
      </div>
    </section>
  )
}
