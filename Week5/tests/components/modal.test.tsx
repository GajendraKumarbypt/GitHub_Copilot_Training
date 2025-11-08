import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Modal } from '../../src/components/Modal'

describe('Modal', () => {
  it('renders when open and shows title and children', () => {
    render(
      <Modal title="T" open={true} onClose={() => {}}>
        <div>content</div>
      </Modal>
    )

    expect(screen.getByText('T')).toBeTruthy()
    expect(screen.getByText('content')).toBeTruthy()
  })
})
