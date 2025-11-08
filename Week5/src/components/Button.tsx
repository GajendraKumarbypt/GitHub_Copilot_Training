import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export function PrimaryButton({ children, className = '', ...rest }: Props) {
  return (
    <button className={`primary ${className}`} {...rest}>
      {children}
    </button>
  )
}
