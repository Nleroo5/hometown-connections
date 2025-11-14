import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

interface CTASectionProps {
  title?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  variant?: 'primary' | 'secondary'
}

export default function CTASection({
  title = 'Ready to Transform Your Utility Operations?',
  description = 'Join hundreds of community-owned utilities leveraging our expertise and partnerships to drive innovation and excellence.',
  primaryCTA = { text: 'Contact Us', href: '/contact' },
  secondaryCTA,
  variant = 'primary',
}: CTASectionProps) {
  const bgClass = variant === 'primary' ? 'bg-gradient-primary' : 'bg-gradient-secondary'

  return (
    <section className={`section ${bgClass} text-white relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">{title}</h2>
          <p className="text-xl text-white mb-10 leading-relaxed">{description}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={primaryCTA.href}
              variant="secondary"
              size="lg"
              className="shadow-xl hover:shadow-2xl"
            >
              {primaryCTA.text}
            </Button>
            {secondaryCTA && (
              <Button
                href={secondaryCTA.href}
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white hover:text-primary border-white/50 hover:border-white backdrop-blur-sm shadow-xl"
              >
                {secondaryCTA.text}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
