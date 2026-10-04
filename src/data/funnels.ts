export type FunnelTag = 'Lead Capture' | 'Booking' | 'Checkout' | 'Website'

export type Funnel = {
  file: string
  label: string
  tag: FunnelTag
  desc: string
  /** Public subfolder the HTML + thumbnail live under. Default 'funnels'. */
  dir?: 'funnels' | 'samples'
}

export const gymFunnel: Funnel[] = [
  {
    file: 'placeholder-funnel-01.html',
    label: 'Real Estate Lead Magnet',
    tag: 'Lead Capture',
    desc: 'High-converting lead capture funnel built for home seller outreach, instantly capturing inquiries into CRM automation.',
  },
  {
    file: 'placeholder-funnel-02.html',
    label: 'Client Onboarding Checkout',
    tag: 'Checkout',
    desc: 'Streamlined service retainer booking and deposit checkout system integrated with automated receipting.',
  },
  {
    file: 'placeholder-funnel-03.html',
    label: 'Property Evaluation Opt-In',
    tag: 'Lead Capture',
    desc: 'Instant home valuation landing page designed to capture seller leads and trigger direct SMS/Email follow-ups.',
  },
]

export const bookingFunnel: Funnel[] = [
  {
    file: 'placeholder-funnel-04.html',
    label: 'Discovery Call Scheduler',
    tag: 'Booking',
    desc: 'Direct calendar integration page for prospect fit calls with automated confirmation and pre-call qualification steps.',
  },
  {
    file: 'placeholder-funnel-05.html',
    label: 'Consultation Booking Page',
    tag: 'Booking',
    desc: 'Multi-step calendar booking funnel tailored for client onboarding and automated timezone resolution.',
  },
  {
    file: 'placeholder-funnel-06.html',
    label: 'Strategy Session Funnel',
    tag: 'Booking',
    desc: 'High-touch consultation scheduler optimized for high-value client acquisition and automated follow-up.',
  },
]

export const websiteFunnel: Funnel[] = [
  {
    file: 'placeholder-site-01.html',
    label: 'Real Estate Agency Portal',
    tag: 'Website',
    desc: 'Full agency site showcasing active property listings, client testimonials, and embedded contact forms.',
    dir: 'samples',
  },
  {
    file: 'placeholder-site-02.html',
    label: 'Virtual Assistant Services',
    tag: 'Website',
    desc: 'Professional service showcase detailing administrative support, CRM management, and technical capabilities.',
    dir: 'samples',
  },
  {
    file: 'placeholder-site-03.html',
    label: 'CRM & Automation Hub',
    tag: 'Website',
    desc: 'Clean, modern landing site designed to highlight workflow automation and GoHighLevel pipeline management.',
    dir: 'samples',
  },
  {
    file: 'placeholder-site-04.html',
    label: 'Property Management Portal',
    tag: 'Website',
    desc: 'Comprehensive real estate management portal for tenant inquiries, maintenance requests, and listings.',
    dir: 'samples',
  },
  {
    file: 'placeholder-site-05.html',
    label: 'Client Consultation Site',
    tag: 'Website',
    desc: 'Boutique consultation showcase built for warm outreach campaigns and inbound client scheduling.',
    dir: 'samples',
  },
  {
    file: 'placeholder-site-06.html',
    label: 'E-Commerce Services Showcase',
    tag: 'Website',
    desc: 'Service portfolio highlighting end-to-end customer support operations and workflow efficiency.',
    dir: 'samples',
  },
]

/**
 * Tag -> color map. Brand-external colors that identify the page type, passed
 * to CSS via an inline --tag-color custom property.
 */
export const tagColors: Record<FunnelTag, string> = {
  'Lead Capture': '#8b5cf6',
  Booking: '#ec4899',
  Checkout: '#f59e0b',
  Website: '#FF7A1A',
}
