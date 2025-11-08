import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App', () => {
  it('renders app title and components', () => {
    render(<App />)
    expect(screen.getByText(/Week5 React Refactor Demo/i)).toBeTruthy()
    expect(screen.getByText(/Now:/i)).toBeTruthy()
  })
})
