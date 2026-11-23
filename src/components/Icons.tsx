import type { ReactNode } from 'react'
import { contact } from '../data/content.ts'

type P = { size?: number }

const Svg = ({ size = 18, children }: P & { children: ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {children}
  </svg>
)

export const GitHubIcon = (p: P) => (
  <Svg {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </Svg>
)
export const LinkedInIcon = (p: P) => (
  <Svg {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </Svg>
)
export const InstagramIcon = (p: P) => (
  <Svg {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
  </Svg>
)
export const MailIcon = (p: P) => (
  <Svg {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </Svg>
)
export const XIcon = (p: P) => (
  <Svg {...p}>
    <path d="M4 4l16 16M20 4 4 20" />
  </Svg>
)
export const YouTubeIcon = (p: P) => (
  <Svg {...p}>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="m10 9 5 3-5 3z" />
  </Svg>
)
export const TikTokIcon = (p: P) => (
  <Svg {...p}>
    <path d="M9 12a4 4 0 1 0 4 4V3c.5 2.5 2.5 4.5 5 5" />
  </Svg>
)
export const GlobeIcon = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
  </Svg>
)
export const GamepadIcon = (p: P) => (
  <Svg {...p}>
    <rect x="2" y="6" width="20" height="12" rx="6" />
    <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
  </Svg>
)
export const CheckIcon = (p: P) => (
  <Svg {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
)
export const CopyIcon = (p: P) => (
  <Svg {...p}>
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Svg>
)
export const CapIcon = (p: P) => (
  <Svg {...p}>
    <path d="M22 10 12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </Svg>
)
export const LockIcon = (p: P) => (
  <Svg {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Svg>
)

export const NEW_TAB = ' (abre em nova aba)'

/** Texto oculto visualmente avisando que o link abre em nova aba. */
export const NewTab = () => <span className="sr-only">{NEW_TAB}</span>

export const socials = [
  { name: 'GitHub', label: 'GitHub de Lucas (ATXESZ-GUSMAO)', href: contact.github, handle: 'ATXESZ-GUSMAO', Icon: GitHubIcon, cls: '' },
  { name: 'LinkedIn', label: 'LinkedIn de Lucas (lucasgabrielgusmao)', href: contact.linkedin, handle: 'lucasgabrielgusmao', Icon: LinkedInIcon, cls: '' },
  {
    name: 'Instagram',
    label: `Instagram de Lucas (@${contact.instagram.handle})`,
    href: contact.instagram.href,
    handle: '@' + contact.instagram.handle,
    Icon: InstagramIcon,
    cls: 'ig',
  },
]

export function SocialIcons({ variant = 'icons', className = '' }: { variant?: 'icons' | 'labeled'; className?: string }) {
  if (variant === 'labeled') {
    return (
      <ul className={`social-list ${className}`}>
        {socials.map(({ name, label, href, handle, Icon, cls }) => (
          <li key={name}>
            <a className={`social-link ${cls}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={label + NEW_TAB}>
              <span className="social-ico">
                <Icon />
              </span>
              <span className="social-name">{name}</span>
              <span className="social-handle">{handle}</span>
              <span className="social-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className={`socials ${className}`}>
      {socials.map(({ name, label, href, Icon, cls }) => (
        <a key={name} className={`icon-btn ${cls}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={label + NEW_TAB} title={label}>
          <Icon />
        </a>
      ))}
    </div>
  )
}

export function iconFor(label: string) {
  const l = label.toLowerCase()
  if (l.includes('instagram')) return InstagramIcon
  if (l === 'x') return XIcon
  if (l.includes('tiktok')) return TikTokIcon
  if (l.includes('youtube')) return YouTubeIcon
  if (l.includes('jogo')) return GamepadIcon
  return GlobeIcon
}
