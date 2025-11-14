'use client'

import CountUp from '@/components/ui/CountUp'

interface AffiliateStatsProps {
  totalAffiliates: number
  statesServed: number
  coOwners: number
}

export default function AffiliateStats({
  totalAffiliates,
  statesServed,
  coOwners,
}: AffiliateStatsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 pt-8">
      <div className="text-center animate-fade-in">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-2">
          {totalAffiliates > 0 ? (
            <CountUp end={totalAffiliates} duration={3500} />
          ) : (
            totalAffiliates
          )}
        </div>
        <div className="text-white text-sm md:text-base">
          Total Affiliates
        </div>
      </div>
      <div className="text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-2">
          {statesServed > 0 ? (
            <CountUp end={statesServed} duration={3500} />
          ) : (
            statesServed
          )}
        </div>
        <div className="text-white text-sm md:text-base">
          States Served
        </div>
      </div>
      <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-2">
          {coOwners}
        </div>
        <div className="text-white text-sm md:text-base">
          Co-owners
        </div>
      </div>
    </div>
  )
}
