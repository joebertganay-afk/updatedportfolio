import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * Custom / Platform Icon Definitions
 * Adjust filenames below to match your exact filenames inside /public/icons/
 */
const ZENDESK = { src: '/icons/zenddesk.svg', name: 'Zendesk' }
const ZOHO = { src: '/icons/zoho.png', name: 'Zoho' }
const GENESYS = { src: '/icons/genesys.png', name: 'Genesys' }
const NICECXONE = { src: '/icons/nice-cxone.png', name: 'NICE CXone' } // Note: hyphenated if matching nice-cxone.png

const CALLTOOLS = { src: '/icons/calltools.png', name: 'CallTools' }
const ZILLOW = { src: '/icons/zillow.png', name: 'Zillow' }
const REALTOR = { src: '/icons/realtor.png', name: 'Realtor.com' }
const REDFIN = { src: '/icons/redfin.png', name: 'Redfin' }
const GWS = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }
const SKYPE = { src: '/icons/skype.png', name: 'Skype' }

const CHATGPT = { src: '/icons/chatgpt.png', name: 'ChatGPT' }
const CLAUDE = { src: '/icons/claude.png', name: 'Claude' }
const VSCODE = { src: '/icons/vscode.svg', name: 'VS Code' }

const APPS_SCRIPT = { src: '/icons/googleworkspace.svg', name: 'Google Apps Script' }
const GITHUB = { src: '/icons/github.png', name: 'GitHub' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Customer Service & Technical Support (Zendesk, NICE CXone, Zoho, Genesys)',
    marks: [ZENDESK, NICECXONE, ZOHO, GENESYS],
  },
  {
    index: '02',
    title: 'Real Estate Operations (CallTools, Zillow, Realtor, Redfin, Google Workspace, Skype)',
    marks: [CALLTOOLS, ZILLOW, REALTOR, REDFIN, GWS, SKYPE],
  },
  {
    index: '03',
    title: 'AI Prompt Engineering & Code Automation (ChatGPT, Claude, VS Code)',
    marks: [CHATGPT, CLAUDE, VSCODE],
  },
  {
    index: '04',
    title: 'Custom Google Apps Script Development & GitHub Repositories',
    marks: [APPS_SCRIPT, GITHUB],
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}.`}
        </h1>
        <p className="pgrid__lede">
          Virtual Assistant, Customer & Tech Support Specialist, Real Estate Cold Caller & Automation Developer.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            Combining 10+ years of enterprise customer service with real estate pipeline outreach
            <span> and custom Google Apps Script workflow automations.</span>
          </p>

          <p className="agrid__note">
            <strong>Operations & Support Specialist</strong> - Experienced in high-volume omnichannel support, property research platforms, cold calling dialers, and custom script integrations.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={`${m.name}-${i}`}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt="" loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <img src="/icons/googleworkspace.svg" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Apps Script & Workflows</span>
                <span className="agrid__cell-meta">Webhooks & Data Pipeline Automation</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location || 'Philippines'}</span>
                <span className="agrid__cell-meta">US (EST/CST/PST) & AU Shifts</span>
              </span>
            </span>

            <a
              className="agrid__cell agrid__cell--wide"
              href="https://github.com/joebertganay-afk"
              target="_blank"
              rel="noreferrer"
            >
              <span className="agrid__cell-mark agrid__cell-mark--plain">
                <img src="/icons/github.png" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">GitHub Portfolio</span>
                <span className="agrid__cell-meta">@joebertganay-afk</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src="/avatar.svg"
            alt="Joebert Ganay"
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}