type MarigoldMarkProps = {
  size?: number
  className?: string
}

const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]

export function MarigoldMark({ size = 40, className }: MarigoldMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      {PETAL_ANGLES.map((angle, i) => (
        <ellipse
          key={angle}
          cx="50"
          cy="26"
          rx="11"
          ry="20"
          fill={i % 2 === 0 ? 'var(--color-marigold-500)' : 'var(--color-marigold-300)'}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill="var(--color-leaf-500)" />
    </svg>
  )
}
