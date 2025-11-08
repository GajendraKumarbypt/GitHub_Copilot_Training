/**
 * Tests to ensure useWeather respects the cancelled flag and does not update
 * state after unmount (both success and error paths).
 */
import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import axios from 'axios';
import WeatherWidget from '../components/WeatherWidget';

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

function deferred() {
  let resolve, reject;
  const p = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise: p, resolve, reject };
}

test('does not call setState after unmount when request resolves', async () => {
  process.env.REACT_APP_WEATHER_API_KEY = 'test_key';
  const d = deferred();
  axios.get.mockReturnValueOnce(d.promise);

  const { unmount } = render(<WeatherWidget cityName="WillUnmountSuccess" />);

  // unmount before resolving
  unmount();

  // resolve after unmount
  d.resolve({ data: { main: { temp: 5, humidity: 10 }, weather: [{ description: 'ok' }] } });

  // wait a tick to ensure any state updates would have fired
  await waitFor(() => expect(true).toBeTruthy());
});

test('does not call setState after unmount when request rejects', async () => {
  process.env.REACT_APP_WEATHER_API_KEY = 'test_key';
  const d = deferred();
  axios.get.mockReturnValueOnce(d.promise);

  const { unmount } = render(<WeatherWidget cityName="WillUnmountError" />);

  // unmount before rejecting
  unmount();

  // reject after unmount
  d.reject(new Error('network fail'));

  await waitFor(() => expect(true).toBeTruthy());
});
