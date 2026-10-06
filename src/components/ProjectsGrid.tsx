import { Fragment, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, Ticket, Robot, FlowArrow, CursorClick } from '@/components/slab'
import { FlowIcon, PlanIcon, GlobeIcon, SparkIcon, DeviceIcon } from './ProjectIcons'
import { AutomationsPanel, PlanPanel, TicketingPanel, FrameworkPanel, WorkflowPanel, BarrelPanel, AIWindow, AppsWindow } from './ProjectPanels'
import { gymFunnel, bookingFunnel, websiteFunnel, type Funnel } from '@/data/funnels'
import { mobileApps } from '@/data/projects'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { useIsPhone } from '@/hooks/useMediaQuery'

const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/'

type Project = {
  id: string
  index: string
  title: string
  desc: string
  Icon: ComponentType<{ size?: number }>
  eyebrow: string
  Section: ComponentType
  span?: 2
  kicker?: string
  logos?: string[]
  Preview: ComponentType
  cat: Cat
}

type Cat = 'work' | 'sites' | 'apps' | 'ai'
const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Work' },
  { key: 'sites', label: 'Sites' },
  { key: 'apps', label: 'Apps' },
  { key: 'ai', label: 'AI' },
]

/* Tool marks from /icons */
const GHL = `${BASE}icons/gohighlevel.png`
const CLAUDE_CODE = `${BASE}icons/claude-code-logo.png`
const CODEX = `${BASE}icons/ai/codex.svg`
const HERMES = `${BASE}icons/ai/hermes.svg`
const PLAY = `${BASE}icons/ai/googleplay.svg`
const CHROME = `${BASE}icons/ai/googlechrome.svg`
const EXPO = `${BASE}icons/ai/expo.svg`

const WF_SHOTS = ['project-1.jpg', 'project-2.jpg', 'project-3.jpg', 'project-4.jpg'].map(
  (f) => `${BASE}placeholders/${f}`,
)

const FUNNEL_SHOTS = [gymFunnel[0], bookingFunnel[0], websiteFunnel[0]].filter(Boolean)
const thumbSrc = (f: Funnel) => `${BASE}${f.dir ?? 'funnels'}/thumbs/${f.file.replace('.html', '.jpeg')}`

const APP_SHOTS = [
  ...mobileApps.map((a) => (a.imageSrc ? `${BASE}${a.imageSrc.replace(/^\//, '')}` : null)).filter((s): s is string => !!s),
  `${BASE}placeholders/extension-1.jpg`,
  `${BASE}placeholders/extension-2.jpg`,
]

/** Featured builds stack */
const BUILDS: Project[] = [
  {
    id: 'ticketing',
    cat: 'work',
    index: '03',
    kicker: 'Helpdesk & SLA Operations',
    title: 'Support Escalation & Ticket Routing Flow',
    desc: 'Structured escalation workflows and automated ticket triage configured for multi-channel support dispatch.',
    Icon: () => <Ticket size={20} weight="duotone" />,
    logos: [GHL],
    eyebrow: 'Featured build',
    Section: TicketingPanel,
    Preview: () => null,
  },
  {
    id: 'framework',
    cat: 'ai',
    index: '04',
    kicker: 'CRM & Pipeline Engineering',
    title: 'Automated Lead Ingestion & Follow-Up Engine',
    desc: 'GoHighLevel pipeline automations featuring dynamic form capture, SMS/email sequences, and instant call routing.',
    Icon: () => <Robot size={20} weight="duotone" />,
    logos: [CLAUDE_CODE],
    eyebrow: 'Featured build',
    Section: FrameworkPanel,
    Preview: () => null,
  },
  {
    id: 'workflow',
    cat: 'ai',
    index: '05',
    kicker: 'Google Workspace Backend',
    title: 'United GUARDIANS Automated Ingestion Engine',
    desc: 'Serverless web registration system using Apps Script to route incoming data, generate Drive folders, and maintain multi-wing sheets.',
    Icon: () => <FlowArrow size={20} weight="duotone" />,
    logos: [CLAUDE_CODE, CODEX, HERMES],
    eyebrow: 'Featured build',
    Section: WorkflowPanel,
    Preview: () => null,
  },
]

const leaves = (n: StackNode): StackNode[] => (n.children?.length ? n.children.flatMap(leaves) : [n])
const AI_LEAVES = leaves(aiStack)

/* ---------- Previews ---------- */

function WorkflowsPreview() {
  return (
    <div className="bento__media bento__reel" aria-hidden="true">
      <div className="bento__reel-track">
        {[...WF_SHOTS, ...WF_SHOTS].map((src, i) => (
          <span key={i} className="bento__shot">
            <img src={src} alt="" loading="lazy" decoding="async" />
          </span>
        ))}
      </div>
    </div>
  )
}

function PlanPreview() {
  return (
    <div className="bento__media bento__doc" aria-hidden="true">
      <span className="bento__doc-eyebrow">Standard Operating Procedure</span>
      <span className="bento__doc-title">System Architecture & Data Flow Document</span>
      <span className="bento__doc-flow">
        <i>Web Form</i>
        <i>Apps Script</i>
        <i>Drive Sync</i>
        <i className="is-on">Live Sheet</i>
      </span>
      <span className="bento__doc-line" />
      <span className="bento__doc-line bento__doc-line--short" />
    </div>
  )
}

function FunnelsPreview() {
  return (
    <div className="bento__media bento__fan" aria-hidden="true">
      {FUNNEL_SHOTS.map((f, i) => (
        <span key={f.file} className="bento__photo bento__photo--page" style={{ ['--i' as string]: i }}>
          <img src={thumbSrc(f)} alt="" loading="lazy" decoding="async" />
        </span>
      ))}
    </div>
  )
}

