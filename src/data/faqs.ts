export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I provide end-to-end Virtual Assistant, Customer Support, and Technical Support services. I specialize in CRM management, sales outreach, data entry, client support ticketing, and workflow automation for growing businesses and real estate teams.',
  },
  {
    q: 'How fast can you start?',
    a: 'I am available to onboard immediately for both part-time and full-time roles. Depending on your platform requirements, I can typically integrate into your existing workflow within 24 to 48 hours.',
  },
  {
    q: 'How much do you charge?',
    a: 'My rates are flexible and tailored to project scope, offering hourly rates, monthly retainers, or dedicated weekly packages. Contact me directly to discuss custom pricing for your specific operational needs.',
  },
  {
    q: 'Where are you based?',
    a: 'I am based in the Philippines and fully equipped for remote collaboration across international timezones. I regularly align my hours with US (EST, CST, PST) and Australian business schedules.',
  },
  {
    q: 'What happens after I write?',
    a: 'I respond to messages within a few hours. We can schedule a brief fit call or discuss project requirements directly over email to outline next steps and timeline expectations.',
  },
]
