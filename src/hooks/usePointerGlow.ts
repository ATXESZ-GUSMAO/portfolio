import { useCallback, useEffect, useRef } from 'react'
import { prefersReducedMotion } from './useReveal.ts'

/**
 * Brilho que segue o cursor: escreve `--mx`/`--my` direto no elemento,
 * sem estado React, limitado a um update por frame.
 */
export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const frame = useRef(0)

  const onPointerMove = useCallback((e: React.PointerEvent<T>) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${clientX - r.left}px`)
      el.style.setProperty('--my', `${clientY - r.top}px`)
    })
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return { ref, onPointerMove }
}
