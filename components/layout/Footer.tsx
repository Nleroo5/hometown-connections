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
    { name: 'Business Strategy', href: '/services#business-strategy' },
    { name: 'Operations', href: '/services#operations' },
    { name: 'Cybersecurity', href: '/services#cybersecurity' },
    { name: 'Customer Care', href: '/services#customer-care' },
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
    <footer className="bg-gradient-primary text-gray-300 border-t-2 border-secondary/30">
      {/* Main Footer */}
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-4 group">
                {(settings?.footerLogo || settings?.logo) ? (
                  <div className="h-12 relative">
                    <Image
                      src={urlFor(settings.footerLogo || settings.logo).width(200).height(48).url()}
                      alt={settings.siteName || 'Hometown Connections'}
                      width={200}
                      height={48}
                      className="h-12 w-auto object-contain brightness-0 invert"
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
                      <div className="text-sm text-gray-300">
                        {settings?.tagline || 'Empowering Community Utilities'}
                      </div>
                    </div>
                  </>
                )}
              </Link>
              <p className="text-gray-300 mb-6 max-w-md">
                {settings?.seoDescription ||
                  'Providing innovative solutions for community-owned utilities since 1998.'}
              </p>

              {/* Contact Info */}
              {settings?.primaryPhone && (
                <div className="mb-2">
                  <a
                    href={`tel:${settings.primaryPhone}`}
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    {settings.primaryPhone}
                  </a>
                </div>
              )}
              {settings?.primaryEmail && (
                <div className="mb-4">
                  <a
                    href={`mailto:${settings.primaryEmail}`}
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    {settings.primaryEmail}
                  </a>
                </div>
              )}

              {/* Social Links */}
              {settings?.socialLinks && settings.socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {settings.socialLinks.map((link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-dark hover:bg-secondary rounded-full flex items-center justify-center transition-all hover:shadow-lg hover:shadow-secondary/30"
                      aria-label={link.platform}
                    >
                      <span className="sr-only">{link.platform}</span>
                      {/* Add appropriate icons here */}
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                      </svg>
                    </a>
                  ))}
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
                      className="text-gray-300 hover:text-secondary transition-colors"
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
                      className="text-gray-300 hover:text-secondary transition-colors"
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
                      className="text-gray-300 hover:text-secondary transition-colors"
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
            <p className="text-gray-300 text-sm">
              {settings?.copyrightText ||
                `© ${new Date().getFullYear()} Hometown Connections, Inc. All rights reserved.`}
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-secondary text-sm transition-colors"
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
