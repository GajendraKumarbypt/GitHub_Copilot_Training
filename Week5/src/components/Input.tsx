import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export function TextInput({ label, ...rest }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      {label && <label className="label">{label}</label>}
      <input type="text" {...rest} />
    </div>
  )
}
