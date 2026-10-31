import { skills } from '../data/content.ts'

export default function Skills() {
  return (
    <section id="stack">
      <div className="sec-head">
        <h2>Stack</h2>
        <p>O que uso no dia a dia.</p>
      </div>
      <div className="skills">
        {skills.map((s) => (
          <div key={s.group}>
            <h3>{s.group}</h3>
            <ul>
              {s.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
