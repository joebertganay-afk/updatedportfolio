import { useMemo } from 'react'

/**
 * ToolsMarquee
 *
 * Horizontally scrolling strip of brand logos + labels for the tools you work with.
 * Icons prepend import.meta.env.BASE_URL to resolve correctly on GitHub Pages subpaths.
 */

type Tool = {
  name: string
  iconPath: string
  /** When set, the SVG silhouette is tinted via CSS mask. Omit for multi-color marks. */
  color?: string
}

export const tools: Tool[] = [
  { name: 'Claude Code',          iconPath: `${import.meta.env.BASE_URL}icons/claude-code-logo.png` },
  { name: 'ChatGPT',              iconPath: `${import.meta.env.BASE_URL}icons/chatgpt.png`,         color: '#10A37F' },
  { name: 'VS Code',              iconPath: `${import.meta.env.BASE_URL}icons/vscode.svg` },
  { name: 'GoHighLevel',          iconPath: `${import.meta.env.BASE_URL}icons/gohighlevel.png` },
  { name: 'Follow Up Boss',       iconPath: `${import.meta.env.BASE_URL}icons/googleworkspace.svg` },
  { name: 'Zoho CRM',             iconPath: `${import.meta.env.BASE_URL}icons/zoho.png` },
  { name: 'CallTools',            iconPath: `${import.meta.env.BASE_URL}icons/calltools.png` },
  { name: 'Zillow',               iconPath: `${import.meta.env.BASE_URL}icons/zillow.png` },
  { name: 'Realtor.com',          iconPath: `${import.meta.env.BASE_URL}icons/realtor.png` },
  { name: 'Redfin',               iconPath: `${import.meta.env.BASE_URL}icons/redfin.png` },
  { name: 'Genesys',              iconPath: `${import.meta.env.BASE_URL}icons/genesys.png` },
  { name: 'Nice CXone',           iconPath: `${import.meta.env.BASE_URL}icons/nice-cxone.png` },
  { name: 'Loom',                 iconPath: `${import.meta.env.BASE_URL}icons/loom.png` },
  { name: 'Skype',                iconPath: `${import.meta.env.BASE_URL}icons/skype.png` },
  { name: 'Microsoft Teams',      iconPath: `${import.meta.env.BASE_URL}icons/teams.png` },
  { name: 'Zoom',                 iconPath: `${import.meta.env.BASE_URL}icons/zoom.png` },
  { name: 'Squarespace',          iconPath: `${import.meta.env.BASE_URL}icons/squarespace.png` },
  { name: 'Google Workspace',     iconPath: `${import.meta.env.BASE_URL}icons/googleworkspace.svg` },
  { name: 'Zendesk',              iconPath: `${import.meta.env.BASE_URL}icons/zendesk.svg`,         color: '#03363D' },
]

export default function ToolsMarquee() {
  // Duplicate the list so the -50% translate lands on a seamless seam.
  const doubled = useMemo(() => [...tools, ...tools], [])

  return (
    <section className="tools-marquee" aria-label="Tools I work with" data-reveal>
      <div className="tools-marquee__track" aria-hidden="true">
        {doubled.map((tool, i) => {
          const useMask = tool.iconPath.endsWith('.svg') && !!tool.color
          return (
            <div key={`${tool.name}-${i}`} className="tools-marquee__item">
              <span className="tools-marquee__tile">
                {useMask ? (
                  <span
                    className="tools-marquee__icon"
                    style={{
                      ['--icon-url' as string]: `url('${tool.iconPath}')`,
                      ['--brand-color' as string]: tool.color ?? 'var(--navy)',
                    }}
                  />
                ) : (
                  <img
                    className="tools-marquee__img"
                    src={tool.iconPath}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    width={32}
                    height={32}
                  />
                )}
              </span>
              <span className="tools-marquee__label">{tool.name}</span>
            </div>
          )
        })}
      </div>

      <ul className="sr-only">
        {tools.map((t) => (
          <li key={t.name}>{t.name}</li>
        ))}
      </ul>
    </section>
  )
}
