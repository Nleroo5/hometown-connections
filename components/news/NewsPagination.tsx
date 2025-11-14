'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface NewsPaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function NewsPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: NewsPaginationProps) {
  const searchParams = useSearchParams()

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    const queryString = params.toString()
    return queryString ? `/news?${queryString}` : '/news'
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (totalPages <= 1) {
    return null
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Pagination">
      {/* Previous Button */}
      {hasPrevPage ? (
        <Link
          href={buildPageUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          Previous
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed">
          Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-500"
              >
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isCurrentPage = pageNum === currentPage

          return (
            <Link
              key={pageNum}
              href={buildPageUrl(pageNum)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isCurrentPage
                  ? 'bg-secondary text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {hasNextPage ? (
        <Link
          href={buildPageUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
        >
          Next
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed">
          Next
        </span>
      )}
    </nav>
  )
}
