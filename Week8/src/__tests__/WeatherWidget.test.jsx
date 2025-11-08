/**
 * WeatherWidget.test.jsx
 * Tests for WeatherWidget and cache behavior. All external calls are mocked (axios).
 */
import React from 'react';
// ensure tests have an API key set so hooks don't throw
process.env.REACT_APP_WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'test_key';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import axios from 'axios';
import WeatherWidget from '../components/WeatherWidget';
import { setCached } from '../utils/cache';

jest.mock('axios');

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
  // clear any stored cache in localStorage used by tests
  try {
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith('wdc:')) localStorage.removeItem(k);
    });
  } catch (e) {}
});

test('renders loading state then displays weather on success', async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      main: { temp: 12.4, humidity: 84 },
      weather: [{ description: 'light rain' }],
    },
  });

  render(<WeatherWidget cityName="Paris" />);

  expect(screen.getByRole('status')).toHaveTextContent('Loading');

  await waitFor(() => expect(screen.getByText(/Temperature/i)).toBeInTheDocument());

  expect(screen.getByText(/12°C|12/)).toBeTruthy();
  expect(screen.getByText(/Humidity/i)).toHaveTextContent('Humidity: 84%');
  expect(screen.getByText(/Conditions/i)).toHaveTextContent('light rain');
});

test('displays error when API fails or key missing', async () => {
  // Simulate missing API key by rejecting with an error
  axios.get.mockRejectedValueOnce(new Error('Network error'));

  render(<WeatherWidget cityName="NoKeyLand" />);

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(screen.getByRole('alert')).toHaveTextContent(/Error loading weather/i);
});

test('uses cached value if present and avoids network call', async () => {
  // pre-seed cache
  setCached('weather:cachedcity', { tempC: 20, humidity: 50, description: 'sunny' }, 1000 * 60);

  render(<WeatherWidget cityName="CachedCity" />);

  // Should show cached data without axios being called
  await waitFor(() => expect(screen.getByText(/Temperature/i)).toBeInTheDocument());
  expect(axios.get).not.toHaveBeenCalled();
  expect(screen.getByText(/20°C|20/)).toBeTruthy();
  expect(screen.getByText(/sunny/)).toBeInTheDocument();
});
