import { useState } from 'react'
import { contact } from '../data/content.ts'

export default function Contact() {
  const [label, setLabel] = useState('Copiar e-mail')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setLabel('E-mail copiado')
    } catch {
      const el = document.getElementById('mail')
      if (el) {
        const range = document.createRange()
        range.selectNodeContents(el)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
      setLabel('Selecionado, use Ctrl+C')
    }
    setTimeout(() => setLabel('Copiar e-mail'), 2000)
  }

  return (
    <section id="contato">
      <div className="contact">
        <div>
          <h2>Vamos conversar?</h2>
          <p>
            Estou aberto a vagas de desenvolvedor júnior, remotas ou presenciais e híbridas no Sul. Estou me mudando para
            Santa Catarina. Respondo rápido por e-mail ou LinkedIn.
          </p>
        </div>
        <div className="mailbox">
          <span className="eyebrow">E-mail</span>
          <span className="mail" id="mail">
            {contact.email}
          </span>
          <div className="actions" style={{ marginTop: 0 }}>
            <button className="btn primary" type="button" onClick={copy}>
              {label}
            </button>
          </div>
          <div className="links">
            <a href={contact.linkedin} target="_blank" rel="noopener">
              LinkedIn ↗
            </a>
            <a href={contact.github} target="_blank" rel="noopener">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
