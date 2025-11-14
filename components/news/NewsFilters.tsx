'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const UTILITY_SOLUTIONS = [
  { title: 'Advanced Metering Infrastructure', value: 'advanced-metering-infrastructure' },
  { title: 'Board Governance', value: 'board-governance' },
  { title: 'Clean Energy Storage', value: 'clean-energy-storage' },
  { title: 'Cost of Service Research', value: 'cost-of-service-research' },
  { title: 'Customer Engagement', value: 'customer-engagement' },
  { title: 'Customer Information Systems', value: 'customer-information-systems' },
  { title: 'Cyber Liability Insurance', value: 'cyber-liability-insurance' },
  { title: 'Cybersecurity Management', value: 'cybersecurity-management' },
  { title: 'Digital Marketing/Technology Solutions', value: 'digital-marketing-technology-solutions' },
  { title: 'Energy Trading & Risk', value: 'energy-trading-risk' },
  { title: 'Engineering & Operations', value: 'engineering-operations' },
  { title: 'Infrastructure Management', value: 'infrastructure-management' },
  { title: 'Insurance', value: 'insurance' },
  { title: 'Interim Executive Placements', value: 'interim-executive-placements' },
  { title: 'Market Research', value: 'market-research' },
  { title: 'Microgrid/Distributed Energy Generation', value: 'microgrid-distributed-energy-generation' },
  { title: 'Organizational Transformation', value: 'organizational-transformation' },
  { title: 'OT Engineering & Regulatory Compliance', value: 'ot-engineering-regulatory-compliance' },
  { title: 'Strategic Planning', value: 'strategic-planning' },
  { title: 'Technology Planning', value: 'technology-planning' },
  { title: 'Utility Security Consulting', value: 'utility-security-consulting' },
  { title: 'Wholesale Energy Prepay', value: 'wholesale-energy-prepay' },
]

interface NewsFiltersProps {
  partners: { _id: string; companyName: string; slug: { current: string } }[]
}

export default function NewsFilters({ partners }: NewsFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [utilitySolution, setUtilitySolution] = useState(searchParams.get('solution') || '')
  const [partner, setPartner] = useState(searchParams.get('partner') || '')

  const updateFilters = (newSolution: string, newPartner: string) => {
    const params = new URLSearchParams()
    if (newSolution) params.set('solution', newSolution)
    if (newPartner) params.set('partner', newPartner)

    const queryString = params.toString()
    router.push(queryString ? `/news?${queryString}` : '/news')
  }

  const handleSolutionChange = (value: string) => {
    setUtilitySolution(value)
    updateFilters(value, partner)
  }

  const handlePartnerChange = (value: string) => {
    setPartner(value)
    updateFilters(utilitySolution, value)
  }

  const clearFilters = () => {
    setUtilitySolution('')
    setPartner('')
    router.push('/news')
  }

  const hasActiveFilters = utilitySolution || partner

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        {/* Utility Solutions Filter */}
        <div className="flex-1 w-full">
          <label htmlFor="utility-solution" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Utility Solution
          </label>
          <select
            id="utility-solution"
            value={utilitySolution}
            onChange={(e) => handleSolutionChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
          >
            <option value="">All Solutions</option>
            {UTILITY_SOLUTIONS.map((solution) => (
              <option key={solution.value} value={solution.value}>
                {solution.title}
              </option>
            ))}
          </select>
        </div>

        {/* Partners Filter */}
        <div className="flex-1 w-full">
          <label htmlFor="partner" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Partner
          </label>
          <select
            id="partner"
            value={partner}
            onChange={(e) => handlePartnerChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary transition-colors"
          >
            <option value="">All Partners</option>
            {partners.map((p) => (
              <option key={p._id} value={p.slug.current}>
                {p.companyName}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}
