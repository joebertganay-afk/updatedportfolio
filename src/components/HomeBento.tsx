import type React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  FolderOpen,
  User,
  Robot,
  Medal,
  Stack,
  Quotes,
  FunnelSimple,
  Gear,
  AddressBook,
  Globe,
  AppWindow,
  SealCheck,
} from '@/components/slab'
import { gymFunnel, bookingFunnel, websiteFunnel, type Funnel } from '@/data/funnels'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { profile } from '@/data/profile'

const thumbSrc = (f: Funnel) =>
  `${import.meta.env.BASE_URL}home/${f.dir ?? 'funnels'}-${f.file.replace('.html', '.jpeg')}`

const PROJECT_SHOTS = [gymFunnel[0], bookingFunnel[0], websiteFunnel[0], gymFunnel[1]].filter(Boolean)

const OFFERS = [
  { Icon: FunnelSimple, title: 'Real Estate Virtual Assistance', note: 'Cold calling & lead nurturing' },
  { Icon: Gear, title: 'Customer & Technical Support', note: '10+ years escalation & troubleshooting' },
  { Icon: AddressBook, title: 'CRM & Pipeline Management', note: 'GoHighLevel, Zoho, Follow Up Boss' },
  { Icon: Globe, title: 'Workflow Automation', note: 'Google Apps Script & integrations' },
  { Icon: AppWindow, title: 'HR & Compliance Liaison', note: 'Statutory compliance & admin support' },
] as const

const CLIENTS = [
  { name: 'Global Brokerages', role: 'Real Estate Operations Lead', work: 'Cold calling · CRM · Pipelines', logo: `${import.meta.env.BASE_URL}placeholders/badge.svg` },
  { name: 'Growth Teams', role: 'Technical Support Specialist', work: 'Zendesk · Ticketing · Escalations', logo: `${import.meta.env.BASE_URL}placeholders/badge.svg` },
  { name: 'Business Owners', role: 'Senior Virtual Assistant', work: 'Data Management · Sales Outreach', logo: `${import.meta.env.BASE_URL}placeholders/badge.svg` },
]

const PHOTOS = [
  profile.avatarSrc,
  `${import.meta.env.BASE_URL}avatar.svg?2`,
  `${import.meta.env.BASE_URL}avatar.svg?3`
]

const leaves = (n: StackNode): StackNode[] =>
  n.children?.length ? n.children.flatMap(leaves) : [n]
const AI_BUILDS = leaves(aiStack)

function CardHead({
  Icon,
  title,
  desc,
}: {
  Icon: typeof FolderOpen
  title: string
  desc: string
}) {
  return (
    <header className="bento__head">
      <span className="bento__label">
        <span className="bento__icon">
          <Icon size={20} weight="fill" aria-hidden="true" />
        </span>
        <h3 className="bento__title">{title}</h3>
      </span>
      <p className="bento__desc">{desc}</p>
      <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
    </header>
  )
}

export default function HomeBento() {
  const half = Math.ceil(AI_BUILDS.length / 2)
  const toolRows = [AI_BUILDS.slice(0, half), AI_BUILDS.slice(half)]

  return (
    <nav className="bento" aria-label="Explore the portfolio">
      {/* Projects */}
      <Link to="/projects" className="bento__card bento__card--projects">
        <CardHead Icon={FolderOpen} title="Projects" desc="Real estate pipelines, outreach campaigns & automation builds." />
        <div className="bento__media bento__reel" aria-hidden="true">
          <div className="bento__reel-track">
            {[...PROJECT_SHOTS, ...PROJECT_SHOTS].map((f, i) => (
              <span key={i} className="bento__shot">
                <img src={thumbSrc(f)} alt="" loading="lazy" decoding="async" />
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* About */}
      <Link to="/about" className="bento__card bento__card--about">
        <CardHead Icon={User} title="About" desc="6+ years in real estate VA & 10+ years in client support." />
        <div className="bento__media bento__fan" aria-hidden="true">
          {PHOTOS.map((src, i) => (
            <span key={src} className="bento__photo" style={{ ['--i' as string]: i }}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      </Link>

      {/* AI Builds */}
      <Link to="/projects" className="bento__card bento__card--ai">
        <CardHead Icon={Robot} title="AI Builds" desc="Custom workflows, Apps Script integrations & Claude prompting." />
        <div className="bento__media bento__chips" aria-hidden="true">
          {toolRows.map((row, r) => (
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
      </Link>

      {/* Credentials */}
      <Link to="/about" className="bento__card bento__card--creds">
        <CardHead Icon={Medal} title="Credentials" desc="Certified GoHighLevel & CRM Operations Specialist." />
        <div className="bento__media bento__badge" aria-hidden="true">
          <span className="bento__badge-ring">
            <img src={`${import.meta.env.BASE_URL}placeholders/badge.svg`} alt="" width={72} height={72} />
          </span>
          <span className="bento__badge-tag">
            <SealCheck size={14} weight="fill" />
            GoHighLevel Certified
          </span>
        </div>
      </Link>

      {/* Services */}
      <Link to="/services" className="bento__card bento__card--services">
        <CardHead Icon={Stack} title="Services" desc="End-to-end virtual assistance and technical support." />
        <ul className="bento__media bento__offers" role="list">
          {OFFERS.map(({ Icon, title, note }, i) => (
            <li key={title} className="bento__offer" style={{ '--i': i } as React.CSSProperties}>
              <span className="bento__offer-tile">
                <Icon size={15} weight="duotone" aria-hidden="true" />
              </span>
              <span className="bento__offer-text">
                <span className="bento__offer-title">{title}</span>
                <span className="bento__offer-note">{note}</span>
              </span>
              <span className="bento__offer-num" aria-hidden="true">
                0{i + 1}
              </span>
            </li>
          ))}
        </ul>
      </Link>

      {/* Testimonials */}
      <Link to="/testimonials" className="bento__card bento__card--quotes">
        <CardHead Icon={Quotes} title="Testimonials" desc="Trusted by fast-moving global brokerages and teams." />
        <div className="bento__media bento__reviews" aria-hidden="true">
          <div className="bento__reviews-track">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="bento__review">
                <span className="bento__review-top">
                  {c.logo ? (
                    <img src={c.logo} alt="" width={18} height={18} />
                  ) : (
                    <Quotes size={14} weight="fill" />
                  )}
                  <b>{c.name}</b>
                </span>
                <span className="bento__review-role">{c.role}</span>
                <span className="bento__review-work">{c.work}</span>
              </span>
            ))}
          </div>
        </div>
      </Link>
    </nav>
  )
}
