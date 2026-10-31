import { experience } from '../data/content.ts'

export default function Experience() {
  return (
    <section id="experiencia">
      <div className="sec-head">
        <h2>Experiência</h2>
      </div>
      <div className="timeline">
        {experience.map((e) => (
          <div className="job" key={e.role + e.org}>
            <div className="when">{e.when}</div>
            <div>
              <h3>{e.role}</h3>
              <div className="org">{e.org}</div>
              <p>{e.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
