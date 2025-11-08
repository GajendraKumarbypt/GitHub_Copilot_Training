/**
 * Tests to exercise error branches in useWeather hook: missing API key and invalid payload.
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import WeatherWidget from '../components/WeatherWidget';

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks();
});

test('shows error when API returns invalid payload', async () => {
  process.env.REACT_APP_WEATHER_API_KEY = 'test_key';
  axios.get.mockResolvedValueOnce({ data: {} }); // missing main

  render(<WeatherWidget cityName="InvalidPayloadCity" />);

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(screen.getByRole('alert')).toHaveTextContent(/Error loading weather/i);
});

test('shows error when API key missing', async () => {
  // Ensure env var is unset for this test
  delete process.env.REACT_APP_WEATHER_API_KEY;

  render(<WeatherWidget cityName="NoKeyCity" />);

  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(screen.getByRole('alert')).toHaveTextContent(/REACT_APP_WEATHER_API_KEY not configured/);
});

test('maps when weather array missing or empty', async () => {
  process.env.REACT_APP_WEATHER_API_KEY = 'test_key';
  // case: weather missing
  axios.get.mockResolvedValueOnce({ data: { main: { temp: 9.7, humidity: 40 } } });
  render(<WeatherWidget cityName="NoWeather" />);
  await waitFor(() => expect(screen.getByText(/Temperature/i)).toBeInTheDocument());
  expect(screen.getByText(/Conditions/i)).toBeInTheDocument();

  // case: weather empty array
  axios.get.mockResolvedValueOnce({ data: { main: { temp: 10, humidity: 41 }, weather: [] } });
  render(<WeatherWidget cityName="EmptyWeather" />);
  await waitFor(() => expect(screen.getAllByText(/Temperature/i).length).toBeGreaterThanOrEqual(1));
});
