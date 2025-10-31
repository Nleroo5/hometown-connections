/**
 * TypeScript types and interfaces for the Hometown Connections website
 */

export interface SiteSettings {
  _id: string
  siteName: string
  tagline: string
  seoDescription: string
  logo: SanityImage
  primaryPhone?: string
  primaryEmail?: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  socialLinks?: {
    platform: string
    url: string
  }[]
  copyrightText?: string
  announcementBar?: {
    enabled: boolean
    text: string
    link?: string
    backgroundColor?: string
  }
}

export interface NewsPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  category: string
  publishedAt: string
  featured: boolean
  excerpt: string
  featuredImage: SanityImage
  author?: TeamMember
  body?: any[]
  relatedServices?: Service[]
  seoTitle?: string
  seoDescription?: string
}

export interface Service {
  _id: string
  title: string
  slug: {
    current: string
  }
  category: string
  order: number
  icon?: SanityImage
  shortDescription: string
  fullDescription?: any[]
  keyBenefits?: string[]
  featuredImage?: SanityImage
  caseStudies?: Resource[]
  relatedPartners?: Partner[]
  ctaText?: string
  ctaLink?: string
  seoTitle?: string
  seoDescription?: string
}

export interface Partner {
  _id: string
  companyName: string
  slug: {
    current: string
  }
  logo: SanityImage
  category: string
  description: string
  fullDescription?: any[]
  website?: string
  servicesProvided?: string[]
  featured: boolean
  contactPerson?: {
    name: string
    email: string
    phone: string
  }
  partnerSince?: string
}

export interface Resource {
  _id: string
  title: string
  slug: {
    current: string
  }
  type: 'whitepaper' | 'case-study' | 'guide' | 'webinar' | 'tool' | 'template' | 'report'
  description: string
  thumbnail?: SanityImage
  file?: SanityFile
  externalLink?: string
  accessLevel: 'public' | 'members-only'
  tags?: string[]
  featured: boolean
  publishedDate?: string
}

export interface Event {
  _id: string
  title: string
  slug: {
    current: string
  }
  eventType: 'conference' | 'webinar' | 'training' | 'workshop' | 'meeting' | 'social'
  startDate: string
  endDate: string
  location: string
  isVirtual: boolean
  venue?: {
    name: string
    address: string
    mapLink: string
  }
  description: any[]
  agenda?: {
    time: string
    title: string
    speaker: string
    description: string
  }[]
  registrationLink?: string
  registrationDeadline?: string
  capacity?: number
  featuredImage?: SanityImage
  organizers?: TeamMember[]
  sponsors?: Partner[]
}

export interface TeamMember {
  _id: string
  name: string
  slug?: {
    current: string
  }
  role: string
  department: string
  photo?: SanityImage
  bio?: string
  fullBio?: any[]
  email?: string
  phone?: string
  linkedIn?: string
  order: number
  showOnTeamPage: boolean
}

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface SanityFile {
  _type: 'file'
  asset: {
    _ref: string
    _type: 'reference'
    url?: string
  }
  description?: string
}

export interface HomepageData {
  siteSettings: SiteSettings
  featuredNews: NewsPost[]
  services: Service[]
  partners: Partner[]
  upcomingEvents: Event[]
}

export interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  noindex?: boolean
}

export interface Breadcrumb {
  label: string
  href: string
}
