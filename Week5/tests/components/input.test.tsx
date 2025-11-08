import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TextInput } from '../../src/components/Input'

describe('TextInput', () => {
  it('renders label and input', () => {
    render(<TextInput label="My Label" placeholder="x" />)
    expect(screen.getByText('My Label')).toBeTruthy()
    expect(screen.getByPlaceholderText('x')).toBeTruthy()
  })
})
