import { MarigoldMark } from './MarigoldMark'

type LogoProps = {
  size?: number
}

export function Logo({ size = 32 }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <MarigoldMark size={size} />
      <span className="font-display text-xl font-semibold text-text">Marigold Bank</span>
    </div>
  )
}
