import React from 'react'

type Props = {
  title?: string
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

export function Modal({ title, open, onClose, children }: Props) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'grid', placeItems: 'center' }}>
      <div style={{ background: '#fff', padding: 18, borderRadius: 8, minWidth: 300 }}>
        {title && <h3>{title}</h3>}
        <div>{children}</div>
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
