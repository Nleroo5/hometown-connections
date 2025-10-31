import Container from '@/components/ui/Container'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Container>
        <div className="text-center">
          {/* Spinner */}
          <div className="inline-flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>

          {/* Loading Text */}
          <p className="mt-6 text-lg text-gray-600">Loading...</p>
        </div>
      </Container>
    </div>
  )
}
