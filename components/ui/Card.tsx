import React from 'react'
import Link from 'next/link'

interface CardProps {
  children: React.ReactNode
  href?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

const Card: React.FC<CardProps> = ({
  children,
  href,
  hover = false,
  padding = 'md',
  className = '',
}) => {
  const baseClasses = 'card'
  const hoverClasses = hover ? 'card-hover' : ''

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const classes = `
    ${baseClasses}
    ${hoverClasses}
    ${paddingClasses[padding]}
    ${className}
  `.trim().replace(/\s+/g, ' ')

  if (href) {
    return (
      <Link href={href} className={`${classes} block`}>
        {children}
      </Link>
    )
  }

  return <div className={classes}>{children}</div>
}

export default Card
