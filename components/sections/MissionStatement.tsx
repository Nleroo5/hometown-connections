import Container from '@/components/ui/Container'

export default function MissionStatement() {
  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Planning & Strategy',
      points: [
        'We focus on what can be done with your resources and can plan incremental improvements',
        'We help utilities leverage in-house skills and acquire new ones',
        'We design business strategies and purchasing plans that fit utility budgets',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Service & Engagement',
      points: [
        'We provide solutions that enhance customer engagement and delivery of customer service',
        'We improve cooperation between the city and utility organizations',
        'We make sure business systems operate more efficiently and people more effectively',
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Partnership & Support',
      points: [
        'We foster strong working relationships among employees, leadership, and the governing board',
        'We are a change partner, standing by community-owned utilities for the long term',
      ],
    },
  ]

  return (
    <section className="-mt-16 pt-16 pb-8">
      <Container>
        {/* Opening Statement */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
            Our team of consultants and vendor partners will help you streamline business processes, enhance customer service, improve security, develop plans for the future, and much more.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card card-hover p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-xl mb-6 mx-auto">
                <div className="text-secondary">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {benefit.title}
              </h3>
              <ul className="space-y-3">
                {benefit.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600">
                    <svg
                      className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Highlighted Quote */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-l-4 border-secondary rounded-r-xl p-8 mb-12">
          <p className="text-xl md:text-2xl text-gray-800 leading-relaxed italic text-center font-medium">
            We believe in preserving the benefits of living and working in communities that own and operate their own utility services.
          </p>
        </div>

        {/* Closing Statement */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            Serving community-owned utilities of every size and type, Hometown Connections provides products and services to develop all areas of your utility business, including operations, cybersecurity, business strategy, customer care, finance, workforce, and technology.
          </p>
        </div>
      </Container>
    </section>
  )
}
