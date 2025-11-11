'use client'

import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import CountUp from '@/components/ui/CountUp'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaPrimary?: {
    text: string
    href: string
  }
  ctaSecondary?: {
    text: string
    href: string
  }
  stats?: {
    value: string
    label: string
  }[]
}

export default function Hero({
  title = 'A Single Source For Community-Owned Utility Solutions',
  subtitle = 'Hometown Connections, Inc. is a national, non-profit utility services organization specializing in the unique challenges of community-owned utilities.',
  ctaPrimary = { text: 'Explore Services', href: '/services' },
  ctaSecondary = { text: 'View Resources', href: '/resources' },
  stats = [
    { value: '900+', label: 'Utilities Served' },
    { value: '25+', label: 'Years of Excellence' },
    { value: '6', label: 'Owner Organizations' },
  ],
}: HeroProps) {
  return (
    <section className="relative bg-gradient-futuristic text-white pt-8 pb-20 sm:pt-12 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in text-white">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed animate-fade-in">
            {subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
            <Button
              href={ctaPrimary.href}
              variant="accent"
              size="lg"
              className="glow-accent"
            >
              {ctaPrimary.text}
            </Button>
            <Button
              href={ctaSecondary.href}
              variant="outline"
              size="lg"
              className="bg-secondary/10 hover:bg-secondary hover:text-white border-secondary/50 hover:border-secondary backdrop-blur-sm shadow-lg hover:glow-secondary"
            >
              {ctaSecondary.text}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 pt-8 border-t border-neon/30">
            {stats.map((stat, index) => {
              // Determine if this stat should have counting animation
              const isUtilitiesServed = stat.label === 'Utilities Served'
              const isYearsOfExcellence = stat.label === 'Years of Excellence'

              return (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-gradient-accent mb-2">
                    {isUtilitiesServed ? (
                      <CountUp end={900} duration={5000} suffix="+" />
                    ) : isYearsOfExcellence ? (
                      <CountUp end={25} duration={3000} suffix="+" />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-white text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