function AIPreview() {
  const half = Math.ceil(AI_LEAVES.length / 2)
  const rows = [AI_LEAVES.slice(0, half), AI_LEAVES.slice(half)]
  return (
    <div className="bento__media bento__chips" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
          <div className="bento__chip-track">
            {[...row, ...row].map((n, i) => (
              <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                <n.Icon size={15} weight="duotone" />
                {n.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function AppsPreview() {
  return (
    <div className="bento__media bento__reel bento__reel--row" aria-hidden="true">
      <div className="bento__reel-track">
        {[...APP_SHOTS, ...APP_SHOTS].map((src, i) => (
          <span key={i} className="bento__shot bento__shot--app">
            <img src={src} alt="" loading="lazy" decoding="async" />
          </span>
        ))}
      </div>
    </div>
  )
}

const PROJECTS: Project[] = [
  {
    id: 'workflows',
    cat: 'work',
    index: '01',
    title: 'Automated Registration & Database Workflows',
    desc: 'Visual walkthrough of the multi-wing web registration interface, automated Google Sheets DB sync, and Drive media storage.',
    Icon: FlowIcon,
    logos: [GHL],
    eyebrow: 'Screenshots',
    Section: AutomationsPanel,
    span: 2,
    Preview: WorkflowsPreview,
  },
  {
    id: 'plan',
    cat: 'work',
    index: '02',
    title: 'Technical Documentation & SOPs',
    desc: 'Comprehensive workflow blueprints, LockService concurrency guides, and Google Apps Script implementation specs.',
    Icon: PlanIcon,
    logos: [GHL],
    eyebrow: 'Sample document',
    Section: PlanPanel,
    Preview: PlanPreview,
  },
  {
    id: 'funnels',
    cat: 'sites',
    index: '06',
    title: 'Landing Pages & Lead Capture Funnels',
    desc: 'Custom-tailored web forms, booking pages, and high-converting sales funnel layouts.',
    Icon: GlobeIcon,
    logos: [GHL],
    eyebrow: 'Pages and sites',
    Section: BarrelPanel,
    Preview: FunnelsPreview,
  },
  {
    id: 'ai',
    cat: 'ai',
    index: '07',
    title: 'Automation & AI Stack',
    desc: 'Core operational engine leverage: Google Apps Script, GoHighLevel, Zendesk, Claude prompt engineering, and webhooks.',
    Icon: SparkIcon,
    logos: [CLAUDE_CODE, CODEX, HERMES],
    eyebrow: 'Systems & Stack',
    Section: AIWindow,
    Preview: AIPreview,
  },
  {
    id: 'apps',
    cat: 'apps',
    index: '08',
    title: 'Web Utilities & Integration Tools',
    desc: 'Custom browser tools, API integrations, and lightweight backends engineered to streamline operations.',
    Icon: DeviceIcon,
    logos: [PLAY, EXPO, CHROME],
    eyebrow: 'Tools & Utilities',
    Section: AppsWindow,
    span: 2,
    Preview: AppsPreview,
  },
]

function Marks({ p, size = 22 }: { p: Project; size?: number }) {
  if (!p.logos?.length) {
    return (
      <span className="bento__icon">
        <p.Icon size={size} />
      </span>
    )
  }
  return (
    <span className="bento__logos" aria-hidden="true">
      {p.logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

function ProjectModal({ project, onClose, children }: { project: Project; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body,
  )
}

export default function ProjectsGrid() {
  const [open, setOpen] = useState<Project | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<Cat | 'all'>('all')
  const keep = (p: Project) => !phone || cat === 'all' || p.cat === cat
  const projects = PROJECTS.filter(keep)
  const builds = BUILDS.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: Project, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const stack = builds.length > 0 ? (
    <div className="bento__stack">
      {builds.map((b) => (
        <button
          key={b.id}
          type="button"
          className="bento__card bento__card--btn bento__card--build"
          onClick={(e) => show(b, e.currentTarget)}
          aria-haspopup="dialog"
        >
          <span className="bento__build-plate">
            {b.logos?.length ? <img src={b.logos[0]} alt="" width={22} height={22} /> : <b.Icon />}
          </span>
          <span className="bento__build-text">
            <span className="bento__kicker">{b.kicker}</span>
            <span className="bento__build-title">{b.title}</span>
            <span className="bento__build-desc">{b.desc}</span>
          </span>
          <span className="bento__build-arrow">
            <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
          </span>
        </button>
      ))}
    </div>
  ) : null

  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Featured Work & Automations</span>
        <h1 className="pgrid__title" id="projects-title">
          Systems Built for Scale, Automation & Operations
        </h1>
        <p className="pgrid__lede">Explore custom Google Apps Script backends, automated CRM pipelines, SLA helpdesk routing, and technical documentation.</p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass">
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Click a card to inspect project
        </span>
        <div className="bento bento--projects">
          {projects.map((p) => (
            <Fragment key={p.id}>
              <button
                type="button"
                className={`bento__card bento__card--btn${p.span === 2 ? ' bento__card--wide' : ''}`}
                data-id={p.id}
                onClick={(e) => show(p, e.currentTarget)}
                aria-haspopup="dialog"
              >
                <span className="bento__head">
                  <Marks p={p} />
                  <span className="bento__title">{p.title}</span>
                  <span className="bento__desc">{p.desc}</span>
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
                </span>
                <p.Preview />
              </button>
              {p.id === 'plan' && stack}
            </Fragment>
          ))}
          {!projects.some((p) => p.id === 'plan') && stack}
        </div>
      </div>

     {open && (
        <ProjectModal project={open} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
