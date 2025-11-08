/**
 * WeatherWidget.jsx
 * Reusable component that shows current weather for a given city.
 * - Props: { cityName }
 * - Uses `useWeather` hook for fetching + caching.
 * - Displays temperature (C), humidity, and description.
 */
import React from 'react';
import PropTypes from 'prop-types';
import useWeather from '../hooks/useWeather';

/**
 * WeatherWidget component
 * @param {{cityName: string}} props
 * @returns {JSX.Element}
 */
export default function WeatherWidget({ cityName }) {
  const { data, loading, error } = useWeather(cityName);

  if (loading) return <div role="status">Loading weather…</div>;
  if (error)
    return (
      <div role="alert">
        Error loading weather: {String(error.message || error)}
      </div>
    );

  if (!data) return null;

  const { tempC, humidity, description } = data;

  return (
    <section aria-label={`weather-${cityName}`} style={{border: '1px solid #ddd', padding: 12, maxWidth: 300}}>
      <h2 style={{marginTop: 0}}>{cityName}</h2>
      <div>Temperature: <strong>{tempC}°C</strong></div>
      <div>Humidity: <strong>{humidity}%</strong></div>
      <div>Conditions: <em>{description}</em></div>
    </section>
  );
}

WeatherWidget.propTypes = {
  cityName: PropTypes.string.isRequired,
};
