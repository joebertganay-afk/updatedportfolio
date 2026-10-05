import { useEffect, useState, type ReactNode } from 'react'
import { FlowArrow, Robot, Ticket, type Icon } from '@/components/slab'
import { lazy, Suspense } from 'react'
import WorkflowSamples from './WorkflowSamples'
import AIStackGrid from './AIStackGrid'
import { AppsSection } from './Projects'
import { useFunnelModal } from './FunnelModal'
import { websiteFunnel } from '@/data/funnels'

const FunnelBarrel = lazy(() => import('./FunnelBarrel'))

/** Helper to resolve correct base path for GitHub Pages subdirectories */
const getBaseUrl = (path: string): string => {
  const baseUrl = import.meta.env.BASE_URL || '/'
  const cleanPath = path.replace(/^\//, '')
  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`
}

/** Only the strip of macOS windows, drifting on the backdrop. No window. */
export function AutomationsPanel() {
  return (
    <div className="ppanel ppanel--strip">
      <WorkflowSamples />
    </div>
  )
}

/** A plain mac window with a scrolling body for sections that are pages. */
function SectionWindow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ppanel ppanel--window">
      <div className="ppanel__bar">
        <span className="ppanel__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ppanel__url">
          <span className="ppanel__url-host">{label}</span>
        </span>
      </div>
      <div className="ppanel__scroll">{children}</div>
    </div>
  )
}

/** Barrel spinning on the backdrop. */
export function BarrelPanel() {
  const { openFull, modal } = useFunnelModal()
  return (
    <div className="ppanel ppanel--barrel">
      <Suspense fallback={<div className="funnels__barrel-skeleton" aria-hidden="true" />}>
        <FunnelBarrel funnels={websiteFunnel} onOpen={openFull} />
      </Suspense>
      {modal}
    </div>
  )
}

/** Systems grid inside scrolling window. */
export function AIWindow() {
  return (
    <SectionWindow label="Your systems">
      <AIStackGrid />
    </SectionWindow>
  )
}

export function AppsWindow() {
  return (
    <SectionWindow label="Your apps">
      <AppsSection />
    </SectionWindow>
  )
}

/** The main documentation/plan panel. */
export function PlanPanel() {
  return (
    <div className="ppanel ppanel--frame">
      <FrameBar
        host="joebertganay-afk.github.io"
        path="/updatedportfolio/united-guardians-automation"
      />
      <LiveFrame src={getBaseUrl("sample-plan.html")} title="United GUARDIANS Automation Architecture" />
    </div>
  )
}

type Build = { id: string; label: string; src: string; path: string; Icon: Icon }

const BUILDS: Build[] = [
  { 
    id: 'ticket-routing', 
    label: 'Helpdesk SLA & Escalation Flow', 
    src: getBaseUrl("sample-plan.html"), 
    path: '/updatedportfolio/helpdesk-routing-automation', 
    Icon: Ticket 
  },
  { 
    id: 'crm-pipeline', 
    label: 'CRM Lead Pipeline & Automated Outreach', 
    src: getBaseUrl("sample-plan.html"), 
    path: '/updatedportfolio/crm-pipeline-automation', 
    Icon: Robot 
  },
  { 
    id: 'united-guardians', 
    label: 'United GUARDIANS Web Ingestion & Database Automation', 
    src: getBaseUrl("sample-plan.html"), 
    path: '/updatedportfolio/united-guardians-automation', 
    Icon: FlowArrow 
  },
]

/** Individual framed build panels. */
function BuildPanel({ build }: { build: Build }) {
  return (
    <div className="ppanel ppanel--frame">
      <FrameBar host="joebertganay-afk.github.io" path={build.path} />
      <LiveFrame src={build.src} title={build.label} />
    </div>
  )
}

export const TicketingPanel = () => <BuildPanel build={BUILDS[0]} />
export const FrameworkPanel = () => <BuildPanel build={BUILDS[1]} />
export const WorkflowPanel = () => <BuildPanel build={BUILDS[2]} />

function FrameBar({ host, path }: { host: string; path: string }) {
  return (
    <div className="ppanel__bar">
      <span className="ppanel__dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="ppanel__url">
        <span className="ppanel__url-host">{host}</span>
        <span className="ppanel__url-path">{path}</span>
      </span>
    </div>
  )
}

const FRAME_DELAY_MS = 440

function LiveFrame({ src, title }: { src: string; title: string }) {
  const [ready, setReady] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), FRAME_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className="ppanel__stage">
      {!ready && <div className="ppanel__skeleton" aria-hidden="true" />}
      {mounted && (
        <iframe
          className="ppanel__iframe"
          src={src}
          title={title}
          loading="eager"
          onLoad={() => setReady(true)}
          data-ready={ready ? 'true' : 'false'}
        />
      )}
    </div>
  )
}
