import React from 'react'
import { PrimaryButton } from './components/Button'
import { TextInput } from './components/Input'
import { formatDate } from './utils/format'

export default function App() {
  const now = new Date()
  return (
    <div className="app">
      <h1>Week5 React Refactor Demo</h1>
      <p>Now: {formatDate(now)}</p>

      <TextInput placeholder="Enter text" label="Demo input" />
      <PrimaryButton onClick={() => alert('Clicked')}>Click me</PrimaryButton>
    </div>
  )
}
