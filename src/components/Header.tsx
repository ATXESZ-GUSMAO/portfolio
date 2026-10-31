const links = [
  ['#projetos', 'Projetos'],
  ['#stack', 'Stack'],
  ['#experiencia', 'Experiência'],
  ['#contato', 'Contato'],
]

export default function Header() {
  return (
    <header className="top">
      <a className="mark" href="#inicio">
        lucas<span>.</span>gusmao
      </a>
      <nav aria-label="Seções">
        {links.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
