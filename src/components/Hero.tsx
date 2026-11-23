import { contact, profile } from '../data/content.ts'
import { useCopy } from '../hooks/useCopy.ts'
import HeroCanvas from './HeroCanvas'
import { CheckIcon, CopyIcon, SocialIcons } from './Icons.tsx'
import MagneticButton from './MagneticButton.tsx'

export default function Hero() {
  const { status, copy } = useCopy()
  const { before, accent, after } = profile.headline

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <HeroCanvas />

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="pill" data-reveal>
            <span className="pill-dot" aria-hidden="true" />
            {profile.availability} · {profile.location}
          </p>

          <h1 id="hero-title" className="display" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
            <span className="eyebrow">
              {profile.name} — {profile.role}
            </span>
            {before} <em className="serif-accent">{accent}</em>
            {after}
          </h1>

          <p className="lead" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
            {profile.lead}
          </p>

          <div className="hero-actions" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
            <MagneticButton href="#trabalho">
              Ver trabalho <span aria-hidden="true">→</span>
            </MagneticButton>
            <button type="button" className="btn btn-ghost" onClick={() => copy(contact.email)}>
              {status === 'copied' ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              <span className="btn-email">{contact.email}</span>
              <span className="sr-only">, copiar e-mail</span>
            </button>
            <span className="sr-only" role="status" aria-live="polite">
              {status === 'copied' ? 'E-mail copiado' : status === 'error' ? 'Não foi possível copiar o e-mail' : ''}
            </span>
          </div>

          <div data-reveal style={{ '--i': 4 } as React.CSSProperties}>
            <SocialIcons className="hero-socials" />
          </div>
        </div>
      </div>

      <a className="scroll-cue" href="#trabalho">
        role <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}
