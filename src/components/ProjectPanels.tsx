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

export function TicketingPanel() {
  return (
    <div className="pmodal__content" style={{ maxWidth: '1120px', margin: '0 auto', padding: '12px 12px 40px' }}>
      <style>{`
        .pmodal__content {
          --panel-bg: #0b1220;
          --panel-card: #111b2f;
          --panel-line: #24334f;
          --panel-text: #e6edf7;
          --panel-muted: #9aaac4;
          --panel-accent: #38bdf8;
          --panel-chip: #16233b;
        }
        .ticketing-wrap { color: var(--panel-text); font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; }
        .ticketing-head { max-width: 68ch; margin-bottom: 40px; }
        .ticketing-head h1 { font-size: clamp(1.8rem, 4vw, 2.5rem); margin: 0 0 12px; color: var(--panel-accent); font-weight: 700; line-height: 1.1; }
        .ticketing-head p { color: var(--panel-muted); font-size: 1.05rem; margin: 0; }
        .t-steps { list-style: none; margin: 0; padding: 0; }
        .t-step { display: grid; grid-template-columns: 56px 1fr; gap: 0 24px; padding-bottom: 48px; }
        .t-step:last-child { padding-bottom: 0; }
        .t-rail { display: flex; flex-direction: column; align-items: center; }
        .t-node { width: 44px; height: 44px; border-radius: 50%; background: var(--panel-accent); color: #06222f; font-weight: 700; font-size: 1.15rem; display: grid; place-items: center; flex: none; }
        .t-rail::after { content: ""; flex: 1; width: 2px; margin-top: 8px; background: linear-gradient(var(--panel-accent), var(--panel-line)); }
        .t-step:last-child .t-rail::after { display: none; }
        .t-step h2 { font-size: 1.4rem; margin: 4px 0 8px; font-weight: 600; color: #fff; }
        .t-lead { color: var(--panel-muted); max-width: 68ch; margin: 0 0 14px; font-size: 0.95rem; }
        .t-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 20px; padding: 0; list-style: none; }
        .t-tags li { background: var(--panel-chip); border: 1px solid var(--panel-line); border-radius: 6px; padding: 3px 10px; font-size: 0.82rem; color: var(--panel-accent); }
        .t-frame { background: var(--panel-card); border: 1px solid var(--panel-line); border-radius: 12px; overflow: hidden; }
        .t-bar { display: flex; gap: 6px; padding: 10px 14px; border-bottom: 1px solid var(--panel-line); align-items: center; }
        .t-bar i { width: 10px; height: 10px; border-radius: 50%; background: #ff5f57; }
        .t-bar i:nth-child(2) { background: #febc2e; }
        .t-bar i:nth-child(3) { background: #28c840; }
        .t-bar span { margin-left: 10px; font-size: 0.78rem; color: var(--panel-muted); }
        .t-figcaption { color: var(--panel-muted); font-size: 0.85rem; padding: 8px 4px 0; }
        .t-ui { background: #fff; color: #2f3941; font-size: 13px; line-height: 1.45; text-align: left; }
        .t-top { background: #03363d; color: #fff; padding: 10px 16px; display: flex; justify-content: space-between; font-weight: 600; }
        .t-top small { font-weight: 400; opacity: 0.8; }
        .t-pill { display: inline-block; border-radius: 10px; padding: 1px 9px; font-size: 11px; font-weight: 600; white-space: nowrap; }
        .t-urgent { background: #fde8e8; color: #b42318; }
        .t-high { background: #fff0d9; color: #b45309; }
        .t-normal { background: #e6f1fb; color: #1f5f99; }
        .t-low { background: #eceff1; color: #5c6970; }
        .t-open { background: #fbe5e1; color: #c0392b; }
        .t-pend { background: #e6f1fb; color: #1f5f99; }
        .t-hold { background: #2f3941; color: #fff; }
        .t-new { background: #fff3c4; color: #8a6d00; }
        .t-solved { background: #e3f4e8; color: #1e7a3c; }
        .t-ui table { width: 100%; border-collapse: collapse; }
        .t-ui th { text-align: left; font-size: 11px; color: #68737d; padding: 8px 14px; border-bottom: 1px solid #d8dcde; background: #f8f9f9; }
        .t-ui td { padding: 9px 14px; border-bottom: 1px solid #eceff1; white-space: nowrap; }
        .t-ui tr.hl td { background: #eef7fd; }
        .t-t { color: #1f73b7; font-weight: 600; }
        .t-mut { color: #68737d; }
        .t-tag { display: inline-block; background: #eceff1; border-radius: 4px; padding: 0 6px; font-size: 11px; margin-right: 4px; }
        .t-grid2 { display: grid; grid-template-columns: 230px 1fr; }
        .t-side { background: #f8f9f9; border-right: 1px solid #d8dcde; padding: 14px; }
        .t-side h4, .t-main h4 { margin: 0 0 8px; font-size: 12px; color: #68737d; font-weight: 600; }
        .t-row { display: flex; justify-content: space-between; gap: 8px; padding: 5px 0; border-bottom: 1px solid #eceff1; }
        .t-row b { font-weight: 600; text-align: right; }
        .t-main { padding: 14px 16px; }
        .t-msg { border: 1px solid #d8dcde; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; }
        .t-msg .who { font-weight: 600; margin-bottom: 2px; }
        .t-msg.note { background: #fff8e1; border-color: #f0d98a; }
        .t-msg.reply { border-color: #1f73b7; }
        .t-btnrow { display: flex; gap: 8px; align-items: center; margin-top: 8px; }
        .t-btn { background: #1f73b7; color: #fff; border-radius: 4px; padding: 4px 12px; font-weight: 600; font-size: 12px; }
        .t-btn.g { background: #fff; color: #2f3941; border: 1px solid #c2c8cc; }
        .t-path { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding: 12px 16px; background: #f8f9f9; border-bottom: 1px solid #d8dcde; }
        .t-path span.b { border: 1px solid #c2c8cc; border-radius: 6px; padding: 4px 12px; background: #fff; font-weight: 600; }
        .t-path span.on { background: #03363d; color: #fff; border-color: #03363d; }
        .t-ev { display: grid; grid-template-columns: 96px 1fr; gap: 4px 12px; padding: 3px 0; }
        .t-ev time { color: #68737d; }
        .t-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
        .t-kpi { border: 1px solid #d8dcde; border-radius: 8px; padding: 10px; text-align: center; }
        .t-kpi b { display: block; font-size: 18px; color: #03363d; }
        .t-scroll { overflow-x: auto; }
        @media (max-width: 820px) {
          .t-step { grid-template-columns: 36px 1fr; gap: 0 14px; }
          .t-node { width: 36px; height: 36px; font-size: 1rem; }
          .t-grid2 { grid-template-columns: 1fr; }
          .t-side { border-right: 0; border-bottom: 1px solid #d8dcde; }
          .t-kpis { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="ticketing-wrap">
        <header className="ticketing-head">
          <h1>Zendesk Ticketing and Escalation Workflow</h1>
          <p>A walkthrough of how one customer ticket moves from intake to escalation to resolution at a fictional internet provider, with Zendesk-style screens showing what each stage looks like.</p>
        </header>

        <ol className="t-steps">
          <li className="t-step">
            <div className="t-rail"><span className="t-node">1</span></div>
            <div>
              <h2>The ticket arrives and is triaged</h2>
              <p className="t-lead">New tickets land in the agent's view from chat, email, the web form and phone callbacks. The agent reads the message, checks the customer's history, then sets the priority and tags so the queue is sorted by urgency and SLA timer.</p>
              <ul className="t-tags"><li>Intake</li><li>Priority</li><li>SLA timers</li></ul>
              <figure>
                <div className="t-frame">
                  <div className="t-bar"><i></i><i></i><i></i><span>support.brightpath-sample.com / views / unsolved</span></div>
                  <div className="t-ui">
                    <div className="t-top"><span>Your unsolved tickets</span><small>5 tickets</small></div>
                    <div className="t-scroll">
                      <table>
                        <thead>
                          <tr><th>Status</th><th>Ticket</th><th>Subject</th><th>Requester</th><th>Priority</th><th>Next SLA</th></tr>
                        </thead>
                        <tbody>
                          <tr><td><span className="t-pill t-open">Open</span></td><td className="t-t">#48402</td><td>Charged twice this month <span className="t-tag">vip</span></td><td>Catalina Esperida</td><td><span className="t-pill t-urgent">Urgent</span></td><td style={{ color: '#b42318', fontWeight: 600 }}>0:08 left</td></tr>
                          <tr className="hl"><td><span className="t-pill t-open">Open</span></td><td className="t-t">#48307</td><td>Internet drops every evening <span className="t-tag">slow_speed</span><span className="t-tag">outage</span></td><td>Ramon Villaluz</td><td><span className="t-pill t-high">High</span></td><td>0:42 left</td></tr>
                          <tr><td><span className="t-pill t-new">New</span></td><td className="t-t">#48361</td><td>Question about plan upgrade</td><td>Lea Tomaquin</td><td><span className="t-pill t-low">Low</span></td><td>6:30 left</td></tr>
                          <tr><td><span className="t-pill t-pend">Pending</span></td><td className="t-t">#48350</td><td>Router light is blinking</td><td>Jun Abellana</td><td><span className="t-pill t-normal">Normal</span></td><td className="t-mut">Waiting on customer</td></tr>
                          <tr><td><span className="t-pill t-open">Open</span></td><td className="t-t">#48213</td><td>Cannot log in to billing portal <span className="t-tag">login_issue</span></td><td>Marisol Dacanay</td><td><span className="t-pill t-normal">Normal</span></td><td>3:15 left</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <figcaption className="t-figcaption">The queue sorted by priority and SLA. The highlighted row is the ticket followed through the next steps.</figcaption>
              </figure>
            </div>
          </li>

          <li className="t-step">
            <div className="t-rail"><span className="t-node">2</span></div>
            <div>
              <h2>The agent works the ticket</h2>
              <p className="t-lead">The agent confirms the account, replies within the first reply target, and records each troubleshooting step as an internal note, so anyone who picks the ticket up later never repeats work or asks the customer the same question twice.</p>
              <ul className="t-tags"><li>Macros</li><li>Internal notes</li><li>Tier 1 troubleshooting</li></ul>
              <figure>
                <div className="t-frame">
                  <div className="t-bar"><i></i><i></i><i></i><span>Ticket #48307 / Internet drops every evening</span></div>
                  <div className="t-ui">
                    <div className="t-grid2">
                      <div className="t-side">
                        <h4>Requester</h4>
                        <div className="t-row"><span>Name</span><b>Ramon Villaluz</b></div>
                        <div className="t-row"><span>Account</span><b>RV-2201</b></div>
                        <div className="t-row"><span>Plan</span><b>300 Mbps</b></div>
                        <div className="t-row"><span>Channel</span><b>Live chat</b></div>
                        <div className="t-row"><span>Past tickets</span><b>2 solved</b></div>
                        <h4 style={{ marginTop: '14px' }}>Ticket</h4>
                        <div className="t-row"><span>Priority</span><b><span className="t-pill t-high">High</span></b></div>
                        <div className="t-row"><span>Status</span><b><span className="t-pill t-open">Open</span></b></div>
                        <div className="t-row"><span>Tags</span><b>slow_speed, outage</b></div>
                      </div>
                      <div className="t-main">
                        <div className="t-msg"><div className="who">Ramon Villaluz <span className="t-mut">7:12 PM</span></div>My internet drops every evening around 7 pm for about 20 minutes. This has gone on for a week and I work from home.</div>
                        <div className="t-msg reply"><div className="who">Support agent <span className="t-mut">7:14 PM</span></div>Hi Ramon, I'm sorry about the disruption, especially while you work. Could you tell me the color of the line light on your modem when the drops happen? I'll check your account while you look.</div>
                        <div className="t-msg note"><div className="who">Internal note <span className="t-mut">7:40 PM</span></div>Account verified. Line light turns steady red during drops. Router restart, modem reset and cable check done, no change. Wired speed test normal outside the drop window.</div>
                        <div className="t-btnrow"><span className="t-btn g">Apply macro: Request modem light status</span><span className="t-btn">Submit as Open</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <figcaption className="t-figcaption">Ticket view with the customer's details on the left and the public replies and internal notes in the thread.</figcaption>
              </figure>
            </div>
          </li>

          <li className="t-step">
            <div className="t-rail"><span className="t-node">3</span></div>
            <div>
              <h2>The case is escalated with a full handoff</h2>
              <p className="t-lead">Tier 1 escalates when troubleshooting is complete and the problem remains, or more than one customer is affected. The agent tags the ticket, reassigns the group, sets it On-hold, writes a handoff note, and tells the customer who owns the issue now.</p>
              <ul className="t-tags"><li>Escalation criteria</li><li>Handoff note</li><li>Group assignment</li></ul>
              <figure>
                <div className="t-frame">
                  <div className="t-bar"><i></i><i></i><i></i><span>Ticket #48307 / Escalation</span></div>
                  <div className="t-ui">
                    <div className="t-path">
                      <span className="b">Tier 1 Support</span>&rarr;<span className="b on">Tier 2 Technical Support</span>&rarr;<span className="b">Network Operations</span>
                      <span className="t-mut" style={{ marginLeft: 'auto' }}>Billing and Team Lead for charges and VIP cases</span>
                    </div>
                    <div className="t-grid2">
                      <div className="t-side">
                        <h4>Updated properties</h4>
                        <div className="t-row"><span>Group</span><b>Tier 2 Technical</b></div>
                        <div className="t-row"><span>Status</span><b><span className="t-pill t-hold">On-hold</span></b></div>
                        <div className="t-row"><span>Priority</span><b><span className="t-pill t-high">High</span></b></div>
                        <div className="t-row"><span>Tags</span><b>escalated_tier2</b></div>
                        <div className="t-row"><span>Linked</span><b>#48261, #48290</b></div>
                      </div>
                      <div className="t-main">
                        <div className="t-msg note">
                          <div className="who">Internal handoff note <span className="t-mut">8:05 PM</span></div>
                          Customer RV-2201, 300 Mbps, wired connection.<br />
                          Drops daily around 7 pm for about 20 minutes, ongoing for 7 days.<br />
                          Steady red line light during drops.<br />
                          Tried: router restart, modem reset, cable check, wired speed test.<br />
                          Two other tickets from the same street in the last 3 days.<br />
                          <b>Request:</b> check line signal levels and maintenance on the local node.
                        </div>
                        <div className="t-msg reply">
                          <div className="who">Public reply <span className="t-mut">8:06 PM</span></div>
                          Ramon, I've passed your case to our Tier 2 technical team with everything we tried, so you won't need to repeat anything. You'll hear from us within 4 hours.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <figcaption className="t-figcaption">The escalation path and the handoff note. The customer is told who owns the case and when to expect an update.</figcaption>
              </figure>
            </div>
          </li>

          <li className="t-step">
            <div className="t-rail"><span className="t-node">4</span></div>
            <div>
              <h2>The issue is resolved and the loop is closed</h2>
              <p className="t-lead">Tier 2 finds the cause, the fix is confirmed with the customer, related tickets are solved together, and the satisfaction survey goes out. The team then reviews the numbers weekly to improve articles, macros and training.</p>
              <ul className="t-tags"><li>Resolution</li><li>CSAT</li><li>Reporting</li></ul>
              <figure>
                <div className="t-frame">
                  <div className="t-bar"><i></i><i></i><i></i><span>Ticket #48307 / Events and satisfaction</span></div>
                  <div className="t-ui">
                    <div className="t-main">
                      <h4>Ticket events</h4>
                      <div className="t-ev"><time>Mon 7:12 PM</time><span>Ticket created from live chat, priority set to High</span></div>
                      <div className="t-ev"><time>Mon 7:14 PM</time><span>First reply sent</span></div>
                      <div className="t-ev"><time>Mon 8:05 PM</time><span>Escalated to Tier 2, status On-hold</span></div>
                      <div className="t-ev"><time>Mon 8:50 PM</time><span>Tier 2 found degraded signal on a shared node, network ticket opened</span></div>
                      <div className="t-ev"><time>Tue 9:30 AM</time><span>Technician repaired the line</span></div>
                      <div className="t-ev"><time>Tue 10:05 AM</time><span>Service credit approved by the Team Lead</span></div>
                      <div className="t-ev"><time>Tue 10:20 AM</time><span>Customer confirmed the connection is stable, ticket <span className="t-pill t-solved">Solved</span></span></div>
                      <div className="t-kpis">
                        <div className="t-kpi"><b>2 min</b>First reply</div>
                        <div className="t-kpi"><b>53 min</b>Time to escalate</div>
                        <div className="t-kpi"><b>5 of 5</b>CSAT rating</div>
                      </div>
                    </div>
                  </div>
                </div>
                <figcaption className="t-figcaption">The ticket's timeline from first contact to solved, with the numbers reviewed each week.</figcaption>
              </figure>
            </div>
          </li>
        </ol>

        <footer style={{ marginTop: '56px', color: 'var(--panel-muted)', fontSize: '0.85rem', borderTop: '1px solid var(--panel-line)', paddingTop: '16px' }}>
          These screens are illustrative mockups in a Zendesk-style layout, created for demonstration. They are not screenshots of a real account. All companies, customers and ticket numbers are fictional.
        </footer>
      </div>
    </div>
  )
}
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
    // Mount the iframe after initial delay
    const mountId = window.setTimeout(() => setMounted(true), FRAME_DELAY_MS)
    
    // Fallback: Force reveal iframe after 1.2s even if onLoad fails to fire
    const readyId = window.setTimeout(() => setReady(true), FRAME_DELAY_MS + 800)

    return () => {
      window.clearTimeout(mountId)
      window.clearTimeout(readyId)
    }
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
