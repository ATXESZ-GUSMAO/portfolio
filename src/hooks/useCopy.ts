import { useCallback, useEffect, useRef, useState } from 'react'

/** Copia texto para a área de transferência; `status` volta a 'idle' após 2s. */
export function useCopy() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const timer = useRef<number>()

  const copy = useCallback(async (text: string) => {
    window.clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(text)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
    timer.current = window.setTimeout(() => setStatus('idle'), 2000)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return { status, copy }
}
