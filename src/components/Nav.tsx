import { useEffect, useState } from 'react'
import { useActiveSection } from '../hooks/useReveal.ts'

const links = [
  { id: 'trabalho', label: 'Trabalho' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
]
const ids = links.map((l) => l.id)

export default function Nav() {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="mark" href="#inicio" aria-label="Lucas Gusmão, início">
          <span className="mark-dot" aria-hidden="true" />
          lucas gusmão
        </a>
        <nav aria-label="Principal" className="nav-links">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''} aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-pill" href="#contato">
          Fale comigo
        </a>
      </div>
    </header>
  )
}
