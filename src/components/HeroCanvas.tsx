import { useEffect, useRef, useState } from 'react'
import { useCan3D } from '../hooks/useCan3D'
import '../three/heroCanvas.css'

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

/**
 * Decorative 3D particle core for the hero. Always paints a CSS fallback orb;
 * the three.js scene is loaded lazily (idle, after window load) only when the
 * device/user preferences allow it. Place inside a positioned hero container.
 *
 * The <canvas> is created imperatively for every mount: dispose() calls
 * forceContextLoss(), so a canvas must never be reused across mounts
 * (StrictMode / Fast Refresh re-run effects on the same DOM).
 */
export default function HeroCanvas({ className = '' }: { className?: string }) {
  const can3D = useCan3D()
  const hostRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!can3D) return
    const w = window as IdleWindow
    let cancelled = false
    let dispose: (() => void) | undefined
    let canvas: HTMLCanvasElement | undefined
    let idleId: number | undefined
    let timeoutId: number | undefined

    const boot = () => {
      import('../three/coreScene')
        .then(({ mountCore }) => {
          const host = hostRef.current
          if (cancelled || !host) return
          canvas = document.createElement('canvas')
          host.appendChild(canvas)
          dispose = mountCore(canvas, {
            mobile: window.matchMedia('(max-width: 760px)').matches,
            onReady: () => {
              if (!cancelled) setReady(true)
            },
          })
        })
        .catch(() => {
          /* keep the CSS fallback orb */
          canvas?.remove()
          canvas = undefined
        })
    }

    const schedule = () => {
      if (cancelled) return
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(boot, { timeout: 1500 })
      else timeoutId = window.setTimeout(boot, 200)
    }

    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    return () => {
      cancelled = true
      window.removeEventListener('load', schedule)
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      dispose?.()
      canvas?.remove()
      setReady(false)
    }
  }, [can3D])

  return (
    <div ref={hostRef} className={`hero-canvas ${ready ? 'has-3d' : ''} ${className}`.trim()} aria-hidden="true">
      <div className="hero-orb" />
    </div>
  )
}
