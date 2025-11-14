import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <>
        <section className="section min-h-[70vh] flex items-center">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              {/* 404 Illustration */}
              <div className="mb-8">
                <div className="text-9xl font-bold text-primary/10">404</div>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Page Not Found
              </h1>

              {/* Description */}
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Sorry, we couldn't find the page you're looking for. The page may have
                been moved or no longer exists.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/" size="lg">
                  Back to Home
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>

              {/* Quick Links */}
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Pages
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/about"
                    className="text-primary hover:text-primary-dark underline"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/partners"
                    className="text-primary hover:text-primary-dark underline"
                  >
                    Partners
                  </Link>
                  <Link
                    href="/news"
                    className="text-primary hover:text-primary-dark underline"
                  >
                    News
                  </Link>
                  <Link
                    href="/contact"
                    className="text-primary hover:text-primary-dark underline"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
    </>
  )
}
