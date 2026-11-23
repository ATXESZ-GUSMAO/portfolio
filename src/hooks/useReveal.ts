import { useEffect, useLayoutEffect, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Adiciona `.in` aos elementos `[data-reveal]` quando entram na tela.
 * Eles só ficam ocultos quando `<html>` tem `.js-reveal`, colocada aqui antes da pintura
 * e apenas com IntersectionObserver disponível e movimento permitido.
 */
export function useReveal() {
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
    const root = document.documentElement
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    root.classList.add('js-reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      root.classList.remove('js-reveal')
    }
  }, [])
}

/** Seção visível no momento, para marcar o link ativo do menu. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}
