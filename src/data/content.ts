export type ProjectStatus = 'live' | 'lock' | 'wip'

export interface Project {
  name: string
  area: string
  status: ProjectStatus
  summary: string
  highlights: string[]
  stack: string[]
  featured?: boolean
  specs?: [string, string][]
  links?: { label: string; href: string }[]
  /** Links exibidos como ícones (redes sociais do projeto). */
  socials?: { label: string; href: string }[]
}

export const statusLabel: Record<ProjectStatus, string> = {
  live: 'no ar',
  lock: 'código privado',
  wip: 'em desenvolvimento',
}

export const profile = {
  name: 'Lucas Gusmão',
  fullName: 'Lucas Gabriel Gusmão',
  role: 'Backend & Full-Stack',
  headline: { before: 'Do modelo de dados ao', accent: 'deploy', after: '.' },
  lead: 'Crio APIs, sistemas internos e automações com TypeScript, Node.js e Python. Fundador da ATXES Studios, onde construo produtos próprios e projetos para clientes já em uso.',
  availability: 'Aberto a vagas júnior',
  location: 'SC / remoto',
  workModel: 'Remoto · híbrido · presencial no Sul',
  move: 'De mudança para Santa Catarina.',
  bio: 'Fundei e lidero a parte técnica da ATXES Studios. Desenvolvo APIs, sistemas internos, bots, sites para clientes e um jogo. Também cuido do contato com clientes e do planejamento das sprints.',
}

export const contact = {
  email: 'devgusmao1@gmail.com',
  linkedin: 'https://linkedin.com/in/lucasgabrielgusmao',
  github: 'https://github.com/ATXESZ-GUSMAO',
  instagram: {
    handle: 'guzd3v',
    href: 'https://www.instagram.com/guzd3v',
  },
}

export const projects: Project[] = [
  {
    name: 'ATXES Vault',
    area: 'Backend · Segurança',
    status: 'lock',
    featured: true,
    summary: 'Cofre digital da empresa: centraliza documentos sensíveis e controla, com auditoria, quem acessa cada um.',
    highlights: [
      'Autenticação em dois fatores (TOTP) para todo o time.',
      'Permissões hierárquicas por módulo, desenhadas pelo princípio do menor privilégio.',
      'Criptografia de campos sensíveis no PostgreSQL e log de auditoria de todas as ações.',
      'Armazenamento de arquivos no Cloudflare R2 e testes end-to-end com Playwright.',
    ],
    specs: [
      ['auth', 'TOTP 2FA'],
      ['rbac', 'hierárquico por módulo'],
      ['db', 'PostgreSQL · campos criptografados'],
      ['storage', 'Cloudflare R2'],
      ['audit', 'log de todas as ações'],
      ['tests', 'Playwright E2E'],
    ],
    stack: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'React', 'Tailwind', 'Playwright', 'Cloudflare R2'],
  },
  {
    name: 'TaskBot',
    area: 'Backend · Automação',
    status: 'lock',
    summary: 'Bot no Telegram que distribui e acompanha as tarefas da equipe sem ninguém sair do chat.',
    highlights: ['Controle de acesso por papéis: administradores criam e atribuem, integrantes recebem e atualizam.'],
    stack: ['Python', 'python-telegram-bot', 'SQLite', 'RBAC'],
  },
  {
    name: 'Fortius Corp',
    area: 'Cliente · Web',
    status: 'live',
    summary: 'Site institucional de uma consultoria financeira, do levantamento de requisitos à publicação.',
    highlights: ['Requisitos definidos direto com o fundador, com captação de leads integrada a um CRM próprio.'],
    stack: ['Next.js', 'React', 'TypeScript'],
    links: [{ label: 'fortiuscorp.com.br', href: 'https://fortiuscorp.com.br' }],
  },
  {
    name: 'Site ATXES Studios',
    area: 'Frontend · Web',
    status: 'live',
    summary: 'Site multipágina da ATXES Studios, com uma área para cada divisão da empresa.',
    highlights: ['Reconstrução completa da arquitetura de rotas e componentes em React, com deploy na Vercel.'],
    stack: ['React', 'Vite', 'TypeScript', 'Framer Motion', 'Vercel'],
    links: [{ label: 'atxes.com.br', href: 'https://atxes.com.br' }],
  },
  {
    name: 'Wake Line',
    area: 'Jogo · Direção técnica',
    status: 'wip',
    summary: 'Jogo narrativo de terror psicológico da ATXES Entertainment, com demo planejada para a Steam.',
    highlights: ['Direção técnica de uma equipe de quatro pessoas, com desenvolvimento em Unity.'],
    stack: ['Unity', 'C#', 'ClickUp'],
    links: [
      { label: 'Página do jogo', href: 'https://www.atxes.com.br/entertainment/wake-line' },
      { label: 'ATXES Entertainment', href: 'https://www.atxes.com.br/entertainment' },
    ],
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/atxes.entertainment' },
      { label: 'X', href: 'https://x.com/atxesent' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@atxesntertainment' },
      { label: 'YouTube', href: 'https://youtube.com/@atxesentertainment' },
    ],
  },
]

export const capabilities = [
  'Node.js',
  'Express',
  'TypeScript',
  'Python',
  'APIs REST',
  '2FA · RBAC',
  'PostgreSQL',
  'SQLite',
  'Cloudflare R2',
  'React',
  'Next.js',
  'Vite',
  'Playwright',
  'Vercel',
  'Git',
  'Figma',
]

export interface Job {
  when: string
  role: string
  org: string
  current?: boolean
}

export const experience: Job[] = [
  { when: 'atual', role: 'Fundador e desenvolvedor', org: 'ATXES Studios', current: true },
  { when: 'dez/2025 – atual', role: 'Estagiário de TI · Service Desk', org: 'Grupo São Roque', current: true },
  { when: 'mar/2024 – jan/2025', role: 'Estagiário de TI', org: 'Câmara Municipal de Feira de Santana' },
]

export const education = {
  course: 'Tecnólogo em ADS',
  org: 'Faculdade Nobre (Unifan)',
}

export const cert = { name: 'Cibersegurança', org: 'DIO + Santander' }

export const languages = [
  { name: 'Inglês', level: 'intermediário' },
  { name: 'Espanhol', level: 'intermediário' },
]
