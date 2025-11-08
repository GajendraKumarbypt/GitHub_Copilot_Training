/**
 * Small App wrapper demonstrating WeatherWidget usage.
 */
import React from 'react';
import WeatherWidget from './components/WeatherWidget';

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <h1>Weather Dashboard (Week8)</h1>
      <WeatherWidget cityName="London" />
    </div>
  );
}
