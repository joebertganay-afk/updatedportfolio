import { aiStack, type StackNode } from '@/data/ai-stack'

/**
 * The AI systems as a logo-first grid, for the Projects pop-up.
 */

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/'

type Tool = { name: string; src: string }

const T = {
  claude: { name: 'Claude', src: `${BASE}icons/ai/claude-color.svg` },
  claudeCode: { name: 'Claude Code', src: `${BASE}icons/claude-code-logo.png` },
  openai: { name: 'OpenAI Whisper', src: `${BASE}icons/openai.svg` },
  elevenlabs: { name: 'ElevenLabs', src: `${BASE}icons/ai/elevenlabs.svg` },
  node: { name: 'Node.js', src: `${BASE}icons/ai/nodedotjs.svg` },
  telegram: { name: 'Telegram', src: `${BASE}icons/ai/telegram.svg` },
  slack: { name: 'Slack', src: `${BASE}icons/ai/slack-color.svg` },
  postgres: { name: 'Postgres + pgvector', src: `${BASE}icons/ai/postgresql.svg` },
  sqlite: { name: 'SQLite FTS5', src: `${BASE}icons/ai/sqlite.svg` },
  nous: { name: 'Nous Hermes', src: `${BASE}icons/ai/hermes.svg` },
  docker: { name: 'Docker', src: `${BASE}icons/ai/docker.svg` },
  ghl: { name: 'GoHighLevel', src: `${BASE}icons/gohighlevel.png` },
} satisfies Record<string, Tool>

/** What each system runs on. Keyed by the node id in ai-stack.ts. */
const TOOLS: Record<string, Tool[]> = {
  'project-a': [T.claude],
  'project-b': [T.claude, T.claudeCode],
  'project-c': [T.node, T.elevenlabs, T.openai, T.telegram],
  'project-d': [T.claude, T.claudeCode],
  'project-e': [T.claude, T.postgres, T.slack],
  'project-f': [T.claude, T.sqlite],
  'project-g': [T.claude, T.ghl],
  'project-h': [T.claude, T.elevenlabs],
  'project-i': [T.claude],
  'project-j': [T.nous, T.telegram, T.docker],
  'project-k': [T.nous, T.telegram],
}

/** The harnesses everything above is built with. */
const HARNESS: Tool[] = [
  { name: 'Claude Code', src: `${BASE}icons/claude-code-logo.png` },
  { name: 'Codex', src: `${BASE}icons/ai/codex.svg` },
  { name: 'Cursor', src: `${BASE}icons/ai/cursor.svg` },
  { name: 'Hermes', src: `${BASE}icons/ai/hermes.svg` },
]

type Group = { title: string; what: string; systems: StackNode[] }

function groups(root: StackNode): Group[] {
  return (root.children ?? []).map((branch) => ({
    title: branch.name,
    what: branch.what,
    systems: branch.status ? [branch, ...(branch.children ?? [])] : (branch.children ?? []),
  }))
}

function Card({ n }: { n: StackNode }) {
  const tools = TOOLS[n.id] ?? []
  return (
    <li className="aig__card">
      <div className="aig__marks" aria-label={`Built with ${tools.map((t) => t.name).join(', ')}`}>
        {tools.map((t) => (
          <span key={t.name} className="aig__mark" title={t.name}>
            <img 
              src={t.src} 
              alt={t.name} 
              width={22} 
              height={22} 
              loading="lazy" 
              decoding="async"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
            />
          </span>
        ))}
        {n.status && (
          <span className="aig__status" data-status={n.status}>
            {n.status}
          </span>
        )}
      </div>
      <h4 className="aig__name">
        {n.Icon && <n.Icon size={16} weight="duotone" aria-hidden="true" />}
        {n.name}
      </h4>
      <p className="aig__what">{n.what}</p>
      {n.stack && <p className="aig__stack">{n.stack}</p>}
      {tools.length > 0 && (
        <ul className="aig__tools" role="list">
          {tools.map((t) => (
            <li key={t.name}>{t.name}</li>
          ))}
        </ul>
      )}
    </li>
  )
}

export default function AIStackGrid() {
  return (
    <div className="aig">
      <header className="aig__head">
        <div className="aig__head-text">
          <span className="aig__eyebrow">Placeholder category</span>
          <h3 className="aig__title">{aiStack.what}</h3>
        </div>
        <div className="aig__harness" aria-label="Built with">
          <span className="aig__harness-label">Built with</span>
          {HARNESS.map((t) => (
            <span key={t.name} className="aig__harness-item">
              <img 
                src={t.src} 
                alt={t.name} 
                width={20} 
                height={20} 
                onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
              />
              {t.name}
            </span>
          ))}
        </div>
      </header>

      {groups(aiStack).map((g) => (
        <section key={g.title} className="aig__group" aria-label={g.title}>
          <div className="aig__group-head">
            <h3 className="aig__group-title">{g.title}</h3>
            <p className="aig__group-what">{g.what}</p>
          </div>
          <ul className="aig__cards" role="list">
            {g.systems.map((n) => (
              <Card key={n.id} n={n} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
