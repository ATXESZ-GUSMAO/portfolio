import { contact, profile } from '../data/content.ts'
import { useCopy } from '../hooks/useCopy.ts'
import { CheckIcon, CopyIcon, SocialIcons } from './Icons.tsx'

export default function Contact() {
  const { status, copy } = useCopy()
  return (
    <section className="section" id="contato" aria-labelledby="contato-title">
      <div className="container">
        <div className="contact glass" data-reveal>
          <div className="contact-glow" aria-hidden="true" />
          <p className="label">03 — Contato</p>
          <h2 id="contato-title" className="h2 contact-title">
            {profile.availability}. <em className="serif">Vamos conversar.</em>
          </h2>
          <p className="contact-sub">{profile.workModel}.</p>

          <button type="button" className="email-btn" onClick={() => copy(contact.email)}>
            <span className="email-text">{contact.email}</span>
            <span className={`email-ico ${status === 'copied' ? 'is-ok' : ''}`} aria-hidden="true">
              {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
            </span>
            <span className="sr-only">, copiar e-mail</span>
          </button>
          <span className="sr-only" role="status" aria-live="polite">
            {status === 'copied' ? 'E-mail copiado' : status === 'error' ? 'Não foi possível copiar o e-mail' : ''}
          </span>
          <a className="text-link mailto" href={`mailto:${contact.email}`}>
            ou abrir no app de e-mail <span aria-hidden="true">→</span>
          </a>

          <SocialIcons variant="labeled" className="contact-socials" />
        </div>
      </div>
    </section>
  )
}
