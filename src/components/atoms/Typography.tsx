import React from 'react'

interface TypographyProps {
  children: React.ReactNode
}
const Typography = ({ children }: TypographyProps) => {
  return (
    <p className="text-sm font-bold">{children}</p>
  )
}

export default Typography