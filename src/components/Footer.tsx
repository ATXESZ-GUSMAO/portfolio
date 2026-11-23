import { profile } from '../data/content.ts'
import { SocialIcons } from './Icons.tsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a className="mark" href="#inicio">
          <span className="mark-dot" aria-hidden="true" />
          lucas gusmão
        </a>
        <SocialIcons />
        <p className="footer-meta">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <a className="text-link" href="#inicio">
          Voltar ao topo <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
