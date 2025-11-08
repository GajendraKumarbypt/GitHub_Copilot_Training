import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock the useWeather hook directly to exercise component branches
jest.mock('../hooks/useWeather', () => jest.fn());
import useWeather from '../hooks/useWeather';
import WeatherWidget from '../components/WeatherWidget';

afterEach(() => {
  jest.resetAllMocks();
});

test('renders nothing when not loading, no error and no data', () => {
  useWeather.mockReturnValue({ data: null, loading: false, error: null });
  const { container } = render(<WeatherWidget cityName="EmptyCity" />);
  // Should render nothing (null)
  expect(container.firstChild).toBeNull();
});

test('renders error when hook returns error', () => {
  useWeather.mockReturnValue({ data: null, loading: false, error: new Error('hook failure') });
  render(<WeatherWidget cityName="ErrCity" />);
  expect(screen.getByRole('alert')).toHaveTextContent(/hook failure/);
});
