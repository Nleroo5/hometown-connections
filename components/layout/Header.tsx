'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import ContactFormModal from '@/components/modals/ContactFormModal'
import { urlFor } from '@/lib/sanity.client'

interface NavigationItem {
  name: string
  href: string
  submenu?: NavigationItem[]
}

interface HeaderProps {
  siteSettings?: {
    siteName?: string
    tagline?: string
    logo?: any
  }
}

const navigation: NavigationItem[] = [
  {
    name: 'We Are Hometown',
    href: '/about',
    submenu: [
      { name: 'Our Team', href: '/about/team' },
      { name: 'Board Members', href: '/about/board' },
    ],
  },
  {
    name: 'Utility Solutions',
    href: '#',
    submenu: [
      { name: 'Advanced Metering Infrastructure', href: '/services/ami' },
      { name: 'Strategic Planning', href: '/services/strategic-planning' },
      { name: 'Operations', href: '/services/operations' },
      { name: 'Cybersecurity', href: '/services/cybersecurity' },
      { name: 'Business Strategy', href: '/services/business-strategy' },
      { name: 'Customer Care', href: '/services/customer-care' },
      { name: 'Finance', href: '/services/finance' },
      { name: 'Workforce', href: '/services/workforce' },
    ],
  },
  { name: 'Partners', href: '/partners' },
  { name: 'Affiliates', href: '/affiliates' },
  { name: 'News', href: '/news' },
  { name: 'Contact Us', href: '/contact' },
]

export default function Header({ siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-neon/20 ${
        isScrolled ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-primary/95 backdrop-blur-sm'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            {siteSettings?.logo ? (
              <div className="relative py-2">
                <Image
                  src={urlFor(siteSettings.logo).width(400).height(120).url()}
                  alt={siteSettings.siteName || 'Hometown Connections'}
                  width={400}
                  height={120}
                  className="h-14 w-auto object-contain"
                />
              </div>
            ) : (
              <>
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center transition-all group-hover:shadow-lg group-hover:shadow-secondary/30">
                  <span className="text-white font-bold text-lg">HC</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-lg font-bold text-white">
                    {siteSettings?.siteName || 'Hometown Connections'}
                  </div>
                  <div className="text-xs text-gray-300">
                    {siteSettings?.tagline || 'Empowering Community Utilities'}
                  </div>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className="px-3 py-2 text-white hover:text-secondary transition-colors font-medium flex items-center gap-1 text-sm whitespace-nowrap"
                      onMouseEnter={() => setOpenSubmenu(item.name)}
                    >
                      {item.name}
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-secondary/20 z-50"
                      onMouseLeave={() => setOpenSubmenu(null)}
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-secondary/10 hover:text-secondary transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-white hover:text-secondary transition-colors font-medium text-sm whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:block flex-shrink-0">
            <Button
              onClick={() => setIsContactModalOpen(true)}
              size="sm"
              variant="accent"
            >
              Request Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary-dark border-t border-neon/20">
          <Container>
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <>
                      <button
                        className="w-full text-left px-4 py-2 text-white hover:bg-secondary/10 hover:text-secondary rounded-lg font-medium flex items-center justify-between"
                        onClick={() =>
                          setOpenSubmenu(
                            openSubmenu === item.name ? null : item.name
                          )
                        }
                      >
                        {item.name}
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            openSubmenu === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {openSubmenu === item.name && (
                        <div className="pl-4 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-300 hover:bg-secondary/10 hover:text-secondary rounded-lg"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-white hover:bg-secondary/10 hover:text-secondary rounded-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <Button
                  onClick={() => {
                    setIsContactModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  fullWidth
                  variant="accent"
                >
                  Request Consultation
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </header>
  )
}
