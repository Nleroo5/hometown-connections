import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getSiteSettings } from '@/lib/sanity.queries'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
      default: `${settings?.siteName || 'Hometown Connections'} | ${settings?.tagline || 'Utility Solutions for Public Power'}`,
      template: `%s | ${settings?.siteName || 'Hometown Connections'}`,
    },
    description: settings?.seoDescription || 'Non-profit utility services organization specializing in community-owned utilities. Strategic planning, cybersecurity, operations, and technology solutions.',
    keywords: [
      'public power utilities',
      'community-owned utilities',
      'utility consulting',
      'municipal utilities',
      'public power solutions',
      'utility cybersecurity',
      'AMI solutions',
      'utility strategic planning',
    ],
    authors: [{ name: 'Hometown Connections' }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: settings?.siteName || 'Hometown Connections',
      title: settings?.siteName || 'Hometown Connections',
      description: settings?.seoDescription,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Hometown Connections',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings?.siteName || 'Hometown Connections',
      description: settings?.seoDescription,
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Header siteSettings={settings} />
        <main className="min-h-screen pt-24 sm:pt-28 md:pt-32 lg:pt-28">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
