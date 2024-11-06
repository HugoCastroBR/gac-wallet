import React from 'react'

const FormError = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <p className="text-red-500 text-xs ml">{children}</p>
  )
}

export default FormError