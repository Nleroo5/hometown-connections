import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'full' | 'default' | 'narrow'
}

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
}) => {
  const sizeClasses = {
    full: 'max-w-full',
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
  }

  const classes = `
    ${sizeClasses[size]}
    mx-auto
    px-4 sm:px-6 lg:px-8
    ${className}
  `.trim().replace(/\s+/g, ' ')

  return <div className={classes}>{children}</div>
}

export default Container
