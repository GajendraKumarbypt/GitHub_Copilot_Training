import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PrimaryButton } from '../../src/components/Button'

describe('PrimaryButton', () => {
  it('renders and responds to clicks', async () => {
    const user = userEvent.setup()
    const handle = vi.fn()
    render(<PrimaryButton onClick={handle}>Hello</PrimaryButton>)
    expect(screen.getByRole('button', { name: /hello/i })).toBeTruthy()
    await user.click(screen.getByRole('button'))
    expect(handle).toHaveBeenCalled()
  })
})
