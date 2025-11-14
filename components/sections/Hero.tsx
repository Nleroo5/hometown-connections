'use client'

import { useEffect, useRef, useState } from 'react'
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
  ctaPrimary = { text: 'View Our Affiliates', href: '/affiliates' },
  ctaSecondary = { text: 'View Resources', href: '/resources' },
  stats = [
    { value: '900+', label: 'Utilities Served' },
    { value: '25+', label: 'Years of Excellence' },
  ],
}: HeroProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [linePositions, setLinePositions] = useState({
    vertical: [25, 50, 75], // percentages
    horizontal: 15
  })

  useEffect(() => {
    const calculateGridAlignedPositions = () => {
      if (!svgRef.current) return

      const rect = svgRef.current.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      const GRID_SIZE = 60 // 60px grid

      // Calculate the closest grid line for each target percentage
      const verticalTargets = [0.25, 0.5, 0.75] // 25%, 50%, 75%
      const alignedVertical = verticalTargets.map(target => {
        const pixelPosition = width * target
        const nearestGridLine = Math.round(pixelPosition / GRID_SIZE) * GRID_SIZE
        const percentage = (nearestGridLine / width) * 100
        return percentage
      })

      // For horizontal line at ~15%
      const horizontalTarget = 0.15
      const horizontalPixel = height * horizontalTarget
      const nearestHorizontalGrid = Math.round(horizontalPixel / GRID_SIZE) * GRID_SIZE
      const horizontalPercentage = (nearestHorizontalGrid / height) * 100

      setLinePositions({
        vertical: alignedVertical,
        horizontal: horizontalPercentage
      })
    }

    calculateGridAlignedPositions()

    window.addEventListener('resize', calculateGridAlignedPositions)
    return () => window.removeEventListener('resize', calculateGridAlignedPositions)
  }, [])

  return (
    <section className="relative bg-gradient-futuristic text-white pt-20 pb-20 sm:pt-24 md:pt-32 md:pb-28">
      {/* Animated Grid with Power Flow */}
      {/* CSS Grid Background - 60px repeating pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 247, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 247, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* SVG Animations positioned to align with CSS grid */}
      <div className="absolute inset-0">
        <svg ref={svgRef} className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0, 247, 255, 0)">
                <animate attributeName="stop-color" values="rgba(0, 247, 255, 0); rgba(0, 247, 255, 0.8); rgba(0, 247, 255, 0)" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="rgba(0, 247, 255, 0.8)">
                <animate attributeName="offset" values="0; 1; 0" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="rgba(0, 247, 255, 0)">
                <animate attributeName="stop-color" values="rgba(0, 247, 255, 0); rgba(0, 247, 255, 0.8); rgba(0, 247, 255, 0)" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>

          {/* Glowing pulses along grid lines - Horizontal (dynamically aligned) */}
          <line x1="0%" y1={`${linePositions.horizontal}%`} x2="100%" y2={`${linePositions.horizontal}%`} stroke="rgba(0, 247, 255, 0.18)" strokeWidth="1.5" strokeDasharray="40 200" vectorEffect="non-scaling-stroke">
            <animate attributeName="stroke-dashoffset" values="0; 240" dur="5s" repeatCount="indefinite" />
          </line>

          {/* Glowing pulses along grid lines - Vertical (dynamically aligned) */}
          <line x1={`${linePositions.vertical[0]}%`} y1="0%" x2={`${linePositions.vertical[0]}%`} y2="100%" stroke="rgba(0, 247, 255, 0.18)" strokeWidth="1.5" strokeDasharray="40 200" vectorEffect="non-scaling-stroke">
            <animate attributeName="stroke-dashoffset" values="0; 240" dur="6s" begin="0.5s" repeatCount="indefinite" />
          </line>
          <line x1={`${linePositions.vertical[1]}%`} y1="0%" x2={`${linePositions.vertical[1]}%`} y2="100%" stroke="rgba(0, 247, 255, 0.18)" strokeWidth="1.5" strokeDasharray="40 200" vectorEffect="non-scaling-stroke">
            <animate attributeName="stroke-dashoffset" values="0; 240" dur="5s" begin="1s" repeatCount="indefinite" />
          </line>
          <line x1={`${linePositions.vertical[2]}%`} y1="0%" x2={`${linePositions.vertical[2]}%`} y2="100%" stroke="rgba(0, 247, 255, 0.18)" strokeWidth="1.5" strokeDasharray="40 200" vectorEffect="non-scaling-stroke">
            <animate attributeName="stroke-dashoffset" values="0; 240" dur="5.5s" begin="1.5s" repeatCount="indefinite" />
          </line>

          {/* Animated power lines */}
          <line x1="0%" y1="20%" x2="100%" y2="20%" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.6" vectorEffect="non-scaling-stroke">
            <animate attributeName="opacity" values="0.3; 0.8; 0.3" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.6" vectorEffect="non-scaling-stroke">
            <animate attributeName="opacity" values="0.3; 0.8; 0.3" dur="4s" begin="1s" repeatCount="indefinite" />
          </line>
          <line x1="0%" y1="80%" x2="100%" y2="80%" stroke="url(#lineGradient)" strokeWidth="2" opacity="0.6" vectorEffect="non-scaling-stroke">
            <animate attributeName="opacity" values="0.3; 0.8; 0.3" dur="4s" begin="2s" repeatCount="indefinite" />
          </line>
        </svg>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 pt-8">
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
      <div className="absolute bottom-0 left-0 right-0 -mb-1">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
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
