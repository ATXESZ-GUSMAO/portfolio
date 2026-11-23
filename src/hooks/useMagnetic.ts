import { useCallback, useEffect, useRef } from 'react'
import { prefersReducedMotion } from './useReveal.ts'

const MAX = 6

/** Puxa o elemento levemente em direção ao cursor (máx. 6px) e volta ao sair. */
export function useMagnetic<T extends HTMLElement>() {
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
      const dx = ((clientX - (r.left + r.width / 2)) / (r.width / 2)) * MAX
      const dy = ((clientY - (r.top + r.height / 2)) / (r.height / 2)) * MAX
      el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`
    })
  }, [])

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current)
    if (ref.current) ref.current.style.transform = ''
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return { ref, onPointerMove, onPointerLeave }
}
