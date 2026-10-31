import { projects, statusLabel } from '../data/content.ts'

export default function Projects() {
  return (
    <section id="projetos">
      <div className="sec-head">
        <h2>Projetos</h2>
        <p>
          Boa parte do meu código pertence a clientes ou a produtos da empresa, por isso fica em repositórios privados.
          Aqui está o que cada projeto faz e qual foi a minha parte.
        </p>
      </div>

      {projects.map((p) => (
        <article className="project" key={p.name}>
          <div className="meta">
            <span className="eyebrow">{p.area}</span>
            <span className={`chip ${p.status}`}>{statusLabel[p.status]}</span>
          </div>
          <div>
            <h3>{p.name}</h3>
            <p className="what">{p.summary}</p>
            <ul>
              {p.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="stack">
              {p.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            {p.links && (
              <div className="links-row">
                {p.links.map((l) => (
                  <a key={l.href} className="link" href={l.href} target="_blank" rel="noopener">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}
