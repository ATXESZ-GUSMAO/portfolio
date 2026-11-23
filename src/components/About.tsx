import { capabilities, cert, education, experience, languages, profile } from '../data/content.ts'

export default function About() {
  return (
    <section className="section" id="sobre" aria-labelledby="sobre-title">
      <div className="container about">
        <div className="about-photo" data-reveal>
          <div className="photo-frame glass">
            <img src="/lucas.jpg" alt="Lucas Gusmão" width={400} height={400} loading="lazy" decoding="async" />
          </div>
        </div>

        <div className="about-body">
          <header className="section-head" data-reveal>
            <p className="label">02 — Sobre</p>
            <h2 id="sobre-title" className="h2">
              Backend que entrega o sistema inteiro.
            </h2>
          </header>
          <p className="body-lg" data-reveal>
            {profile.bio} {profile.move}
          </p>

          <ol className="xp" data-reveal aria-label="Experiência">
            {experience.map((j) => (
              <li key={j.org} className="xp-row">
                <span className={`xp-dot ${j.current ? 'is-current' : ''}`} aria-hidden="true" />
                <span className="xp-role">
                  {j.role} <span className="xp-org">· {j.org}</span>
                </span>
                <span className="xp-when">{j.when}</span>
              </li>
            ))}
          </ol>

          <p className="meta-line" data-reveal>
            {education.course} · {education.org} · {cert.name} ({cert.org}) ·{' '}
            {languages.map((l) => l.name).join(' e ')} {languages[0]?.level}s
          </p>

          <div className="tools" data-reveal>
            <p className="label">Ferramentas</p>
            <p className="tools-line">{capabilities.join('  ·  ')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
