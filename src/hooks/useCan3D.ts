import { useEffect, useState } from 'react'

type NavigatorExtras = Navigator & {
  connection?: { saveData?: boolean }
  deviceMemory?: number
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    const ok = !!gl
    ;(gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')?.loseContext()
    return ok
  } catch {
    return false
  }
}

/** Decides whether the 3D hero should run. False until checked on the client. */
export function evaluateCan3D(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const nav = navigator as NavigatorExtras
  if (nav.connection?.saveData) return false
  const cores = nav.hardwareConcurrency ?? 8
  const mem = nav.deviceMemory ?? 8
  if (cores <= 4 && mem <= 4) return false
  return hasWebGL()
}

export function useCan3D(): boolean {
  const [can, setCan] = useState(false)
  useEffect(() => {
    setCan(evaluateCan3D())
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setCan(evaluateCan3D())
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return can
}
