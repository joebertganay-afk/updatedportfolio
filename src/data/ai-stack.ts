import {
  Sparkle,
  Briefcase,
  Globe,
  PhoneCall,
  Laptop,
  type Icon,
} from '@/components/slab'
import { profile } from '@/data/profile'

export type StackNode = {
  id: string
  Icon: Icon
  name: string
  what: string
  stack: string
  children?: StackNode[]
}

export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'Professional Tool Stack & Daily Drivers',
  stack: 'CRM, Support, Real Estate & Communication Systems',
  children: [
    {
      id: 'crm-support',
      Icon: Briefcase,
      name: 'CRM & Customer Support',
      what: 'Core platforms used for pipeline management, customer tickets, and client success.',
      stack: 'GoHighLevel, Zendesk, Google Workspace',
    },
    {
      id: 'real-estate',
      Icon: Globe,
      name: 'Real Estate Platforms',
      what: 'Property research, market analysis, and real estate listings tracking.',
      stack: 'Zillow, Realtor, Redfin',
    },
    {
      id: 'communication',
      Icon: PhoneCall,
      name: 'Dialers & Communication',
      what: 'High-volume outbound sales calling, contact center support, and virtual meetings.',
      stack: 'CallTools, Genesys, NICE CXone, Zoom, Skype, Loom, Microsoft Teams',
    },
    {
      id: 'development-ai',
      Icon: Laptop,
      name: 'Development & AI Assistants',
      what: 'Workflow automation, prompt engineering, code editing, and repository tracking.',
      stack: 'ChatGPT, Claude, VS Code, GitHub, Squarespace, Microsoft 365',
    },
  ],
}