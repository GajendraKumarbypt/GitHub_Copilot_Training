import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Modal } from '../../src/components/Modal'

describe('Modal closed', () => {
  it('does not render when open is false', () => {
    render(
      <Modal title="T" open={false} onClose={() => {}}>
        <div>content</div>
      </Modal>
    )

    expect(screen.queryByText('content')).toBeNull()
  })
})
