import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TextInput } from '../../src/components/Input'

describe('TextInput without label', () => {
  it('renders input placeholder and no label', () => {
    render(<TextInput placeholder="abc" />)
    expect(screen.getByPlaceholderText('abc')).toBeTruthy()
    expect(screen.queryByText(/label/i)).toBeNull()
  })
})
