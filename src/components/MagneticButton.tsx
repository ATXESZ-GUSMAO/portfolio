import type { ReactNode } from 'react'
import { useMagnetic } from '../hooks/useMagnetic.ts'

type Props = { href: string; children: ReactNode; className?: string }

/** Botão primário com leve atração magnética ao cursor. */
export default function MagneticButton({ href, children, className = '' }: Props) {
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLAnchorElement>()
  return (
    <a ref={ref} href={href} className={`btn btn-primary ${className}`} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {children}
    </a>
  )
}
