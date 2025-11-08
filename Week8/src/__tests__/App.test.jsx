import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders App heading', () => {
  render(<App />);
  expect(screen.getByText(/Weather Dashboard/i)).toBeInTheDocument();
});
