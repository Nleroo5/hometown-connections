import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import { getSiteSettings } from '@/lib/sanity.queries'
import { urlFor } from '@/lib/sanity.client'

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Leadership', href: '/about/leadership' },
    { name: 'Member Organizations', href: '/about/members' },
    { name: 'Careers', href: '/careers' },
  ],
  services: [
    { name: 'Business Strategy', href: '/services/business-strategy' },
    { name: 'Operations', href: '/services/operations' },
    { name: 'Cybersecurity', href: '/services/cybersecurity' },
    { name: 'Customer Care', href: '/services/customer-care' },
  ],
  resources: [
    { name: 'Resource Library', href: '/resources' },
    { name: 'News & Updates', href: '/resources/news' },
    { name: 'Events', href: '/resources/events' },
    { name: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
}

export default async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer className="bg-gradient-primary text-white border-t-2 border-secondary/30">
      {/* Main Footer */}
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-4 group">
                {(settings?.footerLogo || settings?.logo) ? (
                  <div className="h-8 relative">
                    <Image
                      src={urlFor(settings.footerLogo || settings.logo).width(26).height(32).url()}
                      alt={settings.siteName || 'Hometown Connections'}
                      width={26}
                      height={32}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center transition-all group-hover:shadow-lg group-hover:shadow-secondary/30">
                      <span className="text-white font-bold text-xl">HC</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-xl font-bold text-white">
                        {settings?.siteName || 'Hometown Connections'}
                      </div>
                      <div className="text-sm text-white">
                        {settings?.tagline || 'Empowering Community Utilities'}
                      </div>
                    </div>
                  </>
                )}
              </Link>
              <p className="text-white mb-6 max-w-md">
                {settings?.seoDescription ||
                  'Providing innovative solutions for community-owned utilities since 1998.'}
              </p>

              {/* Contact Info */}
              {settings?.primaryPhone && (
                <div className="mb-2">
                  <a
                    href={`tel:${settings.primaryPhone}`}
                    className="text-white hover:text-secondary transition-colors"
                  >
                    {settings.primaryPhone}
                  </a>
                </div>
              )}
              {settings?.primaryEmail && (
                <div className="mb-4">
                  <a
                    href={`mailto:${settings.primaryEmail}`}
                    className="text-white hover:text-secondary transition-colors"
                  >
                    {settings.primaryEmail}
                  </a>
                </div>
              )}

              {/* Social Links */}
              {settings?.socialLinks && settings.socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {settings.socialLinks.map((link: any, index: number) => {
                    const platform = link.platform.toLowerCase()
                    return (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-primary-dark hover:bg-secondary rounded-full flex items-center justify-center transition-all hover:shadow-lg hover:shadow-secondary/30"
                        aria-label={link.platform}
                      >
                        <span className="sr-only">{link.platform}</span>
                        {platform === 'linkedin' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        )}
                        {platform === 'youtube' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        )}
                        {platform === 'facebook' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        )}
                        {platform === 'twitter' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        )}
                        {!['linkedin', 'youtube', 'facebook', 'twitter'].includes(platform) && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                          </svg>
                        )}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white hover:text-secondary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-secondary/20">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-white text-sm">
              {settings?.copyrightText ||
                `© ${new Date().getFullYear()} Hometown Connections, Inc. All rights reserved.`}
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-secondary text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
