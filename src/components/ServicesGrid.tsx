import type { CSSProperties } from 'react'
import { MagnetStraight, Timer, Trophy, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot, { TOOLS } from '@/components/Autopilot'

/**
 * ServicesGrid - the Services view on one glass sheet.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Discovery & Triage',
    body: 'Qualifying incoming leads, handling cold outreach, and managing customer inquiries with speed.',
    Icon: MagnetStraight,
    chips: ['Cold Calling', 'Lead Intake', 'Support Triage', 'Data Entry'],
  },
  {
    index: '02',
    label: 'Pipeline & Operations',
    body: 'Structuring pipelines in GoHighLevel or Follow Up Boss and managing Zendesk support tickets.',
    Icon: Timer,
    chips: ['GoHighLevel', 'Follow Up Boss', 'Zendesk', 'Aloware'],
  },
  {
    index: '03',
    label: 'Automation & Compliance',
    body: 'Automating Google Sheets data flows via Apps Script and executing HR/statutory compliance tasks.',
    Icon: Trophy,
    chips: ['Google Apps Script', 'Webhooks', 'Compliance Liaison', 'Reporting'],
  },
]

/* ---------- The services ---------- */

const GHL = '/icons/gohighlevel.png'
const REACT = '/icons/ai/react.svg'
const TAILWIND = '/icons/ai/tailwindcss.svg'
const VITE = '/icons/ai/vite.svg'
const CLOUDFLARE = '/icons/ai/cloudflare.svg'
const N8N = '/icons/ai/n8n.svg'
const OPENAI = '/icons/openai.svg'
const GWS = '/icons/googleworkspace.svg'
const SLACK = '/icons/slack.svg'
const CLAUDE_CODE = '/icons/claude-code-logo.png'
const EXPO = '/icons/ai/expo.svg'
const CHROME = '/icons/ai/googlechrome.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Real Estate Virtual Assistance',
    description: 'End-to-end admin, cold calling outreach, and property listing management for brokerages.',
    chip: 'Real Estate',
    logos: [GHL, GWS, SLACK],
    bullets: [
      'Proactive outbound cold calling & lead qualification',
      'Property listing setup and agency database directory builds',
      'Buyer & seller follow-up sequences in Follow Up Boss',
    ],
  },
  {
    index: '02',
    title: 'Customer & Technical Support',
    description: '10+ years of expertise managing Tier 1 & 2 support and ticket escalation resolution.',
    chip: 'Support',
    logos: [GWS, SLACK, CHROME],
    bullets: [
      'Multichannel customer support via Zendesk & chat',
      'Systematic ticket triage and technical escalation lifecycle',
      'High-satisfaction client communication and account assistance',
    ],
  },
  {
    index: '03',
    title: 'CRM Setup & Operations',
    description: 'Optimization and campaign execution across GoHighLevel, Follow Up Boss, and Zoho.',
    chip: 'CRM Ops',
    logos: [GHL, OPENAI, N8N],
    bullets: [
      'GoHighLevel pipeline, tagging, and workflow customization',
      'Aloware dialer integration and phone system routing',
      'Automated drip campaigns and audience segmentation',
    ],
  },
  {
    index: '04',
    title: 'Apps Script & Sheet Automation',
    description: 'Custom Google Apps Script doPost handlers and webhook integrations directly to Google Sheets.',
    chip: 'Automation',
    logos: [GWS, REACT, TAILWIND],
    bullets: [
      'Web form backend handlers for custom lead collection',
      'Automated data syncing between web inputs and Google Sheets',
      'Custom JavaScript/Apps Script troubleshooting and optimization',
    ],
  },
  {
    index: '05',
    title: 'HR & Government Compliance Liaison',
    description: '4+ years of HR record administration and statutory agency reporting and compliance.',
    chip: 'HR & Admin',
    logos: [GWS, CHROME, SLACK],
    bullets: [
      'Statutory compliance filing and agency liaison work',
      'Employee records management and administrative workflow support',
      'Document verification and operational audit preparation',
    ],
  },
]

/** The tool marks, stacked horizontally on white tiles. */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Specialized Virtual Support, CRM Systems & Automation
        </h1>
        <p className="pgrid__lede">
          Helping real estate agencies, businesses, and teams scale operations with high-efficiency support and custom workflows.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* Step-by-step method plate */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">Your Method</span>
            <h2 className="sgrid__method-title" id="method-title">
              Capture. Convert.
              <br />
              <span>Automate.</span>
            </h2>
            <p className="sgrid__method-sub">
              A structured 3-step operational framework designed to turn cold prospects into qualified leads and streamlined workflows.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five service cards */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">Core Services</h2>
            <p className="sgrid__offers-sub">Proven virtual assistance and technical capabilities tailored for growth.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* Live automation workflow */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Live Automation</span>
              <h2 className="sgrid__flow-title">Automated Lead Ingestion Pipeline</h2>
              <p className="sgrid__flow-sub">
                Watch how web form submissions seamlessly payload into Google Sheets and trigger automated CRM lead tags in real time.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools that power this flow">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}