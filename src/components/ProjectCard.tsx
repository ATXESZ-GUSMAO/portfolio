import type { CSSProperties } from 'react'
import { statusLabel, type Project } from '../data/content.ts'
import { usePointerGlow } from '../hooks/usePointerGlow.ts'
import { CheckIcon, iconFor, LockIcon, NEW_TAB, NewTab } from './Icons.tsx'

const MAX_CHIPS = 4

function Status({ status }: { status: Project['status'] }) {
  return (
    <span className={`status status-${status}`}>
      {status === 'lock' ? <LockIcon size={13} /> : <span className="status-dot" aria-hidden="true" />}
      {statusLabel[status]}
    </span>
  )
}

function Links({ p }: { p: Project }) {
  if (!p.links?.length && !p.socials?.length) return null
  return (
    <div className="card-links">
      {p.links?.map((l) => (
        <a key={l.href} className="text-link" href={l.href} target="_blank" rel="noopener noreferrer">
          {l.label} <span aria-hidden="true">↗</span>
          <NewTab />
        </a>
      ))}
      {p.socials?.length ? (
        <div className="mini-socials">
          {p.socials.map((s) => {
            const Icon = iconFor(s.label)
            const label = `${s.label} — ${p.name}`
            return (
              <a key={s.href} className="icon-btn icon-btn-sm" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={label + NEW_TAB} title={label}>
                <Icon size={15} />
              </a>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export function FeatureCard({ p }: { p: Project }) {
  const glow = usePointerGlow<HTMLElement>()
  return (
    <article ref={glow.ref} onPointerMove={glow.onPointerMove} className="card card-feature glass" data-reveal>
      <div className="feature-copy">
        <div className="card-meta">
          <span className="label">{p.area}</span>
          <Status status={p.status} />
        </div>
        <h3 className="feature-title">{p.name}</h3>
        <p className="card-summary">{p.summary}</p>
        <ul className="checks">
          {p.highlights.map((h) => (
            <li key={h}>
              <CheckIcon size={16} />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="feature-spec">
        {p.specs?.length ? (
          <dl className="spec" aria-label={`Ficha técnica do ${p.name}`}>
            {p.specs.map(([k, v]) => (
              <div key={k} className="spec-row">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <ul className="chips" aria-label="Stack">
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function ProjectCard({ p, i }: { p: Project; i: number }) {
  const glow = usePointerGlow<HTMLElement>()
  const chips = p.stack.slice(0, MAX_CHIPS)
  const extra = p.stack.length - chips.length
  return (
    <article ref={glow.ref} onPointerMove={glow.onPointerMove} className="card glass" data-reveal style={{ '--i': i } as CSSProperties}>
      <div className="card-meta">
        <span className="label">{p.area}</span>
        <Status status={p.status} />
      </div>
      <h3 className="card-title">{p.name}</h3>
      <p className="card-summary">{p.summary}</p>
      {p.highlights[0] ? <p className="card-note">{p.highlights[0]}</p> : null}
      <ul className="chips" aria-label="Stack">
        {chips.map((s) => (
          <li key={s}>{s}</li>
        ))}
        {extra > 0 ? (
          <li className="chip-more" title={p.stack.slice(MAX_CHIPS).join(', ')}>
            +{extra}
            <span className="sr-only">: {p.stack.slice(MAX_CHIPS).join(', ')}</span>
          </li>
        ) : null}
      </ul>
      <Links p={p} />
    </article>
  )
}
