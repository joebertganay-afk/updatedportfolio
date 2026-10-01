import { useState } from 'react'
import { Play, Gauge, Robot, Code } from '@/components/slab'
import type { Icon } from '@/components/slab'

/**
 * TestimonialsGrid - the Testimonials view as a fixed viewport.
 */

type Clip = {
  id: string
  index: string
  /** Leave empty until you have the video file in public/testimonials/ */
  src: string
  poster: string
  duration: string
  kicker: string
  width: number
  height: number
}

const CLIPS: Clip[] = [
  {
    id: 'clip-1',
    index: '01',
    src: '',
    poster: '/placeholders/testimonial-1.jpg',
    duration: '0:00',
    kicker: 'Real Estate Brokerage',
    width: 720,
    height: 1080,
  },
  {
    id: 'clip-2',
    index: '02',
    src: '',
    poster: '/placeholders/testimonial-2.jpg',
    duration: '0:00',
    kicker: 'E-Commerce & Tech Client',
    width: 720,
    height: 1080,
  },
]

type Client = {
  index: string
  name: string
  role: string
  daily: string
  work: string[]
  logoSrc?: string
  Icon: Icon
}

const CLIENTS: Client[] = [
  {
    index: '01',
    name: 'Real Estate Group',
    role: 'US Residential Brokerage',
    daily:
      'Engineered cold calling lead discovery pipelines in Follow Up Boss and managed property database outreach across targeted markets.',
    work: ['Cold Calling', 'Follow Up Boss', 'Lead Qualification'],
    logoSrc: '',
    Icon: Gauge,
  },
  {
    index: '02',
    name: 'Virtually Expert & Client Ops',
    role: 'Virtual Operations Partner',
    daily:
      'Handled Tier 1 & 2 customer support tickets in Zendesk and built automated web form handlers in Google Apps Script connecting to Google Sheets.',
    work: ['Zendesk Support', 'Google Apps Script', 'Workflow Automation'],
    logoSrc: '',
    Icon: Robot,
  },
  {
    index: '03',
    name: 'Corporate & Administrative Services',
    role: 'Compliance & HR Operations',
    daily:
      'Managed statutory agency liaison reporting, government filing compliance, and administrative record management.',
    work: ['Statutory Compliance', 'HR Admin', 'Document Verification'],
    logoSrc: '',
    Icon: Code,
  },
]

export default function TestimonialsGrid() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const clip = CLIPS[active]
  const hasVideo = clip.src !== ''
  const pick = (i: number) => {
    setActive(i)
    setPlaying(false)
  }

  return (
    <section className="pgrid tgrid" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Testimonials</span>
        <h1 className="pgrid__title" id="testimonials-title">
          Client Feedback & Proven Results
        </h1>
        <p className="pgrid__lede">
          Hear directly from business owners and view key operational highlights across virtual support and automation.
        </p>
      </header>

      <div className="home__glass tgrid__glass">
        {/* Left: Video Stage */}
        <div className="tgrid__reel">
          <div className="tgrid__stage">
            {playing && hasVideo ? (
              <video
                key={clip.id}
                className="tgrid__video"
                src={clip.src}
                poster={clip.poster}
                width={clip.width}
                height={clip.height}
                controls
                autoPlay
                playsInline
                aria-label={`Video testimonial ${clip.index} from a client`}
              />
            ) : (
              <button
                type="button"
                className="tgrid__cover"
                onClick={() => hasVideo && setPlaying(true)}
                disabled={!hasVideo}
                aria-label={
                  hasVideo
                    ? `Play client testimonial ${clip.index}, ${clip.duration}`
                    : `Client testimonial ${clip.index}, no video added yet`
                }
              >
                <img
                  key={clip.id}
                  className="tgrid__cover-img"
                  src={clip.poster}
                  alt=""
                  decoding="async"
                />
                <span className="tgrid__cover-shade" aria-hidden="true" />
                {hasVideo && (
                  <span className="tgrid__cover-play" aria-hidden="true">
                    <Play size={26} weight="fill" />
                  </span>
                )}
                <span className="tgrid__cover-meta" aria-hidden="true">
                  <span className="tgrid__cover-kicker">
                    {clip.kicker} {clip.index}
                  </span>
                  <span className="tgrid__cover-sub">
                    {hasVideo
                      ? `${clip.duration} · Tap to play`
                      : 'Add your video clip to public/testimonials/'}
                  </span>
                </span>
              </button>
            )}
          </div>

          {/* Video Picker */}
          <div className="tgrid__picker" role="group" aria-label="Choose a testimonial">
            {CLIPS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`tgrid__pick${i === active ? ' is-active' : ''}`}
                onClick={() => pick(i)}
                aria-pressed={i === active}
              >
                <span className="tgrid__pick-thumb" aria-hidden="true">
                  <img src={c.poster} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="tgrid__pick-copy">
                  <span className="tgrid__pick-kicker">Testimonial {c.index}</span>
                  <span className="tgrid__pick-meta">{c.duration}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Client Ledger */}
        <div className="tgrid__ledger">
          <div className="tgrid__ledger-head">
            <h2 className="tgrid__ledger-title">Client Ledger</h2>
            <p className="tgrid__ledger-sub">Key roles and day-to-day deliverables provided across teams.</p>
          </div>

          <ul className="tgrid__clients" role="list">
            {CLIENTS.map((c) => {
              const FallbackIcon = c.Icon
              return (
                <li key={c.index} className="tgrid__client">
                  <span className="tgrid__client-ghost" aria-hidden="true">{c.index}</span>
                  <span className="tgrid__client-mark" aria-hidden="true">
                    {c.logoSrc ? (
                      <img src={c.logoSrc} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <FallbackIcon size={22} weight="duotone" />
                    )}
                  </span>

                  <span className="tgrid__client-body">
                    <span className="tgrid__client-head">
                      <span className="tgrid__client-name">{c.name}</span>
                      <span className="tgrid__client-role">{c.role}</span>
                    </span>
                    <span className="tgrid__client-daily">{c.daily}</span>
                    <ul className="tgrid__client-tags" role="list">
                      {c.work.map((w, i) => (
                        <li key={`${w}-${i}`} className="tgrid__client-tag">
                          {w}
                        </li>
                      ))}
                    </ul>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}