import { contact, whoami } from '../data/content.ts'

export default function Hero() {
  return (
    <div className="hero">
      <div>
        <div className="intro">
          <img className="avatar" src="/lucas.jpg" alt="Foto de Lucas Gusmão" width="88" height="88" />
          <p className="eyebrow">Portfólio · {new Date().getFullYear()}</p>
        </div>
        <h1>
          Lucas
          <br />
          Gusmão<em>.</em>
        </h1>
        <p className="role">Desenvolvedor Full-Stack, com foco em backend</p>
        <p className="lead">
          Construo sistemas web, APIs e ferramentas internas com TypeScript, Node.js e Python. Nos últimos anos
          desenvolvi projetos reais para clientes e para produtos próprios na ATXES Studios, do banco de dados ao
          deploy.
        </p>
        <div className="actions">
          <a className="btn primary" href={contact.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
          <a className="btn" href={contact.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a className="btn" href="#contato">
            Contato
          </a>
        </div>
      </div>

      <div className="whoami" aria-label="Resumo">
        <div className="bar">
          <i />
          <i />
          <i />
          <b>~ whoami</b>
        </div>
        <dl>
          {whoami.map(([k, v]) => (
            <div key={k} style={{ display: 'contents' }}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="prompt">
          <span>$</span> aberto a vagas júnior <span className="cursor" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
