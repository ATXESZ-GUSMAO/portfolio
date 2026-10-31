export type ProjectStatus = 'live' | 'lock' | 'wip'

export interface Project {
  name: string
  area: string
  status: ProjectStatus
  summary: string
  highlights: string[]
  stack: string[]
  links?: { label: string; href: string }[]
}

export const statusLabel: Record<ProjectStatus, string> = {
  live: 'no ar',
  lock: 'código privado',
  wip: 'em desenvolvimento',
}

export const contact = {
  email: 'devgusmao1@gmail.com',
  linkedin: 'https://linkedin.com/in/lucasgabrielgusmao',
  github: 'https://github.com/ATXESZ-GUSMAO',
}

export const whoami: [string, string][] = [
  ['local', 'Feira de Santana, BA'],
  ['formação', 'Análise e Desenv. de Sistemas'],
  ['foco', 'Backend · APIs REST · Full-stack'],
  ['linguagens', 'TypeScript, Python'],
  ['modelo', 'Remoto · híbrido em FSA'],
  ['mudança', 'Disponível'],
]

export const projects: Project[] = [
  {
    name: 'ATXES Vault',
    area: 'Backend · Segurança',
    status: 'lock',
    summary: 'Sistema interno para guardar documentos da empresa e controlar quem acessa cada um.',
    highlights: [
      'Login com autenticação em dois fatores (TOTP).',
      'Permissões hierárquicas por módulo, para cada pessoa ver só o que precisa.',
      'Campos sensíveis criptografados no banco e log de auditoria de todas as ações.',
      'Upload e download de arquivos no Cloudflare R2, com testes de interface em Playwright.',
    ],
    stack: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'React', 'Tailwind', 'Playwright', 'Cloudflare R2'],
  },
  {
    name: 'TaskBot',
    area: 'Backend · Automação',
    status: 'lock',
    summary: 'Bot no Telegram para distribuir e acompanhar tarefas da equipe sem sair do chat.',
    highlights: [
      'Controle de acesso por papéis: administradores criam e atribuem, integrantes recebem e atualizam.',
      'Persistência em SQLite e comandos assíncronos com python-telegram-bot.',
      'Usado no dia a dia pelas equipes de desenvolvimento e de jogos da empresa.',
    ],
    stack: ['Python', 'python-telegram-bot', 'SQLite', 'RBAC'],
  },
  {
    name: 'Fortius Corp',
    area: 'Cliente · Web',
    status: 'live',
    summary: 'Site institucional de uma empresa de consultoria financeira, primeiro projeto entregue a um cliente.',
    highlights: [
      'Levantamento de requisitos direto com o fundador e entrega do site completo.',
      'Estrutura de captação de leads integrada a um CRM próprio.',
    ],
    stack: ['Next.js', 'React', 'TypeScript'],
    links: [{ label: 'fortiuscorp.com.br', href: 'https://fortiuscorp.com.br' }],
  },
  {
    name: 'Site ATXES Studios',
    area: 'Frontend · Web',
    status: 'live',
    summary: 'Site institucional multipágina da empresa, com páginas para cada divisão.',
    highlights: [
      'Arquitetura de rotas e componentes em React, refatorada de correções pontuais até uma reconstrução completa.',
      'Animações com Framer Motion e estilos em CSS Modules.',
      'Deploy na Vercel com domínio próprio configurado.',
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Framer Motion', 'Vercel'],
    links: [{ label: 'atxes.com.br', href: 'https://atxes.com.br' }],
  },
  {
    name: 'Wake Line',
    area: 'Jogo · Direção técnica',
    status: 'wip',
    summary: 'Jogo narrativo de terror psicológico, com demo planejada para a Steam.',
    highlights: [
      'Protótipo jogável feito em Godot 4, hoje em migração para Unity.',
      'Direção técnica, implementação e organização das sprints de uma equipe de quatro pessoas.',
    ],
    stack: ['Godot 4', 'Unity', 'C#', 'ClickUp'],
    links: [
      { label: 'ATXES Entertainment', href: 'https://www.atxes.com.br/entertainment' },
      { label: 'Página do jogo', href: 'https://www.atxes.com.br/entertainment/wake-line' },
      { label: 'Instagram', href: 'https://www.instagram.com/atxes.entertainment' },
      { label: 'X', href: 'https://x.com/atxesent' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@atxesntertainment' },
      { label: 'YouTube', href: 'https://youtube.com/@atxesentertainment' },
    ],
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Backend', items: ['Node.js · Express', 'Python', 'APIs REST', 'Autenticação, 2FA, RBAC'] },
  { group: 'Frontend', items: ['React', 'TypeScript', 'Vite · Next.js', 'Framer Motion'] },
  { group: 'Dados', items: ['PostgreSQL', 'SQLite', 'MongoDB'] },
  { group: 'Ferramentas', items: ['Git · GitHub', 'Vercel', 'Playwright', 'Figma'] },
]

export const experience = [
  {
    when: 'atual',
    role: 'Fundador e desenvolvedor',
    org: 'ATXES Studios',
    text: 'Desenvolvimento de sistemas para clientes e produtos próprios: APIs, painéis internos, sites e um jogo. Também cuido da organização das sprints e da comunicação com clientes.',
  },
  {
    when: 'dez/2025 – atual',
    role: 'Estagiário de TI · Service Desk',
    org: 'Grupo São Roque',
    text: 'Atendimento de chamados, suporte a hardware, software e redes, administração de usuários no AD e suporte a PDVs e sistemas como Winthor TOTVS.',
  },
  {
    when: 'mar/2024 – jan/2025',
    role: 'Estagiário de TI',
    org: 'Câmara Municipal de Feira de Santana',
    text: 'Suporte técnico a usuários, manutenção de equipamentos e configuração de rede.',
  },
  {
    when: 'formação',
    role: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    org: 'Faculdade Nobre (Unifan)',
    text: 'Certificação em Cibersegurança (DIO + Santander) · Inglês e espanhol intermediários.',
  },
]
