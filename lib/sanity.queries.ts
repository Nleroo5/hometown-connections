import { client } from './sanity.client'

// Homepage data
export const HOMEPAGE_QUERY = `{
  "siteSettings": *[_type == "siteSettings"][0]{
    siteName,
    tagline,
    logo,
    primaryPhone,
    primaryEmail
  },
  "featuredNews": *[_type == "newsPost" && featured == true] | order(publishedAt desc)[0...3]{
    _id,
    title,
    slug,
    category,
    excerpt,
    featuredImage,
    publishedAt,
    "author": author->name
  },
  "services": *[_type == "service"] | order(order asc){
    _id,
    title,
    slug,
    category,
    icon,
    shortDescription
  },
  "partners": *[_type == "partner" && featured == true]{
    _id,
    companyName,
    logo,
    slug
  },
  "upcomingEvents": *[_type == "event" && startDate > now()] | order(startDate asc)[0...3]{
    _id,
    title,
    slug,
    eventType,
    startDate,
    endDate,
    location,
    isVirtual,
    featuredImage
  }
}`

// Site settings
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  ...,
  logo{
    asset->{
      _id,
      url
    }
  },
  footerLogo{
    asset->{
      _id,
      url
    }
  }
}`

// News listing
export const NEWS_QUERY = `*[_type == "newsPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  excerpt,
  featuredImage,
  publishedAt,
  "author": author->{
    name,
    photo
  }
}`

// Single news post
export const NEWS_POST_QUERY = `*[_type == "newsPost" && slug.current == $slug][0] {
  ...,
  "author": author->{
    name,
    role,
    photo
  },
  "relatedServices": relatedServices[]->{
    title,
    slug,
    shortDescription
  }
}`

// All services
export const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  category,
  icon,
  shortDescription
}`

// Single service
export const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0] {
  ...,
  "relatedPartners": relatedPartners[]->{
    companyName,
    logo,
    slug,
    description
  },
  "caseStudies": caseStudies[]->{
    title,
    slug,
    description,
    thumbnail
  }
}`

// All partners
export const PARTNERS_QUERY = `*[_type == "partner"] | order(companyName asc) {
  _id,
  companyName,
  slug,
  logo,
  category,
  description,
  featured
}`

// Single partner
export const PARTNER_QUERY = `*[_type == "partner" && slug.current == $slug][0]`

// All events
export const EVENTS_QUERY = `*[_type == "event"] | order(startDate desc) {
  _id,
  title,
  slug,
  eventType,
  startDate,
  endDate,
  location,
  isVirtual,
  featuredImage
}`

// Single event
export const EVENT_QUERY = `*[_type == "event" && slug.current == $slug][0]`

// Resources
export const RESOURCES_QUERY = `*[_type == "resource"] | order(_createdAt desc) {
  _id,
  title,
  type,
  description,
  thumbnail,
  file,
  externalLink,
  accessLevel,
  tags
}`

// Team members
export const TEAM_QUERY = `*[_type == "teamMember" && showOnTeamPage == true] | order(order asc) {
  _id,
  name,
  role,
  department,
  photo{
    asset->{
      _id,
      url
    }
  },
  bio,
  email,
  phone,
  linkedIn,
  order
}`

// Board members
export const BOARD_QUERY = `*[_type == "teamMember" && department == "board"] | order(order asc) {
  _id,
  name,
  role,
  photo{
    asset->{
      _id,
      url
    }
  },
  order
}`

// Helper functions to fetch data
export async function getHomepageData() {
  return await client.fetch(HOMEPAGE_QUERY)
}

export async function getSiteSettings() {
  return await client.fetch(SITE_SETTINGS_QUERY)
}

export async function getAllNews() {
  return await client.fetch(NEWS_QUERY)
}

export async function getNewsPost(slug: string) {
  return await client.fetch(NEWS_POST_QUERY, { slug })
}

export async function getAllServices() {
  return await client.fetch(SERVICES_QUERY)
}

export async function getService(slug: string) {
  return await client.fetch(SERVICE_QUERY, { slug })
}

export async function getAllPartners() {
  return await client.fetch(PARTNERS_QUERY)
}

export async function getPartner(slug: string) {
  return await client.fetch(PARTNER_QUERY, { slug })
}

export async function getAllEvents() {
  return await client.fetch(EVENTS_QUERY)
}

export async function getEvent(slug: string) {
  return await client.fetch(EVENT_QUERY, { slug })
}

export async function getAllResources() {
  return await client.fetch(RESOURCES_QUERY)
}

export async function getTeamMembers() {
  return await client.fetch(TEAM_QUERY)
}

export async function getBoardMembers() {
  return await client.fetch(BOARD_QUERY)
}
