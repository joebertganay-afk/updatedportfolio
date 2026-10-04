import { Briefcase, SealCheck, Clock, type Icon } from '@/components/slab'

export type SocialLink = {
  label: string
  href: string
  iconPath?: string
}

export type Stat = { value: string; label: string; Icon: Icon }

export type Profile = {
  name: string
  firstName: string
  handle: string
  role: string
  avatarSrc: string
  verifiedLabel: string
  email: string
  location: string
  stats: Stat[]
  displayName: { line1: string; line2: string }
  hero: {
    body: string
    portraitSrc: string
    portraitAlt: string
  }
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Joebert Y. Ganay',
  firstName: 'Joebert',
  handle: '@joebertganay',
  role: 'Virtual Assistant · Customer & Technical Support Specialist · HR & Compliance Liaison',
  avatarSrc: `${import.meta.env.BASE_URL}avatar.png`,
  verifiedLabel: 'Certified GoHighLevel & CRM Specialist',
  email: 'joebertganay@gmail.com',
  location: 'Philippines / International Shifts',
  stats: [
    { value: '6+ yrs', label: 'Real Estate VA', Icon: Briefcase },
    { value: '10+ yrs', label: 'Customer Support', Icon: SealCheck },
    { value: '24/7', label: 'Global Availability', Icon: Clock },
  ],
  displayName: { line1: 'Reliable Support,', line2: 'Scaled for Growth.' },
  hero: {
    body: 'I help businesses stay organized and grow by providing reliable Virtual Assistant, Customer Support, and Technical Support services. With over 10 years of experience in customer service and troubleshooting, I specialize in client communication, operations support, data management, and sales outreach. My goal is to help business owners save time, improve customer satisfaction, and focus on scaling their business.',
    portraitSrc: `${import.meta.env.BASE_URL}avatar.png`,
    portraitAlt: 'Joebert Y. Ganay Portrait',
  },
  socials: [
    { label: 'Facebook profile', href: 'https://www.facebook.com/profile.php?id=1000806664172', iconPath: `${import.meta.env.BASE_URL}icons/facebook.svg` },
    { label: 'LinkedIn profile', href: 'https://www.linkedin.com/in/joebertganay-006664172', iconPath: `${import.meta.env.BASE_URL}icons/linkedin.svg` },
    { label: 'Email Me', href: 'mailto:joebertganay@gmail.com', iconPath: `${import.meta.env.BASE_URL}icons/email.svg` },
  ],
}
