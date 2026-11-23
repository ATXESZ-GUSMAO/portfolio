import { projects } from '../data/content.ts'
import { FeatureCard, ProjectCard } from './ProjectCard.tsx'

export default function Work() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return (
    <section className="section" id="trabalho" aria-labelledby="trabalho-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="label">01 — Trabalho</p>
          <h2 id="trabalho-title" className="h2">
            Sistemas em uso, não só no portfólio.
          </h2>
        </header>
        {featured ? <FeatureCard p={featured} /> : null}
        <div className="bento">
          {rest.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
