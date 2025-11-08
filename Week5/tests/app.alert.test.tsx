import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../src/App'

describe('App click alert', () => {
  it('calls window.alert when clicking the app button', async () => {
    const user = userEvent.setup()
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<App />)
    const btn = screen.getByRole('button', { name: /click me/i })
    await user.click(btn)
    expect(alertSpy).toHaveBeenCalled()
    alertSpy.mockRestore()
  })
})
